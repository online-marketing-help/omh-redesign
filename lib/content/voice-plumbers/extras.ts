// Plumbers section with no counterpart on /ai-voice-agents (21 Oct 2026): a plumbing business's day of calls.
// It takes the place of the main page's comparison table and fit checker. Template: lib/content/voice-extras.ts.
import { extrasMarkup } from "@/lib/content/voice-extras";

export const plumbersExtrasMarkup = extrasMarkup({
  day: {
    eyebrow: "A day at your business",
    h2: `Calls don't arrive evenly.<br class="max-sm:hidden"> <span class="hl">Neither do the misses.</span>`,
    intro: "An illustrative weekday at a plumbing business with three plumbers on the road. Most missed calls land first thing, while everyone is on a job and after the office closes, which is exactly when nobody is free to pick up.",
    // Hour, calls, answered by the team, closed (illustrative): 187 calls, 80 missed.
    hours: [
      ["07", 12, 5], ["08", 22, 13], ["09", 18, 12], ["10", 15, 10], ["11", 14, 10], ["12", 16, 13], ["13", 13, 10],
      ["14", 12, 8], ["15", 12, 8], ["16", 14, 10], ["17", 17, 8], ["18", 10, 0, true], ["19", 7, 0, true], ["20", 5, 0, true],
    ],
    axis: 24,
    aria: "Bar chart of calls by hour from 7am to 8pm. 187 calls, 80 missed, mostly first thing, while the team is on jobs and after the office closes.",
    unit: "business",
    moments: [
      ["07:30", "First thing", "Leaks found overnight get rung in before work. Your plumbers are already driving to the first job."],
      ["11:00", "Hands full", "Everyone is under a sink or up in a loft. The phone rings out in the van."],
      ["18:00", "After hours", "The office closes, but pipes still burst. Voicemail picks up and many callers try someone else."],
    ],
  },
});
