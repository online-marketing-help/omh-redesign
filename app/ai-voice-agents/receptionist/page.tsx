import type { Metadata } from "next";
import { type Runs, VoiceLanding, sectionsOf } from "@/components/voice-agents/VoiceLanding";
import { receptionistGraph, receptionistMeta } from "@/lib/content/ai-receptionist";
import { receptionistLandingMarkup } from "@/lib/content/voice-receptionist/landing";
import { receptionistLegacyMarkup } from "@/lib/content/voice-receptionist/legacy";
import { receptionistMarkup } from "@/lib/content/voice-receptionist/markup";
import { SITE } from "@/lib/schema";

/*
  /ai-voice-agents/receptionist (21 Oct 2026): the client's AI receptionist page, rebuilt on the /ai-voice-agents
  layout (client: the standalone design didn't match the other voice agent pages). Copy and JSON-LD come from the
  client's file; sections are the main page's, in lib/content/voice-receptionist/. A static route, so it wins
  over [industry].
*/

const url = `${SITE}/ai-voice-agents/receptionist`;
const { title, description } = receptionistMeta;

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: url },
  openGraph: { type: "website", locale: "en_GB", siteName: "Online Marketing Help", title, description, url },
  twitter: { card: "summary_large_image", title, description },
};

const fresh = sectionsOf(receptionistMarkup, "va-page");
const legacy = sectionsOf(receptionistLegacyMarkup, "va-page");
const v4 = sectionsOf(receptionistLandingMarkup, "v4l");

// The client's section order on the main page's designs: hero, what it is, features, setup, industries,
// comparison, pricing, UK cover, FAQ, then the booking form.
const runs: Runs = [
  [v4, ["top"]],
  [fresh, ["what-is", "features"]],
  [v4, ["how"]],
  [legacy, ["industries", "compare"]],
  [fresh, ["pricing"]],
  [v4, ["cities"]],
  [legacy, ["faq"]],
];

export default function AiReceptionistPage() {
  return (
    <VoiceLanding
      runs={runs}
      breadcrumb
      graph={receptionistGraph}
      page="/ai-voice-agents/receptionist"
      demoHeading={
        <>
          Book an AI receptionist demo, <span className="text-[#7d5c33]">by video or phone</span>
        </>
      }
    />
  );
}
