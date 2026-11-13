import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";
import { FinalCta, type CtaAction } from "@/components/ui/FinalCta";
import { ServiceFaqSection } from "@/components/services/ServiceFaqSection";
import { ServiceBand, type ServiceBandTone } from "@/components/services/ServiceBand";
import { CheckIcon as Check, HighlightedText, withLinks } from "@/components/services/ServicePrimitives";
import { Button } from "@/components/ui/Button";
import { Eyebrow, ReviewProof, type ServiceProofId } from "@/components/ui/Proof";
import { SiteTestimonials } from "@/components/Testimonials";
import { socialMediaMarketing as content } from "@/lib/content/social-media-marketing";

/* These sections are the social family's shared scaffold: /social-media-marketing-services
   renders them with its own copy by default, and the Facebook and Instagram agency pages
   pass their copy in. Layout, accent and rhythm stay identical across the three. */

export function Band({ tone = "white", ...props }: Omit<Parameters<typeof ServiceBand>[0], "accent" | "tone"> & { tone?: ServiceBandTone }) {
  return <ServiceBand {...props} tone={tone} accent="bg-[#ef8067]" />;
}

function SocialDashboard() {
  return (
    <div className="service-media-frame relative overflow-hidden rounded-card border border-line bg-[#000] p-5 text-oninverse shadow-xl" role="img" aria-label="Illustrated social media campaign planning dashboard">
      <div className="flex items-center justify-between border-b border-oninverse/10 pb-4"><span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9bc3f3]">Campaign studio</span><span className="flex gap-1.5"><i className="size-2 rounded-full bg-[#ef8067]" /><i className="size-2 rounded-full bg-[#76a9e8]" /><i className="size-2 rounded-full bg-oninverse/30" /></span></div>
      <div className="mt-5 grid grid-cols-[1.2fr_.8fr] gap-4 max-sm:grid-cols-1">
        <div className="rounded-xl bg-surface p-5 text-ink"><p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-amber-deep">Content calendar</p><div className="mt-4 grid grid-cols-4 gap-2">{Array.from({ length: 12 }).map((_, i) => <span key={i} className={`aspect-square rounded-md ${[1,4,6,9,10].includes(i) ? "bg-[#ef8067]" : i === 7 ? "bg-[#76a9e8]" : "bg-tint-blue"}`} />)}</div><div className="mt-5 h-2 rounded-full bg-tint-blue"><span className="block h-full w-[72%] rounded-full bg-[var(--color-teal)]" /></div></div>
        <div className="grid gap-4"><div className="rounded-xl border border-oninverse/12 bg-oninverse/[0.045] p-4"><p className="text-[10px] uppercase tracking-[0.13em] text-oninverse/50">Channels</p><p className="mt-2 font-sans text-[26px] font-semibold">4</p></div><div className="rounded-xl border border-oninverse/12 bg-oninverse/[0.045] p-4"><p className="text-[10px] uppercase tracking-[0.13em] text-oninverse/50">Status</p><p className="mt-2 text-[18px] font-semibold text-[#a8dfd8]">Ready for review</p></div></div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[10px] font-semibold uppercase tracking-[0.1em] text-oninverse/55"><span className="rounded-lg border border-oninverse/10 py-3">Create</span><span className="rounded-lg border border-oninverse/10 py-3">Approve</span><span className="rounded-lg border border-oninverse/10 py-3">Report</span></div>
    </div>
  );
}

// Published-package facts shared by every page in the family.
export const socialHeroStats: readonly (readonly [string, string])[] = [["Packages from", "£450"], ["Term", "3 months"], ["Onboarding", "24 hours"]];

export function SocialHero({
  eyebrow = content.hero.eyebrow,
  title = content.hero.title,
  highlight = "Growing UK Businesses",
  body = content.hero.body,
  primary = { label: "Discuss Social Media Marketing Services", event: "social_hero_cta_click" },
  secondary = { label: "View Social Media Packages", event: "social_packages_click" },
  stats = [["Social media marketing services packages from", "£450"], ...socialHeroStats.slice(1)],
  visual = <SocialDashboard />,
  proofId = "social-media",
  proofHeading = "Social media work backed by verified client trust",
}: {
  eyebrow?: string;
  title?: string;
  highlight?: string;
  body?: string;
  primary?: { label: string; event: string };
  secondary?: { label: string; event: string };
  stats?: readonly (readonly [string, string])[];
  visual?: ReactNode;
  proofId?: ServiceProofId;
  proofHeading?: string;
}) {
  return (
    <section className="hero-grid overflow-x-clip border-b border-line bg-warm">
      <div className="container-omh pb-[clamp(56px,38px+2.9vw,88px)] pt-[clamp(48px,34px+2.3vw,80px)]">
        <div className="grid grid-cols-12 items-center gap-x-12 gap-y-12 max-lg:block">
          <Reveal className="col-span-7 max-lg:mb-12"><Eyebrow>{eyebrow}</Eyebrow><h1 className="mb-6 mt-7 font-sans text-display font-semibold text-balance"><HighlightedText text={title} highlight={highlight} /></h1><p className="mb-9 text-body leading-relaxed text-ink/75">{body}</p><div className="flex flex-wrap gap-3.5 max-sm:flex-col"><Button href="/contact" arrow data-event={primary.event}>{primary.label}</Button><Button href="#packages" variant="secondary" data-event={secondary.event}>{secondary.label}</Button></div><dl className="mt-10 grid max-w-[650px] grid-cols-3 items-end border-t border-line pt-7 max-sm:grid-cols-1 max-sm:gap-5">{stats.map(([label,value]) => <div key={label} className="border-l border-line pl-5 first:border-l-0 first:pl-0 max-sm:border-l-0 max-sm:pl-0"><dt className="text-[14px] font-semibold uppercase tracking-[0.13em] text-muted">{label}</dt><dd className="mt-1.5 font-sans text-h4 font-semibold">{value}</dd></div>)}</dl></Reveal>
          <Reveal className="col-span-5">{visual}<ReviewProof serviceId={proofId} heading={proofHeading} className="mt-6" /></Reveal>
        </div>
      </div>
    </section>
  );
}

export function SocialGoals({
  label = "Define the goal for your social media marketing services",
  eyebrow = "Need help?",
  title = "Start with the outcome, not the posting schedule.",
  body = "Social media marketing services can include text, images, video, community activity and organic promotion. A clear strategy keeps those activities connected to the business goal and makes sure every post works toward a measurable result.",
  goals = content.goals,
  note = "Platform audiences shift constantly, so we work from current platform figures at the point of planning rather than quoting a fixed number here.",
}: { label?: string; eyebrow?: string; title?: string; body?: string; goals?: readonly string[]; note?: ReactNode }) {
  return <Band label={label} id="need-help" tone="navy"><Reveal><div className="grid grid-cols-12 gap-x-12 gap-y-10 max-lg:block"><div className="col-span-5 max-lg:mb-10"><p className="text-[14px] font-semibold uppercase tracking-[0.15em] text-[#9bc3f3]">{eyebrow}</p><h2 className="mt-5 font-sans text-h2 font-semibold">{title}</h2><p className="mt-5 text-body leading-relaxed text-oninverse/68">{body}</p></div><ol className="col-span-7 grid grid-cols-2 gap-4 max-md:grid-cols-1">{goals.map((goal,index)=><li key={goal} className="rounded-card border border-oninverse/12 bg-oninverse/[0.04] p-6"><span className="text-body font-semibold text-[#ef8067]">0{index+1}</span><p className="mt-4 text-body leading-relaxed text-oninverse/82">{goal}</p></li>)}</ol></div><div className="mt-10 flex flex-wrap items-center justify-between gap-5 border-t border-oninverse/12 pt-6"><p className="text-body leading-relaxed text-oninverse/62">{note}</p><Button href="/contact" variant="ghost-white" small>Talk Through Your Goals</Button></div></Reveal></Band>;
}

export function SocialSupport({
  label = "Social Media Marketing Management Services",
  title = "Creative, optimisation and account management in one joined-up social media marketing agency service.",
  body = "From branded assets and profile design through to account refreshes and review management.",
  items = content.support,
}: { label?: string; title?: string; body?: string; items?: readonly { title: string; body: string }[] }) {
  return <Band label={label} id="how-can-help" tone="mist"><Reveal><div><h2 className="font-sans text-h2 font-semibold">{title}</h2>{body && <p className="mt-5 text-body leading-relaxed text-ink/68">{body}</p>}</div><div className="mt-11 grid grid-cols-3 gap-5 max-lg:grid-cols-2 max-md:grid-cols-1">{items.map((item,index)=><article key={item.title} className="surface-card rounded-card border border-[#bfd1e3] bg-surface p-7"><span className="text-body font-semibold text-amber-deep">0{index+1}</span><h3 className="mt-4 font-sans text-h4 font-semibold">{item.title}</h3><p className="mt-3 text-body leading-relaxed text-ink/70">{item.body}</p></article>)}</div></Reveal></Band>;
}

export function SocialPricing({
  label = "Social Media Marketing Services Packages",
  title = "Affordable social media marketing services packages for small businesses that want to grow.",
  body = "Three packages with clear prices, channel volumes and inclusions, so you can compare them side by side.",
  notes = [
    "Our social media marketing services packages include copywriting and content creation aligned to your existing brand. If you do not have an established brand palette, we can discuss the options available.",
    "Social creative includes one review. Content is adapted across platforms and optimised for each channel. All packages have a minimum three-month term. View our [social media marketing services pricing](/pricing) for the full breakdown.",
  ],
  event = "social",
}: { label?: string; title?: string; body?: string; notes?: readonly string[]; event?: string }) {
  return <Band label={label} id="packages"><Reveal><div><h2 className="font-sans text-h2 font-semibold">{title}</h2><p className="mt-5 text-body leading-relaxed text-ink/68">{body}</p></div><div className="mt-11 grid grid-cols-3 gap-6 max-lg:grid-cols-1">{content.packages.map((pkg,index)=><article key={pkg.name} className={`rounded-card border p-7 ${index===1 ? "border-[#ef8067] bg-tint-rose" : "border-line bg-surface"}`}><p className="text-[14px] font-semibold uppercase tracking-[0.15em] text-amber-deep">0{index+1} · Social media marketing</p><h3 className="mt-4 font-sans text-h3 font-semibold">{pkg.name}</h3><p className="mt-2 text-body leading-relaxed text-muted">{pkg.bestFor}</p><p className="mt-6 border-y border-line py-5 font-sans text-[36px] font-semibold">{pkg.price}<span className="ml-1 text-body font-normal text-muted">published price</span></p><ul className="mt-5 grid gap-2.5">{pkg.features.map(feature=><li key={feature} className="flex gap-3 text-body leading-relaxed text-ink/74"><Check className="mt-0.5 size-4 shrink-0 text-amber-deep" />{feature}</li>)}</ul><div className="mt-7"><Button href="/contact" small data-event={`${event}_package_select`} data-package={pkg.name}>Discuss {pkg.name} Package</Button></div></article>)}</div><div className="mt-8 rounded-card border border-line bg-warm p-6 text-body leading-relaxed text-muted">{notes.map((note, i) => <p key={note} className={i ? "mt-3" : undefined}>{withLinks(note)}</p>)}</div></Reveal></Band>;
}

export function SocialGuaranteeAndReporting({
  guarantee,
  reporting,
}: {
  guarantee?: { label?: string; title?: string; body: string | readonly string[] };
  reporting?: { label?: string; eyebrow?: string; title: string; intro?: string; body?: readonly string[]; items?: readonly { term: string; body: string }[] };
}) {
  const guaranteeBody =
    typeof guarantee?.body === "string"
      ? [guarantee.body, "Start working with Online Marketing Help to move your business forward."]
      : guarantee?.body ?? ["Our experience gives us confidence in the work. [CONFIRM SERVICE DETAIL: exact guarantee terms] Deciding to work together easier.", "Start working with Online Marketing Help to move your business forward."];
  const reportingBody = reporting?.body ?? [
    "Your account manager provides regular monthly updates and a consultation call so there is enough data to explain what has been achieved, where your objectives stand and whether the campaign is meeting or exceeding them.",
    "Your report is tailored to the goals you set, without burying you in irrelevant detail. If you want to understand a specific part of the work, use the monthly call to ask. The purpose is to make achievements, results and month-on-month progress clear.",
  ];
  const eyebrow = reporting && "eyebrow" in reporting ? reporting.eyebrow : "Looking for more information?";
  return (
    <>
      <Band label={guarantee?.label ?? "Guarantee"} tone="navy"><Reveal><div className="grid grid-cols-12 gap-x-12 gap-y-9 max-lg:block"><div className="col-span-5 max-lg:mb-8"><p className="text-[14px] font-semibold uppercase tracking-[0.15em] text-[#9bc3f3]">Don’t just take our word for it</p><h2 className="mt-5 font-sans text-h2 font-semibold">{guarantee?.title ?? "A published money-back promise, ready for final terms."}</h2></div><div className="col-span-7">{guaranteeBody.map((paragraph, i) => <p key={paragraph} className={`text-body leading-relaxed text-oninverse/72 ${i ? "mt-4" : ""}`}>{paragraph}</p>)}</div></div></Reveal></Band>
      <Band label={reporting?.label ?? "Resources"} tone="mist"><Reveal><div className="grid grid-cols-12 gap-x-12 gap-y-9 max-lg:block"><div className="col-span-4 max-lg:mb-8">{eyebrow && <p className="text-[14px] font-semibold uppercase tracking-[0.15em] text-amber-deep">{eyebrow}</p>}<h2 className={`font-sans text-h2 font-semibold ${eyebrow ? "mt-5" : ""}`}>{reporting?.title ?? "Reporting that stays tied to your goals."}</h2>{reporting?.intro && <p className="mt-5 text-body leading-relaxed text-ink/70">{reporting.intro}</p>}</div><div className="col-span-8 space-y-5 text-body leading-relaxed text-ink/70">{reporting?.items ? reporting.items.map((item) => <div key={item.term} className="rounded-card border border-[#bfd1e3] bg-surface p-7"><h3 className="font-sans text-h4 font-semibold text-ink">{item.term}</h3><p className="mt-3">{item.body}</p></div>) : reportingBody.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></div></Reveal></Band>
    </>
  );
}

export function SocialReviews({ label, title = "What customers say.", eventPrefix = "social" }: { label?: string; title?: string; eventPrefix?: string }) {
  return <SiteTestimonials label={label} eventPrefix={eventPrefix} title={title} body="Comments from businesses we have worked with. They describe their experience, not a guaranteed result." accent="bg-[#ef8067]" />;
}

export function SocialFAQ({
  label = "FAQs",
  title = "Looking for more information?",
  description = "The eleven questions we are asked most often.",
  items = content.faqs,
  group = "social-faq",
}: { label?: string; title?: string; description?: string; items?: readonly { q: string; a: string }[]; group?: string }) {
  return (
    <ServiceFaqSection
      label={label}
      title={title}
      description={description}
      items={items}
      group={group}
      tone="mist"
      bandAccent="bg-[#ef8067]"
      headingSize="lg"
      headingMaxWidthClassName=""
      descriptionClassName="text-body text-ink/68"
      sticky={false}
    />
  );
}

export function SocialFinalCTA({
  title = "Want your social media handled consistently?",
  titleAccent = "handled consistently?",
  body = "Book a call at a convenient time, or speak to the team directly. We will look at what you are posting now before recommending a plan.",
  primaryLabel = "Discuss Social Media Support",
  secondary = { label: "Request a Paid Social Quote", href: "/social-media-paid-marketing-request-quote", event: "social_quote_start" },
  stepsHeading,
  eventPrefix = "social",
}: { title?: string; titleAccent?: string; body?: string; primaryLabel?: string; secondary?: CtaAction; stepsHeading?: string; eventPrefix?: string }) {
  return (
    <FinalCta
      title={title}
      titleAccent={titleAccent}
      body={body}
      primary={{ label: primaryLabel, event: `${eventPrefix}_final_cta_click` }}
      secondary={secondary}
      stepsHeading={stepsHeading}
      contactEvents={{ phone: `${eventPrefix}_phone_click`, email: `${eventPrefix}_email_click` }}
    />
  );
}
