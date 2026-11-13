import Link from "next/link";
import type { ReactNode } from "react";
import { Check, Minus, ArrowUpRight, MoveRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { MediaFrame } from "@/components/ServiceMedia";
import { Accordion } from "@/components/ui/Accordion";
import { ArrowRight, Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Proof";
import { GrowthPath } from "@/components/solutions/GrowthPath";
import { definitionIcons } from "@/components/solutions/definition-icons";
import { withLinks } from "@/components/services/ServicePrimitives";
import { navLabels } from "@/lib/content/nav";
import { solutionOrder, solutions, type SolutionPageContent } from "@/lib/content/solutions";
import { CASE_STUDIES_LIVE } from "@/lib/flags";

function SolutionHero({ content }: { content: SolutionPageContent }) {
  return (
    <section className="hero-grid overflow-hidden border-b border-line bg-warm">
      <div className="container-omh grid min-h-[690px] grid-cols-[minmax(0,1.05fr)_minmax(390px,.75fr)] items-center gap-[clamp(48px,7vw,110px)] py-[clamp(64px,7vw,105px)] max-lg:min-h-0 max-lg:grid-cols-1">
        {/* CSS-only entrance, not Reveal: the JS-gated reveal held the headline at opacity 0 until hydration and delayed LCP. */}
        <div className="hero-in relative z-10">
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <h1 className="mt-7 font-sans text-display font-semibold text-balance max-lg:">
            {content.title} <span className="text-amber-deep">{content.titleAccent}</span>
          </h1>
          <p className="mt-7 text-body leading-relaxed text-ink/75">{content.intro}</p>
          <div className="mt-9 flex flex-wrap gap-3 max-sm:flex-col">
            <Button href="#enquire" arrow data-event={`${content.slug}_hero_primary_click`}>
              {content.primaryCta}
            </Button>
            <Button href="#approach" variant="secondary" arrow data-event={`${content.slug}_hero_secondary_click`}>
              {content.secondaryCta}
            </Button>
          </div>
          <div className="mt-11 grid max-w-[760px] grid-cols-3 border-y border-line max-sm:grid-cols-1 max-sm:divide-y max-sm:divide-line">
            {content.heroPoints.map((point, index) => (
              <div
                key={point}
                className="grid grid-cols-[28px_1fr] items-start gap-3 py-6 pr-5 text-body font-semibold text-ink/68 max-sm:py-4"
              >
                <span className="text-[18px] leading-[1.55] tabular-nums text-amber-deep">0{index + 1}</span>
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-in hero-in-2 relative z-10 max-lg:mx-auto max-lg:w-full max-lg:max-w-[760px]">
          <GrowthPath content={content} />
        </div>
      </div>
    </section>
  );
}

// Optional explainer: the definition as a lead, then what it names as cards or chips.
function DefinitionSection({ content }: { content: SolutionPageContent }) {
  const definition = content.definition;
  if (!definition) return null;
  return (
    <section className="border-b border-line bg-tint-blue">
      <div className="container-omh section-md">
        <Reveal>
          <div>
            <Eyebrow>The basics</Eyebrow>
            <h2 className="mt-6 font-sans text-h2 font-semibold text-balance">{definition.title}</h2>
            <div className="mt-5 space-y-5">
              {definition.body.split("\n\n").map((paragraph) => (
                <p key={paragraph} className="text-body leading-relaxed text-ink/85">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          {definition.factors && (
            <div className="mt-12 grid grid-cols-3 gap-5 max-md:grid-cols-1">
              {definition.factors.map((factor) => (
                <div key={factor.title} className="rounded-card border border-line bg-surface p-7">
                  <span className="block h-1 w-10 rounded-full bg-amber" aria-hidden="true" />
                  <h3 className="mt-6 font-sans text-h3 font-semibold">{factor.title}</h3>
                  <p className="mt-3 text-body leading-relaxed text-ink/70">{factor.body}</p>
                </div>
              ))}
            </div>
          )}
          {definition.tags && (
            <div className="mt-10">
              <p className="text-[14px] font-semibold uppercase tracking-[0.14em] text-muted">{definition.tagsLabel}</p>
              <ul className="mt-4 grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
                {definition.tags.map((tag) => {
                  const Icon = definitionIcons[tag.icon];
                  return (
                    <li key={tag.title} className="flex gap-4 rounded-card border border-line bg-surface p-5">
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-[10px] bg-soft text-amber-deep">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="font-sans text-[18px] font-semibold">{tag.title}</h3>
                        <p className="mt-1 text-bsm leading-relaxed text-ink/68">{tag.body}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
              {definition.tagsNote && <p className="mt-4 text-bsm text-ink/60">{definition.tagsNote}</p>}
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function ProblemSection({ content }: { content: SolutionPageContent }) {
  return (
    <section className="border-b border-line bg-surface">
      <div className="container-omh section-lg">
        <Reveal>
          <div className="grid grid-cols-12 gap-x-[clamp(40px,7vw,104px)] gap-y-10 max-lg:block">
            <div className="col-span-5 lg:sticky lg:top-28 lg:self-start max-lg:mb-10">
              <Eyebrow>{content.problem.eyebrow}</Eyebrow>
              <h2 className="mt-6 font-sans text-h2 font-semibold text-balance">{content.problem.title}</h2>
              <p className="mt-6 text-body leading-relaxed text-ink/70">{content.problem.intro}</p>
            </div>
            <div className="col-span-7 border-t border-line">
              {content.problem.symptoms.map((item, index) => (
                <article key={item.title} className="grid grid-cols-[56px_1fr] gap-5 border-b border-line py-8 max-sm:grid-cols-[38px_1fr]">
                  <span className="pt-1 font-sans text-[18px] font-semibold tabular-nums text-amber">0{index + 1}</span>
                  <div>
                    <h3 className="font-sans text-h4 font-semibold">{item.title}</h3>
                    <p className="mt-3 text-body leading-relaxed text-ink/68">{item.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// Optional comparison: the options as outline cards, the recommendation in ink.
function ComparisonSection({ content }: { content: SolutionPageContent }) {
  const comparison = content.comparison;
  if (!comparison) return null;
  return (
    <section className="border-b border-line bg-warm">
      <div className="container-omh section-md">
        <Reveal>
          <Eyebrow>{comparison.eyebrow}</Eyebrow>
          <h2 className="mt-6 font-sans text-h2 font-semibold text-balance">{comparison.title}</h2>
          <div className="mt-12 grid grid-cols-3 gap-5 max-lg:grid-cols-1">
            {comparison.options.map((option) => (
              <div key={option.label} className="rounded-card border border-line bg-surface p-8 max-sm:p-6">
                <h3 className="font-sans text-h4 font-semibold">{option.label}</h3>
                <p className="mt-4 text-body leading-relaxed text-ink/72">{option.body}</p>
              </div>
            ))}
            <div className="rounded-card bg-inverse p-8 text-oninverse max-sm:p-6">
              <p className="text-[14px] font-semibold uppercase tracking-[0.14em] text-[var(--accent-light)]">{comparison.verdict.label}</p>
              <p className="mt-4 text-body leading-relaxed text-oninverse/90">{comparison.verdict.body}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function OutcomesSection({ content }: { content: SolutionPageContent }) {
  return (
    <section className="dark-grid border-b border-oninverse/10 bg-inverse text-oninverse">
      <div className="container-omh section-lg">
        <Reveal>
          <div>
            <Eyebrow light>What better looks like</Eyebrow>
            <h2 className="mt-6 font-sans text-h2 font-semibold text-balance">{content.outcomes.title}</h2>
            <p className="mt-5 text-body leading-relaxed text-oninverse/65">{content.outcomes.intro}</p>
          </div>
          <div
            className={
              content.outcomes.items.length === 4
                ? "mt-14 grid grid-cols-4 gap-0 border-y border-oninverse/15 max-lg:grid-cols-1 max-lg:divide-y max-lg:divide-oninverse/15"
                : "mt-14 grid grid-cols-3 gap-0 border-y border-oninverse/15 max-md:grid-cols-1 max-md:divide-y max-md:divide-oninverse/15"
            }
          >
            {content.outcomes.items.map((item) => (
              <article
                key={item.number}
                className={
                  content.outcomes.items.length === 4
                    ? "border-r border-oninverse/15 px-7 py-9 first:pl-0 last:border-r-0 max-lg:border-r-0 max-lg:px-0"
                    : "border-r border-oninverse/15 px-8 py-9 first:pl-0 last:border-r-0 max-md:border-r-0 max-md:px-0"
                }
              >
                <span className="font-sans text-[18px] font-semibold text-[var(--accent-light)]">{item.number}</span>
                <h3 className="mt-5 font-sans text-[clamp(24px,2vw,31px)] font-semibold leading-tight">{item.title}</h3>
                <p className="mt-5 text-body leading-relaxed text-oninverse/62">{item.body}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Captioned({ caption, className, children }: { caption?: [string, string]; className: string; children: ReactNode }) {
  return (
    <figure className={className}>
      {children}
      {caption && (
        <figcaption className="mt-3 text-[15px] leading-snug text-ink/70">
          <span className="font-semibold text-ink">{caption[0]}:</span> {caption[1]}
        </figcaption>
      )}
    </figure>
  );
}

function MediaSection({ content }: { content: SolutionPageContent }) {
  return (
    <section className="overflow-hidden border-b border-line bg-tint-green">
      <div className="container-omh section-md">
        <Reveal>
          <div className="grid grid-cols-12 items-end gap-x-12 gap-y-8 max-lg:block">
            <div className="col-span-5 max-lg:mb-9">
              <Eyebrow>{content.media.eyebrow}</Eyebrow>
              <h2 className="mt-6 font-sans text-h2 font-semibold text-balance">{content.media.title}</h2>
              <p className="mt-5 text-body leading-relaxed text-ink/68">{content.media.body}</p>
              {content.media.journey && (
                <ol className="mt-8 flex flex-wrap items-center gap-2">
                  {content.media.journey.map((step, index, all) => (
                    <li key={step} className="flex items-center gap-2">
                      <span className="rounded-full border border-line bg-surface px-4 py-2 text-[15px] font-semibold">{step}</span>
                      {index < all.length - 1 && <MoveRight className="size-4 text-amber-deep" aria-hidden="true" />}
                    </li>
                  ))}
                </ol>
              )}
            </div>
            <Captioned caption={content.media.captions?.[0]} className="col-span-7">
              <MediaFrame kind="image" theme={content.theme} ratio="16/10" title={content.media.videoTitle} note="Video placeholder for approved project media." source="/images/home/campaign-review.webp" alt="Marketing campaign planning and review" />
            </Captioned>
          </div>
          <div className="mt-6 grid grid-cols-12 gap-6">
            <Captioned caption={content.media.captions?.[1]} className="col-span-5 max-md:col-span-12">
              <MediaFrame kind="image" theme={content.theme} ratio="5/4" title={content.media.imageTitle} note="Image placeholder for approved project media." source={content.media.imageSrc} alt={content.media.imageAlt} />
            </Captioned>
            <Captioned caption={content.media.captions?.[2]} className="col-span-7 max-md:col-span-12">
              {/* 16/9 in 7 columns matches the 5/4 frame's height in 5 columns, so the row's bottom edges line up. */}
              <MediaFrame kind="screen" theme={content.theme} ratio="16/9" title={content.media.screenTitle} note="Screen placeholder for approved, anonymised reporting media." source={content.media.screenSrc} alt={content.media.screenAlt} />
            </Captioned>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ApproachSection({ content }: { content: SolutionPageContent }) {
  return (
    <section id="approach" className="scroll-mt-24 border-b border-line bg-warm">
      <div className="container-omh section-lg">
        <Reveal>
          <div className="grid grid-cols-12 gap-x-12 gap-y-12 max-lg:block">
            <div className="col-span-4 max-lg:mb-10">
              <Eyebrow>A clear first move</Eyebrow>
              <h2 className="mt-6 font-sans text-h2 font-semibold text-balance">{content.approach.title}</h2>
              <p className="mt-5 text-body leading-relaxed text-ink/68">{content.approach.intro}</p>
            </div>
            <ol className="col-span-8 border-t border-line">
              {content.approach.steps.map((step, index) => (
                <li key={step.title} className="group grid grid-cols-[64px_0.7fr_1fr] gap-5 border-b border-line py-7 transition-colors hover:bg-surface/55 max-md:grid-cols-[42px_1fr]">
                  <span className="font-sans text-[18px] font-semibold tabular-nums text-amber-deep">0{index + 1}</span>
                  <h3 className="font-sans text-[21px] font-semibold max-md:col-start-2">{step.title}</h3>
                  <p className="text-body leading-relaxed text-ink/68 max-md:col-start-2">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ServicesSection({ content }: { content: SolutionPageContent }) {
  return (
    <section className="border-b border-line bg-surface">
      <div className="container-omh section-md">
        <Reveal>
          <div>
            <div>
              <Eyebrow>Connected services</Eyebrow>
              <h2 className="mt-6 font-sans text-h2 font-semibold text-balance">{content.services.title}</h2>
            </div>
            <p className="mt-5 text-body leading-relaxed text-ink/68">{withLinks(content.services.intro)}</p>
          </div>
          <div className="mt-12 grid grid-cols-2 border-l border-t border-line max-md:grid-cols-1">
            {content.services.items.map((item, index) => (
              <Link key={item.href} href={item.href} className="group min-h-[230px] border-b border-r border-line p-7 transition-colors duration-300 hover:bg-soft/45">
                <div className="flex items-start justify-between gap-5">
                  <span className="text-[18px] font-semibold tabular-nums text-amber">0{index + 1}</span>
                  <ArrowUpRight className="size-5 text-amber-deep transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                </div>
                <h3 className="mt-12 font-sans text-[26px] font-semibold">{item.title}</h3>
                <p className="mt-3 text-body leading-relaxed text-ink/66">{item.body}</p>
                {item.cta && (
                  <span className="mt-6 inline-flex items-center gap-2 font-semibold text-amber-deep group-hover:underline underline-offset-4">
                    {item.cta}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                )}
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FitSection({ content }: { content: SolutionPageContent }) {
  return (
    <section className="border-b border-line bg-surface">
      <div className="container-omh section-md">
        <Reveal>
          <div className="grid grid-cols-12 gap-x-12 gap-y-9 max-lg:block">
            <div className="col-span-4 max-lg:mb-9">
              <Eyebrow>Fit matters</Eyebrow>
              <h2 className="mt-6 font-sans text-h2 font-semibold text-balance">{content.fit.title}</h2>
              <p className="mt-5 text-body leading-relaxed text-ink/68">{content.fit.intro ?? "A useful first conversation should establish this honestly, before anyone proposes a programme."}</p>
            </div>
            <div className="col-span-8 grid grid-cols-2 overflow-hidden rounded-card border border-line bg-surface max-md:grid-cols-1">
              <div className="p-7">
                <h3 className="font-sans text-h4 font-semibold text-amber-deep">A good basis to start</h3>
                <ul className="mt-6 space-y-4">
                  {content.fit.good.map((item) => <li key={item} className="flex gap-3 text-body leading-relaxed text-ink/72"><Check className="mt-1 size-4 shrink-0 text-amber-deep" />{item}</li>)}
                </ul>
              </div>
              <div className="border-l border-line bg-warm/70 p-7 max-md:border-l-0 max-md:border-t">
                <h3 className="font-sans text-h4 font-semibold">Worth resolving first</h3>
                <ul className="mt-6 space-y-4">
                  {content.fit.notYet.map((item) => <li key={item} className="flex gap-3 text-body leading-relaxed text-ink/68"><Minus className="mt-1 size-4 shrink-0 text-amber" />{item}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ProofSection({ content }: { content: SolutionPageContent }) {
  if (!CASE_STUDIES_LIVE) return null;
  return (
    <section className="border-b border-line bg-surface">
      <div className="container-omh section-md">
        <Reveal>
          <div className="grid grid-cols-[1fr_1.1fr] items-end gap-16 max-lg:grid-cols-1 max-lg:gap-8">
            <div>
              <Eyebrow>Relevant proof</Eyebrow>
              <h2 className="mt-6 font-sans text-[clamp(34px,3.8vw,52px)] font-semibold leading-[1.08] text-balance">{content.proof.title}</h2>
            </div>
            <div>
              <p className="text-body leading-relaxed text-ink/68">{content.proof.body}</p>
              <div className="mt-7 flex flex-wrap gap-3 max-sm:flex-col">
                {content.proof.links.map((link, index) => (
                  <Button key={link.href} href={link.href} variant={index === 0 ? "primary" : "secondary"} arrow data-event={`${content.slug}_proof_${index === 0 ? "primary" : "secondary"}_click`}>
                    {link.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FaqAndNext({ content }: { content: SolutionPageContent }) {
  const currentIndex = solutionOrder.indexOf(content.slug as (typeof solutionOrder)[number]);
  const nextSlugs = solutionOrder.filter((slug) => slug !== content.slug).slice(currentIndex % 2, currentIndex % 2 + 2);
  return (
    <section className="border-b border-line bg-warm">
      <div className="container-omh section-lg">
        <Reveal>
          <div className="grid grid-cols-12 gap-x-14 gap-y-12 max-lg:block">
            <div className="col-span-4 max-lg:mb-10">
              <Eyebrow>Questions before you enquire</Eyebrow>
              <h2 className="mt-6 font-sans text-h2 font-semibold text-balance">{content.faqTitle ?? "Straight answers"}</h2>
              <p className="mt-5 text-body leading-relaxed text-ink/68">If the right answer depends on your circumstances, we say so.</p>
            </div>
            <div className="col-span-8"><Accordion items={content.faq} group={`${content.slug}-faq`} /></div>
          </div>
          <div className="mt-20 border-t border-line pt-9">
            <p className="text-[14px] font-semibold uppercase tracking-[0.14em] text-muted">You may also be trying to</p>
            <div className="mt-5 grid grid-cols-2 gap-5 max-md:grid-cols-1">
              {nextSlugs.map((slug) => {
                const item = solutions[slug];
                return <Link key={slug} href={`/solutions/${slug}`} className="group flex items-start justify-between gap-6 border-b border-line py-5 font-sans text-[22px] font-semibold leading-snug hover:text-amber-deep"><span><span className="mb-1 block text-[14px] font-semibold uppercase tracking-[0.14em] text-muted">{navLabels[`/solutions/${slug}`]}</span>{`${item.title} ${item.titleAccent}`}</span><MoveRight className="mt-1.5 size-5 shrink-0 transition-transform group-hover:translate-x-1" /></Link>;
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function SolutionPage({ content }: { content: SolutionPageContent }) {
  return (
    <div className={`solution-page solution-page-${content.theme}`}>
      <SolutionHero content={content} />
      <DefinitionSection content={content} />
      <ProblemSection content={content} />
      <ComparisonSection content={content} />
      <OutcomesSection content={content} />
      <MediaSection content={content} />
      <ApproachSection content={content} />
      <ServicesSection content={content} />
      <FitSection content={content} />
      <ProofSection content={content} />
      <FaqAndNext content={content} />
    </div>
  );
}
