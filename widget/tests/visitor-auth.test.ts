import { ctx } from "./convex-mock";
import { historyForVisitor, hello } from "../convex/visitors";

/* =========================================================================
   Who is allowed to read whose conversation, and who is allowed to write
   into one.

   These routes answer a public page with no secret, so the only thing
   between a stranger and a customer's transcript is what is checked here.
   A review on 2026-11-11 found that very little was:

     - `/visitor/history` read on `visitorId` while the shared guard only
       required `sessionId` to be present, so presenting somebody else's
       visitor id returned their whole conversation;
     - `hello` re-pointed an existing session at whatever `visitorId` the
       caller sent, which turned a guessed SESSION id into a transcript
       read: claim the session, then ask for your own history.

   Both are asserted here rather than described, because the first one was
   described, in a comment, in the opposite of its actual behaviour.
   ========================================================================= */

let pass = 0, fail = 0;
function eq(label: string, got: unknown, want: unknown) {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  if (ok) { pass++; console.log("  ok   " + label); }
  else { fail++; console.log("  FAIL " + label + "\n         got  " + JSON.stringify(got) + "\n         want " + JSON.stringify(want)); }
}
function ok(label: string, cond: boolean) { eq(label, cond, true); }

const call = (fn: any, c: any, args: any) => fn._handler(c, args);

function seeded() {
  const { db, ctx: c } = ctx();
  db.insert("sessions", { sessionId: "victim-sess", visitorId: "victim-vis", channel: "chat", startedAt: 1_000, lastSeenAt: 2_000 });
  db.insert("messages", { sessionId: "victim-sess", role: "user", text: "My card number is private.", channel: "chat", at: 1_100 });
  db.insert("sessions", { sessionId: "mine-sess", visitorId: "mine-vis", channel: "chat", startedAt: 1_000, lastSeenAt: 2_000 });
  db.insert("messages", { sessionId: "mine-sess", role: "user", text: "Mine.", channel: "chat", at: 1_200 });
  return { db, c };
}

console.log("\n== a transcript is read by the pair, not by one half of it ==");
{
  const { c } = seeded();

  const mine = await call(historyForVisitor, c, { visitorId: "mine-vis", sessionId: "mine-sess" });
  eq("my own session and my own visitor id reads my conversation", mine.messages.length, 1);
  eq("and it is mine", mine.messages[0].text, "Mine.");

  /* The attack the review found. The guard only ever required a sessionId
     to be PRESENT; the read ignored it. */
  const stolen = await call(historyForVisitor, c, { visitorId: "victim-vis", sessionId: "mine-sess" });
  eq("somebody else's visitor id, with my session, reads nothing", stolen.messages.length, 0);

  const guessed = await call(historyForVisitor, c, { visitorId: "victim-vis", sessionId: "made-up" });
  eq("a session that does not exist reads nothing", guessed.messages.length, 0);

  eq("no session id at all reads nothing",
     (await call(historyForVisitor, c, { visitorId: "victim-vis", sessionId: "" })).messages.length, 0);

  ok("and the victim's text is in none of it",
     ![mine, stolen, guessed].some((r) => JSON.stringify(r).includes("card number")));
}

console.log("\n== a session belongs to the visitor who started it ==");
{
  const { db, c } = seeded();

  /* Claim somebody else's session for my own visitor id, which is what
     turned a guessable session id into a readable transcript. */
  await call(hello, c, { sessionId: "victim-sess", visitorId: "mine-vis", channel: "chat" });

  const row = db.all("sessions").find((s: any) => s.sessionId === "victim-sess");
  eq("the session keeps the visitor it was started by", row.visitorId, "victim-vis");

  const after = await call(historyForVisitor, c, { visitorId: "mine-vis", sessionId: "victim-sess" });
  eq("so claiming it reads nothing", after.messages.length, 0);
}

console.log("\n== a visitor with many visits cannot be made unreadable ==");
{
  const { db, ctx: c } = ctx();
  /* `hello` is public and inserts a session row per (session, visitor)
     pair, so the number of sessions on one visitor is attacker controlled.
     Fanning out over every one of them is a query that eventually exceeds
     what Convex will read and throws, which breaks the panel for that
     person permanently. */
  for (let i = 0; i < 400; i++) {
    db.insert("sessions", { sessionId: `s${i}`, visitorId: "busy", channel: "chat", startedAt: i, lastSeenAt: i });
    db.insert("messages", { sessionId: `s${i}`, role: "user", text: `m${i}`, channel: "chat", at: i });
  }
  db.insert("sessions", { sessionId: "own", visitorId: "busy", channel: "chat", startedAt: 9_000, lastSeenAt: 9_000 });

  const before = db.reads ?? 0;
  const r = await call(historyForVisitor, c, { visitorId: "busy", sessionId: "own" });
  ok("it still answers", Array.isArray(r.messages));
  ok("and it did not read every session it could find", (r.sessionsRead ?? 0) <= 10);
  eq("a caller-supplied limit cannot widen the read", r.messages.length <= 60, true);
}

console.log(`\n${pass} passed, ${fail} failed`);
if (fail) process.exit(1);
