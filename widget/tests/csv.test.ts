import { parseCsv, HEADERS } from "../gates/csv.js";

/* =========================================================================
   Turning somebody's exported list into rows the consent gate can judge.

   This is the widest door in the reactivation feature and the dullest code
   in the system, which is exactly why it is asserted. A list arrives as a
   CSV out of Mailchimp, or Excel, or a CRM nobody remembers the name of,
   and every one of them has its own idea of what a CSV is: a byte order
   mark at the front, CRLF line endings, commas inside quoted fields, a
   header row in a different order, a trailing blank line.

   The failure that matters is not a crash. It is a row that is quietly
   dropped or quietly mangled, because the person running the campaign then
   believes they contacted somebody they did not, or contacts somebody whose
   consent column landed in the wrong field.

   So: every row is accounted for, and anything that cannot be read is
   reported rather than skipped.
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

const HEAD = "name,email,phone,consentBasis,consentEvidence";

console.log("\n== the ordinary case ==");
{
  const r = parseCsv(`${HEAD}
Jane Cole,jane@example.com,07700900111,soft_optin,Bought a website in March 2026
Tom Reed,tom@example.com,07700900222,explicit,Ticked the newsletter box at signup`);
  eq("two rows", r.rows.length, 2);
  eq("the name", r.rows[0].name, "Jane Cole");
  eq("the email", r.rows[0].email, "jane@example.com");
  eq("the consent basis", r.rows[0].consentBasis, "soft_optin");
  eq("the evidence", r.rows[1].consentEvidence, "Ticked the newsletter box at signup");
  eq("nothing was rejected", r.problems.length, 0);
}

console.log("\n== what real exports actually look like ==");
{
  /* Excel writes a BOM. Without handling it the first header becomes
     "﻿name" and every name in the file is empty, silently. */
  const r = parseCsv(`﻿${HEAD}\r\nJane Cole,jane@example.com,,soft_optin,Bought in March 2026\r\n`);
  eq("a byte order mark does not eat the first column", r.rows[0].name, "Jane Cole");
  eq("CRLF line endings are handled", r.rows.length, 1);
  eq("and the trailing newline is not a row", r.problems.length, 0);
}
{
  const r = parseCsv(`${HEAD}
"Cole, Jane",jane@example.com,,explicit,"Said yes, in writing, on 3 March"`);
  eq("a comma inside quotes stays in the field", r.rows[0].name, "Cole, Jane");
  eq("and in the last field too", r.rows[0].consentEvidence, "Said yes, in writing, on 3 March");
}
{
  const r = parseCsv(`${HEAD}
"She said ""yes please""",a@b.com,,explicit,Doubled quotes are an escaped quote`);
  eq("a doubled quote is one quote", r.rows[0].name, 'She said "yes please"');
}
{
  /* Header order is the exporter's choice, never ours. */
  const r = parseCsv(`consentEvidence,phone,name,consentBasis,email
Bought a website in March,07700900111,Jane Cole,soft_optin,jane@example.com`);
  eq("columns are read by name, not by position", r.rows[0].name, "Jane Cole");
  eq("and so is the evidence", r.rows[0].consentEvidence, "Bought a website in March");
}
{
  const r = parseCsv(`Name,E-mail,Phone Number,Consent Basis,Consent Evidence
Jane Cole,jane@example.com,07700900111,soft_optin,Bought a website in March`);
  eq("headers are matched loosely, so Name and name are the same", r.rows[0].name, "Jane Cole");
  eq("and E-mail is email", r.rows[0].email, "jane@example.com");
  eq("and Phone Number is phone", r.rows[0].phone, "07700900111");
}

console.log("\n== a row that cannot be read is reported, never dropped ==");
{
  const r = parseCsv(`${HEAD}
Jane Cole,jane@example.com,07700900111,soft_optin,Bought a website in March
Tom Reed,tom@example.com
Amy Ford,amy@example.com,07700900333,explicit,Asked us to keep in touch`);
  eq("the readable rows are read", r.rows.length, 2);
  eq("the short row is reported", r.problems.length, 1);
  eq("by line number, so it can be found in the file", r.problems[0].line, 3);
  ok("with a reason", String(r.problems[0].why).length > 0, r.problems[0].why);
  /* The property that matters: nothing vanishes. */
  eq("every line is accounted for", r.rows.length + r.problems.length, 3);
}
{
  const r = parseCsv("");
  eq("an empty file is not rows", r.rows.length, 0);
  ok("and says so", r.problems.length > 0 || r.headerProblem !== null);
}
{
  const r = parseCsv("Jane Cole,jane@example.com,07700900111,soft_optin,Bought in March");
  ok("a file with no header row is refused outright", r.headerProblem !== null);
  eq("and no rows are invented from it", r.rows.length, 0);
}
{
  const r = parseCsv(`name,email\nJane Cole,jane@example.com`);
  ok("a file missing the consent columns is refused", r.headerProblem !== null);
  ok("and the message names what is missing",
     /consent/i.test(String(r.headerProblem)), String(r.headerProblem));
}

console.log("\n== blank lines and whitespace ==");
{
  const r = parseCsv(`${HEAD}

Jane Cole, jane@example.com , 07700900111 ,soft_optin, Bought in March

`);
  eq("blank lines between rows are not rows", r.rows.length, 1);
  eq("fields are trimmed", r.rows[0].email, "jane@example.com");
  eq("and so is the phone", r.rows[0].phone, "07700900111");
  eq("nothing reported", r.problems.length, 0);
}

console.log("\n== size ==");
{
  const lines = [HEAD];
  for (let i = 0; i < 5000; i++) {
    lines.push(`Person ${i},p${i}@example.com,07700${String(900000 + i).slice(-6)},soft_optin,Bought something in 2026`);
  }
  const r = parseCsv(lines.join("\n"));
  eq("five thousand rows all arrive", r.rows.length, 5000);
  eq("the last one is intact", r.rows[4999].name, "Person 4999");
}

console.log("\n== the headers it understands are stated ==");
{
  ok("HEADERS lists the required ones", HEADERS.required.length > 0);
  ok("consentBasis is required", HEADERS.required.indexOf("consentBasis") !== -1);
  ok("consentEvidence is required", HEADERS.required.indexOf("consentEvidence") !== -1);
}

console.log(`\n${pass} passed, ${fail} failed`);
if (fail) process.exit(1);
