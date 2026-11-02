import type { Metadata } from "next";
import { CaseStudyArchive } from "@/components/case-studies/CaseStudyArchive";
import { hubStudies } from "@/lib/content/case-studies-hub";
import { JsonLd, SITE, defaultOgImages } from "@/lib/schema";

const title = "Digital Marketing Case Studies | SEO, PPC & Websites | OMH";
const description =
  "Real UK client case studies across websites, SEO and Google Ads. See the work we delivered, with dated and sourced results.";
const url = `${SITE}/case-studies`;

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: url },
  openGraph: { title, description, url, type: "website", locale: "en_GB", images: defaultOgImages },
};

// CollectionPage with an ItemList of the projects (brief). Items carry no URL: none has a page of its own yet.
const collection = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Digital Marketing Case Studies",
  url,
  description,
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: hubStudies.length,
    itemListElement: hubStudies.map((study, index) => ({ "@type": "ListItem", position: index + 1, name: study.title })),
  },
};

export default function CaseStudiesPage() {
  return (
    <>
      <JsonLd data={collection} />
      <CaseStudyArchive />
    </>
  );
}
