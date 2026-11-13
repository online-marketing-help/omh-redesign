import type { Metadata } from "next";
import { QuoteFormPage } from "@/components/forms/QuoteFormPage";
import { wordpressMaintenanceRequestQuote } from "@/lib/content/quote-forms";

export const metadata: Metadata = {
  title: wordpressMaintenanceRequestQuote.seo.title,
  description: wordpressMaintenanceRequestQuote.seo.description,
  alternates: { canonical: "https://onlinemarketinghelp.co.uk/wordpress-website-maintenance-request-quote" },
};

export default function Page() {
  return <QuoteFormPage page={wordpressMaintenanceRequestQuote} />;
}
