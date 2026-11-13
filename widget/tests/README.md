# Widget tests

```bash
./run.sh                    # every suite
./run.sh ./engine.test.ts   # one suite
```

No test runner and no new dependency: each file is a script of plain
assertions that exits non-zero on failure. They need `esbuild`, which the site
already has.

| Suite | Asserts |
|---|---|
| `clock.test.ts` | Europe/London wall-clock time, both DST changeovers, quiet hours. |
| `routes.test.ts` | The six routes: their shape, their timings, and the compliance property. |
| `engine.test.ts` | The routing engine: the lease, the gates, consent, the kill switch. |
| `attribution.test.ts` | Where a lead came from, on both sides: the browser's capture and Convex's classification. |

## Why there is a mock

`convex-mock.ts` is a small in-memory stand-in for Convex's `db`, so handlers
can be driven directly as `fn._handler(ctx, args)`.

The engine's correctness is almost entirely about ordering and atomicity: a
lease held, a stale token refused, an idempotency key honoured. None of that
can be checked by reading the code, and none of it can be checked against the
live deployment without sending real texts to real people.

The mock declares the indexes it supports, which means it could drift from
`schema.ts` and keep passing. So `engine.test.ts` reads `schema.ts` and asserts
that every index the mock relies on is really declared there. If you add an
index to the mock, that assertion is what keeps it honest.

## The one test that must not be skipped

`THE DOUBLE SEND GUARD` in `engine.test.ts`. The worker cron fires every
minute and a batch of 25 sends can take longer than that, so two runs overlap.
Without the lease both would claim the same row and send the same text twice.
Texting a client's customer twice is the worst thing this system can do.

## The compliance property

`routes.test.ts` asserts `no marketing route can dial`. A `call` step exists
only in routes B and E, the two where the person contacted us first. An
automated marketing call needs consent specifically covering automated calls
(PECR regulation 19), and the ICO has issued some of its largest fines for
getting it wrong. Keeping that unreachable in the data beats writing it in a
prompt and hoping.
