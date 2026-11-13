import Link from "next/link";
import { BarChart3, FileSearch, Link2, PackageSearch, type LucideIcon } from "lucide-react";
import { Pointer } from "@/components/Pointer";
import { Reveal } from "@/components/Reveal";
import { CaseStudyVisual } from "@/components/case-studies/CaseStudyVisual";
import { CapabilityShowcase } from "@/components/services/CapabilityShowcase";
import { ServiceBand as Band } from "@/components/services/ServiceBand";
import { ServiceFaqSection } from "@/components/services/ServiceFaqSection";
import { ServiceFitSection } from "@/components/services/ServiceFitSection";
import { ServiceHeroArt } from "@/components/services/ServiceHeroArt";
import { ServiceNextStepsCTA } from "@/components/services/ServiceNextStepsCTA";
import { ServiceProcessTimeline } from "@/components/services/ServiceProcessTimeline";
import { ServiceReasonGrid } from "@/components/services/ServiceReasonGrid";
import {
  CheckIcon as Check,
  HighlightedText,
  ServiceSectionIntro as SectionIntro,
  withLinks,
} from "@/components/services/ServicePrimitives";
import { ArrowRight, Button } from "@/components/ui/Button";
import { Eyebrow, ReviewProof } from "@/components/ui/Proof";
import { caseStudies } from "@/lib/content/case-studies";
import { ecommerceSeo as page } from "@/lib/content/ecommerce-seo";
import { CASE_STUDIES_LIVE } from "@/lib/flags";

/* /ecommerce-seo-services on the service-page scaffold (hero with proof badge, ruled
   problem list, capability showcase, fit columns, process timeline, package cards,
   reason grid, FAQ band, final CTA). Copy comes from lib/content/ecommerce-seo.ts. */

const event = "ecommerce_seo";

export function EcommerceSeoHero() {
  const h = page.hero;
  return (
    <section className="hero-grid overflow-x-clip border-b border-line bg-warm">
      <div className="container-omh pb-[clamp(56px,38px+2.9vw,88px)] pt-[clamp(48px,34px+2.3vw,80px)]">
        <div className="grid grid-cols-12 items-center gap-x-12 gap-y-12 max-lg:block">
          <div className="col-span-7 max-lg:mb-12">
            {/* CSS-only entrance, not <Reveal>: the hero paints before hydration. */}
            <div className="hero-in">
              <Eyebrow>{h.eyebrow}</Eyebrow>
              <h1 className="mb-6 mt-7 font-sans text-display font-semibold text-balance">
                <HighlightedText text={h.title} highlight={h.titleAccent} />
              </h1>
              <p className="mb-9 text-lead leading-relaxed text-ink/75">{h.body}</p>
              <div className="flex flex-wrap items-center gap-3.5 max-sm:flex-col max-sm:items-stretch">
                <Button href={h.primary.href} arrow data-event={`${event}_hero_cta_click`}>{h.primary.label}</Button>
                <Button href={h.secondary.href} variant="secondary" arrow data-event={`${event}_view_packages_click`}>{h.secondary.label}</Button>
              </div>
              {CASE_STUDIES_LIVE && (<>
              <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-5 border-t border-line pt-7">
                {h.stats.map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-[14px] font-semibold uppercase tracking-[0.14em] text-muted">{label}</dt>
                    <dd className="mt-1.5 font-sans text-h4 font-semibold">{value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 text-bsm text-muted">{h.statsNote}</p>
              </>)}
            </div>
          </div>
          <div className="hero-in hero-in-2 col-span-5 col-start-8">
            <Pointer>
              <div className="pointer-parallax" role="img" aria-label={h.visualLabel}>
                <ServiceHeroArt variant="ecommerce-seo" />
              </div>
            </Pointer>
            <ReviewProof serviceId="ecommerce-seo" heading="Ecommerce SEO backed by verified client trust" className="mt-6" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function EcommerceSeoWhy() {
  const w = page.why;
  return (
    <Band label={w.eyebrow}>
      <Reveal>
        <div className="grid grid-cols-12 gap-x-10 gap-y-10 max-lg:block">
          <div className="col-span-6 max-lg:mb-10">
            <SectionIntro title={w.title} accent={w.titleAccent} body={w.body} bodyClassName="text-body" />
          </div>
          <div className="col-span-6 grid gap-5 self-center">
            {w.cards.map(([title, body], index) => (
              <article key={title} className="surface-card grid grid-cols-[auto_1fr] gap-x-5 rounded-card border border-line bg-surface p-7">
                <span className="font-sans text-[18px] font-semibold tabular-nums tracking-[0.1em] text-amber">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-sans text-h4 font-semibold">{title}</h3>
                  <p className="mt-2.5 text-body leading-relaxed text-ink/75">{body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Reveal>
    </Band>
  );
}

/* Illustrative audit findings for the feature card's aside. */
function AuditMock() {
  const rows: [string, string, boolean][] = [
    ["Category pages missing copy", "High impact", true],
    ["Filter URLs indexed", "High impact", true],
    ["Product schema invalid", "Medium", false],
    ["Images over 300 KB", "Medium", false],
  ];
  return (
    <div className="rounded-[8px] border border-oninverse/12 bg-oninverse/[0.06] p-4">
      <div className="flex items-center justify-between border-b border-oninverse/12 pb-3">
        <span className="font-sans text-[14px] font-semibold">Audit findings, ranked by revenue impact</span>
      </div>
      <ul className="mt-2">
        {rows.map(([k, v, high]) => (
          <li key={k} className="flex items-center justify-between gap-3 border-b border-oninverse/10 py-2.5 text-[13px] last:border-b-0">
            <span className="text-oninverse/85">{k}</span>
            <span className={`rounded-full px-2.5 py-0.5 text-[12px] font-semibold ${high ? "bg-amber text-white" : "border border-oninverse/20 text-oninverse/65"}`}>{v}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function EcommerceSeoServices() {
  const s = page.services;
  const [featured, ...rest] = s.items;
  const icons: LucideIcon[] = [FileSearch, PackageSearch, Link2];
  return (
    <CapabilityShowcase
      label={s.eyebrow}
      intro={{ title: s.title, accent: s.titleAccent, body: s.body }}
      featured={{
        eyebrow: "Every engagement starts here",
        title: featured.title,
        body: featured.body,
        primary: { label: page.hero.primary.label, href: page.hero.primary.href, event: `${event}_audit_cta_click` },
        secondary: { label: "See the packages", href: "#packages", event: `${event}_services_packages_click` },
        aside: <AuditMock />,
      }}
      items={rest.map((item, i) => ({ ...item, icon: icons[i] ?? BarChart3 }))}
    />
  );
}

export function EcommerceSeoFit() {
  const f = page.fit;
  return (
    <ServiceFitSection
      label={f.eyebrow}
      title={f.title}
      titleAccent={f.titleAccent}
      good={f.good}
      notFit={f.notFit}
      notFitTitle="Not the right engagement"
    />
  );
}

export function EcommerceSeoProblems() {
  const p = page.problems;
  return (
    <Band label={p.eyebrow} tone="warm">
      <Reveal>
        <div className="grid grid-cols-12 gap-x-10 gap-y-10 max-lg:block">
          <div className="col-span-4 max-lg:mb-10">
            <div className="lg:sticky lg:top-24">
              <SectionIntro size="md" title={p.title} accent={p.titleAccent} />
            </div>
          </div>
          <div className="col-span-8 grid grid-cols-2 gap-x-8 max-md:grid-cols-1">
            {p.items.map(([title, body], index) => (
              <article key={title} className="group border-t border-line px-3 py-6 transition-colors hover:border-teal/50 hover:bg-surface">
                <div className="flex items-baseline gap-4">
                  <span className="font-sans text-body font-semibold tracking-[0.1em] text-muted group-hover:text-amber">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="font-sans text-h4 font-semibold">{title}</h3>
                </div>
                <p className="mt-2.5 pl-10 text-body leading-relaxed text-ink/75">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </Reveal>
    </Band>
  );
}

export function EcommerceSeoBenefits() {
  const b = page.benefits;
  return <ServiceReasonGrid label={b.eyebrow} tone="white" title={b.title} titleAccent={b.titleAccent} body={b.body} reasons={b.items} />;
}

export function EcommerceSeoConsultant() {
  const c = page.consultant;
  return (
    <Band label={c.eyebrow} tone="navy">
      <Reveal>
        <div className="grid grid-cols-12 gap-x-12 gap-y-10 max-lg:block">
          <div className="col-span-7 max-lg:mb-10">
            <h2 className="font-sans text-h2 font-semibold text-balance">
              <HighlightedText text={c.title} highlight={c.titleAccent} highlightClassName="text-[var(--accent-light)]" />
            </h2>
            <p className="mt-5 text-body leading-relaxed text-oninverse/72">{c.body}</p>
          </div>
          <div className="col-span-5 self-end rounded-card border border-oninverse/15 bg-oninverse/[0.05] p-7">
            <p className="text-[14px] font-semibold uppercase tracking-[0.15em] text-oninverse/60">Experience</p>
            <p className="mt-4 text-body leading-relaxed text-oninverse/85">{c.brands}</p>
          </div>
        </div>
      </Reveal>
    </Band>
  );
}

export function EcommerceSeoPlatforms() {
  const p = page.platforms;
  return (
    <Band label={p.eyebrow} tone="white">
      <Reveal>
        <SectionIntro title={p.title} accent={p.titleAccent} body={p.body} bodyClassName="text-body" />
        <div className="mt-12 grid grid-cols-3 gap-5 max-md:grid-cols-1">
          {p.items.map(([letter, title, body]) => (
            <article key={title} className="surface-card rounded-card border border-line bg-surface p-7">
              <span className="flex size-11 items-center justify-center rounded-[10px] bg-soft font-sans text-[20px] font-semibold text-amber-deep" aria-hidden="true">{letter}</span>
              <h3 className="mt-5 font-sans text-h4 font-semibold">{title}</h3>
              <p className="mt-3 text-body leading-relaxed text-ink/75">{withLinks(body)}</p>
            </article>
          ))}
        </div>
      </Reveal>
    </Band>
  );
}

export function EcommerceSeoProcess() {
  const p = page.process;
  return (
    <ServiceProcessTimeline
      label={p.eyebrow}
      title={p.title}
      titleAccent={p.titleAccent}
      body={p.body}
      steps={p.steps}
      action={{ label: p.cta, event: `${event}_process_cta_click`, href: page.hero.primary.href }}
    />
  );
}

export function EcommerceSeoPackages() {
  const p = page.packages;
  return (
    <Band label={p.eyebrow} id="packages" tone="warm">
      <div data-event={`${event}_pricing_view`}>
        <SectionIntro title={p.title} accent={p.titleAccent} body={p.body} bodyClassName="text-body" />
        <div className="mt-12 grid grid-cols-3 gap-6 max-lg:grid-cols-1">
          {p.items.map((pkg) => (
            <article key={pkg.name} className="surface-card flex flex-col overflow-hidden rounded-card border border-line bg-surface">
              <div className="border-b border-line bg-soft/50 p-6">
                <p className="text-[14px] font-semibold uppercase tracking-[0.14em] text-muted">{pkg.stage}</p>
                <h3 className="mt-2 font-sans text-h3 font-semibold">{pkg.name}</h3>
                {pkg.price ? (
                  <p className="mt-3 font-sans text-[34px] font-semibold leading-none tracking-[-0.02em]">{pkg.price}</p>
                ) : (
                  <p className="mt-3 font-sans text-h4 font-semibold text-amber-deep">{p.pendingPrice}</p>
                )}
                <p className="mt-4 text-bsm leading-relaxed text-ink/70">{pkg.bestFor}</p>
              </div>
              <ul className="flex-1 p-6">
                {pkg.includes.map((line) => (
                  <li key={line} className="flex gap-3 border-b border-line py-3 text-body leading-snug text-ink/85 last:border-b-0">
                    <Check className="mt-1 size-4 shrink-0 text-amber-deep" />
                    {line}
                  </li>
                ))}
              </ul>
              <div className="px-6 pb-6">
                <Button href="/contact" small arrow className="min-h-11 w-full justify-center" data-event={`${event}_package_select`} data-package={pkg.name}>
                  {pkg.cta}
                </Button>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-6 text-bsm text-muted">{p.note}</p>
      </div>
    </Band>
  );
}

export function EcommerceSeoWhyOmh() {
  const w = page.whyOmh;
  return <ServiceReasonGrid label={w.eyebrow} title={w.title} titleAccent={w.titleAccent} body={w.body} reasons={w.reasons} />;
}

export function EcommerceSeoResults() {
  if (!CASE_STUDIES_LIVE) return null;
  const r = page.results;
  const study = caseStudies.find((c) => c.slug === r.caseSlug)!;
  return (
    <Band label={r.eyebrow} tone="white">
      <Reveal>
        <SectionIntro title={r.title} accent={r.titleAccent} />
        <div className="mt-10 grid grid-cols-12 overflow-hidden rounded-card border border-line bg-surface max-lg:block">
          <CaseStudyVisual study={study} ratio="4/3" frameClassName="h-full rounded-none lg:aspect-auto!" className="col-span-5" />
          <div className="col-span-7 p-9 max-sm:p-6">
            <p className="text-[14px] font-semibold uppercase tracking-[0.14em] text-amber-deep">{r.label}</p>
            <h3 className="mt-4 font-sans text-h3 font-semibold text-balance">{r.heading}</h3>
            <p className="mt-4 text-body leading-relaxed text-ink/75">{r.body}</p>
            {CASE_STUDIES_LIVE && (
            <Link href={`/case-studies/${study.slug}`} data-event={`${event}_case_study_click`} className="group mt-5 inline-flex items-center gap-2 font-semibold text-amber-deep hover:underline underline-offset-4">
              {r.cta}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            )}
            <dl className="mt-8 grid grid-cols-4 gap-4 border-t border-line pt-6 max-md:grid-cols-2">
              {study.results.map((result) => (
                <div key={result.label}>
                  <dd className="font-sans text-[clamp(28px,2vw,36px)] font-semibold leading-none">{result.value}</dd>
                  <dt className="mt-2 text-bsm leading-snug text-ink/70">{result.label}</dt>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-bsm text-muted">{r.note}</p>
          </div>
        </div>
      </Reveal>
    </Band>
  );
}

export function EcommerceSeoPromise() {
  const p = page.promise;
  return (
    <Band label={p.eyebrow} tone="mist">
      <Reveal>
        <div className="grid grid-cols-12 gap-x-12 gap-y-8 max-lg:block">
          <div className="col-span-6 max-lg:mb-8">
            <SectionIntro title={p.title} accent={p.titleAccent} body={p.body} bodyClassName="text-body" />
          </div>
          <ul className="col-span-6 self-center rounded-card border border-line bg-surface p-7">
            {p.items.map((item) => (
              <li key={item} className="flex gap-3.5 border-b border-line py-3.5 font-sans text-[18px] font-semibold leading-snug last:border-b-0">
                <Check className="mt-1 size-4 shrink-0 text-amber-deep" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Band>
  );
}

export function EcommerceSeoFAQ() {
  const f = page.faq;
  return (
    <ServiceFaqSection
      label={f.eyebrow}
      title={f.title}
      titleAccent={f.titleAccent}
      description={f.description}
      items={f.items}
      group="ecommerce-seo-faq"
      phoneEvent={`${event}_faq_phone_click`}
      headingSize="lg"
      headingMaxWidthClassName=""
    />
  );
}

export function EcommerceSeoFinalCTA() {
  const f = page.final;
  return (
    <ServiceNextStepsCTA
      title={f.title}
      titleAccent={f.titleAccent}
      body={f.body}
      primary={{ label: f.primary, href: "/contact", event: `${event}_final_cta_click` }}
      secondary={{ label: f.secondary, href: "/contact", event: `${event}_final_secondary_click` }}
      phoneEvent={`${event}_phone_click`}
      emailEvent={`${event}_email_click`}
      steps={f.steps}
    />
  );
}
