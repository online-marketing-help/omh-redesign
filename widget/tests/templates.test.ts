import { render, templateKeys } from "../gates/templates.ts";
import { ROUTES, stepAt } from "../gates/routes.ts";

/* =========================================================================
   What we actually send.

   Rendering is about to move out of Convex and into the n8n worker, so that
   changing what a message says is editing a workflow rather than a
   TypeScript file. Until now `render` had no tests of its own: the opt-out
   property was asserted through `claimDue`, which is exactly the place it
   stops being asserted once the rendering leaves.

   So this is a characterisation test, written before the move. It has to
   pass NOW, which proves it describes today's behaviour, and pass after,
   which proves the move changed nothing. That is the honest shape for a
   refactor; there is no red to watch, and pretending otherwise would make
   the green meaningless.
   ========================================================================= */

let pass = 0, fail = 0;
function eq(label: string, got: unknown, want: unknown) {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  if (ok) { pass++; console.log("  ok   " + label); }
  else { fail++; console.log("  FAIL " + label + "\n         got  " + JSON.stringify(got) + "\n         want " + JSON.stringify(want)); }
}
function ok(label: string, cond: boolean, detail = "") {
  eq(label + (cond ? "" : detail ? ` [${detail}]` : ""), cond, true);
}

const ctx = {
  name: "Sarah Whitfield",
  service: "Google Ads management",
  message: "We need more enquiries before Christmas",
  reference: "OMH-4126",
  preferredDate: "2026-12-01",
  preferredTime: "10:00",
};

const ROUTE_IDS = ["A", "B", "C", "D", "E", "F"] as const;

console.log("\n== THE PECR PROPERTY: every marketing message carries an opt-out ==");
{
  /* This was asserted through claimDue and is about to lose that home. It is
     the one property here whose breach is a fine rather than a bug: an
     opt-out belongs in EVERY marketing message, not only the first. */
  for (const key of templateKeys()) {
    const m = render(key, ctx, "F");
    ok(`F: ${key} offers an opt-out`, m.body.includes("Reply STOP to opt out."), m.body.slice(0, 40));
  }
}
{
  /* And nowhere else. "Reply STOP" on an answer to somebody's own enquiry
     tells them they are on a list, which they are not, and invites them to
     leave something they never joined. */
  for (const r of ROUTE_IDS) {
    if (r === "F") continue;
    const m = render("b_sms_first", ctx, r);
    ok(`${r}: no opt-out on a reply to an enquiry`, !m.body.includes("Reply STOP"));
  }
  const bare = render("b_sms_first", ctx);
  ok("and none when no route is given", !bare.body.includes("Reply STOP"));
}
{
  eq("F is still the only marketing route",
     ROUTE_IDS.filter((r) => ROUTES[r].marketing), ["F"]);
}

console.log("\n== every step a route can reach has a template ==");
{
  /* A step whose template is missing throws at render time, and claimDue
     turns that into a failed sequence. Better to find it here than to find
     it as a stopped follow-up nobody noticed. */
  for (const r of ROUTE_IDS) {
    for (const s of ROUTES[r].immediate) {
      let rendered = true;
      try { render(s.key, ctx, r); } catch { rendered = false; }
      ok(`${r} immediate ${s.key}`, rendered);
    }
    for (let i = 0; i < ROUTES[r].steps.length; i++) {
      const s = stepAt(r, i);
      if (!s) continue;
      let rendered = true;
      try { render(s.key, ctx, r); } catch { rendered = false; }
      ok(`${r} step ${i} ${s.key}`, rendered);
    }
  }
}

console.log("\n== an unknown key throws rather than sending nothing ==");
{
  let threw = false;
  try { render("no_such_template", ctx, "B"); } catch { threw = true; }
  ok("throws", threw);
}

console.log("\n== nothing renders empty, and no placeholder survives ==");
{
  for (const key of templateKeys()) {
    const m = render(key, ctx, "B");
    ok(`${key} has a body`, m.body.trim().length > 10, String(m.body.length));
    ok(`${key} leaves no {{...}}`, !/\{\{|\}\}/.test(m.body + (m.subject ?? "")));
  }
}

console.log("\n== nothing we do not know becomes the word 'undefined' ==");
{
  /* Rendered with NOTHING: no name, no date, no reference. That is not a
     hypothetical. `claimDue` renders a route step with the lead's context,
     which carries a name, a service and their message and nothing else, so
     every booking template used as a step gets exactly this.

     "Hi," with no name is fine English and stays. "booked for undefined at
     undefined" is not, and this is what catches it. */
  for (const key of templateKeys()) {
    const m = render(key, {}, "B");
    const text = m.body + (m.subject ?? "");
    ok(`${key} with nothing known`, !/\bundefined\b|\bnull\b|\bNaN\b/.test(text), text.slice(0, 60));
    ok(`${key} still reads as a sentence`, !/\s[,.]|,\s*\./.test(text), text.slice(0, 60));
  }
}
{
  /* And with everything, the detail is actually there. A template that
     degrades by dropping the date must still print it when it has one. */
  const m = render("booking_confirmed", ctx, "B");
  ok("the date survives when known", m.body.includes("2026-12-01") && m.body.includes("10:00"), m.body);
  ok("and the reference", m.body.includes("OMH-4126"), m.body);
}

console.log("\n== an email has a subject, a text does not need one ==");
{
  for (const r of ROUTE_IDS) {
    for (const s of [...ROUTES[r].immediate, ...ROUTES[r].steps]) {
      if (s.channel !== "email") continue;
      const m = render(s.key, ctx, r);
      ok(`${r} ${s.key} has a subject`, Boolean(m.subject && m.subject.trim()));
    }
  }
}

console.log(`\n${pass} passed, ${fail} failed`);
if (fail) process.exit(1);
