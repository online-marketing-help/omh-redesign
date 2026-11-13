import { v } from "convex/values";
import { api } from "./_generated/api";
import { mutation, query } from "./_generated/server";
import type { QueryCtx } from "./_generated/server";
import type { Doc } from "./_generated/dataModel";

/* =========================================================================
   Campaigns: what happened when we contacted a list on purpose.

   Reactivation is one of the seven capabilities the package sells, and until
   this file existed the question it exists to answer had no answer. A batch
   was a set of unrelated `sequences` rows that happened to share an
   afternoon, so "we texted two hundred old customers, what came of it" could
   only be answered by eye.

   Three decisions worth stating, because each one is load bearing.

   **A campaign is a row, not a label.** The facts that get challenged later
   are facts about the list, not about any one person: who it went to, on what
   consent basis, who pressed the button. Those cannot be reconstructed from
   four hundred sequence rows months afterwards, so they are recorded once, at
   the start, and never recomputed.

   **The report is counted from touches, not from a counter.** Nothing
   increments a `sent` column. Every figure here is derived from the
   append-only tables that the sending itself wrote, which means a figure on
   this screen cannot drift from what actually went out. The cost is that the
   report is a scan; the benefit is that it is true.

   **A touch belongs to a campaign through its sequence.** `touches` has no
   campaign field and does not need one: the idempotency key a send already
   carries is `sequenceId:step`, so the sequence rows of a campaign name
   exactly the touches that campaign produced. Adding a field would be a
   second source of truth for something already recorded.

   **Opt-outs are reported beside wins, deliberately.** A campaign that books
   three appointments and burns forty permissions is not a success, and a
   report that shows only the three would say it was. This is the one place in
   the system where the bad number is given the same prominence as the good
   one.
   ========================================================================= */

const KINDS = new Set(["reactivation", "announcement", "test", "other"]);
const STATUSES = new Set(["draft", "running", "finished", "stopped"]);

/* ------------------------------------------------------------------ create */

export const create = mutation({
  args: {
    name: v.string(),
    kind: v.optional(v.string()),
    route: v.optional(v.string()),
    audience: v.optional(v.string()),
    consentBasis: v.optional(v.string()),
    note: v.optional(v.string()),
    intended: v.optional(v.number()),
    by: v.optional(v.string()),
  },
  handler: async (ctx, a) => {
    const name = a.name.trim();
    if (!name) return { ok: false as const, why: "no_name" };

    const kind = a.kind ?? "reactivation";
    if (!KINDS.has(kind)) return { ok: false as const, why: "unknown_kind" };

    /* Defaults to F because F is the only route marked `marketing: true`, and
       a reactivation batch is marketing. Passing another route is allowed and
       recorded, so a report never has to guess which legal situation a batch
       was in. */
    const route = (a.route ?? "F").toUpperCase();

    const id = await ctx.db.insert("campaigns", {
      name,
      kind,
      route,
      audience: a.audience?.trim() || undefined,
      consentBasis: a.consentBasis || undefined,
      note: a.note?.trim() || undefined,
      /* Created in draft. A campaign that existed only as "running" would
         have no state in which the audience can be checked before anything
         is sent, and checking it afterwards is not checking it. */
      status: "draft",
      intended: a.intended,
      at: Date.now(),
      by: a.by,
    });

    return { ok: true as const, campaignId: id };
  },
});

export const setStatus = mutation({
  args: {
    campaignId: v.id("campaigns"),
    status: v.string(),
    by: v.optional(v.string()),
  },
  handler: async (ctx, { campaignId, status, by }) => {
    if (!STATUSES.has(status)) return { ok: false as const, why: "unknown_status" };
    const row = await ctx.db.get(campaignId);
    if (!row) return { ok: false as const, why: "no_such_campaign" };

    const now = Date.now();
    await ctx.db.patch(campaignId, {
      status,
      /* Stamped once. A campaign restarted after being stopped keeps its
         original start, because every figure in the report is measured from
         that moment and moving it would silently drop the first batch's
         replies out of the count. */
      startedAt: status === "running" ? (row.startedAt ?? now) : row.startedAt,
      finishedAt:
        status === "finished" || status === "stopped" ? now : row.finishedAt,
      by: by ?? row.by,
    });
    return { ok: true as const, status };
  },
});

/**
 * Stop a campaign and everything it has in flight.
 *
 * Setting the status alone would leave every queued step due and sending.
 * Stopping a campaign has to mean the texts stop, or the button is a lie, so
 * this is one mutation rather than two the caller has to remember to pair.
 */
export const stop = mutation({
  args: { campaignId: v.id("campaigns"), by: v.optional(v.string()) },
  handler: async (ctx, { campaignId, by }) => {
    const row = await ctx.db.get(campaignId);
    if (!row) return { ok: false as const, why: "no_such_campaign" };

    const rows = await ctx.db
      .query("sequences")
      .withIndex("by_campaign", (q) => q.eq("campaignId", campaignId))
      .collect();

    let stopped = 0;
    const now = Date.now();
    for (const s of rows) {
      if (s.status !== "active" && s.status !== "paused") continue;
      await ctx.db.patch(s._id, {
        status: "stopped",
        stopReason: "manual",
        nextDueAt: undefined,
        /* The lease is cleared with the row. Leaving a token behind would let
           a worker that claimed this a moment ago still complete the step it
           is holding, which is one more text after the stop. */
        leaseToken: undefined,
        leaseUntil: undefined,
        lastStepAt: now,
      });
      stopped += 1;
    }

    await ctx.db.patch(campaignId, { status: "stopped", finishedAt: now, by: by ?? row.by });
    return { ok: true as const, stopped };
  },
});

/* ------------------------------------------------------------------ enrol */

/**
 * Put a batch of people on a route, as one campaign.
 *
 * Not a loop over `enrol` in the caller, for one reason that matters: this
 * returns the reason every single refusal happened. The gap between the list
 * handed in and the people actually enrolled IS the suppression and consent
 * rate, and it is the most useful figure a reactivation run produces. A
 * caller looping over `enrol` and counting successes would throw it away.
 */
export const enrolBatch = mutation({
  args: {
    campaignId: v.id("campaigns"),
    leadIds: v.array(v.id("leads")),
  },
  handler: async (ctx, { campaignId, leadIds }) => {
    const campaign = await ctx.db.get(campaignId);
    if (!campaign) return { ok: false as const, why: "no_such_campaign" };
    if (campaign.status === "stopped" || campaign.status === "finished") {
      return { ok: false as const, why: "campaign_not_open" };
    }

    /* Capped per call. Four hundred enrolments in one mutation is a long
       transaction holding read locks on `suppressions` and `settings`, which
       every live send also reads. The caller pages. */
    if (leadIds.length > 100) return { ok: false as const, why: "too_many" };

    const enrolled: string[] = [];
    const refused: Array<{ leadId: string; why: string }> = [];
    const immediate: Array<Record<string, unknown>> = [];

    for (const leadId of leadIds) {
      const r = (await ctx.runMutation(api.routing.enrol, {
        leadId,
        route: campaign.route,
        campaignId,
      })) as {
        enrolled: boolean;
        why?: string;
        sequenceId?: string;
        immediate?: Array<Record<string, unknown>>;
      };
      if (!r.enrolled) {
        refused.push({ leadId, why: r.why ?? "unknown" });
        continue;
      }
      enrolled.push(String(r.sequenceId));
      for (const m of r.immediate ?? []) immediate.push({ ...m, leadId });
    }

    if (enrolled.length && campaign.status === "draft") {
      await ctx.db.patch(campaignId, {
        status: "running",
        startedAt: campaign.startedAt ?? Date.now(),
      });
    }

    return {
      ok: true as const,
      enrolled: enrolled.length,
      refused,
      /* Route F's first message, for the caller to send inline exactly as the
         router does for an enquiry. Same gate, same shape. */
      immediate,
    };
  },
});

/* ----------------------------------------------------------------- report */

export type CampaignFacts = {
  /* Per person, never totalled here. Same decision as `channelFacts`: our own
     test rows have to be excluded before anything is counted, and the rule
     for that lives in one place in the dashboard. Totalling in Convex would
     need a second copy of it that could drift. */
  leadId: string;
  sequenceId: string;
  name: string;
  phone: string | null;
  email: string | null;
  sourceChannel: string | null;
  status: string;
  stopReason: string | null;
  step: number;
  enrolledAt: number;
  sent: number;
  delivered: number;
  failed: number;
  firstSentAt: number | null;
  replied: boolean;
  firstReplyAt: number | null;
  optedOut: boolean;
  hot: boolean;
  outcome: string | null;
  valueGbp: number | null;
  bookings: number;
};

async function factsFor(
  ctx: QueryCtx,
  campaign: Doc<"campaigns">,
): Promise<CampaignFacts[]> {
  const rows = await ctx.db
    .query("sequences")
    .withIndex("by_campaign", (q) => q.eq("campaignId", campaign._id))
    .collect();

  const out: CampaignFacts[] = [];

  for (const s of rows) {
    const lead = await ctx.db.get(s.leadId);
    if (!lead) continue;

    const touches = await ctx.db
      .query("touches")
      .withIndex("by_lead_at", (q) => q.eq("leadId", s.leadId))
      .collect();

    /* Which touches belong to THIS sequence, and so to this campaign.

       Outbound sends carry `sequenceId:step` as their idempotency key, which
       names the sequence exactly. Matching on the key rather than on a time
       window matters because a person can be on a campaign in March and an
       ordinary enquiry route in April, and a window would credit April's
       texts to March's campaign. */
    const mine = touches.filter(
      (t) => t.idempotencyKey && t.idempotencyKey.startsWith(`${s._id}:`),
    );

    const sent = mine.filter(
      (t) => t.direction === "out" && (t.status === "sent" || t.status === "delivered"),
    );
    const delivered = mine.filter(
      (t) => t.direction === "out" && t.status === "delivered",
    );
    const failed = mine.filter((t) => t.direction === "out" && t.status === "failed");

    /* An inbound touch has no idempotency key to match on, so a reply is
       anything inbound that arrived STRICTLY after this sequence started.
       Strictly, not at or after, for the same reason `repliedSince` uses `>`:
       the event that triggered an enrolment is recorded a moment before the
       sequence row, and counting it would read the trigger as a reply. */
    const replies = touches
      .filter((t) => t.direction === "in" && t.at > s.at)
      .sort((a, b) => a.at - b.at);

    const bookings = s.sessionId
      ? (
          await ctx.db
            .query("bookings")
            .withIndex("by_session", (q) => q.eq("sessionId", s.sessionId!))
            .collect()
        ).filter((b) => b.at > s.at && b.status !== "cancelled").length
      : 0;

    out.push({
      leadId: s.leadId,
      sequenceId: s._id,
      name: lead.name,
      phone: lead.phone ?? null,
      email: lead.email ?? null,
      sourceChannel: lead.sourceChannel ?? null,
      status: s.status,
      stopReason: s.stopReason ?? null,
      step: s.step,
      enrolledAt: s.at,
      sent: sent.length,
      delivered: delivered.length,
      failed: failed.length,
      firstSentAt: sent.length
        ? Math.min(...sent.map((t) => t.at))
        : null,
      replied: replies.length > 0,
      firstReplyAt: replies.length ? replies[0].at : null,
      optedOut: s.stopReason === "opted_out",
      hot: lead.hot,
      outcome: lead.outcome ?? null,
      valueGbp: lead.valueGbp ?? null,
      bookings,
    });
  }

  return out;
}

/** The list screen: every campaign with the figures that fit on a row. */
export const list = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, { limit }) => {
    const cap = Math.min(limit ?? 50, 200);
    const campaigns = await ctx.db
      .query("campaigns")
      .withIndex("by_at")
      .order("desc")
      .take(cap);

    const rows = [];
    for (const c of campaigns) {
      rows.push({
        id: c._id,
        name: c.name,
        kind: c.kind,
        route: c.route,
        audience: c.audience ?? null,
        consentBasis: c.consentBasis ?? null,
        note: c.note ?? null,
        status: c.status,
        intended: c.intended ?? null,
        startedAt: c.startedAt ?? null,
        finishedAt: c.finishedAt ?? null,
        at: c.at,
        by: c.by ?? null,
        people: await factsFor(ctx, c),
      });
    }

    return { rows, now: Date.now() };
  },
});

/** One campaign, with every person on it. */
export const report = query({
  args: { campaignId: v.id("campaigns") },
  handler: async (ctx, { campaignId }) => {
    const c = await ctx.db.get(campaignId);
    if (!c) return null;
    return {
      campaign: {
        id: c._id,
        name: c.name,
        kind: c.kind,
        route: c.route,
        audience: c.audience ?? null,
        consentBasis: c.consentBasis ?? null,
        note: c.note ?? null,
        status: c.status,
        intended: c.intended ?? null,
        startedAt: c.startedAt ?? null,
        finishedAt: c.finishedAt ?? null,
        at: c.at,
        by: c.by ?? null,
      },
      people: await factsFor(ctx, c),
      now: Date.now(),
    };
  },
});

