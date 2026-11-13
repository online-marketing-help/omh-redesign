# Environment

## Where things are

| | |
|---|---|
| Repo (git) | `/Users/rafiulislam/Work/n8n/OHM/website` |
| Working copy with secrets | `/Users/rafiulislam/Work/n8n/OHM/widget` - holds `.env.local`, `retell/`, `kb/`; `convex/` and `n8n/` there are symlinks INTO the repo |
| Convex | `cool-ferret-103`, team rafiul-islam, project omh-system. **Still a dev deployment.** |
| n8n | `srv1836598` (`https://n8n.srv1836598.hstgr.cloud`) |
| Dashboard locally | `npx next dev -p 3100` - port 3000 is usually taken by bd-automation-panel |
| Dashboard login | `OMH_DASHBOARD_USER` / `OMH_DASHBOARD_PASSWORD` in `website/.env.local` |

## Commands that matter

```sh
cd OHM/website/widget && zsh tests/run.sh          # 804 assertions, 16 suites
cd OHM/website && npx tsc --noEmit                 # the app
cd OHM/widget   && ../website/node_modules/.bin/tsc -p tsconfig.check.json
cd OHM/website && npx eslint components app lib
cd OHM/widget   && python3 n8n/build-workflows.py  # writes n8n/*.json, pushes nothing
cd OHM/widget   && python3 n8n/push.py --only 01-chat
```

Convex deploy needs the key unquoted:

```sh
cd OHM/widget && set -a && . ./.env.local && set +a && \
  CONVEX_DEPLOY_KEY="$(echo "$OHM_WIDGET_CONVEX_DEPLOY_KEY" | tr -d '"')" npx convex deploy -y
```

## Credentials and where they are not

- `OHM/widget/.env.local`, chmod 600. Check it before asking for anything.
- The OpenRouter credential `Sj2vuK21qAcp0hJj` and the SMTP credential
  `I7yvfVmEpZslNAxV` exist **only on srv1836598**. The n8n MCP points at
  srv1236458; a node created there runs unauthenticated and silently.
- `n8n/` and `retell/` in the working copy stay out of git: the Convex secret
  is in those files many times over.

## Where the live site is

`https://onlinemarketinghelp.co.uk/` is THIS repository, deployed. Next.js,
behind Cloudflare, hosted on Hostinger. One deploy ships everything:

- the marketing pages
- `/lead-dashboard` (live, login-gated)
- the API routes, including `/api/book-demo`
- `/ohm-assistant.js`, which is `public/ohm-assistant.js` here

There is no separate widget upload and no WordPress. Two unused copies of
the widget exist (`ohm-assistant-eight.vercel.app` and
`wp-content/uploads/ohm/`); ignore both.

## Deployment state (2026-11-12)

- Convex: current.
- n8n: `01-chat` live and current. `07-router`, `11-reactivation` pushed and
  **inactive**.
- **The live site is behind `main`.** Its widget is 23,135 bytes against the
  30,922 on `main`, and `GET /api/book-demo` answers 405 there because that
  handler does not exist in that build. Everything since is committed and
  pushed; it needs one deploy of the repo.
- Apps Script: **not redeployed.** The booking lock is not live.
