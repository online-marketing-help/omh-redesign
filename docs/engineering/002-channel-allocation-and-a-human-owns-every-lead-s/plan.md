# Plan - Channel allocation, and a human owns every lead status

## Was blocked, now lifted: Convex ran out of free plan and took the site with it

Found 2026-11-10 while verifying A2, cleared within the hour. Every route on
`cool-ferret-103` was answering:

> You have exceeded the free plan limits, so your deployments have been
> disabled.

That is not only the dashboard. `visitorHello` is what the widget on
onlinemarketinghelp.co.uk calls, and it returns the same error, so **the
chat and voice assistant on the live public site is not answering anybody.**

Nothing on the Convex side can be verified until this is lifted, including
A2, which is why A2 is written but unproven. The code deployed; the
deployment will not serve.

Convex free limits are per TEAM, not per project, and this account has
roughly a dozen deployments across other projects. Worth checking whether
they went down together.

**Re-checked and serving again**: `visitorHello` answers `ok:true`, so the
public widget is back, and A2 is now verified properly. Nobody changed the
plan or the code in between, so this was a limit window passing rather than
a fix. **It will happen again.** The only real answer is a paid plan or
knowing which limit is close, and that is a decision and a cost, not a task
in this workstream.

## Tasks

- [x] **A1** - The allocation maths, as a tested gate
  - Files: `widget/gates/allocation.js`
  - Test first: `widget/tests/allocation.test.ts`, asserting: a channel below
    the lead floor is returned as `tooEarly` and is never `best` or `worst`;
    a channel with leads and no bookings lands in `moneyPit`; one with few
    leads and a high rate lands in `starved`; a rate is never returned without
    its denominator; zero leads never divides; and with spend absent, `costPerBooking` is `null` rather than `0` or `Infinity`
  - Verify: `widget/tests/run.sh` shows the new assertions passing

- [x] **A2** - Spend per channel, stored and edited
  - Files: `widget/convex/routing.ts` (a `settings` row `spend`), `widget/convex/http.ts`, `lib/dashboard/routing.ts`, `app/lead-dashboard/settings/page.tsx`, `components/dashboard/SpendTable.tsx`
  - Test first: `widget/tests/spend.test.ts`, asserting a channel with no figure reads as absent rather than zero, a negative figure is refused, and a figure set for one channel does not appear against another
  - Verify: `tsc -p tsconfig.check.json` clean; set a figure on Settings and read it back through `/settings/spend`

- [x] **A3** - The section itself, under Overview
  - Files: `components/dashboard/Allocation.tsx`, `app/lead-dashboard/page.tsx`
  - Test first: covered by A1 for the maths. The visual proof is the browser, per the UI gate
  - Verify: rendered at 1440 and 390, both themes, no overflow, no console errors; `forge evidence add browser`

- [x] **A4** - Demo data that makes the four quadrants visible
  - Files: `lib/dashboard/demo.ts`
  - Verify: the section at `?demo=1` shows at least one channel in each of money pit, starved and working, and at least one "too early to say"

- [x] **A5** - A record of every outcome change
  - Files: `widget/convex/routing.ts` (`setOutcome`, `setOutcomeMany`), `app/lead-dashboard/conversations/[session]/page.tsx`
  - Test first: `widget/tests/engine.test.ts` extended, asserting a change writes one `touches` row carrying the old and new value and who made it, that setting the same value twice writes one row not two, and that a bulk change writes one row per lead
  - Verify: `widget/tests/run.sh`; the change appears on the lead timeline

- [x] **A6** - Set the outcome from the conversation, after reading it
  - His words: "from the conversation section, after complete the
    conversation, a human should be able to change the lead status." That is
    the moment somebody actually knows the answer, which is why it belongs
    there and not only on a list.
  - The control exists on that page already. The gap, found by reading
    `conversations/[session]/page.tsx:178`: the whole card is behind
    `!demo && thread`, so it is **invisible in the example data** and
    invisible for any conversation with no handover thread. A client being
    shown the system never sees it.
  - Files: `app/lead-dashboard/conversations/[session]/page.tsx`
  - Verify: browser at `?demo=1` shows the outcome control on a conversation
    and the picker opens; on live data it saves and the value survives a
    reload

- [x] **A7** - Update the specs
  - Files: `OHM/DASHBOARD-SPEC.md`, `OHM/IMPLEMENTATION-PLAN.md`, `app/lead-dashboard/README.md`
  - Verify: the new section and the spend input are described, and the README's "backend missing" list no longer claims spend is missing

## Order and why

A1 first: the maths is the thing worth being sure of, and everything else
displays it. A2 next because A1's output has a hole in it until spend exists.
A3 draws it, A4 makes it visible in a demo.

A5 and A6 are independent of all of the above and of each other.

A7 last, so the docs describe what was built rather than what was intended.

## Definition of done

- [ ] `widget/tests/run.sh` passes, assertion count stated, no new skips
- [ ] `npx tsc --noEmit` clean, and `tsc -p tsconfig.check.json` clean
- [ ] `npx eslint components app lib widget/gates` shows no NEW errors
      (`ReelPlayer.tsx` and `retell.ts` were already failing before this
      workstream and are not mine to fix)
- [ ] The section driven in a browser at 1440 and 390, recorded as evidence
- [ ] No figure on the section is a rate without its denominator
- [ ] review.md filled in

## Out of scope

- Pulling spend automatically from the Google Ads or Meta APIs. A typed figure
  is crude and correct; the APIs are a project of their own.
- A second editable status field. See ADR-009.
- Rebuilding the Channels report. The section links to it.
