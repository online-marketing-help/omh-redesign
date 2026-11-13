"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Check, Minus, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { priceList, type PriceCell, type PriceTable } from "@/lib/content/price-list";

const groups = [
  { id: "websites", title: "Websites & maintenance", description: "Build a website, launch a store or look after the site you have.", services: ["wordpress", "Shopify", "maintenence", "website-designs"] },
  { id: "search", title: "Search & advertising", description: "Reach people searching for your business, locally and beyond.", services: ["seo", "local-seo", "ppc", "amazon-ppc"] },
  { id: "social", title: "Social media", description: "Compare ongoing content management with paid social campaigns.", services: ["smm", "facebook", "instagram", "smp"] },
  { id: "ai", title: "AI services", description: "An AI voice agent that answers every call, books appointments and follows up, set up and managed for you.", services: ["ai-voice-agents"] },
];

function Value({ value }: { value: PriceCell }) {
  if (typeof value === "boolean") {
    const Icon = value ? Check : Minus;
    return <><Icon className={"mx-auto size-5 " + (value ? "text-amber-deep" : "text-muted/60")} aria-hidden /><span className="sr-only">{value ? "Included" : "Not included"}</span></>;
  }
  return <>{value}</>;
}

function ComparisonTable({ table }: { table: PriceTable }) {
  const pricing = table.rows.find(row => row.label.startsWith("Pricing"));
  return (
    <>
      
      <div role="region" aria-label={`${table.title} package comparison`} tabIndex={0} className="hidden w-full max-w-full overflow-x-auto rounded-xl md:block border border-line focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber">
        <table className="w-full min-w-[680px] border-collapse text-left">
          <caption className="sr-only">{table.title}: prices and included features</caption>
          <thead>
            <tr className="border-b border-line bg-warm">
              <th scope="col" className="sticky left-0 z-10 w-[30%] min-w-[150px] bg-warm px-4 py-6 text-body font-semibold text-muted sm:px-5">Compare packages</th>
              {table.tiers.map((tier, index) => (
                <th key={tier} scope="col" className="min-w-[130px] px-4 py-6 text-center align-top">
                  <span className="block text-body font-semibold text-ink">{tier}</span>
                  <span className="mt-3 block whitespace-nowrap font-sans text-[28px] font-semibold tracking-tight text-amber-deep">{pricing?.values[index]}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.filter(row => !row.label.startsWith("Pricing")).map(row => (
              <tr key={row.label} className="group/row border-b border-line last:border-0 hover:bg-warm">
                <th scope="row" className="sticky left-0 z-10 bg-surface px-4 py-3.5 text-body font-medium leading-snug text-ink group-hover/row:bg-warm sm:px-5">{row.label}</th>
                {row.values.map((value, index) => <td key={index} className="px-4 py-3.5 text-center text-body text-ink/80"><Value value={value} /></td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="space-y-5 md:hidden">
        {table.tiers.map((tier, index) => (
          <section key={tier} className="border-b border-line pb-5 last:border-0">
            <h3 className="font-sans text-xl font-semibold">{tier}</h3>
            <p className="mt-2 font-sans text-[28px] font-semibold text-amber-deep">{pricing?.values[index]}</p>
            <details className="mt-3">
              <summary className="min-h-11 cursor-pointer py-2 text-body font-semibold focus-visible:outline-2 focus-visible:outline-amber">View package features</summary>
              <dl className="mt-2 divide-y divide-line">
                {table.rows.filter(row => !row.label.startsWith("Pricing")).map(row => (
                  <div key={row.label} className="grid grid-cols-[minmax(0,1fr)_minmax(70px,auto)] gap-4 py-3 text-body leading-relaxed">
                    <dt className="text-ink/80">{row.label}</dt><dd className="text-right font-medium"><Value value={row.values[index]} /></dd>
                  </div>
                ))}
              </dl>
            </details>
          </section>
        ))}
      </div>
    </>
  );
}

export function PriceListHero() {
  return (
    <section className="hero-grid overflow-x-clip border-b border-line bg-warm">
      <div className="container-omh py-12 sm:py-16">
        <p className="text-body font-semibold text-muted">Services & pricing</p>
        <div className="mt-5 flex items-end justify-between gap-8 max-md:block">
          <div>
            <h1 className="font-sans text-display font-semibold text-balance">Choose the right service for <span className="text-amber-deep">your business</span>.</h1>
            <p className="mt-5 text-lead leading-relaxed text-ink/70">Choose a service below to see its packages, prices and what’s included. Compare only what you need.</p>
          </div>
          <div className="shrink-0 max-md:mt-7">
            <Button href="/contact" arrow data-event="pricing_hero_cta_click">Help me choose</Button>
            <p className="mt-3 text-body text-muted">Free 30-minute consultation</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/** `voicePricingHtml`: the AI voice agent plan cards (lib/content/ai-voice-agents-markup.ts), built on the server
    and passed in so the markup stays out of this client bundle. */
export function PriceTables({ voicePricingHtml }: { voicePricingHtml: string }) {
  useEffect(() => {
    const openLinkedService = () => {
      const target = document.getElementById(window.location.hash.slice(1));
      if (target instanceof HTMLDetailsElement) {
        target.open = true;
        target.scrollIntoView({ block: "start" });
      }
    };
    openLinkedService();
    window.addEventListener("hashchange", openLinkedService);
    return () => window.removeEventListener("hashchange", openLinkedService);
  }, []);

  return (
    <section className="border-b border-line bg-surface">
      <div className="container-omh grid items-start gap-10 py-12 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-14 lg:py-16">
        <nav aria-label="Pricing categories" className="lg:sticky lg:top-28">
          <p className="mb-4 font-sans text-xl font-semibold text-ink">Find your service</p>
          <ul className="grid grid-cols-2 gap-x-5 lg:grid-cols-1">
            {groups.map(group => <li key={group.id}><a href={`#${group.id}`} className="block min-h-12 border-b border-line py-4 text-body font-medium leading-relaxed text-ink transition-colors hover:text-amber-deep focus-visible:outline-2 focus-visible:outline-amber">{group.title}</a></li>)}
          </ul>
          <p className="mt-5 text-body leading-relaxed text-muted">Open a service to compare packages. Prices, contract lengths and extra costs are listed together.</p>
        </nav>
        <div className="min-w-0 space-y-12">
          {groups.map(group => (
            <section key={group.id} id={group.id} aria-labelledby={`${group.id}-heading`} className="scroll-mt-28">
              <h2 id={`${group.id}-heading`} className="font-sans text-h3 font-semibold text-ink">{group.title}</h2>
              <p className="mt-2 text-body text-muted">{group.description}</p>
              <div className="mt-6 border-t border-line">
                {group.services.map(id => {
                  // AI voice agents: the same plan cards as /ai-voice-agents, in the voice page's own styles.
                  if (id === "ai-voice-agents") return (
                    <details key={id} id={id} name="pricing-service" className="group/service scroll-mt-28 min-w-0 border-b border-line bg-surface">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 max-sm:flex-wrap transition-colors hover:bg-warm focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-amber group-open/service:bg-warm [&::-webkit-details-marker]:hidden sm:p-6">
                        <span className="min-w-0"><span className="block font-sans text-[19px] font-semibold leading-snug text-ink">AI Voice Agents</span><span className="mt-1 block text-body text-muted">3 plans to compare, billed monthly</span></span>
                        <span className="flex shrink-0 items-center gap-3 max-sm:w-full max-sm:justify-between sm:gap-5"><span className="text-right max-sm:text-left"><span className="block text-body text-muted">Starting from</span><span className="block font-sans text-xl font-semibold text-amber-deep">£249 a month</span></span><ChevronDown className="size-5 text-amber-deep transition-transform group-open/service:rotate-180 motion-reduce:transition-none" aria-hidden /></span>
                      </summary>
                      <div className="border-t border-line p-4 sm:p-6">
                        <p className="text-body leading-relaxed text-ink/75">Three plans, billed monthly, no minimum contract. Every plan includes a managed agent, a British voice, a summary of every call and a monthly report. Prices exclude VAT.</p>
                        <div id="va-page" className="va-page" dangerouslySetInnerHTML={{ __html: voicePricingHtml }} />
                        <div className="mt-5 flex flex-wrap items-center justify-between gap-4"><p className="text-body text-muted">See what it sounds like before choosing a plan.</p><Button href="/ai-voice-agents" data-event="pricing_service_enquiry" data-service={id}>See AI voice agents</Button></div>
                      </div>
                    </details>
                  );
                  const table = priceList.tables.find(item => item.id === id)!;
                  const pricing = table.rows.find(row => row.label.startsWith("Pricing"));
                  const importantNotes = table.notes.filter(note => /Monthly Payment|advertising spend|cost of Shopify|minimum 3 month/i.test(note));
                  return (
                    <details key={id} id={id} name="pricing-service" className="group/service scroll-mt-28 min-w-0 border-b border-line bg-surface">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 max-sm:flex-wrap transition-colors hover:bg-warm focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-amber group-open/service:bg-warm [&::-webkit-details-marker]:hidden sm:p-6">
                        <span className="min-w-0"><span className="block font-sans text-[19px] font-semibold leading-snug text-ink">{table.title}</span><span className="mt-1 block text-body text-muted">{table.tiers.length ? `${table.tiers.length} packages to compare` : "A design tailored to your project"}</span></span>
                        <span className="flex shrink-0 items-center gap-3 max-sm:w-full max-sm:justify-between sm:gap-5"><span className="text-right max-sm:text-left"><span className="block text-body text-muted">{pricing ? "Starting from" : "Bespoke pricing"}</span><span className="block font-sans text-xl font-semibold text-amber-deep">{pricing ? pricing.values[0] : "Custom quote"}</span></span><ChevronDown className="size-5 text-amber-deep transition-transform group-open/service:rotate-180 motion-reduce:transition-none" aria-hidden /></span>
                      </summary>
                      <div className="border-t border-line p-4 sm:p-6">
                        {pricing ? <ComparisonTable table={table} /> : <div className=""><h3 className="font-sans text-h4 font-semibold">Let’s scope your website design</h3><p className="mt-3 text-body leading-relaxed text-ink/75">There is no fixed package price for this service. Share your requirements and we’ll help you choose a design and prepare a quote.</p><Link href="/website-designs" className="mt-4 inline-block font-semibold text-amber-deep underline underline-offset-4">Browse website designs</Link></div>}
                        {importantNotes.length > 0 && <div className="mt-5 rounded-lg border-l-2 border-amber bg-warm p-4"><p className="mb-2 text-body font-semibold text-ink">Pricing notes</p>{importantNotes.map(note => <p key={note} className="mt-1 text-body leading-relaxed text-ink/75">{note}</p>)}</div>}
                        <details className="mt-5 border-b border-line pb-5">
                          <summary className="cursor-pointer text-body font-semibold text-ink focus-visible:outline-2 focus-visible:outline-amber">Package details & terms</summary>
                          <ul className="mt-4 list-disc space-y-3 pl-5 text-body leading-relaxed text-ink/75">
                            {table.notes.filter(note => !importantNotes.includes(note) && note !== "As part of your services, we will:").map(note => <li key={note}>{note}</li>)}
                          </ul>
                        </details>
                        <div className="mt-5 flex flex-wrap items-center justify-between gap-4"><p className="text-body text-muted">Discuss your requirements before choosing a package.</p><Button href="/contact" data-event="pricing_service_enquiry" data-service={id}>{pricing ? "Discuss this service" : "Request a quote"}</Button></div>
                      </div>
                    </details>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PriceListFinalCta() {
  return (
    <section className="bg-warm">
      <div className="container-omh flex items-center justify-between gap-8 py-12 max-md:flex-col max-md:items-start sm:py-16">
        <div>
          <h2 className="font-sans text-h3 font-semibold">Need help choosing a service?</h2>
          <p className="mt-4 text-body leading-relaxed text-ink/75">Tell us what you want to achieve. We’ll explain the options and costs in a free 30-minute consultation.</p>
        </div>
        <Button href="/contact" data-event="pricing_final_cta_click">Book a free consultation</Button>
      </div>
    </section>
  );
}
