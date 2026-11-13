# Test plan - Complete the system: every feature that needs no credential, tested one at a time

_pending_

Written with plan.md, before implementation. Tests derive from the invariants in
architecture.md, not from the code that was written, which is why they are
decided before there is any code to be shaped by.

## Unit level

| Behaviour asserted | Test file | Fails when |
|---|---|---|
|  |  |  |

The "fails when" column is the one that matters. A test that cannot be made to
fail by a plausible bug is not testing anything.

## Integration level

The paths that cross a boundary: handler to database, job to queue, client to
API. What is faked and what is real, and why that line is in the right place.

## User-visible verification

For anything with a UI, the exact steps driven in a real browser, and what is
observed at each one. Not "the page loads": the field accepts input, the error
shows on bad input, the record appears after submit, the state survives reload.

| Step | Expected |
|---|---|
|  |  |

## Regression surface

What used to work that this change could break, and the command that proves it
still works. Record the counts before and after, since "tests pass" without a
before number hides a regression.

## Deliberately not tested

What is left uncovered and why that is acceptable. An honest gap beats a test
that asserts nothing.
