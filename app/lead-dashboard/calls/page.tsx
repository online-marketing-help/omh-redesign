import { Shell } from "@/components/dashboard/Shell";
import { DataTable, type Row } from "@/components/dashboard/DataTable";
import { Kpi, deltaOf } from "@/components/dashboard/Stats";
import { IconPhone, IconClock, IconPlay } from "@/components/dashboard/icons";
import {
  getCalls, realCalls, windowOf, previousWindow, dailySeries,
  fmtDuration, fmtMinutes, fmtWhen,
} from "@/lib/dashboard/retell";
import { getWidgetData } from "@/lib/dashboard/convex";
import { sourceLabel, outcomeLabel } from "@/lib/dashboard/channels";
import { isDemo, demoWidgetData, demoCalls } from "@/lib/dashboard/demo";

export const dynamic = "force-dynamic";

const WEEK = 7 * 86400000;

export default async function Calls({
  searchParams,
}: {
  searchParams: Promise<{ demo?: string }>;
}) {
  const demo = isDemo(await searchParams);
  const { real: calls, hidden } = demo
    ? { real: demoCalls(), hidden: 0 }
    : realCalls(await getCalls().catch(() => []));

  /* Who each call belongs to. A call used to sit on its own: no name, no
     channel, no sense of whether it turned into anything, which made this
     the one screen you could not act on. */
  const { leads } = demo ? demoWidgetData() : await getWidgetData();
  const bySession = new Map(leads.map((l) => [l.sessionId, l]));
  const leadFor = (sessionId: string | null) =>
    sessionId ? (bySession.get(sessionId) ?? null) : null;
  const minutes = calls.reduce((n, c) => n + c.durationMs, 0) / 60000;
  const week = windowOf(calls, WEEK);
  const prev = previousWindow(calls, WEEK);
  const withRecording = calls.filter((c) => c.recordingUrl).length;

  const rows: Row[] = calls.map((c) => ({
    id: c.callId,
    q: [c.summary, c.sessionId, c.disconnection, fmtWhen(c.startedAt),
        leadFor(c.sessionId)?.name, leadFor(c.sessionId)?.company]
      .filter(Boolean).join(" ").toLowerCase(),
    sort: {
      when: c.startedAt,
      who: leadFor(c.sessionId)?.name ?? "",
      length: c.durationMs,
      ended: c.disconnection || "",
      session: c.sessionId || "",
    },
    /* A list of calls, not a list of summaries.

       This column used to carry 120 characters of what the assistant decided
       the call was about, on every row. Twenty of those is a wall of prose
       with the facts buried in it, and the summary is not what anybody scans
       a call list for: they scan for who rang and when. The summary, the
       recording and the transcript are one click away, which is where
       something you read a paragraph of belongs. */
    cells: [
      (() => {
        const l = leadFor(c.sessionId);
        return {
          t: "link" as const,
          href: `/lead-dashboard/calls/${c.callId}${demo ? "?demo=1" : ""}`,
          v: l?.name || "Caller not identified",
          sub: l?.company || undefined,
        };
      })(),
      { t: "text", v: fmtWhen(c.startedAt), nowrap: true },
      { t: "num", v: fmtDuration(c.durationMs) },
      { t: "text", v: (c.disconnection || "unknown").replace(/_/g, " "), nowrap: true },
      {
        t: "text",
        v: sourceLabel(leadFor(c.sessionId)?.sourceChannel),
        nowrap: true,
      },
      {
        t: "text",
        v: leadFor(c.sessionId)?.outcome
          ? outcomeLabel(leadFor(c.sessionId)!.outcome)
          : "not set",
      },
      /* Said in words on the row, because whether there is anything to listen
         to is the one thing that changes what opening it gets you. */
      {
        t: "text",
        v: c.recordingUrl ? "Recording" : "No recording",
        nowrap: true,
      },
    ],
  }));

  return (
    <Shell
      active="/lead-dashboard/calls"
      demo={demo}
      title="Calls"
      lead="Every call the assistant took. Open one to hear the recording and read what was said."
      counts={{ "/lead-dashboard/calls": calls.length }}
    >
      <div className="mb-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Kpi label="Calls on record" value={String(calls.length)} icon={IconPhone} accent />
        <Kpi
          label="Last 7 days"
          value={String(week.calls)}
          delta={deltaOf(week.calls, prev.calls)}
          series={dailySeries(calls, 7).map((d) => d.calls)}
          icon={IconClock}
        />
        <Kpi label="Time on the phone" value={fmtMinutes(minutes)} sub="all time" icon={IconClock} />
        <Kpi
          label="With a recording"
          value={String(withRecording)}
          sub={calls.length ? `${Math.round((withRecording / calls.length) * 100)}% of calls` : undefined}
          icon={IconPlay}
        />
      </div>

      <DataTable
        columns={[
          { label: "Who", key: "who" },
          { label: "When", key: "when" },
          { label: "Length", key: "length", align: "right" },
          { label: "Ended", key: "ended" },
          { label: "Came from" },
          { label: "What came of it" },
          { label: "Listen" },
        ]}
        rows={rows}
        minWidth={900}
        searchPlaceholder="Search caller, company, what was said"
        empty="No calls on record yet."
        footnote={
          <>
            Open a call to hear it and read the transcript.
            {hidden > 0 &&
              ` ${hidden} not listed: our own test sessions, and calls where nobody connected.`}
          </>
        }
      />
    </Shell>
  );
}
