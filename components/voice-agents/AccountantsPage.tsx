import type { Metadata } from "next";
import { type Runs, VoiceLanding, sectionsOf } from "@/components/voice-agents/VoiceLanding";
import { LandingExtrasScript } from "@/components/voice-agents/LandingExtrasScript";
import { accountantsExtrasMarkup } from "@/lib/content/voice-accountants/extras";
import { accountantsLandingMarkup } from "@/lib/content/voice-accountants/landing";
import { accountantsLegacyMarkup } from "@/lib/content/voice-accountants/legacy";
import { accountantsFaqs, accountantsMarkup } from "@/lib/content/voice-accountants/markup";
import { SITE, faqSchema } from "@/lib/schema";

/*
  /ai-voice-agents/accountants-financial-advisers (26 Oct 2026): the /ai-voice-agents layout, section for section,
  with content from the client's brief for UK accountants, financial advisers, mortgage brokers and insurance brokers
  (lib/content/voice-accountants/). Rendered by app/ai-voice-agents/[industry]/page.tsx. Phase 2 of the SEO plan:
  this page replaces the separate insurance and financial services pages.
*/

const path = "/ai-voice-agents/accountants-financial-advisers";
const url = `${SITE}${path}`;
const ogTitle = "AI Voice Agent & AI Receptionist for Accountants | OMH";
const ogDescription = "An AI receptionist for accountants and advisers: every client call answered, even in the January rush. Built, tested and managed by a UK team.";

export const accountantsMetadata: Metadata = {
  title: { absolute: "AI Voice Agent & AI Receptionist for Accountants | UK | OMH" },
  description:
    "An AI receptionist for accountants, financial advisers and brokers in the UK. Answers client calls 24/7, books meetings and takes new enquiries. Never gives advice.",
  alternates: { canonical: url },
  openGraph: { type: "website", locale: "en_GB", siteName: "Online Marketing Help", title: ogTitle, description: ogDescription, url },
  twitter: { card: "summary_large_image", title: ogTitle, description: ogDescription },
};

const offer = (name: string, price: number, minutes: number, setup: string) => ({
  "@type": "Offer",
  name,
  description: `${minutes} minutes included, then 60p a minute. ${setup} one-off setup. Prices exclude VAT.`,
  url,
  priceSpecification: { "@type": "UnitPriceSpecification", price, priceCurrency: "GBP", unitText: "MONTH", valueAddedTaxIncluded: false },
});

const graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${url}#service`,
      name: "AI Voice Agent & AI Receptionist for Accountants & Financial Advisers",
      serviceType: "AI receptionist for accountants",
      description:
        "A managed AI voice agent and AI receptionist for UK accountants, financial advisers, mortgage brokers and insurance brokers. Answers calls 24/7, books meetings and takes new enquiries. Never gives financial advice.",
      url,
      areaServed: { "@type": "Country", name: "United Kingdom" },
      audience: { "@type": "BusinessAudience", audienceType: "Accountants, financial advisers, mortgage brokers and insurance brokers" },
      provider: { "@id": `${SITE}/#organisation` },
      offers: [offer("Starter", 249, 300, "£795"), offer("Growth", 449, 500, "£1,295"), offer("Scale", 849, 900, "£1,995")],
    },
    { ...faqSchema(accountantsFaqs), "@id": `${url}#faq` },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: "AI Voice Agents", item: `${SITE}/ai-voice-agents` },
        { "@type": "ListItem", position: 3, name: "Accountants & Financial Advisers", item: url },
      ],
    },
  ],
};

const fresh = sectionsOf(accountantsMarkup, "va-page");
const legacy = sectionsOf(accountantsLegacyMarkup, "va-page");
const v4 = sectionsOf(accountantsLandingMarkup, "v4l");
const extras = sectionsOf(accountantsExtrasMarkup, "va-page"); // a year at your firm, as a day of calls

// The brief's order: hero, what-is, a year at your firm, firms we cover, regulated firms, what's included,
// how it works, sample calls (client recordings, 3 Nov 2026), ROI calculator, pricing, local cover, FAQ.
const runs: Runs = [
  [v4, ["top"]],
  [fresh, ["what-is"]],
  [extras, ["day"]],
  [fresh, ["firms", "regulated", "features"]],
  [v4, ["how"]],
  [legacy, ["feedback", "roi-calculator"]],
  [fresh, ["pricing"]],
  [v4, ["cities"]],
  [legacy, ["faq"]],
];

export function AccountantsPage() {
  return (
    <VoiceLanding
      runs={runs}
      breadcrumb
      graph={graph}
      page={path}
      thingsToTry={["Ask for help with a tax return as a new client.", "Ask to speak to your adviser and hear how it routes you.", "Ask for advice and hear what it does."]}
      demoHeading={
        <>
          Book a 30-minute demo <span className="text-[#7d5c33]">for your firm</span>
        </>
      }
    >
      <LandingExtrasScript />
    </VoiceLanding>
  );
}
