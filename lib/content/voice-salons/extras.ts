// The salons section with no counterpart on /ai-voice-agents: a salon's Saturday of calls (brief: "A day at
// your salon"). Template: lib/content/voice-extras.ts; the chart title is a weekday there, so it is swapped for
// the brief's Saturday here.
import { extrasMarkup } from "@/lib/content/voice-extras";

export const salonsExtrasMarkup = extrasMarkup({
  day: {
    eyebrow: "A day at your salon",
    h2: `Calls don't wait until you've finished a blow-dry.<br class="max-sm:hidden"> <span class="hl">Neither do your clients.</span>`,
    intro: "An illustrative Saturday at a salon with four stylists. The phone is busiest exactly when every chair is full. A missed caller rarely leaves a voicemail. They book online somewhere else, or ring the next salon on the list.",
    // Hour, calls, answered by the team, closed (illustrative Saturday, four stylists, open 9 to 6): 205 calls, 85 missed.
    hours: [
      ["08", 5, 0, true], ["09", 24, 16], ["10", 18, 15], ["11", 16, 14], ["12", 20, 13], ["13", 26, 12], ["14", 18, 14],
      ["15", 15, 13], ["16", 14, 12], ["17", 17, 11], ["18", 10, 0, true], ["19", 14, 0, true], ["20", 8, 0, true],
    ],
    axis: 28,
    aria: "Bar chart of calls by hour from 8am to 8pm on a Saturday. 205 calls, 85 missed, mostly at the first appointments, when every chair is full at lunchtime and after closing.",
    unit: "salon",
    moments: [
      ["09:00", "First appointments", "Clients ring to book before work. Your team is already mid-colour."],
      ["13:00", "Every chair full", "Nobody is free to pick up, and the lunchtime callers are often your regulars."],
      ["19:00", "After closing", "The salon is shut, but next week's bookings start coming in. Voicemail picks up and most callers try somewhere else."],
    ],
  },
}).replace("Calls by hour, one weekday", "Calls by hour, one Saturday");
