import type { Metadata } from "next";
import { ThankYouPage } from "@/components/forms/ThankYouPage";
import { seoThankYou } from "@/lib/content/thank-you";

export const metadata: Metadata = {
  title: seoThankYou.seo.title,
  description: seoThankYou.seo.description,
  alternates: { canonical: "https://onlinemarketinghelp.co.uk/search-engine-optimisation-thank-you" },
  robots: { index: false, follow: true },
};

export default function Page() {
  return <ThankYouPage page={seoThankYou} />;
}
