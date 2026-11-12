# Plan - dashboard experience

Ordered by what a person actually notices, not by what is easiest. Each
task is done when its own evidence exists, and the evidence for anything
visible is a browser and a screenshot I have looked at, because two of the
three mistakes on this workstream so far typechecked and built cleanly and
were only visible on screen.

## Tasks

- [x] **U1** - Say something while a screen loads, and when one fails
  - Done 2026-11-12. Measured 1918ms of nothing on Overview before this.
    Rail and title at ~150ms, then a skeleton that holds the real grid,
    `aria-busy` plus one polite status line, and `error.tsx` for a screen
    that cannot be built.
  - Two failures worth keeping: the first skeleton used a token that does
    not exist (`--ink-rgb`) so every placeholder rendered invisible, and
    the second drew table rows as full-width bars which read as a grey
    slab. Both looked fine in the diff.

- [x] **U2** - Stop a keydown with no key taking the page down
  - Done 2026-11-12. `SiteSearch` listens on `window`; autofill dispatches
    synthetic keydowns with no `key`. Guarded, with the one other place
    that assumed the same.

- [x] **U3** - Make the navigation items a real touch target
  - 224x42 today; the floor is 44. The rail is the most-used control on
    the screen and the one that matters most on a phone.
  - Test first: an assertion that walks the rail in a browser and fails if
    any item is under 44px. A number in a test does not drift; a number in
    a review comment does.
  - **Done 2026-11-12.** Every nav item was 224x42; they are 224x44 now
    via an explicit `min-h-11`, which a later line-height change cannot
    undo. The demo link was 148x31 and is 148x44.
  - Evidence: a browser script walks the rail and reads back the computed
    size and accessible name of every item. It failed on 11 items before
    and passes on all of them now.

- [x] **U4** - Give the count in a nav item a name
  - `Leads329` is read as one string and the figure is unlabelled. The
    rail already knows which counts are urgent, meaning somebody is
    waiting, and that reaches the eye through colour alone.
  - The fix is an accessible name per item, not a visual change: "Leads,
    329" and "Needs a person, 2 waiting".
  - **Done 2026-11-12.** `Leads329` is now "Leads, 329", and an urgent
    figure says "Needs a person, 2 waiting" rather than being a number in
    a different colour. The visible rail is unchanged; this is the name a
    screen reader is given.
  - Evidence: the same rail script asserts the accessible name of every
    item carrying a figure.

- [ ] **U5** - Confirm that setting an outcome actually saved
  - `OutcomePicker` and `BulkOutcome` have one feedback path between them.
    The control shows "Saving..." then becomes the new value, which on a
    fast connection is indistinguishable from nothing happening.
  - This is the field every channel figure is built on, so "did that
    land?" is a question worth never having to ask.
  - Not a toast. A brief, quiet confirmation on the control itself, and a
    real message when it fails, matching how `SpendTable` already behaves.
  - Test first: assert that a failed save says so and leaves the old value
    on screen rather than the optimistic one.

- [ ] **U6** - Tell a new person what they are looking at
  - Lowest priority and the easiest to get wrong. A line under the rail's
    heading, or one sentence per screen the first time it is empty: what
    "Needs a person" means, and why Inbox and Leads are different screens.
  - Only worth doing if it can be done without adding a thing to dismiss.
    A tour nobody asked for is worse than no explanation.

- [x] **U7** - A row is one line, and the detail is behind a click
  - Raised by Rafiul from a screenshot: an appointment's free-text note was
    rendered inside its table cell, so one row stood 200px tall and pushed
    the next booking off the screen. "Just lead name, number, initial
    details in one line; click for the details page."
  - The note is out of the table. The reference is now a link to that
    booking's own conversation, where the note, the transcript, the lead
    and the outcome already live.
  - And so it cannot come back anywhere: every `sub` in `DataTable` is
    clamped to two lines.
  - **Two wrong turns on the way, both caught by measuring rather than
    looking at the diff.** Clamping the height alone let the cell grow
    sideways instead and pushed the page 356px out. Switching to
    `truncate` brought `white-space: nowrap`, which fought the deliberate
    email wrapping on the Leads table and pushed that one out by 140px.
    `line-clamp` caps the height and leaves wrapping alone.
  - Evidence: rows 88px, 0px overflow at 1440 and 390, every screen clean.

## Order, and why

U3 and U4 are small, measurable and affect every screen. U5 is the one a
person would actually complain about. U6 is judgement rather than fact and
goes last, where it can be dropped without blocking anything.

## Out of scope

The tokens, the layout, and anything that would change what a screen says
rather than how it behaves. The brief was the quality of the experience,
not a redesign, and the screens were reviewed against the design rules
when they were built.
