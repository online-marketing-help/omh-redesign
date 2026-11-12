---
name: continuum-checkpoint
description: "Persist what just happened so the next session or context window can continue without loss. Stamps state, updates the task ledger with evidence, records decisions, and grows the pitfalls file. Use after completing any unit of work, before a risky operation, when context is filling up, and whenever the stop hook reports that state is behind the working tree. Triggers on: continuum checkpoint, save state, record progress, update project state, checkpoint this."
user_invocable: true
---

# continuum-checkpoint

A checkpoint is a promise: if this session dies now, the next one loses nothing
but the work since the last checkpoint. Write it so that promise is true.

**When:** after every completed unit of work; before any migration, deploy,
destructive command or long-running build; when context is roughly two thirds
full; when the stop hook says state is stale. Not only at the end.

---

## 1. Decide what changed

Walk these four questions. Most checkpoints touch two of them, not all.

| Question | If yes, write to |
|---|---|
| Did a task finish, or get blocked? | `TASKS.md` via the CLI, with evidence |
| Did the current focus or state of play change? | `STATE.md` |
| Did a real choice get made, with alternatives rejected? | `DECISIONS.md` |
| Did something surprise, bite or waste time? | `brain/05-pitfalls.md` |

And one more that is easy to skip: **did a brain file turn out to be wrong?**
Fix it now, in this turn, while you still remember what was wrong about it.

---

## 2. Record the task honestly

```sh
continuum task done T-0NN "pnpm test src/webhook: 14 passed, retry capped at 30s"
continuum task block T-0NN "needs the STRIPE_WEBHOOK_SECRET value, user has it"
```

The evidence field holds the command you ran and the result you observed. Not
"implemented", not "looks correct", not "should work". The CLI refuses an empty
evidence field; treat that refusal as the point, not an obstacle.

If the work is real but unproven, the task is not DONE. Leave it DOING and say
in `STATE.md` what proof is still missing.

---

## 3. Rewrite STATE.md, do not append to it

`STATE.md` is a snapshot, not a log. Replace the stale lines. It is injected
into every new session, so keep it under about 60 lines: current focus in one or
two sentences, state of play as verifiable bullets, blockers, decisions in
force, and the "do not" list.

The narrative belongs in the journal, which is automatic:

```sh
continuum log "swapped the retry loop to exponential backoff; the old linear one is in commit a3f91c2 if we need it back"
```

---

## 4. Stamp it

```sh
continuum checkpoint "<the next concrete action>"
```

The next-action string is the single highest-value field in the whole system,
because it is what a fresh session reads first. Make it an instruction, not a
topic:

- Weak: "continue the webhook work"
- Strong: "add the 30s cap to the backoff in src/webhook.ts:88, then run pnpm test src/webhook"

The command stamps the state file with time, git sha, branch, dirty-file count
and that next action, updates the cross-project registry, and journals the
checkpoint.

---

## 5. Before something risky

Checkpoint first, and write what you are about to do and how to undo it:

```sh
continuum log "about to run the 004 migration against staging; rollback is scripts/rollback-004.sql"
continuum checkpoint "verify the 004 migration landed, then re-run the seed"
```

If it goes wrong, the next session reads a record of the attempt rather than
inferring it from wreckage.
