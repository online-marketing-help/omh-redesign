---
name: continuum
description: "Entry point for durable project memory. Routes to onboarding on a project with no state, to resume on a project that has state, and answers which project am I in across many projects on one machine. Use at the start of work on any project carrying a .continuum/ directory, when the user asks where we left off, what was I doing, which project is this, or what is pending across my projects. Triggers on: continuum, resume, where did we leave off, pick up where we stopped, project state, which project, my projects, session handoff."
user_invocable: true
---

# continuum

A session ends. Its context is gone. The next session opens the same repo with
nothing but the files on disk, and the user should not have to explain the
project a second time.

Continuum makes the project itself carry the memory: `.continuum/` holds what
was learned, what is decided, what is done with proof, and what to do next. Your
job in this skill is to route: establish which project this is, then either
build that memory or use it.

Never ask the user for project details that `.continuum/` already answers. If
you catch yourself about to ask "what does this project do", read the brain
files instead.

---

## 1. Establish identity first

One machine runs many projects. Before anything else, know which one you are in.

```sh
continuum where      # this project: name, stable id, root, repo, last state, next action
continuum projects   # every registered project on this machine, newest first
```

Report the project by the **name in `config.json`**, never by guessing from the
directory path. Two checkouts of the same repo are two projects with two ids and
two separate states; never read one project's state while working in another.

If the user asks what is pending overall, or names a project that is not this
one, use `continuum projects`, and `continuum switch <name>` to resolve its path
and read its brief. Working in it means moving to that path, not pulling its
notes into this session.

---

## 2. Route

Run the check, then take exactly one branch.

```sh
continuum doctor 2>/dev/null || echo "not initialised"
```

| What you find | Branch |
|---|---|
| No `.continuum/` directory | **Install**, then onboard. Run `continuum init`, then follow `continuum-onboard`. |
| `.continuum/` exists, brain files still `_pending` | **Onboard.** Follow `continuum-onboard`. |
| Brain filled, `STATE.md` stamped | **Resume.** Follow `continuum-resume`. |
| Brain filled, state stamped, user asked for something unrelated | Do the unrelated thing, but read `STATE.md` and `brain/05-pitfalls.md` first, and checkpoint after. |
| Drift reported: commits landed since the last checkpoint | **Reconcile before resuming.** Read the diff of those commits, correct `STATE.md` to match reality, then resume. |

The session-start hook injects the brief automatically when hooks are installed.
If you have the brief already, do not re-run `continuum brief`; read it.

---

## 3. The four files that carry everything

| File | Answers | Written by |
|---|---|---|
| `STATE.md` | Where are we right now | Rewritten at every checkpoint |
| `NEXT.md` | What are the first three actions next session | Rewritten before a session ends |
| `TASKS.md` | What is done, with what proof | `continuum task` |
| `DECISIONS.md` | What must not be relitigated | Appended when a real choice is made |
| `brain/*.md` | How this project works | Onboarding, then corrected on contact |
| `journal/*.md` | What happened, in order | `continuum log`, automatic |

`STATE.md` and `NEXT.md` are injected into every new session, so they stay
short. Everything long lives in `brain/` and is read on demand.

---

## 4. The discipline that makes it work

1. **Checkpoint after every completed unit of work**, not at the end of the
   session. A session that dies between checkpoints loses only that unit.
   `continuum checkpoint "<the next concrete action>"`.
2. **A task is DONE only with evidence**: the command run and the result
   observed. The CLI refuses an empty evidence field, and you should not work
   around it. See `continuum-verify`.
3. **Correct the brain on contact.** The moment a brain file contradicts the
   code, fix the file in the same turn. Stale memory is worse than none, because
   it is trusted.
4. **Write `NEXT.md` for a stranger.** The next session knows nothing you have
   not written down. "Continue the refactor" is not a resume contract; "open
   `src/sync.ts:142`, the loop still awaits inside a transaction, move it out"
   is.
5. **Append to `05-pitfalls.md` every time something bites you.** That file is
   the compound interest of this whole system.

---

## 5. Sub-skills

| Skill | Use when |
|---|---|
| `continuum-onboard` | First contact with a project, or state has rotted past trusting. |
| `continuum-resume` | State exists and work continues. |
| `continuum-checkpoint` | A unit of work just completed. |
| `continuum-handoff` | The session is ending, or context is about to compact. |
| `continuum-verify` | About to claim something works. |
