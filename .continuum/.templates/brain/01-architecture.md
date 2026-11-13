# Architecture

_pending - filled during onboarding._

## Runtime picture

What processes exist, what talks to what, where data rests. A short list beats a
diagram nobody updates.

## Entry points

The handful of files where control enters the system: routes, CLI commands,
queue consumers, cron jobs, webhook receivers.

| Entry point | File | Triggers |
|---|---|---|
|  |  |  |

## Data model

The tables, collections or schemas that carry the domain, and the invariants that
must hold across them.

## External dependencies

Every third-party service the code calls, what it is used for, and what happens
when it is down.

## Seams

Where the code is mid-change: an old path and a new path coexisting, a shim, a
deprecated module still in use. This is the section that saves the next session
from "fixing" something deliberately half-built.
