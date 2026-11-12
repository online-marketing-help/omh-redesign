"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { Pill } from "./ui";
import { FilterPicker } from "./FilterPicker";
import { SelectionProvider } from "./Selection";
import { IconSearch, IconUp, IconDown, IconSort, IconInbox, IconCheck } from "./icons";

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
  | { t: "link"; v: string; href: string; sub?: string }
  /* An interactive control built on the server and handed through. Used for
     the outcome picker; keep it rare, because every one of these ships
     JavaScript for a cell. */
  | { t: "node"; v: React.ReactNode };

export type Row = {
  id: string;
  cells: Cell[];
  /** Values the columns sort on, keyed by column key. */
  sort?: Record<string, string | number>;
  /** Everything this row can be searched by, lowercased on the server. */
  q?: string;
  /** The value this row holds for each facet, keyed by facet key. */
  facets?: Record<string, string>;
};

/** One thing a row can be filtered by, with the values it can take. */
export type Facet = {
  key: string;
  label: string;
  options: { value: string; label: string; count: number }[];
};

export type Column = {
  label: string;
  key?: string;
  align?: "right";
  /* A hint, not a rule. Column headers never wrap: a two word heading broken
     across three lines made the table look broken rather than dense. */
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
  facets = [],
  picker,
  bulk,
}: {
  columns: Column[];
  rows: Row[];
  searchPlaceholder?: string;
  empty?: string;
  pageSize?: number;
  minWidth?: number;
  footnote?: React.ReactNode;
  /* Controls for the ticked rows, shown only while something is ticked.
     Passing this is what turns the tick boxes on: a table with no bulk
     action has no business asking anybody to select rows. The element reads
     the selection from ./Selection rather than from a prop, because it is
     built on the server and carries a server action. */
  bulk?: React.ReactNode;
  /** Filter chips above the table. Empty means no filter row at all. */
  facets?: Facet[];
  /* One facet shown as a dropdown instead of chips. Used for the channel,
     which has twenty values: as chips it wrapped to three lines and hid most
     of them behind a "+13 more". */
  picker?: Facet;
}) {
  const [q, setQ] = useState("");
  /* Chosen values per facet. Within one facet the values are OR: picking
     Google Ads and Facebook means either. Across facets they are AND, which
     is what people expect from a filter row and is the only combination that
     narrows rather than widens. */
  const [picked, setPicked] = useState<Record<string, string[]>>({});
  const [sort, setSort] = useState<{ key: string; dir: "asc" | "desc" } | null>(null);
  const [shown, setShown] = useState(pageSize);

  const view = useMemo(() => {
    const needle = q.trim().toLowerCase();
    let out = needle ? rows.filter((r) => (r.q || "").includes(needle)) : rows;

    for (const [key, values] of Object.entries(picked)) {
      if (!values.length) continue;
      out = out.filter((r) => values.includes(r.facets?.[key] ?? ""));
    }
    if (sort) {
      out = [...out].sort((a, b) => {
        const x = a.sort?.[sort.key] ?? "";
        const y = b.sort?.[sort.key] ?? "";
        const n = typeof x === "number" && typeof y === "number" ? x - y : String(x).localeCompare(String(y));
        return sort.dir === "asc" ? n : -n;
      });
    }
    return out;
  }, [rows, q, sort, picked]);

  const page = view.slice(0, shown);

  const anyPicked = Object.values(picked).some((v) => v.length > 0);

  /* ------------------------------------------------------------ selection */

  const [sel, setSel] = useState<Set<string>>(new Set());
  const selectable = Boolean(bulk);

  const clear = useCallback(() => setSel(new Set()), []);

  /* Only the rows actually on screen can be selected or counted. "All" on a
     filtered, paged table has to mean what is in front of you: a tick box
     that silently includes two hundred rows below the fold is how somebody
     marks the wrong people as lost. */
  const selectedHere = page.filter((r) => sel.has(r.id));
  const allHere = page.length > 0 && selectedHere.length === page.length;

  const toggleAll = () =>
    setSel((s) => {
      const next = new Set(s);
      if (allHere) for (const r of page) next.delete(r.id);
      else for (const r of page) next.add(r.id);
      return next;
    });

  const toggleOne = (id: string) =>
    setSel((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  /* Ticks on rows that a filter has since hidden are dropped rather than
     carried along invisibly. Narrowing the filter and then pressing an
     action would otherwise apply it to rows nobody can see. */
  const ids = useMemo(
    () => view.filter((r) => sel.has(r.id)).map((r) => r.id),
    [view, sel],
  );


  return (
    <SelectionProvider value={{ ids, clear }}>
    <div>
      {/* One toolbar, one shape. The first version had a chip row per facet
          with an uppercase label down the left, then the search and the
          channel dropdown on a third row: three rows and three shapes for
          controls that all do the same job. */}
      <div className="mb-3 flex flex-wrap items-center gap-2.5">
        {[...(picker ? [picker] : []), ...facets].map((f) => (
          <FilterPicker
            key={f.key}
            label={f.label}
            options={f.options}
            value={picked[f.key]?.[0] ?? null}
            total={rows.length}
            grouped={f.key === "source"}
            onChange={(v) => {
              setPicked((p) => ({ ...p, [f.key]: v ? [v] : [] }));
              setShown(pageSize);
            }}
          />
        ))}
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
        {anyPicked && (
          <button
            type="button"
            onClick={() => {
              setPicked({});
              setShown(pageSize);
            }}
            className="min-h-9 cursor-pointer rounded-lg px-2.5 text-[13px] font-medium text-[var(--dash-accent-text)] underline underline-offset-4 outline-none transition-colors duration-150 hover:no-underline focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* The bar that appears when something is ticked.

          Above the table rather than floating over the bottom of the window:
          a floating bar covers the last row of a dense table, which on this
          screen is a row somebody may be about to tick. */}
      {selectable && ids.length > 0 && (
        <div
          className="mb-3 flex flex-wrap items-center gap-3 rounded-xl border border-[rgb(var(--accent-rgb)/.5)] bg-[rgb(var(--accent-rgb)/.1)] px-3.5 py-2.5"
          data-rise
        >
          <p className="font-sans text-[13.5px] font-semibold tabular-nums text-ink">
            {ids.length} selected
          </p>
          {/* Its own element, with `bulk` as that element's only child.

              Among siblings, `{bulk}` is one entry in a children array, and
              because the bar is a client component created on the server it
              arrives as a lazy reference that React wants a key for: it warns
              about a list item with no key and names this file. One expression
              as the sole child is not an array, so the question does not
              arise. The wrapper is a flex item carrying the bar's own row. */}
          <div className="min-w-0">{bulk}</div>
          <button
            type="button"
            onClick={clear}
            className="ml-auto min-h-9 cursor-pointer rounded-lg px-2.5 text-[13px] font-medium text-[var(--dash-accent-text)] underline underline-offset-4 outline-none transition-colors duration-150 hover:no-underline focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            Clear selection
          </button>
        </div>
      )}

      {view.length === 0 ? (
        <div className="flex flex-col items-center rounded-xl border border-dashed border-line bg-surface px-6 py-12 text-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-warm text-muted">
            <IconInbox className="h-5 w-5" />
          </span>
          <p className="mt-3 max-w-[46ch] text-[14px] leading-relaxed text-muted">
            {q
              ? `Nothing matches "${q}".`
              : anyPicked
                ? "Nothing matches the filters you have picked."
                : empty}
          </p>
          {(q || anyPicked) && (
            <button
              type="button"
              onClick={() => {
                setQ("");
                setPicked({});
              }}
              className="mt-4 cursor-pointer rounded-lg border border-line px-3 py-1.5 text-[13.5px] font-semibold outline-none transition-colors duration-150 hover:bg-warm focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            >
              {q ? "Clear search" : "Clear filters"}
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
            /* Scrolls sideways until there is genuinely room for the table.

               This flipped to `visible` at the xl breakpoint, 1280px, but the
               widest table here needs about 1060px of its own and the rail
               takes 248 before the page padding. So at exactly 1280 the
               wrapper stopped scrolling and the TABLE pushed the whole page
               sideways instead, which is the one thing the wrapper exists to
               prevent. The number is the width at which it actually fits, not
               the nearest named breakpoint. */
            className="overflow-x-auto min-[1400px]:overflow-x-visible rounded-2xl border border-line bg-surface"
            style={{ boxShadow: "var(--e1), var(--ring-inset)" }}
          >
            <table className="w-full border-collapse text-[14px]" style={{ minWidth }}>
              <thead>
                <tr>
                  {selectable && (
                    <th
                      scope="col"
                      className="sticky top-0 z-10 w-9 border-b border-line bg-[color-mix(in_oklab,var(--color-surface)_88%,transparent)] px-3 py-3 backdrop-blur-sm"
                    >
                      <Tick
                        on={allHere}
                        some={selectedHere.length > 0 && !allHere}
                        onChange={toggleAll}
                        label={allHere ? "Clear the rows on screen" : "Select the rows on screen"}
                      />
                    </th>
                  )}
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
                        className={`sticky top-0 z-10 whitespace-nowrap border-b border-line bg-[color-mix(in_oklab,var(--color-surface)_88%,transparent)] px-4 py-3 font-sans text-[11px] font-semibold uppercase tracking-[.08em] text-muted backdrop-blur-sm ${
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
                            /* `uppercase` repeated here although the `th`
                               already has it. Preflight sets
                               `text-transform: none` on `button` to undo a
                               Firefox quirk, and a rule on the element beats
                               the value inherited from its cell, so every
                               sortable heading was quietly in sentence case
                               while every unsortable one was in capitals. In
                               a table where most columns sort, the odd one
                               out looked like the mistake. */
                            className={`inline-flex cursor-pointer items-center gap-1 rounded uppercase tracking-[.08em] outline-none transition-colors duration-150 hover:text-ink focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${
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
                  <tr
                    key={r.id}
                    className={`transition-colors duration-150 hover:bg-warm ${
                      sel.has(r.id) ? "bg-[rgb(var(--accent-rgb)/.07)]" : ""
                    }`}
                  >
                    {selectable && (
                      <td className="border-b border-line px-3 py-3 align-top">
                        <Tick
                          on={sel.has(r.id)}
                          onChange={() => toggleOne(r.id)}
                          label={`Select this row`}
                        />
                      </td>
                    )}
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
    </SelectionProvider>
  );
}

/* A tick box, drawn rather than native.

   A native checkbox cannot be made 20px with a visible focus ring across
   browsers, and these sit in a dense table where 13px of grey is not a
   target anybody can hit. It is still a real button with `aria-checked`, so
   a screen reader and the keyboard both treat it as a checkbox.

   The hit area is 36px square through padding while the box itself is 18px,
   which keeps the row height and still clears the 44px guidance once the row
   padding either side is counted. */
function Tick({
  on,
  some,
  onChange,
  label,
}: {
  on: boolean;
  some?: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={some ? "mixed" : on}
      aria-label={label}
      onClick={onChange}
      className="-m-2 flex cursor-pointer items-center justify-center p-2 outline-none"
    >
      <span
        className={[
          "flex h-[18px] w-[18px] items-center justify-center rounded-[5px] border transition-colors duration-150",
          on || some
            ? "border-[var(--accent)] bg-[var(--accent)] text-oninverse"
            : "border-line bg-surface hover:border-[var(--accent)]",
        ].join(" ")}
      >
        {on && <IconCheck className="h-3 w-3" />}
        {/* Mixed, said as a dash: some of what is on screen is ticked. A tick
            here would claim all of it. */}
        {some && !on && <span className="h-0.5 w-2 rounded-full bg-oninverse" />}
      </span>
    </button>
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
          {cell.sub && (
            <span title={cell.sub} className="mt-0.5 line-clamp-2 block text-[12.5px] text-muted">
              {cell.sub}
            </span>
          )}
        </>
      );
    case "node":
      return <>{cell.v}</>;
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
          {/* The second line may break mid-word.

              An email address has no spaces, so its min-content width is the
              whole address, and an auto-layout table hands a column whatever
              its widest cell demands. One long address was claiming 227px of
              the Leads table and pushing it past the page. Breaking anywhere
              costs a hyphenless wrap on a line nobody reads letter by letter,
              and buys back a column. */}
          {/* One line, always.

              A row is something you scan. The moment a cell can hold free
              text, one row grows to the height of a paragraph and the table
              stops being a table: an appointment with a four-line note made
              its row 200px tall and pushed the next booking off the screen.
              The full text lives on the thing's own page, which is one click
              away; this is the line that gets you there.

              `title` is a convenience for a mouse, never the only way to
              read it.

              Clamped by LINES, not by `truncate`. Two earlier attempts got
              this wrong in opposite directions: clamping height alone let
              the cell grow sideways instead and pushed the page 356px out,
              and `truncate` brought `white-space: nowrap` with it, which
              fought the deliberate wrapping above and pushed the Leads
              table out by 140px because an email address could no longer
              break. `line-clamp` caps the height and leaves wrapping
              alone, which is the only combination that works for both. */}
          {cell.sub && (
            <span
              title={cell.sub}
              className="mt-0.5 line-clamp-2 block text-[12.5px] text-muted [overflow-wrap:anywhere]"
            >
              {cell.sub}
            </span>
          )}
        </>
      );
  }
}

