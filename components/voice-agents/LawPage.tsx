import type { Metadata } from "next";
import { type Runs, VoiceLanding, sectionsOf } from "@/components/voice-agents/VoiceLanding";
import { LandingExtrasScript } from "@/components/voice-agents/LandingExtrasScript";
import { lawExtrasMarkup } from "@/lib/content/voice-law/extras";
import { lawLandingMarkup } from "@/lib/content/voice-law/landing";
import { lawLegacyMarkup } from "@/lib/content/voice-law/legacy";
import { lawFaqs, lawMarkup } from "@/lib/content/voice-law/markup";
import { SITE, faqSchema } from "@/lib/schema";

/*
  /ai-voice-agents/law-firms (21 Oct 2026): the /ai-voice-agents layout, section for section, with content
  written for UK law firms (lib/content/voice-law/). Rendered by app/ai-voice-agents/[industry]/page.tsx.
*/

const path = "/ai-voice-agents/law-firms";
const url = `${SITE}${path}`;
const ogTitle = "AI Voice Agent & AI Receptionist for Law Firms | OMH";
const ogDescription = "An AI receptionist for law firms: every client call answered, even when your fee earners are in court. Built, tested and managed by a UK team.";

export const lawMetadata: Metadata = {
  title: { absolute: "AI Voice Agent & AI Receptionist for Law Firms | UK | OMH" },
  description:
    "An AI receptionist for law firms and solicitors in the UK. Answers client calls 24/7, sorts new enquiries by practice area and books consultations. Never gives legal advice.",
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
      name: "AI Voice Agent for Law Firms",
      serviceType: "AI voice agent and AI receptionist for law firms and solicitors",
      description:
        "Managed AI voice agents that answer client calls, sort new enquiries by practice area, book consultations, take messages for fee earners and put urgent matters through for UK law firms. They never give legal advice.",
      url,
      areaServed: { "@type": "Country", name: "United Kingdom" },
      audience: { "@type": "BusinessAudience", audienceType: "Law firms and solicitors" },
      provider: { "@id": `${SITE}/#organisation` },
      offers: [offer("Starter", 249, 300, "£795"), offer("Growth", 449, 500, "£1,295"), offer("Scale", 849, 900, "£1,995")],
    },
    { ...faqSchema(lawFaqs), "@id": `${url}#faq` },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: "AI Voice Agents", item: `${SITE}/ai-voice-agents` },
        { "@type": "ListItem", position: 3, name: "Law Firms", item: url },
      ],
    },
  ],
};

const fresh = sectionsOf(lawMarkup, "va-page");
const legacy = sectionsOf(lawLegacyMarkup, "va-page");
const v4 = sectionsOf(lawLandingMarkup, "v4l");
const extras = sectionsOf(lawExtrasMarkup, "va-page"); // law firms only: a firm's day of calls

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

export function LawPage() {
  return (
    <VoiceLanding
      runs={runs}
      breadcrumb
      graph={graph}
      page={path}
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
