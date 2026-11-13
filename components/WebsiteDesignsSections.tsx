import Image from "@/components/ui/SiteImage";
import Link from "next/link";
import {
  Calculator,
  Dumbbell,
  HardHat,
  Heart,
  Home,
  Mail,
  Megaphone,
  Music,
  Phone,
  Scale,
  ShoppingCart,
  SprayCan,
  Stethoscope,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { CaseStudyVisual } from "@/components/case-studies/CaseStudyVisual";
import { RelatedServices } from "@/components/RelatedServices";
import { SiteTestimonials } from "@/components/Testimonials";
import { ServiceBand } from "@/components/services/ServiceBand";
import { ServiceFaqSection } from "@/components/services/ServiceFaqSection";
import { ServiceHeroArt } from "@/components/services/ServiceHeroArt";
import { AccentTitle, CheckIcon } from "@/components/services/ServicePrimitives";
import { ArrowRight, Button, TextLink } from "@/components/ui/Button";
import { FinalCta } from "@/components/ui/FinalCta";
import { Eyebrow } from "@/components/ui/Proof";
import { caseStudies } from "@/lib/content/case-studies";
import { company } from "@/lib/content/nav";
import { websiteDesigns as page } from "@/lib/content/website-designs";
import { wordpressDevelopment } from "@/lib/content/wordpress-development";
import { CASE_STUDIES_LIVE } from "@/lib/flags";

/*
  Phase 7 — /website-designs. Scaffold rule: every section is a `ServiceBand`,
  one label treatment (`topline`) for the whole page, alternating grounds so no
  two consecutive bands share one.

  Client audit, 26 Oct 2026: hero art, sector cards, a price strip under the
  pricing copy, case-study cards with photos, a contact card, the guarantee
  with its badge, plus related services and an FAQ.
*/

const LABEL = "topline" as const;
const ACCENT = "bg-amber";

const sectorIcons: Record<string, LucideIcon> = {
  Construction: HardHat,
  Accountancy: Calculator,
  eCommerce: ShoppingCart,
  "Non-Profit": Heart,
  Marketing: Megaphone,
  Fitness: Dumbbell,
  Cleaning: SprayCan,
  Legal: Scale,
  Medical: Stethoscope,
  "Real Estate": Home,
  Nightclub: Music,
  Restaurant: UtensilsCrossed,
};

function GuaranteeBadge() {
  return (
    <svg viewBox="0 0 240 240" className="mx-auto w-[min(260px,70%)]" role="img" aria-label="Money-back guarantee, backed by our CEO">
      <defs>
        <path id="badge-ring" d="M120,120 m-92,0 a92,92 0 1,1 184,0 a92,92 0 1,1 -184,0" />
      </defs>
      <circle cx="120" cy="120" r="112" fill="none" stroke="var(--accent)" strokeWidth="2" strokeDasharray="3 6" opacity=".7" />
      <circle cx="120" cy="120" r="104" fill="none" stroke="var(--accent)" strokeWidth="1" opacity=".5" />
      <text fill="var(--accent-light)" fontSize="13" fontWeight="700" letterSpacing="3" fontFamily="var(--font-instrument), sans-serif">
        <textPath href="#badge-ring" startOffset="2%">MONEY-BACK GUARANTEE • ONLINE MARKETING HELP •</textPath>
      </text>
      <circle cx="120" cy="120" r="68" fill="var(--accent)" />
      <circle cx="120" cy="120" r="60" fill="none" stroke="#000" strokeOpacity=".35" strokeWidth="1.5" />
      <path d="M120 88l24 9v18c0 16-10 28-24 33-14-5-24-17-24-33V97z" fill="#000" />
      <path d="M110 120l7 7 14-15" fill="none" stroke="var(--accent)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <text x="120" y="162" textAnchor="middle" fill="#000" fontSize="10.5" fontWeight="700" letterSpacing="2" fontFamily="var(--font-instrument), sans-serif">BACKED BY OUR CEO</text>
    </svg>
  );
}

export function WebsiteDesignsPage() {
  const websiteCases = caseStudies.filter((c) => c.category === "Website").slice(0, 2);
  const ceo = { name: "Melissa", role: "CEO, Online Marketing Help", photo: "/images/about/Melissa.jpg" };

  return (
    <main>
      <ServiceBand label={page.title} tone="warm" accent={ACCENT} labelStyle="plain" className="hero-grid">
        <div className="grid grid-cols-12 items-center gap-x-12 gap-y-11 max-lg:block">
          {/* CSS-only entrance, not <Reveal>: the hero paints before hydration. */}
          <div className="hero-in col-span-6">
            <h1 className="font-sans text-display font-semibold text-balance"><AccentTitle text={page.heading} /></h1>
            <p className="mt-5 font-sans text-h3 font-semibold text-amber-deep text-balance">
              {page.standfirst}
            </p>
            <p className="mt-5 text-lead leading-relaxed text-ink/75">{page.lead}</p>
            <div className="mt-9 flex flex-wrap gap-3.5 max-sm:flex-col max-sm:items-stretch">
              <Button href="/omh-free-consultation" arrow data-event="website_designs_consultation_click">
                {page.ctas.consultation}
              </Button>
              <Button href="/contact" variant="secondary" arrow data-event="website_designs_contact_click">
                {page.ctas.contact}
              </Button>
            </div>
          </div>
          <div className="hero-in hero-in-2 col-span-6 max-lg:mt-11">
            <ServiceHeroArt variant="designs" />
          </div>
        </div>

        <div className="mt-14 grid grid-cols-12 gap-x-12 gap-y-8 max-lg:block">
          <div className="col-span-5">
            <Eyebrow>{page.statEyebrow}</Eyebrow>
            <h2 className="mt-5 font-sans text-h3 font-semibold text-balance">{page.statHeading}</h2>
          </div>
          <div className="col-span-6 col-start-7 max-lg:mt-8">
            {page.intro.map((paragraph) => (
              <p key={paragraph} className="mt-5 text-body leading-relaxed text-ink/75 first:mt-0">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </ServiceBand>

      <ServiceBand
        id="how-we-can-help"
        label={page.help.eyebrow}
        tone="white"
        accent={ACCENT}
        labelStyle={LABEL}
      >
        <div className="grid grid-cols-12 items-end gap-x-12 gap-y-6 max-lg:block">
          <h2 className="col-span-6 font-sans text-h2 font-semibold text-balance">{page.help.heading}</h2>
          <p className="col-span-6 text-body leading-relaxed text-ink/75 max-lg:mt-5">{page.help.intro}</p>
        </div>
        <ul className="mt-10 grid grid-cols-4 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {page.help.sectors.map((sector) => {
            const Icon = sectorIcons[sector.replace(/ Websites$/, "")] ?? HardHat;
            return (
              <li key={sector} className="surface-card flex items-center gap-3.5 rounded-card border border-line bg-warm/55 px-5 py-4 font-sans text-[17px] font-semibold">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-soft text-amber-deep">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                {sector}
              </li>
            );
          })}
        </ul>
        <div className="mt-6 grid grid-cols-12 items-center gap-x-10 gap-y-6 rounded-card border border-line bg-warm/55 p-7 max-lg:block max-sm:p-5">
          <div className="col-span-4">
            <h3 className="font-sans text-h4 font-semibold">{page.help.tradesTitle}</h3>
            <p className="mt-3 text-body leading-relaxed text-ink/75">{page.help.tradesLead}</p>
          </div>
          <ul className="col-span-8 flex flex-wrap items-center gap-2.5 max-lg:mt-6">
            {page.help.trades.map((trade) => (
              <li key={trade} className="rounded-full border border-line bg-surface px-4 py-2 text-body text-ink/75">
                {trade}
              </li>
            ))}
            <li>
              <Button href="/contact" small arrow data-event="website_designs_trades_contact_click">
                {page.help.tradesCta}
              </Button>
            </li>
          </ul>
        </div>
      </ServiceBand>

      <ServiceBand label={page.gallery.eyebrow} tone="mist" accent={ACCENT} labelStyle={LABEL}>
        <h2 className="font-sans text-h2 font-semibold text-balance">
          {page.gallery.heading}
        </h2>
        <div className="mt-12 flex flex-col gap-14">
          {page.gallery.categories.map((category) => (
            <section key={category.title} aria-label={category.title}>
              <h3 className="flex items-center gap-4 font-sans text-h4 font-semibold">
                {category.title}
                <span aria-hidden className="h-px flex-1 bg-line" />
                <span className="text-bsm font-medium text-muted tabular-nums">
                  {category.images.length} designs
                </span>
              </h3>
              <ul className="mt-7 grid grid-cols-3 gap-6 max-md:grid-cols-2 max-sm:grid-cols-1">
                {category.images.map((image) => (
                  <li
                    key={image.file}
                    className="overflow-hidden rounded-media border border-line bg-surface"
                  >
                    <Image
                      src={`${page.gallery.base}${image.file}`}
                      alt={image.alt}
                      width={1024}
                      height={576}
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                      className="h-auto w-full"
                    />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </ServiceBand>

      <ServiceBand label={page.pricing.eyebrow} tone="warm" accent={ACCENT} labelStyle={LABEL}>
        <div className="grid grid-cols-12 gap-x-12 gap-y-8 max-lg:block">
          <h2 className="col-span-5 font-sans text-h2 font-semibold text-balance">
            {page.pricing.heading}
          </h2>
          <div className="col-span-6 col-start-7 max-lg:mt-8">
            {page.pricing.body.map((paragraph) => (
              <p key={paragraph} className="mt-6 text-body leading-relaxed text-ink/75 first:mt-0">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
        {/* The published WordPress website packages, so "transparent pricing" shows a price. */}
        <ul className="mt-12 grid grid-cols-4 gap-5 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {wordpressDevelopment.packages.map((pkg) => (
            <li key={pkg.name} className="surface-card flex flex-col rounded-card border border-line bg-surface p-6">
              <p className="text-[14px] font-semibold uppercase tracking-[0.14em] text-muted">{pkg.stage}</p>
              <h3 className="mt-2 font-sans text-h4 font-semibold">{pkg.name}</h3>
              <p className="mt-3 font-sans text-[34px] font-semibold leading-none tracking-[-0.02em]">
                {pkg.price}
                <span className="ml-2 text-[14px] font-semibold uppercase tracking-[0.14em] text-muted">from</span>
              </p>
              <p className="mt-4 text-bsm leading-relaxed text-ink/70">{pkg.bestFor}</p>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Button href="/pricing" arrow data-event="website_designs_pricing_click">
            View the price list
          </Button>
          <TextLink href="/wordpress-development#packages" data-event="website_designs_packages_click">Compare what each package includes</TextLink>
        </div>
      </ServiceBand>

      {CASE_STUDIES_LIVE && (
      <ServiceBand label={page.caseStudies.eyebrow} tone="white" accent={ACCENT} labelStyle={LABEL}>
        <div className="flex items-end justify-between gap-10 max-lg:block">
          <h2 className="font-sans text-h2 font-semibold text-balance">
            {page.caseStudies.heading}
          </h2>
          <div className="shrink-0 max-lg:mt-5">
            <TextLink href="/case-studies" data-event="website_designs_all_case_studies_click">View all case studies</TextLink>
          </div>
        </div>
        <ul className="mt-11 grid grid-cols-3 gap-6 max-lg:grid-cols-1">
          {websiteCases.map((study) => (
            <li key={study.slug} className="surface-card flex flex-col overflow-hidden rounded-card border border-line bg-surface">
              <Link
                href={`/case-studies/${study.slug}`}
                data-event="website_designs_case_study_click"
                className="group flex h-full flex-col text-ink"
              >
                <CaseStudyVisual study={study} ratio="16/10" frameClassName="rounded-none" />
                <div className="flex flex-1 flex-col p-7">
                  <p className="text-[14px] font-semibold uppercase tracking-[0.14em] text-amber-deep">{study.sector}</p>
                  <h3 className="mt-4 font-sans text-h4 font-semibold transition-colors group-hover:text-amber-deep">{study.title}</h3>
                  <p className="mt-3 text-body leading-relaxed text-ink/70">{study.lede}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {study.work.flatMap((w) => w.items).slice(0, 3).map((item) => (
                      <li key={item} className="rounded-full border border-line bg-warm px-3 py-1 text-[14px] font-semibold text-ink/75">{item}</li>
                    ))}
                  </ul>
                  <span className="mt-auto inline-flex items-center gap-2 pt-6 text-body font-semibold text-amber-deep">
                    Read the case study
                    <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
          <li className="flex flex-col rounded-card bg-inverse p-8 text-oninverse">
            <p className="text-[14px] font-semibold uppercase tracking-[0.14em] text-[var(--accent-light)]">{page.caseStudies.cta.eyebrow}</p>
            <h3 className="mt-4 font-sans text-h3 font-semibold text-balance">{page.caseStudies.cta.heading}</h3>
            <p className="mt-3 text-body leading-relaxed text-oninverse/70">{page.caseStudies.cta.body}</p>
            <div className="mt-auto pt-8">
              <Button href="/omh-free-consultation" variant="inverse" arrow data-event="website_designs_case_cta_click">
                {page.caseStudies.cta.label}
              </Button>
            </div>
          </li>
        </ul>
      </ServiceBand>
      )}

      <ServiceBand label={page.contact.eyebrow} tone="navy" accent={ACCENT} labelStyle={LABEL}>
        <div className="grid grid-cols-12 items-center gap-x-12 gap-y-8 max-lg:block">
          <div className="col-span-6">
            <h2 className="font-sans text-h2 font-semibold text-balance">{page.contact.heading}</h2>
            <p className="mt-5 text-body leading-relaxed text-oninverse/70">{page.contact.body}</p>
            <div className="mt-8 flex flex-wrap gap-3.5 max-sm:flex-col">
              <Button href="/omh-free-consultation" variant="inverse" arrow data-event="website_designs_booking_click">
                {page.consultation.eyebrow}
              </Button>
              <Button href="/contact" variant="ghost-white" arrow data-event="website_designs_contact_band_click">
                {page.ctas.contact}
              </Button>
            </div>
          </div>
          <div className="col-span-5 col-start-8 rounded-card border border-oninverse/15 bg-oninverse/[0.05] p-7 max-lg:mt-10 max-sm:p-5">
            <p className="text-[14px] font-semibold uppercase tracking-[0.14em] text-oninverse/55">{page.consultation.heading}</p>
            <ul className="mt-5 divide-y divide-oninverse/12">
              <li className="py-4">
                <Link href={company.phoneHref} data-event="website_designs_phone_click" className="group flex items-center gap-4 text-oninverse">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-amber text-white"><Phone className="size-5" aria-hidden="true" /></span>
                  <span>
                    <span className="block text-[14px] text-oninverse/60">Call us</span>
                    <span className="font-sans text-h4 font-semibold group-hover:text-[var(--accent-light)]">{page.contact.phone}</span>
                  </span>
                </Link>
              </li>
              <li className="py-4">
                <a href={`mailto:${company.email}`} data-event="website_designs_email_click" className="group flex items-center gap-4 text-oninverse">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-amber text-white"><Mail className="size-5" aria-hidden="true" /></span>
                  <span className="min-w-0">
                    <span className="block text-[14px] text-oninverse/60">Email us</span>
                    <span className="block truncate font-sans text-h4 font-semibold group-hover:text-[var(--accent-light)]">{company.email}</span>
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </ServiceBand>

      <ServiceBand label={page.guarantee.eyebrow} tone="warm" accent={ACCENT} labelStyle={LABEL}>
        <div className="grid grid-cols-12 overflow-hidden rounded-card border border-line bg-surface max-lg:block">
          <div className="col-span-5 flex items-center bg-[radial-gradient(circle_at_50%_30%,#262626_0%,#000_70%)] p-10 max-sm:p-7">
            <GuaranteeBadge />
          </div>
          <div className="col-span-7 p-10 max-sm:p-6">
            <h2 className="font-sans text-h2 font-semibold text-balance">{page.guarantee.heading}</h2>
            <p className="mt-5 text-body leading-relaxed text-ink/75">{page.guarantee.body[0]}</p>
            <ul className="mt-7 grid gap-3">
              {page.guarantee.points.map(([title, body]) => (
                <li key={title} className="flex gap-3">
                  <CheckIcon className="mt-1.5 size-4 shrink-0 text-amber-deep" />
                  <span><span className="font-semibold">{title}</span> <span className="text-ink/70">{body}</span></span>
                </li>
              ))}
            </ul>
            <div className="mt-7 flex items-center gap-4 border-t border-line pt-6">
              <span className="relative size-12 shrink-0 overflow-hidden rounded-full bg-soft">
                <Image src={ceo.photo} alt={`${ceo.name}, ${ceo.role}`} fill sizes="48px" className="object-cover" />
              </span>
              <p className="text-body leading-snug text-ink/75">
                <span className="font-semibold text-ink">{ceo.name}</span>, {ceo.role}. {page.guarantee.body[1]}
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3.5 max-sm:flex-col">
              <Button href="/warranty" arrow data-event="website_designs_warranty_click">
                Read the guarantee
              </Button>
              <Button href="/omh-free-consultation" variant="secondary" arrow data-event="website_designs_guarantee_consultation_click">
                {page.ctas.consultation}
              </Button>
            </div>
          </div>
        </div>
      </ServiceBand>

      <SiteTestimonials
        eventPrefix="website_designs"
        title={page.reviewsHeading}
        tone="white"
        accent={ACCENT}
        labelStyle={LABEL}
      />

      <RelatedServices
        eventPrefix="website_designs"
        title="Build it, keep it running and bring the right visitors"
        body="A website design project usually sits alongside development, ongoing care and the search work that brings customers to it."
        links={page.related}
      />

      <ServiceFaqSection
        title="Questions before you brief a website design project"
        titleAccent="website design project"
        description="If your question is not here, ask it on the consultation call and you will get a straight answer."
        items={page.faqs.map(([q, a]) => ({ q, a }))}
        group="website-designs-faq"
        phoneEvent="website_designs_faq_phone_click"
      />

      <FinalCta
        title={page.finalCta.title}
        titleAccent="your business actually needs."
        body={page.finalCta.body}
        primary={{ label: "Request a Website Quote", href: "/wordpress-development-request-quote", event: "website_designs_final_quote_click" }}
        secondary={{ label: "Book a Free Consultation", href: "/omh-free-consultation", event: "website_designs_final_consultation_click" }}
        contactEvents={{ phone: "website_designs_phone_click", email: "website_designs_email_click" }}
      />
    </main>
  );
}
