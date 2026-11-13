import type { Metadata } from "next";
import { type Runs, VoiceLanding, sectionsOf } from "@/components/voice-agents/VoiceLanding";
import { LandingExtrasScript } from "@/components/voice-agents/LandingExtrasScript";
import { LeadDemoScript } from "@/components/voice-agents/LeadDemoScript";
import { leadDemo } from "@/lib/content/lead-demo";
import { estateExtrasMarkup } from "@/lib/content/voice-estate/extras";
import { estateLandingMarkup } from "@/lib/content/voice-estate/landing";
import { estateLegacyMarkup } from "@/lib/content/voice-estate/legacy";
import { estateFaqs, estateMarkup } from "@/lib/content/voice-estate/markup";
import { SITE, faqSchema } from "@/lib/schema";

/*
  /ai-voice-agents/estate-letting-agents (21 Oct 2026; moved from /ai-voice-agents/real-estate-letting-agents the same day, SEO brief v2 §4.6): the /ai-voice-agents layout, section for section,
  with content written for estate and letting agents (lib/content/voice-estate/). Rendered by
  app/ai-voice-agents/[industry]/page.tsx. The page it replaced is frozen as git tag `estate-oldv1` and the
  noindex route /ai-voice-agents/real-estate-letting-agents-oldv1. The London page under it is unchanged.
*/

const path = "/ai-voice-agents/estate-letting-agents";
const url = `${SITE}${path}`;
const ogTitle = "AI Voice Agent & AI Receptionist for Estate Agents | OMH";
const ogDescription = "An AI voice agent for estate agents: every property enquiry answered, even when the team is out on viewings. Built, tested and managed by a UK team.";

export const estateMetadata: Metadata = {
  title: { absolute: "AI Voice Agent & AI Receptionist for Estate Agents | UK | OMH" },
  description:
    "AI voice agent for estate agents and letting agents in the UK. Answers every call 24/7, books viewings and valuations and routes tenant repairs. From £249 a month.",
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
      name: "AI Voice Agent for Estate and Letting Agents",
      serviceType: "AI voice agent and AI receptionist for estate and letting agents",
      description:
        "Managed AI voice agents that answer property enquiries, book viewings and valuations, qualify buyers and tenants and route urgent calls for UK estate and letting agents.",
      url,
      areaServed: { "@type": "Country", name: "United Kingdom" },
      audience: { "@type": "BusinessAudience", audienceType: "Estate and letting agents" },
      provider: { "@id": `${SITE}/#organisation` },
      offers: [offer("Starter", 249, 300, "£795"), offer("Growth", 449, 500, "£1,295"), offer("Scale", 849, 900, "£1,995")],
    },
    { ...faqSchema(estateFaqs), "@id": `${url}#faq` },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: "AI Voice Agents", item: `${SITE}/ai-voice-agents` },
        { "@type": "ListItem", position: 3, name: "Estate & Letting Agents", item: url },
      ],
    },
  ],
};

const fresh = sectionsOf(estateMarkup, "va-page");
const legacy = sectionsOf(estateLegacyMarkup, "va-page");
const v4 = sectionsOf(estateLandingMarkup, "v4l");
// The live demo from the page this one replaced (oldv1): a working agent the visitor talks to (29 Oct 2026).
// The leading newline matters: sectionsOf takes whatever comes before the first <section> as the source's head.
const demo = sectionsOf(`\n${leadDemo("real-estate")}`, "va-page");
const extras = sectionsOf(estateExtrasMarkup, "va-page"); // real estate only: a branch's day of calls

// The /ai-voice-agents order, with the comparison table and fit checker swapped for real estate sections
// (client, 21 Oct 2026): a branch's day of calls after the definition. The agency types grid, "Your team" and
// "Getting ready" were removed (client, 21 Oct 2026); leave them off new industry pages too.
const runs: Runs = [
  [v4, ["top"]],
  [fresh, ["what-is", "receptionist"]],
  [extras, ["day"]],
  [demo, ["hear"]],
  [fresh, ["features"]],
  [v4, ["how"]],
  [fresh, ["use-cases"]],
  [legacy, ["feedback", "roi-calculator"]],
  [fresh, ["pricing"]],
  [v4, ["cities"]],
  [legacy, ["faq"]],
];

export function EstatePage() {
  return (
    <VoiceLanding
      runs={runs}
      breadcrumb
      graph={graph}
      page={path}
      demoHeading={
        <>
          Book a 30-minute demo <span className="text-[#7d5c33]">for your agency</span>
        </>
      }
    >
      <LandingExtrasScript />
      <LeadDemoScript />
    </VoiceLanding>
  );
}
