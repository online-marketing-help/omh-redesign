import { IconUp, IconDown, IconFlat } from "./icons";

/* A number on its own says very little. "26 calls" is only useful next to
   what it was before, and next to the shape of how it got there. So every
   figure on the overview carries three things: the value, the change against
   the period before it, and a sparkline of the period itself. */

export type Delta = { pct: number; dir: "up" | "down" | "flat" } | null;

/** The change between two periods, or null when there is nothing to compare. */
export function deltaOf(now: number, before: number): Delta {
  if (before === 0) return null;
  const pct = Math.round(((now - before) / before) * 100);
  return { pct, dir: pct > 0 ? "up" : pct < 0 ? "down" : "flat" };
}

export function Kpi({
  label,
  value,
  sub,
  delta,
  series,
  icon: Icon,
  accent,
  goodWhenUp = true,
  rise,
}: {
  label: string;
  value: string;
  sub?: string;
  delta?: Delta;
  series?: number[];
  icon: (p: { className?: string }) => React.ReactElement;
  accent?: boolean;
  goodWhenUp?: boolean;
  /** Position in the entrance wave. See the keyframes in dashboard/layout. */
  rise?: number;
}) {
  return (
    <div
      data-rise={rise === undefined ? undefined : ""}
      className={`group relative min-w-0 overflow-hidden rounded-2xl border p-4 transition-[box-shadow,transform] duration-200 ease-out hover:-translate-y-px sm:p-[18px] ${
        accent
          ? "border-[rgb(var(--accent-rgb)/.55)] bg-[rgb(var(--accent-rgb)/.1)]"
          : "border-line bg-surface"
      }`}
      style={
        {
          boxShadow: "var(--e1), var(--ring-inset)",
          ...(rise === undefined ? {} : { "--i": rise }),
        } as React.CSSProperties
      }
    >
      {/* The figure that matters most on the screen gets a hairline of brand
          tan along its top edge. One card, one rule: a marker only works while
          it is still rare. */}
      {accent && (
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[2px]"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--accent) 22%, var(--accent) 78%, transparent)",
          }}
        />
      )}

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-[9px] ${
                accent ? "bg-[rgb(var(--accent-rgb)/.35)] text-ink" : "bg-warm text-muted"
              }`}
            >
              <Icon className="h-[15px] w-[15px]" />
            </span>
            {/* Muted grey lands at 4.33:1 on the tan tint, just under the 4.5
                this size needs, so the accent card uses the brand's deep tan
                instead of a lighter grey. */}
            <p
              className={`truncate font-sans text-[11px] font-semibold uppercase tracking-[.085em] ${
                accent ? "text-[var(--dash-accent-text)]" : "text-muted"
              }`}
            >
              {label}
            </p>
          </div>
          {/* 34px, tight tracking, lining figures. A dashboard's numbers are
              its typography: at 30px with default tracking they read as body
              copy that happens to be a digit. */}
          <p className="mt-3 font-sans text-[34px] font-semibold leading-[1.05] tracking-[-.035em] tabular-nums">
            {value}
          </p>
          <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1">
            {delta && <DeltaChip delta={delta} goodWhenUp={goodWhenUp} />}
            {sub && (
              <span className={`text-[12.5px] ${accent ? "text-[var(--dash-accent-text)]" : "text-muted"}`}>{sub}</span>
            )}
          </div>
        </div>

        {/* A flat line along the bottom says less than no line at all. */}
        {series && series.length > 1 && series.some((v) => v > 0) && (
          <Sparkline values={series} className="mt-1 shrink-0" />
        )}
      </div>
    </div>
  );
}

function DeltaChip({ delta, goodWhenUp }: { delta: NonNullable<Delta>; goodWhenUp: boolean }) {
  const good = delta.dir === "flat" ? null : (delta.dir === "up") === goodWhenUp;
  /* The arrow carries the direction, so the colour is reinforcement rather
     than the only signal. */
  const Icon = delta.dir === "up" ? IconUp : delta.dir === "down" ? IconDown : IconFlat;
  const tone =
    good === null
      ? "text-muted"
      : good
        ? "text-[#067647] dark:text-[#6ec49b]"
        : "text-[#b42318] dark:text-[#f09b92]";
  return (
    <span className={`inline-flex items-center gap-0.5 text-[12.5px] font-semibold tabular-nums ${tone}`}>
      <Icon className="h-3.5 w-3.5" />
      {delta.pct > 0 ? "+" : ""}
      {delta.pct}%
    </span>
  );
}

/** Thirty-two pixels of trend. Decorative: the figures beside it are the data. */
export function Sparkline({
  values,
  className = "",
  w = 72,
  h = 32,
}: {
  values: number[];
  className?: string;
  w?: number;
  h?: number;
}) {
  const top = Math.max(1, ...values);
  const step = w / Math.max(1, values.length - 1);
  const pts = values.map((v, i) => [i * step, h - 2 - (v / top) * (h - 6)] as const);
  const line = pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className={className} aria-hidden="true">
      <polyline
        points={`0,${h} ${line} ${w},${h}`}
        fill="rgb(var(--accent-rgb)/.18)"
        stroke="none"
      />
      <polyline
        points={line}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Lead temperature as one bar rather than three boxes, so the proportions
    are the point and the counts are still written out. */
export function Mix({
  parts,
}: {
  parts: { label: string; value: number; fill: string; text?: string }[];
}) {
  const total = parts.reduce((n, p) => n + p.value, 0);
  return (
    <div>
      <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-warm" aria-hidden="true">
        {total > 0 &&
          parts.map((p) => (
            <span
              key={p.label}
              style={{ width: `${(p.value / total) * 100}%`, background: p.fill }}
              className="h-full"
            />
          ))}
      </div>
      <ul className="mt-4 space-y-2.5">
        {parts.map((p) => (
          <li key={p.label} className="flex items-center gap-2.5 text-[13.5px]">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-[3px]"
              style={{ background: p.fill }}
              aria-hidden="true"
            />
            <span className="font-medium">{p.label}</span>
            <span className="ml-auto font-sans font-semibold tabular-nums">{p.value}</span>
            <span className="w-11 text-right text-muted tabular-nums">
              {total > 0 ? Math.round((p.value / total) * 100) : 0}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
