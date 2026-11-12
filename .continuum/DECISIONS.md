# Decisions

Append-only. Newest at the bottom. One entry per decision that would otherwise
be re-argued in a later session.

A decision belongs here when reversing it would cost real work: a library
choice, a schema shape, an auth model, a deployment target, a rejected
alternative. Not here: formatting, naming, anything the linter settles.

---

## D-001 - n8n is the brain, Convex is the database and the clock

- **Date:** 2026-11-10
- **Decision:** backend logic lives in n8n. Convex holds data, scheduling
  state and template rendering. Code only where n8n genuinely cannot.
- **Because:** Rafiul's standing instruction for this project. Practically:
  every provider call stays somewhere visible and re-runnable, and no Convex
  `action` is introduced, so the deployment keeps its "one door, one secret"
  property.
- **Except:** `enrol` and `claimDue` stay in Convex because correctness
  depends on one transaction and n8n has none; and the due date is a row,
  not an n8n `Wait` node, because a Wait spanning four days lives in that
  execution's state and a restart loses it silently.

---

## D-002 - Shared logic lives in widget/gates/ as plain JavaScript

- **Date:** 2026-11-10
- **Decision:** any rule that has to hold in more than one place is a file in
  `widget/gates/`, with no imports, imported by the tests and inlined
  verbatim into the n8n Code node that runs it.
- **Because:** the same rule written twice drifts, and the copy that drifts
  is the one nobody tested. One text, asserted and executed.
- **Rejected:** bundling the gate with esbuild (`gate_source`). The bundle
  assigns an IIFE to a global the n8n Code sandbox cannot reach; it took the
  live chat down on 2026-11-11. `gate_inline` drops the export line instead.

---

## D-003 - The visitor's capability is the id PAIR, not either id

- **Date:** 2026-11-11
- **Decision:** a public route that returns anything about a conversation
  requires both the session id and the visitor id, and checks that the
  session belongs to that visitor. A session keeps the visitor that started
  it and cannot be re-pointed.
- **Because:** a review found that reading on the visitor id alone returned
  a stranger's whole transcript, and that `hello` let anyone claim a session.
  `publicRoute` checks only that a session id is present and cannot know
  whose it is, so each handler scopes itself.
- **Also:** both ids are now 16 bytes from `crypto.getRandomValues`. They
  were `Date.now()` plus `Math.random()`, which is a known prefix and about
  40 bits from a generator not meant for this.

---

## D-004 - The booking guarantee is the Apps Script lock, not the form

- **Date:** 2026-11-11
- **Decision:** the form reads availability and strikes out taken times, but
  the authoritative check is a `LockService` lock in the Apps Script with the
  clash check inside it, immediately before the event is created. The
  availability GET fails OPEN: if the calendar cannot be reached, every time
  is offered.
- **Because:** two submissions in the same second both see the slot free on
  the page, and only a check in the same breath as the write refuses the
  second. Given that, a form that offers nothing because a Google script
  timed out turns away real customers to prevent a clash already prevented.
- **Not symmetric:** an answer we cannot PARSE is never reported as "fully
  booked". That would silently close the diary on an empty day.

---

## D-005 - Replying is not marketing, and only route F is

- **Date:** 2026-11-10
- **Decision:** routes B to E may text, email and call within minutes with no
  recorded consent. Route F is the only one marked `marketing: true` and
  demands consent evidence per person.
- **Because:** PECR. Replying to somebody's own enquiry is not marketing;
  starting a conversation they did not ask for is. An automated marketing
  call needs consent that specifically covers automated calls (reg 19), which
  general marketing consent does not give.
- **Enforced structurally:** a `call` step exists only in routes B and E. C,
  D and F have none, so an automated marketing call is not reachable by a
  configuration mistake. A test asserts it.
