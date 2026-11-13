import type { Metadata } from "next";
import { ThankYouPage } from "@/components/forms/ThankYouPage";
import { calendlyThankYou } from "@/lib/content/thank-you";

export const metadata: Metadata = {
  title: calendlyThankYou.seo.title,
  description: calendlyThankYou.seo.description,
  alternates: { canonical: "https://onlinemarketinghelp.co.uk/calendly-thank-you" },
  robots: { index: false, follow: true },
};

export default function Page() {
  return <ThankYouPage page={calendlyThankYou} />;
}
