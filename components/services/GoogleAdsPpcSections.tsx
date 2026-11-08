import { Fragment } from "react";
import { Pointer } from "@/components/Pointer";
import { Reveal } from "@/components/Reveal";
import { ServiceFaqSection } from "@/components/services/ServiceFaqSection";
import { ServiceFitSection as SharedServiceFitSection } from "@/components/services/ServiceFitSection";
import { ServiceNextStepsCTA } from "@/components/services/ServiceNextStepsCTA";
import { ServiceProcessTimeline } from "@/components/services/ServiceProcessTimeline";
import { ServiceReasonGrid } from "@/components/services/ServiceReasonGrid";
import {
  CheckIcon as Check,
  FeatureValue,
  ServiceSectionIntro as SectionIntro,
} from "@/components/services/ServicePrimitives";
import { Button, TextLink } from "@/components/ui/Button";
import { Eyebrow, Fpo, ReviewProof } from "@/components/ui/Proof";
import { MediaFrame } from "@/components/ServiceMedia";
import { ServiceBand as Band } from "@/components/services/ServiceBand";
import { googleAdsPpc as content } from "@/lib/content/google-ads-ppc";
import { CASE_STUDIES_LIVE } from "@/lib/flags";

type Package = (typeof content.packages)[number];

export function PpcHero() {
  return (
    <section className="hero-grid overflow-x-clip border-b border-line bg-warm">
      <div className="container-omh pb-[clamp(56px,38px+2.9vw,88px)] pt-[clamp(48px,34px+2.3vw,80px)]">
        <div className="grid grid-cols-12 items-center gap-x-12 gap-y-12 max-lg:block">
          <div className="col-span-7 max-lg:mb-12">
            <Reveal>
              <Eyebrow>{content.hero.eyebrow}</Eyebrow>
              <h1 className="mb-6 mt-7 font-sans text-display font-semibold text-balance">
                {/* &nbsp; keeps "agency UK" on one line so the keyword phrase never splits. */}
                Google Ads agency&nbsp;UK: PPC management built around <span className="text-amber-deep">measurable action</span>
              </h1>
              <p className="mb-9 text-lead leading-relaxed text-ink/75">{content.hero.body}</p>
              <div className="flex flex-wrap items-center gap-3.5 max-sm:flex-col max-sm:items-stretch">
                <Button href={content.hero.primary.href} arrow data-event="ppc_hero_cta_click">{content.hero.primary.label}</Button>
                <Button href={content.hero.secondary.href} variant="secondary" data-event="ppc_view_packages_click">{content.hero.secondary.label}</Button>
              </div>
              <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-5 border-t border-line pt-7">
                {[["Published packages from", "£750"], ["Required ad spend from", "£500"], ["Published set-up time", "14 days"]].map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-[14px] font-semibold uppercase tracking-[0.14em] text-muted">{label}</dt>
                    <dd className="mt-1.5 font-sans text-h4 font-semibold">{value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
          <Reveal className="col-span-5 col-start-8">
            <Pointer><div className="pointer-parallax"><MediaFrame kind="screen" theme="ppc" ratio="16/11" title="Google Ads campaign view" note="Replace with a real, anonymised account view with spend, date range and conversion definition visible." source="/images/Services/Images on the pages/Account baseline Before.png" alt="Illustrative Google Ads account overview used by OMH, a Google Ads agency for UK businesses, showing clicks, impressions, average CPC, cost and conversions" /></div></Pointer>
            <ReviewProof serviceId="google-ads" heading="Google Ads experience with verified client trust" className="mt-6" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function PpcNeedSection() {
  return (
    <Band label="Need help?">
      <Reveal>
        <div className="grid grid-cols-12 gap-x-10 gap-y-10 max-lg:block">
          <div className="col-span-4 max-lg:mb-10">
            <div className="lg:sticky lg:top-24">
              <SectionIntro size="md" title="Getting Google Ads to work for your business" accent="work for your business" body="Before the task list, these are the commercial problems Google Ads management has to solve." />
              <p className="mt-7 border-l-2 border-amber pl-5 text-body leading-snug text-ink/85">More clicks are not the goal. Useful enquiries, bookings or sales, and reliable evidence of them, are what make optimisation possible.</p>
            </div>
          </div>
          <div className="col-span-8 grid grid-cols-2 gap-x-8 max-md:grid-cols-1">
            {content.problems.map(([title, body], index) => (
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

export function PpcFitSection() {
  return (
    <SharedServiceFitSection
      title="For businesses ready to measure, learn and improve"
      titleAccent="measure, learn and improve"
      body="A useful PPC engagement needs a clear offer, a usable destination, appropriate measurement and realistic expectations about testing."
      good={content.fit.good}
      notFit={content.fit.notFit}
      notFitTitle="Not the right engagement"
    />
  );
}

export function PpcCapabilityGrid() {
  const [featured, ...rest] = content.capabilities;
  return (
    <Band label="Campaign formats">
      <Reveal>
        <SectionIntro title="The Google Ads formats our PPC management services cover" accent="Google Ads formats" body="The right mix depends on search demand, audience eligibility, creative, product data, budget and the commercial goal." />
        <Pointer className="pointer-spotlight relative mt-12 overflow-hidden rounded-card bg-inverse p-10 text-oninverse max-sm:p-6">
          <div className="relative z-10 grid grid-cols-12 items-start gap-x-10 gap-y-8 max-lg:block">
            <div className="col-span-6">
              <p className="text-[14px] font-semibold uppercase tracking-[0.16em] text-oninverse/55">High-intent demand</p>
              <h3 className="mt-5 font-sans text-h2 font-semibold">{featured.title}</h3>
              <p className="mt-5 text-lead leading-relaxed text-oninverse/75">{featured.body}</p>
            </div>
            <ul className="col-span-5 col-start-8 grid gap-3 border-t border-oninverse/15 pt-6 max-lg:mt-8">
              {featured.detail?.map((line) => <li key={line} className="flex gap-3 text-body leading-snug text-oninverse/85"><Check className="mt-0.5 size-4 shrink-0 text-[#7d5c33]" />{line}</li>)}
            </ul>
          </div>
        </Pointer>
        <div className="mt-8 grid grid-cols-3 gap-5 max-lg:grid-cols-1">
          {rest.map((item, index) => (
            <article key={item.title} className="surface-card rounded-card border border-line bg-surface p-7">
              <span className="text-body font-semibold tracking-[0.12em] text-amber">{String(index + 2).padStart(2, "0")}</span>
              <h3 className="mt-5 font-sans text-h4 font-semibold">{item.title}</h3>
              <p className="mt-3 text-body leading-relaxed text-ink/75">{item.body}</p>
            </article>
          ))}
        </div>
      </Reveal>
    </Band>
  );
}

export function PpcProcessSteps() {
  return (
    <ServiceProcessTimeline
      label="How we help"
      title="How our Google Ads management works, from account access to optimisation"
      titleAccent="account access to optimisation"
      body="Our Google Ads campaign management services cover planning, analytics, copywriting, management and reporting: the recurring work in every package."
      steps={content.process}
      action={{ label: "Request an account review", event: "ppc_form_start" }}
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
            {group.rows.map(([label, key]) => <div key={label} className="flex items-baseline justify-between gap-6 py-2"><dt className="text-muted">{label}</dt><dd className="text-right font-semibold text-ink"><FeatureValue value={pkg.features[key]} /></dd></div>)}
          </div>
        ))}
      </dl>
      <div className="px-6 pb-6"><Button href="/contact" small className="min-h-11 w-full justify-center" data-event="ppc_package_select" data-package={pkg.name}>Discuss this package</Button></div>
    </article>
  );
}

export function PpcPricingPackages() {
  return (
    <Band label="Packages" id="packages">
      <div data-event="ppc_pricing_view">
        <div>
          <SectionIntro title="Our Google Ads management packages, compared clearly" accent="compared clearly" body="Four packages across sixteen comparison points, including the two exclusions in PPC Seed." />
          <p className="mt-5 text-body leading-relaxed text-ink/70">Package names do not imply a recommendation. Scope, billing frequency, VAT, ad-spend period and agreement terms should be confirmed in the written proposal.</p>
        </div>
        <div className="mt-12 hidden overflow-x-auto rounded-card border border-line bg-surface xl:block">
          <table className="w-full min-w-[1100px] border-collapse text-left text-bsm">
            <caption className="sr-only">Google Ads PPC package comparison by inclusion and price</caption>
            <thead>
              <tr>
                <th scope="col" className="sticky left-0 z-10 w-[240px] bg-surface p-6 align-bottom"><span className="text-[14px] font-semibold uppercase tracking-[0.14em] text-muted">Compare packages</span></th>
                {content.packages.map((pkg) => <th key={pkg.name} scope="col" className="border-l border-line bg-soft/40 p-5 align-bottom"><span className="block text-[14px] font-semibold uppercase tracking-[0.14em] text-muted">{pkg.stage}</span><span className="mt-2 block font-sans text-h4 font-semibold">{pkg.name}</span><span className="mt-4 block font-sans text-[32px] font-semibold leading-none tracking-[-0.02em]">{pkg.price}</span></th>)}
              </tr>
              <tr>
                <th scope="col" className="sticky left-0 z-10 bg-surface" />
                {content.packages.map((pkg) => <td key={pkg.name} className="border-b-2 border-l border-b-ink border-line bg-soft/40 px-5 pb-5 align-top text-body font-normal leading-snug text-ink/70">{pkg.bestFor}</td>)}
              </tr>
            </thead>
            <tbody>
              {content.packageGroups.map((group) => (
                <Fragment key={group.label}>
                  <tr><th scope="colgroup" colSpan={5} className="border-b border-t border-line bg-warm/50 px-6 py-2.5 text-left text-[14px] font-semibold uppercase tracking-[0.14em] text-muted">{group.label}</th></tr>
                  {group.rows.map(([label, key]) => <tr key={label} className="border-b border-line transition-colors hover:bg-warm/60"><th scope="row" className="sticky left-0 z-10 bg-surface p-6 py-4 font-semibold">{label}</th>{content.packages.map((pkg) => <td key={pkg.name} className="border-l border-line p-5 py-4 text-ink/80"><FeatureValue value={pkg.features[key]} /></td>)}</tr>)}
                </Fragment>
              ))}
              <tr><th scope="row" className="sticky left-0 z-10 bg-surface p-6 font-semibold">Next step</th>{content.packages.map((pkg) => <td key={pkg.name} className="border-l border-line p-5"><Button href="/contact" small data-event="ppc_package_select" data-package={pkg.name}>Discuss package</Button></td>)}</tr>
            </tbody>
          </table>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:hidden">{content.packages.map((pkg) => <PackageCard key={pkg.name} pkg={pkg} />)}</div>
        <ul className="mt-8 grid gap-2 border-l-2 border-line pl-5 text-body leading-relaxed text-muted">{content.pricingNotes.map((note) => <li key={note}>{note}</li>)}</ul>
      </div>
    </Band>
  );
}

export function PpcProofSection() {
  return (
    <Band label="Proof" tone="white">
      <Reveal>
        <div className="overflow-hidden rounded-card border border-soft-dark bg-soft/60">
          <div className="grid grid-cols-12 gap-x-10 gap-y-8 p-10 max-lg:block max-sm:p-6">
            <div className="col-span-12">
              <Eyebrow>Client work</Eyebrow>
              <h2 className="mb-5 mt-6 font-sans text-h3 font-semibold text-balance">Show spend, measurement and the <span className="text-amber-deep">verified commercial outcome</span></h2>
              <p className="text-body leading-relaxed text-ink/75">Every Google Ads case study we publish includes the date range and what counted as a conversion, so the result can actually be evaluated.</p>
              <ul className="mt-7 border-t border-soft-dark">{["Starting account and business goal", "Campaign and landing-page work", "Spend and measurement period", "Verified lead, sale or efficiency outcome"].map((field) => <li key={field} className="border-b border-soft-dark py-3 text-body text-ink/70">{field}</li>)}</ul>
              {CASE_STUDIES_LIVE && <div className="mt-7"><TextLink href="/case-studies" data-event="ppc_case_study_click">View case studies</TextLink></div>}
            </div>
            <div className="col-span-12 mt-9">
              <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1">
                <Fpo ratio="4/3" tag="Before" title="Account baseline" note="Show an approved starting view and date range." source="/images/Services/Images on the pages/Account baseline Before.png" alt="Illustrative Google Ads account baseline" />
                <Fpo ratio="4/3" tag="After" title="Verified PPC result" note="Use the same metric definition and a comparable period." source="/images/Services/Images on the pages/Verified PPC result after.png" alt="Illustrative Google Ads reporting example" />
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </Band>
  );
}

export function PpcWhyChooseSection() {
  return (
    <ServiceReasonGrid
      title="Campaign management connected to the website behind every click"
      titleAccent="website behind every click"
      body="The old page covers keyword choice, landing-page analysis, tracking, copywriting and regular optimisation. Keeping those parts joined up makes the service easier to evaluate."
      reasons={content.reasons}
    >
        <div className="mt-12 rounded-card bg-inverse p-9 text-oninverse max-sm:p-6">
          <p className="text-[14px] font-semibold uppercase tracking-[0.16em] text-oninverse/55">Before increasing spend</p>
          <div className="mt-6 grid grid-cols-3 gap-8 max-lg:grid-cols-1">
            {content.warnings.map(([title, body]) => <article key={title} className="border-t border-oninverse/15 pt-5"><h3 className="font-sans text-h4 font-semibold">{title}</h3><p className="mt-3 text-body leading-relaxed text-oninverse/72">{body}</p></article>)}
          </div>
        </div>
    </ServiceReasonGrid>
  );
}

export function PpcFAQAccordion() {
  return (
    <ServiceFaqSection
      title="Questions before appointing a PPC agency"
      titleAccent="PPC agency"
      description="Ask for written confirmation of scope, access, ad-spend ownership, billing, VAT, agreement length and conversion definitions before signing."
      items={content.faqs.map(([q, a]) => ({ q, a }))}
      group="ppc-faq"
      phoneEvent="ppc_phone_click"
    />
  );
}

export function PpcFinalCTA() {
  return (
    <ServiceNextStepsCTA
      title="Need a clearer plan for Google Ads?"
      titleAccent="Google Ads?"
      body="Tell us what you sell, where you advertise, what you spend and what a useful conversion means. As a UK Google Ads services agency, we will review your starting point and recommend a practical next step."
      primary={{ label: "Discuss Google Ads Management", event: "ppc_final_cta_click" }}
      secondary={{
        label: "Send a Campaign Brief",
        href: "/ppc-request-quote",
        event: "ppc_form_start",
      }}
      phoneEvent="ppc_phone_click"
      emailEvent="ppc_email_click"
      steps={[
        "Your account, website and campaign goal are reviewed by a real person.",
        "We discuss measurement, budget, targeting, access and the appropriate package.",
        "You receive a scoped recommendation with exclusions and next actions.",
      ]}
    />
  );
}
