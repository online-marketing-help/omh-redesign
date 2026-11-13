import type { Metadata } from "next";
import { BookDemo } from "@/components/BookDemo";
import { SocialLandingPage } from "@/components/SocialLandingSections";
import { ServiceJsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Facebook Marketing Agency UK",
  description:
    "Facebook marketing agency for UK businesses. Page management, content creation, Facebook Ads and community growth by a dedicated team. Book a free consultation.",
  alternates: { canonical: "https://onlinemarketinghelp.co.uk/facebook-marketing-agency" },
};

export default function FacebookMarketingPage() {
  return (
    <>
      <ServiceJsonLd path="/facebook-marketing-agency" />
      <SocialLandingPage variant="facebook" event="facebook_marketing" />
      <BookDemo />
    </>
  );
}
