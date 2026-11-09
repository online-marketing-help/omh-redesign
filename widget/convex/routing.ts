/* =========================================================================
   The routing engine.

   Convex holds the data and the clock. n8n does the sending. Nothing in this
   file talks to Twilio, to Retell or to a mail server, and that is deliberate:
   every outbound call stays in n8n where it is visible and re-runnable, and
   this deployment keeps its "one door, one secret" property with no new
   outbound egress to audit.

   The shape is a leased work queue:

     enrol        puts a person on a route and sets the first due time
     claimDue     n8n asks "what is ready?", and takes a short lease on it
     completeStep n8n reports back, the lease is checked, the row advances

   The lease is the part that matters. The worker cron fires every minute and a
   run sending to twenty-five people can take longer than a minute, so two runs
   can overlap. Without a lease both would read the same due row and send the
   same text twice. Texting a client's customer twice is the worst thing this
   system could do, so it is prevented structurally rather than by hoping the
   cron is never slow.
   ========================================================================= */

import { api } from "./_generated/api";
import { mutation, query } from "./_generated/server";
import type { QueryCtx, MutationCtx } from "./_generated/server";
import { v } from "convex/values";
import type { Doc, Id } from "./_generated/dataModel";
import { ROUTES, nextStep, stepAt, type RouteId } from "../gates/routes";
import { render } from "../gates/templates";
import { phoneKey, emailKey } from "./visitors";

const LEASE_MS = 120 * 1000;
const MAX_ATTEMPTS = 3;
const RETRY_MS = 5 * 60 * 1000;

/* ---------------------------------------------------------------- helpers */

const isRoute = (s: string): s is RouteId =>
  s === "A" || s === "B" || s === "C" || s === "D" || s === "E" || s === "F";

/** The `settings` row for a key, or undefined. */
async function setting(ctx: QueryCtx, key: string) {
  return await ctx.db
    .query("settings")
    .withIndex("by_key", (q) => q.eq("key", key))
    .unique();
}

/**
 * Is all automated outbound switched on?
 *
 * Absent means on, so a fresh deployment behaves normally. Only an explicit
 * `{ enabled: false }` stops it, which is what the dashboard writes.
 */
async function outboundOn(ctx: QueryCtx): Promise<boolean> {
  const row = await setting(ctx, "outbound");
  if (!row) return true;
  return (row.value as any)?.enabled !== false;
}

/** Is this phone or email on the do-not-contact list? */
async function suppressed(ctx: QueryCtx, key?: string): Promise<boolean> {
  if (!key) return false;
  const hit = await ctx.db
    .query("suppressions")
    .withIndex("by_key", (q) => q.eq("key", key))
    .first();
  return Boolean(hit);
}

/**
 * Has this person been in touch since their sequence started?
 *
 * Any inbound event counts, on any channel: a text back, a DM, an answered
 * call, a message in the website chat. Every sequence exists only for people
 * who did not answer, so one reply stops all of it.
 *
 * Strictly after, not at or after, and that matters. Several routes are
 * started BY an inbound event: route E by a missed call, route D by a DM. That
 * event is recorded as an inbound touch a moment before the sequence row is
 * written, and on a fast machine the two can land on the same millisecond.
 * Counting it would read the thing that triggered the sequence as a reply to
 * it, and every such sequence would stop before its first step. A real reply
 * arrives at least milliseconds later.
 */
async function repliedSince(
  ctx: QueryCtx,
  leadId: Id<"leads">,
  since: number,
): Promise<boolean> {
  const inbound = await ctx.db
    .query("touches")
    .withIndex("by_lead_at", (q) => q.eq("leadId", leadId).gt("at", since))
    .collect();
  return inbound.some((t) => t.direction === "in");
}

/** Did the call on this route go unanswered? */
async function callWentUnanswered(
  ctx: QueryCtx,
  leadId: Id<"leads">,
  since: number,
): Promise<boolean> {
  const rows = await ctx.db
    .query("touches")
    .withIndex("by_lead_at", (q) => q.eq("leadId", leadId).gt("at", since))
    .collect();
  return rows.some(
    (t) =>
      t.channel === "call" && t.direction === "out" && t.status === "no_answer",
  );
}

/** Did they book since the sequence started? Then there is nothing to chase. */
async function bookedSince(
  ctx: QueryCtx,
  sessionId: string | undefined,
  since: number,
): Promise<boolean> {
  if (!sessionId) return false;
  const rows = await ctx.db
    .query("bookings")
    .withIndex("by_session", (q) => q.eq("sessionId", sessionId))
    .collect();
  return rows.some(
    (b) => b.at > since && b.status !== "cancelled",
  );
}

/** Stop every live sequence for a person, with a reason. Returns how many. */
async function stopAllFor(
  ctx: MutationCtx,
  leadId: Id<"leads">,
  reason: string,
): Promise<number> {
  const rows = await ctx.db
    .query("sequences")
    .withIndex("by_lead", (q) => q.eq("leadId", leadId))
    .collect();
  let n = 0;
  for (const r of rows) {
    if (r.status !== "active" && r.status !== "paused") continue;
    await ctx.db.patch(r._id, {
      status: "stopped",
      stopReason: reason,
      nextDueAt: undefined,
      leaseToken: undefined,
      leaseUntil: undefined,
    });
    n++;
  }
  return n;
}

/* --------------------------------------------------------- the send gate */

export type Sendable = { ok: true } | { ok: false; why: string };

/**
 * May we send to this person, on this channel, for this route?
 *
 * The single gate every send passes. There is no bypass argument, on purpose:
 * a flag that skips the consent check is a flag that eventually gets set.
 *
 * The distinction that does the work: replying to somebody's own enquiry is
 * not marketing, so routes A to E need no recorded consent to answer quickly.
 * Starting a conversation they did not ask for is marketing, and route F is
 * the only route marked that way.
 */
async function sendable(
  ctx: QueryCtx,
  lead: Doc<"leads">,
  channel: string,
  route?: RouteId,
): Promise<Sendable> {
  if (!(await outboundOn(ctx))) return { ok: false, why: "kill_switch" };

  const isEmail = channel === "email";
  const key = isEmail
    ? lead.emailKey ?? emailKey(lead.email)
    : lead.phoneKey ?? phoneKey(lead.phone);

  if (!key) return { ok: false, why: isEmail ? "no_email" : "no_phone" };
  if (await suppressed(ctx, key)) return { ok: false, why: "suppressed" };

  const marketing = route ? ROUTES[route]?.marketing === true : false;
  if (!marketing) return { ok: true };

  /* From here on it is marketing, and the rules bite. */

  if (channel === "call") {
    /* PECR regulation 19. Consent must specifically cover automated calls
       from us: general marketing consent does not, and consent for live calls
       does not either. No route currently has a marketing call step, so this
       branch should be unreachable; it is here so that adding one cannot
       quietly skip the check. */
    if (lead.automatedCallConsent !== true) {
      return { ok: false, why: "no_automated_call_consent" };
    }
    /* TPS is calls only, not texts, and applies to marketing calls. */
    if (lead.tpsListed === true) return { ok: false, why: "tps_listed" };
    if (!lead.tpsCheckedAt) return { ok: false, why: "tps_not_checked" };
    return { ok: true };
  }

  const basis = isEmail ? lead.emailConsent : lead.smsConsent;
  if (basis !== "explicit" && basis !== "soft_optin") {
    /* Absent is not consent. */
    return { ok: false, why: "no_consent" };
  }
  return { ok: true };
}

/** Exposed for the dashboard, so a screen can say why it cannot send. */
export const checkSendable = query({
  args: {
    leadId: v.id("leads"),
    channel: v.string(),
    route: v.optional(v.string()),
  },
  handler: async (ctx, { leadId, channel, route }) => {
    const lead = await ctx.db.get(leadId);
    if (!lead) return { ok: false, why: "no_such_lead" };
    const r = route && isRoute(route) ? route : undefined;
    return await sendable(ctx, lead, channel, r);
  },
});

/* ----------------------------------------------------------------- enrol */

export const enrol = mutation({
  args: {
    leadId: v.id("leads"),
    route: v.string(),
    sessionId: v.optional(v.string()),
    /* Only ever set by a deliberate batch. An ordinary enquiry has no
       campaign, and recording one for it would make every report that groups
       by campaign meaningless. */
    campaignId: v.optional(v.id("campaigns")),
  },
  handler: async (ctx, { leadId, route, sessionId, campaignId }) => {
    if (!isRoute(route)) return { enrolled: false, why: "unknown_route" };

    const lead = await ctx.db.get(leadId);
    if (!lead) return { enrolled: false, why: "no_such_lead" };

    const def = ROUTES[route];
    /* Route A finishes in the conversation and starts nothing. Saying so is
       not an error. */
    if (def.steps.length === 0 && def.immediate.length === 0) {
      return { enrolled: false, why: "route_has_no_sequence" };
    }

    if (!(await outboundOn(ctx))) {
      return { enrolled: false, why: "kill_switch" };
    }

    /* Do not contact means do not contact, including on a brand new enquiry.
       Somebody who texted STOP, or complained, or was suppressed by hand, is
       not re-enrolled because a form arrived with their number on it. Letting
       them back in is a human decision, taken on the dashboard. */
    const pk = lead.phoneKey ?? phoneKey(lead.phone);
    const ek = lead.emailKey ?? emailKey(lead.email);
    if ((await suppressed(ctx, pk)) || (await suppressed(ctx, ek))) {
      return { enrolled: false, why: "suppressed" };
    }

    /* One campaign per person. Two sequences on one lead means two texts from
       the same business in the same hour, which reads as a system out of
       control even when each one is individually sensible. */
    const existing = await ctx.db
      .query("sequences")
      .withIndex("by_lead", (q) => q.eq("leadId", leadId))
      .collect();
    const live = existing.find(
      (r) => r.status === "active" || r.status === "paused",
    );
    if (live) {
      return { enrolled: false, why: "already_active", sequenceId: live._id };
    }

    const now = Date.now();
    const first = nextStep(route, now, 0, now);

    const id = await ctx.db.insert("sequences", {
      leadId,
      sessionId: sessionId ?? lead.sessionId,
      route,
      step: first ? first.index : def.steps.length,
      status: first ? "active" : "completed",
      stopReason: first ? undefined : "exhausted",
      nextDueAt: first ? first.dueAt : undefined,
      campaignId,
      attempts: 0,
      at: now,
    });

    const immediate: Array<Record<string, unknown>> = [];
    const skipped: Array<{ key: string; channel: string; why: string }> = [];
    for (const step of def.immediate) {
      const gate = await sendable(ctx, lead, step.channel, route);
      if (!gate.ok) {
        skipped.push({ key: step.key, channel: step.channel, why: gate.why });
        continue;
      }
      let out;
      try {
        out = render(step.key, ctxOf(lead), route);
      } catch {
        skipped.push({ key: step.key, channel: step.channel, why: "render_failed" });
        continue;
      }
      immediate.push({
        key: step.key,
        channel: step.channel,
        to: step.channel === "email" ? lead.email : lead.phone,
        subject: out.subject,
        body: out.body,
        idempotencyKey: `${id}:immediate:${step.key}`,
      });
    }

    return {
      enrolled: true,
      sequenceId: id,
      route,
      /* The router sends these itself, inline, on the inbound webhook. They
         are not queued, because "inside two minutes" cannot be promised by
         something a cron drains.

         They go through the SAME gate as a queued step. That is the whole
         point of putting the gate in one function: this path reaches a
         person's phone faster than any other, so an ungated shortcut here
         would be the one that actually sends to somebody who opted out. */
      immediate,
      /* Named so the router can log why something it expected is missing,
         rather than silently sending one fewer message than the route says. */
      skipped,
      nextDueAt: first ? first.dueAt : null,
    };
  },
});

/** What a template needs to know about a person. */
function ctxOf(lead: Doc<"leads">) {
  return {
    name: lead.name,
    service: lead.service,
    message: lead.message,
  };
}

/* -------------------------------------------------------------- claimDue */

/**
 * What is ready to send, leased to this caller.
 *
 * Does rather more than a queue read, and has to: the gate checks, the
 * consent checks and the lease must all happen in one transaction, or two
 * workers can both decide a row is theirs.
 *
 * Rows that turn out not to need sending are resolved here rather than
 * returned: somebody who already replied has their sequence stopped, a step
 * whose condition no longer holds is skipped to the next one. The caller only
 * ever receives work it should actually do.
 */
export const claimDue = mutation({
  args: { limit: v.optional(v.number()), leaseMs: v.optional(v.number()) },
  handler: async (ctx, { limit, leaseMs }) => {
    const now = Date.now();
    const want = Math.min(Math.max(limit ?? 25, 1), 50);
    const lease = leaseMs ?? LEASE_MS;

    if (!(await outboundOn(ctx))) {
      return { claimed: [], skipped: 0, reason: "kill_switch" };
    }

    const due = await ctx.db
      .query("sequences")
      .withIndex("by_due", (q) =>
        q.eq("status", "active").lte("nextDueAt", now),
      )
      /* Over-read, because some of these will be leased or will resolve to
         nothing, and a short read that returns an empty batch would stall the
         queue for a minute. */
      .take(want * 3);

    const claimed: any[] = [];
    let skipped = 0;

    for (const seq of due) {
      if (claimed.length >= want) break;

      /* Somebody else has this row and has not finished with it. */
      if (seq.leaseUntil && seq.leaseUntil > now) {
        skipped++;
        continue;
      }

      const route = seq.route;
      if (!isRoute(route)) {
        await ctx.db.patch(seq._id, {
          status: "failed",
          stopReason: "unknown_route",
          nextDueAt: undefined,
        });
        skipped++;
        continue;
      }

      const lead = await ctx.db.get(seq.leadId);
      if (!lead) {
        await ctx.db.patch(seq._id, {
          status: "stopped",
          stopReason: "no_such_lead",
          nextDueAt: undefined,
        });
        skipped++;
        continue;
      }

      /* ---- did the reason for chasing them go away? ---- */

      if (await repliedSince(ctx, seq.leadId, seq.at)) {
        await stopAllFor(ctx, seq.leadId, "replied");
        skipped++;
        continue;
      }
      if (await bookedSince(ctx, seq.sessionId, seq.at)) {
        await stopAllFor(ctx, seq.leadId, "booked");
        skipped++;
        continue;
      }

      const step = stepAt(route, seq.step);
      if (!step) {
        await ctx.db.patch(seq._id, {
          status: "completed",
          stopReason: "exhausted",
          nextDueAt: undefined,
        });
        skipped++;
        continue;
      }

      /* ---- does this particular step still apply? ---- */

      if (step.gate === "call_no_answer") {
        const unanswered = await callWentUnanswered(ctx, seq.leadId, seq.at);
        if (!unanswered) {
          /* The call was answered, or never happened. Either way this text
             would make no sense, so move past it without sending. */
          await advance(ctx, seq, route, now, 0);
          skipped++;
          continue;
        }
      }

      /* ---- may we send at all? ---- */

      const gate = await sendable(ctx, lead, step.channel, route);
      if (!gate.ok) {
        if (
          gate.why === "no_phone" ||
          gate.why === "no_email" ||
          gate.why === "no_automated_call_consent" ||
          gate.why === "tps_listed" ||
          gate.why === "tps_not_checked"
        ) {
          /* We cannot do this step, but a later one on another channel may
             still be fine: no email does not mean no texting. */
          await advance(ctx, seq, route, now, 0);
        } else {
          /* Suppressed, or no consent, or the switch is off. Nothing on this
             route is sendable, so stop rather than walking the steps. */
          await ctx.db.patch(seq._id, {
            status: "stopped",
            stopReason: gate.why,
            nextDueAt: undefined,
            leaseToken: undefined,
            leaseUntil: undefined,
          });
        }
        skipped++;
        continue;
      }

      /* ---- did this step already go out? ----

         The lease stops two runs claiming at once, but it expires, and a
         worker that sent the text and then died before reporting back leaves
         the row claimable again. Re-claiming is right; re-sending is not.

         `recordTouch` is idempotent, so the log would stay correct, but the
         log is written AFTER the send. Only this check stops the second text
         actually leaving. */
      const idem = `${seq._id}:${seq.step}`;
      const already = await ctx.db
        .query("touches")
        .withIndex("by_idem", (q) => q.eq("idempotencyKey", idem))
        .first();
      if (already && already.status !== "failed") {
        await advance(ctx, seq, route, now, 0);
        skipped++;
        continue;
      }

      /* ---- it is real work. Lease it and render it. ---- */

      let body: string;
      let subject: string | undefined;
      try {
        const out = render(step.key, ctxOf(lead), route);
        body = out.body;
        subject = out.subject;
      } catch (e) {
        /* A template that will not render must not become an empty text. */
        await ctx.db.patch(seq._id, {
          status: "failed",
          stopReason: "render_failed",
          nextDueAt: undefined,
        });
        skipped++;
        continue;
      }

      const token = crypto.randomUUID();
      await ctx.db.patch(seq._id, {
        leaseToken: token,
        leaseUntil: now + lease,
      });

      claimed.push({
        sequenceId: seq._id,
        leaseToken: token,
        leadId: seq.leadId,
        sessionId: seq.sessionId,
        route,
        step: seq.step,
        stepKey: step.key,
        channel: step.channel,
        to: step.channel === "email" ? lead.email : lead.phone,
        name: lead.name,
        subject,
        body,
        /* The worker passes this straight to `recordTouch`. A re-run of the
           same step can therefore never produce a second send. */
        idempotencyKey: idem,
      });
    }

    return { claimed, skipped, now };
  },
});

/** Move a sequence to its next applicable step, or finish it. */
async function advance(
  ctx: MutationCtx,
  seq: Doc<"sequences">,
  route: RouteId,
  now: number,
  attemptDelta: number,
) {
  const next = nextStep(route, seq.at, seq.step + 1, now);
  if (!next) {
    await ctx.db.patch(seq._id, {
      status: "completed",
      stopReason: "exhausted",
      nextDueAt: undefined,
      lastStepAt: now,
      leaseToken: undefined,
      leaseUntil: undefined,
      attempts: seq.attempts + attemptDelta,
    });
    return;
  }
  await ctx.db.patch(seq._id, {
    step: next.index,
    nextDueAt: next.dueAt,
    lastStepAt: now,
    leaseToken: undefined,
    leaseUntil: undefined,
    attempts: seq.attempts + attemptDelta,
  });
}

/* ---------------------------------------------------------- completeStep */

/**
 * The worker reporting back on a claimed step.
 *
 * The lease token is checked first and a stale one is refused. That refusal is
 * the thing that makes a double send impossible: a worker whose lease expired
 * while it was sending cannot also advance the row, so the row is picked up
 * once more by whoever holds the current lease, and `recordTouch`'s
 * idempotency key stops the second send landing.
 */
export const completeStep = mutation({
  args: {
    sequenceId: v.id("sequences"),
    leaseToken: v.string(),
    outcome: v.string(), // sent | failed | stop
    reason: v.optional(v.string()),
  },
  handler: async (ctx, { sequenceId, leaseToken, outcome, reason }) => {
    const seq = await ctx.db.get(sequenceId);
    if (!seq) return { ok: false, why: "no_such_sequence" };

    if (!seq.leaseToken || seq.leaseToken !== leaseToken) {
      /* Either somebody else holds it now, or this worker is reporting on a
         lease that expired. Refuse, and say so plainly. */
      return { ok: false, why: "stale_lease" };
    }

    const now = Date.now();
    const route = seq.route;
    if (!isRoute(route)) {
      await ctx.db.patch(sequenceId, {
        status: "failed",
        stopReason: "unknown_route",
        nextDueAt: undefined,
        leaseToken: undefined,
        leaseUntil: undefined,
      });
      return { ok: true, status: "failed" };
    }

    if (outcome === "stop") {
      await ctx.db.patch(sequenceId, {
        status: "stopped",
        stopReason: reason ?? "manual",
        nextDueAt: undefined,
        leaseToken: undefined,
        leaseUntil: undefined,
      });
      return { ok: true, status: "stopped" };
    }

    if (outcome === "failed") {
      const attempts = seq.attempts + 1;
      if (attempts >= MAX_ATTEMPTS) {
        await ctx.db.patch(sequenceId, {
          status: "failed",
          stopReason: reason ?? "send_failed",
          attempts,
          nextDueAt: undefined,
          leaseToken: undefined,
          leaseUntil: undefined,
        });
        return { ok: true, status: "failed", attempts };
      }
      /* Retry the same step shortly, rather than losing it. */
      await ctx.db.patch(sequenceId, {
        attempts,
        nextDueAt: now + RETRY_MS,
        leaseToken: undefined,
        leaseUntil: undefined,
      });
      return { ok: true, status: "retrying", attempts, nextDueAt: now + RETRY_MS };
    }

    /* Sent. */
    await advance(ctx, seq, route, now, 1);
    const after = await ctx.db.get(sequenceId);
    return { ok: true, status: after?.status, nextDueAt: after?.nextDueAt ?? null };
  },
});

/* ------------------------------------------------------------------ stop */

export const stopSequences = mutation({
  args: { leadId: v.id("leads"), reason: v.string() },
  handler: async (ctx, { leadId, reason }) => {
    const stopped = await stopAllFor(ctx, leadId, reason);
    return { stopped };
  },
});

/* ----------------------------------------------------------- recordTouch */

/**
 * Append one event to the timeline.
 *
 * Idempotent on `idempotencyKey`. A webhook Twilio retries, or a worker run
 * re-run by hand, returns the row that already exists rather than writing a
 * second one. The caller is told which happened, so it can decline to send
 * again.
 */
export const recordTouch = mutation({
  args: {
    leadId: v.optional(v.id("leads")),
    sessionId: v.optional(v.string()),
    direction: v.string(),
    channel: v.string(),
    route: v.optional(v.string()),
    step: v.optional(v.number()),
    status: v.string(),
    providerId: v.optional(v.string()),
    body: v.optional(v.string()),
    error: v.optional(v.string()),
    idempotencyKey: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (args.idempotencyKey) {
      const seen = await ctx.db
        .query("touches")
        .withIndex("by_idem", (q) => q.eq("idempotencyKey", args.idempotencyKey))
        .first();
      if (seen) return { id: seen._id, created: false };
    }
    const id = await ctx.db.insert("touches", {
      ...args,
      body: args.body ? args.body.slice(0, 4000) : undefined,
      at: Date.now(),
    });
    return { id, created: true };
  },
});

/** Update the status of an already-recorded touch, by its provider id. */
export const updateTouchStatus = mutation({
  args: {
    providerId: v.string(),
    status: v.string(),
    error: v.optional(v.string()),
  },
  handler: async (ctx, { providerId, status, error }) => {
    const row = await ctx.db
      .query("touches")
      .withIndex("by_provider", (q) => q.eq("providerId", providerId))
      .first();
    if (!row) return { ok: false, why: "no_such_touch" };
    await ctx.db.patch(row._id, { status, error });
    return { ok: true };
  },
});

/* --------------------------------------------------------- consent, stop */

export const logConsent = mutation({
  args: {
    leadId: v.optional(v.id("leads")),
    phoneKey: v.optional(v.string()),
    emailKey: v.optional(v.string()),
    kind: v.string(),
    action: v.string(),
    basis: v.optional(v.string()),
    evidence: v.optional(v.string()),
    source: v.optional(v.string()),
    by: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const at = Date.now();
    const id = await ctx.db.insert("consentEvents", { ...args, at });

    /* Keep the flags on the lead in step with the evidence. The evidence is
       what counts; these are a cache of it so a send is one read. */
    if (args.leadId) {
      const lead = await ctx.db.get(args.leadId);
      if (lead) {
        const patch: Record<string, unknown> = {};
        const granted = args.action === "granted" || args.action === "soft_optin_recorded";
        const basis = args.basis ?? (args.action === "soft_optin_recorded" ? "soft_optin" : "explicit");

        if (args.kind === "sms_marketing") {
          patch.smsConsent = granted ? basis : "none";
        } else if (args.kind === "email_marketing") {
          patch.emailConsent = granted ? basis : "none";
        } else if (args.kind === "automated_call") {
          patch.automatedCallConsent = granted;
        } else if (args.action === "tps_checked") {
          patch.tpsCheckedAt = at;
          /* `basis` carries "listed" or "clear" for a TPS check. */
          patch.tpsListed = args.basis === "listed";
        }
        if (Object.keys(patch).length) await ctx.db.patch(args.leadId, patch);
      }
    }
    return { id };
  },
});

/**
 * Add somebody to the do-not-contact list, and stop anything in flight.
 *
 * Both halves matter. Recording the opt-out without stopping the sequence
 * means the next step still goes out, which is exactly what the person just
 * asked us not to do.
 */
export const suppress = mutation({
  args: {
    key: v.string(),
    kind: v.string(), // phone | email
    reason: v.string(),
    note: v.optional(v.string()),
  },
  handler: async (ctx, { key, kind, reason, note }) => {
    const norm = kind === "email" ? emailKey(key) : phoneKey(key);
    const k = norm ?? key;

    const seen = await ctx.db
      .query("suppressions")
      .withIndex("by_key", (q) => q.eq("key", k))
      .first();
    if (!seen) {
      await ctx.db.insert("suppressions", {
        key: k,
        kind,
        reason,
        note,
        at: Date.now(),
      });
    }

    /* Stop every sequence for whoever holds that number or address. */
    const leads =
      kind === "email"
        ? await ctx.db
            .query("leads")
            .withIndex("by_email_key", (q) => q.eq("emailKey", k))
            .collect()
        : await ctx.db
            .query("leads")
            .withIndex("by_phone_key", (q) => q.eq("phoneKey", k))
            .collect();

    let stopped = 0;
    for (const lead of leads) {
      stopped += await stopAllFor(ctx, lead._id, "opted_out");
      await ctx.db.patch(lead._id, {
        smsConsent: kind === "phone" ? "none" : lead.smsConsent,
        emailConsent: kind === "email" ? "none" : lead.emailConsent,
        automatedCallConsent: kind === "phone" ? false : lead.automatedCallConsent,
      });
      await ctx.db.insert("consentEvents", {
        leadId: lead._id,
        phoneKey: kind === "phone" ? k : undefined,
        emailKey: kind === "email" ? k : undefined,
        kind: kind === "email" ? "email_marketing" : "sms_marketing",
        action: "withdrawn",
        evidence: note ?? reason,
        source: reason,
        at: Date.now(),
      });
    }

    return { key: k, alreadyListed: Boolean(seen), stopped, leads: leads.length };
  },
});

export const isSuppressed = query({
  args: { key: v.string(), kind: v.optional(v.string()) },
  handler: async (ctx, { key, kind }) => {
    const norm = kind === "email" ? emailKey(key) : phoneKey(key);
    return { suppressed: await suppressed(ctx, norm ?? key) };
  },
});

/* ------------------------------------------------------------ kill switch */

export const outboundEnabled = query({
  args: {},
  handler: async (ctx) => {
    const row = await setting(ctx, "outbound");
    return {
      enabled: row ? (row.value as any)?.enabled !== false : true,
      updatedAt: row?.updatedAt ?? null,
      updatedBy: row?.updatedBy ?? null,
    };
  },
});

export const setOutbound = mutation({
  args: { enabled: v.boolean(), by: v.optional(v.string()) },
  handler: async (ctx, { enabled, by }) => {
    const row = await setting(ctx, "outbound");
    const at = Date.now();
    if (row) {
      await ctx.db.patch(row._id, {
        value: { enabled },
        updatedAt: at,
        updatedBy: by,
      });
    } else {
      await ctx.db.insert("settings", {
        key: "outbound",
        value: { enabled },
        updatedAt: at,
        updatedBy: by,
      });
    }
    return { enabled, at };
  },
});

/* --------------------------------------------------------------- reading */

/**
 * One person's whole history, in order.
 *
 * Touches, conversation messages, bookings and open questions merged on time.
 * The dashboard's existing conversation page shows three separate lists and
 * leaves the reader to interleave them, which is why "what did we actually do
 * about this lead" is currently hard to answer.
 */
export const leadTimeline = query({
  args: { leadId: v.id("leads"), limit: v.optional(v.number()) },
  handler: async (ctx, { leadId, limit }) => {
    const lead = await ctx.db.get(leadId);
    if (!lead) return null;
    const cap = Math.min(limit ?? 300, 500);

    const touches = await ctx.db
      .query("touches")
      .withIndex("by_lead_at", (q) => q.eq("leadId", leadId))
      .order("desc")
      .take(cap);

    /* Every session this person has had, so a conversation from last week
       appears beside the text we sent this morning. */
    const sessionIds = new Set<string>();
    if (lead.sessionId) sessionIds.add(lead.sessionId);
    for (const vid of lead.visitorIds ?? []) {
      const sessions = await ctx.db
        .query("sessions")
        .withIndex("by_visitor", (q) => q.eq("visitorId", vid))
        .take(20);
      for (const s of sessions) sessionIds.add(s.sessionId);
    }

    const events: any[] = touches.map((t) => ({
      at: t.at,
      type: "touch",
      direction: t.direction,
      channel: t.channel,
      status: t.status,
      route: t.route,
      step: t.step,
      text: t.body,
      error: t.error,
    }));

    for (const sid of sessionIds) {
      const msgs = await ctx.db
        .query("messages")
        .withIndex("by_session_at", (q) => q.eq("sessionId", sid))
        .order("desc")
        .take(120);
      for (const m of msgs) {
        events.push({
          at: m.at,
          type: "message",
          direction: m.role === "user" ? "in" : "out",
          channel: m.channel,
          role: m.role,
          text: m.text,
          sessionId: sid,
        });
      }
      const books = await ctx.db
        .query("bookings")
        .withIndex("by_session", (q) => q.eq("sessionId", sid))
        .collect();
      for (const b of books) {
        events.push({
          at: b.at,
          type: "booking",
          status: b.status,
          reference: b.reference,
          text: `${b.service} on ${b.preferredDate} at ${b.preferredTime}`,
        });
      }
    }

    const sequences = await ctx.db
      .query("sequences")
      .withIndex("by_lead", (q) => q.eq("leadId", leadId))
      .collect();

    events.sort((a, b) => a.at - b.at);

    return {
      lead: {
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        service: lead.service,
        sourceChannel: lead.sourceChannel ?? null,
        attribution: lead.attribution ?? null,
        smsConsent: lead.smsConsent ?? null,
        emailConsent: lead.emailConsent ?? null,
        automatedCallConsent: lead.automatedCallConsent ?? null,
        tpsCheckedAt: lead.tpsCheckedAt ?? null,
        tpsListed: lead.tpsListed ?? null,
        status: lead.status,
        outcome: lead.outcome ?? null,
        valueGbp: lead.valueGbp ?? null,
        lostReason: lead.lostReason ?? null,
        hot: lead.hot,
        firstAt: lead.firstAt ?? lead.at,
        at: lead.at,
        visits: lead.visits ?? 1,
        sessionId: lead.sessionId,
      },
      sequences: sequences.map((s) => ({
        id: s._id,
        route: s.route,
        step: s.step,
        status: s.status,
        stopReason: s.stopReason ?? null,
        nextDueAt: s.nextDueAt ?? null,
        attempts: s.attempts,
        at: s.at,
      })),
      events: events.slice(-cap),
    };
  },
});

/**
 * One row per lead, with the facts the channel report is computed from.
 *
 * Deliberately NOT aggregated here. Every figure on every screen has to leave
 * out our own test traffic, and the rule for what counts as a test row lives
 * in one place on the dashboard side (`lib/dashboard/test-rows.ts`). A second
 * copy of that rule in Convex would drift from the first, and a number that
 * counts a row as real on one screen and as a test on another is worse than
 * either answer alone. So the raw facts come back and the dashboard filters,
 * then totals.
 */
export const channelFacts = query({
  args: { sinceMs: v.optional(v.number()), limit: v.optional(v.number()) },
  handler: async (ctx, { sinceMs, limit }) => {
    const since = sinceMs ?? 0;
    const cap = Math.min(limit ?? 1000, 2000);

    const leads = await ctx.db
      .query("leads")
      .withIndex("by_at")
      .order("desc")
      .take(cap);

    const rows: any[] = [];
    for (const lead of leads) {
      const firstAt = lead.firstAt ?? lead.at;
      if (firstAt < since) continue;

      const touches = await ctx.db
        .query("touches")
        .withIndex("by_lead_at", (q) => q.eq("leadId", lead._id))
        .take(200);

      const out = touches.filter((t) => t.direction === "out");
      const inb = touches.filter((t) => t.direction === "in");
      const firstOut = out.length ? Math.min(...out.map((t) => t.at)) : null;
      const firstIn = inb.length ? Math.min(...inb.map((t) => t.at)) : null;

      const seqs = await ctx.db
        .query("sequences")
        .withIndex("by_lead", (q) => q.eq("leadId", lead._id))
        .collect();

      const bookings = lead.sessionId
        ? await ctx.db
            .query("bookings")
            .withIndex("by_session", (q) => q.eq("sessionId", lead.sessionId))
            .collect()
        : [];

      rows.push({
        /* Enough to apply the shared test-row rule on the other side. */
        sessionId: lead.sessionId,
        name: lead.name,
        email: lead.email,

        sourceChannel: lead.sourceChannel ?? "unknown",
        campaign: lead.attribution?.campaign ?? null,
        adId: lead.attribution?.adId ?? null,
        firstAt,
        hot: lead.hot,
        status: lead.status,
        outcome: lead.outcome ?? null,
        valueGbp: lead.valueGbp ?? null,

        /* Time to first touch, the measure the paper puts first. */
        firstOutAt: firstOut,
        msToFirstTouch: firstOut ? firstOut - firstAt : null,
        firstInAt: firstIn,
        msToFirstReply: firstIn ? firstIn - firstAt : null,

        smsOut: out.filter((t) => t.channel === "sms").length,
        smsIn: inb.filter((t) => t.channel === "sms").length,
        emailOut: out.filter((t) => t.channel === "email").length,
        callsOut: out.filter((t) => t.channel === "call").length,
        callsAnswered: out.filter(
          (t) => t.channel === "call" && t.status === "answered",
        ).length,

        sequences: seqs.map((s) => ({
          route: s.route,
          status: s.status,
          stopReason: s.stopReason ?? null,
        })),
        bookings: bookings.filter((b) => b.status !== "cancelled").length,
      });
    }
    return { rows, since, counted: rows.length };
  },
});

/* =========================================================================
   Confirmations.

   Not part of any route: a confirmation is owed because something happened,
   not because somebody did not reply. It is drained by the same worker so it
   goes through the same gate, the same idempotency key and the same touch
   log; a second sending path would be a second place for consent to be
   forgotten.
   ========================================================================= */

/**
 * Give older leads the normalised keys the rest of the system matches on.
 *
 * `phoneKey` and `emailKey` were added after some of these rows were written,
 * so a lead captured months ago has a phone number but nothing to match it
 * against. That is not cosmetic: an inbound text from that person would not
 * find them, so their reply would not stop the follow-up and would not appear
 * on their timeline.
 *
 * Safe to run more than once: it only fills what is empty.
 */
export const backfillKeys = mutation({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, { limit }) => {
    const cap = Math.min(limit ?? 500, 2000);
    const leads = await ctx.db.query("leads").take(cap);

    let phones = 0;
    let emails = 0;
    for (const lead of leads) {
      const patch: Record<string, unknown> = {};
      if (!lead.phoneKey) {
        const pk = phoneKey(lead.phone);
        if (pk) {
          patch.phoneKey = pk;
          phones++;
        }
      }
      if (!lead.emailKey) {
        const ek = emailKey(lead.email);
        if (ek) {
          patch.emailKey = ek;
          emails++;
        }
      }
      if (Object.keys(patch).length) await ctx.db.patch(lead._id, patch);
    }
    return { examined: leads.length, phones, emails };
  },
});

/* A mutation, not a query, for the same reason `claimDue` is one: it does not
   only read. Somebody who has opted out has their confirmation marked as
   handled here rather than being re-examined every minute for ever. */
/* How recent a booking has to be for a confirmation to still make sense.

   A confirmation is a reply to something that just happened. Texting somebody
   "your appointment is booked" about a booking they made a fortnight ago is
   not a confirmation, it is a confusing message out of nowhere, and for a
   date that has already passed it is worse than that.

   This also handles the first run on an existing database. Turning the
   feature on found nineteen old bookings that had never been confirmed,
   because the feature did not exist when they were made. They are not owed
   one. */
const CONFIRM_WITHIN_MS = 24 * 60 * 60 * 1000;

export const pendingConfirmations = mutation({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, { limit }) => {
    const cap = Math.min(limit ?? 25, 50);
    if (!(await outboundOn(ctx))) return { items: [], reason: "kill_switch" };
    const now = Date.now();

    const rows = await ctx.db
      .query("bookings")
      .withIndex("by_status", (q) => q.eq("status", "requested"))
      .order("desc")
      .take(cap * 3);

    const confirmed = await ctx.db
      .query("bookings")
      .withIndex("by_status", (q) => q.eq("status", "confirmed"))
      .order("desc")
      .take(cap * 3);

    const items: Array<Record<string, unknown>> = [];
    for (const b of [...rows, ...confirmed]) {
      if (items.length >= cap) break;
      if (b.confirmationSentAt) continue;

      /* Too old to confirm. Marked rather than skipped, so it is not
         re-examined on every run for ever. */
      if (now - b.at > CONFIRM_WITHIN_MS) {
        await ctx.db.patch(b._id, { confirmationSentAt: now });
        continue;
      }

      /* No number, or one that is not a usable number. `phoneKey` is the same
         normaliser the rest of the system matches on, so anything it rejects
         would not have reached a handset anyway. */
      if (!b.phone || !phoneKey(b.phone)) {
        await ctx.db.patch(b._id, { confirmationSentAt: now });
        continue;
      }

      /* Who is this, so the gate has somebody to check. */
      const pk = phoneKey(b.phone);
      const lead = pk
        ? await ctx.db
            .query("leads")
            .withIndex("by_phone_key", (q) => q.eq("phoneKey", pk))
            .order("desc")
            .first()
        : null;

      /* Suppression applies to a confirmation too. Somebody who has told us
         to stop has told us to stop; the booking details are in their email
         and the team can ring them. */
      if (await suppressed(ctx, pk)) {
        await ctx.db.patch(b._id, { confirmationSentAt: now });
        continue;
      }

      let body: string;
      try {
        body = render("booking_confirmed", {
          name: b.name,
          service: b.service,
          reference: b.reference,
          preferredDate: b.preferredDate,
          preferredTime: b.preferredTime,
        }).body;
      } catch {
        continue;
      }

      items.push({
        kind: "confirmation",
        bookingId: b._id,
        leadId: lead?._id,
        sessionId: b.sessionId,
        channel: "sms",
        to: b.phone,
        name: b.name,
        body,
        /* The booking id, not the step: a confirmation happens once per
           booking and must survive a re-run of the worker. */
        idempotencyKey: `booking:${b._id}:confirmed`,
      });
    }
    return { items, count: items.length };
  },
});

export const markConfirmationSent = mutation({
  args: { bookingId: v.id("bookings") },
  handler: async (ctx, { bookingId }) => {
    const b = await ctx.db.get(bookingId);
    if (!b) return { ok: false, why: "no_such_booking" };
    await ctx.db.patch(bookingId, { confirmationSentAt: Date.now() });
    return { ok: true };
  },
});

/**
 * Who does this phone number or email address belong to?
 *
 * The inbound workflow needs this. Twilio hands us a number and some text and
 * nothing else, but a reply only stops a sequence if it is recorded against
 * the right person: `recordTouch` with no `leadId` writes a row that
 * `repliedSince` will never look at, so the follow-up would carry on texting
 * somebody who has already answered.
 *
 * Matching is on the normalised key, so "07700 900123" finds the person
 * stored as "+447700900123".
 */
export const findLead = query({
  args: { phone: v.optional(v.string()), email: v.optional(v.string()) },
  handler: async (ctx, { phone, email }) => {
    const pk = phoneKey(phone);
    const ek = emailKey(email);

    let lead = null;
    if (pk) {
      lead = await ctx.db
        .query("leads")
        .withIndex("by_phone_key", (q) => q.eq("phoneKey", pk))
        .order("desc")
        .first();
    }
    if (!lead && ek) {
      lead = await ctx.db
        .query("leads")
        .withIndex("by_email_key", (q) => q.eq("emailKey", ek))
        .order("desc")
        .first();
    }
    if (!lead) return { found: false, phoneKey: pk ?? null, emailKey: ek ?? null };

    const live = await ctx.db
      .query("sequences")
      .withIndex("by_lead", (q) => q.eq("leadId", lead._id))
      .collect();
    const active = live.find((r) => r.status === "active" || r.status === "paused");

    return {
      found: true,
      leadId: lead._id,
      sessionId: lead.sessionId,
      name: lead.name,
      phoneKey: lead.phoneKey ?? pk ?? null,
      emailKey: lead.emailKey ?? ek ?? null,
      sourceChannel: lead.sourceChannel ?? null,
      /* So the inbound workflow can say "stopped a sequence" rather than
         guessing whether there was one. */
      activeSequenceId: active?._id ?? null,
      activeRoute: active?.route ?? null,
    };
  },
});

/* ----------------------------------------------------------- the outcome */

const OUTCOMES = new Set(["open", "quoted", "won", "lost", "unqualified"]);

/**
 * What came of a lead, set by a person.
 *
 * Deliberately not inferable. A booking is not a deal and a long conversation
 * is not a sale, so nothing automated writes this: the assistant knows what
 * was said, not what was signed. It is the only field on a lead that a human
 * owns outright, and it is what turns "which channel produces leads" into
 * "which channel produces business".
 */
export const setOutcome = mutation({
  args: {
    leadId: v.id("leads"),
    outcome: v.string(),
    valueGbp: v.optional(v.number()),
    lostReason: v.optional(v.string()),
    by: v.optional(v.string()),
  },
  handler: async (ctx, { leadId, outcome, valueGbp, lostReason, by }) => {
    if (!OUTCOMES.has(outcome)) return { ok: false, why: "unknown_outcome" };
    const lead = await ctx.db.get(leadId);
    if (!lead) return { ok: false, why: "no_such_lead" };

    await ctx.db.patch(leadId, {
      outcome,
      /* A value only belongs on a won deal. Leaving a figure behind on a
         lead that later went to "lost" would quietly inflate every revenue
         total that groups by channel. */
      valueGbp: outcome === "won" ? valueGbp : undefined,
      lostReason: outcome === "lost" ? lostReason : undefined,
      outcomeAt: Date.now(),
      outcomeBy: by,
      /* Keep the pipeline status in step, so the older screens that read it
         do not disagree with the newer ones that read this.

         Reopening has to work in both directions. A lead marked lost and then
         corrected back to "quoted" was staying `closed`, so it stayed off
         every open-pipeline list while showing as live on the new ones. */
      status:
        outcome === "won" || outcome === "lost" || outcome === "unqualified"
          ? "closed"
          : outcome === "quoted"
            ? "contacted"
            : /* "open": new if nothing has happened yet, otherwise back in play. */
              lead.status === "new"
              ? "new"
              : "contacted",
    });
    return { ok: true, outcome };
  },
});

/**
 * The same thing, for many leads at once.
 *
 * The most common thing anybody wants to do on the Leads table: select the
 * twenty Facebook leads that went nowhere and mark them all "not a fit".
 * One row at a time is twenty round trips, which in practice means it does
 * not get done, which leaves every channel report measuring volume rather
 * than business.
 *
 * It calls `setOutcome` per lead rather than patching rows itself. The
 * mapping from an outcome to the pipeline `status` is fiddly (reopening a
 * lost lead to "quoted" has to clear `closed`, and that was a bug once), so
 * there is exactly one copy of it and the bulk path cannot drift from the
 * single one.
 *
 * **No value argument, deliberately.** A figure belongs to one deal, and
 * setting the same one on twenty leads would invent revenue. Marking twenty
 * as won in bulk is allowed and leaves every value unset, which is honest:
 * the report shows nothing rather than a zero.
 */
export const setOutcomeMany = mutation({
  args: {
    leadIds: v.array(v.id("leads")),
    outcome: v.string(),
    by: v.optional(v.string()),
  },
  handler: async (ctx, { leadIds, outcome, by }) => {
    if (!OUTCOMES.has(outcome)) return { ok: false, why: "unknown_outcome" };
    if (!leadIds.length) return { ok: false, why: "nothing_selected" };
    /* Capped. This is one transaction, and an unbounded "select all" on a
       table that will hold thousands of rows is a transaction that fails
       halfway with no way to tell what it did. */
    if (leadIds.length > 200) return { ok: false, why: "too_many" };

    let changed = 0;
    const refused: string[] = [];
    for (const leadId of leadIds) {
      const r = (await ctx.runMutation(api.routing.setOutcome, {
        leadId,
        outcome,
        by,
      })) as { ok: boolean };
      if (r.ok) changed += 1;
      else refused.push(leadId);
    }
    return { ok: true, changed, refused, outcome };
  },
});

/* =========================================================================
   The inbox.

   One list, every channel, newest first. The package sells "one assistant
   across the website, the phone, Facebook, Instagram, WhatsApp and SMS", and
   until now there was nowhere those arrived together: website chats were on
   the handover screen and nothing else was anywhere.

   Built from `touches` and `messages` rather than from a new table, because
   both already record everything that is sent or received. A channel that
   goes live later appears here the moment it writes its first touch, with no
   change to this function.
   ========================================================================= */

export const inboxFeed = query({
  args: { limit: v.optional(v.number()), sinceMs: v.optional(v.number()) },
  handler: async (ctx, { limit, sinceMs }) => {
    const cap = Math.min(limit ?? 120, 300);
    const since = sinceMs ?? Date.now() - 30 * 24 * 60 * 60 * 1000;

    /* Every outbound and inbound event on a real channel. */
    const touches = await ctx.db
      .query("touches")
      .withIndex("by_lead_at")
      .order("desc")
      .take(cap * 2);

    /* Website conversations, which live in `messages` rather than `touches`
       because they are a live chat rather than something we sent out. */
    const sessions = await ctx.db.query("sessions").order("desc").take(cap);

    type Item = {
      at: number;
      channel: string;
      direction: string;
      text: string;
      who: string | null;
      sessionId: string | null;
      leadId: string | null;
      sourceChannel: string | null;
      needsPerson: boolean;
      status: string | null;
    };
    const items: Item[] = [];
    const leadCache = new Map<string, Doc<"leads"> | null>();

    async function leadOf(id?: Id<"leads"> | null) {
      if (!id) return null;
      if (!leadCache.has(id)) leadCache.set(id, await ctx.db.get(id));
      return leadCache.get(id) ?? null;
    }

    for (const t of touches) {
      if (t.at < since) continue;
      const lead = await leadOf(t.leadId);
      items.push({
        at: t.at,
        channel: t.channel,
        direction: t.direction,
        text: t.body ?? "",
        who: lead?.name ?? null,
        sessionId: t.sessionId ?? lead?.sessionId ?? null,
        leadId: t.leadId ?? null,
        sourceChannel: lead?.sourceChannel ?? null,
        needsPerson: false,
        status: t.status,
      });
    }

    for (const s of sessions) {
      if (s.lastSeenAt < since) continue;
      const last = await ctx.db
        .query("messages")
        .withIndex("by_session_at", (q) => q.eq("sessionId", s.sessionId))
        .order("desc")
        .first();
      if (!last) continue;
      const lead = await ctx.db
        .query("leads")
        .withIndex("by_session", (q) => q.eq("sessionId", s.sessionId))
        .first();
      items.push({
        at: last.at,
        channel: s.channel === "voice" ? "voice" : "chat",
        direction: last.role === "user" ? "in" : "out",
        text: last.text,
        who: lead?.name ?? null,
        sessionId: s.sessionId,
        leadId: lead?._id ?? null,
        sourceChannel: lead?.sourceChannel ?? s.sourceChannel ?? null,
        /* Somebody is on the other end of this one, right now. */
        needsPerson: s.handover === "waiting" || s.handover === "live",
        status: null,
      });
    }

    items.sort((a, b) => b.at - a.at);
    return { items: items.slice(0, cap), since };
  },
});

/** The queue, for the dashboard: what is active and what is coming next. */
export const sequenceBoard = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, { limit }) => {
    const cap = Math.min(limit ?? 100, 300);
    const rows = await ctx.db.query("sequences").order("desc").take(cap);

    const out: any[] = [];
    for (const s of rows) {
      const lead = await ctx.db.get(s.leadId);
      const step = isRoute(s.route) ? stepAt(s.route, s.step) : undefined;
      out.push({
        id: s._id,
        leadId: s.leadId,
        sessionId: s.sessionId,
        name: lead?.name ?? null,
        phone: lead?.phone ?? null,
        sourceChannel: lead?.sourceChannel ?? null,
        email: lead?.email ?? null,
        route: s.route,
        routeName: isRoute(s.route) ? ROUTES[s.route].name : s.route,
        step: s.step,
        stepLabel: step?.label ?? null,
        stepChannel: step?.channel ?? null,
        status: s.status,
        stopReason: s.stopReason ?? null,
        nextDueAt: s.nextDueAt ?? null,
        attempts: s.attempts,
        at: s.at,
        leased: Boolean(s.leaseUntil && s.leaseUntil > Date.now()),
      });
    }
    const counts = {
      active: out.filter((r) => r.status === "active").length,
      stopped: out.filter((r) => r.status === "stopped").length,
      completed: out.filter((r) => r.status === "completed").length,
      failed: out.filter((r) => r.status === "failed").length,
    };
    /* The clock that set every `nextDueAt`, handed back with them. Judging
       "due in the next hour" against the web server's clock instead would
       compare two machines' time, and the drift shows up as a step that
       looks overdue on one screen and not on another. */
    return { rows: out, counts, now: Date.now() };
  },
});
