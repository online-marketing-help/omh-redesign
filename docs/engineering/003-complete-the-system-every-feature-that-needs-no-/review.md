# Review - Complete the system: every feature that needs no credential, tested one at a time

_pending_

Filled at the end, by a reviewer that did not write the code. In a session that
means a subagent with fresh context, given the diff and this folder but not the
reasoning that produced it. The author's own confidence is the thing under test.

## Evidence

Paste the real output. Not a description of it.

| Check | Command | Result |
|---|---|---|
| Tests |  |  |
| Build or types |  |  |
| Lint |  |  |
| Browser (user-visible changes) |  |  |

Before and after counts for the test suite, so a regression cannot hide:

## Findings

| # | Severity | Finding | File | Resolution |
|---|---|---|---|---|
| 1 | blocker / major / minor | what is wrong and what it breaks |  | fixed in <commit> / accepted because <reason> |

Blockers are resolved before this workstream closes. A blocker marked "accepted"
needs the requester's agreement, recorded here.

## Checked specifically

- [ ] Every task in plan.md is implemented, or explicitly dropped with a reason
- [ ] Error paths return what architecture.md said they return
- [ ] No secret, key or token added to a tracked file
- [ ] No debug code, commented-out block or stray console output left behind
- [ ] Authorisation enforced where the architecture said it would be
- [ ] Nothing described as working that was not observed working

## What was not verified

Named honestly, with what it would take. This is the section a later session
trusts most, so an empty one must be true rather than convenient.
