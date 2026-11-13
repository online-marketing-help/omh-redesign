import type { Metadata } from "next";
import { type Runs, VoiceLanding, sectionsOf } from "@/components/voice-agents/VoiceLanding";
import { LandingExtrasScript } from "@/components/voice-agents/LandingExtrasScript";
import { buildersExtrasMarkup } from "@/lib/content/voice-builders/extras";
import { buildersLandingMarkup } from "@/lib/content/voice-builders/landing";
import { buildersLegacyMarkup } from "@/lib/content/voice-builders/legacy";
import { buildersFaqs, buildersMarkup } from "@/lib/content/voice-builders/markup";
import { SITE, faqSchema } from "@/lib/schema";

/*
  /ai-voice-agents/builders-construction (21 Oct 2026): the /ai-voice-agents layout, section for section, with content
  written for builders and contractors (lib/content/voice-builders/). Rendered by app/ai-voice-agents/[industry]/page.tsx.
*/

const path = "/ai-voice-agents/builders-construction";
const url = `${SITE}${path}`;
const ogTitle = "AI Voice Agent & AI Receptionist for Construction Companies | OMH";
const ogDescription = "An AI receptionist for construction companies: every call answered, even when you're up a ladder. Built, tested and managed by a UK team.";

export const buildersMetadata: Metadata = {
  title: { absolute: "AI Voice Agent & AI Receptionist for Construction Companies | OMH" },
  description:
    "An AI receptionist for construction companies, builders and contractors in the UK. Answers calls 24/7 while you're on site, takes quote requests and books site surveys.",
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
      name: "AI Voice Agent for Builders & Contractors",
      serviceType: "AI voice agent and AI receptionist for builders and contractors",
      description:
        "Managed AI voice agents that answer calls, take quote requests, qualify jobs, book site surveys and handle job updates, suppliers and aftercare for UK builders and contractors. They never quote a price or start date they have not been given, and never give structural advice.",
      url,
      areaServed: { "@type": "Country", name: "United Kingdom" },
      audience: { "@type": "BusinessAudience", audienceType: "Builders, contractors and home improvement firms" },
      provider: { "@id": `${SITE}/#organisation` },
      offers: [offer("Starter", 249, 300, "£795"), offer("Growth", 449, 500, "£1,295"), offer("Scale", 849, 900, "£1,995")],
    },
    { ...faqSchema(buildersFaqs), "@id": `${url}#faq` },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: "AI Voice Agents", item: `${SITE}/ai-voice-agents` },
        { "@type": "ListItem", position: 3, name: "Trades", item: `${SITE}/ai-voice-agents/trades` },
        { "@type": "ListItem", position: 4, name: "Builders & Construction", item: url },
      ],
    },
  ],
};

const fresh = sectionsOf(buildersMarkup, "va-page");
const legacy = sectionsOf(buildersLegacyMarkup, "va-page");
const v4 = sectionsOf(buildersLandingMarkup, "v4l");
const extras = sectionsOf(buildersExtrasMarkup, "va-page"); // builders only: a firm's day of calls

// The same order as the real estate, dental and clinics pages: the /ai-voice-agents sections, with the comparison
// table and fit checker swapped for the firm's day of calls (no industry types, "Your team" or "Getting ready").
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

export function BuildersPage() {
  return (
    <VoiceLanding
      runs={runs}
      breadcrumb
      graph={graph}
      page={path}
      demoHeading={
        <>
          Book a 30-minute demo <span className="text-[#7d5c33]">for your building firm</span>
        </>
      }
    >
      <LandingExtrasScript />
    </VoiceLanding>
  );
}
