import { Fragment } from "react";
import { Activity, Database, Gauge, Puzzle, RefreshCw, ShieldCheck } from "lucide-react";
import { CapabilityShowcase, MonitorMock } from "@/components/services/CapabilityShowcase";
import { ServiceHeroArt } from "@/components/services/ServiceHeroArt";
import { Pointer } from "@/components/Pointer";
import { Reveal } from "@/components/Reveal";
import { ServiceFaqSection } from "@/components/services/ServiceFaqSection";
import { ServiceFitSection as SharedServiceFitSection } from "@/components/services/ServiceFitSection";
import { ServiceNextStepsCTA } from "@/components/services/ServiceNextStepsCTA";
import { ServiceProcessTimeline } from "@/components/services/ServiceProcessTimeline";
import { ServiceReasonGrid } from "@/components/services/ServiceReasonGrid";
import { FeatureValue, ServiceSectionIntro as SectionIntro } from "@/components/services/ServicePrimitives";
import { Button, TextLink } from "@/components/ui/Button";
import { Eyebrow, Fpo, ReviewProof } from "@/components/ui/Proof";
import { ServiceBand as Band } from "@/components/services/ServiceBand";
import { wordpressMaintenance as content } from "@/lib/content/wordpress-maintenance";
import { CASE_STUDIES_LIVE } from "@/lib/flags";

type Package = (typeof content.packages)[number];

export function MaintenanceHero() {
  return (
    <section className="hero-grid overflow-x-clip border-b border-line bg-warm">
      <div className="container-omh pb-[clamp(56px,38px+2.9vw,88px)] pt-[clamp(48px,34px+2.3vw,80px)]">
        <div className="grid grid-cols-12 items-center gap-x-12 gap-y-12 max-lg:block">
          <div className="col-span-7 max-lg:mb-12">
            {/* CSS-only entrance, not <Reveal>: the JS-gated reveal held the headline at opacity 0 until hydration and delayed LCP. */}
            <div className="hero-in">
              <Eyebrow>{content.hero.eyebrow}</Eyebrow>
              <h1 className="mb-6 mt-7 font-sans text-display font-semibold text-balance">
                WordPress maintenance packages that keep your website{" "}
                <span className="text-amber-deep">under control</span>
              </h1>
              <p className="mb-9 text-lead leading-relaxed text-ink/75">
                {content.hero.body}
              </p>
              <div className="flex flex-wrap items-center gap-3.5 max-sm:flex-col max-sm:items-stretch">
                <Button
                  href={content.hero.primary.href}
                  arrow
                  data-event="maintenance_hero_cta_click"
                >
                  {content.hero.primary.label}
                </Button>
                <Button href={content.hero.secondary.href} variant="secondary" arrow data-event="maintenance_view_packages_click">
                  {content.hero.secondary.label}
                </Button>
              </div>
              <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-5 border-t border-line pt-7">
                {[
                  ["Packages from", "£300"],
                  ["Included hours from", "2"],
                  ["Package meetings", "Monthly"],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-[14px] font-semibold uppercase tracking-[0.14em] text-muted">
                      {label}
                    </dt>
                    <dd className="mt-1.5 font-sans text-h4 font-semibold">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="hero-in hero-in-2 col-span-5 col-start-8">
            <Pointer>
              <div className="pointer-parallax">
                <ServiceHeroArt variant="maintenance" />
              </div>
            </Pointer>
            <ReviewProof serviceId="maintenance" heading="WordPress support with verified trust" className="mt-6" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function MaintenanceIssueSection() {
  return (
    <Band label="Problems">
      <Reveal>
        <div className="grid grid-cols-12 gap-x-10 gap-y-10 max-lg:block">
          <div className="col-span-4 max-lg:mb-10">
            <div className="lg:sticky lg:top-24">
              <SectionIntro
                size="md"
                title="WordPress problems rarely arrive at a convenient time"
                accent="convenient time"
                body="These are the WordPress support issues our maintenance packages are designed to catch early, before they become urgent. Grouping them by likely area makes it easier to recognise the problem without pretending every fault has the same fix."
              />
              <p className="mt-7 border-l-2 border-amber pl-5 text-body leading-snug text-ink/85">
                A maintenance plan reduces avoidable risk, but every inherited
                or urgent issue still needs proper diagnosis.
              </p>
            </div>
          </div>
          <div className="col-span-8 grid grid-cols-2 gap-x-8 max-md:grid-cols-1">
            {content.issues.map(([title, body], index) => (
              <article
                key={title}
                className="group border-t border-line px-3 py-6 transition-colors hover:border-teal/50 hover:bg-surface"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-sans text-body font-semibold tracking-[0.1em] text-muted group-hover:text-amber">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-sans text-h4 font-semibold">{title}</h3>
                </div>
                <p className="mt-2.5 pl-10 text-body leading-relaxed text-ink/75">
                  {body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Reveal>
    </Band>
  );
}

export function MaintenanceFitSection() {
  return (
    <SharedServiceFitSection
      title="For businesses that need WordPress maintenance packages to stay dependable"
      titleAccent="stay dependable"
      body="Maintenance works best when the site matters to the business, access is available and routine care is separated from larger development projects."
      good={content.fit.good}
      notFit={content.fit.notFit}
      notFitTitle="Needs a different first step"
    />
  );
}

export function MaintenanceCapabilityGrid() {
  const [featured, ...rest] = content.capabilities;
  const icons = [Gauge, RefreshCw, ShieldCheck, Database, Puzzle, Activity];
  return (
    <CapabilityShowcase
      label="Care"
      intro={{
        title: "WordPress maintenance services covering routine care, monitoring and practical support",
        accent: "practical support",
        body: "The service range includes issue investigation, performance, software updates, security checks, backups, uptime monitoring and a monthly support rhythm.",
      }}
      featured={{
        eyebrow: "When something is already wrong",
        title: featured.title,
        body: featured.body,
        detail: featured.detail,
        primary: { label: "See the packages", href: "#packages", event: "maintenance_care_packages_click" },
        secondary: { label: "Talk to us", href: "/contact", event: "maintenance_care_contact_click" },
        aside: <MonitorMock />,
      }}
      items={rest.map((item, i) => ({ ...item, icon: icons[i] ?? Activity }))}
    />
  );
}

export function MaintenanceProcessSteps() {
  return (
    <ServiceProcessTimeline
      label="Monthly rhythm"
      title="A repeatable WordPress maintenance cycle"
      titleAccent="maintenance cycle"
      body="The initial review creates a baseline. From there, routine work follows the same clear sequence each month."
      steps={content.process}
      action={{ label: "Start with an audit", event: "maintenance_form_start" }}
    />
  );
}

function PackageCard({ pkg }: { pkg: Package }) {
  return (
    <article className="overflow-hidden rounded-card border border-line bg-surface">
      <div className="border-b border-line bg-soft/50 p-6">
        <p className="text-[14px] font-semibold uppercase tracking-[0.14em] text-muted">
          {pkg.stage}
        </p>
        <h3 className="mt-2 font-sans text-h3 font-semibold">{pkg.name}</h3>
        <p className="mt-3 font-sans text-[34px] font-semibold leading-none tracking-[-0.02em]">
          {pkg.price}
        </p>
        <p className="mt-4 text-bsm leading-relaxed text-ink/70">
          {pkg.bestFor}
        </p>
      </div>
      <dl className="p-6 text-bsm">
        {content.packageGroups.map((group) => (
          <div
            key={group.label}
            className="border-b border-line py-4 first:pt-0 last:border-b-0"
          >
            <p className="mb-1 text-[14px] font-semibold uppercase tracking-[0.14em] text-muted/80">
              {group.label}
            </p>
            {group.rows.map(([label, key]) => (
              <div
                key={label}
                className="flex items-baseline justify-between gap-6 py-2"
              >
                <dt className="text-muted">{label}</dt>
                <dd className="text-right font-semibold text-ink">
                  <FeatureValue value={pkg.features[key]} />
                </dd>
              </div>
            ))}
          </div>
        ))}
      </dl>
      <div className="px-6 pb-6">
        <Button
          href="/contact"
          small
          className="min-h-11 w-full justify-center"
          data-event="maintenance_package_select"
          data-package={pkg.name}
        >
          Discuss this maintenance package
        </Button>
      </div>
    </article>
  );
}

export function MaintenancePricingPackages() {
  return (
    <Band label="Packages" id="packages">
      <div data-event="maintenance_pricing_view">
        <div>
          <SectionIntro
            title="WordPress website maintenance packages with clear published allowances"
            accent="published allowances"
            body="Three packages across sixteen comparison points. Billing and contract terms still to be confirmed are marked."
          />
          <p className="mt-5 text-body leading-relaxed text-ink/70">
            No package has been labelled as recommended. The right option
            depends on the website, request volume and whether larger
            development work is already needed.
          </p>
        </div>
        <div className="mt-12 hidden overflow-x-auto rounded-card border border-line bg-surface xl:block">
          <table className="w-full min-w-[880px] border-collapse text-left text-bsm">
            <caption className="sr-only">
              WordPress maintenance package comparison by inclusion and price
            </caption>
            <thead>
              <tr>
                <th
                  scope="col"
                  className="sticky left-0 z-10 w-[250px] bg-surface p-6 align-bottom"
                >
                  <span className="text-[14px] font-semibold uppercase tracking-[0.14em] text-muted">
                    Compare packages
                  </span>
                </th>
                {content.packages.map((pkg) => (
                  <th
                    key={pkg.name}
                    scope="col"
                    className="border-l border-line bg-soft/40 p-6 align-bottom"
                  >
                    <span className="block text-[14px] font-semibold uppercase tracking-[0.14em] text-muted">
                      {pkg.stage}
                    </span>
                    <span className="mt-2 block font-sans text-h4 font-semibold">
                      {pkg.name}
                    </span>
                    <span className="mt-4 block font-sans text-[34px] font-semibold leading-none tracking-[-0.02em]">
                      {pkg.price}
                    </span>
                  </th>
                ))}
              </tr>
              <tr>
                <th scope="col" className="sticky left-0 z-10 bg-surface" />
                {content.packages.map((pkg) => (
                  <td
                    key={pkg.name}
                    className="border-b-2 border-l border-b-ink border-line bg-soft/40 px-6 pb-6 align-top text-body font-normal leading-snug text-ink/70"
                  >
                    {pkg.bestFor}
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              {content.packageGroups.map((group) => (
                <Fragment key={group.label}>
                  <tr>
                    <th
                      scope="colgroup"
                      colSpan={4}
                      className="border-b border-t border-line bg-warm/50 px-6 py-2.5 text-left text-[14px] font-semibold uppercase tracking-[0.14em] text-muted"
                    >
                      {group.label}
                    </th>
                  </tr>
                  {group.rows.map(([label, key]) => (
                    <tr
                      key={label}
                      className="border-b border-line transition-colors hover:bg-warm/60"
                    >
                      <th
                        scope="row"
                        className="sticky left-0 z-10 bg-surface p-6 py-4 font-semibold"
                      >
                        {label}
                      </th>
                      {content.packages.map((pkg) => (
                        <td
                          key={pkg.name}
                          className="border-l border-line p-6 py-4 text-ink/80"
                        >
                          <FeatureValue value={pkg.features[key]} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </Fragment>
              ))}
              <tr>
                <th
                  scope="row"
                  className="sticky left-0 z-10 bg-surface p-6 font-semibold"
                >
                  Next step
                </th>
                {content.packages.map((pkg) => (
                  <td key={pkg.name} className="border-l border-line p-6">
                    <Button
                      href="/contact"
                      small
                      data-event="maintenance_package_select"
                      data-package={pkg.name}
                    >
                      Discuss package
                    </Button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:hidden">
          {content.packages.map((pkg) => (
            <PackageCard key={pkg.name} pkg={pkg} />
          ))}
        </div>
        <ul className="mt-8 grid gap-2 border-l-2 border-line pl-5 text-body leading-relaxed text-muted">
          {content.pricingNotes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </div>
    </Band>
  );
}

export function MaintenanceProofSection() {
  return (
    <Band label="Proof" tone="white">
      <Reveal>
        <div className="overflow-hidden rounded-card border border-soft-dark bg-soft/60">
          <div className="grid grid-cols-12 gap-x-10 gap-y-8 p-10 max-lg:block max-sm:p-6">
            <div className="col-span-12">
              <Eyebrow>Client work</Eyebrow>
              <h2 className="mb-5 mt-6 font-sans text-h3 font-semibold text-balance">
                Show the problem, the WordPress maintenance work and{" "}
                <span className="text-amber-deep">the verified outcome</span>
              </h2>
              <p className="text-body leading-relaxed text-ink/75">
                Every maintenance case study covers the same ground: what was breaking, what
                routine we introduced, what was fixed, and how the client experienced the support.
              </p>
              <ul className="mt-7 border-t border-soft-dark">
                {[
                  "Original website problem",
                  "Maintenance scope and package",
                  "Work completed and reporting rhythm",
                  "Verified result and client comment",
                ].map((field) => (
                  <li
                    key={field}
                    className="border-b border-soft-dark py-3 text-body text-ink/70"
                  >
                    {field}
                  </li>
                ))}
              </ul>
              {CASE_STUDIES_LIVE && (
              <div className="mt-7">
                <TextLink
                  href="/case-studies"
                  data-event="maintenance_case_study_click"
                >
                  View case studies
                </TextLink>
              </div>
              )}
            </div>
            <div className="col-span-12 mt-9">
              <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1">
                <Fpo
                  ratio="4/3"
                  tag="Before"
                  title="WordPress issue screenshot"
                  note="Use the real fault, warning or previous setup." source="/images/Services/Images on the pages/before website maintenance.png" alt="Illustrative WordPress dashboard before maintenance" />
                <Fpo
                  ratio="4/3"
                  tag="After"
                  title="Maintenance report or fix"
                  note="Use an approved result, report or resolved screen." source="/images/Services/Images on the pages/After website maintenance.png" alt="Illustrative WordPress dashboard after maintenance" />
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </Band>
  );
}

export function MaintenanceWhyChooseSection() {
  return (
    <ServiceReasonGrid
      title="WordPress maintenance services connected to development and marketing"
      titleAccent="development and marketing"
      body="Routine website care is more useful when the team can recognise when a problem needs development, conversion work, SEO input or a wider rebuild."
      reasons={content.reasons}
    />
  );
}

export function MaintenanceFAQAccordion() {
  return (
    <ServiceFaqSection
      title="Questions before you choose a WordPress maintenance package"
      titleAccent="maintenance package"
      description="Ask for written confirmation of response coverage, billing, VAT, contract length and warranty terms before signing."
      items={content.faqs.map(([q, a]) => ({ q, a }))}
      group="maintenance-faq"
      phoneEvent="maintenance_phone_click"
    />
  );
}

export function MaintenanceFinalCTA() {
  return (
    <ServiceNextStepsCTA
      title="Need a clearer plan for WordPress maintenance and support?"
      titleAccent="maintenance and support?"
      body="Tell us what the website does, what has been going wrong and what support you need each month. We will review the setup and recommend a practical next step."
      primary={{ label: "Discuss WordPress Maintenance Packages", event: "maintenance_final_cta_click" }}
      secondary={{
        label: "Send a Website Brief",
        href: "/wordpress-website-maintenance-request-quote",
        event: "maintenance_form_start",
      }}
      phoneEvent="maintenance_phone_click"
      emailEvent="maintenance_email_click"
      steps={[
        "Your website and request are reviewed by a real person.",
        "We discuss access, current problems and the appropriate level of cover.",
        "You receive a recommendation on audit, repair work or a maintenance package.",
      ]}
    />
  );
}
