"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, Check, Star } from "lucide-react";
import { ArrowRight, Button } from "@/components/ui/Button";
import { BookDemo } from "@/components/BookDemo";
import { FinalCta } from "@/components/ui/FinalCta";
import { Eyebrow } from "@/components/ui/Proof";
import { company } from "@/lib/content/nav";
import {
  hubGoals,
  hubGroups,
  hubReviews,
  hubReviewTotal,
  hubSectors,
  hubServices,
  hubStudies,
  type HubSector,
  type HubService,
  type HubStudy,
} from "@/lib/content/case-studies-hub";

// The /case-studies hub, laid out as the client's brief (2 Nov 2026) in the site's colours and type.

const pill = "inline-flex items-center rounded-full px-3 py-1 text-[14px] font-semibold";
const lightPill = `${pill} bg-teal/12 text-amber-deep`;
const darkPill = `${pill} bg-oninverse/10 text-oninverse/85`;
const caps = "text-[14px] font-semibold uppercase tracking-[0.16em] text-muted";
const raised = "shadow-[0_24px_60px_-36px_rgb(0_0_0/0.4)]";
// Entrance delay for each hero card (globals.css .cs-card).
const delay = (seconds: number) => ({ "--d": `${seconds}s` }) as CSSProperties;

function HeroCards() {
  return (
    <div className="grid gap-4 sm:max-lg:grid-cols-3 xl:relative xl:block xl:h-[540px]" aria-label="Recent client results">
      <div className={`cs-card rounded-card border border-line bg-surface p-6 ${raised} xl:absolute xl:right-0 xl:top-0 xl:w-[340px]`} style={delay(0.15)}>
        <div className="flex items-center justify-between gap-3">
          <span className={lightPill}>AI search</span>
          <span className="text-[14px] text-muted">Southend Care</span>
        </div>
        <p className="mt-4 flex flex-wrap items-baseline gap-x-3">
          <span className="font-sans text-[34px] font-semibold leading-none text-amber-deep">2 pages</span>
          <span className="text-body text-ink/75">cited by ChatGPT</span>
        </p>
        <p className="mt-2 text-[14px] text-muted">Semrush AI visibility, October 2026</p>
      </div>

      <div className={`cs-card rounded-card bg-inverse p-6 text-oninverse ${raised} xl:absolute xl:left-0 xl:top-[150px] xl:z-10 xl:w-[300px]`} style={delay(0.3)}>
        <div className="flex items-center justify-between gap-3">
          <span className={darkPill}>SEO</span>
          <span className="text-[14px] text-oninverse/60">Thames Luxury Charters</span>
        </div>
        <svg viewBox="0 0 250 60" className="mt-5 h-auto w-full" aria-hidden>
          <path d="M0 38 C40 36 80 34 110 40 C140 46 160 14 195 10 C215 8 235 10 250 11 L250 60 L0 60Z" fill="currentColor" className="cs-area text-oninverse/10" />
          <path d="M0 38 C40 36 80 34 110 40 C140 46 160 14 195 10 C215 8 235 10 250 11" fill="none" stroke="#7d5c33" strokeWidth="3" className="cs-line" />
        </svg>
        <p className="mt-4 font-sans text-[34px] font-semibold leading-none text-[#7d5c33]">+59.5%</p>
        <p className="mt-2 text-body text-oninverse/75">organic traffic in six months</p>
      </div>

      <div className={`cs-card rounded-card border border-line bg-surface p-6 ${raised} xl:absolute xl:right-0 xl:top-[340px] xl:z-20 xl:w-[290px]`} style={delay(0.45)}>
        <div className="flex items-center justify-between gap-3">
          <span className={lightPill}>SEO</span>
          <span className="text-[14px] text-muted">Camp Kerala</span>
        </div>
        <div className="mt-5 flex h-14 items-end gap-1.5" aria-hidden>
          {["h-[22%] bg-teal/15", "h-[30%] bg-teal/15", "h-[36%] bg-teal/20", "h-[48%] bg-teal/35", "h-[62%] bg-teal/55", "h-[76%] bg-teal/75", "h-full bg-teal"].map((bar, i) => (
            <span key={bar} className={`cs-bar flex-1 rounded-[3px] ${bar}`} style={{ "--i": i } as CSSProperties} />
          ))}
        </div>
        <p className="mt-4 flex flex-wrap items-baseline gap-x-3">
          <span className="font-sans text-[30px] font-semibold leading-none text-amber-deep">10.7K</span>
          <span className="text-[15px] leading-snug text-ink/75">organic clicks, May to Oct 2026</span>
        </p>
      </div>
    </div>
  );
}

const proof = [
  { value: `${hubReviewTotal}`, label: `client reviews since ${hubReviews.since.split(" ")[1]}` },
  { value: `${hubReviews.trustpilot.score}/5`, label: `on Trustpilot, ${hubReviews.trustpilot.count} reviews` },
  { value: `${hubReviews.google.score}/5`, label: `on Google, ${hubReviews.google.count} reviews` },
];

function Featured() {
  return (
    <section aria-label="Featured case study" className="container-omh pt-[clamp(56px,6vw,88px)]">
      <div className="grid overflow-hidden rounded-card bg-inverse text-oninverse shadow-[0_36px_90px_-48px_rgb(0_0_0/0.6)] lg:grid-cols-2">
        <div className="p-[clamp(28px,4vw,56px)]">
          <div className="flex flex-wrap gap-2.5">
            <span className={`${pill} bg-teal text-white`}>Featured case study</span>
            <span className={darkPill}>Website design · Manufacturing</span>
          </div>
          <h2 className="mt-6 font-sans text-h2 font-semibold text-balance">
            Komfort Partitioning: a website built for architects, specifiers and contractors
          </h2>
          <p className="mt-6 text-body leading-relaxed text-oninverse/75">
            Komfort is a UK specialist in internal glazing, metal and fire-rated partitioning, with more than 50 years
            in the industry. Their buyers compare systems, check fire and acoustic performance and download technical
            documents before they enquire. We designed and built a website that makes eight product categories easy to
            explore and turns specifier visits into enquiries.
          </p>
          <dl className="mt-9 grid gap-6 border-y border-oninverse/15 py-7 sm:grid-cols-3">
            {[
              ["50+", "years of Komfort expertise, now online"],
              ["4", "clear journeys: products, projects, downloads, knowledge"],
              ["8", "product categories, one clear structure"],
            ].map(([value, label]) => (
              <div key={value} className="flex flex-col">
                <dt className="mt-2 text-body leading-snug text-oninverse/70">{label}</dt>
                <dd className="order-first font-sans text-h2 font-semibold leading-none text-[#7d5c33]">{value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-[14px] text-oninverse/55">Website design and build by Online Marketing Help.</p>
        </div>

        <div className="flex flex-col gap-6 bg-oninverse/[0.04] p-[clamp(24px,3.5vw,48px)]">
          <Image
            src="/images/case-studies/hub/komfort-website.webp"
            alt="The home page of the new Komfort website, with product categories for glazed partitioning, fire rated, glazed doors and acoustic"
            width={1240}
            height={909}
            sizes="(max-width: 1024px) 100vw, 640px"
            className={`h-auto w-full rounded-[12px] ${raised}`}
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-[12px] bg-surface p-5 text-ink">
              <p className="text-[15px] font-semibold text-ink/75">Built around how specifiers search</p>
              <ul className="mt-2 divide-y divide-line">
                {["Products", "Projects", "Technical Downloads", "Knowledge Hub"].map((item) => (
                  <li key={item} className="flex items-center justify-between py-2.5 text-[15px]">
                    {item}
                    <ArrowRight className="size-4 text-amber-deep" />
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[12px] border border-oninverse/12 p-5">
              <p className="text-[14px] font-semibold uppercase tracking-[0.16em] text-oninverse/55">
                Product ranges on the new site
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {["Polar", "Kross Glaze", "Defence", "Soteria", "Sonik", "Polar Kreate", "Komfire"].map((range) => (
                  <li key={range} className={darkPill}>
                    {range}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StudyCard({ study }: { study: HubStudy }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-card border border-line bg-surface">
      <div className="relative aspect-[16/10] border-b border-line bg-warm">
        <Image
          src={study.screenshot ? `/images/clients/${study.slug}.webp` : `/images/case-studies/hub/${study.slug}.webp`}
          alt={study.screenshot ? `The home page of the ${study.client} website` : `Illustration of the ${study.client} project`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 340px"
          className="object-cover object-top"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <span className={`${lightPill} self-start`}>{study.tag}</span>
        <h3 className="mt-4 font-sans text-[21px] font-semibold leading-snug">{study.title}</h3>
        <p className="mt-3 text-[14px] text-muted">{study.meta}</p>
        <div className="mt-auto pt-6">
          <div className="border-t border-line pt-5">
            {study.stats ? (
              <>
                <dl className="grid grid-cols-2 gap-4">
                  {study.stats.map((stat) => (
                    <div key={stat.label} className="flex flex-col">
                      <dt className="mt-1.5 text-[15px] leading-snug text-ink/70">{stat.label}</dt>
                      <dd className="order-first font-sans text-[30px] font-semibold leading-none">{stat.value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 text-[14px] text-muted">{study.source}</p>
              </>
            ) : (
              <>
                <p className={caps}>What we delivered</p>
                <ul className="mt-3 grid gap-2.5">
                  {study.delivered?.map((item) => (
                    <li key={item} className="flex gap-2.5 text-[16px] leading-snug text-ink/85">
                      <Check className="mt-0.5 size-4 shrink-0 text-amber-deep" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-[14px] text-muted">{study.servicesLine}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

// Fills whatever is left of the last row, as the brief's two-column closing card does when ten cards sit in fours.
const xlSpan = ["", "xl:col-span-1", "xl:col-span-2", "xl:col-span-3", "xl:col-span-4"];

function ClosingCard({ after }: { after: number }) {
  const xl = 4 - (after % 4);
  return (
    <div
      className={`flex flex-col justify-center rounded-card bg-inverse p-[clamp(28px,4vw,56px)] text-oninverse ${after % 2 ? "md:col-span-1" : "md:col-span-2"} ${xlSpan[xl]}`}
    >
      <span className={`${darkPill} self-start`}>Your business next?</span>
      <h3 className="mt-5 font-sans text-h3 font-semibold text-balance">Want results like these for your business?</h3>
      <p className="mt-4 text-body leading-relaxed text-oninverse/75">
        Tell us what you want to improve. We&apos;ll review your website, SEO or Google Ads and show you where the
        quickest wins are.
      </p>
      <div className="mt-7">
        <Button href="/contact" variant="inverse" arrow data-event="case_studies_card_cta_click">
          Get a free marketing review
        </Button>
      </div>
    </div>
  );
}

function FilterRow<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: T[];
  value: T | "All";
  onChange: (value: T | "All") => void;
}) {
  return (
    // A grid, not a wrapping row: the sector chips wrap beside their label instead of dropping below it.
    <div className="grid items-center gap-x-5 gap-y-3 sm:grid-cols-[6rem_minmax(0,1fr)]">
      <p className={caps}>{label}</p>
      <div role="group" aria-label={`Filter by ${label.toLowerCase()}`} className="flex flex-wrap gap-2.5">
        {(["All", ...options] as (T | "All")[]).map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={value === option}
            onClick={() => onChange(option)}
            className={`min-h-11 cursor-pointer rounded-full border px-5 text-body font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber ${
              value === option
                ? "border-inverse bg-inverse text-oninverse"
                : "border-line bg-surface text-ink/75 hover:border-ink/40 hover:text-ink"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

function Browse() {
  const [service, setService] = useState<HubService | "All">("All");
  const [sector, setSector] = useState<HubSector | "All">("All");
  const matches = (study: HubStudy) =>
    (service === "All" || study.services.includes(service)) && (sector === "All" || study.sector === sector);
  const count = hubStudies.filter(matches).length;
  const groups = hubGroups
    .map((group) => ({ group, studies: hubStudies.filter((s) => s.group === group && matches(s)) }))
    .filter((g) => g.studies.length);

  return (
    <section id="projects" aria-labelledby="project-heading" className="container-omh section-md scroll-mt-24">
      <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
        <div>
          <h2 id="project-heading" className="font-sans text-h2 font-semibold">
            Browse case studies
          </h2>
          <p className="mt-3 text-body text-ink/70">Filter by the service you need or by businesses like yours.</p>
        </div>
        <p role="status" className="text-body font-semibold text-ink/80">
          {count} client {count === 1 ? "project" : "projects"}
        </p>
      </div>

      <div className="mt-9 grid gap-4">
        <FilterRow label="Service" options={hubServices} value={service} onChange={setService} />
        <FilterRow label="Sector" options={hubSectors} value={sector} onChange={setSector} />
      </div>

      {groups.length === 0 && (
        <p className="mt-12 text-body text-ink/70">
          {count ? "Only the featured project above matches these filters." : "No projects match these filters yet."}
        </p>
      )}

      {groups.map(({ group, studies }, index) => {
        const last = index === groups.length - 1;
        return (
          <div key={group} className="mt-14">
            <p className={caps}>{group}</p>
            <div className="mt-5 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {studies.map((study) => (
                <StudyCard key={study.slug} study={study} />
              ))}
              {last && <ClosingCard after={studies.length} />}
            </div>
          </div>
        );
      })}
      {groups.length === 0 && (
        <div className="mt-8 grid md:grid-cols-2 xl:grid-cols-4">
          <ClosingCard after={0} />
        </div>
      )}
    </section>
  );
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 shrink-0" aria-hidden>
      <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.8Z" />
      <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3c-1.1.7-2.5 1.2-4.1 1.2-3.1 0-5.8-2.1-6.7-5H1.3v3.1A12 12 0 0 0 12 24Z" />
      <path fill="#FBBC05" d="M5.3 14.3a7.2 7.2 0 0 1 0-4.6V6.6h-4a12 12 0 0 0 0 10.8l4-3.1Z" />
      <path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.3 6.6l4 3.1c.9-2.9 3.6-4.9 6.7-4.9Z" />
    </svg>
  );
}

function Testimonial() {
  return (
    <section aria-label="Client reviews" className="container-omh section-md">
      <div className="grid gap-10 rounded-card border border-line bg-surface p-[clamp(28px,4vw,56px)] lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.5fr)] lg:gap-0">
        <div className="lg:border-r lg:border-line lg:pr-12">
          <span className={lightPill}>In our clients&apos; words</span>
          <p className="mt-5 flex flex-wrap items-end gap-x-4 gap-y-1">
            <span className="font-sans text-[clamp(56px,44px+2vw,72px)] font-semibold leading-none">{hubReviews.trustpilot.score}</span>
            <span className="pb-1.5 text-body leading-snug text-ink/70">out of 5 across our {hubReviewTotal} reviews</span>
          </p>
          <ul className="mt-6 grid gap-3 border-t border-line pt-5">
            <li className="flex items-center gap-3 text-body">
              <Star className="size-5 shrink-0 fill-[#00b67a] text-[#00b67a]" aria-hidden />
              <span className="font-semibold">Trustpilot</span>
              <span className="ml-auto text-ink/70">
                <span className="font-semibold text-ink">{hubReviews.trustpilot.score}</span> · {hubReviews.trustpilot.count} reviews
              </span>
            </li>
            <li className="flex items-center gap-3 text-body">
              <GoogleMark />
              <span className="font-semibold">Google</span>
              <span className="ml-auto text-ink/70">
                <span className="font-semibold text-ink">{hubReviews.google.score}</span> · {hubReviews.google.count} reviews
              </span>
            </li>
          </ul>
          <p className="mt-5 text-[14px] text-muted">Reviews collected since {hubReviews.since}</p>
        </div>

        <figure className="lg:pl-12">
          <div className="flex items-center gap-3">
            <span className="flex gap-0.5" role="img" aria-label="Five stars">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="size-5 fill-amber text-amber" aria-hidden />
              ))}
            </span>
            <span className="text-[14px] text-muted">Google review</span>
          </div>
          <blockquote className="mt-6">
            <p className="font-sans text-[clamp(22px,18px+0.8vw,30px)] font-medium leading-snug text-ink">
              &ldquo;Since using their SEO services, our website rankings have improved significantly, resulting in much
              greater online visibility and a substantial increase in enquiries and new business leads.&rdquo;
            </p>
            <p className="mt-5 text-body leading-relaxed text-ink/70">
              &ldquo;We have been working with Online Marketing Help for nearly two years, and we couldn&apos;t be happier
              with the results. The team are professional, knowledgeable, approachable and genuinely committed to
              helping our business succeed.&rdquo;
            </p>
          </blockquote>
          <figcaption className="mt-7 flex items-center gap-3.5">
            <span aria-hidden className="grid size-12 place-items-center rounded-full bg-teal/15 font-sans font-semibold text-amber-deep">
              JD
            </span>
            <span className="leading-snug">
              <span className="block font-semibold">Jane Deeks</span>
              <span className="block text-ink/70">Deeks VAT Consultancy</span>
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

const promise = [
  ["The starting point", "What the numbers were before we started work."],
  ["The timeframe", "The exact period each result covers."],
  ["The source", "GA4, Search Console, Google Ads or the client's own CRM."],
  ["The limits", "Where other channels also played a part, we say so."],
];

function Card({ children }: { children: ReactNode }) {
  return <div className="rounded-card border border-line bg-surface p-7">{children}</div>;
}

export function CaseStudyArchive() {
  return (
    <div data-case-archive>
      <header className="hero-grid overflow-x-clip border-b border-line bg-warm">
        <div className="container-omh section-md">
          <div className="grid items-center gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
            <div>
              <Eyebrow>Digital marketing case studies</Eyebrow>
              {/* Sized to the brief (56px at desktop), so each sentence holds a line instead of the 72px hero size's four. */}
              <h1 className="mt-7 font-sans text-[clamp(2.5rem,1.9rem+2.2vw,3.5rem)] font-semibold leading-[1.06]">
                Real clients. Real results. <span className="block text-amber-deep">The work behind them.</span>
              </h1>
              <p className="mt-6 text-body leading-relaxed text-ink/75">
                See how we help UK businesses grow with Google Ads, SEO and websites. Every number we share is dated and
                sourced, and every project shows the work we delivered.
              </p>
              <div className="mt-9 flex flex-wrap gap-3.5 max-sm:flex-col">
                <Button href="/contact" arrow data-event="case_studies_hero_review_click">
                  Get a free marketing review
                </Button>
                <Button href="#projects" variant="secondary" data-event="case_studies_hero_browse_click">
                  Browse case studies <ArrowDown className="size-4" aria-hidden />
                </Button>
              </div>
            </div>
            <HeroCards />
          </div>

          <dl className="mt-14 grid overflow-hidden rounded-card bg-inverse text-oninverse sm:grid-cols-3">
            {proof.map((item) => (
              <div key={item.label} className="flex flex-col border-oninverse/12 px-9 py-8 max-sm:border-t max-sm:first:border-t-0 sm:border-l sm:first:border-l-0">
                <dt className="mt-3 text-body text-oninverse/75">{item.label}</dt>
                <dd className="order-first font-sans text-[clamp(38px,30px+1.4vw,52px)] font-semibold leading-none text-[#7d5c33]">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <Featured />
      <Browse />

      <section aria-labelledby="goal-heading" className="border-y border-line bg-surface">
        <div className="container-omh section-md">
          <h2 id="goal-heading" className="font-sans text-h2 font-semibold text-balance">
            Explore results by <span className="text-amber-deep">business goal</span>
          </h2>
          <p className="mt-5 text-body leading-relaxed text-ink/75">
            Know the result you want but not which service gets you there? Start with the goal, see the projects behind
            it, then see how we approach it.
          </p>
          <ol className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {hubGoals.map((goal, index) => (
              <li key={goal.title} className="flex flex-col rounded-card border border-line bg-surface p-7">
                <span className="font-sans text-[34px] font-semibold leading-none text-amber-deep">0{index + 1}</span>
                <h3 className="mt-5 font-sans text-h4 font-semibold">{goal.title}</h3>
                <p className={`${caps} mt-6`}>Featured work</p>
                <ul className="mt-3 grid gap-1.5 text-body text-ink/85">
                  {goal.work.map((client) => (
                    <li key={client}>{client}</li>
                  ))}
                </ul>
                <Link
                  href={goal.href}
                  data-event="case_studies_goal_click"
                  className="group mt-auto inline-flex items-center gap-2 pt-8 font-semibold text-amber-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber"
                >
                  {goal.link}
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Testimonial />

      <section aria-labelledby="reporting-heading" className="border-t border-line bg-surface">
        <div className="container-omh section-md grid items-start gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          <div>
            <Eyebrow>Our reporting promise</Eyebrow>
            <h2 id="reporting-heading" className="mt-6 font-sans text-h2 font-semibold text-balance">
              Every number comes with <span className="text-amber-deep">its context</span>
            </h2>
            <p className="mt-6 text-body leading-relaxed text-ink/75">
              We don&apos;t publish a result we can&apos;t back up. Each case study shows the baseline, the timeframe and
              where the data came from, so you can judge it for yourself.
            </p>
            <p className="mt-6 text-[14px] text-muted">
              Results from one project show past work. They are not a forecast or guarantee for another business.
            </p>
          </div>
          <ol className="grid gap-5 sm:grid-cols-2">
            {promise.map(([title, body], index) => (
              <li key={title}>
                <Card>
                  <span className="font-sans text-body font-semibold text-amber-deep">0{index + 1}</span>
                  <h3 className="mt-3 font-sans text-h4 font-semibold">{title}</h3>
                  <p className="mt-2 text-body leading-relaxed text-ink/70">{body}</p>
                </Card>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <FinalCta
        tag="Free, no obligation"
        title="Have a similar growth challenge?"
        titleAccent="growth challenge?"
        body="Tell us what you want to improve. We'll review your Google Ads, SEO or website and send back three practical improvements, whether you work with us or not."
        primary={{ label: "Request my free review", href: "/contact", event: "case_studies_hub_cta_click" }}
        secondary={{ label: company.phoneDisplay, href: company.phoneHref, event: "case_studies_phone_click" }}
        steps={["We review your current position", "We define the commercial objective with you", "We agree the work and how it's measured"]}
        note={
          <>
            Prefer email? Send us your brief from the{" "}
            <Link href="/contact" className="underline underline-offset-4 hover:text-oninverse">
              contact page
            </Link>
            .
          </>
        }
      />
      <BookDemo />
    </div>
  );
}
