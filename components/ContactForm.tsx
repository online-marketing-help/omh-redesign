"use client";

import { useId, useState } from "react";
import { Field } from "@/components/ui/Field";
import { ArrowRight } from "@/components/ui/Button";
import { Honeypot, sendEnquiry } from "@/lib/send-enquiry";

const controlCls =
  "min-h-12 w-full rounded-input border-[1.5px] border-line bg-surface px-3.5 text-body text-ink placeholder:text-muted/70";

const needs = [
  "New website",
  "Website redesign",
  "WordPress support or fixes",
  "SEO",
  "Ecommerce SEO",
  "Google Ads",
  "Something else",
];

const budgets = ["Under £1,000", "£1,000 to £3,000", "£3,000 to £10,000", "Over £10,000", "Monthly retainer"];
const timings = ["As soon as possible", "Within 1 to 3 months", "Later this year", "Just researching"];

// Posts to /api/enquiry, which emails the answers to support@. Field names are
// the visible labels, so the email reads as the questions asked.
// Future Elementor widget: "OMH Consultation Form".
export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const needId = useId();
  const msgId = useId();
  const budgetId = useId();
  const timingId = useId();

  if (sent) {
    return (
      <div className="rounded-card border border-teal/25 bg-soft/50 p-8 max-sm:p-6" role="status">
        <h2 className="font-sans text-h3 font-semibold">Thanks - that&apos;s with us.</h2>
        <p className="mt-3 text-body leading-relaxed text-ink/75">
          A real person will review your enquiry and reply with a clear recommendation on the
          next step. If it&apos;s urgent, call us on{" "}
          <span className="font-semibold text-ink">020 3489 3934</span>.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-6 text-body font-semibold text-amber-deep underline underline-offset-4"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        setSending(true);
        setError(null);
        const result = await sendEnquiry(form, "Contact enquiry");
        setSending(false);
        if (!result.ok) return setError(result.message);
        setSent(true);
      }}
      data-event="wpdev_form_submit"
      className="rounded-card border border-line bg-surface p-8 max-sm:p-6"
    >
      <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1">
        <Field label="Full name" required placeholder="Jane Smith" />
        <Field label="Work email" type="email" required placeholder="jane@company.co.uk" />
        <Field label="Phone" type="tel" placeholder="020 0000 0000" />
        <Field label="Company" placeholder="Company name" />
        <div className="col-span-2 max-sm:col-span-1">
          <Field label="Website URL" placeholder="https://" help="If you have one already." />
        </div>

        <div className="col-span-2 flex flex-col gap-1.5 max-sm:col-span-1">
          <label htmlFor={needId} className="text-label font-semibold text-ink">
            What do you need?
          </label>
          <select id={needId} name="What do you need?" defaultValue="" className={controlCls}>
            <option value="" disabled>
              Choose one
            </option>
            {needs.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        {/* Audit T-29: qualification fields, so the reply can be specific
            rather than a request for the same details back. */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor={budgetId} className="text-label font-semibold text-ink">
            Rough budget
          </label>
          <select id={budgetId} name="Rough budget" defaultValue="" className={controlCls}>
            <option value="">Prefer not to say</option>
            {budgets.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor={timingId} className="text-label font-semibold text-ink">
            When do you want to start?
          </label>
          <select id={timingId} name="When do you want to start?" defaultValue="" className={controlCls}>
            <option value="">Not sure yet</option>
            {timings.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="col-span-2 flex flex-col gap-1.5 max-sm:col-span-1">
          <label htmlFor={msgId} className="text-label font-semibold text-ink">
            What&apos;s the goal or problem?
            <span className="text-error" aria-hidden>
              {" "}
              *
            </span>
          </label>
          <textarea
            id={msgId}
            name="What's the goal or problem?"
            required
            rows={4}
            placeholder="Tell us what&apos;s not working now and what you want the website to do."
            className={`${controlCls} min-h-28 py-3 leading-relaxed`}
          />
        </div>
      </div>

      <Honeypot />
      <button
        type="submit"
        disabled={sending}
        className="button-motion group mt-7 inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-button border-[1.5px] border-transparent bg-teal px-6 py-4 text-body font-semibold leading-none text-white hover:bg-teal-dark max-sm:w-full max-sm:justify-center"
      >
        {sending ? "Sending…" : "Send enquiry"}
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </button>
      {error && (
        <p role="alert" className="mt-4 text-body font-medium text-error">
          {error}
        </p>
      )}
      <p className="mt-4 text-bsm text-muted">
        We only use your details to respond to this enquiry.
      </p>
    </form>
  );
}
