#!/bin/sh
# Continuum SessionEnd hook.
# Output is not added to context and there is no decision control here, so this
# only writes the journal line that closes the session's record.

set -eu

ROOT=${CLAUDE_PROJECT_DIR:-$(pwd)}
C="$ROOT/.continuum"
[ -d "$C" ] || exit 0

CLI="$C/bin/continuum"
[ -x "$CLI" ] || CLI=$(command -v continuum 2>/dev/null || printf '')
[ -n "$CLI" ] || exit 0

reason=${1:-other}
"$CLI" log "session ended ($reason)" >/dev/null 2>&1 || true
exit 0
