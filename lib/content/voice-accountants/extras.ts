// Accountants section with no counterpart on /ai-voice-agents (26 Oct 2026): a year at your firm, as one weekday of
// calls with illustrative figures (brief section 3). It takes the place of the main page's comparison table and fit
// checker. Template: lib/content/voice-extras.ts.
import { extrasMarkup } from "@/lib/content/voice-extras";

export const accountantsExtrasMarkup = extrasMarkup({
  day: {
    eyebrow: "A year at your firm",
    h2: `Calls don't spread out evenly.<br class="max-sm:hidden"> <span class="hl">Neither does the tax year.</span>`,
    intro: "An illustrative week at a firm with six fee earners. Most missed calls land first thing, over lunch and after 5pm. Then January arrives, and the phone doesn't stop until the 31st. A missed new enquiry rarely leaves a voicemail. They ring the next firm on the list.",
    // Hour, calls, answered by the team, closed (illustrative, a six-person firm): 230 calls, 86 missed.
    hours: [
      ["08", 5, 0, true], ["09", 34, 20], ["10", 26, 21], ["11", 22, 19], ["12", 20, 13], ["13", 21, 11], ["14", 19, 17],
      ["15", 18, 16], ["16", 17, 15], ["17", 20, 12], ["18", 12, 0, true], ["19", 8, 0, true], ["20", 5, 0, true], ["21", 3, 0, true],
    ],
    axis: 40,
    aria: "Bar chart of calls by hour from 8am to 9pm. 230 calls, 86 missed, mostly first thing, over lunch and after 5pm.",
    unit: "firm",
    moments: [
      ["09:00", "Monday morning", "Clients ring with questions saved up over the weekend. Your team is already in meetings."],
      ["12:30", "Everyone with a client", "Reviews, year-end meetings and calls with HMRC. Nobody is free to pick up."],
      ["January", "self-assessment", "The busiest month of the year, and the month your team has the least time for the phone."],
    ],
  },
});
