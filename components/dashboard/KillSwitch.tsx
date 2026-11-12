"use client";

import { useState, useTransition } from "react";
import { setOutbound } from "@/app/lead-dashboard/settings/actions";
import { IconPower, IconAlert, IconCheck } from "./icons";
import { attempt } from "@/lib/dashboard/attempt";

/* =========================================================================
   Stop everything.

   The two directions are deliberately not symmetrical.

   Stopping is an emergency. One press, no confirmation, no "are you sure":
   a switch you have to confirm twice is not an emergency stop, and the only
   cost of pressing it by accident is a few minutes of nothing being sent.

   Resuming starts texting real people again, so it asks first. That is the
   direction where a mis-click has a cost somebody else pays.

   It never reports silently either way. The guidance is explicit that a
   successful action should say so, and this is the one control on the
   dashboard where "did that work?" is the wrong question to be left with.
   ========================================================================= */

export function KillSwitch({
  enabled,
  updatedBy,
  canWrite,
}: {
  enabled: boolean;
  updatedBy: string | null;
  canWrite: boolean;
}) {
  const [on, setOn] = useState(enabled);
  const [confirming, setConfirming] = useState(false);
  const [note, setNote] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, start] = useTransition();

  function apply(next: boolean) {
    setConfirming(false);
    start(async () => {
      const r = await attempt(() => setOutbound(next));
      if (r.ok) setOn(r.enabled ?? next);
      setNote({ ok: r.ok, text: r.message ?? "" });
    });
  }

  const lockedOff = !canWrite;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-start gap-4">
        <span
          className={[
            "flex size-11 shrink-0 items-center justify-center rounded-xl",
            on
              ? "bg-[rgb(var(--accent-rgb)/.14)] text-[var(--dash-accent-text)]"
              : "bg-[#b42318]/12 text-[#b42318] dark:bg-[#f97066]/15 dark:text-[#f97066]",
          ].join(" ")}
        >
          <IconPower className="h-5 w-5" title={on ? "Running" : "Stopped"} />
        </span>

        <div className="min-w-0 flex-1">
          {/* State is carried by the words, not only by the colour. */}
          <p className="font-sans text-[15px] font-semibold text-ink">
            {on ? "Automated messages are running" : "Automated messages are stopped"}
          </p>
          <p className="mt-1 max-w-[62ch] text-[13.5px] leading-relaxed text-muted">
            {on
              ? "Texts, emails and callbacks go out on their own."
              : "Nothing automated will be sent. Scheduled follow-ups keep their place and resume when this is switched back on."}
          </p>
          {updatedBy ? (
            <p className="mt-2 text-[12.5px] text-muted">Last changed by {updatedBy}.</p>
          ) : null}
        </div>
      </div>

      {lockedOff ? (
        <p className="rounded-xl border border-line bg-warm px-4 py-3 text-[13px] text-muted">
          Read only until a dashboard password is set.
        </p>
      ) : on ? (
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => apply(false)}
            disabled={pending}
            className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-xl bg-[#b42318] px-4 text-[14px] font-semibold text-white transition-[background-color,opacity] duration-150 hover:bg-[#912018] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b42318] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <IconPower className="h-4 w-4" />
            {pending ? "Stopping…" : "Stop all outbound now"}
          </button>
          <span className="text-[12.5px] text-muted">Takes effect within a minute.</span>
        </div>
      ) : confirming ? (
        <div className="rounded-xl border border-line bg-surface p-4 shadow-[var(--e1),var(--ring-inset)]">
          <p className="font-sans text-[14px] font-semibold text-ink">
            Start sending to real people again?
          </p>
          <p className="mt-1 text-[13px] text-muted">
            Anything that fell due while this was off goes out on the next run.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => apply(true)}
              disabled={pending}
              className="min-h-11 cursor-pointer rounded-xl bg-inverse px-4 text-[14px] font-semibold text-oninverse transition-opacity duration-150 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] disabled:opacity-60"
            >
              {pending ? "Starting…" : "Yes, start sending"}
            </button>
            <button
              type="button"
              onClick={() => setConfirming(false)}
              className="min-h-11 cursor-pointer rounded-xl border border-line px-4 text-[14px] font-medium text-ink transition-colors duration-150 hover:bg-warm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            >
              Leave it stopped
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setConfirming(true)}
            disabled={pending}
            className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-xl bg-inverse px-4 text-[14px] font-semibold text-oninverse transition-opacity duration-150 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] disabled:opacity-60"
          >
            Start sending again
          </button>
          <span className="text-[12.5px] text-muted">Asks you to confirm.</span>
        </div>
      )}

      {note ? (
        <p
          role="status"
          className={[
            "flex items-start gap-2 rounded-xl px-4 py-3 text-[13px]",
            note.ok
              ? "bg-warm text-ink"
              : "bg-[#b42318]/10 text-[#912018] dark:bg-[#f97066]/12 dark:text-[#fda29b]",
          ].join(" ")}
        >
          {note.ok ? (
            <IconCheck className="mt-0.5 h-4 w-4 shrink-0" />
          ) : (
            <IconAlert className="mt-0.5 h-4 w-4 shrink-0" />
          )}
          <span>{note.text}</span>
        </p>
      ) : null}
    </div>
  );
}
