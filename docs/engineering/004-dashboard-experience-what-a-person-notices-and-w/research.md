# Research - the dashboard as an experience

Measured on 2026-11-12, on the real screens in a real browser, not read
off the markup. The brief was "best user experience", which is not
actionable until it is turned into things that are observably wrong.

## What is already right, and should not be touched

- **A skip link, and it is the first tab stop.** 146x44, with a focus ring.
- **Every interactive element has a focus ring.** Fourteen tab stops
  checked, no exceptions. This is the thing most dashboards get wrong and
  it is already correct here.
- **Empty states exist on eleven screens**, eighteen blocks of them, and
  they say what the screen would contain rather than "no data".
- **Test traffic is excluded by one shared rule and the count is printed.**
- **No overflow and no console errors** at 1440 and 390, on every screen.

## What was wrong, and is now fixed

**Nothing happened for up to 1.9 seconds after a click.** No loading states
and no error boundaries across twelve pages, on screens that read Convex
and Retell over the network. Fixed on 2026-11-12: the rail and title land
in about 150ms, then a skeleton shaped like the content, and `error.tsx`
keeps a failed screen inside the product.

**A keydown with no `key` crashed the page.** `SiteSearch` listens on
`window` and called `event.key.toLowerCase()`. Password managers and
autofill dispatch synthetic keydowns without a key, so signing in could
take the whole page down with the error overlay. Fixed, and the one other
place with the same assumption with it.

## What is still wrong

### R1 - Every navigation item is 42px tall
The rule is 44x44 as a minimum touch target, and these are 224x42. Two
pixels, on the control used more than any other on the screen, on the one
layout that is also used on a phone. It is the cheapest fix here.

### R2 - The count is welded to the label
A nav item with a figure reads as `Leads329`. A screen reader says that as
one run-on string, and the figure has no name: nothing says whether 329 is
leads, or unread, or people waiting. The rail already distinguishes
"urgent" counts, which mean somebody is waiting on the other end, and that
distinction reaches the eye through colour alone.

### R3 - Setting an outcome says "Saving..." and then nothing
`OutcomePicker` and `BulkOutcome` each carry a single piece of feedback
between them, against six in `SpendTable` and nine in `CampaignStart`. The
picker shows a pending label and then simply becomes the new value. On a
fast connection that is indistinguishable from a click that did nothing,
and this is the field every channel figure is built on.

### R4 - Nothing says what the dashboard is for on first sight
Not a gap in any one screen: a new person lands on Overview and has to
infer what "Needs a person" means, and what the difference is between
Inbox and Leads. The empty states explain a screen once it is open; the
rail explains nothing.

## Method note

Everything above came from driving the real screens: measuring the delay
before first paint, walking fourteen tab stops and reading back the
computed size and outline of each, and counting feedback paths per
component. Opinions about taste are deliberately absent; so is anything
the existing tokens would have to change to fix.
