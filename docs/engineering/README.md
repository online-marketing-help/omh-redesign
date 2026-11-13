# Engineering

Durable engineering record for this project. Every change of consequence gets a
numbered folder here, and every decision worth keeping gets an ADR.

| Folder | Holds |
|---|---|
| `NNN-<slug>/` | one workstream: research, architecture, plan, test-plan, review |
| `audit-YYYY-MM-DD/` | one audit: scope, findings, remediation |
| `adr/NNNN-<slug>.md` | one decision, with the alternatives it rejected |

Read the artifacts before working in their area. They exist so that knowledge is
recovered by reading rather than by re-deriving it, and so a claim can be
checked against what was actually run.

```sh
forge list              # workstreams and plan progress
forge status            # active workstream, phases, gates
forge new "<title>"     # start one
forge verify            # run the checks, record the evidence
```
