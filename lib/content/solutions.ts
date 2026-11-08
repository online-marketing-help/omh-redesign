import { CASE_STUDIES_LIVE } from "@/lib/flags";
export type SolutionTheme = "ppc" | "shopify" | "wordpress" | "seo" | "maintenance";

export type DefinitionIcon =
  | "briefcase" | "pin" | "coins" | "clock" | "building" | "user-check"
  | "eye" | "shield" | "pointer" | "clipboard" | "phone" | "target" | "chart"
  | "search" | "megaphone" | "pen" | "share" | "layout";

/** Illustrative UI mock-up under a hero growth-path step (components/solutions/GrowthPath.tsx). */
export type GrowthMock =
  | { kind: "search"; query: string; tag?: string; dim?: { query: string; tag: string } }
  | { kind: "map"; query: string; pin: string }
  | { kind: "page"; title: string; chips?: string[]; selects?: string[]; cta: string }
  | { kind: "enquiry"; initials: string; title: string; sub: string; badge: string; checks: string[] }
  | { kind: "call"; title: string; sub: string }
  | { kind: "product"; title: string; rating: string; note: string; cta: string }
  | { kind: "steps"; items: string[]; done: number }
  | { kind: "bars"; labels: string[]; heights: number[] }
  | { kind: "tasks"; items: { label: string; status: string; live?: boolean }[] }
  | { kind: "decision"; title: string; options: [string, string] }
  | { kind: "form"; fields: string[]; done: string; cta: string }
  | { kind: "proof"; items: string[] };

export type SolutionPageContent = {
  slug: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  intro: string;
  primaryCta: string;
  secondaryCta: string;
  theme: SolutionTheme;
  signal: string;
  /** Line under the hero's growth path; defaults to the shared wording. */
  signalNote?: string;
  /** One mock-up per `signal` step, in order. */
  signalMocks?: GrowthMock[];
  heroPoints: string[];
  /** Optional explainer between the hero and the problem section. */
  definition?: {
    title: string;
    body: string;
    /** Named factors, shown as cards. */
    factors?: { title: string; body: string }[];
    /** Or the aspects the definition lists, shown as icon cards under `tagsLabel`. */
    tagsLabel?: string;
    tags?: { title: string; body: string; icon: DefinitionIcon }[];
    /** Small print under the cards. */
    tagsNote?: string;
  };
  problem: {
    eyebrow: string;
    title: string;
    intro: string;
    symptoms: { title: string; body: string }[];
  };
  /** Optional side-by-side comparison of two options, with a highlighted recommendation. */
  comparison?: {
    eyebrow: string;
    title: string;
    options: { label: string; body: string }[];
    verdict: { label: string; body: string };
  };
  outcomes: {
    title: string;
    intro: string;
    items: { number: string; title: string; body: string }[];
  };
  media: {
    eyebrow: string;
    title: string;
    body: string;
    videoTitle: string;
    imageTitle: string;
    imageSrc: string;
    imageAlt?: string;
    screenTitle: string;
    screenSrc: string;
    screenAlt?: string;
    /** Optional journey strip under the media copy, e.g. profile → page → enquiry. */
    journey?: string[];
    /** Optional [label, text] captions for the three frames, in render order. */
    captions?: [string, string][];
  };
  approach: {
    title: string;
    intro: string;
    steps: { title: string; body: string }[];
  };
  services: {
    title: string;
    intro: string;
    items: { title: string; href: string; body: string; cta?: string }[];
  };
  fit: {
    title: string;
    intro?: string;
    good: string[];
    notYet: string[];
  };
  proof: {
    title: string;
    body: string;
    links: { label: string; href: string }[];
  };
  faq: { q: string; a: string }[];
  faqTitle?: string;
  final: {
    eyebrow?: string;
    title: string;
    body: string;
    cta: string;
    formNeed: string;
    formPrompt: string;
  };
};

export const solutions: Record<string, SolutionPageContent> = {
  "generate-qualified-leads": {
    slug: "generate-qualified-leads",
    // SEO brief (Oct 2026): provisional focus "generate qualified leads". "Lead generation
    // agency/services UK" are reserved for a future commercial service page.
    eyebrow: "Qualified lead generation for UK service businesses",
    title: "Generate More Qualified Leads",
    titleAccent: "from Your Marketing",
    intro:
      "More leads only help when they are the right leads. We connect targeting, campaigns, landing pages, qualification and tracking around the enquiries your business is most likely to turn into genuine sales opportunities.",
    primaryCta: "Request a Qualified Lead Review",
    secondaryCta: "See How Better Leads Are Generated",
    theme: "ppc",
    signal: "Search intent → landing page → qualified enquiry",
    signalMocks: [
      { kind: "search", query: "office cleaning contract quote", tag: "Buyer: target", dim: { query: "cleaning jobs near me", tag: "Job seeker: skip" } },
      { kind: "page", title: "Office cleaning across Essex", selects: ["Site size", "Start date"], cta: "Get a quote" },
      { kind: "enquiry", initials: "JP", title: "New enquiry, 3 office sites", sub: "Chelmsford, starts next month", badge: "Qualified", checks: ["Service", "Area", "Budget", "Timing"] },
    ],
    heroPoints: ["Built around lead quality", "Campaign and website support", "Clear commercial reporting"],
    definition: {
      title: "What Is a Qualified Lead?",
      body: "A qualified lead is an enquiry that fits the type of customer your business can realistically serve and shows a meaningful reason to buy. The exact criteria vary by business, but they may include service need, location, budget, timing, company type, decision-making role, or another signal that helps your team distinguish a genuine opportunity from a form submission.\n\nThe goal is not to make every visitor qualify. It is to attract and identify more of the people your sales team actually wants to speak to.",
      // The criteria the definition lists, in its order.
      tagsLabel: "Criteria may include",
      tags: [
        { title: "Service need", body: "They need a service you actually offer and deliver well.", icon: "briefcase" },
        { title: "Location", body: "They are based in, or need work done in, an area you genuinely cover.", icon: "pin" },
        { title: "Budget", body: "Their expected spend fits your pricing, so the conversation is worth having.", icon: "coins" },
        { title: "Timing", body: "They plan to act soon enough for the enquiry to turn into paid work.", icon: "clock" },
        { title: "Company type", body: "Their size, sector or setup matches the clients you serve best.", icon: "building" },
        { title: "Decision-making role", body: "They can approve the purchase, or will bring in the person who can.", icon: "user-check" },
      ],
      tagsNote: "Most businesses only need a few of these. Choose the ones your sales team already uses to decide who is worth a call.",
    },
    problem: {
      eyebrow: "The real lead problem",
      title: "Why More Leads Do Not Always Mean Better Leads",
      intro:
        "Lead volume is only useful when the enquiries match the customers your business can serve. The more useful question is whether the right people are finding you, understanding the offer, and taking an action your sales team considers commercially valuable.",
      symptoms: [
        { title: "High Lead Volume, Low Lead Quality", body: "Forms may be completed, but the location, budget, service requirement, customer profile, or buying intent does not match the opportunities your team wants." },
        { title: "Marketing Spend Rises Without Better Opportunities", body: "Campaign reports can show clicks and submissions while hiding which enquiries became useful sales conversations or customers." },
        { title: "The Landing Page Weakens the Campaign Message", body: "The advert, search result, or social message creates one expectation, but the landing page makes the visitor work to confirm the offer, fit, or next step." },
        { title: "Sales Feedback Is Missing from Marketing Decisions", body: "When accepted and rejected leads are treated as equal conversions, campaigns can optimise towards more submissions without learning which enquiries are actually valuable." },
      ],
    },
    outcomes: {
      title: "How to Generate More Qualified Leads",
      intro: "Generating more qualified leads means improving the whole journey – who sees the message, what they expect, where they land, what information you collect, and how sales feedback is used afterwards.",
      items: [
        { number: "01", title: "Reach People with the Right Intent", body: "Choose channels, searches, locations and audiences around the problems you solve, the customers you want and the areas or markets you can genuinely serve." },
        { number: "02", title: "Match the Message to a Focused Landing Page", body: "Use focused landing pages, relevant proof and sensible qualifying questions instead of sending every audience to a generic page with the same message." },
        { number: "03", title: "Measure Lead Quality, Not Just Form Submissions", body: "Connect forms, calls, CRM outcomes and sales feedback so reporting can distinguish a raw enquiry from a qualified opportunity and, where possible, a customer." },
      ],
    },
    media: {
      eyebrow: "See the system",
      title: "Connect Lead Generation to Sales Outcomes",
      // The brief's text here is an instruction (show the journey with approved campaign,
      // landing-page and reporting examples); this is its customer-facing version.
      body: "Lead quality is judged across the whole journey, from the search or audience that brings someone in to the landing page, the enquiry and what happens in the sales conversation.",
      journey: ["Search or audience", "Landing page", "Enquiry", "Sales outcome"],
      videoTitle: "Lead-generation campaign walkthrough",
      imageTitle: "Campaign landing-page example",
      imageSrc: "/images/Solutions/1.jpg",
      imageAlt: "A lead-generation landing page being reviewed on screen alongside a marketing plan.",
      screenTitle: "Lead quality reporting view",
      screenSrc: "/images/Services/Images on the pages/Search-term and budget view.png",
      screenAlt: "Illustrative search terms and budget report showing which queries produced enquiries over a dated period."
    },
    approach: {
      title: "How We Improve Lead Quality",
      intro: "We do not recommend a channel before understanding what a valuable lead looks like, who you want to reach, what you can profitably sell, and what the current data is actually showing.",
      steps: [
        { title: "Define What a Qualified Lead Means", body: "Agree the services, locations, customer profile, budget, timing, or other buying signals that make an enquiry worth pursuing for your business." },
        { title: "Audit the Route from Traffic to Enquiry", body: "Review searches, audiences, offers, ads, landing pages, forms, calls, and tracking as one connected journey so the source of weak-fit leads can be traced." },
        { title: "Prioritise the Biggest Source of Lead Waste", body: "Fix the largest source of poor-fit enquiries or wasted spend first, then test targeting, messaging, page and qualification improvements in a sensible order." },
        { title: "Use Sales Feedback to Improve Marketing", body: "Feed accepted, rejected, and won opportunities back into reporting so budget, targeting, and messaging decisions are based on commercial quality rather than click or form volume alone." },
      ],
    },
    services: {
      title: "Services That Support Qualified Lead Generation",
      intro: "The right service depends on where lead quality is breaking down. One business may need a stronger acquisition channel; another may need better landing pages, organic visibility, or measurement. We recommend only the work with a clear role in improving the journey. Call new web leads back within 60 seconds with an [AI voice agent](/ai-voice-agents).",
      items: [
        { title: "Google Ads Management", href: "/google-adwords-ppc", cta: "Explore Google Ads Management", body: "Capture high-intent demand, filter irrelevant searches, and align campaigns with the enquiries your business actually wants." },
        { title: "Paid Social Advertising", href: "/social-media-paid-advertising", cta: "Explore Paid Social Advertising", body: "Reach and retarget defined audiences with creative and offers designed around the right customer profile rather than broad lead volume." },
        { title: "Search Engine Optimisation", href: "/seo-services", cta: "Explore SEO Services", body: "Build longer-term visibility around commercially relevant searches that match the problems, services and customers your business wants to attract." },
        { title: "WordPress Development", href: "/wordpress-development", cta: "Explore WordPress Development", body: "Build focused landing pages, clearer forms and tracking-ready website journeys when the site itself is limiting lead quality or conversion." },
      ],
    },
    fit: {
      title: "Is a Qualified Lead Strategy the Right Starting Point?",
      intro: "This approach works best when you can describe the enquiries that become customers, respond to leads consistently and give feedback on quality. We establish those basics before recommending a channel or programme.",
      good: ["You can describe which enquiries tend to become customers", "You serve a defined market or location", "Someone can respond to and assess new enquiries", "You want campaigns and website decisions made together"],
      notYet: ["The offer or target customer is still undecided", "Every form submission must be treated as equally valuable", "There is no capacity to follow up with leads", "You need a guaranteed number of leads or sales"],
    },
    proof: {
      title: "Qualified Lead Generation Results and Case Studies",
      // The brief's text is an editorial rule (verified downstream evidence only); this is its
      // customer-facing version, hedged because current case studies report search outcomes.
      body: "Each case study sets out the starting problem, the work carried out and the verified outcome. Where the data allows, we report accepted leads, sales conversations, qualified opportunities or customers – not only clicks and form submissions.",
      links: [
        { label: "Browse all case studies", href: "/case-studies" },
        { label: "See the car showroom search project", href: "/case-studies/car-showroom" },
      ],
    },
    faqTitle: "Qualified Lead Generation Questions, Answered",
    faq: [
      { q: "What is a qualified lead?", a: "A qualified lead is an enquiry that matches the type of customer your business can realistically serve and shows a meaningful reason to buy. The criteria may include service need, location, budget, timing, company type, role, or another signal that matters commercially." },
      { q: "Which channel is best for generating qualified leads?", a: "It depends on where demand already exists, the sales cycle, geography, budget, and how clearly the offer can be explained. Google Ads may suit active search demand, SEO can build longer-term visibility, and paid social can create or retarget demand. The review determines where the strongest fit exists." },
      { q: "How can you improve lead quality?", a: "We can refine targeting, searches, audiences, ad messaging, landing pages, forms, and tracking. The strongest improvement usually comes when your sales team also feeds back which enquiries were accepted, rejected or became customers." },
      { q: "Do more leads always mean better marketing performance?", a: "No. More submissions can increase sales workload without increasing useful opportunities. Lead generation should be judged against lead quality, commercial fit, and downstream outcomes where the available systems allow it." },
      { q: "Do we need a new website first?", a: "Not always. Sometimes a focused landing page or several targeted improvements are enough. If the current site creates a wider trust, speed or usability problem, we will explain why broader work should be considered." },
      { q: "How should qualified lead generation be reported?", a: "Reporting should connect traffic and spend with calls, forms, and, where possible, lead quality or CRM feedback. We agree on what counts as a useful lead before campaign decisions are made." },
    ],
    final: {
      eyebrow: "Start with Lead Quality, Not Lead Volume",
      title: "Tell Us What a Qualified Lead Looks Like for Your Business",
      body: "Share what you are doing now, which enquiries become real opportunities, where poor-fit leads are coming from, and what your sales team needs more of. We will review the journey and recommend the clearest next step.",
      cta: "Request My Qualified Lead Review",
      formNeed: "More qualified leads",
      formPrompt: "What makes an enquiry valuable to your business, and what is going wrong now?",
    },
  },
  "increase-ecommerce-sales": {
    slug: "increase-ecommerce-sales",
    // SEO brief (Oct 2026): focus keyword "ecommerce growth strategy"; "increase ecommerce
    // sales" stays as the URL/benefit phrase. The brief mixes "e-commerce" and "ecommerce";
    // the keyword spelling is used throughout.
    eyebrow: "Ecommerce growth strategy for UK retailers",
    title: "Build an Ecommerce Growth Strategy",
    titleAccent: "That Drives Sales",
    intro:
      "Ecommerce growth rarely comes from buying more traffic alone. We review acquisition, product pages, storefront performance, checkout, and measurement together to identify where sales are being lost and where the strongest growth opportunities sit.",
    primaryCta: "Request an Ecommerce Growth Review",
    secondaryCta: "Explore the Growth Approach",
    theme: "shopify",
    signal: "Acquisition → Product confidence → Checkout → Measurement",
    signalNote: "One connected buying journey, measured against the commercial actions that matter.",
    signalMocks: [
      { kind: "search", query: "waterproof walking boots", tag: "Shopping ad" },
      { kind: "product", title: "Waterproof walking boot", rating: "Reviews", note: "Free UK delivery and returns", cta: "Add to basket" },
      { kind: "steps", items: ["Basket", "Delivery", "Payment", "Done"], done: 3 },
      { kind: "bars", labels: ["Sessions", "Orders", "Revenue", "Margin"], heights: [45, 60, 75, 90] },
    ],
    heroPoints: ["Acquisition & visibility", "Storefront & conversion", "Measurement & prioritisation"],
    problem: {
      eyebrow: "Where growth gets stuck",
      title: "Why Ecommerce Sales Growth Can Stall",
      intro: "A store can attract more visitors without generating enough profitable growth. Several smaller issues often work together – from traffic quality and product confidence to mobile friction and unclear measurement.",
      symptoms: [
        { title: "Customer acquisition costs keep climbing", body: "The budget is spread across campaigns without enough clarity on which products are profitable, contribution margins, returning customers, or which traffic is most likely to convert." },
        { title: "Product pages leave buying questions unanswered", body: "Visitors reach the store but do not get enough detail, reassurance or confidence around the product, delivery, returns, or final purchase decision." },
        { title: "Mobile shoppers drop before checkout", body: "Slow pages, navigation, variants, cart behaviour or checkout friction can interrupt the route to purchase at the point where intent is highest." },
        { title: "Reporting makes decisions harder", body: "Advertising platforms, analytics, and store data can tell different versions of the same story, making it difficult to know where budget and effort should go next." },
      ],
    },
    outcomes: {
      title: "What Makes an Effective Ecommerce Growth Strategy?",
      intro: "The strongest ecommerce growth strategies connect how people discover a product, decide it is right, and complete the order, and how the business measures the result. The priority should depend on the biggest commercial constraint – not on a pre-set channel plan.",
      items: [
        { number: "01", title: "Acquire more relevant shoppers", body: "Improve campaign structure, product feeds, search visibility and audience choices around the products and customer groups that matter most." },
        { number: "02", title: "Strengthen product confidence", body: "Make product information, imagery, variants, delivery, returns and social proof easier to understand at the moments buyers need reassurance." },
        { number: "03", title: "Remove friction from the route to purchase", body: "Review mobile performance, navigation, collection pages, product pages, cart and checkout so high-intent visitors have a clearer path to complete the order." },
        { number: "04", title: "Measure what supports profitable growth", body: "Connect store data, analytics, and advertising signals so decisions are based on commercial context rather than platform-reported revenue alone." },
      ],
    },
    media: {
      eyebrow: "One connected buying journey",
      title: "Connect Acquisition, Shopfront and Checkout",
      body: "Traffic, shopfront experience and measurement should not be treated as separate projects. A campaign can bring the right shopper to the wrong page, while a strong product page can still underperform if mobile speed, checkout or tracking is weak. We look at the journey as one system, so ecommerce growth solutions are prioritised around the point most likely to make a commercial difference.",
      captions: [
        ["Acquisition", "Reach the right shoppers"],
        ["Shopfront", "Build product confidence"],
        ["Measurement", "See what contributes to sales"],
      ],
      videoTitle: "Mobile shopping-journey walkthrough",
      imageTitle: "Product and collection page example",
      imageSrc: "/images/Services/Images on the pages/Shopify development after.png",
      imageAlt: "A demo storefront homepage with collections, featured products and checkout links laid out on desktop.",
      screenTitle: "Ecommerce performance dashboard",
      screenSrc: "/images/Services/Images on the pages/Search-term and ACoS view Amazon PPC.png",
      screenAlt: "Illustrative marketplace advertising report showing spend, sales, ACoS and ROAS by search term."
    },
    approach: {
      title: "Start With an Ecommerce Growth Review",
      intro: "Before recommending a service, we look at how the store makes money, how customers move from discovery to checkout, and where the strongest evidence of lost performance appears.",
      steps: [
        { title: "Understand the commercial model", body: "Review the product range, average order value, margin considerations, repeat purchase potential, and operational constraints." },
        { title: "Map the buying journey", body: "Assess acquisition sources, landing destinations, collections, product pages, mobile behaviour, cart, checkout and post-purchase measurement." },
        { title: "Find the biggest growth constraint", body: "Identify whether the first priority sits in campaigns, feeds, search visibility, content, development, conversion, or tracking." },
        { title: "Prioritise the next actions", body: "Recommend a practical sequence of changes, with a clear reason for each action and a way to measure whether it improves performance." },
      ],
    },
    services: {
      title: "Services That Support Your Ecommerce Growth Strategy",
      intro: "The service mix depends on the bottleneck, not on a pre-set bundle. We identify what is limiting ecommerce growth first, then connect the work to the service most likely to move that part of the buying journey forward.",
      items: [
        { title: "Shopify Development", href: "/shopify-development", cta: "Explore Shopify Development", body: "Improve storefront structure, product journeys, site performance and technical foundations to create a clearer route to purchase." },
        { title: "Google Ads Management", href: "/google-adwords-ppc", cta: "Explore Google Ads Management", body: "Reach high-intent shoppers through Search, Shopping and Performance Max campaigns built around product priorities and commercial goals." },
        { title: "Paid Social Advertising", href: "/social-media-paid-advertising", cta: "Explore Paid Social Advertising", body: "Build demand, test creative, reach new audiences and reconnect with potential customers through structured prospecting and remarketing." },
        { title: "Amazon PPC", href: "/amazon-ppc-advertising-agency-uk", cta: "Explore Amazon PPC", body: "Improve marketplace visibility and product discovery with more structured Amazon advertising and controlled ad spend." },
      ],
    },
    fit: {
      title: "Is This Ecommerce Growth Approach Right for You?",
      intro: "A useful first conversation should establish whether there is enough commercial and behavioural context to make sensible recommendations before anyone proposes an ecommerce growth service or channel plan.",
      good: ["Your store is already trading or close to launching", "You can share product, margin and fulfilment context", "There is enough traffic, sales history, or budget to learn from", "You are willing to improve the store as well as the acquisition channels"],
      notYet: ["The product range and pricing are not settled", "There is no reliable stock or fulfilment process", "You need guaranteed revenue or ROAS", "The only acceptable recommendation is to increase ad spend"],
    },
    proof: {
      title: "See Ecommerce Growth Work in Context",
      body: "Explore relevant case studies to see the commercial problem, the work completed, and the context behind the outcome. We use verified examples to show how acquisition, search, development, or conversion work supported a real business – not to promise the same result for every store.",
      links: [
        { label: "Browse Ecommerce-Related Work", href: "/case-studies" },
        { label: "View the Online Clothing Search Project", href: "/case-studies/clothing-business" },
      ],
    },
    faqTitle: "Ecommerce Growth Strategy FAQs",
    faq: [
      { q: "What is an ecommerce growth strategy?", a: "An ecommerce growth strategy is a prioritised plan for improving the parts of the customer journey that have the greatest commercial impact. Depending on the store, that can include acquisition, search visibility, product pages, mobile experience, checkout, tracking, or a combination of these areas." },
      { q: "Do you only work with Shopify stores?", a: "No. Shopify is one of the platforms we support, but the ecommerce growth review starts with the commercial model and customer journey rather than the platform name. We confirm whether the current setup is suitable before recommending development work." },
      { q: "Can you manage Google Shopping or Meta Ads?", a: "Yes. Paid campaign support can include Google Ads and paid social, with work around campaign structure, product feeds, creative, audiences, landing destinations, and tracking. The scope depends on the store, the current accounts, and the commercial priorities." },
      { q: "Will you improve conversion as well as traffic?", a: "Where the evidence points to storefront friction, we can review product pages, collections, mobile experience, and the route to checkout. We separate observed issues from assumptions that need testing, so changes have a clear reason behind them." },
      { q: "How do you decide which ecommerce growth solution to prioritise?", a: "We look at product economics, acquisition data, customer behaviour, storefront performance and measurement together. The first priority should be the constraint with the strongest evidence and the clearest commercial upside – not simply the channel with the largest available budget." },
      { q: "What information do you need from us?", a: "Useful starting information includes store access, product priorities, margin or contribution context, fulfilment constraints, analytics, advertising accounts and the commercial targets used by the business." },
    ],
    final: {
      title: "Find the Biggest Constraint on Ecommerce Growth",
      body: "Tell us which products matter, where sales feel inconsistent, and what your current reporting says. We will review the route from acquisition to checkout and recommend a practical starting point based on the evidence available.",
      cta: "Request an Ecommerce Growth Review",
      formNeed: "More ecommerce sales",
      formPrompt: "Which products or parts of the buying journey are underperforming?",
    },
  },
  "improve-website-conversion": {
    slug: "improve-website-conversion",
    // SEO brief (Oct 2026): provisional focus "improve website conversion". Keep the page
    // diagnosis-first; "CRO services"/"CRO agency UK" are reserved for a future CRO service page.
    eyebrow: "Website conversion improvement for UK businesses",
    title: "Improve Website Conversion and",
    titleAccent: "Turn More Visitors Into Enquiries",
    intro:
      "If your website already attracts relevant traffic but too few visitors enquire, book or buy, the problem may be in the journey itself. We review where people lose clarity, confidence or momentum, then prioritise the changes most likely to improve website conversion.",
    primaryCta: "Request a Conversion Review",
    secondaryCta: "See How Conversion Works",
    theme: "wordpress",
    signal: "Clarity → confidence → action",
    signalMocks: [
      { kind: "page", title: "Clear offer, clear next step", chips: ["Who it is for", "What it costs"], cta: "Get a quote" },
      { kind: "proof", items: ["Google reviews", "Accreditations", CASE_STUDIES_LIVE ? "Case studies" : "Trustpilot reviews"] },
      { kind: "form", fields: ["Name", "Phone"], done: "Enquiry sent", cta: "Request a quote" },
    ],
    heroPoints: ["Evidence-led page reviews", "Design and development support", "Tracking before assumptions"],
    definition: {
      title: "What Is Website Conversion Optimisation?",
      body: "Website conversion optimisation is the process of improving the pages and journeys that turn relevant visitors into useful actions such as enquiries, calls, bookings or purchases. It looks at clarity, trust, usability, forms, mobile experience, traffic intent and measurement. The aim is not to change everything – it is to find the biggest source of friction and fix the right problem first.",
      // The seven areas the definition names, in its order.
      tagsLabel: "What it looks at",
      tags: [
        { title: "Clarity", body: "Visitors can tell quickly what you offer, who it is for and what to do next.", icon: "eye" },
        { title: "Trust", body: "Reviews, proof and credentials answer the doubts that stop people enquiring.", icon: "shield" },
        { title: "Usability", body: "Pages are easy to read, navigate and act on without effort.", icon: "pointer" },
        { title: "Forms", body: "Enquiry and booking forms ask only for what is needed and work first time.", icon: "clipboard" },
        { title: "Mobile experience", body: "The journey holds up on a phone, where many visitors arrive.", icon: "phone" },
        { title: "Traffic intent", body: "The people arriving actually match the service and the page they land on.", icon: "target" },
        { title: "Measurement", body: "Calls, forms and bookings are tracked, so changes are judged on real actions.", icon: "chart" },
      ],
    },
    problem: {
      eyebrow: "Conversion friction",
      title: "Why Website Visitors Do Not Convert",
      intro: "Visitors rarely explain why they leave without acting. The clues usually sit across message clarity, page structure, proof, mobile usability, forms, technical performance and the quality of the traffic arriving.",
      symptoms: [
        { title: "The Offer Is Not Clear Quickly Enough", body: "Visitors should be able to understand who the offer is for, what problem it solves, and what to do next without decoding vague marketing language." },
        { title: "Trust and Proof Appear Too Late", body: "Reviews, results, process information and reassurance need to appear close to the decisions where visitors are most likely to hesitate." },
        { title: "Mobile Friction Makes the Next Step Harder", body: "Dense layouts, difficult navigation, slow pages, or awkward forms can turn a simple enquiry into unnecessary work on a phone." },
        { title: "Tracking Shows Actions but Not Why They Happened", body: "A form submission or purchase is useful, but better decisions come from knowing which page, message, device, and traffic source helped or blocked the journey." },
      ],
    },
    outcomes: {
      title: "How to Improve Website Conversion",
      intro: "Improving website conversion is not about random button changes. It is a structured process of making the offer easier to understand, increasing confidence, reducing friction, and measuring whether the customer journey improves.",
      items: [
        { number: "01", title: "Make the Offer Clear", body: "Make the audience, problem, value, and next step obvious so the right visitor can quickly decide whether the offer fits." },
        { number: "02", title: "Add Trust Where Decisions Happen", body: "Place reviews, proof, process information, FAQs and expectation-setting close to the moments where a visitor needs reassurance." },
        { number: "03", title: "Make the Next Step Easier", body: "Improve calls to action, forms, mobile interactions, and page flow so the next step feels simple, then track meaningful conversions rather than vanity clicks." },
      ],
    },
    media: {
      eyebrow: "Before and after",
      title: "Website Conversion Improvements: What Changed and Why",
      // The brief's text here is an instruction to use a verified before-and-after example;
      // this is its customer-facing version, which does not present these images as that proof.
      body: "When we show a before-and-after, it sets out the original conversion problem, the change made and the verified outcome, with the page, date range, traffic context and the action measured.",
      videoTitle: "Conversion review walkthrough",
      imageTitle: "Before-and-after page comparison",
      imageSrc: "/images/Services/Images on the pages/Shopify development before.png",
      imageAlt: "A dated storefront layout before a conversion-focused rebuild.",
      screenTitle: "User journey and conversion view",
      screenSrc: "/images/Services/Images on the pages/Organic search performance view SEO.png",
      screenAlt: "Illustrative performance report showing the pages and queries people arrive on before converting."
    },
    approach: {
      title: "How We Find the Biggest Website Conversion Opportunities",
      intro: "The review combines business context, analytics, and direct inspection of the customer journey so recommendations are prioritised by evidence, likely value, and implementation effort.",
      steps: [
        { title: "Define the Conversion That Matters", body: "Agree which enquiries, calls, bookings, purchases or other actions have genuine commercial value and how quality will be judged." },
        { title: "Review Traffic, Pages and Behaviour", body: "Review landing pages, devices, traffic sources, navigation, forms, drop-off points and whether the existing tracking can be trusted." },
        { title: "Prioritise the Highest-Value Changes", body: "Rank content, design, UX and development changes by likely value, confidence and effort so the team knows what to address first." },
        { title: "Implement, Measure and Learn", body: "Release the agreed improvements, check the data and customer feedback, then use the evidence to decide what should happen next." },
      ],
    },
    services: {
      title: "Services That Support Better Website Conversion",
      intro: "Website conversion problems often cross service boundaries. Once the main source of friction is clearer, the right route may involve development, ecommerce improvements, maintenance, or acquisition alignment rather than a pre-set package.",
      items: [
        { title: "WordPress Development", href: "/wordpress-development", cta: "Explore WordPress Development", body: "Improve page structure, usability, forms and conversion paths when the website itself is limiting enquiries." },
        { title: "Shopify Development", href: "/shopify-development", cta: "Explore Shopify Development", body: "Improve product discovery, trust, product-page clarity and checkout journeys when ecommerce visitors are not progressing to purchase." },
        { title: "Website Maintenance", href: "/wordpress-website-maintenance", cta: "Explore Website Maintenance", body: "Fix forms, broken interactions, performance issues, and ongoing technical friction that can interrupt the path to conversion." },
        { title: "Google Ads Management", href: "/google-adwords-ppc", cta: "Explore Google Ads Management", body: "Align search intent, ad messaging, landing pages, and conversion tracking so paid traffic arrives with the right expectation." },
      ],
    },
    fit: {
      title: "When Website Conversion Work Makes Sense",
      intro: "Website conversion work is most useful when there is enough relevant traffic to learn from, a valuable action to measure, and a team that can implement changes. We establish that before recommending a programme.",
      good: ["The website receives relevant traffic already", "There is a meaningful action to measure", "Your team can provide sales or customer feedback", "You can implement design, content or development changes"],
      notYet: ["There is too little relevant traffic to learn from", "The offer changes every week", "No one can define a valuable conversion", "You want a redesign based only on visual preference"],
    },
    proof: {
      title: "Website Conversion Case Studies and Relevant Results",
      body: "Good conversion proof should explain the starting problem, what changed, the traffic or measurement context, and the verified outcome. We use real case studies rather than isolated percentage claims.",
      links: [
        { label: "View website case studies", href: "/case-studies" },
        { label: "Read the steakhouse reservations project", href: "/case-studies/bar" },
        { label: "Explore WordPress development", href: "/wordpress-development" },
      ],
    },
    faqTitle: "Website Conversion Questions, Answered",
    faq: [
      { q: "What is website conversion optimisation?", a: "Website conversion optimisation improves the pages and journeys that turn relevant visitors into useful actions such as enquiries, calls, bookings or purchases. It combines clarity, usability, trust, traffic context, and measurement." },
      { q: "Do we need a complete redesign to improve website conversion?", a: "Not necessarily. A focused set of page, form, navigation, content, or trust improvements may be more sensible. A wider redesign only makes sense when the current structure, platform, or credibility creates a broader constraint." },
      { q: "What counts as a website conversion?", a: "It depends on the business. It may be a qualified form submission, phone call, booked consultation, purchase, or another action connected to commercial value. We agree on the useful action before judging performance." },
      { q: "How do you know what is stopping visitors from converting?", a: "We look at the pages people enter on, the traffic source, device behaviour, navigation, forms, trust signals, drop-off points, tracking quality, and customer or sales feedback. The aim is to find the most credible source of friction before making changes." },
      { q: "Can you work with our current developer or marketing team?", a: "Yes. We can provide the review and prioritised recommendations, implement the work ourselves where appropriate, or coordinate with an existing team if responsibilities are clear." },
      { q: "Can you guarantee a higher website conversion rate?", a: "No. Traffic quality, the offer, market conditions, seasonality, and implementation all affect the outcome. We can identify credible friction, improve the journey, and measure results without presenting a hypothesis as a guarantee." },
    ],
    final: {
      eyebrow: "Start With the Real Conversion Problem",
      title: "Find Out What Is Limiting Your Website Conversion",
      body: "Share the pages that matter, the traffic they receive, and the enquiries, bookings, or purchases you want more visitors to complete. We will review the context, identify the most credible source of friction, and recommend the most useful next step.",
      cta: "Request My Website Conversion Review",
      formNeed: "Better website conversion",
      formPrompt: "Which pages and actions matter most, and where do you think visitors are getting stuck?",
    },
  },
  "grow-local-visibility": {
    slug: "grow-local-visibility",
    // SEO brief (Oct 2026): provisional focus topic "local search visibility". Commercial
    // "local SEO services/agency/packages" terms stay on /local-seo.
    eyebrow: "Local search visibility for UK service businesses",
    title: "Improve Local Search Visibility and",
    titleAccent: "Win More Local Enquiries",
    intro:
      "Local search visibility depends on more than a Google Business Profile. Your profile, service and location pages, reviews, business details, and wider search presence need to reinforce the same services and areas. We help you identify what is limiting visibility and which part of your local search strategy to fix first.",
    primaryCta: "Check My Local Visibility",
    secondaryCta: "See How Local Visibility Works",
    theme: "seo",
    signal: "Local search → useful page → call or enquiry",
    signalMocks: [
      { kind: "map", query: "emergency plumber near me", pin: "Your profile" },
      { kind: "page", title: "Emergency plumbing in Chelmsford", chips: ["Areas covered", "Reviews"], cta: "Call now" },
      { kind: "call", title: "New enquiry received", sub: "Boiler repair, CM1, via Google" },
    ],
    heroPoints: ["Google Business Profile", "Service and location pages", "Local enquiry measurement"],
    definition: {
      title: "What Is Local Search Visibility?",
      body: "Local search visibility is how easily nearby customers can discover and evaluate your business across Google Search, Google Maps, and the pages they reach from those results. Strong visibility comes from consistent signals: accurate business information, a relevant Google Business Profile, useful service and location pages, genuine reviews, and a website that makes the next step clear. Google says local results are mainly influenced by relevance, distance, and prominence, so the goal is not to appear everywhere – it is to be a strong match where your business genuinely operates.",
      // Google's three named local ranking factors, paraphrased from its Business Profile help page.
      factors: [
        { title: "Relevance", body: "How well your profile and pages match what someone searched for." },
        { title: "Distance", body: "How far your business is from the searcher or the location in their search." },
        { title: "Prominence", body: "How well known and trusted the business is, online and offline." },
      ],
    },
    problem: {
      eyebrow: "Local search gaps",
      title: "Why Local Businesses Struggle to Appear in Search",
      intro: "Being close to a customer is only one part of local discovery. Search engines and customers also need clear, consistent evidence about what you do, where you work, and why your business is a credible choice.",
      symptoms: [
        { title: "Competitors Appear Above You in Maps", body: "Your Google Business Profile, categories, services, reviews, or website relevance may not give Google enough confidence that you are the best match for the searches you want to win." },
        { title: "Location Pages Add Little Local Value", body: "Changing a town name across near-identical pages does not help customers understand your real coverage, the service available there, or what to do next. Useful local pages need genuine service and area context." },
        { title: "Business Information Is Inconsistent", body: "Business names, addresses, phone numbers, opening hours or service areas can differ between your website, Google Business Profile and other trusted listings, weakening confidence in the business information." },
        { title: "Local Enquiries Are Hard to Measure", body: "Calls, profile actions, direction requests and website forms are often measured separately, making it difficult to see which local searches and pages are contributing to real enquiries." },
      ],
    },
    outcomes: {
      title: "What Strong Local Search Visibility Looks Like",
      intro: "The goal is not to rank everywhere. It is to become easier to find and trust for the services and locations your business can genuinely support – then make the route from search to enquiry simple.",
      items: [
        { number: "01", title: "Keep Business Information Accurate", body: "Keep your Google Business Profile, categories, services, opening details, service areas and core business information accurate and consistent across the places customers rely on." },
        { number: "02", title: "Build Relevant Local Pages and Signals", body: "Create service and location content that answers real questions about what you offer, where you work, and how customers can take the next step. Support those pages with sensible internal links and trustworthy local signals." },
        { number: "03", title: "Turn Local Visibility Into Enquiries", body: "Make calls, forms and contact routes easy to use, then measure profile actions and website enquiries together so local visibility can be judged against meaningful business outcomes." },
      ],
    },
    media: {
      eyebrow: "Local search landscape",
      title: "How Local Search Visibility Works as a System",
      body: "A customer may discover you in Google Maps, compare your reviews, visit a service or location page, and then call or submit a form.",
      journey: ["Business Profile", "Useful local page", "Enquiry or call"],
      videoTitle: "Local visibility review walkthrough",
      imageTitle: "Service-area page example",
      imageSrc: "/images/Services/local seo 2.jpg",
      imageAlt: "A service-area page being reviewed for a local business.",
      screenTitle: "Google Business Profile view",
      screenSrc: "/images/Services/Images on the pages/Google Business Profile and local performance local SEO.png",
      screenAlt: "Illustrative Google Business Profile performance view showing calls, direction requests and website clicks."
    },
    approach: {
      title: "A Practical Local Visibility Strategy for Your Real Service Area",
      intro: "A useful local visibility strategy starts with the services that matter commercially, the areas you genuinely cover, and how customers search for them – not with a long list of town names to force onto pages.",
      steps: [
        { title: "Map Services and Real Coverage", body: "Confirm the priority services, genuine service areas, branches and physical locations before deciding what should be optimised." },
        { title: "Audit the Local Search Footprint", body: "Review the website, Google Business Profile, reviews, trusted listings, competitors, and current enquiry tracking to see where the strongest gaps sit." },
        { title: "Fix Relevance and Trust Gaps", body: "Improve the profile, local pages, website structure, business information and supporting trust signals in the order most likely to matter." },
        { title: "Measure Local Visibility and Enquiries", body: "Track visibility alongside calls, forms, website visits, direction requests and other useful actions so progress is connected to customer behaviour." },
      ],
    },
    services: {
      title: "Services That Support Your Local Visibility Strategy",
      intro: "The right service depends on the bottleneck. Local visibility may need focused Local SEO work, broader SEO, stronger service or location pages, or paid search support while organic visibility develops.",
      items: [
        { title: "Local SEO", href: "/local-seo", cta: "Explore Local SEO", body: "Improve Google Business Profile signals, local relevance, reviews, business information and reporting when the main problem is organic local discovery." },
        { title: "Search Engine Optimisation", href: "/seo-services", cta: "Explore Search Engine Optimisation", body: "Fix wider technical, content and authority issues when the visibility problem extends beyond maps and local profile signals." },
        { title: "WordPress Development", href: "/wordpress-development", cta: "Explore WordPress Development", body: "Improve service and location pages, site structure, performance and enquiry routes when the website itself is limiting local growth." },
        { title: "Google Ads Management", href: "/google-adwords-ppc", cta: "Explore Google Ads Management", body: "Capture high-intent local searches with paid campaigns while longer-term organic and map visibility is being improved." },
      ],
    },
    fit: {
      title: "Is a Local Visibility Strategy Right for Your Business?",
      intro: "The approach works best when the business serves real locations, can keep its information accurate, and has a genuine customer journey from local search to contact. We check those basics before recommending any service.",
      good: ["You serve defined UK locations or service areas", "Business information can be kept accurate", "Customers genuinely search locally for the service", "Your team can ask for and respond to customer reviews appropriately"],
      notYet: ["The service area is intentionally vague or nationwide", "The business cannot verify its profile details", "You expect instant first-place map rankings", "There is no website or contact route to support local demand"],
    },
    proof: {
      title: "Local Search Results and Case Studies",
      // The brief's text here is an editorial instruction (show what changed and the verified
      // outcome, no undated ranking claims); this is its customer-facing version.
      body: "Real projects, showing what changed in the profile, website or search strategy, and the verified outcomes that followed.",
      links: [
        { label: "View local-search case studies", href: "/case-studies" },
        { label: "Read the bakery search project", href: "/case-studies/bakery" },
      ],
    },
    faqTitle: "Local Visibility Questions, Answered",
    faq: [
      { q: "What is local search visibility?", a: "Local search visibility is how easily nearby customers can discover and evaluate your business across Google Search, Google Maps, and the pages they reach from those results. It depends on accurate business information, relevance, trust, website quality, and the customer’s location." },
      { q: "Why is my business not showing on Google Maps?", a: "There is rarely one universal reason. The issue may involve profile eligibility or verification, categories and services, relevance, proximity, reviews, business information, website signals, or stronger competitors. A local visibility review should identify the most likely gaps before changes are made." },
      { q: "Do I need a physical address to improve local visibility?", a: "Not always. Service-area businesses can be eligible for a Google Business Profile without displaying a customer-facing address, but the profile must accurately represent how the business operates and follow Google’s current eligibility and service-area rules." },
      { q: "Do I need a location page for every town I serve?", a: "No. Create a location page only when it can be genuinely useful, accurate, and meaningfully different. Publishing many near-identical town pages can create a poor user experience and weak content." },
      { q: "Can Google Business Profile improvements help local visibility?", a: "Yes, when the profile is eligible and accurately represents the business. Categories, services, hours, service areas, reviews and other profile information should support the same real-world services and locations described on the website." },
      { q: "How long does it take to improve local search visibility?", a: "Timing varies with competition, proximity, the current profile, website quality, review activity, and how quickly agreed improvements can be implemented. We prioritise the clearest gaps and measure progress without promising a fixed ranking date." },
    ],
    final: {
      eyebrow: "Start With the Real Local Visibility Problem",
      title: "Find Out What Is Limiting Your Local Visibility",
      body: "Tell us which services and UK locations matter most. We will review the local search journey, look for the clearest profile, website, relevance or measurement gaps, and explain the most useful next step – whether that is Local SEO, wider SEO, website work or another route.",
      cta: "Request My Local Visibility Check",
      formNeed: "Better local visibility",
      formPrompt: "Which services and UK locations do you want customers to find you for?",
    },
  },
  "outsource-digital-marketing": {
    slug: "outsource-digital-marketing",
    // SEO brief (Oct 2026): provisional focus "outsourced digital marketing". This URL is the
    // commercial page for that intent — don't create a second outsourced-marketing page.
    eyebrow: "Outsourced digital marketing for UK businesses",
    title: "Outsourced Digital Marketing",
    titleAccent: "Support for UK Businesses",
    intro:
      "Get strategy, specialist delivery and clear ownership without building every marketing role in-house. OMH works as an outsourced digital marketing team for UK businesses that need joined-up support across acquisition, content, SEO, websites and reporting.",
    primaryCta: "Discuss Marketing Support",
    secondaryCta: "See How Outsourcing Works",
    theme: "maintenance",
    signal: "Priorities → delivery → reporting → next decision",
    signalMocks: [
      { kind: "tasks", items: [{ label: "Local visibility", status: "Priority 1" }, { label: "Landing pages", status: "Priority 2" }] },
      { kind: "tasks", items: [{ label: "SEO fixes", status: "Live", live: true }, { label: "Paid search", status: "In progress" }, { label: "Landing page", status: "In review" }] },
      { kind: "bars", labels: ["Enquiries", "Calls", "Spend", "Cost / lead"], heights: [70, 55, 40, 30] },
      { kind: "decision", title: "Scale paid search?", options: ["Recommended", "Hold"] },
    ],
    heroPoints: ["One joined-up delivery team", "Flexible specialist support", "Clear ownership and reporting"],
    definition: {
      title: "What Is Outsourced Digital Marketing?",
      body: "Outsourced digital marketing means using an external team to plan, manage and deliver some or all of your digital marketing without hiring every skill in-house. The relationship can supplement an internal marketing manager, fill specialist gaps or provide a wider team across areas such as SEO, paid media, content, social, website work and reporting. The right model depends on what your business already has and where capability or delivery is breaking down.",
      // The areas the definition names, in its order.
      tagsLabel: "Areas it can cover",
      tags: [
        { title: "SEO", body: "Technical fixes, content and local visibility to grow organic enquiries.", icon: "search" },
        { title: "Paid media", body: "Google Ads and paid social managed against the enquiries you want.", icon: "megaphone" },
        { title: "Content", body: "Pages, articles and landing copy written to support the plan.", icon: "pen" },
        { title: "Social", body: "Organic social activity kept consistent with the wider marketing.", icon: "share" },
        { title: "Website work", body: "Landing pages, tracking and site changes delivered alongside campaigns.", icon: "layout" },
        { title: "Reporting", body: "One clear view of what changed, what it produced and what comes next.", icon: "chart" },
      ],
    },
    problem: {
      eyebrow: "The coordination gap",
      title: "When Outsourced Marketing Support Makes Sense",
      intro: "Outsourcing is most useful when the problem is not a lack of ideas but a lack of capacity, specialist skills or joined-up ownership. The warning signs usually appear when several people or suppliers are active but delivery still feels fragmented.",
      symptoms: [
        { title: "Channels Are Working in Isolation", body: "Paid media, SEO, content and website decisions can move in different directions when nobody is responsible for aligning them to the same commercial priority." },
        { title: "The Internal Team Lacks Delivery Capacity", body: "The business may know what needs to happen but lack the specialist time or available people to deliver SEO, campaigns, content, social and website changes consistently." },
        { title: "Reporting Is Fragmented Across Suppliers", body: "Different reports can describe clicks, rankings, traffic and social activity without giving leadership one clear view of what changed, what matters and what should happen next." },
        { title: "Website Delivery Slows the Marketing Plan", body: "Campaign, SEO and content improvements lose momentum when landing pages, tracking or website changes have to wait for separate technical support." },
      ],
    },
    // The brief's comparison paragraph, one sentence per card.
    comparison: {
      eyebrow: "In-house or outsourced",
      title: "Outsourced Digital Marketing vs Building an In-House Team",
      options: [
        { label: "Building in-house", body: "Hiring in-house gives you permanent internal ownership, but building a team with strategy, SEO, paid media, content, social, analytics and website skills takes time and creates fixed overhead." },
        { label: "Outsourcing", body: "Outsourcing gives you flexible access to several specialists and can be faster to scale, but it still needs a clear internal decision-maker, access to business context and agreed responsibilities." },
      ],
      verdict: { label: "Often the best fit", body: "For many businesses, the best model is hybrid: keep commercial knowledge in-house and use an external team to add specialist planning and delivery capacity." },
    },
    outcomes: {
      title: "What a Good Outsourced Marketing Team Should Provide",
      intro: "A useful outsourced marketing relationship should add capability without creating another layer of management. Responsibilities, priorities, approvals and reporting need to be clear from the start.",
      items: [
        { number: "01", title: "One Joined-Up Marketing Plan", body: "Translate commercial goals into a realistic sequence of marketing priorities across acquisition, content, SEO, conversion, websites and measurement." },
        { number: "02", title: "Specialists Without Hiring Every Role", body: "Use the specialists the plan actually needs – such as paid media, SEO, social, development or maintenance – without carrying every role as permanent in-house headcount." },
        { number: "03", title: "Reporting That Leads to the Next Decision", body: "Bring activity and performance into one view that explains what changed, what the evidence suggests and which decision should come next." },
      ],
    },
    media: {
      eyebrow: "Inside the partnership",
      title: "See How the Outsourced Marketing Partnership Works",
      // The brief's text pairs this description with an instruction to use approved
      // project-management and reporting examples; only the description is published.
      body: "The working relationship stays clear: planning and priorities, visible delivery, agreed owners and a joined-up report that connects activity to the next commercial decision.",
      videoTitle: "Monthly strategy and performance review",
      imageTitle: "Shared priority and delivery plan",
      imageSrc: "/images/Solutions/2.jpg",
      imageAlt: "Two marketers planning channels and priorities against a digital marketing map on a whiteboard.",
      screenTitle: "Plain-English reporting view",
      screenSrc: "/images/Services/Images on the pages/Verified PPC result after.png",
      screenAlt: "Illustrative campaign report showing conversions, cost per conversion, conversion value and ROAS against the previous period."
    },
    approach: {
      title: "How Outsourced Digital Marketing Works with OMH",
      intro: "The first step is to understand what your team already owns, where the capability gaps sit and which commercial priorities need support. The programme is then shaped around those gaps rather than a fixed channel bundle.",
      steps: [
        { title: "Review Business Goals and Marketing Capability", body: "Review goals, customers, internal skills, current suppliers, systems, active marketing and how decisions are currently made." },
        { title: "Agree Priorities, Roles and Ownership", body: "Agree the first work programme, who approves decisions, what OMH owns and which responsibilities remain with your internal team or existing suppliers." },
        { title: "Deliver Work in Visible Cycles", body: "Plan and complete agreed campaign, SEO, content, social, website and tracking work with a shared view of priorities, owners and progress." },
        { title: "Review Performance and Reset Priorities", body: "Use performance, business feedback and new priorities to decide what happens next instead of repeating the same channel checklist every month." },
      ],
    },
    services: {
      title: "Digital Marketing Specialists Available Within the Team",
      intro: "The mix depends on the capability gap. OMH can combine the specialist services that have a clear role in the plan while keeping priorities, ownership and reporting joined up.",
      items: [
        { title: "Google Ads Management", href: "/google-adwords-ppc", cta: "Explore Google Ads Management", body: "Use Google Ads to capture active search demand when paid acquisition has a clear commercial role in the programme." },
        { title: "Search Engine Optimisation", href: "/seo-services", cta: "Explore Search Engine Optimisation", body: "Use SEO to improve technical foundations, search visibility and content priorities as part of the wider marketing plan." },
        { title: "Social Media Marketing", href: "/social-media-marketing-services", cta: "Explore Social Media Marketing", body: "Use social media to support visibility, credibility, audience engagement and campaign activity where it contributes to the wider plan." },
        { title: "Website Maintenance", href: "/wordpress-website-maintenance", cta: "Explore Website Maintenance", body: "Use website maintenance to keep landing pages, tracking, updates and technical changes moving without creating another delivery bottleneck." },
      ],
    },
    fit: {
      title: "Is Outsourced Marketing Right for Your Business?",
      intro: "Outsourced marketing works best when your business has clear priorities, a decision-maker who can provide context and a genuine need for several connected skills. It is less effective when the business wants activity without ownership, approvals or commercial direction.",
      good: ["Leadership can set clear commercial priorities", "There is an internal decision-maker and point of contact", "You need several connected skills, not a single isolated task", "You value visible planning and honest recommendations"],
      notYet: ["No one is available to approve work", "The business wants activity without sharing commercial context", "Every channel must be used regardless of evidence", "You need an instant substitute for sales, product or operational strategy"],
    },
    proof: {
      title: "Outsourced Marketing Results and Relevant Case Studies",
      // The brief's text is an editorial rule (prefer multi-discipline proof); this is its
      // customer-facing version, which doesn't claim every case study is multi-service.
      body: "Our case studies cover search, paid media and website work. Where several disciplines worked together, they show how priorities were coordinated and which verified business outcomes followed.",
      links: [
        { label: "Browse all client work", href: "/case-studies" },
        { label: "Learn more about OMH", href: "/about-us" },
      ],
    },
    faqTitle: "Outsourced Digital Marketing Questions, Answered",
    faq: [
      { q: "Can outsourced digital marketing replace an in-house marketing manager?", a: "It can add strategic and specialist capacity, but every successful relationship still needs access to business context and a named client-side decision-maker. Some businesses use OMH alongside an internal marketing lead; others use us as the main delivery team with a director or senior manager retaining commercial ownership." },
      { q: "Do we have to outsource all of our digital marketing?", a: "No. The programme should cover only the capability gaps that matter. Existing staff, freelancers or suppliers can stay involved where responsibilities, communication and access are clear." },
      { q: "What are the benefits of outsourcing digital marketing?", a: "Outsourcing can give you faster access to several specialist skills, more flexible capacity and one joined-up delivery model without hiring every role in-house. The value is strongest when the outsourced team has clear commercial priorities, decision access and defined ownership." },
      { q: "How much does outsourced digital marketing cost?", a: "Cost depends on the number of disciplines involved, the level of strategic input, delivery capacity and how much your internal team already covers. We recommend scoping the capability gap first rather than forcing every business into the same package." },
      { q: "How do you decide what the outsourced marketing team works on each month?", a: "Priorities should follow commercial goals, evidence, deadlines and available capacity. We agree the work programme, make ownership visible, report what changed and reset priorities when new information warrants it." },
      { q: "Can you work alongside our existing marketing, sales or website teams?", a: "Yes. Outsourced marketing often works best as a hybrid model. We define responsibilities and handovers early so internal staff, OMH and any retained suppliers can work towards the same priorities." },
    ],
    final: {
      eyebrow: "Start with the Capability Gap",
      title: "See What Outsourced Marketing Support Could Look Like for Your Business",
      body: "Tell us what your internal team already covers, which suppliers are involved and where delivery or ownership keeps breaking down. We will review the capability gap and recommend a sensible shape for outsourced marketing support.",
      cta: "Discuss an Outsourced Marketing Team",
      formNeed: "Outsourced digital marketing",
      formPrompt: "Which marketing responsibilities do you need help planning or delivering?",
    },
  },
};

export const solutionOrder = [
  "generate-qualified-leads",
  "increase-ecommerce-sales",
  "improve-website-conversion",
  "grow-local-visibility",
  "outsource-digital-marketing",
] as const;
