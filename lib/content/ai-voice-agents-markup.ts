// Body of /ai-voice-agents, rebuilt 20 Oct 2026 for conversion (docs/ai-voice-agents-cro/). Rendered as HTML
// by app/ai-voice-agents/page.tsx; the interactive parts (greeting builder, industry tabs, comparison
// selector, sticky bar, lazy ROI frame, tracking) are wired by components/voice-agents/VoiceAgentsScript.tsx,
// which finds them by data-* hooks. Styles: app/ai-voice-agents/voice-agents.css (everything under .va-page).
// The sections kept from the previous page are in ai-voice-agents-legacy.ts and ai-voice-agents-landing-v4.ts.
// The page as it was before this rebuild is frozen at git tag `oldv2` (lib/content/ai-voice-agents-oldv2/ in that tag).
import { mainPagePricing } from "@/lib/content/voice-pricing";

export const faqTopics = { callers: "Callers and AI", setup: "Setup and systems", data: "Data and rules", sectors: "Health and legal", working: "Working with us" };

/** The FAQ section, word for word from the SEO brief (19 Oct 2026). page.tsx builds the FAQPage JSON-LD from this list. */
export const voiceFaqs: { q: string; a: string; cat: keyof typeof faqTopics }[] = [
  { cat: "callers", q: "What is the difference between an AI voice agent and an AI receptionist?",
    a: "The two terms overlap, and many people use them for the same thing. An AI receptionist usually means an agent that answers inbound calls, takes messages and books appointments. An AI voice agent can do that and more, such as calling new web leads back, following up quotes and routing calls between departments. Our Starter plan works as an AI receptionist, and Growth and Scale add the wider voice agent features." },
  { cat: "working", q: "How much does an AI voice agent cost in the UK?",
    a: "Our managed AI voice agent starts at £249 a month plus VAT with 300 minutes included, and a one-off setup fee from £795. Growth is £449 a month and Scale is £849 a month. Extra minutes cost 60p each on every plan. DIY tools can cost less, but you build and maintain them yourself." },
  { cat: "data", q: "Is it legal to use an AI voice agent in the UK?",
    a: "Yes, when it's set up properly. Calls that involve personal data come under UK GDPR, and outbound calls must follow PECR, including Telephone Preference Service checks where they apply. Our agents tell every caller they're speaking to an AI, say when calls are recorded and only make outbound calls to people who have given consent." },
  { cat: "callers", q: "Will callers know they are talking to an AI?",
    a: "Yes. We set every agent up to say it's an AI assistant at the start of the call. Callers deserve to know, and it avoids awkward moments later in the conversation." },
  { cat: "callers", q: "Can the agent transfer a call to a real person?",
    a: "Yes, on the Growth and Scale plans. You set the rules: emergencies, existing clients, complaints and anyone who asks for a person can be put through to the right phone. Outside your opening hours, and on the Starter plan, the agent takes a detailed message and sends it to your team." },
  { cat: "callers", q: "What happens when the agent doesn't know the answer?",
    a: "It says so. The agent answers only from information you have approved, so when a question falls outside that, it offers to take a message or transfer the call. We review those moments and add the answers worth adding." },
  { cat: "setup", q: "Which calendars and systems does it work with?",
    a: "The agent needs somewhere to put bookings and call notes, usually your calendar and your CRM or practice system. We check your exact tools during discovery and tell you plainly what connects directly, what needs a workaround and what isn't possible yet." },
  { cat: "setup", q: "Can we keep our existing phone number, or get a local one?",
    a: "In most cases you keep your number and divert calls to the agent, either all of them or only the ones your team can't answer. If you want a new local number, such as an 0161 number for Manchester, we can arrange one as part of setup." },
  { cat: "data", q: "Are calls recorded, and how does that fit with UK GDPR?",
    a: "Calls can be recorded and transcribed so you can review them, and callers are told at the start of the call. You remain the data controller and OMH acts as your processor under a written agreement. We agree retention periods with you and delete recordings on that schedule." },
  { cat: "data", q: "What are the rules for outbound calls?",
    a: "The agent only calls people who have given appropriate consent, such as customers who asked for a reminder or a call back. We follow the UK PECR rules, screen lists against the Telephone Preference Service where required and act on opt-outs straight away. We don't run cold calling campaigns to bought or non-consented lists." },
  { cat: "sectors", q: "Is it suitable for dental clinics and healthcare providers?",
    a: "Yes, for bookings, routing and practical questions such as opening hours, fees and directions. The agent never gives clinical or medical advice. Anything clinical goes to your team, and urgent calls follow the emergency route you set." },
  { cat: "sectors", q: "Is it suitable for law firms?",
    a: "Yes, for taking new enquiries, booking consultations and routing existing clients. The agent never gives legal advice and doesn't comment on the merits of a matter. It collects the details and gets the caller to the right person." },
  { cat: "setup", q: "How long does setup take?",
    a: "Starter goes live in 3 working days, Growth in 5 to 7 and Scale in 12 to 15. The clock starts once we have your content and diary access. If your calls are more complex than usual, we give you a realistic timeline after the discovery call, before you commit to anything." },
  { cat: "working", q: "Is there a minimum contract?",
    a: "Plans are billed monthly with 30 days' notice. We set out the terms in writing before you start, including what's included each month and what counts as extra. There are no hidden usage fees, and every invoice shows your included minutes and any overage." },
  { cat: "working", q: "We're not in one of your six cities. Can we still work with you?",
    a: "Yes. We're based in Hullbridge, Essex and work with businesses across the UK remotely. London, Birmingham, Manchester, Leeds, Liverpool and Bristol are where we focus our voice agent work at the moment." },
];

const icon = (name: string, cls = "") => `<svg class="icon${cls && " " + cls}" aria-hidden="true" focusable="false"><use href="#i-${name}"/></svg>`;
const tick = (text: string) => `<li class="flex gap-2.5">${icon("check", "mt-[3px] text-hl")}<span>${text}</span></li>`;
const cross = (text: string) => `<li class="flex gap-2.5">${icon("x", "mt-[3px]")}<span>${text}</span></li>`;
const tag = (text: string) => `<span class="tag">${text}</span>`;
const primaryCta = (track: string, cls = "") =>
  `<a href="#book-demo-form" class="btn btn-primary${cls && " " + cls}" data-track="${track}">Book a 30-Minute Demo</a>`;

/* ----------------------------------------------------------- Industries */
// Every H3, intro, bullet, safeguard and link from the two industry sections of the previous page, in one panel.
const industries = [
  { id: "estate", icon: "home", link: "AI voice agent for estate and letting agents", label: "Estate & Letting", full: "Estate & Letting Agents", tint: 1, href: "/ai-voice-agents/estate-letting-agents", slug: "real-estate-letting-agents",
    time: "Missed call · 23:40", status: "Answered by your AI agent", caller: "Is the house on Willow Creek still available?", agent: "It is. Would Saturday at 10am work for a viewing?", booked: "Viewing booked: Sat 10:00",
    h3: "Estate and letting agents: book viewings day or night",
    p: "Buyers, sellers and tenants call when they see a board or a listing, often while your team is out on appointments. The agent answers from your live listings and books the viewing.",
    bullets: ["Answers questions on price, rooms and availability", "Qualifies buyers, sellers and tenants", "Books viewings and valuations, and logs tenant maintenance calls"] },
  { id: "dental", icon: "tooth", link: "AI receptionist for dental clinics", label: "Dental", full: "Dental Clinics", tint: 3, href: "/ai-voice-agents/dentists", slug: "dentists",
    time: "Call · 07:05", status: "Before the practice opens", caller: "I've cracked a tooth. Can I be seen today?", agent: "Sorry to hear that. I have an emergency slot at 9:15 this morning.", booked: "Emergency slot booked: 09:15",
    h3: "Dental clinics: fill the diary when reception is closed",
    p: "New patients ring around until someone answers. Your AI receptionist books check-ups, moves appointments and sends emergencies to the right person, without putting anyone on hold.",
    bullets: ["Books new patients, check-ups and hygiene visits", "Routes dental emergencies to your on-call dentist or emergency line", "Handles reschedules and cancellations"], note: "No clinical or medical advice given." },
  { id: "clinics", icon: "stethoscope", link: "AI receptionist for clinics and healthcare", label: "Clinics", full: "Clinics & Healthcare", tint: 2, href: "/ai-voice-agents/healthcare", slug: "healthcare",
    time: "Call · 08:31", status: "6 other calls answered at the same time", caller: "Do you have a physio appointment this week?", agent: "Yes, Tuesday at 2:30pm with Dr Patel. Shall I book it?", booked: "Appointment booked: Tue 14:30",
    h3: "Clinics and healthcare: book appointments without a queue on the line",
    p: "Busy mornings mean engaged tones and lost patients. The agent answers many calls at once, books the right practitioner and sends the details to your team.",
    bullets: ["Books, moves and cancels appointments across practitioners", "Answers questions on services, prices, opening hours and directions", "Passes anything clinical to your team with a summary"], note: "No clinical or medical advice given." },
  { id: "plumbers", icon: "drop", link: "AI answering service for plumbers", label: "Plumbers", full: "Plumbers", tint: 4, href: "/ai-voice-agents/plumbers", slug: "plumbers",
    time: "Call · 22:14", status: "Urgent: water leak", caller: "There's water coming through my kitchen ceiling.", agent: "Turn off the stopcock under the sink. Sam can be with you in 40 minutes.", booked: "Engineer dispatched: ETA 40 min",
    h3: "Plumbers: catch every emergency call, day or night",
    p: "A burst pipe at 10pm goes to whoever answers first. The agent takes the address and the problem, then gets the job to your on-call engineer straight away.",
    bullets: ["Takes the address, issue and access details", "Sends urgent jobs to whoever is on call", "Books routine jobs and quote visits into your diary"] },
  { id: "hvac", icon: "flame", link: "AI call answering for heating engineers", label: "Heating", full: "Heating Engineers", tint: 1, href: "/ai-voice-agents/heating-hvac", slug: "heating-hvac",
    time: "Call · 18:48", status: "Peak season", caller: "My heating stopped working this evening.", agent: "I can get an engineer to you tomorrow at 8am. Does that work?", booked: "Service call booked: Tomorrow 08:00",
    h3: "Heating engineers: book service calls through the winter rush",
    p: "When the first cold snap hits, the phone never stops. The agent books services, repairs and quotes, so your engineers spend the day on jobs instead of on the phone.",
    bullets: ["Books boiler services, repairs and installs", "Records make, model and fault code", "Puts no-heating calls first, and tells anyone who smells gas to call the gas emergency line on 0800 111 999"] },
  { id: "builders", icon: "hard-hat", link: "AI voice agent for builders and contractors", label: "Builders", full: "Builders & Contractors", tint: 3, href: "/ai-voice-agents/builders-construction", slug: "builders-construction",
    time: "Missed call · 14:20", status: "You were on site", caller: "We're looking for a quote on a kitchen extension.", agent: "Great. I can book a free site visit on Thursday at 4pm.", booked: "Site visit booked: Thu 16:00",
    h3: "Builders and contractors: turn quote requests into site visits",
    p: "You can't answer the phone from a roof. The agent asks about the job, budget and timing, then books a site visit with the right estimator.",
    bullets: ["Takes the brief: type, size, budget and start date", "Filters out jobs you don't take on", "Books site visits and routes existing clients to their site manager"] },
  { id: "law", icon: "scale", link: "AI receptionist for law firms", label: "Law firms", full: "Law Firms", tint: 2, href: "/ai-voice-agents/law-firms", slug: "law-firms",
    time: "Call · 20:52", status: "After office hours", caller: "I need advice about a tenancy dispute.", agent: "I can book you a consultation with our property team on Monday at 11.", booked: "Consultation booked: Mon 11:00",
    h3: "Law firms: take intake calls and book consultations",
    p: "People call a few firms and go with the first one that listens. The agent takes the details, checks the area of law and books a consultation while fee earners are in court or meetings.",
    bullets: ["Takes intake details for each practice area", "Collects names for your conflict check", "Books consultations and routes existing clients to their named solicitor"], note: "No legal advice given." },
  { id: "cars", icon: "car", link: "AI voice agent for car dealerships", label: "Car dealers", full: "Car Dealerships", tint: 4, href: "/ai-voice-agents/car-dealerships", slug: "car-dealerships",
    time: "Call · Sunday 16:10", status: "Showroom closed", caller: "Is the blue hybrid SUV still in stock?", agent: "It is. Would you like a test drive on Saturday at 10?", booked: "Test drive booked: Sat 10:00",
    h3: "Car dealerships: book test drives and service slots",
    p: "Buyers enquire on several forecourts at once. The agent answers stock questions, books test drives and fills the service bay.",
    bullets: ["Answers questions on stock, part-exchange and opening hours", "Books test drives with your sales team", "Books MOTs and services into the workshop"] },
  { id: "accountants", icon: "book", link: "AI receptionist for accountants", label: "Accountants", full: "Accountants & Financial Advisers", tint: 1, href: "/ai-voice-agents/accountants-financial-advisers", slug: "accountants-financial-advisers",
    time: "Call · 17:35", status: "January rush", caller: "I need to get my self-assessment in. Can someone call me back?", agent: "Of course. I can book you a call with your accountant tomorrow at 9:30.", booked: "Call booked: Tomorrow 09:30",
    h3: "Accountants and financial advisers: every client call answered in the January rush",
    p: "Clients ring with deadlines, documents and questions while the team is heads-down. The agent takes the details, books the meeting and passes anything that needs an adviser to your team.",
    bullets: ["Books meetings and takes new enquiries", "Answers from the information you approve", "Passes anything that needs an adviser to your team"], note: "No financial advice given." },
  { id: "salons", icon: "users", link: "AI receptionist for salons", label: "Salons", full: "Salons & Beauty", tint: 3, href: "/ai-voice-agents/salons", slug: "salons",
    time: "Call · 11:20", status: "Every chair is full", caller: "Can I move my cut and colour to Thursday?", agent: "Yes. Thursday at 2pm with Jade is free. Shall I move it?", booked: "Appointment moved: Thu 14:00",
    h3: "Salons and beauty: every booking call answered when every chair is full",
    p: "Booking calls come in while stylists have their hands full. The agent books, moves and cancels appointments and fills the gaps that cancellations leave.",
    bullets: ["Books and moves appointments", "Fills cancellations", "Answers questions on services, prices and opening hours"] },
  { id: "trades", icon: "wrench", link: "AI receptionist for trades", label: "Trades", full: "Trades", tint: 4, href: "/ai-voice-agents/trades", slug: "trades",
    time: "Missed call · 10:05", status: "You were up a ladder", caller: "Can you quote for rewiring a three-bed house?", agent: "Yes. I can book a site visit on Tuesday at 4pm.", booked: "Site visit booked: Tue 16:00",
    h3: "Trades: every job call answered while you are on the job",
    p: "Electricians, carpenters, cleaners, roofers and landscapers cannot answer the phone mid-job. The agent takes the quote request, books the visit and sends urgent jobs to whoever is on call.",
    bullets: ["Takes quote requests and books site visits", "Sends urgent jobs to whoever is on call", "Texts you a summary of every call"], note: "No technical advice given." },
];

const callVis = (x: { time: string; status: string; caller: string; agent: string; booked: string; tint: number }) => `
          <div class="mini"><span class="icon-tile">${icon("phone-missed")}</span><span class="min-w-0"><b class="block">${x.time}</b><span class="text-[14px] font-semibold text-ok">${x.status}</span></span></div>
          <div class="chat">
            <p><span class="who">Caller</span>${x.caller}</p>
            <p class="ai"><span class="who">Your AI agent</span>${x.agent}</p>
          </div>
          <span class="booked">${icon("check")}${x.booked}</span>`;

const industryTab = (x: (typeof industries)[number], i: number) =>
  `        <button type="button" role="tab" id="tab-${x.id}" aria-controls="uc-${x.id}" aria-selected="${i === 0}" tabindex="${i ? -1 : 0}" class="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-[var(--va-line-strong)] px-4 text-[16px] font-semibold aria-selected:border-ink aria-selected:bg-ink aria-selected:text-paper" data-tab data-track="industry_select" data-track-name="${x.full}">${icon(x.icon)}${x.label}</button>`;

const industryPanel = (x: (typeof industries)[number], i: number) => `
      <div role="tabpanel" id="uc-${x.id}" aria-labelledby="tab-${x.id}"${i ? " hidden" : ""} class="mt-6 grid overflow-hidden rounded-[22px] border border-line bg-surface lg:grid-cols-2" data-tab-panel>
        <div class="call-vis" style="--tint:var(--va-tint-${x.tint})" aria-hidden="true">${callVis(x)}
        </div>
        <div class="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
          <p class="flex items-center gap-2 text-[14px] font-semibold uppercase tracking-[0.14em] text-muted">${icon(x.icon, "text-hl")}${x.full}<span class="ml-1 tnum">${String(i + 1).padStart(2, "0")} / ${String(industries.length).padStart(2, "0")}</span></p>
          <h3 class="mt-3 !text-[clamp(23px,21px+.5vw,28px)]">${x.h3}</h3>
          <p class="mt-3 text-[16px] text-muted">${x.p}</p>
          <ul class="mt-5 space-y-2 text-[16px] leading-snug">
${x.bullets.map(tick).join("\n")}
          </ul>
${x.note ? `          <p class="mt-4 inline-flex items-center gap-2 self-start rounded-[10px] border border-line bg-paper px-3 py-2 text-[15px] font-semibold">${icon("shield", "text-hl")}${x.note}</p>\n` : ""}          ${x.href ? `<p class="mt-6"><a href="${x.href}" class="text-link" data-track="industry_click" data-track-name="${x.full}">More about our ${x.link}${icon("arrow-right")}</a></p>` : ""}
        </div>
      </div>`;

/* --------------------------------------------------------------- Pricing */
const plan = (p: (typeof mainPagePricing.plans)[number]) => {
  const shown = p.features.slice(0, 4);
  const rest = p.features.slice(4);
  return `      <article id="plan-${p.id}" class="relative flex flex-col rounded-[16px] border bg-surface p-6 sm:p-7 ${p.popular ? "border-gold shadow-[0_0_0_1px_var(--color-teal),0_28px_60px_-32px_rgb(var(--accent-rgb)/0.6)] lg:-mt-3 lg:mb-3" : "border-line"}" data-tier="${p.id}">
        ${p.popular ? '<span class="absolute -top-4 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-gold px-4 py-1.5 font-display text-[15px] font-semibold text-navy shadow-[0_10px_24px_-10px_rgb(var(--accent-rgb)/0.9)]">' + icon("plus-star", "!h-3.5 !w-3.5") + 'Where most clients start</span>' : ""}
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
// The six capabilities, each with the mock-up from the previous card, what the agent does and what OMH does.
const capabilities = [
  { id: "answer", icon: "phone", title: "First-ring answering, 24/7",
    vis: `<div class="mini"><span class="icon-tile">${icon("phone")}</span><span class="min-w-0"><b class="block">Call · 02:14</b><span class="text-[14px] font-semibold text-ok">Answered on the first ring</span></span></div>
          <div class="mini">${icon("users", "text-ok")}<span>3 more callers answered at the same time</span></div>`,
    agent: "Every call answered straight away, including nights, weekends and bank holidays. It handles many calls at once, so nobody hears an engaged tone.",
    omh: "We forward your number, set your opening hours and agree the rules for what it picks up and when. Nothing goes live without your sign-off." },
  { id: "voice", icon: "mic", title: "Sounds like your front desk",
    vis: `<div class="mini"><span class="icon-tile">${icon("mic")}</span><span class="min-w-0"><b class="block">Ava · Your assistant</b><span class="text-[14px] text-muted">Your name, greeting and voice</span></span></div>
          <div class="mini justify-center py-3"><span class="mini-wave"><i></i><i></i><i></i><i></i><i></i></span><span class="ml-2 text-[14px] font-semibold">"Thanks for calling, how can I help?"</span></div>`,
    agent: "Your business name, your greeting and a British voice that suits your callers. Callers can interrupt, change their mind or ask for a person, and OMH is never mentioned on a call.",
    omh: "We write the script around the real reasons people ring you, then you make test calls and adjust it with us until it sounds like your business." },
  { id: "knows", icon: "book", title: "Knows your services and prices",
    vis: `<div class="flex flex-wrap justify-center gap-2"><span class="mini-chip">${icon("check", "text-ok")}Services</span><span class="mini-chip">${icon("check", "text-ok")}Prices</span><span class="mini-chip">${icon("check", "text-ok")}Opening hours</span><span class="mini-chip">${icon("check", "text-ok")}Service area</span><span class="mini-chip">${icon("check", "text-ok")}FAQs</span></div>
          <div class="mini">${icon("book", "text-hl")}<span>Trained on <b>your</b> business, not the internet</span></div>`,
    agent: "It answers only from information you approve: services, prices, opening hours, service areas and FAQs. If a question falls outside that, it says so and takes a message.",
    omh: "We load that information for you, and on Growth and Scale we read a sample of transcripts every month, see what it couldn't answer and add the answers worth adding." },
  { id: "books", icon: "calendar", title: "Books into your calendar without clashes",
    vis: `<div class="vcal-head"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span></div>
          <div class="vcal"><span class="busy"></span><span></span><span class="busy"></span><span></span><span class="busy"></span><span></span><span class="busy"></span><span class="new"></span><span class="busy"></span><span></span><span class="busy"></span><span></span><span></span><span class="busy"></span><span></span></div>
          <div class="mini">${icon("calendar", "text-ok")}<span><b>Booked:</b> Wed 11:00, no clash</span></div>`,
    agent: "It checks your live calendar, respects buffers, travel time and blocked hours, and texts the caller a confirmation.",
    omh: "We connect your calendar, plus your CRM or practice system on Growth and Scale, and tell you on the discovery call what connects directly and what needs a workaround." },
  { id: "transfer", icon: "transfer", title: "Warm transfer to a person", plan: "Growth and Scale",
    vis: `<div class="mini"><span class="icon-tile">${icon("user")}</span><span class="min-w-0"><b class="block">Caller asks for a person</b><span class="text-[14px] text-muted">"Can I speak to Sam?"</span></span></div>
          <div class="mini">${icon("transfer", "text-hl")}<span><b>Transferring to Sam</b> with a quick briefing</span></div>`,
    agent: "The caller is put through to the right person with a quick briefing first, so they never have to repeat themselves. Outside your hours it takes a detailed message instead.",
    omh: "You choose who gets put through and when: emergencies, existing clients, complaints, anyone who asks for a person. We set those rules and test them with you." },
  { id: "leads", icon: "timer", title: "Calls web leads back and follows up", plan: "Growth and Scale",
    vis: `<div class="mini"><span class="icon-tile">${icon("globe")}</span><span class="min-w-0"><b class="block">New web form · 14:02</b><span class="text-[14px] text-muted">Boiler quote request</span></span></div>
          <div class="mini">${icon("timer", "text-ok")}<span><b>Called back</b> in 42 seconds</span></div>
          <div class="mini justify-between"><span><b>Quote sent, no reply</b></span><span class="text-[14px] font-semibold text-ok">Visit booked</span></div>`,
    agent: "Form fills and ad leads get a call within 60 seconds, while they're still on your website. It also calls people who have agreed to hear from you about quotes, reminders and missed appointments.",
    omh: "Every call is summarised and emailed to you; on Growth and Scale the details go into your CRM, and on Scale calls answered, bookings made and transfers are reported beside your Google Ads and website figures." },
];

const capTab = (c: (typeof capabilities)[number], i: number) =>
  `        <button type="button" role="tab" id="cap-tab-${c.id}" aria-controls="cap-${c.id}" aria-selected="${i === 0}" tabindex="${i ? -1 : 0}" class="cap-tab" data-tab data-track="capability_select" data-track-name="${c.title}"><span class="icon-tile">${icon(c.icon)}</span><span class="min-w-0"><span class="block font-display text-[17px] font-semibold leading-tight">${c.title}</span>${c.plan ? `<span class="mt-1 block">${tag(c.plan)}</span>` : ""}</span>${icon("arrow-right", "ml-auto hidden shrink-0 text-hl lg:block")}</button>`;

const capPanel = (c: (typeof capabilities)[number], i: number) => `
      <div role="tabpanel" id="cap-${c.id}" aria-labelledby="cap-tab-${c.id}"${i ? " hidden" : ""} class="rounded-[22px] border border-line bg-surface p-5 sm:p-7" data-tab-panel>
        <div class="fcard-vis" aria-hidden="true">
          ${c.vis}
        </div>
        <h3 class="mt-5 !text-[clamp(22px,20px+.5vw,26px)]">${c.title}</h3>${c.plan ? `<p class="mt-2">${tag(c.plan)}</p>` : ""}
        <div class="mt-4 grid gap-3 sm:grid-cols-2">
          <div class="rounded-[14px] bg-paper p-4"><p class="flex items-center gap-2 text-[14px] font-semibold uppercase tracking-[0.12em] text-muted">${icon("phone", "text-hl")}The agent</p><p class="mt-2 text-[16px]">${c.agent}</p></div>
          <div class="rounded-[14px] bg-paper p-4"><p class="flex items-center gap-2 text-[14px] font-semibold uppercase tracking-[0.12em] text-muted">${icon("users", "text-hl")}OMH, for you</p><p class="mt-2 text-[16px]">${c.omh}</p></div>
        </div>
      </div>`;

/* ------------------------------------------------------------------ Page */
export const voiceAgentsMarkup = String.raw`
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
  <symbol id="i-timer" viewBox="0 0 24 24"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2M10 2h4"/></symbol>
</svg>

<section id="what-is" data-component="WhatIs" class="on-band relative overflow-hidden bg-band text-band-ink">
  <div class="pointer-events-none absolute right-[-10%] top-1/2 h-[620px] w-[620px] -translate-y-1/2 rounded-full bg-gold/15 blur-3xl" aria-hidden="true"></div>
  <div class="container-omh relative grid grid-cols-[minmax(0,1fr)] items-start gap-10 py-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,.95fr)] lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-10 lg:py-24" data-brand
    data-brand-biz='[{"id":"law","label":"Law firm","name":"Hartwell Reeve Solicitors","city":"Birmingham","num":"0121 496 0147","agent":"Grace","kind":"firm&#39;s","initials":"HR","voice":"British English, calm and measured","never":"Gives legal advice","transfer":"Existing clients go to their named solicitor","caller":"I need advice about a tenancy dispute.","reply":"I can book you a consultation with our property team on Monday at 11.","booked":"Consultation booked: Mon 11:00","summary":"Summary sent to the property team: new enquiry, tenancy dispute"},{"id":"dental","label":"Dental clinic","name":"Albion Square Dental","city":"Manchester","num":"0161 496 0123","agent":"Amy","kind":"practice&#39;s","initials":"AS","voice":"British English, warm and friendly","never":"Gives clinical advice","transfer":"Dental emergencies go to the on-call line","caller":"I&#39;ve cracked a tooth. Can I be seen today?","reply":"Sorry to hear that. I have an emergency slot at 9:15 this morning.","booked":"Emergency slot booked: 09:15","summary":"Summary emailed to reception: emergency appointment, 9:15"},{"id":"plumber","label":"Plumber","name":"Severn Plumbing","city":"Bristol","num":"0117 496 0135","agent":"Sam","kind":"team&#39;s","initials":"SP","voice":"British English, relaxed","never":"Quotes a price it has not been given","transfer":"Burst pipes go straight to the plumber on call","caller":"There&#39;s water coming through my kitchen ceiling.","reply":"Turn off the stopcock under the sink. Sam can be with you in 40 minutes.","booked":"Engineer dispatched: ETA 40 min","summary":"Summary texted to Sam: address, fault and access details"}]'>
    <div class="lg:col-start-1 lg:row-start-1">
      <h2>What is an <span class="hl">AI voice agent?</span></h2>
      <p class="mt-5 text-band-muted">An AI voice agent is software that answers and makes phone calls for your business in natural, spoken conversation. It understands what the caller wants, answers from information you have approved, books appointments into your calendar and passes anything it can't handle to a person on your team, with a summary of the call.</p>
      <p class="mt-4 text-band-muted">Callers don't press buttons or leave voicemails. They say what they need, and the agent responds the way a well-trained receptionist would. The difference with OMH is that we set it up and run it for you: we write the script around your real calls, connect your diary and systems, and keep improving it.</p>
    </div>

    <div class="order-last lg:order-none lg:col-start-1 lg:row-start-2">
      <h3 class="!text-[22px]">How does an AI voice agent work?</h3>
      <p class="mt-1 text-[16px] text-band-muted">Watch the phone. Each step lights up as the call reaches it.</p>
      <ol class="mt-5 space-y-2.5" aria-live="off">
        <li class="flex gap-4 rounded-[14px] border border-band-line p-4" data-brand-step="1"><span class="step-num" aria-hidden="true">1</span><span class="text-[16px] leading-snug"><strong class="block font-display text-[17.5px] font-semibold">It listens.</strong><span class="text-band-muted">Speech recognition turns what the caller says into text as they speak.</span></span></li>
        <li class="flex gap-4 rounded-[14px] border border-band-line p-4" data-brand-step="2"><span class="step-num" aria-hidden="true">2</span><span class="text-[16px] leading-snug"><strong class="block font-display text-[17.5px] font-semibold">It works out the answer.</strong><span class="text-band-muted">The AI matches the request to your approved information and booking rules.</span></span></li>
        <li class="flex gap-4 rounded-[14px] border border-band-line p-4" data-brand-step="3"><span class="step-num" aria-hidden="true">3</span><span class="text-[16px] leading-snug"><strong class="block font-display text-[17.5px] font-semibold">It replies and acts.</strong><span class="text-band-muted">It answers in a natural voice, books the slot or transfers the call.</span></span></li>
        <li class="flex gap-4 rounded-[14px] border border-band-line p-4" data-brand-step="4"><span class="step-num" aria-hidden="true">4</span><span class="text-[16px] leading-snug"><strong class="block font-display text-[17.5px] font-semibold">It reports back.</strong><span class="text-band-muted">You get a summary of every call. Callers can interrupt or change their mind at any point.</span></span></li>
      </ol>
    </div>

    <div class="mx-auto w-full max-w-[420px] lg:col-start-2 lg:row-span-2 lg:row-start-1">
      <div class="rounded-[14px] border border-band-line bg-band-surface p-4 sm:p-5">
        <p class="font-display text-[18px] font-semibold">Try it: pick a business and a tone, then listen in</p>
        <div class="mt-3 flex flex-wrap items-center gap-2">
          <div role="radiogroup" aria-label="Business" class="flex flex-wrap gap-2" data-brand-group="biz">
            <button type="button" role="radio" aria-checked="true" tabindex="0" class="min-h-[44px] rounded-full border border-[rgb(247_246_242/.35)] px-4 text-[15.5px] font-semibold text-band-ink aria-checked:border-gold aria-checked:bg-gold aria-checked:text-navy" data-brand-opt="law" data-track="branding_biz" data-track-name="Law firm">Law firm</button>
            <button type="button" role="radio" aria-checked="false" tabindex="-1" class="min-h-[44px] rounded-full border border-[rgb(247_246_242/.35)] px-4 text-[15.5px] font-semibold text-band-ink aria-checked:border-gold aria-checked:bg-gold aria-checked:text-navy" data-brand-opt="dental" data-track="branding_biz" data-track-name="Dental clinic">Dental clinic</button>
            <button type="button" role="radio" aria-checked="false" tabindex="-1" class="min-h-[44px] rounded-full border border-[rgb(247_246_242/.35)] px-4 text-[15.5px] font-semibold text-band-ink aria-checked:border-gold aria-checked:bg-gold aria-checked:text-navy" data-brand-opt="plumber" data-track="branding_biz" data-track-name="Plumber">Plumber</button>
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
            <div class="ml-8 rounded-[14px_4px_14px_14px] bg-[#000] p-3 text-[#f7f6f2]" data-brand-line="caller"><span class="block text-[12.5px] font-semibold text-[rgb(247_246_242/0.6)]">Caller</span><span data-brand-caller>I need advice about a tenancy dispute.</span></div>
            <div class="rounded-[4px_14px_14px_14px] bg-white p-3 shadow-[0_10px_30px_-20px_rgb(0_0_0/0.6)]" data-brand-line="agent"><span class="block text-[12.5px] font-semibold text-[var(--color-amber-deep)]"><span data-brand-agent2>Grace</span></span><span class="font-semibold" data-brand-reply>I can book you a consultation with our property team on Monday at 11.</span></div>
            <p class="booked !text-[14px]" data-brand-outcome>${icon("check")}<span data-brand-booked>Consultation booked: Mon 11:00</span></p>
            <p class="flex items-center gap-2 rounded-[10px] bg-white/70 px-3 py-2 text-[13.5px]" data-brand-line="summary">${icon("mail", "shrink-0 text-hl")}<span data-brand-summary>Summary sent to the property team: new enquiry, tenancy dispute</span></p>
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
    <h2>What your AI voice agent does, <span class="hl">and what we do for you</span></h2>
    <p class="mt-5 text-muted">Everything a good front desk does on the phone, without adding to the payroll. Pick a capability to see it in action and how OMH runs it for you. Features marked Growth and Scale aren't on the Starter plan.</p>

    <div class="mt-10 grid gap-5 lg:grid-cols-[minmax(0,.4fr)_minmax(0,.6fr)] lg:items-start" data-tabs>
      <div role="tablist" aria-label="Capabilities" aria-orientation="vertical" class="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
${capabilities.map(capTab).join("\n")}
      </div>
${capabilities.map(capPanel).join("\n")}
    </div>

    <h3 class="mt-14 !text-[24px]">Why choose OMH to run <span class="hl">your AI voice agent?</span></h3>
    <p class="mt-3 text-muted">The software is the easy part. Running it well is the job. Anyone can sign up for a voice AI tool. Whether it works for your business depends on the script, the testing and someone checking the calls every month. That's the part we do.</p>
    <ol class="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <li class="rounded-[14px] border border-line bg-surface p-5"><p class="num text-[15px]">01</p><h4 class="mt-2 !text-[19px]">Built around your industry's calls</h4><p class="mt-2 text-[16px] text-muted">We start from the real reasons people ring you: the boiler fault, the viewing request, the cancelled appointment. The script, questions and handover rules follow from those.</p></li>
      <li class="rounded-[14px] border border-line bg-surface p-5"><p class="num text-[15px]">02</p><h4 class="mt-2 !text-[19px]">Tested before your customers hear it</h4><p class="mt-2 text-[16px] text-muted">You make test calls and sign off the agent before it goes live. After that you deal with our UK team, not a ticket queue, and Scale clients get a named account manager.</p></li>
      <li class="rounded-[14px] border border-line bg-surface p-5"><p class="flex items-center gap-3"><span class="num text-[15px]">03</span>${tag("Growth and Scale")}</p><h4 class="mt-2 !text-[19px]">Improved every month</h4><p class="mt-2 text-[16px] text-muted">Every month we read a sample of transcripts, look at what the agent couldn't answer and improve it. You get a short written summary of what we changed and why.</p></li>
      <li class="rounded-[14px] border border-line bg-surface p-5"><p class="flex items-center gap-3"><span class="num text-[15px]">04</span>${tag("Scale")}</p><h4 class="mt-2 !text-[19px]">Call results beside your marketing figures</h4><p class="mt-2 text-[16px] text-muted">Calls answered, bookings made and calls transferred sit in the same report as your <a href="/google-adwords-ppc" class="text-ink underline decoration-gold decoration-2 underline-offset-4 hover:text-hl">Google Ads</a> and <a href="/website-designs" class="text-ink underline decoration-gold decoration-2 underline-offset-4 hover:text-hl">website</a> figures, so you can follow an enquiry from click to booked job.</p></li>
    </ol>
  </div>
</section>

<section id="use-cases" data-component="Industries">
  <div class="container-omh py-14 lg:py-20">
    <p class="eyebrow"><span class="eyebrow-mark" aria-hidden="true"><i></i><i></i><i></i></span>Use cases</p>
    <h2>AI voice agent use cases <span class="hl">by industry</span></h2>
    <p class="mt-5 text-muted">We set up AI voice agents for eight types of business that live on the phone. Each agent is scripted around the calls your sector actually gets. Pick yours to see what it handles.</p>
    <div class="mt-8" data-tabs>
      <div role="tablist" aria-label="Choose an industry" class="flex flex-wrap gap-2">
${industries.map(industryTab).join("\n")}
      </div>
${industries.map(industryPanel).join("\n")}
    </div>
    <div class="fit-band mt-8 flex flex-col gap-4 rounded-[16px] bg-sand p-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p class="font-display text-[18px] font-semibold">Not sure how your calls would fit?</p>
        <p class="mt-1 text-[16px] text-muted">Tell us who rings you and why. We'll map your calls and show you what the agent would handle and what it would pass to your team.</p>
      </div>
      ${primaryCta("industries_book_demo", "shrink-0")}
    </div>
  </div>
</section>

<section id="pricing" data-component="Pricing" class="border-y border-line bg-surface">
  <div class="container-omh py-14 lg:py-20">
    <p class="eyebrow"><span class="eyebrow-mark" aria-hidden="true"><i></i><i></i><i></i></span>Pricing</p>
    <h2>${mainPagePricing.heading}</h2>
    <p class="mt-5 text-muted">Three plans, billed monthly, no minimum contract. Every plan includes a managed agent, a British voice, a summary of every call and a monthly report. Prices exclude VAT.</p>

    <div class="mt-10 grid gap-5 lg:grid-cols-3 lg:items-stretch">
${mainPagePricing.plans.map(plan).join("\n")}
    </div>

    <dl class="mt-12 border-t border-line">
${mainPagePricing.notes.map(([k, v]) => `      <div class="grid gap-1 border-b border-line py-4 sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-8"><dt class="text-[16px] font-semibold uppercase tracking-[0.14em] text-muted">${k}</dt><dd class="text-[16px] leading-[1.5]">${v}</dd></div>`).join("\n")}
    </dl>
  </div>
</section>

`;

/* ------------------------------------------- Plans on /pricing (21 Oct 2026) */
// The same three plan cards and notes as this page's pricing section, for the AI services entry on /pricing,
// so prices are only ever set in voice-pricing.ts. Wrapped in the #va-page scope for its styles, with just the
// icons the cards use, and demo buttons pointing at the booking form on /ai-voice-agents.
const sprite = voiceAgentsMarkup.slice(0, voiceAgentsMarkup.indexOf("</svg>"));
const symbols = ["clock", "calendar", "timer", "check", "x", "plus-star", "chevron-down"]
  .map((name) => sprite.match(new RegExp(`<symbol id="i-${name}"[\\s\\S]*?</symbol>`))?.[0] ?? "")
  .join("");
export const voicePricingCards = `<svg xmlns="http://www.w3.org/2000/svg" class="hidden" aria-hidden="true">${symbols}</svg>
<div class="grid gap-5 pt-4 lg:grid-cols-3 lg:items-stretch">
${mainPagePricing.plans.map(plan).join("\n")}
</div>
<dl class="mt-10 border-t border-line">
${mainPagePricing.notes.map(([k, v]) => `  <div class="grid gap-1 border-b border-line py-4 sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-8"><dt class="text-[16px] font-semibold uppercase tracking-[0.14em] text-muted">${k}</dt><dd class="text-[16px] leading-[1.5]">${v}</dd></div>`).join("\n")}
</dl>`.replaceAll('href="#book-demo-form"', 'href="/ai-voice-agents#book-demo-form"');
