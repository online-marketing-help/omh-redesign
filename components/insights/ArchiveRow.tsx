"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/ui/Button";
import { imageRatio, insightHref, type InsightIndexEntry } from "@/lib/content/insights-types";

// Shared by the server-rendered hub and the client-side archive filter.

export function InsightImage({ post, priority = false }: { post: InsightIndexEntry; priority?: boolean }) {
  if (!post.featuredImage) {
    return <span className="absolute inset-0 bg-[radial-gradient(circle_at_72%_24%,rgb(var(--accent-rgb)/0.24),transparent_28%),linear-gradient(145deg,#f8eddc,#efe1c9)]" />;
  }

  return (
    <Image
      src={post.featuredImage.src}
      alt={post.featuredImage.alt}
      fill
      priority={priority}
      sizes="(max-width: 1024px) 100vw, 62vw"
      className="object-cover transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.035]"
    />
  );
}

export function ArchiveRow({ post }: { post: InsightIndexEntry }) {
  return (
    <Link
      href={insightHref(post)}
      className="insight-row group grid grid-cols-[240px_minmax(0,1fr)_auto] items-center gap-x-9 gap-y-5 border-b border-line py-7 max-lg:grid-cols-[190px_minmax(0,1fr)_auto] max-md:grid-cols-1"
    >
      <span className="relative block aspect-[16/10] overflow-hidden rounded-[10px] border border-line bg-soft" style={imageRatio(post)}>
        <InsightImage post={post} />
      </span>

      <span className="min-w-0">
        <span className="flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-[14px] font-semibold uppercase tracking-[0.13em] text-muted">
          <span className="text-amber-deep">{post.topic.name}</span>
          <span aria-hidden>·</span>
          <time dateTime={post.publishedAt}>
            {new Intl.DateTimeFormat("en-GB", { month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(post.publishedAt))}
          </time>
          <span aria-hidden>·</span>
          <span className="normal-case tracking-normal">{post.readingTime} min read</span>
        </span>
        <span className="mt-3 block font-sans text-[clamp(22px,20px+0.35vw,27px)] font-semibold leading-tight text-balance">
          {post.title}
        </span>
        <span className="mt-3 block text-body leading-relaxed text-ink/66">{post.summary}</span>
      </span>

      <span className="flex size-11 items-center justify-center rounded-full border border-line text-amber-deep transition-colors group-hover:border-teal group-hover:bg-teal group-hover:text-white max-md:hidden">
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
