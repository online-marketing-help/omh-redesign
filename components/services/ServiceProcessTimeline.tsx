import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";
import { ServiceBand, type ServiceBandTone } from "@/components/services/ServiceBand";
import { ServiceSectionIntro } from "@/components/services/ServicePrimitives";
import { TextLink } from "@/components/ui/Button";

export function ServiceProcessTimeline({
  label,
  title,
  titleAccent,
  body,
  steps,
  action,
  intro,
  tone = "white",
  bandAccent = "bg-amber",
  headingMaxWidthClassName,
  bodyClassName,
}: {
  label: string;
  title?: string;
  titleAccent?: string;
  body?: ReactNode;
  steps: ReadonlyArray<ReadonlyArray<string>>;
  action: { label: ReactNode; event: string; href?: string };
  intro?: ReactNode;
  tone?: ServiceBandTone;
  bandAccent?: string;
  headingMaxWidthClassName?: string;
  bodyClassName?: string;
}) {
  return (
    <ServiceBand label={label} tone={tone} accent={bandAccent}>
      <Reveal>
        <div className="grid grid-cols-12 gap-x-10 gap-y-10 max-lg:block">
          <div className="col-span-4 max-lg:mb-10">
            <div className="lg:sticky lg:top-24">
              {intro ??
                (title ? (
                  <ServiceSectionIntro
                    size="md"
                    title={title}
                    accent={titleAccent}
                    body={body}
                    headingMaxWidthClassName={headingMaxWidthClassName}
                    bodyClassName={bodyClassName}
                  />
                ) : null)}
              <div className="mt-8">
                <TextLink href={action.href ?? "/contact"} data-event={action.event}>
                  {action.label}
                </TextLink>
              </div>
            </div>
          </div>

          <ol className="relative col-span-8 border-l border-line pl-9 max-sm:pl-7">
            {steps.map(([stepTitle, stepBody], index) => (
              <li key={stepTitle} className="group/step relative pb-10 last:pb-0">
                <span
                  aria-hidden
                  className="absolute -left-[51px] top-0.5 flex size-[30px] items-center justify-center rounded-full border border-line bg-surface font-sans text-[18px] font-semibold tabular-nums text-amber-deep transition-colors group-hover/step:border-teal group-hover/step:bg-teal group-hover/step:text-white max-sm:-left-[43px]"
                >
                  {index + 1}
                </span>
                <h3 className="font-sans text-h3 font-semibold">{stepTitle}</h3>
                <p className="mt-2.5 text-body leading-relaxed text-ink/75">
                  {stepBody}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>
    </ServiceBand>
  );
}
