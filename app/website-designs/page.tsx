import type { Metadata } from "next";
import { BookDemo } from "@/components/BookDemo";
import { WebsiteDesignsPage } from "@/components/WebsiteDesignsSections";
import { websiteDesigns } from "@/lib/content/website-designs";

export const metadata: Metadata = {
  title: { absolute: websiteDesigns.seo.title },
  description: websiteDesigns.seo.description,
  alternates: { canonical: "https://onlinemarketinghelp.co.uk/website-designs" },
};

export default function Page() {
  return (
    <>
      <WebsiteDesignsPage />
      <BookDemo />
    </>
  );
}
