import type { Metadata } from "next";
import { SubscriptionThankYouPage } from "@/components/forms/ThankYouPage";
import { subscriptionThankYou } from "@/lib/content/thank-you";

export const metadata: Metadata = {
  title: subscriptionThankYou.seo.title,
  description: subscriptionThankYou.seo.description,
  alternates: { canonical: "https://onlinemarketinghelp.co.uk/subscription-thank-you" },
  robots: { index: false, follow: true },
};

export default function Page() {
  return <SubscriptionThankYouPage />;
}
