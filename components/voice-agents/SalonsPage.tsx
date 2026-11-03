import type { Metadata } from "next";
import { type Runs, VoiceLanding, sectionsOf } from "@/components/voice-agents/VoiceLanding";
import { LandingExtrasScript } from "@/components/voice-agents/LandingExtrasScript";
import { salonsExtrasMarkup } from "@/lib/content/voice-salons/extras";
import { salonsLandingMarkup } from "@/lib/content/voice-salons/landing";
import { salonsLegacyMarkup } from "@/lib/content/voice-salons/legacy";
import { salonsFaqs, salonsMarkup } from "@/lib/content/voice-salons/markup";
import { SITE, faqSchema } from "@/lib/schema";

/*
  /ai-voice-agents/salons (October 2026): the /ai-voice-agents layout, section for section, with content written
  for hair, nail and beauty salons and medspas (lib/content/voice-salons/), from the brief "OMH AI Voice Agent for
  Salons & Beauty". Same layout as the other industry pages. Rendered by app/ai-voice-agents/[industry]/page.tsx.
  The brief has no use-cases section; "Salons we cover" takes its place. Sample calls (client recordings,
  3 Nov 2026) sit before the ROI calculator.
*/

const path = "/ai-voice-agents/salons";
const url = `${SITE}${path}`;
const ogTitle = "AI Voice Agent & AI Receptionist for Salons | OMH";
const ogDescription = "An AI receptionist for salons: every booking call answered, even when every chair is full. Built, tested and managed by a UK team.";

export const salonsMetadata: Metadata = {
  title: { absolute: "AI Voice Agent & AI Receptionist for Salons | UK | OMH" },
  description:
    "An AI receptionist for salons in the UK: hair, nail and beauty. Answers every call 24/7, books and moves appointments and fills cancellations. Managed by OMH.",
  alternates: { canonical: url },
  openGraph: { type: "website", locale: "en_GB", siteName: "Online Marketing Help", title: ogTitle, description: ogDescription, url },
  twitter: { card: "summary_large_image", title: ogTitle, description: ogDescription },
};

const offer = (name: string, price: string) => ({ "@type": "Offer", name, price, priceCurrency: "GBP" });

// The brief's appendix: Service, BreadcrumbList and FAQPage (every FAQ, built from salonsFaqs so the text matches the page).
const graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${url}#service`,
      name: "AI Voice Agent & AI Receptionist for Salons",
      serviceType: "AI receptionist for salons",
      description:
        "A managed AI voice agent and AI receptionist for UK hair salons, nail salons, beauty salons and medspas. Answers calls 24/7, books and moves appointments and fills cancellations.",
      url,
      areaServed: { "@type": "Country", name: "United Kingdom" },
      provider: { "@type": "Organization", "@id": `${SITE}/#organisation`, name: "Online Marketing Help", url: SITE, telephone: "+44 20 3489 3934" },
      offers: [offer("Starter", "249"), offer("Growth", "449"), offer("Scale", "849")],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: "AI Voice Agents", item: `${SITE}/ai-voice-agents` },
        { "@type": "ListItem", position: 3, name: "Salons & Beauty", item: url },
      ],
    },
    { ...faqSchema(salonsFaqs), "@id": `${url}#faq` },
  ],
};

const fresh = sectionsOf(salonsMarkup, "va-page");
const legacy = sectionsOf(salonsLegacyMarkup, "va-page");
const v4 = sectionsOf(salonsLandingMarkup, "v4l");
const extras = sectionsOf(salonsExtrasMarkup, "va-page"); // the salon's Saturday of calls

// The brief's section order: hero, what is, a day at your salon, salons we cover, what's included, how it works,
// ROI calculator, pricing, local cover, FAQ (the booking band follows from VoiceLanding).
const runs: Runs = [
  [v4, ["top"]],
  [fresh, ["what-is"]],
  [extras, ["day"]],
  [fresh, ["salons", "features"]],
  [v4, ["how"]],
  [legacy, ["feedback", "roi-calculator"]],
  [fresh, ["pricing"]],
  [v4, ["cities"]],
  [legacy, ["faq"]],
];

export function SalonsPage() {
  return (
    <VoiceLanding
      runs={runs}
      breadcrumb
      graph={graph}
      page={path}
      thingsToTry={["Book a cut and colour as a new client.", "Cancel tomorrow's appointment and hear what it offers.", "Ask something it can't know, and hear what it does."]}
      demoHeading={
        <>
          Book a 30-minute demo <span className="text-[#7d5c33]">for your salon</span>
        </>
      }
    >
      <LandingExtrasScript />
    </VoiceLanding>
  );
}
