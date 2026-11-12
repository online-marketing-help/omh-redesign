# Plan - complete the system, feature by feature

Rafiul's sequence, and it is the right one: **complete one feature, test it,
fix what the test finds, verify it, push.** Not five half-features and one
big test at the end. Each task below is done when its own evidence exists,
and `main` is pushed after each one rather than once at the end, because the
other developer deploys from it.

## Tasks

- [x] **F1** - Start a campaign: the screen that makes the Campaigns screen mean something
  - A page that takes a pasted or uploaded CSV, runs the consent gate IN THE
    BROWSER PREVIEW before anything is sent, and shows two lists: who would
    be contacted, and who would not with the reason against each row.
  - Only then a button that creates the campaign and enrols in pages of 100.
  - Test first: the gate already has 31 assertions; what is NOT asserted is
    the parsing. A CSV with a BOM, quoted commas, CRLF, a missing header, a
    header in a different order, 5000 rows. Those are the shapes a real
    export has and each one has to fail loudly rather than silently drop
    somebody.
  - **The preview is the feature.** A screen that sends first and reports
    after is the one thing route F must never be.
  - **Done 2026-11-12.** `gates/csv.js` + 37 assertions covering the shapes a
    real export has: a BOM, CRLF, a comma inside quotes, a doubled quote,
    headers in any order and under any spelling, a short row, no header, no
    consent columns, 5000 rows. Every line is either a row or a reported
    problem with its line number; nothing is silently dropped.
  - Screen at `/lead-dashboard/campaigns/new`, driven in a browser with a
    deliberately messy CSV: 7 rows read, 2 contactable, 4 left out with a
    human reason against each name, 1 unreadable, and the four reconcile on
    screen.
  - The Start button is DISABLED, with the reason said out loud, while no
    reactivation webhook is configured and the workflow is inactive. A
    button that cannot work should not look ready.
  - **Not evidenced:** a campaign created end to end. That needs
    `11-reactivation` active on n8n and `OHM_REACTIVATION_WEBHOOK` set,
    which is a deploy decision, not code.

- [x] **F2** - Set the outcome from the conversation page
  - `OutcomePicker` already exists and is used on the Leads table. Put it on
    the lead detail panel of the conversation page, which is where somebody
    is standing when they have just read the transcript.
  - Test first: the write path is `routing.setOutcome`, which is asserted.
    What is not: that the conversation page passes the lead id it is
    displaying rather than the first lead on the session.
  - **Done 2026-11-12, and it was not what the plan assumed.** The picker was
    already on the conversation page, which IS the lead detail page; there is
    no separate one, so that README line had been describing a page that does
    not exist.
  - The real bug was next to it. The page bailed to "Nothing was recorded for
    this conversation" whenever there were no messages and no calls, and that
    branch hid the lead panel as well. Every lead without a chat - a website
    form, a Google Ads lead form, anything the router captured - had no way
    to have its outcome set, and every channel figure built on that field was
    quietly missing them. The empty state now means no transcript AND no call
    AND no lead AND no booking.
  - Evidence: a lead with no messages, driven in a browser - picker found,
    "Won" chosen, £2400 entered - then read back out of Convex:
    `outcome: won, valueGbp: 2400`. All screens clean at 1440 and 390.

- [ ] **F3** - The assistant reads the photo
  - The widget already uploads and the dashboard already shows it. What is
    missing is the turn: when a message carries an image, the chat workflow
    has to pass it to the model, which already takes images.
  - Test first: a gate that decides whether a turn carries an image and
    builds the content array, asserted against a message with no attachment,
    with an image, with an audio note, and with a storage id whose file has
    gone.
  - Then the `01-chat` Code node, driven through `new Function` BEFORE it is
    pushed. That rule is not optional; ignoring it took the chat down once.
  - Evidence: send a real photo through the live widget and read the
    assistant's reply; it has to say something only the picture could tell
    it.
  - **Cost:** every image turn is a vision call. Measure one and write the
    figure down before this is left switched on.

- [ ] **F4** - Decide what happens to a voice note
  - NOT a build task yet. A one-page answer to: transcribe with what, at what
    cost per minute, and is it worth it. Deepgram is in the secret store;
    OpenRouter may not take audio.
  - Until that is answered, a voice note is stored and shown and the
    assistant says it cannot listen to it yet, which is honest and is already
    what happens.
  - Evidence: the decision written into DECISIONS.md, with the number.

- [ ] **F5** - Remind before, and chase a no-show, by email
  - Route G exists and nothing enrols onto it. A confirmed booking should be
    enrolled so a reminder goes out before, and a no-show is chased after.
  - **The SMS steps cannot run without Twilio, and that is fine**: the worker
    already switches on the step's channel, so the email steps send and the
    SMS steps will start working the day a number exists. What must not
    happen is a step silently failing and the sequence stopping.
  - Test first: a booking enrolled onto G fires the reminder at the right
    London time, respects quiet hours, and STOPS if the booking is cancelled
    or moved. That last one is the whole risk: reminding somebody about an
    appointment they cancelled is worse than not reminding them.
  - Evidence: assertions for the timing and the cancel case; one real email
    reminder sent to an address Rafiul controls, after his approval.

## Order, and why

F1 first: it is the only one a client would notice is missing, and it needs
nothing from anyone. F2 is half an hour and removes a line from the README.
F3 is the one that makes the attachment work from last session actually
worth something. F4 is a decision, not code, and blocks nothing. F5 last,
because it is the only one whose value is partly gated on Twilio.

## Definition of done, per feature

Each task is done when, for that feature alone:

- [ ] its own assertions pass, and the count is stated
- [ ] `zsh widget/tests/run.sh` still passes whole, with no drop in the total
- [ ] `npx tsc --noEmit` and `npm run build` clean
- [ ] anything with a screen is driven in a browser and LOOKED at
- [ ] anything taking outside input has its authorisation asserted, not
      described - 001's review found two live holes in exactly that gap
- [ ] `main` pushed, so the other developer can deploy it

## Out of scope

Twilio, Meta, WhatsApp, inbound email, Retell credit. The Hostinger widget
file and the Apps Script deployment, which are the other developer's.
