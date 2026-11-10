import Link from "next/link";
import { allocate } from "@/widget/gates/allocation.js";
import { sourceLabel, money } from "@/lib/dashboard/channels";
import type { ChannelFact } from "@/lib/dashboard/routing";

/* =========================================================================
   Where the money should go next month.

   The Channels report answers "what did each channel do". This answers a
   different question, and that is the only reason both exist: a channel with
   forty leads and two bookings and one with ten leads and five are both just
   rows in a table, and which one deserves next month's budget only appears
   when volume and conversion are read against each other.

   So the shape is a grid, not a list. A list sorted by any one column hides
   exactly the two findings that matter, because "lots of leads, converts
   badly" sorts to the top on volume and the bottom on rate, and whichever
   sort you picked tells you the opposite of the other.

   Two things it will not do, both of them ways of being confidently wrong:

     - rank a channel on a handful of leads. Three leads and two bookings is
       sixty-seven per cent and means nothing.
     - call anything profitable without a spend figure behind it.

   Both are enforced in widget/gates/allocation.js and asserted by 38
   assertions, not here. This file draws what that returns.
   ========================================================================= */

type Row = ReturnType<typeof allocate>["rows"][number];

/* The caption under each channel in the table.

   These are CATEGORIES, not superlatives. An earlier version said "most
   leads, fewest bookings", which is a claim about one channel, printed
   against five of them at once. A quadrant is a position relative to the
   others and the wording has to read that way. */
const QUADRANT: Record<string, { title: string; say: string }> = {
  working: { title: "Working", say: "volume, and converting" },
  money_pit: { title: "Costing you", say: "volume, not converting" },
  starved: { title: "Starved", say: "converting, little volume" },
  leave: { title: "Leave it", say: "small, not converting" },
};

const pct = (n: number | null) => (n === null ? "" : `${Math.round(n * 100)}%`);

export function Allocation({
  facts,
  spend,
  demo,
  hidden,
}: {
  facts: ChannelFact[];
  spend: Record<string, number>;
  demo: boolean;
  hidden: number;
}) {
  const a = allocate(facts, spend);
  if (!a.rows.length) return null;

  const ranked = a.rows.filter((r) => !r.tooEarly && r.conversion !== null);
  const early = a.rows.filter((r) => r.tooEarly);

  /* The scale. Conversion runs to the best channel rather than to 100%,
     because nothing books at a hundred per cent and a chart where every
     point hugs the floor compares nothing. */
  const maxLeads = Math.max(...a.rows.map((r) => r.leads), 1);
  const maxConv = Math.max(...ranked.map((r) => r.conversion ?? 0), 0.05);

  const href = (p: string) => `${p}${demo ? "?demo=1" : ""}`;

  /* The finding, in a sentence, before any of the figures. */
  const pit = a.rows.find((r) => r.quadrant === "money_pit");
  const star = a.rows.find((r) => r.quadrant === "starved");
  /* Both halves counted the same way, so the comparison is a comparison.
     An earlier version put a share of all leads next to a conversion rate in
     one sentence with nothing saying which was which, which is two numbers
     that cannot be held against each other dressed up as a finding. */
  const say =
    pit && star
      ? `${sourceLabel(pit.key)} brings ${pit.leads} leads and books ${pit.converted}. ${sourceLabel(star.key)} brings ${star.leads} and books ${star.converted}.`
      : a.best
        ? `${sourceLabel(a.best.key)} converts best: ${a.best.converted} of ${a.best.leads}.`
        : null;

  const noSpend = a.totals.channelsWithSpend === 0;

  return (
    <section className="mt-3" aria-labelledby="alloc-h">
      <div
        className="overflow-hidden rounded-2xl border border-line bg-surface"
        style={{ boxShadow: "var(--e1), var(--ring-inset)" }}
      >
        <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-line px-4 py-3.5 sm:px-5">
          <div className="min-w-0">
            <h2 id="alloc-h" className="font-sans text-[14px] font-semibold tracking-[-.01em]">
              Channel allocation
            </h2>
            <p className="mt-0.5 text-[12.5px] leading-snug text-muted">
              Which channels deserve next month&rsquo;s budget.
            </p>
          </div>
          <Link
            href={href("/lead-dashboard/channels")}
            className="whitespace-nowrap text-[13px] font-semibold text-[var(--dash-accent-text)] underline underline-offset-4 outline-none hover:no-underline focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            The full channel report
          </Link>
        </header>

        <div className="p-4 sm:p-5">
          {say && (
            <p className="mb-4 max-w-[72ch] font-sans text-[16px] font-semibold leading-snug tracking-[-.01em] text-ink">
              {say}
            </p>
          )}

          <div className="grid gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
            <div className="min-w-0">
              <Plot rows={a.rows} maxLeads={maxLeads} maxConv={maxConv} />

              {/* The caveat sits with the chart rather than in a footnote,
                  because "cost per booking" in the table beside it is only
                  as good as how much of the picture has a cost on it. */}
              <dl className="mt-4 grid grid-cols-3 gap-3 border-t border-line pt-4">
                {[
                  { k: "Leads", v: String(a.totals.leads), note: `${a.rows.length} channels` },
                  { k: "Booked", v: String(a.totals.booked), note: `${pct(a.totals.leads ? a.totals.booked / a.totals.leads : null)} of leads` },
                  {
                    k: "Spend known",
                    v: `${a.totals.channelsWithSpend} of ${a.totals.channels}`,
                    note: a.totals.spend ? `${money(a.totals.spend)} a month` : "no costs typed in",
                  },
                ].map((c) => (
                  <div key={c.k}>
                    <dd className="font-sans text-[20px] font-semibold leading-none tabular-nums text-ink">
                      {c.v}
                    </dd>
                    <dt className="mt-1.5 text-[12.5px] text-muted">{c.k}</dt>
                    <p className="text-[12px] text-muted/80">{c.note}</p>
                  </div>
                ))}
              </dl>
            </div>
            <Table rows={a.rows} noSpend={noSpend} />
          </div>

          {early.length > 0 && (
            <p className="mt-4 text-[12.5px] leading-relaxed text-muted">
              Not ranked, under {a.totals.floor} leads each:{" "}
              {early.map((r) => sourceLabel(r.key)).join(", ")}. Too few to tell
              a good channel from a lucky week.
            </p>
          )}
          {noSpend && (
            <p className="mt-2 text-[12.5px] leading-relaxed text-muted">
              No spend recorded, so these are conversion rates rather than
              profit.{" "}
              <Link
                href={href("/lead-dashboard/settings")}
                className="font-semibold text-[var(--dash-accent-text)] underline underline-offset-4"
              >
                Add what each channel costs
              </Link>{" "}
              and this says cost per booking instead.
            </p>
          )}
          {hidden > 0 && (
            <p className="mt-2 text-[12.5px] text-muted">
              {hidden} test {hidden === 1 ? "row" : "rows"} left out.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

/** Volume across, conversion up, one dot per channel. */
function Plot({
  rows,
  maxLeads,
  maxConv,
}: {
  rows: Row[];
  maxLeads: number;
  maxConv: number;
}) {
  const W = 460, H = 380, PAD = { l: 40, r: 14, t: 18, b: 34 };
  const iw = W - PAD.l - PAD.r;
  const ih = H - PAD.t - PAD.b;
  const x = (leads: number) => PAD.l + (leads / maxLeads) * iw;
  const y = (c: number) => PAD.t + ih - (c / maxConv) * ih;

  const plotted = rows.filter((r) => r.conversion !== null);
  /* The four readings, plus the two extremes. Six labels at most, and every
     one of them is a channel somebody should do something about. */
  const ranked = plotted.filter((r) => !r.tooEarly);
  const pick = (q: string) =>
    ranked.filter((r) => r.quadrant === q).sort((a, b) => b.leads - a.leads)[0];
  const named = new Set(
    [
      pick("money_pit"),
      pick("starved"),
      pick("working"),
      [...ranked].sort((a, b) => (b.conversion ?? 0) - (a.conversion ?? 0))[0],
      [...ranked].sort((a, b) => b.leads - a.leads)[0],
    ]
      .filter(Boolean)
      .map((r) => r!.key),
  );
  /* The dividing lines are the medians the gate used, so the quadrant a dot
     sits in on screen is the quadrant the data says it is in. */
  const midX = x(median(plotted.filter((r) => !r.tooEarly).map((r) => r.leads)) ?? maxLeads / 2);
  const midY = y(median(plotted.filter((r) => !r.tooEarly).map((r) => r.conversion ?? 0)) ?? maxConv / 2);

  return (
    <figure className="min-w-0">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img"
           aria-label="Channels plotted by how many leads they bring against how many of those book. The table beside it has the same figures.">
        {/* The quadrants, named on the chart rather than in a legend: a
            legend is a second thing to read before the first makes sense. */}
        <rect x={midX} y={PAD.t} width={Math.max(W - PAD.r - midX, 0)} height={Math.max(midY - PAD.t, 0)}
              fill="rgb(var(--accent-rgb) / .07)" />
        <rect x={midX} y={midY} width={Math.max(W - PAD.r - midX, 0)} height={Math.max(PAD.t + ih - midY, 0)}
              fill="#c4572f" fillOpacity={0.07} />
        <line x1={midX} y1={PAD.t} x2={midX} y2={PAD.t + ih} stroke="var(--color-line)" strokeDasharray="3 3" />
        <line x1={PAD.l} y1={midY} x2={W - PAD.r} y2={midY} stroke="var(--color-line)" strokeDasharray="3 3" />

        <text x={W - PAD.r - 4} y={PAD.t + 13} textAnchor="end"
              className="fill-[var(--dash-accent-text)] text-[10px] font-semibold uppercase tracking-[.08em]">
          working
        </text>
        <text x={W - PAD.r - 4} y={PAD.t + ih - 5} textAnchor="end"
              className="fill-[#9a3f1e] text-[10px] font-semibold uppercase tracking-[.08em]">
          costing you
        </text>
        <text x={PAD.l + 4} y={PAD.t + 13}
              className="fill-muted text-[10px] font-semibold uppercase tracking-[.08em]">
          starved
        </text>
        <text x={PAD.l + 4} y={PAD.t + ih - 5}
              className="fill-muted text-[10px] font-semibold uppercase tracking-[.08em]">
          leave it
        </text>

        <line x1={PAD.l} y1={PAD.t + ih} x2={W - PAD.r} y2={PAD.t + ih} stroke="var(--color-line)" />
        <line x1={PAD.l} y1={PAD.t} x2={PAD.l} y2={PAD.t + ih} stroke="var(--color-line)" />
        <text x={PAD.l} y={H - 8} className="fill-muted text-[10.5px]">leads &rarr;</text>
        <text x={4} y={PAD.t + 9} className="fill-muted text-[10.5px]">booked &uarr;</text>

        {plotted.map((r) => {
          const cx = x(r.leads), cy = y(r.conversion ?? 0);
          const pit = r.quadrant === "money_pit";
          /* Only the dots worth reading carry a name. Fifteen labels on one
             chart overlap into something nobody can read, and the chart's
             job here is the four readings, not an index of every channel.
             The table beside it names all of them. */
          const label = named.has(r.key);
          /* Past the middle, the name goes to the LEFT of the dot. Otherwise
             anything on the right simply runs off the edge, which is how
             "Facebook ad" was being drawn as "F". */
          const left = cx > PAD.l + iw * 0.62;
          return (
            <g key={r.key}>
              <circle
                cx={cx} cy={cy} r={r.tooEarly ? 3.5 : 6}
                fill={pit ? "#c4572f" : "var(--accent)"}
                fillOpacity={r.tooEarly ? 0.35 : 0.9}
              />
              {label && (
                <text
                  x={left ? cx - 10 : cx + 10}
                  y={cy + 3.5}
                  textAnchor={left ? "end" : "start"}
                  className="fill-[var(--color-ink)] text-[11px] font-medium"
                >
                  {sourceLabel(r.key)}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </figure>
  );
}

function Table({ rows, noSpend }: { rows: Row[]; noSpend: boolean }) {
  return (
    /* No minWidth. On a phone the table was wider than the screen and
       scrolled sideways, and the column that fell off the edge was the one
       with the money in it. The cells wrap instead; only the figures are
       held on one line. */
    <div className="min-w-0">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-line">
            {["Channel", "Leads", "Booked", noSpend ? "Of its leads" : "Per booking"].map((h, i) => (
              <th key={h} className={`whitespace-nowrap pb-2 font-sans text-[11px] font-semibold uppercase tracking-[.08em] text-muted ${i ? "text-right" : ""}`}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.key} className="border-b border-line last:border-0">
              <td className="py-2 pr-3">
                <p className="text-[13.5px] font-medium text-ink">{sourceLabel(r.key)}</p>
                {/* Said in words as well as placed on the chart, so the
                    finding survives greyscale and colour blindness. */}
                <p className="text-[12px] text-muted">
                  {r.tooEarly ? "too early to say" : QUADRANT[r.quadrant ?? ""]?.say ?? ""}
                </p>
              </td>
              <td className="py-2 pl-2 text-right text-[13.5px] tabular-nums text-ink">{r.leads}</td>
              <td className="py-2 pl-2 text-right text-[13.5px] tabular-nums text-ink">{r.converted}</td>
              <td className="py-2 pl-2 text-right text-[13.5px] tabular-nums whitespace-nowrap">
                {noSpend ? (
                  /* The rate never arrives without what it is a rate of. */
                  <span className="text-ink">
                    {pct(r.conversion)}
                    <span className="ml-1 text-[12px] text-muted">
                      of {r.leads}
                    </span>
                  </span>
                ) : r.costPerBooking !== null ? (
                  <span className="font-semibold text-ink">{money(r.costPerBooking)}</span>
                ) : (
                  <span className="text-muted">{r.spend === null ? "add spend" : "none booked"}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function median(v: number[]): number | null {
  if (!v.length) return null;
  const s = [...v].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}
