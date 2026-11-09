import { readFileSync } from "node:fs";
import { ctx, INDEXES } from "./convex-mock.ts";
import * as R from "../convex/routing.ts";
import { ROUTES } from "../gates/routes.ts";
import { londonInstant } from "../gates/clock.ts";

const SCHEMA = readFileSync(new URL("../convex/schema.ts", import.meta.url), "utf8");

let pass = 0, fail = 0;
function ok(label: string, cond: boolean, detail?: unknown) {
  if (cond) { pass++; console.log("  ok   " + label); }
  else { fail++; console.log("  FAIL " + label + (detail !== undefined ? "\n         " + JSON.stringify(detail) : "")); }
}
function eq(label: string, got: unknown, want: unknown) {
  ok(label, JSON.stringify(got) === JSON.stringify(want), { got, want });
}

/* The handlers, called directly. */
const call = (fn: any, c: any, args: any) => fn._handler(c, args);

/* ---------------------------------------------------------------- fixtures */

function world() {
  const { db, ctx: c } = ctx();
  return { db, c };
}

async function makeLead(db: any, over: Record<string, any> = {}) {
  const now = Date.now();
  return await db.insert("leads", {
    sessionId: "smoke-" + Math.random().toString(36).slice(2, 8),
    name: "Smoke Tester",
    phone: "+447700900123",
    phoneKey: "+447700900123",
    email: "smoke@example.com",
    emailKey: "smoke@example.com",
    service: "SEO",
    message: "How much to rank for plumbers in Leeds?",
    hot: false,
    channel: "chat",
    status: "new",
    at: now,
    firstAt: now,
    sourceChannel: "website_form",
    ...over,
  });
}

/* ====================================================================== */
console.log("\n== the mock's indexes match schema.ts (so this suite cannot lie) ==");
for (const [table, idx] of Object.entries(INDEXES)) {
  for (const [name, fields] of Object.entries(idx)) {
    const literal = `.index("${name}", [${fields.map((f) => `"${f}"`).join(", ")}])`;
    ok(`${table}.${name} declared in schema.ts`, SCHEMA.includes(literal), literal);
  }
}

/* ====================================================================== */
console.log("\n== enrol ==");
{
  const { db, c } = world();
  const leadId = await makeLead(db);
  const r = await call(R.enrol, c, { leadId, route: "B" });
  ok("enrolled on B", r.enrolled === true, r);
  eq("two immediate touches handed back for the router to send inline",
     r.immediate.map((i: any) => i.channel), ["sms", "email"]);
  ok("the immediate email has a subject", Boolean(r.immediate[1].subject), r.immediate[1]);
  ok("the immediate texts carry an idempotency key",
     r.immediate.every((i: any) => typeof i.idempotencyKey === "string"));
  ok("a next step is scheduled", typeof r.nextDueAt === "number", r.nextDueAt);

  const again = await call(R.enrol, c, { leadId, route: "B" });
  eq("enrolling twice refuses: one campaign per person", again.why, "already_active");

  eq("route A starts nothing, and says so plainly",
     (await call(R.enrol, c, { leadId: await makeLead(db), route: "A" })).why,
     "route_has_no_sequence");
  eq("an unknown route is refused",
     (await call(R.enrol, c, { leadId, route: "Z" })).why, "unknown_route");
}

/* ====================================================================== */
console.log("\n== THE DOUBLE SEND GUARD: the test that must not be skipped ==");
{
  const { db, c } = world();
  const leadId = await makeLead(db);
  const e = await call(R.enrol, c, { leadId, route: "B" });
  /* Make the first queued step due. */
  await db.patch(e.sequenceId, { nextDueAt: Date.now() - 1000 });

  const first = await call(R.claimDue, c, { limit: 25 });
  eq("the first worker run claims it", first.claimed.length, 1);
  const claim = first.claimed[0];
  eq("it is route B's call step", claim.stepKey, "b_call");
  eq("the idempotency key is sequence and step", claim.idempotencyKey, `${e.sequenceId}:${claim.step}`);

  /* A second run overlapping the first. This is the real scenario: the cron
     fires every minute and a batch of 25 sends can take longer than that. */
  const second = await call(R.claimDue, c, { limit: 25 });
  eq("an overlapping run claims NOTHING", second.claimed.length, 0);
  ok("and says it skipped a leased row", second.skipped >= 1, second);

  /* The first worker finishes and reports back. */
  const done = await call(R.completeStep, c, {
    sequenceId: e.sequenceId, leaseToken: claim.leaseToken, outcome: "sent",
  });
  ok("the lease holder may report back", done.ok === true, done);

  /* The second worker, had it sent anyway, must not be able to advance the row. */
  const stale = await call(R.completeStep, c, {
    sequenceId: e.sequenceId, leaseToken: claim.leaseToken, outcome: "sent",
  });
  eq("the same token cannot be used twice", stale.why, "stale_lease");
  const wrong = await call(R.completeStep, c, {
    sequenceId: e.sequenceId, leaseToken: "a-token-from-somewhere-else", outcome: "sent",
  });
  eq("a token from another worker is refused", wrong.why, "stale_lease");
}

console.log("\n== recordTouch is idempotent, so a retried webhook cannot double up ==");
{
  const { db, c } = world();
  const leadId = await makeLead(db);
  const key = "sequences:1:0";
  const a = await call(R.recordTouch, c, {
    leadId, direction: "out", channel: "sms", status: "sent",
    body: "hello", idempotencyKey: key,
  });
  const b = await call(R.recordTouch, c, {
    leadId, direction: "out", channel: "sms", status: "sent",
    body: "hello", idempotencyKey: key,
  });
  eq("the first write creates a row", a.created, true);
  eq("the second returns the existing row", b.created, false);
  eq("and the ids are the same", a.id, b.id);
  eq("exactly one touch row exists", db.all("touches").length, 1);

  const noKey = await call(R.recordTouch, c, {
    leadId, direction: "in", channel: "sms", status: "received", body: "yes please",
  });
  eq("a touch with no key is still written", noKey.created, true);
}

/* ====================================================================== */
console.log("\n== the send gate ==");
{
  const { db, c } = world();
  const leadId = await makeLead(db);
  const e = await call(R.enrol, c, { leadId, route: "B" });
  await db.patch(e.sequenceId, { nextDueAt: Date.now() - 1000 });

  /* Opt out, the way an inbound STOP does it. */
  const sup = await call(R.suppress, c, {
    key: "+447700900123", kind: "phone", reason: "stop_reply",
  });
  ok("suppressing stops what is in flight", sup.stopped >= 1, sup);
  eq("the lead is matched by normalised number", sup.leads, 1);

  const after = await call(R.claimDue, c, { limit: 25 });
  eq("nothing is claimed for a suppressed person", after.claimed.length, 0);
  const seq = (await db.get(e.sequenceId)) as any;
  eq("the sequence is stopped as opted out", seq.stopReason, "opted_out");
  ok("consent withdrawal is recorded as evidence",
     db.all("consentEvents").some((r: any) => r.action === "withdrawn"));

  /* Suppressing twice is not an error and does not duplicate the row. */
  const twice = await call(R.suppress, c, {
    key: "07700 900123", kind: "phone", reason: "manual",
  });
  eq("a differently formatted number is the same number", twice.alreadyListed, true);
  eq("one suppression row, not two", db.all("suppressions").length, 1);
}

console.log("\n== the kill switch ==");
{
  const { db, c } = world();
  const leadId = await makeLead(db);
  const e = await call(R.enrol, c, { leadId, route: "B" });
  await db.patch(e.sequenceId, { nextDueAt: Date.now() - 1000 });

  eq("outbound is on by default", (await call(R.outboundEnabled, c, {})).enabled, true);
  await call(R.setOutbound, c, { enabled: false, by: "smoke" });
  eq("and can be switched off", (await call(R.outboundEnabled, c, {})).enabled, false);

  const r = await call(R.claimDue, c, { limit: 25 });
  eq("nothing is claimed while it is off", r.claimed.length, 0);
  eq("and the reason is given", r.reason, "kill_switch");
  eq("no new enrolment either",
     (await call(R.enrol, c, { leadId: await makeLead(db), route: "B" })).why, "kill_switch");

  await call(R.setOutbound, c, { enabled: true, by: "smoke" });
  eq("switching back on resumes the queue",
     (await call(R.claimDue, c, { limit: 25 })).claimed.length, 1);
}

console.log("\n== marketing needs recorded consent; a reply does not ==");
{
  const { db, c } = world();
  /* Route F is the only marketing route. */
  const cold = await makeLead(db, { sourceChannel: "reactivation" });
  const e = await call(R.enrol, c, { leadId: cold, route: "F" });
  await db.patch(e.sequenceId, { nextDueAt: Date.now() - 1000 });
  const r = await call(R.claimDue, c, { limit: 25 });
  eq("no consent on file means nothing goes out", r.claimed.length, 0);
  eq("and the sequence stops, rather than retrying for ever",
     ((await db.get(e.sequenceId)) as any).stopReason, "no_consent");

  /* Now with the soft opt-in recorded. */
  const warm = await makeLead(db, { sourceChannel: "reactivation", phone: "+447700900456", phoneKey: "+447700900456" });
  await call(R.logConsent, c, {
    leadId: warm, kind: "sms_marketing", action: "soft_optin_recorded",
    basis: "soft_optin", evidence: "Bought the SEO package 12 Mar 2026, opt-out offered on the order form",
  });
  eq("the flag is cached on the lead",
     ((await db.get(warm)) as any).smsConsent, "soft_optin");
  const e2 = await call(R.enrol, c, { leadId: warm, route: "F" });
  await db.patch(e2.sequenceId, { nextDueAt: Date.now() - 1000 });
  const r2 = await call(R.claimDue, c, { limit: 25 });
  eq("with the soft opt-in on file, it sends", r2.claimed.length, 1);
  ok("and the marketing text carries an opt-out",
     r2.claimed[0].body.includes("Reply STOP to opt out."), r2.claimed[0].body);

  /* The same person on a non-marketing route needs no consent at all,
     because answering their own enquiry is not marketing. */
  const enquirer = await makeLead(db, { phone: "+447700900789", phoneKey: "+447700900789" });
  const e3 = await call(R.enrol, c, { leadId: enquirer, route: "B" });
  await db.patch(e3.sequenceId, { nextDueAt: Date.now() - 1000 });
  const r3 = await call(R.claimDue, c, { limit: 25 });
  eq("a reply to their own enquiry needs no consent on file", r3.claimed.length, 1);
  ok("and carries no opt-out line, because they are not on a list",
     !r3.claimed[0].body.includes("Reply STOP"), r3.claimed[0].body);
}

/* ====================================================================== */
console.log("\n== a reply stops everything ==");
{
  const { db, c } = world();
  const leadId = await makeLead(db);
  const e = await call(R.enrol, c, { leadId, route: "B" });
  /* Enrolled a minute ago, replying now: the real order of events. A touch
     written in the same millisecond as the enrolment is the event that STARTED
     the sequence, not a reply to it. */
  await db.patch(e.sequenceId, { at: Date.now() - 60_000, nextDueAt: Date.now() - 1000 });

  await call(R.recordTouch, c, {
    leadId, direction: "in", channel: "sms", status: "received", body: "yes please",
  });
  const r = await call(R.claimDue, c, { limit: 25 });
  eq("nothing is claimed once they have answered", r.claimed.length, 0);
  eq("and the reason recorded is that they replied",
     ((await db.get(e.sequenceId)) as any).stopReason, "replied");
}

console.log("\n== a booking stops everything ==");
{
  const { db, c } = world();
  const sessionId = "smoke-booked";
  const leadId = await makeLead(db, { sessionId });
  const e = await call(R.enrol, c, { leadId, route: "B", sessionId });
  await db.patch(e.sequenceId, { at: Date.now() - 60_000, nextDueAt: Date.now() - 1000 });

  await db.insert("bookings", {
    reference: "OMH-SMOKE1", sessionId, name: "Smoke Tester",
    phone: "+447700900123", service: "Consultation",
    preferredDate: "2026-12-01", preferredTime: "10:00",
    channel: "chat", status: "requested", at: Date.now(),
  });
  const r = await call(R.claimDue, c, { limit: 25 });
  eq("nothing is chased after they book", r.claimed.length, 0);
  eq("recorded as booked", ((await db.get(e.sequenceId)) as any).stopReason, "booked");
}

console.log("\n== a cancelled booking does not count as booked ==");
{
  const { db, c } = world();
  const sessionId = "smoke-cancelled";
  const leadId = await makeLead(db, { sessionId });
  const e = await call(R.enrol, c, { leadId, route: "B", sessionId });
  await db.patch(e.sequenceId, { at: Date.now() - 60_000, nextDueAt: Date.now() - 1000 });
  await db.insert("bookings", {
    reference: "OMH-SMOKE2", sessionId, name: "Smoke Tester",
    phone: "+447700900123", service: "Consultation",
    preferredDate: "2026-12-01", preferredTime: "10:00",
    channel: "chat", status: "cancelled", at: Date.now(),
  });
  const r = await call(R.claimDue, c, { limit: 25 });
  eq("a cancelled booking still gets followed up", r.claimed.length, 1);
}

/* ====================================================================== */
console.log("\n== the call_no_answer gate ==");
{
  const { db, c } = world();
  const leadId = await makeLead(db);
  const e = await call(R.enrol, c, { leadId, route: "B" });

  /* Step 0 is the call. Send it. */
  await db.patch(e.sequenceId, { at: Date.now() - 60_000, nextDueAt: Date.now() - 1000 });
  const c1 = (await call(R.claimDue, c, { limit: 5 })).claimed[0];
  eq("step 0 is the call", c1.stepKey, "b_call");
  await call(R.completeStep, c, { sequenceId: e.sequenceId, leaseToken: c1.leaseToken, outcome: "sent" });

  /* The call was ANSWERED. The "we tried to call" text must not go out. */
  await call(R.recordTouch, c, {
    leadId, direction: "out", channel: "call", status: "answered",
    idempotencyKey: "call-answered",
  });
  await db.patch(e.sequenceId, { nextDueAt: Date.now() - 1000 });
  const after = await call(R.claimDue, c, { limit: 5 });
  ok("the 'we tried to call' text is skipped when the call was answered",
     after.claimed.length === 0 || after.claimed[0].stepKey !== "b_sms_we_tried",
     after.claimed[0]);
  const seq = (await db.get(e.sequenceId)) as any;
  ok("and the sequence moved past it rather than stalling",
     seq.status === "active" || seq.status === "completed", seq);
}
{
  const { db, c } = world();
  const leadId = await makeLead(db);
  const e = await call(R.enrol, c, { leadId, route: "B" });
  await db.patch(e.sequenceId, { at: Date.now() - 60_000, nextDueAt: Date.now() - 1000 });
  const c1 = (await call(R.claimDue, c, { limit: 5 })).claimed[0];
  await call(R.completeStep, c, { sequenceId: e.sequenceId, leaseToken: c1.leaseToken, outcome: "sent" });
  /* This time the call went UNANSWERED. */
  await call(R.recordTouch, c, {
    leadId, direction: "out", channel: "call", status: "no_answer",
    idempotencyKey: "call-no-answer",
  });
  await db.patch(e.sequenceId, { nextDueAt: Date.now() - 1000 });
  const after = await call(R.claimDue, c, { limit: 5 });
  eq("an unanswered call does produce the follow-up text",
     after.claimed[0]?.stepKey, "b_sms_we_tried");
}

/* ====================================================================== */
console.log("\n== failures retry, then give up ==");
{
  const { db, c } = world();
  const leadId = await makeLead(db);
  const e = await call(R.enrol, c, { leadId, route: "B" });

  for (let i = 1; i <= 3; i++) {
    await db.patch(e.sequenceId, { nextDueAt: Date.now() - 1000 });
    const claim = (await call(R.claimDue, c, { limit: 5 })).claimed[0];
    ok(`attempt ${i} is handed out`, Boolean(claim), claim);
    const res = await call(R.completeStep, c, {
      sequenceId: e.sequenceId, leaseToken: claim.leaseToken,
      outcome: "failed", reason: "twilio 500",
    });
    if (i < 3) {
      eq(`attempt ${i} schedules a retry`, res.status, "retrying");
      ok("the retry is in the future", res.nextDueAt > Date.now());
    } else {
      eq("the third failure gives up", res.status, "failed");
      eq("and records why", ((await db.get(e.sequenceId)) as any).stopReason, "twilio 500");
    }
  }
  const none = await call(R.claimDue, c, { limit: 5 });
  eq("a failed sequence is not picked up again", none.claimed.length, 0);
}

/* ====================================================================== */
console.log("\n== a route runs to the end and stops ==");
{
  const { db, c } = world();
  const leadId = await makeLead(db);
  const e = await call(R.enrol, c, { leadId, route: "B" });
  /* Enrol as of now. Back-dating it to a fixed date would put every step
     behind the floor and the route would finish after one step, which would
     make this a test of nothing. */

  const sent: string[] = [];
  for (let guard = 0; guard < 20; guard++) {
    const seq = (await db.get(e.sequenceId)) as any;
    if (seq.status !== "active") break;
    await db.patch(e.sequenceId, { nextDueAt: Date.now() - 1000 });
    const batch = await call(R.claimDue, c, { limit: 5 });
    const claim = batch.claimed[0];
    if (!claim) {
      /* A skipped step still advances the row; keep going. */
      const now = (await db.get(e.sequenceId)) as any;
      if (now.status !== "active") break;
      continue;
    }
    sent.push(claim.stepKey);
    await call(R.completeStep, c, {
      sequenceId: e.sequenceId, leaseToken: claim.leaseToken, outcome: "sent",
    });
  }
  const final = (await db.get(e.sequenceId)) as any;
  eq("it finishes", final.status, "completed");
  eq("recorded as exhausted", final.stopReason, "exhausted");
  ok("it sent the call and the final text", sent.includes("b_call") && sent.includes("b_sms_final"), sent);
  ok("it never sent the same step twice", new Set(sent).size === sent.length, sent);
  eq("no step is left scheduled", final.nextDueAt, undefined);
}

/* ====================================================================== */
console.log("\n== a sequence with nothing due is not claimed ==");
{
  const { db, c } = world();
  const leadId = await makeLead(db);
  const e = await call(R.enrol, c, { leadId, route: "B" });
  /* Leave nextDueAt where enrol put it: fifteen minutes from now. */
  const r = await call(R.claimDue, c, { limit: 25 });
  eq("a future step is not due yet", r.claimed.length, 0);

  /* A stopped sequence has no nextDueAt at all, and must never match. */
  await call(R.stopSequences, c, { leadId, reason: "manual" });
  const r2 = await call(R.claimDue, c, { limit: 25 });
  eq("a stopped sequence is never claimed", r2.claimed.length, 0);
  eq("stopping is recorded", ((await db.get(e.sequenceId)) as any).stopReason, "manual");
}

/* ====================================================================== */
console.log("\n== missing contact details skip a step rather than killing the route ==");
{
  const { db, c } = world();
  /* No email at all. Route B's day 2 step is an email; it must be skipped
     while the texts still happen. */
  const leadId = await makeLead(db, { email: undefined, emailKey: undefined });
  const e = await call(R.enrol, c, { leadId, route: "B" });

  const sent: string[] = [];
  for (let guard = 0; guard < 20; guard++) {
    const seq = (await db.get(e.sequenceId)) as any;
    if (seq.status !== "active") break;
    await db.patch(e.sequenceId, { nextDueAt: Date.now() - 1000 });
    const claim = (await call(R.claimDue, c, { limit: 5 })).claimed[0];
    if (!claim) continue;
    sent.push(claim.stepKey);
    await call(R.completeStep, c, {
      sequenceId: e.sequenceId, leaseToken: claim.leaseToken, outcome: "sent",
    });
  }
  ok("the email step was skipped", !sent.includes("b_email_day2"), sent);
  ok("the final text still went", sent.includes("b_sms_final"), sent);
  eq("and the route completed normally",
     ((await db.get(e.sequenceId)) as any).status, "completed");
}

/* ====================================================================== */
console.log("\n== reading: timeline and channel facts ==");
{
  const { db, c } = world();
  const sessionId = "smoke-timeline";
  const leadId = await makeLead(db, { sessionId });
  await db.insert("messages", {
    sessionId, role: "user", channel: "chat", text: "hello there", at: Date.now() - 5000,
  });
  await db.insert("messages", {
    sessionId, role: "assistant", channel: "chat", text: "hello back", at: Date.now() - 4000,
  });
  await call(R.recordTouch, c, {
    leadId, sessionId, direction: "out", channel: "sms", status: "sent",
    body: "first text", idempotencyKey: "t1",
  });
  const e = await call(R.enrol, c, { leadId, route: "B", sessionId });

  const t = await call(R.leadTimeline, c, { leadId });
  ok("the timeline returns the person", t.lead.name === "Smoke Tester", t.lead);
  eq("their source channel is on it", t.lead.sourceChannel, "website_form");
  ok("messages and touches are in one list",
     t.events.some((x: any) => x.type === "message") && t.events.some((x: any) => x.type === "touch"),
     t.events.map((x: any) => x.type));
  const times = t.events.map((x: any) => x.at);
  ok("and it is in chronological order",
     times.every((v: number, i: number) => i === 0 || v >= times[i - 1]), times);
  eq("the sequence is listed", t.sequences.length, 1);

  const facts = await call(R.channelFacts, c, {});
  const row = facts.rows.find((r: any) => r.sessionId === sessionId);
  ok("channel facts include this lead", Boolean(row), facts.rows.length);
  eq("grouped by acquisition channel", row.sourceChannel, "website_form");
  ok("time to first touch is measured", typeof row.msToFirstTouch === "number", row.msToFirstTouch);
  eq("one text counted out", row.smsOut, 1);
  /* The fields the shared test-row rule needs must be present, or the
     dashboard cannot exclude our own traffic. */
  ok("the row carries what isTestRow needs",
     "sessionId" in row && "name" in row && "email" in row, Object.keys(row));
}

console.log("\n== the inline path is gated too, not just the queue ==");
{
  /* The hole this closes: `enrol` hands the router a set of touches to send
     immediately, inside two minutes. That path reaches a phone faster than
     any other, so an ungated shortcut here would be the one that actually
     texts somebody who opted out. */
  const { db, ctx: c } = ctx();
  const leadId = await makeLead(db);
  await call(R.suppress, c, { key: "+447700900123", kind: "phone", reason: "stop_reply" });

  const r = await call(R.enrol, c, { leadId, route: "B" });
  eq("a suppressed person is not enrolled at all", r.why, "suppressed");
  eq("and nothing is handed back to send", r.immediate, undefined);
  eq("no sequence row was created", db.all("sequences").length, 0);
}
{
  /* Suppressed by EMAIL only. The texts are still fine; the email is not. */
  const { db, ctx: c } = ctx();
  const leadId = await makeLead(db, { phone: "+447700900555", phoneKey: "+447700900555" });
  await call(R.suppress, c, { key: "smoke@example.com", kind: "email", reason: "complaint" });
  const r = await call(R.enrol, c, { leadId, route: "B" });
  eq("still refused, because one of their details is listed", r.why, "suppressed");
}
{
  /* Route F, marketing, with no consent on file. The queued steps already
     stop; the immediate ones must never be handed out either. */
  const { db, ctx: c } = ctx();
  const leadId = await makeLead(db, { sourceChannel: "reactivation" });
  const r = await call(R.enrol, c, { leadId, route: "F" });
  ok("F enrols (its first text is queued, not inline)", r.enrolled === true, r);
  eq("and it has no inline touches by design", r.immediate.length, 0);
}
{
  /* No email address at all: the email touch is dropped, the text still goes,
     and the router is TOLD rather than left to wonder. */
  const { db, ctx: c } = ctx();
  const leadId = await makeLead(db, { email: undefined, emailKey: undefined });
  const r = await call(R.enrol, c, { leadId, route: "B" });
  eq("only the text is handed back", r.immediate.map((i: any) => i.channel), ["sms"]);
  eq("and the email is reported as skipped", r.skipped, [
    { key: "b_email_first", channel: "email", why: "no_email" },
  ]);
}
{
  /* The kill switch covers the inline path as well. */
  const { db, ctx: c } = ctx();
  const leadId = await makeLead(db);
  await call(R.setOutbound, c, { enabled: false, by: "smoke" });
  const r = await call(R.enrol, c, { leadId, route: "B" });
  eq("nothing is enrolled while outbound is off", r.why, "kill_switch");
}


console.log("\n== a step that already went out is never handed out again ==");
{
  /* The crash this closes: the worker sends the text, then dies before it can
     report back. The lease expires after two minutes and the row becomes
     claimable again, which is correct. Sending the text again is not.
     `recordTouch` is idempotent, but the log is written AFTER the send, so
     only a check before handing the work out stops the second text. */
  const { db, ctx: c } = ctx();
  const leadId = await makeLead(db);
  const e = await call(R.enrol, c, { leadId, route: "B" });
  await db.patch(e.sequenceId, { nextDueAt: Date.now() - 1000 });

  const first = await call(R.claimDue, c, { limit: 5 });
  const claim = first.claimed[0];
  ok("the step is handed out once", Boolean(claim), first);

  /* It sent, and recorded the touch. Then the worker died: no completeStep,
     and the lease runs out. */
  await call(R.recordTouch, c, {
    leadId, direction: "out", channel: claim.channel, status: "sent",
    body: claim.body, idempotencyKey: claim.idempotencyKey,
  });
  await db.patch(e.sequenceId, { leaseToken: undefined, leaseUntil: undefined });

  const second = await call(R.claimDue, c, { limit: 5 });
  eq("the same step is NOT handed out a second time", second.claimed.length, 0);
  const seq = (await db.get(e.sequenceId)) as any;
  ok("the row moved on instead of stalling", seq.step > claim.step || seq.status !== "active", seq);
  eq("and only one touch exists for it", db.all("touches").length, 1);
}
{
  /* But a step whose send FAILED must be retried, or a transient Twilio
     error would silently drop a message. */
  const { db, ctx: c } = ctx();
  const leadId = await makeLead(db);
  const e = await call(R.enrol, c, { leadId, route: "B" });
  await db.patch(e.sequenceId, { nextDueAt: Date.now() - 1000 });
  const claim = (await call(R.claimDue, c, { limit: 5 })).claimed[0];
  await call(R.recordTouch, c, {
    leadId, direction: "out", channel: claim.channel, status: "failed",
    error: "twilio 500", idempotencyKey: claim.idempotencyKey,
  });
  await db.patch(e.sequenceId, { leaseToken: undefined, leaseUntil: undefined, nextDueAt: Date.now() - 1000 });
  const again = await call(R.claimDue, c, { limit: 5 });
  eq("a failed send IS retried", again.claimed[0]?.stepKey, claim.stepKey);
}


console.log("\n== booking confirmations ==");
{
  const { db, ctx: c } = ctx();
  const sessionId = "smoke-conf";
  const leadId = await makeLead(db, { sessionId });
  const bookingId = await db.insert("bookings", {
    reference: "OMH-CONF01", sessionId, name: "Smoke Tester",
    phone: "+447700900123", email: "smoke@example.com", service: "Local SEO",
    preferredDate: "2026-12-01", preferredTime: "10:00",
    channel: "chat", status: "requested", at: Date.now(),
  });

  const r = await call(R.pendingConfirmations, c, {});
  eq("one confirmation is owed", r.items.length, 1);
  const item = r.items[0];
  eq("it is a text", item.channel, "sms");
  eq("to the number they booked with", item.to, "+447700900123");
  ok("it names the reference", item.body.includes("OMH-CONF01"), item.body);
  ok("and the date and time", item.body.includes("2026-12-01") && item.body.includes("10:00"), item.body);
  ok("it is tied to the person, so the gate has somebody to check", item.leadId === leadId, item);
  eq("keyed on the booking, not a step", item.idempotencyKey, `booking:${bookingId}:confirmed`);

  /* Asked again before the worker reports back: still owed, because nothing
     has been marked. The idempotency key is what stops a double send. */
  const again = await call(R.pendingConfirmations, c, {});
  eq("still owed until it is marked", again.items.length, 1);

  await call(R.markConfirmationSent, c, { bookingId });
  const after = await call(R.pendingConfirmations, c, {});
  eq("not owed once marked", after.items.length, 0);
}
{
  /* Somebody who told us to stop does not get a confirmation text either.
     The booking details are in their email and the team can ring them. */
  const { db, ctx: c } = ctx();
  const sessionId = "smoke-conf-stop";
  await makeLead(db, { sessionId });
  const bookingId = await db.insert("bookings", {
    reference: "OMH-CONF02", sessionId, name: "Smoke Tester",
    phone: "+447700900123", service: "Local SEO",
    preferredDate: "2026-12-01", preferredTime: "10:00",
    channel: "chat", status: "requested", at: Date.now(),
  });
  await call(R.suppress, c, { key: "+447700900123", kind: "phone", reason: "stop_reply" });

  const r = await call(R.pendingConfirmations, c, {});
  eq("nothing is sent to somebody who opted out", r.items.length, 0);
  const b = (await db.get(bookingId)) as any;
  ok("and it is marked handled rather than re-checked for ever",
     typeof b.confirmationSentAt === "number", b);
}
{
  /* The kill switch covers confirmations too. */
  const { db, ctx: c } = ctx();
  await db.insert("bookings", {
    reference: "OMH-CONF03", sessionId: "smoke-conf-kill", name: "Smoke Tester",
    phone: "+447700900123", service: "Local SEO",
    preferredDate: "2026-12-01", preferredTime: "10:00",
    channel: "chat", status: "requested", at: Date.now(),
  });
  await call(R.setOutbound, c, { enabled: false, by: "smoke" });
  const r = await call(R.pendingConfirmations, c, {});
  eq("nothing is owed while outbound is off", r.items.length, 0);
  eq("and it says why", r.reason, "kill_switch");
}
{
  /* A booking with no phone number cannot be texted, and must not jam the
     queue by being returned every minute with nothing to send to. */
  const { db, ctx: c } = ctx();
  await db.insert("bookings", {
    reference: "OMH-CONF04", sessionId: "smoke-conf-nophone", name: "Smoke Tester",
    phone: "", service: "Local SEO",
    preferredDate: "2026-12-01", preferredTime: "10:00",
    channel: "chat", status: "requested", at: Date.now(),
  });
  const r = await call(R.pendingConfirmations, c, {});
  eq("no number means nothing to send", r.items.length, 0);
}


console.log("\n== a confirmation has a shelf life ==");
{
  /* Found on the first live run: nineteen old bookings had never been
     confirmed, because the feature did not exist when they were made. Texting
     somebody about a booking from a fortnight ago, for a date that has already
     passed, is worse than saying nothing. */
  const { db, ctx: c } = ctx();
  const sessionId = "smoke-conf-old";
  await makeLead(db, { sessionId });
  const old = await db.insert("bookings", {
    reference: "OMH-OLD01", sessionId, name: "Smoke Tester",
    phone: "+447700900123", service: "Local SEO",
    preferredDate: "2026-10-26", preferredTime: "09:00",
    channel: "chat", status: "requested",
    at: Date.now() - 14 * 24 * 60 * 60 * 1000,
  });
  const fresh = await db.insert("bookings", {
    reference: "OMH-NEW01", sessionId, name: "Smoke Tester",
    phone: "+447700900123", service: "Local SEO",
    preferredDate: "2026-12-01", preferredTime: "10:00",
    channel: "chat", status: "requested", at: Date.now() - 60_000,
  });

  const r = await call(R.pendingConfirmations, c, {});
  eq("only the fresh booking is confirmed", r.items.length, 1);
  eq("and it is the right one", r.items[0].idempotencyKey, `booking:${fresh}:confirmed`);
  ok("the old one is marked rather than re-examined for ever",
     typeof ((await db.get(old)) as any).confirmationSentAt === "number");
}
{
  /* A number that is not a number cannot be texted. Marked, not retried, so
     it does not come back every minute with nowhere to send to. */
  const { db, ctx: c } = ctx();
  const ids = [];
  for (const [ref, phone] of [["OMH-BAD1", ""], ["OMH-BAD2", "n/a"], ["OMH-BAD3", "12"]]) {
    ids.push(await db.insert("bookings", {
      reference: ref, sessionId: "smoke-conf-bad", name: "Smoke Tester",
      phone, service: "Local SEO",
      preferredDate: "2026-12-01", preferredTime: "10:00",
      channel: "chat", status: "requested", at: Date.now(),
    }));
  }
  const r = await call(R.pendingConfirmations, c, {});
  eq("an unusable number is not texted", r.items.length, 0);
  for (const id of ids) {
    ok("and not retried", typeof ((await db.get(id)) as any).confirmationSentAt === "number");
  }

  /* A valid international number IS texted. `+8801712-345678` looked like
     rubbish in the live data but is a real Bangladesh mobile, and phoneKey
     is right to accept it. Whether we want to text outside the UK is a
     commercial question, not a validation one. */
  const bd = await db.insert("bookings", {
    reference: "OMH-BD1", sessionId: "smoke-conf-bd", name: "Smoke Tester",
    phone: "+8801712-345678", service: "Local SEO",
    preferredDate: "2026-12-01", preferredTime: "10:00",
    channel: "chat", status: "requested", at: Date.now(),
  });
  const r2 = await call(R.pendingConfirmations, c, {});
  eq("a valid overseas number is not rejected", r2.items.length, 1);
  eq("and it is that one", r2.items[0].idempotencyKey, `booking:${bd}:confirmed`);
}

console.log("\n== backfilling the match keys on older leads ==");
{
  /* Leads written before phoneKey existed have a number but nothing to match
     it against, so an inbound text from them finds nobody: their reply does
     not stop the follow-up and does not reach their timeline. */
  const { db, ctx: c } = ctx();
  const legacy = await db.insert("leads", {
    sessionId: "smoke-legacy", name: "Legacy Lead",
    phone: "07700 900654", email: "Legacy@Example.com",
    hot: false, channel: "chat", status: "new", at: Date.now(),
  });
  eq("before: the number does not find them",
     (await call(R.findLead, c, { phone: "07700900654" })).found, false);

  const r = await call(R.backfillKeys, c, {});
  ok("it reports what it filled", r.phones >= 1 && r.emails >= 1, r);

  const after = await call(R.findLead, c, { phone: "+447700900654" });
  eq("after: the same person is found", after.found, true);
  eq("and it is the right row", after.leadId, legacy);
  eq("however the number is written", 
     (await call(R.findLead, c, { phone: "07700 900654" })).leadId, legacy);
  eq("and by email too, whatever the case",
     (await call(R.findLead, c, { email: "legacy@example.com" })).leadId, legacy);

  const again = await call(R.backfillKeys, c, {});
  eq("running it twice fills nothing more", [again.phones, again.emails], [0, 0]);
}


console.log("\n== what came of a lead, set by a person ==");
{
  const { db, ctx: c } = ctx();
  const leadId = await makeLead(db);

  eq("an invented outcome is refused",
     (await call(R.setOutcome, c, { leadId, outcome: "maybe" })).why, "unknown_outcome");

  const won = await call(R.setOutcome, c, {
    leadId, outcome: "won", valueGbp: 2400, by: "smoke",
  });
  ok("a win is recorded", won.ok === true, won);
  const lead = (await db.get(leadId)) as any;
  eq("with its value", lead.valueGbp, 2400);
  eq("and the pipeline status follows", lead.status, "closed");
  ok("and who set it, and when", lead.outcomeBy === "smoke" && typeof lead.outcomeAt === "number");

  /* The bug this prevents: a deal marked won at two thousand, then corrected
     to lost, would otherwise leave the figure behind and inflate every
     revenue total that groups by channel. */
  await call(R.setOutcome, c, { leadId, outcome: "lost", lostReason: "went elsewhere" });
  const after = (await db.get(leadId)) as any;
  eq("changing it to lost clears the value", after.valueGbp, undefined);
  eq("and keeps the reason", after.lostReason, "went elsewhere");

  await call(R.setOutcome, c, { leadId, outcome: "quoted" });
  const back = (await db.get(leadId)) as any;
  eq("a reopened lead is not closed", back.status, "contacted");
  eq("and carries no lost reason", back.lostReason, undefined);
}
{
  /* The whole point: the channel report can now rank on business, not on
     volume. */
  const { db, ctx: c } = ctx();
  const g = await makeLead(db, { sessionId: "smoke-g", sourceChannel: "google_ads" });
  const f = await makeLead(db, { sessionId: "smoke-f", sourceChannel: "facebook_ads", phone: "+447700900222", phoneKey: "+447700900222" });
  await call(R.setOutcome, c, { leadId: g, outcome: "won", valueGbp: 1800 });
  await call(R.setOutcome, c, { leadId: f, outcome: "lost" });

  const facts = await call(R.channelFacts, c, {});
  const google = facts.rows.find((r: any) => r.sessionId === "smoke-g");
  const meta = facts.rows.find((r: any) => r.sessionId === "smoke-f");
  eq("the won deal reaches the channel report", google.outcome, "won");
  eq("with its value", google.valueGbp, 1800);
  eq("and the lost one too", meta.outcome, "lost");
  eq("carrying no value", meta.valueGbp, null);
}


console.log("\n" + (fail ? "FAILED " + fail + " of " + (pass + fail) : "all " + pass + " assertions pass"));
process.exit(fail ? 1 : 0);
