"use client";

import { useState, useTransition } from "react";
import { stopOne } from "@/app/lead-dashboard/sequences/actions";
import { IconCheck, IconAlert } from "./icons";

/* Stop chasing one person.

   Two presses, not one. Unlike the emergency switch on Settings, this is not
   an emergency: it is a deliberate decision about one named person, and the
   cost of a mis-click is a lead who never hears from us again. The second
   press is the whole safeguard.
*/
export function StopFollowUp({
  leadId,
  name,
  disabled,
}: {
  leadId: string;
  name?: string | null;
  disabled?: boolean;
}) {
  const [armed, setArmed] = useState(false);
  const [done, setDone] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, start] = useTransition();

  if (done) {
    return (
      <span
        role="status"
        className="inline-flex items-center gap-1.5 text-[12.5px] text-muted"
      >
        {done.ok ? (
          <IconCheck className="h-3.5 w-3.5" />
        ) : (
          <IconAlert className="h-3.5 w-3.5" />
        )}
        {done.text}
      </span>
    );
  }

  if (!armed) {
    return (
      <button
        type="button"
        disabled={disabled || pending}
        onClick={() => setArmed(true)}
        className="min-h-9 cursor-pointer rounded-lg border border-line px-2.5 text-[12.5px] font-medium text-ink outline-none transition-colors duration-150 hover:bg-warm focus-visible:ring-2 focus-visible:ring-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-50"
      >
        Stop
      </button>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5">
      <button
        type="button"
        disabled={pending}
        onClick={() =>
          start(async () => {
            const r = await stopOne(leadId, name ?? undefined);
            setDone({ ok: r.ok, text: r.message ?? "" });
          })
        }
        className="min-h-9 cursor-pointer rounded-lg bg-[#b42318] px-2.5 text-[12.5px] font-semibold text-white outline-none transition-colors duration-150 hover:bg-[#912018] focus-visible:ring-2 focus-visible:ring-[#b42318] disabled:opacity-60"
      >
        {pending ? "Stopping…" : "Confirm"}
      </button>
      <button
        type="button"
        onClick={() => setArmed(false)}
        className="min-h-9 cursor-pointer px-1.5 text-[12.5px] text-muted outline-none hover:text-ink focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
      >
        Keep
      </button>
    </span>
  );
}
