# OMH Site Assistant

Chat and voice widget for `onlinemarketinghelp.co.uk`. It answers anything
about the agency from the live website content, and books the free 30 minute
consultation in the conversation.

## About this copy

This is the widget's source, kept here so it sits beside the dashboard that
reads it. Two things are deliberately **not** in this folder:

- `n8n/` (the six workflow exports) and `retell/`. Every one of the workflow
  files has the Convex shared secret written into it in plain text, 22 times
  across the six, so they cannot go in a repository. They stay in the working
  copy, and n8n itself holds the live versions.
- `.env.local`, which holds the Convex deploy key and the API keys.

### Deploying it

**This folder is the only source. Edit `web/embed/src/embed.js` here.**

There was a second copy of this project outside the repo, and an evening went
into a bug that was only ever the two drifting apart: sixteen lines of fixes
sat in the other copy while `npm run widget:build` kept building this one, so
every rebuild looked successful and changed nothing.

That can no longer happen. The working copy at `OHM/widget/` now **symlinks**
into this folder rather than holding its own bytes:

```
OHM/widget/convex           -> ../website/widget/convex
OHM/widget/web/embed/src    -> ../../../website/widget/web/embed/src
OHM/widget/web/embed/dist   deleted; it held a stale bundle
```

So editing either path edits one file. `OHM/widget/` still keeps what cannot
live in a repository: `n8n/`, `retell/`, `kb/` and `.env.local`.

When the symlinks were made, `convex/` and `web/embed/src/embed.js` were already
byte-identical in both copies, but the two `dist/ohm-assistant.js` bundles were
**not**: the working copy's bundle predated the `withPerson` handover fix, so
anything built from it would have shipped the handover bug again. That bundle is
the one that was deleted. If you find a third copy on a machine, it is stale.

`npm run widget:build` compiles `web/embed/src/embed.js` and copies the result
to `public/ohm-assistant.js`, which is what the site actually serves. It runs
automatically before `npm run build`, so a deploy cannot ship a stale bundle.

`convex/` is the assistant's backend, already deployed to `cool-ferret-103`.
Redeploy with `npx convex deploy` and that deployment's key.

Convex for data, n8n for orchestration, Retell for voice, a React component on
the site. Their site is Next.js and Tailwind v4, so the widget drops in as a
component rather than needing a plugin.

```
visitor ──chat──→ n8n /ohm-chat ──→ agent + 6 tools ──→ Convex
        └─voice──→ Retell agent ──→ n8n /ohm-retell-tool ──→ Convex
                                     (one token check, one door)
```

## Status

| Piece | State |
|---|---|
| Convex deployment `cool-ferret-103` | Live. Schema + 15 HTTP routes deployed |
| Knowledge base | Live. 540 chunks, 38 packages, from 36 crawled pages |
| n8n workflows (4) | Live and active |
| Retell agent | Created. `agent_fd985b032a062ed77300663c6f`, British voice |
| Web widget | Built, chat + voice tabs, previewed at `web/demo` |
| Google Calendar | **Not done.** Waiting on credentials, see below |

## Quick start

```bash
npm install
python3 kb/build.py          # rebuild the knowledge base from kb/raw.json
node scripts/seed-kb.mjs     # push it into Convex
python3 n8n/push.py          # create or update the workflows (stays inactive)
node scripts/smoke-test.mjs  # end to end, needs the workflows active
```

## What is where

| Path | What |
|---|---|
| `kb/build.py` | Turns the crawled site into the answer bank. No LLM in it, on purpose |
| `kb/raw.json` | 36 crawled pages: 14 services, 5 solutions, pricing, FAQ, 6 case studies |
| `convex/schema.ts` | kb, packages, sessions, messages, profiles, leads, bookings, escalations |
| `convex/http.ts` | The only way in. Every route checks `x-ohm-secret` |
| `n8n/build-workflows.py` | Generates the four workflows. Edit here, not in the n8n UI |
| `retell/prompt-core.md` | The agent's instructions. Shared by chat and voice |
| `retell/prompt-voice.md` | What changes when it is heard rather than read |
| `web/OhmAssistant.tsx` | The widget. Reads their own Tailwind tokens |
| `scripts/smoke-test.mjs` | Checks the answers are grounded, not just that it replied |

## The four workflows

| Workflow | Webhook | Does |
|---|---|---|
| OHM Assistant - Chat | `/webhook/ohm-chat` | Agent with 6 tools, session memory, profile carry-over, logs both sides |
| OHM Assistant - Voice | `/webhook/ohm-voice-token`, `/webhook/ohm-retell-tool` | Mints the Retell web-call token; routes the agent's tool calls to Convex behind a token check |
| OHM Assistant - Retell Events | `/webhook/ohm-retell-events` | Writes the call transcript and summary into the same conversation |
| OHM Assistant - Calendar Sync | `/webhook/ohm-calendar-sync-now` + every 10 min | Picks up bookings and writes them to Google Calendar. **The calendar node is a labelled placeholder until credentials arrive** |

## Two decisions worth knowing about

**Prices are monthly, and the assistant says so.** The published figures on
the pricing page are monthly amounts against a 6 to 36 month contract with a
50% deposit, not one-off project totals. Every price chunk in the knowledge
base carries that caveat with it, and the prompt forbids presenting a package
price as a project cost. Getting this wrong would be the single most damaging
thing the widget could do.

**It escalates rather than guesses.** Anything not in the knowledge base goes
to `escalate_to_team` and the visitor is told a person will pick it up. There
is no fallback that lets the model answer from memory. A wrong price costs OMH
a client; "I'll get the right answer for you" costs nothing.

## Blocked

**Both LLM keys in the central store are out of credit.** OpenAI answers
`credit_balance_exhausted` (429) and Anthropic answers `credit balance is too
low` (400). The agent node therefore fails on every turn and the workflow takes
its error branch, which answers with the phone number and email instead of an
empty box. Top up either key and the assistant works with no further changes.

Everything either side of the model is verified working: the knowledge base,
all six tools over the live webhook, booking (reference `OMH-3TNG9F` was created
end to end), escalation, the token check, and the Retell agent.

## Still to do

1. **Google Calendar.** Replace the placeholder node in
   `OHM Assistant - Calendar Sync` with a real Google Calendar node once the
   credentials are in n8n. Bookings are already captured in Convex, so nothing
   is lost in the meantime; they simply sit at status `requested`.
3. **Wire the widget in.** Add `OhmAssistant.tsx` to their Next.js app and set
   `NEXT_PUBLIC_OHM_CHAT_URL` and `NEXT_PUBLIC_OHM_VOICE_TOKEN_URL`.
4. **Lock the webhook origin.** The chat webhook currently allows any origin so
   it can be tested. Before launch, restrict it to onlinemarketinghelp.co.uk.
5. **Move Convex to production.** `cool-ferret-103` is a dev deployment.
6. **Call recording notice.** The widget footer says calls are recorded and the
   agent says it is automated in its first sentence. The privacy policy should
   be updated to cover the assistant before it goes live.

## Note on the existing voice agents page

`onlinemarketinghelp.co.uk/ai-voice-agents` already exists on the live site and
carries `[DEMO NUMBER] [PLACEHOLDER]` plus three statistics (98% of calls
answered, 2 second pickup, 340 bookings a month) with no source shown. That
page and the 30 page build in `../web` overlap and need reconciling before
either goes further.
