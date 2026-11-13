import { Clock3 } from "lucide-react";
import type { InsightIndexEntry } from "@/lib/content/insights-types";

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export function formatInsightDate(value: string) {
  return dateFormatter.format(new Date(value));
}

export function InsightMeta({ post, inverse = false }: { post: InsightIndexEntry; inverse?: boolean }) {
  return (
    <p
      className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-[14px] font-semibold uppercase tracking-[0.1em] ${
        inverse ? "text-oninverse/62" : "text-muted"
      }`}
    >
      <span className={inverse ? "text-[var(--accent-light)]" : "text-amber-deep"}>{post.topic.name}</span>
      <span aria-hidden>·</span>
      <time dateTime={post.publishedAt}>{formatInsightDate(post.publishedAt)}</time>
      <span aria-hidden>·</span>
      <span className="inline-flex items-center gap-1.5 normal-case tracking-normal">
        <Clock3 className="size-3.5" aria-hidden />
        {post.readingTime} min read
      </span>
    </p>
  );
}
