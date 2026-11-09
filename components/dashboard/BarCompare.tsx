/* =========================================================================
   Comparing channels, as bars.

   A bar chart is the right form here and the guidance is specific about why:
   discrete categories, fewer than fifteen of them, and the ranking IS the
   insight. Which channel produced the most booked appointments is the whole
   question this screen exists to answer, and a row of numbers makes the
   reader do that ranking in their head.

   Three things it does deliberately:

   1. **Sorted descending, always.** An unsorted bar chart is a table with
      decoration. The order is the finding.
   2. **Direct labels on every bar.** The value is written on the row, not
      left to a hover or an axis. Nothing here is encoded by colour alone, so
      it survives greyscale, a projector and colour blindness.
   3. **No library.** Bars are a grid and a width, which is exact at any
      size and needs no viewBox arithmetic. The site already hand-rolls its
      one chart for the same reason.

   It is drawn in the brand's single accent at descending strengths. That is
   not a categorical palette and is not pretending to be: the shade carries
   rank, which the order already carries, so losing it costs nothing.
   ========================================================================= */

export type Bar = {
  key: string;
  label: string;
  /** What the bar is long in proportion to. */
  value: number;
  /** Printed at the end of the bar. Defaults to the value. */
  display?: string;
  /** A second line under the label, for context like "2 of 3 replied". */
  sub?: string;
};

export function BarCompare({
  bars,
  unit,
  max,
  limit,
  emptyNote = "Nothing to compare yet.",
}: {
  bars: Bar[];
  /** Said in the accessible summary: "3 leads", "2 appointments". */
  unit: string;
  /** Force the scale, so two charts side by side can share one. */
  max?: number;
  /* Show only the top few and say how many were left off.

     An overview card is a glance, not a report. Fifteen channels drawn in
     full made this card nine hundred pixels tall beside a three hundred
     pixel chart, and the hole that left on the other side of the page was
     the first thing anybody noticed about the screen. The ranking is the
     point here; the long tail belongs on the Channels report. */
  limit?: number;
  emptyNote?: string;
}) {
  const ranked = [...bars].sort((a, b) => b.value - a.value);
  const sorted = limit ? ranked.slice(0, limit) : ranked;
  const hidden = ranked.length - sorted.length;
  /* The scale stays the full set's, so a capped chart and an uncapped one
     of the same data draw the same bars at the same widths. */
  const top = max ?? Math.max(...ranked.map((b) => b.value), 1);

  if (!sorted.length || top <= 0) {
    return <p className="py-6 text-center text-[13.5px] text-muted">{emptyNote}</p>;
  }

  return (
    <div>
      <ol className="flex flex-col gap-3.5">
        {sorted.map((b, i) => {
          const pct = Math.max((b.value / top) * 100, b.value > 0 ? 2 : 0);
          return (
            <li key={b.key} className="grid gap-1.5">
              <div className="flex items-baseline justify-between gap-4">
                <span className="truncate text-[13.5px] font-medium text-ink">
                  {b.label}
                </span>
                <span className="shrink-0 font-sans text-[15px] font-semibold tabular-nums text-ink">
                  {b.display ?? b.value}
                </span>
              </div>

              <div className="h-2.5 overflow-hidden rounded-full bg-warm">
                <div
                  className="h-full rounded-full transition-[width] duration-500"
                  style={{
                    width: `${pct}%`,
                    /* Rank, not category. The order already says which is
                       which; this just stops the chart reading as one flat
                       block of colour. */
                    background:
                      i === 0
                        ? "var(--accent)"
                        : `rgb(var(--accent-rgb) / ${Math.max(0.68 - i * 0.12, 0.2)})`,
                  }}
                />
              </div>

              {b.sub && (
                <span className="text-[12.5px] leading-snug text-muted">{b.sub}</span>
              )}
            </li>
          );
        })}
      </ol>

      {hidden > 0 && (
        <p className="mt-3 text-[12.5px] text-muted">
          and {hidden} more {hidden === 1 ? "channel" : "channels"}
        </p>
      )}

      {/* The same figures as sentences, for a screen reader and for anyone
          who would rather read than measure. */}
      <p className="sr-only">
        {sorted
          .map((b) => `${b.label}: ${b.display ?? b.value} ${unit}.`)
          .join(" ")}
      </p>
    </div>
  );
}
