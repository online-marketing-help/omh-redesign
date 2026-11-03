"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { checkPassword, dashboardLocked } from "@/lib/dashboard/auth";
import { COOKIE, dashboardToken, SESSION_SECONDS } from "@/lib/dashboard/session";

/* Signing in and out. Both set the cookie and then redirect, so the browser
   lands on a fresh request that the proxy sees with the new state. */

export type SignInState = { error?: string };

/** Only ever a path on this site. A `next` of "https://elsewhere.example"
    would otherwise turn the sign-in form into an open redirect. */
function safeNext(next: unknown): string {
  const s = typeof next === "string" ? next : "";
  return s.startsWith("/lead-dashboard") && !s.startsWith("//") ? s : "/lead-dashboard";
}

export async function signIn(_prev: SignInState, form: FormData): Promise<SignInState> {
  const user = String(form.get("user") ?? "");
  const password = String(form.get("password") ?? "");
  const next = safeNext(form.get("next"));

  if (!dashboardLocked) {
    return {
      error:
        "No password is set on this server, so there is nothing to sign in to. " +
        "Set OMH_DASHBOARD_USER and OMH_DASHBOARD_PASSWORD.",
    };
  }
  if (!password) return { error: "Enter your password." };

  if (!(await checkPassword(user, password))) {
    /* A fixed pause on failure. This is a public POST endpoint with one
       shared password behind it, so without something here a script could
       try it as fast as the network allows. Half a second is nothing to a
       person who mistyped and a great deal to anyone working through a list.
       It is not rate limiting; if this ever faces the open internet properly
       it wants a per-address counter as well. */
    await new Promise((r) => setTimeout(r, 500));
    /* One message for both a wrong name and a wrong password. Saying which
       was wrong tells someone guessing that they have half of it. */
    return { error: "That name and password do not match." };
  }

  const jar = await cookies();
  jar.set(COOKIE, await dashboardToken(password), {
    httpOnly: true,
    sameSite: "lax",
    /* Scoped to the dashboard: the public site never needs to see it. */
    path: "/lead-dashboard",
    secure: process.env.NODE_ENV === "production",
    maxAge: SESSION_SECONDS,
  });

  redirect(next);
}

export async function signOut() {
  const jar = await cookies();
  jar.delete({ name: COOKIE, path: "/lead-dashboard" });
  redirect("/lead-dashboard/login");
}
