# Review - Finish the system end to end

Reviewed by a reviewer that did not write the code, on the single commit
`0540d3f`, on 2026-11-11. Fourteen findings. The verdict that matters: the
tests were all passing and none of the below was caught by them, because they
asserted the pure functions and nothing asserted the wrappers that expose
those functions to the public internet.

## What it found, and what was done

### Critical, and live at the time

**1. `attach` was an unauthenticated, replayable message-write primitive.**
The session id was taken on trust and never had to exist; nothing rate
limited the write, so capping `uploadUrl` at eight uploads bounded nothing;
and nothing recorded that a file had been attached, so one upload could be
replayed for ever with two thousand characters of the caller's text each
time, landing on the client's dashboard as the visitor.

Fixed: the session must exist, writes are capped per session through the
shared limiter, and `messages.by_attachment` makes a second attach of the
same file a refusal. `widget/tests/attach-auth.test.ts`. Verified against the
live deployment: `already_attached`, `no_session`.

**2. `/visitor/history` returned a transcript on a parameter the guard did
not check.** `publicRoute` only requires a session id to be present; the
query read on the visitor id alone. Worse, `visitors.hello` re-pointed an
existing session at whatever visitor id the caller sent, so a guessed session
id became a stranger's conversation. Both ids were `Date.now()` plus
`Math.random()`.

Fixed: the read requires the pair and checks they agree, a session keeps the
visitor that started it, and both ids are sixteen bytes of
`crypto.getRandomValues`. `widget/tests/visitor-auth.test.ts`. Both attacks
verified dead against the live deployment.

### High

**3. The sniff gate did not stop HTML being served from the Convex origin.**
Convex serves a file as the content type given at upload. PNG bytes stored as
`text/html` passed every check and became a page on the deployment's own
origin, which the dashboard linked with `target="_blank"`. Fixed: the stored
type must equal the sniffed type.

**4. A file uploaded and never attached was never reclaimed**, contradicting
this file's own header. Fixed: `sweepOrphans`, nightly, in `convex/crons.ts`.

**5. `attach` was a remote delete primitive.** A failed verdict deleted the
storage id it was handed with no ownership check. Fixed: it deletes only a
file nothing references.

**6. `historyForVisitor` was unbounded.** `hello` is public and creates a
session row per pair, so the fan-out was attacker-controlled and would
eventually exceed Convex's read limit, breaking that visitor's panel
permanently. Fixed: ten newest sessions, and `limit` is no longer a caller
argument.

**7. The 409 "that time has just been taken" was never shown.** It is
rendered inside the step-two fieldset, which is hidden by the time the 409
branch sets it. The one visible half of the booking feature did nothing.

### Medium, all fixed

8. The derived `picked` introduced a silent no-op submit. 9. A time chosen on
Monday survived a switch to Tuesday and could be posted. 10. A retry after a
409 sent the enquiry twice. 11. `asked: true` was asserted on an unvalidated
body, so a malformed reply read as "fully booked". 12. The availability GET
had no window check, making it an oracle over the diary and a cheap way to
exhaust the Apps Script quota. 13. Its docstring described the opposite of
its behaviour. 14. Three comment blocks described a Meta ingest path that
does not exist.

## The lesson worth keeping

Every finding above sat behind a green test suite. The gates in
`widget/gates/` were thoroughly asserted; what was not asserted was the thin
Convex layer that decides **who may call them**. Pure-function tests cannot
see an authorisation bug, because authorisation is not a pure function.

Two suites now hold that line instead of comments.

## Outcome

All fourteen addressed in `14c91f9`. 804 assertions, 16 suites. The two
critical findings were verified fixed against the live deployment with curl,
not only in tests.
