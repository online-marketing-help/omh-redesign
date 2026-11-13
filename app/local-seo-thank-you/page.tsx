import type { Metadata } from "next";
import { ThankYouPage } from "@/components/forms/ThankYouPage";
import { localSeoThankYou } from "@/lib/content/thank-you";

export const metadata: Metadata = {
  title: localSeoThankYou.seo.title,
  description: localSeoThankYou.seo.description,
  alternates: { canonical: "https://onlinemarketinghelp.co.uk/local-seo-thank-you" },
  robots: { index: false, follow: true },
};

export default function Page() {
  return <ThankYouPage page={localSeoThankYou} />;
}
