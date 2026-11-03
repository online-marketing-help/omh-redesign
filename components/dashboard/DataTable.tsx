"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Pill } from "./ui";
import { IconSearch, IconUp, IconDown, IconSort, IconInbox } from "./icons";

/* The table every list screen uses.

   The old one printed rows and stopped there, which is fine for six rows and
   useless for sixty: no way to find a caller by name, no way to put the
   longest calls at the top. Both of those are one click here.

   The rows are built on the server and arrive as plain data. This component
   only filters, sorts and draws them, which keeps the API keys and the
   fetching where they were and ships a few hundred bytes of interaction. */

export type Cell =
  | { t: "text"; v: string; sub?: string; strong?: boolean; mono?: boolean; nowrap?: boolean }
  | { t: "num"; v: string }
  | { t: "pill"; v: string }
  | { t: "pills"; v: string[] }
  | { t: "link"; v: string; href: string; sub?: string };

export type Row = {
  id: string;
  cells: Cell[];
  /** Values the columns sort on, keyed by column key. */
  sort?: Record<string, string | number>;
  /** Everything this row can be searched by, lowercased on the server. */
  q?: string;
};

export type Column = {
  label: string;
  key?: string;
  align?: "right";
  width?: string;
};

export function DataTable({
  columns,
  rows,
  searchPlaceholder = "Search",
  empty = "Nothing to show yet.",
  pageSize = 25,
  minWidth = 820,
  footnote,
}: {
  columns: Column[];
  rows: Row[];
  searchPlaceholder?: string;
  empty?: string;
  pageSize?: number;
  minWidth?: number;
  footnote?: React.ReactNode;
}) {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<{ key: string; dir: "asc" | "desc" } | null>(null);
  const [shown, setShown] = useState(pageSize);

  const view = useMemo(() => {
    const needle = q.trim().toLowerCase();
    let out = needle ? rows.filter((r) => (r.q || "").includes(needle)) : rows;
    if (sort) {
      out = [...out].sort((a, b) => {
        const x = a.sort?.[sort.key] ?? "";
        const y = b.sort?.[sort.key] ?? "";
        const n = typeof x === "number" && typeof y === "number" ? x - y : String(x).localeCompare(String(y));
        return sort.dir === "asc" ? n : -n;
      });
    }
    return out;
  }, [rows, q, sort]);

  const page = view.slice(0, shown);

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center gap-3">
        <div className="relative min-w-[200px] flex-1 sm:max-w-[320px]">
          <IconSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setShown(pageSize);
            }}
            placeholder={searchPlaceholder}
            aria-label={searchPlaceholder}
            className="w-full rounded-lg border border-line bg-surface py-2 pl-9 pr-3 text-[14px] text-ink outline-none transition-colors duration-150 placeholder:text-muted focus-visible:border-[var(--accent)] focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent-rgb)/.35)]"
          />
        </div>
        <p className="text-[13px] tabular-nums text-muted" aria-live="polite">
          {view.length === rows.length
            ? `${rows.length} ${rows.length === 1 ? "row" : "rows"}`
            : `${view.length} of ${rows.length}`}
        </p>
      </div>

      {view.length === 0 ? (
        <div className="flex flex-col items-center rounded-xl border border-dashed border-line bg-surface px-6 py-12 text-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-warm text-muted">
            <IconInbox className="h-5 w-5" />
          </span>
          <p className="mt-3 max-w-[46ch] text-[14px] leading-relaxed text-muted">
            {q ? `Nothing matches "${q}".` : empty}
          </p>
          {q && (
            <button
              type="button"
              onClick={() => setQ("")}
              className="mt-4 cursor-pointer rounded-lg border border-line px-3 py-1.5 text-[13.5px] font-semibold outline-none transition-colors duration-150 hover:bg-warm focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            >
              Clear search
            </button>
          )}
        </div>
      ) : (
        <>
          {/* overflow-x-auto makes this div a scroll container, and a sticky th
              then sticks to the div rather than the page, so it never engages.
              Above the breakpoint the table fits and the wrapper goes back to
              visible, which hands the sticky headers to the viewport where they
              belong. Below it the wrapper scrolls sideways with them. */}
          <div
            className="overflow-x-auto xl:overflow-x-visible rounded-2xl border border-line bg-surface"
            style={{ boxShadow: "var(--e1), var(--ring-inset)" }}
          >
            <table className="w-full border-collapse text-[14px]" style={{ minWidth }}>
              <thead>
                <tr>
                  {columns.map((c) => {
                    /* Both sides are undefined for an unsortable column, and
                       `undefined === undefined` marked it as the sorted one. */
                    const on = Boolean(c.key) && sort?.key === c.key;
                    const Arrow = !c.key ? null : on ? (sort!.dir === "asc" ? IconUp : IconDown) : IconSort;
                    return (
                      <th
                        key={c.label}
                        scope="col"
                        style={{ width: c.width }}
                        aria-sort={on ? (sort!.dir === "asc" ? "ascending" : "descending") : undefined}
                        /* Near-opaque and blurred rather than solid: see the
                           `th` note in ui.tsx. */
                        className={`sticky top-0 z-10 border-b border-line bg-[color-mix(in_oklab,var(--color-surface)_88%,transparent)] px-4 py-3 font-sans text-[11px] font-semibold uppercase tracking-[.08em] text-muted backdrop-blur-sm ${
                          c.align === "right" ? "text-right" : "text-left"
                        }`}
                      >
                        {c.key ? (
                          <button
                            type="button"
                            onClick={() => {
                              const key = c.key!;
                              setSort((s) =>
                                s && s.key === key
                                  ? { key, dir: s.dir === "asc" ? "desc" : "asc" }
                                  : { key, dir: "asc" },
                              );
                            }}
                            className={`inline-flex cursor-pointer items-center gap-1 rounded outline-none transition-colors duration-150 hover:text-ink focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${
                              on ? "text-ink" : ""
                            } ${c.align === "right" ? "flex-row-reverse" : ""}`}
                          >
                            {c.label}
                            {Arrow && <Arrow className={`h-3.5 w-3.5 ${on ? "" : "opacity-40"}`} />}
                          </button>
                        ) : (
                          c.label
                        )}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {page.map((r) => (
                  <tr key={r.id} className="transition-colors duration-150 hover:bg-warm">
                    {r.cells.map((cell, i) => (
                      <td
                        key={i}
                        className={`border-b border-line px-4 py-3 align-top ${
                          columns[i]?.align === "right" ? "text-right tabular-nums" : ""
                        }`}
                      >
                        <CellView cell={cell} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {view.length > shown && (
            <div className="mt-3 flex justify-center">
              <button
                type="button"
                onClick={() => setShown((n) => n + pageSize)}
                className="cursor-pointer rounded-lg border border-line bg-surface px-4 py-2 text-[13.5px] font-semibold outline-none transition-colors duration-150 hover:bg-warm focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              >
                Show {Math.min(pageSize, view.length - shown)} more
                <span className="ml-1 font-normal text-muted">
                  ({view.length - shown} left)
                </span>
              </button>
            </div>
          )}
        </>
      )}

      {footnote && (
        <p className="mt-4 max-w-[72ch] text-[13px] leading-relaxed text-muted">{footnote}</p>
      )}
    </div>
  );
}

function CellView({ cell }: { cell: Cell }) {
  switch (cell.t) {
    case "link":
      return (
        <>
          <Link
            href={cell.href}
            className="font-medium underline decoration-line underline-offset-4 outline-none transition-colors duration-150 hover:decoration-[var(--accent)] focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            {cell.v}
          </Link>
          {cell.sub && <span className="mt-0.5 block text-[12.5px] text-muted">{cell.sub}</span>}
        </>
      );
    case "pill":
      return <Pill kind={cell.v}>{cell.v}</Pill>;
    case "pills":
      return (
        <span className="flex flex-wrap gap-1">
          {cell.v.map((p) => (
            <Pill key={p} kind={p}>
              {p}
            </Pill>
          ))}
        </span>
      );
    case "num":
      return <span className="tabular-nums">{cell.v}</span>;
    default:
      return (
        <>
          <span
            className={`${cell.strong ? "font-medium" : ""} ${
              cell.mono ? "font-mono text-[12.5px] text-muted" : ""
            } ${cell.nowrap ? "whitespace-nowrap" : ""}`}
          >
            {cell.v}
          </span>
          {cell.sub && <span className="mt-0.5 block text-[12.5px] text-muted">{cell.sub}</span>}
        </>
      );
  }
}
