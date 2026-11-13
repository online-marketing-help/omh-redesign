"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";
import type { SearchEntry } from "@/lib/content/search-index";
import { CASE_STUDIES_LIVE } from "@/lib/flags";

/*
  Native <dialog> does the modal work — focus trap, inert background, Escape —
  so this only has to own the filtering. Cmd/Ctrl+K opens it from anywhere.
*/
export function SiteSearch({ entries }: { entries: SearchEntry[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState("");
  const pathname = usePathname();

  const results = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase("en-GB");
    if (!needle) return entries.filter((entry) => entry.group === "Page").slice(0, 8);
    return entries
      .filter((entry) => `${entry.title} ${entry.hint ?? ""}`.toLocaleLowerCase("en-GB").includes(needle))
      .slice(0, 12);
  }, [entries, query]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      /* `key` is optional on KeyboardEvent and genuinely arrives undefined:
         password managers and browser autofill dispatch synthetic keydowns
         without it, which is why this threw on the sign-in screen rather
         than anywhere a person was actually typing. A global listener sees
         every one of those, so it has to survive them. */
      if (typeof event.key !== "string") return;
      if (event.key.toLowerCase() !== "k" || !(event.metaKey || event.ctrlKey)) return;
      event.preventDefault();
      const dialog = dialogRef.current;
      if (!dialog) return;
      if (dialog.open) dialog.close();
      else dialog.showModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Route change means the visitor picked something.
  useEffect(() => {
    dialogRef.current?.close();
  }, [pathname]);

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className="group flex h-10 cursor-pointer items-center gap-2.5 rounded-button border border-line px-3 text-muted transition-colors hover:border-ink/25 hover:text-ink max-lg:size-10 max-lg:justify-center max-lg:px-0"
      >
        <Search className="size-[18px]" aria-hidden />
        <span className="sr-only">Search the site</span>
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Search the site"
        onClick={(event) => {
          if (event.target === dialogRef.current) dialogRef.current?.close();
        }}
        className="site-search m-0 w-full max-w-[620px] rounded-card border border-line bg-surface p-0 text-ink shadow-[0_50px_90px_-40px_rgb(0_0_0/0.5)]"
      >
        <div className="field-shell flex items-center gap-3 border-b border-line px-5 transition-colors">
          <Search className="size-5 shrink-0 text-muted" aria-hidden />
          <label htmlFor="site-search-input" className="sr-only">
            {CASE_STUDIES_LIVE ? "Search pages, case studies and insights" : "Search pages and insights"}
          </label>
          <input
            id="site-search-input"
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={CASE_STUDIES_LIVE ? "Search pages, case studies and insights" : "Search pages and insights"}
            className="min-w-0 flex-1 bg-transparent py-4 text-body outline-none placeholder:text-muted/70"
          />
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="cursor-pointer rounded border border-line px-2 py-1 text-body font-semibold text-muted transition-colors hover:text-ink"
          >
            Esc
          </button>
        </div>

        {results.length ? (
          <ul className="max-h-[min(60vh,420px)] overflow-y-auto p-2">
            {results.map((entry) => (
              <li key={`${entry.group}-${entry.href}`}>
                <Link
                  href={entry.href}
                  onClick={() => dialogRef.current?.close()}
                  className="flex items-baseline justify-between gap-5 rounded-button px-3 py-2.5 transition-colors hover:bg-warm"
                >
                  <span className="min-w-0 text-body leading-snug">{entry.title}</span>
                  <span className="shrink-0 font-sans text-[14px] font-semibold uppercase tracking-[0.12em] text-muted">
                    {entry.group}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="px-5 py-8 text-body text-muted">
            Nothing matches “{query.trim()}”. Try a shorter phrase.
          </p>
        )}
      </dialog>
    </>
  );
}
