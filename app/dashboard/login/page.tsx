import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { SignInForm } from "@/components/dashboard/SignInForm";
import { isSignedIn, dashboardUser, dashboardLocked } from "@/lib/dashboard/auth";
import { IconPhone, IconChat, IconHandover } from "@/components/dashboard/icons";

export const metadata: Metadata = {
  title: "Sign in | Online Marketing Help",
  robots: { index: false, follow: false, nocache: true },
};

export const dynamic = "force-dynamic";

/* The sign-in page.

   It is the first screen a client ever sees of this product, often on a
   laptop turned round in a meeting, so it is not a form floating on a white
   page. Two panes: the dark brand side saying what this is, and the form.
   Below 1024px the brand side becomes a short header, because on a phone a
   half screen of marketing above a password field is just scrolling. */

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  /* Already in: nobody should be made to sign in twice. */
  if (await isSignedIn()) redirect("/dashboard");

  const { next } = await searchParams;
  const target = next?.startsWith("/dashboard") && !next.startsWith("//") ? next : "/dashboard";

  return (
    <div id="omh-dashboard" className="min-h-dvh bg-warm text-ink lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
      <Brand />

      {/* Centred in its own column on a laptop. On a phone the brand panel is
          already above it, so a second full screen height put the password
          field below the fold with nothing in between. */}
      <main className="flex items-center justify-center px-5 py-10 sm:px-8 lg:min-h-dvh lg:py-12">
        <div className="w-full max-w-[400px]">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[.14em] text-amber-deep">
            Client dashboard
          </p>
          <h1 className="mt-2 font-sans text-[30px] font-semibold leading-[1.1] tracking-[-.03em] sm:text-[34px]">
            Sign in
          </h1>
          <p className="mt-2.5 max-w-[42ch] text-[14.5px] leading-relaxed text-muted">
            {dashboardLocked
              ? "Your assistant's calls, conversations and appointments, and the queue of people waiting for a person."
              : "No password is set on this server yet, so there is nothing to sign in to. Set OMH_DASHBOARD_USER and OMH_DASHBOARD_PASSWORD."}
          </p>

          <SignInForm user={dashboardUser} next={target} />

          <p className="mt-8 border-t border-line pt-5 text-[13px] leading-relaxed text-muted">
            Not expecting this?{" "}
            <Link
              href="/"
              className="font-medium underline decoration-line underline-offset-4 outline-none transition-colors duration-150 hover:decoration-[var(--accent)] focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            >
              Back to the website
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

/** The dark side. Same inverse surface as the dashboard rail, so signing in
    already looks like the thing you are signing in to. */
function Brand() {
  const points = [
    { icon: IconPhone, title: "Every call", body: "Length, recording, transcript and what it was about." },
    { icon: IconChat, title: "Every conversation", body: "What visitors asked, what they left, what was booked." },
    { icon: IconHandover, title: "Anyone waiting", body: "Questions the assistant passed to a person, answered here." },
  ];

  return (
    <aside
      className="relative overflow-hidden bg-inverse px-6 py-9 text-oninverse sm:px-10 lg:flex lg:min-h-dvh lg:flex-col lg:justify-between lg:py-12"
      style={{
        backgroundImage:
          "radial-gradient(42rem 30rem at 12% 0%, rgb(var(--accent-rgb) / .17), transparent 62%)",
      }}
    >
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="font-sans text-[22px] font-bold tracking-[-.025em] text-oninverse outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-inverse)]"
        >
          OMH<span style={{ color: "var(--accent)" }}>.</span>
        </Link>
        <span className="rounded-full border border-white/15 px-2.5 py-1 font-sans text-[10.5px] font-semibold uppercase tracking-[.14em] text-white/60">
          Dashboard
        </span>
      </div>

      {/* The headline and the three points are the half a client reads while
          someone else types the password, so they say what the product does
          rather than welcoming anybody. */}
      <div className="mt-8 lg:mt-0 lg:max-w-[30rem]">
        <h2 className="font-sans text-[26px] font-semibold leading-[1.15] tracking-[-.025em] sm:text-[34px] lg:text-[40px]">
          Everything your AI assistant
          <span className="block" style={{ color: "var(--accent)" }}>
            handled for you.
          </span>
        </h2>

        <ul className="mt-7 space-y-4 lg:mt-9">
          {points.map((p) => (
            <li key={p.title} className="flex gap-3.5">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] bg-white/[.08] text-oninverse shadow-[inset_0_1px_0_rgb(255_255_255/.1)]">
                <p.icon className="h-[17px] w-[17px]" />
              </span>
              <span className="min-w-0">
                <span className="block font-sans text-[14.5px] font-semibold">{p.title}</span>
                <span className="mt-0.5 block text-[13.5px] leading-relaxed text-white/60">
                  {p.body}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-9 hidden items-center gap-2 border-t border-white/10 pt-6 font-sans text-[11px] font-semibold uppercase tracking-[.1em] text-white/60 lg:flex">
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: "var(--accent)" }}
        />
        Live data
      </p>
    </aside>
  );
}
