# Architecture

## Runtime picture

```
visitor ──> widget (vanilla JS, shadow DOM, on WordPress)
              │
              ├─ chat turn ──> n8n 01-chat ──> OpenRouter (Melissa agent)
              │                   └─ tools ──> Convex HTTP routes
              └─ history, handover, attachments ──> Convex directly
                                                     (public routes, no secret)

any channel ──> n8n 07-router ──> classify A-F ──> immediate touch, sent inline
                                      └─> Convex enrol, sets nextDueAt
                                                │
n8n 08-sequence-worker (cron, 1 min) <──────────┘
    claimDue ──> send (Twilio | SMTP | Retell) ──> completeStep

OMH staff ──> Next.js dashboard (server components) ──> Convex, Retell
```

**Convex is the database and the clock. n8n is the brain.** That is a
standing instruction from Rafiul, not an accident: backend logic goes in n8n
unless n8n genuinely cannot do it, and then it may live in Convex.

What stays in Convex on purpose: `enrol` and `claimDue`, because correctness
depends on one transaction and n8n has none; and the due date itself, because
an n8n `Wait` node spanning four days lives in that execution's state and a
restart loses it silently.

## The gates pattern

`widget/gates/*.js` is the most important convention here. Each file is plain
JavaScript with no imports, and the **same text** is imported by the tests and
inlined verbatim into an n8n Code node by `gate_inline()` in
`widget/n8n/build-workflows.py`. One text, asserted and executed. A gate is
where a rule lives when it has to hold in more than one place.

Current gates: `routes.ts`, `templates.ts`, `clock.ts` (TypeScript, older),
and `attachments.js`, `availability.js`, `allocation.js`, `consent-gate.js`,
`google-lead-form.js`, `reply-shape.js`.

## Entry points

| Where | What enters |
|---|---|
| `widget/web/embed/src/embed.js` | everything the visitor does |
| `widget/convex/http.ts` | the only way into the database from outside |
| `widget/n8n/build-workflows.py` | every workflow; never edit a workflow in the n8n UI |
| `app/lead-dashboard/**` | the staff dashboard, server components |
| `app/api/book-demo/route.ts` | the booking form, and the calendar read |

## Two doors into Convex

- **Secret-gated** (`route()`): everything n8n and the dashboard use, behind
  `x-ohm-secret`.
- **Public** (`publicRoute()`): the handful the browser calls. `publicRoute`
  only checks that a session id is **present**; it cannot know whose it is,
  so **every public handler scopes itself**. CORS is not a control: it stops
  a browser on another origin reading the reply, and curl is not a browser.
