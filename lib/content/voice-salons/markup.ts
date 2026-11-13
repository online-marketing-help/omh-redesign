// Body of /ai-voice-agents/salons: the rebuilt sections of /ai-voice-agents (what-is with the call player,
// capabilities, the salons we cover, pricing), written for hair, nail and beauty salons and medspas. Same
// structure, classes and data-* hooks as lib/content/ai-voice-agents-markup.ts, as on the other industry
// pages. Composed by components/voice-agents/SalonsPage.tsx. Copy: the OMH AI Voice Agent for Salons &
// Beauty brief (October 2026), used word for word.
import { mainPagePricing } from "@/lib/content/voice-pricing";

export const salonsFaqTopics = { callers: "Callers and AI", bookings: "Bookings", systems: "Systems and data", working: "Working with us" };

/** The FAQ section. SalonsPage.tsx builds the FAQPage JSON-LD from this list. */
export const salonsFaqs: { q: string; a: string; cat: keyof typeof salonsFaqTopics }[] = [
  { cat: "callers", q: "Will clients know they are talking to an AI?",
    a: "Yes. Every agent says it is an AI assistant at the start of the call. Anyone who would rather speak to a person can ask, and the agent takes a message or puts them through, depending on your plan." },
  { cat: "bookings", q: "Which salons do you set it up for?",
    a: "Hair salons, nail salons, beauty salons and medspas, plus barbers, lash and brow bars, spas and tanning salons. If you run a hair salon, an AI receptionist books by stylist and service length, so it fits the way your diary already works." },
  { cat: "bookings", q: "Can it book the right stylist and the right length of appointment?",
    a: "Yes. We load which stylist or therapist does each service and how long each one takes, so it only offers slots that really fit." },
  { cat: "bookings", q: "Can it book patch tests?",
    a: "Yes, if your rules ask for one. It checks whether the client needs a patch test before a colour or lash appointment and books it first." },
  { cat: "bookings", q: "What happens when a client cancels?",
    a: "It cancels or moves the appointment by your rules and explains your cancellation policy as you word it. On Growth and Scale it can offer the freed-up slot to clients on your waitlist." },
  { cat: "bookings", q: "Does it take deposits or card payments?",
    a: "No. It explains your deposit and cancellation policy. Payments stay with your booking system or your team, and the agent never asks for card details." },
  { cat: "bookings", q: "Will it tell clients our prices?",
    a: "Only the prices you give us, worded the way you want. If a price depends on a consultation, it says so and books one." },
  { cat: "callers", q: "Does it give skin or medical advice?",
    a: "No. Anything about a reaction, a skin condition or aftercare goes to your team. It only reads out information you have approved." },
  { cat: "systems", q: "Does it work with our salon booking software?",
    a: "On Growth and Scale the agent writes each booking into your software, where it connects. What connects depends on the software you use, and we confirm it on the discovery call." },
  { cat: "systems", q: "Can we keep our phone number, or get a local one?",
    a: "Both. You can divert your existing salon line to the agent, or we can set up a new number with your local area code." },
  { cat: "working", q: "How long does setup take?",
    a: "Starter goes live in 3 working days, Growth in 5 to 7 and Scale in 12 to 15. The clock starts once we have your service menu, prices, booking rules and diary access." },
  { cat: "working", q: "Will it replace our front desk?",
    a: "No. Most salons use it to catch the calls nobody can answer: when every chair is full, at lunchtime and after closing. If you have a front desk, it takes the overflow and passes calls on with the details already written down." },
  { cat: "systems", q: "Is client data kept safe?",
    a: "We agree what is stored, where and for how long before go-live, and handle client data in line with UK GDPR." },
  { cat: "working", q: "How much does an AI receptionist for salons cost?",
    a: "Our AI receptionist for salons (the Starter plan) is £249 a month plus VAT with 300 minutes included, and a one-off setup fee from £795. Growth is £449 a month and Scale, for salon groups, is £849 a month. Extra minutes cost 60p each on every plan." },
  { cat: "working", q: "Is there a minimum contract?",
    a: "No. Every plan is billed monthly with 30 days' notice." },
];

const icon = (name: string, cls = "") => `<svg class="icon${cls && " " + cls}" aria-hidden="true" focusable="false"><use href="#i-${name}"/></svg>`;
const tick = (text: string) => `<li class="flex gap-2.5">${icon("check", "mt-[3px] text-hl")}<span>${text}</span></li>`;
const cross = (text: string) => `<li class="flex gap-2.5">${icon("x", "mt-[3px]")}<span>${text}</span></li>`;
const tag = (text: string) => `<span class="tag">${text}</span>`;
const primaryCta = (track: string, cls = "") =>
  `<a href="#book-demo-form" class="btn btn-primary${cls && " " + cls}" data-track="${track}">Book a 30-Minute Demo</a>`;

/* --------------------------------------------------------------- Pricing */
// The main page's plans, word for word except where a phrase names a business type: salons, clients, salon
// software. The brief's Growth and Scale lists (fills cancellations, writes bookings into salon software, routing
// across salons) take the place of the main page's CRM and web-lead lines. Prices, minutes, setup fees and
// delivery times are the shared ones.
const swap: Record<string, string> = {
  "Books appointments into one calendar": "Books appointments into one diary",
  "Writing into a CRM": "Writing into your salon software",
  "More than one location": "More than one salon",
  "Live transfer to a person, with everything the caller already said passed across": "Live transfer to a team member, with everything the caller already said passed across",
  "Writes each enquiry into your CRM or practice system": "Fills cancellations and calls back missed callers",
  "Calls new web leads within 60 seconds": "Writes each booking into your salon software, where it connects",
  "Routes enquiries at the first question, for example sales, service or accounts": "Routes calls at the first question, for example bookings, prices or cancellations",
  "Outbound follow-up to contacts who have consented, for quotes, reminders and no-shows": "Outbound calls to clients who have consented, for reminders and no-shows",
  "A second location, department or agent": "A second salon or agent",
  "Up to three locations or departments, each with its own script, voice and diary": "Up to three salons, each with its own script, voice and diary",
  "Routing across branches by where the caller is or what they ask for": "Routing across salons by location or service",
  "Per-site reporting, so you can see which branch converts its calls": "Per-salon reporting, so you can see which salon converts its calls",
  "A fourth location or department (a priced add-on)": "A fourth salon (a priced add-on)",
};
const straps: Record<string, string> = {
  starter: "One salon, one agent answering and booking. Best for a small salon with straightforward phones.",
  growth: "For a busy salon where the phone fills the diary. Where most salons should start.",
  scale: "For salon groups with several sites, each with its own diary, on one managed service.",
};
const salonsPricing = {
  plans: mainPagePricing.plans.map((p) => ({ ...p, strap: straps[p.id], features: p.features.map((f) => swap[f] ?? f), excluded: p.excluded.map((f) => swap[f] ?? f) })),
  // The brief's "Everything included and what isn't" list: VAT, minutes, setup, extra salons, contract, integrations.
  notes: mainPagePricing.notes.filter(([k]) => k !== "Delivery").map(([k, v]) => (k === "Extra locations" ? ["Extra salons", v] : [k, v])),
};
const plan = (p: (typeof salonsPricing.plans)[number]) => {
  const shown = p.features.slice(0, 4);
  const rest = p.features.slice(4);
  return `      <article id="plan-${p.id}" class="relative flex flex-col rounded-[16px] border bg-surface p-6 sm:p-7 ${p.popular ? "border-gold shadow-[0_0_0_1px_var(--color-teal),0_28px_60px_-32px_rgb(var(--accent-rgb)/0.6)] lg:-mt-3 lg:mb-3" : "border-line"}" data-tier="${p.id}">
        ${p.popular ? '<span class="absolute -top-4 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-gold px-4 py-1.5 font-display text-[15px] font-semibold text-navy shadow-[0_10px_24px_-10px_rgb(var(--accent-rgb)/0.9)]">' + icon("plus-star", "!h-3.5 !w-3.5") + 'Where most salons start</span>' : ""}
        <h3 class="!text-[26px]">${p.name}</h3>
        <p class="mt-2 min-h-[3.2em] text-[16px] leading-snug text-muted">${p.strap}</p>
        <p class="mt-5 flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span class="font-display text-[clamp(2.5rem,2.1rem+1.4vw,3.25rem)] font-semibold leading-none tnum">£${p.price}</span>
          <span class="text-[16px] text-muted">a month + VAT, billed monthly</span>
        </p>
        <dl class="plan-facts mt-5 grid grid-cols-3 gap-2 tnum">
          <div><dt>${icon("clock")}Included</dt><dd>${p.minutes.replace(" minutes", "")}<span>minutes a month</span></dd></div>
          <div><dt>${icon("calendar")}Setup</dt><dd>${p.setup}<span>one-off fee</span></dd></div>
          <div><dt>${icon("timer")}Live in</dt><dd>${p.delivery.replace("Live in ", "").replace(" working days", "")}<span>working days</span></dd></div>
        </dl>
        <p class="mt-2 text-[14px] text-muted">Then 60p a minute past your allowance.</p>
        <ul class="mt-5 space-y-2 text-[16px] leading-snug">
${shown.map(tick).join("\n")}
        </ul>
${p.id === "starter" ? `        <p class="mt-3 text-[16px] text-muted">This is our <a href="/ai-voice-agents/receptionist" class="font-semibold text-ink underline decoration-gold decoration-2 underline-offset-4 hover:text-hl">AI receptionist plan</a>.</p>\n` : ""}        <details class="group mt-3 text-[16px]" data-track="pricing_details" data-track-name="${p.name}">
          <summary class="inline-flex min-h-[44px] items-center gap-1.5 font-semibold text-ink hover:text-hl">${icon("plus-star", "!h-3 !w-3 text-hl")}Everything included and what isn't<svg class="icon faq-chevron" aria-hidden="true" focusable="false"><use href="#i-chevron-down"/></svg></summary>
          <ul class="mt-2 space-y-2 leading-snug">
${rest.map(tick).join("\n")}
          </ul>
          <p class="mt-4 font-semibold">Not included</p>
          <ul class="mt-2 space-y-2 leading-snug text-muted">
${p.excluded.map(cross).join("\n")}
          </ul>
        </details>
        <div class="mt-auto"></div>
        <a href="#book-demo-form" class="btn ${p.popular ? "btn-primary" : "btn-secondary"} mt-6 w-full" data-plan="${p.name}" data-track="pricing_book_demo" data-track-name="${p.name}" aria-label="Book a 30-minute demo for the ${p.name} plan">Book a 30-Minute Demo</a>
      </article>`;
};

/* ------------------------------------------------------ Capabilities */
// Six capabilities from the brief, each with a mock-up, what the agent does and what OMH does, for a salon.
const capabilities = [
  { id: "answer", icon: "phone", title: "First-ring answering, 24/7",
    vis: `<div class="mini"><span class="icon-tile">${icon("phone")}</span><span class="min-w-0"><b class="block">Call · Sat 13:00</b><span class="text-[14px] font-semibold text-ok">Answered on the first ring</span></span></div>
          <div class="mini">${icon("users", "text-ok")}<span>Every chair full, every caller answered</span></div>`,
    agent: "Every call answered straight away, while your team is with clients or after the salon has closed. Evenings, Sundays and bank holidays too. No voicemail and no engaged tone.",
    omh: "We divert your salon line, set your hours and agree what it picks up and when: missed calls, out of hours or every call. Nothing goes live without your sign-off." },
  { id: "voice", icon: "mic", title: "Sounds like your salon",
    vis: `<div class="mini"><span class="icon-tile">${icon("mic")}</span><span class="min-w-0"><b class="block">Amy · Your assistant</b><span class="text-[14px] text-muted">Your salon name, greeting and voice</span></span></div>
          <div class="mini justify-center py-3"><span class="mini-wave"><i></i><i></i><i></i><i></i><i></i></span><span class="ml-2 text-[14px] font-semibold">"Good morning, Ivy &amp; Ash Hair, how can I help?"</span></div>`,
    agent: "A natural British voice that greets callers with your salon name and talks the way your team does: warm, friendly and quick.",
    omh: "We pick the voice and tone with you, write the greeting and test it until it sounds right for your clients." },
  { id: "knows", icon: "book", title: "Knows your services, prices and stylists",
    vis: `<div class="flex flex-wrap justify-center gap-2"><span class="mini-chip">${icon("check", "text-ok")}Services</span><span class="mini-chip">${icon("check", "text-ok")}Prices</span><span class="mini-chip">${icon("check", "text-ok")}Appointment lengths</span><span class="mini-chip">${icon("check", "text-ok")}Stylists</span><span class="mini-chip">${icon("check", "text-ok")}Opening hours</span></div>
          <div class="mini">${icon("book", "text-hl")}<span>Trained on <b>your</b> salon, not the internet</span></div>`,
    agent: "Gives prices exactly as you word them, knows how long each service takes and which stylist or therapist does what.",
    omh: "We load your service menu, prices, appointment lengths and team, and update them whenever you send us changes." },
  { id: "books", icon: "calendar", title: "Books into your diary without double-booking",
    vis: `<div class="vcal-head"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span></div>
          <div class="vcal"><span class="busy"></span><span></span><span class="busy"></span><span></span><span class="busy"></span><span></span><span class="busy"></span><span class="new"></span><span class="busy"></span><span></span><span class="busy"></span><span></span><span></span><span class="busy"></span><span></span></div>
          <div class="mini">${icon("calendar", "text-ok")}<span><b>Highlights booked:</b> Thu 10:00, no clash</span></div>`,
    agent: "Offers real slots, books the right service with the right person and sends a confirmation text.",
    omh: "We connect your diary. If you use salon booking software, such as Fresha, Phorest or Timely, we check on the discovery call what connects directly and what needs a workaround." },
  { id: "waitlist", icon: "refresh", title: "Fills cancellations and calls back missed callers", plan: "Growth and Scale",
    vis: `<div class="mini"><span class="icon-tile">${icon("refresh")}</span><span class="min-w-0"><b class="block">Cancellation · 12:40</b><span class="text-[14px] text-muted">Thursday 2pm freed up</span></span></div>
          <div class="mini">${icon("calendar", "text-ok")}<span><b>Offered to the waitlist</b> and rebooked</span></div>
          <div class="mini justify-between"><span><b>Missed call · 13:05</b></span><span class="text-[14px] font-semibold text-ok">Called back</span></div>`,
    agent: "Offers freed-up slots to clients on your waitlist and rings back callers who hung up before the agent could help.",
    omh: "We agree the call-back timings and wording with you, and only call people who have asked to hear from you." },
  { id: "transfer", icon: "transfer", title: "Puts callers through to the salon", plan: "Growth and Scale",
    vis: `<div class="mini"><span class="icon-tile">${icon("user")}</span><span class="min-w-0"><b class="block">Client asks for a person</b><span class="text-[14px] text-muted">"Can I speak to someone about my colour?"</span></span></div>
          <div class="mini">${icon("transfer", "text-hl")}<span><b>Transferring to the salon</b> with a quick briefing</span></div>`,
    agent: "Passes a caller to a free team member when they ask for a person or the call needs one, with everything they said passed across.",
    omh: "We set the rules with you: who takes which calls, and what happens when everyone is busy." },
];

const capTab = (c: (typeof capabilities)[number], i: number) =>
  `        <button type="button" role="tab" id="cap-tab-${c.id}" aria-controls="cap-${c.id}" aria-selected="${i === 0}" tabindex="${i ? -1 : 0}" class="cap-tab" data-tab data-track="capability_select" data-track-name="${c.title}"><span class="icon-tile">${icon(c.icon)}</span><span class="min-w-0"><span class="block font-display text-[17px] font-semibold leading-tight">${c.title}</span>${c.plan ? `<span class="mt-1 block">${tag(c.plan)}</span>` : ""}</span>${icon("arrow-right", "ml-auto hidden shrink-0 text-hl lg:block")}</button>`;

const capPanel = (c: (typeof capabilities)[number], i: number) => `
      <div role="tabpanel" id="cap-${c.id}" aria-labelledby="cap-tab-${c.id}"${i ? " hidden" : ""} class="rounded-[22px] border border-line bg-surface p-5 sm:p-7" data-tab-panel>
        <div class="fcard-vis" aria-hidden="true">
          ${c.vis}
        </div>
        <h3 class="mt-5 !text-[clamp(22px,20px+.5vw,26px)]">${c.title}${c.plan ? ` ${tag(c.plan)}` : ""}</h3>
        <div class="mt-4 grid gap-3 sm:grid-cols-2">
          <div class="rounded-[14px] bg-paper p-4"><p class="flex items-center gap-2 text-[14px] font-semibold uppercase tracking-[0.12em] text-muted">${icon("phone", "text-hl")}The agent</p><p class="mt-2 text-[16px]">${c.agent}</p></div>
          <div class="rounded-[14px] bg-paper p-4"><p class="flex items-center gap-2 text-[14px] font-semibold uppercase tracking-[0.12em] text-muted">${icon("users", "text-hl")}OMH, for you</p><p class="mt-2 text-[16px]">${c.omh}</p></div>
        </div>
      </div>`;

/* ------------------------------------------------------ Salons we cover */
// One card per salon type the SEO plan names. The H3s carry the secondary keywords, so keep them as written.
// Built from the page's card pattern (the `#day` moments cards) with the use-case note pill; no new JS.
const salonTypes: { icon: string; h3: string; strap: string; p: string; bullets: string[]; note: string; after?: string }[] = [
  { icon: "scissors", h3: "AI Receptionist for Hair Salons", strap: "Your stylists have wet hands and a full column.",
    p: "An AI receptionist for a hair salon books cuts, colours and blow-dries with the right stylist and for the right length of time, so a full head of colour never lands in a 30-minute gap.",
    bullets: ["Books by stylist, service and appointment length", "Books patch tests before colour appointments, if your rules ask for one", "Rebooks regulars and fills cancellations from your waitlist"],
    note: "Never promises a colour result" },
  { icon: "sparkle", h3: "AI Receptionist for Nail Salons", strap: "Calls come in while every technician is mid-set.",
    p: "Our AI receptionist for nail salons books gels, acrylics, infills and removals, tells callers how long each one takes and quotes prices from your list.",
    bullets: ["Books and moves infill appointments", "Answers questions about prices, colours and removal", "Passes group bookings, such as hen parties, to you"],
    note: "Group bookings passed to you" },
  { icon: "drop", h3: "AI Receptionist for Medspas &amp; Beauty Salons", strap: "Treatments need the right room, therapist and time.",
    p: "Our AI receptionist for medspas and beauty salons books facials, waxing, lashes and brows, massages and skin consultations, and explains course and package prices as you word them.",
    bullets: ["Books a consultation first for treatments that need one", "Explains packages and courses from your price list", "Sends anything about a reaction or aftercare to your team"],
    note: "Never gives skin or medical advice",
    after: `Offer injectables or laser treatments? See our <a href="/ai-voice-agents/healthcare" class="font-semibold text-ink underline decoration-gold decoration-2 underline-offset-4 hover:text-hl">clinics page</a>.` },
];
const salonCard = (s: (typeof salonTypes)[number]) => `      <li class="hover-card flex flex-col rounded-[16px] border border-line bg-paper p-5 sm:p-6">
        <span class="icon-tile">${icon(s.icon)}</span>
        <h3 class="mt-4 !text-[22px]">${s.h3}</h3>
        <p class="mt-2 font-display text-[17px] font-semibold">${s.strap}</p>
        <p class="mt-2 text-[16px] text-muted">${s.p}</p>
        <ul class="mt-4 space-y-2 text-[16px] leading-snug">
${s.bullets.map(tick).join("\n")}
        </ul>
        <p class="mt-4 inline-flex items-center gap-2 self-start rounded-[10px] border border-line bg-surface px-3 py-2 text-[15px] font-semibold">${icon("shield", "text-hl")}${s.note}</p>
${s.after ? `        <p class="mt-4 text-[15px] text-muted">${s.after}</p>\n` : ""}      </li>`;

/* ------------------------------------------------------------------ Page */
export const salonsMarkup = String.raw`
<svg xmlns="http://www.w3.org/2000/svg" class="hidden" aria-hidden="true">
  <symbol id="i-phone" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></symbol>
  <symbol id="i-phone-missed" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/><path d="m16 2 6 6M22 2l-6 6"/></symbol>
  <symbol id="i-play" viewBox="0 0 24 24"><polygon points="6 3 20 12 6 21 6 3"/></symbol>
  <symbol id="i-pause" viewBox="0 0 24 24"><rect x="14" y="4" width="4" height="16" rx="1"/><rect x="6" y="4" width="4" height="16" rx="1"/></symbol>
  <symbol id="i-replay" viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></symbol>
  <symbol id="i-x" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></symbol>
  <symbol id="i-check" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></symbol>
  <symbol id="i-arrow-right" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></symbol>
  <symbol id="i-arrow-left" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></symbol>
  <symbol id="i-arrow-down" viewBox="0 0 24 24"><path d="M12 5v14M5 12l7 7 7-7"/></symbol>
  <symbol id="i-chevron-down" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></symbol>
  <symbol id="i-calendar" viewBox="0 0 24 24"><path d="M8 2v4M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></symbol>
  <symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></symbol>
  <symbol id="i-shield" viewBox="0 0 24 24"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></symbol>
  <symbol id="i-map-pin" viewBox="0 0 24 24"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></symbol>
  <symbol id="i-message" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></symbol>
  <symbol id="i-home" viewBox="0 0 24 24"><path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/></symbol>
  <symbol id="i-wrench" viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></symbol>
  <symbol id="i-drop" viewBox="0 0 24 24"><path d="M12 2.7S5 10.2 5 14.6A7 7 0 0 0 19 14.6C19 10.2 12 2.7 12 2.7z"/></symbol>
  <symbol id="i-flame" viewBox="0 0 24 24"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></symbol>
  <symbol id="i-hard-hat" viewBox="0 0 24 24"><path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z"/><path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5"/><path d="M4 15v-3a6 6 0 0 1 6-6"/><path d="M14 6a6 6 0 0 1 6 6v3"/></symbol>
  <symbol id="i-scale" viewBox="0 0 24 24"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></symbol>
  <symbol id="i-car" viewBox="0 0 24 24"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></symbol>
  <symbol id="i-plus-star" viewBox="0 0 24 24"><path d="M12 2 C12.6 8 16 11.4 22 12 C16 12.6 12.6 16 12 22 C11.4 16 8 12.6 2 12 C8 11.4 11.4 8 12 2 Z" fill="currentColor" stroke="none"/></symbol>
  <symbol id="i-mail" viewBox="0 0 24 24"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></symbol>
  <symbol id="i-users" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></symbol>
  <symbol id="i-user" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1"/></symbol>
  <symbol id="i-mic" viewBox="0 0 24 24"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3"/></symbol>
  <symbol id="i-book" viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/></symbol>
  <symbol id="i-transfer" viewBox="0 0 24 24"><path d="m16 3 4 4-4 4M20 7H4M8 21l-4-4 4-4M4 17h16"/></symbol>
  <symbol id="i-globe" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></symbol>
  <symbol id="i-key" viewBox="0 0 24 24"><path d="M2.6 17.4A2 2 0 0 0 2 18.8V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.2a2 2 0 0 0 1.4-.6l.8-.8a6.5 6.5 0 1 0-4-4z"/><circle cx="16.5" cy="7.5" r="1"/></symbol>
  <symbol id="i-tag" viewBox="0 0 24 24"><path d="M12.6 2.6A2 2 0 0 0 11.2 2H4a2 2 0 0 0-2 2v7.2a2 2 0 0 0 .6 1.4l8.7 8.7a2.4 2.4 0 0 0 3.4 0l6.6-6.6a2.4 2.4 0 0 0 0-3.4z"/><circle cx="7.5" cy="7.5" r="1"/></symbol>
  <symbol id="i-moon" viewBox="0 0 24 24"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z"/></symbol>
  <symbol id="i-clipboard" viewBox="0 0 24 24"><rect width="8" height="4" x="8" y="2" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2M9 12h6M9 16h4"/></symbol>
  <symbol id="i-timer" viewBox="0 0 24 24"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2M10 2h4"/></symbol>
  <symbol id="i-scissors" viewBox="0 0 24 24"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4 8.1 15.9M14.5 14.5 20 20M8.1 8.1 12 12"/></symbol>
  <symbol id="i-sparkle" viewBox="0 0 24 24"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"/></symbol>
  <symbol id="i-refresh" viewBox="0 0 24 24"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8M21 3v5h-5M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16M8 16H3v5"/></symbol>
</svg>

<section id="what-is" data-component="WhatIs" class="on-band relative overflow-hidden bg-band text-band-ink">
  <div class="pointer-events-none absolute right-[-10%] top-1/2 h-[620px] w-[620px] -translate-y-1/2 rounded-full bg-gold/15 blur-3xl" aria-hidden="true"></div>
  <div class="container-omh relative grid grid-cols-[minmax(0,1fr)] items-start gap-10 py-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,.95fr)] lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-10 lg:py-24" data-brand
    data-brand-biz='[{"id":"hair","label":"Hair salon","name":"Ivy &amp; Ash Hair","city":"Manchester","num":"0161 496 0218","agent":"Amy","kind":"salon&#39;s","initials":"IA","voice":"British English, warm and friendly","never":"Promises a colour result","transfer":"Group bookings go to the salon","caller":"Hi, can I book a full head of highlights with Sophie?","reply":"Of course. Sophie has Thursday at 10am, and it&#39;s about two and a half hours. Have you had colour with us in the last six months?","booked":"No, it&#39;s my first time.","summary":"Then we need a quick patch test first. I can do that tomorrow at 4pm, then book Thursday for you. Shall I?"},{"id":"nails","label":"Nail salon","name":"Polished Nail Studio","city":"London","num":"020 7946 0583","agent":"Leah","kind":"salon&#39;s","initials":"PN","voice":"British English, clear and upbeat","never":"Quotes a price it has not been given","transfer":"Group bookings go to the salon","caller":"Have you got anything for a gel infill on Saturday?","reply":"Yes, Saturday at 11:15 or 2:30. An infill takes about an hour. Which would you like?","booked":"11:15 please.","summary":"Booked. I&#39;ll text you a confirmation now."},{"id":"beauty","label":"Beauty salon","name":"Clover Skin &amp; Beauty","city":"Bristol","num":"0117 496 0644","agent":"Ruth","kind":"salon&#39;s","initials":"CS","voice":"British English, calm and measured","never":"Gives skin or medical advice","transfer":"Reactions and aftercare go to the team","caller":"I&#39;d like to book a lash lift, and how much is it?","reply":"A lash lift is £45 and takes 45 minutes. We have Wednesday at 6pm or Friday at 12:30.","booked":"Friday, please.","summary":"Lovely. You&#39;re booked for Friday at 12:30, and I&#39;ll text you our aftercare tips the day before."}]'>
    <div class="lg:col-start-1 lg:row-start-1">
      <h2>What is an AI receptionist <span class="hl">for salons?</span></h2>
      <p class="mt-5 text-band-muted">An AI receptionist for salons is software that answers your salon phone in natural, spoken conversation when your team is busy with clients. Some owners call it an AI salon receptionist. It finds out what the caller wants, checks your booking diary, books the right service with the right stylist or therapist and sends a confirmation text. Anything it can't answer, it takes a proper message for the team.</p>
      <p class="mt-4 text-band-muted">On Starter it does exactly that job. On Growth and Scale it works as a full AI voice agent: it puts callers through to the salon when someone is free, calls back missed callers and runs several salons on one service. Either way, OMH writes the script, connects your booking software and runs it for you. See our <a href="/ai-voice-agents/receptionist">AI receptionist plan</a>, or how our <a href="/ai-voice-agents">AI voice agent</a> works across UK businesses.</p>
    </div>

    <div class="order-last lg:order-none lg:col-start-1 lg:row-start-2">
      <h3 class="!text-[22px]">How a call goes</h3>
      <p class="mt-1 text-[16px] text-band-muted">Watch the phone. Each step lights up as the call reaches it.</p>
      <ol class="mt-5 space-y-2.5" aria-live="off">
        <li class="flex gap-4 rounded-[14px] border border-band-line p-4" data-brand-step="1"><span class="step-num" aria-hidden="true">1</span><span class="text-[16px] leading-snug"><strong class="block font-display text-[17.5px] font-semibold">It listens.</strong><span class="text-band-muted">It hears whether it's a new booking, a change, a price question or a cancellation as the client speaks.</span></span></li>
        <li class="flex gap-4 rounded-[14px] border border-band-line p-4" data-brand-step="2"><span class="step-num" aria-hidden="true">2</span><span class="text-[16px] leading-snug"><strong class="block font-display text-[17.5px] font-semibold">It works out the answer.</strong><span class="text-band-muted">It checks the request against your services, prices, stylists and booking rules.</span></span></li>
        <li class="flex gap-4 rounded-[14px] border border-band-line p-4" data-brand-step="3"><span class="step-num" aria-hidden="true">3</span><span class="text-[16px] leading-snug"><strong class="block font-display text-[17.5px] font-semibold">It replies and acts.</strong><span class="text-band-muted">It answers in a natural voice, books the appointment or takes a message.</span></span></li>
        <li class="flex gap-4 rounded-[14px] border border-band-line p-4" data-brand-step="4"><span class="step-num" aria-hidden="true">4</span><span class="text-[16px] leading-snug"><strong class="block font-display text-[17.5px] font-semibold">It reports back.</strong><span class="text-band-muted">The client gets a confirmation text, and you get a summary of every call.</span></span></li>
      </ol>
    </div>

    <div class="mx-auto w-full max-w-[420px] lg:col-start-2 lg:row-span-2 lg:row-start-1">
      <div class="rounded-[14px] border border-band-line bg-band-surface p-4 sm:p-5">
        <p class="font-display text-[18px] font-semibold">Try it: pick a salon, then listen in</p>
        <div class="mt-3 flex flex-wrap items-center gap-2">
          <div role="radiogroup" aria-label="Salon" class="flex flex-wrap gap-2" data-brand-group="biz">
            <button type="button" role="radio" aria-checked="true" tabindex="0" class="min-h-[44px] rounded-full border border-[rgb(247_246_242/.35)] px-4 text-[15.5px] font-semibold text-band-ink aria-checked:border-gold aria-checked:bg-gold aria-checked:text-navy" data-brand-opt="hair" data-track="branding_biz" data-track-name="Hair salon">Hair salon</button>
            <button type="button" role="radio" aria-checked="false" tabindex="-1" class="min-h-[44px] rounded-full border border-[rgb(247_246_242/.35)] px-4 text-[15.5px] font-semibold text-band-ink aria-checked:border-gold aria-checked:bg-gold aria-checked:text-navy" data-brand-opt="nails" data-track="branding_biz" data-track-name="Nail salon">Nail salon</button>
            <button type="button" role="radio" aria-checked="false" tabindex="-1" class="min-h-[44px] rounded-full border border-[rgb(247_246_242/.35)] px-4 text-[15.5px] font-semibold text-band-ink aria-checked:border-gold aria-checked:bg-gold aria-checked:text-navy" data-brand-opt="beauty" data-track="branding_biz" data-track-name="Beauty salon">Beauty salon</button>
          </div>
          <span class="hidden h-6 w-px bg-band-line sm:block" aria-hidden="true"></span>
          <div role="radiogroup" aria-label="Tone" class="flex flex-wrap gap-2" data-brand-group="tone">
            <button type="button" role="radio" aria-checked="true" tabindex="0" class="min-h-[44px] rounded-full border border-[rgb(247_246_242/.35)] px-4 text-[15.5px] font-semibold text-band-ink aria-checked:border-gold aria-checked:bg-gold aria-checked:text-navy" data-brand-opt="warm" data-track="branding_tone" data-track-name="Warm">Warm</button>
            <button type="button" role="radio" aria-checked="false" tabindex="-1" class="min-h-[44px] rounded-full border border-[rgb(247_246_242/.35)] px-4 text-[15.5px] font-semibold text-band-ink aria-checked:border-gold aria-checked:bg-gold aria-checked:text-navy" data-brand-opt="brisk" data-track="branding_tone" data-track-name="Brisk">Brisk</button>
            <button type="button" role="radio" aria-checked="false" tabindex="-1" class="min-h-[44px] rounded-full border border-[rgb(247_246_242/.35)] px-4 text-[15.5px] font-semibold text-band-ink aria-checked:border-gold aria-checked:bg-gold aria-checked:text-navy" data-brand-opt="formal" data-track="branding_tone" data-track-name="Formal">Formal</button>
          </div>
        </div>
      </div>

      <div class="brand-phone relative mt-5 rounded-[44px] border border-[rgb(247_246_242/.18)] bg-[#000] p-3 shadow-[0_50px_100px_-40px_rgb(0_0_0/0.8)]">
        <div class="relative overflow-hidden rounded-[34px] bg-[#f7f6f2] px-4 pb-5 pt-4 text-[#000]">
          <div class="flex items-center justify-between text-[13px] font-semibold" aria-hidden="true"><span class="tnum">9:41</span><span class="h-[22px] w-[90px] rounded-full bg-[#000]"></span><span class="flex gap-1"><i class="block h-2.5 w-1 rounded-sm bg-[#000]"></i><i class="block h-2.5 w-1 rounded-sm bg-[#000]"></i><i class="block h-2.5 w-1 rounded-sm bg-[#000]/40"></i></span></div>
          <div class="mt-4 flex items-center gap-3">
            <span class="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[var(--color-teal)] font-display text-[18px] font-semibold text-[#000]" aria-hidden="true" data-brand-initials>IA</span>
            <span class="min-w-0"><span class="block truncate font-display text-[17px] font-semibold leading-tight" data-brand-name>Ivy &amp; Ash Hair</span><span class="block text-[13.5px] text-[rgb(0_0_0/0.68)]"><span class="tnum" data-brand-num>0161 496 0218</span>, <span data-brand-city>Manchester</span></span></span>
            <span class="ml-auto shrink-0 text-[13px] font-semibold text-[#1c6446]"><span class="mr-1 inline-block h-2 w-2 rounded-full bg-[#1c6446] align-middle"></span><span class="tnum" data-brand-timer>00:00</span></span>
          </div>
          <div class="mt-4 space-y-2.5 text-[14.5px] leading-[1.45]">
            <div class="rounded-[4px_14px_14px_14px] bg-white p-3 shadow-[0_10px_30px_-20px_rgb(0_0_0/0.6)]">
              <div class="flex items-center gap-2"><span class="text-[12.5px] font-semibold text-[var(--color-amber-deep)]"><span data-brand-agent>Amy</span>, AI assistant</span><svg viewBox="0 0 168 40" class="brand-wave h-5 flex-1" aria-hidden="true" data-brand-wave><rect x="1" y="13" width="3" height="14" rx="1.5" style="--d:0s"/><rect x="7" y="3" width="3" height="34" rx="1.5" style="--d:0.09s"/><rect x="13" y="15.5" width="3" height="9" rx="1.5" style="--d:0.18s"/><rect x="19" y="6" width="3" height="28" rx="1.5" style="--d:0.27s"/><rect x="25" y="14.5" width="3" height="11" rx="1.5" style="--d:0.36s"/><rect x="31" y="12" width="3" height="16" rx="1.5" style="--d:0.45s"/><rect x="37" y="5.5" width="3" height="29" rx="1.5" style="--d:0.54s"/><rect x="43" y="8" width="3" height="24" rx="1.5" style="--d:0s"/><rect x="49" y="7" width="3" height="26" rx="1.5" style="--d:0.09s"/><rect x="55" y="10" width="3" height="20" rx="1.5" style="--d:0.18s"/><rect x="61" y="10.5" width="3" height="19" rx="1.5" style="--d:0.27s"/><rect x="67" y="15" width="3" height="10" rx="1.5" style="--d:0.36s"/><rect x="73" y="3.5" width="3" height="33" rx="1.5" style="--d:0.45s"/><rect x="79" y="16" width="3" height="8" rx="1.5" style="--d:0.54s"/><rect x="85" y="4" width="3" height="32" rx="1.5" style="--d:0s"/><rect x="91" y="16.5" width="3" height="7" rx="1.5" style="--d:0.09s"/><rect x="97" y="11.5" width="3" height="17" rx="1.5" style="--d:0.18s"/><rect x="103" y="7.5" width="3" height="25" rx="1.5" style="--d:0.27s"/><rect x="109" y="8" width="3" height="24" rx="1.5" style="--d:0.36s"/><rect x="115" y="7" width="3" height="26" rx="1.5" style="--d:0.45s"/><rect x="121" y="8" width="3" height="24" rx="1.5" style="--d:0.54s"/><rect x="127" y="11" width="3" height="18" rx="1.5" style="--d:0s"/><rect x="133" y="17" width="3" height="6" rx="1.5" style="--d:0.09s"/><rect x="139" y="5" width="3" height="30" rx="1.5" style="--d:0.18s"/><rect x="145" y="16.5" width="3" height="7" rx="1.5" style="--d:0.27s"/><rect x="151" y="3" width="3" height="34" rx="1.5" style="--d:0.36s"/><rect x="157" y="15.5" width="3" height="9" rx="1.5" style="--d:0.45s"/><rect x="163" y="10" width="3" height="20" rx="1.5" style="--d:0.54s"/></svg></div>
              <p class="mt-2 min-h-[64px]" aria-hidden="true">&ldquo;<span data-brand-greeting>Good morning, Ivy &amp; Ash Hair. I'm Amy, the salon's AI assistant. How can I help you today?</span><span class="brand-caret" data-brand-caret></span>&rdquo;</p>
              <p class="sr-only" aria-live="polite" data-brand-live></p>
            </div>
            <div class="ml-8 rounded-[14px_4px_14px_14px] bg-[#000] p-3 text-[#f7f6f2]" data-brand-line="caller"><span class="block text-[12.5px] font-semibold text-[rgb(247_246_242/0.6)]">Caller</span><span data-brand-caller>Hi, can I book a full head of highlights with Sophie?</span></div>
            <div class="rounded-[4px_14px_14px_14px] bg-white p-3 shadow-[0_10px_30px_-20px_rgb(0_0_0/0.6)]" data-brand-line="agent"><span class="block text-[12.5px] font-semibold text-[var(--color-amber-deep)]"><span data-brand-agent2>Amy</span>, AI assistant</span><span class="font-semibold" data-brand-reply>Of course. Sophie has Thursday at 10am, and it&#39;s about two and a half hours. Have you had colour with us in the last six months?</span></div>
            <div class="ml-8 rounded-[14px_4px_14px_14px] bg-[#000] p-3 text-[#f7f6f2]" data-brand-outcome><span class="block text-[12.5px] font-semibold text-[rgb(247_246_242/0.6)]">Caller</span><span data-brand-booked>No, it&#39;s my first time.</span></div>
            <div class="rounded-[4px_14px_14px_14px] bg-white p-3 shadow-[0_10px_30px_-20px_rgb(0_0_0/0.6)]" data-brand-line="summary"><span class="block text-[12.5px] font-semibold text-[var(--color-amber-deep)]">AI assistant</span><span class="font-semibold" data-brand-summary>Then we need a quick patch test first. I can do that tomorrow at 4pm, then book Thursday for you. Shall I?</span></div>
          </div>
          <div class="mt-4 flex items-center justify-center gap-6">
            <button type="button" class="grid h-12 w-12 place-items-center rounded-full bg-[#000] text-[#f7f6f2] hover:bg-[#262626]" data-brand-replay data-track="branding_replay" aria-label="Replay the call">${icon("replay")}</button>
            <span class="grid h-12 w-12 place-items-center rounded-full bg-[#a3352b] text-white" aria-hidden="true">${icon("phone", "rotate-[135deg]")}</span>
          </div>
        </div>
      </div>
      <p class="mt-3 text-center text-[14px] text-band-muted">Example scripts. Business names are made up.</p>
    </div>
  </div>
</section>

<section id="salons" data-component="SalonTypes" class="border-y border-line bg-surface">
  <div class="container-omh py-14 lg:py-20">
    <p class="eyebrow"><span class="eyebrow-mark" aria-hidden="true"><i></i><i></i><i></i></span>Salons we cover</p>
    <h2>One agent, <span class="hl">scripted for your salon</span></h2>
    <p class="mt-5 text-muted">Every salon gets different calls. We write the script around yours: your services and how long each takes, which stylist does what, your prices and your cancellation policy.</p>
    <ul class="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3" role="list">
${salonTypes.map(salonCard).join("\n")}
    </ul>
    <div class="mt-5 flex flex-col gap-4 rounded-[16px] border border-line bg-paper p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
      <div class="min-w-0">
        <h3 class="!text-[22px]">Another kind of salon?</h3>
        <p class="mt-2 font-display text-[17px] font-semibold">If your bookings come in by phone, the agent can answer them.</p>
        <p class="mt-2 text-[16px] text-muted">We also set the agent up for barbers, lash and brow bars, spas and tanning salons. Tell us what your clients ask, and we'll show you how the agent would handle it on the demo.</p>
      </div>
      <a href="#book-demo-form" class="text-link shrink-0" data-track="salons_ask">Ask about your salon${icon("arrow-right")}</a>
    </div>
    <div class="fit-band mt-8 flex flex-col gap-4 rounded-[16px] bg-sand p-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p class="font-display text-[18px] font-semibold">Not sure how your calls would fit?</p>
        <p class="mt-1 text-[16px] text-muted">Tell us who rings your salon and why. We'll map your calls and show you what the agent would handle and what it would pass to your team.</p>
      </div>
      ${primaryCta("salons_book_demo", "shrink-0")}
    </div>
  </div>
</section>

<section id="features" data-component="Features" class="border-y border-line bg-surface">
  <div class="container-omh py-14 lg:py-20">
    <p class="eyebrow"><span class="eyebrow-mark" aria-hidden="true"><i></i><i></i><i></i></span>What's included</p>
    <h2>What it does for your salon,<br class="max-sm:hidden"> <span class="hl">and what we run for you</span></h2>
    <p class="mt-5 text-muted">Bookings, changes, cancellations and the questions in between, handled the way a good salon receptionist would. Pick a capability to see who does what. Features marked Growth and Scale aren't on Starter.</p>

    <div class="mt-10 grid gap-5 lg:grid-cols-[minmax(0,.4fr)_minmax(0,.6fr)] lg:items-start" data-tabs>
      <div role="tablist" aria-label="Capabilities" aria-orientation="vertical" class="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
${capabilities.map(capTab).join("\n")}
      </div>
${capabilities.map(capPanel).join("\n")}
    </div>

    <h3 class="mt-14 !text-[24px]">You and your team <span class="hl">stay in charge</span></h3>
    <p class="mt-3 text-muted">You decide the rules before it answers a single call: which services it books, which need a consultation or patch test, your deposit and cancellation policy and when to pass a call to the team. It only gives prices and information you have approved, word for word. Anything it doesn't know, it says so, takes a proper message and passes it on.</p>
  </div>
</section>

<section id="pricing" data-component="Pricing" class="border-y border-line bg-surface">
  <div class="container-omh py-14 lg:py-20">
    <p class="eyebrow"><span class="eyebrow-mark" aria-hidden="true"><i></i><i></i><i></i></span>Pricing</p>
    <h2>AI voice agent pricing <span class="hl">for salons</span></h2>
    <p class="mt-5 text-muted">Three plans, billed monthly, no minimum contract. Every plan includes a managed agent, a British voice, a summary of every call and a monthly report. Prices exclude VAT.</p>

    <div class="mt-10 grid gap-5 lg:grid-cols-3 lg:items-stretch">
${salonsPricing.plans.map(plan).join("\n")}
    </div>

    <dl class="mt-12 border-t border-line">
${salonsPricing.notes.map(([k, v]) => `      <div class="grid gap-1 border-b border-line py-4 sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-8"><dt class="text-[16px] font-semibold uppercase tracking-[0.14em] text-muted">${k}</dt><dd class="text-[16px] leading-[1.5]">${v}</dd></div>`).join("\n")}
    </dl>
  </div>
</section>

`;
