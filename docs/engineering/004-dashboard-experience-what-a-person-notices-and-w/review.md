# Review - dashboard experience

Reviewed by a reviewer that did not write the code, 2026-11-12, over the
five commits from "say something while a screen is loading" to "a failed
save no longer takes the page with it". Nine findings. Verdict: request
changes.

Its own summary of the verification is worth keeping: the tests passed
throughout, and **none of them touched any of this**. Three of its findings
were each one assertion away from being caught.

## What it found, and what was done

### Critical

**1. The no-show failure was rendered nowhere.** On a failed save the
button called `setAsking(false)` and wrote the message to state that only
renders once `done` is true, so the control silently snapped back to "No
show". A control returning to its resting state reads as a click that
missed, so the natural response is to press it again, and this one starts a
sequence that texts a customer. Two half-landed presses is two texts.
Fixed: it stays in the asking state with the reason beside it.

**2. One "try again" for two different kinds of write.** `attempt`
deliberately does not retry, because a write that may or may not have
landed should not be repeated - and then told the user to retry, which
hands the same problem straight back. A rejected fetch means the RESPONSE
did not arrive, not that the request was never served. On
`startCampaign` that is 180 people enrolled and texted twice. Fixed:
`attempt(run, "sends")` says "It may still have gone through, so check
before doing it again", and the two call sites that send now use it.

**3. The outcome picker clearing a value the store might keep.** Raised as
needing verification, and the verification clears it:
`applyOutcome` in `convex/routing.ts` patches
`valueGbp: outcome === "won" ? valueGbp : undefined`, and a patch to
`undefined` removes the field in Convex. The store does clear it. **Not a
defect**, and recorded here so the next reader does not re-derive it.

### Important

**4. A failed spend edit discarded every successful edit on the page.** It
reset to `initial`, the server-rendered prop, which is the state at page
load rather than the last known good state. Set Google to 500 successfully,
fail on Facebook, and Google silently reverted on screen while the store
held 500 - with the cost-per-lead figures being read on the same visit
computed off a number the table was lying about. Fixed: only the channel
that failed is put back, from a snapshot taken before the write.

**5. A loading file for a route that does not exist.** `appointments/` is
not a route; the Appointments screen lives at `bookings/`. That file never
rendered for anybody, and the screen it was meant for had no loading state
at all. Two more screens were missing one. This happened because the files
were generated from a list of NAMES rather than from the routes on disk.

**6. The skeleton does not know about the example data.** `loading.tsx`
receives no props, so it cannot tell whether `?demo=1` is on, and `Rail`
appends it to every link only when it is. A click during the skeleton would
have dropped somebody out of a demonstration into mostly empty real
figures. Half fixed: the skeleton's rail is now inert, so that cannot
happen. The demo banner is still not rendered, so the page does shift by
its height in example mode; that is written down in the file rather than
left to be discovered.

**7. Nine of ten loading files already disagreed with their page.** The
header's height depends on the length of the lead sentence, so the page
moved the moment data landed - the exact thing a skeleton prevents. Fixed
at the cause: `lib/dashboard/screens.ts` is now the single source, and
`widget/tests/screens.test.ts` reads both sides off disk and fails on
drift, including a loading file with no page behind it.

**8. `attempt` may not keep the page off the error boundary.** If the
action succeeds and the revalidated render then throws, the control says
"Saved" and the boundary trips anyway, showing "Nothing has been changed or
lost" over a write that landed. Reasoned from Next's semantics rather than
reproduced, and **not yet addressed**: it needs a test that makes the
action succeed while the revalidation fails. Carried forward.

**9. The retry button looked dead, and there was no way out.** `reset()`
re-renders the same segment; with a persistent cause nothing changes on
screen. Fixed: a pending state ("Trying..."), and every screen is now
reachable from the error page, because `TABS` turned out to be plain data
and moved to `lib/dashboard/screens.ts`. The previous version offered only
"try again" and "go to the overview", which both loop if the overview is
what failed.

## Not done, deliberately

The `title` tooltip on every table cell (its last suggestion) is left as
is. It is defensible either way and the reviewer's own check found every
clamped field reachable through the row's link.

## The lesson

Every finding above sat behind a green suite, on a workstream whose whole
subject was quality. The gap was the same one 001's review found: the tests
covered the pure logic and nothing covered the thin layer a person actually
touches. `screens.test.ts` is the first assertion in this project that
reads the UI's own files back and compares them.
