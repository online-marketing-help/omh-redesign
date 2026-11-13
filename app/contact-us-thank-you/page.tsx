import type { Metadata } from "next";
import { ThankYouPage } from "@/components/forms/ThankYouPage";
import { contactUsThankYou } from "@/lib/content/thank-you";

export const metadata: Metadata = {
  title: contactUsThankYou.seo.title,
  description: contactUsThankYou.seo.description,
  alternates: { canonical: "https://onlinemarketinghelp.co.uk/contact-us-thank-you" },
  robots: { index: false, follow: true },
};

export default function Page() {
  return <ThankYouPage page={contactUsThankYou} />;
}
