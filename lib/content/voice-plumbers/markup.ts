// Body of /ai-voice-agents/plumbers (21 Oct 2026): the rebuilt sections of /ai-voice-agents (what-is with
// the call player, capabilities, use cases, pricing), written for plumbers. Same structure, classes and
// data-* hooks as lib/content/ai-voice-agents-markup.ts. Composed by components/voice-agents/PlumbersPage.tsx.
// Content sources: the main page's plans and process.
import { mainPagePricing } from "@/lib/content/voice-pricing";

export const plumbersFaqTopics = { callers: "Callers and AI", safety: "Emergencies and safety", setup: "Jobs and systems", data: "Data and rules", working: "Working with us" };

/** The FAQ section. PlumbersPage.tsx builds the FAQPage JSON-LD from this list. */
export const plumbersFaqs: { q: string; a: string; cat: keyof typeof plumbersFaqTopics }[] = [
  { cat: "callers", q: "Will callers know they are talking to an AI?",
    a: "Yes. Every agent says it is an AI assistant at the start of the call. Callers deserve to know, and anyone who would rather speak to a person can ask." },
  { cat: "safety", q: "What does it do with a burst pipe or a leak?",
    a: "It follows the route you set. It takes the address, what is happening and how to get in, then puts the call through to whoever is on call or sends them the details straight away. It gives only the safety steps you have approved, such as where to find the stopcock. Every emergency is flagged at the top of the summary." },
  { cat: "safety", q: "Does it diagnose faults or give repair advice?",
    a: "No. The agent never diagnoses a fault, guesses at the cause or tells callers how to fix anything. It gives only the safety steps you have approved, in your words, and passes everything else to your plumbers." },
  { cat: "safety", q: "What happens if a caller says they can smell gas?",
    a: "It gives the National Gas Emergency number, 0800 111 999, tells the caller to ring it now and ends the call there. It doesn't book a job or give any other advice. The call is flagged for your team." },
  { cat: "callers", q: "Will it tell callers our callout charge and prices?",
    a: "Only as you word them. If you give us your callout charge, hourly rate or fixed prices, it says them exactly that way. If you would rather not quote on the phone, it says someone will confirm the price and books a visit. It never makes a price up." },
  { cat: "callers", q: "Can it take jobs from landlords, letting agents and tenants?",
    a: "Yes. It asks who is calling and follows your rules for each: who to contact for access, any job reference, who pays and whether a landlord or agent has to approve the work first. All of it goes in the job summary." },
  { cat: "callers", q: "Can the agent put a caller through to us?",
    a: "Yes, on the Growth and Scale plans. You set the rules: emergencies, complaints and anyone who asks for a person can be put through to the right phone, including whoever is on call. On the Starter plan, the agent takes a detailed message and it is emailed to you straight away." },
  { cat: "callers", q: "What happens when the agent doesn't know the answer?",
    a: "It says so. The agent answers only from information you have approved, so when a question falls outside that, it offers to take a message or transfer the call. We review those moments and add the answers worth adding." },
  { cat: "setup", q: "Can it book routine jobs and quote visits?",
    a: "Yes. It books into your diary by job type and length, such as a repair or a quote visit for a new bathroom, and keeps to the areas and time slots you set. Jobs that need a plumber to look first go to your team." },
  { cat: "setup", q: "Can callers send photos of the problem?",
    a: "Yes, if you want them to. The agent asks for photos and texts the caller where to send them. It also takes the full address, parking and access details, and puts it all in the job summary." },
  { cat: "setup", q: "Does it work with our job management software?",
    a: "It works with most diaries and job management systems. We check yours on the first call and tell you plainly what connects directly and what needs a workaround." },
  { cat: "setup", q: "Can we keep our phone number, or get a local one?",
    a: "You can keep your number and divert calls to the agent, either all of them or only the ones you miss while you're on a job. If you want a local number for a new area, we can set one up." },
  { cat: "setup", q: "How long does setup take?",
    a: "Starter goes live in 3 working days, Growth in 5 to 7 and Scale in 12 to 15. The clock starts once we have your prices, booking rules, on-call route and diary access. If your business is more complex than usual, we give you a realistic timeline after the discovery call, before you commit to anything." },
  { cat: "data", q: "Is customer data kept safe?",
    a: "You remain the data controller and OMH acts as your processor under a written data processing agreement, in line with UK GDPR. We agree what is stored, where and for how long before go-live." },
  { cat: "data", q: "Are calls recorded?",
    a: "Only if you want them to be. Callers are told at the start of the call, and recordings are deleted on the schedule you set." },
  { cat: "data", q: "Can it call customers back about quotes?",
    a: "Only customers who have agreed to it. We follow the UK PECR rules and act on opt-outs straight away; opt-outs are removed the same day. We don't run cold calling campaigns." },
  { cat: "working", q: "Will it replace our office staff?",
    a: "No. It takes the calls you miss while you're under a sink, driving between jobs or off for the night, so your team can get on with the work. You choose when it answers: only when you can't pick up, only out of hours, or first on every call. Anything awkward still goes to you." },
  { cat: "working", q: "How much does an AI receptionist for plumbers cost?",
    a: "Our AI receptionist for plumbers (the Starter plan) is £249 a month plus VAT with 300 minutes included, and a one-off setup fee from £795. Growth is £449 a month and Scale, for firms with several branches or teams, is £849 a month. Extra minutes cost 60p each on every plan." },
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
// The eight kinds of call a plumbing business gets, from emergencies to landlord jobs and after-hours calls.
const industries = [
  { id: "emergencies", icon: "drop", label: "Emergencies", full: "Burst pipes and leaks", tint: 3,
    time: "Call · Sat 23:10", status: "Emergency: office closed", caller: "A pipe's burst under the kitchen sink and there's water everywhere.", agent: "I'm sorry. I'm sending this to our plumber on call now. If you can, turn off the stopcock. It's usually under the kitchen sink.", booked: "Sent to the plumber on call: 23:11",
    h3: "Emergencies: sent to whoever is on call",
    p: "Burst pipes, leaks and no water can't wait until Monday. The agent takes the address and what is happening, gives only the safety steps you have approved and sends the job straight to whoever is on call.",
    bullets: ["Sends burst pipes, leaks and no-water calls to your plumber on call", "Gives only your approved safety steps, such as where to find the stopcock", "Smell of gas: gives the National Gas Emergency number, 0800 111 999, and stops"], note: "Never diagnoses a fault." },
  { id: "repairs", icon: "wrench", label: "Repairs", full: "Routine repairs", tint: 2,
    time: "Call · 10:35", status: "Team out on jobs", caller: "The toilet keeps running and the bathroom tap drips. Can someone come out this week?", agent: "Yes. I have Thursday morning, between 8 and 12. Shall I book that for you?", booked: "Repair booked: Thu 08:00 to 12:00",
    h3: "Repairs: booked into the diary while you work",
    p: "Dripping taps, running toilets and slow drains come in while everyone is on a job. The agent takes the details, checks your diary and books the visit by job type and area.",
    bullets: ["Books repairs by job type, length and area", "Moves and cancels visits without a call back", "Texts the customer a confirmation"] },
  { id: "quotes", icon: "clipboard", label: "Quotes", full: "Quote visits", tint: 1,
    time: "Call · Tue 19:20", status: "Office closed", caller: "We're thinking about a new bathroom. Could someone come and have a look?", agent: "Of course. I can book a quote visit on Saturday at 10. Is the bathroom upstairs or downstairs?", booked: "Quote visit booked: Sat 10:00",
    h3: "Quote visits: bigger jobs booked before they ring round",
    p: "Bathroom refits, new radiators and moving a sink are worth far more than a repair. The agent asks the questions you choose and books a quote visit with the right person.",
    bullets: ["Asks your questions about the job before the visit", "Books quote visits into the right diary", "Passes anything it can't answer to your team"] },
  { id: "landlords", icon: "key", label: "Landlords", full: "Landlords and letting agents", tint: 4,
    time: "Call · 09:05", status: "Two lines ringing", caller: "I'm calling from a letting agent. A tenant says the overflow pipe at one of our flats keeps dripping.", agent: "Thanks. I'll take the address, the tenant's number and your job reference. I can book a visit for tomorrow at 9.", booked: "Visit booked: Wed 09:00, access via tenant",
    h3: "Landlords and agents: jobs logged with every detail",
    p: "Landlords and letting agents report jobs for their tenants. The agent takes the property address, who to contact for access and any job reference, and follows your rules on who approves and pays.",
    bullets: ["Takes the address, access contact and job reference", "Follows your rules on who approves and pays for work", "Texts the caller a confirmation"] },
  { id: "tenants", icon: "home", label: "Tenants", full: "Tenants reporting a job", tint: 2,
    time: "Call · 17:50", status: "Office about to close", caller: "I rent my flat and the kitchen sink won't drain. Do I book with you or my landlord?", agent: "I can take the details now. Could I have your landlord's or letting agent's name, so we can check the job is approved?", booked: "Job logged: waiting for landlord approval",
    h3: "Tenants: details taken, approval checked",
    p: "Tenants often ring you direct when something goes wrong. The agent takes the details and follows your rules: book the job, or check with the landlord or agent first.",
    bullets: ["Takes the tenant's details and the landlord's or agent's name", "Books or holds the job, by your approval rules", "Logs every job for the office"] },
  { id: "prices", icon: "tag", label: "Prices", full: "Callout charges and prices", tint: 3,
    time: "Call · 13:15", status: "Lunch: nobody in the office", caller: "What's your callout charge, and do you charge by the hour?", agent: "I can read you our callout charge and hourly rate exactly as they're set, and text them to you. Would you like a visit booked too?", booked: "Answered from your price list",
    h3: "Prices: only as you word them",
    p: "Callers want to know the callout charge before they book. The agent gives your prices exactly as you word them, or says someone will confirm, and never makes a price up.",
    bullets: ["Gives your callout charge and prices word for word", "Says someone will confirm when you'd rather not quote", "Never guesses what a job will cost"], note: "No prices made up." },
  { id: "details", icon: "message", label: "Details", full: "Address, access and photos", tint: 1,
    time: "Call · 15:40", status: "Team out on jobs", caller: "It's the top-floor flat and the buzzer's broken. Can I send you a photo of the leak?", agent: "Yes. I've noted the buzzer. I'll text you now with where to send the photo.", booked: "Access noted, photo request sent",
    h3: "Details: address, access and photos taken first time",
    p: "A wasted trip costs a morning. The agent takes the full address, parking, access and key details, and asks for photos by text, so your plumber turns up ready.",
    bullets: ["Takes the address, postcode, parking and access details", "Asks for photos of the problem by text", "Puts it all in the job summary"] },
  { id: "afterhours", icon: "moon", label: "After hours", full: "Evenings and weekends", tint: 4,
    time: "Call · Sun 20:15", status: "Office closed until Monday", caller: "The outside tap's been dripping all week. Can someone come on Monday?", agent: "Yes. I can book you in on Monday afternoon, between 12 and 4. Shall I do that?", booked: "Booked: Mon 12:00 to 16:00",
    h3: "After hours: evenings, weekends and bank holidays covered",
    p: "Customers ring after work and at weekends, when voicemail picks up and many try someone else. The agent answers, books routine jobs, sends emergencies to whoever is on call and leaves a morning summary.",
    bullets: ["Answers evenings, weekends and bank holidays", "Books routine jobs from your diary", "Morning summary: who rang, what was booked, what needs a person"] },
];

const callVis = (x: { time: string; status: string; caller: string; agent: string; booked: string; tint: number }) => `
          <div class="mini"><span class="icon-tile">${icon("phone-missed")}</span><span class="min-w-0"><b class="block">${x.time}</b><span class="text-[14px] font-semibold text-ok">${x.status}</span></span></div>
          <div class="chat">
            <p><span class="who">Caller</span>${x.caller}</p>
            <p class="ai"><span class="who">Your AI agent</span>${x.agent}</p>
          </div>
          <span class="booked">${icon("check")}${x.booked}</span>`;

const industryTab = (x: (typeof industries)[number], i: number) =>
  `        <button type="button" role="tab" id="tab-${x.id}" aria-controls="uc-${x.id}" aria-selected="${i === 0}" tabindex="${i ? -1 : 0}" class="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-[var(--va-line-strong)] px-4 text-[16px] font-semibold aria-selected:border-ink aria-selected:bg-ink aria-selected:text-paper" data-tab data-track="plumber_call_type" data-track-name="${x.full}">${icon(x.icon)}${x.label}</button>`;

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
// The main page's plans, word for word except where a phrase names a business type: branches, customers,
// job software. Prices, minutes, setup fees and delivery times are the shared ones.
const swap: Record<string, string> = {
  "Books appointments into one calendar": "Books jobs into one diary",
  "More than one location": "More than one branch or team",
  "Writes each enquiry into your CRM or practice system": "Writes each job into your job management software",
  "Calls new web leads within 60 seconds": "Calls new website enquiries within 60 seconds",
  "Routes enquiries at the first question, for example sales, service or accounts": "Routes calls at the first question, for example emergencies, repairs or quotes",
  "Outbound follow-up to contacts who have consented, for quotes, reminders and no-shows": "Outbound calls to customers who have consented, for quotes, reminders and missed visits",
  "A second location, department or agent": "A second branch, team or agent",
  "Up to three locations or departments, each with its own script, voice and diary": "Up to three branches or teams, each with its own script, voice and diary",
  "Routing across branches by where the caller is or what they ask for": "Routing across branches by where the job is or what the caller needs",
  "Per-site reporting, so you can see which branch converts its calls": "Per-branch reporting, so you can see which branch converts its calls",
  "A fourth location or department (a priced add-on)": "A fourth branch or team (a priced add-on)",
};
const straps: Record<string, string> = {
  starter: "One business, one agent answering and booking. Best for a sole trader or small team with straightforward phones.",
  growth: "For a business where the phone brings in the work. Where most plumbers should start.",
  scale: "For firms with several branches or teams, each with its own diary, on one managed service.",
};
const plumbersPricing = {
  plans: mainPagePricing.plans.map((p) => ({ ...p, strap: straps[p.id], features: p.features.map((f) => swap[f] ?? f), excluded: p.excluded.map((f) => swap[f] ?? f) })),
  notes: mainPagePricing.notes.map(([k, v]) =>
    k === "Extra locations" ? ["Extra branches", v] : k === "Delivery" ? [k, "The clock starts once we have your prices, booking rules, on-call route and diary access."] : [k, v],
  ),
};
const plan = (p: (typeof plumbersPricing.plans)[number]) => {
  const shown = p.features.slice(0, 4);
  const rest = p.features.slice(4);
  return `      <article id="plan-${p.id}" class="relative flex flex-col rounded-[16px] border bg-surface p-6 sm:p-7 ${p.popular ? "border-gold shadow-[0_0_0_1px_var(--color-teal),0_28px_60px_-32px_rgb(var(--accent-rgb)/0.6)] lg:-mt-3 lg:mb-3" : "border-line"}" data-tier="${p.id}">
        ${p.popular ? '<span class="absolute -top-4 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-gold px-4 py-1.5 font-display text-[15px] font-semibold text-navy shadow-[0_10px_24px_-10px_rgb(var(--accent-rgb)/0.9)]">' + icon("plus-star", "!h-3.5 !w-3.5") + 'Where most plumbers start</span>' : ""}
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
// Six capabilities, each with a mock-up, what the agent does and what OMH does, for a plumbing business.
const capabilities = [
  { id: "answer", icon: "phone", title: "First-ring answering, 24/7",
    vis: `<div class="mini"><span class="icon-tile">${icon("phone")}</span><span class="min-w-0"><b class="block">Call · Sat 22:40</b><span class="text-[14px] font-semibold text-ok">Answered on the first ring</span></span></div>
          <div class="mini">${icon("users", "text-ok")}<span>Team on jobs: 3 callers answered at once</span></div>`,
    agent: "Every call answered straight away, whether you're under a sink, driving between jobs or off for the night. Evenings, weekends and bank holidays too. No voicemail and no engaged tone.",
    omh: "We divert your business line, set your hours and agree what it picks up and when: missed calls, out of hours or every call. Nothing goes live without your sign-off." },
  { id: "voice", icon: "mic", title: "Sounds like your business",
    vis: `<div class="mini"><span class="icon-tile">${icon("mic")}</span><span class="min-w-0"><b class="block">Megan · Your assistant</b><span class="text-[14px] text-muted">Your business name, greeting and voice</span></span></div>
          <div class="mini justify-center py-3"><span class="mini-wave"><i></i><i></i><i></i><i></i><i></i></span><span class="ml-2 text-[14px] font-semibold">"Good morning, Kestrel Plumbing, how can I help?"</span></div>`,
    agent: "Your business name, your greeting and a calm British voice. It stays steady with worried callers, takes addresses carefully, and OMH is never mentioned on a call.",
    omh: "We write the script around the real reasons customers ring you, then you make test calls and adjust it with us until it sounds like your business." },
  { id: "knows", icon: "book", title: "Knows your prices and areas",
    vis: `<div class="flex flex-wrap justify-center gap-2"><span class="mini-chip">${icon("check", "text-ok")}Callout charge</span><span class="mini-chip">${icon("check", "text-ok")}Prices</span><span class="mini-chip">${icon("check", "text-ok")}Areas</span><span class="mini-chip">${icon("check", "text-ok")}Opening hours</span><span class="mini-chip">${icon("check", "text-ok")}Safety steps</span></div>
          <div class="mini">${icon("book", "text-hl")}<span>Trained on <b>your</b> business, not the internet</span></div>`,
    agent: "It answers only from information you approve: your callout charge and prices as you word them, the areas you cover, your hours and the safety steps you allow. It never diagnoses a fault, and anything else goes to your team.",
    omh: "We load that information for you, and on Growth and Scale we read a sample of transcripts every month, see what it couldn't answer and add the answers worth adding." },
  { id: "books", icon: "calendar", title: "Books jobs into your diary without clashes",
    vis: `<div class="vcal-head"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span></div>
          <div class="vcal"><span class="busy"></span><span></span><span class="busy"></span><span></span><span class="busy"></span><span></span><span class="busy"></span><span class="new"></span><span class="busy"></span><span></span><span class="busy"></span><span></span><span></span><span class="busy"></span><span></span></div>
          <div class="mini">${icon("calendar", "text-ok")}<span><b>Quote visit booked:</b> Wed 11:00, no clash</span></div>`,
    agent: "It checks the live diary by plumber, job type and area, keeps to your booking rules and texts the customer a confirmation.",
    omh: "We connect your diary, plus your job management software on Growth and Scale, and tell you on the discovery call what connects directly and what needs a workaround." },
  { id: "transfer", icon: "transfer", title: "Emergencies put through to whoever is on call", plan: "Growth and Scale",
    vis: `<div class="mini"><span class="icon-tile">${icon("drop")}</span><span class="min-w-0"><b class="block">Caller reports a burst pipe</b><span class="text-[14px] text-muted">"There's water coming through the ceiling."</span></span></div>
          <div class="mini">${icon("transfer", "text-hl")}<span><b>Transferring to the plumber on call</b> with a quick briefing</span></div>`,
    agent: "Burst pipes, leaks, no water and anyone who asks for a person are put through to the right phone with a quick briefing first, so nobody repeats themselves. When nobody can take the call, it takes a detailed message and flags it as urgent.",
    omh: "You choose who gets put through and when: emergencies, complaints, landlords, anyone who asks for a person. We set those rules, including who is on call, and test them with you." },
  { id: "leads", icon: "timer", title: "Calls new enquiries back and follows up quotes", plan: "Growth and Scale",
    vis: `<div class="mini"><span class="icon-tile">${icon("globe")}</span><span class="min-w-0"><b class="block">New enquiry · 14:02</b><span class="text-[14px] text-muted">Bathroom refit quote request</span></span></div>
          <div class="mini">${icon("timer", "text-ok")}<span><b>Called back</b> in 42 seconds</span></div>
          <div class="mini justify-between"><span><b>Quote follow-up</b></span><span class="text-[14px] font-semibold text-ok">Visit booked</span></div>`,
    agent: "New enquiries from your website get a call within 60 seconds. It also calls customers who agreed to it about quotes you have sent, and books the job.",
    omh: "Every call is summarised and emailed to you; on Growth and Scale the details go into your job software, and on Scale calls answered, jobs booked and transfers are reported beside your Google Ads and website figures." },
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
export const plumbersMarkup = String.raw`
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
</svg>

<section id="what-is" data-component="WhatIs" class="on-band relative overflow-hidden bg-band text-band-ink">
  <div class="pointer-events-none absolute right-[-10%] top-1/2 h-[620px] w-[620px] -translate-y-1/2 rounded-full bg-gold/15 blur-3xl" aria-hidden="true"></div>
  <div class="container-omh relative grid grid-cols-[minmax(0,1fr)] items-start gap-10 py-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,.95fr)] lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-10 lg:py-24" data-brand
    data-brand-biz='[{"id":"burst","label":"Burst pipe","name":"Kestrel Plumbing","city":"Birmingham","num":"0121 496 0182","agent":"Megan","kind":"team&#39;s","initials":"KP","voice":"British English, calm and measured","never":"Diagnoses a fault","transfer":"Burst pipes go to the plumber on call","caller":"A pipe&#39;s burst under the kitchen sink and there&#39;s water everywhere.","reply":"I&#39;m sending this to our plumber on call now. If you can, turn off the stopcock. It&#39;s usually under the sink.","booked":"Sent to the plumber on call","summary":"Flagged urgent: burst pipe, address and access taken, stopcock step given"},{"id":"repair","label":"Repair","name":"Ashworth Plumbing &amp; Heating","city":"Manchester","num":"0161 496 0174","agent":"Sophie","kind":"office&#39;s","initials":"AP","voice":"British English, warm and friendly","never":"Quotes a price it has not been given","transfer":"Price questions go to the office","caller":"The toilet keeps running and the bathroom tap drips. Can someone come out this week?","reply":"Yes. I have Thursday morning, between 8 and 12. Shall I book it?","booked":"Repair booked: Thu 08:00 to 12:00","summary":"Job sheet sent to the office: running toilet and dripping tap, photos asked for by text"},{"id":"landlord","label":"Landlord","name":"Calder Valley Plumbing","city":"Leeds","num":"0113 496 0163","agent":"Hannah","kind":"team&#39;s","initials":"CV","voice":"British English, clear and upbeat","never":"Promises a time you have not set","transfer":"Invoice questions go to the office","caller":"I&#39;m calling from a letting agent. A tenant says the overflow pipe at one of our flats keeps dripping.","reply":"Thanks. I can book a visit for tomorrow at 9. Could I take the tenant&#39;s number for access?","booked":"Visit booked: Wed 09:00, access via tenant","summary":"Job logged for the agency: address, tenant contact and job reference taken"}]'>
    <div class="lg:col-start-1 lg:row-start-1">
      <h2>What is an AI receptionist <span class="hl">for plumbers?</span></h2>
      <p class="mt-5 text-band-muted">An AI receptionist for plumbers is software that answers and makes phone calls for your plumbing business in natural, spoken conversation. Some call it a plumbing AI receptionist; we call it an AI voice agent, because on Growth and Scale it does more than answer the phone. It works out whether the caller has an emergency, needs a repair or wants a quote, answers from prices and information you have approved, books jobs into your diary and sends emergencies to whoever is on call, with a summary of the call.</p>
      <p class="mt-4 text-band-muted">Callers don't press buttons or leave voicemails. They say what they need, and the agent responds the way a well-trained office manager would. The difference with OMH is that we set it up and run it for you: we write the script around your real calls, connect your diary and job software, and keep improving it. See our <a href="/ai-voice-agents/receptionist">AI receptionist plan</a> if you only need the phone answered.</p>
      <p class="mt-4 text-band-muted">Work across more than plumbing? See our <a href="/ai-voice-agents/trades">AI receptionist for trades</a>, which covers electricians, roofers, carpenters and other trades.</p>
    </div>

    <div class="order-last lg:order-none lg:col-start-1 lg:row-start-2">
      <h3 class="!text-[22px]">How a call goes</h3>
      <p class="mt-1 text-[16px] text-band-muted">Watch the phone. Each step lights up as the call reaches it.</p>
      <ol class="mt-5 space-y-2.5" aria-live="off">
        <li class="flex gap-4 rounded-[14px] border border-band-line p-4" data-brand-step="1"><span class="step-num" aria-hidden="true">1</span><span class="text-[16px] leading-snug"><strong class="block font-display text-[17.5px] font-semibold">It listens.</strong><span class="text-band-muted">It hears whether it's an emergency, a repair, a quote or a landlord job as the caller speaks.</span></span></li>
        <li class="flex gap-4 rounded-[14px] border border-band-line p-4" data-brand-step="2"><span class="step-num" aria-hidden="true">2</span><span class="text-[16px] leading-snug"><strong class="block font-display text-[17.5px] font-semibold">It works out the answer.</strong><span class="text-band-muted">It matches the request to your diary, fees and booking rules.</span></span></li>
        <li class="flex gap-4 rounded-[14px] border border-band-line p-4" data-brand-step="3"><span class="step-num" aria-hidden="true">3</span><span class="text-[16px] leading-snug"><strong class="block font-display text-[17.5px] font-semibold">It replies and acts.</strong><span class="text-band-muted">It answers in a natural voice, books the job or puts the call through.</span></span></li>
        <li class="flex gap-4 rounded-[14px] border border-band-line p-4" data-brand-step="4"><span class="step-num" aria-hidden="true">4</span><span class="text-[16px] leading-snug"><strong class="block font-display text-[17.5px] font-semibold">It reports back.</strong><span class="text-band-muted">Your team gets a summary of every call. Callers can interrupt or change their mind at any point.</span></span></li>
      </ol>
    </div>

    <div class="mx-auto w-full max-w-[420px] lg:col-start-2 lg:row-span-2 lg:row-start-1">
      <div class="rounded-[14px] border border-band-line bg-band-surface p-4 sm:p-5">
        <p class="font-display text-[18px] font-semibold">Try it: pick a call and a tone, then listen in</p>
        <div class="mt-3 flex flex-wrap items-center gap-2">
          <div role="radiogroup" aria-label="Call" class="flex flex-wrap gap-2" data-brand-group="biz">
            <button type="button" role="radio" aria-checked="true" tabindex="0" class="min-h-[44px] rounded-full border border-[rgb(247_246_242/.35)] px-4 text-[15.5px] font-semibold text-band-ink aria-checked:border-gold aria-checked:bg-gold aria-checked:text-navy" data-brand-opt="burst" data-track="branding_biz" data-track-name="Burst pipe">Burst pipe</button>
            <button type="button" role="radio" aria-checked="false" tabindex="-1" class="min-h-[44px] rounded-full border border-[rgb(247_246_242/.35)] px-4 text-[15.5px] font-semibold text-band-ink aria-checked:border-gold aria-checked:bg-gold aria-checked:text-navy" data-brand-opt="repair" data-track="branding_biz" data-track-name="Repair">Repair</button>
            <button type="button" role="radio" aria-checked="false" tabindex="-1" class="min-h-[44px] rounded-full border border-[rgb(247_246_242/.35)] px-4 text-[15.5px] font-semibold text-band-ink aria-checked:border-gold aria-checked:bg-gold aria-checked:text-navy" data-brand-opt="landlord" data-track="branding_biz" data-track-name="Landlord">Landlord</button>
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
            <span class="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[var(--color-teal)] font-display text-[18px] font-semibold text-[#000]" aria-hidden="true" data-brand-initials>KP</span>
            <span class="min-w-0"><span class="block truncate font-display text-[17px] font-semibold leading-tight" data-brand-name>Kestrel Plumbing</span><span class="block text-[13.5px] text-[rgb(0_0_0/0.68)]"><span class="tnum" data-brand-num>0121 496 0182</span>, <span data-brand-city>Birmingham</span></span></span>
            <span class="ml-auto shrink-0 text-[13px] font-semibold text-[#1c6446]"><span class="mr-1 inline-block h-2 w-2 rounded-full bg-[#1c6446] align-middle"></span><span class="tnum" data-brand-timer>00:00</span></span>
          </div>
          <div class="mt-4 space-y-2.5 text-[14.5px] leading-[1.45]">
            <div class="rounded-[4px_14px_14px_14px] bg-white p-3 shadow-[0_10px_30px_-20px_rgb(0_0_0/0.6)]">
              <div class="flex items-center gap-2"><span class="text-[12.5px] font-semibold text-[var(--color-amber-deep)]"><span data-brand-agent>Megan</span>, AI assistant</span><svg viewBox="0 0 168 40" class="brand-wave h-5 flex-1" aria-hidden="true" data-brand-wave><rect x="1" y="13" width="3" height="14" rx="1.5" style="--d:0s"/><rect x="7" y="3" width="3" height="34" rx="1.5" style="--d:0.09s"/><rect x="13" y="15.5" width="3" height="9" rx="1.5" style="--d:0.18s"/><rect x="19" y="6" width="3" height="28" rx="1.5" style="--d:0.27s"/><rect x="25" y="14.5" width="3" height="11" rx="1.5" style="--d:0.36s"/><rect x="31" y="12" width="3" height="16" rx="1.5" style="--d:0.45s"/><rect x="37" y="5.5" width="3" height="29" rx="1.5" style="--d:0.54s"/><rect x="43" y="8" width="3" height="24" rx="1.5" style="--d:0s"/><rect x="49" y="7" width="3" height="26" rx="1.5" style="--d:0.09s"/><rect x="55" y="10" width="3" height="20" rx="1.5" style="--d:0.18s"/><rect x="61" y="10.5" width="3" height="19" rx="1.5" style="--d:0.27s"/><rect x="67" y="15" width="3" height="10" rx="1.5" style="--d:0.36s"/><rect x="73" y="3.5" width="3" height="33" rx="1.5" style="--d:0.45s"/><rect x="79" y="16" width="3" height="8" rx="1.5" style="--d:0.54s"/><rect x="85" y="4" width="3" height="32" rx="1.5" style="--d:0s"/><rect x="91" y="16.5" width="3" height="7" rx="1.5" style="--d:0.09s"/><rect x="97" y="11.5" width="3" height="17" rx="1.5" style="--d:0.18s"/><rect x="103" y="7.5" width="3" height="25" rx="1.5" style="--d:0.27s"/><rect x="109" y="8" width="3" height="24" rx="1.5" style="--d:0.36s"/><rect x="115" y="7" width="3" height="26" rx="1.5" style="--d:0.45s"/><rect x="121" y="8" width="3" height="24" rx="1.5" style="--d:0.54s"/><rect x="127" y="11" width="3" height="18" rx="1.5" style="--d:0s"/><rect x="133" y="17" width="3" height="6" rx="1.5" style="--d:0.09s"/><rect x="139" y="5" width="3" height="30" rx="1.5" style="--d:0.18s"/><rect x="145" y="16.5" width="3" height="7" rx="1.5" style="--d:0.27s"/><rect x="151" y="3" width="3" height="34" rx="1.5" style="--d:0.36s"/><rect x="157" y="15.5" width="3" height="9" rx="1.5" style="--d:0.45s"/><rect x="163" y="10" width="3" height="20" rx="1.5" style="--d:0.54s"/></svg></div>
              <p class="mt-2 min-h-[64px]" aria-hidden="true">&ldquo;<span data-brand-greeting>Good morning, Kestrel Plumbing. I'm Megan, the team's AI assistant. How can I help you today?</span><span class="brand-caret" data-brand-caret></span>&rdquo;</p>
              <p class="sr-only" aria-live="polite" data-brand-live></p>
            </div>
            <div class="ml-8 rounded-[14px_4px_14px_14px] bg-[#000] p-3 text-[#f7f6f2]" data-brand-line="caller"><span class="block text-[12.5px] font-semibold text-[rgb(247_246_242/0.6)]">Caller</span><span data-brand-caller>A pipe's burst under the kitchen sink and there's water everywhere.</span></div>
            <div class="rounded-[4px_14px_14px_14px] bg-white p-3 shadow-[0_10px_30px_-20px_rgb(0_0_0/0.6)]" data-brand-line="agent"><span class="block text-[12.5px] font-semibold text-[var(--color-amber-deep)]"><span data-brand-agent2>Megan</span></span><span class="font-semibold" data-brand-reply>I'm sending this to our plumber on call now. If you can, turn off the stopcock. It's usually under the sink.</span></div>
            <p class="booked !text-[14px]" data-brand-outcome>${icon("check")}<span data-brand-booked>Sent to the plumber on call</span></p>
            <p class="flex items-center gap-2 rounded-[10px] bg-white/70 px-3 py-2 text-[13.5px]" data-brand-line="summary">${icon("mail", "shrink-0 text-hl")}<span data-brand-summary>Flagged urgent: burst pipe, address and access taken, stopcock step given</span></p>
          </div>
          <div class="mt-4 flex items-center justify-center gap-6">
            <button type="button" class="grid h-12 w-12 place-items-center rounded-full bg-[#000] text-[#f7f6f2] hover:bg-[#262626]" data-brand-replay data-track="branding_replay" aria-label="Replay the call">${icon("replay")}</button>
            <span class="grid h-12 w-12 place-items-center rounded-full bg-[#a3352b] text-white" aria-hidden="true">${icon("phone", "rotate-[135deg]")}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="features" data-component="Features" class="border-y border-line bg-surface">
  <div class="container-omh py-14 lg:py-20">
    <p class="eyebrow"><span class="eyebrow-mark" aria-hidden="true"><i></i><i></i><i></i></span>What's included</p>
    <h2>What it does for your business,<br class="max-sm:hidden"> <span class="hl">and what we run for you</span></h2>
    <p class="mt-5 text-muted">Emergencies, repairs, quote visits, landlord jobs and the questions in between, handled the way a good office manager would. Pick a capability to see it in action. Features marked Growth and Scale aren't on Starter.</p>

    <div class="mt-10 grid gap-5 lg:grid-cols-[minmax(0,.4fr)_minmax(0,.6fr)] lg:items-start" data-tabs>
      <div role="tablist" aria-label="Capabilities" aria-orientation="vertical" class="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
${capabilities.map(capTab).join("\n")}
      </div>
${capabilities.map(capPanel).join("\n")}
    </div>

    <h3 class="mt-14 !text-[24px]">You and your plumbers stay <span class="hl">in charge</span></h3>
    <p class="mt-3 text-muted">You decide the rules before it answers a single call. Out of hours, emergencies go to whoever is on call, never to a voicemail. If a caller mentions a smell of gas, it gives the National Gas Emergency number, 0800 111 999, and goes no further.</p>
    <div class="mt-6 grid gap-4 md:grid-cols-3">
      <div class="hover-card rounded-[16px] border border-line bg-surface p-5 sm:p-6">
        <p class="flex items-center gap-3 font-display text-[19px] font-semibold"><span class="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ok text-surface">${icon("check")}</span>It handles</p>
        <ul class="mt-4 space-y-2 text-[16px] leading-snug text-muted">
            <li class="flex gap-2.5"><span aria-hidden="true" class="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-50"></span><span>Repairs, quote visits and changes</span></li>
            <li class="flex gap-2.5"><span aria-hidden="true" class="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-50"></span><span>Address, access and parking details</span></li>
            <li class="flex gap-2.5"><span aria-hidden="true" class="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-50"></span><span>Areas you cover and opening hours</span></li>
            <li class="flex gap-2.5"><span aria-hidden="true" class="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-50"></span><span>Callout charges and prices, as you word them</span></li>
        </ul>
      </div>
      <div class="hover-card rounded-[16px] border border-line bg-surface p-5 sm:p-6">
        <p class="flex items-center gap-3 font-display text-[19px] font-semibold"><span class="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold text-navy">${icon("transfer")}</span>It hands to your team</p>
        <ul class="mt-4 space-y-2 text-[16px] leading-snug text-muted">
            <li class="flex gap-2.5"><span aria-hidden="true" class="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-50"></span><span>Burst pipes, leaks and no water</span></li>
            <li class="flex gap-2.5"><span aria-hidden="true" class="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-50"></span><span>Complaints and invoice queries</span></li>
            <li class="flex gap-2.5"><span aria-hidden="true" class="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-50"></span><span>Anyone who asks for a person</span></li>
            <li class="flex gap-2.5"><span aria-hidden="true" class="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-50"></span><span>Questions it has no approved answer for</span></li>
        </ul>
      </div>
      <div class="hover-card rounded-[16px] border border-line bg-surface p-5 sm:p-6">
        <p class="flex items-center gap-3 font-display text-[19px] font-semibold"><span class="grid h-9 w-9 shrink-0 place-items-center rounded-full border-[1.5px] border-[var(--va-line-strong)] text-muted">${icon("x")}</span>It never</p>
        <ul class="mt-4 space-y-2 text-[16px] leading-snug text-muted">
            <li class="flex gap-2.5"><span aria-hidden="true" class="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-50"></span><span>Diagnoses a fault or gives repair advice</span></li>
            <li class="flex gap-2.5"><span aria-hidden="true" class="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-50"></span><span>Makes up a price or an arrival time</span></li>
            <li class="flex gap-2.5"><span aria-hidden="true" class="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-50"></span><span>Pretends to be a person</span></li>
            <li class="flex gap-2.5"><span aria-hidden="true" class="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-50"></span><span>Calls customers who have not agreed to it</span></li>
        </ul>
      </div>
    </div>
    <div class="mt-5 flex flex-col gap-4 rounded-[16px] border border-line bg-surface p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
      <div class="min-w-0">
        <p class="font-display text-[18px] font-semibold">Works alongside your job software</p>
        <p class="mt-1 text-[16px] text-muted">Bookings and notes go where your team already looks. We check your setup on the first call and tell you plainly what connects directly and what needs a workaround.</p>
      </div>
      <ul class="flex shrink-0 flex-wrap gap-2 lg:max-w-[460px] lg:justify-end" aria-label="Job software plumbing teams use">
        <li class="rounded-full border border-line bg-paper px-3.5 py-1.5 text-[15px] font-semibold">Jobber</li><li class="rounded-full border border-line bg-paper px-3.5 py-1.5 text-[15px] font-semibold">Tradify</li><li class="rounded-full border border-line bg-paper px-3.5 py-1.5 text-[15px] font-semibold">ServiceM8</li><li class="rounded-full border border-line bg-paper px-3.5 py-1.5 text-[15px] font-semibold">Commusoft</li><li class="rounded-full border border-line bg-paper px-3.5 py-1.5 text-[15px] font-semibold">Google Calendar</li><li class="rounded-full border border-line bg-paper px-3.5 py-1.5 text-[15px] font-semibold">Microsoft 365</li>
      </ul>
    </div>
  </div>
</section>

<section id="use-cases" data-component="Industries">
  <div class="container-omh py-14 lg:py-20">
    <p class="eyebrow"><span class="eyebrow-mark" aria-hidden="true"><i></i><i></i><i></i></span>Use cases</p>
    <h2>Plumbing use cases <span class="hl">by type of call</span></h2>
    <p class="mt-5 text-muted">A plumbing business gets the same eight kinds of call, day in, day out, and any AI receptionist for plumbing services has to handle all of them. We script your agent around each one. Pick a call to see how the agent handles it.</p>
    <div class="mt-8" data-tabs>
      <div role="tablist" aria-label="Choose a type of call" class="flex flex-wrap gap-2">
${industries.map(industryTab).join("\n")}
      </div>
${industries.map(industryPanel).join("\n")}
    </div>
    <div class="fit-band mt-8 flex flex-col gap-4 rounded-[16px] bg-sand p-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p class="font-display text-[18px] font-semibold">Not sure how your calls would fit?</p>
        <p class="mt-1 text-[16px] text-muted">Tell us who rings your business and why. We'll map your calls and show you what the agent would handle and what it would pass to you.</p>
      </div>
      ${primaryCta("industries_book_demo", "shrink-0")}
    </div>
  </div>
</section>

<section id="pricing" data-component="Pricing" class="border-y border-line bg-surface">
  <div class="container-omh py-14 lg:py-20">
    <p class="eyebrow"><span class="eyebrow-mark" aria-hidden="true"><i></i><i></i><i></i></span>Pricing</p>
    <h2>AI voice agent pricing <span class="hl">for plumbers</span></h2>
    <p class="mt-5 text-muted">Three plans, billed monthly, no minimum contract. Every plan includes a managed agent, a British voice, a summary of every call and a monthly report. Prices exclude VAT.</p>

    <div class="mt-10 grid gap-5 lg:grid-cols-3 lg:items-stretch">
${plumbersPricing.plans.map(plan).join("\n")}
    </div>

    <dl class="mt-12 border-t border-line">
${plumbersPricing.notes.map(([k, v]) => `      <div class="grid gap-1 border-b border-line py-4 sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-8"><dt class="text-[16px] font-semibold uppercase tracking-[0.14em] text-muted">${k}</dt><dd class="text-[16px] leading-[1.5]">${v}</dd></div>`).join("\n")}
    </dl>
  </div>
</section>

`;
