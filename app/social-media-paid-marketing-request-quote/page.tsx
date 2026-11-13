import type { Metadata } from "next";
import { QuoteFormPage } from "@/components/forms/QuoteFormPage";
import { socialPaidRequestQuote } from "@/lib/content/quote-forms";

export const metadata: Metadata = {
  title: socialPaidRequestQuote.seo.title,
  description: socialPaidRequestQuote.seo.description,
  alternates: { canonical: "https://onlinemarketinghelp.co.uk/social-media-paid-marketing-request-quote" },
};

export default function Page() {
  return <QuoteFormPage page={socialPaidRequestQuote} />;
}
