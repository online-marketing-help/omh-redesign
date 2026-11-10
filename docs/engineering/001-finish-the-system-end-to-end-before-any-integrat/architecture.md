# Architecture - Finish the system end to end, before any integration

## The shape, after this workstream

```
  the public                n8n, srv1836598                Convex, cool-ferret-103
  ──────────                ───────────────                ───────────────────────
  website form   ─┐
  widget chat     ├──────→  07 router ────────────────────→ saveLead
  Google Ads form ┘           decides route, renders        enrol  (atomic)
                              the first message
                                                           sequences.nextDueAt
  (cron, 1 min)  ─────────→  08 worker                     claimDue (atomic lease)
                              reads due rows, decides       completeStep
                              the step, renders the text
                              from gates/, sends
  a CSV of past  ─────────→  11 reactivation                campaigns
  customers                   screens for consent           consentEvents
                                                            touches (append only)
  a booking      ─────────→  12 availability                bookings
                              what is already taken
```

## Decisions

### ADR-001. The brain moves to n8n, the transactions do not

Every decision the system makes moves into an n8n Code node, fed by a file in
`widget/gates/`. Two things stay in Convex, and the test for staying is the
same in both cases: **does correctness depend on it being one transaction?**

- `claimDue` stamps a lease on due rows and returns them in one step. Split,
  two overlapping cron runs read the same rows and both send.
- `enrol` checks for a live sequence and inserts. Split, two leads for the
  same person arriving together both enrol, and that person gets two
  campaigns running at once.

Everything else, route definitions, step timing, quiet hours, message copy and
the consent gate, is a pure function of its inputs and moves.

### ADR-002. Gates are files, not node bodies

A Code node does not contain a hand-written copy of the logic. The builder
bundles the file from `widget/gates/` that the tests import, with esbuild, into
the node. One text, asserted and executed.

The alternative, writing the logic twice, fails in one specific way: the copy
in the node and the copy in the test drift, and the copy that drifts is the one
that sends to a real customer. Proven working for `consent-gate.js` by pulling
the bundle back out of the generated JSON and running it against the same
cases the assertions use.

Cost: the builder now needs esbuild at build time. It was already in the repo
for the test runner.

### ADR-003. Builders are tracked, generated workflows are not

n8n is the brain, so the brain belongs in version control. But every generated
workflow bakes the Convex shared secret and two carry the Retell key, and this
repository is public.

The builders read those values from `.env.local` and contain none of them, so
the split is: `widget/n8n/*.py` tracked, `widget/n8n/*.json` ignored. The
working copy reaches them through a symlink, the same arrangement
`widget/convex` already uses.

### ADR-004. Slot availability is read from the calendar, not from a table

Booking needs to know what is already taken. There are two possible sources of
truth and picking the wrong one causes the bug it is meant to fix.

Google Calendar is the real diary: OMH move and cancel things in it directly,
and a booking made by phone never touches our database. A `bookings` table
would be a second, stale copy, and "the slot is free" computed from a stale
copy is exactly the double booking we have now.

So availability is read from the calendar through the existing Apps Script,
and the Convex `bookings` row stays what it is: our record of what the
assistant did, not the diary.

### ADR-005. No-show is a status, and the chase is a route

A booking is `requested | confirmed | cancelled | moved`. Somebody who simply
did not turn up leaves no trace, so the diary cannot tell a kept appointment
from an empty hour, and the Channels report counts a no-show as a success.

Adding `no_show` to the status enum is one schema line. What chases it is a
route in `gates/routes.ts` like any other, so it passes the same consent gate,
the same quiet hours and the same lease. A second scheduler would not.

## What this does not change

- The schema, beyond one status value and the spend row in `settings`.
- The dashboard's data layer: every screen keeps reading the same routes.
- The six routes' timing or wording. They came from the routing paper and are
  asserted; this workstream moves where they live, not what they say.
