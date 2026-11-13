import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { ArrowRight } from "@/components/ui/Button";

// Global contextual-link section for any page that needs related routes.

export type RelatedServiceLink = {
  title: string;
  href: string;
  body?: string;
};

export function RelatedServices({
  label = "Related services",
  title,
  body,
  links,
  eventPrefix,
}: {
  label?: string;
  title: string;
  body?: string;
  links: RelatedServiceLink[];
  eventPrefix: string;
}) {
  return (
    <section className="border-y border-line bg-surface" aria-labelledby={`${eventPrefix}-related-title`}>
      <div className="container-omh section-md">
        <Reveal>
          <div className="grid grid-cols-12 gap-x-10 gap-y-8 max-lg:block">
            <div className="col-span-4 max-lg:mb-10">
              <p className="flex items-center gap-2.5 text-[14px] font-semibold uppercase tracking-[0.16em] text-muted before:h-0.5 before:w-5 before:bg-amber before:content-['']">
                {label}
              </p>
              <h2 id={`${eventPrefix}-related-title`} className="mt-6 font-sans text-h3 font-semibold text-balance">
                {title}
              </h2>
              {body && <p className="mt-5 text-body leading-relaxed text-ink/70">{body}</p>}
            </div>
            <div className={`col-span-8 grid gap-5 max-md:grid-cols-1 ${links.length === 4 ? "grid-cols-2" : "grid-cols-3"}`}>
              {links.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  data-event={`${eventPrefix}_related_service_click`}
                  data-service={link.title}
                  className="surface-card group flex min-h-full flex-col rounded-card border border-line bg-warm/55 p-6 text-ink"
                >
                  <span className="text-[18px] font-semibold tabular-nums tracking-[0.12em] text-amber">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 flex items-start gap-2 font-sans text-h4 font-semibold transition-colors group-hover:text-amber-deep">
                    <span>{link.title}</span>
                    <ArrowRight className="mt-1 size-4 shrink-0 transition-transform duration-500 group-hover:translate-x-1" />
                  </h3>
                  {link.body && <p className="mt-3 text-body leading-relaxed text-ink/70">{link.body}</p>}
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
