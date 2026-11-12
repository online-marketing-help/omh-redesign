#!/bin/sh
# Continuum PreCompact hook.
# Compaction is where a long session loses its grip on detail. PreCompact
# cannot inject context, so this does the two things it can: records that
# compaction happened, and warns the user if state was never stamped. The
# SessionStart hook then re-injects the brief with source=compact, which is how
# the thread survives the compaction.

set -eu

ROOT=${CLAUDE_PROJECT_DIR:-$(pwd)}
C="$ROOT/.continuum"
[ -d "$C" ] || exit 0

CLI="$C/bin/continuum"
[ -x "$CLI" ] || CLI=$(command -v continuum 2>/dev/null || printf '')
[ -n "$CLI" ] && "$CLI" log "context compacted" >/dev/null 2>&1 || true

if [ ! -f "$C/.last-sha" ]; then
  printf '{"systemMessage":"Continuum: compacting with no checkpoint on record. Run `continuum checkpoint \\"<next action>\\"` so the next window can pick the thread up."}\n'
fi
exit 0
