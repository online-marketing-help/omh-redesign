---
name: continuum-verify
description: "Evidence gate before claiming anything is done, works, is fixed or is deployed. Requires a command that was actually run and output that was actually read, checks for regressions in what used to work, then records the proof in the task ledger. Use before marking a task DONE, before telling the user a feature works, and before any claim about tests, performance or security. Triggers on: continuum verify, is it done, verify this, prove it works, before declaring done, check for regressions."
user_invocable: true
---

# continuum-verify

The failure this prevents is specific and common: the work is described as
complete, the description is plausible, and nobody ran the thing. Every later
session then builds on a claim instead of a fact, and the state files, which are
supposed to be the trustworthy part, become the vector for the error.

A claim is admissible only if you ran something and read the output.

---

## 1. What counts

| Claim | Evidence that counts | Evidence that does not |
|---|---|---|
| Tests pass | The runner's output, with the counts | "the tests should pass now" |
| Feature works | The feature exercised end to end, output quoted | The diff looks right |
| Bug fixed | The original reproduction, now failing to reproduce | The cause was identified |
| Performance improved | Before and after numbers from the same measurement | The algorithm is better |
| API integration works | A real call and its response body or status | The client compiles |
| Deployed | The deployed URL answering, plus the build id | The deploy command exited 0 |
| Security issue fixed | The attack attempted and rejected | The input is now validated |

HTTP 200 is not proof that the right thing happened. A green build is not proof
the feature works. Read the body, check the value, exercise the path.

---

## 2. Run the gate

1. **Reproduce the original problem** if there was one, so you know the test is
   capable of failing. A test you have never watched fail proves nothing.
2. **Exercise the change** by the path a user takes, not only by unit test.
3. **Check the neighbours.** Run the full suite, or at least the modules that
   touch what you changed. Quote the before and after counts: "48 passed before,
   49 passed after" is a regression check; "tests pass" is not.
4. **Read every line of output you are relying on.** Warnings in the output you
   skipped are the next session's pitfall entry.

If any step cannot be run here, say which, and why, and what remains unproven.
An honest "unverified, needs a staging key" is worth more than a confident
guess, and it is the kind of thing that must appear in `STATE.md` rather than
being quietly dropped.

---

## 3. Record the proof

```sh
continuum task done T-0NN "pnpm test: 49 passed (48 before); POST /api/webhook -> 200 with retry_after=30"
```

The evidence field is the command and the observed result, compressed to one
line. A later session reads that line and knows exactly how much to trust the
claim. The CLI refuses a DONE with no evidence; do not route around it, and do
not fill it with "verified".

If the proof is longer than a line, write it to `.continuum/artifacts/` and cite
the filename in the evidence field.

---

## 4. Then say it plainly

Report what you verified and how, what you did not verify and why, and what
regressed if anything did. State completion without hedging when it is verified,
and never state it when it is not.
