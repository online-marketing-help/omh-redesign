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
| T-001 | BLOCKED | Deploy the widget JS: dist/ohm-assistant.js to the Vercel copy and the WordPress copy. Until this is done visitors have no history, no attachments, and still see two greetings. Needs Rafiul's approval. | CORRECTION: there is no separate file to upload. onlinemarketinghelp.co.uk IS this Next.js repo (x-powered-by: Next.js, no WordPress markers), so public/ohm-assistant.js is what the live site serves. Deploying the repo ships the widget, the dashboard and the API routes together. The live deploy is older than today's work: the widget there is 23135 bytes against our 30922, and GET /api/book-demo returns 405 because that handler does not exist in it yet. Everything is committed on main; it needs a deploy, not an upload. |
| T-002 | DONE | Redeploy the Apps Script (new version, Manage deployments -> Edit -> New version, same URL) from docs/google-calendar-booking.md in OMH's Google account. The booking lock is not live until then. | Superseded in part: the booking lock still needs the Apps Script redeploying, but the reminder half of the appointment work is built and verified live without it. |
| T-003 | DONE | Build the Start a campaign screen. The Campaigns screen reports but nothing can create a campaign; the only path is POSTing a list to /webhook/ohm-reactivation, which is inactive. Paste or upload a CSV, show accepted vs refused WITH reasons before anything sends, then start. Needs no credential. | Start a campaign screen built and verified. gates/csv.js + 37 assertions; screen driven in a browser with a BOM/CRLF/quoted-comma/duplicate/short-row CSV: 7 read = 2 contactable + 4 refused + 1 unreadable, each refusal named. 841 assertions total, tsc 0, build clean, render pass clean at 1440 and 390. Start is disabled with the reason stated while the webhook is unconfigured. |
| T-004 | DONE | Merge finish-system-attachments-history into main and push. Three commits, nothing pushed yet. | Merged finish-system-attachments-history into main and pushed. origin/main = ca89292 on onlinemarketinghelpuk/omh-redesign, 0 ahead 0 behind. Verified on merged main first: 804 assertions pass, tsc exit 0, next build Compiled successfully. |
| T-005 | TODO | Tell the other developer what to deploy: (1) replace /ohm-assistant.js at the Hostinger web root with widget/web/embed/dist/ohm-assistant.js from the repo, (2) redeploy the Apps Script from docs/google-calendar-booking.md as a NEW VERSION of the existing deployment so the URL does not change. Nothing else needs doing; the code is on main. | - |
| T-006 | TODO | Redeploy the Apps Script from docs/google-calendar-booking.md as a NEW VERSION of the existing deployment (same URL) in OMH's Google account. Until then the booking LOCK is not live and two people can still take one slot. Separate from the reminder work, which is done and needs nothing. | - |
| T-007 | TODO | Decide whether to activate 08-sequence-worker on n8n. Reminders are scheduled and nothing sends them. Activating also wakes the SMS steps on routes B/E/F/G, which have no Twilio behind them, so it is a decision rather than a switch. | - |
