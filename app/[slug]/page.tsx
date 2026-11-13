import type { Metadata } from "next";
import { defaultOgImages } from "@/lib/schema";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { DraftPreviewBar } from "@/components/insights/DraftPreviewBar";
import { InsightArticle } from "@/components/insights/InsightArticle";
import { getInsight, getInsightSlugs } from "@/lib/sanity/insights";

type Props = { params: Promise<{ slug: string }> };

// New posts published in Sanity render on first request rather than needing a
// redeploy; existing ones are still pre-rendered at build time.
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getInsightSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { isEnabled: preview } = await draftMode();
  const post = await getInsight(slug, preview);
  if (!post) return { title: "Page not found" };
  return {
    // Draft preview is never indexed (client, 21 Oct 2026). Only an editor with the draft-mode cookie sees it.
    ...(preview && { robots: { index: false, follow: false, nocache: true } }),
    title: post.title,
    description: post.seo.description ?? post.summary,
    authors: [{ name: post.author.name }],
    alternates: { canonical: `https://onlinemarketinghelp.co.uk/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.seo.description ?? post.summary,
      publishedTime: post.publishedAt,
      modifiedTime: post.modifiedAt,
      images: post.featuredImage ? [{ url: post.featuredImage.src, alt: post.featuredImage.alt }] : defaultOgImages,
    },
  };
}

export default async function InsightPostPage({ params }: Props) {
  const { slug } = await params;
  const { isEnabled: preview } = await draftMode();
  const post = await getInsight(slug, preview);
  if (!post) notFound();
  return (
    <>
      {preview && <DraftPreviewBar slug={post.slug} />}
      <InsightArticle post={post} />
    </>
  );
}

