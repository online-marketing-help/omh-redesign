"use client";

import { useRef, useState } from "react";
import { sourceLabel, sourceFamily } from "@/lib/dashboard/channels";
import { IconCheck, IconSort } from "./icons";

/* =========================================================================
   One filter, as a dropdown.

   Every facet uses this, and they sit on one line with the search box. The
   first version mixed two patterns: chips for the small facets, a dropdown
   for the channel, each on its own row with an uppercase label down the left.
   Three rows, three shapes, for three controls that do the same job. It read
   as three unrelated things rather than one toolbar.

   A dropdown also scales where chips do not. With twenty channels the chip
   row wrapped to three lines and hid most of them behind a "+13 more", which
   is a worse way to choose one thing than a list you can read at once.

   Channel values are grouped the way somebody thinks about them, Google Ads,
   Meta, WhatsApp, Website, Phone, rather than alphabetically. Other facets
   have too few values to be worth grouping, so they are not.
   ========================================================================= */

export type PickerOption = { value: string; label: string; count: number };

export function FilterPicker({
  label,
  allLabel = "All",
  options,
  value,
  onChange,
  total,
  grouped = false,
}: {
  /** What this filters, said once: "Channel", "Outcome", "Temperature". */
  label: string;
  allLabel?: string;
  options: PickerOption[];
  value: string | null;
  onChange: (value: string | null) => void;
  total: number;
  /** Group by channel family. Only worth it for the channel itself. */
  grouped?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [up, setUp] = useState(false);
  const anchor = useRef<HTMLButtonElement>(null);

  const sorted = [...options].sort((a, b) => b.count - a.count);

  /* Grouped the way a person thinks about channels, each group ordered by how
     much traffic it carries, so the busiest is never buried. */
  const groups = new Map<string, PickerOption[]>();
  for (const o of sorted) {
    const f = grouped ? sourceFamily(o.value) : "";
    groups.set(f, [...(groups.get(f) ?? []), o]);
  }
  const order = [...groups.entries()].sort(
    (a, b) =>
      b[1].reduce((n, o) => n + o.count, 0) - a[1].reduce((n, o) => n + o.count, 0),
  );

  function openMenu() {
    const box = anchor.current?.getBoundingClientRect();
    if (box) setUp(window.innerHeight - box.bottom < 340);
    setOpen(true);
  }

  function pick(v: string | null) {
    onChange(v);
    setOpen(false);
  }

  const chosen = value ? options.find((o) => o.value === value) : null;
  const chosenLabel = chosen?.label ?? (value ? sourceLabel(value) : allLabel);

  return (
    <span
      className="relative inline-flex"
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        ref={anchor}
        type="button"
        onClick={openMenu}
        aria-expanded={open}
        aria-label={
          value
            ? `${label}: ${chosenLabel}. Change it.`
            : `Filter by ${label.toLowerCase()}`
        }
        className={[
          "inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-lg border px-3 text-[13.5px] outline-none transition-colors duration-150",
          "focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
          value
            ? "border-transparent bg-inverse font-semibold text-oninverse"
            : "border-line bg-surface text-ink hover:bg-warm",
        ].join(" ")}
      >
        <span className={value ? "text-oninverse/60" : "text-muted"}>{label}</span>
        {value ? chosenLabel : allLabel}
        <span className={["tabular-nums", value ? "text-oninverse/60" : "text-muted"].join(" ")}>
          {chosen ? chosen.count : total}
        </span>
        <IconSort className="h-3 w-3 opacity-50" />
      </button>

      {open && (
        <span
          role="menu"
          className={[
            "absolute left-0 z-30 max-h-[min(420px,60vh)] w-[280px] overflow-y-auto rounded-xl border border-line bg-surface py-1",
            up ? "bottom-0 mb-12" : "top-0 mt-12",
          ].join(" ")}
          style={{ boxShadow: "var(--e2), var(--ring-inset)" }}
        >
          <button
            type="button"
            role="menuitem"
            autoFocus
            onClick={() => pick(null)}
            className="flex min-h-10 w-full cursor-pointer items-center gap-2 px-3 text-left text-[13.5px] font-medium text-ink outline-none transition-colors duration-150 hover:bg-warm focus-visible:bg-warm"
          >
            {value === null ? (
              <IconCheck className="h-3.5 w-3.5 text-[var(--dash-accent-text)]" />
            ) : (
              <span className="w-3.5" />
            )}
            {allLabel}
            <span className="ml-auto tabular-nums text-muted">{total}</span>
          </button>

          {order.map(([family, opts]) => (
            <span key={family} className="block">
              {family && (
                <span className="mt-1 block border-t border-line px-3 pb-1 pt-2 font-sans text-[11px] font-semibold uppercase tracking-[.1em] text-muted">
                  {family}
                </span>
              )}
              {opts.map((o) => (
                <button
                  key={o.value}
                  type="button"
                  role="menuitem"
                  onClick={() => pick(o.value)}
                  className="flex min-h-10 w-full cursor-pointer items-center gap-2 px-3 text-left text-[13.5px] text-ink outline-none transition-colors duration-150 hover:bg-warm focus-visible:bg-warm"
                >
                  {value === o.value ? (
                    <IconCheck className="h-3.5 w-3.5 text-[var(--dash-accent-text)]" />
                  ) : (
                    <span className="w-3.5" />
                  )}
                  <span className="truncate">{o.label}</span>
                  <span className="ml-auto shrink-0 tabular-nums text-muted">{o.count}</span>
                </button>
              ))}
            </span>
          ))}
        </span>
      )}
    </span>
  );
}
