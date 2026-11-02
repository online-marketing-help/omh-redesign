import { Reveal } from "@/components/Reveal";
import { MediaFrame } from "@/components/ServiceMedia";
import { ServiceBand } from "@/components/services/ServiceBand";
import { Button } from "@/components/ui/Button";
import { BookDemo } from "@/components/BookDemo";
import { FinalCta } from "@/components/ui/FinalCta";
import { Eyebrow } from "@/components/ui/Proof";
import { warranty } from "@/lib/content/warranty";

export function WarrantyHero() {
  const [lead] = warranty.intro;

  return (
    <section className="hero-grid border-b border-line bg-warm">
      <div className="container-omh section-md">
        <Reveal>
          <Eyebrow>{warranty.eyebrow}</Eyebrow>
          <div className="mt-9 grid grid-cols-12 items-center gap-x-12 gap-y-10 max-lg:block">
            <div className="col-span-6">
              <h1 className="font-sans text-display font-semibold text-balance">
                Dedicated to <span className="text-amber-deep">Customer Care</span>
              </h1>
              <p className="mt-7 text-body leading-relaxed text-ink/85">
                {lead}
              </p>
              <div className="mt-9">
                <Button href="/contact" arrow data-event="warranty_hero_cta_click">
                  Request My Free Consultation
                </Button>
              </div>
            </div>
            <div className="col-span-6 max-lg:mt-10">
              <MediaFrame
                kind="image"
                theme="maintenance"
                ratio="4/3"
                title="Warranty cover in practice"
                note="Replace with a photograph of the support team or an approved support-desk screen."
                source="/images/Services/website maintenance.jpg"
                alt="Miniature maintenance figures at work on a laptop keyboard, standing in for the ongoing repair work covered by the warranty."
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// The rest of the verbatim introduction, set in two measured columns rather than
// one tall ragged one beside the hero image. CSS columns, not a grid: the text
// flows down the left column then the right, so a one-line paragraph never
// leaves a gap beside a long one and the reading order stays top to bottom.
export function WarrantyIntro() {
  const rest = warranty.intro.slice(1);
  return (
    <ServiceBand label="Why we offer it" tone="white" accent="bg-teal" labelStyle="underline">
      <Reveal>
        <div className="columns-2 gap-x-14 max-md:columns-1">
          {rest.map((paragraph) => (
            <p key={paragraph} className="mb-5 break-inside-avoid text-body leading-relaxed text-ink/75">
              {paragraph}
            </p>
          ))}
        </div>
      </Reveal>
    </ServiceBand>
  );
}

// Sticky heading + support-desk screen on the left, the eight covered terms as a
// ruled list on the right — they are contiguous terms of one policy, not offers.
export function WarrantyCoverage() {
  return (
    <ServiceBand label="What it covers" tone="mist" accent="bg-amber" labelStyle="underline">
      <Reveal>
        <div className="grid grid-cols-12 gap-x-12 gap-y-10 max-lg:block">
          <div className="col-span-5">
            <div className="lg:sticky lg:top-24">
              <h2 className="font-sans text-h2 font-semibold text-balance">
                The warranty covers the following aspects
              </h2>
              <MediaFrame
                kind="screen"
                theme="seo"
                ratio="4/3"
                title="Support request handled under warranty"
                note="Use an anonymised support ticket or resolution log."
                source="/images/Services/website maintenance 1.jpg"
                alt="A website showing an under-construction screen while fixes are carried out, with the job notes beside it."
                className="mt-8"
              />
            </div>
          </div>
          <div className="col-span-7 max-lg:mt-10">
            <div className="border-t border-[#000]/15">
              {warranty.covers.map((item, index) => (
                <div key={item} className="flex items-baseline gap-6 border-b border-[#000]/15 py-5">
                  <span className="font-sans text-[18px] font-semibold tabular-nums text-amber-deep">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-body leading-relaxed text-ink/80">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </ServiceBand>
  );
}

export function WarrantyPricing() {
  return (
    <ServiceBand label="Warranty pricing" tone="navy" accent="bg-[#7d5c33]" labelStyle="underline">
      <Reveal>
        <h2 className="mb-11 font-sans text-h2 font-semibold text-balance">
          Choose the term that fits how you use your website
        </h2>
        <div className="grid grid-cols-3 gap-5 max-lg:grid-cols-1">
          {warranty.pricing.map((plan, index) => (
            <div
              key={plan.term}
              className="flex flex-col rounded-card border border-oninverse/15 bg-oninverse/[0.04] p-8 max-sm:p-6"
            >
              <span aria-hidden className="text-[18px] font-semibold tabular-nums text-[#7d5c33]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mt-4 text-[14px] font-semibold uppercase tracking-[0.14em] text-oninverse/60">
                {plan.term}
              </p>
              <p className="mt-4 font-sans text-[clamp(34px,28px+1.4vw,46px)] font-semibold leading-none">
                {plan.price}
              </p>
              <p className="mt-6 border-t border-oninverse/15 pt-5 text-[18px] leading-relaxed text-oninverse/70">
                {plan.note}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-oninverse/15 pt-8">
          <span className="text-[14px] font-semibold uppercase tracking-[0.14em] text-oninverse/55">
            Exclusions
          </span>
          {warranty.exclusions.map((item) => (
            <span
              key={item}
              className="rounded-full border border-oninverse/25 px-3.5 py-1.5 text-[18px] text-oninverse/75"
            >
              {item}
            </span>
          ))}
        </div>
      </Reveal>
    </ServiceBand>
  );
}

export function WarrantyGuarantee() {
  return (
    <section className="border-y border-line bg-surface">
      <div className="container-omh section-md">
        <Reveal>
          <div className="grid grid-cols-12 items-center gap-x-12 gap-y-9 max-lg:block">
            <div className="col-span-7">
              <Eyebrow>Guarantee</Eyebrow>
              <h2 className="mt-6 font-sans text-h2 font-semibold text-balance">
                {warranty.guarantee.heading}
              </h2>
              <p className="mt-6 text-lead leading-relaxed text-ink/75">
                {warranty.guarantee.body}
              </p>
            </div>
            <div className="col-span-5 max-lg:mt-9">
              <MediaFrame
                kind="image"
                theme="maintenance"
                ratio="4/3"
                title="What the guarantee means in practice"
                note="Add a short message from the team explaining the guarantee." source="/images/Services/website maintenance.jpg" alt="Website support and maintenance" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function WarrantyFinalCta() {
  return (
    <>
      <FinalCta
        title="Need help with one of our services?"
        titleAccent="one of our services?"
        body="Book a call at a time convenient for you and we will talk through which warranty term fits how you use your website."
        primary={{ label: "Book a Call", href: "/contact", event: "warranty_final_cta_click" }}
        contactEvents={{ phone: "warranty_phone_click", email: "warranty_email_click" }}
      />
      <BookDemo />
    </>
  );
}
