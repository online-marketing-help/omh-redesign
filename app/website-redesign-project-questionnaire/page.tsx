import type { Metadata } from "next";
import { QuoteFormPage } from "@/components/forms/QuoteFormPage";
import { websiteRedesignQuestionnaire } from "@/lib/content/quote-forms";

export const metadata: Metadata = {
  title: websiteRedesignQuestionnaire.seo.title,
  description: websiteRedesignQuestionnaire.seo.description,
  alternates: { canonical: "https://onlinemarketinghelp.co.uk/website-redesign-project-questionnaire" },
};

export default function Page() {
  return <QuoteFormPage page={websiteRedesignQuestionnaire} />;
}
