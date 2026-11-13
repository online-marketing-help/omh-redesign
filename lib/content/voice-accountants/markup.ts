// Body of /ai-voice-agents/accountants-financial-advisers (26 Oct 2026): the rebuilt sections of /ai-voice-agents
// (what-is with the call player, capabilities, pricing) plus two sections of their own (firms we cover, regulated
// firms), written for UK accountants, financial advisers, mortgage brokers and insurance brokers. Same structure,
// classes and data-* hooks as lib/content/ai-voice-agents-markup.ts (via lib/content/voice-law/markup.ts). Composed
// by components/voice-agents/AccountantsPage.tsx.
// Copy: the client's page brief (OMH AI Voice Agent Accountants & Financial Advisers Page Content, October 2026),
// word for word. Firms, people and numbers are fictional (Ofcom drama numbers).
import { mainPagePricing } from "@/lib/content/voice-pricing";

export const accountantsFaqTopics = { callers: "Callers and AI", clients: "Clients and calls", systems: "Systems and data", working: "Working with us" };

/** The FAQ section. AccountantsPage.tsx builds the FAQPage JSON-LD from this list. */
export const accountantsFaqs: { q: string; a: string; cat: keyof typeof accountantsFaqTopics }[] = [
  { cat: "callers", q: "Will callers know they are talking to an AI?",
    a: "Yes. Every agent says it is an AI assistant at the start of the call. Anyone who would rather speak to a person can ask, and the agent takes a message or puts them through, depending on your plan." },
  { cat: "callers", q: "Does it give financial, tax or mortgage advice?",
    a: "No. It never gives advice or recommends a product. It answers only from information you have approved and passes anything that needs advice to a qualified person." },
  { cat: "clients", q: "Which firms do you set it up for?",
    a: "Accountants and bookkeepers, financial advisers, mortgage brokers and insurance brokers, plus tax advisers, payroll bureaus and wealth managers. Solicitors have their own page." },
  { cat: "clients", q: "Can it put clients through to their own accountant or adviser?",
    a: "Yes, on Growth and Scale. You set the rules, and the agent passes the caller across with everything they said. If that person is busy, it takes a full message." },
  { cat: "clients", q: "Can it cope with the January self-assessment rush?",
    a: "Yes. It answers several calls at once, so no client hears an engaged tone, and it books follow-ups into the diaries you choose." },
  { cat: "clients", q: "Can it chase clients for documents?",
    a: "Yes, on Growth and Scale. It calls existing clients about the records you are waiting for, using wording you approve, and logs each call." },
  { cat: "systems", q: "Does it work with our practice software?",
    a: "It works with most diaries. What else connects depends on the software you use, and we confirm it on the discovery call." },
  { cat: "systems", q: "Are calls recorded?",
    a: "Only if you want them to be. If your firm needs calls recorded and kept, we agree the setup with your compliance team before go-live, and callers are told at the start of the call." },
  { cat: "systems", q: "Is client data kept safe?",
    a: "You remain the data controller and OMH acts as your processor under a written data processing agreement, in line with UK GDPR. We agree what is stored, where and for how long before go-live." },
  { cat: "systems", q: "Can we keep our phone number, or get a local one?",
    a: "Both. You can divert your existing line to the agent, or we can set up a new number with your local area code." },
  { cat: "working", q: "How long does setup take?",
    a: "Starter goes live in 3 working days, Growth in 5 to 7 and Scale in 12 to 15. The clock starts once we have your services, fees, approved wording and diary access." },
  { cat: "working", q: "Will it replace our receptionist?",
    a: "No. Most firms use it to catch the calls nobody can answer: in meetings, at lunch, after hours and in January. If you have a receptionist, it takes the overflow and passes calls on with the details already written down." },
  { cat: "working", q: "How much does an AI receptionist for accountants cost?",
    a: "Our AI receptionist for accountants (the Starter plan) is £249 a month plus VAT with 300 minutes included, and a one-off setup fee from £795. Growth is £449 a month and Scale, for firms with several offices, is £849 a month. Extra minutes cost 60p each on every plan." },
  { cat: "working", q: "Is there a minimum contract?",
    a: "No. Every plan is billed monthly with 30 days' notice." },
];

const icon = (name: string, cls = "") => `<svg class="icon${cls && " " + cls}" aria-hidden="true" focusable="false"><use href="#i-${name}"/></svg>`;
const tick = (text: string) => `<li class="flex gap-2.5">${icon("check", "mt-[3px] text-hl")}<span>${text}</span></li>`;
const cross = (text: string) => `<li class="flex gap-2.5">${icon("x", "mt-[3px]")}<span>${text}</span></li>`;
const tag = (text: string) => `<span class="tag">${text}</span>`;
const primaryCta = (track: string, cls = "") =>
  `<a href="#book-demo-form" class="btn btn-primary${cls && " " + cls}" data-track="${track}">Book a 30-Minute Demo</a>`;

/* ------------------------------------------------------- Firms we cover */
// Section 4 of the brief: one card per kind of firm, each with the rule the agent keeps (no advice), plus a card
// for the firms without a page of their own. Card pattern: the #day moments cards with the use-case bullets.
const firms: { id: string; icon: string; h3: string; strap: string; p: string; bullets?: string[]; note?: string }[] = [
  { id: "accountants", icon: "clipboard", h3: "AI Receptionist for Accountants",
    strap: "Every client rings in the same three weeks of January.",
    p: "Our AI receptionist for accountants takes new enquiries by type of work, books meetings and passes existing clients to the accountant who looks after them.",
    bullets: ["Takes new enquiries: self-assessment, limited company accounts, VAT, payroll or bookkeeping", "Books meetings and calls into the right accountant's diary", "Chases clients for missing records and receipts, on Growth and Scale"],
    note: "Never gives tax advice" },
  { id: "advisers", icon: "users", h3: "AI Receptionist for Financial Advisers",
    strap: "Advisers are in reviews, not at the phone.",
    p: "An AI receptionist for financial advisers books first meetings and annual reviews, takes the details your team asks for before a first meeting, and puts existing clients through to their own adviser.",
    bullets: ["Books first meetings and annual reviews", "Routes existing clients to their adviser, or takes a full message", "Explains how your fees work, as you word them"],
    note: "Never discusses products, performance or advice" },
  { id: "mortgage", icon: "home", h3: "AI Receptionist for Mortgage Brokers",
    strap: "A buyer with an offer accepted won't wait until tomorrow.",
    p: "Our AI receptionist for mortgage brokers takes new enquiries (purchase, remortgage or buy-to-let), asks about timescale and books a first call with an adviser while the buyer is still keen.",
    bullets: ["Sorts purchase, remortgage and buy-to-let enquiries", "Books first calls with an adviser, including evenings if you offer them", "Passes urgent cases, such as a completion date, straight to your team"],
    note: "Never quotes rates or says whether someone will be accepted" },
  { id: "insurance", icon: "shield", h3: "AI Receptionist for Insurance Brokers",
    strap: "Renewals, new quotes and claims all ring the same number.",
    p: "An AI receptionist for insurance brokers sorts new quote requests from renewals and claims, takes the details each team needs and sends every call to the right person.",
    bullets: ["Takes new quote details: type of cover, renewal date, business or personal", "Routes renewals and policy questions to the right handler", "Logs new claims and passes them to your claims team at once"],
    note: "Never confirms cover or makes a claim decision" },
  { id: "other", icon: "message", h3: "Another kind of firm?",
    strap: "If your clients call you, the agent can answer them.",
    p: `We also set the agent up for bookkeepers, tax advisers, payroll bureaus and wealth managers. Solicitors have their own page: see our <a href="/ai-voice-agents/law-firms" class="font-semibold text-ink underline decoration-gold decoration-2 underline-offset-4 hover:text-hl">law firms page</a>. Tell us what your callers ask, and we'll show you how the agent would handle it on the demo.` },
];

const firmCard = (f: (typeof firms)[number]) => `      <article id="firm-${f.id}" class="hover-card flex flex-col rounded-[16px] border border-line bg-paper p-5 sm:p-6">
        <p class="flex items-center gap-3"><span class="icon-tile">${icon(f.icon)}</span><span class="font-display text-[17px] font-semibold leading-tight">${f.strap}</span></p>
        <h3 class="mt-4 !text-[clamp(21px,19px+.4vw,24px)]">${f.h3}</h3>
        <p class="mt-3 text-[16px] text-muted">${f.p}</p>
${f.bullets ? `        <ul class="mt-4 space-y-2 text-[16px] leading-snug">\n${f.bullets.map(tick).join("\n")}\n        </ul>\n` : ""}${f.note ? `        <p class="mt-5 inline-flex items-center gap-2 self-start rounded-[10px] border border-line bg-surface px-3 py-2 text-[15px] font-semibold">${icon("shield", "text-hl")}${f.note}</p>\n` : ""}      </article>`;

/* -------------------------------------------------------- Regulated firms */
// Section 5 of the brief: the page's one angle, OMH's experience with FCA-regulated firms. Six rules, one card each.
const rules: [string, string, string][] = [
  ["shield", "No advice, ever.", "The agent never gives financial, tax, mortgage or insurance advice and never recommends a product. Anything that needs advice goes to a qualified person."],
  ["book", "Approved wording only.", "It reads out only the information and wording you have signed off, word for word."],
  ["mic", "It says it is an AI.", "Every call starts with the agent saying it is an AI assistant."],
  ["clock", "Recording to your rules.", "If your firm needs calls recorded and kept, we agree the recording and retention setup with your compliance team before go-live."],
  ["phone", "Call-backs with consent.", "It only calls people who have asked to hear from you or are existing clients. We follow UK PECR rules and screen against the Telephone Preference Service where required."],
  ["key", "Your data, your control.", "You remain the data controller and OMH acts as your processor under a written data processing agreement, in line with UK GDPR."],
];

const ruleCard = ([ico, title, text]: (typeof rules)[number]) => `      <li class="hover-card rounded-[16px] border border-line bg-paper p-5 sm:p-6">
        <p class="flex items-center gap-3 font-display text-[19px] font-semibold"><span class="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold text-navy">${icon(ico)}</span>${title}</p>
        <p class="mt-3 text-[16px] text-muted">${text}</p>
      </li>`;

/* --------------------------------------------------------------- Pricing */
// The main page's plans, word for word except where a phrase names a business type: firms, offices, clients,
// accountants and advisers. Prices, minutes, setup fees and delivery times are the shared ones. The brief's four
// bullets for each plan are the ones shown before "Everything included and what isn't".
const swap: Record<string, string> = {
  "Books appointments into one calendar": "Books meetings into one diary",
  "More than one location": "More than one office",
  "Live transfer to a person, with everything the caller already said passed across": "Live transfer to the right accountant or adviser, with everything the caller already said passed across",
  "Writes each enquiry into your CRM or practice system": "Writes each enquiry into your practice software or CRM",
  "Calls new web leads within 60 seconds": "Calls back new enquiries and chases documents",
  "Routes enquiries at the first question, for example sales, service or accounts": "Routes calls at the first question, for example new enquiry, existing client or claim",
  "Outbound follow-up to contacts who have consented, for quotes, reminders and no-shows": "Outbound calls to clients who have consented, for documents, reminders and missed meetings",
  "A second location, department or agent": "A second office, team or agent",
  "Up to three locations or departments, each with its own script, voice and diary": "Up to three offices or teams, each with its own script, voice and diary",
  "Routing across branches by where the caller is or what they ask for": "Routing across offices by client, service or location",
  "Per-site reporting, so you can see which branch converts its calls": "Per-office reporting, so you can see which office converts its calls",
  "A fourth location or department (a priced add-on)": "A fourth office or team (a priced add-on)",
};
const straps: Record<string, string> = {
  starter: "One office, one agent answering and booking. Best for a small firm with straightforward phones.",
  growth: "For a firm where the phone brings in new clients. Where most firms should start.",
  scale: "For firms with several offices or teams, each with its own diary, on one managed service.",
};
// The brief's four bullets per plan come first; the rest of the shared list follows under the details toggle.
const top: Record<string, string[]> = {
  starter: ["Answers every inbound call, day and night, on your existing number", "Answers only from your approved information", "Books meetings into one diary", "Takes a proper message when it can't help, with name, number and reason"],
  growth: ["Everything in Starter", "Live transfer to the right accountant or adviser, with everything the caller already said passed across", "Out-of-hours and overflow rules you set", "Calls back new enquiries and chases documents"],
  scale: ["Everything in Growth", "Up to three offices or teams, each with its own script, voice and diary", "Routing across offices by client, service or location", "Per-office reporting, so you can see which office converts its calls"],
};
const accountantsPricing = {
  plans: mainPagePricing.plans.map((p) => {
    const features = p.features.map((f) => swap[f] ?? f);
    return { ...p, strap: straps[p.id], features: [...top[p.id], ...features.filter((f) => !top[p.id].includes(f))], excluded: p.excluded.map((f) => swap[f] ?? f) };
  }),
  notes: mainPagePricing.notes.filter(([k]) => k !== "Delivery").map(([k, v]) => (k === "Extra locations" ? ["Extra offices", v] : [k, v])),
};
const plan = (p: (typeof accountantsPricing.plans)[number]) => {
  const shown = p.features.slice(0, 4);
  const rest = p.features.slice(4);
  return `      <article id="plan-${p.id}" class="relative flex flex-col rounded-[16px] border bg-surface p-6 sm:p-7 ${p.popular ? "border-gold shadow-[0_0_0_1px_var(--color-teal),0_28px_60px_-32px_rgb(var(--accent-rgb)/0.6)] lg:-mt-3 lg:mb-3" : "border-line"}" data-tier="${p.id}">
        ${p.popular ? '<span class="absolute -top-4 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-gold px-4 py-1.5 font-display text-[15px] font-semibold text-navy shadow-[0_10px_24px_-10px_rgb(var(--accent-rgb)/0.9)]">' + icon("plus-star", "!h-3.5 !w-3.5") + 'Where most firms start</span>' : ""}
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
// Six capabilities, each with a mock-up, what the agent does and what OMH does, for a firm's phones (brief section 6).
const capabilities = [
  { id: "answer", icon: "phone", title: "First-ring answering, 24/7",
    vis: `<div class="mini"><span class="icon-tile">${icon("phone")}</span><span class="min-w-0"><b class="block">Call · Mon 09:00</b><span class="text-[14px] font-semibold text-ok">Answered on the first ring</span></span></div>
          <div class="mini">${icon("users", "text-ok")}<span>January: 5 callers answered at once</span></div>`,
    agent: "Every call answered straight away, while your team is in meetings or the office has closed. Several callers answered at once in January. No voicemail and no engaged tone.",
    omh: "We divert your line, set your hours and agree what it picks up and when: missed calls, out of hours or every call. Nothing goes live without your sign-off." },
  { id: "voice", icon: "mic", title: "Sounds like your firm",
    vis: `<div class="mini"><span class="icon-tile">${icon("mic")}</span><span class="min-w-0"><b class="block">Grace · Your assistant</b><span class="text-[14px] text-muted">Your firm's name, greeting and voice</span></span></div>
          <div class="mini justify-center py-3"><span class="mini-wave"><i></i><i></i><i></i><i></i><i></i></span><span class="ml-2 text-[14px] font-semibold">"Good morning, Harlow &amp; Finch Accountants, how can I help?"</span></div>`,
    agent: "A natural British voice that greets callers with your firm's name and keeps calls clear, polite and professional.",
    omh: "We pick the voice and tone with you, write the greeting and test it until it sounds right for your clients." },
  { id: "knows", icon: "book", title: "Knows your services, fees and team",
    vis: `<div class="flex flex-wrap justify-center gap-2"><span class="mini-chip">${icon("check", "text-ok")}Services</span><span class="mini-chip">${icon("check", "text-ok")}Fees</span><span class="mini-chip">${icon("check", "text-ok")}Your team</span><span class="mini-chip">${icon("check", "text-ok")}Office hours</span><span class="mini-chip">${icon("check", "text-ok")}Deadlines</span></div>
          <div class="mini">${icon("book", "text-hl")}<span>Trained on <b>your</b> firm, not the internet</span></div>`,
    agent: "Explains your services and fees as you word them and knows who looks after which clients.",
    omh: "We load your services, fee information and team, and update them whenever you send us changes." },
  { id: "books", icon: "calendar", title: "Books meetings without clashes",
    vis: `<div class="vcal-head"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span></div>
          <div class="vcal"><span class="busy"></span><span></span><span class="busy"></span><span></span><span class="busy"></span><span></span><span class="busy"></span><span class="new"></span><span class="busy"></span><span></span><span class="busy"></span><span></span><span></span><span class="busy"></span><span></span></div>
          <div class="mini">${icon("calendar", "text-ok")}<span><b>Meeting booked:</b> Wed 11:00, no clash</span></div>`,
    agent: "Offers real slots from the right diary and books the meeting with the caller's details attached.",
    omh: "We connect your diaries and set the rules: meeting lengths, who sees new clients and how much notice you need." },
  { id: "transfer", icon: "transfer", title: "Puts clients through to the right person", plan: "Growth and Scale",
    vis: `<div class="mini"><span class="icon-tile">${icon("user")}</span><span class="min-w-0"><b class="block">Client asks for their adviser</b><span class="text-[14px] text-muted">"Can I speak to my adviser about my review?"</span></span></div>
          <div class="mini">${icon("transfer", "text-hl")}<span><b>Transferring to their adviser</b> with a quick briefing</span></div>`,
    agent: "Passes a caller to their own accountant or adviser, with everything they said passed across. If that person is busy, it takes a full message.",
    omh: "We build your routing rules and change them whenever your team changes." },
  { id: "leads", icon: "timer", title: "Calls back enquiries and chases documents", plan: "Growth and Scale",
    vis: `<div class="mini"><span class="icon-tile">${icon("globe")}</span><span class="min-w-0"><b class="block">New enquiry · 14:02</b><span class="text-[14px] text-muted">Self-assessment enquiry from your website</span></span></div>
          <div class="mini">${icon("timer", "text-ok")}<span><b>Called back</b> in 42 seconds</span></div>
          <div class="mini justify-between"><span><b>Records still outstanding</b></span><span class="text-[14px] font-semibold text-ok">Reminder call made</span></div>`,
    agent: "Rings back new web enquiries within a minute and reminds clients about the records you're waiting for.",
    omh: "We agree the timings and wording with you, and only call people who have asked to hear from you or are existing clients." },
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
export const accountantsMarkup = String.raw`
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
    data-brand-biz='[{"id":"accountant","label":"Accountant","name":"Harlow &amp; Finch Accountants","city":"Leeds","num":"0113 496 0372","agent":"Grace","kind":"firm&#39;s","initials":"HF","voice":"British English, warm and friendly","never":"Gives tax advice","transfer":"Existing clients go to their own accountant","caller":"Hi, I&#39;m self-employed and I need help with my tax return.","reply":"We can help with that. Is it for the tax year just ended, and have you filed with us before?","booked":"No, it would be my first time with you.","summary":"Thanks. I can book a 20-minute call with one of our accountants on Tuesday at 10am or Wednesday at 2pm. Which suits you?"},{"id":"mortgage","label":"Mortgage broker","name":"Keystone Mortgages","city":"Birmingham","num":"0121 496 0815","agent":"Hannah","kind":"firm&#39;s","initials":"KM","voice":"British English, clear and upbeat","never":"Quotes rates or says whether someone will be accepted","transfer":"Urgent cases, such as a completion date, go straight to your team","caller":"We&#39;re buying our first home and need a mortgage.","reply":"Congratulations. Have you had an offer accepted yet, or are you still looking?","booked":"Still looking.","summary":"No problem. I can book you a free first call with an adviser. They&#39;ll talk you through your options. Is Thursday at 6pm any good?"},{"id":"insurance","label":"Insurance broker","name":"Northbridge Insurance Brokers","city":"Manchester","num":"0161 496 0429","agent":"Ella","kind":"firm&#39;s","initials":"NI","voice":"British English, calm and measured","never":"Confirms cover or makes a claim decision","transfer":"New claims go to your claims team at once","caller":"I need to make a claim on our business policy.","reply":"I&#39;m sorry to hear that. Can I take the business name and policy number, and briefly what happened?","booked":"Riverside Bakery. We had a flood in the kitchen last night.","summary":"Thank you. I&#39;m passing this to our claims team now, and they&#39;ll call you back this morning."}]'>
    <div class="lg:col-start-1 lg:row-start-1">
      <h2>What is an AI receptionist <span class="hl">for accountants?</span></h2>
      <p class="mt-5 text-band-muted">An AI receptionist for accountants is software that answers your firm's phone in natural, spoken conversation when your team is busy. It works out whether the caller is a new enquiry, an existing client or someone chasing a deadline, answers from fees and information you have approved, books meetings into the right diary and passes anything that needs an accountant or adviser to your team, with a summary of the call.</p>
      <p class="mt-4 text-band-muted">On Starter it does exactly that job. On Growth and Scale it works as a full AI voice agent: it puts callers through to their own accountant or adviser, calls back new enquiries and chases clients for the documents you're waiting on. Either way, OMH writes the script, connects your diary and runs it for you. See our <a href="/ai-voice-agents/receptionist">AI receptionist plan</a>, or how our <a href="/ai-voice-agents">AI voice agent</a> works across UK businesses.</p>
    </div>

    <div class="order-last lg:order-none lg:col-start-1 lg:row-start-2">
      <h3 class="!text-[22px]">How a call goes</h3>
      <p class="mt-1 text-[16px] text-band-muted">Watch the phone. Each step lights up as the call reaches it.</p>
      <ol class="mt-5 space-y-2.5" aria-live="off">
        <li class="flex gap-4 rounded-[14px] border border-band-line p-4" data-brand-step="1"><span class="step-num" aria-hidden="true">1</span><span class="text-[16px] leading-snug"><strong class="block font-display text-[17.5px] font-semibold">It listens.</strong><span class="text-band-muted">It hears whether it's a new enquiry, a meeting request, a question about a deadline or a message for someone.</span></span></li>
        <li class="flex gap-4 rounded-[14px] border border-band-line p-4" data-brand-step="2"><span class="step-num" aria-hidden="true">2</span><span class="text-[16px] leading-snug"><strong class="block font-display text-[17.5px] font-semibold">It works out the answer.</strong><span class="text-band-muted">It checks the request against your services, fees, team and booking rules.</span></span></li>
        <li class="flex gap-4 rounded-[14px] border border-band-line p-4" data-brand-step="3"><span class="step-num" aria-hidden="true">3</span><span class="text-[16px] leading-snug"><strong class="block font-display text-[17.5px] font-semibold">It replies and acts.</strong><span class="text-band-muted">It answers in a natural voice, books the meeting or puts the call through.</span></span></li>
        <li class="flex gap-4 rounded-[14px] border border-band-line p-4" data-brand-step="4"><span class="step-num" aria-hidden="true">4</span><span class="text-[16px] leading-snug"><strong class="block font-display text-[17.5px] font-semibold">It reports back.</strong><span class="text-band-muted">Your team gets a summary of every call, with name, number and what the caller needs.</span></span></li>
      </ol>
    </div>

    <div class="mx-auto w-full max-w-[420px] lg:col-start-2 lg:row-span-2 lg:row-start-1">
      <div class="rounded-[14px] border border-band-line bg-band-surface p-4 sm:p-5">
        <p class="font-display text-[18px] font-semibold">Try it: pick a firm, then listen in</p>
        <div class="mt-3 flex flex-wrap items-center gap-2">
          <div role="radiogroup" aria-label="Firm" class="flex flex-wrap gap-2" data-brand-group="biz">
            <button type="button" role="radio" aria-checked="true" tabindex="0" class="min-h-[44px] rounded-full border border-[rgb(247_246_242/.35)] px-4 text-[15.5px] font-semibold text-band-ink aria-checked:border-gold aria-checked:bg-gold aria-checked:text-navy" data-brand-opt="accountant" data-track="branding_biz" data-track-name="Accountant">Accountant</button>
            <button type="button" role="radio" aria-checked="false" tabindex="-1" class="min-h-[44px] rounded-full border border-[rgb(247_246_242/.35)] px-4 text-[15.5px] font-semibold text-band-ink aria-checked:border-gold aria-checked:bg-gold aria-checked:text-navy" data-brand-opt="mortgage" data-track="branding_biz" data-track-name="Mortgage broker">Mortgage broker</button>
            <button type="button" role="radio" aria-checked="false" tabindex="-1" class="min-h-[44px] rounded-full border border-[rgb(247_246_242/.35)] px-4 text-[15.5px] font-semibold text-band-ink aria-checked:border-gold aria-checked:bg-gold aria-checked:text-navy" data-brand-opt="insurance" data-track="branding_biz" data-track-name="Insurance broker">Insurance broker</button>
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
            <span class="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[var(--color-teal)] font-display text-[18px] font-semibold text-[#000]" aria-hidden="true" data-brand-initials>HF</span>
            <span class="min-w-0"><span class="block truncate font-display text-[17px] font-semibold leading-tight" data-brand-name>Harlow &amp; Finch Accountants</span><span class="block text-[13.5px] text-[rgb(0_0_0/0.68)]"><span class="tnum" data-brand-num>0113 496 0372</span>, <span data-brand-city>Leeds</span></span></span>
            <span class="ml-auto shrink-0 text-[13px] font-semibold text-[#1c6446]"><span class="mr-1 inline-block h-2 w-2 rounded-full bg-[#1c6446] align-middle"></span><span class="tnum" data-brand-timer>00:00</span></span>
          </div>
          <div class="mt-4 space-y-2.5 text-[14.5px] leading-[1.45]">
            <div class="rounded-[4px_14px_14px_14px] bg-white p-3 shadow-[0_10px_30px_-20px_rgb(0_0_0/0.6)]">
              <div class="flex items-center gap-2"><span class="text-[12.5px] font-semibold text-[var(--color-amber-deep)]"><span data-brand-agent>Grace</span>, AI assistant</span><svg viewBox="0 0 168 40" class="brand-wave h-5 flex-1" aria-hidden="true" data-brand-wave><rect x="1" y="13" width="3" height="14" rx="1.5" style="--d:0s"/><rect x="7" y="3" width="3" height="34" rx="1.5" style="--d:0.09s"/><rect x="13" y="15.5" width="3" height="9" rx="1.5" style="--d:0.18s"/><rect x="19" y="6" width="3" height="28" rx="1.5" style="--d:0.27s"/><rect x="25" y="14.5" width="3" height="11" rx="1.5" style="--d:0.36s"/><rect x="31" y="12" width="3" height="16" rx="1.5" style="--d:0.45s"/><rect x="37" y="5.5" width="3" height="29" rx="1.5" style="--d:0.54s"/><rect x="43" y="8" width="3" height="24" rx="1.5" style="--d:0s"/><rect x="49" y="7" width="3" height="26" rx="1.5" style="--d:0.09s"/><rect x="55" y="10" width="3" height="20" rx="1.5" style="--d:0.18s"/><rect x="61" y="10.5" width="3" height="19" rx="1.5" style="--d:0.27s"/><rect x="67" y="15" width="3" height="10" rx="1.5" style="--d:0.36s"/><rect x="73" y="3.5" width="3" height="33" rx="1.5" style="--d:0.45s"/><rect x="79" y="16" width="3" height="8" rx="1.5" style="--d:0.54s"/><rect x="85" y="4" width="3" height="32" rx="1.5" style="--d:0s"/><rect x="91" y="16.5" width="3" height="7" rx="1.5" style="--d:0.09s"/><rect x="97" y="11.5" width="3" height="17" rx="1.5" style="--d:0.18s"/><rect x="103" y="7.5" width="3" height="25" rx="1.5" style="--d:0.27s"/><rect x="109" y="8" width="3" height="24" rx="1.5" style="--d:0.36s"/><rect x="115" y="7" width="3" height="26" rx="1.5" style="--d:0.45s"/><rect x="121" y="8" width="3" height="24" rx="1.5" style="--d:0.54s"/><rect x="127" y="11" width="3" height="18" rx="1.5" style="--d:0s"/><rect x="133" y="17" width="3" height="6" rx="1.5" style="--d:0.09s"/><rect x="139" y="5" width="3" height="30" rx="1.5" style="--d:0.18s"/><rect x="145" y="16.5" width="3" height="7" rx="1.5" style="--d:0.27s"/><rect x="151" y="3" width="3" height="34" rx="1.5" style="--d:0.36s"/><rect x="157" y="15.5" width="3" height="9" rx="1.5" style="--d:0.45s"/><rect x="163" y="10" width="3" height="20" rx="1.5" style="--d:0.54s"/></svg></div>
              <p class="mt-2 min-h-[64px]" aria-hidden="true">&ldquo;<span data-brand-greeting>Good morning, Harlow &amp; Finch Accountants. I'm Grace, the firm's AI assistant. How can I help you today?</span><span class="brand-caret" data-brand-caret></span>&rdquo;</p>
              <p class="sr-only" aria-live="polite" data-brand-live></p>
            </div>
            <div class="ml-8 rounded-[14px_4px_14px_14px] bg-[#000] p-3 text-[#f7f6f2]" data-brand-line="caller"><span class="block text-[12.5px] font-semibold text-[rgb(247_246_242/0.6)]">Caller</span><span data-brand-caller>Hi, I&#39;m self-employed and I need help with my tax return.</span></div>
            <div class="rounded-[4px_14px_14px_14px] bg-white p-3 shadow-[0_10px_30px_-20px_rgb(0_0_0/0.6)]" data-brand-line="agent"><span class="block text-[12.5px] font-semibold text-[var(--color-amber-deep)]"><span data-brand-agent2>Grace</span>, AI assistant</span><span class="font-semibold" data-brand-reply>We can help with that. Is it for the tax year just ended, and have you filed with us before?</span></div>
            <div class="ml-8 rounded-[14px_4px_14px_14px] bg-[#000] p-3 text-[#f7f6f2]" data-brand-outcome><span class="block text-[12.5px] font-semibold text-[rgb(247_246_242/0.6)]">Caller</span><span data-brand-booked>No, it would be my first time with you.</span></div>
            <div class="rounded-[4px_14px_14px_14px] bg-white p-3 shadow-[0_10px_30px_-20px_rgb(0_0_0/0.6)]" data-brand-line="summary"><span class="block text-[12.5px] font-semibold text-[var(--color-amber-deep)]">AI assistant</span><span class="font-semibold" data-brand-summary>Thanks. I can book a 20-minute call with one of our accountants on Tuesday at 10am or Wednesday at 2pm. Which suits you?</span></div>
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

<section id="firms" data-component="Firms">
  <div class="container-omh py-14 lg:py-20">
    <p class="eyebrow"><span class="eyebrow-mark" aria-hidden="true"><i></i><i></i><i></i></span>Firms we cover</p>
    <h2>One agent, <span class="hl">scripted for your firm</span></h2>
    <p class="mt-5 text-muted">Every firm gets different calls. We write the script around yours: the services you offer, who looks after which clients, what you can say on a call and what must go to a qualified person.</p>
    <div class="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
${firms.map(firmCard).join("\n")}
    </div>
    <div class="fit-band mt-8 flex flex-col gap-4 rounded-[16px] bg-sand p-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p class="font-display text-[18px] font-semibold">Not sure how your calls would fit?</p>
        <p class="mt-1 text-[16px] text-muted">Tell us who rings your firm and why. We'll map your calls and show you what the agent would handle and what it would pass to your team.</p>
      </div>
      ${primaryCta("industries_book_demo", "shrink-0")}
    </div>
  </div>
</section>

<section id="regulated" data-component="Regulated" class="border-y border-line bg-surface">
  <div class="container-omh py-14 lg:py-20">
    <p class="eyebrow"><span class="eyebrow-mark" aria-hidden="true"><i></i><i></i><i></i></span>Regulated firms</p>
    <h2>Built with regulated firms <span class="hl">in mind</span></h2>
    <p class="mt-5 text-muted">We have run marketing for FCA-regulated firms, so we know the difference between what a regulated firm can say on a call and what must wait for a qualified adviser. Your agent is set up around that line from the first day.</p>
    <ul class="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
${rules.map(ruleCard).join("\n")}
    </ul>
    <p class="mt-6 text-[15px] text-muted">Your compliance officer signs off the script before go-live. This section describes how we set up the agent; it is not legal or compliance advice.</p>
  </div>
</section>

<section id="features" data-component="Features" class="border-y border-line bg-surface">
  <div class="container-omh py-14 lg:py-20">
    <p class="eyebrow"><span class="eyebrow-mark" aria-hidden="true"><i></i><i></i><i></i></span>What's included</p>
    <h2>What it does for your firm,<br class="max-sm:hidden"> <span class="hl">and what we run for you</span></h2>
    <p class="mt-5 text-muted">New enquiries, meeting bookings, messages and the questions in between, handled the way a good office manager would. Pick a capability to see who does what. Features marked Growth and Scale aren't on Starter.</p>

    <div class="mt-10 grid gap-5 lg:grid-cols-[minmax(0,.4fr)_minmax(0,.6fr)] lg:items-start" data-tabs>
      <div role="tablist" aria-label="Capabilities" aria-orientation="vertical" class="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
${capabilities.map(capTab).join("\n")}
      </div>
${capabilities.map(capPanel).join("\n")}
    </div>
  </div>
</section>

<section id="pricing" data-component="Pricing" class="border-y border-line bg-surface">
  <div class="container-omh py-14 lg:py-20">
    <p class="eyebrow"><span class="eyebrow-mark" aria-hidden="true"><i></i><i></i><i></i></span>Pricing</p>
    <h2>AI voice agent pricing <span class="hl">for accountants and financial advisers</span></h2>
    <p class="mt-5 text-muted">Three plans, billed monthly, no minimum contract. Every plan includes a managed agent, a British voice, a summary of every call and a monthly report. Prices exclude VAT.</p>

    <div class="mt-10 grid gap-5 lg:grid-cols-3 lg:items-stretch">
${accountantsPricing.plans.map(plan).join("\n")}
    </div>

    <dl class="mt-12 border-t border-line">
${accountantsPricing.notes.map(([k, v]) => `      <div class="grid gap-1 border-b border-line py-4 sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-8"><dt class="text-[16px] font-semibold uppercase tracking-[0.14em] text-muted">${k}</dt><dd class="text-[16px] leading-[1.5]">${v}</dd></div>`).join("\n")}
    </dl>
  </div>
</section>

`;
