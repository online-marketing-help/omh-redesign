import type { Metadata } from "next";
import { Accordion } from "@/components/ui/Accordion";
import { Button, TextLink } from "@/components/ui/Button";
import { CaseEvidenceFpo, CaseStudyFeature } from "@/components/ui/Case";
import { Field } from "@/components/ui/Field";
import { Eyebrow, Fpo, VerifiedSlot } from "@/components/ui/Proof";
import Link from "next/link";
import { freeConsultation, quoteFormPages } from "@/lib/content/quote-forms";
import { subscriptionThankYou, thankYouPages } from "@/lib/content/thank-you";

export const metadata: Metadata = {
  title: "Design system (internal)",
  robots: { index: false },
};

const swatches = [
  { hex: "#F7F6F2", name: "Warm White", use: "page ground, softer sections", cls: "bg-warm" },
  { hex: "#FFFFFF", name: "White", use: "cards, forms, contrast", cls: "bg-surface" },
  { hex: "#000", name: "Ink", use: "text, one CTA band per page", cls: "bg-inverse" },
  { hex: "#7D5C33", name: "Warm Amber", use: "actions, links, active states only", cls: "bg-teal" },
  { hex: "#F8EDDC", name: "Soft Amber", use: "tinted panels, tags, hovers", cls: "bg-soft" },
  { hex: "#667085", name: "Slate", use: "secondary text, metadata", cls: "bg-muted" },
  { hex: "#D9DDD8", name: "Border", use: "hairlines, card borders", cls: "bg-line" },
  { hex: "#B42318", name: "Error", use: "form errors", cls: "bg-error" },
  { hex: "#067647", name: "Success", use: "form success", cls: "bg-success" },
];

const typeScale = [
  { cls: "text-display font-sans font-semibold", label: "Display", spec: "72/58/42 · Instrument Sans 600 · hero only" },
  { cls: "text-h1 font-sans font-semibold", label: "Heading 1", spec: "60/50/38 · one per page" },
  { cls: "text-h2 font-sans font-semibold", label: "Heading 2", spec: "44/38/32 · section openers, max 24ch" },
  { cls: "text-h3 font-sans font-semibold", label: "Heading 3", spec: "30/27/24" },
  { cls: "text-h4 font-sans font-semibold", label: "Heading 4", spec: "22/20" },
  { cls: "text-lead", label: "Body large", spec: "18/27 · standfirsts" },
  { cls: "text-body", label: "Body", spec: "18/28 · 60 to 75ch, left-aligned" },
  { cls: "text-bsm", label: "Body small", spec: "16/24 · captions, metadata" },
  { cls: "text-label font-semibold uppercase tracking-[0.14em]", label: "Label", spec: "14/20 · small caps, letterspaced" },
];

const widgetMap = [
  ["<Header />", "OMH Header", "Sticky-after-scroll, mobile accordion menu"],
  ["<Footer />", "OMH Footer", "Four columns + legal row (brief §31)"],
  ["Home hero", "OMH Home Hero", "Display headline + proof margin column"],
  ["Audience routes", "OMH Audience Routes", "Asymmetric 7/5 route panels"],
  ["<Section />", "OMH Section", "Margin-label scaffold with hairline top rule"],
  ["Solution row", "OMH Solution Row", "Alternating text/media editorial rows"],
  ["<CaseStudyFeature />", "OMH Featured Case Study", "Evidence media + challenge/work/period/result"],
  ["<CaseStudyRow />", "OMH Case Study Row", "Compact hairline list row"],
  ["CTA band", "OMH CTA Band", "Ink band, serif headline, next-steps column"],
  ["<VerifiedSlot />", "OMH Verified Slot", "Amber placeholder for unverified facts"],
  ["<Fpo />", "OMH Image", "Swap hatch frame for the real asset"],
  ["<Field />", "OMH Form Field", "Label-above input with all states"],
  ["<Accordion />", "OMH Accordion", "Native details/summary FAQ"],
];

function Spec({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line pt-10">
      <h2 className="mb-6 flex items-center gap-2.5 font-sans text-label font-semibold uppercase tracking-[0.13em] text-muted before:h-0.5 before:w-[18px] before:bg-amber before:content-['']">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function DesignSystem() {
  return (
    <div className="container-omh section-sm flex flex-col gap-14">
      <header>
        <Eyebrow>Phase 2 · internal reference</Eyebrow>
        <h1 className="mb-3 mt-5 font-sans text-h1 font-semibold">Design system: Direction 1 “Marginalia”</h1>
        <p className="text-lead text-ink/80">
          Every token below lives in <code className="text-bsm">app/globals.css</code> and maps 1:1
          to Elementor global settings for the later WordPress rebuild. Components carry their
          future widget name in a source comment.
        </p>
      </header>

      {/* Funnel pages have no nav entry by design — the quote forms live under
          "Get a Quote", and the thank-you pages are post-submit destinations that
          are noindex. This index exists so they can still be reviewed in one
          place. Derived from the content modules, so it can't drift. */}
      <Spec title="Funnel pages (no nav entry)">
        <div className="grid grid-cols-2 gap-10 max-md:grid-cols-1">
          <div>
            <p className="mb-4 text-label font-semibold text-ink">
              Quote forms &amp; questionnaires
              <span className="ml-2 font-normal text-muted">
                (also in the &ldquo;Get a Quote&rdquo; menu)
              </span>
            </p>
            <ul className="flex flex-col">
              {[...quoteFormPages.map((p) => ({ slug: p.slug, label: p.seo.title })), { slug: freeConsultation.slug, label: freeConsultation.seo.title }].map(
                (page) => (
                  <li key={page.slug} className="border-b border-line">
                    <Link
                      href={`/${page.slug}`}
                      className="block py-3 text-body text-ink hover:text-amber-deep"
                    >
                      {page.label}
                      <span className="block text-bsm text-muted">/{page.slug}</span>
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>
          <div>
            <p className="mb-4 text-label font-semibold text-ink">
              Thank-you pages
              <span className="ml-2 font-normal text-muted">(reached after a form submits)</span>
            </p>
            <ul className="flex flex-col">
              {[...thankYouPages.map((p) => ({ slug: p.slug, label: p.seo.title })), { slug: subscriptionThankYou.slug, label: subscriptionThankYou.seo.title }].map(
                (page) => (
                  <li key={page.slug} className="border-b border-line">
                    <Link
                      href={`/${page.slug}`}
                      className="block py-3 text-body text-ink hover:text-amber-deep"
                    >
                      {page.label}
                      <span className="block text-bsm text-muted">/{page.slug}</span>
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>
      </Spec>

      <Spec title="Colour">
        <div className="grid grid-cols-5 gap-4 max-lg:grid-cols-3 max-sm:grid-cols-2">
          {swatches.map((s) => (
            <div key={s.hex} className="overflow-hidden rounded-card border border-line bg-surface">
              <div className={`h-16 ${s.cls}`} />
              <div className="p-3">
                <p className="font-sans text-bsm font-semibold">
                  {s.name} <span className="font-normal text-muted">{s.hex}</span>
                </p>
                <p className="mt-0.5 text-[14px] leading-snug text-muted">{s.use}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-5 text-bsm text-muted">
          Rules (brief §15): one accent per component · amber never carries small text on light
          grounds · dark sections limited and purposeful (one ink band per page) · no gradients.
        </p>
      </Spec>

      <Spec title="Typography">
        <div className="flex flex-col">
          {typeScale.map((t) => (
            <div key={t.label} className="grid grid-cols-[8fr_4fr] items-baseline gap-6 border-b border-line py-4 last:border-b-0 max-sm:grid-cols-1">
              <p className={t.cls}>The quick brown fox</p>
              <p className="text-[13.5px] leading-snug text-muted">
                <b className="font-semibold text-ink">{t.label}</b> · {t.spec}
              </p>
            </div>
          ))}
          <div className="grid grid-cols-[8fr_4fr] items-baseline gap-6 border-t border-line py-4 max-sm:grid-cols-1">
            <p className="font-body text-[26px] leading-snug">
              An editorial opener, set in <em>Source Sans 3.</em>
            </p>
            <p className="text-[13.5px] leading-snug text-muted">
              <b className="font-semibold text-ink">Serif accent</b> · quotes, section openers, CTA
              headline only, never long body copy
            </p>
          </div>
        </div>
      </Spec>

      <Spec title="Buttons & links">
        <div className="flex flex-wrap items-center gap-4">
          <Button href="#" arrow>Primary</Button>
          <Button href="#" variant="secondary">Secondary</Button>
          <span className="rounded-card bg-inverse p-3">
            <Button href="#" variant="inverse" small>On ink</Button>
          </span>
          <span className="rounded-card bg-inverse p-3">
            <Button href="#" variant="ghost-white" small>Ghost on ink</Button>
          </span>
          <TextLink href="#">Text link with a specific label</TextLink>
        </div>
        <p className="mt-5 text-bsm text-muted">
          10px radius · 600 weight · arrow nudges 2 to 3px on hover · 1px lift on primary · visible
          focus ring · never a vague “Learn more” when a specific label is possible (brief §18).
        </p>
      </Spec>

      <Spec title="Form states">
        <div className="grid max-w-3xl grid-cols-2 gap-6 rounded-card border border-line bg-surface p-8 max-sm:grid-cols-1">
          <Field label="Work email" required placeholder="name@company.co.uk" help="We reply to this address." />
          <Field label="Website" placeholder="https://" />
          <Field label="Work email" required defaultValue="name@company" error="Enter a full email address, e.g. name@company.co.uk." />
          <Field label="Company" defaultValue="Online Marketing Help" success="Looks good." />
          <Field label="Budget band" disabled placeholder="[Ranges to be confirmed] ◈" help="Qualification bands come from the client, not invented." />
        </div>
      </Spec>

      <Spec title="Placeholder discipline">
        <div className="flex flex-wrap items-start gap-6">
          <div className="flex flex-col gap-3">
            <VerifiedSlot>VERIFIED RESULT REQUIRED</VerifiedSlot>
            <VerifiedSlot>REAL TESTIMONIAL TO BE INSERTED</VerifiedSlot>
          </div>
          <div className="w-72">
            <Fpo ratio="16/10" tag="Photo · 16:10" title="Real asset required" note="Hatched frame states exactly what is needed." source="/images/home/agency-collaboration.webp" alt="Agency collaboration" />
          </div>
        </div>
        <p className="mt-5 text-bsm text-muted">
          Unverified facts are impossible to mistake for proof (brief §1). These slots ship to
          staging but block go-live.
        </p>
      </Spec>

      <Spec title="Case study blocks">
        <CaseStudyFeature
          c={{
            sector: "Home improvement",
            sampleNote: "Specimen: structure from the brief; data from client records.",
            challenge: "High lead volume but poor lead quality",
            work: "Google Ads restructuring, landing page improvement, conversion tracking",
            href: "#",
          }}
          media={<CaseEvidenceFpo />}
        />
      </Spec>

      <Spec title="Accordion (FAQ)">
        <div className="max-w-3xl">
          <Accordion
            group="ds-demo"
            items={[
              { q: "Native details/summary, no JavaScript", a: "The name attribute makes the group exclusive. Elementor's accordion widget reproduces this directly." },
              { q: "Essential sales information never hides here", a: "Accordions are for objection-handling FAQs only (brief §18)." },
            ]}
          />
        </div>
      </Spec>

      <Spec title="Motion tokens">
        <ul className="">
          {[
            ["Micro 120 to 220ms", "arrow nudge, link underline, button lift"],
            ["Standard 220 to 360ms", "hover states, border-colour shifts, card raise"],
            ["Entry 550ms", "one fade-and-rise (14px) per section via .rv, additive, never re-triggered"],
            ["Reduced motion", "prefers-reduced-motion disables everything; layout reads identically (Elementor-safe)"],
          ].map(([k, v]) => (
            <li key={k} className="flex gap-4 border-b border-line py-2.5 text-bsm last:border-b-0">
              <b className="min-w-44 font-semibold">{k}</b>
              <span className="text-ink/80">{v}</span>
            </li>
          ))}
        </ul>
      </Spec>

      <Spec title="Component → Elementor widget map">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-bsm">
            <thead>
              <tr className="border-b-2 border-ink text-left">
                <th className="py-2.5 pr-6 font-sans font-semibold">React component</th>
                <th className="py-2.5 pr-6 font-sans font-semibold">Future Elementor widget</th>
                <th className="py-2.5 font-sans font-semibold">Notes</th>
              </tr>
            </thead>
            <tbody>
              {widgetMap.map(([a, b, c]) => (
                <tr key={b} className="border-b border-line">
                  <td className="py-2.5 pr-6 font-mono text-[13.5px]">{a}</td>
                  <td className="py-2.5 pr-6">{b}</td>
                  <td className="py-2.5 text-muted">{c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Spec>
    </div>
  );
}
