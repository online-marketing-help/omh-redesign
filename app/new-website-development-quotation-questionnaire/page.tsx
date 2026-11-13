import type { Metadata } from "next";
import { QuoteFormPage } from "@/components/forms/QuoteFormPage";
import { newWebsiteQuestionnaire } from "@/lib/content/quote-forms";

export const metadata: Metadata = {
  title: newWebsiteQuestionnaire.seo.title,
  description: newWebsiteQuestionnaire.seo.description,
  alternates: { canonical: "https://onlinemarketinghelp.co.uk/new-website-development-quotation-questionnaire" },
};

export default function Page() {
  return <QuoteFormPage page={newWebsiteQuestionnaire} />;
}
