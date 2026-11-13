/*
  Phase 7 of docs/legacy-pages-plan.md — /website-designs, the last legacy page.
  Copy follows the SEO page brief (Sep 2026: focus "web design company",
  secondary "company website design"). The gallery names and alt text are still
  verbatim from the live page, including "ecommerce Designs" in lower case.

  ◈ Live-site defect: the page's "CASE STUDIES" band is unfinished — five
  identical cards reading "Hospitality / It is a long established fact that a
  reader will be distracted by the readable content. / WEBSITE WEBSITE". That is
  lorem ipsum, not content, so it is NOT reproduced. The rebuild puts the real
  website case studies from case-studies.ts in that slot instead.
*/

export const websiteDesigns = {
  title: "Website Designs",
  heading: "Web design company for UK businesses",
  standfirst: "Professional website design built around your business",
  lead: "Online Marketing Help is a web design company creating professional, conversion-focused websites for businesses that want a stronger online presence and more enquiries.",
  statEyebrow: "Conversion-focused website design",
  statHeading:
    "Did you know that 70% of small businesses with a website do not have a clear CTA (call to action) on their homepage?",
  intro: [
    "Calls to action encourage visitors to take the next step, whether that is an enquiry, booking, or sale. As a web design company, Online Marketing Help builds websites with conversions in mind. Below are examples of website designs and themes we have created for existing clients.",
    "We can build a fully custom website or professionally customise a theme template to give your business the right balance of design, usability and performance.",
  ],
  ctas: {
    consultation: "Book a free consultation",
    help: "How we can help",
    contact: "Get in touch",
    caseStudies: "Case studies",
  },

  help: {
    // Client audit, 26 Oct 2026: the sector list became icon cards with this heading and intro.
    eyebrow: "Who we work with",
    heading: "WordPress Website Design for Your Industry",
    intro: "Every sector has its own customers, questions and reasons to get in touch. We plan the pages, content and enquiry routes around how people in your industry actually choose a provider.",
    tradesTitle: "Trades and local services",
    tradesCta: "Don’t see yours? Ask us",
    sectors: [
      "Construction Websites",
      "Accountancy Websites",
      "eCommerce Websites",
      "Non-Profit Websites",
      "Marketing Websites",
      "Fitness Websites",
      "Cleaning Websites",
      "Legal Websites",
      "Medical Websites",
      "Real Estate Websites",
      "Nightclub Websites",
      "Restaurant Websites",
    ],
    tradesLead:
      "Whether you offer landscaping services, work as an electrician, or run a professional firm, our company website design service can help you create a website that clearly showcases what you do and makes it easy for customers to take action.",
    trades: [
      "Bricklayer",
      "Tiler",
      "Electrician",
      "Plumber",
      "Landscape Gardener",
      "Architect",
      "Builders’ Merchant",
      "Carpenter",
      "Building Surveyor",
      "and much more…",
    ],
  },

  gallery: {
    eyebrow: "Portfolio",
    heading: "Website designs we have created for UK businesses",
    /* The live page's own 38 theme screenshots — filename and alt text as
       published (except the ninth accountancy shot, where the live site repeats
       the eighth image's alt; corrected here).

       ◈ These CANNOT be hotlinked from onlinemarketinghelp.co.uk. Cloudflare
       answers cross-origin requests with its bot-check page, so Next's image
       optimizer gets a 400 ("not a valid image") and a visitor's browser gets an
       HTML page instead of a JPEG — verified, all 38 fail. On the live site they
       work only because the visitor already holds a Cloudflare clearance cookie
       for that domain.

       To switch the gallery on: download these 38 files from the WordPress media
       library into `public/images/website-designs/`, set `base` to
       "/images/website-designs/", and render `<Image src={base + file} />` in
       WebsiteDesignsSections.tsx in place of the frame-and-list fallback. */
    /* Flipped to true by scripts/import-uploads.mjs once the files are in
       public/images/website-designs/. Until then the section renders a frame
       plus the theme names instead of 38 broken images. */
    galleryReady: true,
    base: "/images/website-designs/",
    categories: [
      {
        title: "Accountancy Firm Designs",
        images: [
          { file: "Modern-and-Efficient-Accounting-Online-Marketing-Help-Theme.jpg", alt: "Modern and Efficient Accounting Online Marketing Help Theme" },
          { file: "Sophisticated-Online-Marketing-Assistance-Theme-for-Accountancy-Websites.jpg", alt: "Sophisticated Online Marketing Assistance Theme for Accountancy Websites" },
          { file: "Conversion-Boosting-Marketing-Support-Theme-for-Accountants.jpg", alt: "Conversion-Boosting Marketing Support Theme for Accountants" },
          { file: "Dynamic-and-Engaging-Marketing-Solutions-for-Accounting-Sites.jpg", alt: "Dynamic and Engaging Marketing Solutions for Accounting Sites" },
          { file: "Crisp-and-Results-Driven-Online-Marketing-Help-Theme-for-Accountancy-Sites.jpg", alt: "Crisp and Results-Driven Online Marketing Help Theme for Accountancy Sites" },
          { file: "Clean-and-Professional-Accounting-Website-Theme-Design-for-Online-Marketing-Help.jpg", alt: "Clean and Professional Accounting Website Theme Design for Online Marketing Help" },
          { file: "User-Friendly-Online-Marketing-Support-Design-for-Accounting-Firms.jpg", alt: "User-Friendly Online Marketing Support Design for Accounting Firms" },
          { file: "Sleek-and-Trusted-Accounting-Website-Theme-with-Online-Marketing-Aid.jpg", alt: "Sleek and Trusted Accounting Website Theme with Online Marketing Aid" },
          { file: "Responsive-Online-Marketing-Assistance-Theme-Tailored-for-Accountants.jpg", alt: "Responsive Online Marketing Assistance Theme Tailored for Accountants" },
        ],
      },
      {
        title: "Hospitality Designs",
        images: [
          { file: "Hospitality-Theme-Online-Marketing-Help-UK.jpg", alt: "Hospitality Theme Online Marketing Help UK" },
          { file: "Essex-web-designer-Website-Theme.jpg", alt: "Essex web designer Website Theme" },
          { file: "Dark-hospitality-website-theme.jpg", alt: "Dark hospitality website theme" },
          { file: "Bar-Restaurant-Website-Theme.jpg", alt: "Bar Restaurant Website Theme" },
          { file: "Hospitality-Theme-Online-Marketing-Help.jpg", alt: "Hospitality Theme Online Marketing Help" },
          { file: "Restaurant-Website-Theme.jpg", alt: "Restaurant Website Theme" },
        ],
      },
      {
        title: "Construction Designs",
        images: [
          { file: "WordPress-Website-Theme-Essex-Construction.png", alt: "WordPress Website Theme Essex Construction" },
          { file: "WordPress-Website-Theme.png", alt: "WordPress Website Theme" },
          { file: "WordPress-Website-Theme-Essex.png", alt: "WordPress Website Theme Essex" },
          { file: "Brand-New-Website-Development.png", alt: "Brand New Website Development" },
          { file: "WordPress-Website-Theme-Essex-Team.png", alt: "WordPress Website Theme Essex Team" },
          { file: "New-Website-Theme-Design-Experts-Essex-UK.png", alt: "New Website Theme Design Experts Essex UK" },
          { file: "UK-WordPress-Website-Theme-Experts.png", alt: "UK WordPress Website Theme Experts" },
          { file: "New-Website-Theme-Design.png", alt: "New Website Theme Design" },
          { file: "New-Website-Theme-Design-Experts-UK.png", alt: "New Website Theme Design Experts UK" },
        ],
      },
      {
        title: "Legal Firm Designs",
        images: [
          { file: "Legal-Firm-Website-Design-Essex.jpg", alt: "Legal Firm Website Design Essex" },
          { file: "Legal-Firm-Website-Design-Light-Essex.jpg", alt: "Legal Firm Website Design Light Essex" },
          { file: "Legal-Firm-Website-Design-Professional-Theme.jpg", alt: "Legal Firm Website Design Professional Theme" },
          { file: "Legal-Firm-Website-Design-Custom-Site.jpg", alt: "Legal Firm Website Design Custom Site" },
          { file: "Legal-Firm-Website-Design-Dark-Website-Scratch.jpg", alt: "Legal Firm Website Design Dark Website Scratch" },
          { file: "Legal-Firm-Website-Design-Uk-Designer.jpg", alt: "Legal Firm Website Design Uk Designer" },
        ],
      },
      {
        title: "ecommerce Designs",
        images: [
          { file: "Sleek-and-Modern-eCommerce-Website-Theme-Design-for-Online-Marketing-Help.jpg", alt: "Sleek and Modern eCommerce Website Theme Design for Online Marketing Help" },
          { file: "User-Friendly-Online-Marketing-Support-Design-for-eCommerce-Stores.jpg", alt: "User-Friendly Online Marketing Support Design for eCommerce Stores" },
          { file: "Responsive-eCommerce-Marketing-Assistance-Design.jpg", alt: "Responsive eCommerce Marketing Assistance Design" },
          { file: "High-Performance-Online-Marketing-Help-Theme-for-E-commerce.jpg", alt: "High-Performance Online Marketing Help Theme for E-commerce" },
          { file: "Efficient-Online-Marketing-Tools-and-Resources-for-eCommerce.jpg", alt: "Efficient Online Marketing Tools and Resources for eCommerce" },
          { file: "Dynamic-and-Engaging-Online-Marketing-Solutions-for-E-commerce.jpg", alt: "Dynamic and Engaging Online Marketing Solutions for E-commerce" },
          { file: "Contemporary-eCommerce-Marketing-Aid-Website-Theme.jpg", alt: "Contemporary eCommerce Marketing Aid Website Theme" },
          { file: "Vibrant-Online-Marketing-Assistance-Theme-with-Elegance-for-eCommerce.jpg", alt: "Vibrant Online Marketing Assistance Theme with Elegance for eCommerce" },
        ],
      },
    ] as { title: string; images: { file: string; alt: string }[] }[],
  },

  pricing: {
    eyebrow: "Custom Pricing",
    heading: "Transparent website design pricing for small businesses that want to grow",
    body: [
      "With our web design services, we offer everything from custom-built WordPress websites to professional theme customisation. We also work on a white-label basis for companies that need this service but do not have an in-house development team, as well as businesses that know what they want from a website but need help bringing everything together. We will recommend the most suitable package based on your specific needs.",
      "We specialise in company website design tailored to your brand, objectives, and required functionality. Every project starts with a clear understanding of what the website needs to achieve. From there, we recommend the right design and development approach, whether that means a completely bespoke build or a carefully customised theme.",
      "Our pricing reflects the complexity of the project and the features you actually need, so you are not paying for unnecessary functionality. The goal is to create a professional website that looks distinctive, works smoothly, and supports the way your business wants to grow online.",
    ],
  },

  contact: {
    eyebrow: "Get in touch",
    heading: "Need help with your website?",
    body: "Tell us what the website needs to do and what is getting in the way. A real person reviews every enquiry and comes back with a practical next step.",
    phone: "+44 20 3489 3934",
  },

  consultation: {
    eyebrow: "Free Consultation",
    heading: "Book a free consultation at a time that works for you.",
  },

  guarantee: {
    eyebrow: "Guarantee",
    heading: "Don't just take our word for it",
    body: [
      "After years of experience, we are confident in the service and support we provide. Our aim is to help with the technical side of your website and give you clear, practical guidance throughout the project. To show our confidence in what we do, our CEO offers a money-back guarantee designed to make the decision to work with our web design company a little easier.",
      "Start working with Online Marketing Help today and take the next step towards a website that supports your business goals.",
    ],
    // Each point restates the guarantee copy above; the terms live on /warranty.
    points: [
      ["Clear scope before we start.", "You know what will be delivered, when, and for how much."],
      ["Practical guidance throughout.", "We handle the technical side and explain each decision in plain English."],
      ["A money-back guarantee from our CEO.", "If we do not deliver what we agreed, the guarantee protects you. Read the terms for the details."],
    ] as [string, string][],
  },

  caseStudies: {
    eyebrow: "Case studies",
    heading: "Web design projects and what changed after launch",
    cta: {
      eyebrow: "Your project",
      heading: "Could your website be our next case study?",
      body: "Tell us what your site needs to do and we will show you how we would approach it.",
      label: "Book a free consultation",
    },
  },

  related: [
    { title: "WordPress Development", href: "/wordpress-development", body: "The build itself: new sites, redesigns, landing pages and the functionality behind them, from £200." },
    { title: "WordPress Website Maintenance", href: "/wordpress-website-maintenance", body: "Updates, backups, monitoring and support once the site is live, from £300 a month." },
    { title: "Search Engine Optimisation", href: "/seo-services", body: "Plan the pages, content and technical setup so the new site can be found for the right searches." },
  ],

  // Answers draw on the WordPress development page's published packages and process.
  faqs: [
    ["How much does a website design cost?", "Our WordPress website packages start at £200 and are published on the [pricing page](/pricing). The final scope depends on pages, content, functionality and support requirements, and we recommend the right package during the free consultation."],
    ["How long does a new website take?", "Package turnaround times start from 4 weeks once content and decisions are in place. Larger builds are scoped properly before a date is agreed."],
    ["Do you design custom websites or customise themes?", "Both. We can build a fully custom WordPress website or professionally customise a theme template, depending on the budget, the brand and what the site needs to do."],
    ["Will I be able to edit the website myself?", "Yes. The sites are built in WordPress so day-to-day content changes can be made without a developer. Advanced layouts, integrations and features may still need support."],
    ["Can you redesign my existing website?", "Yes, once we have reviewed the current site and understood what the redesign needs to achieve. We also fix sites built by other developers after a review of the setup, plugins, theme and hosting."],
    ["What happens after the website launches?", "You can add a [WordPress maintenance package](/wordpress-website-maintenance) for updates, backups and monitoring, and our [SEO](/seo-services) and [Google Ads](/google-adwords-ppc) services can bring the right visitors to the new site."],
  ] as [string, string][],

  reviewsHeading: "What customers say about working with OMH",

  finalCta: {
    title: "Let's design the website your business actually needs.",
    body: "Tell us what the website needs to do (sell, book or generate enquiries) and we will recommend the right approach, whether that is a custom build or professional theme customisation, with pricing that fits.",
  },

  seo: {
    // Rendered as an absolute title: it already ends in "| OMH".
    title: "Web Design Company UK | Business Website Design | OMH",
    description:
      "Looking for a UK web design company? OMH creates conversion-focused business websites, from custom WordPress to e-commerce. Book a free consultation.",
  },
};
