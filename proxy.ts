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

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  /* The sign-in page itself must stay reachable, or there is no way in. */
  if (pathname === "/lead-dashboard/login") return NextResponse.next();

  if (!PASSWORD) return NextResponse.next();

  const token = await dashboardToken(PASSWORD);
  if (sameToken(request.cookies.get(COOKIE)?.value, token)) return NextResponse.next();

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
  /* Only the dashboard. Without a matcher this would run on every request,
     including the public site, its static files and its images. */
  matcher: "/lead-dashboard/:path*",
};
