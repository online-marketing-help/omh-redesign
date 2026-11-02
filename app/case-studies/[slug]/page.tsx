import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyPage } from "@/components/case-studies/CaseStudyPage";
import { allCaseStudyPages, getCaseStudyPage } from "@/lib/content/case-study-pages";
import { defaultOgImages } from "@/lib/schema";

type Props = {
  params: Promise<{ slug: string }>;
};

// Not `dynamicParams = false`: once revalidateTag("posts") expires this page, Next 16
// treats the path as unknown and app/[...slug] caches "Coming soon" in its place.
// Unknown slugs still 404 through notFound() below.

export function generateStaticParams() {
  return allCaseStudyPages.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getCaseStudyPage(slug);
  if (!page) return {};
  const canonical = `https://onlinemarketinghelp.co.uk/case-studies/${slug}`;
  return {
    title: { absolute: page.metaTitle },
    description: page.metaDescription,
    alternates: { canonical },
    openGraph: { title: page.metaTitle, description: page.metaDescription, url: canonical, type: "article", locale: "en_GB", images: defaultOgImages },
  };
}

export default async function CaseStudyRoute({ params }: Props) {
  const { slug } = await params;
  const page = getCaseStudyPage(slug);
  if (!page) notFound();
  return <CaseStudyPage study={page} />;
}
