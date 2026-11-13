import type { Metadata } from "next";
import { BookDemo } from "@/components/BookDemo";
import { LandingV4Script } from "@/components/voice-agents/LandingV4Script";
import { VoiceAgentsScript } from "@/components/voice-agents/VoiceAgentsScript";
import { landingV4Markup } from "@/lib/content/ai-voice-agents-oldv2/landing-v4";
import { voiceAgentsMarkup } from "@/lib/content/ai-voice-agents-oldv2/markup";
import { SITE } from "@/lib/schema";

/*
  oldv2: frozen backup of /ai-voice-agents as it was on 20 Oct 2026 (commit adf97b6, git tag `oldv2`),
  before the CRO rebuild. Content, pricing and calculator copies live in lib/content/ai-voice-agents-oldv2/
  and must not be edited. Kept out of search (noindex, canonical to the live page, not in the sitemap).
  No JSON-LD here: the live page publishes the Service/FAQ graph and this copy must not compete with it.

  Restore: `git checkout oldv2 -- app/ai-voice-agents lib/content/ai-voice-agents-markup.ts
  lib/content/ai-voice-agents-landing-v4.ts lib/content/voice-pricing.ts`, or copy the three files from
  lib/content/ai-voice-agents-oldv2/ back over their originals.
*/
export const metadata: Metadata = {
  title: { absolute: "AI Voice Agents (oldv2 backup) | OMH" },
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE}/ai-voice-agents` },
};

function sectionsOf(html: string, className: string) {
  const [head, ...parts] = html.split(/(?=<section[\s>])/);
  const byKey = new Map(parts.map((p) => [p.match(/^<section[^>]*?\s(?:id|aria-labelledby)="([^"]+)"/)![1], p]));
  return { head, byKey, className };
}

const v4 = sectionsOf(landingV4Markup, "v4l");
const va = sectionsOf(voiceAgentsMarkup, "va-page");

// The running order of the live page on 20 Oct 2026, verbatim.
const runs: [typeof v4, string[]][] = [
  [v4, ["top"]],
  [va, ["what-is"]],
  [v4, ["features-title"]],
  [va, ["branding"]],
  [v4, ["how", "use-cases"]],
  [va, ["industries", "feedback", "why-omh", "compare", "right-fit", "roi-calculator", "pricing"]],
  [v4, ["cities"]],
  [va, ["faq", "related"]],
];
const runHtml = runs.map(([src, keys], i) =>
  (runs.findIndex(([s]) => s === src) === i ? src.head : "") + keys.map((k) => src.byKey.get(k)!).join(""),
);

export default function AiVoiceAgentsOldV2Page() {
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
            Hear an AI voice agent answer <span className="text-[#7d5c33]">as your business</span>
          </>
        }
      />
      <VoiceAgentsScript />
    </>
  );
}
