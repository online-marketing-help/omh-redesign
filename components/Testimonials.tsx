"use client";

import { useId, useState, type KeyboardEvent } from "react";
import { Reveal } from "@/components/Reveal";
import { ServiceBand, type ServiceBandLabel, type ServiceBandTone } from "@/components/services/ServiceBand";
import { siteTestimonials } from "@/lib/content/testimonials";

export type Testimonial = {
  quote: string;
  name: string;
  /** Role and company, shown after the name when known. Never guessed. */
  role?: string;
  company?: string;
  context?: string;
};

export function ServiceTestimonials({
  testimonials,
  title,
  body,
  eyebrow = "Customer feedback",
  label = "Customer reviews",
  eventPrefix,
  tone = "navy",
  accent = "bg-[#ee8c67]",
  labelStyle = "rule",
}: {
  testimonials: readonly Testimonial[];
  title: string;
  body: string;
  eyebrow?: string;
  label?: string;
  eventPrefix: string;
  tone?: ServiceBandTone;
  accent?: string;
  labelStyle?: ServiceBandLabel;
}) {
  const [current, setCurrent] = useState(0);
  const headingId = useId();
  const dark = tone === "navy" || tone === "dark";
  const count = testimonials.length;

  if (count === 0) return null;

  const show = (index: number) => setCurrent((index + count) % count);
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      show(current - 1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      show(current + 1);
    }
    if (event.key === "Home") {
      event.preventDefault();
      show(0);
    }
    if (event.key === "End") {
      event.preventDefault();
      show(count - 1);
    }
  };

  const secondary = dark ? "text-oninverse/62" : "text-ink/68";
  const rule = dark ? "border-oninverse/12" : "border-line";

  return (
    <ServiceBand label={label} tone={tone} accent={accent} labelStyle={labelStyle}>
      <Reveal>
        <div
          role="region"
          aria-roledescription="carousel"
          aria-labelledby={headingId}
          aria-label={`${label}: ${count} testimonials`}
          tabIndex={0}
          onKeyDown={onKeyDown}
          className="grid grid-cols-12 gap-x-12 gap-y-10 outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-4 max-lg:block"
        >
          <div className="col-span-4 max-lg:mb-10">
            <p className={`text-[14px] font-semibold uppercase tracking-[0.15em] ${dark ? "text-[#9bc3f3]" : "text-amber-deep"}`}>{eyebrow}</p>
            <h2 id={headingId} className="mt-5 font-sans text-h2 font-semibold">{title}</h2>
            <p className={`mt-5 text-body leading-relaxed ${secondary}`}>{body}</p>
            <div className={`mt-8 flex items-center gap-3 border-t pt-5 ${rule}`}>
              <button
                type="button"
                onClick={() => show(current - 1)}
                aria-label="Show previous testimonial"
                data-event={`${eventPrefix}_testimonial_previous`}
                className={`flex size-11 items-center justify-center rounded-full border transition-colors ${dark ? "border-oninverse/20 text-oninverse hover:border-oninverse/55 hover:bg-oninverse/10" : "border-line text-ink hover:border-teal hover:text-amber-deep"}`}
              >
                <span aria-hidden>←</span>
              </button>
              <button
                type="button"
                onClick={() => show(current + 1)}
                aria-label="Show next testimonial"
                data-event={`${eventPrefix}_testimonial_next`}
                className={`flex size-11 items-center justify-center rounded-full border transition-colors ${dark ? "border-oninverse/20 text-oninverse hover:border-oninverse/55 hover:bg-oninverse/10" : "border-line text-ink hover:border-teal hover:text-amber-deep"}`}
              >
                <span aria-hidden>→</span>
              </button>
              <p className={`ml-2 text-[18px] font-semibold tabular-nums ${secondary}`} aria-live="polite">
                {String(current + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
              </p>
            </div>
          </div>

          <div className="col-span-8 min-w-0">
            <div className="overflow-hidden rounded-card">
              <div className="flex items-stretch transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] motion-reduce:transition-none" style={{ transform: `translateX(-${current * 100}%)` }}>
                {testimonials.map((testimonialItem, index) => (
                  <article
                    key={`${testimonialItem.name}-${index}`}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${index + 1} of ${count}`}
                    aria-hidden={index === current ? undefined : true}
                    className={`flex w-full shrink-0 flex-col rounded-card border p-[clamp(24px,3vw,36px)] ${dark ? "border-oninverse/12 bg-oninverse/[0.04]" : "border-line bg-surface"}`}
                  >
                    <span className={`font-body text-[40px] leading-none ${dark ? "text-[#9bc3f3]" : "text-amber"}`} aria-hidden>“</span>
                    {/* Slides share the tallest quote's height; auto margins centre shorter quotes
                        instead of leaving a gap above the attribution. */}
                    <blockquote className={`my-auto py-3 font-body text-[clamp(19px,1.3vw,22px)] leading-[1.42] ${dark ? "text-oninverse/88" : "text-ink/88"}`}>{testimonialItem.quote}</blockquote>
                    <footer className={`mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 border-t pt-4 ${rule}`}>
                      <p className="font-sans text-body font-semibold">{testimonialItem.name}</p>
                      {(testimonialItem.role || testimonialItem.company) && (
                        <p className={`text-body ${secondary}`}>{[testimonialItem.role, testimonialItem.company].filter(Boolean).join(", ")}</p>
                      )}
                      {testimonialItem.context && (
                        <p className={`rounded-full border px-3 py-0.5 text-[14px] font-semibold uppercase tracking-[0.12em] ${dark ? "border-oninverse/20 text-oninverse/70" : "border-line text-muted"}`}>{testimonialItem.context}</p>
                      )}
                    </footer>
                  </article>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2" aria-label="Choose a testimonial">
              {testimonials.map((item, index) => (
                <button
                  key={`${item.name}-${index}`}
                  type="button"
                  onClick={() => show(index)}
                  aria-label={`Show testimonial ${index + 1} from ${item.name}`}
                  aria-current={index === current ? "true" : undefined}
                  data-event={`${eventPrefix}_testimonial_select`}
                  data-testimonial={item.name}
                  className={`h-1.5 rounded-full transition-all ${index === current ? `w-9 ${dark ? "bg-[#9bc3f3]" : "bg-teal"}` : `w-4 ${dark ? "bg-oninverse/22 hover:bg-surface/45" : "bg-line hover:bg-muted/45"}`}`}
                />
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </ServiceBand>
  );
}

export function SiteTestimonials({
  label,
  eventPrefix,
  title = "What customers said about working with OMH.",
  body = "Eight client reviews published on the original OMH service pages. They are customer comments, not evidence of a guaranteed result.",
  eyebrow = "Published customer reviews",
  tone = "navy",
  accent,
  labelStyle,
}: {
  label?: string;
  eventPrefix: string;
  title?: string;
  body?: string;
  eyebrow?: string;
  tone?: ServiceBandTone;
  accent?: string;
  labelStyle?: ServiceBandLabel;
}) {
  return (
    <ServiceTestimonials
      testimonials={siteTestimonials}
      label={label}
      title={title}
      body={body}
      eyebrow={eyebrow}
      eventPrefix={eventPrefix}
      tone={tone}
      accent={accent}
      labelStyle={labelStyle}
    />
  );
}
