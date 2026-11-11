import { v } from "convex/values";
import { mutation, action } from "./_generated/server";
import { api } from "./_generated/api";
import { bump, PER_DEPLOYMENT } from "./functions";
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

    const all = await bump(ctx, "global", PER_DEPLOYMENT, t);
    if (!all.ok) return { ok: false as const, error: "busy" };

    const mine = await bump(ctx, "up:" + sessionId, UPLOADS_PER_SESSION, t);
    if (!mine.ok) return { ok: false as const, error: "too_many" };

    return { ok: true as const, url: await ctx.storage.generateUploadUrl(), limits: LIMITS };
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
    const blob = await ctx.storage.get(a.storageId);
    /* No blob means the upload never completed, or the id is somebody
       else's guess. Either way there is nothing to verify. */
    if (!blob) return { ok: false as const, why: "no_file" };

    const head = new Uint8Array(await blob.slice(0, HEAD_BYTES).arrayBuffer());
    const verdict = verifyStored(
      { storageId: a.storageId, kind: a.kind, type: a.type, name: a.name },
      head,
      blob.size,
    );

    if (!verdict.ok) {
      /* Refused, so it does not stay on disk. */
      await ctx.storage.delete(a.storageId);
      return { ok: false as const, why: verdict.why, limit: verdict.limit };
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
