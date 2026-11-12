import { Rail } from "./Shell";
import type { Screen } from "@/lib/dashboard/screens";

/* =========================================================================
   What is on screen while a screen is being fetched.

   Measured before this existed: clicking Overview left the browser on the
   previous page for 1.9 seconds with no sign anything was happening.
   Campaigns 1.2s, Channels 1.0s. Every one of these pages is a server
   component that reads Convex and, for Calls, Retell as well, and on the
   live deployment those are network hops rather than localhost.

   Two rules this follows, and they fight each other if you are careless:

   1. **The furniture arrives instantly.** The rail, the eyebrow and the
      page title are known before any data is. They are rendered here for
      real, not as grey boxes, so a click feels like it landed and the
      person can already read where they are.

   2. **The shape does not change when the data lands.** The placeholder
      blocks carry the same heights and the same grid as the real content,
      so nothing jumps. A skeleton that is the wrong size is worse than a
      spinner: it moves the thing you were about to click.

   The rail is the real `Rail` with no counts rather than a copy of it. A
   second hand-maintained rail would drift from the first, and the one in
   the loading state is the one nobody would notice had drifted.

   **Known limitation: the skeleton does not know about the example data.**
   `loading.tsx` receives no props and no search params, so it cannot tell
   whether `?demo=1` is on. Two consequences, one handled and one not. The
   rail is made inert here, so it cannot send somebody out of demo mode by
   accident. The demo banner is NOT rendered, so in example mode the page
   does shift down by its height when the real screen arrives. Fixing that
   needs the flag somewhere the skeleton can read, such as a cookie, and is
   worth doing the next time that banner is touched.
   ========================================================================= */

export function DashboardLoading({ screen }: { screen: Screen }) {
  const { active, title, lead, shape } = screen;
  return (
    <div id="omh-dashboard" className="min-h-dvh bg-warm text-ink">
      {/* Inert.

          The rail is the real one, but during the skeleton it cannot know
          whether the example data is on, and `Rail` appends `?demo=1` to
          every link only when it does. A live rail here would therefore
          send somebody out of demo mode mid-demonstration, into mostly
          empty real figures, which is precisely what that link-building
          exists to prevent. It is a placeholder for about 150ms; making it
          unclickable for that long is cheaper than the alternative. */}
      <div aria-hidden="true" className="pointer-events-none">
        <Rail active={active} counts={{}} urgent={[]} demo={false} />
      </div>

      <div className="lg:pl-[248px]">
        <header className="border-b border-line">
          <div className="mx-auto flex max-w-[1400px] flex-wrap items-end justify-between gap-x-6 gap-y-3 px-5 py-6 sm:px-7 sm:py-7">
            <div className="min-w-0">
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[.14em] text-[var(--dash-accent-text)]">
                AI assistant
              </p>
              <h1 className="mt-1.5 font-sans text-[26px] font-semibold leading-[1.1] tracking-[-.025em] sm:text-[30px]">
                {title}
              </h1>
              <p className="mt-2 max-w-[68ch] text-[14px] leading-relaxed text-muted">{lead}</p>
            </div>
          </div>
        </header>

        {/* aria-busy and a polite status, so a screen reader is told the
            page is still arriving instead of being read an empty one. The
            blocks themselves are hidden from it: forty grey rectangles
            announced one by one is noise. */}
        <main
          aria-busy="true"
          className="mx-auto max-w-[1400px] px-5 py-6 sm:px-7 sm:py-7"
        >
          <p className="sr-only" role="status">
            Loading {title}.
          </p>
          <div aria-hidden="true">{SHAPES[shape]}</div>
        </main>
      </div>
    </div>
  );
}

/* One soft pulse, not a shimmer sweeping across the screen. At this size a
   sweep reads as something arriving and then being taken away again.
   `motion-reduce` stops it entirely for anyone who asked for that. */
/* `bg-line` rather than a hand-mixed tint. The first attempt used
   rgb(var(--ink-rgb)/.06); --ink-rgb does not exist in this project, so the
   colour resolved to nothing and every placeholder rendered invisible. It
   looked fine in the markup and the screenshot showed an empty page.
   bg-line is a real token, it is defined for both themes, and the rest of
   the dashboard already uses it. */
const BLOCK = "animate-pulse bg-line motion-reduce:animate-none";

function Bar({ w, h = 11 }: { w: string; h?: number }) {
  return <div className={`${BLOCK} rounded`} style={{ width: w, height: h }} />;
}

function Panel({ h, children }: { h?: number; children?: React.ReactNode }) {
  return (
    <div
      className="rounded-xl border border-line bg-surface p-4"
      style={h ? { height: h } : undefined}
    >
      {children}
    </div>
  );
}

/* Cells of different widths, not one solid bar.

   The first version drew each row as a single full-width block with
   one-pixel gaps, and on screen that read as a grey slab rather than as a
   table: nothing in it looked like a row, so it looked like something had
   gone wrong rather than like something arriving. Varying the widths is
   what makes a skeleton read as text. */
function Row() {
  return (
    <div className="flex items-center gap-4 border-t border-line px-4 py-3.5">
      <Bar w="22%" />
      <Bar w="28%" />
      <Bar w="14%" />
      <div className="ml-auto flex items-center gap-3">
        <Bar w="56px" />
        <Bar w="40px" />
      </div>
    </div>
  );
}

const SHAPES: Record<string, React.ReactNode> = {
  /* Overview: the summary strip, a row of figures, then two panels. */
  cards: (
    <div className="grid gap-3">
      <Panel h={104}>
        <Bar w="42%" h={13} />
        <div className="mt-3"><Bar w="24%" /></div>
      </Panel>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, i) => (
          <Panel key={i} h={118}>
            <Bar w="55%" />
            <div className="mt-4"><Bar w="38%" h={22} /></div>
          </Panel>
        ))}
      </div>
      <div className="grid gap-3 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <Panel h={400}><Bar w="30%" h={13} /></Panel>
        <Panel h={400}><Bar w="40%" h={13} /></Panel>
      </div>
    </div>
  ),
  /* Leads, Calls, Campaigns, Follow-ups: a toolbar, then rows. */
  table: (
    <div className="grid gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <Bar w="220px" h={38} />
        <Bar w="110px" h={38} />
        <Bar w="110px" h={38} />
      </div>
      <div className="overflow-hidden rounded-xl border border-line bg-surface">
        <div className="flex items-center gap-4 px-4 py-3">
          <Bar w="18%" /><Bar w="24%" /><Bar w="12%" />
          <div className="ml-auto"><Bar w="70px" /></div>
        </div>
        {Array.from({ length: 8 }, (_, i) => <Row key={i} />)}
      </div>
    </div>
  ),
  split: (
    <div className="grid gap-3 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] xl:items-start">
      <div className="grid gap-3">
        <Panel h={240}><Bar w="34%" h={13} /></Panel>
        <Panel h={360}><Bar w="28%" h={13} /></Panel>
      </div>
      <div className="grid gap-3">
        <Panel h={190}><Bar w="46%" h={13} /></Panel>
        <Panel h={230}><Bar w="40%" h={13} /></Panel>
      </div>
    </div>
  ),
  form: (
    <div className="grid max-w-[760px] gap-3">
      <Panel h={150}><Bar w="36%" h={13} /></Panel>
      <Panel h={190}><Bar w="44%" h={13} /></Panel>
      <Panel h={150}><Bar w="30%" h={13} /></Panel>
    </div>
  ),
};
