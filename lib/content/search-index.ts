import { caseStudies } from "@/lib/content/case-studies";
import { readyPages } from "@/lib/content/nav";
import { freeConsultation, quoteFormPages } from "@/lib/content/quote-forms";
import { getInsightSearchEntries } from "@/lib/sanity/insights";

export type SearchEntry = {
  title: string;
  href: string;
  group: "Page" | "Case study" | "Insight";
  hint?: string;
};

// Titles only — the client filters a flat list in memory instead of calling a
// search service. Async because the blog titles now come from Sanity.
export async function getSearchIndex(): Promise<SearchEntry[]> {
  const insights = await getInsightSearchEntries();

  return [
    ...readyPages.map((page) => ({ title: page.label, href: page.href, group: "Page" as const })),
    // Funnel pages are deliberately out of `readyPages`, but someone searching
    // "quote" should still find them.
    ...quoteFormPages.map((page) => ({
      title: page.seo.title,
      href: `/${page.slug}`,
      group: "Page" as const,
    })),
    { title: freeConsultation.seo.title, href: `/${freeConsultation.slug}`, group: "Page" as const },
    { title: "Free Growth Review", href: "/get-more-leads", group: "Page" as const },
    ...caseStudies.map((study) => ({
      title: study.shortTitle,
      href: `/case-studies/${study.slug}`,
      group: "Case study" as const,
      hint: study.sector,
    })),
    ...insights.map((post) => ({
      title: post.title,
      href: `/${post.slug}`,
      group: "Insight" as const,
      hint: post.topic,
    })),
  ];
}
