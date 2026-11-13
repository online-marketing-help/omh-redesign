import type { Metadata } from "next";
import { BookDemo } from "@/components/BookDemo";
import { SocialLandingPage } from "@/components/SocialLandingSections";
import { ServiceJsonLd, defaultOgImages } from "@/lib/schema";

export const metadata: Metadata = {
  title: { absolute: "Instagram Marketing Agency UK | Ads, Reels & Growth | OMH" },
  description:
    "OMH is an Instagram marketing agency in Essex helping UK businesses grow with Reels, paid Instagram ads, carousels and account management. Free consultation.",
  openGraph: { title: "Instagram Marketing Agency UK | Ads, Reels & Growth", images: defaultOgImages },
  alternates: { canonical: "https://onlinemarketinghelp.co.uk/instagram-marketing-agency" },
};

export default function InstagramMarketingPage() {
  return (
    <>
      <ServiceJsonLd path="/instagram-marketing-agency" />
      <SocialLandingPage variant="instagram" event="instagram_marketing" />
      <BookDemo />
    </>
  );
}
