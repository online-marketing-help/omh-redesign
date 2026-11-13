import type { Metadata } from "next";
import { BookDemo } from "@/components/BookDemo";
import { LandingV4Script } from "@/components/voice-agents/LandingV4Script";
import { VoiceAgentsScript } from "@/components/voice-agents/VoiceAgentsScript";
import { landingV4Markup } from "@/lib/content/ai-voice-agents-old/landing-v4";
import { voiceAgentsMarkup } from "@/lib/content/ai-voice-agents-old/markup";
import { SITE } from "@/lib/schema";

// Backup of /ai-voice-agents as it was before the 19 Oct 2026 SEO brief. Kept out of search
// (noindex, canonical to the live page, not in the sitemap) so it never competes with it.
export const metadata: Metadata = {
  title: { absolute: "AI Voice Agents (previous version) | OMH" },
  robots: { index: false, follow: true },
  alternates: { canonical: `${SITE}/ai-voice-agents` },
};

function sectionsOf(html: string, className: string) {
  const [head, ...parts] = html.split(/(?=<section[\s>])/);
  const byKey = new Map(parts.map((p) => [p.match(/^<section[^>]*?\s(?:id|aria-labelledby)="([^"]+)"/)![1], p]));
  return { head, byKey, className };
}

const v4 = sectionsOf(landingV4Markup, "v4l");
const va = sectionsOf(voiceAgentsMarkup, "va-page");

const runs: [typeof v4, string[]][] = [
  [v4, ["top", "benefits-title", "features-title", "use-cases"]],
  [va, ["industries", "feedback"]],
  [v4, ["how", "cities"]],
  [va, ["why-omh", "branding", "right-fit", "roi-calculator", "pricing", "compare", "faq", "related"]],
];
const runHtml = runs.map(([src, keys], i) =>
  (runs.findIndex(([s]) => s === src) === i ? src.head : "") + keys.map((k) => src.byKey.get(k)!).join(""),
);

export default function AiVoiceAgentsOldPage() {
  return (
    <>
      <div id="va-page">
        {runs.map(([src], i) => (
          <div key={i} className={src.className} dangerouslySetInnerHTML={{ __html: runHtml[i] }} />
        ))}
      </div>
      <LandingV4Script />
      <BookDemo
        id="book-demo-form"
        heading={
          <>
            Hear a voice agent answer <span className="text-[#7d5c33]">as your business</span>
          </>
        }
      />
      <VoiceAgentsScript />
    </>
  );
}
