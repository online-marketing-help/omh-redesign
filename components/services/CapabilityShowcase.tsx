import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Pointer } from "@/components/Pointer";
import { Reveal } from "@/components/Reveal";
import { ServiceBand as Band } from "@/components/services/ServiceBand";
import { CheckIcon as Check, ServiceSectionIntro as SectionIntro } from "@/components/services/ServicePrimitives";
import { Button } from "@/components/ui/Button";

/* The "what we build" section shared by the Shopify, WordPress development and WordPress maintenance
   pages (client audit, 26 Oct 2026): a dark feature card with a mock-up beside the copy, then the
   remaining capabilities as icon cards. */

export function CapabilityShowcase({
  label,
  intro,
  featured,
  items,
}: {
  label: string;
  intro: { title: string; accent: string; body: string };
  featured: {
    eyebrow: string;
    title: string;
    body: string;
    detail?: readonly string[];
    tag?: string;
    primary?: { label: string; href: string; event: string };
    secondary?: { label: string; href: string; event: string };
    /** Right-hand mock-up or card. */
    aside: ReactNode;
  };
  items: { title: string; body: string; icon: LucideIcon }[];
}) {
  return (
    <Band label={label}>
      <Reveal>
        <SectionIntro title={intro.title} accent={intro.accent} body={intro.body} />

        <Pointer className="pointer-spotlight relative mt-12 overflow-hidden rounded-card bg-inverse p-9 text-oninverse max-sm:p-6">
          <div className="relative z-10 grid grid-cols-12 items-center gap-x-10 gap-y-8 max-lg:block">
            <div className="col-span-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-[14px] font-semibold uppercase tracking-[0.16em] text-oninverse/55">{featured.eyebrow}</p>
                {featured.tag && <span className="rounded-full bg-amber px-3 py-1 text-[13px] font-semibold text-white">{featured.tag}</span>}
              </div>
              <h3 className="mt-5 font-sans text-h2 font-semibold">{featured.title}</h3>
              <p className="mt-5 text-body leading-relaxed text-oninverse/75">{featured.body}</p>
              {featured.detail && (
                <ul className="mt-7 grid gap-2.5 border-t border-oninverse/15 pt-6 sm:grid-cols-2">
                  {featured.detail.map((line) => (
                    <li key={line} className="flex gap-3 text-body leading-snug text-oninverse/85">
                      <Check className="mt-0.5 size-4 shrink-0 text-[var(--accent-light)]" />
                      {line}
                    </li>
                  ))}
                </ul>
              )}
              {(featured.primary || featured.secondary) && (
                <div className="mt-8 flex flex-wrap gap-3 max-sm:flex-col">
                  {featured.primary && (
                    <Button href={featured.primary.href} variant="inverse" arrow data-event={featured.primary.event}>
                      {featured.primary.label}
                    </Button>
                  )}
                  {featured.secondary && (
                    <Button href={featured.secondary.href} variant="ghost-white" arrow data-event={featured.secondary.event}>
                      {featured.secondary.label}
                    </Button>
                  )}
                </div>
              )}
            </div>
            <div className="col-span-5 col-start-8 max-lg:mt-9">{featured.aside}</div>
          </div>
        </Pointer>

        <div className="mt-6 grid grid-cols-3 gap-5 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {items.map((item, index) => (
            <article key={item.title} className="surface-card rounded-card border border-line bg-surface p-6">
              <div className="flex items-start justify-between gap-4">
                <span className="flex size-11 items-center justify-center rounded-[10px] bg-soft text-amber-deep">
                  <item.icon className="size-5" aria-hidden="true" />
                </span>
                <span className="font-sans text-[14px] font-semibold tabular-nums tracking-[0.1em] text-muted">{String(index + 2).padStart(2, "0")}</span>
              </div>
              <h3 className="mt-5 font-sans text-h4 font-semibold">{item.title}</h3>
              <p className="mt-2.5 text-body leading-relaxed text-ink/75">{item.body}</p>
            </article>
          ))}
        </div>
      </Reveal>
    </Band>
  );
}

/* Mock-ups for the feature card's aside. Illustrative UI, not client data. */
const shell = "rounded-[8px] border border-oninverse/12 bg-oninverse/[0.06]";

export function StorefrontMock() {
  return (
    <div className={`${shell} p-4`}>
      <div className="flex items-center justify-between border-b border-oninverse/12 pb-3">
        <span className="font-sans text-[13px] font-semibold uppercase tracking-[0.14em]">Yourstore</span>
        <span className="rounded-full border border-oninverse/20 px-2.5 py-0.5 text-[12px] text-oninverse/65">Sort: Popular</span>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2.5">
        {["Linen shirt", "Canvas tote", "Field jacket"].map((name, i) => (
          <div key={name}>
            <div className={`aspect-square rounded-[6px] ${["bg-[#e7c9b5]", "bg-[#c7d9ea]", "bg-[#cfe0c4]"][i]}`} />
            <div className="mt-1.5 text-[12px] font-semibold">{name}</div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-3 rounded-[8px] bg-oninverse/[0.08] px-3 py-2">
        <span className="flex size-6 items-center justify-center rounded-full bg-[#7fd1a4]/20"><Check className="size-3.5 text-[#7fd1a4]" /></span>
        <span className="text-[12px]"><span className="font-semibold">New order</span> · 2 items · paid</span>
      </div>
    </div>
  );
}

export function MonitorMock() {
  const rows: [string, string, boolean][] = [
    ["Core, theme and plugins", "Updated", true],
    ["Nightly backup", "Stored", true],
    ["Uptime check", "Responding", true],
    ["Contact form test", "Delivered", true],
  ];
  return (
    <div className={`${shell} p-4`}>
      <div className="flex items-center justify-between border-b border-oninverse/12 pb-3">
        <span className="font-sans text-[14px] font-semibold">This month&apos;s window</span>
        <span className="rounded-full bg-[#7fd1a4]/15 px-2.5 py-0.5 text-[12px] font-semibold text-[#7fd1a4]">Complete</span>
      </div>
      <ul className="mt-2">
        {rows.map(([k, v]) => (
          <li key={k} className="flex items-center justify-between gap-3 border-b border-oninverse/10 py-2 text-[13px] last:border-b-0">
            <span className="flex items-center gap-2 text-oninverse/80"><Check className="size-3.5 text-[#7fd1a4]" />{k}</span>
            <span className="font-semibold">{v}</span>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex items-end gap-1" aria-hidden="true">
        {[60, 100, 100, 100, 90, 100, 100, 100, 100, 70, 100, 100].map((h, i) => (
          <span key={i} className="flex-1 rounded-t-[2px] bg-[#7fd1a4]/70" style={{ height: `${h * 0.22}px` }} />
        ))}
      </div>
      <div className="mt-1.5 text-[12px] text-oninverse/55">Uptime, last 12 checks</div>
    </div>
  );
}
