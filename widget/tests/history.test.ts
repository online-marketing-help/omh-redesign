import { ctx } from "./convex-mock";
import { historyForVisitor } from "../convex/visitors";

/* =========================================================================
   The conversation a returning visitor sees.

   The widget already said "I still have your details, so we can pick up
   where we left off" and then showed an empty panel, which is a promise the
   product did not keep. Everything said is in `messages`; nothing was
   loading it back.

   Keyed on the VISITOR, not the session. The session id lives in
   sessionStorage and dies when the tab closes; the visitor id lives in
   localStorage and survives. Keying this on the session would mean the
   history disappears exactly when somebody closes the browser and comes
   back tomorrow, which is the case it exists for.

   Read on the PAIR: the visitor id and a session id that belongs to it.
   The visitor id alone used to be enough, which meant presenting somebody
   else's returned their conversation. See visitor-auth.test.ts, which
   holds that line; this file is about the shaping.

   Three properties worth holding:

     - one timeline, in order, across however many visits it took;
     - a cap, because a panel is not an archive;
     - one visitor's messages never appear in another visitor's panel.
   ========================================================================= */

let pass = 0, fail = 0;
function eq(label: string, got: unknown, want: unknown) {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  if (ok) { pass++; console.log("  ok   " + label); }
  else { fail++; console.log("  FAIL " + label + "\n         got  " + JSON.stringify(got) + "\n         want " + JSON.stringify(want)); }
}
function ok(label: string, cond: boolean) { eq(label, cond, true); }

const call = (fn: any, c: any, args: any) => fn._handler(c, args);

function seed(c: any, db: any) {
  /* Two visits by one person, and a second person in between, because an
     index that is wrong still passes every test where only one visitor
     exists. */
  db.insert("sessions", { sessionId: "s1", visitorId: "v1", channel: "chat", startedAt: 1_000, lastSeenAt: 2_000 });
  db.insert("sessions", { sessionId: "s2", visitorId: "v1", channel: "chat", startedAt: 9_000, lastSeenAt: 9_900 });
  db.insert("sessions", { sessionId: "s3", visitorId: "v2", channel: "chat", startedAt: 3_000, lastSeenAt: 3_500 });

  db.insert("messages", { sessionId: "s1", role: "assistant", text: "Hello.", channel: "chat", at: 1_100 });
  db.insert("messages", { sessionId: "s1", role: "user", text: "How much is SEO?", channel: "chat", at: 1_200 });
  db.insert("messages", { sessionId: "s1", role: "assistant", text: "From £850 a month.", channel: "chat", at: 1_300 });
  /* The second visit, days later. */
  db.insert("messages", { sessionId: "s2", role: "user", text: "I am back about that SEO.", channel: "chat", at: 9_100 });
  /* Somebody else entirely. */
  db.insert("messages", { sessionId: "s3", role: "user", text: "Private to v2.", channel: "chat", at: 3_100 });
}

console.log("\n== one timeline across every visit ==");
{
  const { db, ctx: c } = ctx();
  seed(c, db);
  const r = await call(historyForVisitor, c, { visitorId: "v1", sessionId: "s2" });

  eq("both visits are in it", r.messages.length, 4);
  eq("oldest first, so it reads like a conversation",
     r.messages.map((m: any) => m.at), [1_100, 1_200, 1_300, 9_100]);
  eq("the text comes through", r.messages[1].text, "How much is SEO?");
  eq("and the role", r.messages[1].role, "user");
  eq("it says how many visits that was", r.sessions, 2);
  eq("and when the last thing was said", r.lastAt, 9_100);
}

console.log("\n== one visitor's conversation is their own ==");
{
  const { db, ctx: c } = ctx();
  seed(c, db);
  const mine = await call(historyForVisitor, c, { visitorId: "v1", sessionId: "s2" });
  const theirs = await call(historyForVisitor, c, { visitorId: "v2", sessionId: "s3" });

  ok("nothing of v2's is in v1's history",
     !JSON.stringify(mine.messages).includes("Private to v2"));
  eq("v2 gets exactly their own", theirs.messages.length, 1);
  eq("and it is theirs", theirs.messages[0].text, "Private to v2.");

  /* The one that matters if the id is ever mistyped or empty. */
  eq("an unknown visitor gets nothing, not everything",
     (await call(historyForVisitor, c, { visitorId: "nobody", sessionId: "s1" })).messages.length, 0);
  eq("an empty visitor id gets nothing",
     (await call(historyForVisitor, c, { visitorId: "", sessionId: "s1" })).messages.length, 0);
}

console.log("\n== a panel is not an archive ==");
{
  const { db, ctx: c } = ctx();
  db.insert("sessions", { sessionId: "big", visitorId: "v9", channel: "chat", startedAt: 0, lastSeenAt: 500 });
  for (let i = 0; i < 300; i++) {
    db.insert("messages", { sessionId: "big", role: i % 2 ? "user" : "assistant", text: `line ${i}`, channel: "chat", at: i });
  }

  const r = await call(historyForVisitor, c, { visitorId: "v9", sessionId: "big" });
  ok("it is capped", r.messages.length < 300);
  eq("at the documented cap", r.messages.length, 60);
  /* Which end is kept is the whole question. The RECENT end: what was said
     an hour ago is what the conversation is about, and the first thing
     anybody ever typed is not. */
  eq("and it keeps the recent end", r.messages[r.messages.length - 1].text, "line 299");
  eq("still oldest first within what is kept", r.messages[0].text, "line 240");
  ok("it says it was trimmed, so the panel can say so", r.trimmed === true);
}

console.log("\n== an attachment survives the round trip ==");
{
  const { db, ctx: c } = ctx();
  db.insert("sessions", { sessionId: "sa", visitorId: "v3", channel: "chat", startedAt: 0, lastSeenAt: 10 });
  db.insert("messages", {
    sessionId: "sa", role: "user", text: "Sent a photo", channel: "chat", at: 5,
    attachment: { storageId: "st1", kind: "image", type: "image/png", name: "roof.png", size: 2048 },
  });
  const r = await call(historyForVisitor, c, { visitorId: "v3", sessionId: "sa" });
  eq("the kind is there, so the bubble knows what to draw", r.messages[0].attachment.kind, "image");
  eq("and a url was resolved for it", typeof r.messages[0].attachment.url, "string");
  ok("the storage id is NOT handed to the browser",
     r.messages[0].attachment.storageId === undefined);
}

console.log(`\n${pass} passed, ${fail} failed`);
if (fail) process.exit(1);
