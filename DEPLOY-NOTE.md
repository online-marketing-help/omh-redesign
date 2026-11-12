# What to deploy, and what to expect

Everything below is on `main` at `c765d1c`. Nothing else needs uploading
anywhere: `onlinemarketinghelp.co.uk` is this Next.js app, so one deploy of
this repo ships the website, the dashboard, the API routes and the chat
widget together.

## The deploy

Normal build. Nothing new is required at build time.

```
npm ci
npm run build
```

The widget is already built and committed at `public/ohm-assistant.js`
(30,922 bytes). It is served at `/ohm-assistant.js`, which is what the page
loads. If you want to rebuild it yourself: `node widget/web/embed/build.mjs`,
then copy `widget/web/embed/dist/ohm-assistant.js` over `public/ohm-assistant.js`.

## One new environment variable, and it is optional

```
OHM_REACTIVATION_WEBHOOK=<the n8n reactivation webhook URL>
```

Only the "Start a campaign" screen uses it. Without it that screen still
works and still shows its preview; the start button is disabled and says
why. Nothing else is affected.

## How to tell the deploy worked

Three things that are false on the current live build and true after:

| Check | Now | After |
|---|---|---|
| `curl -s -o /dev/null -w "%{size_download}" https://onlinemarketinghelp.co.uk/ohm-assistant.js` | 23135 | 30922 |
| `curl -s -o /dev/null -w "%{http_code}" "https://onlinemarketinghelp.co.uk/api/book-demo?date=2026-11-20"` | 405 | 200 |
| `/lead-dashboard/campaigns/new` | 404 | loads |

## What changes for a visitor

- The assistant answers in two to four sentences instead of a page of
  bulleted packages, and no longer prints asterisks.
- One greeting on opening the panel instead of two.
- A returning visitor sees their previous conversation.
- They can send a photo or a voice note, and the assistant reads or hears it
  and answers.
- The booking form reads the diary and strikes out times that are taken.

## What changes for OMH

- A new screen at `/lead-dashboard/campaigns/new` that can start a
  reactivation campaign, after showing exactly who would and would not be
  contacted.
- A lead captured from a form can now have its outcome recorded. Before, any
  lead with no chat transcript showed "Nothing was recorded" and had no
  outcome control at all.

## Two things that will NOT work after this deploy, and are not bugs

1. **Appointment reminders are scheduled but nothing sends them.**
   `08-sequence-worker` is inactive on n8n. Activating it also wakes the SMS
   steps on other routes, which have no Twilio number behind them, so it is
   a decision rather than a switch.

2. **Two people can still book the same slot.** The form now reads
   availability, but the guarantee is a lock inside the Google Apps Script,
   and that script has not been redeployed yet. The new version is in
   `docs/google-calendar-booking.md`; it must go out as a NEW VERSION of the
   existing deployment so the URL does not change.

Until the script is redeployed the booking form behaves exactly as it does
today: the availability read returns "could not ask" and every time is
offered.

## If something looks wrong

The chat, the dashboard and the widget all read from Convex
(`cool-ferret-103`) and n8n (`srv1836598`), both of which are already
deployed and unchanged by this. If the site builds but the assistant is
silent, it is one of those two, not the deploy.
