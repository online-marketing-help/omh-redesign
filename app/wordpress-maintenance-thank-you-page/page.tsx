import type { Metadata } from "next";
import { ThankYouPage } from "@/components/forms/ThankYouPage";
import { wordpressMaintenanceThankYou } from "@/lib/content/thank-you";

export const metadata: Metadata = {
  title: wordpressMaintenanceThankYou.seo.title,
  description: wordpressMaintenanceThankYou.seo.description,
  alternates: { canonical: "https://onlinemarketinghelp.co.uk/wordpress-maintenance-thank-you-page" },
  robots: { index: false, follow: true },
};

export default function Page() {
  return <ThankYouPage page={wordpressMaintenanceThankYou} />;
}
