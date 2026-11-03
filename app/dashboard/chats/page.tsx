import { Shell } from "@/components/dashboard/Shell";
import { DataTable, type Row } from "@/components/dashboard/DataTable";
import { Empty } from "@/components/dashboard/ui";
import { Kpi } from "@/components/dashboard/Stats";
import { IconChat, IconMic, IconLead, IconHandover } from "@/components/dashboard/icons";
import { getConversations, getWidgetData, fmtDate } from "@/lib/dashboard/convex";

export const dynamic = "force-dynamic";

export default async function Chats() {
  const [{ sessions, available, hidden }, widget] = await Promise.all([
    getConversations(),
    getWidgetData(),
  ]);

  /* Which conversations produced something. Read from the lead and booking
     rows rather than guessed from the transcript, so the column means the
     same thing as the figure on the leads screen. */
  const withLead = new Set(widget.leads.map((l) => l.sessionId));
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
      q: [s.sessionId, s.name, s.opened, s.lastText, s.channel].join(" ").toLowerCase(),
      sort: {
        who: s.name || s.opened || "",
        channel: s.channel,
        turns: s.turns,
        last: s.lastSeenAt,
      },
      cells: [
        {
          t: "link",
          v: s.name || "Visitor",
          href: `/dashboard/conversations/${encodeURIComponent(s.sessionId)}`,
          sub: s.phone || s.email || undefined,
        },
        /* What they opened with. It says more about why they came than the
           last message does, which is usually the assistant signing off. */
        { t: "text", v: s.opened || "Nothing recorded" },
        { t: "pill", v: s.channel },
        { t: "num", v: String(s.turns) },
        outcome.length
          ? { t: "pills", v: outcome }
          : { t: "text", v: "nothing", sub: undefined },
        { t: "text", v: fmtDate(s.lastSeenAt), nowrap: true },
      ],
    };
  });

  return (
    <Shell
      active="/dashboard/chats"
      title="Conversations"
      lead="Everyone who talked to the assistant. One id covers their typing and their call, so a person who chats and then rings is one conversation here."
      counts={{ "/dashboard/chats": sessions.length }}
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
              { label: "Channel", key: "channel", width: "10%" },
              { label: "Their turns", key: "turns", align: "right", width: "10%" },
              { label: "Outcome", width: "16%" },
              { label: "Last seen", key: "last", width: "14%" },
            ]}
            rows={rows}
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
