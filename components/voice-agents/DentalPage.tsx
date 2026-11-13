import type { Metadata } from "next";
import { type Runs, VoiceLanding, sectionsOf } from "@/components/voice-agents/VoiceLanding";
import { LandingExtrasScript } from "@/components/voice-agents/LandingExtrasScript";
import { dentalExtrasMarkup } from "@/lib/content/voice-dental/extras";
import { dentalLandingMarkup } from "@/lib/content/voice-dental/landing";
import { dentalLegacyMarkup } from "@/lib/content/voice-dental/legacy";
import { dentalFaqs, dentalMarkup } from "@/lib/content/voice-dental/markup";
import { SITE, faqSchema } from "@/lib/schema";

/*
  /ai-voice-agents/dentists (21 Oct 2026): the /ai-voice-agents layout, section for section, with content
  written for dental practices (lib/content/voice-dental/). Rendered by app/ai-voice-agents/[industry]/page.tsx.
  The page it replaced is frozen as git tag `dental-oldv1` and the noindex route
  /ai-voice-agents/dental-clinics-oldv1. The London and v2 pages are unchanged.
*/

const path = "/ai-voice-agents/dentists";
const url = `${SITE}${path}`;
const ogTitle = "AI Voice Agent & AI Receptionist for Dentists | OMH";
const ogDescription = "An AI receptionist for dentists: every patient call answered, even when reception is full. Built, tested and managed by a UK team.";

export const dentalMetadata: Metadata = {
  title: { absolute: "AI Voice Agent & AI Receptionist for Dentists | UK | OMH" },
  description:
    "An AI receptionist for dentists and dental practices in the UK. Answers patient calls 24/7, books check-ups, fills cancellations and routes urgent calls. No clinical advice.",
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
      name: "AI Voice Agent for Dentists",
      serviceType: "AI voice agent and AI receptionist for dental practices",
      description:
        "Managed AI voice agents that answer patient calls, book check-ups and hygiene visits, fill cancellations and route urgent calls for UK dental practices. They never give clinical advice.",
      url,
      areaServed: { "@type": "Country", name: "United Kingdom" },
      audience: { "@type": "BusinessAudience", audienceType: "Dental practices" },
      provider: { "@id": `${SITE}/#organisation` },
      offers: [offer("Starter", 249, 300, "£795"), offer("Growth", 449, 500, "£1,295"), offer("Scale", 849, 900, "£1,995")],
    },
    { ...faqSchema(dentalFaqs), "@id": `${url}#faq` },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: "AI Voice Agents", item: `${SITE}/ai-voice-agents` },
        { "@type": "ListItem", position: 3, name: "Dentists", item: url },
      ],
    },
  ],
};

const fresh = sectionsOf(dentalMarkup, "va-page");
const legacy = sectionsOf(dentalLegacyMarkup, "va-page");
const v4 = sectionsOf(dentalLandingMarkup, "v4l");
const extras = sectionsOf(dentalExtrasMarkup, "va-page"); // dental only: a practice's day of calls

// The same order as the real estate page: the /ai-voice-agents sections, with the comparison table and fit checker
// swapped for the practice's day of calls (practice types, "Your team" and "Getting ready" removed, client 21 Oct 2026).
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

export function DentalPage() {
  return (
    <VoiceLanding
      runs={runs}
      breadcrumb
      graph={graph}
      page={path}
      demoHeading={
        <>
          Book a 30-minute demo <span className="text-[#7d5c33]">for your practice</span>
        </>
      }
    >
      <LandingExtrasScript />
    </VoiceLanding>
  );
}
