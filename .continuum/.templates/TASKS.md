# Tasks

Statuses: `TODO` · `DOING` · `DONE` · `BLOCKED` · `DROPPED`.
A task reaches `DONE` only with evidence: the command that was run and the
result that was observed. `continuum task done <ID>` refuses an empty evidence
field on purpose.

Edit rows through the CLI so the journal stays in step:

```sh
continuum task add "Wire the webhook retry path"      # -> T-007
continuum task start T-007
continuum task done  T-007 "pnpm test webhook: 12 passed, retry asserted"
```

| ID | Status | Task | Evidence |
|---|---|---|---|
