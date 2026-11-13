import type { Metadata } from "next";
import { BookDemo } from "@/components/BookDemo";
import { ServiceJsonLd } from "@/lib/schema";
import {
  AmazonAccountDiagnosis,
  AmazonCampaignMap,
  AmazonFAQ,
  AmazonFinalCTA,
  AmazonPpcHero,
  AmazonPricing,
  AmazonProcess,
  AmazonProofGuide,
} from "@/components/services/AmazonPpcSections";
import { RelatedServices } from "@/components/RelatedServices";
import { AmazonMarketplaceWorkbench } from "@/components/ServiceMedia";
import { SiteTestimonials } from "@/components/Testimonials";

export const metadata: Metadata = {
  title: "Amazon PPC Advertising Agency UK",
  description:
    "A UK Amazon PPC agency managing Sponsored Products, Brands, Display and DSP, with tight control of ad spend, search terms and attributed sales.",
  alternates: {
    canonical: "https://onlinemarketinghelp.co.uk/amazon-ppc-advertising-agency-uk",
  },
};

export default function AmazonPpcAdvertisingAgencyUkPage() {
  return (
    <div className="service-page service-page-amazon">
      <ServiceJsonLd path="/amazon-ppc-advertising-agency-uk" />
      <AmazonPpcHero />
      <AmazonMarketplaceWorkbench />
      <AmazonAccountDiagnosis />
      <AmazonCampaignMap />
      <AmazonProcess />
      <AmazonPricing />
      <AmazonProofGuide />
      <SiteTestimonials eventPrefix="amazon" accent="bg-[#ff9900]" />
      <RelatedServices
        eventPrefix="amazon"
        title="Connect marketplace advertising with wider ecommerce growth"
        body="Amazon PPC covers demand inside the marketplace. These services support paid search beyond Amazon, an owned ecommerce store and the website platform behind the wider brand."
        links={[
          {
            title: "Google Ads PPC Management",
            href: "/google-adwords-ppc",
            body: "Reach relevant searches and Shopping traffic outside Amazon with defined conversion tracking.",
          },
          {
            title: "Shopify Development",
            href: "/shopify-development",
            body: "Build or improve an owned storefront, product journey and checkout alongside marketplace sales.",
          },
          {
            title: "WordPress Development",
            href: "/wordpress-development",
            body: "Create campaign, content or brand pages when the wider website needs a clearer structure.",
          },
        ]}
      />
      <AmazonFAQ />
      <AmazonFinalCTA />
      <BookDemo />
    </div>
  );
}
