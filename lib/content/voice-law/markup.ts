// Body of /ai-voice-agents/law-firms (21 Oct 2026): the rebuilt sections of /ai-voice-agents (what-is with the call
// player, capabilities, use cases, pricing), written for UK law firms. Same structure, classes and data-* hooks as
// lib/content/ai-voice-agents-markup.ts. Composed by components/voice-agents/LawPage.tsx.
// Content sources: the main page's law firm wording, plans and process. Firms, people and numbers are fictional
// (Ofcom drama numbers).
import { mainPagePricing } from "@/lib/content/voice-pricing";

export const lawFaqTopics = { callers: "Callers and AI", advice: "Legal advice and urgency", setup: "Setup and systems", data: "Confidentiality and data", working: "Working with us" };

/** The FAQ section. LawPage.tsx builds the FAQPage JSON-LD from this list. */
export const lawFaqs: { q: string; a: string; cat: keyof typeof lawFaqTopics }[] = [
  { cat: "callers", q: "Will callers know they are talking to an AI?",
    a: "Yes. Every agent says it is an AI assistant at the start of the call. Callers deserve to know, and anyone who would rather speak to a person can ask." },
  { cat: "advice", q: "Does it give legal advice?",
    a: "No. The agent never gives legal advice, never comments on the merits of a matter and never tells a caller whether they have a case. It takes the details, books a consultation or passes the call to the right fee earner." },
  { cat: "advice", q: "What happens with urgent matters, such as someone at a police station?",
    a: "It follows the rules your firm sets. In office hours, calls you mark as urgent, such as someone held at a police station or a client who needs an urgent injunction, are put straight through to the person or team you choose. Out of hours they go to your on-call solicitor or the number you choose. Every urgent call is flagged at the top of the morning summary." },
  { cat: "advice", q: "Can it take the details for a conflict check?",
    a: "Yes. It takes the names your firm needs before a conflict check, such as the caller and the other parties, and passes them to your team. It never decides whether the firm can act and never judges the matter. Your team runs the check." },
  { cat: "advice", q: "Can it give conveyancing quotes?",
    a: "Only from the fee scales your firm approves. It can give your standard legal fee for a sale or purchase at a given price and list the disbursements you tell it to. Anything outside your scales goes to your team for a written quote." },
  { cat: "callers", q: "Can it sort new enquiries by practice area?",
    a: "Yes. It asks what the matter is about and sorts it by the areas you cover, such as conveyancing, family, wills and probate, employment, personal injury or commercial. On Growth and Scale it can put the call through to that team. Otherwise it takes a detailed message and sends it to them." },
  { cat: "callers", q: "Can existing clients reach their fee earner?",
    a: "Yes. On Growth and Scale it puts them through to their fee earner or team by your rules. When the fee earner is in court or a meeting, it takes a message with the matter reference and the reason for the call. It doesn't give updates on a matter itself." },
  { cat: "callers", q: "How does it handle upset callers, for example after a death or a separation?",
    a: "It speaks calmly, takes its time and repeats details when asked. It keeps to the practical steps: taking details and booking a meeting. Anyone who wants a person is put through in office hours, or a message is taken for a call back." },
  { cat: "callers", q: "What happens when the agent doesn't know the answer?",
    a: "It says so. The agent answers only from information you have approved, so when a question falls outside that, it offers to take a message or transfer the call. We review those moments and add the answers worth adding." },
  { cat: "setup", q: "Does it work with our case management software?",
    a: "It works with most diaries. We look at your case management system on the first call and tell you plainly what connects directly and what needs a workaround." },
  { cat: "setup", q: "Can it book consultations with the right fee earner?",
    a: "Yes. It books by fee earner, practice area and meeting type, such as a first consultation or a follow-up meeting, and keeps to the lengths and rules you set. Anything that needs a fee earner's say-so first goes to your team." },
  { cat: "setup", q: "Can we keep our phone number, or get a local one?",
    a: "You can keep your number and divert calls to the agent, either all of them or only the ones reception misses. If you want a local number for a new office, we can set one up." },
  { cat: "setup", q: "How long does setup take?",
    a: "Starter goes live in 3 working days, Growth in 5 to 7 and Scale in 12 to 15. The clock starts once we have your fee scales, routing rules and diary access. If your firm is more complex than usual, we give you a realistic timeline after the discovery call, before you commit to anything." },
  { cat: "data", q: "Is client information kept confidential?",
    a: "You remain the data controller and OMH acts as your processor under a written data processing agreement, in line with UK GDPR. We agree what is stored, where and for how long before go-live. The agent only asks for the details your script sets out." },
  { cat: "data", q: "We are regulated by the SRA. Who decides what the agent says?",
    a: "Your firm does. You approve the script, the routing rules and every answer the agent gives, and you can change them at any time. We build the agent to the rules you set and show you every change before it goes live." },
  { cat: "data", q: "Are calls recorded?",
    a: "Only if you want them to be. Callers are told at the start of the call, and recordings are deleted on the schedule you set." },
  { cat: "data", q: "Can it call clients about appointments and quotes?",
    a: "Only people who have agreed to it. We follow the UK PECR rules and act on opt-outs straight away; opt-outs are removed the same day. We don't run cold calling campaigns." },
  { cat: "working", q: "Will it replace our receptionists?",
    a: "No. It takes the overflow and the routine calls, so your team can look after the clients in front of them. You choose when it answers: only when the lines are busy, only out of hours, or first on every call. Anything sensitive or complicated still goes to your team." },
  { cat: "working", q: "How much does an AI receptionist for law firms cost?",
    a: "Our AI receptionist for law firms and solicitors (the Starter plan) is £249 a month plus VAT with 300 minutes included, and a one-off setup fee from £795. Growth is £449 a month and Scale, for firms with several offices or departments, is £849 a month. Extra minutes cost 60p each on every plan." },
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
// The eight kinds of call a law firm's reception gets: new matters, urgent matters, the diary, conflict checks,
// existing clients, conveyancing quotes, wills and probate, and calls after the office closes.
const industries = [
  { id: "newclients", icon: "user", label: "New clients", full: "New client enquiries", tint: 1,
    time: "Call · Tue 18:42", status: "Reception gone home", caller: "I'm separating from my husband and I need to talk to someone about the children. Can I book an appointment?", agent: "I can help with that. I have Thursday at 10am with Rachel in our family team for a first consultation. Shall I book it?", booked: "Family consultation booked: Thu 10:00",
    h3: "New clients: sorted by practice area and booked in",
    p: "People ring two or three firms and often go with the first one that answers. The agent asks what the matter is about, sorts it by practice area and books a first consultation with the right team.",
    bullets: ["Sorts each enquiry by practice area, such as family, employment or personal injury", "Takes contact details and how the caller found you", "Books the first consultation with the right team"] },
  { id: "urgent", icon: "shield", label: "Urgent", full: "Urgent matters", tint: 3,
    time: "Call · Sat 02:10", status: "Urgent: office closed", caller: "My son has been arrested and he's at the police station. He asked for your firm.", agent: "I understand. I'm putting you through to our on-call solicitor now. Can I take your number in case we're cut off?", booked: "Put through to the on-call solicitor",
    h3: "Urgent matters: put straight through, by your rules",
    p: "Some calls can't wait for a message, such as someone held at a police station or a client who needs an urgent injunction. The agent follows the route your firm sets and never gives advice on the matter.",
    bullets: ["Puts police station calls through to your on-call solicitor", "Sends urgent injunction calls to the fee earner you choose", "Flags every urgent call at the top of the morning summary"], note: "No legal advice given." },
  { id: "consultations", icon: "calendar", label: "Consultations", full: "Consultations and changes", tint: 2,
    time: "Call · 12:40", status: "Lunch: one person on reception", caller: "I need to move my meeting with Mr Shah next Tuesday.", agent: "No problem. I can move you to Wednesday at 2:30pm with Mr Shah. Does that work?", booked: "Meeting moved: Wed 14:30",
    h3: "Consultations: booked, moved and cancelled",
    p: "Many calls are routine diary changes. The agent works from real availability in your diary, by fee earner, practice area and type of meeting.",
    bullets: ["Books by fee earner, practice area and meeting type", "Moves and cancels without a queue on the line", "Texts the client a confirmation and your address"] },
  { id: "conflicts", icon: "clipboard", label: "Conflict checks", full: "Details for a conflict check", tint: 4,
    time: "Call · 09:15", status: "New matter enquiry", caller: "I want to bring a claim against my old employer.", agent: "Thank you. Before a solicitor speaks to you, our team runs a quick check. Can I take your full name and your employer's full name?", booked: "Names noted for your conflict check",
    h3: "Conflict checks: names taken, the decision left to you",
    p: "Before your firm can act, someone has to check for a conflict. The agent takes the names your team needs, such as the caller and the other parties, and passes them on. It never decides whether you can act.",
    bullets: ["Takes the caller's name and the names of the other parties", "Passes them to your team before a consultation is confirmed", "Never says whether someone has a case"], note: "It never judges the matter." },
  { id: "existing", icon: "users", label: "Existing clients", full: "Existing clients", tint: 1,
    time: "Call · 11:05", status: "Fee earner in court", caller: "Hello, it's Mrs Begum. Is there any news on my house purchase?", agent: "Daniel is out of the office this morning. I'll take a message with your matter reference and ask him to call you back today.", booked: "Message sent to Daniel for a call back",
    h3: "Existing clients: put through, or a message taken",
    p: "Clients ring for their fee earner or for news on their matter. The agent puts them through by your rules, or takes a clear message when the fee earner is in court or a meeting. It doesn't give matter updates itself.",
    bullets: ["Puts clients through to their fee earner on Growth and Scale", "Takes a message with the matter reference and the reason for the call", "Sends it to the fee earner and their assistant"] },
  { id: "conveyancing", icon: "home", label: "Conveyancing", full: "Conveyancing quotes", tint: 3,
    time: "Call · Sat 10:20", status: "Office closed", caller: "We're buying a house for £285,000. How much would your fees be?", agent: "I can give you our standard fee for a purchase at that price, plus the costs we pay on your behalf, and email you the breakdown. Shall I do that?", booked: "Quote sent from your fee scale",
    h3: "Conveyancing quotes: only from your approved fee scales",
    p: "Buyers and sellers ring around for quotes, often at weekends. The agent answers only from the fee scales and disbursements your firm approves, and passes anything else to your team for a written quote.",
    bullets: ["Gives your standard legal fee by price band", "Lists the disbursements you tell it to", "Passes anything outside your scales to your team"] },
  { id: "probate", icon: "book", label: "Wills and probate", full: "Wills and probate", tint: 2,
    time: "Call · 14:05", status: "Two callers at once", caller: "My mother died last month and I'm her executor. I don't know where to start.", agent: "I'm sorry for your loss. I can book you a meeting with our probate team, who will talk you through the next steps. Does Monday at 11 suit you?", booked: "Probate meeting booked: Mon 11:00",
    h3: "Wills and probate: calm, careful and booked in",
    p: "Probate calls often come from someone who has just lost a family member. The agent speaks gently, takes the details your team needs and books a meeting. It leaves the explaining to your probate team.",
    bullets: ["Speaks calmly and takes its time", "Books will appointments and probate meetings", "Takes the executor's contact details for your team"] },
  { id: "afterhours", icon: "moon", label: "After hours", full: "After hours", tint: 4,
    time: "Call · Sun 20:15", status: "Office closed until Monday", caller: "I've been told I'm being made redundant. Can I talk to someone this week?", agent: "I can book you a call with our employment team on Monday at 9:30. Shall I do that?", booked: "Employment call booked: Mon 09:30",
    h3: "After hours: evenings, weekends and bank holidays covered",
    p: "Many people only ring a solicitor after work, when voicemail picks up and many hang up without leaving a message. The agent answers, books and leaves a morning summary of who rang overnight.",
    bullets: ["Answers evenings, weekends and bank holidays", "Books first consultations from your diary", "Morning summary: who rang, what was booked, what needs a person"] },
];

const callVis = (x: { time: string; status: string; caller: string; agent: string; booked: string; tint: number }) => `
          <div class="mini"><span class="icon-tile">${icon("phone-missed")}</span><span class="min-w-0"><b class="block">${x.time}</b><span class="text-[14px] font-semibold text-ok">${x.status}</span></span></div>
          <div class="chat">
            <p><span class="who">Caller</span>${x.caller}</p>
            <p class="ai"><span class="who">Your AI agent</span>${x.agent}</p>
          </div>
          <span class="booked">${icon("check")}${x.booked}</span>`;

const industryTab = (x: (typeof industries)[number], i: number) =>
  `        <button type="button" role="tab" id="tab-${x.id}" aria-controls="uc-${x.id}" aria-selected="${i === 0}" tabindex="${i ? -1 : 0}" class="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-[var(--va-line-strong)] px-4 text-[16px] font-semibold aria-selected:border-ink aria-selected:bg-ink aria-selected:text-paper" data-tab data-track="law_call_type" data-track-name="${x.full}">${icon(x.icon)}${x.label}</button>`;

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
// The main page's plans, word for word except where a phrase names a business type: firms, offices, clients,
// case management. Prices, minutes, setup fees and delivery times are the shared ones.
const swap: Record<string, string> = {
  "Books appointments into one calendar": "Books consultations into one diary",
  "More than one location": "More than one office",
  "Writes each enquiry into your CRM or practice system": "Writes each enquiry into your case management system or CRM",
  "Calls new web leads within 60 seconds": "Calls new client enquiries within 60 seconds",
  "Routes enquiries at the first question, for example sales, service or accounts": "Routes calls at the first question, for example by practice area or to a fee earner",
  "Outbound follow-up to contacts who have consented, for quotes, reminders and no-shows": "Outbound calls to clients who have consented, for quotes, reminders and missed appointments",
  "A second location, department or agent": "A second office, department or agent",
  "Up to three locations or departments, each with its own script, voice and diary": "Up to three offices or departments, each with its own script, voice and diary",
  "Routing across branches by where the caller is or what they ask for": "Routing across offices by where the caller is or which practice area they need",
  "Per-site reporting, so you can see which branch converts its calls": "Per-office reporting, so you can see which office converts its calls",
  "A fourth location or department (a priced add-on)": "A fourth office or department (a priced add-on)",
};
const straps: Record<string, string> = {
  starter: "One office, one agent answering and booking. Best for a small firm with straightforward phones.",
  growth: "For a firm where the phone brings in new matters. Where most firms should start.",
  scale: "For firms with several offices or departments, each with its own diary, on one managed service.",
};
const lawPricing = {
  plans: mainPagePricing.plans.map((p) => ({ ...p, strap: straps[p.id], features: p.features.map((f) => swap[f] ?? f), excluded: p.excluded.map((f) => swap[f] ?? f) })),
  notes: mainPagePricing.notes.map(([k, v]) =>
    k === "Extra locations" ? ["Extra offices", v] : k === "Delivery" ? [k, "The clock starts once we have your fee scales, routing rules and diary access."] : [k, v],
  ),
};
const plan = (p: (typeof lawPricing.plans)[number]) => {
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
// Six capabilities, each with a mock-up, what the agent does and what OMH does, for a law firm's reception.
const capabilities = [
  { id: "answer", icon: "phone", title: "First-ring answering, 24/7",
    vis: `<div class="mini"><span class="icon-tile">${icon("phone")}</span><span class="min-w-0"><b class="block">Call · Mon 09:00</b><span class="text-[14px] font-semibold text-ok">Answered on the first ring</span></span></div>
          <div class="mini">${icon("users", "text-ok")}<span>Monday morning: 5 callers answered at once</span></div>`,
    agent: "Every call answered straight away, from the Monday morning rush to lunchtimes, evenings and bank holidays. No engaged tone and no hold music.",
    omh: "We divert your firm's line, set your office hours and agree what it picks up and when: overflow, out of hours or every call. Nothing goes live without your sign-off." },
  { id: "voice", icon: "mic", title: "Sounds like your firm",
    vis: `<div class="mini"><span class="icon-tile">${icon("mic")}</span><span class="min-w-0"><b class="block">Grace · Your assistant</b><span class="text-[14px] text-muted">Your firm name, greeting and voice</span></span></div>
          <div class="mini justify-center py-3"><span class="mini-wave"><i></i><i></i><i></i><i></i><i></i></span><span class="ml-2 text-[14px] font-semibold">"Good morning, Hartwell Reeve Solicitors, how can I help?"</span></div>`,
    agent: "Your firm name, your greeting and a calm British voice. It speaks clearly, takes its time with anxious or upset callers, and OMH is never mentioned on a call.",
    omh: "We write the script around the real reasons people ring your firm, then you make test calls and adjust it with us until it sounds like your firm." },
  { id: "knows", icon: "book", title: "Knows your practice areas and fee scales",
    vis: `<div class="flex flex-wrap justify-center gap-2"><span class="mini-chip">${icon("check", "text-ok")}Practice areas</span><span class="mini-chip">${icon("check", "text-ok")}Fee scales</span><span class="mini-chip">${icon("check", "text-ok")}Office hours</span><span class="mini-chip">${icon("check", "text-ok")}What to bring</span><span class="mini-chip">${icon("check", "text-ok")}Parking</span></div>
          <div class="mini">${icon("book", "text-hl")}<span>Trained on <b>your</b> firm, not the internet</span></div>`,
    agent: "It answers only from information you approve: the areas of law you cover, your fee scales, office hours, what to bring to a first meeting and directions. Anything that needs a solicitor, or falls outside that, goes to your team.",
    omh: "We load that information for you, and on Growth and Scale we read a sample of transcripts every month, see what it couldn't answer and add the answers worth adding." },
  { id: "books", icon: "calendar", title: "Books into your diary without clashes",
    vis: `<div class="vcal-head"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span></div>
          <div class="vcal"><span class="busy"></span><span></span><span class="busy"></span><span></span><span class="busy"></span><span></span><span class="busy"></span><span class="new"></span><span class="busy"></span><span></span><span class="busy"></span><span></span><span></span><span class="busy"></span><span></span></div>
          <div class="mini">${icon("calendar", "text-ok")}<span><b>Consultation booked:</b> Wed 11:00, no clash</span></div>`,
    agent: "It checks the live diary by fee earner, practice area and meeting type, respects your booking rules and texts the client a confirmation.",
    omh: "We connect your diary, plus your case management software on Growth and Scale where it allows, and tell you on the discovery call what connects directly and what needs a workaround." },
  { id: "transfer", icon: "transfer", title: "Warm transfer to the right fee earner", plan: "Growth and Scale",
    vis: `<div class="mini"><span class="icon-tile">${icon("user")}</span><span class="min-w-0"><b class="block">Client asks for their solicitor</b><span class="text-[14px] text-muted">"Can I speak to Daniel about my purchase?"</span></span></div>
          <div class="mini">${icon("transfer", "text-hl")}<span><b>Transferring to the conveyancing team</b> with a quick briefing</span></div>`,
    agent: "Urgent matters, existing clients and anyone who asks for a person are put through to the right phone with a quick briefing first, so nobody repeats themselves. Outside your hours it takes a detailed message instead.",
    omh: "You choose who gets put through and when: urgent matters, existing clients, complaints, anyone who asks for a person. We set those rules and test them with you." },
  { id: "leads", icon: "timer", title: "Calls new enquiries back within a minute", plan: "Growth and Scale",
    vis: `<div class="mini"><span class="icon-tile">${icon("globe")}</span><span class="min-w-0"><b class="block">New enquiry · 14:02</b><span class="text-[14px] text-muted">Employment enquiry from your website</span></span></div>
          <div class="mini">${icon("timer", "text-ok")}<span><b>Called back</b> in 42 seconds</span></div>
          <div class="mini justify-between"><span><b>Consultation tomorrow</b></span><span class="text-[14px] font-semibold text-ok">Reminder call made</span></div>`,
    agent: "New client enquiries from your website get a call within 60 seconds. It also calls clients who agreed to reminders before their consultation.",
    omh: "Every call is summarised and emailed to you; on Growth and Scale the details go into your case management system or CRM, and on Scale calls answered, consultations booked and transfers are reported beside your Google Ads and website figures." },
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
export const lawMarkup = String.raw`
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
    data-brand-biz='[{"id":"newclient","label":"New client","name":"Hartwell Reeve Solicitors","city":"Birmingham","num":"0121 496 0147","agent":"Grace","kind":"firm&#39;s","initials":"HR","voice":"British English, warm and friendly","never":"Gives legal advice","transfer":"Existing clients go to their fee earner","caller":"I&#39;ve been dismissed from my job and I don&#39;t think it was fair. Can I speak to someone?","reply":"I&#39;m sorry to hear that. I can book you a first consultation with our employment team on Thursday at 10. Shall I book it?","booked":"Employment consultation booked: Thu 10:00","summary":"Summary sent to the employment team: new enquiry, names taken for the conflict check"},{"id":"urgent","label":"Urgent","name":"Ashcombe Lyle Solicitors","city":"Leeds","num":"0113 496 0172","agent":"Hannah","kind":"firm&#39;s","initials":"AL","voice":"British English, calm and measured","never":"Says whether someone has a case","transfer":"Police station calls go to the on-call solicitor","caller":"My son has been arrested and he&#39;s asked for your firm.","reply":"I understand. I&#39;m putting you through to our on-call solicitor now.","booked":"Put through to the on-call solicitor","summary":"Flagged for the crime team: police station call, put through, no advice given"},{"id":"conveyancing","label":"Conveyancing","name":"Penmore Vale Solicitors","city":"Bristol","num":"0117 496 0153","agent":"Ella","kind":"firm&#39;s","initials":"PV","voice":"British English, clear and upbeat","never":"Quotes a fee outside your scales","transfer":"Questions outside the fee scale go to the conveyancing team","caller":"We&#39;re buying a flat for £240,000. Can you give me a quote?","reply":"Yes. I&#39;ll email you our standard fee for a purchase at that price, with the costs we pay on your behalf.","booked":"Quote sent from your fee scale","summary":"Sent to the conveyancing team: purchase quote emailed, caller happy to be called back"}]'>
    <div class="lg:col-start-1 lg:row-start-1">
      <h2>What is an AI receptionist <span class="hl">for law firms?</span></h2>
      <p class="mt-5 text-band-muted">An AI receptionist for law firms is software that answers and makes phone calls for your firm in natural, spoken conversation. Some firms call it a legal AI receptionist; we call it an AI voice agent, because on Growth and Scale it does more than answer the phone. It works out whether the caller is a new client, an existing client or someone with an urgent matter, answers from fee scales and information you have approved, books consultations into your diary and passes anything that needs a solicitor to your team, with a summary of the call.</p>
      <p class="mt-4 text-band-muted">Callers don't press buttons or leave voicemails. They say what they need, and the agent responds the way a well-trained law firm receptionist would. The difference with OMH is that we set it up and run it for you: we write the script around your real calls, connect your diary and, where it allows, your case management software, and keep improving it. See our <a href="/ai-voice-agents/receptionist">AI receptionist plan</a> if you only need the phone answered.</p>
    </div>

    <div class="order-last lg:order-none lg:col-start-1 lg:row-start-2">
      <h3 class="!text-[22px]">How a call goes</h3>
      <p class="mt-1 text-[16px] text-band-muted">Watch the phone. Each step lights up as the call reaches it.</p>
      <ol class="mt-5 space-y-2.5" aria-live="off">
        <li class="flex gap-4 rounded-[14px] border border-band-line p-4" data-brand-step="1"><span class="step-num" aria-hidden="true">1</span><span class="text-[16px] leading-snug"><strong class="block font-display text-[17.5px] font-semibold">It listens.</strong><span class="text-band-muted">It hears whether it's a new enquiry, an existing client, a quote request or something urgent as the caller speaks.</span></span></li>
        <li class="flex gap-4 rounded-[14px] border border-band-line p-4" data-brand-step="2"><span class="step-num" aria-hidden="true">2</span><span class="text-[16px] leading-snug"><strong class="block font-display text-[17.5px] font-semibold">It works out the answer.</strong><span class="text-band-muted">It matches the request to your diary, fee scales and routing rules.</span></span></li>
        <li class="flex gap-4 rounded-[14px] border border-band-line p-4" data-brand-step="3"><span class="step-num" aria-hidden="true">3</span><span class="text-[16px] leading-snug"><strong class="block font-display text-[17.5px] font-semibold">It replies and acts.</strong><span class="text-band-muted">It answers in a natural voice, books the consultation or puts the call through.</span></span></li>
        <li class="flex gap-4 rounded-[14px] border border-band-line p-4" data-brand-step="4"><span class="step-num" aria-hidden="true">4</span><span class="text-[16px] leading-snug"><strong class="block font-display text-[17.5px] font-semibold">It reports back.</strong><span class="text-band-muted">Your team gets a summary of every call. Callers can interrupt or change their mind at any point.</span></span></li>
      </ol>
    </div>

    <div class="mx-auto w-full max-w-[420px] lg:col-start-2 lg:row-span-2 lg:row-start-1">
      <div class="rounded-[14px] border border-band-line bg-band-surface p-4 sm:p-5">
        <p class="font-display text-[18px] font-semibold">Try it: pick a call and a tone, then listen in</p>
        <div class="mt-3 flex flex-wrap items-center gap-2">
          <div role="radiogroup" aria-label="Call" class="flex flex-wrap gap-2" data-brand-group="biz">
            <button type="button" role="radio" aria-checked="true" tabindex="0" class="min-h-[44px] rounded-full border border-[rgb(247_246_242/.35)] px-4 text-[15.5px] font-semibold text-band-ink aria-checked:border-gold aria-checked:bg-gold aria-checked:text-navy" data-brand-opt="newclient" data-track="branding_biz" data-track-name="New client">New client</button>
            <button type="button" role="radio" aria-checked="false" tabindex="-1" class="min-h-[44px] rounded-full border border-[rgb(247_246_242/.35)] px-4 text-[15.5px] font-semibold text-band-ink aria-checked:border-gold aria-checked:bg-gold aria-checked:text-navy" data-brand-opt="urgent" data-track="branding_biz" data-track-name="Urgent">Urgent</button>
            <button type="button" role="radio" aria-checked="false" tabindex="-1" class="min-h-[44px] rounded-full border border-[rgb(247_246_242/.35)] px-4 text-[15.5px] font-semibold text-band-ink aria-checked:border-gold aria-checked:bg-gold aria-checked:text-navy" data-brand-opt="conveyancing" data-track="branding_biz" data-track-name="Conveyancing">Conveyancing</button>
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
            <span class="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[var(--color-teal)] font-display text-[18px] font-semibold text-[#000]" aria-hidden="true" data-brand-initials>HR</span>
            <span class="min-w-0"><span class="block truncate font-display text-[17px] font-semibold leading-tight" data-brand-name>Hartwell Reeve Solicitors</span><span class="block text-[13.5px] text-[rgb(0_0_0/0.68)]"><span class="tnum" data-brand-num>0121 496 0147</span>, <span data-brand-city>Birmingham</span></span></span>
            <span class="ml-auto shrink-0 text-[13px] font-semibold text-[#1c6446]"><span class="mr-1 inline-block h-2 w-2 rounded-full bg-[#1c6446] align-middle"></span><span class="tnum" data-brand-timer>00:00</span></span>
          </div>
          <div class="mt-4 space-y-2.5 text-[14.5px] leading-[1.45]">
            <div class="rounded-[4px_14px_14px_14px] bg-white p-3 shadow-[0_10px_30px_-20px_rgb(0_0_0/0.6)]">
              <div class="flex items-center gap-2"><span class="text-[12.5px] font-semibold text-[var(--color-amber-deep)]"><span data-brand-agent>Grace</span>, AI assistant</span><svg viewBox="0 0 168 40" class="brand-wave h-5 flex-1" aria-hidden="true" data-brand-wave><rect x="1" y="13" width="3" height="14" rx="1.5" style="--d:0s"/><rect x="7" y="3" width="3" height="34" rx="1.5" style="--d:0.09s"/><rect x="13" y="15.5" width="3" height="9" rx="1.5" style="--d:0.18s"/><rect x="19" y="6" width="3" height="28" rx="1.5" style="--d:0.27s"/><rect x="25" y="14.5" width="3" height="11" rx="1.5" style="--d:0.36s"/><rect x="31" y="12" width="3" height="16" rx="1.5" style="--d:0.45s"/><rect x="37" y="5.5" width="3" height="29" rx="1.5" style="--d:0.54s"/><rect x="43" y="8" width="3" height="24" rx="1.5" style="--d:0s"/><rect x="49" y="7" width="3" height="26" rx="1.5" style="--d:0.09s"/><rect x="55" y="10" width="3" height="20" rx="1.5" style="--d:0.18s"/><rect x="61" y="10.5" width="3" height="19" rx="1.5" style="--d:0.27s"/><rect x="67" y="15" width="3" height="10" rx="1.5" style="--d:0.36s"/><rect x="73" y="3.5" width="3" height="33" rx="1.5" style="--d:0.45s"/><rect x="79" y="16" width="3" height="8" rx="1.5" style="--d:0.54s"/><rect x="85" y="4" width="3" height="32" rx="1.5" style="--d:0s"/><rect x="91" y="16.5" width="3" height="7" rx="1.5" style="--d:0.09s"/><rect x="97" y="11.5" width="3" height="17" rx="1.5" style="--d:0.18s"/><rect x="103" y="7.5" width="3" height="25" rx="1.5" style="--d:0.27s"/><rect x="109" y="8" width="3" height="24" rx="1.5" style="--d:0.36s"/><rect x="115" y="7" width="3" height="26" rx="1.5" style="--d:0.45s"/><rect x="121" y="8" width="3" height="24" rx="1.5" style="--d:0.54s"/><rect x="127" y="11" width="3" height="18" rx="1.5" style="--d:0s"/><rect x="133" y="17" width="3" height="6" rx="1.5" style="--d:0.09s"/><rect x="139" y="5" width="3" height="30" rx="1.5" style="--d:0.18s"/><rect x="145" y="16.5" width="3" height="7" rx="1.5" style="--d:0.27s"/><rect x="151" y="3" width="3" height="34" rx="1.5" style="--d:0.36s"/><rect x="157" y="15.5" width="3" height="9" rx="1.5" style="--d:0.45s"/><rect x="163" y="10" width="3" height="20" rx="1.5" style="--d:0.54s"/></svg></div>
              <p class="mt-2 min-h-[64px]" aria-hidden="true">&ldquo;<span data-brand-greeting>Good morning, Hartwell Reeve Solicitors. I'm Grace, the firm's AI assistant. How can I help you today?</span><span class="brand-caret" data-brand-caret></span>&rdquo;</p>
              <p class="sr-only" aria-live="polite" data-brand-live></p>
            </div>
            <div class="ml-8 rounded-[14px_4px_14px_14px] bg-[#000] p-3 text-[#f7f6f2]" data-brand-line="caller"><span class="block text-[12.5px] font-semibold text-[rgb(247_246_242/0.6)]">Caller</span><span data-brand-caller>I've been dismissed from my job and I don't think it was fair. Can I speak to someone?</span></div>
            <div class="rounded-[4px_14px_14px_14px] bg-white p-3 shadow-[0_10px_30px_-20px_rgb(0_0_0/0.6)]" data-brand-line="agent"><span class="block text-[12.5px] font-semibold text-[var(--color-amber-deep)]"><span data-brand-agent2>Grace</span></span><span class="font-semibold" data-brand-reply>I'm sorry to hear that. I can book you a first consultation with our employment team on Thursday at 10. Shall I book it?</span></div>
            <p class="booked !text-[14px]" data-brand-outcome>${icon("check")}<span data-brand-booked>Employment consultation booked: Thu 10:00</span></p>
            <p class="flex items-center gap-2 rounded-[10px] bg-white/70 px-3 py-2 text-[13.5px]" data-brand-line="summary">${icon("mail", "shrink-0 text-hl")}<span data-brand-summary>Summary sent to the employment team: new enquiry, names taken for the conflict check</span></p>
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
    <h2>What it does for your firm,<br class="max-sm:hidden"> <span class="hl">and what we run for you</span></h2>
    <p class="mt-5 text-muted">New clients, consultations, urgent matters, existing clients and the questions in between, handled the way a good law firm receptionist would. Pick a capability to see it in action. Features marked Growth and Scale aren't on Starter.</p>

    <div class="mt-10 grid gap-5 lg:grid-cols-[minmax(0,.4fr)_minmax(0,.6fr)] lg:items-start" data-tabs>
      <div role="tablist" aria-label="Capabilities" aria-orientation="vertical" class="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
${capabilities.map(capTab).join("\n")}
      </div>
${capabilities.map(capPanel).join("\n")}
    </div>

    <h3 class="mt-14 !text-[24px]">Your solicitors stay <span class="hl">in charge</span></h3>
    <p class="mt-3 text-muted">You decide the rules before it answers a single call. Out of hours, urgent matters go to your on-call solicitor or the number you choose, never to a voicemail.</p>
    <div class="mt-6 grid gap-4 md:grid-cols-3">
      <div class="hover-card rounded-[16px] border border-line bg-surface p-5 sm:p-6">
        <p class="flex items-center gap-3 font-display text-[19px] font-semibold"><span class="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ok text-surface">${icon("check")}</span>It handles</p>
        <ul class="mt-4 space-y-2 text-[16px] leading-snug text-muted">
            <li class="flex gap-2.5"><span aria-hidden="true" class="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-50"></span><span>Consultations booked, moved and cancelled</span></li>
            <li class="flex gap-2.5"><span aria-hidden="true" class="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-50"></span><span>New client details and practice area</span></li>
            <li class="flex gap-2.5"><span aria-hidden="true" class="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-50"></span><span>Office hours, parking and directions</span></li>
            <li class="flex gap-2.5"><span aria-hidden="true" class="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-50"></span><span>Fee scales you approve, such as conveyancing</span></li>
        </ul>
      </div>
      <div class="hover-card rounded-[16px] border border-line bg-surface p-5 sm:p-6">
        <p class="flex items-center gap-3 font-display text-[19px] font-semibold"><span class="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold text-navy">${icon("transfer")}</span>It hands to your team</p>
        <ul class="mt-4 space-y-2 text-[16px] leading-snug text-muted">
            <li class="flex gap-2.5"><span aria-hidden="true" class="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-50"></span><span>Anything that needs a solicitor's judgement</span></li>
            <li class="flex gap-2.5"><span aria-hidden="true" class="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-50"></span><span>Complaints and sensitive calls</span></li>
            <li class="flex gap-2.5"><span aria-hidden="true" class="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-50"></span><span>Anyone who asks for a person</span></li>
            <li class="flex gap-2.5"><span aria-hidden="true" class="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-50"></span><span>Questions it has no approved answer for</span></li>
        </ul>
      </div>
      <div class="hover-card rounded-[16px] border border-line bg-surface p-5 sm:p-6">
        <p class="flex items-center gap-3 font-display text-[19px] font-semibold"><span class="grid h-9 w-9 shrink-0 place-items-center rounded-full border-[1.5px] border-[var(--va-line-strong)] text-muted">${icon("x")}</span>It never</p>
        <ul class="mt-4 space-y-2 text-[16px] leading-snug text-muted">
            <li class="flex gap-2.5"><span aria-hidden="true" class="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-50"></span><span>Gives legal advice</span></li>
            <li class="flex gap-2.5"><span aria-hidden="true" class="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-50"></span><span>Says whether someone has a case</span></li>
            <li class="flex gap-2.5"><span aria-hidden="true" class="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-50"></span><span>Pretends to be a person</span></li>
            <li class="flex gap-2.5"><span aria-hidden="true" class="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-50"></span><span>Calls people who have not agreed to it</span></li>
        </ul>
      </div>
    </div>
    <div class="mt-5 flex flex-col gap-4 rounded-[16px] border border-line bg-surface p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
      <div class="min-w-0">
        <p class="font-display text-[18px] font-semibold">Works alongside your case management</p>
        <p class="mt-1 text-[16px] text-muted">Bookings and notes go where your team already looks. We check your setup on the first call and tell you plainly what connects directly and what needs a workaround.</p>
      </div>
      <ul class="flex shrink-0 flex-wrap gap-2 lg:max-w-[460px] lg:justify-end" aria-label="Software law firms use">
        <li class="rounded-full border border-line bg-paper px-3.5 py-1.5 text-[15px] font-semibold">Clio</li><li class="rounded-full border border-line bg-paper px-3.5 py-1.5 text-[15px] font-semibold">LEAP</li><li class="rounded-full border border-line bg-paper px-3.5 py-1.5 text-[15px] font-semibold">Actionstep</li><li class="rounded-full border border-line bg-paper px-3.5 py-1.5 text-[15px] font-semibold">Osprey</li><li class="rounded-full border border-line bg-paper px-3.5 py-1.5 text-[15px] font-semibold">Google Calendar</li><li class="rounded-full border border-line bg-paper px-3.5 py-1.5 text-[15px] font-semibold">Microsoft 365</li>
      </ul>
    </div>
  </div>
</section>

<section id="use-cases" data-component="Industries">
  <div class="container-omh py-14 lg:py-20">
    <p class="eyebrow"><span class="eyebrow-mark" aria-hidden="true"><i></i><i></i><i></i></span>Use cases</p>
    <h2>Law firm use cases <span class="hl">by type of call</span></h2>
    <p class="mt-5 text-muted">A law firm's reception gets the same eight kinds of call, day in, day out, and any AI receptionist for lawyers and law firms has to handle all of them. We script your agent around each one. Pick a call to see how the agent handles it.</p>
    <div class="mt-8" data-tabs>
      <div role="tablist" aria-label="Choose a type of call" class="flex flex-wrap gap-2">
${industries.map(industryTab).join("\n")}
      </div>
${industries.map(industryPanel).join("\n")}
    </div>
    <div class="fit-band mt-8 flex flex-col gap-4 rounded-[16px] bg-sand p-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p class="font-display text-[18px] font-semibold">Not sure how your calls would fit?</p>
        <p class="mt-1 text-[16px] text-muted">Tell us who rings your firm and why. We'll map your calls and show you what the agent would handle and what it would pass to your fee earners.</p>
      </div>
      ${primaryCta("industries_book_demo", "shrink-0")}
    </div>
  </div>
</section>

<section id="pricing" data-component="Pricing" class="border-y border-line bg-surface">
  <div class="container-omh py-14 lg:py-20">
    <p class="eyebrow"><span class="eyebrow-mark" aria-hidden="true"><i></i><i></i><i></i></span>Pricing</p>
    <h2>AI voice agent pricing <span class="hl">for law firms</span></h2>
    <p class="mt-5 text-muted">Three plans, billed monthly, no minimum contract. Every plan includes a managed agent, a British voice, a summary of every call and a monthly report. Prices exclude VAT.</p>

    <div class="mt-10 grid gap-5 lg:grid-cols-3 lg:items-stretch">
${lawPricing.plans.map(plan).join("\n")}
    </div>

    <dl class="mt-12 border-t border-line">
${lawPricing.notes.map(([k, v]) => `      <div class="grid gap-1 border-b border-line py-4 sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-8"><dt class="text-[16px] font-semibold uppercase tracking-[0.14em] text-muted">${k}</dt><dd class="text-[16px] leading-[1.5]">${v}</dd></div>`).join("\n")}
    </dl>
  </div>
</section>

`;
