import Link from "next/link";

/* =========================================================================
   Two views of the same thing.

   The Inbox and the Conversations list were two entries in the navigation
   and, to anybody opening them, close to the same screen: both showed people
   who had talked to the assistant, on every channel, newest first. The
   difference is real but it is a difference of grain, not of subject. One row
   per message is what you want when you are answering; one row per person is
   what you want when you are reviewing. That is a toggle, not two sections.

   Two routes rather than one with a query, because each keeps its own data
   fetch and its own table, and a link to either still works. The navigation
   carries one entry and this control says where you are inside it.
   ========================================================================= */

export type View = { href: string; label: string; count?: number };

export function ViewToggle({ views, active }: { views: View[]; active: string }) {
  return (
    <div
      role="tablist"
      aria-label="How to view this"
      className="inline-flex rounded-xl border border-line bg-surface p-1"
    >
      {views.map((v) => {
        const on = v.href.split("?")[0] === active;
        return (
          <Link
            key={v.href}
            href={v.href}
            role="tab"
            aria-selected={on}
            className={[
              "inline-flex min-h-8 items-center gap-1.5 whitespace-nowrap rounded-lg px-3 text-[13px] font-semibold outline-none transition-colors duration-150",
              "focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
              on ? "bg-inverse text-oninverse" : "text-muted hover:bg-warm hover:text-ink",
            ].join(" ")}
          >
            {v.label}
            {v.count !== undefined && (
              <span className={on ? "text-oninverse/60" : "text-muted"}>{v.count}</span>
            )}
          </Link>
        );
      })}
    </div>
  );
}
