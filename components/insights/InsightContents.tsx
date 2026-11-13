"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { TocItem } from "@/lib/content/insight-toc";

/* Contents rail that follows the reader: the section under the top third of the
   viewport is marked current, earlier ones are dimmed as done, and the counter
   shows how far through the article they are. On phones the list collapses
   behind the heading so it does not push the body down. */
/** `idSuffix` keeps ids unique when the post renders a second copy (the phone layout puts one above the body). */
export function InsightContents({ items, idSuffix = "" }: { items: TocItem[]; idSuffix?: string }) {
  const [active, setActive] = useState(items[0]?.id);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const headings = items.map((item) => document.getElementById(item.id)).filter(Boolean) as HTMLElement[];
    if (!headings.length) return;
    // ponytail: last heading above the 35% line on each scroll; no IntersectionObserver bookkeeping.
    const update = () => {
      const line = window.innerHeight * 0.35;
      let current = headings[0].id;
      for (const heading of headings) if (heading.getBoundingClientRect().top <= line) current = heading.id;
      setActive(current);
    };
    update();
    addEventListener("scroll", update, { passive: true });
    return () => removeEventListener("scroll", update);
  }, [items]);

  const index = Math.max(0, items.findIndex((item) => item.id === active));
  const counter = (
    <span className="text-[14px] font-semibold tabular-nums tracking-[0.1em] text-amber-deep">
      {index + 1} / {items.length}
    </span>
  );

  return (
    <nav aria-labelledby={`article-contents${idSuffix}`} className="border-t border-line pt-5">
      <p className="flex items-center justify-between max-lg:hidden">
        <span id={`article-contents${idSuffix}`} className="text-[14px] font-semibold uppercase tracking-[0.15em] text-muted">On this page</span>
        {counter}
      </p>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={`article-contents-list${idSuffix}`}
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-4 lg:hidden"
      >
        <span className="text-[14px] font-semibold uppercase tracking-[0.15em] text-muted">On this page</span>
        <span className="flex items-center gap-3">
          {counter}
          <ChevronDown className={`size-4 text-muted transition-transform ${open ? "rotate-180" : ""}`} aria-hidden />
        </span>
      </button>
      <ol id={`article-contents-list${idSuffix}`} className={`mt-4 grid gap-2.5 max-lg:mt-5 ${open ? "" : "max-lg:hidden"}`}>
        {items.map((item, i) => {
          const isActive = item.id === active;
          const done = i < index;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "location" : undefined}
                onClick={() => setOpen(false)}
                className={`block border-l-2 py-0.5 pl-4 text-body leading-snug transition-colors hover:border-amber hover:text-amber-deep ${
                  isActive ? "border-amber font-semibold text-ink" : done ? "border-amber/40 text-ink/50" : "border-line text-ink/68"
                }`}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
