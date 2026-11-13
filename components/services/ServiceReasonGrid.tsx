import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";
import { ServiceBand, type ServiceBandTone } from "@/components/services/ServiceBand";
import { CheckIcon, ServiceSectionIntro, withLinks } from "@/components/services/ServicePrimitives";

export function ServiceReasonGrid({
  title,
  titleAccent,
  body,
  reasons,
  label = "Why OMH",
  tone = "warm",
  bandAccent = "bg-amber",
  children,
}: {
  title: string;
  titleAccent?: string;
  body?: ReactNode;
  reasons: ReadonlyArray<ReadonlyArray<string>>;
  label?: string;
  tone?: ServiceBandTone;
  bandAccent?: string;
  children?: ReactNode;
}) {
  return (
    <ServiceBand label={label} tone={tone} accent={bandAccent}>
      <Reveal>
        <ServiceSectionIntro title={title} accent={titleAccent} body={body} />
        <div className="mt-12 grid grid-cols-2 gap-x-12 max-lg:grid-cols-1">
          {reasons.map(([reasonTitle, reasonBody]) => (
            <article
              key={reasonTitle}
              className="group border-t border-line py-6 transition-colors duration-200 hover:border-teal/50"
            >
              <h3 className="flex items-start gap-3 font-sans text-h4 font-semibold">
                <CheckIcon className="mt-1 size-4 shrink-0 text-amber-deep" />
                {reasonTitle}
              </h3>
              <p className="mt-2.5 pl-7 text-body leading-relaxed text-ink/75">
                {withLinks(reasonBody)}
              </p>
            </article>
          ))}
        </div>
        {children}
      </Reveal>
    </ServiceBand>
  );
}
