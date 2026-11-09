import { totals, verdict } from "../../lib/dashboard/campaign-report.ts";

/* =========================================================================
   The campaign figures.

   These are the numbers that go in front of the client, so they are asserted
   rather than eyeballed. The module is deliberately free of Convex and of
   React so that this is a plain call with a handful of rows.

   The property the whole screen rests on is the last section: a campaign that
   books a few and burns a lot must not read as a success.
   ========================================================================= */

let pass = 0, fail = 0;
function eq(label: string, got: unknown, want: unknown) {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  if (ok) { pass++; console.log("  ok   " + label); }
  else { fail++; console.log("  FAIL " + label + "\n         got  " + JSON.stringify(got) + "\n         want " + JSON.stringify(want)); }
}
function ok(label: string, cond: boolean) { eq(label, cond, true); }

type P = Parameters<typeof totals>[0][number];

let n = 0;
function person(over: Partial<P> = {}): P {
  n += 1;
  return {
    leadId: `l${n}`,
    sequenceId: `s${n}`,
    name: `Person ${n}`,
    phone: `+44770090${String(1000 + n).slice(-4)}`,
    email: null,
    sourceChannel: "reactivation",
    status: "stopped",
    stopReason: "exhausted",
    step: 2,
    enrolledAt: 1_000,
    sent: 1,
    delivered: 1,
    failed: 0,
    firstSentAt: 1_100,
    replied: false,
    firstReplyAt: null,
    optedOut: false,
    hot: false,
    outcome: null,
    valueGbp: null,
    bookings: 0,
    ...over,
  };
}

console.log("\n== the gap between the list and the people we may contact ==");
{
  /* Two hundred names, a hundred and seventy enrolled: thirty were suppressed
     or had no consent. That gap is the figure the screen exists to show. */
  const t = totals(Array.from({ length: 170 }, () => person()), 200);
  eq("intended is carried through", t.intended, 200);
  eq("enrolled is counted", t.enrolled, 170);
  eq("blocked is the difference", t.blocked, 30);
}
{
  /* More enrolled than intended should not produce a negative count of people
     we were not allowed to contact. */
  const t = totals(Array.from({ length: 12 }, () => person()), 10);
  eq("blocked never goes below zero", t.blocked, 0);
}
{
  const t = totals([person()], null);
  eq("no intended list means no blocked figure", t.blocked, null);
}

console.log("\n== reached means a message left the building ==");
{
  const people = [
    person({ sent: 1, delivered: 1 }),
    person({ sent: 1, delivered: 0 }),
    /* Enrolled, but the send failed: never reached. Counting this as reached
       is what flatters a campaign that mostly bounced. */
    person({ sent: 0, delivered: 0, failed: 1 }),
  ];
  const t = totals(people, null);
  eq("enrolled counts everyone", t.enrolled, 3);
  eq("reached counts only those a message went to", t.reached, 2);
  eq("delivered is its own, smaller figure", t.delivered, 1);
  eq("failed counts sends that never arrived", t.failed, 1);
}

console.log("\n== rates divide by reached, not by enrolled ==");
{
  const people = [
    person({ sent: 1, replied: true }),
    person({ sent: 1 }),
    person({ sent: 0, failed: 1 }),  // never reached
    person({ sent: 0, failed: 1 }),  // never reached
  ];
  const t = totals(people, null);
  eq("reached", t.reached, 2);
  /* One of two reached, not one of four enrolled. Dividing by enrolment would
     report 25% and make a half-undelivered campaign look like a poor one
     rather than a broken one. */
  eq("reply rate is of those reached", t.replyRate, 0.5);
}

console.log("\n== a rate with nothing to divide by is absent, not zero ==");
{
  const t = totals([person({ sent: 0, failed: 1 })], 5);
  eq("no reply rate", t.replyRate, null);
  eq("no opt-out rate", t.optOutRate, null);
  eq("no booking rate", t.bookRate, null);
  /* "0%" would read as a measurement of a campaign that failed. This one has
     not reached anybody yet, which is a different fact. */
  eq("and the verdict says nothing at all", verdict(t), null);
}

console.log("\n== money ==");
{
  const people = [
    person({ outcome: "won", valueGbp: 1500, bookings: 1, replied: true }),
    person({ outcome: "won", valueGbp: null, bookings: 1, replied: true }),
    person({ outcome: "lost", valueGbp: null }),
  ];
  const t = totals(people, null);
  eq("two wins", t.won, 2);
  /* A win with no figure contributes nothing rather than a zero that drags an
     average down. The count and the value are separate questions. */
  eq("value totals only what was typed in", t.value, 1500);
  eq("bookings are counted per booking, not per person", t.booked, 2);
}

console.log("\n== THE PROPERTY THE SCREEN EXISTS FOR ==");
console.log("   a campaign that books a few and burns a lot must not read as a success");
{
  /* Two booked out of a hundred reached sounds like a modest result. Fourteen
     opt-outs is a tenth of the list gone for good. */
  const people = [
    ...Array.from({ length: 2 }, () => person({ sent: 1, replied: true, bookings: 1 })),
    ...Array.from({ length: 14 }, () => person({ sent: 1, optedOut: true, stopReason: "opted_out" })),
    ...Array.from({ length: 84 }, () => person({ sent: 1 })),
  ];
  const t = totals(people, null);
  eq("reached", t.reached, 100);
  eq("booked", t.booked, 2);
  eq("opted out", t.optedOut, 14);

  const said = verdict(t)!;
  console.log("   verdict: " + said);
  /* The opt-out has to be the subject of the sentence, not an afterthought
     appended to a count of bookings. */
  ok("the verdict leads with the opt-outs", said.startsWith("14 of the 100"));
  ok("it gives the rate", said.includes("14%"));
  ok("it names the target it missed", said.includes("under 2%"));
  ok("and it says the bookings did not cover it", said.includes("costs more"));
}
{
  /* The same shape with a tolerable opt-out rate reads the other way round. */
  const people = [
    ...Array.from({ length: 2 }, () => person({ sent: 1, replied: true, bookings: 1, outcome: "won", valueGbp: 900 })),
    person({ sent: 1, optedOut: true, stopReason: "opted_out" }),
    ...Array.from({ length: 97 }, () => person({ sent: 1 })),
  ];
  const t = totals(people, null);
  const said = verdict(t)!;
  console.log("   verdict: " + said);
  ok("a healthy campaign leads with what it produced", said.startsWith("2 appointments"));
  ok("and still states the opt-outs", said.includes("asked to be left alone"));
}
console.log("\n== still going ==");
{
  const t = totals(
    [person({ status: "active", stopReason: null }), person({ status: "paused", stopReason: null }), person()],
    null,
  );
  eq("live counts active and paused", t.live, 2);
}

console.log(`\n${pass} passed, ${fail} failed`);
if (fail) process.exit(1);
