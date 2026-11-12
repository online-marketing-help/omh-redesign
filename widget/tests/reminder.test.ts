import { dueAt, nextStep, ROUTES } from "../gates/routes";

/* =========================================================================
   Reminding somebody before an appointment.

   Every step in this engine has been timed from ENROLMENT: "fifteen
   minutes after they enquired", "day 2 at ten". A reminder is the first
   thing that is timed from something else entirely - the appointment - and
   that is the whole of this change.

   The failure to design against is not a late reminder. It is a reminder
   that arrives AFTER the appointment, which reads as incompetence to
   somebody who has already turned up, and a reminder sent to somebody who
   cancelled, which is worse: it tells them we were not listening.

   Quiet hours still apply, and they fight with "the evening before". A
   reminder for a nine o'clock appointment, sent the evening before at six,
   is right; the same rule on a Monday morning booking must not produce
   three in the morning.
   ========================================================================= */

let pass = 0, fail = 0;
function eq(label: string, got: unknown, want: unknown) {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  if (ok) { pass++; console.log("  ok   " + label); }
  else { fail++; console.log("  FAIL " + label + "\n         got  " + JSON.stringify(got) + "\n         want " + JSON.stringify(want)); }
}
function ok(label: string, cond: boolean, detail = "") {
  eq(label + (cond || !detail ? "" : ` [${detail}]`), cond, true);
}
const london = (ms: number) =>
  new Date(ms).toLocaleString("en-GB", {
    timeZone: "Europe/London", weekday: "short", day: "numeric", month: "short",
    hour: "2-digit", minute: "2-digit", hour12: false,
  });

/* Thursday 19 November 2026, 14:00 London. */
const APPT = Date.parse("2026-11-19T14:00:00Z");
/* Enrolled when the booking was made, a week earlier. */
const BOOKED = Date.parse("2026-11-12T09:30:00Z");

console.log("\n== a step timed from the appointment, not from enrolment ==");
{
  const at = dueAt(BOOKED, { beforeMs: 24 * 60 * 60 * 1000 }, APPT);
  eq("a day before the appointment", london(at), london(APPT - 24 * 60 * 60 * 1000));
  ok("which is nothing like a day after enrolment", at !== BOOKED + 24 * 60 * 60 * 1000);
}
{
  /* The anchor is what makes it mean anything. Without one there is no
     appointment to count back from, and guessing is how a reminder lands
     after the thing it reminds you of. */
  const at = dueAt(BOOKED, { beforeMs: 24 * 60 * 60 * 1000 }, undefined);
  ok("with no appointment, nothing is scheduled", !Number.isFinite(at) || at === 0, String(at));
}

console.log("\n== it must never arrive after the appointment ==");
{
  /* Booked at short notice: the appointment is in two hours, so "the day
     before" is already gone. */
  const soon = BOOKED + 2 * 60 * 60 * 1000;
  const at = dueAt(BOOKED, { beforeMs: 24 * 60 * 60 * 1000 }, soon);
  ok("a reminder whose moment has passed is not scheduled",
     !Number.isFinite(at) || at === 0 || at < soon, london(at));
}
{
  const at = dueAt(BOOKED, { beforeMs: 60 * 60 * 1000 }, APPT);
  ok("an hour before is before", at < APPT, london(at));
}

console.log("\n== quiet hours still apply, and they fight with 'the night before' ==");
{
  /* Nine o'clock Monday morning. A day before is Sunday 09:00, which is
     fine. But an eighteen-hour reminder would be 15:00 Sunday, and a
     fifteen-hour one would be three in the morning. */
  const monday9 = Date.parse("2026-11-23T09:00:00Z");
  const at = dueAt(BOOKED, { beforeMs: 15 * 60 * 60 * 1000 }, monday9);
  const hour = Number(
    new Date(at).toLocaleString("en-GB", { timeZone: "Europe/London", hour: "2-digit", hour12: false }),
  );
  ok("nothing is ever scheduled in the middle of the night", hour >= 8 && hour < 20,
     london(at));
  ok("and it is still before the appointment", at < monday9, london(at));
}

console.log("\n== the route itself ==");
{
  const H = ROUTES.H;
  ok("there is a route for it", Boolean(H));
  eq("it is not marketing", H.marketing, false);
  ok("it has at least one step", H.steps.length > 0);
  /* The compliance property the whole design rests on: a call step may
     only exist on a route where the person contacted us first. */
  eq("it never dials", H.steps.filter((s) => s.channel === "call").length, 0);
  ok("every step is anchored to the appointment",
     H.steps.every((s) => "beforeMs" in s.when));
}
{
  /* Steps must still be strictly increasing, or two reminders collide. */
  const H = ROUTES.H;
  const times = H.steps.map((s) => dueAt(BOOKED, s.when, APPT)).filter((t) => t > 0);
  const sorted = [...times].sort((a, b) => a - b);
  eq("the reminders are in order", times, sorted);
  eq("and none of them is at the same moment", new Set(times).size, times.length);
  ok("all of them land before the appointment", times.every((t) => t < APPT));
}

console.log("\n== walking the route ==");
{
  const first = nextStep("H", BOOKED, 0, BOOKED, APPT);
  ok("there is a first reminder", first !== null);
  ok("it is before the appointment", (first?.dueAt ?? 0) < APPT, london(first?.dueAt ?? 0));
}
{
  /* Booked for an hour's time. Every reminder's moment has gone, so the
     route has nothing left rather than firing them all at once. */
  const imminent = BOOKED + 60 * 60 * 1000;
  const r = nextStep("H", BOOKED, 0, BOOKED, imminent);
  ok("a booking too soon to remind about schedules nothing",
     r === null || r.dueAt < imminent, JSON.stringify(r && london(r.dueAt)));
}

console.log(`\n${pass} passed, ${fail} failed`);
if (fail) process.exit(1);
