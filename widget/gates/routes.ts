/* =========================================================================
   The six routes, as code.

   Transcribed from OMH-Lead-Routing.pdf. They are here rather than in a table
   because they are logic: a route is reviewed in a diff, not edited in a row
   at two in the morning.

   Two properties of this file are load-bearing, and both are structural rather
   than written down in a prompt somewhere:

   1. A `call` step appears ONLY in routes B and E. Those are the two routes
      where the person contacted us first, so the call is a response to their
      own enquiry. C, D and F have no call step at all, which means an
      automated marketing call cannot be produced by a configuration mistake,
      a mis-typed setting or a model deciding to be helpful. It is not
      reachable.

   2. Only route F is marked `marketing`. Everything else is a reply to
      somebody who just asked us something, which is what makes a reply inside
      two minutes both effective and allowed. `checkSendable` reads this flag
      and demands recorded consent when it is set.

   Timing note on day numbering. The paper says "same day, early evening",
   "day 2" and "day 4". Day 1 is the day they enquired, so day 2 is the next
   calendar day (`addDays: 1`) and day 4 is three days later (`addDays: 3`).
   Counting is by London calendar date, not by 24 hour multiples, so somebody
   who enquires at 23:50 is not texted twice before breakfast.
   ========================================================================= */

import { londonAt, nextSendableAt } from "./clock";

export type StepChannel = "sms" | "email" | "call" | "messenger" | "instagram";

/** When a step falls due, relative to enrolment. */
export type StepWhen =
  /* A short delay, where the minutes are the point. */
  | { afterMs: number }
  /* A wall-clock moment in London, where the time of day is the point. */
  | { addDays: number; hour: number; minute?: number }
  /* Counted BACK from something in the diary, not forward from enrolment.
     A reminder is the only kind of step that works this way: "a day before
     the appointment" means nothing without the appointment. Needs an
     anchor, and schedules nothing without one, because a reminder that
     guesses is a reminder that can land after the thing it reminds you
     of. */
  | { beforeMs: number };

/**
 * Whether a step still applies by the time it comes round.
 *
 * Every sequence exists only for people who did not answer, so almost
 * everything is gated. A sequence that keeps texting somebody who already
 * replied is the single most annoying thing this system could do.
 */
export type StepGate =
  | "always"
  | "no_reply" // nothing inbound from them on any channel since enrolment
  | "call_no_answer"; // the call step before this one went unanswered

export type Step = {
  key: string; // stable, used as the template key and in reports
  when: StepWhen;
  channel: StepChannel;
  gate: StepGate;
  label: string; // what the dashboard shows
  why: string; // why this step, at this time, on this channel
};

export type Route = {
  id: RouteId;
  name: string;
  intent: string;
  rule: string;
  /* True only for F. Starting a conversation they did not ask for is
     marketing; replying to their own enquiry is not. */
  marketing: boolean;
  /* Fired inline by the router on the inbound webhook, never queued. The
     paper's first touch is "0 to 2 minutes" and route E's is 60 seconds; a
     queue drained by a cron cannot promise either. */
  immediate: Step[];
  /* Queued against `sequences.nextDueAt` and drained by the worker. */
  steps: Step[];
};

export type RouteId = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H";

/* ------------------------------------------------------------------------ */

const NOW: StepWhen = { afterMs: 0 };

export const ROUTES: Record<RouteId, Route> = {
  /* --------------------------------------------------------------------- */
  A: {
    id: "A",
    name: "Website chat or voice",
    intent: "Highest. They are on the site, asking now.",
    rule: "Finish it in the conversation. Never start a sequence.",
    marketing: false,
    immediate: [],
    /* Deliberately empty. A follow-up sequence for somebody who is present is
       a worse experience than simply answering them. If they leave
       mid-conversation the router enrols them on B instead, carrying what
       they already said. */
    steps: [],
  },

  /* --------------------------------------------------------------------- */
  B: {
    id: "B",
    name: "Website form, or a Google Ads landing page",
    intent: "High. They searched for the service, then typed their details.",
    rule: "Text and email together inside two minutes, call at fifteen.",
    marketing: false,
    immediate: [
      {
        key: "b_sms_first",
        when: NOW,
        channel: "sms",
        gate: "always",
        label: "First text",
        why: "SMS is the one that gets a reply, at roughly 15 to 30 per cent against 1 to 6 for email.",
      },
      {
        key: "b_email_first",
        when: NOW,
        channel: "email",
        gate: "always",
        label: "First email",
        why: "Email is the one that survives, carries the detail and the links, and gets forwarded to whoever else decides. Sent with the text, not instead of it.",
      },
    ],
    steps: [
      {
        key: "b_call",
        when: { afterMs: 15 * 60 * 1000 },
        channel: "call",
        gate: "no_reply",
        label: "Agent calls",
        why: "Intent is high enough to justify the call, and this is a reply to their own enquiry rather than a marketing call.",
      },
      {
        key: "b_sms_we_tried",
        when: { afterMs: 17 * 60 * 1000 },
        channel: "sms",
        gate: "call_no_answer",
        label: "Text saying we tried",
        why: "The text is what they actually read. It makes the missed call make sense.",
      },
      {
        key: "b_sms_evening",
        when: { addDays: 0, hour: 18 },
        channel: "sms",
        gate: "no_reply",
        label: "Early evening text",
        why: "Most people fill a form at work and deal with it at home.",
      },
      {
        key: "b_email_day2",
        when: { addDays: 1, hour: 10 },
        channel: "email",
        gate: "no_reply",
        label: "Day 2 email",
        why: "Different channel, different time of day, and something of substance about the thing they actually asked for.",
      },
      {
        key: "b_sms_final",
        when: { addDays: 3, hour: 10 },
        channel: "sms",
        gate: "no_reply",
        label: "Final text, then stop",
        why: "Says it is the last one and leaves a way back. Chasing past this annoys more people than it converts.",
      },
    ],
  },

  /* --------------------------------------------------------------------- */
  C: {
    id: "C",
    name: "Facebook or Instagram lead ad form",
    intent: "Low. They were scrolling, not searching.",
    rule: "Qualify by message first. Do not spend a call until they reply.",
    marketing: false,
    immediate: [
      {
        key: "c_sms_first",
        when: NOW,
        channel: "sms",
        gate: "always",
        label: "First text",
        why: "Speed matters more here than anywhere, because the interest was created a moment ago by an advert and it fades fast.",
      },
      {
        key: "c_dm_first",
        when: NOW,
        channel: "messenger",
        gate: "always",
        label: "Reply in the DM",
        why: "Answering where they came from, when that is where they came from.",
      },
    ],
    steps: [
      {
        key: "c_sms_second",
        when: { afterMs: 60 * 60 * 1000 },
        channel: "sms",
        gate: "no_reply",
        label: "One more text, different angle",
        why: "Instant forms are cheap and low friction, so a share of them were never real. Two messages is the right spend before deciding.",
      },
      {
        key: "c_email_day2",
        when: { addDays: 1, hour: 10 },
        channel: "email",
        gate: "no_reply",
        label: "Day 2 email, then stop",
        why: "Then keep them for retargeting instead, which costs nothing per head.",
      },
    ],
    /* No call step exists on this route, and that is the point. Low intent
       plus an automated call is both the worst conversion and the biggest
       compliance exposure. */
  },

  /* --------------------------------------------------------------------- */
  D: {
    id: "D",
    name: "Facebook Messenger or Instagram DM",
    intent: "Medium to high. They chose to message a business.",
    rule: "Answer in the thread, inside the 24 hour window.",
    marketing: false,
    /* Nothing immediate: the assistant answers in the thread in seconds, on
       the same knowledge base, which is the whole point of this route. */
    immediate: [],
    steps: [
      {
        key: "d_dm_last_call",
        when: { afterMs: 20 * 60 * 60 * 1000 },
        channel: "messenger",
        gate: "no_reply",
        label: "Last message before the window shuts",
        why: "Meta only let a business message freely for 24 hours after the person's last message. After that it needs an approved tag or is paid.",
      },
    ],
    /* After 24 hours: SMS or email only, and only if they gave us one. The
       router moves them to B at that point rather than this route growing a
       step it cannot legally deliver. */
  },

  /* --------------------------------------------------------------------- */
  E: {
    id: "E",
    name: "Missed or abandoned phone call",
    intent: "High. They rang, which is more effort than a form.",
    rule: "Text within sixty seconds, then call back.",
    marketing: false,
    immediate: [
      {
        key: "e_sms_missed",
        when: NOW,
        channel: "sms",
        gate: "always",
        label: "We missed you",
        why: "A missed call with no text is a lost job. The text turns the ring into a conversation they can answer at their convenience.",
      },
    ],
    steps: [
      {
        key: "e_call_back",
        when: { afterMs: 5 * 60 * 1000 },
        channel: "call",
        gate: "no_reply",
        label: "Agent calls back",
        why: "Still clearly a response to their own call.",
      },
      {
        key: "e_sms_same_day",
        when: { addDays: 0, hour: 18 },
        channel: "sms",
        gate: "no_reply",
        label: "One more text the same day",
        why: "By the next day it is the same situation as a form, so it takes the same shape from here.",
      },
      {
        key: "e_email_day2",
        when: { addDays: 1, hour: 10 },
        channel: "email",
        gate: "no_reply",
        label: "Day 2 email",
        why: "Route B from day 2, as the paper puts it.",
      },
      {
        key: "e_sms_final",
        when: { addDays: 3, hour: 10 },
        channel: "sms",
        gate: "no_reply",
        label: "Final text, then stop",
        why: "Same ending as route B, for the same reason.",
      },
    ],
  },

  /* --------------------------------------------------------------------- */
  F: {
    id: "F",
    name: "Past customers, reactivation",
    intent: "Unknown. We are starting the conversation, not them.",
    rule: "This is marketing. The rules are different and they bite.",
    /* The one route where getting it wrong is a fine rather than a lost lead. */
    marketing: true,
    /* Nothing is sent inline. The first message is queued like any other, so
       quiet hours apply to it: a reactivation batch started at 23:00 goes out
       at 08:00, not at 23:00. */
    immediate: [],
    steps: [
      {
        key: "f_sms_first",
        when: { afterMs: 0 },
        channel: "sms",
        gate: "always",
        label: "Opening text, with an opt-out",
        why: "The soft opt-in covers an existing customer, for similar products, with an opt-out offered then and in every message since.",
      },
      {
        key: "f_sms_second",
        when: { addDays: 4, hour: 10 },
        channel: "sms",
        gate: "no_reply",
        label: "Second and last text",
        why: "A list worked twice and ignored twice is not a list to keep working.",
      },
    ],
    /* No call step. An automated marketing call needs consent that
       specifically covers automated calls (PECR regulation 19); general
       marketing consent does not cover it and neither does consent for live
       calls. A live person makes those calls, from the dashboard, after a TPS
       screen. So there is nothing here for the worker to dial. */
  },
  /* --------------------------------------------------------------------- */

  G: {
    id: "G",
    name: "Booked and did not turn up",
    intent: "They chose a time. Something came up, or they forgot.",
    rule: "Two messages, then leave it. They are not a lead going cold.",
    marketing: false,
    /* Nothing at the appointment time. People are late, and a text saying
       "sorry we missed you" to somebody parking outside is worse than
       silence. */
    immediate: [],
    steps: [
      {
        key: "g_sms_missed",
        when: { afterMs: 20 * 60 * 1000 },
        channel: "sms",
        gate: "no_reply",
        label: "We missed you, shall we rebook",
        why: "Twenty minutes is long enough to be sure, short enough that the appointment is still the thing they are thinking about.",
      },
      {
        key: "g_email_next_day",
        when: { addDays: 1, hour: 10 },
        channel: "email",
        gate: "no_reply",
        label: "One email the next day, then stop",
        why: "A second text the same day reads as nagging somebody who already feels bad about missing it. The next morning, in writing, with a link, is easier to act on.",
      },
    ],
    /* NO CALL STEP, and the omission is the point.
       A missed appointment is a reasonable thing to ring about, which is
       exactly why it is worth writing down that we do not. The guarantee
       this system makes structurally is that an automated call exists only
       where the person rang us or asked us to ring. Somebody who booked and
       forgot did neither at the moment we would be dialling. */
  },

  H: {
    id: "H",
    name: "Booked, and it has not happened yet",
    intent: "They chose a time. The job now is that they remember it.",
    rule: "Two reminders, counted back from the appointment, then stop.",
    marketing: false,
    /* Nothing on enrolment. The booking confirmation is sent by the thing
       that took the booking; a second message a minute later saying the
       same thing is noise. */
    immediate: [],
    steps: [
      {
        key: "h_email_day_before",
        /* Counted back from the APPOINTMENT, which is the only route here
           that works that way. Twenty-two hours rather than twenty-four so
           that a 09:00 appointment is reminded at 11:00 the day before
           rather than at 11:00 the same morning, when it is too late to
           move anything. */
        when: { beforeMs: 22 * 60 * 60 * 1000 },
        channel: "email",
        gate: "no_reply",
        label: "A reminder the day before",
        why: "Far enough ahead that they can move it, close enough that they have not forgotten being reminded.",
      },
      {
        key: "h_sms_same_day",
        /* Two hours. Long enough to set off, short enough that it is the
           thing they are about to do. */
        when: { beforeMs: 2 * 60 * 60 * 1000 },
        channel: "sms",
        gate: "no_reply",
        label: "A text two hours before",
        why: "The one that actually stops a no-show. A text two hours out is read; an email that morning competes with everything else.",
      },
    ],
  },
};

/* ------------------------------------------------------------------------ */

/** The step at this index, or undefined when the route is finished. */
export function stepAt(route: RouteId, step: number): Step | undefined {
  return ROUTES[route]?.steps[step];
}

/**
 * When a step is due, given when the sequence was enrolled.
 *
 * Every result passes through the quiet-hours window, so a step is moved
 * forward to 08:00 rather than going out at three in the morning. The one
 * exception is a delay under an hour: route B's call at fifteen minutes and
 * route E's at five are the whole value of those routes, and a lead who rang
 * us at 02:00 is awake. Moving those to 08:00 would answer a 2am caller seven
 * hours later, which is worse than not promising it at all.
 */
export function dueAt(enrolledAt: number, when: StepWhen, anchorAt?: number): number {
  if ("beforeMs" in when) {
    /* No appointment, no reminder. Returning 0 rather than a guess: the
       caller treats it as "nothing to schedule", and a reminder nobody
       can place is better absent than approximate. */
    if (!anchorAt || !Number.isFinite(anchorAt)) return 0;

    const wanted = anchorAt - when.beforeMs;
    /* Already gone, because the booking was made at short notice. Not
       scheduled at all: a "reminder" that arrives after the appointment
       reads as incompetence to somebody who has already turned up. */
    if (wanted <= Date.now()) return 0;

    /* Quiet hours move a step FORWARD, which is right everywhere else and
       wrong here: forward from 03:00 is 08:00, and for an early
       appointment that could be after it has started. So the moved time is
       only taken if it is still before the appointment. */
    const moved = nextSendableAt(wanted);
    return moved < anchorAt ? moved : 0;
  }
  if ("afterMs" in when) {
    const at = enrolledAt + when.afterMs;
    return when.afterMs < 60 * 60 * 1000 ? at : nextSendableAt(at);
  }
  return nextSendableAt(
    londonAt(enrolledAt, when.addDays, when.hour, when.minute ?? 0),
  );
}

/**
 * The next step that is still worth sending, walking forward from `fromIndex`.
 *
 * Due times must be strictly increasing, and this is what enforces it. The
 * case that forced it: somebody enquires at 19:30. Route B's "same day, early
 * evening" step resolves to 18:00 that day, which is already behind us, so a
 * naive schedule would fire it the moment it was queued and they would get two
 * texts inside a minute. That slot is gone, so the step is skipped and the day
 * 2 email becomes the next touch.
 *
 * Returns null when the route has nothing left, which the caller records as
 * `stopReason: "exhausted"`.
 */
export function nextStep(
  route: RouteId,
  enrolledAt: number,
  fromIndex: number,
  floor: number,
  anchorAt?: number,
): { index: number; dueAt: number; step: Step } | null {
  const steps = ROUTES[route]?.steps ?? [];
  for (let i = fromIndex; i < steps.length; i++) {
    const at = dueAt(enrolledAt, steps[i].when, anchorAt);
    /* 0 means "there is no moment for this": an anchored step with no
       appointment, or one whose moment has already gone. Skipped rather
       than fired. */
    if (at === 0) continue;
    /* Strictly after, so two steps can never collide on one moment either. */
    if (at > floor) return { index: i, dueAt: at, step: steps[i] };
  }
  return null;
}

/** Channels a route can ever use. Used by the consent checks and the tests. */
export function channelsUsed(route: RouteId): StepChannel[] {
  const r = ROUTES[route];
  const all = [...r.immediate, ...r.steps].map((s) => s.channel);
  return [...new Set(all)];
}
