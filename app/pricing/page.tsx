import type { Metadata } from "next";
import {
  PriceListFinalCta,
  PriceListHero,
  PriceTables,
} from "@/components/PriceListSections";
import { voicePricingCards } from "@/lib/content/ai-voice-agents-markup";

export const metadata: Metadata = {
  title: "All Services Price List",
  description:
    "Published package pricing for every Online Marketing Help service: WordPress and Shopify development, website maintenance, Google Ads, Amazon PPC, SEO, local SEO, social media management, Facebook, Instagram, paid social and AI voice agents.",
  alternates: { canonical: "https://onlinemarketinghelp.co.uk/pricing" },
};

export default function PriceListPage() {
  return (
    <main>
      <PriceListHero />
      <PriceTables voicePricingHtml={voicePricingCards} />
      <PriceListFinalCta />
    </main>
  );
}
