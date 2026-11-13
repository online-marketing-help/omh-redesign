import { ctx } from "./convex-mock";
import { attach, uploadUrl, canAttach } from "../convex/attachments";
import { logMessage } from "../convex/functions";

/* =========================================================================
   Who may attach a file to a conversation.

   `attach` writes a message. A review on 2026-11-11 found it was an
   unauthenticated, unlimited, replayable way to write one into ANY
   conversation:

     - the session id was taken on trust and never had to exist;
     - nothing rate limited it, so the eight-upload cap on `uploadUrl` was
       irrelevant: one uploaded file bought unlimited writes;
     - nothing recorded that a file had already been attached, so the same
       storage id could be replayed for ever, each time with two thousand
       characters of the caller's text, landing in the client's dashboard
       as if the visitor had said it.

   And one in the other direction: a failed verdict deleted the storage id
   it was handed, with no check that the caller owned it, so naming
   somebody else's file with a deliberately wrong kind destroyed it.
   ========================================================================= */

let pass = 0, fail = 0;
function eq(label: string, got: unknown, want: unknown) {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  if (ok) { pass++; console.log("  ok   " + label); }
  else { fail++; console.log("  FAIL " + label + "\n         got  " + JSON.stringify(got) + "\n         want " + JSON.stringify(want)); }
}
function ok(label: string, cond: boolean) { eq(label, cond, true); }

const call = (fn: any, c: any, args: any) => fn._handler(c, args);

/* A real PNG head, so the byte check passes and what is being tested is
   the authorisation rather than the sniffing, which attachments.test.ts
   already covers in 65 assertions. */
const PNG = new Uint8Array(2048);
PNG.set([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a], 0);

function withFiles() {
  const { db, ctx: c } = ctx();
  const files: Record<string, { bytes: Uint8Array; type: string }> = {};
  const deleted: string[] = [];

  c.storage = {
    generateUploadUrl: async () => "https://files.test/upload",
    getUrl: async (id: string) => (files[id] ? `https://files.test/${id}` : null),
    getMetadata: async (id: string) =>
      files[id] ? { size: files[id].bytes.length, contentType: files[id].type } : null,
    get: async (id: string) =>
      files[id]
        ? {
            size: files[id].bytes.length,
            slice: (a: number, b: number) => ({
              arrayBuffer: async () => files[id].bytes.slice(a, b).buffer,
            }),
          }
        : null,
    delete: async (id: string) => { deleted.push(id); delete files[id]; },
  };

  const put = (id: string, type = "image/png", bytes = PNG) => { files[id] = { bytes, type }; };
  /* `attach` reaches logMessage through the generated `api` object, which
     is a reference, not the function. Point it at the real handler so this
     exercises the actual write rather than a stub of one. */
  /* `attach` reaches both logMessage and canAttach through the generated
     `api` object, which holds references rather than functions. Route by
     the argument shape, so this exercises the real handlers. */
  c.runMutation = (_ref: any, args: any) =>
    "storageId" in args && !("role" in args)
      ? (canAttach as any)._handler(c, args)
      : (logMessage as any)._handler(c, args);

  db.insert("sessions", { sessionId: "real", visitorId: "v1", channel: "chat", startedAt: 1, lastSeenAt: 1 });
  return { db, c, put, deleted, files };
}

const good = (over: any = {}) => ({
  sessionId: "real", storageId: "f1", kind: "image", type: "image/png", name: "a.png", ...over,
});

console.log("\n== the happy path still works ==");
{
  const { db, c, put } = withFiles();
  put("f1");
  const r = await call(attach, c, good());
  eq("an honest upload is attached", r.ok, true);
  eq("and it wrote exactly one message", db.all("messages").length, 1);
  eq("as the visitor", db.all("messages")[0].role, "user");
}

console.log("\n== the same file cannot be attached twice ==");
{
  const { db, c, put } = withFiles();
  put("f1");
  await call(attach, c, good());
  const again = await call(attach, c, good({ text: "x".repeat(2000) }));
  eq("a replay is refused", again.ok, false);
  eq("with a reason", again.why, "already_attached");
  eq("and no second message was written", db.all("messages").length, 1);
}

console.log("\n== a session that does not exist is not a session ==");
{
  const { db, c, put } = withFiles();
  put("f1");
  const r = await call(attach, c, good({ sessionId: "never-started" }));
  eq("it is refused", r.ok, false);
  eq("no message is written anywhere", db.all("messages").length, 0);
}

console.log("\n== writing is capped, not just uploading ==");
{
  const { db, c, put } = withFiles();
  let refused = 0;
  for (let i = 0; i < 40; i++) {
    put(`f${i}`);
    const r = await call(attach, c, good({ storageId: `f${i}` }));
    if (!r.ok) refused++;
  }
  ok("it stops well before forty", db.all("messages").length < 40);
  ok("and says so", refused > 0);
}

console.log("\n== deleting somebody else's file ==");
{
  const { c, put, deleted, files } = withFiles();
  put("mine");
  await call(attach, c, good({ storageId: "mine" }));          // now referenced
  const r = await call(attach, c, good({ storageId: "mine", kind: "audio", type: "audio/ogg" }));
  eq("naming a file that is already in a conversation is refused", r.ok, false);
  ok("and it is NOT deleted", deleted.indexOf("mine") === -1 && files["mine"] !== undefined);
}
{
  const { c, put, deleted } = withFiles();
  /* A file nothing references yet, failing its own check, IS cleaned up:
     that is the case the deletion exists for. */
  put("junk", "image/png", new Uint8Array([0x50, 0x4b, 0x03, 0x04, 0, 0, 0, 0]));
  const r = await call(attach, c, good({ storageId: "junk" }));
  eq("a file that is not what it claims is refused", r.ok, false);
  ok("and that one is deleted", deleted.indexOf("junk") !== -1);
}

console.log("\n== what the browser said it uploaded as ==");
{
  const { db, c, put } = withFiles();
  /* PNG bytes, stored with an HTML content type. Convex serves the type it
     was given, so this is a page on the deployment's own origin, and the
     dashboard links attachments with target="_blank". */
  put("evil", "text/html", PNG);
  const r = await call(attach, c, good({ storageId: "evil" }));
  eq("a file stored as text/html is refused", r.ok, false);
  eq("for what it is", r.why, "not_what_it_claims");
  eq("and nothing was written", db.all("messages").length, 0);
}

console.log("\n== the upload URL is still capped ==");
{
  const { c } = withFiles();
  let granted = 0;
  for (let i = 0; i < 20; i++) {
    const r = await call(uploadUrl, c, { sessionId: "real" });
    if (r.ok) granted++;
  }
  ok("not twenty of them", granted < 20);
  ok("but some", granted > 0);
}

console.log(`\n${pass} passed, ${fail} failed`);
if (fail) process.exit(1);
