/*
  Phase 5 of docs/legacy-pages-plan.md — the ten legacy funnel pages.
  Every string below is copied verbatim from the live page (fetched 19 Aug 2026
  through the logged-in browser), including its own typos and spacing quirks
  ("yout PPC project", "Do you require custom business email ?", the
  "Tree Website Maintenance ( £250 …" stray space). Do not tidy them — the
  content rule at the top of the plan is exact copy, presentation only may change.

  `design` is presentation, not content: it keeps the ten pages from sharing one
  layout (plan's layout rule, 11 Aug 2026).
*/

export type QuoteField =
  | { kind: "text" | "email" | "tel" | "textarea"; label: string; required?: boolean }
  | { kind: "select"; label: string; required?: boolean; options: string[] }
  | { kind: "checkbox"; label: string; options: string[] };

export type QuoteGroup = { label: string; fields: QuoteField[] };

/* All nine pages share one layout — copy left, form right (user directive,
   19 Aug 2026, overriding the plan's "no two pages share a layout" rule for the
   funnel pages). What still differs per page is the heading bar and the accent. */
export type QuoteDesign = {
  labelStyle: "rule" | "plain" | "pill" | "index" | "centered" | "underline" | "topline" | "dot";
  accent: string;
};

export type QuoteFormPage = {
  slug: string;
  /* Live H1 text, in the source's own casing (the live theme uppercases it in CSS). */
  title: string;
  intro: string;
  callHeading: string;
  submitLabel: string;
  notes?: string[];
  groups: QuoteGroup[];
  design: QuoteDesign;
  seo: { title: string; description: string };
  /* Phase 6 wires each form to its live thank-you page; until those exist the
     form confirms inline instead of pushing to a route that isn't built. */
  thankYou?: string;
};

const callHeading = "Request a Quote or Call: +44 20 3489 3934";

const quoteNotes = [
  "* All work that we do is contractual and requires a deposit to begin.",
  "* Rolling Monthly Agreement Available / Package Excludes Any Advertising Spend.",
];

/* The five single-package quote forms share the live form's field list exactly;
   only the package options and the copy differ. */
function packageQuoteGroups(options: string[]): QuoteGroup[] {
  return [
    {
      label: "Your details",
      fields: [
        { kind: "text", label: "Your Name", required: true },
        { kind: "email", label: "Email Address", required: true },
        { kind: "tel", label: "Phone Number", required: true },
      ],
    },
    {
      label: "Your package",
      fields: [
        { kind: "select", label: "Which package are you interested in?", required: true, options },
        {
          kind: "textarea",
          label: "Do you have any questions that you'd like answered during the consultation?",
        },
      ],
    },
  ];
}

export const ppcRequestQuote: QuoteFormPage = {
  slug: "ppc-request-quote",
  thankYou: "/contact-us-thank-you", // ◈ inferred: no PPC-specific thank-you page exists live
  title: "Google PPC Request Quote",
  intro:
    "Please fill out the form below to schedule a free consultation to discuss your options for yout PPC project.",
  callHeading,
  submitLabel: "Submit Enquiry",
  notes: quoteNotes,
  groups: packageQuoteGroups([
    "PPC Seed (£550 Per Month + VAT)",
    "PPC Shoot (£700 Per Month + VAT)",
    "PPC Sapling (£1200 Per Month + VAT)",
    "PPC Tree (£3000 Per Month + VAT)",
  ]),
  design: {
    labelStyle: "index",
    accent: "bg-amber",
  },
  seo: {
    title: "PPC Request Quote",
    description:
      "Request a Google Ads PPC quote from Online Marketing Help. Pick a package, tell us about the account and book a free consultation.",
  },
};

export const seoRequestQuote: QuoteFormPage = {
  slug: "seo-request-quote",
  thankYou: "/search-engine-optimisation-thank-you",
  title: "SEO Request Quote",
  intro:
    "Please fill out the form below to schedule a free consultation to discuss your options for your SEO project.",
  callHeading,
  submitLabel: "Submit Enquiry",
  notes: quoteNotes,
  groups: packageQuoteGroups([
    "SEO Shoot (£599 Per Month + VAT)",
    "SEO Sapling (£1199 Per Month + VAT)",
    "SEO Tree (£1599 Per Month + VAT)",
    "SEO Woods (£2329 Per Month + VAT)",
    "SEO Forest (£3599 Per Month + VAT)",
    "SEO Jungle (£7299 Per Month + VAT)",
  ]),
  design: {
    labelStyle: "topline",
    accent: "bg-teal",
  },
  seo: {
    title: "SEO Request Quote",
    description:
      "Request an SEO quote from Online Marketing Help. Choose the retainer that fits and book a free consultation about your organic search project.",
  },
};

export const wordpressDevelopmentRequestQuote: QuoteFormPage = {
  slug: "wordpress-development-request-quote",
  thankYou: "/wordpress-development-thank-you",
  title: "WordPress Website Design Request Quote",
  intro:
    "Please fill out the form below to schedule a free consultation to discuss your options for YOUR web design project.",
  callHeading,
  submitLabel: "Submit Enquiry",
  notes: quoteNotes,
  groups: [
    {
      label: "Your details",
      fields: [
        { kind: "text", label: "First Name", required: true },
        { kind: "text", label: "Last Name" },
        { kind: "email", label: "Email Address", required: true },
        { kind: "tel", label: "Phone Number", required: true },
      ],
    },
    {
      label: "Your project",
      fields: [
        {
          kind: "select",
          label: "Select Type of Your Project.",
          required: true,
          options: ["New WordPress Website Design", "Redesign Existing WordPress Website"],
        },
        {
          kind: "select",
          label: "Which package are you interested in?",
          required: true,
          options: [
            "SEED (From £99 Per Month + VAT)",
            "SAPLING (From £200 Per Month + VAT)",
            "WOODS (From £400 Per Month + VAT)",
          ],
        },
        {
          kind: "textarea",
          label: "Do you have any questions that you'd like answered during the consultation?",
        },
      ],
    },
  ],
  design: {
    labelStyle: "rule",
    accent: "bg-amber",
  },
  seo: {
    title: "WordPress Development Request Quote",
    description:
      "Request a WordPress website design quote. Tell us whether it's a new build or a redesign, pick a package and book a free consultation.",
  },
};

export const wordpressMaintenanceRequestQuote: QuoteFormPage = {
  slug: "wordpress-website-maintenance-request-quote",
  thankYou: "/wordpress-maintenance-thank-you-page",
  title: "WORDPRESS MAINTENANCE Request Quote",
  intro:
    "Please fill out the form below to schedule a free consultation to discuss your options for your WORDPRESS WEBSITE MAINTENANCE project.",
  callHeading,
  submitLabel: "Submit Enquiry",
  notes: quoteNotes,
  groups: packageQuoteGroups([
    "Seed Website Maintenance(£99 Per Month + VAT)",
    "Sapling Website Maintenance (£150 Per Month + VAT)",
    "Tree Website Maintenance ( £250 Per Month + VAT)",
  ]),
  design: {
    labelStyle: "dot",
    accent: "bg-teal",
  },
  seo: {
    title: "WordPress Website Maintenance Request Quote",
    description:
      "Request a WordPress maintenance quote. Choose a monthly care package and book a free consultation about looking after your site.",
  },
};

export const socialPaidRequestQuote: QuoteFormPage = {
  slug: "social-media-paid-marketing-request-quote",
  thankYou: "/contact-us-thank-you", // ◈ inferred: no paid-social thank-you page exists live
  title: "SOCIAL MEDIA Paid MARKETING Request Quote",
  intro:
    "Please fill out the form below to schedule a free consultation to discuss your options for your SOCIAL MEDIA MARKETING project.",
  callHeading,
  submitLabel: "Submit Enquiry",
  notes: quoteNotes,
  groups: packageQuoteGroups([
    "Social Media Paid Marketing Seed (£450 Per Week + VAT)",
    "Social Media Paid Marketing Sapling (£850 Per Month + VAT)",
    "Social Media Paid Marketing Tree (£1200 Per Month + VAT)",
  ]),
  design: {
    labelStyle: "centered",
    accent: "bg-teal",
  },
  seo: {
    title: "Social Media Paid Marketing Request Quote",
    description:
      "Request a paid social quote for Facebook and Instagram advertising. Choose a package and book a free consultation.",
  },
};

export const facebookAdsQuestionnaire: QuoteFormPage = {
  slug: "facebook-paid-ads-questionnaire",
  thankYou: "/quotation-questionnaire-thank-you",
  title: "Facebook Paid Ads Questionnaire",
  intro: "These Questions will help us to create the best possible Facebook adverts for your business.",
  callHeading,
  submitLabel: "Submit Query",
  groups: [
    {
      label: "Why you're advertising",
      fields: [
        { kind: "textarea", label: "Why are you looking to get into Facebook advertising?" },
        { kind: "textarea", label: "Tell us about your brand’s vision?", required: true },
        {
          kind: "checkbox",
          label: "What Goals Need To Be Achieved?",
          options: [
            "Brand Awareness",
            "Boost Organic Facebook Posts",
            "Website Traffic",
            "Engagement",
            "Lead Generation",
          ],
        },
        {
          kind: "checkbox",
          label: "What type of promotion do you want to run and collect leads?",
          options: [
            "Competition",
            "Download a White Paper or Ebook",
            "Event or Conference Registration",
            "Insurance Quote",
            "Sign Up for Newsletter",
            "Sign Up for Offer or Coupon",
            "Other",
          ],
        },
      ],
    },
    {
      label: "Who you're targeting",
      fields: [
        { kind: "text", label: "Your Target client Age?" },
        { kind: "text", label: "Your Target client Gender?", required: true },
        { kind: "text", label: "Your Target client Location?", required: true },
        { kind: "text", label: "Your Target client Interests?", required: true },
      ],
    },
    {
      label: "What's already in place",
      fields: [
        { kind: "text", label: "Have you run your own Facebook ads before?", required: true },
        { kind: "text", label: "Do you have a Facebook pixel installed on your site?", required: true },
        { kind: "text", label: "Do you have a Facebook Business Manager?", required: true },
        {
          kind: "textarea",
          label: "Send us your 3 competitor facebook page link or website link.",
          required: true,
        },
        { kind: "text", label: "Have any Custom Email Lists?", required: true },
        { kind: "text", label: "Have any specific geographic or demographic groups?", required: true },
        { kind: "text", label: "What type of content do you have?", required: true },
        {
          kind: "textarea",
          label: "Do you have a methodology or philosophy you can share with us?",
          required: true,
        },
      ],
    },
    {
      label: "Budget and timing",
      fields: [
        { kind: "text", label: "What is your monthly budget?", required: true },
        { kind: "text", label: "What is your daily budget?", required: true },
        { kind: "text", label: "Have any optimized landing page?", required: true },
        {
          kind: "text",
          label: "Are you looking for a long-term partner or short-term support?",
          required: true,
        },
        { kind: "text", label: "When are you looking to get started on this project?", required: true },
      ],
    },
  ],
  design: {
    labelStyle: "pill",
    accent: "bg-amber",
  },
  seo: {
    title: "Facebook Paid Ads Questionnaire",
    description:
      "Answer a few questions about your goals, audience and budget so we can build the best possible Facebook adverts for your business.",
  },
};

export const newWebsiteQuestionnaire: QuoteFormPage = {
  slug: "new-website-development-quotation-questionnaire",
  thankYou: "/quotation-questionnaire-thank-you",
  title: "New Website Development Quotation Questionnaire",
  intro:
    "These questions will make sure we have all of the correct details to be able to provide an accurate quotation for your website development project.",
  callHeading,
  submitLabel: "Submit Enquiry",
  groups: [
    {
      label: "The website",
      fields: [
        { kind: "textarea", label: "Purpose of the website" },
        { kind: "text", label: "Do you have a tagline?" },
        {
          kind: "checkbox",
          label: "What type of site do you want to build?",
          options: [
            "E-Commerce",
            "Small Business",
            "Corporate business",
            "Blog",
            "Professional services",
            "Other",
          ],
        },
      ],
    },
    {
      label: "Brand and research",
      fields: [
        {
          kind: "text",
          label: "Do you have any color preferences for the new website?",
          required: true,
        },
        { kind: "text", label: "Have you created buyer personas?", required: true },
        { kind: "textarea", label: "share your 3 competitor website link?", required: true },
      ],
    },
    {
      label: "Domain, hosting and brand assets",
      fields: [
        { kind: "text", label: "Are you buying domain and hosting?", required: true },
        { kind: "text", label: "Do you need help buy the right web host and domain?", required: true },
        {
          kind: "text",
          label: "Do you have a logo you plan to use or will one need to be created?",
          required: true,
        },
        { kind: "text", label: "Will you need a favicon created?", required: true },
      ],
    },
    {
      label: "Pages and content",
      fields: [
        {
          kind: "text",
          label: "How many pages will the finished website be (estimated)?",
          required: true,
        },
        { kind: "text", label: "Do you have the content for the website?", required: true },
        { kind: "text", label: "Will we be importing and formatting your content?", required: true },
        {
          kind: "text",
          label: "Will we need to find and/or create any images for the website?",
          required: true,
        },
      ],
    },
    {
      label: "Features and integrations",
      fields: [
        { kind: "text", label: "Do you require online chat features?", required: true },
        { kind: "text", label: "Do you require custom business email ?", required: true },
        { kind: "text", label: "Do you have or need an SSL certificate?", required: true },
        { kind: "text", label: "Do you need help setting up security measures?", required: true },
        { kind: "text", label: "Do you need multi-language support?", required: true },
        { kind: "text", label: "Do you need content publishing approval processes?", required: true },
        { kind: "text", label: "Does your site need a blog or a forum?", required: true },
        { kind: "text", label: "Do you need any social sharing features", required: true },
        {
          kind: "text",
          label: "Do you use a CRM to store sales and customer information?",
          required: true,
        },
        { kind: "text", label: "Do you have a Google Analytics account?", required: true },
        { kind: "text", label: "Do you have a Google Webmaster Tools Tools account?", required: true },
        { kind: "text", label: "Do you need assistance with search engine optimization?", required: true },
      ],
    },
    {
      label: "Timeline and budget",
      fields: [
        { kind: "text", label: "When do you want to start work on your new website?", required: true },
        { kind: "text", label: "When do you want it to go live?", required: true },
        { kind: "text", label: "What is your budget for this project?", required: true },
        { kind: "text", label: "Will you require training on how to properly maintain the site?" },
      ],
    },
  ],
  design: {
    labelStyle: "underline",
    accent: "bg-amber",
  },
  seo: {
    title: "New Website Development Quotation Questionnaire",
    description:
      "Answer the questions below so we have the correct details to provide an accurate quotation for your new website development project.",
  },
};

export const websiteRedesignQuestionnaire: QuoteFormPage = {
  slug: "website-redesign-project-questionnaire",
  thankYou: "/quotation-questionnaire-thank-you",
  title: "Website Redesign Project Questionnaire",
  intro:
    "These questions will make sure we have all of the correct details before we start your website development project.",
  callHeading,
  submitLabel: "Submit Enquiry",
  groups: [
    {
      label: "Why you're redesigning",
      fields: [
        { kind: "textarea", label: "Why do you want a new website ?" },
        { kind: "text", label: "What is the purpose of your running website?" },
        { kind: "textarea", label: "Describe the process for conversion as it is now.", required: true },
        { kind: "textarea", label: "Who are your top 3 competitors(if any)?", required: true },
      ],
    },
    {
      label: "Hosting and email",
      fields: [
        { kind: "text", label: "Where is your site currently hosted?", required: true },
        { kind: "text", label: "Are you looking to switch host?", required: true },
        {
          kind: "text",
          label: "Do you use custom email like g suite, godaddy, or webmail?",
          required: true,
        },
        { kind: "text", label: "Do you need help setting up security measures?", required: true },
      ],
    },
    {
      label: "Features and integrations",
      fields: [
        {
          kind: "text",
          label: "Do you use email marketing, landing page, or other tools on your site?",
          required: true,
        },
        {
          kind: "text",
          label: "Do you require multi-layer access permission for your website?",
          required: true,
        },
        { kind: "text", label: "Do you plan to post audio files to the site?", required: true },
        { kind: "text", label: "Will need log in on the site by using social logins?", required: true },
        { kind: "text", label: "Do you need to integrate chat features?", required: true },
        {
          kind: "text",
          label: "Do you want people to be able to share content from your website?",
          required: true,
        },
        { kind: "text", label: "Do you need assistance with search engine optimization?", required: true },
        { kind: "text", label: "Do you have a Google Analytics account?", required: true },
        { kind: "text", label: "Do you have a Google Webmaster Tools account?", required: true },
        { kind: "text", label: "Do you need multi-language support?", required: true },
        { kind: "text", label: "Do you need content publishing approval processes?", required: true },
      ],
    },
    {
      label: "Content and data",
      fields: [
        { kind: "text", label: "Do you currently have duplicate content on your site?", required: true },
        {
          kind: "text",
          label:
            "Will you be updating and reusing content and/or images from your current website?",
          required: true,
        },
        {
          kind: "text",
          label: "Do you use a CRM to store sales and customer information?",
          required: true,
        },
      ],
    },
    {
      label: "Budget and timeline",
      fields: [
        { kind: "text", label: "What is your budget for this project?", required: true },
        { kind: "text", label: "What’s the timeline?", required: true },
        { kind: "text", label: "When do you want it to go live?", required: true },
      ],
    },
  ],
  design: {
    labelStyle: "index",
    accent: "bg-teal",
  },
  seo: {
    title: "Website Redesign Project Questionnaire",
    description:
      "Answer the questions below so we have the correct details before we start your website redesign project.",
  },
};

export const quoteFormPages: QuoteFormPage[] = [
  ppcRequestQuote,
  seoRequestQuote,
  wordpressDevelopmentRequestQuote,
  wordpressMaintenanceRequestQuote,
  socialPaidRequestQuote,
  facebookAdsQuestionnaire,
  newWebsiteQuestionnaire,
  websiteRedesignQuestionnaire,
];

/* /omh-free-consultation is in the same phase but is not a form page — the live
   page is a Calendly booking landing page. Its copy lives here so the route file
   stays a thin wrapper like every other page in this rebuild. */
export const freeConsultation = {
  slug: "omh-free-consultation",
  title: "book your free consultation today!",
  subtitle: "Leave It to the experts!",
  intro:
    "OMH is an online marketing agency that focuses on providing a full range of Online Marketing Services. When we are successful, our clients are successful.",
  pricingCta: "View Pricing",
  bookingLabel: "LET US HELP YOU",
  bookingHeading: "BOOK A CALL AT A TIME CONVENIENT FOR YOU",
  awardsHeading: "We’re Awarded As",
  awards: ["Top UK PPC Agencies 2021", "Top UK B2B Companies 2021"],
  contactHeading: "Get In Touch",
  contactBody:
    "Need help with one of our services? Get in contact with our Customer Support Team.",
  phone: "+44 20 3489 3934",
  clientsHeading: "Our Happy Clients",
  clientsIntro:
    "Our experienced team cover the entire Marketing spectrum and are on hand to ensure your small business is taking full advantage of opportunities.",
  clients: [
    {
      name: "Oak Accounting",
      body: "Oak Accounting came to Online Marketing Help with the need for a new website, SEO and paid advertising.",
    },
    {
      name: "Max Silver Coaching",
      body: "Max Silver Coaching came to Online Marketing Help needing a landing page and paid advertising support.",
    },
  ],
  seo: {
    title: "OMH Free Consultation",
    description:
      "Book your free consultation with Online Marketing Help. Pick a time that suits you and talk through websites, SEO, PPC and paid social.",
  },
};

/* Every Phase 5 URL, for app/sitemap.ts. Kept out of `readyPages` on purpose:
   funnel pages belong in the sitemap but not in the header nav or site search. */
export const funnelPaths = [...quoteFormPages.map((p) => `/${p.slug}`), `/${freeConsultation.slug}`, "/get-more-leads"];
