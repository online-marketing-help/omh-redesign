import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IndustryScript } from "@/components/voice-agents/IndustryScript";
import { industryPages, type IndustryPath } from "@/lib/content/voice-industry";
import { JsonLd, SITE } from "@/lib/schema";

// Shared by app/ai-voice-agents/[industry] and [industry]/[city].

export function industryMetadata(path: string): Metadata {
  const page = industryPages[path as IndustryPath];
  if (!page) return {};
  const { meta } = page;
  return {
    title: { absolute: meta.title },
    ...("noindex" in meta && { robots: { index: false, follow: false } }),
    description: meta.description,
    alternates: { canonical: `${SITE}${meta.canonical}` },
    openGraph: {
      type: "website",
      locale: "en_GB",
      siteName: "Online Marketing Help",
      title: meta.ogTitle,
      description: meta.ogDescription,
      url: `${SITE}${meta.canonical}`,
    },
  };
}

export function IndustryPage({ path }: { path: string }) {
  const page = industryPages[path as IndustryPath];
  if (!page) notFound();
  return (
    <>
      {page.schema.length > 0 && <JsonLd data={page.schema} />}
      <div id="va-page" className={`va-page vi-page ${page.classes}`} dangerouslySetInnerHTML={{ __html: page.markup }} />
      <IndustryScript copy={page.copy} blocks={page.blocks} />
    </>
  );
}
