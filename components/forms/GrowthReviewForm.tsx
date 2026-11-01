"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { company } from "@/lib/content/nav";
import { Honeypot, sendEnquiry } from "@/lib/send-enquiry";

const cardCls = "rounded-card border border-line bg-surface p-8 shadow-[0_36px_90px_-42px_rgb(0_0_0/0.48)] max-sm:p-6";

// The short form on /get-more-leads. Posts to /api/enquiry like every other form on the site.
export function GrowthReviewForm() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (sent) {
    return (
      <div className={cardCls} role="status">
        <h2 className="font-sans text-h3 font-semibold">Thanks, that&apos;s with us.</h2>
        <p className="mt-3 text-body leading-relaxed text-ink/75">
          A real person will review your current activity and come back with the clearest next step. If it&apos;s
          urgent, call us on{" "}
          <Link href={company.phoneHref} className="font-semibold text-ink hover:text-amber-deep">
            {company.phoneDisplay}
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      data-event="get_more_leads_form_submit"
      onSubmit={async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        setSending(true);
        setError(null);
        const result = await sendEnquiry(form, "Free growth review");
        setSending(false);
        // On failure the answers stay on screen, so nothing typed is lost.
        if (!result.ok) return setError(result.message);
        setSent(true);
      }}
      className={cardCls}
    >
      <p className="text-[14px] font-semibold uppercase tracking-[0.16em] text-amber-deep">Free growth review</p>
      <h2 className="mt-3 font-sans text-h3 font-semibold">Book your free review</h2>
      <p className="mt-2 text-body text-ink/70">Four boxes. Takes 30 seconds.</p>

      <div className="mt-6 grid gap-5">
        <Field label="Your name" required placeholder="Jane Smith" autoComplete="name" />
        <Field label="Phone number" type="tel" required placeholder="07123 456789" autoComplete="tel" />
        <Field label="Email address" type="email" required placeholder="jane@business.co.uk" autoComplete="email" />
        {/* Plain text, not type="url", which would reject the www.yourbusiness.co.uk the placeholder invites. */}
        <Field label="Website (if you have one)" placeholder="www.yourbusiness.co.uk" autoComplete="url" />
      </div>

      <Honeypot />
      <button
        type="submit"
        disabled={sending}
        className="button-motion group mt-7 inline-flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-button border-[1.5px] border-transparent bg-teal px-6 py-4 text-body font-semibold leading-none text-white hover:bg-teal-dark disabled:cursor-wait disabled:opacity-70"
      >
        {sending ? "Sending…" : "Book a Growth Consultation"}
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </button>
      {error && (
        <p role="alert" className="mt-4 text-body font-medium text-error">
          {error}
        </p>
      )}
      <p className="mt-4 text-center text-bsm text-muted">We only use your details to contact you about your review.</p>
    </form>
  );
}
