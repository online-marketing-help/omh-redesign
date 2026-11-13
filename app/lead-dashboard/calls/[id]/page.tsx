import Link from "next/link";
import { notFound } from "next/navigation";
import { Shell } from "@/components/dashboard/Shell";
import { Card, Pill } from "@/components/dashboard/ui";
import { IconBack, IconClock, IconCheck, IconLink, IconMic } from "@/components/dashboard/icons";
import { getCall, fmtDuration, fmtWhen } from "@/lib/dashboard/retell";
import { isDemo, demoCall } from "@/lib/dashboard/demo";

export const dynamic = "force-dynamic";

export default async function CallDetail({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ demo?: string }>;
}) {
  const { id } = await params;
  const demo = isDemo(await searchParams);
  const call = demo ? demoCall(id) : await getCall(id).catch(() => null);
  if (!call) notFound();

  const handled = call.successful !== false;

  return (
    <Shell
      active="/lead-dashboard/calls"
      demo={demo}
      title="Call"
      lead={fmtWhen(call.startedAt)}
      toolbar={
        <Link
          href={`/lead-dashboard/calls${demo ? "?demo=1" : ""}`}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-line bg-surface px-3 py-1.5 text-[13.5px] font-semibold outline-none transition-colors duration-150 hover:bg-warm focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
        >
          <IconBack className="h-4 w-4" />
          All calls
        </Link>
      }
    >
      <div className="grid gap-3 sm:grid-cols-3">
        <Fact icon={IconClock} label="Length" value={fmtDuration(call.durationMs)} />
        <Fact
          icon={IconCheck}
          label="Outcome"
          value={handled ? "Handled" : "Needs a look"}
          sub={(call.disconnection || "").replace(/_/g, " ") || undefined}
        />
        <Fact
          icon={IconLink}
          label="Session"
          value={call.sessionId ? "Linked to a chat" : "Not linked"}
          sub={call.sessionId?.slice(0, 22) || "no chat on this one"}
          mono={Boolean(call.sessionId)}
        />
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:items-start">
        <div className="grid gap-3">
          {call.summary && (
            <Card title="What happened">
              <p className="max-w-[70ch] text-[14.5px] leading-relaxed">{call.summary}</p>
            </Card>
          )}

          <Card title="Recording" note={call.recordingUrl ? "Plays in the browser" : undefined}>
            {call.recordingUrl ? (
              <audio controls preload="none" src={call.recordingUrl} className="w-full">
                Your browser cannot play this recording.{" "}
                <a href={call.recordingUrl}>Download it instead</a>.
              </audio>
            ) : (
              <p className="text-[13.5px] text-muted">No recording was kept for this call.</p>
            )}
          </Card>
        </div>

        <Card
          title="Transcript"
          note={call.turns.length ? `${call.turns.length} turns` : undefined}
          pad={false}
        >
          {call.turns.length === 0 ? (
            <p className="px-5 pb-5 text-[13.5px] text-muted">
              No transcript was recorded for this call.
            </p>
          ) : (
            /* Laid out as a conversation rather than a two column table: the
               agent on the left, the caller on the right, which is how every
               messaging app has taught people to read dialogue. */
            <ol className="max-h-[560px] space-y-3 overflow-y-auto px-4 pb-5 sm:px-5">
              {call.turns.map((t, i) => {
                const agent = t.role === "agent";
                return (
                  <li key={i} className={`flex ${agent ? "justify-start" : "justify-end"}`}>
                    <div className={`max-w-[85%] ${agent ? "" : "text-right"}`}>
                      <p className="mb-1 flex items-center gap-1.5 font-sans text-[11px] font-semibold uppercase tracking-[.09em] text-muted">
                        {agent && <IconMic className="h-3 w-3" />}
                        {agent ? "Assistant" : "Caller"}
                      </p>
                      <p
                        className={`rounded-xl px-3.5 py-2.5 text-left text-[14px] leading-relaxed ${
                          agent
                            ? "bg-warm"
                            : "bg-[rgb(var(--accent-rgb)/.18)] border border-[rgb(var(--accent-rgb)/.35)]"
                        }`}
                      >
                        {t.text}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          )}
        </Card>
      </div>

      <p className="mt-4 flex flex-wrap items-center gap-2 text-[13px] text-muted">
        <Pill kind={handled ? "confirmed" : "hot"}>{handled ? "handled" : "review"}</Pill>
        Call id <span className="font-mono text-[12.5px]">{call.callId}</span>
      </p>
    </Shell>
  );
}

function Fact({
  icon: Icon,
  label,
  value,
  sub,
  mono,
}: {
  icon: (p: { className?: string }) => React.ReactElement;
  label: string;
  value: string;
  sub?: string;
  mono?: boolean;
}) {
  return (
    <div className="rounded-xl border border-line bg-surface p-4">
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-warm text-muted">
          <Icon className="h-[15px] w-[15px]" />
        </span>
        <p className="text-[12.5px] text-muted">{label}</p>
      </div>
      <p className="mt-2 font-sans text-[19px] font-semibold tracking-[-.02em] tabular-nums">
        {value}
      </p>
      {sub && (
        <p className={`mt-0.5 text-[12.5px] text-muted ${mono ? "font-mono" : ""}`}>{sub}</p>
      )}
    </div>
  );
}
