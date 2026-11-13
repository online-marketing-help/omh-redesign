import type { Metadata } from "next";
import { QuoteFormPage } from "@/components/forms/QuoteFormPage";
import { wordpressDevelopmentRequestQuote } from "@/lib/content/quote-forms";

export const metadata: Metadata = {
  title: wordpressDevelopmentRequestQuote.seo.title,
  description: wordpressDevelopmentRequestQuote.seo.description,
  alternates: { canonical: "https://onlinemarketinghelp.co.uk/wordpress-development-request-quote" },
};

export default function Page() {
  return <QuoteFormPage page={wordpressDevelopmentRequestQuote} />;
}
