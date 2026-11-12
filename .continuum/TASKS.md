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
| T-001 | TODO | Deploy the widget JS: dist/ohm-assistant.js to the Vercel copy and the WordPress copy. Until this is done visitors have no history, no attachments, and still see two greetings. Needs Rafiul's approval. | - |
| T-002 | TODO | Redeploy the Apps Script (new version, Manage deployments -> Edit -> New version, same URL) from docs/google-calendar-booking.md in OMH's Google account. The booking lock is not live until then. | - |
| T-003 | TODO | Build the Start a campaign screen. The Campaigns screen reports but nothing can create a campaign; the only path is POSTing a list to /webhook/ohm-reactivation, which is inactive. Paste or upload a CSV, show accepted vs refused WITH reasons before anything sends, then start. Needs no credential. | - |
| T-004 | TODO | Merge finish-system-attachments-history into main and push. Three commits, nothing pushed yet. | - |
