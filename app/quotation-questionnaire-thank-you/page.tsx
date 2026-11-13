import type { Metadata } from "next";
import { ThankYouPage } from "@/components/forms/ThankYouPage";
import { quotationQuestionnaireThankYou } from "@/lib/content/thank-you";

export const metadata: Metadata = {
  title: quotationQuestionnaireThankYou.seo.title,
  description: quotationQuestionnaireThankYou.seo.description,
  alternates: { canonical: "https://onlinemarketinghelp.co.uk/quotation-questionnaire-thank-you" },
  robots: { index: false, follow: true },
};

export default function Page() {
  return <ThankYouPage page={quotationQuestionnaireThankYou} />;
}
