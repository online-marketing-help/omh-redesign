/* What a visitor is allowed to send the assistant, from any channel.

   Two doors, and they are not the same shape:

     - the widget's file picker hands over a File: a name, a claimed type, a
       size, and bytes we can read;
     - Facebook, Instagram and WhatsApp hand over a URL and expect our server
       to go and fetch it.

   The second is the dangerous one, and it is why this file exists rather
   than a bare fetch in a Code node. Fetching an address a stranger chose is
   server-side request forgery: anybody who can send a Facebook message could
   otherwise make our server call whatever our server can reach, which
   includes cloud metadata endpoints and anything on the private network. So
   the host is checked against a list of Meta's own, and everything else is
   refused before a request is made.

   Both doors then meet the same three rules: a real size, a type we take,
   and bytes that match what the file says it is.

   Plain JavaScript, no imports, like everything in gates/: the same text is
   asserted by the tests, runs in the browser inside the widget, and is
   embedded in the n8n Code node that handles Meta attachments. */

var LIMITS = {
  /* Big enough for a photo off a phone, small enough that a slow connection
     does not hang on it. */
  image: 8 * 1024 * 1024,
  /* Voice notes are longer and compress worse. */
  audio: 16 * 1024 * 1024,
};

/* What we take, and nothing else.

   SVG IS NOT HERE, deliberately. It is a document that can carry script, and
   an SVG served back to whoever opens that conversation on the dashboard is
   stored cross-site scripting. Every "allowed image types" list that
   includes it is a hole. */
var IMAGE = ["image/jpeg", "image/png", "image/gif", "image/webp"];
var AUDIO = ["audio/ogg", "audio/mpeg", "audio/mp4", "audio/webm", "audio/aac", "audio/amr"];

/* Meta's own media hosts. Anything else is refused without a request. */
var META_HOSTS = [
  "lookaside.fbsbx.com",
  "scontent.xx.fbcdn.net",
  "graph.facebook.com",
  "media.fbsbx.com",
];

function kindOf(type) {
  if (IMAGE.indexOf(type) !== -1) return "image";
  if (AUDIO.indexOf(type) !== -1) return "audio";
  return null;
}

/** Does the file start with the bytes its format always starts with? */
function sniff(buf) {
  if (!buf || typeof buf.length !== "number" || buf.length < 4) return null;
  var b = buf;
  var at = function (i) { return b[i]; };

  if (at(0) === 0xff && at(1) === 0xd8 && at(2) === 0xff) return "image/jpeg";
  if (at(0) === 0x89 && at(1) === 0x50 && at(2) === 0x4e && at(3) === 0x47) return "image/png";
  if (at(0) === 0x47 && at(1) === 0x49 && at(2) === 0x46) return "image/gif";
  if (b.length >= 12 && at(0) === 0x52 && at(1) === 0x49 && at(2) === 0x46 && at(3) === 0x46 &&
      at(8) === 0x57 && at(9) === 0x45 && at(10) === 0x42 && at(11) === 0x50) return "image/webp";

  if (at(0) === 0x4f && at(1) === 0x67 && at(2) === 0x67 && at(3) === 0x53) return "audio/ogg";
  if (at(0) === 0x49 && at(1) === 0x44 && at(2) === 0x33) return "audio/mpeg";
  /* A bare MPEG frame sync, for an mp3 with no ID3 tag. Eleven set bits is
     a weak signature: plenty of unrelated files start FF Ex. The next two
     fields are checked as well, because "reserved" values are exactly what
     arbitrary data lands on, and this is the one branch where a file with
     no real structure could otherwise be stored. */
  if (at(0) === 0xff && (at(1) & 0xe0) === 0xe0) {
    var version = (at(1) >> 3) & 0x03;   // 01 is reserved
    var layer = (at(1) >> 1) & 0x03;     // 00 is reserved
    var bitrate = (at(2) >> 4) & 0x0f;   // 1111 is invalid
    var rate = (at(2) >> 2) & 0x03;      // 11 is reserved
    if (version !== 1 && layer !== 0 && bitrate !== 0x0f && rate !== 3) return "audio/mpeg";
    return null;
  }
  if (at(0) === 0x1a && at(1) === 0x45 && at(2) === 0xdf && at(3) === 0xa3) return "audio/webm";
  /* An ISO base media file. The brand decides what KIND of one: without
     reading it, an mp4 video or a HEIC photo off an iPhone was stored as a
     voice note and rendered in an <audio> element that plays nothing. */
  if (b.length >= 12 && at(4) === 0x66 && at(5) === 0x74 && at(6) === 0x79 && at(7) === 0x70) {
    var brand = String.fromCharCode(at(8), at(9), at(10), at(11));
    /* The audio-only brands. M4A is what a phone records a voice note as. */
    if (brand === "M4A " || brand === "M4B " || brand === "mp42" || brand === "isom" ||
        brand === "iso2" || brand === "mp41") {
      return "audio/mp4";
    }
    return null;
  }

  /* Anything else, including "<svg", "<!DOCTYPE" and a zip, is not a thing
     we accept. Returning null rather than the real type is deliberate: the
     caller has no business being told it found an interesting file. */
  return null;
}

/* The shared rules. `bytes` is optional at the point a browser is deciding
   whether to start an upload, and required by the time anything is stored. */
function judge(name, type, size, bytes) {
  var kind = kindOf(type);
  if (!kind) return { ok: false, why: "wrong_type" };

  var limit = kind === "audio" ? LIMITS.audio : LIMITS.image;
  if (typeof size === "number") {
    if (size <= 0) return { ok: false, why: "empty" };
    if (size > limit) return { ok: false, why: "too_big", limit: limit };
  }

  if (bytes) {
    var real = sniff(bytes);
    /* The only check that cannot be lied to. A browser reports whatever it
       likes and an attacker reports whatever they like. */
    if (!real) return { ok: false, why: "not_what_it_claims" };
    if (kindOf(real) !== kind) return { ok: false, why: "not_what_it_claims" };
    return { ok: true, kind: kindOf(real), type: real, name: name, size: size };
  }

  return { ok: true, kind: kind, type: type, name: name, size: size, limit: limit };
}

/** A file the visitor picked in the widget. */
function checkAttachment(file, bytes) {
  if (!file || typeof file !== "object") return { ok: false, why: "no_file" };
  return judge(String(file.name || ""), String(file.type || ""), Number(file.size), bytes);
}

/** A URL Facebook, Instagram or WhatsApp sent us. */
function checkRemote(att, bytes) {
  if (!att || typeof att !== "object" || !att.url) return { ok: false, why: "no_file" };

  var host = "";
  var protocol = "";
  try {
    var u = new URL(String(att.url));
    host = u.hostname.toLowerCase();
    protocol = u.protocol;
  } catch (e) {
    return { ok: false, why: "bad_url" };
  }

  if (protocol !== "https:" && protocol !== "http:") {
    return { ok: false, why: "host_not_allowed" };
  }

  /* Exact host, or a subdomain of one. Checked this way round on purpose: a
     plain "ends with fbcdn.net" test accepts fbcdn.net.evil.example, which
     is the oldest trick there is. */
  var allowed = false;
  for (var i = 0; i < META_HOSTS.length; i++) {
    var h = META_HOSTS[i];
    if (host === h || host.slice(-(h.length + 1)) === "." + h) { allowed = true; break; }
  }
  if (!allowed) return { ok: false, why: "host_not_allowed" };

  var r = judge(String(att.name || "attachment"), String(att.type || ""), Number(att.size), bytes);
  if (r.ok) r.url = String(att.url);
  return r;
}

/* A name that is going to be printed on a page somebody reads.

   Whatever the visitor called the file arrives verbatim, so it is theirs,
   not ours: a path, a newline that makes one filename look like two lines of
   conversation, or four hundred characters that push a table sideways. The
   last path segment is the only part that was ever meaningful. */
function safeName(raw) {
  var s = String(raw == null ? "" : raw);
  /* Last segment, for both separators, because the file may have come from
     either kind of machine. */
  var cut = Math.max(s.lastIndexOf("/"), s.lastIndexOf("\\"));
  if (cut !== -1) s = s.slice(cut + 1);
  /* Control characters become spaces rather than vanishing: removing them
     silently joins words that were never joined. */
  s = s.replace(/[\u0000-\u001f\u007f]/g, " ").trim();
  if (!s) return "attachment";
  return s.slice(0, 120);
}

/**
 * What storage actually received, judged on its real bytes and real length.
 *
 * `checkAttachment` runs in the visitor's browser and is therefore advice.
 * The upload URL it is handed is an ordinary endpoint: anyone can PUT
 * anything to it and then claim it was a photo. So the file is read back and
 * judged here, and this is the result that decides whether it is attached to
 * a message at all.
 *
 * @param claim      what the client said it uploaded
 * @param bytes      the first bytes as stored (32 is plenty; it only sniffs)
 * @param storedSize the real byte length, which the claim cannot be trusted for
 */
function verifyStored(claim, bytes, storedSize) {
  var c = claim && typeof claim === "object" ? claim : {};
  var size = Number(storedSize);

  /* Bytes are not optional here, unlike in `judge`, where absent bytes mean
     "the browser has not read the file yet". At this point the file is in
     storage and could have been read, so being unable to read it is a
     failure to verify, and a failure to verify is not permission. */
  if (!bytes || typeof bytes.length !== "number") {
    return { ok: false, why: "not_what_it_claims" };
  }

  var r = judge(safeName(c.name), String(c.type || ""), size, bytes);
  if (!r.ok) return { ok: false, why: r.why, limit: r.limit };

  /* The claim is allowed to be wrong about the type, and is simply
     overruled; it is not allowed to be wrong about the KIND, because the
     dashboard chooses between <img> and <audio> from that and the two are
     not interchangeable. */
  if (c.kind && c.kind !== r.kind) return { ok: false, why: "not_what_it_claims" };

  var out = {
    storageId: c.storageId,
    kind: r.kind,
    type: r.type,
    name: r.name,
    size: size,
  };
  if (c.sourceUrl) out.sourceUrl = String(c.sourceUrl);
  return { ok: true, attachment: out };
}

export { checkAttachment, checkRemote, verifyStored, safeName, sniff, LIMITS, IMAGE, AUDIO, META_HOSTS };
