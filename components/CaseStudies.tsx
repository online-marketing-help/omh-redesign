import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { CaseStudyVisual } from "@/components/case-studies/CaseStudyVisual";
import { ArrowRight, TextLink } from "@/components/ui/Button";
import {
  getCaseStudiesForService,
  type CaseStudy,
  type CaseStudyServiceId,
} from "@/lib/content/case-studies";
import { CASE_STUDIES_LIVE } from "@/lib/flags";

/*
  The related-work block reused across service pages. The archive and the single
  case study now live in components/case-studies/ (brief §9).
*/
function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <article className="surface-card group flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface">
      <Link
        href={`/case-studies/${study.slug}`}
        className="flex h-full flex-col"
        data-event="case_study_card_click"
        data-case-study={study.slug}
      >
        <CaseStudyVisual study={study} ratio="16/10" frameClassName="rounded-none" />
        <div className="flex flex-1 flex-col p-7">
          <p className="font-sans text-[14px] font-semibold uppercase tracking-[0.14em] text-amber-deep">
            {study.category}
            <span className="text-muted"> · {study.sector}</span>
          </p>
          <h3 className="mt-4 font-sans text-h4 font-semibold text-balance">{study.title}</h3>
          <span className="mt-auto inline-flex items-center gap-2 pt-6 text-body font-semibold text-amber-deep">
            Read case study
            <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </article>
  );
}

export function ServiceCaseStudies({
  serviceId,
  eyebrow = "Related case studies",
  title,
  body,
  limit = 3,
}: {
  serviceId: CaseStudyServiceId;
  eyebrow?: string;
  title: string;
  body: string;
  limit?: number;
}) {
  const matchingStudies = getCaseStudiesForService(serviceId);
  const studies = matchingStudies.slice(0, limit);
  const remainingStudies = matchingStudies.slice(limit);
  if (!CASE_STUDIES_LIVE || studies.length === 0) return null;

  return (
    <section className="border-y border-line bg-warm" aria-labelledby={`${serviceId}-case-studies-title`}>
      <div className="container-omh section-md">
        <Reveal>
          <div className="flex items-end justify-between gap-10 max-lg:block">
            <div>
              <p className="font-sans text-[14px] font-semibold uppercase tracking-[0.16em] text-amber-deep">
                {eyebrow}
              </p>
              <h2
                id={`${serviceId}-case-studies-title`}
                className="mt-5 font-sans text-h2 font-semibold text-balance"
              >
                {title}
              </h2>
            </div>
            <div className="max-lg:mt-5">
              <p className="text-body leading-relaxed text-ink/68">{body}</p>
              <div className="mt-4">
                <TextLink href="/case-studies">View all case studies</TextLink>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-3 gap-6 max-lg:grid-cols-1">
          {studies.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>

        {remainingStudies.length > 0 && (
          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-line pt-6">
            <span className="text-[14px] font-semibold uppercase tracking-[0.14em] text-muted">
              More related studies
            </span>
            {remainingStudies.map((study) => (
              <Link
                key={study.slug}
                href={`/case-studies/${study.slug}`}
                className="group inline-flex items-center gap-1.5 text-body font-semibold text-amber-deep hover:underline underline-offset-4"
              >
                {study.shortTitle}
                <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
