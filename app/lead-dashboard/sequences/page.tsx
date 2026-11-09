import { Shell } from "@/components/dashboard/Shell";
import { Card, Empty, ShowExample } from "@/components/dashboard/ui";
import { Kpi } from "@/components/dashboard/Stats";
import { DataTable, type Row, type Facet } from "@/components/dashboard/DataTable";
import { IconRoute, IconClock, IconCheck, IconAlert } from "@/components/dashboard/icons";
import { StopFollowUp } from "@/components/dashboard/StopFollowUp";
import {
  getSequenceBoard, getOutbound, sourceLabel, routeLabel,
  stopReasonLabel, when, canWrite, type SequenceRow, canonicalSource } from "@/lib/dashboard/routing";
import { isDemo, demoSequenceBoard } from "@/lib/dashboard/demo";
import { isTestSession } from "@/lib/dashboard/test-rows";

export const dynamic = "force-dynamic";

const CHANNEL_WORD: Record<string, string> = {
  sms: "Text", email: "Email", call: "Call",
  messenger: "Messenger", instagram: "Instagram DM",
};

export default async function SequencesPage({
  searchParams,
}: {
  searchParams: Promise<{ demo?: string }>;
}) {
  const params = await searchParams;
  const demo = isDemo(params);

  const [board, outbound] = demo
    ? [demoSequenceBoard(), { enabled: true, updatedAt: null, updatedBy: null }]
    : await Promise.all([getSequenceBoard(200), getOutbound()]);

  const all = board?.rows ?? [];
  /* Our own test traffic, by the one shared rule. Hidden, and counted out
     loud at the bottom, as every other screen does. */
  const rows = demo ? all : all.filter((r) => !isTestSession(r.sessionId));
  const hidden = all.length - rows.length;

  /* Convex's clock, not this server's: it is the one that set every due
     time, and comparing two machines' clocks makes a step look overdue on
     one screen and not on another. */
  const now = board?.now ?? 0;
  const active = rows.filter((r) => r.status === "active");
  const due = [...active]
    .filter((r) => r.nextDueAt)
    .sort((a, b) => (a.nextDueAt ?? 0) - (b.nextDueAt ?? 0));

  const stopped = rows.filter((r) => r.status === "stopped");
  const good = stopped.filter(
    (r) => r.stopReason === "replied" || r.stopReason === "booked",
  );

  const tableRows: Row[] = rows.map((r) => ({
    id: r.id,
    q: [r.name, r.phone, r.email, routeLabel(r.route), sourceLabel(r.sourceChannel),
        r.status, stopReasonLabel(r.stopReason)]
      .filter(Boolean).join(" ").toLowerCase(),
    facets: {
      route: r.route,
      status: r.status,
      source: canonicalSource(r.sourceChannel),
    },
    sort: {
      who: r.name ?? "",
      route: r.route,
      due: r.nextDueAt ?? Number.MAX_SAFE_INTEGER,
      started: r.at,
    },
    cells: [
      r.sessionId
        ? { t: "link", v: r.name ?? "Unknown",
            href: `/lead-dashboard/conversations/${encodeURIComponent(r.sessionId)}${demo ? "?demo=1" : ""}`,
            sub: r.phone ?? r.email ?? undefined }
        : { t: "text", v: r.name ?? "Unknown", strong: true, sub: r.phone ?? undefined },
      { t: "text", v: routeLabel(r.route) },
      { t: "text", v: sourceLabel(r.sourceChannel) },
      r.status === "active"
        ? { t: "text", v: r.stepLabel ?? `Step ${r.step + 1}`,
            sub: r.stepChannel ? CHANNEL_WORD[r.stepChannel] ?? r.stepChannel : undefined }
        : { t: "text", v: stopReasonLabel(r.stopReason) || "Finished" },
      { t: "text", v: r.status === "active" ? when(r.nextDueAt) : "Nothing due", nowrap: true },
    ],
  }));

  const countBy = (key: keyof SequenceRow, label: (v: string) => string): Facet["options"] => {
    const tally = new Map<string, number>();
    for (const r of rows) {
      const v = String(r[key] ?? "unknown");
      tally.set(v, (tally.get(v) ?? 0) + 1);
    }
    return [...tally.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([value, count]) => ({ value, label: label(value), count }));
  };

  const facets: Facet[] = [
    { key: "status", label: "State", options: countBy("status", (v) => v[0].toUpperCase() + v.slice(1)) },
    { key: "route", label: "Route", options: countBy("route", (v) => routeLabel(v)) },
    { key: "source", label: "Came from", options: countBy("sourceChannel", sourceLabel) },
  ];

  const unreachable = !demo && board === null;

  return (
    <Shell
      active="/lead-dashboard/sequences"
      title="Follow-ups"
      lead="Who is being chased, and what goes out next."
      counts={{ "/lead-dashboard/sequences": active.length }}
      demo={demo}
    >
      {unreachable ? (
        <Card>
          <Empty>The routing store cannot be reached from here, so this screen is empty rather than wrong.</Empty>
        </Card>
      ) : (
        <>
          {!outbound?.enabled && (
            <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-2xl border border-[#b42318]/30 bg-[#b42318]/8 px-4 py-3 dark:border-[#f97066]/30 dark:bg-[#f97066]/10">
              <IconAlert className="h-4 w-4 shrink-0 text-[#b42318] dark:text-[#f97066]" title="Stopped" />
              <p className="text-[13.5px] font-semibold text-ink">Automated messages are switched off.</p>
              <p className="text-[13.5px] text-muted">Nothing below will be sent.</p>
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Kpi
              label="Being followed up"
              value={String(active.length)}
              sub={active.length === 1 ? "one person" : "people"}
              icon={IconRoute}
              accent
              rise={0}
            />
            <Kpi
              label="Due in the next hour"
              value={String(
                due.filter((r) => (r.nextDueAt ?? 0) - now < 3600_000).length,
              )}
              sub="texts, emails and calls"
              icon={IconClock}
              rise={1}
            />
            <Kpi
              label="Stopped: they answered"
              value={String(good.length)}
              sub={stopped.length ? `of ${stopped.length} stopped` : "none stopped yet"}
              icon={IconCheck}
              rise={2}
            />
            <Kpi
              label="Ran to the end"
              value={String(rows.filter((r) => r.status === "completed").length)}
              sub="no reply, chasing finished"
              icon={IconClock}
              rise={3}
            />
          </div>

          <div className="mt-5 grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,360px)]">
            <Card title="Everyone on a route"
              rise={4}>
              <DataTable
                columns={[
                  { label: "Who", key: "who" },
                  { label: "Route", key: "route" },
                  { label: "Came from" },
                  { label: "Next step" },
                  { label: "When", key: "due" },
                ]}
                rows={tableRows}
                facets={facets}
                searchPlaceholder="Search name, number, route"
                empty="Nobody is being followed up yet."
                minWidth={720}
                footnote={
                  hidden > 0
                    ? `${hidden} test ${hidden === 1 ? "row is" : "rows are"} not listed.`
                    : undefined
                }
              />
              {rows.length === 0 && !demo && (
                <div className="text-center">
                  <ShowExample href="/lead-dashboard/sequences?demo=1" />
                </div>
              )}
            </Card>

            <Card title="Due next" rise={5}>
              {due.length === 0 ? (
                <Empty>Nothing is scheduled.</Empty>
              ) : (
                <ol className="flex flex-col">
                  {due.slice(0, 8).map((r, i) => (
                    <li key={r.id}
                      className={["flex items-start gap-3 py-3", i ? "border-t border-line" : ""].join(" ")}>
                      <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-warm text-[11px] font-semibold uppercase tracking-wide text-muted">
                        {r.route}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[13.5px] font-medium text-ink">{r.name ?? "Unknown"}</p>
                        <p className="mt-0.5 text-[12.5px] leading-snug text-muted">
                          {r.stepLabel ?? `Step ${r.step + 1}`}
                          {r.stepChannel ? ` · ${CHANNEL_WORD[r.stepChannel] ?? r.stepChannel}` : ""}
                        </p>
                      </div>
                      <span className="flex shrink-0 flex-col items-end gap-1.5">
                        <span className="whitespace-nowrap text-[12.5px] font-medium tabular-nums text-[var(--dash-accent-text)]">
                          {when(r.nextDueAt)}
                        </span>
                        {/* Stopping one person belongs here, beside the thing
                            about to go out, rather than on a settings screen
                            that stops everybody. */}
                        {!demo && canWrite && (
                          <StopFollowUp leadId={r.leadId} name={r.name} />
                        )}
                      </span>
                    </li>
                  ))}
                </ol>
              )}
              {due.length > 8 && (
                <p className="mt-3 text-[12.5px] text-muted">
                  and {due.length - 8} more after those.
                </p>
              )}
            </Card>
          </div>

          {stopped.length > 0 && (
            <Card title="Why follow-ups stopped"
              note="Replied and booked are the two worth having."
              className="mt-5" rise={6}>
              <ul className="flex flex-wrap gap-2">
                {[...new Set(stopped.map((r) => r.stopReason))].map((reason) => {
                  const n = stopped.filter((r) => r.stopReason === reason).length;
                  const wanted = reason === "replied" || reason === "booked";
                  return (
                    <li key={reason ?? "none"}
                      className={[
                        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[13px]",
                        wanted
                          ? "border-[rgb(var(--accent-rgb)/.35)] bg-[rgb(var(--accent-rgb)/.1)] text-ink"
                          : "border-line bg-surface text-ink",
                      ].join(" ")}>
                      {wanted && <IconCheck className="h-3.5 w-3.5 text-[var(--dash-accent-text)]" />}
                      <span className="font-medium">{stopReasonLabel(reason)}</span>
                      <span className="tabular-nums text-muted">{n}</span>
                    </li>
                  );
                })}
              </ul>
            </Card>
          )}
        </>
      )}
    </Shell>
  );
}
