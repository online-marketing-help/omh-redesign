/* Somebody's exported list, turned into rows the consent gate can judge.

   The dullest code in the system and one of the most dangerous, because it
   is the door route F goes through, and route F is the only route that is
   marketing. A row mangled here is a real person contacted on evidence that
   belongs to somebody else.

   The failure to design against is not a crash. It is the quiet one: a row
   dropped, or a column shifted, with the person running the campaign none
   the wiser. So every line is accounted for - it is either a row or a
   reported problem with its line number - and a file whose header does not
   carry the consent columns is refused outright rather than parsed into
   something that looks fine and is not.

   Plain JavaScript, no imports, like everything in gates/: the same text is
   asserted by the tests, runs in the browser so the preview is computed
   before anything is sent, and can be inlined into an n8n Code node. */

/* What a column may be called. Exporters disagree about everything, so
   matching is on letters and digits only, lowercased: "E-mail", "e_mail"
   and "Email" are one name. */
var HEADERS = {
  required: ["consentBasis", "consentEvidence"],
  aliases: {
    name: ["name", "fullname", "firstname", "contactname", "customer", "customername"],
    email: ["email", "emailaddress", "mail"],
    phone: ["phone", "phonenumber", "mobile", "telephone", "tel", "number"],
    company: ["company", "business", "organisation", "organization", "companyname"],
    service: ["service", "bought", "product", "whattheybought", "purchase"],
    consentBasis: ["consentbasis", "basis", "consent", "consenttype", "lawfulbasis"],
    consentEvidence: ["consentevidence", "evidence", "consentnote", "consentproof", "proof"],
    lastBoughtAt: ["lastboughtat", "boughtat", "lastpurchase", "lastorder", "purchasedate", "date"],
  },
};

function key(s) {
  return String(s == null ? "" : s).toLowerCase().replace(/[^a-z0-9]/g, "");
}

/* One line of CSV, honouring quotes.

   Written out rather than split on commas, because a comma inside a quoted
   field is the single most common thing in a real export: "Cole, Jane" is
   one name, and splitting it shifts every column after it by one, which
   lands somebody else's consent evidence against this person. */
function splitLine(line) {
  var out = [];
  var field = "";
  var quoted = false;
  for (var i = 0; i < line.length; i++) {
    var c = line.charAt(i);
    if (quoted) {
      if (c === '"') {
        /* A doubled quote inside a quoted field is one literal quote. */
        if (line.charAt(i + 1) === '"') { field += '"'; i++; }
        else quoted = false;
      } else field += c;
    } else if (c === '"') {
      quoted = true;
    } else if (c === ",") {
      out.push(field); field = "";
    } else {
      field += c;
    }
  }
  out.push(field);
  return out;
}

/**
 * @returns {{rows: object[], problems: {line:number, why:string, text:string}[],
 *            headerProblem: string|null, intended: number}}
 */
function parseCsv(text) {
  var empty = { rows: [], problems: [], headerProblem: null, intended: 0 };
  var raw = String(text == null ? "" : text);

  /* Excel writes a byte order mark. Left in place it becomes part of the
     first header name, so "name" never matches, and every name in the file
     is silently empty. */
  if (raw.charCodeAt(0) === 0xfeff) raw = raw.slice(1);

  /* CRLF and lone CR both appear. Normalise before splitting, or every
     field at the end of a line carries an invisible \r. */
  var lines = raw.replace(/\r\n?/g, "\n").split("\n");

  /* Leading blank lines are not the header. */
  var h = 0;
  while (h < lines.length && !lines[h].trim()) h++;
  if (h >= lines.length) {
    empty.headerProblem = "That file is empty.";
    return empty;
  }

  var head = splitLine(lines[h]).map(function (c) { return key(c); });

  /* Which column holds what. By name, never by position: the order is the
     exporter's choice. */
  var at = {};
  var names = ["name", "email", "phone", "company", "service",
               "consentBasis", "consentEvidence", "lastBoughtAt"];
  for (var n = 0; n < names.length; n++) {
    var want = HEADERS.aliases[names[n]];
    for (var c = 0; c < head.length; c++) {
      if (want.indexOf(head[c]) !== -1) { at[names[n]] = c; break; }
    }
  }

  /* A file with no consent columns is not a reactivation list, whatever
     else is in it. Refused here rather than row by row, because a hundred
     identical "no_consent_basis" refusals is not a useful answer: the
     answer is that the wrong file was uploaded. */
  var missing = [];
  for (var r0 = 0; r0 < HEADERS.required.length; r0++) {
    if (at[HEADERS.required[r0]] === undefined) missing.push(HEADERS.required[r0]);
  }
  /* No contact column at all means the first line was data, not a header. */
  if (at.email === undefined && at.phone === undefined && at.name === undefined) {
    empty.headerProblem =
      "The first line does not look like a header row. It needs column names, " +
      "including consentBasis and consentEvidence.";
    return empty;
  }
  if (missing.length) {
    empty.headerProblem =
      "This list has no consent columns (" + missing.join(" and ") + "). " +
      "Nobody can be contacted without recorded consent, so there is nothing " +
      "to send.";
    return empty;
  }

  var rows = [];
  var problems = [];
  var width = head.length;

  for (var i = h + 1; i < lines.length; i++) {
    var line = lines[i];
    if (!line.trim()) continue;            // a blank line is not a row
    var cells = splitLine(line);

    /* Short of the header. Reported rather than padded: a padded row has
       empty consent evidence and would be refused for the wrong reason,
       which sends somebody hunting for a consent problem that is really a
       broken file. */
    if (cells.length < width) {
      problems.push({
        line: i + 1,
        why: "This row has " + cells.length + " values but the header has " + width + ".",
        text: line.slice(0, 120),
      });
      continue;
    }

    var get = function (f) {
      var idx = at[f];
      if (idx === undefined || idx >= cells.length) return "";
      return String(cells[idx]).trim();
    };

    rows.push({
      name: get("name"),
      email: get("email"),
      phone: get("phone"),
      company: get("company"),
      service: get("service"),
      consentBasis: get("consentBasis"),
      consentEvidence: get("consentEvidence"),
      lastBoughtAt: get("lastBoughtAt"),
      _line: i + 1,
    });
  }

  return {
    rows: rows,
    problems: problems,
    headerProblem: null,
    /* Every line that was meant to be a person, so the screen can say
       "5000 rows in, 4987 contactable, 11 refused, 2 unreadable" and have
       the three add up. */
    intended: rows.length + problems.length,
  };
}

export { parseCsv, splitLine, HEADERS };
