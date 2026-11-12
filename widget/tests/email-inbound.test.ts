import { ctx } from "./convex-mock";
import { emailReplyArrived } from "../convex/email";
import { countsAsReply } from "../gates/email-reply.js";

/* =========================================================================
   What happens in the database when a reply lands.

   `gates/email-reply.js` decides whether a message is a person and which
   outbound touch it answers. This is the half that acts on that: record it
   on the timeline, and stop chasing somebody who has answered.

   The properties worth holding are the ones that protect the figures and
   the person:

     - a reply stops the follow-up, because continuing to chase somebody
       who replied is the most annoying thing this system can do;
     - an auto-reply does NOT stop it and does NOT count, or an
       out-of-office would end every sequence it touched;
     - the same message arriving twice, which IMAP polling makes likely,
       is recorded once.
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

async function seeded() {
  const { db, ctx: c } = ctx();
  const leadId = await db.insert("leads", {
    name: "Jane Cole", sessionId: "s1", channel: "chat", at: 1000,
    status: "contacted", hot: false, email: "jane@example.com", emailKey: "jane@example.com",
  });
  const seqId = await db.insert("sequences", {
    leadId, route: "B", step: 1, status: "active", at: 1000, nextDueAt: 9_000_000,
  });
  /* The email we sent, carrying the id the mail server gave it. */
  await db.insert("touches", {
    leadId, direction: "out", channel: "email", status: "sent",
    providerId: "<omh-abc123@mail>", body: "Your enquiry about Local SEO", at: 2000,
  });
  return { db, c, leadId, seqId };
}

const msg = (over: Record<string, unknown> = {}) => ({
  subject: "Re: Your enquiry about Local SEO",
  from: "jane@example.com",
  to: "replies@onlinemarketinghelp.co.uk",
  headers: { "in-reply-to": "<omh-abc123@mail>" },
  text: "Thursday works, thanks.",
  uid: "imap-1",
  ...over,
});

console.log("\n== a person replies ==");
{
  const { db, c, leadId } = await seeded();
  const r = await call(emailReplyArrived, c, { message: msg() });

  eq("it is counted as a reply", r.reply, true);
  eq("against the right lead", r.leadId, leadId);

  const inbound = db.all("touches").filter((t: any) => t.direction === "in");
  eq("one inbound touch is recorded", inbound.length, 1);
  eq("on the email channel", inbound[0].channel, "email");
  ok("carrying what they said", String(inbound[0].body).includes("Thursday works"));

  const seq = db.all("sequences")[0];
  eq("and the chasing stops", seq.status, "stopped");
  eq("for the right reason", seq.stopReason, "replied");
}

console.log("\n== an out-of-office must not do any of that ==");
{
  const { db, c } = await seeded();
  const r = await call(emailReplyArrived, c, {
    message: msg({ headers: { "in-reply-to": "<omh-abc123@mail>", "auto-submitted": "auto-replied" } }),
  });

  eq("it is not a reply", r.reply, false);
  eq("and says why", r.why, "auto_reply");

  const seq = db.all("sequences")[0];
  eq("the sequence is untouched", seq.status, "active");
  eq("and still due", seq.nextDueAt, 9_000_000);

  /* Recorded, but as what it is. The team should still be able to see that
     an out-of-office came back. */
  const inbound = db.all("touches").filter((t: any) => t.direction === "in");
  eq("it is still on the timeline", inbound.length, 1);
  eq("marked as automatic rather than as a reply", inbound[0].status, "auto_reply");
}

console.log("\n== and the worker must not treat it as a reply either ==");
{
  /* The trap this nearly fell into. `emailReplyArrived` is careful not to
     stop a sequence for an out-of-office, but it still records the message
     on the timeline so the team can see one came back. The sequence worker
     separately asks "has anything inbound arrived since enrolment" and
     stops the sequence if so. Without excluding it there, an
     out-of-office would stop the follow-up anyway, by the back door, and
     be counted as a reply on every report. */
  const { db, c } = await seeded();
  await call(emailReplyArrived, c, {
    message: msg({ headers: { "in-reply-to": "<omh-abc123@mail>", "auto-submitted": "auto-replied" } }),
  });

  const inbound = db.all("touches").filter((t: any) => t.direction === "in");
  eq("the auto-reply is on the timeline", inbound.length, 1);
  ok("marked so that anything asking 'did they reply' can exclude it",
     inbound[0].status === "auto_reply", inbound[0].status);
  eq("and the shared rule says it is not a reply", countsAsReply(inbound[0]), false);
  eq("while a real one is", countsAsReply({ direction: "in", status: "received" }), true);
  eq("and an outbound touch never is", countsAsReply({ direction: "out", status: "sent" }), false);
}

console.log("\n== the same message twice ==");
{
  const { db, c } = await seeded();
  await call(emailReplyArrived, c, { message: msg() });
  const second = await call(emailReplyArrived, c, { message: msg() });

  /* IMAP polling re-reads a folder; a restart re-reads it from the start.
     Recording a reply twice would double the reply rate. */
  eq("the second time changes nothing", second.duplicate, true);
  eq("still one inbound touch", db.all("touches").filter((t: any) => t.direction === "in").length, 1);
}

console.log("\n== mail that belongs to nobody ==");
{
  const { db, c } = await seeded();
  const r = await call(emailReplyArrived, c, {
    message: msg({ headers: {}, to: "hello@onlinemarketinghelp.co.uk" }),
  });
  eq("it is not attributed to a lead", r.leadId, null);
  eq("nor counted", r.reply, false);
  eq("with its own reason, so it can be reconciled", r.why, "unmatched");
  eq("nothing is written", db.all("touches").filter((t: any) => t.direction === "in").length, 0);

  const seq = db.all("sequences")[0];
  eq("and nobody's sequence is stopped", seq.status, "active");
}

console.log(`\n${pass} passed, ${fail} failed`);
if (fail) process.exit(1);
