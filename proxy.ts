import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { COOKIE, dashboardToken, sameToken } from "@/lib/dashboard/session";

/* =========================================================================
   The dashboard is not public.

   It shows a client's calls, their leads and, since handover, a box that
   types into a live conversation with a member of the public under their
   name. None of that belongs on an open URL.

   Named proxy.ts, not middleware.ts: the middleware file convention is
   deprecated in Next 16 and renamed to proxy. See
   node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md

   It was basic auth first, which meant the browser's own grey dialog. This
   sends anyone without a valid cookie to a real sign-in page instead, so the
   first thing a client sees is Online Marketing Help rather than a system
   prompt, and a wrong password can be explained rather than just repeated.

   With no password set the dashboard stays open, so nothing a developer does
   locally breaks. The writes are what refuse: see lib/dashboard/auth.ts.
========================================================================= */

const PASSWORD = process.env.OMH_DASHBOARD_PASSWORD || "";

/* =========================================================================
   Maintenance mode.

   Put MAINTENANCE_MODE=1 in the server's .env and recreate the container
   (docker compose up -d) to take the public site down. Every public page
   then answers 503 with a Retry-After header, which tells search engines
   the outage is temporary, so indexed pages and rankings are kept.

   To bring the site back, remove the line (or set it to 0) and run
   docker compose up -d again. No rebuild is needed to switch it.

   The lead dashboard and the /api routes are left running, so client
   dashboards and the embedded assistant keep working while the site is down.
========================================================================= */

const MAINTENANCE = ["1", "true", "on"].includes(
  (process.env.MAINTENANCE_MODE || "").trim().toLowerCase(),
);

const MAINTENANCE_HTML = `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Back shortly | Online Marketing Help</title>
<style>
  :root { color-scheme: light dark; }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    min-height: 100vh;
    display: grid;
    place-items: center;
    padding: 24px 16px;
    background: #f7f6f2;
    color: #101828;
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
    font-size: 18px;
    line-height: 1.6;
  }
  main { max-width: 560px; text-align: center; }
  .eyebrow {
    font-size: 13px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #8f5a0e;
    font-weight: 600;
    margin: 0 0 12px;
  }
  h1 { font-size: 34px; line-height: 1.2; margin: 0 0 16px; font-weight: 600; }
  p { margin: 0 0 16px; }
  a { color: #8f5a0e; }
  .contact { margin-top: 28px; font-size: 16px; }
  @media (prefers-color-scheme: dark) {
    body { background: #101828; color: #f7f6f2; }
    .eyebrow, a { color: #d79a37; }
  }
</style>
</head>
<body>
<main>
  <p class="eyebrow">Online Marketing Help</p>
  <h1>We'll be back shortly</h1>
  <p>Our website is down for planned maintenance. Thanks for your patience.</p>
  <p class="contact">Need us now? Call <a href="tel:+442034893934">020 3489 3934</a>
  or email <a href="mailto:support@onlinemarketinghelp.co.uk">support@onlinemarketinghelp.co.uk</a>.</p>
</main>
</body>
</html>`;

function maintenanceResponse() {
  return new NextResponse(MAINTENANCE_HTML, {
    status: 503,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "retry-after": "3600",
      "cache-control": "no-store",
      "x-robots-tag": "noindex",
    },
  });
}

/* Tells the root layout that this request is for the dashboard.

   The dashboard is an internal tool, so the marketing site's analytics have
   no business running on it. Plerdy proved the point: its script writes
   `plerdy-tracking-id` attributes into the DOM before React hydrates, so the
   markup React found was not the markup the server sent, and every dashboard
   page threw a hydration error.

   A request header rather than a pathname test inside the layout, because the
   layout is shared with the public site and should not grow a list of routes
   it treats differently. This file already knows which requests are the
   dashboard; it is the right place to say so. */
export const DASHBOARD_HEADER = "x-omh-dashboard";

function pass(request: NextRequest) {
  const headers = new Headers(request.headers);
  headers.set(DASHBOARD_HEADER, "1");
  return NextResponse.next({ request: { headers } });
}

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const isDashboard =
    pathname === "/lead-dashboard" || pathname.startsWith("/lead-dashboard/");

  /* Everything outside the dashboard is the public site. */
  if (!isDashboard) {
    if (MAINTENANCE && !pathname.startsWith("/api/")) return maintenanceResponse();
    return NextResponse.next();
  }

  /* The sign-in page itself must stay reachable, or there is no way in. */
  if (pathname === "/lead-dashboard/login") return pass(request);

  if (!PASSWORD) return pass(request);

  const token = await dashboardToken(PASSWORD);
  if (sameToken(request.cookies.get(COOKIE)?.value, token)) return pass(request);

  const to = request.nextUrl.clone();
  to.pathname = "/lead-dashboard/login";
  to.search = "";
  /* Where they were heading, so signing in lands them there rather than on
     the overview. Only ever a path on this site: `next` is read back as a
     pathname and rejected if it is not one, so it cannot become an open
     redirect to someone else's domain. */
  if (pathname !== "/lead-dashboard") to.searchParams.set("next", pathname + search);

  const res = NextResponse.redirect(to);
  res.headers.set("cache-control", "no-store");
  res.headers.set("x-robots-tag", "noindex, nofollow");
  return res;
}

export const config = {
  /* Every page, so maintenance mode can cover the whole public site.
     Static build files, images and anything with a file extension (the
     files in public/) are skipped, so they never pass through here. */
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
