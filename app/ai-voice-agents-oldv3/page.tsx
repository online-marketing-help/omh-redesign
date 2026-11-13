import type { Metadata } from "next";
import { type Runs, VoiceLanding, sectionsOf } from "@/components/voice-agents/VoiceLanding";
import { landingV4Markup } from "@/lib/content/ai-voice-agents-oldv3/landing-v4";
import { legacyMarkup } from "@/lib/content/ai-voice-agents-oldv3/legacy";
import { voiceAgentsMarkup } from "@/lib/content/ai-voice-agents-oldv3/markup";
import { SITE } from "@/lib/schema";

/*
  oldv3: frozen backup of /ai-voice-agents as it was on 21 Oct 2026 (git tag `oldv3`), before the
  "Heading changes v2" brief. Content copies live in lib/content/ai-voice-agents-oldv3/ and must not be edited.
  Kept out of search (noindex, canonical to the live page, not in the sitemap). No JSON-LD: the live page
  publishes the Service/FAQ graph and this copy must not compete with it.
*/
export const metadata: Metadata = {
  title: { absolute: "AI Voice Agents (oldv3 backup) | OMH" },
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE}/ai-voice-agents` },
};

const fresh = sectionsOf(voiceAgentsMarkup, "va-page");
const legacy = sectionsOf(legacyMarkup, "va-page");
const v4 = sectionsOf(landingV4Markup, "v4l");

// The live running order on 21 Oct 2026, verbatim.
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

export default function AiVoiceAgentsOldV3Page() {
  return (
    <VoiceLanding
      runs={runs}
      page="/ai-voice-agents-oldv3"
      demoHeading={
        <>
          Book a 30-minute demo, <span className="text-[#7d5c33]">by video or phone</span>
        </>
      }
    />
  );
}
