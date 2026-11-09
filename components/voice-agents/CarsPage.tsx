import type { Metadata } from "next";
import { type Runs, VoiceLanding, sectionsOf } from "@/components/voice-agents/VoiceLanding";
import { LandingExtrasScript } from "@/components/voice-agents/LandingExtrasScript";
import { carsExtrasMarkup } from "@/lib/content/voice-cars/extras";
import { carsLandingMarkup } from "@/lib/content/voice-cars/landing";
import { carsLegacyMarkup } from "@/lib/content/voice-cars/legacy";
import { carsFaqs, carsMarkup } from "@/lib/content/voice-cars/markup";
import { SITE, faqSchema } from "@/lib/schema";

/*
  /ai-voice-agents/car-dealerships (21 Oct 2026, copy replaced 26 Oct 2026 from the "Automotive AI Receptionist" SEO
  brief): the /ai-voice-agents layout, section for section, with content written for UK car dealerships, garages and
  MOT centres (lib/content/voice-cars/). Rendered by app/ai-voice-agents/[industry]/page.tsx.
*/

const path = "/ai-voice-agents/car-dealerships";
const url = `${SITE}${path}`;
const ogTitle = "Automotive AI Receptionist for Car Dealerships & Garages | OMH";
const ogDescription = "An AI receptionist for car dealerships and garages: every sales, service and MOT call answered, even on a busy Saturday. Built, tested and managed by a UK team.";

export const carsMetadata: Metadata = {
  title: { absolute: "Automotive AI Receptionist for Car Dealerships & Garages | OMH" },
  description:
    "An automotive AI receptionist for UK car dealerships and garages. Answers sales, service and MOT calls 24/7 and books test drives. Never gives finance advice.",
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
      name: "Automotive AI Receptionist & AI Voice Agent for Car Dealerships & Garages",
      serviceType: "AI receptionist for car dealerships",
      description:
        "A managed AI voice agent and automotive AI receptionist for UK car dealerships and garages. Answers sales, service, MOT and parts calls 24/7 and books test drives and workshop slots. Never gives finance advice.",
      url,
      areaServed: { "@type": "Country", name: "United Kingdom" },
      audience: { "@type": "BusinessAudience", audienceType: "Franchised and independent car dealerships, garages and MOT centres" },
      provider: { "@id": `${SITE}/#organisation` },
      offers: [offer("Starter", 249, 300, "£795"), offer("Growth", 449, 500, "£1,295"), offer("Scale", 849, 900, "£1,995")],
    },
    { ...faqSchema(carsFaqs), "@id": `${url}#faq` },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: "AI Voice Agents", item: `${SITE}/ai-voice-agents` },
        { "@type": "ListItem", position: 3, name: "Car Dealerships & Garages", item: url },
      ],
    },
  ],
};

const fresh = sectionsOf(carsMarkup, "va-page");
const legacy = sectionsOf(carsLegacyMarkup, "va-page");
const v4 = sectionsOf(carsLandingMarkup, "v4l");
const extras = sectionsOf(carsExtrasMarkup, "va-page"); // cars only: a dealership's day of calls

// The same order as the real estate, dental and clinics pages: the /ai-voice-agents sections, with the comparison
// table and fit checker swapped for the dealership's day of calls (no industry types, "Your team" or "Getting ready"),
// plus the "Dealerships and garages" section (26 Oct 2026 brief) between the day of calls and the capabilities.
const runs: Runs = [
  [v4, ["top"]],
  [fresh, ["what-is"]],
  [extras, ["day"]],
  [fresh, ["dealerships"]],
  [fresh, ["features"]],
  [v4, ["how"]],
  [fresh, ["use-cases"]],
  [legacy, ["feedback", "reels", "roi-calculator"]],
  [fresh, ["pricing"]],
  [v4, ["cities"]],
  [legacy, ["faq"]],
];

export function CarsPage() {
  return (
    <VoiceLanding
      runs={runs}
      breadcrumb
      graph={graph}
      page={path}
      thingsToTry={["Ask about a car in stock and book a test drive.", "Book an MOT for next week.", "Ask for a finance quote and hear where it puts you through."]}
      demoHeading={
        <>
          Book a 30-minute demo <span className="text-[#7d5c33]">for your dealership or garage</span>
        </>
      }
    >
      <LandingExtrasScript />
    </VoiceLanding>
  );
}
