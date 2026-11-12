# Dashboard: what is on screen, and what is behind it

A running list of where the interface is ahead of the data. Kept here, beside
the screens, because the place this goes wrong is somebody demonstrating a
screen and assuming the number under it is real.

Three states:

| | Meaning |
|---|---|
| **Live** | Real data, end to end. Safe to quote. |
| **Shape only** | The screen is built and the field exists, but nothing fills it yet. Shows "not set" or an empty state, never a zero that looks like a measurement. |
| **Backend missing** | The screen cannot be built honestly yet. Listed here so it is not forgotten. |

Example data is a separate thing from all of this: `?demo=1` swaps the whole
source for `lib/dashboard/demo.ts` and puts a banner on every screen. Nothing
is written to Convex in that mode.

---

## Live

| What | Where |
|---|---|
| Lead capture, dedupe across visits, visit count | `leads` |
| Which channel and which advert produced a lead | `sourceChannel`, `attribution` |
| The follow-up queue: route, step, what is due next, why it stopped | `sequences` |
| Every message, call and booking on one timeline | `touches`, `messages`, `bookings` |
| Text reply rate, time to first touch, time to first human | `touches` |
| Consent, opt-outs and the do-not-contact list | `consentEvents`, `suppressions` |
| The kill switch | `settings` |
| Handover to a person | `handover.ts` |
| Calls, recordings, transcripts | Retell |
| Campaigns: who a batch reached, replied, booked, signed, opted out | `campaigns`, `sequences.campaignId` |

---

## Shape only: the field exists, nothing fills it yet

### Deal outcome and value
**Done.** `leads.outcome` (`open | quoted | won | lost | unqualified`),
`valueGbp`, `lostReason`, set from the picker on the Leads table and read by
the Channels report. Bulk setting is done too: tick boxes on the table and one
bar above it, through `routing.setOutcomeMany`, which calls `setOutcome` per
lead rather than patching rows itself so the single and bulk paths cannot
disagree about what an outcome does to the pipeline `status`.

Four outcomes in bulk, not five. A win carries a value, a value belongs to one
deal, and setting the same figure on twenty leads would invent revenue.

The same control is on the conversation page, which IS the lead detail page;
there is no separate one. It was there all along and could not be reached for
a whole class of lead: the page bailed to "Nothing was recorded for this
conversation" whenever there were no messages and no calls, which hid the
lead panel too. A lead from a website form, a Google Ads lead form, or
anything the router captured has no messages, so its outcome could never be
set, and every channel figure built on that field was quietly missing them.
The empty state now means actually empty: no transcript, no call, no lead and
no booking.

### Campaigns
**The screen and the report are done.** A `campaigns` table, `campaignId` on
`sequences`, `campaigns.ts` with `create`, `enrolBatch`, `stop`, `list` and
`report`, six HTTP routes, a list screen with a funnel per run and a detail
screen with everyone on it. Every figure is counted from `touches` through the
idempotency key each send already carries, so nothing increments a counter and
no figure can drift from what actually went out.

**Missing:** anything that creates one. `11-reactivation` does not exist yet,
so no campaign is ever started and the screen correctly says there are none
and offers the example instead.

**To finish:** the n8n workflow. Import the list, refuse any row without
consent evidence, `POST /campaign/create`, then `POST /campaign/enrol` in
pages of a hundred, sending each returned immediate message inline exactly as
`07-router` does for an enquiry. The enrolment is capped per call on purpose:
four hundred in one mutation is a long transaction holding read locks on
`suppressions` and `settings`, which every live send also reads.

### Cost per booked appointment, and per deal
**Done.** Spend is a `settings` row, typed in per channel per month, read and
written through `/settings/spend`. The Channel allocation section on the
Overview shows cost per booking wherever a figure exists.

A channel with no figure prints "add spend", never £0. Absent and zero are
different facts all the way from the database to the screen: a zero there
reads as "it cost us nothing", which is the sentence that gets repeated in a
client meeting. Nothing is called profitable without a cost behind it.

Crude on purpose. The Google Ads and Meta Marketing APIs are the accurate
version and a project of their own.

### Email reply rate
The Channels report counts emails sent and texts replied to. It cannot count
emails replied to, so "replied" currently means "replied by text".

**Missing:** anything that receives email. Outbound email is a `touch`; a
reply lands in a mailbox nothing reads.

**To finish:** a unique reply-to per outbound email,
`reply+{touchId}@inbound.<domain>`, and an inbound webhook that posts the
parsed message back as an inbound `touch`. The reply address is the only
identifier a mail client cannot strip, which is why it beats subject matching
or threading headers. Add a scheduled reconciliation pass so a webhook outage
undercounts loudly rather than silently. Needs a provider decision first:
Postmark inbound parse or Resend's `email.received`.

---

## Backend missing: not built, and the screen is not pretending

### WhatsApp
`whatsapp` and `whatsapp_ads` are accepted as channel values and will report
correctly the moment anything writes them. Nothing does.

**To finish:** WhatsApp Cloud API, a business number, and approved templates.
Two things make it unlike the other Meta channels and both are already
accounted for in the enum: billing is **per message** rather than per
conversation, and a **click-to-WhatsApp advert opens a seven day free window**
rather than the usual twenty-four hours. That is why `whatsapp_ads` is its own
value and not a flavour of `facebook_ads`.

### Facebook and Instagram pages
`facebook_page` and `instagram_page` exist for messages from somebody who
found the page on their own, as opposed to `facebook_dm` and `instagram_dm`,
which mean a message that came from an advert. Nothing writes either pair yet.

**To finish:** the Meta webhook has to distinguish them, which means reading
the referral payload on an ad-sourced thread. Without that, organic page
traffic would be credited to the ad channels, which is the exact error the
split exists to prevent.

### No-shows
The Appointments screen shows the week ahead and where each booking came
from. It cannot show no-shows, because nothing records one: a booking is
`requested | confirmed | cancelled | moved`, and somebody who simply did not
turn up leaves no trace.

**To finish:** a `no_show` status and whatever sets it. The routing engine can
already chase one as a sequence step the moment the status exists.

### Images and voice notes
Not in the dashboard at all. When the widget and the Meta channels accept
them, a `touch` needs somewhere to hold an attachment and the timeline needs
to render it.

---

## Rules for anything added here

1. **Never show a zero that could be read as a measurement.** "Not set" and
   "nothing yet" are different from "0", and conflating them is how a
   half-built screen becomes a wrong number in a meeting.
2. **Every screen states what it left out.** Test traffic is excluded by one
   shared rule, `lib/dashboard/test-rows.ts`, and the count is printed.
3. **If a figure cannot be produced honestly, the column stays and says so.**
   Omitting it quietly is worse: the reader never learns it was missing.
