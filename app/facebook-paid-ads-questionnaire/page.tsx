import type { Metadata } from "next";
import { QuoteFormPage } from "@/components/forms/QuoteFormPage";
import { facebookAdsQuestionnaire } from "@/lib/content/quote-forms";

export const metadata: Metadata = {
  title: facebookAdsQuestionnaire.seo.title,
  description: facebookAdsQuestionnaire.seo.description,
  alternates: { canonical: "https://onlinemarketinghelp.co.uk/facebook-paid-ads-questionnaire" },
};

export default function Page() {
  return <QuoteFormPage page={facebookAdsQuestionnaire} />;
}
