"use client";

import { usePathname } from "next/navigation";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { crumbLabels } from "@/lib/content/nav";

/*
  The breadcrumb on every page that doesn't draw its own (client, 29 Oct 2026: "add whole site, every page").
  Built from the URL: each parent that is a real page links, and names come from crumbLabels. It sits over the
  top of the page's first section, so no hero moves down.

  Pages that draw their own, and so are skipped here: the home page; /ai-voice-agents and everything under it (in
  the hero, from each page's BreadcrumbList); case studies and posts (in their heroes, they know their title). A post lives at
  /<slug>, so any one-segment path that isn't a known page is a post, or the 404 page, which has none either.
*/
const titleCase = (seg: string) => seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

function ownsCrumbs(path: string) {
  const segs = path.split("/").filter(Boolean);
  return (
    path === "/" ||
    /* The client dashboard is a workspace, not a page of the site: it has its
       own rail carrying the same navigation, and this breadcrumb is absolutely
       positioned so it landed on top of that rail. */
    path === "/lead-dashboard" ||
    path.startsWith("/lead-dashboard/") ||
    path === "/ai-voice-agents" ||
    path.startsWith("/ai-voice-agents/") ||
    (segs[0] === "case-studies" && segs.length > 1) ||
    (segs.length === 1 && !crumbLabels[path])
  );
}

export function SiteBreadcrumbs() {
  const pathname = usePathname();
  if (ownsCrumbs(pathname)) return null;
  const segs = pathname.split("/").filter(Boolean);
  const items: Crumb[] = [{ name: "Home", href: "/" }];
  segs.forEach((seg, i) => {
    const path = `/${segs.slice(0, i + 1).join("/")}`;
    const last = i === segs.length - 1;
    // ponytail: a path missing from crumbLabels is a planned page, and the coming-soon page titles itself the same way.
    items.push({ name: crumbLabels[path] ?? titleCase(seg), href: !last && crumbLabels[path] ? path : undefined });
  });

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-10">
      <Breadcrumbs items={items} className="container-omh pointer-events-auto pt-4" />
    </div>
  );
}
