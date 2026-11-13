import type { Metadata } from "next";
import { QuoteFormPage } from "@/components/forms/QuoteFormPage";
import { ppcRequestQuote } from "@/lib/content/quote-forms";

export const metadata: Metadata = {
  title: ppcRequestQuote.seo.title,
  description: ppcRequestQuote.seo.description,
  alternates: { canonical: "https://onlinemarketinghelp.co.uk/ppc-request-quote" },
};

export default function Page() {
  return <QuoteFormPage page={ppcRequestQuote} />;
}
