import { Shell } from "@/components/dashboard/Shell";
import { Card, Empty, ShowExample } from "@/components/dashboard/ui";
import { Kpi } from "@/components/dashboard/Stats";
import { BarCompare } from "@/components/dashboard/BarCompare";
import { IconClock, IconChat, IconCalendar, IconCheck } from "@/components/dashboard/icons";
import {
  getChannelFacts, sourceLabel, sourceFamily, duration, median, money,
  type ChannelFact, canonicalSource } from "@/lib/dashboard/routing";
import { isDemo, demoChannelFacts } from "@/lib/dashboard/demo";
import { isTestRow } from "@/lib/dashboard/test-rows";

export const dynamic = "force-dynamic";

/* The targets from the lead-routing paper. Shown beside each figure, because
   a number with nothing to compare it to tells you nothing: "4 minutes" is
   either fine or a problem depending entirely on what we said we would do. */
const TARGET = {
  firstTouchMs: 2 * 60_000,
  firstHumanMs: 15 * 60_000,
  smsReplyRate: 0.15,
};

type Group = {
  key: string;
  label: string;
  family: string;
  leads: number;
  medianFirstTouch: number | null;
  worstFirstTouch: number | null;
  smsOut: number;
  smsIn: number;
  replied: number;
  booked: number;
  optedOut: number;
  won: number;
  lost: number;
  value: number;
  decided: number;
};

function group(rows: ChannelFact[]): Group[] {
  const by = new Map<string, ChannelFact[]>();
  for (const r of rows) {
    const k = canonicalSource(r.sourceChannel);
    by.set(k, [...(by.get(k) ?? []), r]);
  }
  return [...by.entries()]
    .map(([key, rs]) => {
      const touches = rs.map((r) => r.msToFirstTouch).filter((n): n is number => n !== null);
      return {
        key,
        label: sourceLabel(key),
        family: sourceFamily(key),
        leads: rs.length,
        medianFirstTouch: median(touches),
        worstFirstTouch: touches.length ? Math.max(...touches) : null,
        smsOut: rs.reduce((n, r) => n + r.smsOut, 0),
        smsIn: rs.reduce((n, r) => n + r.smsIn, 0),
        replied: rs.filter((r) => r.msToFirstReply !== null).length,
        booked: rs.reduce((n, r) => n + r.bookings, 0),
        optedOut: rs.filter((r) =>
          r.sequences.some((s) => s.stopReason === "opted_out"),
        ).length,
        won: rs.filter((r) => r.outcome === "won").length,
        lost: rs.filter((r) => r.outcome === "lost").length,
        value: rs.reduce((n, r) => n + (r.valueGbp ?? 0), 0),
        /* How many have been judged at all. A win rate over leads nobody has
           looked at yet is not a win rate. */
        decided: rs.filter((r) => r.outcome === "won" || r.outcome === "lost").length,
      };
    })
    .sort((a, b) => b.leads - a.leads);
}

export default async function ChannelsPage({
  searchParams,
}: {
  searchParams: Promise<{ demo?: string }>;
}) {
  const params = await searchParams;
  const demo = isDemo(params);

  const facts = demo ? demoChannelFacts() : await getChannelFacts(undefined, 1000);
  const all = facts?.rows ?? [];
  const rows = demo ? all : all.filter((r) => !isTestRow(r));
  const hidden = all.length - rows.length;

  const groups = group(rows);
  const touches = rows.map((r) => r.msToFirstTouch).filter((n): n is number => n !== null);
  const overallMedian = median(touches);
  const smsOut = rows.reduce((n, r) => n + r.smsOut, 0);
  const smsIn = rows.reduce((n, r) => n + r.smsIn, 0);
  const booked = rows.reduce((n, r) => n + r.bookings, 0);
  const wonTotal = rows.filter((r) => r.outcome === "won").length;
  const valueTotal = rows.reduce((n, r) => n + (r.valueGbp ?? 0), 0);

  /* One finding, said in a sentence, rather than leaving the reader to spot
     it in the table. It is only shown when there is actually something to
     say: with one channel, or none booked anywhere, a "best channel" claim
     would be noise dressed up as insight. */
  const ranked = [...groups].filter((g) => g.leads > 0);
  const best = [...ranked].sort((a, b) => b.booked - a.booked)[0];
  const worst = [...ranked]
    .filter((g) => g.key !== best?.key && g.leads >= 2)
    .sort((a, b) => a.booked / a.leads - b.booked / b.leads)[0];

  const headline =
    ranked.length >= 2 && best && best.booked > 0
      ? {
          sentence: worst
            ? `${best.label} produced ${best.booked} of the ${booked} appointments. ${worst.label} produced ${worst.booked === 0 ? "none" : worst.booked} from ${worst.leads} leads.`
            : `${best.label} produced ${best.booked} of the ${booked} appointments booked.`,
          figures: [
            { label: "channels", value: String(ranked.length) },
            {
              label: "answered inside 2 min",
              value: `${Math.round(
                (rows.filter((r) => (r.msToFirstTouch ?? Infinity) <= TARGET.firstTouchMs).length /
                  Math.max(rows.length, 1)) * 100,
              )}%`,
            },
          ],
        }
      : null;

  const unreachable = !demo && facts === null;
  const nothing = !unreachable && rows.length === 0;

  return (
    <Shell
      active="/lead-dashboard/channels"
      title="Channels"
      lead="Which channel produced each lead, and what came of it."
      demo={demo}
    >
      {unreachable ? (
        <Card>
          <Empty>The routing store cannot be reached from here, so this report is empty rather than wrong.</Empty>
        </Card>
      ) : nothing ? (
        <Card title="Nothing to report yet">
          <Empty>
            No leads have been recorded since attribution was switched on. The
            first lead from any channel will appear here.
          </Empty>
          <div className="text-center">
            <ShowExample href="/lead-dashboard/channels?demo=1" />
          </div>
        </Card>
      ) : (
        <>
          {headline && (
            <div
              className="mb-5 overflow-hidden rounded-2xl bg-inverse text-oninverse"
              style={{
                boxShadow: "var(--e2)",
                backgroundImage:
                  "linear-gradient(135deg, rgb(var(--accent-rgb) / .22), transparent 55%)",
              }}
              data-rise
            >
              {/* Stacked on a phone. Side by side, the figures are shrink-0
                  and the sentence is flex-1, so at 390px the sentence was
                  squeezed to two words a line while the numbers kept their
                  width. Column first, row once there is room for both. */}
              <div className="flex flex-col gap-5 px-5 py-5 sm:flex-row sm:items-center sm:gap-8 sm:px-7 sm:py-6">
                <div className="min-w-0 flex-1">
                  <p className="font-sans text-[11px] font-semibold uppercase tracking-[.14em] text-white/55">
                    What the channels are saying
                  </p>
                  <p className="mt-2 max-w-[56ch] font-sans text-[19px] font-semibold leading-snug tracking-[-.01em] sm:text-[21px]">
                    {headline.sentence}
                  </p>
                </div>
                <dl className="flex shrink-0 gap-7 border-t border-white/12 pt-4 sm:border-0 sm:pt-0">
                  {headline.figures.map((f) => (
                    <div key={f.label}>
                      <dd className="font-sans text-[30px] font-semibold leading-none tabular-nums">
                        {f.value}
                      </dd>
                      <dt className="mt-1.5 text-[12px] text-white/55">{f.label}</dt>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            <Kpi
              label="Time to first touch"
              value={overallMedian === null ? "not yet" : duration(overallMedian)}
              sub={`target under ${duration(TARGET.firstTouchMs)}`}
              icon={IconClock}
              accent
              rise={0}
            />
            <Kpi
              label="They replied"
              value={String(rows.filter((r) => r.msToFirstReply !== null).length)}
              sub={`of ${rows.length} ${rows.length === 1 ? "lead" : "leads"}`}
              icon={IconChat}
              rise={1}
            />
            <Kpi
              label="Text reply rate"
              value={smsOut ? `${Math.round((smsIn / smsOut) * 100)}%` : "no texts yet"}
              sub="target 15 to 30 per cent"
              icon={IconChat}
              rise={2}
            />
            <Kpi
              label="Appointments"
              value={String(booked)}
              sub="booked, all channels"
              icon={IconCalendar}
              rise={3}
            />
            <Kpi
              label="Deals won"
              value={wonTotal ? String(wonTotal) : "none yet"}
              sub={valueTotal ? `${money(valueTotal)} in value` : "set an outcome on a lead"}
              icon={IconCheck}
              rise={4}
            />
          </div>

          <Card
            title="By channel"
            note="Sorted by leads. Speed is the first column that matters."
            className="mt-5"
            rise={4}
          >
            <div className="hidden overflow-x-auto lg:block">
              <table className="w-full border-collapse text-left" style={{ minWidth: 880 }}>
                <thead>
                  <tr className="border-b border-line">
                    {["Channel", "Leads", "First touch", "Replied", "Booked", "Won", "Value", "Opted out"].map(
                      (h, i) => (
                        <th
                          key={h}
                          className={[
                            "whitespace-nowrap pb-2.5 font-sans text-[11.5px] font-semibold uppercase tracking-[.08em] text-muted",
                            i === 0 ? "" : "text-right",
                          ].join(" ")}
                        >
                          {h}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {groups.map((g) => {
                    const slow =
                      g.medianFirstTouch !== null && g.medianFirstTouch > TARGET.firstTouchMs;
                    const replyRate = g.smsOut ? g.smsIn / g.smsOut : null;
                    return (
                      <tr key={g.key} className="border-b border-line last:border-0">
                        <td className="py-3 pr-4">
                          <p className="text-[14px] font-medium text-ink">{g.label}</p>
                          <p className="mt-0.5 text-[12.5px] text-muted">{g.family}</p>
                        </td>
                        <td className="py-3 text-right text-[14px] tabular-nums text-ink">{g.leads}</td>
                        <td className="py-3 text-right">
                          <span
                            className={[
                              "text-[14px] tabular-nums",
                              slow ? "font-semibold text-ink" : "text-ink",
                            ].join(" ")}
                          >
                            {g.medianFirstTouch === null ? "not yet" : duration(g.medianFirstTouch)}
                          </span>
                          {/* Over target is said in words, not only shown in a
                              colour, so it survives being read in greyscale or
                              by somebody who cannot tell the two apart. */}
                          {slow && (
                            <span className="mt-0.5 block text-[12px] text-muted">over target</span>
                          )}
                        </td>

                        <td className="py-3 text-right">
                          <span className="text-[14px] tabular-nums text-ink">{g.replied}</span>
                          {replyRate !== null && g.smsOut > 0 && (
                            <span className="mt-0.5 block text-[12px] tabular-nums text-muted">
                              {Math.round(replyRate * 100)}% of texts
                            </span>
                          )}
                        </td>
                        <td className="py-3 text-right text-[14px] tabular-nums text-ink">
                          {g.booked}
                        </td>
                        <td className="py-3 text-right">
                          <span className="text-[14px] font-semibold tabular-nums text-ink">
                            {g.decided ? g.won : ""}
                          </span>
                          {g.decided > 0 && (
                            <span className="mt-0.5 block text-[12px] tabular-nums text-muted">
                              of {g.decided} decided
                            </span>
                          )}
                        </td>
                        <td className="py-3 text-right text-[14px] font-semibold tabular-nums text-ink">
                          {g.value ? money(g.value) : ""}
                        </td>
                        <td className="py-3 text-right text-[13.5px] tabular-nums text-muted">
                          {g.optedOut || ""}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {/* Phone: one card per channel. A table this wide on a 390px
                screen is a sideways scroll nobody discovers, and the whole
                point of the screen is comparing the rows. */}
            <ul className="flex flex-col gap-3 lg:hidden">
              {groups.map((g) => {
                const slow =
                  g.medianFirstTouch !== null && g.medianFirstTouch > TARGET.firstTouchMs;
                return (
                  <li key={g.key} className="rounded-xl border border-line bg-warm/50 p-4">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="text-[14.5px] font-semibold text-ink">{g.label}</p>
                      <p className="shrink-0 text-[13px] tabular-nums text-muted">
                        {g.leads} {g.leads === 1 ? "lead" : "leads"}
                      </p>
                    </div>
                    <dl className="mt-3 grid grid-cols-3 gap-3">
                      {[
                        {
                          k: "First touch",
                          v: g.medianFirstTouch === null ? "not yet" : duration(g.medianFirstTouch),
                          note: slow ? "over target" : null,
                        },
                        { k: "Replied", v: String(g.replied), note: null },
                        { k: "Booked", v: String(g.booked), note: null },
                      ].map((c) => (
                        <div key={c.k}>
                          <dd className="font-sans text-[16px] font-semibold tabular-nums text-ink">
                            {c.v}
                          </dd>
                          <dt className="mt-0.5 text-[12px] text-muted">{c.k}</dt>
                          {c.note && <p className="text-[11.5px] text-muted">{c.note}</p>}
                        </div>
                      ))}
                    </dl>
                  </li>
                );
              })}
            </ul>

            {hidden > 0 && (
              <p className="mt-4 text-[12.5px] text-muted">
                {hidden} test {hidden === 1 ? "row" : "rows"} left out.
              </p>
            )}
          </Card>

          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            {/* Replies, not leads. The lead count is already a column in the
                table above, and when channels are being compared evenly it is
                the one figure that does not vary, so a chart of it says
                nothing. Whether anybody answered does. */}
            <Card title="Who replied, by channel" note="Out of the leads that channel produced." rise={5}>
              <BarCompare
                unit="replies"
                bars={groups.map((g) => ({
                  key: g.key,
                  label: g.label,
                  value: g.replied,
                  display: g.leads ? `${g.replied} of ${g.leads}` : undefined,
                  sub:
                    g.medianFirstTouch === null
                      ? "answered in the conversation"
                      : `answered in ${duration(g.medianFirstTouch)}`,
                }))}
                emptyNote="Nobody has replied yet."
              />
            </Card>

            <Card
              title={wonTotal ? "Deals won by channel" : "Appointments by channel"}
              note="What each one produced."
              rise={6}
            >
              <BarCompare
                unit={wonTotal ? "deals" : "appointments"}
                bars={groups.map((g) => ({
                  key: g.key,
                  label: g.label,
                  value: wonTotal ? g.won : g.booked,
                  display: wonTotal && g.value ? `${g.won} · ${money(g.value)}` : undefined,
                  sub:
                    g.leads > 0
                      ? `${wonTotal ? g.won : g.booked} from ${g.leads} ${g.leads === 1 ? "lead" : "leads"}`
                      : undefined,
                }))}
                emptyNote="Nothing has been marked won or booked yet, so there is nothing to rank."
              />
            </Card>
          </div>
        </>
      )}
    </Shell>
  );
}
