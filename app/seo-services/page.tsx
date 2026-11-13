import type { Metadata } from "next";
import { BookDemo } from "@/components/BookDemo";
import { ServiceJsonLd } from "@/lib/schema";
import { RelatedServices } from "@/components/RelatedServices";
import { ServiceCaseStudies } from "@/components/CaseStudies";
import {
  SeoAffordable,
  SeoFAQ,
  SeoFinalCTA,
  SeoHero,
  SeoMedia,
  SeoProcess,
  SeoServicesGrid,
  SeoSmallBusiness,
  SeoTestimonials,
  SeoWhy,
} from "@/components/services/SeoServicesSections";
import { bestSeoServices } from "@/lib/content/seo-landing";

const meta = bestSeoServices.meta!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: `https://onlinemarketinghelp.co.uk${meta.path}` },
};

export default function SeoServicesPage() {
  return (
    <div className="service-page service-page-seo">
      <ServiceJsonLd path="/seo-services" />
      <SeoHero />
      <SeoWhy />
      <SeoServicesGrid />
      <SeoMedia />
      <SeoAffordable />
      <SeoProcess />
      <SeoSmallBusiness />
      <ServiceCaseStudies
        serviceId="seo"
        title="SEO work alongside website and campaign delivery"
        body="Organic search projects delivered for UK businesses, with the website and campaign work that sat around them."
      />
      <SeoTestimonials />
      <RelatedServices
        eventPrefix="best_seo"
        title="Connect SEO with the website and campaigns it supports"
        body="Organic search works alongside the local presence, pages and paid campaigns visitors reach after a click."
        links={[
          { title: "Ecommerce SEO", href: "/ecommerce-seo-services", body: "Category, product and technical SEO for Shopify, WooCommerce and Magento stores, reported against organic revenue." },
          { title: "Local SEO", href: "/local-seo", body: "Google Business Profile, local pages, citations and reviews for businesses serving defined areas." },
          { title: "WordPress Development", href: "/wordpress-development", body: "Build or improve the pages and conversion journeys organic visitors land on." },
          { title: "Google Ads Management", href: "/google-adwords-ppc", body: "Cover high-intent searches with paid campaigns while organic visibility builds." },
        ]}
      />
      <SeoFAQ />
      <SeoFinalCTA />
      <BookDemo />
    </div>
  );
}
