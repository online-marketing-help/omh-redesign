import { CASE_STUDIES_LIVE } from "@/lib/flags";
// Verbatim copy from the live /facebook-marketing-agency/ and
// /instagram-marketing-agency/ pages (docs/legacy-pages-plan.md Phase 3).
//
// The two live pages are byte-for-byte the same content (Elementor page IDs
// 12307 and 12309 render an identical template with identical copy), so one
// content object is the verbatim base. Each route now spreads its own SEO
// rewrite over it (`instagramLanding`, `facebookLanding` below).
//
// Only line-break normalisation was applied: the "packages" notes are one
// sentence flow that Elementor splits across five <p> tags mid-clause. The
// wording is unchanged.
//
// Not reproduced, because the live sections carry no copy of their own: the
// award-logo galleries, the pricing table (empty widget on the live page — the
// pricing heading has no table under it), the case-study carousel (placeholder
// lorem text) and the Calendly embed.

export const socialLanding = {
  eyebrow: "Online Marketing Help",
  title: "Social Media Marketing for Businesses",
  subtitle: "Grow Brand Awareness, Engagement, Traffic and Sell",
  standfirst:
    "We have a team of experienced SMM & SMO experts that can support the growth of your social channels and also work towards generating brand awareness and traffic. SMO with a well organise strategy and clear goals can be a great way to keep advertising costs low and create a great ROI.",
  ctas: { consultation: "Book a Free Consultation", pricing: "View Pricing" },

  jump: [
    { label: "Need Help?", href: "#need-help" },
    { label: "How We Can Help", href: "#how-can-help" },
    { label: "Get In Touch", href: "#get-in-touch" },
    { label: "Packages", href: "#packages" },
    ...(CASE_STUDIES_LIVE ? [{ label: "Case Studies", href: "#case-studies" }] : []),
  ],

  goals: {
    label: "Need Help",
    title: "DEFINING SOCIAL MEDIA MARKETING GOALS",
    body: "Social media marketing includes activities like posting text and image updates, videos and and other content that drives audience engagement, as well as paid social media advertising. Before you begin creating social media marketing campaigns, consider your businesses goals. Starting a social media marketing campaign without a social strategy in mind is like wandering around a forest without a map.",
    questions: [
      "What are you hoping to achieve through social media marketing?",
      "Who is your target audience?",
      "Where would your target audience hang out and how would they use social media?",
      "What message do you want to send to your audience with social media marketing?",
    ],
    didYouKnow: {
      heading: "Did You Know?",
      body: "91% of social media users are accessing social channels via mobile devices. Facebook has more than 2 billion active users.",
    },
  },

  help: {
    label: "How",
    title: "We Can Help With Social Media Marketing Support",
    items: [
      {
        term: "Original social media posts",
        body: "We can support your online brand with content creation and assets to be able to showcase your product or service in a clear and on brand way. We have a team of experienced Graphic Designers that will be able to build up the look and feel of your brand to achieve your desired goal.",
      },
      {
        term: "Custom images design",
        body: "Online Marketing Help has a team of expert designers that can help create bespoke on brand custom images. If you want some eye-catching ad creative or templates for your social media marketing we can help you with a tailored package that suits your needs.",
      },
      {
        term: "Cover & profile photo design",
        body: "Cover and profile photos are generally the first thing your potential client will see which is why these are such important factors for your social profiles. We will help you create a clear and seamless design to make sure that your online accounts flow and link nicely.",
      },
      {
        term: "Social account optimisation",
        body: "SMO is exactly that, it is the optimisation of your social media through a number of different methods. It is the process of creating awareness about your product or service through using all of the various social channels such as Instagram, facebook, Twitter. We can talk you through the best package of Social account optimisation once we have reviewed what you have in place.",
      },
      {
        term: "Social media account audit",
        body: "You may not be new to Social Media and have an existing business account that might just need a little refresh. We can have a look at all of your existing social media accounts and best recommend you how to improve your account. Your social media may be one of the first representations of your business your potential client may see so it is important that this is consistent with the rest of your online accounts.",
      },
      {
        term: "Brand reputation analysis",
        body: "Customers will be talking about you to other potential customers on online forums and review groups. It is important that you keep on top of reviews (Good and Bad) and show your customers that you care. Our Social Media Managers will make sure they are looking for potential opportunities or problems online and deal with it in your tone of voice. We will of course pass on important reviews for you to manage and handle as well.",
      },
    ],
  },

  getInTouch: {
    label: "Get in touch",
    title: "Need Help With One Of Our Services?",
    telLabel: "+44 20 3489 3934",
  },

  packages: {
    label: "Packages",
    title: "Transparent Pricing That Are Perfect For Small Businesses That Want To Grow",
    subtitle:
      "With our website maintenance packages we will maintain your website and keep it upto date including 24/7 monitoring. We will advise you which package will be suitable for your requirements. This option is perfect for businesses that want peace of mind about their site.",
    notes: [
      "These packages include copy writing and content creation. The content we create will be inline with your existing brand if you don’t have a brand pallet we can help guide you with this. Our Social Media Marketing packages do not included as standard brand pallet creation so your account manager will discuss the packages available for this service should you need this.",
      "All designs for social media creative come with 1 review. We may use the same content across different platforms but will make sure it is optimised accordingly. The above packages are on a minimum 3 month basis.",
    ],
  },

  guarantee: {
    label: "Guarantee",
    title: "Don't Just Take Our Word For It",
    body: [
      "We are confident after years of experience that we will be able to deliver on our promise which is to support you in whatever way necessary with your technical support on your website. To show our fait in our capabilities at Online Marketing Help and our team our CEO wants to offer a you a money back guarantee to help make that decision to work with us a little easier.",
      "Start workint with Online Marketing Help today to bring your business to the next level. You deserve it.",
    ],
  },

  resources: {
    label: "Resources",
    title: "Looking For More Information?",
    subtitle:
      "Landed here because you want more information about Social Media Marketing. Well look no further.",
    items: [
      {
        term: "Monthly consultations",
        body: "Our expert team at Online Marketing Help understands how important it is to know what you are paying for when you have instructed a company to work on your behalf. With this in mind we make sure you get regular monthly updates on what we have achieved with a monthly consultation call. This isn’t to say you can’t get in touch before that but our experience shows that we will have collected enough data and information to be able to give you a good overview of what your account is doing and where your goal objectives are sitting and whether we are meeting them or surpassing them. Like everything the more time you give the process the more we will be able to optimise and build on the success.",
      },
      {
        term: "Transparent monthly reports",
        body: "We don’t want to bore you with the bits that aren’t relevant so we will show you a tailor made report based on the goals you have set with your customer care account manager. If you want a better understanding on a certain part of the work you have instructed us on then you can just let your account manager know on your monthly consultation call. Our goal is to showcase the achievements and successes we have delivered for you month on month and to showcase the progress achieved.",
      },
    ],
  },

  reviews: { title: "What Our Customers Say", subtitle: "After Working With Us" },

  faq: {
    label: "FAQ's",
    title: "Looking For More Information",
    items: [
      {
        q: "What other services do you offer?",
        a: "We are a full 360 website development and online marketing agency. We have marketers who solely specialise in Social Media Marketing. We offer all related services within social media, from strategy writing to content creation and management. Please have a look at our Social Media Marketing Case Studies, you will be able to see the kind of work we do and have done in the past, we have off the shelf marketing support or we can design a customised offer for you.",
      },
      {
        q: "How long will it take to start seeing results?",
        a: "It depends if you have opted for Pay Per Click Social Media Marketing support or if we are building up organic engagement and then what your goals are. You will almost instantly start seeing clicks and views from your campaign. In terms of conversions, like all things with advertising it takes time to see the best results. Typically most clients end up seeing a more steady stream of conversions during the 4-6 week period if we have built a paid advertising campaign, it can be considerably longer if we are doing this through engagement only posting on your pages. That being said we work out a strategy for you that best suits your budget and goals.",
      },
      {
        q: "How many times do you post content?",
        a: "This really does depend on the package you have signed up for with your account manager. We will best advise you what is appropriate for your style business and your business goals. When we post content to your Facebook page, it will be the same piece of content that will be sent to your other social media accounts.",
      },
      {
        q: "What kind of content do you post?",
        a: "Before we post anything we send it over for your approval and review. We do extensive research on your business and industry. Our content posts are made up of the following: Brand Message + Designed Graphic + Call-to-Action + Hashtags + External Links. If you have specific content that you need to be included we can make sure this is apart of the scheduled posts and your wider Social Media Strategy.",
      },
      {
        q: "Can I review the content before you post?",
        a: "Yes, before we schedule your campaign we send the newly designed social posts for your approval once these have been scheduled we will confirm this as well.",
      },
      {
        q: "Will you provide reports so we can track progress?",
        a: "Yes we will provide reporting showing you the progress every month. This will be a monthly analytics report.",
      },
      {
        q: "What is a monthly analytics report?",
        a: "A monthly analytics report is a document detailing all of the information about numbers of followers, likes, comments, posts and other vital statistics regarding your social media, to track the progress that has been made. This information also suggests ways to move forward with paid ads from our specialists at Online Marketing Help.",
      },
      {
        q: "What social media platforms do you offer support for?",
        a: "We can support you with Facebook, Instagram, LinkedIn and Youtube. Let’s chat. Message us today to discuss your project!",
      },
      {
        q: "How will you know what to post?",
        a: "We will send you a brief that you can fill out with all of your company information and brand vision. From there, we will make sure we understand how to respect your brand voice, creative and ultimately speak with your potential clients the way that you would. We will also research your industry before starting and you will be able to approve the content before it’s live.",
      },
      {
        q: "Can I request additional posts?",
        a: "Yes! We can definitely make you a custom proposal with additional posts if you are looking for a different Social Media Management to what we offer as standard.",
      },
      {
        q: "What is a custom social media strategy?",
        a: "There is a little more to just posting everyday and hoping for the best. We provide a comprehensive social media strategy customised for your business. We’ll perform a social audit, research your industry, trending hashtags, top influencers, competitor analysis, content marketing concepts, content calendar and custom action plan.",
      },
    ],
  },

  solutions: {
    label: "Solutions",
    title: "Our Services Are Goal Focussed",
    links: [
      { label: "Social Media Management", href: "/social-media-marketing-services" },
      { label: "Google Paid Advertising", href: "/google-adwords-ppc" },
      { label: "Search Engine Optimisation", href: "/seo-services" },
      { label: "Website Maintenance", href: "/wordpress-website-maintenance" },
      { label: "WordPress Development", href: "/wordpress-development" },
    ],
  },

  consultation: {
    label: "Free Consultation",
    title: "Let Us Help You Book A Call At A Time Convenient For You",
    accent: "Book A Call At A Time Convenient For You",
  },
} as const;

// /instagram-marketing-agency carries the SEO rewrite from the Instagram
// implementation guide (29 Sep 2026), spread over the verbatim copy above.
export const instagramLanding = {
  ...socialLanding,
  title: "Instagram Marketing Agency for UK Businesses",
  titleAccent: "UK Businesses",
  subtitle: "Grow Your Brand on Instagram with Reels, Ads and Organic Strategy",
  standfirst:
    "We are an Instagram marketing agency that helps UK businesses turn Instagram into a genuine revenue channel. Our team builds Instagram ad campaigns, creates Reels and carousel content, manages your account day to day, and reports on what is actually working. Whether you need paid Instagram ads to drive leads or a consistent organic posting strategy to build your audience, we handle the lot.",
  ctas: { consultation: "Get a Free Instagram Audit", pricing: "View Instagram Packages" },

  creative: {
    title: "Instagram Content Built for Every Format",
    body: "Feed posts, Stories, Reels and carousels each have their own dimensions, pace and audience behaviour. We design every piece of Instagram content for the format it will appear in, so nothing looks cropped, rushed or recycled.",
  },

  goals: {
    ...socialLanding.goals,
    title: "Defining Your Instagram Marketing Goals",
    body: "Instagram marketing covers everything from organic content (Reels, carousels, Stories, static posts) to paid Instagram ads and influencer partnerships. Before we build your Instagram strategy, we work out what success looks like for your business. Starting an Instagram campaign without a clear commercial goal behind it wastes budget and produces vanity metrics that do not convert.",
    questions: [
      "What commercial outcome do you want from Instagram: leads, sales, bookings or brand awareness?",
      "Who is your target audience on Instagram, and what content format do they engage with most?",
      "Are you looking for paid Instagram advertising, organic growth, or both?",
      "Do you have existing Instagram content and brand assets we can build on?",
    ],
    didYouKnow: {
      ...socialLanding.goals.didYouKnow,
      body: "Instagram has over 2 billion monthly active users worldwide. In the UK alone, 35.1 million people use Instagram every month, and Reels now account for over 50% of time spent on the platform. For businesses, Instagram delivers 4x more interactions per follower than Facebook.",
    },
  },

  help: {
    ...socialLanding.help,
    title: "Our Instagram Marketing Services",
    items: [
      {
        term: "Instagram Reels and Content Creation",
        body: "We plan, shoot and edit Instagram Reels, carousels and static posts that match your brand and speak to your audience. Every piece of content is designed for Instagram first, not resized from another platform. Our designers and editors produce scroll-stopping visuals that drive saves, shares and profile visits.",
      },
      {
        term: "Instagram Ad Creative and Design",
        body: "Our design team creates Instagram ad creative for Stories, Reels and feed placements. Every asset is built to Instagram’s specs, with proper safe zones, text overlay limits and aspect ratios. Whether you need a single campaign or an ongoing library of ad templates, we deliver creative that performs.",
      },
      {
        term: "Instagram Profile and Bio Optimisation",
        body: "Your Instagram profile is the first thing a potential customer sees. We optimise your bio with a clear value proposition, the right keywords and a strong call to action. We design a profile photo that is recognisable at thumbnail size and build a Highlights structure that works like a mini website for your brand.",
      },
      {
        term: "Paid Instagram Ads Management",
        body: "As an experienced Instagram ads agency, we build and manage paid campaigns across Stories, Reels, Explore and feed placements. We handle audience targeting, budget allocation, A/B testing of creative, and ongoing optimisation to bring your cost per lead or cost per sale down month on month. Every campaign is tied to a commercial goal, not just impressions.",
      },
      {
        term: "Instagram Account Audit",
        body: "Already posting but not seeing results? We carry out a full Instagram account audit covering your profile setup, content mix, posting frequency, hashtag strategy, engagement rate and follower quality. You get a written report with specific actions to fix what is underperforming, plus a benchmark against competitors in your sector.",
      },
      {
        term: "Instagram Analytics and Reporting",
        body: "We track every metric that matters: reach, engagement rate, follower growth, Story completion rate, Reel plays, link clicks and conversions. Each month you get a clear report showing what worked, what did not, and what we are changing for the next cycle. No jargon, no vanity metrics. Just the numbers that tell you whether Instagram is making your business money.",
      },
    ],
  },

  why: {
    label: "Why OMH",
    title: "Why Choose OMH as Your Instagram Marketing Agency",
    body: [
      "Businesses across the UK choose OMH as their Instagram marketing company because we do not treat Instagram as an afterthought bolted onto a wider social media retainer. Instagram is a standalone channel with its own algorithm, content formats and audience behaviour, and it deserves a dedicated strategy.",
      "As an Instagram advertising agency based in Essex, we work with small and mid-sized businesses across the UK. We combine organic content (Reels, carousels, Stories) with paid Instagram advertising to build your audience and convert followers into customers.",
    ],
    points: [
      "Dedicated Instagram strategist on every account, not a generalist managing five platforms at once",
      "Content designed for Instagram first: proper aspect ratios, trending audio, native features like polls and stickers",
      "Transparent monthly reporting tied to your commercial goals, not follower counts",
      "Instagram ads management with clear ROAS targets and ongoing creative testing",
      "UK-based team in Essex with direct access to your account manager by phone and email",
    ],
  },

  process: {
    label: "How it works",
    title: "How Our Instagram Marketing Service Works",
    steps: [
      ["Instagram Audit and Strategy", "We start by reviewing your current Instagram account, competitor landscape and target audience. From there we build a strategy document covering content pillars, posting cadence, hashtag clusters and paid ad structure."],
      ["Content Creation and Approval", "Our team creates Reels, carousels, Stories and static posts for the month ahead. Everything is sent to you for approval before it goes live. We handle the design, copywriting and scheduling."],
      ["Publishing, Ads and Community Management", "We publish content at optimal times, launch and manage any paid Instagram ad campaigns, and handle community engagement (responding to comments and DMs in your brand voice)."],
      ["Reporting and Optimisation", "Each month you receive a clear report showing reach, engagement, follower growth, ad spend and conversions. We use this data to refine the strategy for the following month. No long-term guesswork, just continuous improvement based on real numbers."],
    ],
  },

  packages: {
    ...socialLanding.packages,
    title: "Instagram Marketing Packages for Growing Businesses",
    // The guide's body copy, split at a sentence break into the band's intro and two notes.
    subtitle:
      "Our Instagram marketing packages include content creation, scheduling, community management and monthly reporting.",
    notes: [
      "Every piece of content is designed for Instagram and aligned with your brand. If you do not have brand guidelines in place, your account manager can walk you through setting those up as a separate project.",
      "All Instagram creative comes with one round of revisions. We optimise content for each placement (feed, Stories, Reels) rather than posting the same asset everywhere. Packages run on a minimum three-month basis so we have enough time to test, learn and scale what works.",
    ],
    cta: "See Instagram Pricing",
  },

  caseStudies: {
    title: "See the Work Behind the Results",
    body: "Instagram, social and search projects we have delivered for UK businesses.",
  },

  guarantee: {
    ...socialLanding.guarantee,
    body: [
      "We are confident in the results our Instagram marketing delivers. To show our faith in our team and process, our CEO offers a money-back guarantee to make your decision to work with us a little easier.",
      "Start working with Online Marketing Help today and turn Instagram into a genuine growth channel for your business.",
    ],
  },

  faq: {
    ...socialLanding.faq,
    items: [
      { q: "What does an Instagram marketing agency actually do?", a: "An Instagram marketing agency handles everything your business needs on the platform: content strategy, Reels and carousel creation, paid Instagram ads, community management, analytics and reporting. At OMH, we assign a dedicated Instagram strategist to your account who builds a tailored plan, creates on-brand content, manages your ad campaigns and reports on results every month." },
      { q: "How long does it take to see results from Instagram marketing?", a: "With paid Instagram ads, you can expect to see initial traffic and engagement within the first week. Meaningful conversion data typically builds over 4 to 6 weeks as we test audiences and creative. For organic Instagram growth, expect steady follower and engagement increases from month two onwards, with compounding results over 3 to 6 months." },
      { q: "How many Instagram posts do you publish per week?", a: "This depends on your package. Most clients receive between 3 and 5 feed posts per week, plus daily Stories. Reels are typically produced 2 to 4 times per month. Your account manager will recommend a cadence based on your audience size, goals and budget." },
      { q: "What kind of Instagram content do you create?", a: "We create Reels (short-form video), carousel posts (multi-image swipe posts), single-image feed posts, Stories and Story Highlights. Every piece is designed for Instagram natively, with proper dimensions, on-brand visuals and copy that includes a clear call to action and relevant hashtags. We send everything for your approval before publishing." },
      { q: "Can I review Instagram content before it goes live?", a: "Yes. We send all content for your review and approval before scheduling. You will see the visual, caption, hashtags and posting time. Once approved, we schedule and publish everything. If you need changes, we include one round of revisions on all creative." },
      { q: "How do you measure Instagram marketing success?", a: "We track the metrics that matter for your goals: reach, engagement rate, follower growth, Story completion rate, Reel plays, website clicks, leads and sales. You receive a monthly report with a plain-English summary of what worked, what underperformed and what we are adjusting. We also schedule a monthly call to walk through the numbers together." },
      { q: "Do you manage paid Instagram ads as well as organic content?", a: "Yes. We are an Instagram ads agency as well as a content and management agency. We build, launch and optimise paid campaigns across Instagram Stories, Reels, Explore and feed placements. We handle audience targeting, budget pacing, creative testing and reporting. Organic content and paid ads work together in our strategy." },
      { q: "How much does an Instagram marketing agency cost?", a: "Our Instagram marketing packages start from a level that works for small businesses and scale up depending on the volume of content, ad spend and level of account management you need. We offer transparent monthly pricing with no hidden fees. Get in touch for a custom quote based on your goals." },
      { q: "Why should I hire an Instagram marketing agency instead of doing it in-house?", a: "Running Instagram well takes consistent content production, creative design, community management, ad management and analytics. Most small business owners do not have the time or the specialist tools to do all of that alongside running their business. An Instagram marketing company like OMH gives you a dedicated team that handles the full workload, stays on top of algorithm changes and applies what works across our other client accounts to yours." },
      { q: "What Instagram services does OMH offer?", a: "We offer a full range of Instagram marketing services: content strategy, Reels and carousel creation, Instagram Stories, profile and bio optimisation, paid Instagram advertising, hashtag research, community management (comments and DMs), influencer collaboration support, Instagram Shopping setup, account audits and monthly analytics reporting." },
    ],
  },

  consultation: {
    ...socialLanding.consultation,
    title: "Ready to Grow Your Business on Instagram?",
    accent: "on Instagram?",
  },
} as const;

// /facebook-marketing-agency carries the SEO rewrite from its implementation
// guide (28 Sep 2026). Not applied from that guide: the case-study heading and
// the reviews sub-heading, which would present the existing (non-Facebook)
// case studies and testimonials as Facebook results.
export const facebookLanding = {
  ...socialLanding,
  title: "Facebook Marketing Agency for Growing UK Businesses",
  titleAccent: "Growing UK Businesses",
  standfirst:
    "We are a Facebook marketing agency that helps UK businesses get more from their Facebook presence. Our team handles page management, content creation, Facebook Ads campaigns and community engagement so your Facebook channel drives real enquiries and revenue.",
  ctas: { consultation: "Discuss Facebook Marketing", pricing: "View Facebook Packages" },

  goals: {
    ...socialLanding.goals,
    title: "Defining Your Facebook Marketing Goals",
    body: "Facebook marketing covers a wide range of activities: organic posts, Stories, Reels, Facebook Ads, group management, Messenger outreach and community engagement. Before launching a Facebook marketing campaign, your goals need to be clear. A Facebook marketing agency starts every project by asking four questions about what you want Facebook to achieve for your business.",
    questions: [
      "What do you want Facebook to deliver for your business: leads, sales, brand awareness or community?",
      "Who is your ideal customer, and are they active on Facebook?",
      "Are you looking for organic reach, paid Facebook Ads, or both?",
      "What budget and timeline are you working with?",
    ],
    didYouKnow: {
      ...socialLanding.goals.didYouKnow,
      body: "Facebook has over 3 billion monthly active users worldwide, making it the largest social media platform by a wide margin. In the UK, 44 million people use Facebook, with the 25-44 age group representing the largest share of business decision-makers on the platform.",
    },
  },

  help: {
    ...socialLanding.help,
    title: "Facebook Marketing Services We Offer",
    intro:
      "Everything your business needs from a dedicated Facebook marketing company, handled by our in-house team of Facebook marketing experts.",
    items: [
      {
        term: "Facebook content creation",
        body: "We write and design Facebook posts, Stories and Reels that reflect your brand and speak to your audience. Each piece of content is planned around your goals, whether that is driving traffic to your website, generating comments and shares, or promoting a product launch. Your Facebook marketing expert builds a content calendar so posting is consistent and aligned to your wider marketing activity.",
      },
      {
        term: "Facebook Ads management",
        body: "We set up, manage and optimise Facebook Ads campaigns across every objective: awareness, traffic, leads and conversions. Our Facebook ads marketing agency team handles audience building with Custom Audiences and Lookalike Audiences, ad creative design, A/B testing, budget allocation and ROAS reporting. You get a clear picture of what every pound spent returns.",
      },
      {
        term: "Facebook page setup and branding",
        body: "Your Facebook Business Page is often the first impression a potential customer has of your business. We set up or refresh your page with professional cover photos, profile images, a complete About section, call-to-action buttons, service listings and contact details. Everything is consistent with your website and other marketing materials.",
      },
      {
        term: "Facebook page optimisation",
        body: "We audit your existing Facebook presence and identify what is holding back your reach, engagement and conversions. This covers posting frequency, content mix, audience targeting, page settings, response times and how your Facebook activity connects to your website. Our Facebook marketing agency then builds a plan to fix the gaps and track improvements month over month.",
      },
      {
        term: "Facebook account audit",
        body: "If you already have a Facebook Business Page but are not seeing results, our audit identifies what is working and what needs to change. We review your page completeness score, posting history, engagement rates, audience demographics, ad account structure and Pixel setup. You receive a written report with prioritised recommendations that you can act on yourself or hand back to us to implement.",
      },
      {
        term: "Facebook community management",
        body: "We monitor and respond to comments, messages and reviews on your Facebook page in your brand voice. This includes Facebook Messenger enquiries, comment replies, review responses and Facebook Group moderation if your business runs a group. Our team flags time-sensitive issues to you directly and handles routine interactions so your page stays active and responsive without eating into your working day.",
      },
    ],
  },

  smallBusiness: {
    label: "Small business",
    title: "Facebook Marketing for Small Business",
    intro: "A Facebook marketing agency for small business owners who need results without the enterprise price tag.",
    body: [
      "Most Facebook marketing companies price their services for mid-size and enterprise clients. Small businesses get left with a choice between expensive agency retainers and trying to manage Facebook themselves alongside everything else they do.",
      "Our Facebook marketing agency was built around small business needs. We keep packages affordable, communication direct, and reporting focused on the numbers that matter to a business owner: enquiries, website visits and cost per lead. Whether you are a local service business, an online shop, or a B2B company, your Facebook marketing plan is built around your budget and your goals.",
      "We work with small businesses across the UK, from sole traders to teams of 20-30 people. If you need a Facebook marketing firm that treats your account with the same attention as a bigger client, that is how we operate.",
    ],
  },

  media: { title: "How We Report on Your Facebook Marketing" },

  packages: {
    ...socialLanding.packages,
    title: "Facebook Marketing Packages and Pricing",
    subtitle:
      "Our Facebook marketing packages are designed for small and medium UK businesses that want professional Facebook management without a long-term lock-in. Each package includes content creation, scheduling, community management and monthly reporting.",
    notes: [
      "If you do not have established brand guidelines, we can help develop them as a separate project. Your account manager will discuss the options during your onboarding call.",
      "All packages run on a minimum three-month term. Creative assets include one round of revisions, and content is optimised specifically for the Facebook platform.",
    ],
  },

  guarantee: {
    ...socialLanding.guarantee,
    title: "Our Facebook Marketing Agency Guarantee",
    body: [
      "We are confident in the results our Facebook marketing agency delivers. Our experience managing Facebook campaigns for UK businesses gives us the confidence to back our work. To make the decision to work with us easier, our CEO offers a money-back guarantee on our Facebook marketing services.",
      "Start working with Online Marketing Help today and let us put Facebook to work for your business.",
    ],
  },

  resources: {
    ...socialLanding.resources,
    // Not in the guide: the verbatim line said "Social Media Marketing", which the
    // guide asks to remove from this page.
    subtitle: "Landed here because you want more information about Facebook marketing. Well look no further.",
    items: [
      {
        term: "Monthly consultations",
        body: "Your Facebook marketing account manager provides a monthly consultation call covering what has been achieved, where your objectives stand and whether the campaign is meeting or exceeding them. You are welcome to get in touch between calls, but monthly calls give us enough data to provide a meaningful overview. The longer we manage your Facebook marketing, the more we can optimise content, targeting and ad spend based on what the data shows.",
      },
      {
        term: "Transparent monthly reports",
        body: "Your monthly Facebook marketing report is tailored to the goals you set with your account manager. It covers page growth, post engagement, reach, website clicks, ad performance (if running Facebook Ads) and any community management activity. If you want deeper detail on a specific area, your account manager can expand that section for the following month.",
      },
    ],
  },

  reviews: {
    ...socialLanding.reviews,
    title: "Why Businesses Choose Us as the Best Facebook Marketing Agency",
  },

  faq: {
    ...socialLanding.faq,
    title: "Facebook Marketing Agency FAQs",
    subtitle: "Common questions about working with a Facebook marketing agency.",
    items: [
      { q: "What Facebook marketing services do you offer?", a: "We provide a complete range of Facebook marketing services for UK businesses: Facebook Business Page setup and optimisation, content creation and scheduling (posts, Stories, Reels), Facebook Ads campaign management, audience building with Custom and Lookalike Audiences, community management and Messenger responses, Facebook Shop setup, and monthly performance reporting. Each service can be booked individually or as part of a managed Facebook marketing package." },
      { q: "How long will it take to see results from Facebook marketing?", a: "Organic Facebook marketing typically shows measurable engagement improvements within four to eight weeks. Building a consistent following and driving regular traffic to your website usually takes three to six months. Facebook Ads campaigns can generate clicks, leads and enquiries within days of launching, with optimisation improving results over the first two to four weeks. We set benchmarks at the start of every engagement and track progress against them monthly." },
      { q: "How much does a Facebook marketing agency charge?", a: "Our Facebook marketing packages start at an affordable entry-level price for small businesses. Pricing depends on the scope of work: organic-only packages (content creation, scheduling, community management) cost less than packages that include Facebook Ads management. Your account manager will recommend the right package based on your goals, budget and the number of services you need. Contact us for a detailed breakdown." },
      { q: "What kind of content do you create for Facebook?", a: "We create a mix of content types tailored to your audience and goals: branded graphic posts, short-form video (Reels), photo carousels, Facebook Stories, text updates, polls and event promotions. Every post includes a clear call to action and is designed for the Facebook algorithm, which prioritises content that generates comments and shares. Before anything goes live, we send it for your review and approval." },
      { q: "Can I review Facebook content before you post it?", a: "Yes. We send all Facebook content for your approval before scheduling. You see the post copy, images or video, hashtags and the proposed posting time. Once you approve, we schedule using Meta Business Suite and confirm it is live. If you want changes, we revise and resubmit." },
      { q: "Will you provide Facebook marketing reports?", a: "Yes. Every Facebook marketing package includes a monthly report covering page followers, post reach and engagement, website clicks from Facebook, ad spend and ROAS (if running Facebook Ads), and community management activity. The report is built around the goals you set at the start, so you can see clearly whether your Facebook marketing is delivering." },
      { q: "Do you manage Facebook Ads as well as organic content?", a: "Yes. Our Facebook marketing agency handles both organic Facebook content and paid Facebook Ads campaigns. Many of our clients start with organic content management and add Facebook Ads once their page is established and generating engagement. We can run both from the start if your goals require faster results. The organic content and paid campaigns are managed together to make sure messaging is consistent and the two approaches support each other." },
      { q: "What Facebook advertising formats do you support?", a: "We create and manage Facebook Ads across all available formats: single image ads, video ads, carousel ads, collection ads, lead generation forms and Messenger ads. We also set up remarketing campaigns using the Facebook Pixel to reach people who have already visited your website. The right format depends on your campaign objective. Your Facebook marketing expert will recommend the best combination for your budget and goals." },
      { q: "How do you build a Facebook audience for my business?", a: "We start by reviewing your existing Facebook audience and customer data. From there, we build Custom Audiences from your customer lists, website visitors (via the Facebook Pixel) and people who have engaged with your Facebook page or ads. We then create Lookalike Audiences to find new potential customers who match your existing buyers. Organic content is designed to encourage shares and comments, which extends your reach beyond the people who already follow your page." },
      { q: "Can I request additional Facebook posts or services?", a: "Yes. We can adjust your package at any time. If you need more posts, additional Facebook Ads campaigns, a Facebook Group setup, or expanded community management, your account manager will prepare a custom proposal. Many of our Facebook marketing clients start with a standard package and scale up as they see results." },
      { q: "How do I choose the best Facebook marketing agency?", a: "Look for an agency that manages both organic content and Facebook Ads, provides transparent monthly reporting tied to your goals, and has experience with businesses similar to yours. Ask about their pricing structure, minimum contract length, and whether you will have a dedicated account manager. A good Facebook marketing company will show you case studies or results from previous clients and be upfront about what is realistic for your budget." },
      { q: "Is Facebook marketing worth it for small businesses?", a: "Yes. Facebook remains the largest social media platform, with 44 million UK users. For small businesses, Facebook marketing offers a low entry cost, precise audience targeting and the ability to reach local customers through location-based ads and community pages. Our Facebook marketing agency for small business clients typically sees measurable results within the first three months of a structured campaign. The key is having a clear strategy and consistent execution, which is what our packages are designed to provide." },
      { q: "What is the difference between a Facebook marketing agency and managing Facebook yourself?", a: "A Facebook marketing agency brings three things that are hard to replicate in-house: platform expertise, creative capacity and time. Our Facebook marketing experts stay current with algorithm changes, ad policy updates and new features. We produce professional content consistently, without the stop-start pattern that happens when Facebook is managed alongside other business tasks. And we handle the daily monitoring, replies and reporting that keep a Facebook presence active. For most small and medium businesses, the cost of an agency is lower than hiring a dedicated in-house social media manager." },
    ],
  },

  solutions: {
    ...socialLanding.solutions,
    title: "Services That Work Alongside Facebook Marketing",
    subtitle: "Get more from your Facebook marketing by connecting it to your wider online presence.",
    links: [
      { label: "Social Media Marketing Services", href: "/social-media-marketing-services", body: "For businesses that want management across Facebook, Instagram, LinkedIn and X/Twitter rather than Facebook alone." },
      { label: "Social Media Paid Advertising", href: "/social-media-paid-advertising", body: "For businesses that want paid ad campaigns across multiple social platforms, not just Facebook Ads." },
      { label: "SEO Services", href: "/seo-services", body: "For businesses that want to combine Facebook traffic with organic search visibility." },
    ],
  },

  consultation: {
    ...socialLanding.consultation,
    title: "Ready to Work with a Facebook Marketing Agency?",
    accent: "a Facebook Marketing Agency?",
    body: "Book a call at a time that suits you, or get in touch with the team directly. We start every Facebook marketing engagement with a review of your current Facebook presence and your business goals before recommending a plan.",
  },
} as const;
