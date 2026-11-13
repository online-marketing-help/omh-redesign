import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";
import { HighlightedText } from "@/components/services/ServicePrimitives";
import { Button } from "@/components/ui/Button";
import { company } from "@/lib/content/nav";

/*
  The single closing section for the site (brief §5). Ink ground, white type,
  amber accent, Instrument Sans heading, 18px body — the same language as the
  home page, so no page ends on a surface the visitor has not seen before.
  Future Elementor widget: "OMH Final CTA".
*/

export type CtaAction = { label: ReactNode; event: string; href?: string };

const defaultSteps = [
  "Review the current position",
  "Define the commercial objective",
  "Agree the work and measurement",
] as const;

export function FinalCta({
  title,
  titleAccent,
  body,
  primary,
  secondary,
  steps = defaultSteps,
  stepsHeading = "What happens next",
  contactEvents,
  id,
  aside,
  tag,
  note,
}: {
  title: string;
  titleAccent?: string;
  body: ReactNode;
  primary: CtaAction;
  secondary?: CtaAction;
  steps?: readonly string[];
  stepsHeading?: string;
  contactEvents?: { phone: string; email: string };
  id?: string;
  /** Replaces the steps panel, for pages whose closer carries an offer instead. */
  aside?: ReactNode;
  /** A small pill above the heading, e.g. "Free, no obligation". */
  tag?: string;
  /** A line under the steps, e.g. a pointer to the contact page. */
  note?: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20 bg-inverse text-oninverse">
      <div className="container-omh section-md grid grid-cols-12 items-start gap-x-10 gap-y-10 max-lg:block">
        <Reveal className="col-span-7">
          {tag && (
            <span className="mb-5 inline-flex rounded-full bg-teal px-3 py-1 text-[14px] font-semibold text-white">{tag}</span>
          )}
          <h2 className="mb-5 font-sans text-h2 font-semibold text-balance">
            <HighlightedText text={title} highlight={titleAccent} highlightClassName="text-[#7d5c33]" />
          </h2>
          <p className="mb-9 text-body leading-relaxed text-oninverse/75">{body}</p>
          <div className="flex flex-wrap items-center gap-3.5 max-sm:flex-col max-sm:items-stretch">
            <Button href={primary.href ?? "/contact"} variant="inverse" arrow data-event={primary.event}>
              {primary.label}
            </Button>
            {secondary && (
              <Button
                href={secondary.href ?? "/contact"}
                variant="ghost-white"
                data-event={secondary.event}
              >
                {secondary.label}
              </Button>
            )}
          </div>
          {contactEvents && (
            <p className="mt-8 flex flex-wrap items-center gap-x-2.5 gap-y-2 text-body text-oninverse/65">
              <Link
                href={company.phoneHref}
                data-event={contactEvents.phone}
                className="underline underline-offset-4 hover:text-oninverse"
              >
                {company.phoneDisplay}
              </Link>
              <span aria-hidden className="text-oninverse/35 max-sm:hidden">
                /
              </span>
              <Link
                href={`mailto:${company.email}`}
                data-event={contactEvents.email}
                className="break-all underline underline-offset-4 hover:text-oninverse max-sm:basis-full"
              >
                {company.email}
              </Link>
            </p>
          )}
        </Reveal>

        <Reveal className="col-span-4 col-start-9 max-lg:mt-10">
          {aside ?? (
          <div className="rounded-card border border-oninverse/15 bg-oninverse/[0.04] p-8 max-sm:p-6">
            <p className="mb-6 text-[14px] font-semibold uppercase tracking-[0.16em] text-oninverse/55">
              {stepsHeading}
            </p>
            <ol className="grid gap-5">
              {steps.map((step, index) => (
                <li key={step} className="grid grid-cols-[auto_1fr] items-start gap-4">
                  <span
                    aria-hidden
                    className="flex size-8 shrink-0 items-center justify-center rounded-full border border-oninverse/25 font-sans text-[18px] font-semibold tabular-nums text-[#7d5c33]"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-body leading-snug text-oninverse/85">{step}</span>
                </li>
              ))}
            </ol>
            {note && <p className="mt-6 border-t border-oninverse/15 pt-5 text-body text-oninverse/70">{note}</p>}
          </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
