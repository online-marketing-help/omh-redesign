---
name: continuum-onboard
description: "Build durable project memory from a codebase on first contact. Explores the repo in parallel, then writes the brain files: overview, architecture, conventions, environment, glossary, pitfalls, plus initial state and task ledger. Use when a project has no .continuum state, when the brain files are still pending, or when existing state has rotted far enough that rebuilding beats repairing. Triggers on: continuum onboard, onboard this project, build project memory, index this codebase, set up project state."
user_invocable: true
---

# continuum-onboard

You are writing the document that every future session of this project will
trust without checking. Its value is not in covering everything; it is in being
correct about the things that cost time to rediscover and expensive to get wrong.

Budget: one focused pass. Do not read every file. Read the files that decide how
the rest behaves.

---

## 1. Scaffold

```sh
continuum init            # skip if .continuum/ already exists
continuum where
```

If the user gave the project a name different from the directory, set it:
`continuum rename "Real Project Name"`. The id stays stable.

---

## 2. Explore in parallel, read in order of leverage

Dispatch exploration concurrently rather than walking the tree serially. If a
subagent tool is available, fan out: one agent on build and dependency
configuration, one on entry points and routing, one on data model and
migrations, one on tests and CI. Otherwise do these four sweeps yourself.

Read in this order, because each layer explains the next:

1. **Declared truth** - `README`, `CLAUDE.md`, `package.json` / `pyproject.toml`
   / `go.mod`, `Makefile`, `docker-compose.yml`, CI workflow files, `.env.example`.
2. **Shape** - top two directory levels, then the directories that hold the most
   code.
3. **Entry points** - routes, CLI commands, queue consumers, cron, webhooks,
   `main`.
4. **Data** - schema, migrations, model definitions.
5. **Proof** - how tests are run, what a representative test asserts, whether
   they currently pass.
6. **History** - `git log --oneline -40` and `git log --since='3 months ago'
   --name-only | sort | uniq -c | sort -rn | head -20`. The files changed most
   often are the files that matter most, and the commit messages name the work
   in progress.

Verify claims instead of inheriting them. A README that says `npm start` and a
`package.json` with no `start` script means the README is wrong; record what is
true and note the contradiction.

---

## 3. Write the brain

Fill every file under `.continuum/brain/`, replacing each `_pending` marker. The
templates carry the questions; answer them about this repo specifically.

Rules for writing these files:

- **Specific over complete.** "Auth is a Clerk session cookie checked in
  `middleware.ts:18`; API routes trust `req.auth` and never re-verify" earns its
  place. "Uses modern authentication" does not.
- **Cite the file.** Any claim a later session might doubt gets a path, and a
  line number where it helps.
- **Record the repo's conventions, not the industry's.** If this project returns
  errors instead of throwing, that is the rule here, and a later session that
  "fixes" it is doing damage. Write it as the rule.
- **Never write a secret value.** Record the variable name and where its value
  lives. These files are often committed.
- **Seams are the point.** A half-finished migration, two coexisting patterns, a
  deprecated module still in use: these are what a fresh session breaks. They go
  in `01-architecture.md` under Seams.
- **Seed the pitfalls file** with anything the code defends against, anything the
  commit history reverted, and anything that surprised you during this pass.

---

## 4. Write the starting state

`STATE.md`: objective, current focus, state of play with verifiable bullets,
blockers (write "none" if none), decisions in force, and the "do not" list.
Keep the whole file under about 60 lines, because it is injected into every
session.

`TASKS.md`: seed it with the work that is visibly outstanding. Use the CLI so
the journal stays in step:

```sh
continuum task add "Replace the stubbed webhook retry with real backoff"
```

Only add tasks that the code or the user supports. Inventing a roadmap here
pollutes the ledger.

`DECISIONS.md`: record the choices already made and visible in the code, with
the reason you can actually evidence. Where the reason is not recoverable, say
so: "reason not recorded, do not assume it was arbitrary".

`NEXT.md`: the three first actions for the next session, the command that
verifies the current state, and what is explicitly out of scope.

---

## 5. Ask only what the code cannot answer

Up to three questions, asked once, at the end, in a single message. Good
candidates: which deploy target is live, who the user is, what the current
business deadline is, which of two coexisting patterns is the intended future.
Never ask what a `grep` would answer.

---

## 6. Close the pass

```sh
continuum checkpoint "<the first real action of the next session>"
continuum doctor
```

Then tell the user, in a few lines: what this project is as you now understand
it, the three things you recorded that they might disagree with, and what is
next. Their correction at this moment is worth more than anything else you will
read today, so make disagreement easy.
