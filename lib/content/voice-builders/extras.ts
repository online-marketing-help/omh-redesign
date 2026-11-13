// Builders section with no counterpart on /ai-voice-agents (21 Oct 2026): a building firm's day of calls. It takes
// the place of the main page's comparison table and fit checker. Template: lib/content/voice-extras.ts.
import { extrasMarkup } from "@/lib/content/voice-extras";

export const buildersExtrasMarkup = extrasMarkup({
  day: {
    eyebrow: "A day at your firm",
    h2: `Calls don't arrive evenly.<br class="max-sm:hidden"> <span class="hl">Neither do the misses.</span>`,
    intro: "An illustrative weekday at a building firm with two teams on site. Calls go unanswered from the first start on site, over lunch and after the office closes, which is when homeowners ring about new projects.",
    // Hour, calls, answered by the team, closed (illustrative): 197 calls, 97 missed.
    hours: [
      ["07", 14, 8], ["08", 20, 12], ["09", 16, 9], ["10", 14, 8], ["11", 13, 8], ["12", 18, 12], ["13", 15, 9],
      ["14", 12, 7], ["15", 12, 7], ["16", 14, 9], ["17", 18, 11], ["18", 14, 0, true], ["19", 10, 0, true], ["20", 7, 0, true],
    ],
    axis: 24,
    aria: "Bar chart of calls by hour from 7am to 8pm. 197 calls, 97 missed, mostly while the team is on site, at lunch and after the office closes.",
    unit: "business",
    moments: [
      ["07:30", "On site early", "The team is on the tools by half seven. Suppliers and customers ring a phone in a van or a jacket pocket."],
      ["12:30", "Lunch on the job", "Homeowners ring on their lunch break, while you're up a ladder or on the way to the merchant."],
      ["18:00", "After work", "Homeowners plan projects in the evening. Voicemail picks up, and they ring the next builder on the list."],
    ],
  },
});
