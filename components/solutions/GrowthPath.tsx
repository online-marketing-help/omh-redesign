import { Check, ChevronDown, MapPin, Phone, Search, Star } from "lucide-react";
import type { GrowthMock, SolutionPageContent } from "@/lib/content/solutions";

/* The hero's "growth path" card: each step of `content.signal` with a small UI mock-up
   under it (client audit, 26 Oct 2026). Mock text is illustrative UI, not a claim. */

const shell = "rounded-[8px] border border-oninverse/10 bg-inverse/60";
const pill = "rounded-full bg-amber px-2.5 py-0.5 text-[12px] font-semibold text-white";
const ghostPill = "rounded-full border border-oninverse/20 px-2.5 py-0.5 text-[12px] text-oninverse/55";
const button = "rounded-[6px] bg-amber px-3.5 py-1.5 text-[13px] font-semibold text-white";

function SearchBar({ query, tag, dim = false }: { query: string; tag?: string; dim?: boolean }) {
  return (
    <div className={`flex items-center gap-2.5 px-3.5 py-2.5 ${dim ? "opacity-45" : `${shell} border-amber/40`}`}>
      <Search className="size-4 shrink-0 text-amber" aria-hidden="true" />
      <span className={`min-w-0 flex-1 truncate text-[14px] ${dim ? "line-through" : "font-semibold"}`}>
        {query}
        {!dim && <span className="ml-0.5 inline-block h-[14px] w-px translate-y-0.5 bg-amber" />}
      </span>
      {tag && <span className={dim ? ghostPill : pill}>{tag}</span>}
    </div>
  );
}

function Mock({ mock }: { mock: GrowthMock }) {
  switch (mock.kind) {
    case "search":
      return (
        <div className="space-y-2">
          <SearchBar query={mock.query} tag={mock.tag} />
          {mock.dim && <SearchBar query={mock.dim.query} tag={mock.dim.tag} dim />}
        </div>
      );
    case "map":
      return (
        <div className="space-y-2">
          <SearchBar query={mock.query} />
          <div className="relative h-[72px] overflow-hidden rounded-[8px] bg-oninverse/[0.06] [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:28px_28px]">
            <span className="absolute left-[18%] top-[30%] size-1.5 rounded-full bg-oninverse/35" />
            <span className="absolute left-[72%] top-[55%] size-1.5 rounded-full bg-oninverse/35" />
            <span className="absolute left-[40%] top-[62%] size-1.5 rounded-full bg-oninverse/35" />
            <span className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2">
              <MapPin className="size-6 fill-amber text-white" aria-hidden="true" />
              <span className={pill}>{mock.pin}</span>
            </span>
          </div>
        </div>
      );
    case "page":
      return (
        <div className={`${shell} p-3.5`}>
          <div className="mb-3 flex gap-1">
            <span className="size-1.5 rounded-full bg-oninverse/30" />
            <span className="size-1.5 rounded-full bg-oninverse/30" />
            <span className="size-1.5 rounded-full bg-oninverse/30" />
          </div>
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <div className="text-[14px] font-semibold leading-snug">{mock.title}</div>
              <div className="mt-2 h-1 w-3/4 rounded bg-oninverse/15" />
              <div className="mt-1.5 h-1 w-1/2 rounded bg-oninverse/15" />
            </div>
            {mock.selects && (
              <div className="flex shrink-0 flex-col gap-1.5">
                {mock.selects.map((s) => (
                  <span key={s} className={`${ghostPill} flex items-center justify-between gap-3 rounded-[6px] text-oninverse/80`}>
                    {s}
                    <ChevronDown className="size-3" aria-hidden="true" />
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="mt-3 flex items-center justify-between gap-3">
            <div className="flex gap-1.5">{mock.chips?.map((c) => <span key={c} className={ghostPill}>{c}</span>)}</div>
            <span className={`${button} ml-auto`}>{mock.cta}</span>
          </div>
        </div>
      );
    case "enquiry":
      return (
        <div className={`${shell} p-3.5`}>
          <div className="flex items-center gap-3">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-amber text-[12px] font-bold text-white">{mock.initials}</span>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[14px] font-semibold">{mock.title}</div>
              <div className="truncate text-[12px] text-oninverse/55">{mock.sub}</div>
            </div>
            <span className="rounded-full border border-success/60 px-2.5 py-0.5 text-[12px] font-semibold text-[#7fd1a4]">{mock.badge}</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 border-t border-oninverse/10 pt-3">
            {mock.checks.map((c) => (
              <span key={c} className="flex items-center gap-1.5 text-[13px] text-oninverse/75">
                <Check className="size-3.5 text-[#7fd1a4]" aria-hidden="true" />
                {c}
              </span>
            ))}
          </div>
        </div>
      );
    case "call":
      return (
        <div className="flex items-center gap-3">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-full border-[3px] border-amber/40 bg-amber/20">
            <Phone className="size-5 fill-amber text-amber" aria-hidden="true" />
          </span>
          <div className={`${shell} flex flex-1 items-center gap-3 px-3.5 py-2.5`}>
            <Check className="size-4 shrink-0 text-[#7fd1a4]" aria-hidden="true" />
            <div className="min-w-0">
              <div className="truncate text-[14px] font-semibold">{mock.title}</div>
              <div className="truncate text-[12px] text-oninverse/55">{mock.sub}</div>
            </div>
          </div>
        </div>
      );
    case "product":
      return (
        <div className={`${shell} flex items-center gap-3.5 p-3.5`}>
          <span className="size-14 shrink-0 rounded-[6px] bg-oninverse/10" />
          <div className="min-w-0 flex-1">
            <div className="truncate text-[14px] font-semibold">{mock.title}</div>
            <div className="mt-1 flex items-center gap-1 text-[12px] text-oninverse/60">
              {[0, 1, 2, 3, 4].map((i) => <Star key={i} className="size-3 fill-amber text-amber" aria-hidden="true" />)}
              <span className="ml-1">{mock.rating}</span>
            </div>
            <div className="mt-1 text-[12px] text-oninverse/55">{mock.note}</div>
          </div>
          <span className={button}>{mock.cta}</span>
        </div>
      );
    case "steps":
      return (
        <ol className="flex items-center gap-2">
          {mock.items.map((item, i) => (
            <li key={item} className="flex flex-1 items-center gap-2">
              <span className={`flex items-center gap-1.5 whitespace-nowrap text-[13px] ${i < mock.done ? "text-oninverse/80" : "font-semibold text-amber"}`}>
                <span className={`flex size-5 items-center justify-center rounded-full text-[11px] ${i < mock.done ? "bg-[#7fd1a4]/20 text-[#7fd1a4]" : "bg-amber text-white"}`}>
                  {i < mock.done ? <Check className="size-3" aria-hidden="true" /> : i + 1}
                </span>
                {item}
              </span>
              {i < mock.items.length - 1 && <span className="h-px flex-1 bg-oninverse/15" />}
            </li>
          ))}
        </ol>
      );
    case "bars":
      return (
        <div className="grid gap-x-3" style={{ gridTemplateColumns: `repeat(${mock.labels.length},1fr)` }}>
          {mock.labels.map((label, i) => (
            <div key={label} className="flex flex-col items-center gap-1.5">
              <div className="flex h-14 w-full items-end rounded-[4px] bg-oninverse/[0.06] px-2">
                <span className={`w-full rounded-t-[3px] ${i === mock.labels.length - 1 ? "bg-amber" : "bg-oninverse/35"}`} style={{ height: `${mock.heights[i]}%` }} />
              </div>
              <span className="text-[12px] text-oninverse/60">{label}</span>
            </div>
          ))}
        </div>
      );
    case "tasks":
      return (
        <ul className="space-y-1.5">
          {mock.items.map((item) => (
            <li key={item.label} className={`${shell} flex items-center justify-between gap-3 px-3.5 py-2`}>
              <span className="flex items-center gap-2.5 text-[14px] font-semibold">
                <span className={`size-2 rounded-full ${item.live ? "bg-[#7fd1a4]" : "bg-amber"}`} />
                {item.label}
              </span>
              <span className={ghostPill}>{item.status}</span>
            </li>
          ))}
        </ul>
      );
    case "decision":
      return (
        <div className={`${shell} flex items-center justify-between gap-3 p-3.5`}>
          <div className="text-[14px] font-semibold">{mock.title}</div>
          <div className="flex gap-2">
            <span className={button}>{mock.options[0]}</span>
            <span className={`${ghostPill} rounded-[6px] px-3.5 py-1.5 text-[13px]`}>{mock.options[1]}</span>
          </div>
        </div>
      );
    case "form":
      return (
        <div className={`${shell} p-3.5`}>
          <div className="grid grid-cols-2 gap-2">
            {mock.fields.map((f) => (
              <span key={f} className="rounded-[6px] border border-oninverse/15 bg-oninverse/[0.05] px-3 py-1.5 text-[12px] text-oninverse/55">{f}</span>
            ))}
          </div>
          <div className="mt-2.5 flex items-center justify-between gap-3">
            <span className="flex items-center gap-1.5 text-[12px] text-[#7fd1a4]">
              <Check className="size-3.5" aria-hidden="true" />
              {mock.done}
            </span>
            <span className={button}>{mock.cta}</span>
          </div>
        </div>
      );
    case "proof":
      return (
        <div className="grid grid-cols-3 gap-2">
          {mock.items.map((item, i) => (
            <div key={item} className={`${shell} p-3 text-center`}>
              {i === 0 ? (
                <div className="flex justify-center gap-0.5">{[0, 1, 2, 3, 4].map((s) => <Star key={s} className="size-3 fill-amber text-amber" aria-hidden="true" />)}</div>
              ) : (
                <Check className="mx-auto size-4 text-[#7fd1a4]" aria-hidden="true" />
              )}
              <div className="mt-1.5 text-[12px] font-semibold leading-tight text-oninverse/80">{item}</div>
            </div>
          ))}
        </div>
      );
  }
}

export function GrowthPath({ content }: { content: SolutionPageContent }) {
  const steps = content.signal.split(" → ");
  return (
    <div className={`solution-signal solution-signal-${content.theme} relative overflow-hidden rounded-[10px] border border-oninverse/10 bg-inverse p-7 text-oninverse shadow-[0_36px_90px_-44px_rgb(0_0_0/.72)] max-sm:p-5`}>
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.07)_1px,transparent_1px)] [background-size:42px_42px]" />
      <div className="relative">
        <div className="flex items-center justify-between border-b border-oninverse/12 pb-4 text-[14px] uppercase tracking-[0.14em] text-oninverse/55">
          <span>Growth path</span>
          <span className="size-2 rounded-full bg-amber shadow-[0_0_0_6px_rgb(var(--accent-rgb)/.12)]" />
        </div>
        <ol className="relative my-6 space-y-3 pl-8 max-sm:pl-0">
          {/* Dotted rail joining the step markers. */}
          <span aria-hidden="true" className="absolute bottom-6 left-[7px] top-6 border-l-2 border-dotted border-amber/45 max-sm:hidden" />
          {steps.map((label, index) => {
            const last = index === steps.length - 1;
            return (
              <li
                key={label}
                className={`relative rounded-[10px] border p-4 backdrop-blur-sm ${last ? "border-amber/70 bg-oninverse/[0.07]" : "border-oninverse/12 bg-oninverse/[0.055]"}`}
              >
                <span
                  aria-hidden="true"
                  className={`absolute -left-8 top-5 size-4 rounded-full border-2 max-sm:hidden ${last ? "border-amber bg-amber" : "border-oninverse/40 bg-inverse"}`}
                />
                <div className="flex items-center justify-between gap-4">
                  <span className="font-sans text-[clamp(18px,1.6vw,22px)] font-semibold first-letter:uppercase">{label}</span>
                  <span className="text-[15px] tabular-nums text-[var(--accent-light)]">0{index + 1}</span>
                </div>
                {content.signalMocks?.[index] && (
                  <div className="mt-3">
                    <Mock mock={content.signalMocks[index]} />
                  </div>
                )}
              </li>
            );
          })}
        </ol>
        <div className="border-t border-oninverse/12 pt-4 text-[17px] leading-relaxed text-oninverse/55">
          {content.signalNote ?? "One connected journey. Measured against the action that matters."}
        </div>
      </div>
    </div>
  );
}
