"use client";

import { useState, useTransition } from "react";
import { markNoShow } from "@/app/lead-dashboard/bookings/actions";
import { attempt } from "@/lib/dashboard/attempt";

/* =========================================================================
   They did not turn up.

   The only thing on the Appointments screen nothing can work out for
   itself. A booking goes requested, confirmed, cancelled or moved on its
   own; somebody who simply did not arrive leaves no trace, so the diary
   cannot tell a kept appointment from an empty hour and the channel report
   counts the no-show as a success.

   Shown only once the slot has passed. Offering it on tomorrow's booking
   invites somebody to mark a no-show for an appointment that has not
   happened, and there is no undo that puts the chase back in the box.
   ========================================================================= */

export function NoShowButton({
  reference,
  canWrite,
  demo = false,
}: {
  reference: string;
  canWrite: boolean;
  demo?: boolean;
}) {
  const [done, setDone] = useState(false);
  const [asking, setAsking] = useState(false);
  const [note, setNote] = useState<string | null>(null);
  const [pending, start] = useTransition();

  if (done) {
    return <span className="text-[12.5px] text-muted">{note ?? "Marked, and being chased"}</span>;
  }
  if (!canWrite && !demo) return null;

  if (!asking) {
    return (
      <button
        type="button"
        onClick={() => setAsking(true)}
        className="min-h-8 cursor-pointer rounded-lg border border-dashed border-line px-2 text-[12.5px] text-muted outline-none transition-colors duration-150 hover:bg-warm hover:text-ink focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
      >
        No show
      </button>
    );
  }

  /* Two presses. Marking a no-show starts a sequence that texts somebody,
     and the first press is often a mis-click on a dense table. */
  return (
    <span className="inline-flex items-center gap-1.5">
      <button
        type="button"
        disabled={pending}
        onClick={() => {
          if (demo) {
            setDone(true);
            setNote("Example data. Nothing was saved.");
            return;
          }
          start(async () => {
            const r = await attempt(() => markNoShow(reference));
            if (r.ok) {
              setDone(true);
              setNote(r.chasing ? "Marked, and being chased" : "Marked");
            } else {
              setAsking(false);
              setNote(r.message ?? "That did not save.");
            }
          });
        }}
        className="min-h-8 cursor-pointer rounded-lg bg-inverse px-2.5 text-[12.5px] font-semibold text-oninverse outline-none hover:opacity-90 disabled:cursor-wait focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
      >
        {pending ? "Marking…" : "Confirm"}
      </button>
      <button
        type="button"
        onClick={() => setAsking(false)}
        className="min-h-8 cursor-pointer rounded-lg px-1.5 text-[12.5px] text-muted outline-none hover:text-ink focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
      >
        No
      </button>
    </span>
  );
}
