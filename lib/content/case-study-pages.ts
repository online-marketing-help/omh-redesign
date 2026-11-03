// The eleven case-study pages (client briefs "01 Komfort Partitioning - Case Study.docx" … "11 Southend Care", and
// the layout in "OMH-Case-Study-sub - Pages.pdf", 2 Nov 2026). Copy is verbatim from the briefs; URLs are the briefs'.
// Rendered by components/case-studies/CaseStudyPage.tsx. The older studies in case-studies.ts use the same layout
// through fromLegacy() at the bottom, which reuses their own copy and their old article's headings.

import { caseStudies, caseStudyMedia, caseStudyServices, type CaseStudy, type CaseStudyServiceId } from "@/lib/content/case-studies";

type Stat = { value: string; label: string };

/** The chart card beside "The outcome". Line shapes are traced from the brief's own charts (no axis values in the
    brief), so they show the trend only; every number printed comes from the brief's "Data shown in the chart" table. */
export type OutcomePanel =
  | { kind: "trend"; title: string; note: string; tiles: Stat[]; line: number[]; xLabels: string[] }
  | { kind: "yoy"; title: string; note: string; series: [{ label: string; line: number[] }, { label: string; line: number[] }]; xLabels: string[]; caption: string }
  | { kind: "scores"; title: string; note: string; scores: Stat[]; callout: [string, string, string] }
  | { kind: "rows"; title: string; note: string; rows: [string, string][] }
  | { kind: "bars"; title: string; note: string; groups: { label: string; change: string; before: [string, string, number]; after: [string, string, number] }[] };

export type CaseStudyPageData = {
  slug: string;
  client: string;
  metaTitle: string;
  metaDescription: string;
  tags: string[];
  h1: string;
  lede: string;
  glance: [string, string][];
  /** "Results" when the figures are measured, "Project highlights" when they describe the work. */
  stats?: { heading: "Results" | "Project highlights"; items: Stat[]; source?: string };
  /** Size of the hero screenshot in public/images/clients/<slug>.webp when it isn't 1440x900 (the client's own
      captures, 3 Nov 2026, cropped to drop cookie bars and badges). */
  shot?: [number, number];
  /** A photo or logo instead of the client's site (older studies with no real site to capture). */
  cover?: { src: string; alt: string; logo?: boolean };
  challenge: { title: string; body: string[]; list?: { title: string; items: string[] } };
  /** Card title, then a sentence or a list of what was done. */
  approach: [string, string | string[]][];
  outcome?: { eyebrow: string; title: string; points: string[]; panel?: OutcomePanel };
  testimonial?: { lead: string; rest?: string; name: string; company?: string; source?: string };
  services: string[];
  more: { slug: string; title: string; tag: string }[];
};

export const serviceLinks: Record<string, string> = {
  "Website Design": "/website-designs",
  "WordPress Development": "/wordpress-development",
  "WordPress Maintenance": "/wordpress-website-maintenance",
  "Google Ads Management": "/google-adwords-ppc",
  "SEO Services": "/seo-services",
  "Local SEO": "/local-seo",
  "Shopify Development": "/shopify-development",
  "Social Media Marketing": "/social-media-marketing-services",
  "Paid Social Advertising": "/social-media-paid-advertising",
  // ponytail: no Technical SEO or AI search page exists yet; point these at the nearest live page until one does.
  "Technical SEO": "/seo-services",
  "AI Search and ChatGPT Ads": "/ai-services",
  "AI Search Optimisation": "/ai-services",
};

const more = {
  komfort: { slug: "komfort-partitioning", title: "Komfort Partitioning: a website built for architects and specifiers", tag: "Website design · Manufacturing" },
  camp: { slug: "camp-kerala", title: "Camp Kerala: under-canvas accommodation for Ryder Cup and Glastonbury", tag: "Website, SEO and PPC · Events" },
  barbados: { slug: "barbados-maritime-ship-registry", title: "Barbados Maritime Ship Registry: a clearer site for an international registry", tag: "Website design · Maritime" },
  ascent: { slug: "ascent-energy", title: "Ascent Energy: a faster website for a national EV and solar installer", tag: "Website design · Energy" },
  oqs: { slug: "old-queen-street-cafe", title: "Old Queen Street Café: a Christmas enquiry page and menu rebuild", tag: "Website design · Events venue" },
  thames: { slug: "thames-luxury-charters", title: "Thames Luxury Charters: search marketing tied to real bookings", tag: "SEO and Google Ads · Luxury events" },
  hp4p: { slug: "heatpumps4pools", title: "HeatPumps4Pools: Shopping campaigns and SEO for a pool heat pump store", tag: "SEO and Google Ads · Ecommerce" },
  smg: { slug: "smg-surfaces", title: "SMG Surfaces: Google Ads for a stone worktop supplier", tag: "Google Ads · Kitchen worktops" },
  wooden: { slug: "the-wooden-pool-store", title: "The Wooden Pool Store: Google Ads for premium garden pools", tag: "Google Ads · Home and garden" },
  deeks: { slug: "deeks-vat-consultancy", title: "Deeks VAT Consultancy: SEO for a specialist VAT firm", tag: "SEO · VAT advice" },
  southend: { slug: "southend-care", title: "Southend Care: local SEO for an adult social care provider", tag: "SEO · Adult social care" },
};

export const caseStudyPages: CaseStudyPageData[] = [
  {
    slug: "komfort-partitioning",
    client: "Komfort Partitioning",
    metaTitle: "Komfort Partitioning Website Design Case Study | OMH",
    metaDescription:
      "How we designed and built a website for Komfort Partitioning that makes 8 product categories easy for architects and specifiers to explore.",
    tags: ["Website design", "Manufacturing"],
    h1: "Komfort Partitioning: a website built for architects, specifiers and contractors",
    lede: "Komfort is a UK specialist in internal glazing, metal and fire-rated partitioning, with more than 50 years in the industry. We designed and built a website that makes a large product range easy to explore.",
    glance: [
      ["Client", "Komfort Partitioning"],
      ["Sector", "Building products manufacturing"],
      ["Location", "Darlaston, West Midlands"],
      ["Services", "Website design, Google Ads"],
    ],
    stats: {
      heading: "Project highlights",
      items: [
        { value: "50+", label: "years of Komfort expertise, now presented online" },
        { value: "8", label: "product categories in one clear structure" },
        { value: "4", label: "main journeys: products, projects, downloads, knowledge" },
      ],
    },
    challenge: {
      title: "A big product range, a technical audience",
      body: [
        "Komfort sells glazed, fire-rated, acoustic, relocatable and traditional partitioning, plus glazed and timber doors. Architects and specifiers need to compare systems, check fire and acoustic performance and download technical documents before they ever pick up the phone.",
        "The website had to present all of that clearly, show off finished projects and make it easy for a specifier to move from browsing to an enquiry.",
      ],
    },
    approach: [
      ["Structure planned before design", "We grouped every product into eight categories so visitors can find the right system in a few clicks."],
      ["Product range pages", "Ranges such as Polar, Kross Glaze, Defence, Soteria, Sonik, Polar Kreate and Komfire each have a clear place on the site."],
      ["Technical downloads and knowledge hub", "Specifiers can find the documents and guidance they need without having to ask."],
      ["Ready for paid search", "The site supports Komfort's UK-wide Google Ads, with enquiries tracked from day one."],
    ],
    outcome: {
      eyebrow: "The outcome",
      title: "A site that works as hard as the sales team",
      points: [
        "Every product category reachable from the main menu",
        "Projects, downloads and knowledge hub all one click away",
        "A clear route from product page to enquiry",
      ],
    },
    services: ["Website Design", "WordPress Development", "Google Ads Management", "WordPress Maintenance"],
    more: [more.ascent, more.barbados, more.oqs],
  },
  {
    slug: "camp-kerala",
    client: "Camp Kerala",
    metaTitle: "Camp Kerala Case Study: Website, SEO and Google Ads | OMH",
    metaDescription:
      "Website, SEO and Google Ads for Camp Kerala, luxury under-canvas accommodation for Ryder Cup and Glastonbury guests. 10.7K organic clicks in 5 months.",
    tags: ["Website design", "SEO", "Google Ads"],
    h1: "Camp Kerala: luxury under-canvas accommodation for Ryder Cup and Glastonbury guests",
    lede: "Camp Kerala creates five-star under-canvas enclaves at the Ryder Cup, Glastonbury Festival and private events. We built their website, then took on SEO, content and paid search.",
    glance: [
      ["Client", "Camp Kerala"],
      ["Sector", "Luxury events and accommodation"],
      ["Events", "Ryder Cup, Glastonbury, private events"],
      ["Services", "Website, SEO, Google Ads, maintenance"],
    ],
    stats: {
      heading: "Results",
      items: [
        { value: "10.7K", label: "organic clicks" },
        { value: "169K", label: "search impressions" },
        { value: "6.3%", label: "average click-through rate" },
        { value: "8.3", label: "average position" },
      ],
      source: "Source: Google Search Console, May to October 2026.",
    },
    shot: [1440, 662],
    challenge: {
      title: "Demand that peaks around the biggest events",
      body: [
        "Camp Kerala's guests book around specific events, so interest rises sharply as the Ryder Cup and Glastonbury approach. The brand also needed a site that matched the feel of its Shikar Tents and the level of service guests expect.",
        "The site had to look the part, rank for event-led searches and turn that interest into enquiries.",
      ],
    },
    approach: [
      ["Website design and build", "A WordPress site built around the brand typeface, the Shikar Tents and clear routes into experiences and events."],
      ["Event-led SEO and content", "Pages and blog content built around the Ryder Cup and Glastonbury, timed to when people start searching."],
      ["Google Ads set-up", "Paid search campaigns ready to support peak booking periods."],
      ["Ongoing maintenance", "We look after the site, so the team can focus on their guests."],
    ],
    outcome: {
      eyebrow: "The outcome",
      title: "Search visibility that grew into the events",
      points: [
        "10.7K clicks from Google in five months",
        "169K impressions in search results",
        "An average position of 8.3, on page one for many searches",
      ],
      panel: {
        kind: "trend",
        title: "Search Console performance",
        note: "May to October 2026",
        tiles: [
          { label: "Total clicks", value: "10.7K" },
          { label: "Total impressions", value: "169K" },
          { label: "Average CTR", value: "6.3%" },
          { label: "Average position", value: "8.3" },
        ],
        line: [4, 4.4, 4.8, 5, 5, 5, 5.4, 5.8, 6.4, 6.2, 8, 12, 7.4, 8, 12.4, 7.6, 52],
        xLabels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct"],
      },
    },
    services: ["Website Design", "SEO Services", "Google Ads Management", "WordPress Maintenance"],
    more: [more.thames, more.oqs, more.deeks],
  },
  {
    slug: "barbados-maritime-ship-registry",
    client: "Barbados Maritime Ship Registry",
    metaTitle: "Barbados Maritime Ship Registry Website Case Study | OMH",
    metaDescription:
      "A WordPress website and registrar directory covering 28+ countries for the Barbados Maritime Ship Registry, with ongoing support.",
    tags: ["Website design", "Maritime"],
    h1: "Barbados Maritime Ship Registry: a clearer site for an international ship registry",
    lede: "The Barbados Maritime Ship Registry serves shipowners and agents around the world. We built and look after a WordPress website that makes the registry and its international offices easy to find.",
    glance: [
      ["Client", "Barbados Maritime Ship Registry"],
      ["Sector", "Maritime, ship registration"],
      ["Audience", "Shipowners and agents worldwide"],
      ["Services", "Website design, maintenance"],
    ],
    stats: {
      heading: "Project highlights",
      items: [
        { value: "28+", label: "countries in the registrar directory" },
        { value: "A to Z", label: "directory ordered exactly by country" },
        { value: "Ongoing", label: "support and maintenance" },
      ],
    },
    shot: [1440, 662],
    challenge: {
      title: "A global audience looking for the right office",
      body: [
        "Shipowners and agents need to find the registrar office for their country quickly, and the details have to be accurate.",
        "The registry needed a website that presents this information clearly, is easy to keep up to date and stays reliable.",
      ],
    },
    approach: [
      ["WordPress website", "A clean, professional site the registry team can rely on."],
      ["Registrar directory", "Contact details for offices across 28+ countries, kept in exact alphabetical order."],
      ["Accurate, regular updates", "We add and correct directory entries as offices change."],
      ["Support and maintenance", "Updates, fixes and support under an ongoing agreement."],
    ],
    outcome: {
      eyebrow: "The outcome",
      title: "Up-to-date information, wherever the visitor is",
      points: [
        "Registrar offices across 28+ countries in one directory",
        "Directory kept accurate as offices change",
        "A site the registry can depend on",
      ],
    },
    services: ["Website Design", "WordPress Development", "WordPress Maintenance", "SEO Services"],
    more: [more.komfort, more.ascent, more.oqs],
  },
  {
    slug: "ascent-energy",
    client: "Ascent Energy",
    metaTitle: "Ascent Energy Website and SEO Case Study | OMH",
    metaDescription:
      "How we planned speed, accessibility and SEO content improvements for Ascent Energy, a national EV charging and solar installer.",
    tags: ["Website design", "Performance", "SEO"],
    h1: "Ascent Energy: a faster website for a national EV and solar installer",
    lede: "Ascent Energy installs EV chargers, solar panels and battery storage for homes and businesses across the UK. We took on their website's speed, accessibility and content, with a clear plan for each.",
    glance: [
      ["Client", "Ascent Energy Services"],
      ["Sector", "EV charging, solar and battery storage"],
      ["Location", "Preston, covering the whole UK"],
      ["Services", "Website, performance, SEO content"],
    ],
    stats: {
      heading: "Project highlights",
      items: [
        { value: "4", label: "Lighthouse areas audited and planned" },
        { value: "2", label: "phases of speed and accessibility fixes" },
        { value: "10", label: "topic SEO content plan" },
      ],
    },
    shot: [1440, 662],
    challenge: {
      title: "A slow first impression",
      body: [
        "In August 2026 the homepage scored 50 for desktop performance, and the main image took 5.0 seconds to appear because the slider was not set to load first.",
        "People comparing installers don't wait. The site also had little content answering the questions buyers search for, such as how much an EV charger costs to install.",
      ],
    },
    approach: [
      ["Speed fixes in two phases", "Preload the hero image, cut render-blocking files, limit reCAPTCHA to the forms that need it and regenerate oversized images."],
      ["Accessibility polish", "Contrast, labels and structure improved so the site works for more visitors."],
      ["10-topic content plan", "EV charging, solar, battery storage and LED lighting, starting with EV charger installation costs."],
      ["Google Business Profile", "Regular posts to support visibility around the Preston base."],
    ],
    outcome: {
      eyebrow: "Where we started",
      title: "A clear baseline and a plan for every issue",
      points: [
        "Every PageSpeed issue mapped to a fix",
        "Content planned around real buyer questions",
        "Local profile kept active every month",
      ],
      panel: {
        kind: "scores",
        title: "Starting point: PageSpeed Insights (desktop)",
        note: "August 2026",
        scores: [
          { label: "Performance", value: "50" },
          { label: "Accessibility", value: "83" },
          { label: "Best practices", value: "96" },
          { label: "SEO", value: "92" },
        ],
        callout: ["Largest Contentful Paint: ", "5.0s", ". The homepage slider image was not set to load first."],
      },
    },
    services: ["Website Design", "WordPress Development", "SEO Services", "Local SEO"],
    more: [more.komfort, more.hp4p, more.southend],
  },
  {
    slug: "old-queen-street-cafe",
    client: "Old Queen Street Café",
    metaTitle: "Old Queen Street Café Website Case Study | OMH",
    metaDescription:
      "A Christmas enquiry page, 5 rebuilt menus and a restored weddings page for Old Queen Street Café, a Georgian townhouse venue in Westminster.",
    tags: ["Website design", "Events venue"],
    h1: "Old Queen Street Café: a Christmas enquiry page and menu rebuild",
    lede: "Old Queen Street Café is a Georgian townhouse venue in Westminster for dining, private events and weddings. We built a Christmas enquiry page and rebuilt the menus and weddings page.",
    glance: [
      ["Client", "Old Queen Street Café"],
      ["Sector", "Café, private dining, events, weddings"],
      ["Location", "Westminster, London"],
      ["Services", "Website design, page builds"],
    ],
    stats: {
      heading: "Project highlights",
      items: [
        { value: "1", label: "Christmas enquiry page, linked from the brochure" },
        { value: "5", label: "menus rebuilt as web pages" },
        { value: "11", label: "broken images replaced on the weddings page" },
      ],
    },
    challenge: {
      title: "Seasonal demand, and a site that wasn't ready",
      body: [
        "Christmas parties and weddings bring in a large share of the venue's events. There was no Christmas page for the printed brochure to point to, and the menus didn't match the print versions.",
        "On the weddings page, most of the images had broken, leaving blank panels where the photography should be.",
      ],
    },
    approach: [
      ["Christmas enquiry page", "Built around the two set menus and linked straight to the enquiry form, so the brochure takes guests right to it."],
      ["Menus as real web pages", "Breakfast, all-day, dessert, wine and drinks menus rebuilt from the print files, readable on any phone."],
      ["Weddings page restored", "Fresh images taken from the wedding brochure and fallback colours fixed."],
      ["Header and redirects", "A Christmas button added to the header and mobile bar, and an old redirect removed that hid the page."],
    ],
    outcome: {
      eyebrow: "The outcome",
      title: "Ready for the busiest season of the year",
      points: [
        "Brochure readers land straight on the enquiry form",
        "Menus readable on mobile and visible to Google",
        "A weddings page with no broken images",
      ],
      panel: {
        kind: "rows",
        title: "What changed on the site",
        note: "oldqueenstreet.com",
        rows: [
          ["Christmas enquiry page, linked from the printed brochure", "New"],
          ["Breakfast, all-day, dessert, wine and drinks menus", "5 pages"],
          ["Broken images replaced on the weddings page", "11 fixed"],
          ["Christmas button in header and mobile bar", "New"],
          ["Old redirect that hid the Christmas page", "Removed"],
        ],
      },
    },
    services: ["Website Design", "WordPress Development", "WordPress Maintenance", "Google Ads Management"],
    more: [more.camp, more.thames, more.komfort],
  },
  {
    slug: "thames-luxury-charters",
    client: "Thames Luxury Charters",
    metaTitle: "Thames Luxury Charters SEO and Google Ads Case Study | OMH",
    metaDescription:
      "SEO, Google Ads and ChatGPT Ads for Thames Luxury Charters, with tracking tied to bookings. Organic traffic up 59.5% in six months.",
    tags: ["SEO", "Google Ads", "ChatGPT Ads"],
    h1: "Thames Luxury Charters: search marketing tied to real bookings",
    lede: "Thames Luxury Charters runs a fleet of luxury boats for parties, corporate events and weddings on the Thames. We took over their search marketing in November 2025.",
    glance: [
      ["Client", "Thames Luxury Charters"],
      ["Sector", "Private charters and events"],
      ["Location", "London"],
      ["Started", "November 2025"],
      ["Services", "SEO, Google Ads, ChatGPT Ads, tracking"],
    ],
    stats: {
      heading: "Results",
      items: [
        { value: "+59.5%", label: "organic traffic" },
        { value: "+48.1%", label: "referring domains" },
        { value: "+13.9%", label: "backlinks" },
      ],
      source: "Source: Semrush, June to November 2026 compared with December 2025 to May 2026.",
    },
    challenge: {
      title: "Numbers that didn't match the business",
      body: [
        "When we took the account over in November 2025, the historic Google Ads figures counted actions that never became bookings, so nobody could see which campaigns made money.",
        "At the same time, enquiries for the most profitable boat in the fleet had started to slip as organic traffic to its page fell.",
      ],
    },
    approach: [
      ["Tracking from enquiry to booking", "Built with the TLC team so campaigns are judged on booked revenue, not form fills."],
      ["SEO and link building", "Content and authority work that grew organic traffic and referring domains."],
      ["ChatGPT Ads", "Launched alongside Google Ads, with its own tracked landing page."],
      ["Landing page audit and custom tools", "A paid landing page audit and a custom Elementor plugin, including an animated route map."],
    ],
    outcome: {
      eyebrow: "The outcome",
      title: "More visitors from search, measured against bookings",
      points: [
        "Organic traffic up from 4K to 6.4K across six months",
        "Referring domains up from 366 to 542",
        "Campaigns now reported against booked revenue",
      ],
      panel: {
        kind: "bars",
        title: "Six months compared",
        note: "Semrush, November 2026",
        groups: [
          { label: "Organic traffic", change: "+59.5%", before: ["Dec 25 to May 26", "4K", 4000], after: ["Jun to Nov 26", "6.4K", 6400] },
          { label: "Referring domains", change: "+48.1%", before: ["Dec 25 to May 26", "366", 366], after: ["Jun to Nov 26", "542", 542] },
          { label: "Backlinks", change: "+13.9%", before: ["Dec 25 to May 26", "1.6K", 1600], after: ["Jun to Nov 26", "1.8K", 1800] },
        ],
      },
    },
    services: ["SEO Services", "Google Ads Management", "AI Search and ChatGPT Ads", "WordPress Development"],
    more: [more.camp, more.hp4p, more.smg],
  },
  {
    slug: "heatpumps4pools",
    client: "HeatPumps4Pools",
    metaTitle: "HeatPumps4Pools Google Ads and SEO Case Study | OMH",
    metaDescription:
      "Shopping and Performance Max campaigns, SEO and site performance support for HeatPumps4Pools, a UK pool heat pump store.",
    tags: ["SEO", "Google Ads", "Ecommerce"],
    h1: "HeatPumps4Pools: Shopping campaigns and SEO for a pool heat pump store",
    lede: "HeatPumps4Pools sells swimming pool heat pumps online across the UK. We run their Google Ads, including Shopping and Performance Max, and support their SEO and site performance.",
    glance: [
      ["Client", "HeatPumps4Pools"],
      ["Sector", "Ecommerce, pool equipment"],
      ["Coverage", "UK-wide online store"],
      ["Services", "Google Ads, SEO, site performance"],
    ],
    stats: {
      heading: "Project highlights",
      items: [
        { value: "Shopping", label: "and Performance Max campaigns" },
        { value: "Accurate", label: "real product imagery only in ads" },
        { value: "Monthly", label: "Google Business Profile updates" },
      ],
    },
    shot: [1440, 662],
    challenge: {
      title: "Seasonal sales, technical products",
      body: [
        "Pool heat pump sales follow the season, and buyers compare models and prices carefully before they order.",
        "The store needed ads that show the right products at the right time, product imagery buyers can trust and a fast, healthy site behind them.",
      ],
    },
    approach: [
      ["Shopping and Performance Max", "Campaigns built around the product feed, so the right heat pumps appear for the right searches."],
      ["Accurate ad creative", "We switched off automated AI image changes, so ads only show real product photos."],
      ["SEO and site health", "Technical SEO fixes and caching set-up to keep the store fast and crawlable."],
      ["Google Business Profile", "Regular product-focused posts planned with the client."],
    ],
    outcome: {
      eyebrow: "The outcome",
      title: "Ads and a store buyers can trust",
      points: [
        "Product ads that only show real product imagery",
        "Ongoing technical care for a busy WooCommerce store",
        "A steady stream of fresh Google Business Profile posts",
      ],
    },
    services: ["Google Ads Management", "SEO Services", "WordPress Maintenance", "Local SEO"],
    more: [more.wooden, more.thames, more.smg],
  },
  {
    slug: "smg-surfaces",
    client: "SMG Surfaces",
    metaTitle: "SMG Surfaces Google Ads Case Study | OMH",
    metaDescription:
      "Google Ads for SMG Surfaces, a stone worktop supplier and installer in Grays, Essex, reaching buyers across Essex, London, Kent and Herts.",
    tags: ["Google Ads", "Kitchen worktops"],
    h1: "SMG Surfaces: Google Ads for a stone worktop supplier and installer",
    lede: "SMG Surfaces supplies and fits natural and sintered stone kitchen worktops from their base in Grays, Essex. We run Google Ads that put them in front of homeowners looking for new worktops.",
    glance: [
      ["Client", "SMG Surfaces"],
      ["Sector", "Kitchen worktops and stonework"],
      ["Location", "Grays, Essex"],
      ["Areas", "Essex, London, Kent, Herts"],
      ["Services", "Google Ads"],
    ],
    stats: {
      heading: "Project highlights",
      items: [
        { value: "4", label: "areas covered: Essex, London, Kent, Herts" },
        { value: "Search", label: "campaigns for worktop buyers" },
        { value: "Quotes", label: "the main conversion goal" },
      ],
    },
    challenge: {
      title: "Reaching buyers at the right moment",
      body: [
        "People buying stone worktops usually search, compare a few suppliers and ask for quotes. SMG needed to appear in those searches across their service area.",
      ],
    },
    approach: [
      ["Search campaigns", "Ads built around the worktop materials and services SMG offers."],
      ["Location targeting", "Campaigns focused on Grays, Thurrock and the wider Essex, London, Kent and Herts area."],
      ["Quote-focused ads", "Ad copy and landing pages that point buyers to a quote request."],
      ["Regular optimisation", "Search terms, bids and ads reviewed and improved over time."],
    ],
    outcome: {
      eyebrow: "The outcome",
      title: "Seen by local buyers who are ready to ask for a quote",
      points: ["Ads shown across the full service area", "Clear route from ad to quote request", "Campaigns reviewed and improved regularly"],
    },
    services: ["Google Ads Management", "Local SEO", "SEO Services", "Website Design"],
    more: [more.wooden, more.hp4p, more.thames],
  },
  {
    slug: "the-wooden-pool-store",
    client: "The Wooden Pool Store",
    metaTitle: "The Wooden Pool Store Google Ads Case Study | OMH",
    metaDescription:
      "UK-wide Google Ads for The Wooden Pool Store, covering the Premium, Signature and Essentials ranges of wooden garden pools.",
    tags: ["Google Ads", "Home and garden"],
    h1: "The Wooden Pool Store: Google Ads for premium garden pools",
    lede: "The Wooden Pool Store sells premium wooden swimming pools for UK gardens, from £7,000, with UK-wide delivery. We run Google Ads that bring in pool enquiries.",
    glance: [
      ["Client", "The Wooden Pool Store"],
      ["Sector", "Garden pools"],
      ["Coverage", "UK-wide delivery"],
      ["Services", "Google Ads"],
    ],
    stats: {
      heading: "Project highlights",
      items: [
        { value: "£7,000+", label: "high-value products" },
        { value: "3", label: "ranges: Premium, Signature, Essentials" },
        { value: "UK-wide", label: "campaign coverage" },
      ],
    },
    challenge: {
      title: "A considered, high-value purchase",
      body: [
        "A wooden pool is a big decision. Buyers research for weeks, compare ranges and want advice before they commit, so every click needs to count.",
      ],
    },
    approach: [
      ["Campaigns by range", "Ads that cover the Premium, Signature and Essentials ranges."],
      ["UK-wide targeting", "Reaching garden owners across the country, matched to the delivery area."],
      ["Enquiry tracking", "Measuring quote and enquiry requests, not just clicks."],
      ["Ongoing optimisation", "Search terms and budgets adjusted to the buying season."],
    ],
    outcome: {
      eyebrow: "The outcome",
      title: "Ads built for a long buying journey",
      points: ["Every range represented in search", "Campaigns judged on enquiries", "Budgets matched to the buying season"],
    },
    services: ["Google Ads Management", "SEO Services", "Website Design", "WordPress Maintenance"],
    more: [more.hp4p, more.smg, more.thames],
  },
  {
    slug: "deeks-vat-consultancy",
    client: "Deeks VAT Consultancy",
    metaTitle: "Deeks VAT Consultancy SEO Case Study | OMH",
    metaDescription:
      "Technical SEO and ongoing SEO for Deeks VAT Consultancy, a specialist VAT firm in Doncaster. Read the results and the client’s own review.",
    tags: ["SEO", "Professional services"],
    h1: "Deeks VAT Consultancy: SEO for a specialist VAT firm",
    lede: "Deeks VAT Consultancy advises accountants, solicitors, businesses and charities on VAT, customs duty and related taxes. We have looked after their SEO for nearly two years.",
    glance: [
      ["Client", "Deeks VAT Consultancy"],
      ["Sector", "VAT and tax consultancy"],
      ["Location", "Doncaster, UK and overseas clients"],
      ["Working together", "Nearly two years"],
      ["Services", "Technical SEO, content, ChatGPT Ads landing page"],
    ],
    stats: {
      heading: "Results",
      items: [
        { value: "585", label: "organic visits a month" },
        { value: "5★", label: "Google review from the client" },
        { value: "2 yrs", label: "working together" },
      ],
      source: "Source: Semrush, September 2026; Google review.",
    },
    shot: [1440, 662],
    challenge: {
      title: "Specialist advice that needs to be found",
      body: [
        "VAT is a niche, technical subject. Deeks VAT needed to be found by accountants and businesses searching for expert help, and the site's technical health was holding it back.",
      ],
    },
    approach: [
      ["Technical SEO audit", "Full Screaming Frog crawls to find broken links, redirect chains and missing metadata."],
      ["Fixes on WordPress", "Issues fixed directly on the site, hosted on SiteGround."],
      ["Ongoing SEO", "Regular improvements to rankings and visibility."],
      ["ChatGPT Ads landing page", "A landing page for The Accountants VAT Club, built to drive brochure downloads and booked calls."],
    ],
    outcome: {
      eyebrow: "The outcome",
      title: "Stronger rankings and more enquiries",
      points: [
        "Organic traffic higher in early 2026 than the year before",
        "A cleaner, healthier site for Google to crawl",
        "In the client's words: \"a substantial increase in enquiries\"",
      ],
      panel: {
        kind: "yoy",
        title: "Organic traffic, year on year",
        note: "Semrush",
        series: [
          { label: "2025", line: [12, 12.5, 14, 16, 19, 21, 22, 22, 21.5, 22, 25, 34] },
          { label: "2026", line: [48, 53, 58, 62, 65, 66, 64, 58, 50, 45, 42, 40] },
        ],
        xLabels: ["Jan", "Feb", "Mar", "Apr", "May"],
        caption: "January to May 2026 compared with the same months in 2025.",
      },
    },
    testimonial: {
      lead: "We have been working with Online Marketing Help for nearly two years, and we couldn't be happier with the results. Since using their SEO services, our website rankings have improved significantly, resulting in much greater online visibility and a substantial increase in enquiries and new business leads.",
      rest: "The team are professional, knowledgeable, approachable and genuinely committed to helping our business succeed. What really sets them apart is their willingness to go above and beyond.",
      name: "Jane Deeks",
      company: "Deeks VAT Consultancy",
      source: "Google review",
    },
    services: ["SEO Services", "Technical SEO", "AI Search and ChatGPT Ads", "Website Design"],
    more: [more.southend, more.thames, more.komfort],
  },
  {
    slug: "southend-care",
    client: "Southend Care",
    metaTitle: "Southend Care Local SEO Case Study | OMH",
    metaDescription:
      "Local SEO for Southend Care, an adult social care provider in Southend-on-Sea. 784 organic visits a month and 2 pages cited by ChatGPT.",
    tags: ["SEO", "Adult social care"],
    h1: "Southend Care: local SEO for an adult social care provider",
    lede: "Southend Care provides adult social care in Southend-on-Sea, from care at home to supported living. We run their SEO and report on progress every month.",
    glance: [
      ["Client", "Southend Care"],
      ["Sector", "Adult social care"],
      ["Location", "Southend-on-Sea, Essex"],
      ["Services", "SEO, monthly reporting"],
    ],
    stats: {
      heading: "Results",
      items: [
        { value: "784", label: "organic visits a month" },
        { value: "500", label: "referring domains" },
        { value: "2", label: "pages cited by ChatGPT" },
      ],
      source: "Source: Semrush, October 2026.",
    },
    challenge: {
      title: "Helping families find local care",
      body: [
        "Families searching for care in Southend want clear, trustworthy information quickly. Southend Care needed its key service pages, especially care at home, to show up for those searches.",
      ],
    },
    approach: [
      ["Local SEO", "On-page improvements to the main service pages, starting with care at home."],
      ["Authority building", "A link profile that now includes 500 referring domains."],
      ["AI search visibility", "Content that answer engines can understand and cite."],
      ["Monthly reporting", "A clear report every month on rankings, traffic and next steps."],
    ],
    outcome: {
      eyebrow: "The outcome",
      title: "Visible in Google, and in AI answers",
      points: ["Organic traffic rising steadily since summer 2026", "2 pages already cited by ChatGPT", "A monthly view of progress for the team"],
      panel: {
        kind: "trend",
        title: "Search and AI visibility",
        note: "Semrush, October 2026",
        tiles: [
          { label: "Organic traffic", value: "784" },
          { label: "Authority Score", value: "24" },
          { label: "Ref. domains", value: "500" },
          { label: "AI visibility", value: "14" },
        ],
        line: [70, 70, 46, 45, 44, 42, 43, 45, 47, 52, 53, 53, 56, 57, 57, 61, 60],
        xLabels: ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov"],
      },
    },
    services: ["Local SEO", "SEO Services", "AI Search Optimisation", "Website Design"],
    more: [more.deeks, more.ascent, more.thames],
  },
];

const legacyService: Record<CaseStudyServiceId, string> = {
  seo: "SEO Services",
  "google-ads": "Google Ads Management",
  wordpress: "WordPress Development",
  shopify: "Shopify Development",
  maintenance: "WordPress Maintenance",
  "social-media": "Social Media Marketing",
  "paid-social": "Paid Social Advertising",
};

// An older study in the new layout. Headings are the ones its old article used ("Where X started", "What needed to
// change"); the more-studies row is the next three older studies, as the old page linked to its neighbours.
function fromLegacy(study: CaseStudy, index: number): CaseStudyPageData {
  const services = study.serviceIds.map((id) => caseStudyServices[id].label).join(", ") || "Illustration and graphic design";
  const glance: [string, string][] = [["Client", study.client], ["Sector", study.sector]];
  if (study.duration) glance.push(["Duration", study.duration]);
  glance.push(["Services", services]);
  const cover = caseStudyMedia[study.slug];
  return {
    slug: study.slug,
    client: study.client,
    metaTitle: `${study.shortTitle} Case Study | Online Marketing Help`,
    metaDescription: study.lede,
    tags: [study.category, study.sector],
    h1: study.title,
    lede: study.lede,
    glance,
    stats: study.results.length ? { heading: "Results", items: study.results } : undefined,
    // A capture of the client's site goes in the browser frame uncropped, like the new studies.
    cover: cover.src.startsWith("/images/clients/") ? undefined : { src: cover.src, alt: cover.alt, logo: cover.logo },
    challenge: {
      title: `Where ${study.client} started`,
      body: [study.objective],
      list: { title: "What needed to change", items: study.challenges },
    },
    approach: study.work.map((group) => [group.title, group.items]),
    testimonial: study.testimonial && {
      lead: study.testimonial.quote,
      name: study.testimonial.attribution ?? study.client,
      company: study.testimonial.attribution ? study.client : undefined,
    },
    services: study.serviceIds.map((id) => legacyService[id]),
    more: [1, 2, 3].map((step) => {
      const next = caseStudies[(index + step) % caseStudies.length];
      return { slug: next.slug, title: next.title, tag: `${next.category} · ${next.sector}` };
    }),
  };
}

export const allCaseStudyPages = [...caseStudyPages, ...caseStudies.map(fromLegacy)];

export const getCaseStudyPage = (slug: string) => allCaseStudyPages.find((study) => study.slug === slug);
