import { fromGoogleLeadForm } from "../gates/google-lead-form.js";

/* =========================================================================
   Google's lead form webhook, turned into one of our leads.

   The webhook is a PUBLIC URL. Anything on the internet can post to it, and
   the only thing standing between that and rows appearing in the client's
   lead table is a key Google sends back. A route that does not check it is
   an open lead-injection endpoint, and that is the first thing asserted
   here.

   The payload shape is Google's, not ours: column_id / string_value pairs
   rather than fields, and a `lead_id` and `gcl_id` beside them.
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

const KEY = "a-long-random-key-from-the-google-ads-form";

const payload = (over: Record<string, unknown> = {}) => ({
  lead_id: "abc123",
  api_version: "1.0",
  form_id: 987654,
  campaign_id: 112233,
  gcl_id: "EAIaIQobChMI-real-click-id",
  is_test: false,
  google_key: KEY,
  user_column_data: [
    { column_id: "FULL_NAME", string_value: "Sarah Whitfield" },
    { column_id: "EMAIL", string_value: "sarah@whitfield.example" },
    { column_id: "PHONE_NUMBER", string_value: "+44 7700 900123" },
    { column_id: "COMPANY_NAME", string_value: "Whitfield Joinery" },
  ],
  ...over,
});

console.log("\n== THE KEY: this is a public URL ==");
{
  eq("no key at all is refused",
     fromGoogleLeadForm(payload({ google_key: undefined }), KEY).why, "bad_key");
  eq("a wrong key is refused",
     fromGoogleLeadForm(payload({ google_key: "guessed" }), KEY).why, "bad_key");
  eq("and refusing means no lead",
     fromGoogleLeadForm(payload({ google_key: "guessed" }), KEY).lead, undefined);
  /* A server with no key configured must refuse everything rather than
     accept everything. The failure mode of the other choice is silent. */
  eq("an unconfigured server refuses too",
     fromGoogleLeadForm(payload(), "").why, "not_configured");
  /* The builder bakes a placeholder in until a real key exists. Anybody who
     read the workflow, or guessed the obvious string, could otherwise post
     leads straight into the client's table. */
  eq("and so does one still carrying the placeholder",
     fromGoogleLeadForm(payload({ google_key: "GOOGLE_LEAD_FORM_KEY_PENDING" }),
                        "GOOGLE_LEAD_FORM_KEY_PENDING").why, "not_configured");
  eq("the right key is accepted", fromGoogleLeadForm(payload(), KEY).ok, true);
}

console.log("\n== Google's shape becomes ours ==");
{
  const r = fromGoogleLeadForm(payload(), KEY);
  eq("name", r.lead?.name, "Sarah Whitfield");
  eq("email", r.lead?.email, "sarah@whitfield.example");
  eq("phone", r.lead?.phone, "+44 7700 900123");
  eq("company", r.lead?.company, "Whitfield Joinery");
  eq("the channel is Google Ads", r.lead?.sourceChannel, "google_ads");
  /* Route B: a form fill from an advert is the same situation as a form
     fill on the site, and the paper treats them the same. */
  eq("and the route is B", r.lead?.route, "B");
}
{
  /* The click id is what actually proves the advert. A utm can be typed by
     anyone; gclid is minted by Google. */
  const r = fromGoogleLeadForm(payload(), KEY);
  eq("the click id is kept", r.lead?.attribution?.gclid, "EAIaIQobChMI-real-click-id");
  eq("and the campaign", r.lead?.attribution?.campaignId, "112233");
  eq("and the form", r.lead?.attribution?.formId, "987654");
}

console.log("\n== missing pieces ==");
{
  const noPhone = fromGoogleLeadForm(payload({
    user_column_data: [{ column_id: "EMAIL", string_value: "a@b.example" }],
  }), KEY);
  eq("email only is still a lead", noPhone.ok, true);
  eq("with no phone", noPhone.lead?.phone, undefined);
  /* A name is not guaranteed: some forms do not ask. "Unknown" beats an
     empty string reaching a template that opens with a greeting. */
  eq("and a name we can print", noPhone.lead?.name, "Unknown");
}
{
  /* Nothing to reach them on is not a lead. Saving it would put a row in
     the client's table that nobody can follow up. */
  const r = fromGoogleLeadForm(payload({
    user_column_data: [{ column_id: "FULL_NAME", string_value: "Sarah" }],
  }), KEY);
  eq("no way to reach them is refused", r.why, "no_contact");
}
{
  eq("rubbish is refused", fromGoogleLeadForm(null as never, KEY).why, "bad_key");
  eq("and an empty body", fromGoogleLeadForm({} as never, KEY).why, "bad_key");
}

console.log("\n== Google's own test submissions ==");
{
  /* Google posts a test lead when you press "send test data" in the Ads
     interface. It is not a customer, and a client's lead count that counts
     it is wrong on the first day. */
  const r = fromGoogleLeadForm(payload({ is_test: true }), KEY);
  eq("accepted, so Google sees a 200", r.ok, true);
  eq("but marked as a test", r.isTest, true);
  eq("and not turned into a lead", r.lead, undefined);
}

console.log(`\n${pass} passed, ${fail} failed`);
if (fail) process.exit(1);
