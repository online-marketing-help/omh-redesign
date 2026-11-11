import { checkAttachment, checkRemote, verifyStored, LIMITS, sniff } from "../gates/attachments.js";

/* =========================================================================
   What a visitor is allowed to send the assistant.

   An upload box on a public page is the widest door in the system. Anything
   on the internet can post to it, so what it accepts has to be decided here
   rather than by whatever the browser happened to say the file was.

   Three things this is really about:

     - **Size, checked before the upload starts.** Refusing a 400MB file
       after receiving it is not refusing it.
     - **The type, read from the bytes.** A browser reports whatever it
       likes, and an attacker reports whatever they like.
     - **SVG is not an image here.** It is a document that can carry script,
       and an SVG served back to somebody viewing a conversation is stored
       cross-site scripting. It is the one refusal worth writing down.
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

/** The first bytes of each format, which is what actually identifies it. */
const MAGIC: Record<string, number[]> = {
  jpeg: [0xff, 0xd8, 0xff, 0xe0],
  png: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a],
  gif: [0x47, 0x49, 0x46, 0x38, 0x39, 0x61],
  webp: [0x52, 0x49, 0x46, 0x46, 0, 0, 0, 0, 0x57, 0x45, 0x42, 0x50],
  ogg: [0x4f, 0x67, 0x67, 0x53],
  mp3: [0x49, 0x44, 0x33],
  webm: [0x1a, 0x45, 0xdf, 0xa3],
  svg: [0x3c, 0x73, 0x76, 0x67], // "<svg"
  html: [0x3c, 0x21, 0x44, 0x4f, 0x43], // "<!DOC"
  zip: [0x50, 0x4b, 0x03, 0x04],
};
const bytes = (kind: string, size = 1024) => {
  const head = MAGIC[kind] ?? [0, 0, 0, 0];
  const b = new Uint8Array(size);
  b.set(head, 0);
  return b;
};

console.log("\n== size, before a byte is uploaded ==");
{
  const big = { name: "holiday.jpg", type: "image/jpeg", size: LIMITS.image + 1 };
  eq("an oversized image is refused", checkAttachment(big).why, "too_big");
  eq("and the limit is said, so the message can name it", checkAttachment(big).limit, LIMITS.image);
  ok("the limit is a real one", LIMITS.image > 0 && LIMITS.image <= 25 * 1024 * 1024, String(LIMITS.image));

  eq("a voice note has its own, larger limit", LIMITS.audio >= LIMITS.image, true);
  eq("an oversized one is refused",
     checkAttachment({ name: "note.m4a", type: "audio/mp4", size: LIMITS.audio + 1 }).why, "too_big");

  /* Zero bytes is a failed upload, not a file. Storing it leaves an
     attachment on the conversation that renders as nothing. */
  eq("an empty file is refused",
     checkAttachment({ name: "x.jpg", type: "image/jpeg", size: 0 }).why, "empty");
}

console.log("\n== what is allowed at all ==");
{
  eq("a jpeg", checkAttachment({ name: "a.jpg", type: "image/jpeg", size: 2048 }).ok, true);
  eq("a png", checkAttachment({ name: "a.png", type: "image/png", size: 2048 }).ok, true);
  eq("a voice note", checkAttachment({ name: "a.m4a", type: "audio/mp4", size: 2048 }).ok, true);
  eq("a pdf is not", checkAttachment({ name: "a.pdf", type: "application/pdf", size: 2048 }).why, "wrong_type");
  eq("nor a zip", checkAttachment({ name: "a.zip", type: "application/zip", size: 2048 }).why, "wrong_type");
  eq("nor an executable", checkAttachment({ name: "a.exe", type: "application/octet-stream", size: 2048 }).why, "wrong_type");
}

console.log("\n== SVG IS NOT AN IMAGE HERE ==");
{
  /* It is a document that can carry script. Served back to whoever opens
     that conversation on the dashboard, it is stored cross-site scripting,
     and every "allowed image types" list that includes it is a hole. */
  eq("refused by the type it claims",
     checkAttachment({ name: "logo.svg", type: "image/svg+xml", size: 2048 }).why, "wrong_type");
  eq("and by what is actually in it", sniff(bytes("svg")), null);
}

console.log("\n== THE BYTES, not what the browser said ==");
{
  /* A browser reports whatever it likes and an attacker reports whatever
     they like. This is the only check that cannot be lied to. */
  eq("a jpeg is a jpeg", sniff(bytes("jpeg")), "image/jpeg");
  eq("a png", sniff(bytes("png")), "image/png");
  eq("a gif", sniff(bytes("gif")), "image/gif");
  eq("a webp", sniff(bytes("webp")), "image/webp");
  eq("an ogg", sniff(bytes("ogg")), "audio/ogg");
  eq("an mp3", sniff(bytes("mp3")), "audio/mpeg");

  eq("HTML wearing a .jpg name is not an image", sniff(bytes("html")), null);
  eq("nor is a zip", sniff(bytes("zip")), null);
  eq("nor is nothing at all", sniff(new Uint8Array(0)), null);

  /* The case the whole function exists for. */
  const r = checkAttachment({ name: "photo.jpg", type: "image/jpeg", size: 4096 }, bytes("html"));
  eq("a file that lies about itself is refused", r.why, "not_what_it_claims");
}
{
  /* And the honest one still passes once the bytes are seen. */
  const r = checkAttachment({ name: "photo.jpg", type: "image/jpeg", size: 4096 }, bytes("jpeg"));
  eq("an honest file passes", r.ok, true);
  eq("recorded by what it really is", r.kind, "image");
  eq("with the sniffed type", r.type, "image/jpeg");
}

console.log("\n== FROM FACEBOOK, INSTAGRAM AND WHATSAPP ==");
{
  /* These do not arrive as bytes. Meta sends a URL and expects us to fetch
     it, which turns our server into something that makes HTTP requests to
     addresses a stranger chose. That is server-side request forgery, and it
     is the reason this function exists rather than a bare fetch in a Code
     node.

     An attacker who can send a Facebook message can otherwise make our
     server call anything our server can reach: a cloud metadata endpoint, a
     database admin port, anything on the private network. */
  const meta = "https://lookaside.fbsbx.com/whatsapp_business/attachments/?mid=abc";
  eq("a Meta URL is fetched", checkRemote({ url: meta, type: "image/jpeg" }).ok, true);

  eq("localhost is not",
     checkRemote({ url: "http://localhost:8080/admin", type: "image/jpeg" }).why, "host_not_allowed");
  eq("nor the cloud metadata address",
     checkRemote({ url: "http://169.254.169.254/latest/meta-data/", type: "image/jpeg" }).why, "host_not_allowed");
  eq("nor a private address",
     checkRemote({ url: "http://10.0.0.5/", type: "image/jpeg" }).why, "host_not_allowed");
  eq("nor somebody else's website",
     checkRemote({ url: "https://evil.example/payload.jpg", type: "image/jpeg" }).why, "host_not_allowed");
  /* A host that merely ends in something that looks right. */
  eq("nor a lookalike host",
     checkRemote({ url: "https://fbcdn.net.evil.example/x.jpg", type: "image/jpeg" }).why, "host_not_allowed");

  eq("and not a file:// url",
     checkRemote({ url: "file:///etc/passwd", type: "image/jpeg" }).why, "host_not_allowed");
  eq("nor rubbish", checkRemote({ url: "not a url", type: "image/jpeg" }).why, "bad_url");
  eq("nor nothing", checkRemote(null as never).why, "no_file");
}
{
  /* Size still applies, from the header Meta sends, before the body is
     read. The same limits as an upload: a voice note is a voice note
     whichever door it came through. */
  const meta = "https://lookaside.fbsbx.com/x.jpg";
  eq("an oversized remote image is refused",
     checkRemote({ url: meta, type: "image/jpeg", size: LIMITS.image + 1 }).why, "too_big");
  eq("the type still has to be one we take",
     checkRemote({ url: meta, type: "application/pdf" }).why, "wrong_type");
  /* And once the bytes arrive they are sniffed like any other, because a
     URL on a Meta host is still a file somebody else chose. */
  eq("a remote file that lies is refused",
     checkRemote({ url: meta, type: "image/jpeg", size: 4096 }, bytes("html")).why, "not_what_it_claims");
  eq("an honest one passes",
     checkRemote({ url: meta, type: "image/jpeg", size: 4096 }, bytes("jpeg")).kind, "image");
}
{
  /* WhatsApp voice notes are ogg/opus, and they are the common case: a
     customer holds the button and talks rather than typing. */
  const r = checkRemote({
    url: "https://lookaside.fbsbx.com/whatsapp_business/attachments/?mid=v1",
    type: "audio/ogg", size: 90_000,
  }, bytes("ogg"));
  eq("a WhatsApp voice note is taken", r.ok, true);
  eq("as audio", r.kind, "audio");
}

console.log("\n== rubbish in ==");
{
  eq("no file", checkAttachment(null as never).why, "no_file");
  eq("no type", checkAttachment({ name: "a", type: "", size: 10 }).why, "wrong_type");
}

/* =========================================================================
   After the upload: the check that actually counts.

   `checkAttachment` runs in the visitor's browser, so it is advice, not a
   guard. The upload URL it is given is an ordinary endpoint, and anybody who
   opens the network tab can PUT whatever they like to it and then claim it
   was a photo. So the file is read back out of storage and judged on its
   real bytes and its real length before it is ever attached to a message.

   Two things the browser cannot be trusted on, and both are only catchable
   here:

     - **the length**: a client can claim 2KB and upload 300MB;
     - **the name**: it reaches a dashboard someone reads, so a newline or a
       path in it is theirs, not ours.
   ========================================================================= */
console.log("\n== what storage actually received ==");
{
  const claim = { storageId: "kg2abc", kind: "image", type: "image/jpeg", name: "roof.jpg", size: 4096 };

  const good = verifyStored(claim, bytes("jpeg", 4096), 4096);
  eq("an honest upload is attached", good.ok, true);
  eq("with the storage id carried through", good.attachment?.storageId, "kg2abc");
  eq("the kind comes from the bytes", good.attachment?.kind, "image");
  eq("and so does the type", good.attachment?.type, "image/jpeg");

  /* The whole reason this function exists. */
  eq("bytes that disagree with the claim are refused",
     verifyStored(claim, bytes("html", 4096), 4096).why, "not_what_it_claims");
  eq("an SVG uploaded as a jpeg is refused",
     verifyStored(claim, bytes("svg", 4096), 4096).why, "not_what_it_claims");
  eq("a zip is refused",
     verifyStored(claim, bytes("zip", 4096), 4096).why, "not_what_it_claims");
  eq("and nothing is attached when it is refused",
     verifyStored(claim, bytes("zip", 4096), 4096).attachment, undefined);

  /* A claimed size of 4KB and a real one of 300MB. The pre-upload check
     passed on the claim; only this one sees the truth. */
  const lying = { ...claim, size: 4096 };
  eq("a file far larger than it claimed is refused",
     verifyStored(lying, bytes("jpeg", 64), LIMITS.image + 1).why, "too_big");
  eq("the stored length wins over the claimed one",
     verifyStored(lying, bytes("jpeg", 64), 9999).attachment?.size, 9999);

  eq("an empty file is refused", verifyStored(claim, bytes("jpeg", 64), 0).why, "empty");
  eq("missing bytes are refused, never waved through",
     verifyStored(claim, null as never, 4096).why, "not_what_it_claims");

  /* An audio claim with image bytes is the same mistake in the other
     direction, and it has to fail for the same reason: the dashboard decides
     between <img> and <audio> from `kind`. */
  eq("image bytes claimed as audio are refused",
     verifyStored({ ...claim, kind: "audio", type: "audio/ogg" }, bytes("jpeg", 4096), 4096).why,
     "not_what_it_claims");
  eq("a real voice note passes",
     verifyStored({ ...claim, kind: "audio", type: "audio/ogg", name: "note.ogg" },
                  bytes("ogg", 9000), 9000).attachment?.kind, "audio");
}
{
  /* The name is printed on a page a person reads. */
  const bs = bytes("png", 2048);
  const named = (name: string) =>
    verifyStored({ storageId: "s1", kind: "image", type: "image/png", name, size: 2048 }, bs, 2048)
      .attachment?.name;

  eq("a path is reduced to its last part", named("../../../etc/passwd.png"), "passwd.png");
  eq("a Windows path too", named("C:\\Users\\me\\shot.png"), "shot.png");
  eq("newlines go, so one name cannot look like two lines",
     named("invoice\n\nURGENT: call this number.png"), "invoice  URGENT: call this number.png");
  eq("a long name is cut rather than filling the column",
     named("a".repeat(400) + ".png")?.length, 120);
  eq("nothing printable left falls back to something",
     named("   "), "attachment");
  eq("no name at all is the same",
     verifyStored({ storageId: "s1", kind: "image", type: "image/png", size: 2048 }, bs, 2048)
       .attachment?.name, "attachment");
}

/* =========================================================================
   The two signatures a review called too loose to be signatures.
   ========================================================================= */
console.log("\n== a signature has to actually identify something ==");
{
  /* An MPEG frame sync is eleven set bits. On its own that matches a great
     deal of arbitrary data, so the reserved fields beside it are checked
     too: a file is not an mp3 because its first eleven bits happen to be
     ones. */
  const sync = (b1: number, b2: number) => {
    const b = new Uint8Array(1024);
    b.set([0xff, b1, b2, 0x00], 0);
    return sniff(b);
  };
  eq("a real mp3 frame header is audio", sync(0xfb, 0x90), "audio/mpeg");
  eq("a reserved MPEG version is not", sync(0xeb, 0x90), null);
  eq("a reserved layer is not", sync(0xf9, 0x90), null);
  eq("an invalid bitrate index is not", sync(0xfb, 0xf0), null);
  eq("a reserved sample rate is not", sync(0xfb, 0x9c), null);

  /* An ISO base media file says what it is in its brand. Without reading
     it, an mp4 video and a HEIC photo were both stored as voice notes and
     rendered in an <audio> element that plays nothing. */
  const ftyp = (brand: string) => {
    const b = new Uint8Array(1024);
    b.set([0, 0, 0, 0x20, 0x66, 0x74, 0x79, 0x70], 0);
    for (let i = 0; i < 4; i++) b[8 + i] = brand.charCodeAt(i);
    return sniff(b);
  };
  eq("an M4A voice note is audio", ftyp("M4A "), "audio/mp4");
  eq("a HEIC photo is not a voice note", ftyp("heic"), null);
  eq("nor is an AVIF", ftyp("avif"), null);
  eq("nor a QuickTime movie", ftyp("qt  "), null);
}

console.log(`\n${pass} passed, ${fail} failed`);
if (fail) process.exit(1);
