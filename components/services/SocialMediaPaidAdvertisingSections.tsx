import { Reveal } from "@/components/Reveal";
import { ServiceBand, type ServiceBandTone } from "@/components/services/ServiceBand";
import { CheckIcon as Check, HighlightedText } from "@/components/services/ServicePrimitives";
import { Button } from "@/components/ui/Button";
import { Eyebrow, ReviewProof } from "@/components/ui/Proof";
import { socialMediaPaidAdvertising as content } from "@/lib/content/social-media-paid-advertising";

function Band({ tone = "white", ...props }: Omit<Parameters<typeof ServiceBand>[0], "accent" | "tone"> & { tone?: ServiceBandTone }) {
  return <ServiceBand {...props} tone={tone} accent="bg-[#ef8067]" />;
}

function PaidCampaignVisual() {
  return (
    <div
      className="service-media-frame relative w-full min-w-0 max-w-full overflow-hidden rounded-card border border-line bg-[#000] p-5 text-oninverse shadow-xl"
      role="img"
      aria-label="Illustrated paid social media advertising dashboard tracking campaign performance and return on ad spend"
    >
      <div className="flex items-center justify-between border-b border-oninverse/10 pb-4">
        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9bc3f3]">
          Paid social control room
        </span>
        <span className="rounded-full bg-[#ef8067]/20 px-2.5 py-1 text-[10px] font-semibold text-[#ffb5a5]">
          Live campaign
        </span>
      </div>
      <div className="mt-5 rounded-xl bg-surface p-5 text-ink">
        <div className="flex items-end justify-between gap-4 max-sm:block">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-amber-deep">
              Performance signal
            </p>
            <p className="mt-2 font-sans text-[30px] font-semibold">ROAS</p>
          </div>
          <div className="flex h-20 items-end gap-2 max-sm:mt-4 max-sm:gap-1">
            {[35, 52, 43, 68, 58, 82].map((height, index) => (
              <span
                key={index}
                style={{ height: `${height}%` }}
                className={`w-5 rounded-t max-sm:w-3 ${index === 5 ? "bg-[#ef8067]" : "bg-[#76a9e8]"}`}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3 max-sm:grid-cols-1">
        {[["Audience", "Defined"], ["Creative", "Testing"], ["Budget", "Optimised"]].map(([label, value]) => (
          <div key={label} className="rounded-xl border border-oninverse/12 bg-oninverse/[0.04] p-4">
            <p className="text-[9px] uppercase tracking-[0.12em] text-oninverse/62">{label}</p>
            <p className="mt-2 text-[14px] font-semibold">{value}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-3 text-[11px] text-oninverse/62">
        <span className="size-2 shrink-0 rounded-full bg-[#65c4ba]" />
        Facebook · Instagram · TikTok · LinkedIn
      </div>
    </div>
  );
}

export function PaidSocialHero() {
  return <section className="hero-grid overflow-x-clip border-b border-line bg-warm"><div className="container-omh pb-[clamp(56px,38px+2.9vw,88px)] pt-[clamp(48px,34px+2.3vw,80px)]"><div className="grid grid-cols-12 items-center gap-x-12 gap-y-12 max-lg:block"><Reveal className="col-span-7 max-lg:mb-12"><Eyebrow>{content.hero.eyebrow}</Eyebrow><h1 className="mb-6 mt-7 font-sans text-display font-semibold text-balance"><HighlightedText text={content.hero.title} highlight="visibility and conversions" /></h1><p className="mb-9 text-lead leading-relaxed text-ink/75">{content.hero.body}</p><div className="flex flex-wrap gap-3.5 max-sm:flex-col"><Button href="/contact" arrow data-event="paid_social_hero_cta_click">Request a Paid Social Review</Button><Button href="#packages" variant="secondary" data-event="paid_social_packages_click">View Paid Social Packages</Button></div><dl className="mt-10 grid max-w-[660px] grid-cols-3 border-t border-line pt-7 max-sm:grid-cols-1 max-sm:gap-5">{[["Packages from","£850"],["Minimum ad spend","£1,000"],["Published term","3 months"]].map(([label,value])=><div key={label} className="border-l border-line pl-5 first:border-l-0 first:pl-0 max-sm:border-l-0 max-sm:pl-0"><dt className="text-[14px] font-semibold uppercase tracking-[0.13em] text-muted">{label}</dt><dd className="mt-1.5 font-sans text-h4 font-semibold">{value}</dd></div>)}</dl></Reveal><Reveal className="col-span-5"><PaidCampaignVisual /><ReviewProof serviceId="paid-social" heading="Paid social backed by verified client trust" className="mt-6" /></Reveal></div></div></section>;
}

export function PaidSocialGoals() {
  return <Band label="Define the goal" tone="navy"><Reveal><div className="grid grid-cols-12 gap-x-12 gap-y-10 max-lg:block"><div className="col-span-5 max-lg:mb-10"><p className="text-[14px] font-semibold uppercase tracking-[0.15em] text-[#9bc3f3]">Brand visibility, interaction, visits and conversions</p><h2 className="mt-5 font-sans text-h2 font-semibold">Make the platform, audience and budget answer the business goal.</h2><p className="mt-5 text-body leading-relaxed text-oninverse/68">We plan every paid social campaign around the platform where your buyers actually spend time, whether that is Facebook, Instagram, TikTok or LinkedIn, then build the targeting, creative and budget to match the goal. Getting paid advertising on social media right starts with three questions.</p></div><div className="col-span-7"><p className="mb-5 text-body leading-relaxed text-oninverse/58">Three questions worth answering before a campaign launches:</p><ol className="grid gap-4">{content.strategyQuestions.map((question,index)=><li key={question} className="flex gap-5 rounded-card border border-oninverse/12 bg-oninverse/[0.04] p-6"><span className="text-body font-semibold text-[#ef8067]">0{index+1}</span><p className="text-body leading-relaxed text-oninverse/82">{question}</p></li>)}</ol></div></div><div className="mt-10 border-t border-oninverse/12 pt-6"><p className="text-body leading-relaxed text-oninverse/62">Platform audiences shift constantly, so we work from current Meta and platform figures at the point of planning rather than quoting a fixed number here.</p></div></Reveal></Band>;
}

export function PaidSocialCapabilities() {
  return <Band label="How we can help" tone="mist"><Reveal><div><h2 className="font-sans text-h2 font-semibold">Six connected levers for better paid social advertising.</h2><p className="mt-5 text-body leading-relaxed text-ink/68">As a paid social marketing agency, we treat audience, creative, measurement, budget, testing and ongoing optimisation as one campaign system rather than six separate tasks.</p></div><div className="mt-11 grid grid-cols-2 gap-5 max-md:grid-cols-1">{content.capabilities.map((item,index)=><article key={item.title} className={`${index===0 || index===5 ? "bg-[#000] text-oninverse" : "bg-surface text-ink"} surface-card rounded-card border border-[#bfd1e3] p-7`}><div className="flex items-start justify-between gap-4"><span className={`text-body font-semibold ${index===0 || index===5 ? "text-[#ffac99]" : "text-amber-deep"}`}>0{index+1}</span><span className={`h-px w-12 ${index===0 || index===5 ? "bg-oninverse/15" : "bg-[#bfd1e3]"}`} /></div><h3 className="mt-5 font-sans text-h4 font-semibold">{item.title}</h3><p className={`mt-3 text-body leading-relaxed ${index===0 || index===5 ? "text-oninverse/68" : "text-ink/70"}`}>{item.body}</p></article>)}</div></Reveal></Band>;
}

export function PaidSocialPricing() {
  return <Band label="Published packages" id="packages"><Reveal><div><h2 className="font-sans text-h2 font-semibold">Transparent paid social advertising packages for businesses ready to grow.</h2><p className="mt-5 text-body leading-relaxed text-ink/68">Our paid social media marketing services come in three published packages. The management price, minimum ad spend and every inclusion are shown separately, so you can see exactly what you are paying for.</p></div><div className="mt-11 grid grid-cols-3 gap-6 max-lg:grid-cols-1">{content.packages.map((pkg,index)=><article key={pkg.name} className={`rounded-card border p-7 ${index===1 ? "border-[#ef8067] bg-tint-rose" : "border-line bg-surface"}`}><p className="text-[14px] font-semibold uppercase tracking-[0.15em] text-amber-deep">0{index+1} · Paid social</p><h3 className="mt-4 font-sans text-h3 font-semibold">{pkg.name}</h3><p className="mt-2 text-body leading-relaxed text-muted">{pkg.bestFor}</p><div className="mt-6 grid grid-cols-2 border-y border-line py-5"><div><p className="text-[14px] uppercase tracking-[0.12em] text-muted">Management</p><p className="mt-1 font-sans text-[29px] font-semibold">{pkg.price}</p></div><div className="border-l border-line pl-4"><p className="text-[14px] uppercase tracking-[0.12em] text-muted">Minimum ad spend</p><p className="mt-1 font-sans text-[29px] font-semibold">{pkg.adSpend}</p></div></div><ul className="mt-5 grid gap-2.5">{pkg.features.map(feature=><li key={feature} className="flex gap-3 text-body leading-relaxed text-ink/74"><Check className="mt-0.5 size-4 shrink-0 text-amber-deep" />{feature}</li>)}</ul><div className="mt-7"><Button href="/contact" small data-event="paid_social_package_select" data-package={pkg.name}>Discuss {pkg.name}</Button></div></article>)}</div><div className="mt-8 rounded-card border border-line bg-warm p-6 text-body leading-relaxed text-muted"><p>Packages include copywriting and content creation aligned to your existing brand. If you need a new brand palette, the account manager can explain the separate branding packages available.</p><p className="mt-3">Social creative includes one review. Assets may be adapted across platforms and optimised for each placement. The published packages have a minimum three-month term.</p></div></Reveal></Band>;
}
