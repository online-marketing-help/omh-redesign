---
name: continuum-handoff
description: "Close a session so the next one starts at full speed: rewrite the resume contract in NEXT.md, reconcile state with the working tree, record decisions and pitfalls, and leave the user a short honest summary. Use when the session is ending, when the user says that is enough for today, before context compacts, and before handing a project to another person or agent. Triggers on: continuum handoff, wrap up, end of session, hand this off, write the handoff, done for today."
user_invocable: true
---

# continuum-handoff

The handoff is written for a stranger who will open this repo tomorrow with no
memory of today, and who should not need to ask you anything. Write it as if
that stranger is a competent engineer with zero context, because that is exactly
what the next session is.

---

## 1. Reconcile first

Do not write the handoff from memory of what you intended. Check what is
actually there.

```sh
git status --short
git diff --stat
continuum task open
continuum doctor
```

Anything uncommitted gets explained: is it finished work awaiting a commit, a
half-done edit, or an abandoned experiment that should be reverted? An
unexplained dirty tree is the most expensive thing you can leave behind.

---

## 2. Rewrite NEXT.md

This is the contract. Four sections, all concrete.

**Resume here** - the first three actions, each specific enough to act on
without a question. A command to run, or a file and function to open and what to
do there.

**Verify first** - the one command that proves the state is what you claim, and
the output that counts as a pass. The next session runs this before trusting
anything you wrote.

**Context the next session will need** - the two or three facts that are not
visible in the code: an API that behaves unexpectedly, a flag that must be set,
a refactor that is half applied and where its seam is, an approach already tried
and why it failed.

**Explicitly not next** - the adjacent work that looks urgent and is out of
scope. This is what stops the next session wandering.

---

## 3. Settle the rest of the state

- `STATE.md`: rewrite current focus, state of play, blockers. Blockers get a
  name and an owner: "needs the production API key, user has it" beats "blocked
  on credentials".
- `TASKS.md`: close what is proven, block what is stuck with the reason, leave
  what is genuinely untouched as TODO. Do not quietly close a task you did not
  finish.
- `DECISIONS.md`: append any choice made today that would otherwise be reopened,
  including the alternatives rejected and why.
- `brain/05-pitfalls.md`: append anything that bit you today, symptom first.
- Any brain file the day proved wrong: correct it now.

---

## 4. Stamp and verify the handoff

```sh
continuum checkpoint "<the first action from NEXT.md>"
continuum brief
```

Read that brief as if you were the next session. If it leaves a question you
would have to ask the user, the handoff is not finished. Fix the gap and run it
again.

---

## 5. Tell the user, briefly

Four or five lines, no report:

- what landed, with the evidence for it
- what did not, and honestly why
- what is next when they come back
- anything you need from them, named precisely

If something failed, say it failed and quote the output. The purpose of the
state files is that nobody has to discover a problem twice.

---

## 6. Compaction is a handoff too

When context is about to compact, run this skill rather than hoping the summary
carries the detail. State files survive compaction intact; a summary of a
summary does not. After compaction the session-start hook re-injects the brief,
so a checkpointed project picks the thread straight back up.
