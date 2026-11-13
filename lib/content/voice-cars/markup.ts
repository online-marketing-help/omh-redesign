// Body of /ai-voice-agents/car-dealerships (21 Oct 2026): the rebuilt sections of /ai-voice-agents (what-is with
// the call player, capabilities, use cases, pricing), written for UK car dealerships, garages and MOT centres. Copy from the
// 26 Oct 2026 "Automotive AI Receptionist" brief; the "Dealerships and garages" section (#dealerships) is this page's own.
// Same structure, classes and data-* hooks as lib/content/ai-voice-agents-markup.ts (via
// lib/content/voice-estate/markup.ts), so VoiceAgentsScript, VoiceMotion and voice-agents.css work unchanged.
// Composed by components/voice-agents/CarsPage.tsx. Prices and plans are the main page's.
import { mainPagePricing } from "@/lib/content/voice-pricing";

export const carsFaqTopics = { customers: "Customers and AI", sales: "Sales and finance", workshop: "Service and parts", setup: "Setup and systems", data: "Data and rules", working: "Working with us" };

/** The FAQ section. CarsPage.tsx builds the FAQPage JSON-LD from this list. */
export const carsFaqs: { q: string; a: string; cat: keyof typeof carsFaqTopics }[] = [
  { cat: "customers", q: "Will callers know they are talking to an AI?",
    a: "Yes. Every agent says it is an AI assistant at the start of the call. Callers deserve to know, and anyone who would rather speak to a person can ask." },
  { cat: "sales", q: "Can it answer questions about cars in stock?",
    a: "Yes, from the stock list you approve. It gives the details you sign off, such as price, mileage and key features, and says so when a car isn't on the list. We agree how the list is kept up to date before go-live, so it doesn't offer a car that has already sold." },
  { cat: "sales", q: "Can it book test drives?",
    a: "Yes. It checks the diary for the car and the sales executive, follows your test drive rules, such as what the driver needs to bring, and books the slot while the buyer is on the line." },
  { cat: "sales", q: "Does it value part-exchange cars?",
    a: "No. It never values a car over the phone. It takes the registration, mileage and anything the caller tells it about the car, then books a valuation appointment or passes the details to your used car team." },
  { cat: "sales", q: "Does it give finance advice?",
    a: "No. It never gives finance advice and never quotes a rate or a monthly payment it has not been given. Finance is regulated work, so those calls go to your finance team, put through live or booked for a call back." },
  { cat: "sales", q: "Can it agree a price or take a deposit?",
    a: "No. It never agrees a price, a discount or a deposit, and never takes card details. Buyers who are ready to reserve a car are put through to a sales executive, or booked in for an urgent call back." },
  { cat: "workshop", q: "Can it book services, MOTs and repairs?",
    a: "Yes. It books into your workshop diary by job type and length, follows your rules on drop-off times, courtesy cars and waiting customers, and texts a confirmation. It never diagnoses a fault. Calls about a warning light or a car that may not be safe to drive go to your service advisors." },
  { cat: "workshop", q: "What happens with parts enquiries?",
    a: "It takes the part needed, the registration and the caller's details, then passes them to your parts desk, or puts the call through on Growth and Scale. It only gives parts prices or stock levels you have approved." },
  { cat: "workshop", q: "Does it work for independent garages and MOT centres?",
    a: "Yes. An AI receptionist for garages books MOTs, services and repair checks into your workshop diary, takes the registration and the problem, and passes anything that needs a technician to your team. It never diagnoses a fault over the phone." },
  { cat: "customers", q: "Can the agent put a caller through to sales, service or parts?",
    a: "Yes, on the Growth and Scale plans. You set the rules: finance questions, buyers ready to reserve, complaints and anyone who asks for a person can be put through to the right desk. Outside your hours, and on the Starter plan, the agent takes a detailed message and sends it to your team." },
  { cat: "customers", q: "Our showroom is busiest on Saturdays. Can it help then?",
    a: "Yes. You choose when it answers: only when the lines are busy, only out of hours, or first on every call. On a busy Saturday it picks up the calls your team can't get to, books test drives and workshop slots and sends a summary of each call." },
  { cat: "customers", q: "What happens when the agent doesn't know the answer?",
    a: "It says so. The agent answers only from information you have approved, so when a question falls outside that, it offers to take a message or transfer the call. We review those moments and add the answers worth adding." },
  { cat: "setup", q: "Does it work with our dealer management system?",
    a: "It works with most diaries and dealer systems. We check yours on the first call and tell you plainly what connects directly and what needs a workaround." },
  { cat: "setup", q: "Can it handle several sites or brands?",
    a: "Yes, on the Scale plan. Each site or brand can have its own number, script, voice and diary, and calls are routed by where the caller is, the brand or what they ask for. Up to three are included, and each extra one is £495 setup and £49 a month." },
  { cat: "setup", q: "Can we keep our phone number, or get a local one?",
    a: "You can keep your number and divert calls to the agent, either all of them or only the ones your team misses. If you want a local number for a new site, we can set one up." },
  { cat: "setup", q: "How long does setup take?",
    a: "Starter goes live in 3 working days, Growth in 5 to 7 and Scale in 12 to 15. The clock starts once we have your stock list, booking rules and diary access. If your sites are more complex than usual, we give you a realistic timeline after the discovery call, before you commit to anything." },
  { cat: "data", q: "Is customer data kept safe?",
    a: "You remain the data controller and OMH acts as your processor under a written data processing agreement, in line with UK GDPR. We agree what is stored, where and for how long before go-live." },
  { cat: "data", q: "Are calls recorded?",
    a: "Only if you want them to be. Callers are told at the start of the call, and recordings are deleted on the schedule you set." },
  { cat: "data", q: "Can it call customers about MOTs, services and enquiries?",
    a: "Only customers who have given appropriate consent, such as those who asked for MOT and service reminders or a call back about a car. We follow the UK PECR rules, screen lists against the Telephone Preference Service where required and act on opt-outs straight away. We don't run cold calling campaigns." },
  { cat: "working", q: "Will it replace our sales team or service advisors?",
    a: "No. It takes the overflow and the routine calls, so your team can look after the customers in the showroom and the workshop. You choose when it answers: only when the lines are busy, only out of hours, or first on every call." },
  { cat: "working", q: "How much does an AI receptionist for car dealerships cost?",
    a: "Our AI receptionist for car dealerships and garages (the Starter plan) is £249 a month plus VAT with 300 minutes included, and a one-off setup fee from £795. Growth is £449 a month and Scale, for dealer groups with several sites or brands, is £849 a month. Extra minutes cost 60p each on every plan." },
  { cat: "working", q: "Is there a minimum contract?",
    a: "Plans are billed monthly with 30 days' notice. We set out the terms in writing before you start, including what's included each month and what counts as extra. Every invoice shows your included minutes and any overage." },
];

const icon = (name: string, cls = "") => `<svg class="icon${cls && " " + cls}" aria-hidden="true" focusable="false"><use href="#i-${name}"/></svg>`;
const tick = (text: string) => `<li class="flex gap-2.5">${icon("check", "mt-[3px] text-hl")}<span>${text}</span></li>`;
const cross = (text: string) => `<li class="flex gap-2.5">${icon("x", "mt-[3px]")}<span>${text}</span></li>`;
const tag = (text: string) => `<span class="tag">${text}</span>`;
const primaryCta = (track: string, cls = "") =>
  `<a href="#book-demo-form" class="btn btn-primary${cls && " " + cls}" data-track="${track}">Book a 30-Minute Demo</a>`;

/* ------------------------------------------------------------ Use cases */
// The eight kinds of call a car dealership gets, across the showroom, the workshop, the parts desk and finance.
const industries = [
  { id: "stock", icon: "car", label: "Stock", full: "Stock enquiries", tint: 1,
    time: "Call · Tue 12:40", status: "Sales team with customers", caller: "Is the grey hybrid SUV on your website still for sale? What's the mileage?", agent: "It is. It has 18,400 miles on it. Would you like to come and see it?", booked: "Answered from your stock list",
    h3: "Stock enquiries: answered from your own stock list",
    p: "Buyers ring several forecourts about the same kind of car and go with whoever answers. The agent answers from the live stock list you approve and books the next step while they're on the line.",
    bullets: ["Answers price, mileage and key features from your approved stock list", "Says so when a car isn't on the list, and takes a message", "Passes buyers who are ready to reserve to a sales executive"] },
  { id: "testdrives", icon: "key", label: "Test drives", full: "Test drive bookings", tint: 3,
    time: "Call · Sat 10:05", status: "Every sales executive busy", caller: "Could I test drive the blue hatchback this afternoon?", agent: "Yes. I have 2:30 today with Dan. Please bring your driving licence. Shall I book it?", booked: "Test drive booked: Sat 14:30",
    h3: "Test drives: booked while the buyer is still keen",
    p: "Buyers who ask for a test drive want one soon, often the same day. The agent checks the car and the sales diary, follows your test drive rules and books the slot.",
    bullets: ["Checks the diary by car and sales executive", "Reminds the driver what to bring, by your rules", "Texts a confirmation with directions to the showroom"] },
  { id: "partex", icon: "clipboard", label: "Part-exchange", full: "Part-exchange enquiries", tint: 2,
    time: "Call · Wed 19:15", status: "Showroom closed", caller: "What would you give me for my car in part-exchange?", agent: "I can't value it over the phone, but I can take the details and book an appraisal. What's the registration and mileage?", booked: "Appraisal booked: Thu 17:00",
    h3: "Part-exchange: details taken, valuation booked",
    p: "Most buyers have a car to part-exchange, and most ask what it's worth on the first call. The agent never gives a figure. It takes the details your used car team needs and books a valuation appointment.",
    bullets: ["Takes the registration, mileage and the caller's notes on condition", "Books a valuation appointment with your used car team", "Passes the details on for the appraiser before they arrive"], note: "Never values a car over the phone." },
  { id: "service", icon: "wrench", label: "Service and MOT", full: "Service, MOT and repairs", tint: 4,
    time: "Call · Mon 08:10", status: "Service desk checking cars in", caller: "My car's MOT is due next week. Can you do a service at the same time?", agent: "Yes. I have Tuesday at 8:15 for both. Will you wait, or would you like a courtesy car?", booked: "MOT and service booked: Tue 08:15",
    h3: "Service, MOT and repairs: the workshop diary filled",
    p: "The workshop phones at dealerships, garages and MOT centres peak at drop-off time, just when the service desk is checking cars in. The agent books services, MOTs and repairs by your rules and leaves fault questions to your advisors.",
    bullets: ["Books by job type and length into the workshop diary", "Follows your rules on drop-off times, waiting customers and courtesy cars", "Puts warning-light worries through to a service advisor"], note: "Never diagnoses a fault." },
  { id: "parts", icon: "package", label: "Parts", full: "Parts enquiries", tint: 1,
    time: "Call · 11:30", status: "Parts desk on another line", caller: "I need a pair of wiper blades for my car. Do you have them?", agent: "I'll pass that to the parts desk. Can I take your registration so they can check the right part?", booked: "Sent to the parts desk: reg taken",
    h3: "Parts enquiries: passed to the parts desk with the details",
    p: "Parts calls are short but constant, and the parts desk is often on another line. The agent takes what is needed and passes a clear request to your parts team.",
    bullets: ["Takes the part needed, the registration and a contact number", "Gives parts prices or stock levels only if you've approved them", "Puts trade customers through to the parts desk on Growth and Scale"] },
  { id: "finance", icon: "pound", label: "Finance", full: "Finance questions", tint: 3,
    time: "Call · 15:20", status: "Business manager with a customer", caller: "What would the monthly payments be on the SUV?", agent: "I can't advise on finance, but I can put you through to our finance team, who can talk you through it.", booked: "Put through to the finance team",
    h3: "Finance questions: straight to your finance team",
    p: "Finance is regulated work, so it stays with your people. The agent never gives advice or quotes a rate it has not been given. It puts the caller through to your finance team or books a call back.",
    bullets: ["Recognises finance and payment questions", "Puts them through to your finance team or business manager", "Books a call back with a note of the car if nobody is free"], note: "No finance advice given." },
  { id: "followups", icon: "replay", label: "Follow-ups", full: "Reminders and follow-ups", tint: 2,
    time: "Reminder · Thu 10:00", status: "Customer agreed to reminders", caller: "Oh yes, the MOT's due next month, isn't it?", agent: "It is. I have Saturday at 9:00 in the workshop. Shall I book that for you?", booked: "MOT booked: Sat 09:00",
    h3: "Follow-ups: consented reminders, booked straight in",
    p: "Customers who have agreed to hear from you get a call when an MOT or service is due, or a call back about a car they asked about. The agent books the next step there and then.",
    bullets: ["Calls only customers who agreed to it", "Books MOTs, services and test drives on the call", "Removes opt-outs straight away"], note: "Consented customers only." },
  { id: "afterhours", icon: "moon", label: "Saturdays and evenings", full: "Saturdays and evenings", tint: 4,
    time: "Call · Sun 20:15", status: "Showroom closed until Monday", caller: "I saw the hatchback online. Can I come and see it this week?", agent: "Yes. I can book you a test drive on Tuesday at 5:30pm. Shall I do that?", booked: "Test drive booked: Tue 17:30",
    h3: "Saturdays and evenings: covered when the showroom is busy or closed",
    p: "Buyers ring when they've finished work or between other forecourts on a Saturday. The agent answers, books and leaves a morning summary of who rang and what they wanted.",
    bullets: ["Answers on busy Saturdays, evenings, Sundays and bank holidays", "Books test drives and workshop slots from your diary", "Morning summary: who rang, what was booked, what needs a person"] },
];

const callVis = (x: { time: string; status: string; caller: string; agent: string; booked: string; tint: number }) => `
          <div class="mini"><span class="icon-tile">${icon("phone-missed")}</span><span class="min-w-0"><b class="block">${x.time}</b><span class="text-[14px] font-semibold text-ok">${x.status}</span></span></div>
          <div class="chat">
            <p><span class="who">Caller</span>${x.caller}</p>
            <p class="ai"><span class="who">Your AI agent</span>${x.agent}</p>
          </div>
          <span class="booked">${icon("check")}${x.booked}</span>`;

const industryTab = (x: (typeof industries)[number], i: number) =>
  `        <button type="button" role="tab" id="tab-${x.id}" aria-controls="uc-${x.id}" aria-selected="${i === 0}" tabindex="${i ? -1 : 0}" class="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-[var(--va-line-strong)] px-4 text-[16px] font-semibold aria-selected:border-ink aria-selected:bg-ink aria-selected:text-paper" data-tab data-track="cars_call_type" data-track-name="${x.full}">${icon(x.icon)}${x.label}</button>`;

const industryPanel = (x: (typeof industries)[number], i: number) => `
      <div role="tabpanel" id="uc-${x.id}" aria-labelledby="tab-${x.id}"${i ? " hidden" : ""} class="mt-6 grid overflow-hidden rounded-[22px] border border-line bg-surface lg:grid-cols-2" data-tab-panel>
        <div class="call-vis" style="--tint:var(--va-tint-${x.tint})" aria-hidden="true">${callVis(x)}
        </div>
        <div class="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
          <p class="flex items-center gap-2 text-[14px] font-semibold uppercase tracking-[0.14em] text-muted">${icon(x.icon, "text-hl")}${x.full}<span class="ml-1 tnum">${String(i + 1).padStart(2, "0")} / 08</span></p>
          <h3 class="mt-3 !text-[clamp(23px,21px+.5vw,28px)]">${x.h3}</h3>
          <p class="mt-3 text-[16px] text-muted">${x.p}</p>
          <ul class="mt-5 space-y-2 text-[16px] leading-snug">
${x.bullets.map(tick).join("\n")}
          </ul>
${x.note ? `          <p class="mt-4 inline-flex items-center gap-2 self-start rounded-[10px] border border-line bg-paper px-3 py-2 text-[15px] font-semibold">${icon("shield", "text-hl")}${x.note}</p>\n` : ""}
        </div>
      </div>`;

/* --------------------------------------------------------------- Pricing */
// The main page's plans, word for word except where a phrase names a business type: sites, brands, test drives,
// dealer systems. Prices, minutes, setup fees and delivery times are the shared ones.
const swap: Record<string, string> = {
  "Books appointments into one calendar": "Books test drives and workshop slots into one diary",
  "A British voice, your greeting and your opening hours": "A British voice, your greeting and your showroom hours",
  "More than one location": "More than one site",
  "Writes each enquiry into your CRM or practice system": "Writes each enquiry into your CRM or dealer management system",
  "Calls new web leads within 60 seconds": "Calls new website and listing enquiries within 60 seconds",
  "Routes enquiries at the first question, for example sales, service or accounts": "Routes calls at the first question, for example sales, service or parts",
  "Outbound follow-up to contacts who have consented, for quotes, reminders and no-shows": "Outbound calls to customers who have consented, for MOT and service reminders and no-shows",
  "A second location, department or agent": "A second site, brand or agent",
  "Up to three locations or departments, each with its own script, voice and diary": "Up to three sites, brands or departments, each with its own script, voice and diary",
  "Routing across branches by where the caller is or what they ask for": "Routing across sites by where the caller is, the brand or what they ask for",
  "Per-site reporting, so you can see which branch converts its calls": "Per-site reporting, so you can see which site converts its calls",
  "A fourth location or department (a priced add-on)": "A fourth site, brand or department (a priced add-on)",
};
const straps: Record<string, string> = {
  starter: "One site, one agent answering and booking. Best for an independent garage or small dealer.",
  growth: "For a dealership where the phone sells cars and fills the workshop. Where most dealerships should start.",
  scale: "For several sites or brands, each with its own lines, on one managed service.",
};
const carsPricing = {
  plans: mainPagePricing.plans.map((p) => ({ ...p, strap: straps[p.id], features: p.features.map((f) => swap[f] ?? f), excluded: p.excluded.map((f) => swap[f] ?? f) })),
  notes: mainPagePricing.notes.map(([k, v]) =>
    k === "Extra locations" ? ["Extra sites", v] : k === "Delivery" ? [k, "The clock starts once we have your stock list, booking rules and diary access."] : [k, v],
  ),
};
const plan = (p: (typeof carsPricing.plans)[number]) => {
  const shown = p.features.slice(0, 4);
  const rest = p.features.slice(4);
  return `      <article id="plan-${p.id}" class="relative flex flex-col rounded-[16px] border bg-surface p-6 sm:p-7 ${p.popular ? "border-gold shadow-[0_0_0_1px_var(--color-teal),0_28px_60px_-32px_rgb(var(--accent-rgb)/0.6)] lg:-mt-3 lg:mb-3" : "border-line"}" data-tier="${p.id}">
        ${p.popular ? '<span class="absolute -top-4 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-gold px-4 py-1.5 font-display text-[15px] font-semibold text-navy shadow-[0_10px_24px_-10px_rgb(var(--accent-rgb)/0.9)]">' + icon("plus-star", "!h-3.5 !w-3.5") + 'Where most dealerships start</span>' : ""}
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
        <details class="group mt-3 text-[16px]" data-track="pricing_details" data-track-name="${p.name}">
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
// Six capabilities, each with a mock-up, what the agent does and what OMH does, for a dealership's showroom and workshop.
const capabilities = [
  { id: "answer", icon: "phone", title: "First-ring answering, 24/7",
    vis: `<div class="mini"><span class="icon-tile">${icon("phone")}</span><span class="min-w-0"><b class="block">Call · Sat 11:20</b><span class="text-[14px] font-semibold text-ok">Answered on the first ring</span></span></div>
          <div class="mini">${icon("users", "text-ok")}<span>Busy Saturday: 5 callers answered at once</span></div>`,
    agent: "Every call answered straight away, on a busy Saturday or after the showroom has closed. Several callers answered at once. No voicemail and no engaged tone.",
    omh: "We divert your lines, set your hours and agree what it picks up and when. Nothing goes live without your sign-off." },
  { id: "voice", icon: "mic", title: "Sounds like your business",
    vis: `<div class="mini"><span class="icon-tile">${icon("mic")}</span><span class="min-w-0"><b class="block">Grace · Your assistant</b><span class="text-[14px] text-muted">Your business name, greeting and voice</span></span></div>
          <div class="mini justify-center py-3"><span class="mini-wave"><i></i><i></i><i></i><i></i><i></i></span><span class="ml-2 text-[14px] font-semibold">"Thanks for calling Ashford Road Motors, how can I help?"</span></div>`,
    agent: "A natural British voice that greets callers with your business name and knows your brands.",
    omh: "We pick the voice and tone with you, write the greeting and test it until it sounds right for your customers." },
  { id: "knows", icon: "book", title: "Knows your stock, prices and service menu",
    vis: `<div class="flex flex-wrap justify-center gap-2"><span class="mini-chip">${icon("check", "text-ok")}Stock list</span><span class="mini-chip">${icon("check", "text-ok")}Prices</span><span class="mini-chip">${icon("check", "text-ok")}Service menu</span><span class="mini-chip">${icon("check", "text-ok")}Test drive rules</span><span class="mini-chip">${icon("check", "text-ok")}Opening hours</span><span class="mini-chip">${icon("check", "text-ok")}Directions</span></div>
          <div class="mini">${icon("book", "text-hl")}<span>Trained on <b>your</b> dealership, not the internet</span></div>`,
    agent: "Answers from the stock list, prices and service menu you approve, exactly as you word them.",
    omh: "We load your stock feed or list, service menu and team, and update them whenever you send us changes." },
  { id: "books", icon: "calendar", title: "Books test drives and workshop slots",
    vis: `<div class="vcal-head"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span></div>
          <div class="vcal"><span class="busy"></span><span></span><span class="busy"></span><span></span><span class="busy"></span><span></span><span class="busy"></span><span class="new"></span><span class="busy"></span><span></span><span class="busy"></span><span></span><span></span><span class="busy"></span><span></span></div>
          <div class="mini">${icon("calendar", "text-ok")}<span><b>Test drive booked:</b> Wed 11:00, no clash</span></div>`,
    agent: "Offers real slots and books test drives, MOTs and services with the registration and details attached.",
    omh: "We connect your diaries and set the rules: slot lengths, who takes test drives and how much notice the workshop needs." },
  { id: "transfer", icon: "transfer", title: "Puts callers through to sales, service or parts", plan: "Growth and Scale",
    vis: `<div class="mini"><span class="icon-tile">${icon("user")}</span><span class="min-w-0"><b class="block">Caller asks about finance</b><span class="text-[14px] text-muted">"What would my monthly payments be?"</span></span></div>
          <div class="mini">${icon("transfer", "text-hl")}<span><b>Transferring to the finance team</b> with a quick briefing</span></div>`,
    agent: "Passes each caller to the right team, with everything they said passed across. Finance calls always go to a person.",
    omh: "We build your routing rules, with a backup if the first person doesn't answer." },
  { id: "leads", icon: "timer", title: "Calls back new enquiries", plan: "Growth and Scale",
    vis: `<div class="mini"><span class="icon-tile">${icon("car")}</span><span class="min-w-0"><b class="block">New enquiry · 14:02</b><span class="text-[14px] text-muted">Used hybrid SUV, website enquiry</span></span></div>
          <div class="mini">${icon("timer", "text-ok")}<span><b>Called back</b> in 42 seconds</span></div>
          <div class="mini justify-between"><span><b>MOT due</b></span><span class="text-[14px] font-semibold text-ok">MOT booked</span></div>`,
    agent: "Rings back new web and portal enquiries within a minute, while the buyer is still looking.",
    omh: "We agree the timings and wording with you, and only call people who have asked to hear from you." },
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

/* ------------------------------------------------------------------ Page */
export const carsMarkup = String.raw`
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
  <symbol id="i-tooth" viewBox="0 0 24 24"><path d="M12 5.5c1.5-1.5 4-2.5 6-1 2.5 1.8 2 5 1 7-1 2-1.5 4.5-2 8-.3 1.6-2 1.7-2.5.2L13.5 15c-.5-1.5-2.5-1.5-3 0l-1 4.7c-.5 1.5-2.2 1.4-2.5-.2-.5-3.5-1-6-2-8-1-2-1.5-5.2 1-7 2-1.5 4.5-.5 6 1z"/></symbol>
  <symbol id="i-stethoscope" viewBox="0 0 24 24"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6 6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6 6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></symbol>
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
  <symbol id="i-package" viewBox="0 0 24 24"><path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"/><path d="M12 22V12"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="m7.5 4.27 9 5.15"/></symbol>
  <symbol id="i-pound" viewBox="0 0 24 24"><path d="M18 7c0-5.333-8-5.333-8 0"/><path d="M10 7v14"/><path d="M6 21h12"/><path d="M6 13h10"/></symbol>
</svg>

<section id="what-is" data-component="WhatIs" class="on-band relative overflow-hidden bg-band text-band-ink">
  <div class="pointer-events-none absolute right-[-10%] top-1/2 h-[620px] w-[620px] -translate-y-1/2 rounded-full bg-gold/15 blur-3xl" aria-hidden="true"></div>
  <div class="container-omh relative grid grid-cols-[minmax(0,1fr)] items-start gap-10 py-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,.95fr)] lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-10 lg:py-24" data-brand
    data-brand-biz='[{"id":"sales","label":"Sales","name":"Ashford Road Motors","city":"Birmingham","num":"0121 496 0731","agent":"Grace","kind":"dealership&#39;s","initials":"AR","voice":"British English, warm and friendly","never":"Gives finance advice or quotes a rate","transfer":"Finance questions go to the finance team","caller":"Is the grey Golf on your website still available?","reply":"Yes, the 2021 Golf Life in grey is still in stock. Would you like to book a test drive?","booked":"Saturday morning, if you can.","summary":"I have Saturday at 10:30 with Daniel. Shall I book it and text you the details?"},{"id":"service","label":"Service and MOT","name":"Ashford Road Motors","city":"Birmingham","num":"0121 496 0731","agent":"Hannah","kind":"workshop&#39;s","initials":"AR","voice":"British English, clear and upbeat","never":"Diagnoses a fault","transfer":"Warning-light worries go to a service advisor","caller":"My MOT is due next week. Can you fit me in?","reply":"Of course. Can I take the registration? I have Tuesday at 8:30 or Thursday at 1pm.","booked":"Tuesday, please.","summary":"Booked for Tuesday at 8:30. Would you like us to do a service at the same time?"},{"id":"garage","label":"Independent garage","name":"Millbrook Garage","city":"Leeds","num":"0113 496 0264","agent":"Priya","kind":"garage&#39;s","initials":"MG","voice":"British English, calm and measured","never":"Diagnoses a fault over the phone","transfer":"Anything that needs a technician goes to your team","caller":"There&#39;s a grinding noise when I brake.","reply":"Thanks for telling me. I can&#39;t diagnose it over the phone, but I can book it in for a brake check. Is tomorrow at 9am any good?","booked":"Yes, that works.","summary":"Booked. Please drop the car in by 9, and we&#39;ll call you before doing any work."}]'>
    <div class="lg:col-start-1 lg:row-start-1">
      <h2>What is an AI receptionist <span class="hl">for car dealerships?</span></h2>
      <p class="mt-5 text-band-muted">An AI receptionist for car dealerships is software that answers and makes phone calls for your showroom and workshop in natural, spoken conversation. You may also hear it called an automotive AI receptionist. It works out whether the caller wants a car, a test drive, a part-exchange appraisal, a service, an MOT or a part, answers from the stock list and prices you have approved, books test drives and workshop slots into your diary and passes anything it can't handle to the right person, with a summary of the call.</p>
      <p class="mt-4 text-band-muted">On Starter it does exactly that job. On Growth and Scale it works as a full AI voice agent: it puts callers through to sales, service or parts, calls back new enquiries and works across several sites or brands. Either way, OMH writes the script, connects your diary and dealer system where it allows, and runs it for you. See our <a href="/ai-voice-agents/receptionist">AI receptionist plan</a>, or how our <a href="/ai-voice-agents">AI voice agent</a> works across UK businesses.</p>
    </div>

    <div class="order-last lg:order-none lg:col-start-1 lg:row-start-2">
      <h3 class="!text-[22px]">How a call goes</h3>
      <p class="mt-1 text-[16px] text-band-muted">Watch the phone. Each step lights up as the call reaches it.</p>
      <ol class="mt-5 space-y-2.5" aria-live="off">
        <li class="flex gap-4 rounded-[14px] border border-band-line p-4" data-brand-step="1"><span class="step-num" aria-hidden="true">1</span><span class="text-[16px] leading-snug"><strong class="block font-display text-[17.5px] font-semibold">It listens.</strong><span class="text-band-muted">It hears whether it's a sales enquiry, a test drive, a service or MOT, or a parts call as the caller speaks.</span></span></li>
        <li class="flex gap-4 rounded-[14px] border border-band-line p-4" data-brand-step="2"><span class="step-num" aria-hidden="true">2</span><span class="text-[16px] leading-snug"><strong class="block font-display text-[17.5px] font-semibold">It works out the answer.</strong><span class="text-band-muted">It checks the request against your stock list, prices, diaries and booking rules.</span></span></li>
        <li class="flex gap-4 rounded-[14px] border border-band-line p-4" data-brand-step="3"><span class="step-num" aria-hidden="true">3</span><span class="text-[16px] leading-snug"><strong class="block font-display text-[17.5px] font-semibold">It replies and acts.</strong><span class="text-band-muted">It answers in a natural voice, books the slot or puts the call through.</span></span></li>
        <li class="flex gap-4 rounded-[14px] border border-band-line p-4" data-brand-step="4"><span class="step-num" aria-hidden="true">4</span><span class="text-[16px] leading-snug"><strong class="block font-display text-[17.5px] font-semibold">It reports back.</strong><span class="text-band-muted">Your team gets a summary of every call, with name, number, registration and what the caller needs.</span></span></li>
      </ol>
    </div>

    <div class="mx-auto w-full max-w-[420px] lg:col-start-2 lg:row-span-2 lg:row-start-1">
      <div class="rounded-[14px] border border-band-line bg-band-surface p-4 sm:p-5">
        <p class="font-display text-[18px] font-semibold">Try it: pick a team and a tone, then listen in</p>
        <div class="mt-3 flex flex-wrap items-center gap-2">
          <div role="radiogroup" aria-label="Team" class="flex flex-wrap gap-2" data-brand-group="biz">
            <button type="button" role="radio" aria-checked="true" tabindex="0" class="min-h-[44px] rounded-full border border-[rgb(247_246_242/.35)] px-4 text-[15.5px] font-semibold text-band-ink aria-checked:border-gold aria-checked:bg-gold aria-checked:text-navy" data-brand-opt="sales" data-track="branding_biz" data-track-name="Sales">Sales</button>
            <button type="button" role="radio" aria-checked="false" tabindex="-1" class="min-h-[44px] rounded-full border border-[rgb(247_246_242/.35)] px-4 text-[15.5px] font-semibold text-band-ink aria-checked:border-gold aria-checked:bg-gold aria-checked:text-navy" data-brand-opt="service" data-track="branding_biz" data-track-name="Service and MOT">Service and MOT</button>
            <button type="button" role="radio" aria-checked="false" tabindex="-1" class="min-h-[44px] rounded-full border border-[rgb(247_246_242/.35)] px-4 text-[15.5px] font-semibold text-band-ink aria-checked:border-gold aria-checked:bg-gold aria-checked:text-navy" data-brand-opt="garage" data-track="branding_biz" data-track-name="Independent garage">Independent garage</button>
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
            <span class="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[var(--color-teal)] font-display text-[18px] font-semibold text-[#000]" aria-hidden="true" data-brand-initials>AR</span>
            <span class="min-w-0"><span class="block truncate font-display text-[17px] font-semibold leading-tight" data-brand-name>Ashford Road Motors</span><span class="block text-[13.5px] text-[rgb(0_0_0/0.68)]"><span class="tnum" data-brand-num>0121 496 0731</span>, <span data-brand-city>Birmingham</span></span></span>
            <span class="ml-auto shrink-0 text-[13px] font-semibold text-[#1c6446]"><span class="mr-1 inline-block h-2 w-2 rounded-full bg-[#1c6446] align-middle"></span><span class="tnum" data-brand-timer>00:00</span></span>
          </div>
          <div class="mt-4 space-y-2.5 text-[14.5px] leading-[1.45]">
            <div class="rounded-[4px_14px_14px_14px] bg-white p-3 shadow-[0_10px_30px_-20px_rgb(0_0_0/0.6)]">
              <div class="flex items-center gap-2"><span class="text-[12.5px] font-semibold text-[var(--color-amber-deep)]"><span data-brand-agent>Grace</span>, AI assistant</span><svg viewBox="0 0 168 40" class="brand-wave h-5 flex-1" aria-hidden="true" data-brand-wave><rect x="1" y="13" width="3" height="14" rx="1.5" style="--d:0s"/><rect x="7" y="3" width="3" height="34" rx="1.5" style="--d:0.09s"/><rect x="13" y="15.5" width="3" height="9" rx="1.5" style="--d:0.18s"/><rect x="19" y="6" width="3" height="28" rx="1.5" style="--d:0.27s"/><rect x="25" y="14.5" width="3" height="11" rx="1.5" style="--d:0.36s"/><rect x="31" y="12" width="3" height="16" rx="1.5" style="--d:0.45s"/><rect x="37" y="5.5" width="3" height="29" rx="1.5" style="--d:0.54s"/><rect x="43" y="8" width="3" height="24" rx="1.5" style="--d:0s"/><rect x="49" y="7" width="3" height="26" rx="1.5" style="--d:0.09s"/><rect x="55" y="10" width="3" height="20" rx="1.5" style="--d:0.18s"/><rect x="61" y="10.5" width="3" height="19" rx="1.5" style="--d:0.27s"/><rect x="67" y="15" width="3" height="10" rx="1.5" style="--d:0.36s"/><rect x="73" y="3.5" width="3" height="33" rx="1.5" style="--d:0.45s"/><rect x="79" y="16" width="3" height="8" rx="1.5" style="--d:0.54s"/><rect x="85" y="4" width="3" height="32" rx="1.5" style="--d:0s"/><rect x="91" y="16.5" width="3" height="7" rx="1.5" style="--d:0.09s"/><rect x="97" y="11.5" width="3" height="17" rx="1.5" style="--d:0.18s"/><rect x="103" y="7.5" width="3" height="25" rx="1.5" style="--d:0.27s"/><rect x="109" y="8" width="3" height="24" rx="1.5" style="--d:0.36s"/><rect x="115" y="7" width="3" height="26" rx="1.5" style="--d:0.45s"/><rect x="121" y="8" width="3" height="24" rx="1.5" style="--d:0.54s"/><rect x="127" y="11" width="3" height="18" rx="1.5" style="--d:0s"/><rect x="133" y="17" width="3" height="6" rx="1.5" style="--d:0.09s"/><rect x="139" y="5" width="3" height="30" rx="1.5" style="--d:0.18s"/><rect x="145" y="16.5" width="3" height="7" rx="1.5" style="--d:0.27s"/><rect x="151" y="3" width="3" height="34" rx="1.5" style="--d:0.36s"/><rect x="157" y="15.5" width="3" height="9" rx="1.5" style="--d:0.45s"/><rect x="163" y="10" width="3" height="20" rx="1.5" style="--d:0.54s"/></svg></div>
              <p class="mt-2 min-h-[64px]" aria-hidden="true">&ldquo;<span data-brand-greeting>Good morning, Ashford Road Motors. I'm Grace, the dealership's AI assistant. How can I help you today?</span><span class="brand-caret" data-brand-caret></span>&rdquo;</p>
              <p class="sr-only" aria-live="polite" data-brand-live></p>
            </div>
            <div class="ml-8 rounded-[14px_4px_14px_14px] bg-[#000] p-3 text-[#f7f6f2]" data-brand-line="caller"><span class="block text-[12.5px] font-semibold text-[rgb(247_246_242/0.6)]">Caller</span><span data-brand-caller>Is the grey Golf on your website still available?</span></div>
            <div class="rounded-[4px_14px_14px_14px] bg-white p-3 shadow-[0_10px_30px_-20px_rgb(0_0_0/0.6)]" data-brand-line="agent"><span class="block text-[12.5px] font-semibold text-[var(--color-amber-deep)]"><span data-brand-agent2>Grace</span>, AI assistant</span><span class="font-semibold" data-brand-reply>Yes, the 2021 Golf Life in grey is still in stock. Would you like to book a test drive?</span></div>
            <div class="ml-8 rounded-[14px_4px_14px_14px] bg-[#000] p-3 text-[#f7f6f2]" data-brand-outcome><span class="block text-[12.5px] font-semibold text-[rgb(247_246_242/0.6)]">Caller</span><span data-brand-booked>Saturday morning, if you can.</span></div>
            <div class="rounded-[4px_14px_14px_14px] bg-white p-3 shadow-[0_10px_30px_-20px_rgb(0_0_0/0.6)]" data-brand-line="summary"><span class="block text-[12.5px] font-semibold text-[var(--color-amber-deep)]">AI assistant</span><span class="font-semibold" data-brand-summary>I have Saturday at 10:30 with Daniel. Shall I book it and text you the details?</span></div>
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

<section id="dealerships" data-component="DealershipsGarages" class="border-y border-line bg-surface">
  <div class="container-omh py-14 lg:py-20">
    <p class="eyebrow"><span class="eyebrow-mark" aria-hidden="true"><i></i><i></i><i></i></span>Who we work with</p>
    <h2>Built for dealerships <span class="hl">and garages</span></h2>
    <p class="mt-5 text-muted">Showrooms and workshops get different calls. We script the agent around yours: your stock, your service menu, your teams and what must go to a person.</p>
    <div class="mt-10 grid gap-5 lg:grid-cols-2">
      <div class="hover-card rounded-[16px] border border-line bg-paper p-5 sm:p-6">
        <p class="flex items-center gap-2 text-[14px] font-semibold uppercase tracking-[0.14em] text-muted">${icon("car", "text-hl")}Showrooms</p>
        <h3 class="mt-3 !text-[clamp(22px,20px+.5vw,26px)]">AI Receptionist for Car Dealerships</h3>
        <p class="mt-2 font-display text-[18px] font-semibold">Buyers ring while your sales team is with a customer.</p>
        <p class="mt-3 text-[16px] text-muted">Our automotive AI receptionist answers stock questions from your approved list, books test drives with the right sales executive and takes part-exchange details for your used car team.</p>
        <ul class="mt-4 space-y-2 text-[16px] leading-snug text-muted">
            <li class="flex gap-2.5"><span aria-hidden="true" class="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-50"></span><span>Answers questions about cars in stock, from your approved list</span></li>
            <li class="flex gap-2.5"><span aria-hidden="true" class="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-50"></span><span>Books test drives and showroom appointments</span></li>
            <li class="flex gap-2.5"><span aria-hidden="true" class="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-50"></span><span>Takes part-exchange details: registration, mileage and condition</span></li>
        </ul>
        <p class="mt-4 inline-flex items-center gap-2 self-start rounded-[10px] border border-line bg-surface px-3 py-2 text-[15px] font-semibold">${icon("shield", "text-hl")}Never values a car, agrees a price or gives finance advice</p>
      </div>
      <div class="hover-card rounded-[16px] border border-line bg-paper p-5 sm:p-6">
        <p class="flex items-center gap-2 text-[14px] font-semibold uppercase tracking-[0.14em] text-muted">${icon("wrench", "text-hl")}Workshops</p>
        <h3 class="mt-3 !text-[clamp(22px,20px+.5vw,26px)]">AI Receptionist for Garages &amp; MOT Centres</h3>
        <p class="mt-2 font-display text-[18px] font-semibold">Your technicians are under a car, not at the phone.</p>
        <p class="mt-3 text-[16px] text-muted">An AI receptionist for garages books MOTs, services and repairs into your workshop diary and takes the registration and the problem before the car arrives. It also works as an AI receptionist for car repair shops, body shops and tyre centres.</p>
        <ul class="mt-4 space-y-2 text-[16px] leading-snug text-muted">
            <li class="flex gap-2.5"><span aria-hidden="true" class="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-50"></span><span>Books MOTs, services and repair checks by registration</span></li>
            <li class="flex gap-2.5"><span aria-hidden="true" class="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-50"></span><span>Takes a description of the problem and any warning lights</span></li>
            <li class="flex gap-2.5"><span aria-hidden="true" class="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-50"></span><span>Reminds customers who have asked for MOT and service reminders</span></li>
        </ul>
        <p class="mt-4 inline-flex items-center gap-2 self-start rounded-[10px] border border-line bg-surface px-3 py-2 text-[15px] font-semibold">${icon("shield", "text-hl")}Never diagnoses a fault or quotes for a repair it hasn't been given</p>
      </div>
    </div>
    <div class="mt-5 flex flex-col gap-4 rounded-[16px] border border-line bg-paper p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
      <div class="min-w-0">
        <h3 class="!text-[20px]">Another kind of motor business?</h3>
        <p class="mt-2 text-[16px] text-muted">We also set the agent up for van and commercial dealers, car supermarkets, tyre centres, body shops and driving schools. Tell us what your callers ask, and we'll show you how the agent would handle it on the demo.</p>
      </div>
      <a href="#book-demo-form" class="text-link shrink-0" data-track="dealerships_ask">Ask about your business${icon("arrow-right")}</a>
    </div>
  </div>
</section>
<section id="features" data-component="Features" class="border-y border-line bg-surface">
  <div class="container-omh py-14 lg:py-20">
    <p class="eyebrow"><span class="eyebrow-mark" aria-hidden="true"><i></i><i></i><i></i></span>What's included</p>
    <h2>What it does for your business,<br class="max-sm:hidden"> <span class="hl">and what we run for you</span></h2>
    <p class="mt-5 text-muted">Sales, service, parts and the questions in between, handled the way a good showroom receptionist would. Pick a capability to see who does what. Features marked Growth and Scale aren't on Starter.</p>

    <div class="mt-10 grid gap-5 lg:grid-cols-[minmax(0,.4fr)_minmax(0,.6fr)] lg:items-start" data-tabs>
      <div role="tablist" aria-label="Capabilities" aria-orientation="vertical" class="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
${capabilities.map(capTab).join("\n")}
      </div>
${capabilities.map(capPanel).join("\n")}
    </div>

    <h3 class="mt-14 !text-[24px]">You and your team stay <span class="hl">in charge</span></h3>
    <p class="mt-3 text-muted">You decide the rules before it answers a single call. It never values a car, agrees a price, takes a deposit or gives finance advice. It only gives stock details and prices you have approved, word for word, and anything it doesn't know, it says so and passes on.</p>
    <div class="mt-6 grid gap-4 md:grid-cols-3">
      <div class="hover-card rounded-[16px] border border-line bg-surface p-5 sm:p-6">
        <p class="flex items-center gap-3 font-display text-[19px] font-semibold"><span class="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ok text-surface">${icon("check")}</span>It handles</p>
        <ul class="mt-4 space-y-2 text-[16px] leading-snug text-muted">
            <li class="flex gap-2.5"><span aria-hidden="true" class="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-50"></span><span>Test drive and workshop bookings</span></li>
            <li class="flex gap-2.5"><span aria-hidden="true" class="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-50"></span><span>Stock questions from your approved list</span></li>
            <li class="flex gap-2.5"><span aria-hidden="true" class="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-50"></span><span>Opening hours and directions</span></li>
            <li class="flex gap-2.5"><span aria-hidden="true" class="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-50"></span><span>Service and MOT prices you approve</span></li>
        </ul>
      </div>
      <div class="hover-card rounded-[16px] border border-line bg-surface p-5 sm:p-6">
        <p class="flex items-center gap-3 font-display text-[19px] font-semibold"><span class="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold text-navy">${icon("transfer")}</span>It hands to your team</p>
        <ul class="mt-4 space-y-2 text-[16px] leading-snug text-muted">
            <li class="flex gap-2.5"><span aria-hidden="true" class="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-50"></span><span>Finance and payment questions</span></li>
            <li class="flex gap-2.5"><span aria-hidden="true" class="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-50"></span><span>Complaints and sensitive calls</span></li>
            <li class="flex gap-2.5"><span aria-hidden="true" class="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-50"></span><span>Anyone who asks for a person</span></li>
            <li class="flex gap-2.5"><span aria-hidden="true" class="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-50"></span><span>Questions it has no approved answer for</span></li>
        </ul>
      </div>
      <div class="hover-card rounded-[16px] border border-line bg-surface p-5 sm:p-6">
        <p class="flex items-center gap-3 font-display text-[19px] font-semibold"><span class="grid h-9 w-9 shrink-0 place-items-center rounded-full border-[1.5px] border-[var(--va-line-strong)] text-muted">${icon("x")}</span>It never</p>
        <ul class="mt-4 space-y-2 text-[16px] leading-snug text-muted">
            <li class="flex gap-2.5"><span aria-hidden="true" class="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-50"></span><span>Gives finance advice or quotes a rate</span></li>
            <li class="flex gap-2.5"><span aria-hidden="true" class="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-50"></span><span>Values a car over the phone</span></li>
            <li class="flex gap-2.5"><span aria-hidden="true" class="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-50"></span><span>Agrees a price, discount or deposit</span></li>
            <li class="flex gap-2.5"><span aria-hidden="true" class="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-50"></span><span>Calls people who have not agreed to it</span></li>
        </ul>
      </div>
    </div>
    <div class="mt-5 flex flex-col gap-4 rounded-[16px] border border-line bg-surface p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
      <div class="min-w-0">
        <p class="font-display text-[18px] font-semibold">Works alongside your dealer systems</p>
        <p class="mt-1 text-[16px] text-muted">Test drives, workshop bookings and notes go where your team already looks. We check your setup on the first call and tell you plainly what connects directly and what needs a workaround.</p>
      </div>
      <ul class="flex shrink-0 flex-wrap gap-2 lg:max-w-[420px] lg:justify-end" aria-label="Systems dealers use">
        <li class="rounded-full border border-line bg-paper px-3.5 py-1.5 text-[15px] font-semibold">Keyloop</li><li class="rounded-full border border-line bg-paper px-3.5 py-1.5 text-[15px] font-semibold">Pinewood</li><li class="rounded-full border border-line bg-paper px-3.5 py-1.5 text-[15px] font-semibold">Dragon2000</li><li class="rounded-full border border-line bg-paper px-3.5 py-1.5 text-[15px] font-semibold">AutoTrader</li><li class="rounded-full border border-line bg-paper px-3.5 py-1.5 text-[15px] font-semibold">Google Calendar</li><li class="rounded-full border border-line bg-paper px-3.5 py-1.5 text-[15px] font-semibold">Microsoft 365</li>
      </ul>
    </div>
  </div>
</section>

<section id="use-cases" data-component="Industries">
  <div class="container-omh py-14 lg:py-20">
    <p class="eyebrow"><span class="eyebrow-mark" aria-hidden="true"><i></i><i></i><i></i></span>Use cases</p>
    <h2>Car dealership and garage use cases <span class="hl">by type of call</span></h2>
    <p class="mt-5 text-muted">A dealership or garage gets the same eight kinds of call, week in, week out. We script your agent around each one. Pick a call to see how the agent handles it.</p>
    <div class="mt-8" data-tabs>
      <div role="tablist" aria-label="Choose a type of call" class="flex flex-wrap gap-2">
${industries.map(industryTab).join("\n")}
      </div>
${industries.map(industryPanel).join("\n")}
    </div>
    <div class="fit-band mt-8 flex flex-col gap-4 rounded-[16px] bg-sand p-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p class="font-display text-[18px] font-semibold">Not sure how your calls would fit?</p>
        <p class="mt-1 text-[16px] text-muted">Tell us who rings your business and why. We'll map your calls and show you what the agent would handle and what it would pass to your team.</p>
      </div>
      ${primaryCta("industries_book_demo", "shrink-0")}
    </div>
  </div>
</section>

<section id="pricing" data-component="Pricing" class="border-y border-line bg-surface">
  <div class="container-omh py-14 lg:py-20">
    <p class="eyebrow"><span class="eyebrow-mark" aria-hidden="true"><i></i><i></i><i></i></span>Pricing</p>
    <h2>AI voice agent pricing <span class="hl">for car dealerships and garages</span></h2>
    <p class="mt-5 text-muted">Three plans, billed monthly, no minimum contract. Every plan includes a managed agent, a British voice, a summary of every call and a monthly report. Prices exclude VAT.</p>

    <div class="mt-10 grid gap-5 lg:grid-cols-3 lg:items-stretch">
${carsPricing.plans.map(plan).join("\n")}
    </div>
    <p class="mt-6 text-[16px] text-muted">Starter is our <a href="/ai-voice-agents/receptionist" class="text-ink underline decoration-gold decoration-2 underline-offset-4 hover:text-hl">AI receptionist plan</a>.</p>

    <dl class="mt-12 border-t border-line">
${carsPricing.notes.map(([k, v]) => `      <div class="grid gap-1 border-b border-line py-4 sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-8"><dt class="text-[16px] font-semibold uppercase tracking-[0.14em] text-muted">${k}</dt><dd class="text-[16px] leading-[1.5]">${v}</dd></div>`).join("\n")}
    </dl>
  </div>
</section>

`;
