import type { Metadata } from "next";
import { type Runs, VoiceLanding, sectionsOf } from "@/components/voice-agents/VoiceLanding";
import { landingV4Markup } from "@/lib/content/ai-voice-agents-landing-v4";
import { legacyMarkup } from "@/lib/content/ai-voice-agents-legacy";
import { voiceAgentsMarkup, voiceFaqs } from "@/lib/content/ai-voice-agents-markup";
import { SITE, faqSchema } from "@/lib/schema";

const path = "/ai-voice-agents";
// No trailing slash: /ai-voice-agents/ redirects here, and a canonical must name the final URL (SEO brief §2.3).
const url = `${SITE}${path}`;
const ogTitle = "AI Voice Agent for UK Businesses | OMH";
const ogDescription = "An AI voice agent that answers, books and follows up, day and night. Built, tested and managed by a UK team.";

// SEO pack from the brief (OMH-AI-Voice-Agent-Page-SEO-Optimisation, 19 Oct 2026). The share image and its
// alt text come from ./opengraph-image.tsx.
export const metadata: Metadata = {
  title: { absolute: "AI Voice Agent & AI Receptionist for UK Businesses | OMH" },
  description:
    "An AI voice agent that answers every call on the first ring, books appointments and follows up leads, day and night. Set up and managed by a UK team.",
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

// Part 6 of the brief. The Organization item is left out: the layout already publishes one as #organisation.
const graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${url}#service`,
      name: "AI Voice Agent for UK Businesses",
      serviceType: "AI voice agent",
      description:
        "An AI voice agent is software that answers and makes phone calls for your business in natural, spoken conversation. It understands what the caller wants, answers from information you have approved, books appointments into your calendar and passes anything it can't handle to a person on your team, with a summary of the call.",
      url,
      areaServed: { "@type": "Country", name: "United Kingdom" },
      provider: { "@id": `${SITE}/#organisation` },
      offers: [offer("Starter", 249, 300, "£795"), offer("Growth", 449, 500, "£1,295"), offer("Scale", 849, 900, "£1,995")],
    },
    { ...faqSchema(voiceFaqs), "@id": `${url}#faq` },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: "AI Voice Agents", item: url },
      ],
    },
  ],
};

const fresh = sectionsOf(voiceAgentsMarkup, "va-page"); // rebuilt 20 Oct 2026
const legacy = sectionsOf(legacyMarkup, "va-page"); // kept from the previous page
const v4 = sectionsOf(landingV4Markup, "v4l"); // how it works, local cover

/*
  Running order. The rebuild (docs/ai-voice-agents-cro/) supplies the problem/solution pair, the definition,
  the capability cards, the industry tabs and the pricing cards; the hero is the previous one (client's call); the client asked for the previous
  page's other sections back (20 Oct 2026), so they follow in their old order. The previous page is frozen as
  git tag `oldv2` and route /ai-voice-agents-oldv2.
*/
const runs: Runs = [
  [v4, ["top"]],
  [fresh, ["what-is", "features"]],
  [v4, ["how"]],
  [fresh, ["use-cases"]],
  [legacy, ["industries", "feedback", "compare", "right-fit", "roi-calculator"]],
  [fresh, ["pricing"]],
  [v4, ["cities"]],
  [legacy, ["faq"]],
];
export default function AiVoiceAgentsPage() {
  return (
    <VoiceLanding
      runs={runs}
      breadcrumb
      graph={graph}
      page="/ai-voice-agents"
      demoHeading={
        <>
          Book an AI voice agent demo, <span className="text-[#7d5c33]">by video or phone</span>
        </>
      }
    />
  );
}
