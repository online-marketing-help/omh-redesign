import Link from "next/link";
import { Shell } from "@/components/dashboard/Shell";
import { Card, Empty, ShowExample } from "@/components/dashboard/ui";
import { Kpi } from "@/components/dashboard/Stats";
import { ViewToggle } from "@/components/dashboard/ViewToggle";
import {
  IconChat, IconPhone, IconSend, IconInbox, IconAlert, IconMic,
} from "@/components/dashboard/icons";
import { getInboxFeed, sourceLabel, when, type InboxItem } from "@/lib/dashboard/routing";
import { isDemo, demoInbox } from "@/lib/dashboard/demo";
import { isTestSession } from "@/lib/dashboard/test-rows";

export const dynamic = "force-dynamic";

/* =========================================================================
   One list, every channel.

   The package sells "one assistant across the website, the phone, Facebook,
   Instagram, WhatsApp and SMS", and until this screen existed there was
   nowhere those arrived together: website chats were on the handover queue
   and nothing else was anywhere at all.

   A channel that goes live later appears here the moment it writes its first
   message. Nothing on this page names a channel.
   ========================================================================= */

const CHANNEL_WORD: Record<string, string> = {
  sms: "Text",
  email: "Email",
  call: "Call",
  voice: "Voice",
  chat: "Website chat",
  messenger: "Messenger",
  instagram: "Instagram",
  whatsapp: "WhatsApp",
};

/* Returns the drawn icon, not the component that draws it. Handing back a
   component and assigning it to a capitalised local reads as creating a
   component during render, which is the one thing a render must not do. */
function iconFor(channel: string) {
  const cls = "h-4 w-4";
  if (channel === "voice") return <IconMic className={cls} />;
  if (channel === "call") return <IconPhone className={cls} />;
  if (channel === "email") return <IconSend className={cls} />;
  return <IconChat className={cls} />;
}

export default async function InboxPage({
  searchParams,
}: {
  searchParams: Promise<{ demo?: string; channel?: string }>;
}) {
  const params = await searchParams;
  const demo = isDemo(params);

  const feed = demo ? demoInbox() : await getInboxFeed(150);
  const all = feed?.items ?? [];
  const items = demo ? all : all.filter((i) => !isTestSession(i.sessionId));
  const hidden = all.length - items.length;

  const picked = params.channel ?? null;
  const shown = picked ? items.filter((i) => i.channel === picked) : items;

  const waiting = items.filter((i) => i.needsPerson);
  const inbound = items.filter((i) => i.direction === "in");

  /* Which channels are actually in use, with how many messages each. Built
     from the data, never from a list, so a new channel needs no code. */
  const tally = new Map<string, number>();
  for (const i of items) tally.set(i.channel, (tally.get(i.channel) ?? 0) + 1);
  const channels = [...tally.entries()].sort((a, b) => b[1] - a[1]);

  const href = (channel: string | null) => {
    const q = new URLSearchParams();
    if (demo) q.set("demo", "1");
    if (channel) q.set("channel", channel);
    const s = q.toString();
    return `/lead-dashboard/inbox${s ? `?${s}` : ""}`;
  };

  const unreachable = !demo && feed === null;

  return (
    <Shell
      active="/lead-dashboard/inbox"
      title="Inbox"
      lead="Every message, on every channel, newest first."
      counts={{ "/lead-dashboard/inbox": waiting.length }}
      urgent={["/lead-dashboard/inbox"]}
      demo={demo}
      toolbar={
        <ViewToggle
          active="/lead-dashboard/inbox"
          views={[
            { href: `/lead-dashboard/inbox${demo ? "?demo=1" : ""}`, label: "Messages" },
            { href: `/lead-dashboard/chats${demo ? "?demo=1" : ""}`, label: "By person" },
          ]}
        />
      }
    >
      {unreachable ? (
        <Card>
          <Empty>The message store cannot be reached from here.</Empty>
        </Card>
      ) : items.length === 0 ? (
        <Card title="Nothing yet">
          <Empty>
            No messages on any channel. The first one, from anywhere, appears
            here.
          </Empty>
          <div className="text-center">
            <ShowExample href="/lead-dashboard/inbox?demo=1" />
          </div>
        </Card>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Kpi
              label="Waiting on a person"
              value={String(waiting.length)}
              sub={waiting.length ? "answer these first" : "nothing is waiting"}
              icon={IconAlert}
              accent={waiting.length > 0}
              rise={0}
            />
            <Kpi
              label="Messages in"
              value={String(inbound.length)}
              sub="from everybody, all channels"
              icon={IconInbox}
              rise={1}
            />
            <Kpi
              label="Channels in use"
              value={String(channels.length)}
              sub={channels.map(([c]) => CHANNEL_WORD[c] ?? c).slice(0, 3).join(", ")}
              icon={IconChat}
              rise={2}
            />
            <Kpi
              label="Newest"
              value={items[0] ? when(items[0].at).replace(" ago", "") : "none"}
              sub="since the last message"
              icon={IconChat}
              rise={3}
            />
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="mr-0.5 font-sans text-[12px] font-semibold uppercase tracking-[.1em] text-muted">
              Channel
            </span>
            <Link
              href={href(null)}
              className={[
                "inline-flex min-h-9 items-center gap-1.5 rounded-full border px-3 text-[13px] font-medium outline-none transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
                picked ? "border-line bg-surface text-ink hover:bg-warm" : "border-transparent bg-inverse text-oninverse",
              ].join(" ")}
            >
              Everything
              <span className={picked ? "text-muted" : "text-oninverse/60"}>{items.length}</span>
            </Link>
            {channels.map(([c, n]) => {
              const on = picked === c;
              return (
                <Link
                  key={c}
                  href={href(c)}
                  className={[
                    "inline-flex min-h-9 items-center gap-1.5 rounded-full border px-3 text-[13px] font-medium outline-none transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
                    on ? "border-transparent bg-inverse text-oninverse" : "border-line bg-surface text-ink hover:bg-warm",
                  ].join(" ")}
                >
                  {CHANNEL_WORD[c] ?? c}
                  <span className={on ? "text-oninverse/60" : "text-muted"}>{n}</span>
                </Link>
              );
            })}
          </div>

          <Card className="mt-3" pad={false} rise={4}>
            <ol className="flex flex-col">
              {shown.map((m, i) => (
                <Row key={`${m.at}-${i}`} m={m} demo={demo} first={i === 0} />
              ))}
            </ol>
          </Card>

          {hidden > 0 && (
            <p className="mt-3 text-[12.5px] text-muted">
              {hidden} test {hidden === 1 ? "message" : "messages"} left out.
            </p>
          )}
        </>
      )}
    </Shell>
  );
}

function Row({ m, demo, first }: { m: InboxItem; demo: boolean; first: boolean }) {
  const inbound = m.direction === "in";
  const body = (
    <>
      <span
        className={[
          "mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl",
          m.needsPerson
            ? "bg-[rgb(var(--accent-rgb)/.18)] text-[var(--dash-accent-text)]"
            : inbound
              ? "bg-warm text-ink"
              : "bg-warm/60 text-muted",
        ].join(" ")}
      >
        {iconFor(m.channel)}
      </span>

      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
          <span className="font-sans text-[14px] font-semibold text-ink">
            {m.who ?? "Unknown"}
          </span>
          <span className="text-[12.5px] text-muted">
            {CHANNEL_WORD[m.channel] ?? m.channel}
          </span>
          {m.sourceChannel && (
            <span className="rounded-md bg-warm px-1.5 py-0.5 text-[12px] text-muted">
              {sourceLabel(m.sourceChannel)}
            </span>
          )}
          {/* Who said it, in words. An inbound and an outbound message look
              alike at a glance otherwise, and getting that wrong means
              replying to yourself. */}
          <span className="text-[12.5px] text-muted">
            {inbound ? "they wrote" : "we sent"}
          </span>
          <span className="ml-auto shrink-0 text-[12.5px] tabular-nums text-muted">
            {when(m.at)}
          </span>
        </span>

        <span className="mt-1 block line-clamp-2 text-[13.5px] leading-relaxed text-muted">
          {m.text || "No text recorded"}
        </span>

        {m.needsPerson && (
          <span className="mt-1.5 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[var(--dash-accent-text)]">
            <IconAlert className="h-3.5 w-3.5" />
            Waiting on a person
          </span>
        )}
      </span>
    </>
  );

  const cls = [
    "flex gap-3.5 px-4 py-3.5 sm:px-5",
    first ? "" : "border-t border-line",
    m.needsPerson ? "bg-[rgb(var(--accent-rgb)/.05)]" : "",
  ].join(" ");

  if (!m.sessionId) return <li className={cls}>{body}</li>;

  return (
    <li>
      <Link
        href={`/lead-dashboard/conversations/${encodeURIComponent(m.sessionId)}${demo ? "?demo=1" : ""}`}
        className={`${cls} outline-none transition-colors duration-150 hover:bg-warm focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--accent)]`}
      >
        {body}
      </Link>
    </li>
  );
}
