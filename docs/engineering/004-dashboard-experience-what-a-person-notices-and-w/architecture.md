# Architecture - Dashboard experience: what a person notices, and what the screen tells them

_pending_

Written after research.md, before plan.md. The job is to decide the shape once,
in writing, so the plan is mechanical and a later session cannot quietly drift
into a different design.

## Approach

The design in one paragraph, then the two or three alternatives considered and
the specific reason each lost. An approach with no rejected alternative was not
a decision.

## Components and boundaries

What is added, what is changed, and what each piece is responsible for. Name the
boundary: what crosses it, and what must never cross it.

| Component | File or module | Responsibility | Depends on |
|---|---|---|---|
|  |  |  |  |

## Data

Schema changes, migrations and their reversibility. State the invariants that
must hold after this change, because those become the test cases.

## Interfaces

The signature of every new public function, endpoint or event, written out
exactly, with its error cases. Design the errors here, not during
implementation: unhandled failure paths are where "it works" meets production.

## Security and authorisation

Who may call this, where that is enforced, and what an unauthorised caller gets
back. Secrets involved and where they come from. If the answer is "nothing
changes", say so explicitly and why that is true.

## Observability

What is logged, what is measured, and how a failure of this feature would be
noticed without a user reporting it.

## Risk and rollback

How this is turned off if it misbehaves in production, and what state is left
behind if it fails halfway.

## Decisions to record as ADRs

Anything here that a later session might reopen. Run `forge adr "<title>"` for
each and link them.
