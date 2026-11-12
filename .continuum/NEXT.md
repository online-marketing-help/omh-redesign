# Next - resume contract

> Written by the session that is ending, for the session that starts next.
> It answers one question: what are the first three things to do, concretely
> enough that no clarifying question is needed.

## Resume here

1. `cd OHM/website && zsh widget/tests/run.sh` - confirm 804 assertions still
   pass before touching anything.
2. Decide the two deployments with Rafiul: the widget JS, and the Apps Script.
   Neither is a code change; both are his to approve.
3. If he wants more built: the Campaigns screen can report but nothing can
   START a campaign. The only path today is POSTing a list to the n8n webhook
   `/webhook/ohm-reactivation`, which is `active=False`. A "Start a campaign"
   screen (paste a CSV, see accepted vs refused with reasons BEFORE anything
   sends, then start) is the last real gap and needs no credential.

## Verify first

`cd OHM/website && zsh widget/tests/run.sh` -> "every suite passed", 804
assertions across 16 suites. Then `npx tsc --noEmit` -> exit 0.

## Context the next session will need

- **Run tests with zsh, never bash.** The runner now refuses bash, but only
  because it once printed success having executed nothing.
- **Anything that changes an n8n Code node must be driven through
  `new Function(...)` before it is pushed.** n8n wraps a node body in a
  function; a test that calls the gate directly does not reproduce that, and
  that gap took the live chat down for four minutes on 2026-11-11.
  `widget/tests/code-nodes.test.ts` holds this now.
- **The public visitor routes scope themselves.** `publicRoute` in
  `convex/http.ts` only checks a session id is PRESENT; it cannot know whose
  it is. CORS is not a control either - it stops a browser reading the reply,
  not curl. Every handler checks its own pair.
- A review on 2026-11-11 found two live holes in exactly that area. See
  `widget/tests/visitor-auth.test.ts` and `attach-auth.test.ts`, which hold
  the authorisation rather than the shaping.
