# Architecture - Channel allocation, and a human owns every lead status

## ADR-006. Allocation is a different question from reporting, and gets a different shape

The Channels report answers "what did each channel do". It is a table, sorted
by volume, and every row is true.

Allocation answers "what should we do next month", and a table cannot answer
it, because the answer depends on two numbers at once. A channel with 34 leads
and 3 bookings and a channel with 10 leads and 6 bookings are both just rows;
the fact that the first is where the money is going and the second is where it
should be going is invisible until they are placed against each other.

So the section is a **grid, not a list**: volume across, conversion up, each
channel a point. Four readings come out of it, and each one is an instruction
rather than a figure:

| | Converts well | Converts badly |
|---|---|---|
| **Lots of leads** | Working. Protect the budget. | **The money pit.** Loudest, and the reason this exists. |
| **Few leads** | **Starved.** Feed it. | Leave it. |

The grid is not decoration. A list sorted by any single column hides exactly
the two quadrants that matter, because "lots of leads, converts badly" sorts
to the top on volume and the bottom on rate, and whichever sort you chose
tells you the opposite of the other.

## ADR-007. Rank nothing on a handful of leads

A channel with 3 leads and 2 wins converts at 67%, and it means nothing. Put
it top of a ranked list and somebody moves budget onto a coincidence.

So every rate carries its denominator in the same breath, and a channel below
a floor of leads is drawn but **not ranked and not called best or worst**. It
is shown as "too early to say", which is a real finding and the honest one.

The floor is a constant in one place, not scattered through the component,
because the right number depends on the client's volume and will change.

## ADR-008. "Profitable" is not claimed without spend

What the system knows is leads, bookings, wins and the value typed on a win.
What it does not know is what any of it cost.

With spend, the section can say cost per booked appointment and cost per deal,
which is the figure the routing paper asks for and the only one that means
profitable. Without it, the honest word is **efficient**: of the leads this
channel produced, this share converted.

So the section shows efficiency always, and profit only where a spend figure
exists, with "add spend" in place of a number rather than a zero. The two are
never blurred, because a channel called profitable on no cost data is the kind
of wrong figure that gets repeated in a client meeting.

## ADR-009. One editable field, with a history

A lead has an `outcome` a person sets, and a pipeline `status` derived from
it. The temptation is to let a person set both. That is wrong: two fields set
independently drift, and a lead that is `closed` and `open` at once is a bug
nobody can see.

So the outcome stays the single editable field, and what is added is the thing
actually missing: **a record of each change**, who and when. Written to the
append-only `touches` table rather than a new one, because it already is the
per-lead history the timeline reads, and a second history would have to be
merged with the first every time anybody looked.

## What this does not change

- The Channels report. It keeps its table; the allocation section links to it
  for the per-channel detail rather than repeating it.
- The outcome vocabulary: the same five, set the same way.
- The schema, beyond one `settings` row for spend.
