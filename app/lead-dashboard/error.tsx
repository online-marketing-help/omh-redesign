"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useTransition } from "react";
import { TABS } from "@/lib/dashboard/screens";

/* =========================================================================
   When a screen cannot be built.

   Every one of these pages reads Convex, and the Calls screen reads Retell
   as well. Those are network calls to other people's services, and they
   fail: a deployment running out of its free plan did exactly that for an
   hour on 2026-11-10, and every route returned an error.

   Without this file that is the framework's own error page, which tells
   somebody at OMH nothing they can act on and loses the rail, so they
   cannot even click to another screen.

   What it deliberately does NOT do is guess at the cause. "Something went
   wrong" with a Try again button is honest; "the database is down" might
   not be true, and being told the wrong reason is worse than being told
   none.

   Not the rail itself: this is a client component, and `Rail` lives in
   Shell.tsx, which reads cookies. But the LIST is plain data, so it moved
   to lib/dashboard/screens.ts and every screen is reachable from here.

   That matters more than it sounds. The first version offered "try again"
   and "go to the overview", and if the screen that failed WAS the
   overview, both of those returned to the same error with no way out.
   ========================================================================= */

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    /* The digest is what ties this to the line in the server logs. It is
       the only thing here worth quoting to whoever is looking. */
    console.error("Dashboard screen failed:", error.digest ?? "", error.message);
  }, [error]);

  /* `reset()` re-renders the same segment. When the cause is persistent -
     the deployment out of its free plan, which is the case this file was
     written for - it throws again at once and renders an identical card.
     Without a pending state nothing on screen changes, the button reads as
     broken, and the natural response is to press it repeatedly. */
  const [retrying, retry] = useTransition();

  return (
    <div id="omh-dashboard" className="min-h-dvh bg-warm text-ink">
      <div>
        <main className="mx-auto max-w-[1400px] px-5 py-10 sm:px-7">
          <div className="max-w-[60ch] rounded-xl border border-line bg-surface p-6">
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[.14em] text-[var(--dash-accent-text)]">
              AI assistant
            </p>
            <h1 className="mt-1.5 font-sans text-[24px] font-semibold tracking-[-.02em]">
              This screen did not load
            </h1>
            <p className="mt-3 text-[14.5px] leading-relaxed text-muted">
              Something it needed did not answer. Nothing has been changed or
              lost, and the other screens may still be working.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <button
                type="button"
                disabled={retrying}
                onClick={() => retry(() => reset())}
                className="min-h-11 cursor-pointer rounded-lg bg-inverse px-4 text-[14px] font-semibold text-oninverse outline-none transition-opacity duration-150 hover:opacity-90 focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              >
                {retrying ? "Trying…" : "Try again"}
              </button>
              <Link
                href="/lead-dashboard"
                className="inline-flex min-h-11 cursor-pointer items-center rounded-lg border border-line bg-surface px-4 text-[14px] font-semibold outline-none transition-colors duration-150 hover:bg-warm focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              >
                Go to the overview
              </Link>
            </div>

            <div className="mt-6 border-t border-line pt-4">
              <p className="text-[12px] font-semibold uppercase tracking-[.08em] text-muted">
                Or go somewhere else
              </p>
              <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5">
                {TABS.map((t) => (
                  <li key={t.href}>
                    <Link
                      href={t.href}
                      className="text-[13.5px] text-[var(--dash-accent-text)] underline underline-offset-4 outline-none hover:no-underline focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                    >
                      {t.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {error.digest && (
              /* Shown, not hidden. If OMH ring about it, this is the one
                 thing that finds the right line in the logs. */
              <p className="mt-5 border-t border-line pt-4 text-[12.5px] text-muted">
                If you need to report it, quote this reference:{" "}
                <code className="rounded bg-warm px-1.5 py-0.5 font-mono text-[12px] text-ink">
                  {error.digest}
                </code>
              </p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
