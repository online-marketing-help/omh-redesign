// Heating section with no counterpart on /ai-voice-agents (21 Oct 2026): a heating firm's day of calls. It takes
// the place of the main page's comparison table and fit checker. Template: lib/content/voice-extras.ts.
import { extrasMarkup } from "@/lib/content/voice-extras";

export const hvacExtrasMarkup = extrasMarkup({
  day: {
    eyebrow: "A day at your firm",
    h2: `Calls don't arrive evenly.<br class="max-sm:hidden"> <span class="hl">Neither do the misses.</span>`,
    intro: "An illustrative winter weekday at a heating firm with one office and four engineers. Most missed calls land first thing, over lunch and after the office closes, which is exactly when nobody is free to pick up.",
    // Hour, calls, answered by the team, closed (illustrative winter weekday): 218 calls, 90 missed.
    hours: [
      ["07", 14, 0, true], ["08", 30, 16], ["09", 24, 18], ["10", 18, 16], ["11", 15, 14], ["12", 17, 8], ["13", 15, 10],
      ["14", 13, 12], ["15", 12, 11], ["16", 14, 12], ["17", 18, 11], ["18", 13, 0, true], ["19", 9, 0, true], ["20", 6, 0, true],
    ],
    axis: 36,
    aria: "Bar chart of calls by hour from 7am to 8pm. 218 calls, 90 missed, mostly first thing, at lunch and after the office closes.",
    unit: "firm",
    moments: [
      ["07:00", "No heat at breakfast", "Customers find the boiler has stopped when they get up. The office isn't open yet and the phone rings out."],
      ["12:30", "Lunch cover", "One person in the office, or nobody. The phone rings out while they chase a parts order."],
      ["18:00", "After the office closes", "Customers ring after work. Voicemail picks up and many hang up and try the next firm."],
    ],
  },
});
