// Body of the AI services hub page (/ai-services). It shares the AI voice
// agents page's design: styles come from app/ai-voice-agents/voice-agents.css
// (everything under .va-page) and behaviour from VoiceAgentsScript, which finds
// the FAQ, enquiry form, sticky bar and scroll reveal by their data-* hooks.
// The services and FAQs are exported as data so page.tsx can build the
// structured data from exactly what the page shows (brief §25).
// [CONFIRM] chips mark copy the client still has to confirm.

export type AiService = {
  id: string;
  name: string;
  icon: string;
  summary: string;
  body: readonly string[];
  does: readonly string[];
  suits: readonly string[];
  cta: string;
  // Services with a page of their own link there; the rest point at the form.
  page?: { href: string; label: string };
};

export const aiServices: readonly AiService[] = [
  {
    id: "ai-websites-software",
    name: "AI Websites & Software",
    icon: "i-code",
    summary: "Websites, portals and web apps with AI built in where it helps your customers and your team.",
    body: [
      "A modern website can do more than show information. We build sites and web applications that use AI for practical tasks: search that understands what visitors mean, product and service finders that ask a few questions and recommend the right option, and quote tools that read a description and estimate a price.",
      "We also build internal software, such as admin dashboards that summarise orders or enquiries, and tools that turn documents into structured data. Our developers work in WordPress and Next.js, the same platforms we use for client websites, so the AI features sit on a fast, well-built site.",
    ],
    does: [
      "Websites with AI search and product finders",
      "Customer portals and booking tools",
      "Internal dashboards and admin tools",
      "Custom web apps built around an AI model",
    ],
    suits: ["Ecommerce stores", "Firms with complex enquiries", "Teams buried in admin"],
    cta: "Ask about AI software",
  },
  {
    id: "ai-consulting",
    name: "AI Technology Consulting",
    icon: "i-compass",
    summary: "A clear, costed plan for where AI will save your business time or money, and where it won't.",
    body: [
      "Most owners know AI could help but don't know where to start, and the market is full of tools that promise everything. We look at how your team spends its week, find the repetitive jobs AI can take on and give you a written plan ranked by cost, effort and likely payback.",
      "We can also help you choose tools, write a simple AI use policy for staff and check how each tool handles your data under UK GDPR. If the honest answer is that AI won't help with something yet, we'll say so.",
    ],
    does: [
      "Workshop with you and your team",
      "Review of your processes and software",
      "Prioritised roadmap with costs",
      "Tool selection and an AI use policy",
    ],
    suits: ["Owners starting out with AI", "Teams trying tools without a plan", "Businesses that need a staff AI policy"],
    cta: "Book an AI consultation",
  },
  {
    id: "ai-integrations",
    name: "AI Integrations",
    icon: "i-plug",
    summary: "AI connected to the software you already use, so data moves on its own and routine work gets done.",
    body: [
      "Your inbox, CRM, booking system, accounts package and spreadsheets often don't talk to each other, so someone copies details from one to the next. We connect them using automation platforms such as n8n, and add AI where a step needs reading or judgement.",
      "A typical example: an enquiry email arrives, AI reads it and pulls out the name, service and budget, a record appears in your CRM, and a draft reply waits for your team to approve. Nobody retypes anything, and nothing gets lost in an inbox.",
    ],
    does: [
      "Enquiry sorting and routing",
      "Invoices and documents read and filed",
      "CRM updates and follow-up tasks",
      "Reports put together automatically",
    ],
    suits: ["Businesses using several systems", "Teams that retype the same data", "Anyone with a busy shared inbox"],
    cta: "Ask about integrations",
  },
  {
    id: "ai-voice-agent",
    name: "AI Voice Agents",
    icon: "i-phone",
    summary: "An AI receptionist that answers your phone, books appointments and follows up, day and night.",
    body: [
      "When your team can't get to the phone, the voice agent picks up in your business's name. It tells callers it is an AI assistant, answers from information you have approved, books appointments into your diary and passes anything urgent or complicated to a person.",
      "Every call ends with a written summary for your team. We build the agent around the calls your sector actually gets, test it with you before launch and review it every month.",
    ],
    does: [
      "Answers calls in your business name",
      "Books appointments into your diary",
      "Transfers urgent calls to a person",
      "Sends a written summary of every call",
    ],
    suits: ["Clinics and dental practices", "Trades and home services", "Estate agents and law firms"],
    cta: "Book a voice agent demo",
    page: { href: "/ai-voice-agents", label: "Explore AI Voice Agents" },
  },
  {
    id: "ai-agents",
    name: "AI Agents",
    icon: "i-bot",
    summary: "Software that carries out multi-step tasks for your team, within rules you set.",
    body: [
      "An AI agent goes further than a chatbot. It can gather information, make decisions within limits you define and take actions in your systems, such as researching a new lead, preparing a quote from your template or chasing an overdue invoice.",
      "We build each agent for one clear job and keep a person in the loop for anything that matters. Every action is logged, so you can see what the agent did and why, and we review its work with you each month.",
    ],
    does: [
      "Lead research and qualification",
      "First drafts of quotes and proposals",
      "Inbox and admin assistants",
      "Follow-ups and reminders",
    ],
    suits: ["Sales teams with more leads than time", "Back offices with routine admin", "Businesses ready to go beyond a chatbot"],
    cta: "Ask about AI agents",
  },
  {
    id: "ai-chatbot",
    name: "AI Chatbot",
    icon: "i-message",
    summary: "A website chat assistant that answers questions from your own information and captures enquiries.",
    body: [
      "We set the chatbot up with your website, price lists, FAQs and policies, so it answers visitors' questions at any hour in your tone of voice. When someone is ready to buy or book, it collects their details or books a call and sends the conversation to your team.",
      "It only answers from content you approve and says when it doesn't know, instead of guessing. We test it with real questions before launch and check the conversation logs every month for gaps.",
    ],
    does: [
      "Answers from your approved content",
      "Captures leads and books calls",
      "Hands conversations to a person",
      "Monthly review of conversations",
    ],
    suits: ["Websites with steady traffic", "Businesses asked the same questions daily", "Ecommerce stores"],
    cta: "Ask about a chatbot",
  },
  {
    id: "ai-ugc",
    name: "AI UGC",
    icon: "i-video",
    summary: "Phone-style video content for ads and social media, produced faster with AI.",
    body: [
      "UGC-style videos, short clips that look like someone talking to their phone camera, often perform well on TikTok, Instagram and Facebook. Making enough of them to test properly is slow and expensive. We use AI to write scripts and opening hooks, create presenters and voiceovers, and turn one idea into several versions for testing.",
      "We keep it honest. AI presenters talk about your product as presenters, never as customers who claim to have bought it, and we label AI-generated content where platform or advertising rules require it.",
    ],
    does: [
      "Scripts and opening hooks",
      "AI presenters and voiceovers",
      "Several versions for ad testing",
      "Formats for Reels, TikTok and Shorts",
    ],
    suits: ["Ecommerce brands", "Businesses running paid social", "Teams that need more creative to test"],
    cta: "Ask about AI UGC",
  },
];

type Faq = { q: string; a: string; cat: "start" | "data" | "working"; confirm?: string };

const faqTopics = { start: "Getting started", data: "Data and safety", working: "Working with us" } as const;

// The questions the FAQ section shows, word for word. page.tsx builds the
// FAQPage schema from this same list.
export const aiServicesFaqs: readonly Faq[] = [
  {
    cat: "start",
    q: "Where should a small business start with AI?",
    a: "With one job that happens many times a week and follows a pattern, such as answering common questions or logging new enquiries. It gives you a quick result you can measure. If you're not sure which job that is, our AI technology consulting service is designed to find it.",
  },
  {
    cat: "start",
    q: "Do we need technical staff to use these tools?",
    a: "No. We build, connect and maintain everything. Your team keeps working in the tools they already know, such as the phone, the inbox and your CRM, and the AI works in the background.",
  },
  {
    cat: "start",
    q: "Which AI models and platforms do you use?",
    a: "We choose for each job rather than forcing one product on every client. We work with AI models from providers such as OpenAI, Anthropic and Google, and with automation platforms such as n8n. We explain what we picked and what it costs to run.",
  },
  {
    cat: "start",
    q: "Can AI connect to the software we already use?",
    a: "Usually, yes. Most modern software can share data through an API or a ready-made connection. We check your exact tools during discovery and tell you plainly what connects directly, what needs a workaround and what isn't possible yet.",
  },
  {
    cat: "data",
    q: "Will AI give our customers wrong answers?",
    a: "It can if it's set up badly, which is why we limit chatbots and agents to information you have approved. We test them with real questions before launch, set them to say when they don't know and hand over to a person, and review conversations every month.",
  },
  {
    cat: "data",
    q: "How do you handle data protection and UK GDPR?",
    a: "We check where each tool stores and processes data before we recommend it. You remain the data controller and OMH acts as your processor under a written agreement. We agree what is kept, for how long and who can see it.",
  },
  {
    cat: "data",
    q: "Will customers know they are dealing with AI?",
    a: "Yes. Our chatbots and voice agents say they are AI assistants. With AI-generated video, we never present an AI presenter as a real customer, and we label AI content where platform or advertising rules require it.",
  },
  {
    cat: "working",
    q: "How much do AI services cost?",
    a: "It depends on the service and how much it needs to connect to. Consulting and builds are usually quoted as fixed projects, and managed tools such as chatbots and voice agents have a monthly fee. You get the price in writing before you commit.",
    confirm: "pricing structure for each AI service",
  },
  {
    cat: "working",
    q: "How long does it take to get started?",
    a: "Simple projects, such as a chatbot set up with your website content, are quicker than ones that touch several systems. We give you a realistic timeline after the discovery call, before you commit to anything.",
  },
  {
    cat: "working",
    q: "Can we start with one service and add more later?",
    a: "Yes, and most businesses do. Starting small lets you see results and build confidence before you hand the next job to AI.",
  },
  {
    cat: "working",
    q: "Do you work with businesses outside Essex?",
    a: "Yes. We are based in Hullbridge, Essex and work with businesses across the UK remotely.",
  },
];

/* ------------------------------------------------------------- Helpers */

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const icon = (id: string, cls = "") => `<svg class="icon ${cls}" aria-hidden="true" focusable="false"><use href="#${id}"/></svg>`;
const mark = `<span class="eyebrow-mark" aria-hidden="true"><i></i><i></i><i></i></span>`;
const pad = (n: number) => String(n).padStart(2, "0");
const byId = (id: string) => aiServices.find((s) => s.id === id)!;

/* -------------------------------------------------------------- Pieces */

// Hero card: an example plan, one job at a time.
const planRows = [
  { task: "Answer calls after 5:30pm", id: "ai-voice-agent", status: "Live" },
  { task: "Reply to website questions", id: "ai-chatbot", status: "Live" },
  { task: "Log every enquiry in the CRM", id: "ai-integrations", status: "Testing" },
  { task: "Video ads for new listings", id: "ai-ugc", status: "Planned" },
] as const;

const statusChip = {
  Live: `<span class="flex shrink-0 items-center gap-1.5 rounded-full bg-ok/10 px-2.5 py-0.5 text-[13px] font-semibold text-ok"><span class="block h-2 w-2 rounded-full bg-ok"></span>Live</span>`,
  Testing: `<span class="shrink-0 rounded-full bg-gold/25 px-2.5 py-0.5 text-[13px] font-semibold text-hl">Testing</span>`,
  Planned: `<span class="shrink-0 rounded-full bg-ink/10 px-2.5 py-0.5 text-[13px] font-semibold">Planned</span>`,
};

const planCard = `
    <div class="card relative overflow-hidden shadow-[0_24px_60px_-28px_rgb(0_0_0/0.35)]" role="group" aria-label="Example AI plan for a lettings agency">
      <div class="flex items-center justify-between gap-3 border-b border-line bg-sand px-5 py-3.5 text-[15px]">
        <span class="flex items-center gap-2 font-semibold">${icon("i-plus-star", "text-hl")}AI plan</span>
        <span class="chip !py-0.5">First six months</span>
      </div>
      <div class="px-5 pt-5">
        <p class="font-display text-body font-semibold leading-tight">Severn Lettings</p>
        <p class="text-[15px] text-muted">Bristol. Four jobs handed to AI, one at a time</p>
      </div>
      <ol class="space-y-2.5 px-5 pb-2 pt-5">
        ${planRows
          .map((row) => {
            const s = byId(row.id);
            return `<li class="flex items-center gap-3.5 rounded-[12px] border border-line px-3.5 py-3">
          <span class="grid h-10 w-10 shrink-0 place-items-center rounded-[10px] bg-gold/20 text-hl" aria-hidden="true">${icon(s.icon)}</span>
          <span class="min-w-0 flex-1"><span class="block text-[16px] font-semibold leading-snug">${esc(row.task)}</span><span class="block text-[14px] text-muted">${esc(s.name)}</span></span>
          ${statusChip[row.status]}
        </li>`;
          })
          .join("\n        ")}
      </ol>
      <div class="mt-3 flex items-center justify-between gap-3 border-t border-line px-5 py-3.5">
        <span class="flex items-center gap-2 text-[15px] font-semibold">${icon("i-calendar", "text-hl")}Reviewed with OMH every month</span>
        <span class="text-[13.5px] text-muted">Illustrative example</span>
      </div>
    </div>`;

// Overview panel: where the time goes, and which service takes it on.
const timeRows = [
  ["The phone rings while everyone is busy", "ai-voice-agent"],
  ["The same questions arrive by chat and email", "ai-chatbot"],
  ["Enquiries get copied into the CRM by hand", "ai-integrations"],
  ["Leads need researching and chasing", "ai-agents"],
  ["You need more video ads to test", "ai-ugc"],
  ["Your website or tools can't do what you need", "ai-websites-software"],
  ["You're not sure where AI fits at all", "ai-consulting"],
] as const;

const timePanel = `
    <div class="self-start rounded-[14px] border border-band-line bg-band-surface">
      <div class="hidden grid-cols-[minmax(0,1fr)_14.5rem] gap-4 border-b border-band-line px-5 py-4 text-[14.5px] font-semibold text-band-muted sm:grid">
        <span>Where the time goes</span><span>What takes it on</span>
      </div>
      <ul class="divide-y divide-band-line">
        ${timeRows
          .map(([job, id]) => {
            const s = byId(id);
            return `<li class="grid gap-1.5 px-5 py-3.5 sm:grid-cols-[minmax(0,1fr)_14.5rem] sm:items-center sm:gap-4">
          <span class="text-[16.5px] leading-snug">${esc(job)}</span>
          <a href="#${s.id}" class="flex items-center gap-2 font-display text-[15.5px] font-semibold text-band-hl hover:underline" data-track="overview_service_click" data-track-name="${esc(s.name)}">${icon(s.icon)}${esc(s.name)}</a>
        </li>`;
          })
          .join("\n        ")}
      </ul>
    </div>`;

const jumpGrid = `
    <nav aria-label="Jump to a service" class="mt-12">
      <ul class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        ${aiServices
          .map(
            (s, i) => `<li><a href="#${s.id}" class="group flex h-full items-center gap-3.5 rounded-[14px] border border-line bg-surface p-4 transition-colors hover:border-gold focus-visible:border-gold" data-track="service_jump" data-track-name="${esc(s.name)}">
          <span class="grid h-11 w-11 shrink-0 place-items-center rounded-[12px] bg-gold/20 text-hl transition-colors group-hover:bg-gold group-hover:text-navy" aria-hidden="true">${icon(s.icon)}</span>
          <span class="min-w-0"><span class="num block text-[13.5px]">${pad(i + 1)}</span><span class="block font-display text-[17px] font-semibold leading-tight">${esc(s.name)}</span></span>
        </a></li>`,
          )
          .join("\n        ")}
        <li><a href="#book-demo" class="on-band flex h-full items-center gap-3.5 rounded-[14px] bg-band p-4 text-band-ink" data-track="service_jump" data-track-name="Not sure">
          <span class="grid h-11 w-11 shrink-0 place-items-center rounded-[12px] bg-gold text-navy" aria-hidden="true">${icon("i-compass")}</span>
          <span class="min-w-0"><span class="block text-[13.5px] font-semibold text-band-hl">Not sure yet?</span><span class="block font-display text-[17px] font-semibold leading-tight">Ask us where to start</span></span>
        </a></li>
      </ul>
    </nav>`;

const serviceArticle = (s: AiService, i: number) => `
      <article id="${s.id}" class="grid gap-8 rounded-[18px] border border-line bg-surface p-6 sm:p-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,.92fr)] lg:gap-12 lg:p-10" data-reveal>
        <div>
          <div class="flex items-center gap-4">
            <span class="grid h-14 w-14 shrink-0 place-items-center rounded-[14px] bg-gold text-navy" aria-hidden="true">${icon(s.icon, "!h-7 !w-7")}</span>
            <span class="num text-[15px]">${pad(i + 1)} / ${pad(aiServices.length)}</span>
          </div>
          <h3 class="mt-5">${esc(s.name)}</h3>
          <p class="mt-3 text-body leading-[1.5]">${esc(s.summary)}</p>
          <div class="mt-4 space-y-4 text-[17px] text-muted">
            ${s.body.map((p) => `<p>${esc(p)}</p>`).join("\n            ")}
          </div>
          <div class="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            ${
              s.page
                ? `<a href="${s.page.href}" class="btn btn-primary" data-track="service_page_click" data-track-name="${esc(s.name)}">${esc(s.page.label)}${icon("i-arrow-right")}</a>
            <a href="#book-demo" class="btn btn-secondary" data-pick-service="${s.id}" data-track="service_enquire" data-track-name="${esc(s.name)}">${esc(s.cta)}</a>`
                : `<a href="#book-demo" class="btn btn-primary" data-pick-service="${s.id}" data-track="service_enquire" data-track-name="${esc(s.name)}">${esc(s.cta)}${icon("i-arrow-right")}</a>`
            }
          </div>
        </div>
        <div class="self-start rounded-[14px] bg-sand p-5 sm:p-6">
          <p class="font-display text-[17.5px] font-semibold">What we do</p>
          <ul class="mt-3 space-y-2.5">
            ${s.does
              .map((d) => `<li class="flex gap-3 text-[16.5px] leading-snug">${icon("i-check", "mt-[2px] text-ok")}<span>${esc(d)}</span></li>`)
              .join("\n            ")}
          </ul>
          <p class="mt-6 font-display text-[17.5px] font-semibold">A good fit for</p>
          <ul class="mt-3 flex flex-wrap gap-2">
            ${s.suits.map((t) => `<li class="chip !bg-surface">${esc(t)}</li>`).join("\n            ")}
          </ul>
        </div>
      </article>`;

const whyRows = [
  ["Where to start", "We find the jobs worth handing to AI first.", "You try tools and hope one fits."],
  ["Setup", "We build it and connect it to your systems.", "You learn each tool and connect it yourself."],
  ["Accuracy", "Answers only from information you approve, tested before launch.", "Often tested on real customers."],
  ["Your data", "UK GDPR checked for each tool, with a written agreement.", "Terms accepted without reading them."],
  ["After launch", "A monthly review, fixes and a short report.", "You find problems when a customer complains."],
  ["Who to ring", "A named person at OMH in the UK.", "A support ticket."],
] as const;

const whyTable = `
    <p class="mt-12 flex flex-wrap gap-x-5 gap-y-2 text-[15px] font-semibold md:hidden" aria-hidden="true"><span class="flex items-center gap-2"><span class="block h-3.5 w-3.5 rounded-[4px] bg-band"></span>Managed by OMH</span><span class="flex items-center gap-2 text-muted">${icon("i-x")}DIY or generic tool</span></p>
    <table class="why-table mt-4 w-full md:mt-14 border-separate border-spacing-0 text-left text-[17px] leading-snug">
      <caption class="sr-only">AI services managed by OMH compared with doing it yourself or using a generic tool</caption>
      <thead class="max-md:sr-only">
        <tr>
          <th scope="col" class="w-[24%] px-6 pb-4 pt-8 align-bottom"><span class="sr-only">What you get</span></th>
          <th scope="col" class="why-omh w-[40%] rounded-t-[14px] px-7 pb-5 pt-7 align-bottom">
            <span class="flex items-center gap-3">
              <span class="grid h-9 w-9 place-items-center rounded-[9px] bg-gold font-display text-[12px] font-semibold tracking-tight text-navy" aria-hidden="true">OMH</span>
              <span class="font-display text-[20px] font-semibold">Managed by OMH</span>
            </span>
          </th>
          <th scope="col" class="w-[36%] px-7 pb-5 pt-8 align-bottom font-display text-[20px] font-semibold text-muted">DIY or generic tool</th>
        </tr>
      </thead>
      <tbody>
        ${whyRows
          .map(
            ([label, omh, diy], i) => `<tr class="max-md:mb-4 max-md:block max-md:rounded-[14px] max-md:border max-md:border-line max-md:p-5">
          <th scope="row" class="border-t border-line px-6 py-5 align-top font-display text-[17.5px] font-semibold max-md:block max-md:border-0 max-md:p-0 max-md:pb-3">${esc(label)}</th>
          <td class="why-omh px-7 py-5 align-top max-md:block max-md:rounded-[10px] max-md:px-4 max-md:py-3.5${i === whyRows.length - 1 ? " md:rounded-b-[14px] md:pb-7" : ""}"><span class="flex gap-3">${icon("i-check", "mt-[3px] text-band-hl")}<span><span class="sr-only">Managed by OMH: </span>${esc(omh)}</span></span></td>
          <td class="border-t border-line px-7 py-5 align-top text-muted max-md:block max-md:border-0 max-md:px-4 max-md:pb-0 max-md:pt-3"><span class="flex gap-3">${icon("i-x", "mt-[3px] opacity-70")}<span><span class="sr-only">DIY or generic tool: </span>${esc(diy)}</span></span></td>
        </tr>`,
          )
          .join("\n        ")}
      </tbody>
    </table>`;

const stepArrow = `<span class="how-arrow absolute -right-[19px] top-[236px] z-20 hidden h-8 w-8 -translate-y-1/2 place-items-center rounded-full border border-line bg-paper text-hl lg:grid" aria-hidden="true">${icon("i-arrow-right", "!h-4 !w-4")}</span>`;

const steps = [
  {
    tint: "var(--va-tint-1)",
    title: "Discovery",
    text: "We talk through how your business runs, where the time goes and what frustrates your team. You get an honest view of where AI can help.",
    chip: "You give: about an hour",
    mock: `<div class="how-mock w-full max-w-[250px] rounded-[10px] bg-surface p-4 text-left shadow-[0_10px_30px_-18px_rgb(0_0_0/0.5)]">
          <p class="text-[13.5px] font-semibold">Where the hours go, per week</p>
          <ul class="mt-2.5 space-y-2 text-[13px] leading-tight">
            <li class="flex items-center justify-between gap-2"><span>Answering calls</span><span class="rounded-full bg-gold/25 px-2 py-0.5 font-semibold text-hl tnum">9 hrs</span></li>
            <li class="flex items-center justify-between gap-2"><span>Data entry</span><span class="rounded-full bg-gold/25 px-2 py-0.5 font-semibold text-hl tnum">6 hrs</span></li>
            <li class="flex items-center justify-between gap-2"><span>Writing replies</span><span class="rounded-full bg-gold/25 px-2 py-0.5 font-semibold text-hl tnum">5 hrs</span></li>
            <li class="flex items-center justify-between gap-2"><span>Site visits</span><span class="rounded-full bg-ink/10 px-2 py-0.5 font-semibold">Person</span></li>
          </ul>
        </div>`,
  },
  {
    tint: "var(--va-tint-2)",
    title: "Plan and prototype",
    text: "We recommend where to start, agree what success looks like and show you a working prototype before the full build.",
    chip: "You give: examples and access",
    mock: `<div class="how-mock w-full max-w-[250px] rounded-[10px] bg-surface p-4 text-left shadow-[0_10px_30px_-18px_rgb(0_0_0/0.5)]">
          <p class="text-[13.5px] font-semibold">Recommended order</p>
          <ol class="mt-2.5 space-y-2 text-[13px] leading-tight">
            <li class="flex items-center justify-between gap-2"><span>1. AI Chatbot</span><span class="rounded-full bg-gold/25 px-2 py-0.5 font-semibold text-hl">Start here</span></li>
            <li class="flex items-center justify-between gap-2"><span>2. AI Integrations</span><span class="rounded-full bg-ink/10 px-2 py-0.5 font-semibold">Next</span></li>
            <li class="flex items-center justify-between gap-2"><span>3. AI Voice Agent</span><span class="rounded-full bg-ink/10 px-2 py-0.5 font-semibold">Later</span></li>
          </ol>
        </div>`,
  },
  {
    tint: "var(--va-tint-3)",
    title: "Build and test",
    text: "We build the tool, connect it to your systems and test it with your team. We fix what you find, and nothing goes live until you say so.",
    chip: "You give: honest feedback",
    mock: `<div class="how-mock w-full max-w-[250px] rounded-[10px] bg-surface p-4 text-left shadow-[0_10px_30px_-18px_rgb(0_0_0/0.5)]">
          <p class="text-[13.5px] font-semibold">Test questions</p>
          <ul class="mt-2.5 space-y-2 text-[13px] leading-tight">
            <li class="flex items-center justify-between gap-2"><span>Opening hours</span><span class="flex items-center gap-1 font-semibold text-ok">${icon("i-check", "!h-3.5 !w-3.5")}Passed</span></li>
            <li class="flex items-center justify-between gap-2"><span>Ask for a person</span><span class="flex items-center gap-1 font-semibold text-ok">${icon("i-check", "!h-3.5 !w-3.5")}Passed</span></li>
            <li class="flex items-center justify-between gap-2"><span>Weekend prices</span><span class="font-semibold text-hl">Fixed</span></li>
          </ul>
          <p class="mt-3 rounded-[8px] bg-ok/10 px-2.5 py-1.5 text-center text-[13px] font-semibold text-ok">Signed off by you</p>
        </div>`,
  },
  {
    tint: "var(--va-tint-4)",
    title: "Launch and improve",
    text: "We switch it on, watch the results and review them with you every month. Once the first tool is working well, we look at the next job.",
    chip: "You get: a monthly report",
    mock: `<div class="how-mock w-full max-w-[250px] rounded-[10px] bg-surface p-4 text-left shadow-[0_10px_30px_-18px_rgb(0_0_0/0.5)]">
          <p class="flex items-center justify-between text-[13.5px] font-semibold"><span>Your AI tools</span><span class="flex items-center gap-1.5 rounded-full bg-ok/10 px-2 py-0.5 text-[12.5px] text-ok"><span class="block h-2 w-2 rounded-full bg-ok"></span>Live</span></p>
          <div class="mt-3 grid h-[68px] grid-cols-3 items-end gap-2">
            <span class="block h-[45%] rounded-t-[4px] bg-ink/20"></span>
            <span class="block h-[70%] rounded-t-[4px] bg-ink/20"></span>
            <span class="block h-[92%] rounded-t-[4px] bg-gold"></span>
          </div>
          <p class="mt-1.5 grid grid-cols-3 gap-2 text-center text-[12px] text-muted"><span>Month 1</span><span>Month 2</span><span>Month 3</span></p>
        </div>`,
  },
];

const howSteps = steps
  .map(
    (st, i) => `<li class="how-step relative flex flex-col overflow-visible rounded-[16px] border border-line bg-surface" style="--tint: ${st.tint}">
        <div class="relative grid h-[236px] place-items-center rounded-t-[15px] bg-[var(--tint)] px-5 pb-9 pt-5" aria-hidden="true">
          ${st.mock}
        </div>
        <span class="relative z-10 mx-auto -mt-8 grid h-16 w-16 place-items-center rounded-full border-[5px] border-surface bg-gold font-display text-[20px] font-semibold text-navy tnum"><span class="sr-only">Step </span>${i + 1}</span>
        <div class="flex flex-1 flex-col px-6 pb-7 pt-4 text-center">
          <h3 class="!text-[23px] !leading-[1.25]">${esc(st.title)}</h3>
          <p class="mt-3 text-[16.5px] leading-[1.55] text-muted">${esc(st.text)}</p>
          <p class="mt-auto pt-5"><span class="inline-block rounded-full bg-sand px-3.5 py-1.5 text-[14.5px] font-semibold">${esc(st.chip)}</span></p>
        </div>
        ${i < steps.length - 1 ? stepArrow : ""}
      </li>`,
  )
  .join("\n      ");

const goodFit = [
  ["i-clock", "Your team repeats the same tasks", "every day: answering questions, entering data, sending similar emails."],
  ["i-phone-missed", "Enquiries slip through", "because nobody is free to reply at the time they arrive."],
  ["i-plug", "Your data lives in software", "such as a CRM, calendar, shared inbox or online shop."],
  ["i-arrow-up-right", "You want to grow without hiring for admin", "and would rather your people spend time on skilled work."],
  ["i-shield", "You are happy to be open about AI", "Customers are told when they are dealing with an AI."],
] as const;

const badFit = [
  ["i-scale", "You want AI to give expert advice", "on legal, medical or financial matters. We won't build that."],
  ["i-x", "You want to pass AI off as a person", "or publish invented reviews and testimonials."],
  ["i-message", "You have no settled way of working yet", "AI speeds up a process. It can't decide the process for you."],
  ["i-clock", "You want to set it and forget it", "AI tools need a regular review to stay accurate."],
] as const;

const fitItem = (good: boolean) => ([ic, title, text]: readonly [string, string, string]) =>
  `<li class="flex gap-3.5"><span class="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] ${good ? "bg-surface text-ok" : "bg-sand text-muted"}" aria-hidden="true">${icon(ic)}</span><span class="text-[16.5px] leading-snug"><strong class="block font-display text-[17.5px] font-semibold">${esc(title)}</strong><span class="text-muted">${esc(text)}</span></span></li>`;

const faqItems = aiServicesFaqs
  .map(
    (f, i) => `<details class="group rounded-[14px] border border-line bg-paper transition-colors open:border-[var(--va-line-strong)] open:bg-surface open:shadow-[0_18px_40px_-30px_rgb(0_0_0/0.45)]" data-faq-item data-cat="${f.cat}"${i === 0 ? " open" : ""} data-track-name="${esc(f.q)}">
        <summary class="flex min-h-[64px] items-center gap-4 px-5 py-4">
          <span class="num hidden w-7 shrink-0 text-[15px] sm:block" aria-hidden="true">${pad(i + 1)}</span>
          <span class="min-w-0 flex-1">
            <h3 class="!text-[clamp(18px,17px+.3vw,20.5px)] !leading-[1.3]">${esc(f.q)}</h3>
            <span class="mt-1 block text-[13.5px] font-semibold text-muted">${faqTopics[f.cat]}</span>
          </span>
          <span class="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--va-line-strong)] group-open:border-gold group-open:bg-gold group-open:text-navy">${icon("i-chevron-down", "faq-chevron")}</span>
        </summary>
        <div class="px-5 pb-6 text-[17px] text-muted sm:pl-[4.25rem]">
          <p data-faq-answer>${esc(f.a)}</p>
          ${f.confirm ? `<p class="mt-3"><span class="flag flag-wrap">[CONFIRM] ${esc(f.confirm)}</span></p>` : ""}
        </div>
      </details>`,
  )
  .join("\n      ");

const faqFilter = (key: string, label: string, pressed = false) =>
  `<button type="button" class="min-h-[44px] rounded-full border border-[var(--va-line-strong)] px-4 text-[15px] font-semibold aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-paper" data-faq-filter="${key}" aria-pressed="${pressed}" data-track="faq_filter" data-track-name="${esc(label)}">${esc(label)} <span class="ml-1 opacity-70 tnum" data-faq-count="${key}"></span></button>`;

const field = (id: string, name: string, label: string, type: string, auto: string, extra = "") => `<div>
            <label for="${id}" class="block text-[15px] font-semibold">${label}</label>
            <input id="${id}" name="${name}" type="${type}" autocomplete="${auto}" required class="field mt-1.5 !bg-paper" aria-describedby="${id}-err" data-demo-field ${extra}>
            <p id="${id}-err" class="mt-1 text-[14px] font-semibold text-miss" data-demo-error hidden></p>
          </div>`;

/* ---------------------------------------------------------------- Page */

export const aiServicesMarkup = String.raw`
<svg xmlns="http://www.w3.org/2000/svg" class="hidden" aria-hidden="true">
  <symbol id="i-phone" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></symbol>
  <symbol id="i-phone-missed" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/><path d="m16 2 6 6M22 2l-6 6"/></symbol>
  <symbol id="i-check" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></symbol>
  <symbol id="i-x" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></symbol>
  <symbol id="i-arrow-right" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></symbol>
  <symbol id="i-arrow-up-right" viewBox="0 0 24 24"><path d="M7 7h10v10M7 17 17 7"/></symbol>
  <symbol id="i-chevron-down" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></symbol>
  <symbol id="i-calendar" viewBox="0 0 24 24"><path d="M8 2v4M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></symbol>
  <symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></symbol>
  <symbol id="i-shield" viewBox="0 0 24 24"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></symbol>
  <symbol id="i-map-pin" viewBox="0 0 24 24"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></symbol>
  <symbol id="i-message" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></symbol>
  <symbol id="i-scale" viewBox="0 0 24 24"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></symbol>
  <symbol id="i-plus-star" viewBox="0 0 24 24"><path d="M12 2 C12.6 8 16 11.4 22 12 C16 12.6 12.6 16 12 22 C11.4 16 8 12.6 2 12 C8 11.4 11.4 8 12 2 Z" fill="currentColor" stroke="none"/></symbol>
  <symbol id="i-mail" viewBox="0 0 24 24"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></symbol>
  <symbol id="i-code" viewBox="0 0 24 24"><path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/></symbol>
  <symbol id="i-compass" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36z"/></symbol>
  <symbol id="i-plug" viewBox="0 0 24 24"><path d="M12 22v-5M9 8V2M15 8V2M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8z"/></symbol>
  <symbol id="i-bot" viewBox="0 0 24 24"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2M20 14h2M15 13v2M9 13v2"/></symbol>
  <symbol id="i-video" viewBox="0 0 24 24"><path d="m16 13 5.22 3.48a.5.5 0 0 0 .78-.42V7.87a.5.5 0 0 0-.75-.43L16 10.5"/><rect x="2" y="6" width="14" height="12" rx="2"/></symbol>
</svg>

<section id="hero" data-component="Hero" class="relative">
  <div class="container-omh grid items-center gap-12 pb-16 pt-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,.92fr)] lg:gap-14 lg:pb-24 lg:pt-20">
    <div>
      <p class="eyebrow">${mark}AI services for UK businesses</p>
      <h1>Put AI to work on the jobs that <span class="hl">slow your team down</span></h1>
      <p class="mt-6 text-body leading-[1.55] text-muted">OMH plans, builds and manages practical AI for UK businesses: chatbots and voice agents that answer your customers, integrations that move data between your systems, and software built around the way you work. You deal with one UK team from the first idea to the monthly review.</p>
      <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <a href="#book-demo" class="btn btn-primary" data-track="hero_book_consultation">Book an AI Consultation</a>
        <a href="#services" class="btn btn-secondary" data-track="hero_see_services">See the seven services${icon("i-chevron-down")}</a>
      </div>
      <p class="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-[16.5px] text-muted">
        Or talk to a person now:
        <a href="tel:+442034893934" class="text-link tnum" data-track="hero_phone_click">${icon("i-phone")}020 3489 3934</a>
      </p>
      <dl class="mt-10 grid grid-cols-3 border-t border-line">
        <div class="pr-3 pt-5">
          <dd class="font-display text-[clamp(1.5rem,1.1rem+1.6vw,2.25rem)] font-semibold leading-none tracking-tight tnum">7</dd>
          <dt class="mt-2 text-[15px] leading-snug text-muted">AI services under one roof</dt>
        </div>
        <div class="border-l border-line px-3 pt-5 sm:px-5">
          <dd class="font-display text-[clamp(1.5rem,1.1rem+1.6vw,2.25rem)] font-semibold leading-none tracking-tight tnum">1</dd>
          <dt class="mt-2 text-[15px] leading-snug text-muted">UK team from plan to support</dt>
        </div>
        <div class="border-l border-line pl-3 pt-5 sm:pl-5">
          <dd class="font-display text-[clamp(1.5rem,1.1rem+1.6vw,2.25rem)] font-semibold leading-none tracking-tight tnum">30 min</dd>
          <dt class="mt-2 text-[15px] leading-snug text-muted">first call, no obligation</dt>
        </div>
      </dl>
    </div>
${planCard}
  </div>

  <div class="border-y border-line">
    <div class="container-omh flex flex-col gap-x-8 gap-y-2 py-5 text-[16px] text-muted md:flex-row md:items-center md:justify-between">
      <p class="flex items-start gap-2">${icon("i-map-pin", "mt-1 text-hl")}<span>Based in <strong class="font-semibold text-ink">Hullbridge, Essex</strong>, working with businesses across the UK</span></p>
      <p class="md:text-right">Plain advice on where AI helps, and where it doesn't</p>
    </div>
  </div>
</section>

<!-- ===== COMPONENT: DemoVideo ===== -->
<section id="video" data-component="DemoVideo" class="bg-surface">
  <div class="container-omh py-20 lg:py-24">
    <div class="mx-auto text-center">
      <p class="eyebrow justify-center">${mark}Demo video</p>
      <h2>See an AI voice agent <span class="hl">answer and route calls</span></h2>
    </div>
    <div class="mx-auto mt-10 rounded-[24px] border border-line bg-surface p-3 sm:p-4">
      <div class="v4l"><div class="video-frame" data-video data-video-id="NB9WWD0TBR8" data-video-title="Stop missing calls with the OMH AI Receptionist">
        <button type="button" class="video-poster on-band has-thumb" data-video-play data-track="ai_services_video_open" aria-label="Play video: Stop missing calls with the OMH AI Receptionist (1:09)">
          <img class="vp-thumb" src="/images/voice-agents/ai-receptionist-video-poster.jpg" alt="Video: the OMH AI Receptionist answering calls 24/7" width="1280" height="720" loading="lazy" decoding="async">
          <span class="vp-play" aria-hidden="true"><span class="vp-play-core"><svg class="vp-play-ico" viewBox="0 0 24 24" focusable="false"><path d="M8 5.6v12.8l10.4-6.4z"/></svg></span><span class="vp-play-label">Watch the demo</span></span>
          <span class="vp-bottom" aria-hidden="true">
            <span class="vp-cap"><span class="vp-kicker"><span class="voice-mark"><i></i><i></i><i></i></span>Online Marketing Help</span><span class="vp-title">Stop missing calls with the OMH AI Receptionist</span></span>
            <span class="vp-time tnum">1:09</span>
          </span>
        </button>
      </div></div>
      <p class="px-2 pb-1 pt-4 text-[16px] text-muted">Plays from YouTube's privacy-enhanced player, only when you press play.</p>
    </div>
  </div>
</section>
<section id="overview" data-component="Overview" class="on-band bg-band text-band-ink">
  <div class="container-omh grid gap-12 py-20 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] lg:gap-16 lg:py-28">
    <div>
      <p class="eyebrow eyebrow-band">${mark}What we mean by AI services</p>
      <h2>Less time on repeat work, <span class="hl">more time for customers</span></h2>
      <div class="mt-6 space-y-4 text-band-muted">
        <p>AI earns its place in a business when it takes over a specific job that happens again and again: answering the same questions, typing the same details into two systems, writing the first draft of the same email.</p>
        <p>We start with those jobs, not with the technology. We find where your team loses hours each week, pick the work AI handles well and build the tool that fits. Some businesses need a single chatbot. Others need a plan, two integrations and a voice agent.</p>
        <p class="text-band-ink">Whichever it is, one UK team builds it, tests it and keeps it working.</p>
      </div>
    </div>
${timePanel}
  </div>
</section>

<section id="services" data-component="Services" class="bg-surface">
  <div class="container-omh py-20 lg:py-28">
    <div>
      <div>
        <p class="eyebrow">${mark}Our AI services</p>
        <h2>Seven ways we put AI <span class="hl">to work for you</span></h2>
      </div>
      <p class="mt-5 text-muted">Start with one and add others when they make sense. Below is what each service is, what we do and who it suits.</p>
    </div>
${jumpGrid}

    <div class="mt-8 space-y-6" data-reveal-group>
${aiServices.map(serviceArticle).join("\n")}
    </div>
  </div>
</section>

<section id="why-omh" data-component="WhyChooseOMH" class="bg-surface">
  <div class="container-omh py-20 lg:py-28">
    <div>
      <div>
        <p class="eyebrow">${mark}Why choose OMH</p>
        <h2>AI tools are easy to buy. <span class="hl">Making them work</span> is the job.</h2>
      </div>
      <p class="mt-5 text-muted">Anyone can sign up for an AI tool. Whether it helps your business depends on choosing the right job, setting it up properly and checking it every month. That's the part we do.</p>
    </div>
${whyTable}
  </div>
</section>

<section id="how-it-works" data-component="HowItWorks">
  <div class="container-omh py-20 lg:py-28">
    <div class="mx-auto text-center">
      <p class="eyebrow justify-center">${mark}How it works</p>
      <h2>Four steps from first call <span class="hl">to working tool</span></h2>
      <p class="mt-5 text-muted">You stay in control at every step. We confirm your timeline after the first call, before you commit to anything.</p>
    </div>

    <ol class="relative mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      ${howSteps}
    </ol>
  </div>
</section>

<section id="right-fit" data-component="RightFit" class="bg-surface">
  <div class="container-omh py-20 lg:py-28">
    <div>
      <div>
        <p class="eyebrow">${mark}Is it the right fit?</p>
        <h2>AI won't fix <span class="hl">everything</span></h2>
      </div>
      <p class="mt-5 text-muted">We would rather tell you now than three months in. This is where AI services earn their keep, and where they don't.</p>
    </div>

    <div class="mt-12 grid gap-5 md:grid-cols-2">
      <div class="rounded-[16px] border border-[color-mix(in_srgb,var(--va-ok)_35%,transparent)] bg-[color-mix(in_srgb,var(--va-ok)_7%,var(--va-surface))] p-6 sm:p-8">
        <h3 class="flex items-center gap-3 !text-[24px]"><span class="grid h-10 w-10 place-items-center rounded-full bg-ok text-surface">${icon("i-check")}</span>A good fit if</h3>
        <ul class="mt-6 space-y-4">
          ${goodFit.map(fitItem(true)).join("\n          ")}
        </ul>
      </div>
      <div class="rounded-[16px] border border-line bg-surface p-6 sm:p-8">
        <h3 class="flex items-center gap-3 !text-[24px]"><span class="grid h-10 w-10 place-items-center rounded-full border-[1.5px] border-[var(--va-line-strong)] text-muted">${icon("i-x")}</span>Not the right fit if</h3>
        <ul class="mt-6 space-y-4">
          ${badFit.map(fitItem(false)).join("\n          ")}
        </ul>
      </div>
    </div>
  </div>
</section>

<section id="faq" data-component="FAQ" class="bg-surface">
  <div class="container-omh grid gap-10 py-20 lg:grid-cols-[minmax(0,.72fr)_minmax(0,1.28fr)] lg:grid-rows-[auto_1fr] lg:gap-x-14 lg:gap-y-8 lg:py-28">
    <div>
      <p class="eyebrow">${mark}Questions</p>
      <h2>Straight answers about <span class="hl">AI for your business</span></h2>
      <p class="mt-5 text-muted">The things owners and managers ask us most. Search, or pick a topic.</p>
    </div>

    <div class="order-last lg:order-none lg:col-start-1 lg:row-start-2 lg:sticky lg:top-28 lg:self-start">
      <div class="rounded-[16px] bg-band p-6 text-band-ink on-band">
        <p class="font-display text-body font-semibold">Still have a question?</p>
        <p class="mt-1.5 text-[16px] leading-snug text-band-muted">Talk to a person on our UK team. No sales script.</p>
        <ul class="mt-4 space-y-1 text-[16px]">
          <li><a href="tel:+442034893934" class="text-link tnum" data-track="faq_phone_click">${icon("i-phone")}020 3489 3934</a></li>
          <li><a href="mailto:support@onlinemarketinghelp.co.uk" class="text-link [overflow-wrap:anywhere] max-sm:text-[15px]" data-track="faq_email_click">${icon("i-mail")}support@onlinemarketinghelp.co.uk</a></li>
        </ul>
        <a href="#book-demo" class="btn btn-primary mt-5 w-full" data-track="faq_book_consultation">Book an AI Consultation</a>
      </div>
    </div>

    <div class="lg:col-start-2 lg:row-span-2 lg:row-start-1" data-faq>
      <div class="relative">
        <label for="faq-search" class="sr-only">Search the questions</label>
        <span class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true"><svg class="icon" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg></span>
        <input id="faq-search" type="search" placeholder="Search, for example GDPR, cost or chatbot" autocomplete="off" class="field !min-h-[54px] !rounded-[12px] !pl-12" data-faq-search data-track="faq_search">
      </div>
      <div role="group" aria-label="Filter questions by topic" class="mt-4 flex flex-wrap gap-2" data-faq-filters>
        ${faqFilter("all", "All questions", true)}
        ${Object.entries(faqTopics).map(([key, label]) => faqFilter(key, label)).join("\n        ")}
      </div>
      <div class="mt-5 flex items-center justify-between gap-4 text-[15px] text-muted">
        <p aria-live="polite" data-faq-status>Showing all ${aiServicesFaqs.length} questions</p>
        <button type="button" class="inline-flex min-h-[44px] items-center gap-1.5 font-semibold text-ink hover:text-hl" data-faq-expand data-track="faq_expand_all">Open all</button>
      </div>

      <div class="mt-2 space-y-3" data-faq-list>
      ${faqItems}
      </div>
      <div class="mt-3 rounded-[14px] border border-dashed border-[var(--va-line-strong)] p-6 text-center" data-faq-empty hidden>
        <p class="font-display text-[18px] font-semibold">No questions match that</p>
        <p class="mt-1 text-[16px] text-muted">Try another word, or ring us on <a href="tel:+442034893934" class="font-semibold text-ink underline decoration-gold decoration-2 underline-offset-4 tnum">020 3489 3934</a> and ask a person.</p>
      </div>
    </div>
  </div>
</section>

<section id="book-demo" data-component="FinalCTA" class="on-band relative overflow-hidden bg-band text-band-ink">
  <div class="pointer-events-none absolute -left-40 bottom-[-200px] h-[560px] w-[560px] rounded-full bg-gold/15 blur-3xl" aria-hidden="true"></div>
  <div class="container-omh relative grid gap-12 py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16 lg:py-28">
    <div>
      <p class="eyebrow eyebrow-band">${mark}Book a consultation</p>
      <h2>Find out where AI <span class="hl">fits your business</span></h2>
      <p class="mt-5 text-band-muted">Tell us what slows your team down. We'll tell you honestly whether AI can help and which service to start with.</p>

      <h3 class="mt-10 !text-[22px]">What happens next</h3>
      <ol class="relative mt-5 space-y-6 before:absolute before:bottom-6 before:left-[19px] before:top-6 before:w-[2px] before:bg-band-line">
        <li class="relative grid grid-cols-[40px_minmax(0,1fr)] gap-x-4">
          <span class="relative z-10 grid h-10 w-10 place-items-center rounded-full bg-gold text-navy font-display text-[16px] font-semibold tnum">1</span>
          <span>
            <span class="block text-[13.5px] font-semibold text-band-hl">Today</span>
            <span class="block font-display text-[19px] font-semibold leading-snug">We listen first</span>
            <span class="mt-1 block text-[16px] leading-snug text-band-muted">A 30-minute call about how your business runs and where the time goes.</span>
          </span>
        </li>
        <li class="relative grid grid-cols-[40px_minmax(0,1fr)] gap-x-4">
          <span class="relative z-10 grid h-10 w-10 place-items-center rounded-full border-2 border-band-line bg-band text-band-hl font-display text-[16px] font-semibold tnum">2</span>
          <span>
            <span class="block text-[13.5px] font-semibold text-band-hl">Within a few days</span>
            <span class="block font-display text-[19px] font-semibold leading-snug">You get our recommendations</span>
            <span class="mt-1 block text-[16px] leading-snug text-band-muted">A short written summary of where AI would help your business and where it wouldn't.</span>
          </span>
        </li>
        <li class="relative grid grid-cols-[40px_minmax(0,1fr)] gap-x-4">
          <span class="relative z-10 grid h-10 w-10 place-items-center rounded-full border-2 border-band-line bg-band text-band-hl font-display text-[16px] font-semibold tnum">3</span>
          <span>
            <span class="block text-[13.5px] font-semibold text-band-hl">When you're ready</span>
            <span class="block font-display text-[19px] font-semibold leading-snug">You get a clear proposal</span>
            <span class="mt-1 block text-[16px] leading-snug text-band-muted">Scope, timeline and price in writing. No pressure to go ahead.</span>
          </span>
        </li>
      </ol>
    </div>

    <div class="lg:pt-2">
      <div class="rounded-[20px] bg-surface p-6 text-ink shadow-[0_40px_90px_-40px_rgb(0_0_0/0.7)] dark:border dark:border-[var(--va-line-strong)] sm:p-8" data-demo data-demo-form-name="AI services consultation">
        <form action="/contact" method="post" novalidate data-demo-form>
          <div aria-hidden="true" class="absolute left-[-9999px] h-px w-px overflow-hidden"><label>Leave this field empty <input type="text" name="hp" tabindex="-1" autocomplete="off" readonly></label></div>
          <div class="flex items-start justify-between gap-4">
            <div>
              <h3 class="!text-[26px]">Book your consultation</h3>
              <p class="mt-1 text-[15.5px] text-muted">Takes a minute. We reply within one working day. <span class="flag">[CONFIRM]</span></p>
            </div>
            <span class="hidden h-12 w-12 shrink-0 place-items-center rounded-full bg-gold/20 text-hl sm:grid" aria-hidden="true">${icon("i-calendar", "!h-6 !w-6")}</span>
          </div>
          <div class="mt-6 grid gap-4 sm:grid-cols-2">
            ${field("demo-name", "name", "Your name", "text", "name")}
            ${field("demo-business", "business", "Business name", "text", "organization")}
            <div class="sm:col-span-2">
              <label for="demo-service" class="block text-[15px] font-semibold">Which service are you interested in?</label>
              <select id="demo-service" name="service" required class="field mt-1.5 !bg-paper" aria-describedby="demo-service-err" data-demo-field data-demo-message="Choose a service, or pick Not sure yet.">
                <option value="">Choose one</option>
                ${aiServices.map((s) => `<option value="${s.id}">${esc(s.name)}</option>`).join("")}
                <option value="not-sure">Not sure yet</option>
              </select>
              <p id="demo-service-err" class="mt-1 text-[14px] font-semibold text-miss" data-demo-error hidden></p>
            </div>
            ${field("demo-phone", "phone", "Phone", "tel", "tel", 'inputmode="tel"')}
            ${field("demo-email", "email", "Email", "email", "email")}
          </div>
          <label class="mt-5 flex items-start gap-3 text-[15px] leading-snug text-muted">
            <input type="checkbox" name="consent" required class="mt-1 h-5 w-5 shrink-0 accent-[var(--color-teal-dark)]" aria-describedby="demo-consent-err" data-demo-field data-demo-message="Tick the box so we can contact you about your enquiry.">
            <span>I'm happy for OMH to contact me about this enquiry. See our <a href="/privacy" class="font-semibold text-ink underline decoration-gold decoration-2 underline-offset-2">privacy policy</a>.</span>
          </label>
          <p id="demo-consent-err" class="mt-1 text-[14px] font-semibold text-miss" data-demo-error hidden></p>
          <button type="submit" class="btn btn-primary mt-6 w-full" data-track="final_book_consultation">Book an AI Consultation${icon("i-arrow-right")}</button>
          <p class="mt-3 text-center text-[14px] font-semibold text-miss" role="alert" data-demo-send-error hidden></p>
          <p class="mt-4 text-center text-[15px] text-muted">Prefer to write it all down? <a href="/contact?type=brief&amp;service=ai-services" class="font-semibold text-ink underline decoration-gold decoration-2 underline-offset-4" data-track="final_send_brief">Send a Project Brief</a></p>
        </form>
        <div class="py-6 text-center" data-demo-success hidden tabindex="-1">
          <span class="mx-auto grid h-16 w-16 place-items-center rounded-full bg-ok text-surface" aria-hidden="true">${icon("i-check", "!h-8 !w-8")}</span>
          <h3 class="mt-5 !text-[26px]" data-demo-success-title>Thanks, we've got it</h3>
          <p class="mx-auto mt-2 text-[16.5px] text-muted">We'll be in touch within one working day to book your 30-minute call.</p>
          <a href="/ai-voice-agents" class="btn btn-secondary mt-6" data-track="final_success_voice_page">See how our AI voice agents work</a>
        </div>
      </div>
      <p class="mt-4 text-center text-[14px] text-band-muted">No obligation. UK team based in Hullbridge, Essex.</p>
    </div>
  </div>
</section>

<div data-component="MobileStickyBar" data-sticky-bar class="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper px-4 pb-[max(.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-12px_30px_-18px_rgb(0_0_0/0.35)] md:hidden" inert>
  <div class="flex items-center gap-3">
    <a href="#book-demo" class="btn btn-primary flex-1" data-track="sticky_book_consultation">Book a Consultation</a>
    <a href="tel:+442034893934" class="btn btn-secondary !px-0 w-[52px]" aria-label="Call OMH on 020 3489 3934" data-track="sticky_phone_click">${icon("i-phone")}</a>
  </div>
</div>
`;
