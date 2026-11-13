import { ROUTES, dueAt, nextStep, channelsUsed, stepAt } from "../gates/routes.ts";
import { londonWall, londonInstant, isSendableHour } from "../gates/clock.ts";

let pass = 0, fail = 0;
function ok(label: string, cond: boolean, detail = "") {
  eq(label + (cond || !detail ? "" : ` [${detail}]`), cond, true);
}
function eq(label: string, got: unknown, want: unknown) {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  if (ok) { pass++; console.log("  ok   " + label); }
  else { fail++; console.log("  FAIL " + label + "\n         got  " + JSON.stringify(got) + "\n         want " + JSON.stringify(want)); }
}
const ids = ["A","B","C","D","E","F","G"] as const;

console.log("\n== THE COMPLIANCE PROPERTY: an automated call is unreachable outside B and E ==");
for (const id of ids) {
  const has = channelsUsed(id as any).includes("call");
  eq(`route ${id} ${has ? "HAS" : "has no"} call step`, has, id === "B" || id === "E");
}
eq("the only marketing route is F",
   ids.filter((i) => ROUTES[i].marketing), ["F"]);
// The two together are the actual guarantee: nothing that is marketing can dial.
eq("no marketing route can dial",
   ids.filter((i) => ROUTES[i].marketing && channelsUsed(i as any).includes("call")), []);

console.log("\n== route G: somebody who booked and did not turn up ==");
{
  /* A no-show is not a lead going cold. They chose a time, so the follow-up
     is a reply to their own booking rather than a chase, and it stops
     quickly: two messages and done. */
  eq("G exists", ROUTES.G?.id, "G");
  eq("G is not marketing", ROUTES.G.marketing, false);

  /* THE LINE THIS ROUTE MUST NOT CROSS.
     A missed appointment is a reasonable thing to ring about, and that is
     exactly why it is worth writing down that we do not. The property
     asserted above is that an automated call exists only where the person
     rang us or asked us to ring. Somebody who booked and forgot did neither
     at the moment we would be dialling, and a route that quietly joined B
     and E would weaken the one guarantee this system makes structurally. */
  eq("G never dials", channelsUsed("G").includes("call"), false);
  eq("G is text and email only", channelsUsed("G"), ["sms", "email"]);

  /* Nothing is sent at the appointment time: people are late. */
  eq("nothing immediate", ROUTES.G.immediate.length, 0);
  const first = ROUTES.G.steps[0];
  ok("the first message waits",
     (first.when as any).afterMs >= 10 * 60 * 1000, JSON.stringify(first.when));
  eq("it is a text", first.channel, "sms");

  eq("it ends after two", ROUTES.G.steps.length, 2);
  /* Every step is gated on no reply: the moment they answer, or rebook,
     the chase stops like any other route. */
  eq("every step stops on a reply",
     ROUTES.G.steps.map((s) => s.gate), ["no_reply", "no_reply"]);
}

console.log("\n== route A starts nothing ==");
eq("A has no immediate touch", ROUTES.A.immediate.length, 0);
eq("A has no steps", ROUTES.A.steps.length, 0);
eq("A is exhausted from the start", nextStep("A", Date.now(), 0, Date.now()), null);

console.log("\n== route B: text and email together, call at fifteen ==");
eq("two immediate touches", ROUTES.B.immediate.map((s) => s.channel), ["sms", "email"]);
eq("both fire at once", ROUTES.B.immediate.map((s) => (s.when as any).afterMs), [0, 0]);
eq("first queued step is the call", ROUTES.B.steps[0].channel, "call");
eq("the call is gated on no reply", ROUTES.B.steps[0].gate, "no_reply");
eq("the call is at 15 minutes", (ROUTES.B.steps[0].when as any).afterMs, 15 * 60 * 1000);
eq("the 'we tried' text only fires on an unanswered call", ROUTES.B.steps[1].gate, "call_no_answer");
eq("the last step is a text that stops", ROUTES.B.steps[ROUTES.B.steps.length - 1].key, "b_sms_final");

console.log("\n== route C never calls, and says so ==");
eq("C channels", channelsUsed("C"), ["sms", "messenger", "email"]);
eq("C has exactly two queued steps", ROUTES.C.steps.length, 2);

console.log("\n== timings resolve to the right London wall clock ==");
// Enquiry 15 Jul 2026 at 09:00 London (BST, so 08:00Z)
const morning = londonInstant({ year: 2026, month: 7, day: 15, hour: 9, minute: 0, second: 0 });
const bStep = (k: string) => ROUTES.B.steps.find((s) => s.key === k)!;
eq("call lands 15 min later, same morning",
   (() => { const w = londonWall(dueAt(morning, bStep("b_call").when)); return [w.day, w.hour, w.minute]; })(),
   [15, 9, 15]);
eq("evening text lands 18:00 the same day",
   (() => { const w = londonWall(dueAt(morning, bStep("b_sms_evening").when)); return [w.day, w.hour]; })(),
   [15, 18]);
eq("day 2 email lands 10:00 the NEXT day",
   (() => { const w = londonWall(dueAt(morning, bStep("b_email_day2").when)); return [w.day, w.hour]; })(),
   [16, 10]);
eq("day 4 text lands 10:00 three days later",
   (() => { const w = londonWall(dueAt(morning, bStep("b_sms_final").when)); return [w.day, w.hour]; })(),
   [18, 10]);

console.log("\n== quiet hours: a long delay is moved, a short one is not ==");
// Enquiry at 02:00. The 15 minute call must NOT be pushed to 08:00: somebody
// who rings at two in the morning is awake, and answering seven hours later is
// worse than not promising fifteen minutes.
const night = londonInstant({ year: 2026, month: 7, day: 15, hour: 2, minute: 0, second: 0 });
eq("the 15 minute call still happens at 02:15",
   (() => { const w = londonWall(dueAt(night, bStep("b_call").when)); return [w.hour, w.minute]; })(), [2, 15]);
eq("but the day 2 email is inside the window",
   isSendableHour(dueAt(night, bStep("b_email_day2").when)), true);
// Route C's second text is an hour out, which crosses into the window boundary.
const lateEve = londonInstant({ year: 2026, month: 7, day: 15, hour: 19, minute: 30, second: 0 });
eq("C's 1 hour text at 19:30 would be 20:30, so it moves to 08:00 next day",
   (() => { const w = londonWall(dueAt(lateEve, ROUTES.C.steps[0].when)); return [w.day, w.hour]; })(), [16, 8]);

console.log("\n== the bug this caught: an evening slot that has already passed ==");
// Enquire at 19:30. "Same day, early evening" is 18:00, which is behind us.
// It must be skipped, not fired immediately alongside the first text.
const s1 = nextStep("B", lateEve, 0, lateEve)!;
eq("first step from a 19:30 enquiry is still the call", s1.step.key, "b_call");
// Walk to the evening step's index and confirm it is skipped.
const eveIdx = ROUTES.B.steps.findIndex((s) => s.key === "b_sms_evening");
const afterEve = nextStep("B", lateEve, eveIdx, lateEve + 1)!;
eq("the passed evening slot is skipped", afterEve.step.key, "b_email_day2");
eq("and nothing is scheduled in the past", afterEve.dueAt > lateEve, true);

console.log("\n== due times are strictly increasing, from any enrolment hour ==");
for (const hour of [0, 2, 7, 8, 9, 12, 17, 18, 19, 20, 22, 23]) {
  const t0 = londonInstant({ year: 2026, month: 7, day: 15, hour, minute: 0, second: 0 });
  for (const id of ids) {
    let floor = t0, i = 0, seen: number[] = [], guard = 0;
    while (guard++ < 50) {
      const n = nextStep(id as any, t0, i, floor);
      if (!n) break;
      seen.push(n.dueAt);
      floor = n.dueAt; i = n.index + 1;
    }
    const sorted = [...seen].every((v, k) => k === 0 || v > seen[k - 1]);
    if (!sorted) { fail++; console.log(`  FAIL route ${id} enrolled ${hour}:00 is not increasing: ${JSON.stringify(seen)}`); }
  }
}
eq("every route, every enrolment hour, strictly increasing", fail, 0);

console.log("\n== route F: marketing, no dialling, nothing sent inline ==");
eq("F sends nothing immediately (quiet hours apply to its first text)", ROUTES.F.immediate.length, 0);
eq("F channels are text only", channelsUsed("F"), ["sms"]);
eq("F stops after two", ROUTES.F.steps.length, 2);

console.log("\n== stepAt bounds ==");
eq("past the end is undefined", stepAt("B", 99), undefined);
eq("a bad route id does not throw", stepAt("Z" as any, 0), undefined);

console.log("\n" + (fail ? "FAILED " + fail : "all " + pass + " assertions pass"));
process.exit(fail ? 1 : 0);
