// Shapes returned by lib/sanity/insights.ts. Kept separate from the queries so
// components depend on the data contract, not on Sanity.
export type InsightTopic = {
  slug: string;
  name: string;
};

export type InsightTerm = {
  slug: string;
  name: string;
};

export type InsightImage = {
  id: string;
  src: string;
  alt: string;
  title: string;
  width: number | null;
  height: number | null;
};

export type InsightIndexEntry = {
  id: string;
  slug: string;
  status: "published";
  title: string;
  publishedAt: string;
  modifiedAt: string;
  author: { id: string; name: string };
  summary: string;
  excerpt: string;
  topic: InsightTopic;
  categories: InsightTerm[];
  readingTime: number;
  featured: boolean;
  featuredImage: InsightImage | null;
  legacyUrl: string;
};

export type InsightPost = InsightIndexEntry & {
  contentHtml: string;
  tags: InsightTerm[];
  seo: {
    title: string | null;
    description: string | null;
    focusKeywords: string[];
    score: number | null;
  };
};

export function insightHref(post: Pick<InsightIndexEntry, "slug">) {
  return `/${post.slug}`;
}

// A thumbnail box takes its image's own shape (client, 22 Oct 2026): featured images run 5:3 to 1.91:1, and a
// fixed 16:10 box cropped the text off the wider ones. The aspect-[16/10] class stays as the fallback.
export function imageRatio({ featuredImage: i }: Pick<InsightIndexEntry, "featuredImage">) {
  return i?.width && i.height ? { aspectRatio: `${i.width} / ${i.height}` } : undefined;
}
