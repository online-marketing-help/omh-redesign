import type { Totals } from "@/lib/dashboard/campaign-report";
import { money } from "@/lib/dashboard/channels";

/* =========================================================================
   A campaign, as a funnel.

   Five stages wide rather than a table, because the question somebody asks of
   a campaign is "where did it fall off", and that is a shape, not a set of
   numbers. The drop between two bars is the answer.

   Three decisions:

   1. **Every stage is drawn against the same scale**, which is the intended
      list where there is one and the enrolment where there is not. Rescaling
      each bar to the one before it would make a campaign that reached nobody
      look identical to one that reached everybody.
   2. **Blocked is a stage, not a footnote.** The gap between the list we had
      and the people we were allowed to contact is the most useful figure a
      reactivation run produces, and it is invisible in anything that counts
      only what was sent.
   3. **Opted out is drawn in the same row as won**, deliberately, and is the
      one bar given the warning treatment. It is what the campaign spent.
   ========================================================================= */

type Stage = {
  label: string;
  value: number;
  /** Under the figure. Never a bare percentage with nothing to divide by. */
  note?: string | null;
  /** The cost stages, drawn as a warning rather than as progress. */
  cost?: boolean;
};

export function Funnel({ totals: t }: { totals: Totals }) {
  const scale = Math.max(t.intended ?? t.enrolled, t.enrolled, 1);
  const pct = (n: number) => `${Math.round((n / scale) * 100)}%`;

  const stages: Stage[] = [
    ...(t.intended !== null
      ? [
          {
            label: "On the list",
            value: t.intended,
            note: t.blocked ? `${t.blocked} not contactable` : "all contactable",
          },
        ]
      : []),
    {
      label: "Enrolled",
      value: t.enrolled,
      note: t.live ? `${t.live} still going` : null,
    },
    {
      label: "Reached",
      value: t.reached,
      note: t.failed ? `${t.failed} never arrived` : null,
    },
    {
      label: "Replied",
      value: t.replied,
      note: t.replyRate === null ? null : `${Math.round(t.replyRate * 100)}% of reached`,
    },
    {
      label: "Booked",
      value: t.booked,
      note: t.bookRate === null ? null : `${Math.round(t.bookRate * 100)}% of repliers`,
    },
    {
      label: "Won",
      value: t.won,
      note: t.value ? money(t.value) : null,
    },
    {
      label: "Asked to stop",
      value: t.optedOut,
      note: t.optOutRate === null ? null : `${(t.optOutRate * 100).toFixed(1)}% of reached`,
      cost: true,
    },
  ];

  return (
    <ol className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7">
      {stages.map((s) => (
        <li key={s.label} className="min-w-0">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[.08em] text-muted">
            {s.label}
          </p>
          <p
            className={[
              "mt-1 font-sans text-[26px] font-semibold leading-none tabular-nums",
              s.cost && s.value > 0 ? "text-[#9a3f1e] dark:text-[#e8a583]" : "text-ink",
            ].join(" ")}
          >
            {s.value}
          </p>

          {/* The bar, under the figure rather than behind it. A number sitting
              on a tinted bar is harder to read than a number with a bar, and
              this screen is read on a laptop in a meeting. */}
          <span
            aria-hidden
            className="mt-2 block h-1.5 overflow-hidden rounded-full bg-warm"
          >
            <span
              className={[
                "block h-full rounded-full",
                s.cost
                  ? "bg-[#c4572f]"
                  : "bg-[var(--accent)]",
              ].join(" ")}
              style={{ width: pct(s.value) }}
            />
          </span>

          {/* "not set" rather than an omitted line, so a missing figure is
              visibly missing instead of silently absent. */}
          <p className="mt-1.5 min-h-[16px] text-[12px] leading-tight text-muted">
            {s.note ?? ""}
          </p>
        </li>
      ))}
    </ol>
  );
}
