/* =========================================================================
   What we actually send.

   Rendered here rather than in n8n so there is one copy of every message. A
   template that exists twice gets fixed once.

   Three rules hold across all of them:

   1. The first messages are about THEIR enquiry, not about us. That is not
      only better writing, it is what keeps them a reply rather than direct
      marketing. The moment the content turns into an unrelated offer, the
      restrictive rules apply.
   2. Marketing messages carry an opt-out, every time, not just the first.
      `STOP` is appended by `render` whenever the route is a marketing one, so
      it cannot be forgotten in a template.
   3. Nothing invents a price. The assistant has a knowledge base for that and
      a standing rule never to guess; a template has no knowledge base at all,
      so it does not mention figures.
   ========================================================================= */

import { ROUTES, type RouteId } from "./routes";

export type RenderContext = {
  name?: string;
  service?: string;
  message?: string; // what they actually asked, in their words
  reference?: string; // a booking reference
  preferredDate?: string;
  preferredTime?: string;
};

const PHONE = "020 3489 3934";
const EMAIL = "support@onlinemarketinghelp.co.uk";
const BOOK = "https://onlinemarketinghelp.co.uk/omh-free-consultation";
const TEAM = "Online Marketing Help";

/** First name only, and nothing at all rather than a wrong guess. */
function first(name?: string): string {
  const n = (name || "").trim();
  if (!n) return "";
  const head = n.split(/\s+/)[0];
  /* An all-caps or single-letter token is more likely a form artefact than a
     name, and "Hi A," reads worse than "Hi,". */
  if (head.length < 2) return "";
  return head.charAt(0).toUpperCase() + head.slice(1).toLowerCase();
}

/** "Hi Sarah," or "Hi," */
function hello(name?: string): string {
  const f = first(name);
  return f ? `Hi ${f},` : "Hi,";
}

/** What they asked about, for a subject line or an opening clause. */
function about(c: RenderContext): string {
  const s = (c.service || "").trim();
  return s || "your enquiry";
}

export type Rendered = {
  /* Email only. Absent for SMS and for a call. */
  subject?: string;
  body: string;
};

/* ------------------------------------------------------------------------ */

type Template = (c: RenderContext) => Rendered;

const TEMPLATES: Record<string, Template> = {
  /* ---- Route B: website form, or a Google Ads landing page ------------- */

  b_sms_first: (c) => ({
    body:
      `${hello(c.name)} it is ${TEAM}. Thanks for your enquiry about ${about(c)}. ` +
      `I can answer it here, or book you a free 30 minute call: ${BOOK}. ` +
      `Just reply to this text.`,
  }),

  b_email_first: (c) => ({
    subject: `Your enquiry about ${about(c)}`,
    body:
      `${hello(c.name)}\n\n` +
      `Thanks for getting in touch with ${TEAM} about ${about(c)}.\n\n` +
      (c.message
        ? `You said:\n\n  "${c.message.trim()}"\n\nI will come back to you on exactly that.\n\n`
        : `Tell me a little more about what you are trying to achieve and I will come back to you on exactly that.\n\n`) +
      `If it is easier to talk it through, you can book a free 30 minute call here:\n${BOOK}\n\n` +
      `I have also sent you a text, so reply to whichever suits you.\n\n` +
      `${TEAM}\n${PHONE}\n${EMAIL}`,
  }),

  /* A call has no body to send. The text is what the agent is briefed with,
     and it is recorded on the touch so the timeline reads sensibly. */
  b_call: (c) => ({
    body: `Calling about their enquiry on ${about(c)}.`,
  }),

  b_sms_we_tried: (c) => ({
    body:
      `${hello(c.name)} ${TEAM} here. I just tried to call about ${about(c)} and missed you. ` +
      `Reply here whenever suits, or book a time: ${BOOK}`,
  }),

  b_sms_evening: (c) => ({
    body:
      `${hello(c.name)} following up on ${about(c)}. ` +
      `Is there a good time tomorrow for a quick call? Reply with a time and I will ring you.`,
  }),

  b_email_day2: (c) => ({
    subject: `About ${about(c)}`,
    body:
      `${hello(c.name)}\n\n` +
      `I wanted to follow up on ${about(c)}.\n\n` +
      `The most useful next step is usually a short call: fifteen minutes is enough to tell you ` +
      `whether we can help and what it would involve. There is no charge and no obligation.\n\n` +
      `You can pick a time here:\n${BOOK}\n\n` +
      `Or just reply to this email with a question and I will answer it.\n\n` +
      `${TEAM}\n${PHONE}`,
  }),

  b_sms_final: (c) => ({
    body:
      `${hello(c.name)} last one from me about ${about(c)}, I will not chase again. ` +
      `If you would still like a hand, reply here or book any time: ${BOOK}`,
  }),

  /* ---- Route C: Facebook or Instagram lead ad form -------------------- */

  c_sms_first: (c) => ({
    body:
      `${hello(c.name)} it is ${TEAM}. You asked about ${about(c)} on Facebook. ` +
      `What is the main thing you are trying to sort out? Reply here and I will tell you if we can help.`,
  }),

  c_dm_first: (c) => ({
    body:
      `${hello(c.name)} thanks for your interest in ${about(c)}. ` +
      `What is the main thing you are trying to sort out? I can answer here.`,
  }),

  c_sms_second: (c) => ({
    body:
      `${hello(c.name)} ${TEAM} again. One question and I will leave it there: ` +
      `are you looking at ${about(c)} for now, or further ahead? Either answer is useful.`,
  }),

  c_email_day2: (c) => ({
    subject: `${about(c)}: anything I can answer?`,
    body:
      `${hello(c.name)}\n\n` +
      `You registered an interest in ${about(c)} through our Facebook advert.\n\n` +
      `I have not heard back, which is completely fine. If a question comes up later, ` +
      `reply to this email and it will reach me.\n\n` +
      `${TEAM}\n${PHONE}`,
  }),

  /* ---- Route D: Messenger or Instagram DM ----------------------------- */

  d_dm_last_call: (c) => ({
    body:
      `Just before this thread closes on Facebook's side: is there anything else ` +
      `I can answer about ${about(c)}? If you would rather talk, leave me a number ` +
      `or ring ${PHONE}.`,
  }),

  /* ---- Route E: missed or abandoned call ------------------------------ */

  e_sms_missed: (c) => ({
    body:
      `${hello(c.name)} it is ${TEAM}, sorry I missed your call. ` +
      `Reply here with what you need and I will sort it, or book a time: ${BOOK}`,
  }),

  e_call_back: (c) => ({
    body: `Calling back the missed call about ${about(c)}.`,
  }),

  e_sms_same_day: (c) => ({
    body:
      `${hello(c.name)} ${TEAM} here, still happy to help with your call earlier. ` +
      `Reply with a good time and I will ring you back.`,
  }),

  e_email_day2: (c) => ({
    subject: `Sorry I missed your call`,
    body:
      `${hello(c.name)}\n\n` +
      `You rang ${TEAM} and I was not able to pick up. I have texted as well, ` +
      `but in case email is easier: what were you after?\n\n` +
      `You can also book a time directly:\n${BOOK}\n\n` +
      `${TEAM}\n${PHONE}`,
  }),

  e_sms_final: (c) => ({
    body:
      `${hello(c.name)} last one from me, I will not chase again. ` +
      `If you still need a hand, reply here or ring ${PHONE} any time.`,
  }),

  /* ---- Route F: reactivation. Marketing. -----------------------------
     The opt-out is appended by `render`, not written here, so it cannot be
     left off one template by accident. */

  f_sms_first: (c) => ({
    body:
      `${hello(c.name)} it is ${TEAM}. We worked with you on ` +
      `${c.service ? c.service : "your marketing"} previously. ` +
      `We have changed what we offer since, and I think it would be worth ten minutes. ` +
      `Reply YES and I will send a time.`,
  }),

  f_sms_second: (c) => ({
    body:
      `${hello(c.name)} ${TEAM}, last message from me. ` +
      `If you would ever like to pick things back up, ring ${PHONE} and ask for the team.`,
  }),

  /* ---- Confirmations. Not part of a sequence: sent once, on an event. -- */

  booking_confirmed: (c) => ({
    body:
      `${hello(c.name)} your appointment with ${TEAM} is booked for ` +
      `${c.preferredDate} at ${c.preferredTime}. ` +
      `Your reference is ${c.reference}. ` +
      `To change it, reply to this text or ring ${PHONE}.`,
  }),

  booking_reminder: (c) => ({
    body:
      `${hello(c.name)} a reminder that your appointment with ${TEAM} is ` +
      `${c.preferredDate} at ${c.preferredTime}. Reply here if you need to move it.`,
  }),

  purchase_confirmed: (c) => ({
    body:
      `${hello(c.name)} thanks, that is confirmed${c.service ? ` for ${c.service}` : ""}. ` +
      `Your reference is ${c.reference}. ` +
      `Any questions, reply to this text or ring ${PHONE}.`,
  }),

  /* ---- Replies to an inbound. Sent once, immediately. ----------------- */

  optout_confirmed: () => ({
    body: `You will not get any more marketing texts from ${TEAM}. Nothing else is needed from you.`,
  }),
};

/* ------------------------------------------------------------------------ */

/** Every template key, for the test that asserts no route references a missing one. */
export function templateKeys(): string[] {
  return Object.keys(TEMPLATES);
}

/**
 * Render one message.
 *
 * `route` decides whether an opt-out is appended: it is added for every
 * message on a marketing route and for none on the others, because a
 * "reply STOP" on a reply to somebody's own enquiry reads as though they are
 * on a list, which they are not.
 *
 * Throws on an unknown key rather than sending an empty text. A failed render
 * is recorded against the step and the sequence stops; a blank message going
 * out to a client's customer is worse.
 */
export function render(
  key: string,
  ctx: RenderContext,
  route?: RouteId,
): Rendered {
  const t = TEMPLATES[key];
  if (!t) throw new Error(`No template named "${key}"`);
  const out = t(ctx);
  const marketing = route ? ROUTES[route]?.marketing : false;
  if (!marketing) return out;
  /* PECR: an opt-out in every marketing message, not only the first. */
  return {
    subject: out.subject,
    body: `${out.body}\n\nReply STOP to opt out.`,
  };
}
