import { freeSlots, overlaps } from "../gates/availability.js";

/* =========================================================================
   Which demo slots are actually free.

   The bug this exists to kill is live on the public site today: six fixed
   times are offered, nothing reads what is already taken, and two visitors
   can book the same half hour. The page even promises "we'll email to
   confirm, or suggest another if it's taken", which is the copy admitting
   the system does not check.

   The calendar is the source of truth, not our database. OMH move and
   cancel things in it by hand and take bookings by phone, none of which
   touches us, so a table of our own would be a stale second copy and "free"
   computed from a stale copy is the double booking all over again.

   This file is the pure half: given what the calendar says is busy, which
   of the offered times survive. The authoritative check-and-create happens
   in the Apps Script under a lock, because that is the only place the race
   between two simultaneous submissions can actually be closed.
   ========================================================================= */

let pass = 0, fail = 0;
function eq(label: string, got: unknown, want: unknown) {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  if (ok) { pass++; console.log("  ok   " + label); }
  else { fail++; console.log("  FAIL " + label + "\n         got  " + JSON.stringify(got) + "\n         want " + JSON.stringify(want)); }
}

const TIMES = ["09:30", "10:30", "11:30", "14:00", "15:00", "16:00"];
const DATE = "2026-11-18";          // a Wednesday
/* Well before the first slot, so "too soon" never fires unless a test wants
   it to. Times are Europe/London throughout: the calendar speaks London and
   so does the booking form. */
const MORNING = Date.parse("2026-11-18T06:00:00Z");

/** A busy block, the shape the Apps Script returns. */
const busy = (from: string, to: string) => ({
  start: `${DATE}T${from}:00`,
  end: `${DATE}T${to}:00`,
});

console.log("\n== nothing in the calendar, everything is offered ==");
eq("all six", freeSlots(DATE, [], TIMES, MORNING), TIMES);

console.log("\n== a slot with an event on it is not offered ==");
{
  /* Exactly the slot: 10:30 to 11:00. */
  eq("the taken one drops out",
     freeSlots(DATE, [busy("10:30", "11:00")], TIMES, MORNING),
     ["09:30", "11:30", "14:00", "15:00", "16:00"]);
}
{
  /* A long meeting swallowing two slots. The failure worth catching is an
     overlap test that only compares start times: 14:00 and 15:00 both start
     inside this and both have to go. */
  eq("one long event takes every slot it covers",
     freeSlots(DATE, [busy("13:45", "15:15")], TIMES, MORNING),
     ["09:30", "10:30", "11:30", "16:00"]);
}
{
  /* Ends exactly when the slot starts. Not a clash: back to back is fine,
     and treating it as one would quietly lose a slot every time. */
  eq("an event ending on the hour does not block that hour",
     freeSlots(DATE, [busy("09:00", "09:30")], TIMES, MORNING),
     TIMES);
  eq("and one starting when the slot ends does not either",
     freeSlots(DATE, [busy("10:00", "10:30")], TIMES, MORNING),
     TIMES);
}
{
  /* Clips the last minutes. Still a clash. */
  eq("an event overlapping by one minute still blocks",
     freeSlots(DATE, [busy("09:59", "10:30")], TIMES, MORNING),
     ["10:30", "11:30", "14:00", "15:00", "16:00"]);
}

console.log("\n== a time that has already passed is not a slot ==");
{
  /* 13:00 London on the day. The morning is gone. */
  const afternoon = Date.parse("2026-11-18T13:00:00Z");
  eq("only what is still ahead",
     freeSlots(DATE, [], TIMES, afternoon),
     ["14:00", "15:00", "16:00"]);
}
{
  /* Ten minutes before a slot is not bookable: nobody can be called to
     attention that fast, and the confirmation email has not even sent. */
  const nearly = Date.parse("2026-11-18T13:55:00Z");
  eq("and not one starting in five minutes",
     freeSlots(DATE, [], TIMES, nearly),
     ["15:00", "16:00"]);
}
{
  const dayBefore = Date.parse("2026-11-17T23:00:00Z");
  eq("a future day is untouched by the clock", freeSlots(DATE, [], TIMES, dayBefore), TIMES);
}

console.log("\n== THE CASE NOBODY WRITES: the calendar did not answer ==");
{
  /* `null` is "we could not ask", which is NOT "everything is free".
     Returning the full list here is how an outage turns into a day of
     double bookings, and it is the single most likely way this ships
     broken: the happy path and the outage path look identical in testing
     unless the outage is asserted. */
  eq("an unreachable calendar offers nothing",
     freeSlots(DATE, null as never, TIMES, MORNING), []);
  eq("and so does a malformed answer",
     freeSlots(DATE, "forbidden" as never, TIMES, MORNING), []);
}

console.log("\n== overlap, directly ==");
{
  const a = Date.parse(`${DATE}T10:00:00Z`), b = Date.parse(`${DATE}T10:30:00Z`);
  eq("touching at the edge is not an overlap", overlaps(a, b, b, b + 1800000), false);
  eq("contained is an overlap", overlaps(a, b, a + 60000, a + 120000), true);
  eq("identical is an overlap", overlaps(a, b, a, b), true);
  eq("before is not", overlaps(a, b, a - 7200000, a - 3600000), false);
}

console.log(`\n${pass} passed, ${fail} failed`);
if (fail) process.exit(1);
