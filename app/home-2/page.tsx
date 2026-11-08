import type { Metadata } from "next";
import Image from "@/components/ui/SiteImage";
import Link from "next/link";
import {
  Activity,
  BarChart3,
  Blocks,
  Crown,
  Gauge,
  Globe2,
  Layers3,
  MonitorUp,
  MousePointerClick,
  Quote,
  Search,
  ShoppingBag,
  Store,
  Target,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getSearchIndex } from "@/lib/content/search-index";
import "./home2.css";
import { Pointer } from "@/components/Pointer";
import { ArrowRight, Button } from "@/components/ui/Button";
import { FinalCta } from "@/components/ui/FinalCta";
import { Accordion } from "@/components/ui/Accordion";
import { withLinks } from "@/components/services/ServicePrimitives";
import { faqSchema, JsonLd } from "@/lib/schema";
import {
  difference,
  featuredCase,
  featuredHeading,
  finalCta,
  hero,
  homeFaqs,
  homeMeta,
  programs,
  recognition,
  services,
  stats,
  supportingCases,
  testimonials,
  whoWeWorkWith,
} from "@/lib/content/home";
import { getFeaturedInsights } from "@/lib/sanity/insights";
import { insightHref } from "@/lib/content/insights-types";
import { CASE_STUDIES_LIVE } from "@/lib/flags";

export const metadata: Metadata = {
  title: { absolute: homeMeta.title },
  // Preview of the black / white / gold direction (25 Oct 2026). Hidden from search until chosen.
  robots: { index: false, follow: false },
  description: homeMeta.description,
  alternates: { canonical: "https://onlinemarketinghelp.co.uk/home-2" },
  openGraph: {
    title: homeMeta.title,
    description: homeMeta.ogDescription,
    url: "https://onlinemarketinghelp.co.uk/",
    siteName: "Online Marketing Help",
    locale: "en_GB",
    type: "website",
  },
};

const whoIcons: LucideIcon[] = [Store, ShoppingBag, Layers3, Users];

function StarRating({ label }: { label: string }) {
  return (
    <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-body font-semibold text-ink shadow-[0_12px_28px_-24px_rgb(0_0_0/0.55)]">
      {/* ponytail: no star glyphs — five stars next to no rating reads as a
          review score, which brief §6/§33 forbids inventing. Restore only
          alongside a real, attributed rating. */}
      <span className="size-1.5 rounded-full bg-amber" aria-hidden />
      {label}
    </p>
  );
}

function CardArrow({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-line bg-warm text-amber-deep transition-[color,background-color,border-color,box-shadow,transform] duration-500 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-[1.035] group-hover:border-teal group-hover:bg-teal group-hover:text-white group-hover:shadow-[0_12px_26px_-18px_rgb(var(--accent-rgb)/0.8)] max-sm:size-10 ${className}`}>
      <ArrowRight className="size-5 transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:translate-x-0.5" />
    </span>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-3 font-sans text-[18px] font-semibold uppercase tracking-[0.14em] text-muted before:h-0.5 before:w-5 before:bg-amber before:content-['']">
      {children}
    </p>
  );
}

const programIcons: LucideIcon[] = [Zap, Activity, MonitorUp, Crown];
const recognitionIcons: LucideIcon[] = [
  Target,
  MousePointerClick,
  BarChart3,
  Gauge,
  Blocks,
  Globe2,
  Search,
  Layers3,
];

export default async function Home2() {
  const searchEntries = await getSearchIndex();
  const featured = await getFeaturedInsights();
  const insights = featured.map((post) => ({
    category: post.topic.name,
    title: post.title,
    body: post.summary,
    href: insightHref(post),
    image: post.featuredImage,
  }));

  return (
    // ponytail: same markup as app/page.tsx; the palette is swapped by the CSS variables in home2.css,
    // which also hides the root layout header/footer so this page can carry its own recoloured pair.
    // If this direction is chosen, move the .home2 variables to :root and delete this page.
    <div className="home2">
      <Header searchEntries={searchEntries} />
      <section className="hero-grid relative overflow-x-clip border-b border-line bg-warm">
        <div className="container-omh grid min-h-[680px] grid-cols-[minmax(0,0.92fr)_minmax(440px,0.78fr)] items-center gap-[clamp(48px,7vw,116px)] py-[clamp(40px,3.5vw,60px)] max-lg:min-h-0 max-lg:grid-cols-1 max-lg:gap-8 max-sm:gap-8">
          {/* Above the fold: a CSS entrance (.hero-in) rather than <Reveal>, which waits for JS and held the
              headline back from painting (PageSpeed, 21 Oct 2026). */}
          <div className="hero-in relative z-10">
            <StarRating label={hero.eyebrow} />
            <h1 className="mb-7 mt-8 font-sans text-display font-semibold max-lg:max-w-none">
              Full-service digital marketing agency for <span className="text-amber-deep">UK businesses</span>
            </h1>
            <p className="mb-10 text-body leading-relaxed text-ink/75 max-lg:max-w-none">
              {hero.standfirst}
            </p>
            <div className="flex flex-wrap items-center gap-4 max-sm:flex-col max-sm:items-stretch">
              <Button href={hero.primaryCta.href} arrow>
                {hero.primaryCta.label}
              </Button>
              <Button href={hero.secondaryCta.href} variant="secondary">
                {hero.secondaryCta.label}
              </Button>
            </div>
            <div className="mt-12 grid max-w-[650px] grid-cols-3 border-y border-line py-5 max-lg:max-w-none max-sm:grid-cols-1 max-sm:gap-4">
              {["Strategy first", "Senior delivery", "Clear reporting"].map((item, index) => (
                <p key={item} className="flex items-center gap-3 text-body font-semibold text-ink/65">
                  <span className="font-sans text-[18px] text-amber-deep">0{index + 1}</span>
                  {item}
                </p>
              ))}
            </div>
          </div>

          <div className="hero-in hero-in-2 relative max-lg:mx-auto max-lg:w-full max-lg:max-w-[760px]">
            <Pointer className="hero-media relative mb-9">
              <div className="pointer-parallax relative">
              <div className="image-hover-frame media-shine relative aspect-[4/5] overflow-hidden rounded-[12px] bg-inverse shadow-[0_36px_90px_-42px_rgb(0_0_0/0.48)] max-lg:aspect-[16/10] max-sm:aspect-[4/5]">
                <Image
                  src="/images/home/campaign-review.webp"
                  alt="Full-service digital marketing agency team reviewing campaign and website performance"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 44vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_48%,rgb(0_0_0/0.72)_100%)]" />
                <p className="absolute bottom-36 left-7 right-7 font-sans text-[22px] font-semibold leading-snug text-oninverse max-sm:bottom-32 max-sm:text-body">
                  Decisions grounded in the campaign, the website, and the numbers.
                </p>
              </div>
              <div className="absolute -bottom-7 -left-8 w-[250px] rounded-[12px] border border-oninverse/15 bg-inverse p-5 text-oninverse shadow-[0_24px_60px_-24px_rgb(0_0_0/0.65)] max-sm:-bottom-10 max-sm:left-4">
                <p className="text-[18px] font-semibold uppercase tracking-[0.12em] text-amber">Connected delivery</p>
                <p className="mt-2 text-body font-semibold">Plan &rarr; Build &rarr; Measure</p>
              </div>
              <div className="absolute -right-5 top-9 flex items-center gap-3 rounded-full border border-line bg-warm py-2.5 pl-2.5 pr-5 text-ink max-sm:right-3 max-sm:top-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-teal text-white"><Gauge className="size-5" aria-hidden /></span>
                <span className="text-[18px] font-semibold">Growth ready</span>
              </div>
              </div>
            </Pointer>
          </div>
        </div>
      </section>

      <section className="dark-grid border-y border-oninverse/10 bg-inverse py-[clamp(88px,9vw,144px)] text-oninverse">
        <div className="container-omh">
          <Reveal>
            <div className="mx-auto max-w-[1120px] text-center">
              <p className="font-sans text-[18px] font-semibold uppercase tracking-[0.14em] text-amber">
                Our programs
              </p>
              <h2 className="mt-5 font-sans text-h2 font-semibold">
                Digital marketing programs for <span className="text-amber-deep">growing UK businesses</span>
              </h2>
              <p className="mx-auto mt-5 max-w-[850px] text-body leading-relaxed text-oninverse/68">
                Pick the starting point that matches your goal. Each program brings paid ads, SEO,
                website work and reporting together, so every channel pushes towards the same result.
              </p>
            </div>

            <div className="mt-16 grid grid-cols-4 gap-6 max-xl:grid-cols-2 max-sm:grid-cols-1">
              {programs.map((program, index) => {
                const ProgramIcon = programIcons[index];
                return (
                  <Link key={program.title} href={program.href} className="program-card group min-h-[410px] max-sm:min-h-[360px]">
                    <div className="program-icon">
                      <ProgramIcon className="size-8" strokeWidth={1.8} aria-hidden />
                    </div>
                    <p className="mt-7 inline-flex self-start text-[18px] font-medium text-oninverse/60">
                      {program.range}
                    </p>
                    <h3 className="mt-5 font-sans text-[clamp(25px,22px+0.45vw,31px)] font-semibold leading-tight">
                      {program.title}
                    </h3>
                    <p className="mt-4 text-body leading-relaxed text-oninverse/65">{program.body}</p>
                    <span className="program-link mt-auto pt-8">
                      Explore program
                      <ArrowRight className="size-5" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-line bg-surface text-ink">
        <div className="stats-grid container-omh grid grid-cols-4 divide-x divide-line max-lg:grid-cols-2 max-lg:divide-x-0 max-sm:grid-cols-1">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-item px-8 py-11 first:pl-0 max-lg:px-6 max-sm:px-0">
              <p className="font-sans text-[clamp(38px,30px+1.6vw,54px)] font-semibold leading-none text-amber-deep whitespace-nowrap">
                {stat.value}
              </p>
              <p className="mt-3 text-body font-semibold text-ink/65">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {CASE_STUDIES_LIVE && (
      <section id="proof" className="container-omh py-[clamp(88px,9vw,144px)]">
        <Reveal>
          <div className="grid grid-cols-[0.74fr_1.26fr] items-start gap-[clamp(48px,7vw,112px)] max-lg:grid-cols-1 max-sm:gap-10">
            <div className="lg:sticky lg:top-24">
              <SectionLabel>Success stories</SectionLabel>
              <h2 className="mt-6 font-sans text-h2 font-semibold">
                Results from our <span className="text-amber-deep">digital marketing clients</span>
              </h2>
              <p className="mt-5 text-body leading-relaxed text-ink/75">
                Real projects across hospitality, retail, automotive and ecommerce, showing how SEO,
                content and website work came together to grow traffic and enquiries for UK businesses.
              </p>
              <div className="mt-8">
                <Button href="/case-studies" variant="secondary" arrow>
                  View all client work
                </Button>
              </div>
            </div>

            <div>
              <Pointer className="media-card group overflow-hidden rounded-[12px] bg-inverse text-oninverse">
                <div className="image-hover-frame media-shine pointer-parallax relative aspect-[4/3] overflow-hidden">
                  <Image
                    src="/images/case-studies/restaurant.webp"
                    alt="A restaurant table set for dinner"
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="grid grid-cols-[0.42fr_1fr] gap-8 p-8 max-sm:grid-cols-1 max-sm:p-6">
                  <div>
                    <p className="text-[18px] font-semibold uppercase tracking-[0.12em] text-amber">
                      Featured work
                    </p>
                    <h3 className="mt-3 font-sans text-[28px] font-semibold leading-tight">{featuredHeading}</h3>
                  </div>
                  <div>
                    <p className="text-body leading-relaxed text-oninverse/78">{featuredCase.work}</p>
                    <div className="mt-5">
                      <span className="inline-flex items-center gap-2 rounded-full border border-amber/50 px-4 py-2 text-[18px] font-semibold text-amber">
                        {featuredCase.result}
                      </span>
                    </div>
                  </div>
                </div>
              </Pointer>

              <div className="mt-8 border-t border-line">
                {supportingCases.map((item) => (
                  <Link
                    key={item.sector}
                    href={item.href}
                    className="case-row group grid grid-cols-[0.55fr_1fr_auto] items-center gap-6 border-b border-line py-6 max-sm:grid-cols-[1fr_auto] max-sm:gap-x-4 max-sm:gap-y-2"
                  >
                    <span className="font-sans text-[20px] font-semibold max-sm:col-start-1 max-sm:row-start-1">{item.sector}</span>
                    <span className="text-body leading-relaxed text-ink/70 max-sm:col-span-2 max-sm:row-start-2">{item.work}</span>
                    <CardArrow className="max-sm:col-start-2 max-sm:row-start-1" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>
      )}

      <section className="dark-grid border-y border-oninverse/10 bg-inverse py-[clamp(88px,9vw,144px)] text-oninverse">
        <div className="container-omh">
          <Reveal>
            <div className="grid grid-cols-[1fr_0.92fr] items-center gap-[clamp(64px,9vw,144px)] max-lg:grid-cols-1 max-sm:gap-12">
              <Pointer className="story-collage">
                <div className="pointer-parallax relative pb-16 pr-14 max-sm:pb-14 max-sm:pr-0">
                <div className="image-hover-frame media-shine relative aspect-[5/4] overflow-hidden rounded-[12px] border border-oninverse/10 bg-black shadow-[0_34px_80px_-32px_rgb(0_0_0/0.78)] max-sm:aspect-[4/5]">
                  <Image
                    src="/images/home/agency-collaboration.webp"
                    alt="Online Marketing Help team planning a digital marketing strategy"
                    fill
                    sizes="(max-width: 1024px) 100vw, 52vw"
                    className="object-cover"
                  />
                </div>
                <div className="image-hover-frame media-shine absolute bottom-0 left-[-22px] h-[42%] w-[43%] overflow-hidden rounded-[12px] border-4 border-teal bg-inverse shadow-[0_24px_60px_-24px_rgb(0_0_0/0.8)] max-sm:left-0 max-sm:h-[34%] max-sm:w-[50%] max-sm:border-[3px]">
                  <Image
                    src="/images/Solutions/1.jpg"
                    alt="WordPress website build being planned beside a sitemap sketch"
                    fill
                    sizes="(max-width: 640px) 42vw, 22vw"
                    className="object-cover"
                  />
                </div>
                <div className="absolute bottom-11 right-8 flex items-center gap-3 rounded-full border border-line bg-warm py-2.5 pl-2.5 pr-5 text-ink max-sm:bottom-9 max-sm:right-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-teal text-white"><Users className="size-5" aria-hidden /></span>
                  <span className="text-[18px] font-semibold">One joined-up team</span>
                </div>
                </div>
              </Pointer>

              <div>
                <p className="font-sans text-[18px] font-semibold uppercase tracking-[0.14em] text-amber">
                  Why choose us
                </p>
                <h2 className="mt-6 font-sans text-h2 font-semibold">
                  Why UK businesses choose <span className="text-amber-deep">a full-service agency</span>
                </h2>
                <p className="mt-6 text-body leading-relaxed text-oninverse/70">
                  When strategy, ads, SEO, design and reporting sit with separate suppliers, things get
                  missed and budget gets wasted. With one senior team handling all of it, every channel
                  works from the same plan and the same numbers.
                </p>
                <div className="mt-9 border-t border-oninverse/15">
                  {difference.slice(0, 3).map((item, index) => (
                    <div key={item.title} className="story-point group flex gap-5 border-b border-oninverse/15 py-5">
                      <span className="font-sans text-[18px] font-semibold text-amber-deep">0{index + 1}</span>
                      <div>
                        <h3 className="font-sans text-[21px] font-semibold">{item.title}</h3>
                        <p className="mt-2 text-body leading-relaxed text-oninverse/58">{item.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-9">
                  <Button href="/about-us" variant="inverse" arrow>
                    Learn about OMH
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-omh py-[clamp(88px,9vw,144px)]">
        <Reveal>
          <div className="grid grid-cols-[1.08fr_0.72fr] gap-[clamp(48px,8vw,128px)] max-lg:grid-cols-1">
            <div className="border-t border-line">
              {services.map((service, index) => (
                <Link
                  key={service.label}
                  href={service.href}
                  className="service-row group grid grid-cols-[72px_1fr_auto] items-center gap-5 border-b border-line py-6 max-sm:grid-cols-[36px_1fr_auto] max-sm:gap-3"
                >
                  <span className="font-sans text-body font-semibold text-amber-deep">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block font-sans text-[clamp(22px,20px+0.5vw,29px)] font-semibold">
                      {service.label}
                    </span>
                    <span className="mt-1 block text-body leading-snug text-ink/65">{service.body}</span>
                  </span>
                  <CardArrow />
                </Link>
              ))}
            </div>
            <div className="order-first lg:order-last lg:sticky lg:top-24 lg:self-start">
              <SectionLabel>Services</SectionLabel>
              <h2 className="mt-6 font-sans text-h2 font-semibold">
                Our <span className="text-amber-deep">digital marketing services</span>
              </h2>
              <p className="mt-5 text-body leading-relaxed text-ink/75">
                Use one specialist service or combine several around a single commercial goal. The
                same team delivers all of them, so your campaigns, website and reporting stay joined up.{" "}
                {withLinks("Never miss a call again with an [AI voice agent](/ai-voice-agents) that answers, books and follows up for you.")}
              </p>
              <div className="mt-8">
                <Button href="/pricing" variant="secondary" arrow>
                  Explore all services
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="border-y border-line bg-surface py-[clamp(88px,9vw,144px)]">
        <div className="container-omh">
          <Reveal>
            <div className="mb-12">
              <div>
                <StarRating label={CASE_STUDIES_LIVE ? "Client success stories" : "Client reviews"} />
                <h2 className="mt-6 font-sans text-h2 font-semibold">
                  What our <span className="text-amber-deep">clients say</span>
                </h2>
              </div>
              <p className="mt-5 text-body leading-relaxed text-ink/70">
                {CASE_STUDIES_LIVE
                  ? "Feedback from published client case studies across SEO, paid media and web development."
                  : "Published reviews from our clients on Trustpilot and Google."}
              </p>
            </div>

            <div className="grid grid-cols-[1.1fr_0.9fr] gap-6 max-lg:grid-cols-1">
              <figure className="quote-feature group relative flex min-h-[520px] flex-col justify-between overflow-hidden rounded-[12px] bg-inverse p-[clamp(28px,4vw,56px)] text-oninverse max-sm:min-h-[420px]">
                <Quote className="size-12 text-oninverse/22 transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:-translate-y-1 group-hover:rotate-[-4deg]" strokeWidth={1.5} aria-hidden />
                <blockquote className="my-12 font-body text-[clamp(30px,25px+1.3vw,44px)] leading-tight">
                  &ldquo;{testimonials[0].quote}&rdquo;
                </blockquote>
                <figcaption className="text-body font-semibold text-oninverse/75">
                  {testimonials[0].name}
                </figcaption>
              </figure>

              <div className="grid gap-6">
                {testimonials.slice(1).map((testimonial) => (
                  <figure
                    key={testimonial.name}
                    className="surface-card group flex flex-col justify-between rounded-[12px] border border-line p-9"
                  >
                    <blockquote className="text-[22px] leading-relaxed text-ink/85">
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-8 flex items-center justify-between gap-4 text-body font-semibold max-sm:flex-col max-sm:items-start">
                      {testimonial.name}
                      {/* ponytail: no star row — these are named, real reviewers
                          who never gave a score, so five stars would be an
                          invented rating (brief §6). */}
                      <span className="text-[18px] font-normal text-muted">Client review</span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="recognition-field overflow-hidden border-y border-line bg-warm py-[clamp(88px,9vw,144px)]">
        <div className="container-omh">
          <Reveal>
            <div className="grid grid-cols-[0.7fr_1.3fr] items-center gap-[clamp(52px,8vw,124px)] max-lg:grid-cols-1">
              <div>
                <SectionLabel>Capability map</SectionLabel>
                <h2 className="mt-6 font-sans text-h2 font-semibold">
                  The platforms we use to <span className="text-amber-deep">grow your business</span>
                </h2>
                <p className="mt-5 text-body leading-relaxed text-ink/70">
                  Every channel we run shares the same commercial goal, and the reporting ties it all
                  together so you can act on it.
                </p>
                <div className="mt-9 grid grid-cols-3 border-y border-line py-5">
                  {["Acquisition", "Conversion", "Measurement"].map((label, index) => (
                    <div key={label}>
                      <p className="font-sans text-[26px] font-semibold text-amber-deep">0{index + 1}</p>
                      <p className="mt-1 text-body font-semibold text-ink/70">{label}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <Button href="/about-us" variant="secondary" arrow>
                    Learn about our approach
                  </Button>
                </div>
              </div>

              <div className="recognition-masonry">
                {recognition.map((item, index) => {
                  const RecognitionIcon = recognitionIcons[index % recognitionIcons.length];
                  return (
                    <div key={item} className={`recognition-tile recognition-tile-${(index % 4) + 1}`}>
                      <RecognitionIcon className="size-7" strokeWidth={1.7} aria-hidden />
                      <span>{item}</span>
                      <ArrowRight className="recognition-arrow size-4" />
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Who we work with: carries the small-business and UK-wide keywords (brief §10). */}
      <section className="dark-grid border-y border-oninverse/10 bg-inverse py-[clamp(88px,9vw,144px)] text-oninverse">
        <div className="container-omh">
          <Reveal>
            <div className="grid grid-cols-[0.95fr_1.05fr] items-start gap-[clamp(48px,7vw,112px)] max-lg:grid-cols-1">
              <div>
                <p className="font-sans text-[18px] font-semibold uppercase tracking-[0.14em] text-amber">
                  {whoWeWorkWith.eyebrow}
                </p>
                <h2 className="mt-6 font-sans text-h2 font-semibold">
                  A digital marketing agency for{" "}
                  <span className="text-amber-deep">small businesses and growing UK brands</span>
                </h2>
                <p className="mt-6 text-body leading-relaxed text-oninverse/70">{whoWeWorkWith.body}</p>
                <p className="mt-6 border-l-2 border-amber pl-5 text-body leading-relaxed text-oninverse/85">
                  {whoWeWorkWith.closing}
                </p>
                <div className="mt-9">
                  <Button href={whoWeWorkWith.cta.href} variant="inverse" arrow data-event="home_who_cta_click">
                    {whoWeWorkWith.cta.label}
                  </Button>
                </div>
              </div>
              <ul className="grid grid-cols-2 gap-6 max-sm:grid-cols-1">
                {whoWeWorkWith.items.map((item, index) => {
                  const WhoIcon = whoIcons[index] ?? Store;
                  return (
                    <li key={item} className="rounded-[12px] border border-line p-9">
                      <span className="grid size-12 place-items-center rounded-full border border-line text-oninverse">
                        <WhoIcon className="size-6" strokeWidth={1.7} aria-hidden />
                      </span>
                      <p className="mt-6 font-sans text-[clamp(19px,18px+0.3vw,22px)] font-semibold leading-snug">{item}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ: answers sit in the page HTML (closed <details>), and the same array
          is published as FAQPage schema. */}
      <section className="border-b border-line bg-warm py-[clamp(88px,9vw,144px)]">
        <JsonLd data={faqSchema(homeFaqs)} />
        <div className="container-omh">
          <Reveal>
            <div className="grid grid-cols-[0.72fr_1.28fr] gap-[clamp(48px,7vw,112px)] max-lg:grid-cols-1">
              <div className="lg:sticky lg:top-24 lg:self-start">
                <SectionLabel>FAQ</SectionLabel>
                <h2 className="mt-6 font-sans text-h2 font-semibold">
                  Frequently asked <span className="text-amber-deep">questions</span>
                </h2>
                <p className="mt-5 text-body leading-relaxed text-ink/70">
                  Still have a question? Call{" "}
                  <a href="tel:+442034893934" className="font-semibold text-amber-deep underline underline-offset-4" data-event="home_faq_phone_click">
                    020 3489 3934
                  </a>
                  .
                </p>
              </div>
              <Accordion group="home-faq" heading="h3" items={homeFaqs.map((faq) => ({ q: faq.q, a: withLinks(faq.a) }))} />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line bg-surface py-[clamp(88px,9vw,144px)]">
        <div className="container-omh">
          <Reveal>
            <div className="mb-12 flex items-end justify-between gap-8 max-lg:block">
              <div>
                <SectionLabel>Latest insights</SectionLabel>
                <h2 className="mt-6 font-sans text-h2 font-semibold">Latest <span className="text-amber-deep">digital marketing insights</span></h2>
              </div>
              <Button href="/insights" variant="secondary" className="max-lg:mt-6">
                View all articles
              </Button>
            </div>

            <div className="grid grid-cols-[1.12fr_0.88fr] gap-8 max-lg:grid-cols-1">
              <Link
                href={insights[0].href}
                className="surface-card group relative isolate flex min-h-[520px] flex-col justify-between overflow-hidden rounded-[12px] bg-inverse p-[clamp(28px,4vw,52px)] text-oninverse max-sm:min-h-0 max-sm:gap-20"
              >
                {/* The card stretches to the three rows beside it; the post's cover fills that height. */}
                {insights[0].image && (
                  <>
                    <Image src={insights[0].image.src} alt="" fill sizes="(max-width: 1024px) 100vw, 56vw" className="-z-20 object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                    <div className="absolute inset-0 -z-10 bg-linear-to-t from-inverse via-inverse/80 to-inverse/40" aria-hidden />
                  </>
                )}
                <div className="flex items-center justify-between gap-4">
                  <p className="text-[18px] font-semibold uppercase tracking-[0.14em] text-amber">
                    {insights[0].category}
                  </p>
                  <CardArrow />
                </div>
                <div>
                  <h3 className="font-sans text-[clamp(32px,26px+1.5vw,50px)] font-semibold leading-tight">
                    {insights[0].title}
                  </h3>
                  <p className="mt-5 text-body leading-relaxed text-oninverse/70">
                    {insights[0].body}
                  </p>
                </div>
              </Link>

              <div className="border-t border-line">
                {insights.slice(1).map((post) => (
                  <Link
                    key={post.title}
                    href={post.href}
                    className="insight-row group grid min-h-[250px] grid-cols-[1fr_auto] content-between gap-6 border-b border-line py-8"
                  >
                    <div>
                      <p className="text-[18px] font-semibold uppercase tracking-[0.14em] text-amber-deep">
                        {post.category}
                      </p>
                      <h3 className="mt-4 font-sans text-[27px] font-semibold leading-tight">
                        {post.title}
                      </h3>
                    </div>
                    <CardArrow />
                    <p className="col-span-2 text-body leading-relaxed text-ink/70">{post.body}</p>
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <FinalCta
        title={finalCta.headline}
        titleAccent="full-service digital marketing agency?"
        body={finalCta.body}
        primary={{ label: finalCta.primary.label, href: finalCta.primary.href, event: "home_final_cta_click" }}
        secondary={{ label: finalCta.secondary.label, href: finalCta.secondary.href, event: "home_final_secondary_click" }}
        steps={[
          "Review your current activity",
          "Find the clearest next step",
          "Build a connected growth plan",
        ]}
        contactEvents={{ phone: "home_phone_click", email: "home_email_click" }}
      />
      <Footer />
    </div>
  );
}
