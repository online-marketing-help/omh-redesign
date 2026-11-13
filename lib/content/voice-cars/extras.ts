// Car dealership section with no counterpart on /ai-voice-agents (21 Oct 2026): a dealership's Saturday of calls.
// It takes the place of the main page's comparison table and fit checker. Template: lib/content/voice-extras.ts.
import { extrasMarkup } from "@/lib/content/voice-extras";

export const carsExtrasMarkup = extrasMarkup({
  day: {
    eyebrow: "A Saturday at your dealership",
    h2: `Calls don't arrive evenly.<br class="max-sm:hidden"> <span class="hl">Neither do the misses.</span>`,
    intro: "An illustrative Saturday at a dealership with a showroom and a workshop. The phones are busiest when every sales executive is with a customer. A missed buyer rarely leaves a voicemail. They ring the next dealer selling the same car.",
    // Hour, calls, answered by the team, closed (illustrative): 238 calls, 86 missed.
    hours: [
      ["08", 26, 16], ["09", 24, 18], ["10", 20, 16], ["11", 18, 13], ["12", 22, 14], ["13", 20, 13], ["14", 16, 13],
      ["15", 15, 12], ["16", 18, 13], ["17", 24, 15], ["18", 14, 9], ["19", 10, 0, true], ["20", 7, 0, true], ["21", 4, 0, true],
    ],
    axis: 30,
    aria: "Bar chart of calls by hour from 8am to 9pm, one Saturday. 238 calls, 86 missed, mostly when the workshop opens, when the showroom is full and after closing.",
    unit: "dealership",
    moments: [
      ["08:00", "Workshop opens", "Drivers ring to book MOTs and services before work, while your service advisors check cars in."],
      ["11:00", "Showroom full", "Every sales executive is on a test drive or with a customer. Stock enquiries ring out."],
      ["17:30", "After closing", "Buyers browse online in the evening and ring about the car they've found. Voicemail picks up."],
    ],
  },
});
