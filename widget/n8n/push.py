#!/usr/bin/env python3
"""
Creates (or updates) the four workflows on the n8n instance.

They are created INACTIVE on purpose. Flipping a workflow live is a separate,
explicit decision, so this script never does it. Activate from the n8n UI, or
run this with --activate once you have decided to.

Usage:
  python3 n8n/push.py            create or update, leave inactive
  python3 n8n/push.py --activate also set them active
"""
import json, pathlib, sys, urllib.request, urllib.error

HERE = pathlib.Path(__file__).parent

# Where the un-tracked working assets live: .env.local, retell/, kb/.
#
# This file is version controlled (n8n is the brain now, and an untracked
# brain is one that can be lost or quietly changed), but the secrets it
# reads are not and must never be. Python resolves __file__ through the
# symlink to the real path, so HERE.parent lands in the repo rather than in
# the working copy. Look for the thing that actually matters instead of
# assuming a layout.
def _root():
    for c in (HERE.parent, HERE.parent.parent.parent / "widget", pathlib.Path.cwd().parent):
        if (c / ".env.local").exists():
            return c
    raise SystemExit(
        "Cannot find .env.local. Run this from the working copy "
        "(OHM/widget/n8n), not from the repo path."
    )


ROOT = _root()

env = {}
for line in (ROOT / ".env.local").read_text().splitlines():
    t = line.strip()
    if not t or t.startswith("#") or "=" not in t:
        continue
    k, _, v = t.partition("=")
    env[k] = v.strip().strip('"')

BASE = env["N8N_BASE_URL"].rstrip("/")
KEY = env["N8N_API_KEY"]
ACTIVATE = "--activate" in sys.argv


def call(method, path, body=None):
    req = urllib.request.Request(
        BASE + path,
        method=method,
        data=json.dumps(body).encode() if body is not None else None,
        headers={"X-N8N-API-KEY": KEY, "Content-Type": "application/json"},
    )
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            return r.status, json.loads(r.read().decode() or "{}")
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode()[:400]


status, existing = call("GET", "/api/v1/workflows?limit=250")
by_name = {}
if status == 200:
    for w in existing.get("data", []):
        by_name[w["name"]] = w["id"]

for f in sorted(HERE.glob("0*.json")):
    wf = json.loads(f.read_text())
    name = wf["name"]
    payload = {
        "name": name,
        "nodes": wf["nodes"],
        "connections": wf["connections"],
        "settings": wf.get("settings", {"executionOrder": "v1"}),
    }
    if name in by_name:
        wid = by_name[name]
        st, res = call("PUT", f"/api/v1/workflows/{wid}", payload)
        action = "updated"
    else:
        st, res = call("POST", "/api/v1/workflows", payload)
        wid = res.get("id") if isinstance(res, dict) else None
        action = "created"

    if st not in (200, 201):
        print(f"  FAILED {name}\n    {st} {res}")
        continue

    extra = ""
    if ACTIVATE and wid:
        ast, _ = call("POST", f"/api/v1/workflows/{wid}/activate")
        extra = "  active" if ast in (200, 201) else f"  activate failed {ast}"

    print(f"  {action:8} {name[:48]:50} id={wid}{extra}")

print("\nWebhook paths (live URLs once the workflow is active):")
for p in ["ohm-chat", "ohm-voice-token", "ohm-retell-tool",
          "ohm-retell-events", "ohm-calendar-sync-now"]:
    print(f"  {BASE}/webhook/{p}")
