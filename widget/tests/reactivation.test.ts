import { screenRows } from "../gates/consent-gate.js";

/* =========================================================================
   The consent gate on a reactivation import.

   This is the one piece of real logic in `11-reactivation`, and it is the
   one place in the whole system where getting it wrong is a regulatory
   problem rather than a bug. Texting somebody who never agreed to be texted
   is the thing the ICO fines for, and the defence is the record, not the
   intention.

   It lives in its own file rather than inline in the workflow JSON so that
   the thing the tests assert is the same text the Code node runs. A copy in
   each would drift, and the copy that drifts is the one that sends.
   ========================================================================= */

let pass = 0, fail = 0;
function eq(label: string, got: unknown, want: unknown) {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  if (ok) { pass++; console.log("  ok   " + label); }
  else { fail++; console.log("  FAIL " + label + "\n         got  " + JSON.stringify(got) + "\n         want " + JSON.stringify(want)); }
}
function ok(label: string, cond: boolean) { eq(label, cond, true); }

const good = {
  name: "Sarah Whitfield",
  phone: "07700 900123",
  email: "sarah@whitfield.example",
  consentBasis: "soft_optin",
  consentEvidence: "Bought a website build, Mar 2025. Ticked the updates box on the order form.",
};

console.log("\n== THE GATE: no evidence, no send ==");
{
  const r = screenRows([{ ...good, consentEvidence: "" }]);
  eq("a row with no evidence is refused", r.refused.length, 1);
  eq("and says why", r.refused[0].why, "no_consent_evidence");
  eq("and is not enrolled", r.accepted.length, 0);
}
{
  /* "Yes" is not evidence. Evidence says where it came from and when, and a
     field somebody typed one word into is the form this goes wrong in. */
  const r = screenRows([{ ...good, consentEvidence: "yes" }]);
  eq("a one word answer is not evidence", r.refused[0]?.why, "evidence_too_thin");
}
{
  const r = screenRows([{ ...good, consentBasis: "" }]);
  eq("no basis is refused", r.refused[0]?.why, "no_consent_basis");
}
{
  const r = screenRows([{ ...good, consentBasis: "they seemed keen" }]);
  eq("a basis that is not one of ours is refused", r.refused[0]?.why, "unknown_consent_basis");
}

console.log("\n== a complete row goes through ==");
{
  const r = screenRows([good]);
  eq("accepted", r.accepted.length, 1);
  eq("nothing refused", r.refused.length, 0);
  eq("the phone is normalised to E.164", r.accepted[0].phone, "+447700900123");
  eq("the channel is recorded as reactivation", r.accepted[0].sourceChannel, "reactivation");
  eq("the basis is carried through", r.accepted[0].consentBasis, "soft_optin");
  ok("the evidence is carried through", r.accepted[0].consentEvidence.startsWith("Bought a website"));
}

console.log("\n== you cannot text somebody with no way to reach them ==");
{
  const r = screenRows([{ ...good, phone: "", email: "" }]);
  eq("refused", r.refused[0]?.why, "no_contact");
}
{
  /* Email only is fine: route F sends on whichever channel it has. */
  const r = screenRows([{ ...good, phone: "" }]);
  eq("email only is accepted", r.accepted.length, 1);
  eq("with no phone", r.accepted[0].phone, undefined);
}

console.log("\n== the same person twice in one import ==");
{
  const r = screenRows([
    good,
    { ...good, name: "Sarah W", phone: "+44 7700 900123" },
  ]);
  /* The same number written two ways. Enrolling both would be two texts from
     one business in one afternoon, which reads as a system out of control
     even though each one is individually sensible. */
  eq("one accepted", r.accepted.length, 1);
  eq("one refused", r.refused.length, 1);
  eq("and says it was a duplicate", r.refused[0].why, "duplicate_in_import");
}
{
  const r = screenRows([good, { ...good, phone: "", name: "Sarah again" }]);
  eq("the email catches it too", r.refused[0]?.why, "duplicate_in_import");
}

console.log("\n== the figure that matters ==");
{
  /* The gap between the list handed in and the people actually contacted is
     the suppression and consent rate, and it is the most useful number a
     reactivation run produces. It has to come out of the gate, not be
     counted afterwards from what happened to send. */
  const rows = [
    good,
    { ...good, phone: "07700900124", email: "a@b.example", consentEvidence: "" },
    { ...good, phone: "07700900125", email: "c@d.example", consentBasis: "" },
    { ...good, phone: "07700900126", email: "e@f.example" },
  ];
  const r = screenRows(rows);
  eq("intended is the whole list", r.intended, 4);
  eq("accepted", r.accepted.length, 2);
  eq("refused", r.refused.length, 2);
  eq("accepted plus refused is the whole list", r.accepted.length + r.refused.length, r.intended);
}

console.log("\n== pages of a hundred ==");
{
  /* `campaign/enrol` refuses more than a hundred in one call: it is one
     transaction holding read locks on suppressions and settings, which every
     live send also reads. */
  const rows = Array.from({ length: 250 }, (_, i) => ({
    ...good, phone: `0770090${String(1000 + i)}`, email: `p${i}@x.example`,
  }));
  const r = screenRows(rows);
  eq("all accepted", r.accepted.length, 250);
  eq("three pages", r.pages.length, 3);
  eq("first page is full", r.pages[0].length, 100);
  eq("last page is the remainder", r.pages[2].length, 50);
  ok("no row is on two pages", new Set(r.pages.flat().map((p: { email: string }) => p.email)).size === 250);
}

console.log("\n== rubbish in ==");
{
  eq("no rows at all", screenRows([]).refused.length, 0);
  eq("and nothing accepted", screenRows([]).accepted.length, 0);
  eq("not an array", screenRows(null as never).intended, 0);
}

console.log(`\n${pass} passed, ${fail} failed`);
if (fail) process.exit(1);
