"use client";

import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import type { InboxRow, Thread } from "@/lib/dashboard/handover";
import { fetchThread, takeOver, sendReply, handBack } from "@/app/lead-dashboard/handover/actions";
import { Pill } from "./ui";
import { IconSend, IconChat, IconMic, IconCheck, IconAlert, IconInbox } from "./icons";

/* =========================================================================
   The handover desk.

   Two panes: who is waiting, and the conversation with the one you picked.
   It is the only screen in the dashboard where something is happening at the
   other end while you look at it, so three things follow.

   1. It refreshes itself. A queue you have to reload is a queue you answer
      late. The open thread polls every four seconds, the list every twelve.
   2. The visitor's own words are the loudest thing on the screen. The
      question that defeated the assistant sits above the reply box.
   3. Nothing is sent without a click, and the box is never cleared until the
      server has confirmed the reply. Losing a typed answer to a dropped
      request is unforgivable when a person is waiting on it.
   ========================================================================= */

const THREAD_MS = 4000;
const LIST_MS = 12000;

type Props = {
  rows: InboxRow[];
  /** False when the dashboard has no password set, so writing is switched off. */
  canReply: boolean;
  lockedReason?: string;
};

export function Handover({ rows: initial, canReply, lockedReason }: Props) {
  const [rows, setRows] = useState(initial);
  const [openId, setOpenId] = useState<string | null>(
    /* Open the one that has been waiting longest with the visitor's message
       last: that is whoever is most likely still on the page. */
    initial.find((r) => r.state === "waiting" && r.awaitingReply)?.sessionId ??
      initial.find((r) => r.state !== "closed")?.sessionId ??
      initial[0]?.sessionId ??
      null,
  );

  useEffect(() => setRows(initial), [initial]);

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(320px,380px)_minmax(0,1fr)] xl:items-start">
      <Queue rows={rows} openId={openId} onOpen={setOpenId} />
      {openId ? (
        <Conversation
          key={openId}
          sessionId={openId}
          canReply={canReply}
          lockedReason={lockedReason}
          onChanged={(state) =>
            setRows((rs) =>
              rs.map((r) => (r.sessionId === openId ? { ...r, state, awaitingReply: false } : r)),
            )
          }
        />
      ) : (
        <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-surface px-6 py-16 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-warm text-muted">
            <IconCheck className="h-6 w-6" />
          </span>
          <p className="mt-4 max-w-[44ch] text-[14.5px] leading-relaxed text-muted">
            Nobody is waiting. When the assistant meets a question it cannot
            answer from Online Marketing Help&rsquo;s own information, or a
            visitor asks for a person, the conversation appears here and you can
            answer it while they are still on the page.
          </p>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------- queue */

function Queue({
  rows,
  openId,
  onOpen,
}: {
  rows: InboxRow[];
  openId: string | null;
  onOpen: (id: string) => void;
}) {
  /* Waiting first, then live, then closed; and inside each, the person who
     has been waiting longest. Sorting by recency alone pushed the one who had
     waited twenty minutes below someone who had just arrived. */
  const order = { waiting: 0, live: 1, closed: 2 } as const;
  const sorted = [...rows].sort(
    (a, b) => order[a.state] - order[b.state] || a.since - b.since,
  );

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface">
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
        <h2 className="font-sans text-[13px] font-semibold uppercase tracking-[.09em] text-muted">
          The queue
        </h2>
        <span className="text-[12.5px] tabular-nums text-muted">
          {rows.length} {rows.length === 1 ? "conversation" : "conversations"}
        </span>
      </div>

      {sorted.length === 0 ? (
        <div className="flex flex-col items-center px-5 py-10 text-center">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-warm text-muted">
            <IconInbox className="h-5 w-5" />
          </span>
          <p className="mt-3 text-[13.5px] leading-relaxed text-muted">
            Nothing has been passed to a person yet.
          </p>
        </div>
      ) : (
        <ul className="max-h-[70vh] divide-y divide-line overflow-y-auto">
          {sorted.map((r) => {
            const on = r.sessionId === openId;
            const Icon = r.channel === "voice" ? IconMic : IconChat;
            return (
              <li key={r.sessionId}>
                <button
                  type="button"
                  onClick={() => onOpen(r.sessionId)}
                  aria-current={on ? "true" : undefined}
                  className={`flex w-full cursor-pointer gap-3 px-4 py-3.5 text-left outline-none transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--accent)] ${
                    on ? "bg-warm" : "hover:bg-warm"
                  }`}
                >
                  {/* A bar, not a background tint: it survives both themes and
                      does not fight the selected row's own highlight. */}
                  <span
                    aria-hidden="true"
                    className="w-[3px] shrink-0 rounded-full"
                    style={{
                      background: on ? "var(--accent)" : "transparent",
                    }}
                  />
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-warm text-muted">
                    <Icon className="h-[15px] w-[15px]" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline justify-between gap-2">
                      <span className="truncate font-sans text-[14px] font-semibold">
                        {r.name || "Visitor"}
                      </span>
                      <Pill kind={r.state === "waiting" ? "hot" : r.state === "live" ? "warm" : "confirmed"}>
                        {r.state === "waiting" ? "waiting" : r.state === "live" ? "with you" : "done"}
                      </Pill>
                    </span>
                    <span className="mt-1 block truncate text-[13px] text-muted">
                      {r.question || r.lastText || "No message recorded"}
                    </span>
                    <span className="mt-1 flex flex-wrap items-center gap-x-2 text-[12px] text-muted">
                      <Since at={r.since} />
                      {r.awaitingReply && r.state !== "closed" && (
                        <span className="inline-flex items-center gap-1 font-medium text-[var(--dash-accent-text)]">
                          <IconAlert className="h-3.5 w-3.5" />
                          their turn
                        </span>
                      )}
                      {r.takenBy && r.state === "live" && <span>· {r.takenBy}</span>}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

/* ------------------------------------------------------------ conversation */

function Conversation({
  sessionId,
  canReply,
  lockedReason,
  onChanged,
}: {
  sessionId: string;
  canReply: boolean;
  lockedReason?: string;
  onChanged: (state: InboxRow["state"]) => void;
}) {
  const [thread, setThread] = useState<Thread | null>(null);
  const [text, setText] = useState("");
  const [note, setNote] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const threadBox = useRef<HTMLOListElement>(null);
  const typing = useRef(false);

  const load = useCallback(async () => {
    const res = await fetchThread(sessionId);
    if (res.ok && res.thread) setThread(res.thread);
    else if (res.message) setNote(res.message);
  }, [sessionId]);

  useEffect(() => {
    load();
    const id = window.setInterval(load, THREAD_MS);
    /* Polling pauses while the tab is in the background: nobody is reading it,
       and a dashboard left open overnight should not keep calling out. */
    const onVis = () => {
      if (document.visibilityState === "visible") load();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [load]);

  /* Scroll to the newest message, but never while they are mid-sentence in the
     reply box: yanking the view is worse than a missed line. */
  useEffect(() => {
    const box = threadBox.current;
    if (box && !typing.current) box.scrollTop = box.scrollHeight;
  }, [thread?.messages.length]);

  const act = (fn: () => Promise<{ ok: boolean; message?: string; thread?: Thread | null }>) =>
    start(async () => {
      const res = await fn();
      setNote(res.ok ? null : res.message ?? "That did not work.");
      if (res.thread) {
        setThread(res.thread);
        onChanged(res.thread.state === "none" ? "closed" : res.thread.state);
      }
    });

  const send = () => {
    const clean = text.trim();
    if (!clean || pending) return;
    act(async () => {
      const res = await sendReply(sessionId, clean);
      /* Cleared only once the server has it. A failed send leaves the words in
         the box so they can be sent again rather than retyped. */
      if (res.ok) setText("");
      return res;
    });
  };

  if (!thread) {
    return (
      <div className="min-h-[320px] rounded-2xl border border-line bg-surface p-5">
        <p className="text-[13.5px] text-muted">{note ?? "Opening the conversation…"}</p>
      </div>
    );
  }

  const live = thread.state === "live";
  const open = thread.questions.filter((q) => !q.handled);

  return (
    <div className="rounded-2xl border border-line bg-surface">
      <header className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3 border-b border-line px-5 py-4">
        <div className="min-w-0">
          <h2 className="font-sans text-[17px] font-semibold tracking-[-.01em]">
            {thread.profile?.name || "Visitor"}
          </h2>
          <p className="mt-1 flex flex-wrap items-center gap-x-2 text-[13px] text-muted">
            <span className="capitalize">{thread.channel}</span>
            {thread.startedAt && (
              <>
                <span aria-hidden="true">·</span>
                <span>
                  started <Since at={thread.startedAt} />
                </span>
              </>
            )}
            {thread.takenBy && live && (
              <>
                <span aria-hidden="true">·</span>
                <span>with {thread.takenBy}</span>
              </>
            )}
          </p>
        </div>

        {/* No shrink-0 here. The hand-back button is 265px of words, and with
            the status pill beside it the pair is wider than a phone; refusing
            to shrink pushed the whole page sideways instead of wrapping. */}
        <div className="flex flex-wrap items-center gap-2">
          <Pill kind={thread.state === "waiting" ? "hot" : live ? "warm" : "confirmed"}>
            {thread.state === "waiting" ? "waiting for a person" : live ? "you are answering" : "assistant has it"}
          </Pill>
          {canReply && !live && (
            <button
              type="button"
              onClick={() => act(() => takeOver(sessionId))}
              disabled={pending}
              className="cursor-pointer rounded-lg border border-line bg-surface px-3 py-1.5 text-[13.5px] font-semibold outline-none transition-colors duration-150 hover:bg-warm focus-visible:ring-2 focus-visible:ring-[var(--accent)] disabled:opacity-50"
            >
              Take over
            </button>
          )}
          {canReply && live && (
            /* The button that ends the handover. Filled rather than outlined:
               while a person holds a conversation the assistant answers
               nothing, so forgetting to press this leaves the visitor with
               nobody at all. It is the most important control on the screen
               once the answering is done, and it says what it does rather
               than "hand back", which told you nothing about who takes over. */
            <button
              type="button"
              onClick={() => act(() => handBack(sessionId))}
              disabled={pending}
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg px-3.5 py-2 font-sans text-[13.5px] font-semibold outline-none transition-[filter] duration-150 hover:brightness-[1.04] focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 disabled:opacity-50"
              /* White, and a literal rather than a token: the accent is a
                 fixed dark brown in both themes, so the text on it must not
                 follow the theme. */
              style={{ background: "var(--accent)", color: "#fff" }}
            >
              <IconCheck className="h-4 w-4" />
              {pending ? "Finishing…" : "Done, let the assistant reply again"}
            </button>
          )}
        </div>
      </header>

      {/* What the visitor is actually waiting to hear, before anything else. */}
      {open.length > 0 && (
        <div className="border-b border-line px-5 py-4">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[.09em] text-muted">
            {open.length === 1 ? "What the assistant could not answer" : "What the assistant could not answer"}
          </p>
          <ul className="mt-2 space-y-2">
            {open.map((q) => (
              <li
                key={q.id}
                className="rounded-xl border border-[rgb(var(--accent-rgb)/.35)] bg-[rgb(var(--accent-rgb)/.14)] px-3.5 py-3"
              >
                <p className="text-[14.5px] font-medium leading-relaxed">{q.question}</p>
                <p className="mt-1 text-[12.5px] leading-relaxed text-[var(--dash-accent-text)]">{q.reason}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Details thread={thread} />

      <ol
        ref={threadBox}
        className="max-h-[46vh] space-y-3 overflow-y-auto px-4 py-4 sm:px-5"
        aria-label="Conversation"
      >
        {thread.messages.length === 0 && (
          <li className="text-[13.5px] text-muted">No messages were recorded for this one.</li>
        )}
        {thread.messages.map((m, i) => (
          <Bubble key={i} role={m.role} text={m.text} at={m.at} />
        ))}
      </ol>

      <div className="border-t border-line px-4 py-4 sm:px-5">
        {!canReply ? (
          <p className="rounded-xl border border-line bg-warm px-3.5 py-3 text-[13.5px] leading-relaxed text-muted">
            {lockedReason ??
              "Replying is switched off until the dashboard has a password set."}
          </p>
        ) : (
          <>
            <label htmlFor="omh-reply" className="sr-only">
              Your reply to this visitor
            </label>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
              <textarea
                id="omh-reply"
                rows={2}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onFocus={() => (typing.current = true)}
                onBlur={() => (typing.current = false)}
                onKeyDown={(e) => {
                  /* Enter sends, shift and enter makes a new line: the pattern
                     every chat tool has taught people. */
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
                placeholder={
                  live
                    ? "Type your answer. The visitor sees it in the chat on the site."
                    : "Type your answer. Sending it takes the conversation over."
                }
                className="min-h-[72px] flex-1 resize-y rounded-xl border border-line bg-surface px-3.5 py-3 text-[14.5px] leading-relaxed text-ink outline-none transition-colors duration-150 placeholder:text-muted focus-visible:border-[var(--accent)] focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent-rgb)/.35)]"
              />
              <button
                type="button"
                onClick={send}
                disabled={pending || !text.trim()}
                className="inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl bg-inverse px-4 py-3 font-sans text-[14px] font-semibold text-oninverse outline-none transition-opacity duration-150 hover:opacity-90 focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <IconSend className="h-4 w-4" />
                {pending ? "Sending…" : "Send"}
              </button>
            </div>
            <p className="mt-2 text-[12.5px] leading-relaxed text-muted">
              Enter sends. Shift and enter starts a new line. The visitor sees
              this as a message from a person, not from the assistant.
            </p>
          </>
        )}

        {note && (
          <p
            role="status"
            className="mt-3 flex items-start gap-2 text-[13px] leading-relaxed text-[var(--dash-accent-text)]"
          >
            <IconAlert className="mt-0.5 h-4 w-4 shrink-0" />
            {note}
          </p>
        )}
      </div>
    </div>
  );
}

/** Everything the assistant learned about them, so a person does not open with
    a question the visitor has already answered. */
function Details({ thread }: { thread: Thread }) {
  const p = thread.profile;
  const facts: [string, string][] = [];
  if (p?.phone) facts.push(["Phone", p.phone]);
  if (p?.email) facts.push(["Email", p.email]);
  if (p?.company) facts.push(["Company", p.company]);
  if (p?.website) facts.push(["Website", p.website]);
  if (p?.budget) facts.push(["Budget", p.budget]);
  if (p?.interestedIn?.length) facts.push(["Interested in", p.interestedIn.join(", ")]);
  if (thread.pageUrl) facts.push(["On page", thread.pageUrl.replace(/^https?:\/\//, "")]);
  if (facts.length === 0) return null;

  return (
    <dl className="grid gap-x-6 gap-y-2 border-b border-line px-5 py-4 sm:grid-cols-2">
      {facts.map(([k, v]) => (
        <div key={k} className="flex min-w-0 gap-2 text-[13.5px]">
          <dt className="shrink-0 text-muted">{k}</dt>
          <dd className="min-w-0 flex-1 truncate font-medium">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Three voices, three places on the screen: the assistant and the person on
    the left, the visitor on the right, and anything the system noted in the
    middle as a plain line rather than a bubble. */
function Bubble({ role, text, at }: { role: string; text: string; at: number }) {
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
      <div className={`max-w-[80%] ${visitor ? "text-right" : ""}`}>
        <p className="mb-1 font-sans text-[11px] font-semibold uppercase tracking-[.09em] text-muted">
          {visitor ? "Visitor" : human ? "You" : "Assistant"}
          <span className="ml-2 font-normal normal-case tracking-normal">{clock(at)}</span>
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

/* --------------------------------------------------------------- formatting */

/** Rendered on the client so it stays right as the minutes pass, and marked
    suppressHydrationWarning because the server's "now" is a second behind. */
function Since({ at }: { at: number }) {
  const [label, setLabel] = useState(() => relative(at));
  useEffect(() => {
    const id = window.setInterval(() => setLabel(relative(at)), 30000);
    return () => window.clearInterval(id);
  }, [at]);
  return <span suppressHydrationWarning>{label}</span>;
}

function relative(at: number): string {
  const secs = Math.max(0, Math.round((Date.now() - at) / 1000));
  if (secs < 60) return "just now";
  const mins = Math.round(secs / 60);
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  const days = Math.round(hours / 24);
  return `${days} ${days === 1 ? "day" : "days"} ago`;
}

function clock(at: number): string {
  return new Date(at).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/London",
  });
}
