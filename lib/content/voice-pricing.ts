// AI voice agent plans, word for word from section 12 of the price paper
// (OMH-Voice-Agent-Price-Breakdown.pdf, 14 Oct 2026). Monthly billing only at launch:
// the paper keeps the annual toggle off the page until the real cost per minute is measured.
// Shared by /ai-voice-agents and every industry and city page, so prices change in one place.

const plans = [
  {
    id: "starter", name: "Starter", price: "249", popular: false,
    strap: "One location, one agent answering and booking.",
    minutes: "300 minutes", setup: "£795", delivery: "Live in 3 working days",
    who: "A single site with straightforward phones. No CRM, no transfers, no outbound.",
    features: [
      "Answers every inbound call, day and night, on your existing number",
      "Answers questions from your own approved information only",
      "Books appointments into one calendar",
      "Takes a proper message when it cannot help, with name, number and reason",
      "Texts the caller a confirmation",
      "Emails you a written summary of every call",
      "A British voice, your greeting and your opening hours",
      "Monthly usage report",
      "One location, one agent, one calendar",
    ],
    excluded: ["Writing into a CRM", "Live transfer to a person", "Out-of-hours routing rules", "Outbound calling", "More than one location or department"],
  },
  {
    id: "growth", name: "Growth", price: "449", popular: true,
    strap: "Busy phones that need transfers, follow up and regular tuning.",
    minutes: "500 minutes", setup: "£1,295", delivery: "Live in 5 to 7 working days",
    who: "One site, but the phone is a real channel. Where most clients should start.",
    features: [
      "Everything in Starter",
      "Live transfer to a person, with everything the caller already said passed across",
      "Out-of-hours and overflow rules you set, so you choose what it picks up and when",
      "Writes the enquiry into your CRM or practice system as structured fields",
      "Enquiry routing at the first question, for example sales, service or accounts",
      "Missed-call recovery: an automatic text to the caller and a callback task for your team",
      "Outbound follow up to contacts who have consented, for quotes, reminders and no-shows",
      "Recording and full searchable transcript of every call",
      "Monthly optimisation call: we read the transcripts and change the script",
      "One location, one agent, one CRM, up to three enquiry routes",
    ],
    excluded: ["A second location, department or agent", "A second CRM or system integration", "Call outcomes reported against your ad spend"],
  },
  {
    id: "scale", name: "Scale", price: "849", popular: false,
    strap: "Several locations or departments on one managed service.",
    minutes: "900 minutes", setup: "£1,995", delivery: "Live in 12 to 15 working days",
    who: "Multi-site, or one site with departments that need genuinely different handling.",
    features: [
      "Everything in Growth",
      "Up to three locations or departments, each with its own script, voice and diary",
      "Routing across branches, by where the caller is or by what they ask for",
      "Per-site reporting, so you can see which branch converts its calls",
      "Call outcomes reported alongside your Google Ads and website data",
      "Priority changes: script and knowledge updates inside one working day",
      "A named account manager",
      "Quarterly review with a senior strategist",
      "Further locations are added at £495 setup and £49 a month each",
    ],
    excluded: ["A fourth location or department, which is a priced add-on", "Bespoke software development", "Integrations we have not built before, which are quoted separately"],
  },
];

const notes = [
  ["VAT", "All prices exclude VAT at the current rate."],
  ["Minutes", "Minutes are counted on answered inbound calls and connected outbound calls. Unused minutes do not roll over. We warn you at 80% of your allowance."],
  ["Overage", "Minutes past your allowance are 60p a minute on every plan."],
  ["Setup", "The one-off setup fee covers discovery, the build, the integrations and two weeks of supervised calls before go live. It is agreed in writing before work starts."],
  ["Extra locations", "Scale includes up to 3 locations or departments. Each additional one is £495 setup and £49 a month. Above six locations we quote the whole thing."],
  ["Contract", "Billed monthly, 30 days notice."],
  ["Integrations", "Connections to calendars, CRMs and practice systems depend on the software you use. We confirm what connects on the discovery call."],
  ["Delivery", "Starter is live in 3 working days, Growth in 5 to 7, Scale in 12 to 15. The clock starts when we have your content and your diary access. We check and tune the first fortnight of live calls at no extra cost."],
];

// /ai-voice-agents wording from the SEO brief (OMH-AI-Voice-Agent-Page-SEO-Optimisation, 19 Oct 2026):
// same prices, minutes, setup fees and delivery, tighter words. The industry pages keep the paper's wording.
const [starter, growth, scale] = plans;
export const mainPagePricing = {
  heading: 'AI voice agent <span class="hl">pricing</span>',
  intro:
    'Three plans, billed monthly. Every plan includes a managed agent and a monthly report. <a href="#roi-calculator" class="font-semibold text-ink underline decoration-gold decoration-2 underline-offset-4">Work out what missed calls cost you</a>.',
  plans: [
    {
      ...starter, who: "",
      strap: "One location, one agent answering and booking. Best for a single site with straightforward phones.",
      features: [
        "Answers every inbound call, day and night, on your existing number",
        "Answers only from your approved information",
        "Books appointments into one calendar",
        "Takes a proper message when it can't help, with name, number and reason",
        "Texts the caller a confirmation",
        "Emails you a written summary of every call",
        "A British voice, your greeting and your opening hours",
        "Monthly usage report",
      ],
      excluded: ["Writing into a CRM", "Live transfer to a person", "Out-of-hours routing rules", "Outbound calling", "More than one location"],
    },
    {
      ...growth, who: "",
      strap: "For one site where the phone is a real sales channel. Where most clients should start.",
      features: [
        "Everything in Starter",
        "Live transfer to a person, with everything the caller already said passed across",
        "Out-of-hours and overflow rules you set",
        "Writes each enquiry into your CRM or practice system",
        "Calls new web leads within 60 seconds",
        "Routes enquiries at the first question, for example sales, service or accounts",
        "Missed-call recovery: an automatic text to the caller and a callback task for your team",
        "Outbound follow-up to contacts who have consented, for quotes, reminders and no-shows",
        "Recording and searchable transcript of every call",
        "Monthly optimisation call: we read the transcripts and improve the script",
        "Up to three enquiry routes",
      ],
      excluded: ["A second location, department or agent", "A second CRM or system", "Call outcomes reported against your ad spend"],
    },
    {
      ...scale, who: "",
      strap: "For several locations or departments that need different handling, on one managed service.",
      features: [
        "Everything in Growth",
        "Up to three locations or departments, each with its own script, voice and diary",
        "Routing across branches by where the caller is or what they ask for",
        "Per-site reporting, so you can see which branch converts its calls",
        "Call outcomes reported alongside your Google Ads and website data",
        "Script and knowledge updates within one working day",
        "A named account manager",
        "Quarterly review with a senior strategist",
      ],
      excluded: ["A fourth location or department (a priced add-on)", "Bespoke software development", "Integrations we haven't built before (quoted separately)"],
    },
  ],
  notes: [
    ["VAT", "All prices exclude VAT."],
    ["Minutes", "We count answered inbound calls and connected outbound calls. Unused minutes don't roll over, and we warn you at 80% of your allowance. Minutes past your allowance cost 60p each on every plan."],
    ["Setup", "The one-off fee covers discovery, the build, the integrations and supervised checks on your first two weeks of live calls. We agree it in writing before work starts."],
    ["Extra locations", "Scale includes up to three. Each extra one is £495 setup and £49 a month. Above six, we quote the whole service."],
    ["Contract", "Billed monthly, with 30 days' notice."],
    ["Integrations", "What connects depends on the software you use. We confirm it on the discovery call."],
    ["Delivery", "The clock starts once we have your content and diary access."],
  ],
};

const icon = (name: string, cls = "") =>
  `<svg class="icon mt-[3px]${cls && " " + cls}" aria-hidden="true" focusable="false"><use href="#i-${name}"/></svg>`;

type Plan = (typeof plans)[number];

const card = (p: Plan) => `      <article id="plan-${p.id}" class="relative flex flex-col rounded-[14px] border p-6 sm:p-8 ${p.popular ? "border-ink bg-surface shadow-[0_24px_60px_-32px_rgb(0_0_0/0.4)] dark:border-gold" : "border-line bg-surface"}" data-tier="${p.id}">
        <div class="flex items-center justify-between gap-3">
          <h3>${p.name}</h3>
          ${p.popular ? '<span class="rounded-full bg-gold px-3 py-1 text-[13.5px] font-semibold text-navy">Most popular</span>' : ""}
        </div>
        <p class="mt-2 min-h-[3.2em] text-[16px] leading-snug text-muted">${p.strap}</p>
        <p class="mt-6 flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span class="font-display text-[clamp(2.5rem,2.1rem+1.4vw,3.25rem)] font-semibold leading-none tracking-tight tnum">£${p.price}</span>
          <span class="text-[16px] text-muted">a month + VAT</span>
        </p>
        <p class="mt-2 text-[16px] text-muted">Billed monthly</p>
        <ul class="mt-5 space-y-1.5 rounded-[10px] bg-sand px-4 py-3 text-[16px] leading-snug tnum">
          <li><strong class="font-semibold">${p.minutes}</strong> included, then 60p a minute</li>
          <li><strong class="font-semibold">${p.setup}</strong> one-off setup</li>
          <li>${p.delivery}</li>
        </ul>
${p.who ? `        <p class="mt-5 text-[16px] leading-snug"><span class="font-semibold">Who it is for:</span> <span class="text-muted">${p.who}</span></p>\n` : ""}        <ul class="mt-6 space-y-2.5 text-[16px] leading-snug">
${p.features.map((f) => `          <li class="flex gap-2.5">${icon("check", "text-hl")}<span>${f}</span></li>`).join("\n")}
        </ul>
        <p class="mt-6 text-[16px] font-semibold">Not included</p>
        <ul class="mb-8 mt-2 space-y-2 text-[16px] leading-snug text-muted">
${p.excluded.map((f) => `          <li class="flex gap-2.5">${icon("x")}<span>${f}</span></li>`).join("\n")}
        </ul>
        <a href="/contact?service=ai-voice-agents&amp;plan=${p.id}" class="btn ${p.popular ? "btn-primary" : "btn-secondary"} mt-auto" data-track="pricing_book_demo" data-track-name="${p.name}">Book a demo for the ${p.name} plan</a>
      </article>`;

/** The pricing band. `bg` is the section background class, so it can sit between any two bands.
 *  `copy` swaps the wording for one page; prices, minutes and setup fees stay in `plans`. */
export const pricingSection = (
  bg = "",
  copy: { heading?: string; intro?: string; plans?: Plan[]; notes?: string[][] } = {},
) => `<section id="pricing" data-component="Pricing"${bg && ` class="${bg}"`}>
  <div class="container-omh py-20 lg:py-28">
    <p class="eyebrow"><span class="eyebrow-mark" aria-hidden="true"><i></i><i></i><i></i></span>Pricing</p>
    <h2>${copy.heading ?? 'Three plans, priced <span class="hl">by the month</span>'}</h2>
    <p class="mt-5 text-muted">${copy.intro ?? "Every plan includes a managed agent and a monthly report."}</p>

    <div class="mt-12 grid gap-6 lg:grid-cols-3 lg:items-stretch">
${(copy.plans ?? plans).map(card).join("\n")}
    </div>

    <dl class="mt-12 border-t border-line">
${(copy.notes ?? notes).map(([k, v]) => `      <div class="grid gap-1 border-b border-line py-4 sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-8"><dt class="text-[16px] font-semibold uppercase tracking-[0.14em] text-muted">${k}</dt><dd class="text-[16px] leading-[1.5]">${v}</dd></div>`).join("\n")}
    </dl>
  </div>
</section>`;
