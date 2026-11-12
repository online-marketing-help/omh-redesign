---
name: continuum-resume
description: "Pick up a project exactly where the last session stopped, using durable state instead of asking the user to re-explain. Verifies the recorded state against the working tree, reconciles drift from commits made outside the session, then executes the resume contract in NEXT.md. Use at the start of a session on a project with existing .continuum state, or when the user says continue, carry on, where were we, pick up where we left off. Triggers on: continuum resume, resume work, continue where we stopped, what was I doing, carry on."
user_invocable: true
---

# continuum-resume

The user should be able to type "continue" and get work, not an interview.
Everything you need was written by the session that ended. Read it, confirm it
still describes reality, and get to work.

---

## 1. Load, do not re-derive

If the session-start hook ran, the brief is already in your context. Use it. If
it did not:

```sh
continuum where
continuum brief
```

Read, in this order: `STATE.md`, `NEXT.md`, open rows in `TASKS.md`, the tail of
today's and the previous journal file. Read the brain files the work touches,
and `brain/05-pitfalls.md` always.

Do not re-explore the repo to rebuild understanding that is already written
down. The one exception is drift, below.

---

## 2. Verify before trusting

State describes the past. The working tree is the present. Reconcile them before
touching code.

1. Run the verify command from `NEXT.md`. If it passes, the recorded state
   holds. If it fails, that failure is now the first task, ahead of whatever
   `NEXT.md` planned.
2. Check the drift section of the brief. Commits since the last checkpoint mean
   work happened that the state does not know about:
   `git log --oneline <last-sha>..HEAD` and `git diff --stat <last-sha>..HEAD`.
   Read what changed, then correct `STATE.md` and the affected brain files
   before proceeding.
3. Uncommitted changes mean the last session stopped mid-edit. Read the diff
   before adding to it; you may be looking at an abandoned approach the journal
   explains.
4. If state and reality disagree and you cannot tell which is right, say so and
   ask. One question beats an hour of building on a false premise.

---

## 3. Execute the contract

Take the actions in `NEXT.md` in order. For the task you are about to do:

```sh
continuum task start T-0NN      # or: continuum task add "<task>" if it is new
```

Then work. Normal engineering discipline applies: smallest change that does the
job, match the conventions recorded in `brain/02-conventions.md`, prove it with
a test or a command you actually ran.

Do not ask "should I continue?" between steps. The contract was written so you
would not have to.

---

## 4. Checkpoint as you go

After each completed unit of work, not at the end:

```sh
continuum task done T-0NN "<command run + observed result>"
continuum checkpoint "<the next concrete action>"
```

Update `STATE.md` when the focus or the state of play actually changes, and
append to `brain/05-pitfalls.md` the moment something bites. Follow
`continuum-checkpoint` for what belongs in each file.

---

## 5. When the plan is wrong

`NEXT.md` was written with less information than you have now. If following it
is clearly the wrong move, do not follow it silently and do not abandon it
silently either:

1. Say in one or two sentences why it is wrong.
2. Propose the correction.
3. Record it: `continuum log "deviated from NEXT: <what and why>"`, and if the
   deviation settles a real question, add an entry to `DECISIONS.md`.

A deviation that is written down is a decision. One that is not is drift.
