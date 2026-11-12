# Project State

<!-- continuum:stamp -->
- updated: 2026-11-12T13:19:08Z
- git: e9f6157 on finish-system-attachments-history (10 uncommitted files)
- checkpoints: 2
- next action: Brain filled, 4 tasks open; next session resumes from NEXT.md
<!-- /continuum:stamp -->

> Single source of truth for "where are we". Rewritten, not appended to.
> Keep it under ~60 lines: everything here is injected into every new session.

## Objective

The OMH Complete Customer Engagement Package: a lead-routing and
multi-channel assistant system for Online Marketing Help, with an internal
dashboard. Seven capabilities, six routes A to F. "Finished" for this phase
means everything that needs no external credential is built, tested and
live; Meta, Twilio, WhatsApp and inbound email come after.

## Current focus

Everything on our side is done and committed on branch
`finish-system-attachments-history`. What remains is deployment that needs
Rafiul: the widget JavaScript, and the Apps Script in OMH's Google account.

## State of play

- 804 assertions, 16 suites, `zsh widget/tests/run.sh`. Use zsh: the script
  refuses bash, because its zsh expansions failed silently there and it
  printed "every suite passed" having run nothing.
- Convex `cool-ferret-103` (still a DEV deployment) is up to date.
- n8n srv1836598: `01-chat` live with the new reply shaping; `07-router` and
  `11-reactivation` pushed and INACTIVE.
- Dashboard: 9 screens, driven in a browser at 1440 and 390, no overflow and
  no console errors. Attachments render on the conversation timeline.
- The widget's reply format fix IS live (it is server side). History, the
  single greeting and attachment sending are NOT: the hosted
  `ohm-assistant.js` is still the old build.

## Blockers

- **Widget not deployed.** `widget/web/embed/dist/ohm-assistant.js` has to be
  put on the Vercel copy and the WordPress copy. Rafiul's call.
- **Booking fix not live.** The Apps Script in `docs/google-calendar-booking.md`
  needs a new version deployed in OMH's own Google account. Until then the
  availability read returns `asked: false` and the form behaves as before.
- Meta, Twilio, WhatsApp and inbound email are credential-blocked, not
  work-blocked.
- Convex is a dev deployment. Moving it to production is a decision.
