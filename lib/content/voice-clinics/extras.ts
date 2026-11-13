// Clinic section with no counterpart on /ai-voice-agents (21 Oct 2026), from the previous clinics page (git tag
// clinics-oldv1): a clinic's day of calls. It takes
// the place of the main page's comparison table and fit checker. Template: lib/content/voice-extras.ts.
import { extrasMarkup } from "@/lib/content/voice-extras";

export const clinicExtrasMarkup = extrasMarkup({
  day: {
    eyebrow: "A day at your clinic",
    h2: `Calls don't arrive evenly.<br class="max-sm:hidden"> <span class="hl">Neither do the misses.</span>`,
    intro: "An illustrative weekday at a busy clinic with three consulting rooms. Most missed calls land in the 8am rush, over lunch and after closing, which is exactly when nobody is free to pick up.",
    // Hour, calls, answered by the team, closed (previous clinics page): 232 calls, 79 missed.
    hours: [
      ["07", 6, 0, true], ["08", 34, 20], ["09", 24, 20], ["10", 18, 17], ["11", 16, 16], ["12", 22, 12], ["13", 20, 11],
      ["14", 15, 14], ["15", 14, 14], ["16", 17, 15], ["17", 21, 14], ["18", 12, 0, true], ["19", 8, 0, true], ["20", 5, 0, true],
    ],
    axis: 36,
    aria: "Bar chart of calls by hour from 7am to 8pm. 232 calls, 79 missed, mostly in the 8am rush, at lunch and after closing.",
    unit: "clinic",
    moments: [
      ["08:00", "The morning rush", "Patients ring at 8 on the dot to be seen this week. One receptionist, two lines and a queue at the desk."],
      ["12:30", "Lunch cover", "One person on the desk, or nobody. The phone rings out while they check a patient in."],
      ["18:00", "After closing", "Patients ring after work. Voicemail picks up and many hang up without leaving a message."],
    ],
  },
});
