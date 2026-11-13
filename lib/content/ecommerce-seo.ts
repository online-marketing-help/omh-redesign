import { CASE_STUDIES_LIVE } from "@/lib/flags";
/*
  /ecommerce-seo-services. Copy is verbatim from the client's brief
  "OMH-Ecommerce-SEO-Services-Page" (Oct 2026): focus keyword "ecommerce seo services",
  co-primary "ecommerce seo agency". The brief's keyword counts depend on this wording,
  so edit the brief first, then this file.

  Developer notes carried over from the brief:
  - Package prices are pending; they are confirmed in the written proposal. Put the
    figures in `packages[].price` once the client sets them.
  - The meta description mentions a free ecommerce SEO audit. If that offer stops,
    swap it for "Book a free consultation".
  - Hero stats and the results section come from /case-studies/clothing-business.
*/

export const ecommerceSeo = {
  path: "/ecommerce-seo-services",
  seo: {
    title: "Ecommerce SEO Services UK | Ecommerce SEO Agency | OMH",
    description:
      "Ecommerce SEO services that grow online sales. UK ecommerce SEO agency for Shopify, WooCommerce and Magento stores. Free ecommerce SEO audit. Get a quote.",
    ogTitle: "Ecommerce SEO Services UK That Grow Online Sales",
    ogDescription: "Grow online sales with our UK ecommerce SEO agency. Technical, on-page and content SEO for online stores. Book a free audit.",
  },
  breadcrumb: [
    { name: "Home", href: "/" },
    { name: "SEO Services", href: "/seo-services" },
    { name: "Ecommerce SEO Services", href: "/ecommerce-seo-services" },
  ],

  hero: {
    eyebrow: "Ecommerce SEO agency for UK online stores",
    title: "Ecommerce SEO services UK that grow online sales",
    titleAccent: "grow online sales",
    body: "Our ecommerce SEO services help online stores get found for the searches that lead to orders. As a UK ecommerce SEO agency, we work through your categories, product pages, site speed, structured data and content, then report on organic revenue as well as rankings.",
    primary: { label: "Get My Ecommerce SEO Audit", href: "/contact" },
    secondary: { label: "See Ecommerce SEO Packages", href: "#packages" },
    stats: [ // shown only while CASE_STUDIES_LIVE (EcommerceSeoHero)
      ["Organic traffic", "+73%"],
      ["Purchase conversions", "+35%"],
      ["Client partnership", "3 years"],
    ] as [string, string][],
    statsNote: "Figures reported for the TrendyThreads ecommerce SEO project. They are not a forecast for another store.",
    visualLabel: "Ecommerce SEO services dashboard showing organic revenue and catalogue health",
  },

  why: {
    eyebrow: "Why stores choose us",
    title: "A UK ecommerce SEO agency built around revenue.",
    titleAccent: "built around revenue.",
    body: "Your categories, products and technical setup should all point shoppers to the same sale. As an SEO agency for ecommerce brands, we review the parts of your store that Google crawls and shoppers compare before they buy: category structure, product detail pages, filters, internal links, page speed and reviews.",
    cards: [
      ["Category pages", "Category and collection pages usually carry the most commercial search demand, so we treat them as landing pages with their own keyword targets."],
      ["Product pages", "Unique descriptions, clean titles, product schema and stock signals help each product page earn its place in search and in Google Shopping listings."],
    ] as [string, string][],
  },

  services: {
    eyebrow: "Ecommerce SEO service",
    title: "What our ecommerce SEO services include.",
    titleAccent: "ecommerce SEO services",
    body: "These are the core SEO services for ecommerce websites that we scope at the start. Your ecommerce SEO specialist confirms which ones apply to your store before work begins.",
    items: [
      { title: "Ecommerce SEO Audit", body: "A full ecommerce SEO audit of crawlability, indexing, duplicate content, site architecture, speed and on-page gaps, with fixes ranked by revenue impact." },
      { title: "Technical SEO for Online Stores", body: "Faceted navigation, canonical tags, pagination, XML sitemaps, Core Web Vitals and structured data, handled so search engines spend their crawl on pages that sell." },
      { title: "Product and Category Page Optimisation", body: "Keyword mapping for every category and priority product, rewritten titles and meta, helpful copy, image alt text and internal links between related ranges." },
      { title: "Content and Link Building for Ecommerce", body: "Buying guides, comparison content and digital PR that earn links to the store. This is where our ecommerce SEO marketing services support category rankings over time." },
    ],
  },

  fit: {
    eyebrow: "Who it suits",
    title: "Ecommerce SEO services work best when the catalogue and goals are clear.",
    titleAccent: "catalogue and goals are clear.",
    good: [
      "UK online stores on Shopify, WooCommerce, Magento or a similar platform",
      "Brands that want organic search to carry more of their sales and reduce reliance on paid ads",
      "Teams that can give access to the store, Google Search Console and analytics",
      "Stores with products in stock and a clear view of their best margin ranges",
    ],
    notFit: [
      "Stores looking for a guaranteed first position on Google",
      "Sites that need a full rebuild before SEO can start (we can scope that separately)",
      "Brands that want results in weeks rather than months",
      "Requests for link schemes or tactics that break Google's guidelines",
    ],
  },

  problems: {
    eyebrow: "Common ecommerce SEO problems",
    title: "Fix the ecommerce SEO gaps that stop shoppers finding your products.",
    titleAccent: "finding your products.",
    items: [
      ["Category pages do not rank", "Thin collection pages with only a product grid give Google little reason to rank them for commercial searches."],
      ["Filters create duplicate URLs", "Colour, size and sort parameters can produce thousands of near-identical pages that waste crawl budget."],
      ["Product copy is copied", "Manufacturer descriptions shared with other retailers make it hard for your product pages to stand out."],
      ["The store loads slowly", "Heavy apps, large images and scripts slow mobile pages, which hurts rankings and checkout rates."],
      ["Out-of-stock pages are mishandled", "Deleting or redirecting discontinued products without a plan loses rankings and links the store has built."],
      ["Reporting stops at traffic", "Without tracking organic revenue and conversions, it is hard to tell which SEO work pays for itself."],
    ] as [string, string][],
  },

  benefits: {
    eyebrow: "Ecommerce SEO benefits",
    title: "How ecommerce SEO services turn more searches into sales.",
    titleAccent: "more searches into sales.",
    body: "Here is what each outcome means for an online store in practice.",
    items: [
      ["More qualified organic visits", "Visitors arrive on the category or product page that matches what they searched for, instead of the homepage."],
      ["Lower reliance on paid ads", "As organic rankings grow, fewer sales depend on rising cost-per-click in Google Shopping and social ads."],
      ["Better product visibility", "Valid product schema can make prices, stock and review stars eligible to show in search results."],
      ["A faster, easier store", "Speed and navigation fixes help shoppers reach checkout with fewer steps and less waiting."],
      ["Stronger brand authority", "Useful buying guides and earned links build trust with shoppers and with search engines."],
      ["Reporting tied to revenue", "Monthly reports show organic revenue, conversions and keyword movement for the ranges you care about."],
    ] as [string, string][],
  },

  consultant: {
    eyebrow: "Your ecommerce SEO consultant",
    title: "Work with an ecommerce SEO consultant, not a call centre.",
    titleAccent: "not a call centre.",
    body: "Every account has a named ecommerce SEO expert who knows your catalogue, your platform and your margins. You speak to the person doing the work, and your ecommerce SEO specialist explains each recommendation in plain English with the expected effect on sales.",
    brands: "Our team has worked with well-known UK brands such as AllSaints and Jamie Oliver, and on online stores built on Shopify and WooCommerce.",
  },

  platforms: {
    eyebrow: "Ecommerce platforms",
    title: "SEO for Shopify, WooCommerce and Magento stores.",
    titleAccent: "Shopify, WooCommerce and Magento",
    body: "Each platform handles URLs, collections and plugins differently, so our SEO services for ecommerce start with how your platform works.",
    items: [
      ["S", "Shopify SEO", "Collection structure, duplicate /products/ paths, app bloat, theme speed and Shopify's fixed URL rules."],
      ["W", "WooCommerce SEO", "Category and tag archives, plugin conflicts, hosting speed and schema output, drawing on our [WordPress development](/wordpress-development) experience."],
      ["M", "Magento SEO", "SEO for Magento ecommerce stores: layered navigation, large catalogues, canonical setup and multi-store configuration."],
    ] as [string, string, string][],
  },

  process: {
    eyebrow: "How it works",
    title: "From ecommerce SEO audit to monthly growth.",
    titleAccent: "monthly growth.",
    body: "We agree the goals, access and tracking first, then work through the store in priority order. Each step is documented so you can see what has been done and what comes next.",
    cta: "Request an ecommerce SEO audit",
    steps: [
      ["Understand the store", "Confirm best-selling ranges, margins, competitors, platform and the revenue goals that matter commercially."],
      ["Audit and keyword map", "Run the ecommerce SEO audit and map target keywords to every category, subcategory and priority product."],
      ["Fix the technical foundations", "Resolve indexing, duplicate URL, speed and schema issues so the store is easy to crawl."],
      ["Optimise pages and build content", "Rewrite category and product pages, publish buying guides and earn relevant links."],
      ["Measure and refine", "Report on organic revenue, conversions and rankings, explain what changed and choose the next priorities."],
    ] as [string, string][],
  },

  packages: {
    eyebrow: "Packages",
    title: "Ecommerce SEO packages built around your catalogue.",
    titleAccent: "built around your catalogue.",
    body: "Store size drives the work, so ecommerce SEO packages are scoped by the number of categories and products in play. Your ecommerce SEO consultant confirms price, VAT, deliverables and terms in a written proposal before anything starts.",
    // ponytail: `price` is empty until the client sets figures; the card then shows the proposal line.
    pendingPrice: "Priced in your proposal",
    items: [
      { stage: "Growing store", name: "Ecommerce SEO Starter", price: "", bestFor: "For smaller catalogues that need the foundations fixed and core categories ranking.", includes: ["Ecommerce SEO audit", "Up to 10 category pages optimised", "Technical fixes list and support", "Monthly report and call"], cta: "Discuss Starter" },
      { stage: "Established store", name: "Ecommerce SEO Growth", price: "", bestFor: "For stores ready to expand keyword coverage across more ranges and products.", includes: ["Everything in Starter", "Up to 25 category pages and priority products", "Two buying guides per month", "Product schema and Core Web Vitals work"], cta: "Discuss Growth" },
      { stage: "Large catalogue", name: "Ecommerce SEO Scale", price: "", bestFor: "For large or multi-store catalogues that need ongoing technical and content work.", includes: ["Everything in Growth", "Faceted navigation and crawl budget plan", "Digital PR and link building", "Dedicated ecommerce SEO specialist"], cta: "Discuss Scale" },
    ],
    note: "Package names are not a recommendation. Prices and inclusions are confirmed in your written proposal.",
  },

  whyOmh: {
    eyebrow: "Why OMH",
    title: "Why brands choose OMH as their ecommerce SEO company.",
    titleAccent: "ecommerce SEO company.",
    body: "There are plenty of ecommerce SEO companies to choose from. When stores ask us what makes the best ecommerce SEO company, our answer is simple: clear ownership, honest reporting and work you can check.",
    reasons: [
      ["A named point of contact", "One ecommerce SEO expert who knows your store and answers your questions directly."],
      ["SEO and paid search together", "We also run [Google Shopping and PPC](/google-adwords-ppc), so organic and paid keywords support each other."],
      ["Reporting on revenue", "Organic revenue and conversions sit alongside rankings in every monthly report."],
      ["Scope agreed first", "You know what is included, who does it and how success will be measured before work starts."],
    ] as [string, string][],
  },

  results: {
    eyebrow: "Results",
    title: "See our ecommerce SEO services in action.",
    titleAccent: "in action.",
    caseSlug: "clothing-business",
    label: "SEO · Fashion ecommerce",
    heading: "Organic search for an online clothing retailer",
    body: "TrendyThreads needed better visibility for commercial clothing searches in a crowded fashion market. Over three years we combined technical SEO, Shopify development, editorial content and authority building.",
    cta: "Read the TrendyThreads case study",
    note: "Figures as reported for this project. They are not a forecast for another business.",
  },

  promise: {
    eyebrow: "What we can promise",
    title: "Clear ecommerce SEO work and reporting, not a guaranteed Google position.",
    titleAccent: "not a guaranteed Google position.",
    body: "No honest ecommerce SEO firm can guarantee rankings, so we do not offer a money-back claim. Here is what you can hold us to.",
    items: [
      "The agreed ecommerce SEO audit and package tasks",
      "A named ecommerce SEO consultant and scheduled communication",
      "Reporting against agreed revenue and visibility measures",
      "Clear notice when scope, platform limits or access block the work",
    ],
  },

  related: {
    title: "Useful services connected to ecommerce SEO.",
    links: [
      { title: "Search Engine Optimisation", href: "/seo-services", body: "Professional SEO services for service businesses and brands across the UK." },
      { title: "Google Ads and Shopping", href: "/google-adwords-ppc", body: "Google Shopping and PPC campaigns that cover keywords while organic rankings grow." },
      { title: "Amazon PPC", href: "/amazon-ppc-advertising-agency-uk", body: "Sponsored Products and Brands campaigns for sellers who also trade on Amazon." },
      { title: "WordPress Development", href: "/wordpress-development", body: "WooCommerce builds and fixes that give your store a fast, crawlable base." },
    ],
  },

  faq: {
    eyebrow: "Ecommerce SEO FAQ",
    title: "Ecommerce SEO services FAQs.",
    titleAccent: "FAQs.",
    description: "Confirm platform access, catalogue size, priority ranges, reporting measures and agreement terms before signing.",
    items: [
      { q: "How much do ecommerce SEO services cost in the UK?", a: "Cost depends on the size of your catalogue, the platform and how competitive your products are. We scope ecommerce SEO packages after a short review of your store and confirm price, VAT and deliverables in a written proposal." },
      { q: "What is included in an ecommerce SEO audit?", a: "Our ecommerce SEO audit covers indexing, crawl errors, duplicate and faceted URLs, site speed, structured data, category and product page content, internal linking and backlinks. You get a prioritised list of fixes with the expected effect on sales." },
      { q: "How long does ecommerce SEO take to show results?", a: "Technical fixes can show movement within a few weeks. Category rankings and organic revenue usually build over three to six months, and longer in very competitive markets." },
      { q: "Do you work with Shopify, WooCommerce and Magento stores?", a: "Yes. We provide ecommerce SEO services for Shopify, WooCommerce and Magento, and we can review other platforms once we see how they handle URLs, collections and schema." },
      { q: "Why hire an ecommerce SEO agency instead of a freelancer?", a: "An ecommerce SEO agency gives you technical SEO, content, development and paid search support in one team, with cover when someone is away. Whether you call it an SEO ecommerce agency or an SEO agency for ecommerce, the test is the same: ask who does the work and how results are reported." },
      { q: "What makes you the best ecommerce SEO company for my store?", a: CASE_STUDIES_LIVE ? "We would rather show you than claim it. Look at our [ecommerce case studies](/case-studies), speak to your proposed ecommerce SEO consultant and check that the scope ties back to revenue." : "We would rather show you than claim it. Speak to your proposed ecommerce SEO consultant and check that the scope ties back to revenue." },
      { q: "Do you only work with stores in London?", a: "No. We are an ecommerce SEO agency UK brands use from London to Edinburgh. Stores searching for an ecommerce SEO agency London teams can meet often work with us remotely, and we serve the whole UK from our Essex base." },
      { q: "Can you guarantee first page rankings?", a: "No. Nobody controls Google's rankings. We commit to the agreed work, clear communication and reporting against agreed measures." },
    ],
  },

  final: {
    eyebrow: "Ecommerce SEO services UK",
    title: "Check where your store's ecommerce SEO needs work.",
    titleAccent: "ecommerce SEO needs work.",
    body: "Share your store URL, platform and best-selling ranges, and tell us which sales you want organic search to grow. An ecommerce SEO specialist will review your position and recommend the right package.",
    primary: "Get My Ecommerce SEO Audit",
    secondary: "Discuss Ecommerce SEO Services",
    steps: [
      "Review the current position",
      "Define the commercial objective",
      "Agree the work and measurement",
    ],
  },
};
