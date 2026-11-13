"use client";

import { useIsPresentationTool } from "next-sanity/hooks";

// Shown while draft mode is on, so nobody mistakes a draft for the live post. Hidden inside the Studio's
// Presentation tool, which has its own controls; elsewhere it offers a way out of preview.
export function DraftPreviewBar({ slug }: { slug: string }) {
  const inStudio = useIsPresentationTool();
  if (inStudio) return null;
  return (
    <div className="sticky top-0 z-50 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 bg-amber px-4 py-2 text-center text-body font-semibold text-navy">
      <span>Draft preview: unpublished changes, hidden from search engines</span>
      <a href={`/api/draft-mode/disable?redirect=/${slug}`} className="underline underline-offset-4">
        Exit preview
      </a>
    </div>
  );
}
