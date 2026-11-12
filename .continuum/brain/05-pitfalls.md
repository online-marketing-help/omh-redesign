# Pitfalls

Each entry is a mistake already made once. Symptom first, because the symptom
is what the next session sees.

---

**"every suite passed" and nothing ran.** `widget/tests/run.sh` is zsh and
uses zsh expansions (`${0:A:h}`, `${1:t:r}`). Under bash those are syntax
errors inside the loop body, every suite is skipped, `fails` stays 0, and the
last line claims success. The script now refuses bash outright. Run it with
`zsh tests/run.sh`.

---

**A gate passed its tests and took the live chat down.** `gate_source()`
bundles a gate with esbuild into `var GATE = (() => ...)()`. An n8n Code node
could not reach that global: `GATE.tidy is not a function`, every chat reply
an empty 200, four minutes on 2026-11-11. The tests imported the gate and
called it directly; n8n wraps the node body in a function and runs that.
**Use `gate_inline()`, and drive any Code node change through
`new Function(...)` before pushing.** `widget/tests/code-nodes.test.ts` now
checks all 20 nodes.

---

**A public Convex route that looks scoped and is not.** `publicRoute` only
checks a session id is **present**. `/visitor/history` read on the visitor id
alone, so presenting somebody else's returned their whole conversation; and
`visitors.hello` would re-point an existing session at whatever visitor id
the caller sent, turning a guessed session id into a transcript. Both found
by review on 2026-11-11, both fixed, both held by
`widget/tests/visitor-auth.test.ts`. **CORS is not a control here.**

---

**An upload endpoint that is a message-write primitive.** `attach` trusted
the session id, had no rate limit of its own, and recorded nothing about a
file having been used, so one upload bought unlimited writes into any
session. Capping the upload URL achieved nothing. Held now by
`widget/tests/attach-auth.test.ts`.

---

**The bytes are right and the file is still dangerous.** Convex serves a file
as the `Content-Type` given on upload, whatever the bytes say. A PNG header
plus script, stored as `text/html`, passed every byte check and became a page
on the deployment's own origin. The stored type must equal the sniffed type.

---

**A comment that is confidently wrong.** Three in this repo described the
opposite of the code, including one stating the public routes could not read
another session. Reviewers and future sessions believe comments. When
behaviour changes, the comment is part of the change.

---

**`isRoute` hardcoded A-F.** Route G existed and was tested, and every enrol
said "unknown_route". Ask the ROUTES object, never a literal list.

---

**`push.py` globbed `0*.json`.** No workflow numbered 10 or above was ever
pushed; `11-reactivation` sat generated and unsent. Now `[0-9][0-9]-*.json`.

---

**Overwriting a file instead of reading it first.** `settings/actions.ts` was
rewritten and `setOutbound` was destroyed. Read before you write.

---

**React 19's `set-state-in-effect`.** Setting state synchronously in an
effect is a lint error here, not a warning. Derive the value instead; the one
time that refactor was done carelessly it introduced a submit button that did
nothing and said nothing.

---

**Convex free plan.** It ran out mid-session on 2026-11-10 and every route,
including the public site's assistant, returned "exceeded the free plan
limits" for about an hour. It will recur. It is not a code fault.
