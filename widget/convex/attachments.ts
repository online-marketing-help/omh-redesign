import { v } from "convex/values";
import { mutation, action, internalMutation, query } from "./_generated/server";
import { api } from "./_generated/api";
import { bump } from "./functions";
import { verifyStored, LIMITS } from "../gates/attachments.js";

/* =========================================================================
   The visitor's door for a photo or a voice note.

   There are two doors into storage and they need different things. n8n has
   the shared secret, so `/attachment/url` in http.ts hands it an upload URL
   and trusts it to have run the gate already. A browser has no secret, which
   leaves two problems that do not exist on the n8n side:

     1. **Anyone can call it.** The route is a public URL on a public page,
        so it is rate limited, through the same counter the chat uses rather
        than a second one of its own.

     2. **Nothing it says can be believed.** `checkAttachment` runs in the
        visitor's browser, which makes it a courtesy to the honest visitor,
        not a guard. The upload URL is an ordinary endpoint: open the network
        tab, PUT a 300MB file or an SVG to it, then call `attach` claiming it
        was a 2KB photo. So the file is read back out of storage here and
        judged on its real bytes and its real length, and that verdict is the
        one that decides whether it becomes a message.

   A file that fails is deleted rather than left behind. Storage that keeps
   everything anyone ever pushed at it, whether or not it was accepted, is
   not storage, it is an anonymous dropbox on someone else's bill.
   ========================================================================= */

/* A visitor who sends more than this in an hour is not sending holiday
   photos. Deliberately far below the chat limit: typing thirty messages in
   an hour is plausible, uploading thirty files is not. */
const UPLOADS_PER_SESSION = 8;

/* Everyone's uploads together, in an hour. Generous for a site this size
   and still a ceiling, so a loop costs storage rather than unbounded
   storage. Separate from the chat breaker on purpose; see uploadUrl. */
const UPLOADS_PER_DEPLOYMENT = 400;

/* How much of the file the sniffer needs. The longest signature checked is
   twelve bytes (WebP, and the ftyp box for mp4), so 64 is generous and means
   the whole file never has to come back over the wire to be identified. */
const HEAD_BYTES = 64;

/**
 * A short-lived URL the browser can upload one file to.
 *
 * Granting this is not accepting anything: the file is judged after it
 * arrives, in `attach`.
 */
export const uploadUrl = mutation({
  args: { sessionId: v.string() },
  handler: async (ctx, { sessionId }) => {
    const t = Date.now();

    /* Its own circuit breaker, not the chat one.

       This used to burn the shared `global` counter, presented as the safe
       choice. It is the opposite: an unauthenticated loop asking for
       upload URLs would trip the breaker that stops the ASSISTANT
       answering, for an hour, without a single file being uploaded. A door
       should not be able to take the building down. */
    const all = await bump(ctx, "uploads:global", UPLOADS_PER_DEPLOYMENT, t);
    if (!all.ok) return { ok: false as const, error: "busy" };

    const mine = await bump(ctx, "up:" + sessionId, UPLOADS_PER_SESSION, t);
    if (!mine.ok) return { ok: false as const, error: "too_many" };

    return { ok: true as const, url: await ctx.storage.generateUploadUrl(), limits: LIMITS };
  },
});

/* How many files one conversation may put in the transcript in an hour.
   Separate from the upload grant, and the one that actually bounds the
   writing: capping how many URLs are handed out bounds nothing while a
   single file can be attached over and over. */
const ATTACHES_PER_SESSION = 12;

/**
 * May this caller attach this file to this conversation?
 *
 * A mutation rather than a query because it has to take the rate-limit
 * slot, and a slot that is read without being taken is not a limit. It is
 * called first by `attach`, which cannot do this itself: an action has no
 * database.
 */
export const canAttach = mutation({
  args: { sessionId: v.string(), storageId: v.id("_storage") },
  handler: async (ctx, { sessionId, storageId }) => {
    /* A conversation that was never started is not a conversation. */
    const session = await ctx.db
      .query("sessions")
      .withIndex("by_session", (i) => i.eq("sessionId", sessionId))
      .first();
    if (!session) return { ok: false as const, why: "no_session" };

    /* Once per file. The index exists for this and nothing else. */
    const already = await ctx.db
      .query("messages")
      .withIndex("by_attachment", (i) => i.eq("attachment.storageId", storageId))
      .first();
    if (already) return { ok: false as const, why: "already_attached" };

    const slot = await bump(ctx, "att:" + sessionId, ATTACHES_PER_SESSION, Date.now());
    if (!slot.ok) return { ok: false as const, why: "too_many" };

    return { ok: true as const };
  },
});

/**
 * Attach an uploaded file to the conversation, if it is what it claims.
 *
 * An action rather than a mutation because it has to read the stored bytes,
 * and only an action can. The write itself goes through `logMessage`, the
 * same mutation the assistant and n8n use, so an attachment from the widget
 * lands in the transcript identically to one from WhatsApp.
 */
export const attach = action({
  args: {
    sessionId: v.string(),
    storageId: v.id("_storage"),
    /* What the browser believed. All of it is checked, none of it is kept
       unless the bytes agree. */
    kind: v.optional(v.string()),
    type: v.optional(v.string()),
    name: v.optional(v.string()),
    text: v.optional(v.string()),
    pageUrl: v.optional(v.string()),
  },
  handler: async (ctx, a) => {
    /* Four things are checked before the bytes are even read, because each
       one was missing and each one was exploitable on its own.

       1. The session has to exist. It was taken on trust, so any string
          was a conversation and a stranger could write into the client's
          dashboard as a visitor who was never there.

       2. The write is rate limited, not just the upload. Capping
          `uploadUrl` at eight achieved nothing while one uploaded file
          bought unlimited writes.

       3. A file is attached once. Nothing recorded that it had been, so
          the same storage id replayed for ever, two thousand characters of
          the caller's text at a time.

       4. A file already in a conversation is never deleted by this route.
          The failure branch below deletes, and it used to do so on any id
          the caller named: pointing it at somebody else's attachment with
          a deliberately wrong `kind` destroyed their photo. */
    const known: { ok: boolean; why?: string } = await ctx.runMutation(
      api.attachments.canAttach,
      { sessionId: a.sessionId, storageId: a.storageId },
    );
    if (!known.ok) return { ok: false as const, why: known.why ?? "refused" };

    const blob = await ctx.storage.get(a.storageId);
    /* No blob means the upload never completed, or the id is somebody
       else's guess. Either way there is nothing to verify. */
    if (!blob) return { ok: false as const, why: "no_file" };

    /* What Convex will SERVE it as, which is not what the bytes are.

       The content type is whatever was sent on the upload POST, and Convex
       keeps it. So a PNG header followed by a script, stored as text/html,
       passed every byte check and became a page on this deployment's own
       origin; the dashboard links attachments with target="_blank", so one
       staff click opened it. The sniffed type and the stored type have to
       agree, or it is not the file it claims to be. */
    const meta = await ctx.storage.getMetadata(a.storageId);
    const storedType = String((meta as { contentType?: string } | null)?.contentType ?? "");

    const head = new Uint8Array(await blob.slice(0, HEAD_BYTES).arrayBuffer());
    const verdict = verifyStored(
      { storageId: a.storageId, kind: a.kind, type: a.type, name: a.name },
      head,
      blob.size,
    );

    if (!verdict.ok || verdict.attachment.type !== storedType) {
      /* Refused, so it does not stay on disk. Safe to delete here because
         `canAttach` has already established that nothing references it. */
      await ctx.storage.delete(a.storageId);
      return {
        ok: false as const,
        why: verdict.ok ? "not_what_it_claims" : verdict.why,
        limit: verdict.ok ? undefined : verdict.limit,
      };
    }

    await ctx.runMutation(api.functions.logMessage, {
      sessionId: a.sessionId,
      role: "user",
      /* Any caption the visitor typed alongside it. `logMessage` fills in
         "Sent a photo" when there is none. */
      text: (a.text ?? "").trim().slice(0, 2000),
      channel: "chat",
      pageUrl: a.pageUrl,
      attachment: { ...verdict.attachment, storageId: a.storageId },
    });

    return { ok: true as const, attachment: verdict.attachment };
  },
});

/* -------------------------------------------------------- housekeeping */

/* How long a file may sit in storage unattached before it is reclaimed.

   Long enough that a slow upload on a bad connection, or a visitor who
   picks a photo and then takes a while to send it, is never cut off.
   Short enough that storage is not an anonymous dropbox. */
const ORPHAN_MS = 24 * 60 * 60 * 1000;

/**
 * Delete files that were uploaded and never attached to anything.
 *
 * `uploadUrl` hands out a URL; whether `attach` is ever called afterwards
 * is the caller's choice. Granting a URL, uploading, and then saying
 * nothing left the bytes in storage for ever, which the header of this
 * file promised did not happen. It does now, on a schedule, because that
 * promise cannot be kept at the moment of upload: nothing knows yet
 * whether the attach is simply still in flight.
 */
export const sweepOrphans = internalMutation({
  args: {},
  handler: async (ctx) => {
    const cutoff = Date.now() - ORPHAN_MS;
    /* A page at a time. A sweep that tries to read every file ever stored
       is a sweep that starts failing exactly when it matters. */
    const files = await ctx.db.system.query("_storage").take(200);

    let deleted = 0;
    for (const f of files) {
      if (f._creationTime > cutoff) continue;
      const used = await ctx.db
        .query("messages")
        .withIndex("by_attachment", (i) => i.eq("attachment.storageId", f._id))
        .first();
      if (used) continue;
      await ctx.storage.delete(f._id);
      deleted++;
    }
    return { looked: files.length, deleted };
  },
});

/**
 * A URL for a stored file, for the server side.
 *
 * `01-chat` needs this: the widget tells it a storage id and it has to show
 * the picture to a vision model. The widget cannot simply hand over a URL,
 * because then a workflow would be fetching an address a stranger chose,
 * which is the server-side request forgery `checkRemote` exists to prevent.
 * An id is safe where a URL is not: this resolves it.
 *
 * **Only for a file that is already in a conversation.** Without that check
 * this would answer for any id at all, which turns a guessed id into
 * somebody else's photo. A file that has not been attached yet has no
 * business being shown to anything.
 */
export const urlFor = query({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, { storageId }) => {
    const used = await ctx.db
      .query("messages")
      .withIndex("by_attachment", (i) => i.eq("attachment.storageId", storageId))
      .first();
    if (!used) return { ok: false as const, why: "not_attached" };

    const url = await ctx.storage.getUrl(storageId);
    if (!url) return { ok: false as const, why: "gone" };
    return {
      ok: true as const,
      url,
      kind: used.attachment?.kind ?? "image",
      type: used.attachment?.type ?? "",
      sessionId: used.sessionId,
    };
  },
});
