import type { Metadata } from "next";
import { type Runs, VoiceLanding, sectionsOf } from "@/components/voice-agents/VoiceLanding";
import { LandingExtrasScript } from "@/components/voice-agents/LandingExtrasScript";
import { hvacExtrasMarkup } from "@/lib/content/voice-hvac/extras";
import { hvacLandingMarkup } from "@/lib/content/voice-hvac/landing";
import { hvacLegacyMarkup } from "@/lib/content/voice-hvac/legacy";
import { hvacFaqs, hvacMarkup } from "@/lib/content/voice-hvac/markup";
import { SITE, faqSchema } from "@/lib/schema";

/*
  /ai-voice-agents/heating-hvac (21 Oct 2026): the /ai-voice-agents layout, section for section, with content
  written for heating and HVAC engineers (lib/content/voice-hvac/). Rendered by
  app/ai-voice-agents/[industry]/page.tsx. A new page: there is no earlier version to keep.
*/

const path = "/ai-voice-agents/heating-hvac";
const url = `${SITE}${path}`;
const ogTitle = "AI Voice Agent & AI Receptionist for Heating & HVAC | OMH";
const ogDescription = "An AI receptionist for HVAC services: every breakdown call answered, even when the first cold snap hits. Built, tested and managed by a UK team.";

export const hvacMetadata: Metadata = {
  title: { absolute: "AI Voice Agent & AI Receptionist for Heating & HVAC Services | OMH" },
  description:
    "An AI receptionist for HVAC services and heating engineers in the UK. Answers calls 24/7, books breakdowns, boiler services and gas safety certificates. Never diagnoses a fault.",
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
      name: "AI Voice Agent for Heating & HVAC Engineers",
      serviceType: "AI voice agent and AI receptionist for heating, boiler and HVAC engineers",
      description:
        "Managed AI voice agents that answer customer calls, book breakdowns, boiler services and landlord gas safety certificates, take quote requests for new boilers, heat pumps and air conditioning, and route urgent calls for UK heating and HVAC engineers. They never diagnose a fault.",
      url,
      areaServed: { "@type": "Country", name: "United Kingdom" },
      audience: { "@type": "BusinessAudience", audienceType: "Heating and HVAC engineers" },
      provider: { "@id": `${SITE}/#organisation` },
      offers: [offer("Starter", 249, 300, "£795"), offer("Growth", 449, 500, "£1,295"), offer("Scale", 849, 900, "£1,995")],
    },
    { ...faqSchema(hvacFaqs), "@id": `${url}#faq` },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: "AI Voice Agents", item: `${SITE}/ai-voice-agents` },
        { "@type": "ListItem", position: 3, name: "Trades", item: `${SITE}/ai-voice-agents/trades` },
        { "@type": "ListItem", position: 4, name: "Heating & HVAC", item: url },
      ],
    },
  ],
};

const fresh = sectionsOf(hvacMarkup, "va-page");
const legacy = sectionsOf(hvacLegacyMarkup, "va-page");
const v4 = sectionsOf(hvacLandingMarkup, "v4l");
const extras = sectionsOf(hvacExtrasMarkup, "va-page"); // heating firms only: a firm's day of calls

// The same order as the other industry pages: the /ai-voice-agents sections, with the comparison
// table and fit checker swapped for the firm's day of calls.
const runs: Runs = [
  [v4, ["top"]],
  [fresh, ["what-is"]],
  [extras, ["day"]],
  [fresh, ["features"]],
  [v4, ["how"]],
  [fresh, ["use-cases"]],
  [legacy, ["feedback", "roi-calculator"]],
  [fresh, ["pricing"]],
  [v4, ["cities"]],
  [legacy, ["faq"]],
];

export function HvacPage() {
  return (
    <VoiceLanding
      runs={runs}
      breadcrumb
      graph={graph}
      page={path}
      demoHeading={
        <>
          Book a 30-minute demo <span className="text-[#7d5c33]">for your heating firm</span>
        </>
      }
    >
      <LandingExtrasScript />
    </VoiceLanding>
  );
}
