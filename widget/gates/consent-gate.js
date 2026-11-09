/* The consent gate on a reactivation import.

   Lives here, in plain JavaScript with no imports, for one reason: the body
   of this file is embedded verbatim into the Code node of
   `11-reactivation`, and `widget/tests/reactivation.test.ts` imports the same
   file. One text, asserted and executed. Two copies would drift, and the copy
   that drifts is the one that sends to real people.

   Keep it dependency free and ES5-ish for that reason. No imports, no
   optional chaining into things n8n's Code node sandbox may not have.

   WHY A GATE AT ALL. Replying to somebody's own enquiry is not marketing.
   Starting a conversation they did not ask for is, and route F is the only
   route marked that way. Under PECR the defence is the record of consent,
   not the intention behind it, so a list arrives with evidence per row or it
   does not arrive. */

var PAGE = 100;              // what `campaign/enrol` accepts in one call
var BASES = ["soft_optin", "explicit"];
var MIN_EVIDENCE = 12;       // characters: "yes" is not evidence

/** UK numbers to E.164, so the same number written two ways compares equal. */
function phoneKey(raw) {
  var s = String(raw || "").replace(/[^\d+]/g, "");
  if (!s) return "";
  if (s.indexOf("+") === 0) return s;
  if (s.indexOf("00") === 0) return "+" + s.slice(2);
  if (s.indexOf("0") === 0) return "+44" + s.slice(1);
  if (s.length === 10) return "+44" + s;
  return "+" + s;
}

function emailKey(raw) {
  return String(raw || "").trim().toLowerCase();
}

/**
 * Screen an imported list.
 *
 * Returns everything the workflow and the report need: what came in, what
 * may be contacted, what may not and why, and the accepted rows already cut
 * into pages the enrol endpoint will take.
 *
 * The refusals are returned rather than dropped. The gap between the list
 * handed in and the people actually contacted IS the consent rate, and it is
 * the most useful figure a reactivation run produces.
 */
function screenRows(rows) {
  var list = Array.isArray(rows) ? rows : [];
  var accepted = [];
  var refused = [];
  var seen = {};

  for (var i = 0; i < list.length; i++) {
    var r = list[i] || {};
    var name = String(r.name || "").trim();
    var pk = phoneKey(r.phone);
    var ek = emailKey(r.email);
    var basis = String(r.consentBasis || "").trim();
    var evidence = String(r.consentEvidence || "").trim();

    var why = null;
    if (!pk && !ek) why = "no_contact";
    else if (!basis) why = "no_consent_basis";
    else if (BASES.indexOf(basis) === -1) why = "unknown_consent_basis";
    else if (!evidence) why = "no_consent_evidence";
    else if (evidence.length < MIN_EVIDENCE) why = "evidence_too_thin";
    else if ((pk && seen[pk]) || (ek && seen[ek])) why = "duplicate_in_import";

    if (why) {
      refused.push({ row: i + 1, name: name, phone: r.phone, email: r.email, why: why });
      continue;
    }

    if (pk) seen[pk] = true;
    if (ek) seen[ek] = true;

    accepted.push({
      name: name || "Unknown",
      phone: pk || undefined,
      email: ek || undefined,
      company: String(r.company || "").trim() || undefined,
      service: String(r.service || r.bought || "").trim() || undefined,
      /* Route F is the only marketing route, and this is the only channel
         that puts anyone on it. */
      sourceChannel: "reactivation",
      consentBasis: basis,
      consentEvidence: evidence,
      /* What they bought and when, so a template can say something truer
         than "we have not spoken in a while". */
      lastBoughtAt: String(r.lastBoughtAt || r.boughtAt || "").trim() || undefined,
    });
  }

  var pages = [];
  for (var p = 0; p < accepted.length; p += PAGE) pages.push(accepted.slice(p, p + PAGE));

  return { intended: list.length, accepted: accepted, refused: refused, pages: pages };
}

export { screenRows, phoneKey, emailKey, PAGE };
