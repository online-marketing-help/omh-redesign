"use client";

import { useState, useTransition } from "react";
import { saveChannelSpend } from "@/app/lead-dashboard/settings/actions";
import { sourceLabel, money } from "@/lib/dashboard/channels";
import { attempt } from "@/lib/dashboard/attempt";

/* =========================================================================
   What each channel costs, per month.

   The one number the system cannot work out for itself. Everything else on
   the dashboard is observed; this is the only figure a person has to tell
   it, and without it the Channel allocation section can rank channels by
   how well they convert but not by what they cost, which is the question
   worth asking.

   Crude on purpose: a figure typed once a month. The Google Ads and Meta
   APIs are the accurate version and a project of their own, and a crude
   number that exists beats an accurate one that does not.

   **Empty is not zero.** Clearing a box removes the figure rather than
   setting it to nothing, so the channel goes back to reading "add spend"
   on the allocation section. A £0 there would say "this cost us nothing",
   which is a claim, not an absence.
   ========================================================================= */

export function SpendTable({
  channels,
  initial,
  canWrite,
  demo = false,
}: {
  /** Channels that have actually produced a lead, plus any already costed. */
  channels: string[];
  initial: Record<string, number>;
  canWrite: boolean;
  demo?: boolean;
}) {
  const [spend, setSpend] = useState<Record<string, number>>(initial);
  const [editing, setEditing] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [note, setNote] = useState<string | null>(null);
  const [pending, start] = useTransition();

  function commit(channel: string) {
    const raw = draft.trim();
    const pounds = raw === "" ? null : Number(raw);
    setEditing(null);

    if (pounds !== null && (!Number.isFinite(pounds) || pounds < 0)) {
      setNote("That is not a monthly cost.");
      return;
    }

    /* Shown immediately, then confirmed. The alternative is a table that
       does nothing for a second after every keystroke, on a screen where
       somebody is typing a dozen figures in a row. */
    setSpend((s) => {
      const next = { ...s };
      if (pounds === null) delete next[channel];
      else next[channel] = pounds;
      return next;
    });

    if (demo) {
      setNote("Example data. Nothing was saved.");
      return;
    }

    start(async () => {
      const r = await attempt(() => saveChannelSpend(channel, pounds));
      setNote(r.ok ? null : (r.message ?? "That did not save."));
      if (!r.ok) setSpend(initial);
    });
  }

  return (
    <div>
      <ul className="flex flex-col">
        {channels.map((c, i) => {
          const has = spend[c] !== undefined;
          return (
            <li
              key={c}
              className={`flex items-center justify-between gap-3 py-2 ${i ? "border-t border-line" : ""}`}
            >
              <span className="min-w-0 text-[13.5px] text-ink">{sourceLabel(c)}</span>

              {editing === c ? (
                <span className="flex shrink-0 items-center gap-1.5">
                  <span className="text-[13px] text-muted">£</span>
                  <input
                    type="number"
                    inputMode="numeric"
                    autoFocus
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onBlur={() => commit(c)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") commit(c);
                      if (e.key === "Escape") setEditing(null);
                    }}
                    placeholder="a month"
                    aria-label={`Monthly spend on ${sourceLabel(c)}, in pounds`}
                    className="w-[96px] rounded-lg border border-line bg-surface px-2 py-1.5 text-right text-[13px] text-ink outline-none focus-visible:border-[var(--accent)] focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent-rgb)/.35)]"
                  />
                </span>
              ) : (
                <button
                  type="button"
                  disabled={pending || (!canWrite && !demo)}
                  onClick={() => {
                    setNote(null);
                    setDraft(has ? String(spend[c]) : "");
                    setEditing(c);
                  }}
                  className={[
                    "min-h-9 shrink-0 cursor-pointer rounded-lg border px-2.5 text-[13px] tabular-nums outline-none transition-colors duration-150",
                    "focus-visible:ring-2 focus-visible:ring-[var(--accent)] disabled:cursor-default",
                    has
                      ? "border-line bg-warm font-semibold text-ink"
                      : "border-dashed border-line text-muted hover:bg-warm hover:text-ink",
                  ].join(" ")}
                >
                  {has ? `${money(spend[c])} a month` : "add spend"}
                </button>
              )}
            </li>
          );
        })}
      </ul>

      {note && (
        <p role="status" className="mt-3 text-[12.5px] text-muted">
          {note}
        </p>
      )}
      {!canWrite && !demo && (
        <p className="mt-3 text-[12.5px] text-muted">
          Read only from here, so these cannot be changed.
        </p>
      )}
      {/* Said once, at the bottom, because it is the thing somebody will
          wonder about the first time they clear a box. */}
      <p className="mt-3 text-[12.5px] leading-relaxed text-muted">
        Clear a box to remove the figure. The channel then reads &ldquo;add
        spend&rdquo; rather than nothing a month, because a channel we have no
        cost for is not a channel that was free.
      </p>
    </div>
  );
}
