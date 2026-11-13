import Link from "next/link";
import { ChevronRight, House } from "lucide-react";

export type Crumb = { name: string; href?: string };

/*
  The one breadcrumb style, site-wide (client, 29 Oct 2026: "more professional"). Home is a house icon (its
  word shows from sm up), chevrons between, links quiet until hover, the current page in ink and cut short with
  an ellipsis instead of wrapping on a phone. Pages hand it their own trail (posts, case studies); every other
  page gets one from components/layout/SiteBreadcrumbs. The AI voice agent heroes build the same markup as a
  string (components/voice-agents/VoiceLanding.tsx), so keep the two in step.
*/
export function Breadcrumbs({ items, center = false, className = "" }: { items: Crumb[]; center?: boolean; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={`text-[14px] leading-6 ${className}`}>
      <ol className={`flex flex-wrap items-center gap-x-1.5 gap-y-1 text-muted ${center ? "justify-center" : ""}`}>
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${i}-${c.name}`} className="flex min-w-0 items-center gap-1.5">
              {i > 0 && <ChevronRight aria-hidden className="size-3.5 shrink-0 opacity-50" />}
              {last ? (
                <span aria-current="page" className="max-w-[26ch] truncate font-semibold text-ink sm:max-w-[60ch]">
                  {c.name}
                </span>
              ) : c.href ? (
                <Link href={c.href} className="inline-flex items-center gap-1.5 transition-colors hover:text-amber-deep">
                  {i === 0 && <House aria-hidden className="size-4 shrink-0" />}
                  <span className={i === 0 ? "max-sm:sr-only" : ""}>{c.name}</span>
                </Link>
              ) : (
                <span>{c.name}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
