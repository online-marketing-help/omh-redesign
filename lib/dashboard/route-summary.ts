/* =========================================================================
   The six routes, in words, for the people who read the dashboard.

   A deliberate second copy of what `widget/convex/routes.ts` holds as code.
   The code is the truth; this is the explanation, and it is written for
   somebody in a sales meeting rather than for a reviewer.

   They can drift, which is the one risk of writing it twice. The alternative
   is worse: deriving this text from the step definitions would put sales
   copy in the engine, and a route would then be hard to change without
   rewriting prose nobody can see from there.
   ========================================================================= */

export type RouteSummary = {
  id: string;
  name: string;
  rule: string;
  steps: string;
  note?: string;
};

export const ROUTE_SUMMARY: RouteSummary[] = [
  {
    id: "A",
    name: "Website chat or voice",
    rule: "Finish it in the conversation.",
    steps:
      "No follow-up at all. They are on the site asking now, and chasing somebody who is already talking to you is worse than answering them.",
  },
  {
    id: "B",
    name: "Website form, or Google Ads",
    rule: "Text and email together inside two minutes, call at fifteen.",
    steps:
      "Text and email at once, then a call at 15 minutes, a text that evening, an email the next day, and a final text on day four.",
    note: "They searched for the service, so the call is worth spending.",
  },
  {
    id: "C",
    name: "Facebook or Instagram lead form",
    rule: "Qualify by message first.",
    steps:
      "Text and a DM straight away, one more text an hour later, an email the next day, then stop and keep them for retargeting.",
    note: "Never an automated call. They were scrolling, not searching.",
  },
  {
    id: "D",
    name: "Messenger or Instagram DM",
    rule: "Answer in the thread.",
    steps:
      "The assistant replies in seconds, and sends one last message around hour twenty.",
    note: "Facebook only lets a business message freely for 24 hours after the person's last message.",
  },
  {
    id: "E",
    name: "Missed call",
    rule: "Text within sixty seconds, then call back.",
    steps:
      "A text in under a minute, a callback at five minutes, one more text that day, then the same shape as a form lead.",
    note: "Ringing is more effort than a form, so this is a warm lead.",
  },
  {
    id: "F",
    name: "Past customers",
    rule: "This one is marketing, and the rules are different.",
    steps:
      "One text with an opt-out, a second four days later, then stop. A reply turns it into a normal conversation from that moment.",
    note: "Nothing is sent without recorded permission, and the calls are made by a person.",
  },
];
