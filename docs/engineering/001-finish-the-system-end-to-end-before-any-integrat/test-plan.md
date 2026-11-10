# Test plan - Finish the system end to end, before any integration

The suite is `widget/tests/run.sh`: plain assertion scripts bundled with
esbuild, no framework. 351 assertions at the start of this workstream. Each
new test is written and watched failing before the code it covers.

## What each task has to prove

| Task | The test | The failure it exists to catch |
|---|---|---|
| T3 push reactivation | n8n API lists it with `active: false` | A workflow pushed active would start draining a queue with no Twilio credential, producing failures that look like sends in the log |
| T4 availability | `availability.test.ts` | Two customers in one slot. The case that matters is the one nobody writes: the calendar is **unreachable**, and the route must refuse rather than accept blind |
| T5 no-show | `routes.test.ts` extended | A chase route that can dial, or that goes out without an opt-out. The compliance property is already asserted for the other six; the seventh joins it |
| T6 spend | `spend.test.ts` | A channel with no spend reading "£0" instead of "not set". Zero is a measurement; absent is a different fact, and the difference is what gets quoted in a meeting |
| T7 Google lead form | `google-lead-form.test.ts` | An unauthenticated POST creating leads. Google's webhook carries a key; a route that does not check it is an open lead-injection endpoint |
| T8 attachments | `attachments.test.ts` | An oversized or wrong-typed file reaching storage. Refused by size and type before upload, not after |

## Properties that must keep holding

These are asserted today and every task is checked against them, because they
are the ones whose breach costs money rather than time.

- **No marketing route can dial.** `routes.test.ts`: a `call` step exists only
  in B and E, and only F is `marketing`. T5 adds a route, so it is re-checked.
- **One person is enrolled once.** The lease and the already-active check.
- **A send needs recorded consent when the route is marketing.**
- **Every figure excludes our own test rows**, by one shared rule, and each
  screen prints how many it hid.

## How a UI change is proven

Not by the tests. The page is driven in a real browser at 1440 and 390, both
themes, and the result recorded with `forge evidence add browser`. A dashboard
change nobody looked at is unverified whatever the suite says.

## What is deliberately not tested here

The integrations. Nothing in this workstream sends a real text, places a real
call or messages a real Page, so there is no test that proves those work. That
proof comes with the credential, and claiming it earlier would be the exact
failure this process exists to prevent.
