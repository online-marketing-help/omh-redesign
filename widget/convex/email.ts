import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { readReply } from "../gates/email-reply.js";

/* =========================================================================
   A reply that came by email.

   The Channels report has counted emails sent and texts replied to since it
   was built, so "replied" has meant "replied by text" and every per-channel
   reply rate has been wrong in the same direction.

   `gates/email-reply.js` decides whether a message is a person and which
   outbound touch it answers; this records that decision. Three things it is
   careful about, each of which would make the figures worse than the gap it
   closes:

     - an auto-reply is recorded but never counted, and never stops a
       sequence. An out-of-office would otherwise end every follow-up it
       touched;
     - the same message arriving twice is recorded once. IMAP polling
       re-reads a folder and a restart re-reads it from the beginning;
     - mail that matches nothing is left alone rather than attributed to
       whoever looks closest.
   ========================================================================= */

export const emailReplyArrived = mutation({
  args: {
    /* The parsed message, as the IMAP node hands it over. */
    message: v.any(),
  },
  handler: async (ctx, { message }) => {
    const msg = message ?? {};

    /* The lookup the gate asks: does this Message-ID belong to something we
       sent? The index is `by_provider`, which already holds a Twilio SID
       and a Retell call id for the same reason: it is the id the provider
       assigned. An email's Message-ID needed no new field. */
    const byMessageId = new Map<string, { leadId?: string; _id: string }>();
    const find = (messageId: string) => {
      const hit = byMessageId.get(messageId);
      return hit ? hit._id : null;
    };

    /* Resolve the candidate ids up front, because the gate's lookup has to
       be synchronous and Convex reads are not. */
    const ids: string[] = [];
    const h = msg.headers ?? {};
    for (const key of Object.keys(h)) {
      const k = key.toLowerCase();
      if (k === "in-reply-to" || k === "references") {
        for (const m of String(h[key]).match(/<[^>]+>/g) ?? []) ids.push(m);
      }
    }
    for (const id of ids) {
      const row = await ctx.db
        .query("touches")
        .withIndex("by_provider", (q) => q.eq("providerId", id))
        .first();
      if (row) byMessageId.set(id, row as never);
    }

    const verdict = readReply(msg, find);

    /* Two identifiers, two lookups, because they name different things.

       `touchId` came from threading and is one of our own touch rows.
       `token` came from the Reply-To we wrote, and names the SEND
       (`sequenceId-step`), because at the moment that address is composed
       the touch does not exist yet. It resolves through the idempotency
       key the send already carries. */
    let touch: { _id: string; leadId?: string } | null = null;
    if (verdict.touchId) {
      touch = [...byMessageId.values()].find((t) => t._id === verdict.touchId) ?? null;
    }
    if (!touch && verdict.token) {
      const idem = String(verdict.token).replace("-", ":");
      touch = (await ctx.db
        .query("touches")
        .withIndex("by_idem", (q) => q.eq("idempotencyKey", idem))
        .first()) as never;
    }

    if (!touch) {
      /* Not ours, or not identifiable. Counted by the caller so an outage
         or a misconfigured Reply-To shows up as a number rather than as
         silence, but nothing is written and nobody's sequence is stopped. */
      return { reply: false as const, leadId: null, why: "unmatched" as const };
    }

    const leadId = (touch as { leadId?: string }).leadId ?? null;

    /* Once per message. IMAP re-reads folders; a restart re-reads from the
       beginning. Recording a reply twice doubles the reply rate. */
    const key = `email-in:${String(msg.uid ?? msg.messageId ?? "")}`;
    const seen = await ctx.db
      .query("touches")
      .withIndex("by_idem", (q) => q.eq("idempotencyKey", key))
      .first();
    if (seen) {
      return { reply: false as const, duplicate: true as const, leadId, why: "already_recorded" as const };
    }

    const auto = !verdict.reply && verdict.why === "auto_reply";

    await ctx.db.insert("touches", {
      leadId: leadId as never,
      direction: "in",
      channel: "email",
      /* An auto-reply is on the timeline, because the team should be able
         to see that one came back, but it is not a reply and its status
         says so. */
      status: auto ? "auto_reply" : "received",
      body: String(msg.text ?? msg.subject ?? "").slice(0, 2000),
      providerId: String(msg.messageId ?? "") || undefined,
      idempotencyKey: key,
      at: Date.now(),
    });

    if (!verdict.reply) {
      return { reply: false as const, leadId, why: verdict.why as never };
    }

    /* They answered, so stop chasing them. This is what already happens
       for a text; email simply reaches the same place now. */
    if (leadId) {
      const live = await ctx.db
        .query("sequences")
        .withIndex("by_lead", (q) => q.eq("leadId", leadId as never))
        .collect();
      for (const s of live) {
        if (s.status !== "active" && s.status !== "paused") continue;
        await ctx.db.patch(s._id, {
          status: "stopped",
          stopReason: "replied",
          nextDueAt: undefined,
          leaseToken: undefined,
          leaseUntil: undefined,
        });
      }
    }

    return { reply: true as const, leadId, why: "" as const };
  },
});
