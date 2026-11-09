"use client";

import { useState, useTransition } from "react";
import { setLeadOutcomes } from "@/app/lead-dashboard/leads/actions";
import { useSelection } from "./Selection";
import { outcomeLabel } from "@/lib/dashboard/channels";
import { IconCheck } from "./icons";

/* =========================================================================
   One outcome, applied to every ticked lead.

   The most common thing anybody wants to do on the Leads table: filter to
   Facebook, see that none of the twenty went anywhere, and mark them all
   "not a fit" in one go. One at a time is twenty round trips, which in
   practice means it does not get done, which leaves every channel report
   measuring volume instead of business.

   **No win in bulk, deliberately.** Marking twenty leads as won would mean
   either inventing one value for all twenty or recording twenty wins worth
   nothing, and the second is what makes a revenue figure quietly wrong. A
   win is one deal with one number, recorded on its own row. The four
   outcomes that carry no figure are the four offered here.
   ========================================================================= */

const CHOICES = ["quoted", "lost", "unqualified", "open"] as const;

export function BulkOutcome({
  canWrite,
  demo = false,
}: {
  canWrite: boolean;
  demo?: boolean;
}) {
  const { ids, clear } = useSelection();
  const [pending, start] = useTransition();
  const [said, setSaid] = useState<string | null>(null);

  if (!ids.length) return null;

  function apply(outcome: string) {
    /* The example data is never written to. Saying so where the press
       happened, rather than only in the banner at the top, because the
       banner is read once and this is the moment somebody would assume
       something had been saved. */
    if (demo) {
      setSaid(`Example data. ${ids.length} would be marked "${outcomeLabel(outcome)}".`);
      return;
    }
    start(async () => {
      const r = await setLeadOutcomes(ids, outcome);
      if (r.ok) {
        setSaid(`${r.changed} marked "${outcomeLabel(outcome)}".`);
        clear();
      } else {
        setSaid(r.message ?? "That did not save.");
      }
    });
  }

  if (!canWrite && !demo) {
    return (
      <p className="text-[13px] text-muted">
        Read only from here, so nothing can be changed in bulk.
      </p>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-[13px] text-muted">Mark all as</span>
      {CHOICES.map((c) => (
        <button
          key={c}
          type="button"
          disabled={pending}
          onClick={() => apply(c)}
          className="min-h-9 cursor-pointer rounded-lg border border-line bg-surface px-2.5 text-[13px] font-semibold text-ink outline-none transition-colors duration-150 hover:bg-warm disabled:cursor-wait disabled:opacity-60 focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
        >
          {outcomeLabel(c)}
        </button>
      ))}
      {/* Won is absent from the row and the reason is on screen, because a
          missing control reads as a bug otherwise. */}
      <span className="text-[12.5px] text-muted">
        A win needs its own value, so it is set one at a time.
      </span>
      {said && (
        <span
          role="status"
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[var(--dash-accent-text)]"
        >
          <IconCheck className="h-3.5 w-3.5" />
          {said}
        </span>
      )}
    </div>
  );
}
