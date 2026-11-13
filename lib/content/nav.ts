import { CASE_STUDIES_LIVE } from "@/lib/flags";
// Navigation and company facts, kept out of layout code (brief §21/§22).
// IA matches the master brief §7. `ready: true` marks pages that are actually
// designed in this preview; every other route falls through to the coming-soon
// page (app/[...slug]), so the client can walk the full planned structure
// without hitting a 404.

/** `desc`: one-line note under the label. `sub`: small child links shown inline under it (Trades → plumbers…). */
export type NavLink = { label: string; href: string; ready?: boolean; desc?: string; sub?: NavLink[] };
export type NavColumn = { heading?: string; links: NavLink[] };
/** `cta`: a strip across the bottom of the mega menu. */
export type NavItem = { label: string; href?: string; columns?: NavColumn[]; cta?: { text: string; label: string; href: string } };

/** A column's links with their sub-links, flattened. */
export const columnLinks = (col: NavColumn): NavLink[] => col.links.flatMap((l) => [l, ...(l.sub ?? [])]);

// Shared by the Services mega menu and the footer.
const serviceColumns: NavColumn[] = [
  {
    heading: "Websites",
    links: [
      { label: "Website Designs", href: "/website-designs", ready: true },
      { label: "Shopify Development", href: "/shopify-development", ready: true },
      { label: "Website Maintenance", href: "/wordpress-website-maintenance", ready: true },
      { label: "WordPress Development", href: "/wordpress-development", ready: true },
    ],
  },
  {
    heading: "Paid Advertising",
    links: [
      { label: "Paid Social Advertising", href: "/social-media-paid-advertising", ready: true },
      { label: "Amazon PPC Advertising", href: "/amazon-ppc-advertising-agency-uk", ready: true },
      { label: "Google Ads Management", href: "/google-adwords-ppc", ready: true },
    ],
  },
  {
    heading: "Organic Growth",
    links: [
      { label: "Local SEO", href: "/local-seo", ready: true },
      { label: "SEO Services", href: "/seo-services", ready: true },
      { label: "Ecommerce SEO", href: "/ecommerce-seo-services", ready: true },
    ],
  },
  {
    heading: "Creative & Social",
    links: [
      { label: "Facebook Marketing", href: "/facebook-marketing-agency", ready: true },
      { label: "Instagram Marketing", href: "/instagram-marketing-agency", ready: true },
      { label: "Social Media Management", href: "/social-media-marketing-services", ready: true },
    ],
  },
];

export const primaryNav: NavItem[] = [
  {
    label: "Solutions",
    columns: [
      {
        links: [
          { label: "Grow Local Visibility", href: "/solutions/grow-local-visibility", ready: true },
          { label: "Increase Ecommerce Sales", href: "/solutions/increase-ecommerce-sales", ready: true },
          { label: "Improve Website Conversion", href: "/solutions/improve-website-conversion", ready: true },
          { label: "Generate More Qualified Leads", href: "/solutions/generate-qualified-leads", ready: true },
          { label: "Outsource Your Digital Marketing", href: "/solutions/outsource-digital-marketing", ready: true },
        ],
      },
    ],
  },
  {
    label: "Services",
    columns: serviceColumns,
  },
  {
    // Mega menu (client's menu brief, 29 Oct 2026): the two voice products, then industries by demand and SEO
    // phase (Phase 1 first; plumbers, heating and builders sit under Trades, their hub), then /ai-services.
    // Use-case pages (appointment booking, customer service, lead generation) join the first column when they exist.
    label: "AI Services",
    columns: [
      {
        heading: "AI Voice Agents",
        links: [
          { label: "AI Voice Agents", href: "/ai-voice-agents", desc: "Answer every call, 24/7", ready: true },
          { label: "AI Receptionist", href: "/ai-voice-agents/receptionist", desc: "Never miss a call, from £249/month", ready: true },
        ],
      },
      {
        heading: "By Industry",
        links: [
          { label: "Healthcare & Clinics", href: "/ai-voice-agents/healthcare", ready: true },
          { label: "Dentists", href: "/ai-voice-agents/dentists", ready: true },
          { label: "Estate & Letting Agents", href: "/ai-voice-agents/estate-letting-agents", ready: true },
          {
            label: "Trades",
            href: "/ai-voice-agents/trades",
            ready: true,
            sub: [
              { label: "Plumbers", href: "/ai-voice-agents/plumbers", ready: true },
              { label: "Heating", href: "/ai-voice-agents/heating-hvac", ready: true },
              { label: "Builders", href: "/ai-voice-agents/builders-construction", ready: true },
            ],
          },
          { label: "Law Firms", href: "/ai-voice-agents/law-firms", ready: true },
          { label: "Car Dealerships & Garages", href: "/ai-voice-agents/car-dealerships", ready: true },
          { label: "Salons & Beauty", href: "/ai-voice-agents/salons", ready: true },
          { label: "Accountants & Financial Advisers", href: "/ai-voice-agents/accountants-financial-advisers", ready: true },
          { label: "All industries →", href: "/ai-voice-agents#industries", ready: true },
        ],
      },
      {
        heading: "Build with AI",
        links: [
          { label: "AI Technology Consulting", href: "/ai-services#ai-consulting", ready: true },
          { label: "AI Websites & Software", href: "/ai-services#ai-websites-software", ready: true },
          { label: "AI Chatbot", href: "/ai-services#ai-chatbot", ready: true },
          { label: "AI UGC", href: "/ai-services#ai-ugc", ready: true },
        ],
      },
    ],
    // AI-specific demo strip; the header's "Book a Growth Consultation" stays the general CTA.
    cta: { text: "Hear an AI voice agent handle a real call.", label: "Book a Free Demo", href: "/ai-voice-agents#book-demo-form" },
  },
  ...(CASE_STUDIES_LIVE ? [{ label: "Case Studies", href: "/case-studies" }] : []),
  { label: "Insights", href: "/insights" },
  { label: "Pricing", href: "/pricing" },
  {
    label: "Company",
    columns: [
      {
        heading: "About OMH",
        links: [
          { label: "FAQ", href: "/faq", ready: true },
          { label: "Contact", href: "/contact", ready: true },
          { label: "About Us", href: "/about-us", ready: true },
        ],
      },
      {
        heading: "Policies",
        links: [
          { label: "Warranty", href: "/warranty", ready: true },
          { label: "Cookie Policy", href: "/cookies", ready: true },
          { label: "Privacy Policy", href: "/privacy", ready: true },
          { label: "Terms & Conditions", href: "/terms", ready: true },
        ],
      },
    ],
  },
];

// Pages designed in this preview. The sitemap, site search and breadcrumbs read this list.
export const readyPages: NavLink[] = [
  { label: "Home", href: "/", ready: true },
  { label: "WordPress Development", href: "/wordpress-development", ready: true },
  { label: "Website Designs", href: "/website-designs", ready: true },
  { label: "Shopify Development", href: "/shopify-development", ready: true },
  { label: "WordPress Maintenance", href: "/wordpress-website-maintenance", ready: true },
  { label: "Google Ads PPC", href: "/google-adwords-ppc", ready: true },
  { label: "Amazon PPC Advertising", href: "/amazon-ppc-advertising-agency-uk", ready: true },
  { label: "Local SEO", href: "/local-seo", ready: true },
  { label: "Social Media Marketing", href: "/social-media-marketing-services", ready: true },
  { label: "Paid Social Advertising", href: "/social-media-paid-advertising", ready: true },
  { label: "About", href: "/about-us", ready: true },
  ...(CASE_STUDIES_LIVE ? [{ label: "Case Studies", href: "/case-studies", ready: true }] : []),
  { label: "Insights", href: "/insights", ready: true },
  { label: "Contact", href: "/contact", ready: true },
  { label: "Generate More Qualified Leads", href: "/solutions/generate-qualified-leads", ready: true },
  { label: "Increase Ecommerce Sales", href: "/solutions/increase-ecommerce-sales", ready: true },
  { label: "Improve Website Conversion", href: "/solutions/improve-website-conversion", ready: true },
  { label: "Grow Local Visibility", href: "/solutions/grow-local-visibility", ready: true },
  { label: "Outsource Your Digital Marketing", href: "/solutions/outsource-digital-marketing", ready: true },
  { label: "Pricing", href: "/pricing", ready: true },
  { label: "FAQ", href: "/faq", ready: true },
  { label: "Warranty", href: "/warranty", ready: true },
  { label: "Privacy Policy", href: "/privacy", ready: true },
  { label: "Cookie Policy", href: "/cookies", ready: true },
  { label: "Terms & Conditions", href: "/terms", ready: true },
  { label: "SEO Services", href: "/seo-services", ready: true },
  { label: "Ecommerce SEO", href: "/ecommerce-seo-services", ready: true },
  { label: "AI Services", href: "/ai-services", ready: true },
  { label: "Custom AI Voice Agents", href: "/ai-voice-agents", ready: true },
  { label: "AI Receptionist", href: "/ai-voice-agents/receptionist", ready: true },
  // Industry voice-agent pages (26 Oct 2026): listed here so the sitemap and site search carry them.
  { label: "AI Agent for Estate & Letting Agents", href: "/ai-voice-agents/estate-letting-agents", ready: true },
  { label: "AI Agent for Dentists", href: "/ai-voice-agents/dentists", ready: true },
  { label: "AI Agent for Healthcare & Clinics", href: "/ai-voice-agents/healthcare", ready: true },
  { label: "AI Agent for Plumbers", href: "/ai-voice-agents/plumbers", ready: true },
  { label: "AI Agent for Heating & HVAC", href: "/ai-voice-agents/heating-hvac", ready: true },
  { label: "AI Agent for Builders & Construction", href: "/ai-voice-agents/builders-construction", ready: true },
  { label: "AI Agent for Law Firms", href: "/ai-voice-agents/law-firms", ready: true },
  { label: "AI Agent for Car Dealerships", href: "/ai-voice-agents/car-dealerships", ready: true },
  { label: "AI Agent for Accountants & Advisers", href: "/ai-voice-agents/accountants-financial-advisers", ready: true },
  { label: "AI Agent for Salons & Beauty", href: "/ai-voice-agents/salons", ready: true },
  { label: "AI Agent for Trades", href: "/ai-voice-agents/trades", ready: true },
  { label: "Facebook Marketing", href: "/facebook-marketing-agency", ready: true },
  { label: "Instagram Marketing", href: "/instagram-marketing-agency", ready: true },
];

// href → friendly label, so the coming-soon page can title itself correctly.
export const navLabels: Record<string, string> = (() => {
  const out: Record<string, string> = { "/": "Home", "/contact": "Contact" };
  for (const item of primaryNav) {
    if (item.href) out[item.href] = item.label;
    for (const col of item.columns ?? []) {
      for (const link of columnLinks(col)) out[link.href] = link.label;
    }
  }
  return out;
})();

// Breadcrumb names (components/layout/SiteBreadcrumbs.tsx): every menu and ready page, plus the pages outside the
// menu. A path missing here is not linked as a parent.
export const crumbLabels: Record<string, string> = {
  ...Object.fromEntries(readyPages.map((p) => [p.href, p.label])),
  ...navLabels,
  "/calendly-thank-you": "Thank you",
  "/contact-us-thank-you": "Thank you",
  "/local-seo-thank-you": "Thank you",
  "/quotation-questionnaire-thank-you": "Thank you",
  "/search-engine-optimisation-thank-you": "Thank you",
  "/subscription-thank-you": "Thank you",
  "/wordpress-development-thank-you": "Thank you",
  "/wordpress-maintenance-thank-you-page": "Thank you",
  "/facebook-paid-ads-questionnaire": "Facebook Ads Questionnaire",
  "/new-website-development-quotation-questionnaire": "Website Quotation Questionnaire",
  "/website-redesign-project-questionnaire": "Website Redesign Questionnaire",
  "/ppc-request-quote": "PPC Quote",
  "/seo-request-quote": "SEO Quote",
  "/social-media-paid-marketing-request-quote": "Paid Social Quote",
  "/wordpress-development-request-quote": "WordPress Development Quote",
  "/wordpress-website-maintenance-request-quote": "WordPress Maintenance Quote",
  "/omh-free-consultation": "Free Consultation",
  "/get-more-leads": "Free Growth Review",
  "/design-system": "Design System",
  "/home-2": "Home (preview)",
};

export const company = {
  name: "Online Marketing Help",
  phoneDisplay: "020 3489 3934",
  phoneHref: "tel:+442034893934",
  email: "support@onlinemarketinghelp.co.uk",
  address: "The Hut, Central Ave, Hullbridge SS5 6AU", // ◈ confirm current
  companyNo: "12328533", // ◈ confirm
  // Profiles as listed on the live thank-you page; the footer links and the
  // schema's sameAs both read this list.
  socials: [
    { label: "Facebook", href: "https://www.facebook.com/onlinemarketinghelpuk/" },
    { label: "Instagram", href: "https://www.instagram.com/onlinemarketinghelpuk/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/34580209/" },
    { label: "X", href: "https://twitter.com/MarketingHelp1" },
  ],
  positioning:
    "Full-service digital marketing and web development for UK service businesses and ecommerce brands.",
};

// Footer link groups after the brand intro: the first three service groups as
// in the mega menu, then Solutions, then the top five AI Services pages (client
// audit, 26 Oct 2026: this replaced the Company column). Within every column the
// links run narrowest to widest by rendered width (measured in the footer font,
// not character count — "Paid Social Advertising" renders narrower than
// "Google Ads Management"). Re-measure if a label changes.
export const footerCols: NavColumn[] = [
  ...serviceColumns.slice(0, 3),
  {
    heading: "Solutions",
    links: [
      { label: "Grow Local Visibility", href: "/solutions/grow-local-visibility" },
      { label: "Increase Ecommerce Sales", href: "/solutions/increase-ecommerce-sales" },
      { label: "Improve Website Conversion", href: "/solutions/improve-website-conversion" },
      { label: "Generate More Qualified Leads", href: "/solutions/generate-qualified-leads" },
      { label: "AI Voice Agents", href: "/ai-voice-agents" },
    ],
  },
  {
    heading: "AI Services",
    links: [
      { label: "Custom AI Voice Agents", href: "/ai-voice-agents" },
      { label: "AI Agent for Heating & HVAC", href: "/ai-voice-agents/heating-hvac" },
      { label: "AI Agent for Healthcare & Clinics", href: "/ai-voice-agents/healthcare" },
      { label: "AI Agent for Builders & Construction", href: "/ai-voice-agents/builders-construction" },
      { label: "AI Agent for Estate & Letting Agents", href: "/ai-voice-agents/estate-letting-agents" },
    ],
  },
];

export const legalLinks = [
  { label: "Privacy", href: "/privacy" },
  { label: "Cookies", href: "/cookies" },
  { label: "Terms", href: "/terms" }
];
