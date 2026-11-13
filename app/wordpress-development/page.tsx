import type { Metadata } from "next";
import { BookDemo } from "@/components/BookDemo";
import { ServiceJsonLd } from "@/lib/schema";
import {
  CaseStudyFeature,
  FAQAccordion,
  FinalCTA,
  FitSection,
  IncludedFeatures,
  PainPointSection,
  PricingPackages,
  ProcessSteps,
  ServiceCapabilityGrid,
  ServiceHero,
  WhyChooseSection,
} from "@/components/services/WordPressServiceSections";
import { RelatedServices } from "@/components/RelatedServices";
import { ServiceCaseStudies } from "@/components/CaseStudies";
import { WordPressVisualStory } from "@/components/ServiceMedia";
import { SiteTestimonials } from "@/components/Testimonials";

export const metadata: Metadata = {
  // absolute: this title already ends in "| OMH", so skip the layout's "| Online Marketing Help".
  title: { absolute: "Expert WordPress Development Services UK | OMH" },
  alternates: { canonical: "https://onlinemarketinghelp.co.uk/wordpress-development" },
  description:
    "Custom WordPress development services from a UK agency. New builds, redesigns, plugins & integrations from £200. Book a free consultation.",
};

export default function WordPressDevelopmentPage() {
  return (
    <div className="service-page service-page-wordpress">
      <ServiceJsonLd path="/wordpress-development" />
      <ServiceHero />
      <WordPressVisualStory />
      <PainPointSection />
      <ServiceCapabilityGrid />
      <CaseStudyFeature />
      <ProcessSteps />
      <FitSection />
      <PricingPackages />
      <IncludedFeatures />
      <WhyChooseSection />
      <ServiceCaseStudies
        serviceId="wordpress"
        title="Website projects connected to wider growth"
        body="Website launches, information architecture, technical improvements and the acquisition work that followed them."
      />
      <SiteTestimonials eventPrefix="wordpress" accent="bg-amber" />
      <RelatedServices
        eventPrefix="wordpress"
        title="Support the website after it launches"
        body="A WordPress build often works alongside ongoing care, paid acquisition or an ecommerce platform decision. These pages explain the relevant options in more detail."
        links={[
          {
            title: "WordPress Website Maintenance",
            href: "/wordpress-website-maintenance",
            body: "Keep WordPress updates, backups, monitoring and agreed technical work on a regular schedule.",
          },
          {
            title: "Google Ads PPC Management",
            href: "/google-adwords-ppc",
            body: "Send measured paid-search traffic to campaign pages built around a clear conversion action.",
          },
          {
            title: "Search Engine Optimisation",
            href: "/seo-services",
            body: "Plan search intent, content architecture, technical requirements and internal links alongside the build.",
          },
        ]}
      />
      <FAQAccordion />
      <FinalCTA />
      <BookDemo />
    </div>
  );
}
