# Security Audit, OMH Website

Date: 2026-11-03
Target: `/Users/rafiulislam/Work/n8n/OHM/website`
Stack: Next.js 16.2.10 (App Router, `output: "standalone"`), React 19, next-sanity 13, Nodemailer, Sanity Studio, Retell voice, Convex-backed widget. Deployed via Docker + Traefik.
Mode: Read-only. No code was modified. No paid APIs were called.

## Executive Summary

Overall posture is reasonable for a marketing site. Dashboard auth is thoughtfully built (HMAC cookie, constant-time compare, server-action re-check, closed on missing password). The main gaps are at the dependency layer (a critical Next.js version with known middleware/proxy bypass and SSRF advisories), live secrets sitting on disk in `.env.local`, several places that render untrusted-shaped HTML into the DOM via `dangerouslySetInnerHTML`, missing HTTP security headers in `next.config.ts`, and the usual public form endpoints lacking rate limiting.

Counts by severity:

| Severity | Count |
|----------|-------|
| Critical | 2 |
| High     | 7 |
| Medium   | 9 |
| Low      | 6 |
| Info     | 3 |

Top 5 risks:

1. SEC-001, Critical: Next.js 16.2.10 is in a version band with published middleware/proxy bypass (dashboard auth bypass risk) and Server Action SSRF.
2. SEC-002, Critical: Live secrets stored in `.env.local` (Retell key, Convex handover secret, dashboard password) with `.env.local` not covered by `.gitignore`.
3. SEC-003, High: No HTTP security headers (CSP, HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, X-Frame-Options) emitted by the app.
4. SEC-004, High: Public form endpoints (`/api/enquiry`, `/api/book-demo`) have no rate limiting or CAPTCHA; honeypot alone is the spam defence, and `/api/enquiry` persists free-form payloads into Sanity.
5. SEC-005, High: Dashboard sign-in has a single shared password, a 500 ms post-failure sleep (not rate limiting), unbounded in-memory `cache` of password-to-token mappings, and no lockout/throttle.

## Methodology and Scope

Inspected (read-only):
- `app/` (full tree, including every route under `app/api/*` and `app/lead-dashboard/*`)
- `components/` (spot-checked risky patterns: `dangerouslySetInnerHTML`, `innerHTML`, DOM writes)
- `lib/` (full: `dashboard/*`, `sanity/*`, `enquiry-email.ts`, `instagram.ts`, `content/*` headers only)
- `proxy.ts`, `next.config.ts`, `Dockerfile`, `docker-compose.yml`, `.env.example`, `.env.local` (metadata only, values redacted)
- `public/ohm-assistant.js` (bundled widget)
- `package.json`, `package-lock.json` via `npm audit --json`
- `.gitignore`

Not inspected in depth (noted for coverage): `studio/` Sanity Studio configuration, `widget/` source (only compiled artefact in `public/` reviewed), `content/` static copy, every page under `components/voice-agents/*` (sampled, static UI).

Commands run:
- `npm audit --json` (summary only; no network write).
- Grep passes for `dangerouslySetInnerHTML`, `innerHTML`, `eval(`, `document.write`, header configuration keywords.
- `find` enumerations for API routes and env files.

Threat model start points: public form POSTs, dashboard proxy and server actions, Sanity revalidate webhook, draft-mode routes, outbound calls to Retell/Convex/Instagram/Apps Script, user-controlled strings reaching the DOM.

---

## Findings

### Critical

#### SEC-001, Next.js 16.2.10 pinned to a version with published middleware/proxy and SSRF advisories
- Severity: Critical
- Category: A06 Vulnerable Components
- Affected: `package.json:16` (`"next": "16.2.10"`), `proxy.ts` (middleware/proxy consumer), server actions throughout `app/lead-dashboard/*`
- Evidence (from `npm audit`): "Next.js: Middleware / Proxy bypass in App Router applications using Turbopack and single locale" (GHSA-6gpp-xcg3-4w24), "Server-Side Request Forgery in Server Actions on custom servers" (GHSA-89xv-2m56-2m9x), "Denial of Service in App Router using Server Actions" (GHSA-m99w-x7hq-7vfj).
- Impact: The entire dashboard auth gate (`proxy.ts`) depends on Next's middleware/proxy being enforced. A bypass renders every page under `/lead-dashboard/*` publicly reachable: visitor calls, transcripts, lead PII, and the "write as the client" reply box. SSRF via server actions could pivot from the Docker host network to Traefik/n8n/Convex.
- Attack scenario: Unauthenticated attacker crafts a request shape covered by the proxy-bypass advisory, lands on `/lead-dashboard/handover`, enumerates waiting threads, and invokes `sendReply` server action to impersonate the client to a visitor.
- Remediation: Upgrade `next` to the latest 16.x patch that addresses the advisories above; re-run `npm audit`. Re-verify the proxy still runs on every protected path.
- References: CWE-1104, CWE-918, GHSA-6gpp-xcg3-4w24, GHSA-89xv-2m56-2m9x.

#### SEC-002, Live secrets stored in `.env.local`, not covered by `.gitignore`
- Severity: Critical
- Category: A02 Cryptographic Failures / A05 Security Misconfiguration
- Affected: `/Users/rafiulislam/Work/n8n/OHM/website/.env.local`, `/Users/rafiulislam/Work/n8n/OHM/website/.gitignore`
- Evidence (values REDACTED, first 4 chars only; LIVE CREDENTIAL - ROTATE):
  - `RETELL_API_KEY=key_****` (Retell Bearer token, server-side)
  - `OHM_WIDGET_SECRET="ohm****` (shared secret for Convex handover HTTP layer, grants reply-as-client)
  - `OMH_DASHBOARD_PASSWORD="Vma****` (dashboard sign-in)
  - `OMH_WIDGET_CONVEX_URL`, `OHM_WIDGET_CONVEX_SITE` (deployment hostnames, info disclosure)
  - `.gitignore` lists `/node_modules`, `/.next/`, `*.pem` and more but does not list `.env*` or `.env.local`.
- Impact: Any accidental `git init && git add .` (the current folder is not currently a git repo per the environment banner, but the parent `n8n` tree is) commits live credentials. A leak of `RETELL_API_KEY` lets an attacker place paid outbound calls on OMH's Retell account; `OHM_WIDGET_SECRET` lets them impersonate the dashboard to the Convex HTTP endpoints (claim, reply, release) and write as the client to any live visitor conversation.
- Attack scenario: Developer commits in haste, pushes to a public mirror; secret scanners harvest the Retell key within minutes and dial international numbers until the account is capped.
- Remediation: Add `.env*` (and specifically `.env.local`, `.env.production`) to `.gitignore`. Rotate every secret listed above. Move production secrets to a secret store (Doppler, 1Password, or the VPS systemd unit's env file with 0600 perms) rather than a tracked path.
- References: CWE-312, CWE-532, OWASP ASVS 2.10.

---

### High

#### SEC-003, No HTTP security headers set
- Severity: High
- Category: A05 Security Misconfiguration
- Affected: `next.config.ts` (no `async headers()` export), `app/layout.tsx` (no `<meta>` CSP), Traefik labels in `docker-compose.yml` (no header middleware)
- Evidence: `grep -rn "Content-Security-Policy|X-Frame|Strict-Transport|Referrer-Policy|X-Content-Type|Permissions-Policy|headers()" app/ lib/ next.config.ts` returned nothing.
- Impact: No defence-in-depth against XSS (and there are 10+ `dangerouslySetInnerHTML` sinks, see SEC-010/SEC-011), clickjacking (dashboard can be framed), MIME sniffing, referrer leakage of dashboard URLs with session cookie contexts, and uncontrolled permissions for microphone/camera (the widget requests mic access, so a lax `Permissions-Policy` leaves it granted to any iframe).
- Attack scenario: A stored XSS via Sanity `rawHtml` block (SEC-010) that would otherwise be blocked by a strict CSP executes freely; the dashboard is embedded in a hostile iframe to steal cookies via UI redress.
- Remediation: Add `headers()` in `next.config.ts` with at minimum: `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY` for `/lead-dashboard/*`, `Permissions-Policy: microphone=(self), camera=()`, and a `Content-Security-Policy` that lists GTM, Plerdy, cdn.jsdelivr.net, cdn.sanity.io, and Retell origins (the inline scripts in `app/layout.tsx` will need a nonce).
- References: CWE-693, OWASP Secure Headers Project.

#### SEC-004, Public form endpoints have no rate limiting or CAPTCHA
- Severity: High
- Category: API4 Unrestricted Resource Consumption
- Affected: `app/api/enquiry/route.ts`, `app/api/book-demo/route.ts`
- Evidence: Neither route checks IP, uses `Request.headers` for a token bucket, nor calls a CAPTCHA verify endpoint. Only defence is the `hp` honeypot flag (`enquiry/route.ts:49`). Each successful enquiry writes a Sanity document and sends SMTP mail via Hostinger.
- Impact: Low-cost DoS and cost-abuse: a bot can balloon the private `enquiries` Sanity dataset (billed, and quickly unusable in Studio), exhaust Hostinger's hourly send cap (legitimate submissions bounce), and amplify to arbitrary `support@` noise. Submissions include a visitor-chosen `email` used as `replyTo`, enabling reply spoofing.
- Attack scenario: Attacker scripts 10 req/s to `/api/enquiry` with distinct bodies that bypass the honeypot; within an hour Hostinger locks the account and the Studio's submissions list is unusable.
- Remediation: Add per-IP token-bucket (e.g. Upstash Ratelimit or a Convex table) with a cap of ~5/min/IP, verify a Turnstile/hCaptcha token server-side, and cap `entries.length` and total payload size.
- References: CWE-770, OWASP API Top 10 2023 API4.

#### SEC-005, Dashboard sign-in: shared single password, no throttling, in-memory password cache
- Severity: High
- Category: A07 Identification and Authentication Failures
- Affected: `lib/dashboard/session.ts:21-45` (unbounded `cache = new Map<string, string>()` keyed by cleartext password), `app/lead-dashboard/login/actions.ts:30-42` (fixed 500 ms `setTimeout` on failure, no per-IP throttle)
- Evidence:
  - `session.ts:21`: `const cache = new Map<string, string>();` ... `cache.set(password, token);`
  - `login/actions.ts:34-36`: `await new Promise((r) => setTimeout(r, 500));`
  - Only one `OMH_DASHBOARD_PASSWORD` for every operator; `OMH_DASHBOARD_USER` defaults to `"omh"` (`lib/dashboard/auth.ts:30`).
- Impact: (a) Online brute force is bounded only by the 500 ms server-side delay and connection concurrency; distributed attackers can parallelise across IPs. (b) The in-memory `cache` grows one entry per unique attempted password forever (DoS vector and sensitive data left in heap dumps and process memory). (c) No accountability: every operator's actions in `handover/actions.ts` are attributed to `OMH_DASHBOARD_USER` ("omh"), so visitor-facing replies cannot be tracked back to a person.
- Attack scenario: Attacker loops 2 req/s across 20 cloud IPs for 24 h (~3.4 M attempts); a 10-char password with mixed case is still safe, a dictionary password is not. The failed attempts also silently fill server RAM.
- Remediation: Replace the Map with per-password hashing on each call and no cache (`crypto.subtle.sign` is already fast enough), add per-IP + per-user failure counters stored in Convex or a Redis, and ship per-operator credentials with a `takenBy`/`by` that identifies a human.
- References: CWE-307, CWE-521, CWE-316.

#### SEC-006, Nodemailer version has cross-tenant SMTP credential disclosure advisory
- Severity: High
- Category: A06 Vulnerable Components
- Affected: `package.json:17` (`"nodemailer": "^10.0.0"`), `app/api/enquiry/route.ts:112-120`
- Evidence (npm audit): "Nodemailer: Process-global DNS cache reuses TLS `servername` across transports, enabling cross-tenant SMTP credential disclosure" (GHSA-6vj9-mwq6-2f5v), plus stack-exhaustion DoS and envelope recipient parsing issues.
- Impact: In a shared-process deployment, SMTP creds for `SMTP_USER` could leak to another tenant's TLS connection on DNS cache reuse. In this single-tenant Docker setup the risk is DoS primarily, but the credentials are the main business mailbox.
- Attack scenario: Internal, less likely; still worth patching.
- Remediation: Pin to the latest Nodemailer patch that addresses GHSA-6vj9-mwq6-2f5v.

#### SEC-007, Multiple other high-severity vulnerable transitive dependencies
- Severity: High
- Category: A06
- Affected: `package-lock.json`
- Evidence (`npm audit --json`): 2 Critical, 11 High, 18 Moderate. Highlights:
  - `dompurify` (Critical, via Sanity Studio stack): three DOM XSS bypasses (GHSA-p98j-92pf-mc4p, GHSA-6688-9rhm-gjv2, GHSA-cg2g-xh64-v4q7).
  - `postcss` (High): XSS via unescaped `</style>` in stringify output; arbitrary file read via sourceMappingURL (GHSA-qx2v-qp2m-jg93, GHSA-6g55-p6wh-862q, GHSA-fxqj-rqcc-2cmp).
  - `sharp` (High): inherited libvips/libheif/librsvg CVEs (image optimisation pipeline).
  - `undici`, `brace-expansion`, `js-yaml`, `smol-toml`, `source-map-js`, `vite`, `zod`, `adm-zip` all High DoS/parsing.
- Impact: Image optimisation pipeline (`sharp`) processes attacker-reachable Instagram/Sanity images; `postcss` sourceMappingURL applies at build time but could leak if a CI pipeline runs on untrusted input.
- Remediation: `npm audit fix`, then manually bump remaining with `npm update <pkg>` and verify build. Rebuild the standalone output.

#### SEC-008, Site-wide tracking scripts weaken any future CSP
- Severity: High (compound with SEC-003)
- Category: A05
- Affected: `app/layout.tsx:56-73` (inline GTM loader), `app/layout.tsx:95-105` (inline Plerdy loader with hard-coded site hash and ID), `components/insights/InsightArticle.tsx:166, 178` (raw CMS HTML)
- Evidence: Three distinct inline `<script dangerouslySetInnerHTML>` blocks plus runtime appended scripts from `googletagmanager.com` and `d.plerdy.com`.
- Impact: Any CSP tight enough to defeat SEC-010/SEC-011 would need to allow those origins and either nonces or `unsafe-inline`. Plerdy session replay also captures form inputs by default, which can harvest PII from the questionnaires. The `_site_hash_code` and `_suid` are embedded in client source and so are not secret but a leak of them is still a nuisance for analytics integrity.
- Remediation: Switch tracking to a server-side GTM or load with `next/script` + nonce; configure Plerdy to mask form fields.

#### SEC-009, Google Apps Script webhook invoked without response integrity check
- Severity: High
- Category: A08 Software and Data Integrity Failures
- Affected: `app/api/book-demo/route.ts:62-77`
- Evidence: The route sends `secret` in the JSON body, then trusts `response.text()` string equal to `"ok"`. The response is HTTP, no signature, and Apps Script endpoints return `200` for every outcome.
- Impact: If `GOOGLE_BOOKING_WEBHOOK` is ever misconfigured or DNS-hijacked, a malicious upstream can harvest the shared `secret` and all submitted PII (name/email/phone/business/city/industry/page). The `secret` is sent in the request body rather than an `Authorization` header, so any proxy that logs bodies retains it.
- Attack scenario: A typo in `GOOGLE_BOOKING_WEBHOOK` pointing to an attacker domain yields a steady feed of booking leads + the shared secret.
- Remediation: Enforce the exact `https://script.google.com/.../exec` host at startup; move `secret` to an `Authorization: Bearer` header; sign the request body with HMAC and verify a signed response.

---

### Medium

#### SEC-010, Sanity CMS `rawHtml` block renders unsanitised HTML through `dangerouslySetInnerHTML`
- Severity: Medium
- Category: A03 Injection (Stored XSS)
- Affected: `lib/sanity/portable-text.ts:62` (`rawHtml: ({ value }) => value?.html ?? ""`), `components/insights/InsightArticle.tsx:166, 178`
- Evidence: `portable-text.ts:62` passes `value.html` through unchanged into the HTML stream, which `InsightArticle.tsx` injects via `dangerouslySetInnerHTML={{ __html: head }}`.
- Impact: An editor (or anyone with a Sanity editor token) can inject `<script>` into any insight post; the script runs on `onlinemarketinghelp.co.uk` with no CSP (SEC-003). Possible session theft for the GTM/Plerdy flows and persistent defacement.
- Attack scenario: Compromised Sanity editor account, or a social-engineered junior editor, pastes HTML containing a crafted `<img onerror>` or `<script>`; it ships to every reader at the next revalidate.
- Remediation: Sanitise `value.html` server-side with DOMPurify (patched version, see SEC-007) or `sanitize-html` before output; or remove `rawHtml` block entirely and migrate content to Portable Text primitives.
- References: CWE-79.

#### SEC-011, WordPress-imported HTML served raw as insight bodies
- Severity: Medium
- Category: A03
- Affected: `lib/sanity/insights.ts:156` (`contentHtml: toArticleHtml(raw.body)`), `components/insights/InsightArticle.tsx:166, 178`
- Evidence: `contentHtml` is produced by `toArticleHtml` over Portable Text blocks whose source is the imported WordPress corpus; marks use `escape()` for text but `rawHtml` blocks pass through verbatim (see SEC-010).
- Impact: Historical posts may already contain `<script>`, `onclick=`, or `javascript:` href that is now rendered unescaped. Also `image` type uses `value.src` with only HTML-entity escaping (`portable-text.ts:70`), not a scheme allowlist; a `javascript:` URL survives.
- Remediation: Add a server-side HTML sanitiser pass over `contentHtml`; allowlist URL schemes to `https:`, `mailto:`, `tel:` in both `link` and `image` serialisers.

#### SEC-012, Enquiry endpoint accepts unbounded arbitrary form fields and stores them in Sanity
- Severity: Medium
- Category: API4
- Affected: `app/api/enquiry/route.ts:53-100`
- Evidence: `entries = Object.entries(fields).filter(...)` has no cap on `entries.length`, no per-value size cap (values flow into Sanity verbatim); only `formName` is `.slice(0, 120)`. An attacker can post a 5 MB JSON body of 10 000 field pairs and the route will try to persist it.
- Impact: Storage abuse, Sanity write-quota burn, and a dataset that becomes unusable in Studio.
- Remediation: Reject bodies over ~32 KB, cap `entries.length` at 100, cap each value at 4 KB, and enforce `Content-Length` at the edge via Traefik middleware.

#### SEC-013, Enquiry email subject built from caller-controlled `page` without CRLF stripping
- Severity: Medium
- Category: A03 (SMTP header injection)
- Affected: `lib/enquiry-email.ts:122` (template literal that builds `New enquiry [em-dash] ${formName} (${page})` and slices to 160), `app/api/enquiry/route.ts:67` (`body.page ?? ""`)
- Evidence: `page` arrives from the client, is passed to `renderEnquiryEmail` without trimming CR/LF, and becomes the `subject`. Nodemailer does guard against newline injection in headers in recent versions, but the input is unsanitised and relies entirely on library behaviour.
- Impact: If a Nodemailer regression ever reintroduces the historical header-injection gap, an attacker could add `Bcc:` headers to exfiltrate every enquiry.
- Remediation: Replace all CR/LF in `formName`, `page` and `email` with spaces before interpolation.

#### SEC-014, Dashboard cookie scoped to `/lead-dashboard` but `SameSite=Lax` with no CSRF defence on server actions
- Severity: Medium
- Category: A01 Broken Access Control
- Affected: `app/lead-dashboard/login/actions.ts:48-55`, `app/lead-dashboard/handover/actions.ts` (all actions)
- Evidence: Cookie is `httpOnly`, `sameSite: "lax"`, `secure` only when `NODE_ENV==="production"`. Server actions rely on Next's built-in Origin check. The 12 h session is a long window on a shared laptop.
- Impact: `Lax` protects against cross-site POST, but a GET-initiated navigation to a crafted page can still trigger a top-level request. Combined with SEC-001 (middleware bypass) the exposure grows. The cookie's `secure` flag depends on `NODE_ENV`; in the Docker image `NODE_ENV=production` is set, but any staged preview without it would ship an unencrypted cookie.
- Remediation: Set `secure: true` unconditionally; reduce session to 4 h; add an explicit CSRF token for the reply/release/claim actions; verify `Origin` against a strict allowlist in each server action.

#### SEC-015, Draft-mode disable endpoint and other redirects are safe, but `safeNext` logic is only validated in two of three places
- Severity: Medium
- Category: Open Redirect / Access Control
- Affected: `app/api/draft-mode/disable/route.ts:9-12`, `app/lead-dashboard/login/actions.ts:16-19`, `app/lead-dashboard/login/page.tsx:26-27`, `proxy.ts:44-46`
- Evidence: Each site has its own `startsWith("/")` or `startsWith("/lead-dashboard")` check. The login page accepts `next?.startsWith("/lead-dashboard")`, the action re-validates, but divergent rules (anchor and `//` escapes) across three files are fragile.
- Impact: One missed check becomes an open redirect out of the sign-in flow or a dashboard-section pivot. Current code is correct, but defence-in-depth is weak.
- Remediation: Centralise `safeNext` into `lib/dashboard/session.ts` and import it everywhere.

#### SEC-016, No audit log on dashboard writes (handover claim/reply/release)
- Severity: Medium
- Category: A09 Security Logging and Monitoring Failures
- Affected: `app/lead-dashboard/handover/actions.ts` (all actions), `lib/dashboard/auth.ts:67-80`
- Evidence: Actions call `handover.claim/reply/release` and return; nothing on this side records who did what or when. Attribution relies on `OMH_DASHBOARD_USER` which is a static env value.
- Impact: If a reply is sent as the client that should not have been, there is no record on the website side to attribute it. Convex may hold its own log, but there is no local trail.
- Remediation: Append `{ at, action, sessionId, actor, textHash }` entries to a Convex `audit_log` table or at least `console.log` in a structured form for the Docker journald collector.

#### SEC-017, Default fallback hostnames leak internal infra
- Severity: Medium (informational-ish)
- Category: A05
- Affected: `lib/dashboard/convex.ts:16` (`https://cool-ferret-103.convex.cloud`), `lib/dashboard/handover.ts:19` (`https://cool-ferret-103.convex.site`), `public/ohm-assistant.js` (`https://n8n.srv1836598.hstgr.cloud`, `https://cool-ferret-103.convex.site`)
- Evidence: Convex deployment id and the n8n host are hard-coded as defaults and shipped to the browser via the widget.
- Impact: Attack surface is enumerable: anyone can target `cool-ferret-103.convex.site/handover/*` directly (SEC-018) and the n8n webhook URL for `ohm-chat`/`ohm-voice-token` is public.
- Remediation: Route widget calls through a first-party API prefix (`/api/widget/*`) that proxies to the right backend; move defaults out of code into env.

#### SEC-018, Widget chat and voice-token webhooks lack visible rate limiting
- Severity: Medium
- Category: API4 / API8
- Affected: `public/ohm-assistant.js` (`chatUrl`, `voiceTokenUrl` ending `/webhook/ohm-chat`, `/webhook/ohm-voice-token`)
- Evidence: Widget posts `{ session_id, visitor_id, message, page_url }` directly to the n8n webhook; `session_id` and `visitor_id` are generated client-side (`sessionStorage`/`localStorage`) and thus attacker-controlled.
- Impact: An attacker can issue voice-token requests and start arbitrary Retell calls on OMH's account, each billed per minute. There is no visible proof-of-browser (CAPTCHA, Turnstile) or server-side quota enforcement in the shipped code.
- Attack scenario: Script generates fresh visitor ids and hammers `/webhook/ohm-voice-token`, each returning an `access_token` for a billed call.
- Remediation: Terminate at a first-party route that rate-limits per IP and visitor id, verifies a Turnstile token, and caps voice tokens per hour per visitor.

#### SEC-019, LLM-shaped widget sends raw user text to backend LLM without visible guardrails
- Severity: Medium
- Category: OWASP LLM-01 Prompt Injection / LLM-04 Unbounded Consumption
- Affected: `public/ohm-assistant.js` (chat flow), backend not in this repo
- Evidence: The widget forwards the user `message` verbatim to `/webhook/ohm-chat`. No client-side length cap on input (`.compose input` is unbounded). The dashboard's `reply` action concatenates `text.trim()` straight into the Convex handover thread (`lib/dashboard/handover.ts:166`).
- Impact: Prompt injection by a visitor can steer the assistant to disclose the system prompt or produce content the client's name does not want posted; cost-amplification if the backend charges per token. Reply to visitors from the dashboard also lacks a length cap.
- Remediation: Enforce `message.length <= 2000` at the public route and in the widget; wrap backend prompts to treat `message` as data, not instruction; cap tokens-per-session per hour. Reject on `>` N emojis or repeated-char DoS patterns.

---

### Low

#### SEC-020, `cookies().set` writes `secure` only when `NODE_ENV === "production"`
- Severity: Low
- Category: A02
- Affected: `app/lead-dashboard/login/actions.ts:52`
- Evidence: `secure: process.env.NODE_ENV === "production"`
- Impact: In any non-production build served over HTTP (staging without TLS), the cookie travels in cleartext.
- Remediation: Unconditionally `secure: true`; dev HTTPS can be local Caddy or `next dev --experimental-https`.

#### SEC-021, `OMH_DASHBOARD_USER` default is a published value (`"omh"`)
- Severity: Low
- Category: A07
- Affected: `lib/dashboard/auth.ts:30`
- Impact: Removes half the credential pair for attackers who read the repo.
- Remediation: Require both to be set, refuse to boot otherwise; or drop the username field (single-field auth is honest here).

#### SEC-022, Instagram access token concatenated into URL
- Severity: Low
- Category: A09
- Affected: `lib/instagram.ts:52`
- Evidence: `` `https://graph.instagram.com/me/media?...&access_token=${encodeURIComponent(token)}` ``
- Impact: Token leaks via any upstream proxy access log or TLS SNI/HTTP debug trace. The code already notes this and avoids logging the URL, which is good; still, headers are safer.
- Remediation: Pass as `Authorization: Bearer <token>` where the Graph API supports it; otherwise accept and keep comments documenting the exposure.

#### SEC-023, No `Cache-Control: no-store` on `/api/book-demo` or `/api/enquiry` responses
- Severity: Low
- Category: A05
- Affected: `app/api/enquiry/route.ts`, `app/api/book-demo/route.ts`
- Impact: Edge or client caches could in principle retain error responses that embed internal messages. Low risk under Traefik defaults.
- Remediation: Add `headers: { "cache-control": "no-store" }` to error responses.

#### SEC-024, `scripts/*.mjs` tooling runs with devDependency chain containing Critical dompurify
- Severity: Low
- Category: A06
- Affected: `scripts/page-shots.mjs`, `scripts/audit-images.mjs`, etc. (not inspected in detail)
- Impact: If any script processes untrusted HTML with the transitive `dompurify`, see SEC-007. Build-time only, so impact is bounded to developer machines/CI.
- Remediation: Patch along with SEC-007.

#### SEC-025, `cache` map in `lib/dashboard/session.ts` is also keyed by cleartext password at the module scope
- Severity: Low (duplicate of SEC-005's second limb, re-filed as a long-term housekeeping item)
- Affected: `lib/dashboard/session.ts:21`
- Remediation: Delete the cache; HMAC-SHA-256 is fast.

---

### Informational

#### SEC-INFO-01, Proxy correctly fails-open when password is unset but site boot does not warn loudly
- `proxy.ts:30` returns `NextResponse.next()` when no `OMH_DASHBOARD_PASSWORD`. Writes refuse (`lib/dashboard/auth.ts:40-58`), which is good; still, consider a boot-time `console.error` so the condition does not pass unnoticed in a `docker compose up` log.

#### SEC-INFO-02, Positive: HMAC cookie with constant-time compare is well-executed
- `lib/dashboard/session.ts:48-54` implements a sound constant-time compare and avoids the password-in-cookie pitfall. Keep this pattern.

#### SEC-INFO-03, Positive: open-redirect defences on `next` and `redirect` params are explicit and in-file-commented
- See `proxy.ts:44-46`, `app/lead-dashboard/login/actions.ts:16-19`, `app/api/draft-mode/disable/route.ts:9-12`.

---

## Dependency Vulnerabilities Summary

`npm audit --json` (production and dev together), run read-only:

| Severity | Count |
|----------|-------|
| Critical | 2 |
| High     | 11 |
| Moderate | 18 |
| Low      | 0 |
| Total    | 31 |

Named highlights (full names in SEC-001, SEC-006, SEC-007):

- Critical: `next@16.2.10`, `dompurify` (via Sanity Studio chain).
- High: `nodemailer`, `postcss`, `sharp`, `undici`, `js-yaml`, `brace-expansion`, `smol-toml`, `source-map-js`, `vite` (dev), `zod` (dev), `adm-zip` (dev).

Recommended first step: `npm audit fix`, then manually review the `next` bump against the Next.js 16 changelog for breaking changes to `proxy.ts` conventions.

## Secrets Scan Summary

`.env.local` (local-only file, not under version control but not covered by `.gitignore`). Values redacted to first 4 characters; the following are flagged LIVE CREDENTIAL - ROTATE because this report has now described their location:

| Key | Prefix shown | Classification |
|-----|--------------|----------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `qr5j****` | Public, non-sensitive |
| `NEXT_PUBLIC_SANITY_DATASET`    | `prod****` | Public, non-sensitive |
| `RETELL_API_KEY`                | `key_****` | LIVE CREDENTIAL - ROTATE |
| `OMH_WIDGET_CONVEX_URL`         | `http****` | Hostname, info disclosure |
| `OHM_WIDGET_CONVEX_SITE`        | `"htt****` | Hostname, info disclosure |
| `OHM_WIDGET_SECRET`             | `"ohm****` | LIVE CREDENTIAL - ROTATE |
| `OMH_DASHBOARD_USER`            | `"omh****` | Low (identifier) |
| `OMH_DASHBOARD_PASSWORD`        | `"Vma****` | LIVE CREDENTIAL - ROTATE |

No secrets were found in source files, bundled widget, or `public/*` beyond the hard-coded hostnames noted in SEC-017.

## Appendix

### Files inspected (abbreviated)

- `/Users/rafiulislam/Work/n8n/OHM/website/next.config.ts`
- `/Users/rafiulislam/Work/n8n/OHM/website/proxy.ts`
- `/Users/rafiulislam/Work/n8n/OHM/website/Dockerfile`
- `/Users/rafiulislam/Work/n8n/OHM/website/docker-compose.yml`
- `/Users/rafiulislam/Work/n8n/OHM/website/.env.example`
- `/Users/rafiulislam/Work/n8n/OHM/website/.env.local` (metadata only)
- `/Users/rafiulislam/Work/n8n/OHM/website/.gitignore`
- `/Users/rafiulislam/Work/n8n/OHM/website/app/layout.tsx`
- `/Users/rafiulislam/Work/n8n/OHM/website/app/api/enquiry/route.ts`
- `/Users/rafiulislam/Work/n8n/OHM/website/app/api/book-demo/route.ts`
- `/Users/rafiulislam/Work/n8n/OHM/website/app/api/revalidate/route.ts`
- `/Users/rafiulislam/Work/n8n/OHM/website/app/api/draft-mode/enable/route.ts`
- `/Users/rafiulislam/Work/n8n/OHM/website/app/api/draft-mode/disable/route.ts`
- `/Users/rafiulislam/Work/n8n/OHM/website/app/lead-dashboard/login/page.tsx`
- `/Users/rafiulislam/Work/n8n/OHM/website/app/lead-dashboard/login/actions.ts`
- `/Users/rafiulislam/Work/n8n/OHM/website/app/lead-dashboard/handover/actions.ts`
- `/Users/rafiulislam/Work/n8n/OHM/website/lib/dashboard/auth.ts`
- `/Users/rafiulislam/Work/n8n/OHM/website/lib/dashboard/session.ts`
- `/Users/rafiulislam/Work/n8n/OHM/website/lib/dashboard/handover.ts`
- `/Users/rafiulislam/Work/n8n/OHM/website/lib/dashboard/convex.ts`
- `/Users/rafiulislam/Work/n8n/OHM/website/lib/dashboard/retell.ts`
- `/Users/rafiulislam/Work/n8n/OHM/website/lib/sanity/client.ts`
- `/Users/rafiulislam/Work/n8n/OHM/website/lib/sanity/token.ts`
- `/Users/rafiulislam/Work/n8n/OHM/website/lib/sanity/insights.ts`
- `/Users/rafiulislam/Work/n8n/OHM/website/lib/sanity/portable-text.ts`
- `/Users/rafiulislam/Work/n8n/OHM/website/lib/enquiry-email.ts`
- `/Users/rafiulislam/Work/n8n/OHM/website/lib/instagram.ts`
- `/Users/rafiulislam/Work/n8n/OHM/website/lib/content/insight-toc.ts`
- `/Users/rafiulislam/Work/n8n/OHM/website/components/insights/InsightArticle.tsx`
- `/Users/rafiulislam/Work/n8n/OHM/website/public/ohm-assistant.js`
- `/Users/rafiulislam/Work/n8n/OHM/website/package.json`, `package-lock.json`

### Commands run

- `ls`, `find`, `wc -l`, `cat`, `head`, `sed -n` on files above (read-only).
- `grep -rni "dangerouslySetInnerHTML|eval(|innerHTML|document.write" app/ components/ lib/`
- `grep -rn "Content-Security-Policy|X-Frame|Strict-Transport|Referrer-Policy|X-Content-Type|Permissions-Policy|headers()" app/ lib/ next.config.ts`
- `npm audit --json` (no network write, no `fix` applied).

No destructive commands were executed. No code was modified. No paid APIs were called.
