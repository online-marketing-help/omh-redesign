import type { Metadata } from "next";
import { BookDemo } from "@/components/BookDemo";
import { ServiceJsonLd, defaultOgImages } from "@/lib/schema";
import { RelatedServices } from "@/components/RelatedServices";
import { ServiceCaseStudies } from "@/components/CaseStudies";
import {
  LocalSeoBenefits,
  LocalSeoFAQ,
  LocalSeoFinalCTA,
  LocalSeoFit,
  LocalSeoHero,
  LocalSeoMap,
  LocalSeoPricing,
  LocalSeoProcess,
  LocalSeoPromise,
  LocalSeoReviews,
  LocalSeoSignals,
  LocalSeoWhyOmh,
  LocalSeoWorkstreams,
} from "@/components/services/LocalSeoSections";

export const metadata: Metadata = {
  title: { absolute: "Local SEO Services for UK Small Businesses | OMH" },
  // ponytail: brief says "from £450/month"; "/month" dropped until billing frequency is confirmed (see pricing notes).
  description: "Local SEO services for UK businesses. Google Business Profile, local pages, directories, reviews and maps. Packages from £450 with published deliverables.",
  openGraph: { title: "Local SEO Services for UK Small Businesses", images: defaultOgImages },
  alternates: { canonical: "https://onlinemarketinghelp.co.uk/local-seo" },
};

export default function LocalSeoPage() {
  return (
    <div className="service-page service-page-local-seo">
      <ServiceJsonLd path="/local-seo" />
      <LocalSeoHero />
      <LocalSeoMap />
      <LocalSeoWorkstreams />
      <LocalSeoFit />
      <LocalSeoSignals />
      <LocalSeoBenefits />
      <LocalSeoProcess />
      <LocalSeoPricing />
      <LocalSeoWhyOmh />
      <ServiceCaseStudies
        serviceId="seo"
        title="See local SEO services in action"
        body="How local SEO services, business-profile work, website improvements and measurement came together for small businesses working in defined service areas."
        limit={3}
      />
      <LocalSeoReviews />
      <LocalSeoPromise />
      <RelatedServices
        eventPrefix="local_seo"
        title="Useful services connected to local SEO"
        body="Local SEO services often depend on wider SEO work, clearer website pages and content that answers location-specific customer questions."
        links={[
          { title: "Search Engine Optimisation", href: "/seo-services", body: "Connect local SEO services with the wider technical, content and authority programme." },
          { title: "WordPress Development", href: "/wordpress-development", body: "Build or improve service and location pages with a clear route to enquiry." },
          { title: "Website Design", href: "/website-designs", body: "Give local landing pages and service pages a structure customers can actually act on." },
        ]}
      />
      <LocalSeoFAQ />
      <LocalSeoFinalCTA />
      <BookDemo />
    </div>
  );
}
