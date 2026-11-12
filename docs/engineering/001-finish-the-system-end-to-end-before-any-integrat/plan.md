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

- [x] **T4** - Booking availability: stop two people taking one slot
  - Pulled on 2026-11-10 by decision, then put back on 2026-11-11 when the
    instruction was "fix and complete all of them".
  - `widget/gates/availability.js` and its 15 assertions were already done.
    What was missing was everything that used them.
  - Done now: `GET /api/book-demo?date=` asks the calendar and runs the gate;
    `components/BookDemo.tsx` strikes out the taken times and re-reads the
    diary when a slot is lost; the Apps Script in
    `docs/google-calendar-booking.md` gained a `freebusy` action, a
    `LockService` lock around the write with a clash check inside it, and a
    guest invite.
  - The lock is the part that actually fixes it. Two submissions in the same
    second both see the slot free on the page, and only a check in the same
    breath as the write refuses the second. Everything before it is courtesy.
  - A 409 is now its own answer, not a 502: "somebody took it, pick another"
    is something the visitor can act on, "try again later" is not.
  - **Not live until the client redeploys the Apps Script.** It is a new
    version of their own script in their own Google account. Until then the
    site behaves exactly as before: `freebusy` returns nothing the old script
    understands, the route reports `asked: false`, and every time is offered.

- [x] **T5** - `no_show` status and the chase route
  - Files: `widget/convex/schema.ts`, `widget/gates/routes.ts`, `app/lead-dashboard/bookings/page.tsx`
  - Test first: `widget/tests/routes.test.ts` extended, asserting the no-show chase is on a route that cannot dial and carries an opt-out
  - Verify: `widget/tests/run.sh` passes; the Appointments screen marks one and the figure moves

- [x] **T6** - Spend per channel, so cost per booked appointment can be shown
  - Files: `widget/convex/routing.ts` (settings read/write), `app/lead-dashboard/settings/page.tsx`, `app/lead-dashboard/channels/page.tsx`
  - Test first: `widget/tests/spend.test.ts`, asserting a channel with no spend reads "not set" rather than £0, and that cost per booking is absent rather than infinite when nothing booked
  - Verify: `npx tsc --noEmit` clean; the Channels screen shows a figure after typing one in, and "not set" before

- [x] **T7** - Google Ads lead-form webhook into `07-router`
  - Files: `widget/n8n/build-workflows.py`
  - Test first: `widget/tests/google-lead-form.test.ts` against a gate that maps Google's payload shape to ours, asserting the key is checked and a wrong key is refused
  - Verify: workflow validates 0 errors; a sample Google payload posted at the webhook creates a lead with `sourceChannel: google_ads`

- [x] **T8** - Images and voice notes, from the widget AND from Meta
  - Widened on 2026-11-10: "fb wp insta theke j voice image asbe all amader
    capture korte hobe". That is a different shape, not more of the same.
    The widget hands over bytes; Facebook, Instagram and WhatsApp hand over a
    URL and expect our server to fetch it, which is server-side request
    forgery unless the host is checked first.
  - Files: `widget/gates/attachments.js` (+ `.d.ts`), `widget/convex/attachments.ts`,
    `widget/convex/http.ts`, `widget/convex/handover.ts`, `widget/web/embed/src/embed.js`,
    `app/lead-dashboard/conversations/[session]/page.tsx`, `lib/dashboard/demo.ts`
  - 64 assertions. The ones that matter: the type is read from the bytes and
    not from what the browser said, SVG is refused, a Meta URL is accepted
    only on a Meta host (`fbcdn.net.evil.example`, `169.254.169.254`,
    `10.0.0.5` and `file://` all refused), and the stored file is judged
    AGAIN on its real bytes and real length after upload, because the
    browser-side check is advice and the upload URL is an ordinary endpoint.
  - A refused file is deleted from storage rather than left there.
  - Verified live: a real PNG uploaded through the route, logged, and read
    back out of the transcript; both bubbles rendered in a browser on the
    conversation page with the image's `naturalWidth > 0`.
  - **The Meta half is written but not reachable**: `checkRemote` has its
    assertions and `10-meta` cannot exist until the Meta app does. That is
    integration-blocked, not done.

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
