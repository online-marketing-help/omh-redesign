import { Card, Empty } from "./ui";
import {
  IconChat, IconPhone, IconSend, IconCheck, IconAlert, IconCalendar, IconClock,
} from "./icons";
import {
  when, routeLabel, stopReasonLabel, type TimelineEvent, type LeadTimeline,
} from "@/lib/dashboard/routing";

/* =========================================================================
   What we actually did about this lead, in order.

   The conversation page already showed three separate lists: the chat, the
   calls, and an "outcome" card of leads and bookings. Reading them together
   meant interleaving three sets of timestamps by eye, which is why "what did
   we actually do about this person" was hard to answer from a screen whose
   whole job is answering it.

   This is one column, one clock. A message they sent, a text we sent back, a
   call that went unanswered and the booking that came of it all sit in the
   same list in the order they happened.

   No database match was found for a timeline pattern in the design skill, so
   the shape here follows the dashboard's own conventions rather than an
   external recommendation: the rail's spine, the brand accent for anything
   outbound, and plain ink for anything the person themselves did.
   ========================================================================= */

const CHANNEL_WORD: Record<string, string> = {
  sms: "Text", email: "Email", call: "Call", chat: "Chat", voice: "Voice",
  messenger: "Messenger", instagram: "Instagram",
};

function iconFor(e: TimelineEvent) {
  if (e.type === "booking") return IconCalendar;
  if (e.channel === "call" || e.channel === "voice") return IconPhone;
  if (e.channel === "email") return IconSend;
  return IconChat;
}

/** What this event is, in the fewest words that are still specific. */
function headline(e: TimelineEvent, first: boolean): string {
  if (e.type === "booking") return "Appointment booked";
  const w = CHANNEL_WORD[e.channel ?? ""] ?? e.channel ?? "Message";
  if (e.direction === "in") {
    if (e.channel === "call") return first ? "They called" : "They called back";
    /* The first inbound event is the enquiry itself. Calling it a reply
       reads as though we contacted them first, which inverts the whole
       point: everything after this is a response to them. */
    return first ? "They got in touch" : `They replied by ${w.toLowerCase()}`;
  }
  if (e.type === "message") return e.role === "human" ? "A person replied" : "The assistant replied";
  if (e.channel === "call") {
    return e.status === "answered" ? "We called, they answered"
      : e.status === "no_answer" ? "We called, no answer"
      : "We called";
  }
  return `We sent a ${w.toLowerCase()}`;
}

function clock(ms: number) {
  return new Date(ms).toLocaleString("en-GB", {
    day: "numeric", month: "short", hour: "2-digit", minute: "2-digit",
    timeZone: "Europe/London",
  });
}

export function FollowUpTimeline({
  timeline,
  rise,
}: {
  timeline: LeadTimeline;
  rise?: number;
}) {
  const { events, sequences, lead } = timeline;
  const live = sequences.find((s) => s.status === "active");
  const ended = sequences.find((s) => s.status !== "active");
  const start = lead.firstAt;

  return (
    <Card
      title="What we did about it"
      rise={rise}
    >
      {live ? (
        <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl border border-[rgb(var(--accent-rgb)/.3)] bg-[rgb(var(--accent-rgb)/.09)] px-4 py-3">
          <IconClock className="h-4 w-4 shrink-0 text-[var(--dash-accent-text)]" />
          <p className="text-[13.5px] font-semibold text-ink">
            Still being followed up on route {live.route}.
          </p>
          <p className="text-[13.5px] text-muted">
            {live.nextDueAt ? `Next step ${when(live.nextDueAt)}.` : "Nothing scheduled."}
          </p>
        </div>
      ) : ended ? (
        <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl border border-line bg-warm px-4 py-3">
          <IconCheck className="h-4 w-4 shrink-0 text-muted" />
          <p className="text-[13.5px] font-semibold text-ink">
            Follow-up finished. {stopReasonLabel(ended.stopReason)}.
          </p>
          <p className="text-[13.5px] text-muted">{routeLabel(ended.route)}</p>
        </div>
      ) : null}

      {events.length === 0 ? (
        <Empty>Nothing has happened yet.</Empty>
      ) : (
        <ol className="relative flex flex-col">
          {/* The spine. Drawn behind the markers rather than between them, so
              it never breaks when a row grows by a line. */}
          <span
            aria-hidden
            className="absolute bottom-4 left-[15px] top-4 w-px bg-line"
          />
          {events.map((e, i) => {
            const Icon = iconFor(e);
            const out = e.direction === "out" || e.type === "booking";
            const failed = e.status === "failed" || e.status === "no_answer";
            return (
              <li key={`${e.at}-${i}`} className="relative flex gap-3.5 py-2.5">
                <span
                  className={[
                    "relative z-10 mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border",
                    out
                      ? "border-[rgb(var(--accent-rgb)/.35)] bg-[rgb(var(--accent-rgb)/.12)] text-[var(--dash-accent-text)]"
                      : "border-line bg-surface text-ink",
                  ].join(" ")}
                >
                  <Icon className="h-3.5 w-3.5" />
                </span>

                <div className="min-w-0 flex-1 pb-1">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                    <p className="text-[13.5px] font-semibold text-ink">{headline(e, i === 0)}</p>
                    <p className="text-[12.5px] tabular-nums text-muted">{clock(e.at)}</p>
                    {/* How long after they first got in touch. This is the
                        measure the whole system is judged on, so it is on
                        every row rather than only in a report. */}
                    {e.at > start && (
                      <p className="text-[12.5px] text-muted">
                        {relative(e.at - start)} after they got in touch
                      </p>
                    )}
                    {failed && (
                      <span className="rounded-md bg-warm px-1.5 py-0.5 text-[11.5px] font-medium text-muted">
                        {e.status === "no_answer" ? "no answer" : "failed"}
                      </span>
                    )}
                  </div>
                  {e.text && (
                    <p className="mt-1 max-w-[76ch] whitespace-pre-wrap text-[13px] leading-relaxed text-muted">
                      {e.text}
                    </p>
                  )}
                  {e.error && (
                    <p className="mt-1 flex items-start gap-1.5 text-[12.5px] text-muted">
                      <IconAlert className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                      {e.error}
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      )}
    </Card>
  );
}

/** "62 seconds", "15 minutes", "3 hours". Said, not computed by the reader. */
function relative(ms: number): string {
  const s = Math.round(ms / 1000);
  if (s < 90) return `${s} second${s === 1 ? "" : "s"}`;
  const m = Math.round(s / 60);
  if (m < 90) return `${m} minute${m === 1 ? "" : "s"}`;
  const h = Math.round(m / 60);
  if (h < 48) return `${h} hour${h === 1 ? "" : "s"}`;
  return `${Math.round(h / 24)} days`;
}
