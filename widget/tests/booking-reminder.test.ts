import { ctx } from "./convex-mock";
import { remindAbout, cancelReminders } from "../convex/reminders";
import { enrol } from "../convex/routing";

/* =========================================================================
   Putting a booking on the reminder route, and taking it off again.

   The reminder itself is timed in gates/routes.ts and asserted in
   reminder.test.ts. This is the part that decides WHO gets one, and the
   risk here is not a missed reminder.

   It is reminding somebody about an appointment they cancelled. That tells
   them nobody was listening, and it is the kind of thing that ends a
   relationship with a supplier. So cancelling has to stop the sequence,
   and moving has to re-time it rather than leave the old moment standing.
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
const call = (fn: any, c: any, args: any) => fn._handler(c, args);

/* Far enough ahead that both reminders still have a moment. */
const DAY = 86_400_000;
const future = () => {
  const d = new Date(Date.now() + 9 * DAY);
  return { date: d.toISOString().slice(0, 10), time: "14:00" };
};

async function seeded() {
  const { db, ctx: c } = ctx();
  const leadId = await db.insert("leads", {
    name: "Jane Cole", sessionId: "s1", channel: "chat", at: Date.now(),
    status: "new", hot: false, phone: "+447700900111", phoneKey: "+447700900111",
  });
  await db.insert("settings", { key: "outboundEnabled", value: true });
  /* remindAbout reaches enrol through the generated `api` object, which
     holds a reference rather than the function. */
  c.runMutation = (_ref: any, args: any) => (enrol as any)._handler(c, args);
  return { db, c, leadId };
}

console.log("\n== a booking gets reminders ==");
{
  const { db, c, leadId } = await seeded();
  const f = future();
  const r = await call(remindAbout, c, {
    leadId, sessionId: "s1", preferredDate: f.date, preferredTime: f.time,
  });
  eq("it enrols", r.enrolled, true);

  const seq = db.all("sequences").find((s: any) => s.route === "H");
  ok("on the reminder route", Boolean(seq));
  ok("anchored to the appointment, not to now", (seq.anchorAt ?? 0) > Date.now() + 8 * DAY,
     String(seq.anchorAt));
  ok("with something due before then", (seq.nextDueAt ?? 0) < seq.anchorAt,
     `${seq.nextDueAt} < ${seq.anchorAt}`);
  ok("and it is active", seq.status === "active", seq.status);
}

console.log("\n== an appointment too soon to remind about ==");
{
  const { db, c, leadId } = await seeded();
  const soon = new Date(Date.now() + 30 * 60 * 1000);
  const r = await call(remindAbout, c, {
    leadId, sessionId: "s1",
    preferredDate: soon.toISOString().slice(0, 10),
    preferredTime: soon.toISOString().slice(11, 16),
  });
  const seq = db.all("sequences").find((s: any) => s.route === "H");
  /* Either not enrolled, or enrolled with nothing left to send. What must
     NOT happen is a reminder firing after the appointment. */
  ok("nothing is left waiting to fire", !seq || seq.status !== "active" || !seq.nextDueAt,
     JSON.stringify({ enrolled: r.enrolled, status: seq?.status, due: seq?.nextDueAt }));
}

console.log("\n== cancelling stops it, which is the whole risk ==");
{
  const { db, c, leadId } = await seeded();
  const f = future();
  await call(remindAbout, c, { leadId, sessionId: "s1", preferredDate: f.date, preferredTime: f.time });
  ok("it is running first", db.all("sequences").some((s: any) => s.route === "H" && s.status === "active"));

  await call(cancelReminders, c, { leadId, why: "cancelled" });

  const after = db.all("sequences").filter((s: any) => s.route === "H");
  eq("nothing on the reminder route is still active",
     after.filter((s: any) => s.status === "active").length, 0);
  ok("and the reason is recorded", after.some((s: any) => s.stopReason === "cancelled"),
     JSON.stringify(after.map((s: any) => s.stopReason)));
}

console.log("\n== moving it re-times rather than leaving the old moment ==");
{
  const { db, c, leadId } = await seeded();
  const f = future();
  await call(remindAbout, c, { leadId, sessionId: "s1", preferredDate: f.date, preferredTime: f.time });
  const before = db.all("sequences").find((s: any) => s.route === "H").anchorAt;

  const later = new Date(Date.now() + 14 * DAY);
  await call(remindAbout, c, {
    leadId, sessionId: "s1",
    preferredDate: later.toISOString().slice(0, 10), preferredTime: "11:00",
  });

  const live = db.all("sequences").filter((s: any) => s.route === "H" && s.status === "active");
  eq("there is exactly one live reminder sequence, not two", live.length, 1);
  ok("and it points at the NEW appointment", live[0].anchorAt !== before,
     `${before} -> ${live[0].anchorAt}`);
}

console.log("\n== a booking with nobody to remind ==");
{
  const { db, ctx: c } = ctx();
  await db.insert("settings", { key: "outboundEnabled", value: true });
  const f = future();
  const r = await call(remindAbout, c, {
    leadId: "nope", sessionId: "s1", preferredDate: f.date, preferredTime: f.time,
  });
  eq("it refuses rather than throwing", r.enrolled, false);
  eq("no sequence is left behind", db.all("sequences").length, 0);
}

console.log(`\n${pass} passed, ${fail} failed`);
if (fail) process.exit(1);
