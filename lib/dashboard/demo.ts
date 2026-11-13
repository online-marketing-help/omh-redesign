import "server-only";
import type {
  SequenceRow, SequenceBoard, ChannelFact, LeadTimeline,
  CampaignRow, CampaignPerson,
} from "./routing";
import type { Lead, Booking, Session } from "./convex";
import type { Thread, ThreadMsg } from "./handover";
import type { InboxItem } from "./routing";
import type { Call } from "./retell";

/* =========================================================================
   Example data, for showing the system to somebody.

   Why this exists at all, and why it is kept this far away from everything
   else: a dashboard whose job is to report what really happened must never
   quietly mix in numbers that did not. Every screen here already hides our
   own test traffic and says how many rows it left out. Writing demonstration
   rows into Convex would defeat that permanently, because from then on no
   figure on any screen could be trusted without checking where it came from.

   So nothing in this file is ever written anywhere. It is served instead of
   the real data, only when the address says `?demo=1`, and every screen
   carries a banner while it is on.

   The story it tells is one ordinary Tuesday for OMH: leads arriving on five
   different channels, each followed up the way its route says, some replying,
   some booking, one opting out. The point of the demonstration is the
   DIFFERENCE between the channels, because that is the argument the system
   exists to make.
   ========================================================================= */

export const DEMO_FLAG = "demo";

/** Is this request asking for the example data? */
export function isDemo(params?: { demo?: string | string[] }): boolean {
  const v = params?.demo;
  return v === "1" || v === "true" || (Array.isArray(v) && v.includes("1"));
}

const MIN = 60_000;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;
const now = () => Date.now();

/* ------------------------------------------------------------------ leads */


/* ------------------------------------------------------------ the people

   Ten per channel, generated rather than hand written, because the point of
   the demonstration is the DIFFERENCE between channels and twelve hand
   written rows cannot show it. Each channel has a character: how fast we
   answer it, how often anybody replies, how often that turns into a booking
   and then into money.

   The numbers are invented but not arbitrary. They follow the findings the
   routing paper is built on: a Google search converts better than an
   interruption on Facebook, a missed call is warm because ringing is effort,
   and reactivation is the one that produces opt-outs.
   ------------------------------------------------------------------------ */

type Profile = {
  /* How many leads this channel produced.

     Ten everywhere was the first version, and it made the channel chart on
     the Overview useless: twenty bars of identical length rank nothing, which
     is the one thing that chart is for. Real channels differ by an order of
     magnitude, and the shape of that difference is half the argument the
     system makes. Nothing drops below ten, so every channel still has enough
     rows to filter the Leads table down to and look at.

     The volumes are not arbitrary either. Facebook is the cheapest place to
     buy attention and produces the most leads and the fewest deals; a missed
     call is rare and nearly always worth something. */
  leads: number;
  /** Seconds until the first message goes out. */
  firstTouch: number | null;
  /** Of ten, how many reply. */
  replies: number;
  /** Of ten, how many book. */
  books: number;
  /** Of those who book, how many become a deal. */
  wins: number;
  /** Of ten, how many ask to be left alone. */
  optOuts: number;
  /** Typical deal size. */
  value: number;
  route: string;
  campaign: string | null;
};

const PROFILES: Record<string, Profile> = {
  /* They are on the site asking now, so there is no first touch to measure:
     the conversation IS the answer. */
  website_chat:   { leads: 22, firstTouch: null, replies: 10, books: 4, wins: 2, optOuts: 0, value: 1800, route: "A", campaign: null },
  website_voice:  { leads: 12, firstTouch: null, replies: 10, books: 3, wins: 2, optOuts: 0, value: 2200, route: "A", campaign: null },
  website_form:   { leads: 30, firstTouch: 55,   replies: 5,  books: 3, wins: 2, optOuts: 0, value: 2100, route: "B", campaign: null },

  /* They searched for the service, which is why this is the strongest paid
     channel and why the agent is allowed to ring them. */
  google_ads:     { leads: 28, firstTouch: 52,   replies: 6,  books: 4, wins: 3, optOuts: 0, value: 2600, route: "B", campaign: "Emergency plumber, Leeds" },

  /* Interrupted mid-scroll. Cheaper leads, far fewer of them book, which is
     the whole argument for routing them differently. */
  facebook_ads:   { leads: 34, firstTouch: 69,   replies: 2,  books: 1, wins: 0, optOuts: 1, value: 900,  route: "C", campaign: "Roofing, instant form, Yorkshire" },
  instagram_ads:  { leads: 21, firstTouch: 72,   replies: 2,  books: 1, wins: 1, optOuts: 1, value: 1100, route: "C", campaign: "Salons, reels, North" },
  /* A click-to-WhatsApp ad lands in a thread they already use, which is why
     it answers better than the other Meta placements. */

  /* They chose to message a business, so intent is high and the reply is
     instant because the assistant is in the thread. */
  facebook:       { leads: 26, firstTouch: 12,   replies: 7,  books: 3, wins: 2, optOuts: 0, value: 1600, route: "D", campaign: "Roofing, instant form, Yorkshire" },
  instagram:      { leads: 24, firstTouch: 10,   replies: 6,  books: 2, wins: 1, optOuts: 0, value: 1400, route: "D", campaign: "Salons, reels, North" },
  whatsapp:       { leads: 25, firstTouch: 9,    replies: 7,  books: 4, wins: 3, optOuts: 0, value: 1700, route: "D", campaign: "WhatsApp click, trades" },

  /* Ringing is more effort than a form, so a missed call is a warm lead and
     the sixty second text is what saves it. */
  phone_inbound:  { leads: 18, firstTouch: 20,   replies: 8,  books: 5, wins: 3, optOuts: 0, value: 2400, route: "E", campaign: null },
  phone_missed:   { leads: 10, firstTouch: 41,   replies: 6,  books: 4, wins: 3, optOuts: 0, value: 2300, route: "E", campaign: null },

  /* The only marketing route, and the only one that produces opt-outs. */
  reactivation:   { leads: 24, firstTouch: 180,  replies: 3,  books: 2, wins: 1, optOuts: 2, value: 1200, route: "F", campaign: "Dormant clients, 2025" },

  organic:        { leads: 32, firstTouch: 61,   replies: 4,  books: 2, wins: 1, optOuts: 0, value: 1700, route: "B", campaign: null },
  referral:       { leads: 10, firstTouch: 50,   replies: 7,  books: 5, wins: 4, optOuts: 0, value: 3100, route: "B", campaign: null },
  direct:         { leads: 13, firstTouch: 59,   replies: 4,  books: 2, wins: 1, optOuts: 0, value: 1800, route: "B", campaign: null },
};

/* Fictional businesses, chosen so nobody can mistake one for a real client.
   Twenty surnames and twenty trades, combined so every lead is a different
   company without inventing two hundred names by hand. */
const SURNAMES = [
  "Whitfield", "Okafor", "Raman", "Hargreaves", "Bennett", "Dale", "Khan",
  "Mullen", "Pike", "Forrest", "Costa", "Pritchard", "Ashworth", "Nwosu",
  "Quinn", "Ваrlow", "Sandhu", "Thorne", "Ellery", "Mackay",
].map((n) => n.replace("В", "B"));

const FIRST = [
  "Sarah", "Daniel", "Priya", "Tom", "Chloe", "Marcus", "Ayesha", "Greg",
  "Rachel", "Liam", "Nadia", "Owen", "Hannah", "Chidi", "Erin", "Joe",
  "Simran", "Beth", "Nathan", "Iona",
];

const TRADES = [
  "Dental", "Plumbing", "Accountancy", "Roofing", "Beauty", "Fitness",
  "Legal", "Motors", "Interiors", "Landscaping", "Catering", "Removals",
  "Joinery", "Electrical", "Opticians", "Veterinary", "Flooring",
  "Lettings", "Bakery", "Cycles",
];

const SERVICES = [
  "Local SEO", "Google Ads management", "Website build", "Social media",
  "AI voice agent", "Email marketing",
];

type Seed = {
  name: string;
  company: string;
  phone: string;
  email: string;
  service: string;
  source: string;
  campaign: string | null;
  agoMs: number;
  firstTouchMs: number | null;
  repliedAfterMs: number | null;
  smsOut: number;
  emailOut: number;
  callsOut: number;
  callsAnswered: number;
  booked: boolean;
  hot: boolean;
  route: string;
  seqStatus: string;
  stopReason: string | null;
  outcome?: string;
  valueGbp?: number;
};

/* `replies`, `books`, `wins` and `optOuts` on a profile are all stated out of
   ten, because a rate is easier to reason about than a count when you are
   deciding what a channel is like. The generator scales them to that
   channel's actual volume, so changing a volume changes how many leads there
   are and leaves the character of the channel alone. */
const scale = (outOfTen: number, leads: number) => Math.round((outOfTen / 10) * leads);

/* A different name on every row, and no name used twice.

   Twenty first names against twenty surnames is four hundred pairs, and the
   problem is walking them so that both move on every row AND no pair comes
   back before all four hundred are used. Two earlier attempts each failed one
   half of that: dividing by the list length held the surname still for twenty
   rows at a time, so a whole channel shared one surname; giving the surname
   its own stride made both move but left the pair repeating every twenty
   rows, which put the same person on the follow-up board twice. Two sequences
   for one person is the thing the engine refuses to do, so a demonstration
   showing it is showing a bug.

   Numbering the pairs 0 to 399 and stepping by a number coprime with 400
   visits every pair exactly once before any repeats. */
const NAMES = FIRST.length * SURNAMES.length;
function personName(n: number): { first: string; last: string } {
  const m = (n * 137) % NAMES;
  return { first: FIRST[m % FIRST.length], last: SURNAMES[Math.floor(m / FIRST.length)] };
}

/* Deterministic, so two renders of the same demonstration agree and a
   screenshot taken today matches the one taken tomorrow. */
function jitter(n: number, spread: number): number {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return Math.round((x - Math.floor(x)) * spread);
}

const SEEDS: Seed[] = (() => {
  const out: Seed[] = [];
  let i = 0;
  for (const [source, p] of Object.entries(PROFILES)) {
    const nReplies = scale(p.replies, p.leads);
    const nBooks = scale(p.books, p.leads);
    const nWins = scale(p.wins, p.leads);
    const nOptOuts = scale(p.optOuts, p.leads);
    for (let k = 0; k < p.leads; k++) {
      const n = i++;
      const replied = k < nReplies;
      const booked = k < nBooks;
      const won = k < nWins;
      const optedOut = k >= p.leads - nOptOuts;

      /* Spread over the last ten days, and deliberately NOT in step with k.
         Tying the date to the loop index tied it to the outcome as well, so
         every recent lead was a win and the screen told a story that no real
         week would. */
      const agoMs =
        ((jitter(n + 101, 100) / 10) * DAY) / 10 + (jitter(n + 7, 240) * HOUR) / 10;

      out.push({
        name: `${personName(n).first} ${personName(n).last}`,
        company: `${personName(n).last} ${TRADES[(n * 3 + 1) % TRADES.length]}`,
        phone: `+4477009${String(10000 + n).slice(-5)}`,
        email: `${personName(n).first.toLowerCase()}.${personName(n).last.toLowerCase()}@${TRADES[(n * 3 + 1) % TRADES.length].toLowerCase()}.example`,
        service: SERVICES[n % SERVICES.length],
        source,
        campaign: p.campaign,
        agoMs,
        firstTouchMs: p.firstTouch === null ? null : (p.firstTouch + jitter(n, 20)) * 1000,
        repliedAfterMs: replied ? (3 + jitter(n, 40)) * MIN : null,
        smsOut: p.route === "A" ? 0 : replied ? 1 : 2 + (k % 2),
        emailOut: p.route === "A" || p.route === "D" ? 0 : replied ? 1 : 2,
        callsOut: p.route === "B" || p.route === "E" ? (replied ? 0 : 1) : 0,
        callsAnswered: p.route === "E" && replied ? 1 : 0,
        booked,
        hot: replied || booked,
        route: p.route,
        seqStatus: optedOut
          ? "stopped"
          : booked
            ? "stopped"
            : replied
              ? "stopped"
              : k < nReplies + Math.max(2, Math.round(p.leads * 0.12))
                ? "active"
                : "completed",
        stopReason: optedOut
          ? "opted_out"
          : booked
            ? "booked"
            : replied
              ? "replied"
              : k < nReplies + Math.max(2, Math.round(p.leads * 0.12))
                ? null
                : "exhausted",
        outcome: won ? "won" : booked ? "quoted" : optedOut ? "unqualified" : undefined,
        valueGbp: won ? p.value + jitter(n, 800) : undefined,
      });
    }
  }
  return out;
})();

/* ---------------------------------------------------------- channel facts */

export function demoChannelFacts(): {
  rows: ChannelFact[];
  since: number;
  counted: number;
} {
  const t = now();
  const rows: ChannelFact[] = SEEDS.map((s, i) => {
    const firstAt = t - s.agoMs;
    return {
      sessionId: `demo-${i + 1}`,
      name: s.name,
      email: s.email,
      sourceChannel: s.source,
      campaign: s.campaign,
      adId: s.source.endsWith("_ads") ? `1202${100 + i}` : null,
      firstAt,
      hot: s.hot,
      status: s.booked ? "closed" : s.repliedAfterMs ? "contacted" : "new",
      outcome: s.outcome ?? null,
      valueGbp: s.valueGbp ?? null,
      firstOutAt: s.firstTouchMs === null ? null : firstAt + s.firstTouchMs,
      msToFirstTouch: s.firstTouchMs,
      firstInAt: s.repliedAfterMs === null ? null : firstAt + s.repliedAfterMs,
      msToFirstReply: s.repliedAfterMs,
      smsOut: s.smsOut,
      smsIn: s.repliedAfterMs === null ? 0 : 1,
      emailOut: s.emailOut,
      /* Some people answer the email rather than the text. Roughly one in
         four of those who reply, so the example shows an email reply rate
         that is lower than the text one and not zero, which is what the
         real figure looks like once the mailbox is read. */
      emailIn: s.repliedAfterMs !== null && s.emailOut > 0 && i % 3 === 0 ? 1 : 0,
      callsOut: s.callsOut,
      callsAnswered: s.callsAnswered,
      sequences: [{ route: s.route, status: s.seqStatus, stopReason: s.stopReason }],
      bookings: s.booked ? 1 : 0,
    };
  });
  return { rows, since: t - 7 * DAY, counted: rows.length };
}

/* --------------------------------------------------------- sequence board */

const STEP_LABEL: Record<string, { label: string; channel: string }> = {
  B0: { label: "Agent calls", channel: "call" },
  B2: { label: "Early evening text", channel: "sms" },
  B3: { label: "Day 2 email", channel: "email" },
  B4: { label: "Final text, then stop", channel: "sms" },
  C0: { label: "One more text, different angle", channel: "sms" },
  C1: { label: "Day 2 email, then stop", channel: "email" },
};

export function demoSequenceBoard(): SequenceBoard {
  const t = now();
  const rows: SequenceRow[] = SEEDS.map((s, i) => {
    const key = `${s.route}${s.seqStatus === "active" ? (s.route === "C" ? 0 : 2) : 4}`;
    const step = STEP_LABEL[key] ?? { label: "Final text, then stop", channel: "sms" };
    return {
      id: `demo-seq-${i + 1}`,
      leadId: `demo-lead-${i + 1}`,
      sessionId: `demo-${i + 1}`,
      name: s.name,
      phone: s.phone,
      email: s.email,
      sourceChannel: s.source,
      route: s.route,
      routeName: s.route,
      step: s.seqStatus === "active" ? 2 : 4,
      stepLabel: s.seqStatus === "active" ? step.label : null,
      stepChannel: s.seqStatus === "active" ? step.channel : null,
      status: s.seqStatus,
      stopReason: s.stopReason,
      /* Spread continuously rather than picked from four fixed delays. With
         four values on a rotation, a quarter of everything due landed on the
         same minute, and "Due next" is sorted by soonest, so the whole panel
         read "in 14 min" eight times over. */
      nextDueAt:
        s.seqStatus === "active" ? t + (4 + jitter(i + 31, 520)) * MIN : null,
      attempts: s.smsOut + s.emailOut + s.callsOut,
      at: t - s.agoMs,
      leased: false,
    };
  }).filter((r) => r.route !== "A");

  return {
    rows,
    counts: {
      active: rows.filter((r) => r.status === "active").length,
      stopped: rows.filter((r) => r.status === "stopped").length,
      completed: rows.filter((r) => r.status === "completed").length,
      failed: 0,
    },
    now: t,
  };
}

/* ---------------------------------------------------------- one timeline */

/** The story of a single lead, for showing what a follow-up actually looks like. */
export function demoTimeline(): LeadTimeline {
  const t = now();
  const start = t - 5 * HOUR;
  const s = SEEDS[1]; // Daniel Okafor: Google Ads, called, still open

  return {
    lead: {
      name: s.name,
      email: s.email,
      phone: s.phone,
      service: s.service,
      sourceChannel: s.source,
      attribution: {
        campaign: s.campaign ?? "",
        gclid: "EAIaIQobChMI-demo",
        medium: "cpc",
        source: "google",
        keyword: "emergency plumber marketing",
        landingPage: "https://onlinemarketinghelp.co.uk/google-ads",
      },
      smsConsent: "none",
      emailConsent: "none",
      automatedCallConsent: null,
      tpsCheckedAt: null,
      tpsListed: null,
      status: "contacted",
      outcome: null,
      valueGbp: null,
      lostReason: null,
      hot: true,
      firstAt: start,
      at: start,
      visits: 2,
      sessionId: "demo-2",
    },
    sequences: [
      {
        id: "demo-seq-2",
        route: "B",
        step: 2,
        status: "active",
        stopReason: null,
        nextDueAt: t + 48 * MIN,
        attempts: 4,
        at: start,
      },
    ],
    events: [
      {
        at: start,
        type: "message",
        direction: "in",
        channel: "chat",
        role: "user",
        text: "Filled in the quote form: looking for help with Google Ads for an emergency plumbing business.",
      },
      {
        at: start + 62_000,
        type: "touch",
        direction: "out",
        channel: "sms",
        status: "delivered",
        route: "B",
        step: 0,
        text: "Hi Daniel, it is Online Marketing Help. Thanks for your enquiry about Google Ads management. I can answer it here, or book you a free 30 minute call.",
      },
      {
        at: start + 64_000,
        type: "touch",
        direction: "out",
        channel: "email",
        status: "delivered",
        route: "B",
        step: 0,
        text: "Your enquiry about Google Ads management",
      },
      {
        at: start + 15 * MIN,
        type: "touch",
        direction: "out",
        channel: "call",
        status: "answered",
        route: "B",
        step: 0,
        text: "Calling about their enquiry on Google Ads management. Spoke for 4 minutes, asked for costs in writing.",
      },
      {
        at: start + 3 * HOUR,
        type: "touch",
        direction: "out",
        channel: "sms",
        status: "delivered",
        route: "B",
        step: 2,
        text: "Hi Daniel, following up on Google Ads management. Is there a good time tomorrow for a quick call?",
      },
    ],
  };
}

/* -------------------------------------------------------------- the leads */

/** The same people, in the shape the leads screen reads. */
export function demoLeads(): Lead[] {
  const t = now();
  return SEEDS.map((s, i) => ({
    _id: `demo-lead-${i + 1}`,
    sessionId: `demo-${i + 1}`,
    name: s.name,
    email: s.email,
    phone: s.phone,
    company: s.company,
    service: s.service,
    message: undefined,
    hot: s.hot,
    /* Transport. Everybody here typed or tapped except the missed call. */
    channel: s.source.startsWith("phone") ? "voice" : "chat",
    at: t - s.agoMs,
    status: s.booked ? "closed" : s.repliedAfterMs ? "contacted" : "new",
    visits: i % 4 === 0 ? 2 : 1,
    firstAt: t - s.agoMs - (i % 4 === 0 ? 6 * DAY : 0),
    sourceChannel: s.source,
    outcome: s.outcome,
    valueGbp: s.valueGbp,
    attribution: s.campaign
      ? {
          campaign: s.campaign,
          adId: s.source.endsWith("_ads") ? `1202${100 + i}` : undefined,
          gclid: s.source === "google_ads" ? "EAIaIQobChMI-demo" : undefined,
          fbclid: s.source.startsWith("facebook") ? "IwAR-demo" : undefined,
          medium: "cpc",
          source: s.source.startsWith("google") ? "google" : "facebook",
        }
      : undefined,
  }));
}

/* ----------------------------------------------------- bookings and calls */

/* What gets booked. One line each, because a diary of ninety identical
   "free consultation" entries tells you nothing about the business. */
const APPOINTMENTS = [
  "Free 30 minute consultation",
  "Google Ads account review",
  "Website walkthrough",
  "SEO strategy call",
  "Quarterly results review",
  "Onboarding call",
  "Social media planning",
];

/* A working day, not four fixed slots. */
const SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
];

/** `n` working days from `from`, skipping Saturdays and Sundays. */
function businessDay(from: number, n: number): Date {
  const d = new Date(from);
  const step = n < 0 ? -1 : 1;
  let left = Math.abs(n);
  /* Start on a weekday, so "zero working days from a Sunday" is the Monday
     rather than the Sunday. */
  while (d.getDay() === 0 || d.getDay() === 6) d.setDate(d.getDate() + 1);
  while (left > 0) {
    d.setDate(d.getDate() + step);
    if (d.getDay() !== 0 && d.getDay() !== 6) left -= 1;
  }
  return d;
}

export function demoBookings(): Booking[] {
  const t = now();
  const booked = SEEDS.filter((s) => s.booked);

  /* Spread across three weeks, centred on today: some already happened, the
     rest are still to come.

     The first version put every appointment on one of four dates in the week
     ahead, so the diary showed twenty-three consultations on a Tuesday and
     nothing on any other day, and the "still to come" card equalled the total
     because nothing was ever in the past. A diary is the one screen where the
     shape of the week IS the information. */
  const out = booked.map((s, i) => {
    const n = SEEDS.indexOf(s);
    /* Thirteen days back to fourteen forward, weighted so rather more are
       still ahead than behind, which is what a diary looks like when the
       assistant is actually booking. */
    /* Counted in WORKING days, not calendar days.

       Picking a calendar offset and then nudging weekend dates onto a weekday
       piled three weeks of Saturdays and Sundays onto the Mondays beside
       them: the week-ahead strip read fourteen appointments today against one
       on each of the next five days. Choosing from working days in the first
       place means no date ever needs moving, so nothing accumulates anywhere.
       A diary is read for its shape, and a shape produced by a workaround is
       worse than the weekend it was avoiding. */
    const day = businessDay(t, (jitter(n + 211, 19) % 20) - 9);

    const past = day.getTime() < t;
    return {
      _id: `demo-booking-${i + 1}`,
      reference: `OMH-${String(4100 + i)}`,
      sessionId: `demo-${n + 1}`,
      name: s.name,
      email: s.email,
      phone: s.phone,
      service: APPOINTMENTS[(n * 3 + 1) % APPOINTMENTS.length],
      preferredDate: day.toISOString().slice(0, 10),
      preferredTime: SLOTS[(n * 5 + 2) % SLOTS.length],
      channel: s.source.startsWith("phone") ? "voice" : "chat",
      /* Mostly confirmed, a few still to be confirmed, the occasional one
         cancelled or moved. All four states exist in the data, so every
         filter on the screen has something behind it. */
      status:
        i % 17 === 3 ? "cancelled" : i % 13 === 5 ? "moved" : past || i % 4 !== 0 ? "confirmed" : "requested",
      at: t - s.agoMs + 10 * MIN,
    };
  });

  return out.sort((a, b) =>
    `${a.preferredDate}${a.preferredTime}`.localeCompare(`${b.preferredDate}${b.preferredTime}`),
  );
}

/* A silent second of audio.

   Every demo call used to have no recording at all, which left the Calls
   screen reading "No recording" sixty-four times and the counter above it
   stuck at zero per cent, so the one screen whose whole promise is "listen to
   what was said" looked broken.

   Silence rather than a voice: the alternative is inventing a recording of a
   fictional customer, and a convincing one is a worse thing to have made than
   an obviously empty one. The control works, which is what the demonstration
   is showing, and nothing claims to be a real person's voice. */
const SILENT_WAV =
  "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAgD4AAAB9AAACABAAZGF0YQAAAAA=";

/** Enough calls for the overview's counters and its fourteen day trend. */
export function demoCalls(): Call[] {
  const t = now();
  const out: Call[] = [];
  /* Who rang. Callers are drawn from the leads who actually arrived by
     phone or by voice, so a call joins to a person the way a real one does
     through its session id, and the Calls screen shows a name, where they
     came from and what came of it rather than a column of "not identified". */
  const callers = SEEDS
    .map((s, idx) => ({ s, sessionId: `demo-${idx + 1}` }))
    .filter(({ s }) => s.source.startsWith("phone") || s.source === "website_voice");
  /* A believable week: busier on weekdays, quiet at the weekend. */
  const perDay = [4, 6, 5, 7, 6, 2, 1, 5, 6, 4, 8, 5, 3, 2];
  perDay.forEach((n, dayBack) => {
    const daysAgo = 13 - dayBack;
    for (let i = 0; i < n; i++) {
      /* Today's calls are counted back from now rather than from nine in the
         morning. Fixed clock times put every "today" call before dawn when
         the demonstration was opened at night, so the first card on the first
         screen read "Calls today 0". */
      const at =
        daysAgo === 0
          ? t - (1 + i * 2) * HOUR
          : t - daysAgo * DAY - (9 + i) * HOUR;
      const secs = (90 + ((i * 37) % 240)) * 1000;
      const seq = out.length;
      /* A stride, not a walk. The callers come out of SEEDS grouped by
         channel, so stepping through them one at a time gave a whole screen
         of "Inbound call" before the first missed call appeared. */
      const caller = callers.length ? callers[(seq * 7 + 3) % callers.length] : null;
      out.push({
        callId: `demo-call-${dayBack}-${i}`,
        agentName: "OMH Site Assistant",
        sessionId: caller ? caller.sessionId : null,
        startedAt: at,
        durationMs: secs,
        /* Retell's published rate, near enough for a demonstration and
           clearly rounded rather than pretending to be a real invoice. */
        costGbp: (secs / 60000) * 0.15,
        /* Not all of them. A screen where every row says the same thing shows
           nothing, and a call that dropped before it started genuinely has
           nothing to play. */
        recordingUrl: seq % 9 === 4 ? null : SILENT_WAV,
        summary:
          i % 3 === 0
            ? "The caller asked what Online Marketing Help does and booked a consultation."
            : i % 3 === 1
              ? "The caller asked about Google Ads pricing and was sent the package details."
              : "The caller asked whether we build Shopify stores, and left their number.",
        successful: i % 7 !== 0,
        pageUrl: null,
        disconnection: i % 7 === 0 ? "user_hangup" : "agent_hangup",
        status: "ended",
      });
    }
  });
  return out.sort((a, b) => b.startedAt - a.startedAt);
}

/* One call, with the transcript, for the detail screen.

   The list screen deliberately does not carry the summary: a call list is
   scanned for who rang and when, and twenty paragraphs of what the assistant
   thought the call was about buries that. The paragraph lives here instead,
   one click away, which is where something you read rather than scan belongs.

   Three different conversations rather than one repeated, because a demo
   where every call says the same thing shows nothing about what the
   assistant actually does. */
const DEMO_TURNS: Array<Array<{ role: string; text: string }>> = [
  [
    { role: "agent", text: "Good afternoon, Online Marketing Help. How can I help?" },
    { role: "caller", text: "Hi, I run a dental practice in Harrogate and I want more implant enquiries. Do you do that?" },
    { role: "agent", text: "We do. Most of our dental clients run Google Ads on treatment searches, with the landing page and the call handling done properly, because that is usually where the enquiries are lost." },
    { role: "caller", text: "What sort of budget are we talking about?" },
    { role: "agent", text: "For a single site practice, most start between eight hundred and fifteen hundred a month in ad spend. Would a thirty minute call this week be useful? I can see Thursday at two." },
    { role: "caller", text: "Thursday at two works." },
    { role: "agent", text: "Booked. I will send a confirmation to the number you are calling from." },
  ],
  [
    { role: "agent", text: "Good morning, Online Marketing Help." },
    { role: "caller", text: "I had a quote from you about three months ago for a website and never got back to you." },
    { role: "agent", text: "No problem at all. Can I take the name it was under?" },
    { role: "caller", text: "It was under Pike Joinery." },
    { role: "agent", text: "I have it. Is it still the same five page site with the gallery, or has the plan changed?" },
    { role: "caller", text: "We would want online booking now as well." },
    { role: "agent", text: "That changes the quote, so I will have someone call you back today with a revised figure rather than guess at it." },
  ],
  [
    { role: "agent", text: "Online Marketing Help, good afternoon." },
    { role: "caller", text: "Do you do the AI phone answering? I saw it on your site." },
    { role: "agent", text: "You are speaking to it. It answers every call, takes the details and books straight into the diary." },
    { role: "caller", text: "Right. How much?" },
    { role: "agent", text: "It depends on call volume. Roughly how many calls do you miss in a week?" },
    { role: "caller", text: "Honestly, no idea. A lot on Saturdays." },
    { role: "agent", text: "Then that is the first thing worth measuring. Can I take an email and send you a short note on how to check it?" },
  ],
];

const DEMO_SUMMARY = [
  "The caller runs a dental practice and asked about getting more implant enquiries. Budget discussed, consultation booked for Thursday at 2pm.",
  "A lapsed quote from three months ago. The job has grown to include online booking, so a revised quote was promised rather than guessed at.",
  "The caller asked about the AI phone answering while speaking to it. No figure given, because call volume was unknown. Email requested.",
];

export function demoCall(callId: string) {
  const call = demoCalls().find((c) => c.callId === callId);
  if (!call) return null;
  /* Which of the three, from the id rather than at random, so reloading the
     page does not change what was said on the call. */
  const n = Math.abs([...callId].reduce((a, ch) => a + ch.charCodeAt(0), 0)) % DEMO_TURNS.length;
  const turns = DEMO_TURNS[n];
  return {
    ...call,
    summary: DEMO_SUMMARY[n],
    transcript: turns.map((t) => `${t.role}: ${t.text}`).join("\n"),
    turns: turns.map((t, i) => ({ role: t.role, text: t.text, at: i * 7 })),
  };
}

/** Everything the leads and overview screens read, in one object. */
export function demoWidgetData() {
  return {
    leads: demoLeads(),
    bookings: demoBookings(),
    escalations: [],
    reachable: true,
    hidden: 0,
  };
}

/* ---------------------------------------------------------------- inbox */

/** Recent messages across every channel, for the Inbox screen. */
export function demoInbox(): { items: InboxItem[]; since: number } {
  const t = now();
  const OPENERS: Record<string, string[]> = {
    sms: ["Yes please, when can you start?", "Can you send the costs in writing?", "Sorry, not right now."],
    email: ["Thanks, I have forwarded this to my partner.", "What does the SEO package include?"],
    whatsapp: ["Hi, saw your ad. Do you do Google Ads for trades?", "Can we talk tomorrow morning?"],
    messenger: ["Do you work with salons?", "How much roughly for a website?"],
    instagram: ["Hey, do you do social media too?", "Is the consultation really free?"],
    chat: ["How much is local SEO?", "Do you build Shopify stores?", "I need to speak to someone."],
    voice: ["Called about Google Ads for an emergency plumbing business.", "Asked what the packages include."],
    call: ["Calling back about their enquiry.", "Rang and did not get through."],
  };

  /* Across every channel, not the first sixty rows.

     SEEDS is built channel by channel, so slicing the top of it gave an inbox
     of nothing but website traffic: the one screen whose whole point is that
     every channel arrives in the same place was missing most of them. Taking
     three per channel keeps it varied and keeps the list readable. */
  const PER = 3;
  const sample: typeof SEEDS = [];
  const seen = new Map<string, number>();
  for (const s of SEEDS) {
    const n = seen.get(s.source) ?? 0;
    if (n >= PER) continue;
    seen.set(s.source, n + 1);
    sample.push(s);
  }

  const items: InboxItem[] = sample.map((s, i) => {
    const channel =
      s.source.startsWith("whatsapp") ? "whatsapp"
      : s.source.startsWith("facebook") ? "messenger"
      : s.source.startsWith("instagram") ? "instagram"
      : s.source.startsWith("phone") ? "call"
      : s.source === "website_voice" ? "voice"
      : s.source === "website_chat" ? "chat"
      : i % 3 === 0 ? "email" : "sms";
    const pool = OPENERS[channel] ?? OPENERS.sms;
    const inbound = i % 3 !== 1;
    return {
      at: t - s.agoMs / 2 - i * 11 * MIN,
      channel,
      direction: inbound ? "in" : "out",
      text: inbound
        ? pool[i % pool.length]
        : `Hi ${s.name.split(" ")[0]}, thanks for your enquiry about ${s.service}. I can answer it here, or book you a free 30 minute call.`,
      who: s.name,
      sessionId: `demo-${i + 1}`,
      leadId: `demo-lead-${i + 1}`,
      sourceChannel: s.source,
      /* A handful are waiting on a person, which is the thing this screen is
         for: knowing which of sixty messages needs you. */
      needsPerson: inbound && i % 9 === 0,
      status: inbound ? "received" : "delivered",
    };
  });
  items.sort((a, b) => b.at - a.at);
  return { items, since: t - 7 * DAY };
}

/* ----------------------------------------------------------- conversations

   One session per lead, so the Conversations screen, the Leads table and the
   Channels report are describing the same people rather than three unrelated
   lists. That is the difference between a dashboard and a set of screens: a
   name you see here is a name you can find over there.

   What somebody opened with is drawn from what they wanted, because the first
   line of a conversation is the one piece of a transcript worth putting in a
   list, and it has to sound like the channel it came from. Nobody opens a
   Facebook message the way they open a quote form. */

const OPENERS: Record<string, string[]> = {
  ads: [
    "Saw your ad. How much is {service}?",
    "Is the {service} thing still going?",
    "What does {service} actually involve?",
  ],
  form: [
    "I filled in the form about {service}, who do I speak to?",
    "Looking for a quote on {service}.",
    "We need help with {service} before the new year.",
  ],
  dm: [
    "hi, do you do {service}?",
    "hey. interested in {service} for my business",
    "Quick one, is {service} something you cover?",
  ],
  phone: [
    "Called about {service}.",
    "Rang to ask about {service} and pricing.",
  ],
  site: [
    "Hi, can you tell me about {service}?",
    "I am comparing a few agencies for {service}.",
    "What makes your {service} different from the others?",
  ],
};

const REPLIES = [
  "Happy to help. Can I take your name and the best number to reach you on?",
  "I can give you a range now and someone will confirm it. What size is the business?",
  "Let me check that properly rather than guess. What is your website?",
  "That is usually a thirty minute call. Would Thursday afternoon suit?",
];

function openerFor(source: string, service: string, n: number): string {
  const family = source.endsWith("_ads")
    ? "ads"
    : source.includes("_dm") || source.includes("_page") || source === "whatsapp"
      ? "dm"
      : source.startsWith("phone")
        ? "phone"
        : source.includes("form")
          ? "form"
          : "site";
  const list = OPENERS[family];
  return list[n % list.length].replace("{service}", service.toLowerCase());
}

export function demoConversations(): { sessions: Session[]; hidden: number; available: boolean } {
  const t = now();
  const sessions: Session[] = SEEDS.map((s, i) => {
    const started = t - s.agoMs;
    const turns = 4 + (jitter(i + 5, 16) % 14);
    const theyLeft = s.repliedAfterMs !== null || s.booked;
    return {
      sessionId: `demo-${i + 1}`,
      channel: s.source.startsWith("phone") || s.source === "website_voice" ? "voice" : "chat",
      startedAt: started,
      lastSeenAt: started + turns * 45 * 1000,
      pageUrl: s.source.startsWith("phone")
        ? null
        : "https://onlinemarketinghelp.co.uk/services",
      retellCallId: s.source.startsWith("phone") ? `demo-call-ref-${i}` : null,
      /* A handful needed a person, and they are the same handful the queue
         screen shows, so the two agree. */
      handover: i % 37 === 0 ? "waiting" : i % 23 === 0 ? "closed" : null,
      messages: turns * 2,
      turns,
      name: s.name,
      email: theyLeft ? s.email : null,
      phone: theyLeft ? s.phone : null,
      opened: openerFor(s.source, s.service, i),
      lastRole: turns % 2 === 0 ? "assistant" : "user",
      lastText: turns % 2 === 0 ? REPLIES[i % REPLIES.length] : "Thanks, that is useful.",
    };
  });

  /* Conversations that left nothing behind.

     Without these, every session on the screen had a lead attached and the
     card read "left something behind: 100% of conversations", which is not a
     number any business has ever had. Most people who open a chat ask one
     thing and go, and the gap between how many talked and how many left a
     number is the figure that says whether the assistant is actually
     capturing anything. A screen that cannot show that gap is not showing the
     assistant working, it is showing it succeeding. */
  const BROWSING = [
    "Do you work with businesses outside the UK?",
    "What are your opening hours?",
    "Is there a case study for restaurants?",
    "Just looking, thanks.",
    "Do you do logo design as well?",
    "How long have you been going?",
    "Where are you based?",
    "Can I see your pricing page?",
  ];
  const anon = Math.round(SEEDS.length * 0.55);
  for (let k = 0; k < anon; k++) {
    const i = SEEDS.length + k;
    const started = t - (jitter(i + 61, 240) / 10) * HOUR - (jitter(i + 7, 90) / 10) * DAY;
    const turns = 2 + (jitter(i + 13, 5) % 4);
    sessions.push({
      sessionId: `demo-anon-${k + 1}`,
      channel: k % 11 === 0 ? "voice" : "chat",
      startedAt: started,
      lastSeenAt: started + turns * 40 * 1000,
      pageUrl: "https://onlinemarketinghelp.co.uk/",
      retellCallId: null,
      handover: null,
      messages: turns * 2,
      turns,
      /* No name, because they never gave one. This is the one place
         "Visitor" is the honest word rather than a missing join. */
      name: null,
      email: null,
      phone: null,
      opened: BROWSING[k % BROWSING.length],
      lastRole: "assistant",
      lastText: REPLIES[k % REPLIES.length],
    });
  }

  sessions.sort((a, b) => b.lastSeenAt - a.lastSeenAt);
  return { sessions, hidden: 0, available: true };
}

/* -------------------------------------------------------- needs a person

   The queue of conversations the assistant could not finish.

   This is the one screen with somebody on the other end still waiting, so a
   demonstration of it has to show the thing that makes it hard: the rows are
   not alike. One person is three minutes in and polite, one has asked twice,
   one wants a number the assistant will not invent. What a person needs from
   this screen is to tell those apart at a glance, and a queue of ten
   identical rows shows none of that.
   ------------------------------------------------------------------------ */

const HANDOVER_SEEDS: Array<{
  waitMin: number;
  state: "waiting" | "live" | "closed";
  reason: string;
  question: string;
  lastRole: string;
  lastText: string;
  turns: number;
  takenBy: string | null;
  channel: string;
  /** Which acquisition channel this person came from. */
  from: string;
}> = [
  {
    waitMin: 3, state: "waiting",
    reason: "asked for a price the assistant will not quote",
    question: "What would you charge to run Google Ads for a company our size?",
    lastRole: "user",
    lastText: "What would you charge to run Google Ads for a company our size? We are about 20 staff.",
    turns: 9, takenBy: null, channel: "chat", from: "google_ads",
  },
  {
    waitMin: 11, state: "waiting",
    reason: "asked the same thing twice",
    question: "Can someone actually call me today?",
    lastRole: "user",
    lastText: "Can someone actually call me today? I asked a minute ago and got the same answer.",
    turns: 14, takenBy: null, channel: "chat", from: "facebook_ads",
  },
  {
    waitMin: 26, state: "waiting",
    reason: "contract question",
    question: "Is there a minimum term on the monthly retainer?",
    lastRole: "user",
    lastText: "Is there a minimum term? We got burned on a twelve month contract last year.",
    turns: 7, takenBy: null, channel: "chat", from: "website_chat",
  },
  {
    waitMin: 48, state: "waiting",
    reason: "wants to speak to the person who did the audit",
    question: "Can I speak to whoever wrote our site audit in March?",
    lastRole: "user",
    lastText: "Can I speak to whoever wrote our site audit back in March? I have questions about it.",
    turns: 5, takenBy: null, channel: "voice", from: "phone_missed",
  },
  {
    waitMin: 6, state: "live",
    reason: "complaint about ad spend",
    question: "Why did last month's spend go up without anyone telling us?",
    lastRole: "agent",
    lastText: "I am looking at the account now. Give me two minutes and I will tell you exactly what changed.",
    turns: 18, takenBy: "owner", channel: "chat", from: "reactivation",
  },
  {
    waitMin: 19, state: "live",
    reason: "technical: wants the tracking checked",
    question: "Our form submissions are not showing in Analytics.",
    lastRole: "agent",
    lastText: "Can you send me the URL of the page with the form on it?",
    turns: 11, takenBy: "owner", channel: "chat", from: "website_form",
  },
  {
    waitMin: 95, state: "closed",
    reason: "asked for a call back",
    question: "Can someone ring me after five?",
    lastRole: "agent",
    lastText: "Booked for 5.30 this evening. You will get a text to confirm.",
    turns: 8, takenBy: "owner", channel: "chat", from: "instagram",
  },
  {
    waitMin: 180, state: "closed",
    reason: "wanted a case study for their trade",
    question: "Have you worked with any dental practices?",
    lastRole: "agent",
    lastText: "Sent the two dental case studies to the email you gave me. Shout if you want the figures behind them.",
    turns: 12, takenBy: "owner", channel: "chat", from: "whatsapp",
  },
  {
    waitMin: 320, state: "closed",
    reason: "out of area",
    question: "Do you cover Aberdeen?",
    lastRole: "agent",
    lastText: "We do, everything we run is remote. I have passed your details to the team.",
    turns: 4, takenBy: "owner", channel: "chat", from: "referral",
  },
];

export function demoInboxQueue() {
  const t = now();
  const rows = HANDOVER_SEEDS.map((h, i) => {
    /* Borrowed from the leads, so the person waiting on this screen is the
       same person the Leads table and the Channels report already know
       about. One business, one set of people, which is the whole point. */
    const idx = SEEDS.findIndex((x) => x.source === h.from);
    const s = SEEDS[idx >= 0 ? idx : i];
    const since = t - h.waitMin * MIN;
    return {
      sessionId: `demo-${(idx >= 0 ? idx : i) + 1}`,
      channel: h.channel,
      state: h.state,
      since,
      startedAt: since - h.turns * 40 * 1000,
      lastSeenAt: t - (h.state === "closed" ? h.waitMin * MIN : 20 * 1000),
      takenBy: h.takenBy,
      pageUrl:
        h.channel === "voice"
          ? null
          : "https://onlinemarketinghelp.co.uk/services/google-ads-management",
      name: s.name,
      sourceChannel: s.source,
      service: s.service,
      hot: s.hot,
      leadId: `demo-lead-${(idx >= 0 ? idx : i) + 1}`,
      email: s.email,
      phone: s.phone,
      company: s.company,
      reason: h.reason,
      question: h.question,
      openQuestions: h.state === "closed" ? 0 : 1,
      lastRole: h.lastRole,
      lastText: h.lastText,
      lastAt: h.state === "closed" ? t - h.waitMin * MIN : since,
      awaitingReply: h.lastRole === "user",
    };
  });

  return {
    rows,
    waiting: rows.filter((r) => r.state === "waiting").length,
    live: rows.filter((r) => r.state === "live").length,
    orphanQuestions: 0,
    hidden: 0,
    reachable: true,
  };
}

/* A queue row for any demo conversation, not only the nine that were handed
   over.

   The conversation page builds its whole right-hand column from a thread,
   and the outcome control lives there: the moment somebody has finished
   reading a conversation is the moment they know what came of it. Without
   this, opening any of the other three hundred example conversations showed
   the transcript and no way to record anything, which is the one thing that
   page is for. */
function fromLead(sessionId: string): ReturnType<typeof demoInboxQueue>["rows"][number] | null {
  const idx = SEEDS.findIndex((_, i) => `demo-${i + 1}` === sessionId);
  if (idx < 0) return null;
  const s = SEEDS[idx];
  const t = now();
  const since = t - s.agoMs;
  return {
    sessionId,
    channel: s.source.startsWith("phone") || s.source === "website_voice" ? "voice" : "chat",
    /* Not in the queue means the assistant finished it itself. */
    state: "closed",
    since,
    startedAt: since - 8 * MIN,
    lastSeenAt: since,
    takenBy: null,
    pageUrl: "https://onlinemarketinghelp.co.uk/",
    name: s.name,
    sourceChannel: s.source,
    service: s.service,
    hot: s.hot,
    leadId: `demo-lead-${idx + 1}`,
    email: s.email,
    phone: s.phone,
    company: s.company,
    /* Nothing was escalated, so there is no question and no reason. The
       queue rows infer these as strings, so they say so in words rather than
       carrying a null the caller has to guess at. */
    reason: "finished without a person",
    question: "",
    openQuestions: 0,
    lastRole: "assistant",
    lastText: "Thanks, that is all booked in.",
    lastAt: since,
    awaitingReply: false,
  };
}

/* One handed-over conversation, in full.

   The queue is only half of this screen. The other half is the thread beside
   it, and without it the demonstration stops at the moment the person would
   actually start working: they click a row, and nothing opens. The exchange
   below is written so the handover reads as inevitable rather than arbitrary.
   The assistant answers twice, properly, and then hits the one thing it is
   not allowed to invent, which is what a real escalation looks like. */
export function demoThread(sessionId: string): Thread | null {
  const q = demoInboxQueue();
  const row = q.rows.find((r) => r.sessionId === sessionId) ?? fromLead(sessionId);
  if (!row) return null;

  const t = now();
  const started = row.startedAt;
  const gap = Math.max((row.since - started) / 6, 25 * 1000);
  let k = 0;
  const at = () => started + ++k * gap;

  const messages: ThreadMsg[] = [
    { role: "assistant", text: "Hello, you are through to Online Marketing Help. What can I help you with?", at: at() },
    { role: "user", text: `Hi. ${row.question}`, at: at() },
    {
      role: "assistant",
      text: "Let me make sure I have that right before I answer. Which business is this for?",
      at: at(),
    },
    { role: "user", text: `${row.company}. We are in ${row.service?.toLowerCase() ?? "marketing"} at the moment.`, at: at() },
    {
      role: "assistant",
      /* The refusal is the point. This is why the conversation is on this
         screen rather than finished by itself. */
      text: "That one I will not guess at, because the answer depends on things I cannot see from here. I am bringing in someone who can give you a straight answer.",
      at: at(),
    },
    { role: "user", text: row.lastText ?? "Thanks.", at: row.lastAt ?? t },
  ];

  /* One photo and one voice note, so the example shows what a conversation
     looks like when somebody sends the thing they are asking about rather
     than describing it. Both point at files this site already serves: the
     example must never need the assistant's storage, or it stops working
     the moment that deployment is unreachable, which is one of the
     situations the example exists for.

     Only on the conversations that have run long enough to have got there.
     An attachment on every single example reads as a feature being
     demonstrated rather than as a conversation. */
  if (k > 4 && row.state !== "waiting") {
    messages.splice(4, 0, {
      role: "user",
      text: "This is the one I meant.",
      at: started + 4.5 * gap,
      attachment: {
        kind: "image",
        type: "image/webp",
        /* What a phone actually calls a photo. A descriptive name would be
           a claim about what is in the picture, and the example picture is
           the same one on every conversation. */
        name: "IMG_4821.webp",
        size: 148 * 1024,
        url: "/images/case-studies/bakery.webp",
      },
    });
    messages.push({
      role: "user",
      text: "",
      at: (row.lastAt ?? t) + 80 * 1000,
      attachment: {
        kind: "audio",
        type: "audio/mpeg",
        name: "voice-note.mp3",
        size: 310 * 1024,
        url: "/audio/AI Voice Agent for Contractors & Builders/2-Renovation & Home Improvement Enquiry.mp3",
      },
    });
  }

  if (row.state !== "waiting") {
    messages.push({
      role: "assistant",
      text:
        row.state === "live"
          ? "You are through to a person now. Give me a moment to read back through this."
          : "That is all sorted. Anything else, just say.",
      at: (row.lastAt ?? t) + 40 * 1000,
    });
  }

  return {
    sessionId,
    found: true,
    state: row.state,
    channel: row.channel,
    startedAt: started,
    lastSeenAt: row.lastSeenAt,
    since: row.since,
    takenBy: row.takenBy,
    pageUrl: row.pageUrl,
    retellCallId: row.channel === "voice" ? `demo-call-ref-${sessionId}` : null,
    visitorId: `demo-visitor-${sessionId}`,
    profile: {
      name: row.name,
      email: row.email,
      phone: row.phone,
      company: row.company,
      website: `https://${(row.company ?? "example").toLowerCase().replace(/\W+/g, "")}.example`,
      budget: null,
      interestedIn: row.service ? [row.service] : [],
      notes: null,
    },
    messages,
    questions: [
      {
        id: `demo-q-${sessionId}`,
        reason: row.reason ?? "needed a person",
        question: row.question ?? "",
        contact: row.phone,
        at: row.since,
        handled: row.state === "closed",
      },
    ],
    leads: row.leadId
      ? [
          {
            id: row.leadId,
            name: row.name ?? "",
            email: row.email,
            phone: row.phone,
            company: row.company,
            service: row.service ?? null,
            budget: null,
            message: row.question,
            hot: Boolean(row.hot),
            outcome: null,
            valueGbp: null,
            channel: row.channel,
            at: row.since,
          },
        ]
      : [],
    bookings: [],
  };
}

/* What each channel costs per month, for the allocation section.

   Not every channel has a figure, and that is the point rather than an
   oversight: a real client types in the ad platforms and leaves the organic
   ones blank. The section has to show "add spend" for those rather than a
   cost per booking of nothing, and it cannot show that unless the example
   data has some. */
export function demoSpend(): Record<string, number> {
  return {
    facebook_ads: 2400,
    google_ads: 3100,
    instagram_ads: 900,
    /* A click-to-WhatsApp budget, small. */
    whatsapp: 350,
  };
}

/* ------------------------------------------------------------- campaigns

   A reactivation run is the one capability where the interesting number is
   the bad one. A batch that books four appointments out of two hundred and
   costs you thirty permissions has lost you more than it made, and nothing
   on this dashboard would say so unless the opt-outs were given the same
   prominence as the bookings.

   So the three runs below are deliberately different from each other: one
   that worked, one that was stopped halfway because it was burning the list,
   and one still going out. A demonstration where every campaign succeeded
   would be useless, because the screen's whole job is to tell them apart.
   ------------------------------------------------------------------------ */

type CampaignSeed = {
  name: string;
  kind: string;
  audience: string;
  consentBasis: string;
  note: string | null;
  status: string;
  intended: number;
  /** How many of the intended list actually got through the consent gate. */
  enrolled: number;
  startedDaysAgo: number;
  finishedDaysAgo: number | null;
  /** Of those enrolled, the share that each thing happened to. */
  replyRate: number;
  bookRate: number;
  winRate: number;
  optOutRate: number;
  failRate: number;
  value: number;
};

const CAMPAIGN_SEEDS: CampaignSeed[] = [
  {
    name: "Dormant clients, 2025",
    kind: "reactivation",
    audience: "Clients who last bought between Jan and Dec 2025, no contact since",
    consentBasis: "soft_optin",
    note: null,
    status: "finished",
    intended: 212,
    /* Thirty-four of the two hundred and twelve never went out: some had
       texted STOP at some point, some had no consent on record at all. That
       gap is the most useful figure a campaign produces and it is why
       `intended` is stored separately from what was enrolled. */
    enrolled: 178,
    startedDaysAgo: 24,
    finishedDaysAgo: 17,
    replyRate: 0.19,
    bookRate: 0.08,
    winRate: 0.04,
    optOutRate: 0.034,
    failRate: 0.02,
    value: 1900,
  },
  {
    name: "Lapsed SEO retainers",
    kind: "reactivation",
    audience: "Monthly SEO clients who cancelled in the last 18 months",
    consentBasis: "soft_optin",
    /* The honest reading of a run like this, written down at the time rather
       than reconstructed later. */
    note: "Stopped on day two. One in nine was opting out, which costs more than the two bookings were worth.",
    status: "stopped",
    intended: 140,
    enrolled: 131,
    startedDaysAgo: 9,
    finishedDaysAgo: 7,
    replyRate: 0.12,
    bookRate: 0.015,
    winRate: 0.008,
    optOutRate: 0.107,
    failRate: 0.03,
    value: 1400,
  },
  {
    name: "Quoted, never signed",
    kind: "reactivation",
    audience: "Quoted in the last 6 months, no decision either way",
    consentBasis: "explicit",
    note: null,
    status: "running",
    intended: 86,
    enrolled: 84,
    startedDaysAgo: 2,
    finishedDaysAgo: null,
    replyRate: 0.27,
    bookRate: 0.13,
    winRate: 0.06,
    optOutRate: 0.012,
    failRate: 0.012,
    value: 2400,
  },
];

function campaignPeople(c: CampaignSeed, offset: number): CampaignPerson[] {
  const t = now();
  const started = t - c.startedDaysAgo * DAY;
  const replies = Math.round(c.enrolled * c.replyRate);
  const books = Math.round(c.enrolled * c.bookRate);
  const wins = Math.round(c.enrolled * c.winRate);
  const optOuts = Math.round(c.enrolled * c.optOutRate);
  const failed = Math.round(c.enrolled * c.failRate);

  const out: CampaignPerson[] = [];
  for (let k = 0; k < c.enrolled; k++) {
    const n = offset + k;
    const replied = k < replies;
    const booked = k < books;
    const won = k < wins;
    const optedOut = k >= c.enrolled - optOuts;
    /* Failures are taken from the middle of the list rather than either end,
       so a send that never arrived is not also the one that replied. */
    const didFail = !replied && !optedOut && k >= replies && k < replies + failed;
    const live = c.status === "running" && !replied && !optedOut && !didFail;

    /* Spread across the hours after the batch started, not in step with k:
       tying the time to the index ties it to the outcome, and then every
       reply looks like it came from the first ten people texted. */
    const enrolledAt = started + (jitter(n + 11, 90) * MIN) / 2;
    const sent = didFail ? 0 : live ? 1 : replied || optedOut ? 1 : 2;

    out.push({
      leadId: `demo-camp-${n}`,
      sequenceId: `demo-seq-${n}`,
      name: `${personName(n).first} ${personName(n).last}`,
      phone: `+4477008${String(10000 + n).slice(-5)}`,
      email: `${personName(n).first.toLowerCase()}.${personName(n).last.toLowerCase()}@${TRADES[(n * 7 + 3) % TRADES.length].toLowerCase()}.example`,
      sourceChannel: "reactivation",
      status: live ? "active" : "stopped",
      stopReason: optedOut
        ? "opted_out"
        : booked
          ? "booked"
          : replied
            ? "replied"
            : didFail
              ? "failed"
              : live
                ? null
                : "exhausted",
      step: live ? 1 : 2,
      enrolledAt,
      sent,
      delivered: didFail ? 0 : sent,
      failed: didFail ? 1 : 0,
      firstSentAt: didFail ? null : enrolledAt + 3 * MIN,
      replied,
      firstReplyAt: replied ? enrolledAt + (20 + jitter(n, 600)) * MIN : null,
      optedOut,
      hot: replied || booked,
      outcome: won ? "won" : booked ? "quoted" : optedOut ? "unqualified" : null,
      /* Deliberately varied. Every win at the same figure reads as a
         placeholder, which is what a figure in a meeting must never do. */
      valueGbp: won ? c.value + jitter(n, 900) : null,
      bookings: booked ? 1 : 0,
    });
  }
  return out;
}

export function demoCampaigns(): { rows: CampaignRow[]; now: number } {
  const t = now();
  let offset = 0;
  const rows = CAMPAIGN_SEEDS.map((c, i) => {
    const people = campaignPeople(c, offset);
    offset += c.enrolled;
    return {
      id: `demo-campaign-${i + 1}`,
      name: c.name,
      kind: c.kind,
      route: "F",
      audience: c.audience,
      consentBasis: c.consentBasis,
      note: c.note,
      status: c.status,
      intended: c.intended,
      startedAt: t - c.startedDaysAgo * DAY,
      finishedAt: c.finishedDaysAgo === null ? null : t - c.finishedDaysAgo * DAY,
      at: t - (c.startedDaysAgo + 1) * DAY,
      by: "owner",
      people,
    };
  });
  return { rows, now: t };
}

/* --------------------------------------------------------------- summary */

/** The two or three facts worth saying out loud in a meeting. */
export function demoHeadline() {
  const { rows } = demoChannelFacts();
  const google = rows.filter((r) => r.sourceChannel === "google_ads");
  const meta = rows.filter((r) => r.sourceChannel.startsWith("facebook"));
  return {
    leads: rows.length,
    booked: rows.filter((r) => r.bookings > 0).length,
    replied: rows.filter((r) => r.msToFirstReply !== null).length,
    googleBooked: google.filter((r) => r.bookings > 0).length,
    googleLeads: google.length,
    metaBooked: meta.filter((r) => r.bookings > 0).length,
    metaLeads: meta.length,
  };
}
