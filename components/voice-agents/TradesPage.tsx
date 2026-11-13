import type { Metadata } from "next";
import { type Runs, VoiceLanding, sectionsOf } from "@/components/voice-agents/VoiceLanding";
import { LandingExtrasScript } from "@/components/voice-agents/LandingExtrasScript";
import { tradesExtrasMarkup } from "@/lib/content/voice-trades/extras";
import { tradesLandingMarkup } from "@/lib/content/voice-trades/landing";
import { tradesLegacyMarkup } from "@/lib/content/voice-trades/legacy";
import { tradesFaqs, tradesMarkup } from "@/lib/content/voice-trades/markup";
import { SITE, faqSchema } from "@/lib/schema";

/*
  /ai-voice-agents/trades (26 Oct 2026): the /ai-voice-agents layout, section for section, with content written for
  trades (electricians, carpenters and joiners, cleaning companies, roofing companies and landscaping services) from
  the client's brief (lib/content/voice-trades/). Cloned from BuildersPage.tsx. Rendered by
  app/ai-voice-agents/[industry]/page.tsx.
*/

const path = "/ai-voice-agents/trades";
const url = `${SITE}${path}`;
const ogTitle = "AI Voice Agent & AI Receptionist for Trades | OMH";
const ogDescription =
  "An AI receptionist for trades: electricians, carpenters, cleaners, roofers and landscapers. Answers calls 24/7, books quotes and site visits, never gives technical advice. Managed by OMH.";

export const tradesMetadata: Metadata = {
  title: { absolute: "AI Voice Agent & AI Receptionist for Trades | UK | OMH" },
  description:
    "An AI receptionist for trades: electricians, carpenters, cleaners, roofers and landscapers. Answers calls 24/7, books quotes and site visits, never gives technical advice. Managed by OMH.",
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
      name: "AI Voice Agent for Trades",
      serviceType: "AI voice agent and AI receptionist for trades",
      description:
        "An AI receptionist for trades is software that answers your business phone in natural, spoken conversation when you can't. It finds out what the caller needs (a quote, a repair, a booking or something urgent), answers from the prices and details you approve, books visits into your diary and passes urgent calls to whoever is on call. It never gives technical advice. Built around your trade and managed every month by OMH.",
      url,
      areaServed: { "@type": "Country", name: "United Kingdom" },
      audience: { "@type": "BusinessAudience", audienceType: "Electricians, carpenters and joiners, cleaning companies, roofing companies and landscaping services" },
      provider: { "@id": `${SITE}/#organisation` },
      offers: [offer("Starter", 249, 300, "£795"), offer("Growth", 449, 500, "£1,295"), offer("Scale", 849, 900, "£1,995")],
    },
    { ...faqSchema(tradesFaqs), "@id": `${url}#faq` },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: "AI Voice Agents", item: `${SITE}/ai-voice-agents` },
        { "@type": "ListItem", position: 3, name: "Trades", item: url },
      ],
    },
  ],
};

const fresh = sectionsOf(tradesMarkup, "va-page");
const legacy = sectionsOf(tradesLegacyMarkup, "va-page");
const v4 = sectionsOf(tradesLandingMarkup, "v4l");
const extras = sectionsOf(tradesExtrasMarkup, "va-page"); // trades only: a day on the tools

// The brief's section order: hero, what is, a day on the tools, trades we cover, what's included, how it works,
// client feedback, ROI calculator, pricing, local cover, FAQ. The "Trades we cover" card grid takes the place of the
// builders page's use cases.
const runs: Runs = [
  [v4, ["top"]],
  [fresh, ["what-is"]],
  [extras, ["day"]],
  [fresh, ["trades", "features"]],
  [v4, ["how"]],
  [legacy, ["feedback", "roi-calculator"]],
  [fresh, ["pricing"]],
  [v4, ["cities"]],
  [legacy, ["faq"]],
];

export function TradesPage() {
  return (
    <VoiceLanding
      runs={runs}
      breadcrumb
      graph={graph}
      page={path}
      thingsToTry={["Ask for a quote as a new customer.", "Say something is urgent and hear how it routes you.", "Ask something it can't know, and hear what it does."]}
      demoHeading={
        <>
          Book a 30-minute demo <span className="text-[#7d5c33]">for your trades business</span>
        </>
      }
    >
      <LandingExtrasScript />
    </VoiceLanding>
  );
}
