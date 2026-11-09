import type { ReactNode } from "react";
import { BookDemo } from "@/components/BookDemo";
import { LandingV4Script } from "@/components/voice-agents/LandingV4Script";
import { VoiceAgentsScript } from "@/components/voice-agents/VoiceAgentsScript";
import { VoiceMotion } from "@/components/voice-agents/VoiceMotion";
import { JsonLd, SITE } from "@/lib/schema";
import { ReelPlayer } from "@/components/voice-agents/ReelPlayer";

/*
  The /ai-voice-agents layout, shared by the main page and the industry pages built on it (real estate first).
  Each page brings its own markup (three sources: rebuilt sections, the previous page's sections, the v4 hero /
  how-it-works / local cover) and a running order; the scripts, motion and the booking band are the same.
*/

// Splits a markup string at each top-level <section>, keyed by its id (or aria-labelledby). Whatever follows a
// section's closing tag (the sticky bar) travels with that section. `head` is what comes before the first
// section (an icon sprite).
export function sectionsOf(html: string, className: string) {
  const [head, ...parts] = html.split(/(?=<section[\s>])/);
  const byKey = new Map(parts.map((p) => [p.match(/^<section[^>]*?\s(?:id|aria-labelledby)="([^"]+)"/)![1], p]));
  return { head, byKey, className };
}
export type Source = ReturnType<typeof sectionsOf>;
export type Runs = [Source, string[]][];

type Crumb = { name: string; item: string };

// Lucide's chevron-right and house, as components/ui/Breadcrumbs draws them.
const svg = (cls: string, d: string) =>
  `<svg aria-hidden="true" class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
const chevron = svg("size-3.5 shrink-0 opacity-50", '<path d="m9 18 6-6-6-6"/>');
const house = svg(
  "size-4 shrink-0",
  '<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
);

// The visible trail above the hero badge, read from the page's BreadcrumbList so the two can't drift apart. Same
// markup and classes as components/ui/Breadcrumbs (the site-wide style), centred; that one is a React component
// and this hero is an HTML string, so keep the two in step.
function breadcrumbHtml(graph: object | undefined, page: string) {
  const list = ((graph as { "@graph"?: { "@type": string; itemListElement?: Crumb[] }[] })?.["@graph"] ?? []).find(
    (n) => n["@type"] === "BreadcrumbList",
  )?.itemListElement;
  if (!list) throw new Error(`${page}: breadcrumb asked for, but the graph has no BreadcrumbList`);
  const esc = (s: string) => s.replace(/&/g, "&amp;");
  const items = list.map((c, i) => {
    const sep = i > 0 ? chevron : "";
    if (i === list.length - 1)
      return `<li class="flex min-w-0 items-center gap-1.5">${sep}<span aria-current="page" class="max-w-[26ch] truncate font-semibold text-ink sm:max-w-[60ch]">${esc(c.name)}</span></li>`;
    const label = i === 0 ? `${house}<span class="max-sm:sr-only">${esc(c.name)}</span>` : `<span>${esc(c.name)}</span>`;
    return `<li class="flex min-w-0 items-center gap-1.5">${sep}<a href="${c.item.replace(SITE, "") || "/"}" class="inline-flex items-center gap-1.5 transition-colors hover:text-amber-deep">${label}</a></li>`;
  });
  // pb, not mb: the v4 hero wrapper (.v4l) zeroes mb-* utilities.
  return `<nav aria-label="Breadcrumb" class="pb-6 text-[14px] leading-6"><ol class="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 text-muted">${items.join("")}</ol></nav>`;
}

/** `breadcrumb`: show the graph's BreadcrumbList above the hero badge (industry pages, per the October briefs). */
export function VoiceLanding({ runs, graph, page, demoHeading, thingsToTry, breadcrumb, children }: { runs: Runs; graph?: object; page: string; demoHeading: ReactNode; thingsToTry?: readonly string[]; breadcrumb?: boolean; children?: ReactNode }) {
  const placed = runs.flatMap(([, keys]) => keys);
  for (const src of new Set(runs.map(([s]) => s)))
    for (const key of src.byKey.keys()) if (!placed.includes(key)) throw new Error(`${page}: section "${key}" has no place in runs`);
  const runHtml = runs.map(([src, keys], i) => {
    const html = keys.map((k) => {
      const part = src.byKey.get(k);
      if (!part) throw new Error(`${page}: no section "${k}"`);
      if (breadcrumb && k === "top") {
        if (!part.includes('<span class="badge">')) throw new Error(`${page}: no hero badge to put the breadcrumb above`);
        return part.replace('<span class="badge">', () => breadcrumbHtml(graph, page) + '<span class="badge">');
      }
      return part;
    });
    // The icon sprite goes in the first wrapper of its source.
    return (runs.findIndex(([s]) => s === src) === i ? src.head : "") + html.join("");
  });
  return (
    <>
      {graph && <JsonLd data={graph} />}
      {/* One root for both page scripts; they find their widgets by data-* hooks inside it. */}
      <div id="va-page">
        {runs.map(([src], i) => (
          <div key={i} className={src.className} dangerouslySetInnerHTML={{ __html: runHtml[i] }} />
        ))}
      </div>
      <LandingV4Script />
      {/* The booking band every "Book a 30-Minute Demo" button on the page points at. */}
      <BookDemo id="book-demo-form" heading={demoHeading} thingsToTry={thingsToTry} />
      <VoiceAgentsScript />
      {/* Popup for any [data-reel] video card (lib/content/sample-reels.ts); idle on pages without one. */}
      <ReelPlayer />
      <VoiceMotion />
      {/* Page-specific widgets, e.g. EstateScript. */}
      {children}
    </>
  );
}
