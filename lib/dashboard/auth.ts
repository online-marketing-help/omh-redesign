import "server-only";
import { cookies } from "next/headers";
import { COOKIE, dashboardToken, sameToken } from "./session";

/* =========================================================================
   Who is allowed into the dashboard.

   This mattered less when the dashboard only read: a stranger who found the
   URL saw a client's call list, which is bad but passive. Handover changes
   that. The reply box writes into a live conversation with a member of the
   public, under Online Marketing Help's name. An open text box that speaks as
   the client is not something to leave on the internet.

   So the rule is fail closed. With no password configured, the pages still
   render and still read, and every write refuses. The alternative, defaulting
   to open, would mean a missing environment variable silently published the
   ability to talk to the client's visitors.

   It was browser basic auth first. That worked, but the sign-in was a native
   browser dialog: unbranded, impossible to explain an error in, and awkward
   to sign out of. It is a proper page and a cookie now. See session.ts for
   what is in the cookie and why it is not the password.
   ========================================================================= */

const USER = process.env.OMH_DASHBOARD_USER || "omh";
const PASSWORD = process.env.OMH_DASHBOARD_PASSWORD || "";

/** Whether a password has been set at all. */
export const dashboardLocked = Boolean(PASSWORD);

/** The person's own name, for signing a reply in the handover thread. */
export const dashboardUser = USER;

export async function isSignedIn(): Promise<boolean> {
  if (!PASSWORD) return false;
  const jar = await cookies();
  return sameToken(jar.get(COOKIE)?.value, await dashboardToken(PASSWORD));
}

/** True when the supplied credentials are the configured ones. */
export async function checkPassword(user: string, password: string): Promise<boolean> {
  if (!PASSWORD) return false;
  /* The user name is a label rather than a second secret, so it is compared
     loosely on case and spacing; the password is not. */
  if (user.trim().toLowerCase() !== USER.toLowerCase()) return false;
  const want = await dashboardToken(PASSWORD);
  const got = await dashboardToken(password);
  return sameToken(got, want);
}

/**
 * Called by every server action that writes.
 *
 * Checking in the action as well as in the proxy is deliberate: a server
 * action is a POST endpoint of its own, and someone who knows its id can call
 * it without ever loading the page the proxy guards.
 */
export async function assertCanWrite(): Promise<
  { ok: true; who: string } | { ok: false; why: string }
> {
  if (!PASSWORD) {
    return {
      ok: false,
      why:
        "The dashboard has no password set, so replying to a visitor is switched off. " +
        "Set OMH_DASHBOARD_USER and OMH_DASHBOARD_PASSWORD to turn it on.",
    };
  }
  if (!(await isSignedIn())) {
    return { ok: false, why: "Your sign-in has expired. Reload the page and sign in again." };
  }
  return { ok: true, who: USER };
}
