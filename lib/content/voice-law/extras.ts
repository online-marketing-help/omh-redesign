// Law firm section with no counterpart on /ai-voice-agents (21 Oct 2026): a firm's day of calls, with illustrative
// figures. It takes
// the place of the main page's comparison table and fit checker. Template: lib/content/voice-extras.ts.
import { extrasMarkup } from "@/lib/content/voice-extras";

export const lawExtrasMarkup = extrasMarkup({
  day: {
    eyebrow: "A day at your firm",
    h2: `Calls don't arrive evenly.<br class="max-sm:hidden"> <span class="hl">Neither do the misses.</span>`,
    intro: "An illustrative weekday at a busy high street firm with four fee earners. Most missed calls land as the office opens, over lunch and after closing, when fee earners are in meetings, in court or gone home.",
    // Hour, calls, answered by the team, closed (illustrative): 211 calls, 82 missed.
    hours: [
      ["08", 5, 0, true], ["09", 30, 18], ["10", 24, 19], ["11", 20, 17], ["12", 18, 12], ["13", 19, 10], ["14", 17, 15],
      ["15", 16, 14], ["16", 15, 13], ["17", 18, 11], ["18", 11, 0, true], ["19", 8, 0, true], ["20", 6, 0, true], ["21", 4, 0, true],
    ],
    axis: 36,
    aria: "Bar chart of calls by hour from 8am to 9pm. 211 calls, 82 missed, mostly as the office opens, at lunch and after closing.",
    unit: "firm",
    moments: [
      ["09:00", "The morning rush", "New enquiries and clients after news ring as the office opens. Fee earners are already in meetings or on their way to court."],
      ["13:00", "Lunch cover", "One person on reception, or nobody. The phone rings out while they greet a client at the desk."],
      ["17:30", "After closing", "People ring a solicitor after work. Voicemail picks up and many hang up and try the next firm."],
    ],
  },
});
