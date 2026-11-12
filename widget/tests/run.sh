#!/bin/zsh
# Run the widget's test suites.
#
# They are bundled with esbuild before running, because Convex imports are
# extensionless (`./clock`, not `./clock.js`) and node's ESM loader will not
# resolve those. `convex/*` resolves through widget/node_modules, which is a
# symlink to the working copy's and is gitignored.
#
# The bundle is written HERE rather than in a temp directory on purpose: two
# suites read source files with `new URL(..., import.meta.url)`, and from a
# temp directory those paths point at nothing. That failure is silent in the
# sense that it looks like a missing file rather than a wrong test.
set -e

# This script is zsh, not bash, and it uses zsh parameter expansions
# (${0:A:h}, ${1:t:r}) throughout. Run under bash, those expansions are
# syntax errors INSIDE THE LOOP BODY, so every suite is skipped, `fails`
# stays 0, and the last line prints "every suite passed" having run nothing.
# That is the worst possible failure for a test runner: a green result with no
# tests behind it. So it refuses instead.
if [ -z "${ZSH_VERSION:-}" ]; then
  echo "run.sh needs zsh (it uses zsh expansions). Use: zsh tests/run.sh" >&2
  exit 2
fi

HERE="${0:A:h}"
ESB="$HERE/../../node_modules/.bin/esbuild"

run_one() {
  local name="${1:t:r}"
  "$ESB" "$1" --bundle --platform=node --format=esm --target=node22 \
    --outfile="$HERE/$name.bundle.mjs" --log-level=warning
  node "$HERE/$name.bundle.mjs"
}

if [[ -n "$1" ]]; then
  run_one "$1"
  exit $?
fi

fails=0
for t in "$HERE"/*.test.ts; do
  echo ""
  echo "######## ${t:t} ########"
  run_one "$t" || fails=1
done
echo ""
if (( fails )); then echo "SOME SUITES FAILED"; else echo "every suite passed"; fi
exit $fails
