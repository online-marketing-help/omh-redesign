import { isAutoReply, touchIdFrom, tokenFrom, readReply } from "../gates/email-reply.js";

/* =========================================================================
   What arrives in the mailbox, and whether it is a person.

   The Channels report counts emails sent and texts replied to, so "replied"
   has meant "replied by text" since it was built. Reading the mailbox fixes
   that, and introduces a worse way to be wrong.

   **An auto-reply is not a reply.** Out-of-office, delivery receipts,
   "thanks, we have received your enquiry", newsletters: every one of them
   arrives as inbound mail, and every one would mark a lead as having
   replied, stop their follow-up, and inflate the reply rate on the report
   the client reads. A system that cannot tell those apart makes the figure
   worse than leaving it as it is.

   So the refusals are the subject of this file, not the matching.
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

/** A plain reply from a person, which every refusal below is a variation of. */
const human = (over: Record<string, unknown> = {}) => ({
  subject: "Re: Your enquiry about Local SEO",
  from: "jane@example.com",
  to: "replies+t9f2@onlinemarketinghelp.co.uk",
  headers: { "in-reply-to": "<omh-abc123@mail>" },
  text: "Yes please, Thursday works. Jane",
  ...over,
});

console.log("\n== which message this replies to ==");
{
  eq("In-Reply-To is used first",
     touchIdFrom(human(), (id) => (id === "<omh-abc123@mail>" ? "t-1" : null)), "t-1");

  /* Some clients fill References and leave In-Reply-To empty. */
  eq("References is tried next",
     touchIdFrom(human({ headers: { references: "<other@x> <omh-abc123@mail>" } }),
       (id) => (id === "<omh-abc123@mail>" ? "t-2" : null)), "t-2");
  eq("and the newest id in References wins",
     touchIdFrom(human({ headers: { references: "<omh-old@mail> <omh-new@mail>" } }),
       (id) => (id === "<omh-new@mail>" ? "newest" : "oldest")), "newest");

  /* The plus token, for a client that starts a fresh message. */
  /* The token names the SEND, not the touch, because the touch does not
     exist when the address is written. Kept apart from a touch id so the
     caller resolves each by the right lookup. */
  eq("a plus token is read from the address", tokenFrom(human()), "9f2");
  eq("and from Delivered-To",
     tokenFrom({ ...human(), to: "someone@else", headers: { "delivered-to": "replies+tABC@omh.co.uk" } }), "ABC");
  eq("threading alone gives no token", tokenFrom({ ...human(), to: "sales@omh.co.uk" }), null);

  eq("nothing identifiable gives nothing, rather than a guess",
     touchIdFrom({ subject: "hello", from: "a@b", to: "sales@omh.co.uk", headers: {}, text: "" },
       () => null), null);
  /* A send token with a hyphen in it, which is the shape the worker
     writes: sequenceId-step. A colon would not be legal in an address. */
  eq("a hyphenated token survives",
     tokenFrom({ to: "replies+tjh7abc-2@onlinemarketinghelp.co.uk" } as never), "jh7abc-2");
}

console.log("\n== an auto-reply is not a reply ==");
{
  /* RFC 3834. The one header that exists precisely to say this. */
  ok("Auto-Submitted: auto-replied",
     isAutoReply(human({ headers: { "auto-submitted": "auto-replied" } })));
  ok("auto-generated too",
     isAutoReply(human({ headers: { "auto-submitted": "auto-generated" } })));
  ok("but Auto-Submitted: no is a person",
     !isAutoReply(human({ headers: { "auto-submitted": "no" } })));

  ok("X-Autoreply", isAutoReply(human({ headers: { "x-autoreply": "yes" } })));
  ok("X-Autorespond", isAutoReply(human({ headers: { "x-autorespond": "yes" } })));
  ok("Precedence: auto_reply", isAutoReply(human({ headers: { precedence: "auto_reply" } })));
  ok("Precedence: bulk", isAutoReply(human({ headers: { precedence: "bulk" } })));
  ok("Precedence: junk", isAutoReply(human({ headers: { precedence: "junk" } })));

  /* A newsletter is not somebody answering us. */
  ok("a List-Id means a mailing list",
     isAutoReply(human({ headers: { "list-id": "<news.example.com>" } })));
  ok("so does List-Unsubscribe",
     isAutoReply(human({ headers: { "list-unsubscribe": "<mailto:no@x>" } })));

  /* A bounce. The empty return path is the standard marker. */
  ok("a null Return-Path is a bounce",
     isAutoReply(human({ headers: { "return-path": "<>" } })));
  ok("and so is a delivery status report",
     isAutoReply(human({ contentType: "multipart/report; report-type=delivery-status" })));
  ok("mailer-daemon is not a customer",
     isAutoReply(human({ from: "MAILER-DAEMON@mail.example.com" })));
  ok("nor is postmaster", isAutoReply(human({ from: "postmaster@example.com" })));
  ok("nor no-reply", isAutoReply(human({ from: "no-reply@example.com" })));
  ok("nor noreply with no hyphen", isAutoReply(human({ from: "noreply@example.com" })));
}

console.log("\n== the subject is a hint, and only a hint ==");
{
  ok("'Out of office' in the subject", isAutoReply(human({ subject: "Out of office" })));
  ok("'Automatic reply:'", isAutoReply(human({ subject: "Automatic reply: Your enquiry" })));
  ok("'Undeliverable:'", isAutoReply(human({ subject: "Undeliverable: Your enquiry" })));

  /* The case that must not be refused: a real person writing about being
     out of the office. The words are in the BODY, not the subject, and
     nothing else about the message says machine. */
  ok("a person saying they are out of the office still counts",
     !isAutoReply(human({ text: "I am out of office until Monday but yes, let us book it." })),
     "refusing this loses a real reply");
  ok("and a subject that merely mentions it mid-sentence counts",
     !isAutoReply(human({ subject: "Re: booking while I am out of office" })));
}

console.log("\n== the two together ==");
{
  const find = (id: string) => (id === "<omh-abc123@mail>" ? "t-1" : null);

  const r = readReply(human(), find);
  eq("a real reply is a reply", r.reply, true);
  eq("against the right touch", r.touchId, "t-1");

  const auto = readReply(human({ headers: { ...human().headers, "auto-submitted": "auto-replied" } }), find);
  eq("an out-of-office is not", auto.reply, false);
  eq("and says why", auto.why, "auto_reply");
  /* Still identified: knowing WHICH message bounced is useful even though
     it is not a reply. */
  eq("but we still know what it was about", auto.touchId, "t-1");

  const stranger = readReply(
    { subject: "hello", from: "a@b.com", to: "sales@omh.co.uk", headers: {}, text: "hi" }, find);
  eq("mail that matches nothing is not attributed to anyone", stranger.touchId, null);
  eq("and carries no token either", stranger.token, null);
  eq("and is not counted as a reply", stranger.reply, false);
  eq("with a reason that distinguishes it from an auto-reply", stranger.why, "unmatched");
}

console.log("\n== rubbish in ==");
{
  eq("nothing at all", readReply(null as never, () => null).reply, false);
  eq("no headers object", readReply({ subject: "x", from: "a@b", to: "c@d" } as never, () => null).reply, false);
  ok("header names are matched whatever their case",
     isAutoReply({ ...human(), headers: { "Auto-Submitted": "auto-replied" } as never }));
}

console.log(`\n${pass} passed, ${fail} failed`);
if (fail) process.exit(1);
