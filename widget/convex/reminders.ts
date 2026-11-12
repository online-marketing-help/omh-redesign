import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { api } from "./_generated/api";
import { londonInstant } from "../gates/availability.js";

/* =========================================================================
   Reminding somebody about an appointment, and stopping when there is
   nothing to remind them about.

   The engine times every other route forward from enrolment. A reminder is
   the only thing timed BACKWARDS from a moment in the diary, which is why
   `sequences.anchorAt` exists and why route H's steps use `beforeMs`.

   The risk here is not a missed reminder. It is reminding somebody about
   an appointment they cancelled: that tells them nobody was listening, and
   it is worse than never reminding them at all. So cancelling stops the
   sequence, and moving re-times it rather than leaving the old moment
   standing.
   ========================================================================= */

/** The appointment as an instant. London, because that is what OMH works in
    and what the visitor picked; a server in UTC must not shift it. */
function appointmentAt(date: string, time: string): number {
  const at = londonInstant(`${String(date).slice(0, 10)}T${String(time).slice(0, 5)}:00`);
  return Number.isFinite(at) ? at : 0;
}

/**
 * Put this booking on the reminder route.
 *
 * Safe to call again for the same lead: a second call stops the first
 * sequence and enrols a new one against the new moment, which is exactly
 * what moving an appointment should do. Without that, a moved booking
 * would keep its old reminders and the person would be reminded about a
 * time that no longer exists.
 */
export const remindAbout = mutation({
  args: {
    leadId: v.string(),
    sessionId: v.optional(v.string()),
    preferredDate: v.string(),
    preferredTime: v.string(),
  },
  /* The return type is written out rather than inferred. functions.ts
     calls this, this calls routing.enrol, and TypeScript follows that
     circle back to here; an explicit annotation is where the circle
     stops. */
  handler: async (
    ctx,
    { leadId, sessionId, preferredDate, preferredTime },
  ): Promise<{ enrolled: boolean; why?: string; sequenceId?: string }> => {
    const anchorAt = appointmentAt(preferredDate, preferredTime);
    if (!anchorAt) return { enrolled: false as const, why: "no_appointment_time" };

    /* A date we cannot place is not a reason to guess. */
    if (anchorAt <= Date.now()) return { enrolled: false as const, why: "already_passed" };

    const lead = await ctx.db.get(leadId as never).catch(() => null);
    if (!lead) return { enrolled: false as const, why: "no_such_lead" };

    /* Clear any reminder already running for this person. This is what
       makes a moved booking re-time instead of doubling up. */
    await stop(ctx, leadId, "moved");

    const r = (await ctx.runMutation(api.routing.enrol, {
      leadId: leadId as never,
      route: "H",
      sessionId,
      anchorAt,
    })) as { enrolled: boolean; why?: string; sequenceId?: string };
    return r;
  },
});

/**
 * Take this person off the reminder route.
 *
 * Called when a booking is cancelled, and when they have turned up: there
 * is nothing left to remind them about either way.
 */
export const cancelReminders = mutation({
  args: { leadId: v.string(), why: v.optional(v.string()) },
  handler: async (ctx, { leadId, why }) => {
    const n = await stop(ctx, leadId, why ?? "cancelled");
    return { stopped: n };
  },
});

/* Only route H. A cancelled appointment says nothing about whether they
   should still be followed up as a lead, and stopping route B because
   somebody moved a meeting would quietly drop them. */
async function stop(ctx: any, leadId: string, reason: string): Promise<number> {
  const rows = await ctx.db
    .query("sequences")
    .withIndex("by_lead", (i: any) => i.eq("leadId", leadId))
    .collect();

  let n = 0;
  for (const r of rows) {
    if (r.route !== "H") continue;
    if (r.status !== "active" && r.status !== "paused") continue;
    await ctx.db.patch(r._id, {
      status: "stopped",
      stopReason: reason,
      nextDueAt: undefined,
      /* The lease goes too, or a worker mid-claim could still send one. */
      leaseToken: undefined,
      leaseUntil: undefined,
    });
    n++;
  }
  return n;
}
