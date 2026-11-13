import type { Metadata } from "next";
import { BookDemo } from "@/components/BookDemo";
import { ServiceJsonLd } from "@/lib/schema";
import { ServiceCaseStudies } from "@/components/CaseStudies";
import { RelatedServices } from "@/components/RelatedServices";
import { socialMediaPaidAdvertising as content } from "@/lib/content/social-media-paid-advertising";
import {
  PaidSocialCapabilities,
  PaidSocialGoals,
  PaidSocialHero,
  PaidSocialPricing,
} from "@/components/services/SocialMediaPaidAdvertisingSections";
import {
  SocialFAQ,
  SocialFinalCTA,
  SocialGuaranteeAndReporting,
  SocialReviews,
} from "@/components/services/SocialMediaMarketingSections";

export const metadata: Metadata = {
  title: "Paid Social Media Advertising Agency UK",
  description:
    "A UK paid social media advertising agency running managed Meta, TikTok and LinkedIn campaigns. Strategy, audience, creative, tracking and budget handled for you. Request a paid social review.",
  alternates: { canonical: "https://onlinemarketinghelp.co.uk/social-media-paid-advertising" },
};

export default function SocialMediaPaidAdvertisingPage() {
  return (
    <div className="service-page service-page-paid-social">
      <ServiceJsonLd path="/social-media-paid-advertising" />
      <PaidSocialHero />
      <PaidSocialGoals />
      <PaidSocialCapabilities />
      <PaidSocialPricing />
      <ServiceCaseStudies
        serviceId="paid-social"
        title="Paid social within wider acquisition campaigns"
        body="Where paid social sat alongside website, search and wider paid-media work."
      />
      <SocialGuaranteeAndReporting guarantee={content.guarantee} />
      <SocialReviews />
      <SocialFAQ {...content.faq} items={content.faqs} />
      <RelatedServices
        eventPrefix="paid-social"
        title="Connect paid-social campaigns with content, search and landing pages"
        body="Campaign performance depends on the organic presence around the advert and the experience people reach after clicking."
        links={[
          { title: "Social Media Management", href: "/social-media-marketing-services", body: "Support paid reach with consistent organic content and community activity." },
          { title: "Google Ads Management", href: "/google-adwords-ppc", body: "Coordinate social demand generation with high-intent paid search campaigns." },
          { title: "WordPress Development", href: "/wordpress-development", body: "Build or improve the landing pages that turn paid-social clicks into enquiries." },
        ]}
      />
      <SocialFinalCTA {...content.finalCta} />
      <BookDemo />
    </div>
  );
}
