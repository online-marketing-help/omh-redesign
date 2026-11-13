/* =========================================================================
   Everything the calculator is allowed to assume lives here.

   Two rules this file follows.

   1. OMH's prices are facts. They come from the price breakdown agreed with
      the MD and must not be edited here to make a number look better.

   2. Industry figures are NOT facts, they are starting points. Every default
      carries the source it came from and how much weight that source deserves.
      Most "missed call" statistics in this market are vendor marketing with no
      traceable study behind them, so the honest thing is to say so, show the
      owner the number, and let them replace it with their own.
   ========================================================================= */

/* ------------------------------------------------------------------ plans */
/* Agreed 2026 pricing. Minutes are per month; overage is the same on every
   plan. Setup is one off. */
const PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: 249,
    minutes: 300,
    setup: 795,
    delivery: "3 working days",
    blurb: "One agent, one number. Answers the calls you are missing now.",
  },
  {
    id: "growth",
    name: "Growth",
    price: 449,
    minutes: 500,
    setup: 1295,
    delivery: "5 to 7 working days",
    popular: true,
    blurb: "More minutes, deeper qualifying and your diary connected.",
  },
  {
    id: "scale",
    name: "Scale",
    price: 849,
    minutes: 900,
    setup: 1995,
    delivery: "12 to 15 working days",
    blurb: "Up to 3 locations or brands. Further sites are £495 setup, £49 a month each.",
  },
];

const OVERAGE = 0.60;      // £ per minute once the allowance is used
const EXTRA_SITE_SETUP = 495;
const EXTRA_SITE_MONTH = 49;
const SITES_INCLUDED = 3;  // in Scale

/* --------------------------------------------------------------- sourcing */
/* grade: "study"  a named study with a stated sample
          "vendor" a supplier's own published figure, no method given
          "ours"   OMH's own working assumption, stated as such            */
const SOURCES = {
  invoca: {
    label: "Invoca, Home Services Lead Conversion Benchmarks 2026 (July 2026)",
    url: "https://invoca.com/reports/the-invoca-home-services-lead-conversion-benchmarks-report-2026",
    grade: "study",
    note: "Averages across Invoca's customer base: a person answers 52% of inbound calls, 65% of calls over 15 seconds, 73% of calls over 30 seconds. Sample size not disclosed.",
  },
  peerlogic: {
    label: "Peerlogic, study of 4,280 calls across 26 dental practices",
    url: "https://www.peerlogic.com/",
    grade: "study",
    note: "38% of inbound calls went unanswered; 25% new patient conversion recorded in the same study.",
  },
  homeshare: {
    label: "Homeshare research, UK estate and letting agents",
    url: "https://homeshare.co.uk/newsfeed/estate-agents-miss-94-of-early-evening-calls-research-claims",
    grade: "study",
    note: "94.1% of calls between 6pm and 9pm on weekdays went unanswered.",
  },
  clio: {
    label: "Clio Legal Trends Report, mystery shop of law firms",
    url: "https://www.clio.com/uk/guides/client-intake-legal-trends/",
    grade: "study",
    note: "40% of firms answered the phone to a prospective client; 52% either answered or called back.",
  },
  moneypenny: {
    label: "Moneypenny, UK legal call research",
    url: "https://www.moneypenny.com/uk/",
    grade: "vendor",
    note: "35% of calls to small and mid-sized UK firms go unanswered in business hours; roughly 1 in 10 calls is a new enquiry.",
  },
  dragon2000: {
    label: "Dragon2000, UK dealership call research",
    url: "https://www.dragon2000.co.uk/",
    grade: "vendor",
    note: "28% of inbound calls go unanswered at car dealerships; peak misses 11am and 3pm, Monday to Wednesday.",
  },
  ukSme: {
    label: "Widely repeated UK SME figure, original study not traceable",
    url: "",
    grade: "vendor",
    note: "27% of inbound calls to the average UK SME reported unanswered, rising to 47% for the smallest firms. Repeated across many supplier blogs; we could not find the underlying research, so treat it as a prompt to measure your own.",
  },
  hmlr: {
    label: "HM Land Registry, UK House Price Index, June 2026",
    url: "https://www.gov.uk/government/news/uk-house-price-index-for-june-2026",
    grade: "study",
    note: "Average property value £272,000 across the UK and £293,000 in England. Official statistics, not an estimate.",
  },
  hoa: {
    label: "HomeOwners Alliance, estate agent fees 2026",
    url: "https://hoa.org.uk/advice/guides-for-homeowners/i-am-selling/how-much-should-i-pay-the-estate-agent/",
    grade: "study",
    note: "Average high street sole agency fee 1.18% plus VAT, which is 1.42% including VAT. Sole agency typically runs 1.2% to 1.8% including VAT; multi-agency 3% to 3.6%.",
  },
  group1: {
    label: "Group 1 Automotive UK, published results, first half of 2026",
    url: "https://www.am-online.com/news/profits-improving-at-group-1-automotive-uk",
    grade: "study",
    note: "Used car gross margin 4.3%, down from 4.5%, across 39,391 used retail units. Same-store finance and insurance profit per unit about $1,128. A listed group's own filings, so the figures are auditable, but they are one large group rather than the whole trade.",
  },
  heatable: {
    label: "Heatable and MyJobQuote, UK boiler installation prices 2026",
    url: "https://heatable.co.uk/boiler-advice/how-much-do-new-boilers-cost",
    grade: "vendor",
    note: "A new boiler installed typically runs £1,500 to £5,500, with an average around £2,400. Installer labour alone is £600 to £1,500. Published by companies selling boilers, so treat as indicative.",
  },
  tradeRates: {
    label: "Checkatrade, MyBuilder and Gas Engineer Software, UK plumber rates 2026",
    url: "https://gasengineersoftware.co.uk/blog/average-plumber-hourly-rates-in-the-uk-2026-updated/",
    grade: "vendor",
    note: "Hourly £40 to £75 nationally and £65 to £105 in London, day rate £250 to £400, emergency call-out £40 to £150. No official average invoice value for UK trades exists.",
  },
  dentalPrices: {
    label: "UK private dental treatment price guide 2026",
    url: "https://wecovr.com/guides/average-cost-of-private-dental-treatment-in-the-uk-2026-price-guide/",
    grade: "vendor",
    note: "Check-up and hygiene £130 to £270, white filling £160 to £420, root canal £650 to £1,600. There is no published average annual spend per private patient in the UK; the CMA opened a review of the £8bn private dentistry market in March 2026, which may eventually produce one.",
  },
  lsb: {
    label: "Legal Services Board price survey, and reallymoving conveyancing index Q2 2026",
    url: "https://legalservicesboard.org.uk/news/thousands-could-be-paying-over-the-odds-for-legal-advice",
    grade: "study",
    note: "Conveyancing averaged £2,438 for a combined sale and purchase in Q2 2026 (£1,509 purchase, £929 sale). The regulator's survey puts an uncontested divorce at £605 to £908 depending on region, and a contested one at £2,032 to £4,395. London firms are about 33% dearer. The LSB fieldwork is from 2024.",
  },
  ours: {
    label: "OMH working assumption",
    url: "",
    grade: "ours",
    note: "Not measured. A deliberately cautious placeholder so the result is not flattering by accident. Change it to what you know.",
  },
};

/* ------------------------------------------------------------- industries */
/* missedPct      share of inbound calls nobody answers
   newPct         share of those missed calls that are genuinely new business.
                  This is the number vendor calculators quietly set to 100%.
                  Supplier calls, existing customers chasing, wrong numbers and
                  spam are all in a real call log.
   recoverPct     share of those the agent actually converts into a captured
                  enquiry. Not 100%: some callers want a person, some ask for
                  something out of scope.
   convertPct     captured enquiry to paying customer
   value          average value of one customer, in pounds
   minutes        average length of a handled call                           */
const INDUSTRIES = {
  universal: {
    slug: "universal",
    name: "Any business",
    askValue: "What is one new customer worth to you?",
    headline: "What are the calls you miss actually worth?",
    lede:
      "This works for any business that sells over the phone. If your trade is listed below, " +
      "use that version instead: the starting figures are closer to your world.",
    valueLabel: "Average value of one new customer",
    valueHint:
      "What one new customer is worth to you over the whole relationship, not " +
      "just the first job. We have no figure to offer here because it depends " +
      "entirely on what you sell, so the starting number is a placeholder.",
    unit: "customers",
    defaults: { calls: 400, missedPct: 27, newPct: 45, recoverPct: 70, convertPct: 30, value: 900, minutes: 3.5 },
    valueRange: { min: 100, max: 10000, step: 50 },
    missedSource: "ukSme",
    valueSource: "ours",
    notes: [
      "Most published missed call statistics come from companies selling the fix. Where we could not trace a study, we say so.",
      "Every figure here is editable. The only numbers we will not move are our own prices.",
    ],
  },

  "real-estate": {
    slug: "real-estate",
    name: "Real estate and letting agents",
    askValue: "What do you earn on one instruction?",
    headline: "What are the valuations you never hear about worth?",
    lede:
      "Vendors ring in the evening, after they have talked it over at home. That is exactly " +
      "when the office is shut.",
    valueLabel: "Average commission per instruction",
    valueHint:
      "What you keep on one completed sale, before tax and after VAT comes out. " +
      "The default is the England average house price of \u00a3293,000 at the " +
      "average high street fee of 1.18% plus VAT, so \u00a33,457 to you. Move it " +
      "to your own average sale price and your own rate.",
    unit: "instructions",
    defaults: { calls: 350, missedPct: 30, newPct: 40, recoverPct: 70, convertPct: 25, value: 3457, minutes: 4 },
    valueRange: { min: 1000, max: 15000, step: 50 },
    missedSource: "homeshare",
    valueSource: "hoa",
    notes: [
      "The \u00a33,457 starting figure is worked out, not guessed: the England average property value of \u00a3293,000 (HM Land Registry UK House Price Index, June 2026) at the average high street sole agency fee of 1.18% plus VAT (HomeOwners Alliance, 2026). VAT is excluded because it goes to HMRC, not to you.",
      "Note that the widely quoted \u00a3292,000 average is England, not the UK. The UK average is \u00a3272,000, which on the same rate gives \u00a33,210. If you sell outside England, move the slider down.",
      "Fees vary more than the average suggests: sole agency runs about 1.2% to 1.8% including VAT and multi-agency 3% to 3.6%. On a \u00a3500,000 instruction at 1.5% plus VAT you are closer to \u00a37,500, so set it to your own book rather than the national figure.",
      "Homeshare's research found 94.1% of calls between 6pm and 9pm went unanswered. The default above is a whole week average, not that evening window, which is why it is far lower.",
      "A valuation booked is not an instruction won. The conversion step in the workings is where that is handled.",
    ],
  },

  dental: {
    slug: "dental",
    name: "Dental practices",
    askValue: "What is one new patient worth to you?",
    headline: "What is a new patient who could not get through worth?",
    lede:
      "Reception is with a patient, the phone rings out, and the caller tries the practice " +
      "down the road. Nobody ever logs it.",
    valueLabel: "Average value of a new patient",
    valueHint:
      "Over the relationship, not the first appointment. As a sense of scale, a " +
      "check-up and hygiene visit is \u00a3130 to \u00a3270 and a root canal " +
      "\u00a3650 to \u00a31,600, so a patient who stays passes \u00a3800 quickly. " +
      "Implant and ortho cases sit far higher; NHS lower.",
    unit: "new patients",
    defaults: { calls: 600, missedPct: 38, newPct: 35, recoverPct: 75, convertPct: 25, value: 800, minutes: 3.5 },
    valueRange: { min: 150, max: 6000, step: 50 },
    missedSource: "peerlogic",
    valueSource: "dentalPrices",
    notes: [
      "The 38% default and the 25% conversion both come from the same study of 4,280 calls across 26 practices, so they are at least consistent with each other.",
      "There is no published figure for what a UK private dental patient is worth on average. We checked. The CMA only opened its review of the £8bn private dentistry market in March 2026. So the £800 is our own cautious figure, built up from published treatment prices rather than taken from a study, and it is labelled that way on the page.",
      "Claims of £10,000 lifetime value circulate widely in this market with no study behind them. We have not used them.",
    ],
  },

  clinics: {
    slug: "clinics",
    name: "Private clinics and healthcare",
    askValue: "What is one new patient worth to you?",
    headline: "What are the patient enquiries you miss worth?",
    lede:
      "Lunch cover, peak morning, and the hour after close. The phone does not stop because " +
      "the desk is busy.",
    valueLabel: "Average value of a new patient",
    valueHint:
      "Over the course of treatment, not a single consultation. Private clinic " +
      "pricing is not published anywhere comparable, so this one is our own " +
      "cautious placeholder rather than a researched figure.",
    unit: "new patients",
    defaults: { calls: 500, missedPct: 30, newPct: 40, recoverPct: 75, convertPct: 30, value: 1200, minutes: 4 },
    valueRange: { min: 150, max: 8000, step: 50 },
    missedSource: "ukSme",
    valueSource: "ours",
    notes: [
      "If you take clinical questions on the phone, note that the agent books and triages to your rules; it does not give clinical advice.",
    ],
  },

  plumbers: {
    slug: "plumbers",
    name: "Plumbers and emergency trades",
    askValue: "What is an average job worth?",
    headline: "What is the job worth that went to whoever answered first?",
    lede:
      "An emergency caller does not leave a voicemail. They ring the next firm on the list, " +
      "and the first one to pick up gets the job.",
    valueLabel: "Average value of one job",
    valueHint:
      "Your average invoice across everything you do. For scale, UK plumbers " +
      "charge \u00a340 to \u00a375 an hour and \u00a365 to \u00a3105 in London, " +
      "day rates run \u00a3250 to \u00a3400, and an emergency call-out fee is " +
      "\u00a340 to \u00a3150 before the work itself.",
    unit: "jobs",
    defaults: { calls: 300, missedPct: 48, newPct: 55, recoverPct: 70, convertPct: 45, value: 350, minutes: 3 },
    valueRange: { min: 80, max: 2500, step: 10 },
    missedSource: "invoca",
    valueSource: "tradeRates",
    notes: [
      "Invoca's 2026 home services benchmark found a person answers 52% of inbound calls, which is where the 48% default comes from. For calls lasting over 30 seconds the answer rate rises to 73%.",
      "The same report found 45% of leads converted during the call, which is the conversion default here.",
      "There is no official average invoice value for UK trades. The £350 is a middle position between an emergency call-out and a half day of work; set it to your own average and the whole answer changes.",
    ],
  },

  hvac: {
    slug: "hvac",
    name: "Heating and HVAC",
    askValue: "What is an average job worth?",
    headline: "What is a breakdown call you could not take worth?",
    lede:
      "Cold snap, phones light up, two engineers are already out. The calls you cannot reach " +
      "are the ones paying the most.",
    valueLabel: "Average value of one job",
    valueHint:
      "Repairs, services and installs averaged out. A boiler installed runs " +
      "\u00a31,500 to \u00a35,500 with an average near \u00a32,400, while a " +
      "service is under \u00a3150, so your answer depends entirely on your mix.",
    unit: "jobs",
    defaults: { calls: 320, missedPct: 48, newPct: 55, recoverPct: 70, convertPct: 45, value: 900, minutes: 3 },
    valueRange: { min: 100, max: 6000, step: 25 },
    missedSource: "invoca",
    valueSource: "heatable",
    notes: [
      "The £900 assumes a mixed book: mostly services and repairs, with enough installs to pull the average up. If installs are most of your revenue, move it towards the £2,400 average install and watch what happens.",
      "Demand is seasonal. Run this on a busy winter month as well as an average one; the plan you need is set by the peak, not the mean.",
    ],
  },

  contractors: {
    slug: "contractors",
    name: "Contractors and home improvement",
    askValue: "What is an average project worth?",
    headline: "What is an enquiry that rang out worth?",
    lede: "You are on site, not at a desk. The phone is still where the work comes from.",
    valueLabel: "Average value of one project",
    valueHint:
      "Your average contract value, not the enquiry. UK contract values are not " +
      "published in any form worth quoting, so this is a placeholder: put your " +
      "own average job in and the answer becomes real.",
    unit: "projects",
    defaults: { calls: 220, missedPct: 48, newPct: 50, recoverPct: 70, convertPct: 30, value: 4000, minutes: 4 },
    valueRange: { min: 500, max: 30000, step: 250 },
    missedSource: "invoca",
    valueSource: "ours",
    notes: [
      "High value and low volume. A single recovered project can cover a year of the service, so be honest about the conversion rate rather than the ceiling.",
    ],
  },

  "law-firms": {
    slug: "law-firms",
    name: "Law firms",
    askValue: "What do you bill on an average matter?",
    headline: "What is the client who could not reach you worth?",
    lede:
      "Someone with a legal problem rings three firms. The one that picks up and takes the " +
      "details usually keeps them.",
    valueLabel: "Average fee per matter",
    valueHint:
      "Your average billed matter. The spread is wide: a conveyancing purchase " +
      "averages \u00a31,509 and a sale \u00a3929, an uncontested divorce " +
      "\u00a3605 to \u00a3908, and a contested one \u00a32,032 to \u00a34,395. " +
      "London firms run about a third higher.",
    unit: "matters",
    defaults: { calls: 400, missedPct: 35, newPct: 25, recoverPct: 70, convertPct: 35, value: 1800, minutes: 5 },
    valueRange: { min: 300, max: 15000, step: 100 },
    missedSource: "moneypenny",
    valueSource: "lsb",
    notes: [
      "The £1,800 sits between a conveyancing matter and an uncontested divorce, weighted a little towards the more involved work. It is deliberately below the £2,500 we first used. If you do mostly commercial or contentious work, push it well up.",
      "The new-business share is set low on purpose: Moneypenny puts it at roughly 1 in 10 calls, and most of your traffic is existing matters. We have used 25% as a middle position, not the headline.",
      "Clio's mystery shop found 40% of firms answered the phone to a prospective client at all.",
      "The agent takes details and books. It does not give legal advice or quote fees unless you tell it the fee.",
    ],
  },

  "car-dealerships": {
    slug: "car-dealerships",
    name: "Car dealerships",
    askValue: "What do you make on one car, after costs?",
    headline: "What is the buyer who gave up on hold worth?",
    lede:
      "Sales, service and parts all land on the same switchboard. The buyer who cannot get " +
      "through is at another forecourt by the afternoon.",
    valueLabel: "Average gross profit per unit",
    valueHint:
      "Total gross on one unit, not the sticker price. The default is built from " +
      "Group 1 Automotive UK's 2026 results: a 4.3% used gross margin plus finance " +
      "and insurance profit of roughly \u00a3870 a unit.",
    unit: "sales",
    defaults: { calls: 800, missedPct: 28, newPct: 35, recoverPct: 70, convertPct: 20, value: 1600, minutes: 3 },
    valueRange: { min: 200, max: 6000, step: 50 },
    missedSource: "dragon2000",
    valueSource: "group1",
    notes: [
      "The £1,600 is front end plus back end: about £730 of vehicle gross at Group 1 UK's 4.3% margin on a typical used retail price, plus roughly £870 of finance and insurance profit per unit from the same results. Your own mix will differ, especially if you are new car or prestige.",
      "Use gross profit, not the price of the car, or the result will be nonsense.",
      "Service bookings are usually the easier win. Run those separately with the service figures.",
    ],
  },
};

const INDUSTRY_ORDER = [
  "universal", "real-estate", "dental", "clinics",
  "plumbers", "hvac", "contractors", "law-firms", "car-dealerships",
];
