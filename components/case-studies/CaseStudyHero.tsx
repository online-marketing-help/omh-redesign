import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CaseStudyVisual } from "@/components/case-studies/CaseStudyVisual";
import { caseStudyServices, type CaseStudy } from "@/lib/content/case-studies";
import { AccentTitle } from "@/components/services/ServicePrimitives";

function Fact({ label, value, wide = false }: { label: string; value: string; wide?: boolean }) {
  return (
    <div className={wide ? "col-span-2 max-sm:col-span-1" : undefined}>
      <dt className="text-[14px] font-semibold uppercase tracking-[0.14em] text-muted">{label}</dt>
      <dd className="mt-2 text-body font-semibold text-ink">{value}</dd>
    </div>
  );
}

// Homepage hero ground and type, with the project facts under the lede rather
// than in a separate strip, and the cover framed like the homepage hero image.
export function CaseStudyHero({ study }: { study: CaseStudy }) {
  const services = study.serviceIds.length
    ? study.serviceIds.map((id) => caseStudyServices[id].label).join(", ")
    : "Illustration and graphic design";
  return (
    <header className="hero-grid overflow-x-clip border-b border-line bg-warm">
      {/* Trail at the site-wide breadcrumb position; see the same note in InsightArticle. */}
      <div className="container-omh section-md pt-4!">
        <Breadcrumbs
          items={[{ name: "Home", href: "/" }, { name: "Case Studies", href: "/case-studies" }, { name: study.client }]}
        />
        <div className="mt-[clamp(24px,7.4px+4.42vw,64px)] grid items-center gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div>
            <p className="text-[14px] font-semibold uppercase tracking-[0.14em] text-amber-deep">
              {study.category} · {study.sector}
            </p>
            <h1 className="mt-6 font-sans text-display font-semibold text-balance"><AccentTitle text={study.title} /></h1>
            <p className="mt-7 text-body leading-relaxed text-ink/75">{study.lede}</p>
            <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-line pt-7 max-sm:grid-cols-1">
              <Fact label="Client" value={study.client} />
              {study.duration ? <Fact label="Duration" value={study.duration} /> : <Fact label="Sector" value={study.sector} />}
              <Fact label="Services" value={services} wide />
            </dl>
          </div>
          <CaseStudyVisual
            study={study}
            ratio="5/4"
            priority
            caption
            frameClassName="shadow-[0_36px_90px_-42px_rgb(0_0_0/0.48)]"
          />
        </div>
      </div>
    </header>
  );
}
