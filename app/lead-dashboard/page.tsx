import Link from "next/link";
import { Shell } from "@/components/dashboard/Shell";
import { Card, Pill, Empty, tr } from "@/components/dashboard/ui";
import { Kpi, deltaOf } from "@/components/dashboard/Stats";
import { Trend } from "@/components/dashboard/Trend";
import {
  IconPhone, IconClock, IconLead, IconCalendar, IconChat, IconHandover,
} from "@/components/dashboard/icons";
import {
  getCalls, realCalls, today, windowOf, previousWindow, dailySeries,
  fmtMinutes, fmtDuration, fmtWhen,
} from "@/lib/dashboard/retell";
import { getWidgetData, temperature, fmtDate } from "@/lib/dashboard/convex";
import { getInbox } from "@/lib/dashboard/handover";
import { londonToday } from "@/lib/dashboard/day";
import { isDemo, demoWidgetData, demoCalls, demoSequenceBoard, demoChannelFacts, demoSpend } from "@/lib/dashboard/demo";
import { isTestRow } from "@/lib/dashboard/test-rows";
import { getSequenceBoard, sourceLabel, when, canonicalSource, getChannelFacts, getChannelSpend } from "@/lib/dashboard/routing";
import { BarCompare } from "@/components/dashboard/BarCompare";
import { Allocation } from "@/components/dashboard/Allocation";
import { IconRoute } from "@/components/dashboard/icons";

export const dynamic = "force-dynamic";

const WEEK = 7 * 86400000;

export default async function Overview({
  searchParams,
}: {
  searchParams: Promise<{ demo?: string }>;
}) {
  const demo = isDemo(await searchParams);

  const [raw, widget, inbox] = demo
    ? [demoCalls(), demoWidgetData(), { waiting: 2, live: 0, rows: [], orphanQuestions: 0, awaitingReply: 0 }]
    : await Promise.all([getCalls().catch(() => []), getWidgetData(), getInbox()]);

  /* The example calls are already "real": realCalls strips our own test
     traffic, and a demonstration has none. */
  const calls = demo ? raw : realCalls(raw).real;

  /* The front page was built before channels existed and said nothing about
     them, which left it disagreeing with every other screen. */
  const board = demo ? demoSequenceBoard() : await getSequenceBoard(200);
  const active = (board?.rows ?? []).filter((r) => r.status === "active");
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);
  const dueToday = active.filter(
    (r) => r.nextDueAt && r.nextDueAt <= endOfDay.getTime(),
  );
  const nextOut = [...active]
    .filter((r) => r.nextDueAt)
    .sort((a, b) => (a.nextDueAt ?? 0) - (b.nextDueAt ?? 0))[0];

  const hot = widget.leads.filter((l) => temperature(l) === "hot").length;
  const warm = widget.leads.filter((l) => temperature(l) === "warm").length;

  const bySource = new Map<string, number>();
  for (const l of widget.leads) {
    const k = canonicalSource(l.sourceChannel);
    bySource.set(k, (bySource.get(k) ?? 0) + 1);
  }
  const channelBars = [...bySource.entries()].map(([key, value]) => ({
    key,
    label: sourceLabel(key),
    value,
  }));

  /* What each channel produced and what it costs. Read here rather than in
     the component, so the component stays a pure function of its props. */
  const [factsRaw, spendRaw] = demo
    ? ([demoChannelFacts(), { spend: demoSpend() }] as const)
    : await Promise.all([getChannelFacts(undefined, 1000), getChannelSpend()]);
  const allFacts = factsRaw?.rows ?? [];
  const facts = demo ? allFacts : allFacts.filter((r) => !isTestRow(r));
  const factsHidden = allFacts.length - facts.length;

  const day = today(calls);
  const week = windowOf(calls, WEEK);
  const prev = previousWindow(calls, WEEK);
  const days = dailySeries(calls, 14);
  const lastWeek = days.slice(-7);
  /* The edges of the fortnight, read off rather than eyeballed from the line. */
  const ranked = [...days].sort((a, b) => b.calls - a.calls);
  const busiest = ranked[0];
  const quietest = ranked[ranked.length - 1];
  const last = calls[0];
  const allMinutes = calls.reduce((n, c) => n + c.durationMs, 0) / 60000;

  /* Next means next, so past dates are out. Sorting the whole list by date
     and taking the first put a booking from three weeks ago under the
     heading "next appointments". */
  const todayIso = londonToday();
  const upcoming = widget.bookings
    .filter((b) => b.status !== "cancelled" && b.preferredDate >= todayIso)
    .sort((a, b) => a.preferredDate.localeCompare(b.preferredDate));


  /* Today, in the client's own day rather than the server's. */
  const leadsToday = widget.leads.filter(
    (l) => new Date(l.at).toISOString().slice(0, 10) === todayIso,
  ).length;
  const bookedToday = widget.bookings.filter(
    (b) => new Date(b.at).toISOString().slice(0, 10) === todayIso,
  ).length;

  /* One feed rather than three lists. A person reading this wants to know
     what happened in order, not to reconcile three tables by timestamp. */
  const feed = [
    ...calls.slice(0, 8).map((c) => ({
      at: c.startedAt, kind: "call" as const, id: c.callId,
      title: c.summary || "Call with no summary recorded",
      meta: fmtDuration(c.durationMs), tag: c.recordingUrl ? "recording" : null,
      href: `/lead-dashboard/calls/${c.callId}`,
    })),
    ...widget.leads.map((l) => ({
      at: l.at, kind: "lead" as const, id: l._id,
      title: `${l.name} left their details${l.service ? ` about ${l.service}` : ""}`,
      meta: l.phone || l.email || "", tag: temperature(l),
      /* Straight to the conversation behind the lead, the same as clicking
         the name on the leads screen. */
      href: `/lead-dashboard/conversations/${encodeURIComponent(l.sessionId)}`,
    })),
    ...widget.bookings.map((b) => ({
      at: b.at, kind: "booking" as const, id: b._id,
      title: `${b.name} booked ${b.service}`,
      meta: `${b.preferredDate} at ${b.preferredTime}`, tag: b.status,
      href: `/lead-dashboard/conversations/${encodeURIComponent(b.sessionId)}`,
    })),
  ].sort((a, b) => b.at - a.at).slice(0, 9);

  return (
    <Shell
      active="/lead-dashboard"
      demo={demo}
      title="Overview"
      lead="Everything your assistant handled, what it captured, and what it booked."
      counts={{
        "/lead-dashboard/calls": calls.length,
        "/lead-dashboard/leads": widget.leads.length,
        "/lead-dashboard/bookings": widget.bookings.length,
      }}
      toolbar={<Freshness last={last?.startedAt} />}
    >
      {/* The day in one sentence, before any card.

          Every other block on this page is a figure you have to interpret.
          This is the interpretation, written out, because the first question
          anybody opening a dashboard has is "is today normal", and a grid of
          numbers answers that only after you have read all of it. */}
      <div
        className="mb-3 overflow-hidden rounded-2xl bg-inverse text-oninverse"
        style={{
          boxShadow: "var(--e2)",
          backgroundImage:
            "linear-gradient(135deg, rgb(var(--accent-rgb) / .22), transparent 55%)",
        }}
        data-rise
      >
        <div className="flex flex-col gap-5 px-5 py-5 sm:flex-row sm:items-center sm:gap-8 sm:px-7 sm:py-6">
          <div className="min-w-0 flex-1">
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[.14em] text-white/55">
              Today
            </p>
            <p className="mt-2 max-w-[56ch] font-sans text-[19px] font-semibold leading-snug tracking-[-.01em] sm:text-[21px]">
              {day.calls === 0 && leadsToday === 0
                ? "Nothing has come in yet today."
                : `${day.calls} ${day.calls === 1 ? "call" : "calls"} and ${leadsToday} ${
                    leadsToday === 1 ? "lead" : "leads"
                  } so far${bookedToday ? `, ${bookedToday} booked` : ""}.`}
              {inbox.waiting > 0
                ? ` ${inbox.waiting} ${inbox.waiting === 1 ? "person is" : "people are"} waiting on a reply.`
                : " Nobody is waiting on a reply."}
            </p>
          </div>
          {/* Stacked on a phone: side by side, the sentence is flex-1 and
              gets squeezed to two words a line while the figures keep their
              width. */}
          <dl className="flex shrink-0 gap-7 border-t border-white/12 pt-4 sm:border-0 sm:pt-0">
            <div>
              <dd className="font-sans text-[30px] font-semibold leading-none tabular-nums">
                {dueToday.length}
              </dd>
              <dt className="mt-1.5 text-[12px] text-white/55">follow-ups due</dt>
            </div>
            <div>
              <dd className="font-sans text-[30px] font-semibold leading-none tabular-nums">
                {upcoming.length}
              </dd>
              <dt className="mt-1.5 text-[12px] text-white/55">appointments ahead</dt>
            </div>
          </dl>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Kpi
          rise={0}
          label="Calls today"
          value={String(day.calls)}
          sub={day.calls > 0 ? fmtMinutes(day.minutes) : "nothing yet today"}
          icon={IconPhone}
          accent
        />
        <Kpi
          rise={1}
          label="Last 7 days"
          value={String(week.calls)}
          delta={deltaOf(week.calls, prev.calls)}
          sub={week.calls > 0 ? fmtMinutes(week.minutes) : last ? `last ${fmtWhen(last.startedAt)}` : "none yet"}
          series={lastWeek.map((d) => d.calls)}
          icon={IconClock}
        />
        <Kpi
          rise={2}
          label="Leads captured"
          value={String(widget.leads.length)}
          sub={`${hot} hot, ${warm} warm`}
          icon={IconLead}
        />
        <Kpi
          rise={3}
          label="Appointments"
          value={String(widget.bookings.length)}
          sub={upcoming.length ? `next ${upcoming[0].preferredDate}` : "none still to come"}
          icon={IconCalendar}
        />
      </div>

      {/* The two things that need somebody, side by side rather than stacked.

          Both are one line of text in a full-width box, so stacking them cost
          two rows of page height to say what fits on one. They are also the
          same kind of thing, a thing waiting on a person, and reading as one
          band makes that obvious. */}
      <div className="mt-3 grid gap-3 lg:grid-cols-2">
      {inbox.waiting > 0 && (
        <Link
          href={demo ? "/lead-dashboard/handover?demo=1" : "/lead-dashboard/handover"}
          className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl border border-[rgb(var(--accent-rgb)/.45)] bg-[rgb(var(--accent-rgb)/.14)] px-4 py-3.5 outline-none transition-colors duration-150 hover:bg-[rgb(var(--accent-rgb)/.2)] focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[rgb(var(--accent-rgb)/.3)] text-[var(--dash-accent-text)]">
            <IconHandover className="h-[17px] w-[17px]" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-sans text-[14.5px] font-semibold">
              {inbox.waiting} {inbox.waiting === 1 ? "person is" : "people are"} waiting
              for an answer
            </span>
            <span className="mt-0.5 block text-[13px] leading-relaxed text-[var(--dash-accent-text)]">
              The assistant handed {inbox.waiting === 1 ? "this one" : "these"} over.
              Answer {inbox.waiting === 1 ? "it" : "them"} while they are still on the
              page.
            </span>
          </span>
          <span className="shrink-0 font-sans text-[13.5px] font-semibold text-[var(--dash-accent-text)] underline underline-offset-4">
            Open the queue
          </span>
        </Link>
      )}

      {/* What is about to go out. Every other figure on this page is
          something that already happened; this one is the operational number
          somebody acts on before lunch. */}
      {active.length > 0 && (
        <Link
          href={demo ? "/lead-dashboard/sequences?demo=1" : "/lead-dashboard/sequences"}
          className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl border border-line bg-surface px-4 py-3 outline-none transition-colors duration-150 hover:bg-warm focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          style={{ boxShadow: "var(--e1), var(--ring-inset)" }}
        >
          <IconRoute className="h-4 w-4 shrink-0 text-[var(--dash-accent-text)]" />
          <span className="text-[13.5px] font-semibold text-ink">
            {dueToday.length === 0
              ? `${active.length} being followed up`
              : `${dueToday.length} follow-${dueToday.length === 1 ? "up goes" : "ups go"} out today`}
          </span>
          {nextOut && (
            <span className="text-[13.5px] text-muted">
              Next: {nextOut.stepLabel ?? "a message"} to {nextOut.name ?? "a lead"},{" "}
              {when(nextOut.nextDueAt)}.
            </span>
          )}
          <span className="ml-auto shrink-0 text-[13.5px] font-medium text-[var(--dash-accent-text)] underline underline-offset-4">
            See all
          </span>
        </Link>
      )}
      </div>

      {/* A bento grid, not two independent columns.

          The old layout was two rows of 2fr/1fr, and each card was free to be
          whatever height its content wanted. "Where leads came from" drew
          fifteen channels at 938px beside a 321px chart, which left a 617px
          hole down the middle of the page: the first thing anybody noticed.

          Twelve columns with explicit spans, and each card's content capped so
          the pair either side of the gutter land within a row of each other.
          The caps are not arbitrary: an overview is a glance, and the full
          list is one click away on every one of them. */}
      {/* Under the day's figures and above the detail. Everything above this
          says what happened; this is the first block that says what to do
          about it. */}
      <Allocation facts={facts} spend={spendRaw?.spend ?? {}} demo={demo} hidden={factsHidden} />

      <div className="mt-3 grid gap-3 xl:grid-cols-12">
        <Card
          className="xl:col-span-7"
          rise={4}
          title="Call volume"
          note="Last 14 days"
          action={
            <span className="font-sans text-[13px] font-semibold tabular-nums">
              {days.reduce((n, d) => n + d.calls, 0)} calls
            </span>
          }
        >
          <Trend days={days} height={272} />

          {/* Three readings off the same fortnight, under the line.

              Equalising the two cards in this row moved the empty space from
              between them to inside this one, which is not a fix. A line
              shows the shape of a fortnight and hides its edges: the busiest
              day and the quietest day are what somebody actually wants from
              it, and reading them off a chart by eye is guesswork. */}
          <dl className="mt-4 grid grid-cols-3 gap-3 border-t border-line pt-4">
            {[
              {
                k: "Busiest day",
                v: busiest ? String(busiest.calls) : "none",
                note: busiest ? busiest.day : null,
              },
              {
                k: "Quietest day",
                v: quietest ? String(quietest.calls) : "none",
                note: quietest ? quietest.day : null,
              },
              {
                k: "Average a day",
                v: days.length
                  ? (days.reduce((n, d) => n + d.calls, 0) / days.length).toFixed(1)
                  : "0",
                note: "over 14 days",
              },
            ].map((c) => (
              <div key={c.k}>
                <dd className="font-sans text-[20px] font-semibold leading-none tabular-nums text-ink">
                  {c.v}
                </dd>
                <dt className="mt-1.5 text-[12.5px] text-muted">{c.k}</dt>
                {c.note && <p className="text-[12px] text-muted/80">{c.note}</p>}
              </div>
            ))}
          </dl>
        </Card>

        <Card
          className="xl:col-span-5"
          rise={5}
          title="Where leads came from"
          note="Ranked, this period"
        >
          {widget.leads.length === 0 ? (
            <p className="py-6 text-center text-[13.5px] text-muted">No leads captured yet.</p>
          ) : (
            <>
              <BarCompare unit="leads" bars={channelBars} limit={6} />
              <Link
                href={demo ? "/lead-dashboard/channels?demo=1" : "/lead-dashboard/channels"}
                className="mt-4 inline-flex items-center gap-1 text-[13.5px] font-semibold text-[var(--dash-accent-text)] underline underline-offset-4 outline-none hover:opacity-80 focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              >
                The full channel report
              </Link>
            </>
          )}
        </Card>

        <Card
          className="xl:col-span-7"
          rise={6}
          title="Recent activity"
          note="Calls, leads and bookings in one line"
          pad={false}
        >
          {feed.length === 0 ? (
            <div className="p-5">
              <Empty>
                Nothing has happened yet. As soon as the assistant takes a call
                or a visitor types to it, it appears here.
              </Empty>
            </div>
          ) : (
            <ul className="divide-y divide-line">
              {feed.map((f) => {
                const Icon = f.kind === "call" ? IconPhone : f.kind === "lead" ? IconLead : IconCalendar;
                const body = (
                  <div className="flex gap-3 px-4 py-3 sm:px-5">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-warm text-muted">
                      <Icon className="h-[15px] w-[15px]" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[14px] font-medium">{f.title}</p>
                      <p className="mt-0.5 text-[12.5px] text-muted">
                        {fmtDate(f.at)}
                        {f.meta && ` · ${f.meta}`}
                      </p>
                    </div>
                    {f.tag && (
                      <span className="shrink-0 self-start">
                        <Pill kind={f.tag}>{f.tag}</Pill>
                      </span>
                    )}
                  </div>
                );
                return (
                  <li key={`${f.kind}-${f.id}`} className={tr}>
                    {/* Every row goes somewhere now. A lead or a booking opens
                        the conversation it came out of, a call opens the call. */}
                    <Link href={f.href} className="block outline-none focus-visible:bg-warm">
                      {body}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </Card>

        <Card
          className="xl:col-span-5"
          rise={7}
          title="Next appointments"
          note={upcoming.length ? `${upcoming.length} still to come` : undefined}
          pad={false}
        >
          {upcoming.length === 0 ? (
            <div className="p-5">
              <Empty>Nothing in the diary from today onward.</Empty>
            </div>
          ) : (
            <ul className="divide-y divide-line">
              {upcoming.slice(0, 7).map((b) => (
                <li key={b._id} className={`px-4 py-3 sm:px-5 ${tr}`}>
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="font-sans text-[14px] font-semibold tabular-nums">
                      {b.preferredDate}
                    </span>
                    <span className="text-[13px] tabular-nums text-muted">{b.preferredTime}</span>
                  </div>
                  <p className="mt-1 truncate text-[13.5px]">{b.name}</p>
                  <p className="truncate text-[12.5px] text-muted">{b.service}</p>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      <dl className="mt-3 grid gap-3 sm:grid-cols-3">
        <Summary icon={IconPhone} label="Calls, all time" value={String(calls.length)} />
        <Summary icon={IconClock} label="Time on the phone" value={fmtMinutes(allMinutes)} />
        <Summary
          icon={IconChat}
          label="Conversations with an outcome"
          value={String(
            new Set([...widget.leads, ...widget.bookings].map((r) => r.sessionId)).size,
          )}
        />
      </dl>

      {widget.hidden > 0 && (
        <p className="mt-4 text-[13px] leading-relaxed text-muted">
          {widget.hidden} test {widget.hidden === 1 ? "row is" : "rows are"} left
          out of these figures: leads and bookings we made ourselves while
          building the assistant.
        </p>
      )}

      {!widget.reachable && (
        <p className="mt-4 rounded-xl border border-line bg-surface p-4 text-[13.5px] leading-relaxed text-muted">
          The leads and appointments store could not be reached just now, so
          those figures are not current. The call figures come from the phone
          platform and are unaffected.
        </p>
      )}
    </Shell>
  );
}

function Summary({
  icon: Icon,
  label,
  value,
}: {
  icon: (p: { className?: string }) => React.ReactElement;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-warm text-muted">
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <dt className="text-[12.5px] text-muted">{label}</dt>
        <dd className="font-sans text-[17px] font-semibold tabular-nums">{value}</dd>
      </div>
    </div>
  );
}

/** When the newest thing on this page happened, said plainly. */
function Freshness({ last }: { last?: number }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-3 py-1.5 text-[12.5px] text-muted">
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: last ? "var(--accent)" : "var(--color-line)" }}
        aria-hidden="true"
      />
      {last ? `Latest call ${fmtWhen(last)}` : "No calls on record"}
    </span>
  );
}
