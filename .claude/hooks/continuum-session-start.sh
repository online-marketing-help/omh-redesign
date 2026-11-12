#!/bin/sh
# Continuum SessionStart hook.
# Stdout on SessionStart is added to the session context, so this prints the
# resume brief and nothing else. Matchers: startup|resume|clear|compact|fork.
# Exits 0 quietly when the project has no state, so the hook is harmless to
# leave configured in a repo that has not been initialised.

set -eu

ROOT=${CLAUDE_PROJECT_DIR:-$(pwd)}
CLI="$ROOT/.continuum/bin/continuum"
[ -x "$CLI" ] || CLI=$(command -v continuum 2>/dev/null || printf '')

[ -d "$ROOT/.continuum" ] || exit 0
[ -n "$CLI" ] || exit 0

"$CLI" brief 2>/dev/null || exit 0
