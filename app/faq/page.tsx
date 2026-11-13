import type { Metadata } from "next";
import {
  FaqFinalCta,
  FaqGroups,
  FaqHero,
  FaqPricingLink,
} from "@/components/faq/FaqPageSections";
import { faqPage } from "@/lib/content/faq-page";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to the questions UK businesses ask Online Marketing Help most often, covering how we work, cost, design, development, maintenance and contact.",
  alternates: { canonical: "https://onlinemarketinghelp.co.uk/faq" },
};

// FAQPage schema built from the same data the page renders, so the two can't drift.
function FaqJsonLd() {
  const mainEntity = faqPage.groups.flatMap((group) =>
    group.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      // Answers carry [anchor](/path) links for the page; the schema needs plain text.
      acceptedAnswer: { "@type": "Answer", text: item.a.join(" ").replace(/\[([^\]]+)\]\(\/[^)]*\)/g, "$1") },
    })),
  );
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity }).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export default function FaqPage() {
  return (
    <main>
      <FaqJsonLd />
      <FaqHero />
      <FaqGroups />
      <FaqPricingLink />
      <FaqFinalCta />
    </main>
  );
}
