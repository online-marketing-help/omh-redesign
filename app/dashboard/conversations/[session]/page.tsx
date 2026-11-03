import Link from "next/link";
import { Shell } from "@/components/dashboard/Shell";
import { Card, Pill, Empty } from "@/components/dashboard/ui";
import {
  IconBack, IconChat, IconMic, IconLead, IconCalendar, IconHandover, IconPhone, IconClock,
} from "@/components/dashboard/icons";
import { getThread, getVisitorConversations } from "@/lib/dashboard/handover";
import { getCalls, getCall, fmtDuration, fmtWhen } from "@/lib/dashboard/retell";
import { fmtDate } from "@/lib/dashboard/convex";

export const dynamic = "force-dynamic";

/* One conversation, whole.

   A lead row says somebody left their number and what they were after. It
   never says how they got there: what they asked first, what the assistant
   told them, where it lost them, whether a person had to step in. That is the
   only thing worth reading before calling them back, and until now it was not
   anywhere in this dashboard.

   A conversation can be in two places at once. The typed half lives in the
   assistant's own store; if the visitor also picked up the phone, that half
   lives in the phone platform and is never copied across. This pulls both and
   shows them as what they are, two parts of one conversation, rather than
   pretending to interleave turns that have no shared clock. */

export default async function Conversation({
  params,
}: {
  params: Promise<{ session: string }>;
}) {
  const { session } = await params;
  const sessionId = decodeURIComponent(session);

  const [thread, allCalls] = await Promise.all([
    getThread(sessionId),
    getCalls().catch(() => []),
  ]);

  /* Calls belonging to this conversation: either the session recorded the id
     when the call started, or the call carried the session id with it. */
  const linked = allCalls.filter(
    (c) => c.sessionId === sessionId || (thread?.retellCallId && c.callId === thread.retellCallId),
  );
  /* Capped: a conversation with more than three calls behind it is a support
     case, and loading every transcript to draw one page is not worth it. */
  const calls = await Promise.all(linked.slice(0, 3).map((c) => getCall(c.callId).catch(() => null)));

  const reachable = thread !== null;
  const messages = thread?.messages ?? [];
  const lead = thread?.leads?.[0] ?? null;
  const name = lead?.name || thread?.profile?.name || "Visitor";

  return (
    <Shell
      active="/dashboard/leads"
      title={name}
      lead={
        reachable
          ? "Everything said in this conversation, by chat and by phone, and what came out of it."
          : undefined
      }
      toolbar={
        <Link
          href="/dashboard/leads"
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-line bg-surface px-3 py-1.5 text-[13.5px] font-semibold outline-none transition-colors duration-150 hover:bg-warm focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
        >
          <IconBack className="h-4 w-4" />
          All leads
        </Link>
      }
    >
      {!reachable ? (
        <Empty>
          The conversation store did not answer, so this transcript cannot be
          shown. Either the handover routes are not deployed to the
          assistant&rsquo;s Convex deployment yet, or OHM_WIDGET_SECRET is not
          set on this server.
        </Empty>
      ) : messages.length === 0 && calls.filter(Boolean).length === 0 ? (
        <Empty>
          Nothing was recorded for this conversation. Leads captured before
          message logging was switched on have no transcript behind them.
        </Empty>
      ) : (
        <div className="grid gap-3 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] xl:items-start">
          <div className="grid gap-3">
            {messages.length > 0 && (
              <Card
                title="Chat"
                note={`${messages.filter((m) => m.role !== "system").length} messages`}
                pad={false}
              >
                <ol className="space-y-3 px-4 py-4 sm:px-5" aria-label="Chat transcript">
                  {messages.map((m, i) => (
                    <Bubble key={i} role={m.role} text={m.text} at={m.at} />
                  ))}
                </ol>
              </Card>
            )}

            {calls.map((c) =>
              !c ? null : (
                <Card
                  key={c.callId}
                  title="Phone call"
                  note={`${fmtWhen(c.startedAt)} · ${fmtDuration(c.durationMs)}`}
                  action={
                    <Link
                      href={`/dashboard/calls/${c.callId}`}
                      className="font-sans text-[13px] font-semibold text-[var(--dash-accent-text)] underline underline-offset-4 outline-none hover:opacity-80 focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                    >
                      Open the call
                    </Link>
                  }
                  pad={false}
                >
                  <div className="space-y-4 px-4 py-4 sm:px-5">
                    {c.summary && (
                      <p className="max-w-[70ch] text-[14.5px] leading-relaxed">{c.summary}</p>
                    )}
                    {c.recordingUrl && (
                      <audio controls preload="none" src={c.recordingUrl} className="w-full">
                        Your browser cannot play this recording.
                      </audio>
                    )}
                    {c.turns.length > 0 && (
                      /* Scrolls in place rather than running down the page. A
                         six minute call is over a hundred turns, and left to
                         grow it pushed everything else, the lead and the
                         contact details included, five thousand pixels down
                         where nobody would find them. The summary and the
                         recording above it are what most people read. */
                      <div className="rounded-xl border border-line">
                        <p className="border-b border-line px-3.5 py-2 font-sans text-[11px] font-semibold uppercase tracking-[.08em] text-muted">
                          Transcript · {c.turns.length} turns
                        </p>
                        <ol
                          className="max-h-[520px] space-y-3 overflow-y-auto p-3.5"
                          aria-label="Call transcript"
                        >
                          {c.turns.map((t, i) => (
                            <Bubble
                              key={i}
                              role={t.role === "agent" ? "assistant" : "user"}
                              text={t.text}
                            />
                          ))}
                        </ol>
                      </div>
                    )}
                  </div>
                </Card>
              ),
            )}
          </div>

          <div className="grid gap-3">
            <Outcome thread={thread} />
            <OtherVisits sessionId={sessionId} visitorId={thread.visitorId} />
            <Details thread={thread} sessionId={sessionId} />
          </div>
        </div>
      )}
    </Shell>
  );
}

/** What came of it, at the top of the column, because that is the question a
    person opening a lead is actually asking. */
function Outcome({ thread }: { thread: NonNullable<Awaited<ReturnType<typeof getThread>>> }) {
  const open = thread.questions.filter((q) => !q.handled);
  const nothing =
    thread.leads.length === 0 && thread.bookings.length === 0 && open.length === 0;

  return (
    <Card title="What came of it">
      {nothing ? (
        <p className="text-[13.5px] leading-relaxed text-muted">
          Nothing was captured and nothing was booked. The visitor asked, got
          an answer and left.
        </p>
      ) : (
        <ul className="space-y-3">
          {thread.leads.map((l) => (
            <li key={l.id} className="flex gap-3">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-warm text-muted">
                <IconLead className="h-[15px] w-[15px]" />
              </span>
              <div className="min-w-0">
                <p className="text-[14px] font-medium">
                  Left their details{l.service ? ` about ${l.service}` : ""}
                </p>
                <p className="mt-0.5 text-[12.5px] text-muted">
                  {fmtDate(l.at)}
                  {l.budget ? ` · ${l.budget}` : ""}
                </p>
                {l.hot && (
                  <span className="mt-1.5 inline-block">
                    <Pill kind="hot">hot</Pill>
                  </span>
                )}
              </div>
            </li>
          ))}

          {thread.bookings.map((b) => (
            <li key={b.id} className="flex gap-3">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-warm text-muted">
                <IconCalendar className="h-[15px] w-[15px]" />
              </span>
              <div className="min-w-0">
                <p className="text-[14px] font-medium">Booked {b.service}</p>
                <p className="mt-0.5 text-[12.5px] tabular-nums text-muted">
                  {b.preferredDate} at {b.preferredTime} · {b.reference}
                </p>
                <span className="mt-1.5 inline-block">
                  <Pill kind={b.status}>{b.status}</Pill>
                </span>
              </div>
            </li>
          ))}

          {open.map((q) => (
            <li key={q.id} className="flex gap-3">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[rgb(var(--accent-rgb)/.25)] text-[var(--dash-accent-text)]">
                <IconHandover className="h-[15px] w-[15px]" />
              </span>
              <div className="min-w-0">
                <p className="text-[14px] font-medium">Still waiting on a person</p>
                <p className="mt-0.5 text-[12.5px] leading-relaxed text-muted">{q.question}</p>
                <Link
                  href="/dashboard/handover"
                  className="mt-1.5 inline-block font-sans text-[13px] font-semibold text-[var(--dash-accent-text)] underline underline-offset-4 outline-none hover:opacity-80 focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                >
                  Answer them
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

/** The same person's earlier and later visits.
 *
 *  Without this a conversation reads as a one-off, and somebody ringing them
 *  back has no idea this is the third time they have asked. Shown only when
 *  there is more than this one, so a first-time visitor gains no empty card. */
async function OtherVisits({
  sessionId,
  visitorId,
}: {
  sessionId: string;
  visitorId: string | null;
}) {
  if (!visitorId) return null;
  const all = await getVisitorConversations(visitorId);
  const others = all.filter((s) => s.sessionId !== sessionId);
  if (others.length === 0) return null;

  return (
    <Card
      title="Their other visits"
      note={`${all.length} conversations in total`}
      pad={false}
    >
      <ul className="divide-y divide-line">
        {others.map((s) => (
          <li key={s.sessionId}>
            <Link
              href={`/dashboard/conversations/${encodeURIComponent(s.sessionId)}`}
              className="flex gap-3 px-4 py-3 outline-none transition-colors duration-150 hover:bg-warm focus-visible:bg-warm sm:px-5"
            >
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-warm text-muted">
                {s.channel === "voice" ? (
                  <IconMic className="h-[15px] w-[15px]" />
                ) : (
                  <IconChat className="h-[15px] w-[15px]" />
                )}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13.5px] font-medium">
                  {s.opened || "No message recorded"}
                </span>
                <span className="mt-0.5 block text-[12.5px] text-muted">
                  {fmtDate(s.lastSeenAt)} · {s.messages} messages
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function Details({
  thread,
  sessionId,
}: {
  thread: NonNullable<Awaited<ReturnType<typeof getThread>>>;
  sessionId: string;
}) {
  const p = thread.profile;
  const l = thread.leads[0];
  const facts: [string, string][] = [];
  const add = (k: string, v?: string | null) => {
    if (v && !facts.some(([x]) => x === k)) facts.push([k, v]);
  };

  add("Phone", l?.phone || p?.phone || thread.bookings[0]?.phone);
  add("Email", l?.email || p?.email);
  add("Company", l?.company || p?.company);
  add("Website", p?.website);
  add("Wanted", l?.service);
  add("Budget", l?.budget || p?.budget);
  if (p?.interestedIn?.length) add("Interested in", p.interestedIn.join(", "));
  add("Started", thread.startedAt ? fmtDate(thread.startedAt) : null);
  add("Last seen", thread.lastSeenAt ? fmtDate(thread.lastSeenAt) : null);
  add("On page", thread.pageUrl?.replace(/^https?:\/\//, ""));

  return (
    <Card title="Who they are">
      <dl className="space-y-2.5">
        {facts.map(([k, v]) => (
          <div key={k} className="flex gap-3 text-[13.5px]">
            <dt className="w-[86px] shrink-0 text-muted">{k}</dt>
            <dd className="min-w-0 flex-1 break-words font-medium">{v}</dd>
          </div>
        ))}
        <div className="flex gap-3 text-[13.5px]">
          <dt className="w-[86px] shrink-0 text-muted">Channel</dt>
          <dd className="flex min-w-0 flex-1 items-center gap-1.5 font-medium capitalize">
            {thread.channel === "voice" ? (
              <IconMic className="h-4 w-4 text-muted" />
            ) : (
              <IconChat className="h-4 w-4 text-muted" />
            )}
            {thread.channel}
          </dd>
        </div>
      </dl>
      <p className="mt-4 border-t border-line pt-3 font-mono text-[12px] leading-relaxed text-muted">
        {sessionId}
      </p>
    </Card>
  );
}

/** Four voices: the assistant, a person from the team, the visitor, and the
    system's own notes, which are a line rather than a bubble because nobody
    said them. */
function Bubble({ role, text, at }: { role: string; text: string; at?: number }) {
  if (role === "system") {
    return (
      <li className="flex items-center gap-3 py-1">
        <span aria-hidden="true" className="h-px flex-1 bg-[var(--color-line)]" />
        <span className="text-[12px] text-muted">{text}</span>
        <span aria-hidden="true" className="h-px flex-1 bg-[var(--color-line)]" />
      </li>
    );
  }

  const visitor = role === "user";
  const human = role === "human";
  return (
    <li className={`flex ${visitor ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[85%] ${visitor ? "text-right" : ""}`}>
        <p className="mb-1 font-sans text-[11px] font-semibold uppercase tracking-[.09em] text-muted">
          {visitor ? "Them" : human ? "A person from the team" : "Assistant"}
          {at && <span className="ml-2 font-normal normal-case tracking-normal">{clock(at)}</span>}
        </p>
        <p
          className={`rounded-xl px-3.5 py-2.5 text-left text-[14.5px] leading-relaxed ${
            visitor
              ? "border border-[rgb(var(--accent-rgb)/.35)] bg-[rgb(var(--accent-rgb)/.18)]"
              : human
                ? "bg-inverse text-oninverse"
                : "bg-warm"
          }`}
        >
          {text}
        </p>
      </div>
    </li>
  );
}

function clock(at: number): string {
  return new Date(at).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/London",
  });
}
