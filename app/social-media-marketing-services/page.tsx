import type { Metadata } from "next";
import { BookDemo } from "@/components/BookDemo";
import { ServiceJsonLd } from "@/lib/schema";
import { socialMediaMarketing as content } from "@/lib/content/social-media-marketing";
import { ServiceCaseStudies } from "@/components/CaseStudies";
import { RelatedServices } from "@/components/RelatedServices";
import {
  SocialFAQ,
  SocialFinalCTA,
  SocialGoals,
  SocialGuaranteeAndReporting,
  SocialHero,
  SocialPricing,
  SocialReviews,
  SocialSupport,
} from "@/components/services/SocialMediaMarketingSections";

export const metadata: Metadata = {
  title: "Social Media Marketing Services UK",
  description:
    "Social media marketing services for UK businesses. Strategy, content, graphics, community management and reporting from £450/mo. Book a free consultation.",
  alternates: { canonical: "https://onlinemarketinghelp.co.uk/social-media-marketing-services" },
};

export default function SocialMediaMarketingPage() {
  return (
    <div className="service-page service-page-social">
      <ServiceJsonLd path="/social-media-marketing-services" />
      <SocialHero />
      <SocialGoals />
      <SocialSupport />
      <SocialPricing />
      <ServiceCaseStudies
        serviceId="social-media"
        eyebrow="Social media marketing services in action"
        title="How our social media marketing agency services fit into a wider growth programme"
        body="Where social media sat alongside website, search and paid campaign delivery."
      />
      <SocialGuaranteeAndReporting guarantee={content.guarantee} reporting={content.reporting} />
      <SocialReviews label={content.reviewsLabel} title="What customers say about our social media marketing services." />
      <SocialFAQ {...content.faq} />
      <RelatedServices
        eventPrefix="social"
        label="Services that work alongside social media marketing"
        title="Connect your social media marketing services to the search, website and creative work around them"
        body="Social media marketing services work best when the brand, landing experience and connected acquisition channels tell the same story."
        links={[
          { title: "Google Ads Management", href: "/google-adwords-ppc", body: "Coordinate paid search with the offers and landing pages promoted through social." },
          { title: "Search Engine Optimisation", href: "/seo-services", body: "Build lasting organic visibility around the same audience needs and topics." },
          { title: "WordPress Development", href: "/wordpress-development", body: "Improve the pages and conversion journeys visitors reach from social content." },
        ]}
      />
      <SocialFinalCTA {...content.finalCta} />
      <BookDemo />
    </div>
  );
}
