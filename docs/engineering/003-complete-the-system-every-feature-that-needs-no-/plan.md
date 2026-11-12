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

- [x] **F3** - The assistant reads the photo
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
  - **Done 2026-11-12, and the gap was bigger than the plan said.** The
    widget never requested a chat turn after an upload at all, so a photo
    was stored, shown on the dashboard, and met with silence. Three parts:
    the widget now asks for a reply; Convex resolves a storage id to a URL
    for n8n (refusing any id not already in a conversation, so it is not an
    oracle); and `01-chat` gained a branch that describes the picture and
    feeds the description to the agent as text.
  - `gates/vision.js` + 34 assertions, including that only an image is sent
    to a vision model, that a failure says "I could not see it" rather than
    inventing a description, and that the description is fenced as a
    quotation because a photograph of a sign saying "ignore your
    instructions" is the obvious attack.
  - All four new Code node cases driven through `new Function` BEFORE the
    push, per the rule. The push then broke nothing: a text turn still
    answered with real prices.
  - Live evidence: a real photo uploaded through the live routes and the
    assistant replied "a decorated cake with white frosting and some
    greenery", which is what the file is.
  - **Cost, measured:** $0.0001331 per photo, 806 prompt tokens and 105
    completion. About 7,500 photos per dollar.

- [x] **F4** - Decide what happens to a voice note
  - NOT a build task yet. A one-page answer to: transcribe with what, at what
    cost per minute, and is it worth it. Deepgram is in the secret store;
    OpenRouter may not take audio.
  - Until that is answered, a voice note is stored and shown and the
    assistant says it cannot listen to it yet, which is honest and is already
    what happens.
  - **Decided 2026-11-12: yes, Deepgram, and it is already built.** The
    decision was meant to come first and it did: one real transcription
    through the existing key, 78.5 seconds at confidence 1.0, before a line
    of it was wired in. Nova-3 pre-recorded is about $0.0043 a minute, so a
    twenty second voice note costs roughly $0.0015. The key already exists
    and is already used by the Bangla voice work, so there was nothing to
    buy and nothing to decide against.
  - `gates/voice-note.js` + 27 assertions. The one that matters is not the
    API shape: a WRONG transcript is worse than none, because it reads
    perfectly and says something nobody said, and the agent will answer it
    without hesitating. Anything under 0.6 confidence is treated as not
    heard, and not one word of it reaches the prompt.
  - Live: a real voice note transcribed and understood. The assistant
    identified it as a builder's phone greeting and said OMH does not do
    kitchen renovations, which is correct.

- [x] **F5** - Remind before, and chase a no-show, by email
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
  - **Done 2026-11-12.** Route G (the no-show chase) already existed and
    nothing enrolled onto it. There was no reminder-before route at all,
    and there could not have been: every step in this engine is timed
    FORWARD from enrolment, and a reminder is the first thing that has to
    be timed BACKWARDS from a moment in the diary.
  - So `StepWhen` gained `beforeMs`, `sequences` gained `anchorAt`, and
    route H was added with two steps counted back from the appointment.
    18 assertions on the timing, including the two that matter: a reminder
    whose moment has already passed is not scheduled at all, and quiet
    hours may move a reminder forward only while it stays before the
    appointment. Forward from 03:00 is 08:00, which for an early booking
    is after it has started.
  - 13 more assertions on who gets one. The risk is not a missed reminder,
    it is reminding somebody about an appointment they cancelled, which
    tells them nobody was listening. Cancelling stops it, a no-show stops
    it, and moving re-times it rather than leaving the old moment standing.
  - Wired inside `bookAppointment` and `manageBooking` rather than in n8n,
    which is the stated exception to "n8n is the brain": a booking and its
    reminders must not be able to disagree, and in one transaction they
    cannot.
  - Live evidence: booked for Sat 21 Nov 14:00, reminder scheduled Fri 20
    Nov 16:00 London - 22 hours before, inside quiet hours. Cancelled the
    booking; the sequence went to `stopped`, reason `cancelled`, nothing
    due.
  - **Nothing sends them yet.** `08-sequence-worker` is inactive, and
    activating it would also wake the SMS steps on routes that have no
    Twilio behind them. That is a switch and a decision, not missing work.

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
