#!/bin/sh
# Continuum Stop hook.
# Fires at the end of every turn. Stop hooks reach the model through
# hookSpecificOutput.additionalContext, so this emits JSON, and only when the
# state is genuinely behind the work: there are changes, and the last checkpoint
# is older than CONTINUUM_STALE_MIN minutes. A cooldown file keeps it from
# nagging every turn.

set -eu

ROOT=${CLAUDE_PROJECT_DIR:-$(pwd)}
C="$ROOT/.continuum"
[ -d "$C" ] || exit 0

STALE_MIN=${CONTINUUM_STALE_MIN:-25}
COOLDOWN_MIN=${CONTINUUM_COOLDOWN_MIN:-20}
NOW=$(date -u +%s)

# mtime in epoch seconds, across BSD and GNU userlands.
mtime() {
  m=$(date -u -r "$1" +%s 2>/dev/null) && [ -n "$m" ] && { printf '%s' "$m"; return 0; }
  m=$(stat -f %m "$1" 2>/dev/null) && [ -n "$m" ] && { printf '%s' "$m"; return 0; }
  m=$(stat -c %Y "$1" 2>/dev/null) && [ -n "$m" ] && { printf '%s' "$m"; return 0; }
  printf '0'
}

age_min() { # age of file $1 in minutes, or a large number if missing or unreadable
  if [ -f "$1" ]; then
    m=$(mtime "$1")
    [ "$m" = "0" ] && { printf '9999'; return; }
    printf '%s' $(( (NOW - m) / 60 ))
  else
    printf '9999'
  fi
}

[ "$(age_min "$C/.nudged")" -lt "$COOLDOWN_MIN" ] && exit 0

dirty=0
head_sha=""
if git -C "$ROOT" rev-parse --git-dir >/dev/null 2>&1; then
  dirty=$(git -C "$ROOT" status --porcelain 2>/dev/null | wc -l | tr -d ' ')
  head_sha=$(git -C "$ROOT" rev-parse --short HEAD 2>/dev/null || printf '')
fi
last_sha=""
[ -f "$C/.last-sha" ] && last_sha=$(cat "$C/.last-sha")

moved=0
[ "$dirty" != "0" ] && moved=1
[ -n "$head_sha" ] && [ -n "$last_sha" ] && [ "$head_sha" != "$last_sha" ] && moved=1
[ "$moved" = "0" ] && exit 0

[ "$(age_min "$C/STATE.md")" -lt "$STALE_MIN" ] && exit 0

: > "$C/.nudged"

cat <<EOF
{
  "hookSpecificOutput": {
    "hookEventName": "Stop",
    "additionalContext": "Continuum: the working tree has moved on but .continuum/STATE.md has not been stamped for over ${STALE_MIN} minutes. Before the next unit of work, update STATE.md and NEXT.md to match reality and run: continuum checkpoint \"<the next concrete action>\". A session that ends without this loses the thread."
  }
}
EOF
