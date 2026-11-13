import type { Metadata } from "next";
import { BookDemo } from "@/components/BookDemo";
import { RelatedServices } from "@/components/RelatedServices";
import { SiteTestimonials } from "@/components/Testimonials";
import {
  EcommerceSeoBenefits,
  EcommerceSeoConsultant,
  EcommerceSeoFAQ,
  EcommerceSeoFinalCTA,
  EcommerceSeoFit,
  EcommerceSeoHero,
  EcommerceSeoPackages,
  EcommerceSeoPlatforms,
  EcommerceSeoProblems,
  EcommerceSeoProcess,
  EcommerceSeoPromise,
  EcommerceSeoResults,
  EcommerceSeoServices,
  EcommerceSeoWhy,
  EcommerceSeoWhyOmh,
} from "@/components/services/EcommerceSeoSections";
import { ecommerceSeo as page } from "@/lib/content/ecommerce-seo";
import { JsonLd, SITE, ServiceJsonLd, defaultOgImages } from "@/lib/schema";

const url = `${SITE}${page.path}`;

export const metadata: Metadata = {
  title: { absolute: page.seo.title },
  description: page.seo.description,
  alternates: { canonical: url },
  openGraph: { type: "website", locale: "en_GB", siteName: "Online Marketing Help", title: page.seo.ogTitle, description: page.seo.ogDescription, url, images: defaultOgImages },
  twitter: { card: "summary_large_image", title: page.seo.ogTitle, description: page.seo.ogDescription },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: page.breadcrumb.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: `${SITE}${item.href === "/" ? "/" : item.href}` })),
};

export default function EcommerceSeoServicesPage() {
  return (
    <div className="service-page service-page-seo">
      <ServiceJsonLd path="/ecommerce-seo-services" />
      <JsonLd data={breadcrumb} />
      <EcommerceSeoHero />
      <EcommerceSeoWhy />
      <EcommerceSeoServices />
      <EcommerceSeoFit />
      <EcommerceSeoProblems />
      <EcommerceSeoBenefits />
      <EcommerceSeoConsultant />
      <EcommerceSeoPlatforms />
      <EcommerceSeoProcess />
      <EcommerceSeoPackages />
      <EcommerceSeoWhyOmh />
      <EcommerceSeoResults />
      <SiteTestimonials eventPrefix="ecommerce_seo" accent="bg-amber" />
      <EcommerceSeoPromise />
      <RelatedServices eventPrefix="ecommerce_seo" title={page.related.title} links={page.related.links} />
      <EcommerceSeoFAQ />
      <EcommerceSeoFinalCTA />
      <BookDemo />
    </div>
  );
}
