import Image from "next/image";
import Link from "next/link";
import { Check, Star } from "lucide-react";
import { ArrowRight } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FinalCta } from "@/components/ui/FinalCta";
import { Eyebrow } from "@/components/ui/Proof";
import { company } from "@/lib/content/nav";
import { serviceLinks, type CaseStudyPageData, type OutcomePanel } from "@/lib/content/case-study-pages";

// One case study, laid out as the client's PDF ("OMH-Case-Study-sub - Pages", 2 Nov 2026) in the site's colours and
// type: dark hero with the at-a-glance card, the client's site in a browser frame across the seam, the figures band,
// challenge, approach, outcome (with its chart when the brief has one), review, services, more studies, closing CTA.

const pill = "inline-flex items-center rounded-full px-3 py-1 text-[14px] font-semibold";
const lightPill = `${pill} bg-teal/12 text-amber-deep`;
const darkPill = `${pill} bg-oninverse/10 text-oninverse/85`;
const caps = "text-[14px] font-semibold uppercase tracking-[0.16em]";
const raised = "shadow-[0_36px_90px_-48px_rgb(0_0_0/0.55)]";
const card = "rounded-card border border-line bg-surface";
const band = "container-omh pt-[clamp(56px,44px+3vw,96px)]";
const h2 = "mt-5 font-sans text-h2 font-semibold text-balance";

function SiteFrame({ study }: { study: CaseStudyPageData }) {
  const { cover, shot = [1440, 900] } = study;
  if (cover) {
    return (
      <div
        className={`relative aspect-[16/9] overflow-hidden rounded-[14px] border border-line ${cover.logo ? "bg-inverse" : "bg-soft"} ${raised} lg:mx-[8%]`}
      >
        <Image
          src={cover.src}
          alt={cover.alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 1180px"
          className={cover.logo ? "object-contain p-[12%]" : "object-cover"}
        />
      </div>
    );
  }
  return (
    <div className={`overflow-hidden rounded-[14px] border border-line bg-surface ${raised} lg:mx-[8%]`}>
      <div className="flex gap-1.5 border-b border-line bg-soft px-4 py-3" aria-hidden>
        {[0, 1, 2].map((i) => (
          <span key={i} className="size-2.5 rounded-full bg-ink/20" />
        ))}
      </div>
      <Image
        src={`/images/clients/${study.slug}.webp`}
        alt={`The home page of the ${study.client} website`}
        width={shot[0]}
        height={shot[1]}
        priority
        sizes="(max-width: 1024px) 100vw, 1180px"
        className="h-auto w-full"
      />

    </div>
  );
}

function Hero({ study }: { study: CaseStudyPageData }) {
  return (
    <>
      <div className="border-b border-line bg-warm">
        <Breadcrumbs
          className="container-omh py-3"
          items={[{ name: "Home", href: "/" }, { name: "Case Studies", href: "/case-studies" }, { name: study.client }]}
        />
      </div>
      <header className="bg-inverse text-oninverse">
        <div className="container-omh grid items-start gap-x-16 gap-y-10 pb-[clamp(150px,18vw,260px)] pt-[clamp(48px,6vw,88px)] lg:grid-cols-[minmax(0,1.6fr)_minmax(0,0.8fr)]">
          <div>
            <ul className="flex flex-wrap gap-2.5">
              <li className={`${pill} bg-teal text-white`}>Case study</li>
              {study.tags.map((tag) => (
                <li key={tag} className={darkPill}>
                  {tag}
                </li>
              ))}
            </ul>
            <h1 className="mt-7 font-sans text-[clamp(2.25rem,1.7rem+2vw,3.25rem)] font-semibold leading-[1.08] text-balance">
              {study.h1}
            </h1>
            <p className="mt-6 text-body leading-relaxed text-oninverse/75">{study.lede}</p>
          </div>
          <aside aria-label="At a glance" className="rounded-card border border-oninverse/15 bg-oninverse/[0.05] p-7">
            <p className={`${caps} text-oninverse/55`}>At a glance</p>
            <dl className="mt-5 grid grid-cols-[minmax(0,7.5rem)_minmax(0,1fr)] gap-x-5 gap-y-3.5 text-[16px] leading-snug">
              {study.glance.map(([term, value]) => (
                <div key={term} className="contents">
                  <dt className="text-oninverse/55">{term}</dt>
                  <dd className="text-oninverse/90">{value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </header>
      <div className="container-omh relative -mt-[clamp(120px,15vw,220px)]">
        <SiteFrame study={study} />
      </div>
    </>
  );
}

// Older studies carry four to seven results, so the band wraps; past four, every figure gets its rule.
const statCols: Record<number, string> = {
  3: "sm:grid-cols-3",
  5: "sm:grid-cols-3 lg:grid-cols-5",
  6: "sm:grid-cols-3",
};

function Stats({ stats }: { stats: NonNullable<CaseStudyPageData["stats"]> }) {
  const cols = statCols[stats.items.length] ?? "sm:grid-cols-2 lg:grid-cols-4";
  const ruleAll = stats.items.length > 4;
  return (
    <section aria-label={stats.heading} className="container-omh pt-[clamp(48px,6vw,80px)]">
      <div className="rounded-card bg-inverse p-[clamp(24px,3vw,40px)] text-oninverse">
        <p className={`${caps} text-oninverse/55`}>{stats.heading}</p>
        <dl className={`mt-6 grid gap-y-6 ${cols}`}>
          {stats.items.map((item, i) => (
            <div
              key={item.label}
              className={`flex flex-col pr-6 ${i || ruleAll ? "sm:border-l sm:border-oninverse/12 sm:pl-6" : ""}`}
            >
              <dt className="mt-3 text-body leading-snug text-oninverse/70">{item.label}</dt>
              <dd className="order-first font-sans text-[clamp(34px,26px+1.4vw,48px)] font-semibold leading-none text-[#7d5c33]">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
        {stats.source && <p className="mt-7 text-[14px] text-oninverse/55">{stats.source}</p>}
      </div>
    </section>
  );
}

// Polyline across a 600x200 box; values scale to the tallest point in the chart.
const toPath = (line: number[], max: number) =>
  line
    .map(
      (v, i) => `${i ? "L" : "M"}${((i / (line.length - 1)) * 600).toFixed(1)} ${(195 - (v / max) * 180).toFixed(1)}`,
    )
    .join(" ");

function LineChart({ lines, xLabels }: { lines: { line: number[]; className: string }[]; xLabels: string[] }) {
  const max = Math.max(...lines.flatMap((l) => l.line));
  return (
    <div aria-hidden className="mt-6">
      <svg viewBox="0 0 600 200" preserveAspectRatio="none" className="h-[200px] w-full">
        {[50, 100, 150].map((y) => (
          <line key={y} x1="0" x2="600" y1={y} y2={y} className="stroke-line" vectorEffect="non-scaling-stroke" />
        ))}
        {lines.map((l) => (
          <path
            key={l.className}
            d={toPath(l.line, max)}
            fill="none"
            strokeWidth="2.5"
            vectorEffect="non-scaling-stroke"
            strokeLinejoin="round"
            className={l.className}
          />
        ))}
      </svg>
      <div className="mt-2 flex justify-between text-[13px] text-muted">
        {xLabels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>
  );
}

const tileTone = ["bg-teal text-white", "bg-inverse text-oninverse", "bg-soft", "bg-soft"];

function Panel({ panel }: { panel: OutcomePanel }) {
  return (
    <figure className={`${card} ${raised} p-[clamp(20px,2.5vw,32px)]`}>
      <figcaption className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <span className="font-sans text-[17px] font-semibold">{panel.title}</span>
        <span className="text-[14px] text-muted">{panel.note}</span>
      </figcaption>

      {panel.kind === "trend" && (
        <>
          <dl className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {panel.tiles.map((tile, i) => (
              <div key={tile.label} className={`flex flex-col rounded-[10px] px-4 py-3 ${tileTone[i]}`}>
                <dt className="text-[14px] opacity-80">{tile.label}</dt>
                <dd className="font-sans text-[26px] font-semibold leading-tight">{tile.value}</dd>
              </div>
            ))}
          </dl>
          <LineChart lines={[{ line: panel.line, className: "stroke-teal" }]} xLabels={panel.xLabels} />
        </>
      )}

      {panel.kind === "yoy" && (
        <>
          <p className="mt-3 flex gap-5 text-[14px] text-ink/70">
            <span className="flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-ink/25" />
              {panel.series[0].label}
            </span>
            <span className="flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-teal" />
              {panel.series[1].label}
            </span>
          </p>
          <LineChart
            lines={[
              { line: panel.series[0].line, className: "stroke-ink/25" },
              { line: panel.series[1].line, className: "stroke-teal" },
            ]}
            xLabels={panel.xLabels}
          />
          <p className="mt-4 text-[14px] text-muted">{panel.caption}</p>
        </>
      )}

      {panel.kind === "scores" && (
        <>
          <dl className="mt-6 grid grid-cols-2 gap-y-6 sm:grid-cols-4">
            {panel.scores.map((score) => {
              const value = Number(score.value);
              const tone = value >= 90 ? "text-success" : "text-amber-deep";
              return (
                <div key={score.label} className="flex flex-col items-center">
                  <dt className="mt-2.5 text-[14px] text-ink/70">{score.label}</dt>
                  <dd className={`order-first grid place-items-center ${tone}`}>
                    <svg viewBox="0 0 36 36" className="col-start-1 row-start-1 size-[76px] -rotate-90" aria-hidden>
                      <circle
                        cx="18"
                        cy="18"
                        r="15.9"
                        fill="none"
                        stroke="currentColor"
                        strokeOpacity="0.15"
                        strokeWidth="3"
                      />
                      <circle
                        cx="18"
                        cy="18"
                        r="15.9"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeDasharray={`${value} 100`}
                      />
                    </svg>
                    <span className="col-start-1 row-start-1 font-sans text-[22px] font-semibold">{score.value}</span>
                  </dd>
                </div>
              );
            })}
          </dl>
          <p className="mt-6 rounded-[10px] bg-soft px-4 py-3 text-[15px] text-ink/80">
            {panel.callout[0]}
            <strong>{panel.callout[1]}</strong>
            {panel.callout[2]}
          </p>
        </>
      )}

      {panel.kind === "rows" && (
        <dl className="mt-4 divide-y divide-line">
          {panel.rows.map(([label, value]) => (
            <div key={label} className="flex items-baseline justify-between gap-6 py-3.5">
              <dt className="text-[15px] text-ink/80">{label}</dt>
              <dd className="shrink-0 text-[15px] font-semibold text-amber-deep">{value}</dd>
            </div>
          ))}
        </dl>
      )}

      {panel.kind === "bars" && (
        <div className="mt-5 grid gap-6">
          {panel.groups.map((group) => {
            const max = Math.max(group.before[2], group.after[2]);
            return (
              <div key={group.label}>
                <p className="flex justify-between text-[15px] font-semibold">
                  {group.label}
                  <span className="text-success">{group.change}</span>
                </p>
                {[group.before, group.after].map(([period, shown, raw], i) => (
                  <div
                    key={period}
                    className="mt-2 grid grid-cols-[7.5rem_minmax(0,1fr)_3rem] items-center gap-3 text-[13px]"
                  >
                    <span className="text-muted">{period}</span>
                    <span className="h-3 rounded-full bg-soft">
                      <span
                        className={`block h-full rounded-full ${i ? "bg-teal" : "bg-ink/20"}`}
                        style={{ width: `${(raw / max) * 100}%` }}
                      />
                    </span>
                    <span className="text-right text-[14px] font-semibold">{shown}</span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </figure>
  );
}

function Outcome({ outcome }: { outcome: NonNullable<CaseStudyPageData["outcome"]> }) {
  const head = (
    <>
      <Eyebrow>{outcome.eyebrow}</Eyebrow>
      <h2 className={h2}>{outcome.title}</h2>
    </>
  );
  if (!outcome.panel) {
    // No chart in the brief: the three outcomes run as a full-width row, so the title isn't left alone in the left half.
    return (
      <section className={band}>
        {head}
        <ul className="mt-8 grid gap-5 md:grid-cols-3">
          {outcome.points.map((point) => (
            <li key={point} className={`${card} flex gap-3 p-6 text-body leading-snug`}>
              <Check className="mt-1 size-5 shrink-0 text-amber-deep" aria-hidden />
              {point}
            </li>
          ))}
        </ul>
      </section>
    );
  }
  return (
    <section className={`${band} grid items-start gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]`}>
      <div>
        {head}
        <ul className="mt-7 grid gap-3.5">
          {outcome.points.map((point) => (
            <li key={point} className="flex gap-3 text-body leading-snug text-ink/85">
              <Check className="mt-1 size-5 shrink-0 text-amber-deep" aria-hidden />
              {point}
            </li>
          ))}
        </ul>
      </div>
      <Panel panel={outcome.panel} />
    </section>
  );
}

function Testimonial({ t }: { t: NonNullable<CaseStudyPageData["testimonial"]> }) {
  const initials = t.name
    .split(",")[0]
    .split(" ")
    .map((w) => w[0])
    .join("");
  return (
    <section aria-label="In our client's words" className={band}>
      <figure className={`${card} p-[clamp(24px,4vw,56px)]`}>
        {t.source && (
          <div className="mb-6 flex items-center gap-3">
            <span className="flex gap-0.5" role="img" aria-label="Five stars">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="size-5 fill-amber text-amber" aria-hidden />
              ))}
            </span>
            <span className="text-[14px] text-muted">{t.source}</span>
          </div>
        )}
        <blockquote>
          <p className="font-sans text-[clamp(20px,16px+0.8vw,26px)] font-medium leading-snug">
            &ldquo;{t.lead}&rdquo;
          </p>
          {t.rest && <p className="mt-5 text-body leading-relaxed text-ink/70">&ldquo;{t.rest}&rdquo;</p>}
        </blockquote>
        <figcaption className="mt-7 flex items-center gap-3.5">
          <span
            aria-hidden
            className="grid size-12 place-items-center rounded-full bg-teal/15 font-sans font-semibold text-amber-deep"
          >
            {initials}
          </span>
          <span className="leading-snug">
            <span className="block font-semibold">{t.name}</span>
            {t.company && <span className="block text-ink/70">{t.company}</span>}
          </span>
        </figcaption>
      </figure>
    </section>
  );
}

export function CaseStudyPage({ study }: { study: CaseStudyPageData }) {
  return (
    <article data-case-article={study.slug}>
      <Hero study={study} />
      {study.stats && <Stats stats={study.stats} />}

      <section className={`${band} grid gap-x-16 gap-y-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]`}>
        <div>
          <Eyebrow>The challenge</Eyebrow>
          <h2 className={h2}>{study.challenge.title}</h2>
        </div>
        <div className="grid content-start gap-5 text-body leading-relaxed text-ink/75 lg:pt-10">
          {study.challenge.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
          {study.challenge.list && (
            <div className="mt-3">
              <h3 className="font-sans text-h4 font-semibold text-ink">{study.challenge.list.title}</h3>
              <ul className="mt-4 grid gap-3">
                {study.challenge.list.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <Check className="mt-1 size-5 shrink-0 text-amber-deep" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <section className={band}>
        <Eyebrow>What we did</Eyebrow>
        <h2 className={h2}>Our approach</h2>
        <ol className={`mt-8 grid gap-5 md:grid-cols-2 ${study.approach.length === 3 ? "lg:grid-cols-3" : ""}`}>
          {study.approach.map(([title, body], i) => (
            <li key={title} className={`${card} p-7`}>
              <span className="font-sans text-body font-semibold text-amber-deep">0{i + 1}</span>
              <h3 className="mt-3 font-sans text-h4 font-semibold">{title}</h3>
              {typeof body === "string" ? (
                <p className="mt-2 text-body leading-relaxed text-ink/70">{body}</p>
              ) : (
                <ul className="mt-4 grid gap-2.5">
                  {body.map((item) => (
                    <li key={item} className="flex gap-3 text-body leading-relaxed text-ink/70">
                      <Check className="mt-1 size-4 shrink-0 text-amber-deep" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      </section>

      {study.outcome && <Outcome outcome={study.outcome} />}
      {study.testimonial && <Testimonial t={study.testimonial} />}

      {study.services.length > 0 && (
        <section
          className={`${band} grid items-start pb-[clamp(56px,44px+3vw,96px)] gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]`}
        >
          <div>
            <Eyebrow>Services used</Eyebrow>
            <h2 className={h2}>Want this for your business?</h2>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:pt-10">
            {study.services.map((service) => (
              <li key={service}>
                <Link
                  href={serviceLinks[service]}
                  data-event="case_study_service_click"
                  className={`${card} group flex items-center justify-between gap-4 px-6 py-5 font-semibold transition-colors hover:border-ink/40`}
                >
                  {service}
                  <ArrowRight className="size-4 text-amber-deep transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Without a services row, the more-studies band needs its own gap from the section above. */}
      <section
        aria-labelledby="more-heading"
        className={`border-t border-line bg-soft/40 ${study.services.length ? "" : "mt-[clamp(56px,44px+3vw,96px)]"}`}
      >
        <div className="container-omh section-sm">
          <h2 id="more-heading" className="font-sans text-h2 font-semibold">
            More case studies
          </h2>
          <ul className="mt-8 grid gap-5 md:grid-cols-3">
            {study.more.map((m) => (
              <li key={m.slug}>
                <Link
                  href={`/case-studies/${m.slug}`}
                  data-event="case_study_more_click"
                  className={`${card} group flex h-full flex-col p-6 transition-colors hover:border-ink/40`}
                >
                  <span className={`${lightPill} self-start`}>{m.tag}</span>
                  <h3 className="mt-4 font-sans text-[20px] font-semibold leading-snug">{m.title}</h3>
                  <span className="mt-auto flex items-center justify-between pt-6 font-semibold text-amber-deep">
                    Read the case study
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FinalCta
        title="Have a similar growth challenge?"
        body="Tell us what you want to improve. We’ll review your website, SEO or Google Ads and send back practical next steps."
        primary={{
          label: "Get a free marketing review",
          href: "/contact",
          event: "case_study_cta_click",
        }}
        secondary={{
          label: company.phoneDisplay,
          href: company.phoneHref,
          event: "case_study_phone_click",
        }}
      />
    </article>
  );
}
