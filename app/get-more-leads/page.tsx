import type { Metadata } from "next";
import Link from "next/link";
import { CircleCheck, Landmark, Layers3, MapPin, MonitorUp, MousePointerClick, PhoneCall, Search, Users, type LucideIcon } from "lucide-react";
import { GrowthReviewForm } from "@/components/forms/GrowthReviewForm";
import { Reveal } from "@/components/Reveal";
import { ServiceBand } from "@/components/services/ServiceBand";
import { ArrowRight } from "@/components/ui/Button";
import { BookDemo } from "@/components/BookDemo";
import { FinalCta } from "@/components/ui/FinalCta";
import Image from "@/components/ui/SiteImage";
import { caseStudies } from "@/lib/content/case-studies";
import { finalCta, hero, stats } from "@/lib/content/home";
import { CASE_STUDIES_LIVE } from "@/lib/flags";

export const metadata: Metadata = {
  title: "Free Growth Review for UK Businesses",
  description:
    "Google Ads, Meta Ads, SEO and websites for UK businesses, under one roof. Leave your details and we'll review your current activity for free.",
  alternates: { canonical: "https://onlinemarketinghelp.co.uk/get-more-leads" },
};

const promises = ["Free, no-obligation review", "Ads, SEO and websites under one roof", "Clear reporting on each pound spent"];

const statIcons: LucideIcon[] = [Users, Layers3, Landmark, MapPin];

const offers: { tag: string; title: string; body: string; href: string; icon: LucideIcon }[] = [
  {
    tag: "Paid ads",
    title: "Google & Meta Ads",
    body: "We focus on the searches most likely to produce real enquiries, not vanity clicks.",
    href: "/google-adwords-ppc",
    icon: MousePointerClick,
  },
  {
    tag: "Search",
    title: "SEO & Local Search",
    body: "Get found on Google when local customers search for what you do.",
    href: "/local-seo",
    icon: Search,
  },
  {
    tag: "Websites",
    title: "Websites that Convert",
    body: "Pages built to turn visitors into calls, bookings and sales.",
    href: "/website-designs",
    icon: MonitorUp,
  },
  {
    tag: "AI",
    title: "AI Voice Agents",
    body: "Every call answered, day or night, so no enquiry is missed.",
    href: "/ai-voice-agents",
    icon: PhoneCall,
  },
];

// Read from the published case study, so this number can't drift from it (design rule 15). Fails the build if it goes.
const restaurant = caseStudies.find((s) => s.slug === "fine-dining")!;
const restaurantTraffic = restaurant.results.find((r) => r.label === "Organic-traffic increase")!.value;

export default function GetMoreLeadsPage() {
  return (
    <>
      <ServiceBand label="Free growth review" labelStyle="none" className="hero-grid">
        {/* Phones (client, 2 Nov 2026): title, then the form, then the rest of the copy. From lg the copy's two halves
            stack in the left column and the form spans both rows on the right. */}
        <div className="grid gap-y-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(440px,0.78fr)] lg:gap-x-[clamp(48px,7vw,116px)] lg:gap-y-0">
          <div className="hero-in lg:self-end">
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-body font-semibold text-ink shadow-[0_12px_28px_-24px_rgb(0_0_0/0.55)]">
              <span className="size-1.5 rounded-full bg-amber" aria-hidden />
              {hero.eyebrow}
            </p>
            <h1 className="mt-8 font-sans text-display font-semibold">
              More enquiries for UK businesses, <span className="text-amber-deep">from one joined-up team.</span>
            </h1>
          </div>
          <div id="free-review" className="hero-in hero-in-2 scroll-mt-28 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
            <GrowthReviewForm />
          </div>
          <div className="hero-in lg:self-start lg:pt-7">
            <p className="text-body leading-relaxed text-ink/75">
              Leave your details while your car gets washed. We will review your current activity and recommend the
              clearest next step. Free, in plain English.
            </p>
            <ul className="mt-8 grid gap-3">
              {promises.map((item) => (
                <li key={item} className="flex items-center gap-3 text-body font-semibold text-ink/80">
                  <CircleCheck className="size-5 shrink-0 text-amber-deep" strokeWidth={1.8} aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </ServiceBand>

      <section className="border-y border-line bg-surface text-ink">
        <div className="stats-grid container-omh grid grid-cols-4 divide-x divide-line max-lg:grid-cols-2 max-lg:divide-x-0">
          {stats.map((stat, index) => {
            const StatIcon = statIcons[index];
            return (
              <div key={stat.label} className="stat-item px-8 py-11 first:pl-0 max-lg:px-6 max-lg:odd:pl-0 max-sm:py-8 max-sm:pr-3">
                <span className="grid size-12 place-items-center rounded-[8px] bg-teal/15 text-amber-deep" aria-hidden>
                  <StatIcon className="size-6" strokeWidth={1.7} />
                </span>
                <p className="mt-5 whitespace-nowrap font-sans text-[clamp(28px,22px+2.2vw,54px)] font-semibold leading-none text-amber-deep">
                  {stat.value}
                </p>
                <p className="mt-3 text-body font-semibold text-ink/65">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      <ServiceBand label="See it in action" labelStyle="dot" tone="dark" className="dark-grid">
        <Reveal>
          <h2 className="font-sans text-h2 font-semibold">
            You run the business. <span className="text-[#7d5c33]">We fill the diary.</span>
          </h2>
          <p className="mt-5 text-body leading-relaxed text-oninverse/70">
            We plan, build and run your Google Ads, Meta Ads, SEO and website under one roof, then show you clearly what
            each pound brings back.
          </p>
          <figure className="image-hover-frame media-shine relative mt-10 aspect-[21/9] overflow-hidden rounded-media border border-oninverse/10 bg-inverse max-lg:aspect-[16/9] max-sm:aspect-[4/5]">
            <Image
              src="/images/home/agency-collaboration.webp"
              alt="Online Marketing Help team planning a digital marketing strategy"
              fill
              sizes="(max-width: 1536px) 100vw, 1440px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(0_0_0/0.6),transparent_35%),linear-gradient(20deg,rgb(0_0_0/0.85)_15%,rgb(0_0_0/0.2)_75%)]" />
            <figcaption className="absolute inset-0 flex flex-col justify-between p-[clamp(24px,4vw,56px)] text-oninverse">
              <Image src="/images/logo-white.png" alt="" width={140} height={36} className="h-auto w-[140px]" />
              <div>
                <span className="inline-flex rounded-full bg-teal px-3 py-1.5 text-[14px] font-semibold text-white">Free growth review</span>
                <span className="mt-4 block font-sans text-h2 font-semibold">More enquiries. One joined-up team.</span>
              </div>
            </figcaption>
          </figure>
        </Reveal>
      </ServiceBand>

      <ServiceBand label="Our services" labelStyle="dot" tone="mist">
        <Reveal>
          <h2 className="font-sans text-h2 font-semibold text-balance">
            Everything you need to grow, <span className="text-amber-deep">under one roof</span>
          </h2>
          <div className="mt-10 grid grid-cols-4 gap-5 max-xl:grid-cols-2 max-sm:grid-cols-1">
            {offers.map((offer) => (
              <Link key={offer.title} href={offer.href} className="surface-card group flex flex-col rounded-card border border-line bg-surface p-7">
                <span className="grid size-12 place-items-center rounded-[8px] bg-teal/15 text-amber-deep" aria-hidden>
                  <offer.icon className="size-6" strokeWidth={1.7} />
                </span>
                <p className="mt-6 text-[14px] font-semibold uppercase tracking-[0.16em] text-amber-deep">{offer.tag}</p>
                <h3 className="mt-2 font-sans text-h4 font-semibold">{offer.title}</h3>
                <p className="mb-6 mt-3 text-body leading-relaxed text-ink/70">{offer.body}</p>
                <ArrowRight className="mt-auto size-5 text-amber-deep transition-transform duration-500 group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </Reveal>
      </ServiceBand>

      <FinalCta
        title={CASE_STUDIES_LIVE ? `${restaurantTraffic} more organic traffic for one of our restaurant clients.` : finalCta.headline}
        titleAccent={CASE_STUDIES_LIVE ? restaurantTraffic : undefined}
        body={finalCta.body}
        primary={{ label: finalCta.primary.label, href: "#free-review", event: "get_more_leads_final_cta_click" }}
        secondary={CASE_STUDIES_LIVE ? { label: "Read the case study", href: `/case-studies/${restaurant.slug}`, event: "get_more_leads_case_study_click" } : undefined}
        steps={["Review your current activity", "Find the clearest next step", "Build a connected growth plan"]}
        contactEvents={{ phone: "get_more_leads_phone_click", email: "get_more_leads_email_click" }}
      />
      <BookDemo />
    </>
  );
}
