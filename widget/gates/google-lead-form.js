/* Google's lead form webhook, turned into one of our leads.

   Google posts here when somebody fills in a lead form attached to an
   advert. The payload is theirs: column_id / string_value pairs rather than
   named fields, with the click id and the campaign beside them.

   THE WEBHOOK IS A PUBLIC URL. Anything on the internet can post to it, and
   the only thing between that and rows appearing in the client's lead table
   is the key Google echoes back. So the key is checked first, before the
   body is read, and a server with no key configured refuses everything
   rather than accepting everything: the failure mode of the other choice is
   silent, and by the time anybody notices the table is full of rubbish.

   Plain JavaScript, no imports, like everything in gates/: the same text is
   asserted by the tests and embedded in the n8n Code node. */

/* What Google calls the fields we care about. Their list is longer; these
   are the ones a follow-up actually needs. */
var FIELDS = {
  FULL_NAME: "name",
  FIRST_NAME: "firstName",
  LAST_NAME: "lastName",
  EMAIL: "email",
  PHONE_NUMBER: "phone",
  COMPANY_NAME: "company",
  JOB_TITLE: "jobTitle",
  CITY: "city",
  POSTAL_CODE: "postcode",
};

/**
 * @param body  what Google posted
 * @param key   GOOGLE_LEAD_FORM_KEY from the server
 */
function fromGoogleLeadForm(body, key) {
  var b = body && typeof body === "object" ? body : {};

  /* Before anything else.

     A placeholder counts as no key. The builder bakes
     GOOGLE_LEAD_FORM_KEY_PENDING in until a real one exists, and without
     this line anybody who read the workflow, or simply guessed the obvious
     string, could post leads into the client's table. Fail closed. */
  if (!key || String(key).indexOf("PENDING") !== -1) {
    return { ok: false, why: "not_configured" };
  }
  if (String(b.google_key || "") !== String(key)) return { ok: false, why: "bad_key" };

  var f = {};
  var cols = Array.isArray(b.user_column_data) ? b.user_column_data : [];
  for (var i = 0; i < cols.length; i++) {
    var c = cols[i] || {};
    var name = FIELDS[String(c.column_id || "").toUpperCase()];
    var val = String(c.string_value || "").trim();
    if (name && val) f[name] = val;
  }

  /* Google posts a test lead when somebody presses "send test data" in the
     Ads interface. It has to be answered with a 200 or Google reports the
     webhook as broken, and it must never become a row: a client's lead
     count that includes it is wrong on the first day. */
  if (b.is_test === true || b.is_test === "true") {
    return { ok: true, isTest: true };
  }

  var phone = f.phone;
  var email = f.email;
  /* Nothing to reach them on is not a lead. Saving it puts a row in the
     client's table that nobody can follow up and that counts against every
     conversion rate on the dashboard. */
  if (!phone && !email) return { ok: false, why: "no_contact" };

  var name = f.name;
  if (!name && (f.firstName || f.lastName)) {
    name = [f.firstName, f.lastName].filter(Boolean).join(" ");
  }

  var attribution = {};
  function put(k, v) {
    if (v !== undefined && v !== null && String(v).trim()) attribution[k] = String(v).trim();
  }
  /* The click id is the part that actually proves the advert: a utm can be
     typed by anyone, gclid is minted by Google. */
  put("gclid", b.gcl_id);
  put("campaignId", b.campaign_id);
  put("formId", b.form_id);
  put("adGroup", b.adgroup_id);
  put("source", "google");
  put("medium", "cpc");

  return {
    ok: true,
    isTest: false,
    lead: {
      /* A name is not guaranteed: plenty of forms do not ask for one. Something
         printable beats an empty string reaching a template that opens with a
         greeting. */
      name: name || "Unknown",
      phone: phone,
      email: email,
      company: f.company,
      service: f.jobTitle,
      sourceChannel: "google_ads",
      /* A form fill from an advert is the same situation as a form fill on
         the website, and the routing paper treats them the same. */
      route: "B",
      sessionId: "gads-" + String(b.lead_id || Date.now()),
      attribution: attribution,
    },
  };
}

export { fromGoogleLeadForm, FIELDS };
