import type { Metadata } from "next";
import { BookDemo } from "@/components/BookDemo";
import { defaultOgImages } from "@/lib/schema";
import { notFound } from "next/navigation";
import { SolutionPage } from "@/components/solutions/SolutionPage";
import { solutionOrder, solutions } from "@/lib/content/solutions";

// `seoTitle` replaces the "| Online Marketing Help" template where a brief sets the full title.
const metadataBySlug: Record<string, { title: string; description: string; seoTitle?: string }> = {
  "generate-qualified-leads": {
    title: "Generate More Qualified Leads",
    seoTitle: "Generate More Qualified Leads for UK Businesses | OMH",
    description: "Generate more qualified leads by improving targeting, landing pages, qualification, and tracking. Find where lead quality is breaking down and what to fix first.",
  },
  "increase-ecommerce-sales": {
    title: "Ecommerce Growth Strategy",
    seoTitle: "Ecommerce Growth Strategy for UK Brands | OMH",
    description: "Build a clearer ecommerce growth strategy around acquisition, shopfront performance, conversion, and measurement. Find the right opportunities to grow sales.",
  },
  "improve-website-conversion": {
    title: "Improve Website Conversion",
    seoTitle: "Improve Website Conversion for UK Businesses | OMH",
    description: "Find out what is stopping relevant visitors from enquiring, booking or buying. Review website conversion friction, prioritise the right changes and improve the customer journey.",
  },
  "grow-local-visibility": {
    title: "Improve Local Search Visibility",
    seoTitle: "Improve Local Search Visibility for UK Businesses | OMH",
    description: "Find out what is limiting your local search visibility across Google Maps, your website, reviews and service areas, then prioritise the right next steps.",
  },
  "outsource-digital-marketing": {
    title: "Outsourced Digital Marketing Support",
    seoTitle: "Outsourced Digital Marketing Support UK | OMH",
    description: "Add strategy, specialist delivery and clear ownership without hiring every marketing role in-house. Explore flexible outsourced digital marketing support from OMH.",
  },
};

export function generateStaticParams() {
  return solutionOrder.map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const meta = metadataBySlug[slug];
  if (!meta) return {};

  return {
    title: meta.seoTitle ? { absolute: meta.seoTitle } : meta.title,
    description: meta.description,
    alternates: { canonical: `https://onlinemarketinghelp.co.uk/solutions/${slug}` },
    openGraph: {
      title: meta.seoTitle ?? `${meta.title} | Online Marketing Help`,
      description: meta.description,
      type: "website",
      images: defaultOgImages,
      locale: "en_GB",
      url: `https://onlinemarketinghelp.co.uk/solutions/${slug}`,
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const content = solutions[slug];
  if (!content) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: metadataBySlug[slug].title,
    description: metadataBySlug[slug].description,
    provider: {
      "@type": "Organization",
      name: "Online Marketing Help",
      url: "https://onlinemarketinghelp.co.uk/",
    },
    areaServed: { "@type": "Country", name: "United Kingdom" },
    url: `https://onlinemarketinghelp.co.uk/solutions/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
      />
      <SolutionPage content={content} />
      {/* Client, 26 Oct 2026: the enquiry-form section is gone; its eyebrow and title now head the booking section. */}
      <BookDemo id="enquire" eyebrow={content.final.eyebrow ?? "Start with the real problem"} heading={content.final.title} />
    </>
  );
}
