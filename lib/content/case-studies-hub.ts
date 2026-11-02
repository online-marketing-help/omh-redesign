// The /case-studies hub (client brief "OMH Case Studies Page - Final", 2 Nov 2026). Copy is verbatim from the brief.
// Each project has its page at /case-studies/<slug> (lib/content/case-study-pages.ts, same slugs).
// The older studies in case-studies.ts keep their own pages and are no longer listed on the hub.

export type HubService = "Website design" | "SEO" | "Google Ads";
export type HubSector =
  | "Hospitality and events"
  | "Professional services"
  | "Home and garden"
  | "Ecommerce"
  | "Manufacturing and energy"
  | "Care";

export const hubServices: HubService[] = ["Website design", "SEO", "Google Ads"];
export const hubSectors: HubSector[] = [
  "Hospitality and events",
  "Professional services",
  "Home and garden",
  "Ecommerce",
  "Manufacturing and energy",
  "Care",
];

type Stat = { value: string; label: string };

export type HubStudy = {
  slug: string;
  client: string;
  title: string;
  tag: string;
  meta: string;
  services: HubService[];
  sector: HubSector;
  /** Which heading the card sits under. The featured study has no card. */
  group?: "Website design" | "SEO and Google Ads";
  /** A screenshot of the client's own website in public/images/clients (1440x900, taken 2 Nov 2026). Cards without
      one use the brief's illustration from public/images/case-studies/hub. */
  screenshot?: boolean;
  /** Each card shows either two sourced results or two lines of work delivered. */
  stats?: [Stat, Stat];
  source?: string;
  delivered?: [string, string];
  servicesLine?: string;
};

export const hubStudies: HubStudy[] = [
  {
    slug: "komfort-partitioning",
    client: "Komfort Partitioning",
    title: "Komfort Partitioning: a website built for architects, specifiers and contractors",
    tag: "Website design · Manufacturing",
    meta: "",
    services: ["Website design"],
    sector: "Manufacturing and energy",
  },
  {
    slug: "camp-kerala",
    client: "Camp Kerala",
    title: "Camp Kerala: under-canvas accommodation for Ryder Cup and Glastonbury",
    tag: "Website, SEO and PPC · Events",
    meta: "UK events · 2026",
    services: ["Website design", "SEO", "Google Ads"],
    sector: "Hospitality and events",
    group: "Website design",
    stats: [
      { value: "10.7K", label: "organic clicks in 5 months" },
      { value: "169K", label: "search impressions" },
    ],
    source: "Source: Search Console, May to October 2026",
  },
  {
    slug: "barbados-maritime-ship-registry",
    client: "Barbados Maritime Ship Registry",
    title: "Barbados Maritime Ship Registry: a clearer site for an international ship registry",
    tag: "Website design · Maritime",
    meta: "Barbados · International offices",
    services: ["Website design"],
    sector: "Professional services",
    group: "Website design",
    delivered: ["Registrar directory covering 28+ countries", "WordPress site the registry team can update"],
    servicesLine: "Services: website design and build",
  },
  {
    slug: "ascent-energy",
    client: "Ascent Energy",
    title: "Ascent Energy: a faster website for a national EV and solar installer",
    tag: "Website design · Energy",
    meta: "Preston · Covering the whole UK",
    services: ["Website design", "SEO"],
    sector: "Manufacturing and energy",
    group: "Website design",
    delivered: ["Phased speed and Core Web Vitals plan", "SEO content plan for EV charging, solar and battery storage"],
    servicesLine: "Services: website design, performance, SEO",
  },
  {
    slug: "old-queen-street-cafe",
    screenshot: true,
    client: "Old Queen Street Café",
    title: "Old Queen Street Café: a Christmas enquiry page and menu rebuild",
    tag: "Website design · Events venue",
    meta: "Westminster, London · 2026",
    services: ["Website design"],
    sector: "Hospitality and events",
    group: "Website design",
    delivered: [
      "Christmas enquiry page linked from the printed brochure",
      "5 print menus rebuilt as mobile-friendly web pages",
    ],
    servicesLine: "Services: website design and build",
  },
  {
    slug: "thames-luxury-charters",
    screenshot: true,
    client: "Thames Luxury Charters",
    title: "Thames Luxury Charters: search marketing tied to real bookings",
    tag: "SEO and Google Ads · Luxury events",
    meta: "London · Since November 2025",
    services: ["SEO", "Google Ads"],
    sector: "Hospitality and events",
    group: "SEO and Google Ads",
    stats: [
      { value: "+59.5%", label: "organic traffic" },
      { value: "+48%", label: "referring domains" },
    ],
    source: "Source: Semrush, Jun to Nov 2026 vs Dec 2025 to May 2026",
  },
  {
    slug: "heatpumps4pools",
    client: "HeatPumps4Pools",
    title: "HeatPumps4Pools: Shopping campaigns and SEO for a pool heat pump store",
    tag: "SEO and Google Ads · Ecommerce",
    meta: "UK-wide · Online store",
    services: ["SEO", "Google Ads"],
    sector: "Ecommerce",
    group: "SEO and Google Ads",
    delivered: [
      "Shopping and Performance Max campaigns",
      "Ongoing SEO, site speed and Google Business Profile support",
    ],
    servicesLine: "Services: SEO and Google Ads",
  },
  {
    slug: "smg-surfaces",
    screenshot: true,
    client: "SMG Surfaces",
    title: "SMG Surfaces: Google Ads for a stone worktop supplier and installer",
    tag: "Google Ads · Kitchen worktops",
    meta: "Grays, Essex · London, Kent, Herts",
    services: ["Google Ads"],
    sector: "Home and garden",
    group: "SEO and Google Ads",
    delivered: [
      "Search campaigns for worktop buyers in Essex, London, Kent and Herts",
      "Ads that send buyers straight to a quote request",
    ],
    servicesLine: "Services: Google Ads",
  },
  {
    slug: "the-wooden-pool-store",
    screenshot: true,
    client: "The Wooden Pool Store",
    title: "The Wooden Pool Store: Google Ads for premium garden pools",
    tag: "Google Ads · Home and garden",
    meta: "UK-wide delivery",
    services: ["Google Ads"],
    sector: "Home and garden",
    group: "SEO and Google Ads",
    delivered: [
      "UK-wide campaigns for pools from £7,000",
      "Campaigns covering the Premium, Signature and Essentials ranges",
    ],
    servicesLine: "Services: Google Ads",
  },
  {
    slug: "deeks-vat-consultancy",
    client: "Deeks VAT Consultancy",
    title: "Deeks VAT Consultancy: SEO for a specialist VAT firm",
    tag: "SEO · VAT advice",
    meta: "Doncaster · Working together for nearly two years",
    services: ["SEO"],
    sector: "Professional services",
    group: "SEO and Google Ads",
    stats: [
      { value: "585", label: "organic visits a month" },
      { value: "5★", label: "Google review from the client" },
    ],
    source: "Source: Semrush, September 2026; Google review",
  },
  {
    slug: "southend-care",
    screenshot: true,
    client: "Southend Care",
    title: "Southend Care: local SEO for an adult social care provider",
    tag: "SEO · Adult social care",
    meta: "Southend-on-Sea, Essex",
    services: ["SEO"],
    sector: "Care",
    group: "SEO and Google Ads",
    stats: [
      { value: "784", label: "organic visits a month" },
      { value: "2", label: "pages cited by ChatGPT" },
    ],
    source: "Source: Semrush, October 2026",
  },
];

export const hubGroups = ["Website design", "SEO and Google Ads"] as const;

export const hubGoals = [
  {
    title: "Generate qualified leads",
    work: ["Thames Luxury Charters", "SMG Surfaces", "The Wooden Pool Store"],
    link: "Generate qualified leads",
    href: "/solutions/generate-qualified-leads",
  },
  {
    title: "Grow search visibility",
    work: ["Camp Kerala", "Southend Care", "Deeks VAT Consultancy"],
    link: "Grow search visibility",
    href: "/solutions/grow-local-visibility",
  },
  {
    title: "Build a website that converts",
    work: ["Komfort Partitioning", "Camp Kerala", "Ascent Energy", "Old Queen Street Café"],
    link: "Website design",
    href: "/website-designs",
  },
  {
    title: "Increase ecommerce sales",
    work: ["HeatPumps4Pools", "The Wooden Pool Store"],
    link: "Increase ecommerce sales",
    href: "/solutions/increase-ecommerce-sales",
  },
];

// Review proof for the hub. Trustpilot is the live profile, read 2 Nov 2026 as the brief asked (TrustScore 4.7 from
// 34 reviews; the brief's draft said 4.9 from 37). Google is the brief's figure. The brief's "96% of 49 reviews are
// five stars" was worked out from the old counts, so it isn't shown until the client confirms a current figure.
export const hubReviews = {
  trustpilot: { score: "4.7", count: 34 },
  google: { score: "4.7", count: 12 },
  since: "March 2020",
};
export const hubReviewTotal = hubReviews.trustpilot.count + hubReviews.google.count;
