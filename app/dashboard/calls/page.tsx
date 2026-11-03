import { Shell } from "@/components/dashboard/Shell";
import { DataTable, type Row } from "@/components/dashboard/DataTable";
import { Kpi, deltaOf } from "@/components/dashboard/Stats";
import { IconPhone, IconClock, IconPlay } from "@/components/dashboard/icons";
import {
  getCalls, realCalls, windowOf, previousWindow, dailySeries,
  fmtDuration, fmtMinutes, fmtWhen,
} from "@/lib/dashboard/retell";

export const dynamic = "force-dynamic";

const WEEK = 7 * 86400000;

export default async function Calls() {
  const { real: calls, hidden } = realCalls(await getCalls().catch(() => []));
  const minutes = calls.reduce((n, c) => n + c.durationMs, 0) / 60000;
  const week = windowOf(calls, WEEK);
  const prev = previousWindow(calls, WEEK);
  const withRecording = calls.filter((c) => c.recordingUrl).length;

  const rows: Row[] = calls.map((c) => ({
    id: c.callId,
    q: [c.summary, c.sessionId, c.disconnection, fmtWhen(c.startedAt)].join(" ").toLowerCase(),
    sort: {
      when: c.startedAt,
      length: c.durationMs,
      ended: c.disconnection || "",
      session: c.sessionId || "",
    },
    cells: [
      { t: "text", v: fmtWhen(c.startedAt), nowrap: true },
      { t: "num", v: fmtDuration(c.durationMs) },
      {
        t: "link",
        href: `/dashboard/calls/${c.callId}`,
        v: c.summary
          ? c.summary.slice(0, 120) + (c.summary.length > 120 ? "..." : "")
          : "No summary recorded",
        sub: c.recordingUrl ? "Recording and transcript" : "No recording",
      },
      { t: "text", v: (c.disconnection || "unknown").replace(/_/g, " "), nowrap: true },
      { t: "text", v: c.sessionId ? c.sessionId.slice(0, 18) : "not linked", mono: true },
    ],
  }));

  return (
    <Shell
      active="/dashboard/calls"
      title="Calls"
      lead="Every call the assistant took. Open one to hear the recording and read what was said."
      counts={{ "/dashboard/calls": calls.length }}
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
          { label: "When", key: "when", width: "15%" },
          { label: "Length", key: "length", align: "right", width: "8%" },
          { label: "What it was about" },
          { label: "Ended", key: "ended", width: "14%" },
          { label: "Session", key: "session", width: "15%" },
        ]}
        rows={rows}
        searchPlaceholder="Search summaries, sessions"
        empty="No calls on record yet. Once the number is live, every call appears here with its recording, transcript and summary."
        footnote={
          <>
            {hidden > 0 && (
              <>
                {hidden} further {hidden === 1 ? "call is" : "calls are"} not
                listed: our own test sessions, and calls where the caller never
                connected.{" "}
              </>
            )}
            The session column is what ties a call to the same visitor&apos;s
            chat. When a caller has typed to the assistant first, both sit under
            one id, so you are reading one conversation rather than two.
          </>
        }
      />
    </Shell>
  );
}
