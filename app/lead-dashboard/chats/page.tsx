import { Shell } from "@/components/dashboard/Shell";
import { DataTable, type Row, type Facet } from "@/components/dashboard/DataTable";
import { Empty } from "@/components/dashboard/ui";
import { Kpi } from "@/components/dashboard/Stats";
import { ViewToggle } from "@/components/dashboard/ViewToggle";
import { IconChat, IconMic, IconLead, IconHandover } from "@/components/dashboard/icons";
import { getConversations, getWidgetData, fmtDate } from "@/lib/dashboard/convex";
import { sourceLabel, canonicalSource } from "@/lib/dashboard/channels";
import { isDemo, demoConversations, demoWidgetData } from "@/lib/dashboard/demo";

export const dynamic = "force-dynamic";

export default async function Chats({
  searchParams,
}: {
  searchParams: Promise<{ demo?: string }>;
}) {
  const demo = isDemo(await searchParams);
  const [{ sessions, available, hidden }, widget] = demo
    ? [demoConversations(), demoWidgetData()]
    : await Promise.all([getConversations(), getWidgetData()]);

  /* Which conversations produced something. Read from the lead and booking
     rows rather than guessed from the transcript, so the column means the
     same thing as the figure on the leads screen. */
  const withLead = new Set(widget.leads.map((l) => l.sessionId));
  /* Which channel each conversation came from. The session itself records the
     transport, chat or voice; the lead records which advert or page sent
     them, which is the question this filter is for. */
  const sourceOf = new Map(
    widget.leads.map((l) => [l.sessionId, canonicalSource(l.sourceChannel)]),
  );
  const withBooking = new Set(widget.bookings.map((b) => b.sessionId));

  const voice = sessions.filter((s) => s.channel === "voice").length;
  const handedOver = sessions.filter((s) => s.handover).length;
  const converted = sessions.filter(
    (s) => withLead.has(s.sessionId) || withBooking.has(s.sessionId),
  ).length;

  const rows: Row[] = sessions.map((s) => {
    const outcome = [
      withLead.has(s.sessionId) ? "lead" : null,
      withBooking.has(s.sessionId) ? "booked" : null,
      s.handover === "waiting" ? "waiting" : s.handover ? "had a person" : null,
    ].filter(Boolean) as string[];

    return {
      id: s.sessionId,
      q: [s.sessionId, s.name, s.opened, s.lastText, s.channel,
          sourceLabel(sourceOf.get(s.sessionId))]
        .filter(Boolean).join(" ").toLowerCase(),
      facets: { source: sourceOf.get(s.sessionId) ?? "unknown" },
      sort: {
        who: s.name || s.opened || "",
        channel: s.channel,
        source: sourceLabel(sourceOf.get(s.sessionId)),
        turns: s.turns,
        last: s.lastSeenAt,
      },
      cells: [
        {
          t: "link",
          v: s.name || "Visitor",
          href: `/lead-dashboard/conversations/${encodeURIComponent(s.sessionId)}`,
          sub: s.phone || s.email || undefined,
        },
        /* What they opened with. It says more about why they came than the
           last message does, which is usually the assistant signing off. */
        { t: "text", v: s.opened || "Nothing recorded" },
        { t: "pill", v: s.channel },
        { t: "text", v: sourceLabel(sourceOf.get(s.sessionId)) },
        { t: "num", v: String(s.turns) },
        outcome.length
          ? { t: "pills", v: outcome }
          : { t: "text", v: "nothing", sub: undefined },
        { t: "text", v: fmtDate(s.lastSeenAt), nowrap: true },
      ],
    };
  });

  const tally = new Map<string, number>();
  for (const s of sessions) {
    const v = sourceOf.get(s.sessionId) ?? "unknown";
    tally.set(v, (tally.get(v) ?? 0) + 1);
  }
  const channelFacet: Facet = {
    key: "source",
    label: "Came from",
    options: [...tally.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([value, count]) => ({ value, label: sourceLabel(value), count })),
  };

  return (
    <Shell
      /* The same navigation entry as the Inbox. These are two views of one
         thing, so the rail highlights one section however you got here. */
      active="/lead-dashboard/inbox"
      title="Inbox"
      lead="Everyone who talked to the assistant, by chat or by phone."
      demo={demo}
      toolbar={
        <ViewToggle
          active="/lead-dashboard/chats"
          views={[
            { href: `/lead-dashboard/inbox${demo ? "?demo=1" : ""}`, label: "Messages" },
            { href: `/lead-dashboard/chats${demo ? "?demo=1" : ""}`, label: "By person" },
          ]}
        />
      }
    >
      {!available ? (
        <Empty>
          The conversation store did not answer, so this list is not current.
          Nothing is lost while it is down: the assistant keeps recording.
        </Empty>
      ) : (
        <>
          <div className="mb-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <Kpi rise={0} label="Conversations" value={String(sessions.length)} icon={IconChat} accent />
            <Kpi
              rise={1}
              label="By phone"
              value={String(voice)}
              sub={`${sessions.length - voice} by chat`}
              icon={IconMic}
            />
            <Kpi
              rise={2}
              label="Left something behind"
              value={String(converted)}
              sub={
                sessions.length
                  ? `${Math.round((converted / sessions.length) * 100)}% of conversations`
                  : undefined
              }
              icon={IconLead}
            />
            <Kpi
              rise={3}
              label="Needed a person"
              value={String(handedOver)}
              sub={handedOver === 0 ? "the assistant handled them all" : undefined}
              icon={IconHandover}
            />
          </div>

          <DataTable
            columns={[
              { label: "Who", key: "who", width: "18%" },
              { label: "What they opened with" },
              { label: "Channel", key: "channel", width: "9%" },
              { label: "Came from", key: "source", width: "13%" },
              { label: "Their turns", key: "turns", align: "right", width: "10%" },
              { label: "Outcome", width: "16%" },
              { label: "Last seen", key: "last", width: "14%" },
            ]}
            rows={rows}
            picker={channelFacet}
            searchPlaceholder="Search name, question, channel"
            empty="Nobody has talked to the assistant yet."
            footnote={
              <>
                Click a name to read the whole conversation: the chat if they
                typed, the recording and summary if they called.
                {hidden > 0 &&
                  ` ${hidden} test ${hidden === 1 ? "conversation is" : "conversations are"} not listed: our own smoke tests and the industry demo checks.`}
              </>
            }
          />
        </>
      )}
    </Shell>
  );
}
