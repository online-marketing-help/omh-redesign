# Research - Finish the system end to end, before any integration

Every fact below was checked against the running system or the code on
2026-11-09/10, not recalled. Where something is "missing", it was grepped for
and not found, and the grep is named.

## The actual request

"We have to complete this whole system from our end, I am talking about the
live system. After complete the system we will integrate the Meta ads, Meta,
Twilio, email, whatever we need."

Underneath it: **stop having a half-finished thing.** Everything that does not
need somebody else's credential should be built, deployed and running, so that
when the Twilio number and the Meta app arrive the only work left is
connecting them. The split matters because the integrations have waiting
periods measured in weeks and nothing should be queued behind them.

A second constraint arrived with it, as a standing rule for this project:
**Convex is the database, n8n is the brain.** Automation and decisions belong
in workflows he can open and read. Code is the fallback, and anything that
would be difficult or risky in n8n stays in code with the reason said out loud.

## What already exists here

| Exists | Where | Reuse, extend or replace |
|---|---|---|
| Routing engine: six routes, lease, consent gate, quiet hours | `widget/convex/routing.ts`, `widget/gates/{routes,templates,clock}.ts` | **Extend.** Deployed and covered by 351 assertions. The brain moves to n8n; the atomic parts stay. |
| Campaigns: table, enrol, report | `widget/convex/campaigns.ts`, routes `/campaign/*` | Reuse. Deployed 2026-11-09, verified answering. |
| 9 n8n workflows | `widget/n8n/*.json`, built by `build-workflows.py` | Extend. 6 active, 3 inactive awaiting Twilio. |
| `11-reactivation` | generated, **not pushed** | Push. 10 nodes, validated 0 errors. |
| Consent gate | `widget/gates/consent-gate.js` + 31 assertions | Reuse. Bundled into the Code node by the builder. |
| Dashboard, 11 screens | `app/lead-dashboard/` | Done. Live. |
| Booking slots | `lib/book-demo.ts`, `app/api/book-demo/route.ts` | **Replace the slot logic.** See failure modes. |
| Google Apps Script calendar write | `docs/google-calendar-booking.md` | Reuse rather than introduce a Cloud project. |

## Constraints that are not negotiable

- **n8n first.** Backend behaviour goes in a workflow unless n8n genuinely
  cannot do it, and then the reason is stated. Standing rule, 2026-11-09.
- **Anything whose correctness needs a transaction stays in Convex.** n8n has
  none. `claimDue` leases due rows and returns them atomically; split into
  "n8n reads, then n8n writes", two overlapping cron runs both send. The cron
  fires every minute and a batch of 25 sends takes longer, so overlap is the
  normal case.
- **The repo is public.** Every generated workflow bakes `OHM_WIDGET_SECRET`;
  two carry `RETELL_API_KEY`. Builders are tracked, output is not. Checked:
  11 credentials scanned against staged files, clean.
- **Convex stays on dev `cool-ferret-103`** until the system is complete.
  Moving to production is a deliberate step, not a side effect.
- **Nothing can send for real without the Twilio number.** The three inactive
  workflows stay inactive; activating them without a credential produces
  failures, not sends.

## Prior art and sources

- Meta Messenger Platform overview: permissions `pages_show_list`,
  `pages_manage_metadata`, `pages_messaging`, `pages_read_engagement`,
  `business_management`; Instagram adds `instagram_basic`,
  `instagram_manage_messages`. States App Review is not required for an app
  that only messages its own Page.
  https://developers.facebook.com/documentation/business-messaging/messenger-platform/overview
- Meta Access Levels: "Permissions with Standard Access can only be requested
  from app users who have a role on the requesting app"; Advanced Access needs
  App Review and Business Verification.
  https://developers.facebook.com/docs/graph-api/overview/access-levels/
  **These two are in tension** on whether the public can message an own Page
  before review. Not resolvable by reading; resolve by building and testing.
- WhatsApp billing moved to per message on 1 July 2025; a click-to-WhatsApp ad
  opens a seven day window, not twenty-four hours.

## Open questions

| Question | Blocking? |
|---|---|
| Does `/campaign/enrol` behave under a real 250 row import? | No. Covered by the page-splitting assertions; confirm on first real run. |
| Which Page the assistant answers on when OHM go live | No. He is testing on his own Page first. |
| Whether spend per channel should be monthly or per campaign | No. Monthly, typed in, until an ads API exists. |

## What would make this fail

Ranked by what it would cost.

1. **Someone gets the same text twice.** The worst outcome in the system. It
   is why the lease is atomic and why moving `claimDue` to n8n is refused.
   Any change that touches claiming, enrolling or sending is reviewed against
   this first.
2. **Someone is contacted who never agreed.** Route F is the only marketing
   route and the ICO fines for exactly this. The gate refuses a row without
   evidence and returns the refusals rather than dropping them.
3. **Two people booked into one slot.** Live today:
   `lib/book-demo.ts` offers six fixed times and nothing reads what is already
   taken. Grepped `app/api/book-demo/route.ts` for `already booked|taken|
   conflict|isFree|existing`: no hits. A real customer can be double booked on
   the live site right now.
4. **A figure on the dashboard that is wrong rather than absent.** Every
   screen states what it left out; a number with no caveat gets quoted.
5. **Work that exists only on this laptop.** The n8n builder was untracked
   until 2026-11-10. Fixed, and worth not repeating.
