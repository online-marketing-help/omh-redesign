import type { MetadataRoute } from "next";
import { SITE } from "@/lib/schema";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/design-system", "/lead-dashboard"] },
    sitemap: `${SITE}/sitemap.xml`,
  };
}
