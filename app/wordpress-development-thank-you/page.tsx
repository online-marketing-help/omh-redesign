import type { Metadata } from "next";
import { ThankYouPage } from "@/components/forms/ThankYouPage";
import { wordpressDevelopmentThankYou } from "@/lib/content/thank-you";

export const metadata: Metadata = {
  title: wordpressDevelopmentThankYou.seo.title,
  description: wordpressDevelopmentThankYou.seo.description,
  alternates: { canonical: "https://onlinemarketinghelp.co.uk/wordpress-development-thank-you" },
  robots: { index: false, follow: true },
};

export default function Page() {
  return <ThankYouPage page={wordpressDevelopmentThankYou} />;
}
