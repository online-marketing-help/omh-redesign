import type { Metadata } from "next";
import { QuoteFormPage } from "@/components/forms/QuoteFormPage";
import { seoRequestQuote } from "@/lib/content/quote-forms";

export const metadata: Metadata = {
  title: seoRequestQuote.seo.title,
  description: seoRequestQuote.seo.description,
  alternates: { canonical: "https://onlinemarketinghelp.co.uk/seo-request-quote" },
};

export default function Page() {
  return <QuoteFormPage page={seoRequestQuote} />;
}
