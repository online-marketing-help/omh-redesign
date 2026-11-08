import { Fragment } from "react";
import { ArrowRightLeft, Blocks, Palette, Plug, Puzzle, Wrench } from "lucide-react";
import { CapabilityShowcase, StorefrontMock } from "@/components/services/CapabilityShowcase";
import { ServiceHeroArt } from "@/components/services/ServiceHeroArt";
import { Pointer } from "@/components/Pointer";
import { Reveal } from "@/components/Reveal";
import { ServiceFaqSection } from "@/components/services/ServiceFaqSection";
import { ServiceFitSection as SharedServiceFitSection } from "@/components/services/ServiceFitSection";
import { ServiceNextStepsCTA } from "@/components/services/ServiceNextStepsCTA";
import { ServiceProcessTimeline } from "@/components/services/ServiceProcessTimeline";
import { ServiceReasonGrid } from "@/components/services/ServiceReasonGrid";
import { FeatureValue, HighlightedText, ServiceSectionIntro as SectionIntro } from "@/components/services/ServicePrimitives";
import { Button, TextLink } from "@/components/ui/Button";
import { Eyebrow, ReviewProof } from "@/components/ui/Proof";
import { MediaFrame } from "@/components/ServiceMedia";
import { ServiceBand as Band } from "@/components/services/ServiceBand";
import { shopifyDevelopment as content } from "@/lib/content/shopify-development";
import { CASE_STUDIES_LIVE } from "@/lib/flags";

type Package = (typeof content.packages)[number];

export function ShopifyHero() {
  return (
    <section className="hero-grid overflow-x-clip border-b border-line bg-warm">
      <div className="container-omh pb-[clamp(56px,38px+2.9vw,88px)] pt-[clamp(48px,34px+2.3vw,80px)]">
        <div className="grid grid-cols-12 items-center gap-x-12 gap-y-12 max-lg:block">
          <div className="col-span-7 max-lg:mb-12">
            {/* CSS-only entrance, not <Reveal>: the JS-gated reveal held the headline at opacity 0 until hydration and delayed LCP. */}
            <div className="hero-in">
              <Eyebrow>{content.hero.eyebrow}</Eyebrow>
              <h1 className="mb-6 mt-7 font-sans text-display font-semibold text-balance">
                <HighlightedText text={content.hero.title} highlight={"high-\u2060performing stores"} />
              </h1>
              <p className="mb-9 text-lead leading-relaxed text-ink/75">{content.hero.body}</p>
              <div className="flex flex-wrap items-center gap-3.5 max-sm:flex-col max-sm:items-stretch">
                <Button href={content.hero.primary.href} arrow data-event="shopify_hero_cta_click">
                  {content.hero.primary.label}
                </Button>
                <Button href={content.hero.secondary.href} variant="secondary" arrow data-event="shopify_view_packages_click">
                  {content.hero.secondary.label}
                </Button>
              </div>
              <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-5 border-t border-line pt-7">
                {[
                  ["Packages from", "£300"],
                  ["Turnaround from", "4 weeks"],
                  ["Primary market", "UK businesses"],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-[14px] font-semibold uppercase tracking-[0.14em] text-muted">{label}</dt>
                    <dd className="mt-1.5 font-sans text-h4 font-semibold">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="hero-in hero-in-2 col-span-5 col-start-8">
            <Pointer>
              <div className="pointer-parallax">
                <ServiceHeroArt variant="shopify" />
              </div>
            </Pointer>
            <ReviewProof serviceId="shopify" heading="Verified client trust" className="mt-6" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function ShopifyNeedSection() {
  return (
    <Band label="Need">
      <Reveal>
        <div className="grid grid-cols-12 gap-x-10 gap-y-10 max-lg:block">
          <div className="col-span-5 max-lg:mb-10">
            <div className="lg:sticky lg:top-24">
              <SectionIntro title="Common Shopify problems we fix" accent="we fix" />
              <p className="mt-7 border-l-2 border-amber pl-5 text-body leading-snug text-ink/85">
A store can look great and still be hard to grow. Confusing navigation, slow pages, a clunky checkout, a theme nobody on your team can actually edit. Sound familiar? That&apos;s usually where we come in.

              </p>
              <div className="mt-8 max-lg:max-w-md">
                <MediaFrame kind="image" theme="shopify" ratio="4/3" title="Shopify friction snapshot" note="Add a real annotated mobile or desktop screen from a reviewed store." source="/images/Services/shopify/Shopify-friction-snapshot.png" alt="A store review on desktop and mobile, annotated with four problems: a menu that is hard to use on mobile, a slow hero image, products buried below the fold and a hidden add-to-cart button." />
              </div>
            </div>
          </div>

          <ol className="col-span-7 col-start-6 border-t border-line">
            {content.needs.map((need, index) => (
              <li key={need} className="group grid grid-cols-[auto_1fr] items-baseline gap-x-6 border-b border-line px-6 py-6 transition-colors hover:bg-surface">
                <span aria-hidden className="font-sans text-[18px] font-semibold tabular-nums tracking-[0.1em] text-muted transition-colors group-hover:text-amber">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-body leading-snug text-ink/90">{need}</p>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>
    </Band>
  );
}

export function ShopifyFitSection() {
  return (
    <SharedServiceFitSection
      title="For businesses treating ecommerce as a serious sales channel"
      titleAccent="serious sales channel"
      body="A clear commercial reason for the project makes design and development decisions easier. This section helps qualify the fit before either side commits time to a proposal."
      good={content.fit.good}
      notFit={content.fit.notFit}
    />
  );
}

export function ShopifyCapabilityGrid() {
  const [featured, ...rest] = content.capabilities;
  const icons = [Palette, Wrench, Puzzle, Blocks, ArrowRightLeft, Plug];
  return (
    <CapabilityShowcase
      label="Build"
      intro={{
        title: "Our Shopify development services",
        accent: "Shopify development",
        body: "From a brand-new store to one tricky integration, our Shopify development services cover the full picture: builds, themes, apps, migrations and everything in between.",
      }}
      featured={{
        eyebrow: "Most projects start here",
        title: featured.title,
        body: featured.body,
        detail: featured.detail,
        primary: { label: "Explore store development", href: "#packages", event: "shopify_build_packages_click" },
        secondary: { label: "Talk to us", href: "/contact", event: "shopify_build_contact_click" },
        aside: <StorefrontMock />,
      }}
      items={rest.map((item, i) => ({ ...item, icon: icons[i] ?? Blocks }))}
    />
  );
}

export function ShopifyProcessSteps() {
  return (
    <ServiceProcessTimeline
      label="Process"
      title="A controlled route from store planning to launch"
      titleAccent="planning to launch"
      body="Six steps, one clear route: discovery, structure, theme and UX, development and integration, migration and testing, then launch and support."
      steps={content.process}
      action={{ label: "Start at discovery", event: "shopify_form_start" }}
    />
  );
}

function PackageCard({ pkg }: { pkg: Package }) {
  return (
    <article className="overflow-hidden rounded-card border border-line bg-surface">
      <div className="border-b border-line bg-soft/50 p-6">
        <p className="text-[14px] font-semibold uppercase tracking-[0.14em] text-muted">{pkg.stage}</p>
        <h3 className="mt-2 font-sans text-h3 font-semibold">{pkg.name}</h3>
        <p className="mt-3 font-sans text-[34px] font-semibold leading-none tracking-[-0.02em]">{pkg.price}</p>
        <p className="mt-4 text-bsm leading-relaxed text-ink/70">{pkg.bestFor}</p>
      </div>
      <dl className="p-6 text-bsm">
        {content.packageGroups.map((group) => (
          <div key={group.label} className="border-b border-line py-4 first:pt-0 last:border-b-0">
            <p className="mb-1 text-[14px] font-semibold uppercase tracking-[0.14em] text-muted/80">{group.label}</p>
            {group.rows.map(([label, key]) => (
              <div key={label} className="flex items-baseline justify-between gap-6 py-2">
                <dt className="text-muted">{label}</dt>
                <dd className="text-right font-semibold text-ink"><FeatureValue value={pkg.features[key]} /></dd>
              </div>
            ))}
          </div>
        ))}
      </dl>
      <div className="px-6 pb-6">
        <Button href="/contact" small className="min-h-11 w-full justify-center" data-event="shopify_package_select" data-package={pkg.name}>
          Discuss this package
        </Button>
      </div>
    </article>
  );
}

export function ShopifyPricingPackages() {
  return (
    <Band label="Packages" id="packages">
      <div data-event="shopify_pricing_view">
        <div className="grid grid-cols-12 items-end gap-x-10 gap-y-6 max-lg:block">
          <SectionIntro className="col-span-7" title="Website packages" accent="packages" body="Four packages, starting from £300, give you a sensible starting point. Migration, integrations, and catalogue size still need a proper scope before we quote." />
        </div>

        <div className="mt-12 hidden overflow-x-auto rounded-card border border-line bg-surface xl:block">
          <table className="w-full min-w-[1000px] border-collapse text-left text-bsm">
            <caption className="sr-only">Shopify website package comparison by inclusion and price</caption>
            <thead>
              <tr>
                <th scope="col" className="sticky left-0 z-10 w-[220px] bg-surface p-6 align-bottom">
                  <span className="text-[14px] font-semibold uppercase tracking-[0.14em] text-muted">Compare packages</span>
                </th>
                {content.packages.map((pkg) => (
                  <th key={pkg.name} scope="col" className="border-l border-line bg-soft/40 p-6 align-bottom">
                    <span className="block text-[14px] font-semibold uppercase tracking-[0.14em] text-muted">{pkg.stage}</span>
                    <span className="mt-2 block font-sans text-h4 font-semibold">{pkg.name}</span>
                    <span className="mt-4 block font-sans text-[34px] font-semibold leading-none tracking-[-0.02em]">{pkg.price}</span>
                  </th>
                ))}
              </tr>
              <tr>
                <th scope="col" className="sticky left-0 z-10 bg-surface" />
                {content.packages.map((pkg) => (
                  <td key={pkg.name} className="border-b-2 border-l border-b-ink border-line bg-soft/40 px-6 pb-6 align-top text-body font-normal leading-snug text-ink/70">{pkg.bestFor}</td>
                ))}
              </tr>
            </thead>
            <tbody>
              {content.packageGroups.map((group) => (
                <Fragment key={group.label}>
                  <tr>
                    <th scope="colgroup" colSpan={5} className="border-b border-t border-line bg-warm/50 px-6 py-2.5 text-left text-[14px] font-semibold uppercase tracking-[0.14em] text-muted">{group.label}</th>
                  </tr>
                  {group.rows.map(([label, key]) => (
                    <tr key={label} className="border-b border-line transition-colors hover:bg-warm/60">
                      <th scope="row" className="sticky left-0 z-10 bg-surface p-6 py-4 font-semibold">{label}</th>
                      {content.packages.map((pkg) => (
                        <td key={pkg.name} className="border-l border-line p-6 py-4 text-ink/80"><FeatureValue value={pkg.features[key]} /></td>
                      ))}
                    </tr>
                  ))}
                </Fragment>
              ))}
              <tr>
                <th scope="row" className="sticky left-0 z-10 bg-surface p-6 font-semibold">Next step</th>
                {content.packages.map((pkg) => (
                  <td key={pkg.name} className="border-l border-line p-6">
                    <Button href="/contact" small data-event="shopify_package_select" data-package={pkg.name}>Discuss package</Button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:hidden">
          {content.packages.map((pkg) => <PackageCard key={pkg.name} pkg={pkg} />)}
        </div>

        <ul className="mt-8 grid gap-2 border-l-2 border-line pl-5 text-body leading-relaxed text-muted">
          {content.pricingNotes.map((note) => <li key={note}>{note}</li>)}
        </ul>
      </div>
    </Band>
  );
}

export function ShopifyCaseStudyFeature() {
  return (
    <Band label="Proof" tone="white">
      <Reveal>
        <div className="overflow-hidden rounded-card border border-soft-dark bg-soft/60">
          <div className="grid grid-cols-12 gap-x-10 gap-y-8 p-10 max-lg:block max-sm:p-6">
            <div className="col-span-12">
              <Eyebrow>Client work</Eyebrow>
              <h2 className="mb-5 mt-6 font-sans text-h3 font-semibold text-balance">
                Show the store, the challenge and <span className="text-amber-deep">what changed</span>
              </h2>
              <p className="text-body leading-relaxed text-ink/75">
                Every Shopify case study we publish covers the same ground: the starting problem, what we built, the timeline, and a result the client can stand behind.
              </p>
              <ul className="mt-7 border-t border-soft-dark">
                {["Original platform or store problem", "Theme, migration or functionality delivered", "Timeline and package or scope", "Verified commercial or usability result"].map((field) => (
                  <li key={field} className="border-b border-soft-dark py-3 text-body text-ink/70">{field}</li>
                ))}
              </ul>
              {CASE_STUDIES_LIVE && <div className="mt-7"><TextLink href="/case-studies" data-event="shopify_case_study_click">View case studies</TextLink></div>}
            </div>

            <div className="col-span-12 mt-9">
              <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1">
                {/* The frame drops its badge once media lands, but before/after is content here, so caption it. */}
                <figure>
                  <MediaFrame kind="image" theme="shopify" ratio="4/3" title="Before Shopify screenshot" note="Use the real previous store or platform." source="/images/Services/shopify/before.png" alt="An outdated online store with a crowded menu, a sale banner and a newsletter pop-up covering the products." />
                  <figcaption className="mt-3 text-[14px] font-semibold uppercase tracking-[0.14em] text-muted">Before</figcaption>
                </figure>
                <figure>
                  <MediaFrame kind="image" theme="shopify" ratio="4/3" title="After Shopify screenshot" note="Use the real launched Shopify store." source="/images/Services/shopify/after.png" alt="The same store rebuilt on Shopify with a clean header, a lifestyle hero image and a tidy row of products." />
                  <figcaption className="mt-3 text-[14px] font-semibold uppercase tracking-[0.14em] text-muted">After</figcaption>
                </figure>
              </div>
            </div>
          </div>
        </div>

      </Reveal>
    </Band>
  );
}

export function ShopifyWhyChooseSection() {
  return (
    <ServiceReasonGrid
      title="Shopify development is connected to the wider job of selling online"
      titleAccent="selling online"
      body="Good ecommerce development thinks beyond the theme. Products, operations, customer trust, marketing and measurement all matter. It's why UK businesses come to a Shopify development agency like ours instead of briefing a single freelancer for the build and hoping the rest sorts itself out."
      reasons={content.reasons}
    />
  );
}

export function ShopifyFAQAccordion() {
  return (
    <ServiceFaqSection
      title="Questions before you brief a Shopify project"
      titleAccent="Shopify project"
      description="Support and commercial terms carried over from the current service page are clearly marked where confirmation is still needed."
      items={content.faqs.map(([q, a]) => ({ q, a }))}
      group="shopify-faq"
      phoneEvent="shopify_phone_click"
    />
  );
}

export function ShopifyFinalCTA() {
  return (
    <ServiceNextStepsCTA
      title="Ready to plan a better Shopify store?"
      titleAccent="Shopify store?"
      body="Tell us what you sell, what's currently getting in the way, and what the new store needs to do. As a Shopify development company built for UK businesses, we'll take a look and come back with a practical next step. No hard sell."
      primary={{ label: "Discuss Your Shopify Project", event: "shopify_final_cta_click" }}
      secondary={{
        label: "Send a Store Brief",
        href: "/new-website-development-quotation-questionnaire",
        event: "shopify_form_start",
      }}
      phoneEvent="shopify_phone_click"
      emailEvent="shopify_email_click"
      steps={[
        "Your store brief is reviewed by a real person.",
        "We discuss the products, platform, goals and technical requirements.",
        "You receive a recommendation on package, scope or discovery work.",
      ]}
    />
  );
}
