import type { CampaignPerson } from "./routing";

/* =========================================================================
   One campaign, totalled.

   Its own module rather than a function inside the page, for two reasons.

   The first is that the same totals are needed on the list screen and on the
   detail screen, and two copies of a funnel calculation is how a dashboard
   ends up showing a different reply rate on two pages at once.

   The second is that these are the figures that go in front of the client,
   so they are asserted in a test. Nothing here reaches Convex or React, so
   the test is a plain call with a handful of rows.
   ========================================================================= */

export type Totals = {
  /** How many people the batch was meant to reach, as recorded at the start. */
  intended: number | null;
  /** How many actually got on a route. */
  enrolled: number;
  /**
   * The gap, and why it exists.
   *
   * `intended - enrolled` is the suppression and consent rate, which is the
   * single most useful figure a reactivation run produces: it says how much
   * of the list we are not allowed to contact. A report that showed only
   * what was sent would hide it completely.
   */
  blocked: number | null;
  /** At least one message actually went out. */
  reached: number;
  /** The provider confirmed delivery. */
  delivered: number;
  /** The send failed: a dead number, a bounce. */
  failed: number;
  replied: number;
  booked: number;
  won: number;
  value: number;
  /**
   * Asked to be left alone.
   *
   * Reported beside the wins, never below them. A campaign that books three
   * appointments and burns forty permissions has lost more than it made, and
   * a screen showing only the three would say it was a success.
   */
  optedOut: number;
  /** Still being worked: a step is due and nothing has stopped it. */
  live: number;
  /** Of those reached, the share who answered. */
  replyRate: number | null;
  /** Of those reached, the share who asked to stop. */
  optOutRate: number | null;
  /** Of those who replied, the share who booked. */
  bookRate: number | null;
};

export function totals(
  people: CampaignPerson[],
  intended: number | null,
): Totals {
  const enrolled = people.length;
  /* Reached means a message left the building, not that the person was
     enrolled. The two differ whenever a send failed, and a reply rate
     measured against enrolment rather than against delivery flatters a
     campaign that mostly bounced. */
  const reached = people.filter((p) => p.sent > 0).length;
  const delivered = people.filter((p) => p.delivered > 0).length;
  const failed = people.filter((p) => p.failed > 0 && p.sent === 0).length;
  const replied = people.filter((p) => p.replied).length;
  const booked = people.reduce((n, p) => n + p.bookings, 0);
  const won = people.filter((p) => p.outcome === "won").length;
  const value = people.reduce((n, p) => n + (p.valueGbp ?? 0), 0);
  const optedOut = people.filter((p) => p.optedOut).length;
  const live = people.filter((p) => p.status === "active" || p.status === "paused").length;

  return {
    intended,
    enrolled,
    blocked: intended === null ? null : Math.max(intended - enrolled, 0),
    reached,
    delivered,
    failed,
    replied,
    booked,
    won,
    value,
    optedOut,
    live,
    /* Null rather than zero when there is nothing to divide by. A campaign
       that has reached nobody has no reply rate, and printing "0%" would
       read as a measurement of a campaign that failed rather than one that
       has not started. */
    replyRate: reached ? replied / reached : null,
    optOutRate: reached ? optedOut / reached : null,
    bookRate: replied ? booked / replied : null,
  };
}

/**
 * The one sentence worth saying about a campaign out loud.
 *
 * Returns null when there is nothing honest to say yet, which is most of a
 * campaign's first hour. A screen that always produces a sentence produces a
 * meaningless one, and a meaningless sentence in a bold typeface is worse
 * than no sentence at all.
 */
export function verdict(t: Totals): string | null {
  if (!t.reached) return null;

  const pct = (n: number) => `${Math.round(n * 100)}%`;

  /* Said first when it is true, because it is the finding that changes what
     somebody does next. One in twenty is the point at which a run is
     costing more permission than it is worth: the routing paper's own
     target for opt-outs is under two per cent. */
  if (t.optOutRate !== null && t.optOutRate >= 0.05) {
    return `${t.optedOut} of the ${t.reached} reached asked to be left alone, which is ${pct(
      t.optOutRate,
    )} against a target of under 2%. That costs more than ${
      t.booked === 0 ? "nothing booked" : `the ${t.booked} booked`
    } is worth.`;
  }

  if (t.booked > 0) {
    return `${t.booked} ${t.booked === 1 ? "appointment" : "appointments"} from ${
      t.reached
    } reached${t.won ? `, ${t.won} of them signed` : ""}. ${t.optedOut} asked to be left alone.`;
  }

  if (t.replied > 0) {
    return `${t.replied} of ${t.reached} replied, ${pct(
      t.replyRate ?? 0,
    )}, and none of them has booked yet.`;
  }

  return `${t.reached} reached, nobody has replied yet.`;
}
