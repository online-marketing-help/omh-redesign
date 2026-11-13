// Real estate sections with no counterpart on /ai-voice-agents (21 Oct 2026), from the previous estate page
// (git tag estate-oldv1): a branch's day of calls.
// It replaces the main page's comparison table and fit checker on this page. Template: lib/content/voice-extras.ts.
import { extrasMarkup } from "@/lib/content/voice-extras";

export const estateExtrasMarkup = extrasMarkup({
  day: {
    eyebrow: "A day at your branch",
    h2: `Calls don't arrive evenly.<br class="max-sm:hidden"> <span class="hl">Neither do the misses.</span>`,
    intro: "An illustrative weekday at a busy sales and lettings branch. Calls go unanswered while negotiators are out on viewings, over lunch and after the branch closes, which is exactly when buyers and tenants ring.",
    // Hour, calls, answered by the team, closed (previous estate page): 221 calls, 89 missed.
    hours: [
      ["08", 8, 0, true], ["09", 22, 18], ["10", 20, 14], ["11", 18, 13], ["12", 24, 16], ["13", 22, 15], ["14", 15, 12],
      ["15", 14, 12], ["16", 17, 14], ["17", 26, 18], ["18", 16, 0, true], ["19", 10, 0, true], ["20", 6, 0, true], ["21", 3, 0, true],
    ],
    axis: 30,
    aria: "Bar chart of calls by hour from 8am to 9pm. 221 calls, 89 missed, mostly during viewings, at lunch and after closing.",
    unit: "branch",
    moments: [
      ["10:30", "Out on viewings", "Negotiators are at properties. The office phone rings to an empty desk."],
      ["12:30", "Lunchtime enquiries", "Buyers ring on their lunch break, just as the team grabs theirs."],
      ["18:00", "After work", "Buyers and tenants ring after work. Voicemail picks up, and they ring the next agent on the portal."],
    ],
  },
});
