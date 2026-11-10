# Research - Channel allocation, and a human owns every lead status

## The actual request

Two things, asked on 2026-11-10.

**One.** "A section where all the insight and metrics show: how many leads
from each channel, which channel converts best, all channels compared as a
ratio, a detailed breakdown of which channel is making us money, which brings
leads that do not convert, which brings few leads that do convert. Show it as
a premium dashboard, as a section under Overview. Call it channel allocation
or whatever is better."

**Two.** "Every lead's status should be changeable by a human."

Underneath the first: **where should the money go next month.** Every figure
the dashboard has today describes what happened. None of them answers the
question the client actually has when they look at it, which is what to stop
paying for and what to feed.

## What already exists here

| Exists | Where | Reuse, extend or replace |
|---|---|---|
| Channels report: leads, first touch, replied, booked, won, value, opted out per channel | `app/lead-dashboard/channels/page.tsx` | **Reuse, do not duplicate.** It lists what each channel did. It does not rank, compare, or say what to do. |
| `channelFacts`, one row per lead | `widget/convex/routing.ts` | Reuse. It already returns everything the allocation needs except spend. |
| `canonicalSource`, 15 channels | `lib/dashboard/channels.ts` | Reuse. |
| Outcome picker, five outcomes, value on a win | `components/dashboard/OutcomePicker.tsx` | Reuse. |
| Outcome editable on the Leads table, in bulk, and on the conversation page | `leads/page.tsx`, `BulkOutcome.tsx`, `conversations/[session]/page.tsx` | **Already satisfies most of request two.** See below. |
| Spend per channel | **nowhere** | Build. It is the missing input for "profitable". |

### Request two is mostly already done, and the gap is narrow

A human can set a lead's outcome from three places today. What they cannot do:

- Change the pipeline `status` (`new | contacted | closed`) directly. It is
  derived from the outcome, which is deliberate: two fields a person can set
  independently drift, and then a lead is `closed` and `open` at once.
- Undo. Setting it back is possible, but nothing records that it changed, so
  "who marked this won and when" has no answer.
- See it on the Appointments or Inbox rows.

So the honest scope is: **an audit trail on the outcome, and the control in
the one or two places it is missing**, not a second editable status field.

## Constraints that are not negotiable

- **Do not build a second Channels screen.** The Inbox and Conversations
  lesson, two entries that looked alike, is three days old. This must say
  something the Channels report does not.
- **"Profitable" needs spend.** Without it, what can honestly be shown is
  conversion efficiency, not profit. The screen must not imply otherwise.
- Convex is the database, n8n is the brain. Spend is a `settings` row.
- Every figure excludes our own test rows by the one shared rule, and the
  screen says how many it hid.

## Open questions

| Question | Blocking? |
|---|---|
| Spend monthly per channel, or per campaign? | No. Monthly per channel, typed in. The ads APIs are a project of their own. |
| Where does the section live: on Overview, or its own screen? | No. He said under Overview. A compact section there, linking to the full report. |

## What would make this fail

1. **A ranking built on numbers too small to rank.** Three leads from referral
   with two wins is a 67% conversion rate and means nothing. A rate shown
   without its denominator, or a channel ranked on four leads, is worse than
   no ranking: it gets quoted and acted on.
2. **Looking like the Channels report.** If a person cannot say in one
   sentence why both exist, one of them should not.
3. **"Profitable" with no spend behind it.** Saying a channel is profitable
   when the system does not know what it costs is the kind of wrong figure
   that ends up in a client meeting.
4. **An outcome audit trail nobody reads.** If it is built, it has to be
   visible where the outcome is set, not in a table only I know about.
