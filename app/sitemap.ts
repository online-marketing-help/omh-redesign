import type { MetadataRoute } from "next";
import { readyPages } from "@/lib/content/nav";
import { allCaseStudyPages } from "@/lib/content/case-study-pages";
import { getInsightSlugs } from "@/lib/sanity/insights";
import { funnelPaths } from "@/lib/content/quote-forms";
import { SITE } from "@/lib/schema";

// Audit T-01: the live page-sitemap.xml holds 15 URLs and omits
// /wordpress-development/, About, Contact, FAQ and Case Studies. Deriving the
// sitemap from readyPages means a page can't be published and left out again.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const insightSlugs = await getInsightSlugs();

  const paths = [
    ...readyPages.map((p) => p.href),
    ...allCaseStudyPages.map((c) => `/case-studies/${c.slug}`),
    ...insightSlugs.map((slug) => `/${slug}`),
    ...funnelPaths,
  ];

  return paths.map((path) => ({
    url: `${SITE}${path}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
