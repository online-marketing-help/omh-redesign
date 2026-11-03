/* =========================================================================
   The dashboard session token.

   Deliberately tiny and free of side effects, because both the proxy and the
   server actions derive the token and the proxy must not depend on shared
   state. It is a pure function of the password and nothing else.

   The cookie holds an HMAC of a fixed string keyed by the password, not the
   password itself. So a cookie read off a machine cannot be turned back into
   the password, and the server can check a cookie without storing a session
   anywhere: there is no session table to grow, expire or get out of step.

   Web Crypto rather than node:crypto, because the proxy may run on the edge
   runtime where node:crypto is not available.
   ========================================================================= */

const COOKIE = "omh_dash";
const LABEL = "omh-dashboard-session-v1";

export { COOKIE };

/** How long a sign-in lasts: one working day, so a laptop left on a desk
    overnight is signed out by the morning. */
export const SESSION_SECONDS = 12 * 60 * 60;

const cache = new Map<string, string>();

export async function dashboardToken(password: string): Promise<string> {
  const hit = cache.get(password);
  if (hit) return hit;

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(LABEL));
  const token = btoa(String.fromCharCode(...new Uint8Array(sig)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  cache.set(password, token);
  return token;
}

/**
 * Compares in constant time.
 *
 * A plain `===` on a secret leaks its length and, in principle, how many
 * leading characters were right, because it stops at the first difference.
 * The cost of not caring is small here and the cost of caring is nothing.
 */
export function sameToken(a: string | undefined, b: string): boolean {
  if (!a || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
