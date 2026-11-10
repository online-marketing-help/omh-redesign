# Plan - Finish the system end to end, before any integration

Everything here needs no credential from anybody. Each task ends with the
thing live, not merely written: a workflow on `srv1836598`, a function on
`cool-ferret-103`, or a page on the deployed site.

## Tasks

- [x] **T0** - Deploy the campaign and bulk-outcome routes to Convex
  - Files: already written, never deployed
  - Verify: `curl -s -X POST $SITE/campaign/list -H "x-ohm-secret: $SECRET" -d '{}'` returns `{"rows":[]}` not `No matching routes found`
  - Done 2026-11-09.

- [x] **T1** - Move the brain out of Convex into `widget/gates/`
  - Files: `widget/gates/{clock,routes,templates}.ts`, `widget/convex/routing.ts`
  - Test first: existing `widget/tests/{clock,routes,engine}.test.ts` repointed; they must pass unchanged, which is what proves the move cost nothing
  - Verify: `widget/tests/run.sh` shows every suite passed, 351 assertions
  - Done 2026-11-10.

- [x] **T2** - Consent gate and `11-reactivation`
  - Files: `widget/gates/consent-gate.js`, `widget/n8n/build-workflows.py`
  - Test first: `widget/tests/reactivation.test.ts`, asserting a row with no evidence is refused, `"yes"` is not evidence, the same number written two ways is one person, and 250 rows split into pages of 100
  - Verify: `widget/tests/run.sh` shows 31 assertions; the bundle pulled back out of the generated JSON and run gives the same answers
  - Done 2026-11-10. **Not yet pushed to n8n.**

- [x] **T3** - Push `11-reactivation` to srv1836598, inactive
  - Files: `widget/n8n/push.py`
  - Verify: `curl -s -H "X-N8N-API-KEY: $K" $N8N/api/v1/workflows` lists "OHM Assistant - Reactivation" with `active: false`
  - Done 2026-11-10, id `30D9cUzONMqtz3c6`. Found on the way: `push.py` globbed
    `0*.json`, so **no workflow numbered ten or above was ever pushed**.
    11-reactivation had been generated and was sitting unsent. Glob fixed to
    `[0-9][0-9]-*.json` and a `--only` filter added, because six of these are
    live and a narrow push is cheaper than being right about whether a PUT
    without an `active` field preserves it. Before/after active states diffed:
    no change.

- [~] **T4** - Booking availability: stop two people taking one slot
  - **Pulled from this workstream on 2026-11-10, by decision.** The scope is
    the dashboard and the engagement package; the booking form lives on the
    public marketing site, which another developer is actively changing.
  - Kept: `widget/gates/availability.js` and its 15 assertions. The logic is
    done and proven, including the case that matters most, an unreachable
    calendar offering nothing rather than everything.
  - Reverted: `components/BookDemo.tsx`, `app/api/book-demo/route.ts`,
    `docs/google-calendar-booking.md`.
  - **The bug is still live.** Two visitors can book the same half hour on
    onlinemarketinghelp.co.uk today. Whoever picks this up needs the gate,
    a `GET /api/book-demo?date=` that uses it, and an Apps Script that checks
    for a clash inside a `LockService` lock, because two submissions in the
    same second both see the slot free and only a check in the same breath as
    the write refuses the second.

- [ ] **T5** - `no_show` status and the chase route
  - Files: `widget/convex/schema.ts`, `widget/gates/routes.ts`, `app/lead-dashboard/bookings/page.tsx`
  - Test first: `widget/tests/routes.test.ts` extended, asserting the no-show chase is on a route that cannot dial and carries an opt-out
  - Verify: `widget/tests/run.sh` passes; the Appointments screen marks one and the figure moves

- [ ] **T6** - Spend per channel, so cost per booked appointment can be shown
  - Files: `widget/convex/routing.ts` (settings read/write), `app/lead-dashboard/settings/page.tsx`, `app/lead-dashboard/channels/page.tsx`
  - Test first: `widget/tests/spend.test.ts`, asserting a channel with no spend reads "not set" rather than £0, and that cost per booking is absent rather than infinite when nothing booked
  - Verify: `npx tsc --noEmit` clean; the Channels screen shows a figure after typing one in, and "not set" before

- [ ] **T7** - Google Ads lead-form webhook into `07-router`
  - Files: `widget/n8n/build-workflows.py`
  - Test first: `widget/tests/google-lead-form.test.ts` against a gate that maps Google's payload shape to ours, asserting the key is checked and a wrong key is refused
  - Verify: workflow validates 0 errors; a sample Google payload posted at the webhook creates a lead with `sourceChannel: google_ads`

- [ ] **T8** - Images and voice notes on the widget
  - Files: `widget/web/embed/src/embed.js`, `widget/convex/schema.ts`, `widget/n8n/build-workflows.py` (01-chat)
  - Test first: `widget/tests/attachments.test.ts`, asserting a file over the limit is refused by size before upload and that a non-image type is refused
  - Verify: upload one of each through the real widget and read the row back out of Convex

- [ ] **T9** - Deploy everything and prove it live
  - Verify: `npm run build` passes, `widget/tests/run.sh` passes, Convex deployed and the new routes answer, the workflows listed on srv1836598, the dashboard driven in a browser at 1440 and 390

## Order and why

T3 first because it is finished work sitting on a laptop. T4 was next, as the
only item that was a live bug, and was pulled for being on the public site
rather than in this system.

T5 and T6 are independent of each other and of T4; either can be skipped
without blocking anything. T7 is independent. T8 is last because it is the
largest and the least load-bearing: everything else works without it.

T9 is not a task so much as the gate on the others.

## Definition of done

- [ ] `widget/tests/run.sh` passes, no new skips, assertion count stated
- [ ] `npx tsc --noEmit` clean in `website/`, and `tsc -p tsconfig.check.json` clean against the real Convex DataModel
- [ ] `npm run build` exits 0
- [ ] `npx eslint components app lib` shows no new errors
- [ ] Every dashboard screen rendered at 1440 and 390, no overflow, no console errors
- [ ] review.md filled in by a reviewer that did not write the code

## Out of scope

Meta messages and lead ads, WhatsApp, Twilio calls and SMS, inbound email
replies. All four wait on a credential or a verification from somebody else,
and the whole point of this workstream is that nothing else waits behind them.

Also out: moving Convex to a production deployment. That is a deliberate step
once this workstream closes, not part of it.
