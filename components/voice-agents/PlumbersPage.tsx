import type { Metadata } from "next";
import { type Runs, VoiceLanding, sectionsOf } from "@/components/voice-agents/VoiceLanding";
import { LandingExtrasScript } from "@/components/voice-agents/LandingExtrasScript";
import { plumbersExtrasMarkup } from "@/lib/content/voice-plumbers/extras";
import { plumbersLandingMarkup } from "@/lib/content/voice-plumbers/landing";
import { plumbersLegacyMarkup } from "@/lib/content/voice-plumbers/legacy";
import { plumbersFaqs, plumbersMarkup } from "@/lib/content/voice-plumbers/markup";
import { SITE, faqSchema } from "@/lib/schema";

/*
  /ai-voice-agents/plumbers (21 Oct 2026): the /ai-voice-agents layout, section for section, with content
  written for plumbers (lib/content/voice-plumbers/). Rendered by app/ai-voice-agents/[industry]/page.tsx.
*/

const path = "/ai-voice-agents/plumbers";
const url = `${SITE}${path}`;
const ogTitle = "AI Voice Agent & AI Receptionist for Plumbers | OMH";
const ogDescription = "An AI receptionist for plumbers: every call answered, even when you're under a sink. Built, tested and managed by a UK team.";

export const plumbersMetadata: Metadata = {
  title: { absolute: "AI Voice Agent & AI Receptionist for Plumbers | UK | OMH" },
  description:
    "An AI receptionist for plumbers in the UK. Answers calls 24/7, sends burst pipes and leaks to whoever is on call, books repairs and quote visits. Never diagnoses a fault.",
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
      name: "AI Voice Agent for Plumbers",
      serviceType: "AI voice agent and AI receptionist for plumbers and plumbing businesses",
      description:
        "Managed AI voice agents that answer calls for UK plumbing businesses, send burst pipes and leaks to whoever is on call, book repairs and quote visits, and take jobs from landlords, letting agents and tenants. They never diagnose a fault.",
      url,
      areaServed: { "@type": "Country", name: "United Kingdom" },
      audience: { "@type": "BusinessAudience", audienceType: "Plumbers and plumbing businesses" },
      provider: { "@id": `${SITE}/#organisation` },
      offers: [offer("Starter", 249, 300, "£795"), offer("Growth", 449, 500, "£1,295"), offer("Scale", 849, 900, "£1,995")],
    },
    { ...faqSchema(plumbersFaqs), "@id": `${url}#faq` },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: "AI Voice Agents", item: `${SITE}/ai-voice-agents` },
        { "@type": "ListItem", position: 3, name: "Trades", item: `${SITE}/ai-voice-agents/trades` },
        { "@type": "ListItem", position: 4, name: "Plumbers", item: url },
      ],
    },
  ],
};

const fresh = sectionsOf(plumbersMarkup, "va-page");
const legacy = sectionsOf(plumbersLegacyMarkup, "va-page");
const v4 = sectionsOf(plumbersLandingMarkup, "v4l");
const extras = sectionsOf(plumbersExtrasMarkup, "va-page"); // plumbers only: a plumbing business's day of calls

// The same order as the real estate, dental and clinics pages: the /ai-voice-agents sections, with the comparison
// table and fit checker swapped for the business's day of calls (no industry types, "Your team" or "Getting ready").
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

export function PlumbersPage() {
  return (
    <VoiceLanding
      runs={runs}
      breadcrumb
      graph={graph}
      page={path}
      demoHeading={
        <>
          Book a 30-minute demo <span className="text-[#7d5c33]">for your plumbing business</span>
        </>
      }
    >
      <LandingExtrasScript />
    </VoiceLanding>
  );
}
