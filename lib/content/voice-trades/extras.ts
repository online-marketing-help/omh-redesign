// Trades section with no counterpart on /ai-voice-agents: a day on the tools (calls by hour). It takes the place of
// the main page's comparison table and fit checker. Copy from the client's brief (OMH AI Voice Agent Trades Page
// Content, October 2026), verbatim. Template: lib/content/voice-extras.ts.
import { extrasMarkup } from "@/lib/content/voice-extras";

export const tradesExtrasMarkup = extrasMarkup({
  day: {
    eyebrow: "A day on the tools",
    h2: `Calls don't wait for a tea break.<br class="max-sm:hidden"> <span class="hl">Neither do your customers.</span>`,
    intro: "An illustrative weekday at a trades business with three people out on jobs. Most missed calls land early, at lunchtime and after 5pm, which is exactly when nobody can pick up. A missed caller rarely leaves a voicemail. They ring the next number on the list.",
    // Hour, calls, answered by the team, closed (illustrative, as the brief's chart note): 140 calls, 73 missed (52%).
    hours: [
      ["07", 10, 4], ["08", 14, 6], ["09", 12, 9], ["10", 10, 8], ["11", 9, 6], ["12", 14, 5], ["13", 12, 5],
      ["14", 9, 7], ["15", 8, 6], ["16", 9, 6], ["17", 12, 5], ["18", 10, 0, true], ["19", 7, 0, true], ["20", 4, 0, true],
    ],
    axis: 24,
    aria: "Bar chart of calls by hour from 7am to 8pm. 140 calls, 73 missed, mostly first thing, at lunchtime and after 5pm.",
    unit: "business",
    moments: [
      ["07:30", "First thing", "Customers ring before work. You're already loading the van or driving to the first job."],
      ["12:00", "Hands full", "Everyone is mid-job, on a roof or behind a fuse board. The phone rings out in the van."],
      ["18:00", "After hours", "The day ends, but quote requests don't. Voicemail picks up and most callers try someone else."],
    ],
  },
});
