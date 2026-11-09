"use client";

import { useRef, useState, useTransition } from "react";
import { setLeadOutcome } from "@/app/lead-dashboard/leads/actions";
import { outcomeLabel, money } from "@/lib/dashboard/channels";
import { IconCheck, IconSort } from "./icons";

/* =========================================================================
   What came of a lead.

   A small control, and the one that turns every channel figure on this
   dashboard from volume into business: without it, "which channel works"
   can only be answered in leads, and leads are not what anybody is paid in.

   Three decisions worth stating:

   1. **It is a menu, not free text.** Five outcomes, always the same five, so
      a report can group by them. Free text would make the Channels report
      impossible within a week.
   2. **A value is asked for only on a win**, and only then. Nothing else has
      a number worth storing, and a figure left behind on a lead that later
      went to "lost" would quietly inflate every revenue total.
   3. **It saves on choosing, with no separate save button.** This is a cell
      in a table of sixty rows; a two-step save is a two-step save sixty
      times. The row reports what happened instead.
   ========================================================================= */

const CHOICES = ["open", "quoted", "won", "lost", "unqualified"] as const;

export function OutcomePicker({
  leadId,
  outcome,
  valueGbp,
  canWrite,
}: {
  leadId: string;
  outcome: string | null;
  valueGbp: number | null;
  canWrite: boolean;
}) {
  const [current, setCurrent] = useState(outcome);
  const [value, setValue] = useState<number | null>(valueGbp);
  const [open, setOpen] = useState(false);
  const [asking, setAsking] = useState(false);
  const [amount, setAmount] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();
  /* Which way the menu opens. A row can be anywhere in a table of sixty, and
     opening downward from the last row put the final option below the fold
     with no way to reach it. Measured on open rather than guessed. */
  const [up, setUp] = useState(false);
  const anchor = useRef<HTMLButtonElement>(null);

  function openMenu() {
    const box = anchor.current?.getBoundingClientRect();
    /* Five options plus padding. Flip when there is not room for them. */
    if (box) setUp(window.innerHeight - box.bottom < 230);
    setOpen(true);
  }

  function save(next: string, gbp?: number) {
    setOpen(false);
    setAsking(false);
    start(async () => {
      const r = await setLeadOutcome(leadId, next, gbp);
      if (r.ok) {
        setCurrent(next);
        setValue(next === "won" ? (gbp ?? null) : null);
        setError(null);
      } else {
        setError(r.message ?? "Did not save");
      }
    });
  }

  if (!canWrite) {
    return (
      <span className="text-[13px] text-muted">{outcomeLabel(current)}</span>
    );
  }

  /* Asking for the amount. Skippable: a business that does not want to type
     numbers should still be able to record the win. */
  if (asking) {
    return (
      <span className="inline-flex items-center gap-1.5">
        <span className="text-[13px] text-muted">£</span>
        <input
          type="number"
          inputMode="numeric"
          autoFocus
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") save("won", amount ? Number(amount) : undefined);
            if (e.key === "Escape") setAsking(false);
          }}
          placeholder="value"
          aria-label="Deal value in pounds"
          className="w-[86px] rounded-lg border border-line bg-surface px-2 py-1.5 text-[13px] text-ink outline-none focus-visible:border-[var(--accent)] focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent-rgb)/.35)]"
        />
        <button
          type="button"
          onClick={() => save("won", amount ? Number(amount) : undefined)}
          className="min-h-8 cursor-pointer rounded-lg bg-inverse px-2.5 text-[12.5px] font-semibold text-oninverse outline-none hover:opacity-90 focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
        >
          Save
        </button>
      </span>
    );
  }

  if (open) {
    return (
      <span
        className="relative inline-flex"
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
        }}
      >
        <span
          role="menu"
          className={[
            "absolute right-0 z-20 flex min-w-[150px] flex-col overflow-hidden rounded-xl border border-line bg-surface py-1",
            up ? "bottom-0" : "top-0",
          ].join(" ")}
          style={{ boxShadow: "var(--e2), var(--ring-inset)" }}
        >
          {CHOICES.map((c) => (
            <button
              key={c}
              type="button"
              role="menuitem"
              autoFocus={c === CHOICES[0]}
              onClick={() => {
                if (c === "won") {
                  setAmount(value ? String(value) : "");
                  setAsking(true);
                  setOpen(false);
                } else {
                  save(c);
                }
              }}
              className="flex min-h-9 cursor-pointer items-center gap-2 px-3 text-left text-[13px] text-ink outline-none transition-colors duration-150 hover:bg-warm focus-visible:bg-warm"
            >
              {current === c ? (
                <IconCheck className="h-3.5 w-3.5 text-[var(--dash-accent-text)]" />
              ) : (
                <span className="w-3.5" />
              )}
              {outcomeLabel(c)}
            </button>
          ))}
        </span>
      </span>
    );
  }

  const won = current === "won";
  const decided = current === "won" || current === "lost" || current === "unqualified";

  return (
    <button
      type="button"
      ref={anchor}
      disabled={pending}
      onClick={openMenu}
      aria-expanded={open}
      aria-label={`Outcome: ${outcomeLabel(current)}. Change it.`}
      className={[
        "inline-flex min-h-9 cursor-pointer items-center gap-1.5 rounded-lg border px-2.5 text-[13px] outline-none transition-colors duration-150",
        "focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
        won
          ? "border-[rgb(var(--accent-rgb)/.4)] bg-[rgb(var(--accent-rgb)/.12)] font-semibold text-ink"
          : decided
            ? "border-line bg-warm text-ink"
            : "border-dashed border-line text-muted hover:bg-warm hover:text-ink",
      ].join(" ")}
    >
      {pending ? "Saving…" : outcomeLabel(current)}
      {won && value ? (
        <span className="tabular-nums">{money(value)}</span>
      ) : null}
      <IconSort className="h-3 w-3 opacity-50" />
      {error && <span className="sr-only">{error}</span>}
    </button>
  );
}
