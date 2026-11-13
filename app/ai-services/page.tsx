import type { Metadata } from "next";
import { VoiceAgentsScript } from "@/components/voice-agents/VoiceAgentsScript";
import { aiServices, aiServicesFaqs, aiServicesMarkup } from "@/lib/content/ai-services-markup";
import { JsonLd, SITE, faqSchema } from "@/lib/schema";

const path = "/ai-services";

export const metadata: Metadata = {
  title: { absolute: "AI Services for UK Businesses | Chatbots, Voice Agents & Automation | OMH" },
  description:
    "AI chatbots, voice agents, integrations, AI agents, AI software, consulting and AI UGC video for UK businesses. Planned, built and managed by OMH's UK team.",
  alternates: { canonical: `${SITE}${path}` },
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "Online Marketing Help",
    title: "AI Services for UK Businesses | OMH",
    description: "Practical AI for the jobs that slow your team down. Planned, built and managed by a UK team.",
    url: `${SITE}${path}`,
  },
};

// Built from the same list the page renders, so the schema matches what is visible.
const service = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI Services",
  serviceType: "AI consulting, development, integration and managed AI tools",
  description:
    "AI chatbots, voice agents, integrations, AI agents, AI-powered websites and software, AI technology consulting and AI UGC video for UK businesses.",
  provider: { "@id": `${SITE}/#organisation` },
  areaServed: { "@type": "Country", name: "United Kingdom" },
  url: `${SITE}${path}`,
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "AI services",
    itemListElement: aiServices.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.name,
        description: s.summary,
        url: s.page ? `${SITE}${s.page.href}` : `${SITE}${path}#${s.id}`,
      },
    })),
  },
};

export default function AiServicesPage() {
  return (
    <>
      <JsonLd data={[service, faqSchema(aiServicesFaqs)]} />
      <div id="va-page" className="va-page" dangerouslySetInnerHTML={{ __html: aiServicesMarkup }} />
      <VoiceAgentsScript />
    </>
  );
}
