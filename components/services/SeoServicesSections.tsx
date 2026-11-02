import { Pointer } from "@/components/Pointer";
import { Reveal } from "@/components/Reveal";
import { MediaFrame } from "@/components/ServiceMedia";
import { ServiceTestimonials } from "@/components/Testimonials";
import { ServiceBand as Band } from "@/components/services/ServiceBand";
import { ServiceFaqSection } from "@/components/services/ServiceFaqSection";
import { ServiceProcessTimeline } from "@/components/services/ServiceProcessTimeline";
import {
  CheckIcon as Check,
  HighlightedText,
  ServiceSectionIntro as SectionIntro,
  withLinks,
} from "@/components/services/ServicePrimitives";
import { Button } from "@/components/ui/Button";
import { FinalCta } from "@/components/ui/FinalCta";
import { Eyebrow, ReviewProof } from "@/components/ui/Proof";
import { bestSeoServices as page } from "@/lib/content/seo-landing";

/* /seo-services on the same scaffold as the other service pages (hero with proof
   badge, ruled "need help" lists, surface cards, process timeline, carousel reviews,
   FAQ band, final CTA). Copy comes from `bestSeoServices` in lib/content/seo-landing.ts. */

const event = "best_seo";

export function SeoHero() {
  const stats = [...page.checklist.items.map((item) => [item.label, item.value] as const), ["Client retention rate", "97%"] as const];
  return (
    <section className="hero-grid overflow-x-clip border-b border-line bg-warm">
      <div className="container-omh pb-[clamp(56px,38px+2.9vw,88px)] pt-[clamp(48px,34px+2.3vw,80px)]">
        <div className="grid grid-cols-12 items-center gap-x-12 gap-y-12 max-lg:block">
          <Reveal className="col-span-7 max-lg:mb-12">
            <Eyebrow>{page.eyebrow}</Eyebrow>
            <h1 className="mb-6 mt-7 font-sans text-display font-semibold text-balance">
              <HighlightedText text={page.title} highlight={page.titleAccent} />
            </h1>
            <p className="mb-9 text-body leading-relaxed text-ink/75">{page.standfirst}</p>
            <div className="flex flex-wrap items-center gap-3.5 max-sm:flex-col max-sm:items-stretch">
              <Button href="#checklist" arrow data-event={`${event}_checklist_click`}>{page.ctas.checklist}</Button>
              <Button href="/contact" variant="secondary" data-event={`${event}_audit_click`}>{page.ctas.audit}</Button>
            </div>
            <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-5 border-t border-line pt-7">
              {stats.map(([label, value]) => (
                <div key={label}>
                  <dt className="text-[14px] font-semibold uppercase tracking-[0.14em] text-muted">{label}</dt>
                  <dd className="mt-1.5 font-sans text-h4 font-semibold">{value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal className="col-span-5 col-start-8">
            <Pointer><div className="pointer-parallax"><MediaFrame kind="image" theme="seo" ratio="16/11" title="Searching for a service" note="" source="/images/Services/SEO 2.jpg" alt="Hands holding a tablet showing a search engine results page." /></div></Pointer>
            <ReviewProof serviceId="seo" heading="SEO work backed by verified client trust" className="mt-6" />
          </Reveal>
        </div>
        <ul className="mt-14 grid grid-cols-5 border-t border-line max-lg:grid-cols-2 max-sm:grid-cols-1">
          {page.about.claims.map((claim) => (
            <li key={claim} className="flex items-center gap-3 border-line py-5 pr-4 lg:border-l lg:pl-5 lg:first:border-l-0 lg:first:pl-0">
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-tint-amber text-amber-deep"><Check className="size-3.5" /></span>
              <span className="text-[15px] font-semibold leading-snug">{claim}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function SeoWhy() {
  const [proof, ...rest] = page.about.body.split("\n\n");
  return (
    <Band label={page.about.eyebrow}>
      <Reveal>
        <div className="grid grid-cols-12 gap-x-10 gap-y-10 max-lg:block">
          <div className="col-span-4 max-lg:mb-10">
            <div className="lg:sticky lg:top-24">
              <SectionIntro size="md" title={page.about.title} accent="Professional SEO Services" body={page.about.kicker} bodyClassName="text-body" />
            </div>
          </div>
          <div className="col-span-8 grid grid-cols-12 gap-6 max-md:block">
            <div className="col-span-5 rounded-card bg-inverse p-8 text-oninverse max-md:mb-6">
              <p className="text-[14px] font-semibold uppercase tracking-[0.15em] text-oninverse/60">Organic traffic growth</p>
              <p className="mt-4 font-sans text-[clamp(40px,30px+1.4vw,56px)] font-semibold leading-none text-amber">Up to 466%</p>
              <p className="mt-5 text-body leading-relaxed text-oninverse/75">{proof}</p>
            </div>
            <div className="col-span-7 flex flex-col justify-center">
              {rest.map((paragraph) => <p key={paragraph} className="mt-5 text-body leading-relaxed text-ink/75 first:mt-0">{paragraph}</p>)}
            </div>
          </div>
        </div>
      </Reveal>
    </Band>
  );
}

export function SeoServicesGrid() {
  return (
    <Band label={page.offering.eyebrow} tone="warm">
      <Reveal>
        <SectionIntro title={page.offering.title} body={withLinks(page.offering.body)} bodyClassName="text-body" />
        <div className="mt-12 grid grid-cols-6 gap-5 max-lg:grid-cols-2 max-md:grid-cols-1">
          {page.services?.map((service, index) => (
            <article key={service.title} className={`surface-card rounded-card border border-line bg-surface p-7 ${index < 2 ? "lg:col-span-3" : "lg:col-span-2"} max-lg:last:col-span-2 max-md:last:col-span-1`}>
              <span className="text-body font-semibold tracking-[0.12em] text-amber">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-5 font-sans text-h4 font-semibold">{service.title}</h3>
              <p className="mt-3 text-body leading-relaxed text-ink/75">{withLinks(service.body)}</p>
            </article>
          ))}
        </div>
      </Reveal>
    </Band>
  );
}

export function SeoMedia() {
  return (
    <Band label="Search landscape" tone="mist">
      <Reveal>
        <h2 className="font-sans text-h2 font-semibold text-balance">Make the route from search to useful page visible.</h2>
        <p className="mt-6 text-body leading-relaxed text-ink/70">How a site is crawled, how it performs in search, and how its content is structured.</p>
        {/* Every image at its own proportions, never cropped (client, 3 Nov 2026): the reports have lettering in them.
            Each row's columns are sized by the two images' width/height ratios, so both end on the same line. */}
        <div className="mt-11 grid gap-6 md:grid-cols-[1.416fr_1.329fr]">
          <MediaFrame kind="screen" theme="seo" ratio="1492/1054" title="Organic search performance view" note="" source="/images/Services/Images on the pages/Organic search performance view SEO.png" alt="Illustrative organic search performance report showing clicks, impressions, average position and top queries." className="min-h-0!" />
          <MediaFrame kind="image" theme="seo" ratio="1446/1088" title="Crawl and architecture map" note="" source="/images/Services/Images on the pages/Crawl and architecture map.png" alt="Illustrative site crawl and architecture map showing page hierarchy and internal linking depth." className="min-h-0!" />
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-[1.498fr_1.654fr]">
          <MediaFrame kind="image" theme="seo" ratio="5000/3337" title="Searching on a tablet" note="" source="/images/Services/SEO 2.jpg" alt="A search results page open on a tablet, the view a customer sees before they choose a page." className="min-h-0!" />
          <MediaFrame kind="image" theme="seo" ratio="1920/1161" title="SEO review walkthrough" note="" source="/images/Services/SEO 1.jpg" alt="Search engine optimisation review" className="min-h-0!" />
        </div>
      </Reveal>
    </Band>
  );
}

export function SeoAffordable() {
  const a = page.affordable!;
  return (
    <Band label={a.eyebrow} tone="navy">
      <Reveal>
        <div className="grid grid-cols-12 gap-x-12 gap-y-10 max-lg:block">
          <div className="col-span-7 max-lg:mb-10">
            <h2 className="font-sans text-h2 font-semibold text-balance">{a.title}</h2>
            {a.paragraphs.map((paragraph) => <p key={paragraph} className="mt-5 text-body leading-relaxed text-oninverse/72">{paragraph}</p>)}
          </div>
          <dl className="col-span-5 grid content-end gap-5 max-lg:grid-cols-2 max-sm:grid-cols-1">
            {a.stats.map(([value, label]) => (
              <div key={label} className="rounded-card border border-oninverse/15 bg-oninverse/[0.05] p-7">
                <dd className="font-sans text-[clamp(40px,30px+1.4vw,56px)] font-semibold leading-none text-amber">{value}</dd>
                <dt className="mt-3 text-body text-oninverse/70">{label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>
    </Band>
  );
}

export function SeoProcess() {
  const p = page.process!;
  return (
    <ServiceProcessTimeline
      label={p.eyebrow}
      title={p.title}
      titleAccent="SEO Process"
      body="Every engagement follows the same three steps, so you always know what is being worked on and why."
      steps={p.steps}
      action={{ label: page.ctas.checklist, event: `${event}_process_cta_click`, href: "#checklist" }}
    />
  );
}

export function SeoSmallBusiness() {
  const s = page.smallBusiness!;
  return (
    <Band label={s.eyebrow} tone="warm">
      <Reveal>
        <div className="grid grid-cols-12 gap-x-12 gap-y-10 max-lg:block">
          <div className="col-span-5 max-lg:mb-10">
            <h2 className="font-sans text-h2 font-semibold text-balance">{s.title}</h2>
            <p className="mt-5 text-body leading-relaxed text-ink/75">{s.lead}</p>
          </div>
          <div className="col-span-7">
            <p className="text-[14px] font-semibold uppercase tracking-[0.15em] text-amber-deep">{s.audiencesLabel}</p>
            <ul className="mt-4 border-t border-line">
              {s.audiences.map((audience) => (
                <li key={audience} className="flex gap-3 border-b border-line py-4 font-sans text-h4 font-semibold"><Check className="mt-1.5 size-4 shrink-0 text-amber-deep" />{audience}</li>
              ))}
            </ul>
            <p className="mt-6 text-body leading-relaxed text-ink/75">{s.shared}</p>
          </div>
        </div>
      </Reveal>
    </Band>
  );
}

export function SeoTestimonials() {
  const t = page.testimonials;
  return <ServiceTestimonials testimonials={t.items} label={t.eyebrow} title={t.title} body={t.body} eventPrefix={event} />;
}

export function SeoFAQ() {
  const f = page.faq!;
  return (
    <ServiceFaqSection
      label={f.eyebrow}
      title={f.title}
      titleAccent="SEO Services"
      items={f.items}
      group="best-seo-faq"
      phoneEvent={`${event}_faq_phone_click`}
      headingSize="lg"
      headingMaxWidthClassName=""
    />
  );
}

export function SeoFinalCTA() {
  return (
    <FinalCta
      id="checklist"
      title={page.cta.title}
      titleAccent={page.cta.accent}
      body={page.cta.body}
      primary={{ label: page.cta.submit, href: "/contact", event: `${event}_final_cta_click` }}
      secondary={{ ...page.cta.secondary!, event: `${event}_consultation_click` }}
      steps={page.process!.steps.map(([title]) => title)}
      contactEvents={{ phone: `${event}_footer_phone_click`, email: `${event}_footer_email_click` }}
    />
  );
}
