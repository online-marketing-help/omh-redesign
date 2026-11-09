"use client";

import { useId, useState } from "react";

/* The calls-over-time chart.

   A line, not the row of stubs this used to be: with a time axis and more
   than four points a line is what reads as a trend, and an all-zero week
   still looks like a chart rather than a broken one.

   It is a client component because hovering a day to read its figures is the
   whole point of plotting it. Everything else on the page stays on the
   server. The same numbers are repeated in a visually hidden table, so the
   chart never has to be read by shape alone. */

export type Point = { label: string; day: string; calls: number; minutes: number };

export function Trend({
  days,
  unit = "calls",
  height = 190,
}: {
  days: Point[];
  unit?: string;
  /* Drawn height. It is a prop because this chart sits beside a card whose
     height is set by its content, and a short chart next to a long list is
     what left a six hundred pixel hole down the middle of the overview. */
  height?: number;
}) {
  const uid = useId().replace(/:/g, "");
  const [hover, setHover] = useState<number | null>(null);

  const W = 720;
  const H = height;
  const PAD = { l: 30, r: 10, t: 14, b: 26 };
  const iw = W - PAD.l - PAD.r;
  const ih = H - PAD.t - PAD.b;

  const peak = Math.max(...days.map((d) => d.calls));
  /* A flat zero week would divide by nothing, so the axis falls back to a
     scale of 1 and the line sits honestly along the bottom. */
  const top = Math.max(1, peak);
  const x = (i: number) => PAD.l + (i * iw) / Math.max(1, days.length - 1);
  const y = (v: number) => PAD.t + ih - (v / top) * ih;

  const line = days.map((d, i) => `${x(i).toFixed(1)},${y(d.calls).toFixed(1)}`).join(" ");
  const area = `${PAD.l},${PAD.t + ih} ${line} ${x(days.length - 1).toFixed(1)},${PAD.t + ih}`;
  const ticks = [0, Math.round(top / 2), top].filter((v, i, a) => a.indexOf(v) === i);

  const active = hover === null ? null : days[hover];

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full touch-none"
        role="img"
        aria-label={`Calls per day over the last ${days.length} days`}
        onPointerLeave={() => setHover(null)}
      >
        <defs>
          <linearGradient id={`g${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {ticks.map((t) => (
          <g key={t}>
            <line
              x1={PAD.l}
              x2={W - PAD.r}
              y1={y(t)}
              y2={y(t)}
              stroke="currentColor"
              className="text-line"
              strokeWidth="1"
              strokeDasharray={t === 0 ? undefined : "3 4"}
            />
            <text
              x={PAD.l - 8}
              y={y(t) + 3.5}
              textAnchor="end"
              className="fill-muted font-sans text-[11px] tabular-nums"
            >
              {t}
            </text>
          </g>
        ))}

        <polygon points={area} fill={`url(#g${uid})`} />
        <polyline
          points={line}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {days.map((d, i) => (
          <g key={d.day}>
            <circle
              cx={x(i)}
              cy={y(d.calls)}
              r={hover === i ? 5 : 3.5}
              fill="var(--color-surface)"
              stroke="var(--accent)"
              strokeWidth="2"
              className="transition-[r] duration-150"
            />
            <text
              x={x(i)}
              y={H - 8}
              textAnchor="middle"
              className={`font-sans text-[11.5px] ${hover === i ? "fill-ink font-semibold" : "fill-muted"}`}
            >
              {d.label}
            </text>
            {/* A full-height band per day, so the pointer never has to find a
                4px dot and a keyboard can tab through the series. */}
            <rect
              x={x(i) - iw / Math.max(1, days.length - 1) / 2}
              y={PAD.t}
              width={iw / Math.max(1, days.length - 1)}
              height={ih}
              fill="transparent"
              tabIndex={0}
              role="button"
              aria-label={`${d.day}: ${d.calls} ${unit}`}
              onPointerEnter={() => setHover(i)}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(null)}
              className="cursor-pointer outline-none focus-visible:fill-[rgb(var(--accent-rgb)/.12)]"
            />
          </g>
        ))}
      </svg>

      {/* Read out rather than drawn in, so it is never clipped by the viewBox. */}
      <p
        className="mt-1 h-[18px] text-[12.5px] text-muted"
        aria-live="polite"
      >
        {active ? (
          <>
            <span className="font-semibold text-ink">{active.day}</span>
            {": "}
            {active.calls} {active.calls === 1 ? unit.replace(/s$/, "") : unit}
            {active.minutes > 0 && `, ${active.minutes.toFixed(1)} min`}
          </>
        ) : (
          "Hover or tab a day to read its figures."
        )}
      </p>

      <table className="sr-only">
        <caption>Calls per day</caption>
        <tbody>
          {days.map((d) => (
            <tr key={d.day}>
              <th scope="row">{d.day}</th>
              <td>{d.calls} calls</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
