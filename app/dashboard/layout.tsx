import type { Metadata } from "next";

/* Not public. It is excluded from robots.ts, it is not in the sitemap because
   that is derived from readyPages, and nothing on the site links to it.

   Unlisted is not the same as protected, so proxy.ts puts a password in front
   of /dashboard as soon as one is configured, and the handover reply box
   refuses to send until it is. See lib/dashboard/auth.ts. */
export const metadata: Metadata = {
  title: "Client dashboard | Online Marketing Help",
  robots: { index: false, follow: false, nocache: true },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* The dashboard sits inside the site's root layout, so it inherited the
          marketing header, the full footer and the floating "Ask the
          assistant" button, which covered the calls table. A client dashboard
          should not be wrapped in the sales furniture of the site.

          Rather than branch the root layout, which another developer is
          working in, this hides every top-level sibling of <main> while a
          dashboard page is mounted. Matching on "not main" instead of naming
          each component means it keeps working when one of them changes the
          element it renders. The skip link and the analytics scripts stay. */}
      <style>{`
        body:has(#omh-dashboard) > *:not(main):not(script):not(a[href="#main"]) {
          display: none !important;
        }

        /* ---------------------------------------------------------------
           The material the dashboard is made of.

           Scoped to #omh-dashboard so none of it reaches the public site,
           and written as tokens so the components below stay readable.

           Shadows are layered rather than single. One soft blur reads as a
           sticker dropped on the page; a tight contact shadow under a wider,
           fainter one is how a real edge catches light, and it is the whole
           difference between a box and a surface. The values are the brand's
           own ink at low alpha, so nothing introduces a new colour.
           --------------------------------------------------------------- */
        #omh-dashboard {
          --e1:
            0 1px 1px rgb(16 24 40 / .04),
            0 2px 4px -1px rgb(16 24 40 / .04);
          --e2:
            0 1px 1px rgb(16 24 40 / .05),
            0 4px 10px -2px rgb(16 24 40 / .07),
            0 12px 28px -8px rgb(16 24 40 / .06);
          --e3:
            0 1px 2px rgb(16 24 40 / .07),
            0 8px 20px -4px rgb(16 24 40 / .1),
            0 24px 48px -12px rgb(16 24 40 / .12);
          /* A hairline drawn in the surface colour above the border, so a card
             edge has the two-tone bevel a printed card has. */
          --ring-inset: inset 0 1px 0 rgb(255 255 255 / .6);
        }
        /* In dark mode a white inset hairline is the only thing that keeps a
           card edge from dissolving into the page, but at .6 it reads as a
           glare line, so it is cut right back. The shadows are deepened
           because ink on ink is nearly invisible. */
        [data-theme="dark"] #omh-dashboard,
        :root:not([data-theme="light"]) #omh-dashboard {
          --ring-inset: inset 0 1px 0 rgb(255 255 255 / .06);
        }
        @media (prefers-color-scheme: dark) {
          :root:not([data-theme="light"]) #omh-dashboard {
            --e1: 0 1px 2px rgb(0 0 0 / .4);
            --e2: 0 1px 2px rgb(0 0 0 / .4), 0 6px 16px -4px rgb(0 0 0 / .45);
            --e3: 0 2px 4px rgb(0 0 0 / .45), 0 16px 36px -8px rgb(0 0 0 / .55);
          }
        }
        [data-theme="dark"] #omh-dashboard {
          --e1: 0 1px 2px rgb(0 0 0 / .4);
          --e2: 0 1px 2px rgb(0 0 0 / .4), 0 6px 16px -4px rgb(0 0 0 / .45);
          --e3: 0 2px 4px rgb(0 0 0 / .45), 0 16px 36px -8px rgb(0 0 0 / .55);
        }

        /* The page itself is not a flat fill. A single very faint radial of
           the brand tan at the top left gives the warm background somewhere
           to come from, which is most of what separates an expensive-looking
           panel from a grey one. It is 3% of one colour: at this strength it
           is felt rather than seen, and it never sits under text.

           isolation:isolate plus z-index:-1 is what keeps this behind the
           content without touching a single child. The first version gave
           every direct child position:relative to lift it above the wash, and
           that beat the rail's own position:fixed on specificity, which
           put the rail back in the flow and pushed the whole page down by its
           height. Nothing that only decorates should alter layout. */
        #omh-dashboard { isolation: isolate; }

        /* ---------------------------------------------------------------
           Accent-coloured text.

           The site's accent is a single dark brown. On white it is a strong
           5.6:1, which is why eyebrows and KPI labels use it. On the dark
           theme's black it falls to 3.3:1, under the 4.5 this size needs.
           globals.css intends to lighten it there (--color-amber-deep is set
           to --accent-light in the dark block) but --accent-light now holds
           the same brown, so the lightening does nothing.

           Rather than redefine a site-wide token from inside the dashboard,
           which would change every page, these screens read their own: the
           brand brown in the light theme, plain ink in the dark one. No new
           colour is introduced either way.
           --------------------------------------------------------------- */
        #omh-dashboard { --dash-accent-text: var(--color-amber-deep); }
        [data-theme="dark"] #omh-dashboard { --dash-accent-text: var(--color-ink); }
        @media (prefers-color-scheme: dark) {
          :root:not([data-theme="light"]) #omh-dashboard {
            --dash-accent-text: var(--color-ink);
          }
        }
        #omh-dashboard::before {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: -1;
          background:
            radial-gradient(60rem 40rem at 18% -10%, rgb(var(--accent-rgb) / .07), transparent 60%),
            radial-gradient(40rem 30rem at 100% 0%, rgb(var(--accent-rgb) / .05), transparent 55%);
        }

        /* Cards arrive, rather than appearing. 320ms and 24ms apart: enough to
           read as one wave settling, far too short to wait for. Only on first
           paint, never on a hover or an update, and the transform is removed
           at the end so nothing is left in a composited layer. */
        @keyframes omh-rise {
          from { opacity: 0; transform: translate3d(0, 10px, 0); }
          to   { opacity: 1; transform: none; }
        }
        #omh-dashboard [data-rise] {
          animation: omh-rise .32s cubic-bezier(.22, 1, .36, 1) both;
          animation-delay: calc(var(--i, 0) * 24ms);
        }

        /* Anyone who has asked their system not to animate things gets the
           finished state immediately. Not a shorter animation: none. */
        @media (prefers-reduced-motion: reduce) {
          #omh-dashboard [data-rise] { animation: none; }
          #omh-dashboard * {
            transition-duration: .01ms !important;
            animation-duration: .01ms !important;
          }
        }
      `}</style>
      {children}
    </>
  );
}
