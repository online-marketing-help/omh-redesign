// FROZEN BACKUP (oldv3): /ai-voice-agents as it was on 21 Oct 2026 (git tag oldv3), before the heading-changes v2 brief. Do not edit.
// Sections of /ai-voice-agents kept from the previous page on the client's instruction (20 Oct 2026, after the CRO
// rebuild): Industries, Client feedback and its video dialog, Is it the right fit (with the fit
// checker), the ROI calculator, the comparison table, the FAQ layout with search and filters, and the mobile
// sticky bar. Markup is verbatim from lib/content/ai-voice-agents-oldv2/markup.ts except that the demo CTAs now
// point at #book-demo-form. page.tsx places these between the rebuilt sections in ai-voice-agents-markup.ts.
import { roiCalculator } from "@/lib/content/ai-voice-agents-oldv3/roi-calculator";
import { voiceFaqs } from "@/lib/content/ai-voice-agents-oldv3/markup";

// Comparison table from the SEO brief (19 Oct 2026). Guide figures: Connect Communications call answering
// from £14.99 + VAT; UK receptionist base pay about £19k to £24k a year (Payscale) before employer costs;
// RingCentral AI Receptionist from £32 a month. Recheck every six months.
const cmpCols = ["OMH AI voice agent", "Voicemail", "Answering service", "Receptionist", "DIY platform"];
const cmpRows = [
  ["Typical monthly cost", "From £249 + VAT", "Free", "From about £15, rising with call volume", "Around £2,000+ with employer costs", "From about £30, plus usage"],
  ["Answers out of hours", "Yes, day and night", "Records a message, if callers leave one", "Depends on the plan", "Office hours only", "Yes"],
  ["Books into your diary", "Yes, while the caller is on the line", "No", "Sometimes, by hand", "Yes", "If you connect it yourself"],
  ["Calls at the same time", "Many at once", "One message at a time", "Depends on staffing", "One at a time", "Many at once"],
  ["Knows your business", "Built from your real calls", "No", "A short script", "Best of all", "As well as you set it up"],
  ["Testing before customers hear it", "Test calls and your sign-off", "Not needed", "Varies by provider", "Training on the job", "Often tested on live callers"],
  ["Setup and upkeep", "We build, test and tune it", "None", "Low", "Recruiting, training and holiday cover", "You build and maintain it"],
  ["Results in your marketing report", "Beside your ads and website (Scale)", "No", "Call logs only", "Kept by hand", "A separate dashboard"],
];

const faqItem = ({ q, a, cat }: (typeof voiceFaqs)[number], i: number) => `      <details class="group rounded-[14px] border border-line bg-paper transition-colors open:border-[var(--va-line-strong)] open:bg-surface open:shadow-[0_18px_40px_-30px_rgb(0_0_0/0.45)]" data-faq-item data-cat="${cat}"${i ? "" : " open"} data-track-name="${q}">
        <summary class="flex min-h-[64px] items-center gap-4 px-5 py-4">
          <span class="num hidden w-7 shrink-0 text-[15px] sm:block" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span>
          <span class="min-w-0 flex-1">
            <h3 class="!text-[clamp(18px,17px+.3vw,20.5px)] !leading-[1.3]">${q}</h3>
          </span>
          <span class="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--va-line-strong)] group-open:border-gold group-open:bg-gold group-open:text-navy"><svg class="icon faq-chevron" aria-hidden="true" focusable="false"><use href="#i-chevron-down"/></svg></span>
        </summary>
        <div class="px-5 pb-6 text-[16px] text-muted sm:pl-[4.25rem]">
          <p data-faq-answer>${a}</p>
        </div>
      </details>`;

export const legacyMarkup = String.raw`
<section id="industries" data-component="Industries" class="bg-surface">
  <div class="container-omh py-14 lg:py-20">
    <div>
      <div>
        <p class="eyebrow"><span class="eyebrow-mark" aria-hidden="true"><i></i><i></i><i></i></span>Industries</p>
        <h2>Built for businesses that live on <span class="hl">the phone</span></h2>
      </div>
      <p class="mt-5 text-muted">We set up AI voice agents for real estate and letting agents, dental and healthcare clinics, plumbers, heating engineers, builders, law firms and car dealerships, each one scripted around the calls your sector gets.</p>
    </div>

    <div role="group" aria-label="Filter industries by group" class="mt-10 flex flex-wrap gap-2" data-industry-filters>
      <button type="button" class="filter-btn min-h-[48px] rounded-full border border-[var(--va-line-strong)] px-5 text-[16.5px] font-semibold aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-paper" data-filter="all" aria-pressed="true" data-track="industry_filter" data-track-name="all">All industries</button>
      <button type="button" class="filter-btn min-h-[48px] rounded-full border border-[var(--va-line-strong)] px-5 text-[16.5px] font-semibold aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-paper" data-filter="property" aria-pressed="false" data-track="industry_filter" data-track-name="property">Property</button>
      <button type="button" class="filter-btn min-h-[48px] rounded-full border border-[var(--va-line-strong)] px-5 text-[16.5px] font-semibold aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-paper" data-filter="health" aria-pressed="false" data-track="industry_filter" data-track-name="health">Health</button>
      <button type="button" class="filter-btn min-h-[48px] rounded-full border border-[var(--va-line-strong)] px-5 text-[16.5px] font-semibold aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-paper" data-filter="trades" aria-pressed="false" data-track="industry_filter" data-track-name="trades">Trades</button>
      <button type="button" class="filter-btn min-h-[48px] rounded-full border border-[var(--va-line-strong)] px-5 text-[16.5px] font-semibold aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-paper" data-filter="professional" aria-pressed="false" data-track="industry_filter" data-track-name="professional">Professional &amp; Motor</button>
    </div>
    <p class="sr-only" aria-live="polite" data-industry-count></p>

    <div class="mt-8 grid gap-5 lg:grid-cols-2" data-industry-list>
      <article class="grid items-start gap-4 rounded-[18px] border border-line bg-surface p-5 sm:grid-cols-[160px_minmax(0,1fr)] sm:gap-6" data-industry data-group="property">
        <span class="block h-[120px] w-full rounded-[12px] bg-paper p-2 sm:w-[160px]" aria-hidden="true"><svg viewBox="0 0 200 150" class="h-full w-full" aria-hidden="true">
    <ellipse cx="100" cy="132" rx="78" ry="14.04" class="il-shadow"/>
    <rect x="38" y="64" width="86" height="64" rx="3" class="il-wall"/>
    <path d="M30 68 L81 26 L132 68 Z" class="il-roof"/>
    <rect x="70" y="92" width="22" height="36" rx="2" class="il-ink"/>
    <rect x="48" y="78" width="16" height="14" rx="2" class="il-win"/><rect x="98" y="78" width="16" height="14" rx="2" class="il-win"/>
    <rect x="140" y="78" width="4" height="52" class="il-ink"/>
    <rect x="132" y="70" width="44" height="26" rx="3" class="il-gold"/>
    <text x="154" y="87" text-anchor="middle" class="il-label">FOR SALE</text>
    <g class="il-bubble" transform="translate(128 14)">
    <rect x="0" y="0" width="54" height="38" rx="10" class="il-card"/>
    <path d="M14 38 L10 48 L24 38 Z" class="il-card"/>
    <rect x="10" y="9" width="22" height="20" rx="3" class="il-line"/><path d="M10 15 H32" class="il-stroke"/><circle cx="40" cy="19" r="9" class="il-ok"/><path d="M36 19 l3 3 l5 -6" class="il-tick"/>
  </g>
  </svg></span>
        <div class="min-w-0">
        <h3 class="!text-[21px]">Real Estate &amp; Letting Agents</h3>
        <p class="mt-2 text-[16px] leading-[1.5] text-muted">Catch every viewing request and landlord enquiry while the team is out on appointments.</p>
        <ul class="mt-4 space-y-1.5 text-[16px] leading-snug">
          <li class="flex gap-2.5"><svg class="icon mt-[3px] text-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span>Book viewings and valuations</span></li>
          <li class="flex gap-2.5"><svg class="icon mt-[3px] text-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span>Qualify buyers and tenants</span></li>
          <li class="flex gap-2.5"><svg class="icon mt-[3px] text-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span>Log tenant maintenance calls</span></li>
        </ul>
        </div>
      </article>
      <article class="grid items-start gap-4 rounded-[18px] border border-line bg-surface p-5 sm:grid-cols-[160px_minmax(0,1fr)] sm:gap-6" data-industry data-group="health">
        <span class="block h-[120px] w-full rounded-[12px] bg-paper p-2 sm:w-[160px]" aria-hidden="true"><svg viewBox="0 0 320 220" class="h-full w-full" aria-hidden="true">
    <ellipse cx="160" cy="196" rx="130" ry="23.4" class="il-shadow"/>
    <rect x="44" y="70" width="150" height="120" rx="6" class="il-wall"/>
    <rect x="44" y="70" width="150" height="22" rx="6" class="il-ink"/>
    <rect x="104" y="40" width="30" height="30" rx="5" class="il-card"/><path d="M119 46 V64 M110 55 H128" class="il-crossline"/>
    <rect x="60" y="104" width="22" height="20" rx="3" class="il-win"/><rect x="92" y="104" width="22" height="20" rx="3" class="il-win"/><rect x="156" y="104" width="22" height="20" rx="3" class="il-win"/>
    <rect x="60" y="136" width="22" height="20" rx="3" class="il-win"/><rect x="156" y="136" width="22" height="20" rx="3" class="il-win"/>
    <rect x="96" y="140" width="46" height="50" rx="3" class="il-ink"/>
    <path d="M232 92 c10-10 28-12 36 0 c8 12 2 26-2 40 c-3 12-4 24-10 30 c-4 4-8 0-9-6 l-3-14 c-1-6-9-6-10 0 l-3 14 c-1 6-5 10-9 6 c-6-6-7-18-10-30 c-4-14-10-28-2-40 c8-12 26-10 22 0" class="il-tooth"/>
    <g class="il-bubble" transform="translate(206 20)">
      <rect x="0" y="0" width="96" height="58" rx="12" class="il-card"/>
      <path d="M22 58 L16 70 L34 58 Z" class="il-card"/>
      <rect x="12" y="12" width="34" height="34" rx="5" class="il-line"/><path d="M12 22 H46" class="il-stroke"/>
      <text x="29" y="40" text-anchor="middle" class="il-num">9:10</text>
      <circle cx="70" cy="29" r="9" class="il-ok"/><path d="M66 29 l3 3 l5 -6" class="il-tick"/>
    </g>
  </svg></span>
        <div class="min-w-0">
        <h3 class="!text-[21px]">Dental Clinics</h3>
        <p class="mt-2 text-[16px] leading-[1.5] text-muted">An AI receptionist for dentists that keeps the front desk free for the patients in the room.</p>
        <ul class="mt-4 space-y-1.5 text-[16px] leading-snug">
          <li class="flex gap-2.5"><svg class="icon mt-[3px] text-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span>Book check-ups and hygiene visits</span></li>
          <li class="flex gap-2.5"><svg class="icon mt-[3px] text-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span>Move and cancel appointments</span></li>
          <li class="flex gap-2.5"><svg class="icon mt-[3px] text-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span>Route urgent calls to your emergency line</span></li>
        </ul>
        <p class="mt-3 flex items-center gap-2 rounded-[10px] border border-line bg-surface px-3 py-2 text-[16px] font-semibold"><svg class="icon text-hl" aria-hidden="true" focusable="false"><use href="#i-shield"/></svg><span>No clinical or medical advice given.</span></p>
        </div>
      </article>
      <article class="grid items-start gap-4 rounded-[18px] border border-line bg-surface p-5 sm:grid-cols-[160px_minmax(0,1fr)] sm:gap-6" data-industry data-group="health">
        <span class="block h-[120px] w-full rounded-[12px] bg-paper p-2 sm:w-[160px]" aria-hidden="true"><svg viewBox="0 0 320 220" class="h-full w-full" aria-hidden="true">
    <ellipse cx="160" cy="196" rx="130" ry="23.4" class="il-shadow"/>
    <rect x="44" y="70" width="150" height="120" rx="6" class="il-wall"/>
    <rect x="44" y="70" width="150" height="22" rx="6" class="il-ink"/>
    <rect x="104" y="40" width="30" height="30" rx="5" class="il-card"/><path d="M119 46 V64 M110 55 H128" class="il-crossline"/>
    <rect x="60" y="104" width="22" height="20" rx="3" class="il-win"/><rect x="92" y="104" width="22" height="20" rx="3" class="il-win"/><rect x="156" y="104" width="22" height="20" rx="3" class="il-win"/>
    <rect x="60" y="136" width="22" height="20" rx="3" class="il-win"/><rect x="156" y="136" width="22" height="20" rx="3" class="il-win"/>
    <rect x="96" y="140" width="46" height="50" rx="3" class="il-ink"/>
    <path d="M232 92 c10-10 28-12 36 0 c8 12 2 26-2 40 c-3 12-4 24-10 30 c-4 4-8 0-9-6 l-3-14 c-1-6-9-6-10 0 l-3 14 c-1 6-5 10-9 6 c-6-6-7-18-10-30 c-4-14-10-28-2-40 c8-12 26-10 22 0" class="il-tooth"/>
    <g class="il-bubble" transform="translate(206 20)">
      <rect x="0" y="0" width="96" height="58" rx="12" class="il-card"/>
      <path d="M22 58 L16 70 L34 58 Z" class="il-card"/>
      <rect x="12" y="12" width="34" height="34" rx="5" class="il-line"/><path d="M12 22 H46" class="il-stroke"/>
      <text x="29" y="40" text-anchor="middle" class="il-num">9:10</text>
      <circle cx="70" cy="29" r="9" class="il-ok"/><path d="M66 29 l3 3 l5 -6" class="il-tick"/>
    </g>
  </svg></span>
        <div class="min-w-0">
        <h3 class="!text-[21px]">Clinics &amp; Healthcare</h3>
        <p class="mt-2 text-[16px] leading-[1.5] text-muted">Takes booking and admin calls so reception can focus on the patients in front of them.</p>
        <ul class="mt-4 space-y-1.5 text-[16px] leading-snug">
          <li class="flex gap-2.5"><svg class="icon mt-[3px] text-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span>Book across practitioners</span></li>
          <li class="flex gap-2.5"><svg class="icon mt-[3px] text-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span>Opening hours and directions</span></li>
          <li class="flex gap-2.5"><svg class="icon mt-[3px] text-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span>Confirmation calls to cut no-shows</span></li>
        </ul>
        <p class="mt-3 flex items-center gap-2 rounded-[10px] border border-line bg-surface px-3 py-2 text-[16px] font-semibold"><svg class="icon text-hl" aria-hidden="true" focusable="false"><use href="#i-shield"/></svg><span>No clinical or medical advice given.</span></p>
        </div>
      </article>
      <article class="grid items-start gap-4 rounded-[18px] border border-line bg-surface p-5 sm:grid-cols-[160px_minmax(0,1fr)] sm:gap-6" data-industry data-group="trades">
        <span class="block h-[120px] w-full rounded-[12px] bg-paper p-2 sm:w-[160px]" aria-hidden="true"><svg viewBox="0 0 320 220" class="h-full w-full" aria-hidden="true">
    <ellipse cx="160" cy="196" rx="140" ry="25.2" class="il-shadow"/>
    <rect x="164" y="88" width="120" height="96" rx="4" class="il-wall"/>
    <path d="M154 92 L224 46 L294 92 Z" class="il-roof"/>
    <rect x="182" y="110" width="22" height="20" rx="3" class="il-win"/><rect x="244" y="110" width="22" height="20" rx="3" class="il-win"/>
    <rect x="212" y="140" width="24" height="44" rx="2" class="il-ink"/>
    <path d="M40 176 V128 Q40 120 48 120 H118 L138 140 Q142 144 142 150 V176 Z" class="il-gold"/>
    <path d="M118 124 L134 140 H112 V124 Z" class="il-win"/>
    <path d="M44 114 H120 M52 108 V114 M112 108 V114" class="il-ladder"/>
    <circle cx="66" cy="178" r="13" class="il-ink"/><circle cx="66" cy="178" r="5" class="il-card"/>
    <circle cx="120" cy="178" r="13" class="il-ink"/><circle cx="120" cy="178" r="5" class="il-card"/>
    <text x="80" y="156" text-anchor="middle" class="il-van">ON CALL</text>
    <g class="il-bubble" transform="translate(28 18)">
      <rect x="0" y="0" width="118" height="52" rx="12" class="il-card"/>
      <path d="M30 52 L24 64 L42 52 Z" class="il-card"/>
      <path d="M22 16 c4 6 10 10 10 18 a10 10 0 0 1-20 0 c0-5 4-8 6-12 c1 4 2 6 4 6 c0-4-2-8 0-12" class="il-flame"/>
      <text x="44" y="24" class="il-small">Burst pipe</text>
      <text x="44" y="40" class="il-smallok">Engineer called</text>
    </g>
  </svg></span>
        <div class="min-w-0">
        <h3 class="!text-[21px]">Plumbers</h3>
        <p class="mt-2 text-[16px] leading-[1.5] text-muted">An answering service for plumbers that picks up while your hands are full.</p>
        <ul class="mt-4 space-y-1.5 text-[16px] leading-snug">
          <li class="flex gap-2.5"><svg class="icon mt-[3px] text-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span>Capture call-outs while you are on a job</span></li>
          <li class="flex gap-2.5"><svg class="icon mt-[3px] text-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span>Put emergencies through to the plumber on call</span></li>
          <li class="flex gap-2.5"><svg class="icon mt-[3px] text-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span>Book quote visits</span></li>
        </ul>
        </div>
      </article>
      <article class="grid items-start gap-4 rounded-[18px] border border-line bg-surface p-5 sm:grid-cols-[160px_minmax(0,1fr)] sm:gap-6" data-industry data-group="trades">
        <span class="block h-[120px] w-full rounded-[12px] bg-paper p-2 sm:w-[160px]" aria-hidden="true"><svg viewBox="0 0 320 220" class="h-full w-full" aria-hidden="true">
    <ellipse cx="160" cy="196" rx="140" ry="25.2" class="il-shadow"/>
    <rect x="164" y="88" width="120" height="96" rx="4" class="il-wall"/>
    <path d="M154 92 L224 46 L294 92 Z" class="il-roof"/>
    <rect x="182" y="110" width="22" height="20" rx="3" class="il-win"/><rect x="244" y="110" width="22" height="20" rx="3" class="il-win"/>
    <rect x="212" y="140" width="24" height="44" rx="2" class="il-ink"/>
    <path d="M40 176 V128 Q40 120 48 120 H118 L138 140 Q142 144 142 150 V176 Z" class="il-gold"/>
    <path d="M118 124 L134 140 H112 V124 Z" class="il-win"/>
    <path d="M44 114 H120 M52 108 V114 M112 108 V114" class="il-ladder"/>
    <circle cx="66" cy="178" r="13" class="il-ink"/><circle cx="66" cy="178" r="5" class="il-card"/>
    <circle cx="120" cy="178" r="13" class="il-ink"/><circle cx="120" cy="178" r="5" class="il-card"/>
    <text x="80" y="156" text-anchor="middle" class="il-van">ON CALL</text>
    <g class="il-bubble" transform="translate(28 18)">
      <rect x="0" y="0" width="118" height="52" rx="12" class="il-card"/>
      <path d="M30 52 L24 64 L42 52 Z" class="il-card"/>
      <path d="M22 16 c4 6 10 10 10 18 a10 10 0 0 1-20 0 c0-5 4-8 6-12 c1 4 2 6 4 6 c0-4-2-8 0-12" class="il-flame"/>
      <text x="44" y="24" class="il-small">Burst pipe</text>
      <text x="44" y="40" class="il-smallok">Engineer called</text>
    </g>
  </svg></span>
        <div class="min-w-0">
        <h3 class="!text-[21px]">Heating &amp; HVAC</h3>
        <p class="mt-2 text-[16px] leading-[1.5] text-muted">Answers breakdown and service calls through the winter rush, day and night.</p>
        <ul class="mt-4 space-y-1.5 text-[16px] leading-snug">
          <li class="flex gap-2.5"><svg class="icon mt-[3px] text-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span>Book annual services and repairs</span></li>
          <li class="flex gap-2.5"><svg class="icon mt-[3px] text-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span>Record make, model and fault code</span></li>
          <li class="flex gap-2.5"><svg class="icon mt-[3px] text-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span>Put no-heating calls first</span></li>
        </ul>
        </div>
      </article>
      <article class="grid items-start gap-4 rounded-[18px] border border-line bg-surface p-5 sm:grid-cols-[160px_minmax(0,1fr)] sm:gap-6" data-industry data-group="trades">
        <span class="block h-[120px] w-full rounded-[12px] bg-paper p-2 sm:w-[160px]" aria-hidden="true"><svg viewBox="0 0 200 150" class="h-full w-full" aria-hidden="true">
    <ellipse cx="100" cy="132" rx="80" ry="14.399999999999999" class="il-shadow"/>
    <path d="M150 128 V22 M150 26 H58 M150 26 L134 42 M62 26 V48" class="il-ladder"/>
    <rect x="54" y="48" width="16" height="12" rx="2" class="il-gold"/>
    <rect x="36" y="78" width="96" height="50" class="il-wall"/>
    <rect x="40" y="82" width="20" height="11" rx="1.5" class="il-brick"/><rect x="63" y="82" width="20" height="11" rx="1.5" class="il-brick"/><rect x="86" y="82" width="20" height="11" rx="1.5" class="il-brick"/><rect x="109" y="82" width="20" height="11" rx="1.5" class="il-brick"/><rect x="51" y="97" width="20" height="11" rx="1.5" class="il-brick"/><rect x="74" y="97" width="20" height="11" rx="1.5" class="il-brick"/><rect x="97" y="97" width="20" height="11" rx="1.5" class="il-brick"/><rect x="120" y="97" width="10" height="11" rx="1.5" class="il-brick"/><rect x="40" y="112" width="20" height="11" rx="1.5" class="il-brick"/><rect x="63" y="112" width="20" height="11" rx="1.5" class="il-brick"/><rect x="86" y="112" width="20" height="11" rx="1.5" class="il-brick"/><rect x="109" y="112" width="20" height="11" rx="1.5" class="il-brick"/>
    <path d="M30 128 V70 M138 128 V70 M30 70 H138 M30 100 H138" class="il-scaffold"/>
    <path d="M8 128 h22 v-14 a11 11 0 0 1 22 0 v14" class="il-gold"/>
    <g class="il-bubble" transform="translate(140 52)">
    <rect x="0" y="0" width="54" height="38" rx="10" class="il-card"/>
    <path d="M14 38 L10 48 L24 38 Z" class="il-card"/>
    <rect x="10" y="9" width="22" height="20" rx="3" class="il-line"/><path d="M10 15 H32" class="il-stroke"/><circle cx="40" cy="19" r="9" class="il-ok"/><path d="M36 19 l3 3 l5 -6" class="il-tick"/>
  </g>
  </svg></span>
        <div class="min-w-0">
        <h3 class="!text-[21px]">Contractors &amp; Builders</h3>
        <p class="mt-2 text-[16px] leading-[1.5] text-muted">Takes project enquiries properly while the team is on site.</p>
        <ul class="mt-4 space-y-1.5 text-[16px] leading-snug">
          <li class="flex gap-2.5"><svg class="icon mt-[3px] text-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span>Take the brief: type, size, budget, timing</span></li>
          <li class="flex gap-2.5"><svg class="icon mt-[3px] text-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span>Book site visits and quotes</span></li>
          <li class="flex gap-2.5"><svg class="icon mt-[3px] text-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span>Route clients to their site manager</span></li>
        </ul>
        </div>
      </article>
      <article class="grid items-start gap-4 rounded-[18px] border border-line bg-surface p-5 sm:grid-cols-[160px_minmax(0,1fr)] sm:gap-6" data-industry data-group="professional">
        <span class="block h-[120px] w-full rounded-[12px] bg-paper p-2 sm:w-[160px]" aria-hidden="true"><svg viewBox="0 0 200 150" class="h-full w-full" aria-hidden="true">
    <ellipse cx="92" cy="132" rx="74" ry="13.32" class="il-shadow"/>
    <path d="M28 52 L92 22 L156 52 Z" class="il-roof"/>
    <rect x="34" y="52" width="116" height="8" class="il-ink"/>
    <rect x="44" y="62" width="14" height="56" rx="2" class="il-wall"/><rect x="70" y="62" width="14" height="56" rx="2" class="il-wall"/><rect x="96" y="62" width="14" height="56" rx="2" class="il-wall"/><rect x="122" y="62" width="14" height="56" rx="2" class="il-wall"/>
    <rect x="28" y="118" width="128" height="10" rx="2" class="il-ink"/>
    <g class="il-bubble" transform="translate(132 12)">
    <rect x="0" y="0" width="54" height="38" rx="10" class="il-card"/>
    <path d="M14 38 L10 48 L24 38 Z" class="il-card"/>
    <path d="M27 8 V30 M17 30 H37 M13 14 H41" class="il-stroke"/><path d="M13 14 L8 24 H18 Z M41 14 L36 24 H46 Z" class="il-goldline"/>
  </g>
  </svg></span>
        <div class="min-w-0">
        <h3 class="!text-[21px]">Law Firms</h3>
        <p class="mt-2 text-[16px] leading-[1.5] text-muted">Takes new enquiries and routes existing clients while fee earners are in court or meetings.</p>
        <ul class="mt-4 space-y-1.5 text-[16px] leading-snug">
          <li class="flex gap-2.5"><svg class="icon mt-[3px] text-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span>Capture new enquiries and area of law</span></li>
          <li class="flex gap-2.5"><svg class="icon mt-[3px] text-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span>Book initial consultations</span></li>
          <li class="flex gap-2.5"><svg class="icon mt-[3px] text-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span>Route clients to their named solicitor</span></li>
        </ul>
        <p class="mt-3 flex items-center gap-2 rounded-[10px] border border-line bg-surface px-3 py-2 text-[16px] font-semibold"><svg class="icon text-hl" aria-hidden="true" focusable="false"><use href="#i-shield"/></svg><span>No legal advice given.</span></p>
        </div>
      </article>
      <article class="grid items-start gap-4 rounded-[18px] border border-line bg-surface p-5 sm:grid-cols-[160px_minmax(0,1fr)] sm:gap-6" data-industry data-group="professional">
        <span class="block h-[120px] w-full rounded-[12px] bg-paper p-2 sm:w-[160px]" aria-hidden="true"><svg viewBox="0 0 200 150" class="h-full w-full" aria-hidden="true">
    <ellipse cx="96" cy="128" rx="80" ry="14.399999999999999" class="il-shadow"/>
    <path d="M22 108 V92 Q22 84 30 82 L52 78 L72 60 Q78 55 88 55 H128 Q138 55 144 62 L160 80 L172 84 Q178 86 178 94 V108 Z" class="il-gold"/>
    <path d="M78 64 H104 V80 H62 Z M110 64 H130 Q134 64 137 68 L146 80 H110 Z" class="il-win"/>
    <circle cx="58" cy="110" r="15" class="il-ink"/><circle cx="58" cy="110" r="6" class="il-card"/>
    <circle cx="144" cy="110" r="15" class="il-ink"/><circle cx="144" cy="110" r="6" class="il-card"/>
    <g class="il-bubble" transform="translate(12 8)">
    <rect x="0" y="0" width="54" height="38" rx="10" class="il-card"/>
    <path d="M14 38 L10 48 L24 38 Z" class="il-card"/>
    <circle cx="20" cy="19" r="7" class="il-goldline"/><path d="M27 19 H44 M38 19 V25 M43 19 V24" class="il-stroke"/>
  </g>
  </svg></span>
        <div class="min-w-0">
        <h3 class="!text-[21px]">Car Dealerships</h3>
        <p class="mt-2 text-[16px] leading-[1.5] text-muted">Answers sales and service calls so nobody rings off while the desk is busy.</p>
        <ul class="mt-4 space-y-1.5 text-[16px] leading-snug">
          <li class="flex gap-2.5"><svg class="icon mt-[3px] text-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span>Book test drives and services</span></li>
          <li class="flex gap-2.5"><svg class="icon mt-[3px] text-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span>Stock and opening-hours questions</span></li>
          <li class="flex gap-2.5"><svg class="icon mt-[3px] text-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span>Collect part-exchange details</span></li>
        </ul>
        </div>
      </article>
            <aside class="on-band grid items-center gap-4 rounded-[18px] bg-band p-5 text-band-ink sm:grid-cols-[120px_minmax(0,1fr)] sm:gap-6 lg:col-span-2" aria-labelledby="industries-cta-title">
        <span class="grid size-[88px] place-items-center rounded-[12px] bg-white/5 sm:size-[120px]" aria-hidden="true"><span class="grid size-14 place-items-center rounded-[14px] sm:size-16 bg-gold text-navy"><svg class="icon !h-7 !w-7" aria-hidden="true" focusable="false"><use href="#i-phone"/></svg></span></span>
        <div class="min-w-0">
        <h3 id="industries-cta-title" class="!text-[21px]">Not sure how your calls would fit?</h3>
        <p class="mt-2 text-[16px] leading-[1.5] text-band-muted">Tell us who rings you and why. We'll map your calls and show you what an agent would handle and what it would pass to your team.</p>
        <div class="pt-4">
          <a href="#book-demo-form" class="btn btn-primary" data-track="industries_cta_book_demo">Book a Voice Agent Demo</a>
        </div>
        </div>
      </aside>
    </div>
  </div>
</section>

<section id="feedback" data-component="ClientFeedback">
  <div class="container-omh py-14 lg:py-20">
    <div>
      <div>
        <p class="eyebrow"><span class="eyebrow-mark" aria-hidden="true"><i></i><i></i><i></i></span>Client feedback</p>
        <h2>Proof goes here <span class="hl">when it's real</span></h2>
      </div>
      <p class="mt-5 text-muted">Voice agents are a new service for us, so we haven't filled this wall with invented praise. Each video below is reserved for a client and stays marked as pending until we have checked their results.</p>
    </div>

    <dl class="mt-12 grid border-y border-[var(--va-line-strong)] sm:grid-cols-3">
      <div class="py-5 sm:pr-6"><dd class="font-display text-[30px] font-semibold leading-none tnum">1,284</dd><dt class="mt-1.5 text-[16px] text-muted">calls answered</dt></div>
      <div class="border-t border-line py-5 sm:border-l sm:border-t-0 sm:px-6"><dd class="font-display text-[30px] font-semibold leading-none tnum">317</dd><dt class="mt-1.5 text-[16px] text-muted">bookings made</dt></div>
      <div class="border-t border-line py-5 sm:border-l sm:border-t-0 sm:pl-6"><dd class="font-display text-[30px] font-semibold leading-none tnum">38%</dd><dt class="mt-1.5 text-[16px] text-muted">answered out of hours</dt></div>
    </dl>

    <div class="va-car mt-10" data-carousel data-autoplay>
    <div class="va-car-track" style="--car-w:380px" tabindex="0" aria-label="Client feedback, scroll sideways">
      <figure class="flex flex-col rounded-[16px] border border-line bg-surface p-3 transition-colors hover:border-[var(--va-line-strong)]" data-audio-card>
        <div class="audio-panel relative aspect-video overflow-hidden rounded-[11px] bg-[var(--va-tint-1)]">
          <span class="pointer-events-none absolute -right-6 -top-4 text-ink/10" aria-hidden="true"><svg class="icon !h-[150px] !w-[150px]" aria-hidden="true" focusable="false"><use href="#i-home"/></svg></span>
          <button type="button" class="audio-toggle" data-audio-toggle aria-label="Play the recording" data-track="feedback_audio_play" data-track-name="Real estate call"><svg class="icon i-play" aria-hidden="true" focusable="false"><use href="#i-play"/></svg><svg class="icon i-pause" aria-hidden="true" focusable="false"><use href="#i-pause"/></svg></button>
          <div class="absolute inset-x-4 bottom-3 flex items-center gap-3">
            <div class="audio-wave" data-audio-wave role="slider" tabindex="0" aria-label="Recording position" aria-valuemin="0" aria-valuemax="141" aria-valuenow="0" aria-valuetext="0:00 of 2:21"><i style="--h:30%"></i><i style="--h:55%"></i><i style="--h:80%"></i><i style="--h:45%"></i><i style="--h:65%"></i><i style="--h:90%"></i><i style="--h:50%"></i><i style="--h:35%"></i><i style="--h:70%"></i><i style="--h:85%"></i><i style="--h:40%"></i><i style="--h:60%"></i><i style="--h:75%"></i><i style="--h:30%"></i><i style="--h:50%"></i><i style="--h:65%"></i><i style="--h:45%"></i><i style="--h:80%"></i><i style="--h:55%"></i><i style="--h:35%"></i><i style="--h:60%"></i><i style="--h:40%"></i><i style="--h:70%"></i><i style="--h:90%"></i><i style="--h:50%"></i><i style="--h:65%"></i><i style="--h:30%"></i><i style="--h:75%"></i><i style="--h:45%"></i><i style="--h:85%"></i><i style="--h:55%"></i><i style="--h:40%"></i></div>
            <span class="audio-time tnum" data-audio-time>0:00 / 2:21</span>
          </div>
        </div>
        <figcaption class="flex flex-1 flex-col px-2 pb-2 pt-4">
          <h3 class="!text-[20px] !leading-[1.3]">AI Voice Agent for Real Estate</h3>
          <p class="mt-2 text-[16px] leading-[1.5] text-muted">A recorded call with our AI voice agent answering a property enquiry for a real estate agency.</p>
        </figcaption>
        <audio preload="none" src="/audio/Realest%20voice%20agent.m4a" data-audio></audio>
      </figure>
      <figure class="flex flex-col rounded-[16px] border border-line bg-surface p-3 transition-colors hover:border-[var(--va-line-strong)]" data-audio-card data-audio-pending>
        <div class="audio-panel relative aspect-video overflow-hidden rounded-[11px] bg-[var(--va-tint-4)]">
          <span class="pointer-events-none absolute -right-6 -top-4 text-ink/10" aria-hidden="true"><svg class="icon !h-[150px] !w-[150px]" aria-hidden="true" focusable="false"><use href="#i-flame"/></svg></span>
          <button type="button" class="audio-toggle" aria-disabled="true" aria-label="Recording coming soon" title="Recording coming soon"><svg class="icon i-play" aria-hidden="true" focusable="false"><use href="#i-play"/></svg><svg class="icon i-pause" aria-hidden="true" focusable="false"><use href="#i-pause"/></svg></button>
          <div class="absolute inset-x-4 bottom-3 flex items-center gap-3">
            <div class="audio-wave" aria-hidden="true"><i style="--h:90%"></i><i style="--h:50%"></i><i style="--h:35%"></i><i style="--h:70%"></i><i style="--h:85%"></i><i style="--h:40%"></i><i style="--h:60%"></i><i style="--h:75%"></i><i style="--h:30%"></i><i style="--h:50%"></i><i style="--h:65%"></i><i style="--h:45%"></i><i style="--h:80%"></i><i style="--h:55%"></i><i style="--h:35%"></i><i style="--h:60%"></i><i style="--h:40%"></i><i style="--h:70%"></i><i style="--h:90%"></i><i style="--h:50%"></i><i style="--h:65%"></i><i style="--h:30%"></i><i style="--h:75%"></i><i style="--h:45%"></i><i style="--h:85%"></i><i style="--h:55%"></i><i style="--h:40%"></i><i style="--h:30%"></i><i style="--h:55%"></i><i style="--h:80%"></i><i style="--h:45%"></i><i style="--h:65%"></i></div>
            <span class="audio-time tnum">0:00 / --:--</span>
          </div>
        </div>
        <figcaption class="flex flex-1 flex-col px-2 pb-2 pt-4">
          <h3 class="!text-[20px] !leading-[1.3]">AI Voice Agent for Heating Engineers</h3>
          <p class="mt-2 text-[16px] leading-[1.5] text-muted">Our AI voice agent taking an out-of-hours boiler breakdown call and booking the repair.</p>
        </figcaption>
      </figure>
      <figure class="flex flex-col rounded-[16px] border border-line bg-surface p-3 transition-colors hover:border-[var(--va-line-strong)]" data-audio-card data-audio-pending>
        <div class="audio-panel relative aspect-video overflow-hidden rounded-[11px] bg-[var(--va-tint-2)]">
          <span class="pointer-events-none absolute -right-6 -top-4 text-ink/10" aria-hidden="true"><svg class="icon !h-[150px] !w-[150px]" aria-hidden="true" focusable="false"><use href="#i-home"/></svg></span>
          <button type="button" class="audio-toggle" aria-disabled="true" aria-label="Recording coming soon" title="Recording coming soon"><svg class="icon i-play" aria-hidden="true" focusable="false"><use href="#i-play"/></svg><svg class="icon i-pause" aria-hidden="true" focusable="false"><use href="#i-pause"/></svg></button>
          <div class="absolute inset-x-4 bottom-3 flex items-center gap-3">
            <div class="audio-wave" aria-hidden="true"><i style="--h:40%"></i><i style="--h:60%"></i><i style="--h:75%"></i><i style="--h:30%"></i><i style="--h:50%"></i><i style="--h:65%"></i><i style="--h:45%"></i><i style="--h:80%"></i><i style="--h:55%"></i><i style="--h:35%"></i><i style="--h:60%"></i><i style="--h:40%"></i><i style="--h:70%"></i><i style="--h:90%"></i><i style="--h:50%"></i><i style="--h:65%"></i><i style="--h:30%"></i><i style="--h:75%"></i><i style="--h:45%"></i><i style="--h:85%"></i><i style="--h:55%"></i><i style="--h:40%"></i><i style="--h:30%"></i><i style="--h:55%"></i><i style="--h:80%"></i><i style="--h:45%"></i><i style="--h:65%"></i><i style="--h:90%"></i><i style="--h:50%"></i><i style="--h:35%"></i><i style="--h:70%"></i><i style="--h:85%"></i></div>
            <span class="audio-time tnum">0:00 / --:--</span>
          </div>
        </div>
        <figcaption class="flex flex-1 flex-col px-2 pb-2 pt-4">
          <h3 class="!text-[20px] !leading-[1.3]">AI Voice Agent for Letting Agents</h3>
          <p class="mt-2 text-[16px] leading-[1.5] text-muted">Our AI voice agent booking a viewing for a letting agency while the team is out.</p>
        </figcaption>
      </figure>
      <figure class="flex flex-col rounded-[16px] border border-line bg-surface p-3 transition-colors hover:border-[var(--va-line-strong)]" data-audio-card data-audio-pending>
        <div class="audio-panel relative aspect-video overflow-hidden rounded-[11px] bg-[var(--va-tint-2)]">
          <span class="pointer-events-none absolute -right-6 -top-4 text-ink/10" aria-hidden="true"><svg class="icon !h-[150px] !w-[150px]" aria-hidden="true" focusable="false"><use href="#i-scale"/></svg></span>
          <button type="button" class="audio-toggle" aria-disabled="true" aria-label="Recording coming soon" title="Recording coming soon"><svg class="icon i-play" aria-hidden="true" focusable="false"><use href="#i-play"/></svg><svg class="icon i-pause" aria-hidden="true" focusable="false"><use href="#i-pause"/></svg></button>
          <div class="absolute inset-x-4 bottom-3 flex items-center gap-3">
            <div class="audio-wave" aria-hidden="true"><i style="--h:65%"></i><i style="--h:45%"></i><i style="--h:80%"></i><i style="--h:55%"></i><i style="--h:35%"></i><i style="--h:60%"></i><i style="--h:40%"></i><i style="--h:70%"></i><i style="--h:90%"></i><i style="--h:50%"></i><i style="--h:65%"></i><i style="--h:30%"></i><i style="--h:75%"></i><i style="--h:45%"></i><i style="--h:85%"></i><i style="--h:55%"></i><i style="--h:40%"></i><i style="--h:30%"></i><i style="--h:55%"></i><i style="--h:80%"></i><i style="--h:45%"></i><i style="--h:65%"></i><i style="--h:90%"></i><i style="--h:50%"></i><i style="--h:35%"></i><i style="--h:70%"></i><i style="--h:85%"></i><i style="--h:40%"></i><i style="--h:60%"></i><i style="--h:75%"></i><i style="--h:30%"></i><i style="--h:50%"></i></div>
            <span class="audio-time tnum">0:00 / --:--</span>
          </div>
        </div>
        <figcaption class="flex flex-1 flex-col px-2 pb-2 pt-4">
          <h3 class="!text-[20px] !leading-[1.3]">AI Voice Agent for Law Firms</h3>
          <p class="mt-2 text-[16px] leading-[1.5] text-muted">Our AI voice agent taking a new enquiry for a law firm while fee earners are in court.</p>
        </figcaption>
      </figure>
      <figure class="flex flex-col rounded-[16px] border border-line bg-surface p-3 transition-colors hover:border-[var(--va-line-strong)]" data-audio-card data-audio-pending>
        <div class="audio-panel relative aspect-video overflow-hidden rounded-[11px] bg-[var(--va-tint-3)]">
          <span class="pointer-events-none absolute -right-6 -top-4 text-ink/10" aria-hidden="true"><svg class="icon !h-[150px] !w-[150px]" aria-hidden="true" focusable="false"><use href="#i-car"/></svg></span>
          <button type="button" class="audio-toggle" aria-disabled="true" aria-label="Recording coming soon" title="Recording coming soon"><svg class="icon i-play" aria-hidden="true" focusable="false"><use href="#i-play"/></svg><svg class="icon i-pause" aria-hidden="true" focusable="false"><use href="#i-pause"/></svg></button>
          <div class="absolute inset-x-4 bottom-3 flex items-center gap-3">
            <div class="audio-wave" aria-hidden="true"><i style="--h:60%"></i><i style="--h:40%"></i><i style="--h:70%"></i><i style="--h:90%"></i><i style="--h:50%"></i><i style="--h:65%"></i><i style="--h:30%"></i><i style="--h:75%"></i><i style="--h:45%"></i><i style="--h:85%"></i><i style="--h:55%"></i><i style="--h:40%"></i><i style="--h:30%"></i><i style="--h:55%"></i><i style="--h:80%"></i><i style="--h:45%"></i><i style="--h:65%"></i><i style="--h:90%"></i><i style="--h:50%"></i><i style="--h:35%"></i><i style="--h:70%"></i><i style="--h:85%"></i><i style="--h:40%"></i><i style="--h:60%"></i><i style="--h:75%"></i><i style="--h:30%"></i><i style="--h:50%"></i><i style="--h:65%"></i><i style="--h:45%"></i><i style="--h:80%"></i><i style="--h:55%"></i><i style="--h:35%"></i></div>
            <span class="audio-time tnum">0:00 / --:--</span>
          </div>
        </div>
        <figcaption class="flex flex-1 flex-col px-2 pb-2 pt-4">
          <h3 class="!text-[20px] !leading-[1.3]">AI Voice Agent for Car Dealerships</h3>
          <p class="mt-2 text-[16px] leading-[1.5] text-muted">Our AI voice agent booking a test drive or service slot for a car dealership.</p>
        </figcaption>
      </figure>
      <figure class="flex flex-col rounded-[16px] border border-line bg-surface p-3 transition-colors hover:border-[var(--va-line-strong)]" data-audio-card data-audio-pending>
        <div class="audio-panel relative aspect-video overflow-hidden rounded-[11px] bg-[var(--va-tint-1)]">
          <span class="pointer-events-none absolute -right-6 -top-4 text-ink/10" aria-hidden="true"><svg class="icon !h-[150px] !w-[150px]" aria-hidden="true" focusable="false"><use href="#i-hard-hat"/></svg></span>
          <button type="button" class="audio-toggle" aria-disabled="true" aria-label="Recording coming soon" title="Recording coming soon"><svg class="icon i-play" aria-hidden="true" focusable="false"><use href="#i-play"/></svg><svg class="icon i-pause" aria-hidden="true" focusable="false"><use href="#i-pause"/></svg></button>
          <div class="absolute inset-x-4 bottom-3 flex items-center gap-3">
            <div class="audio-wave" aria-hidden="true"><i style="--h:65%"></i><i style="--h:30%"></i><i style="--h:75%"></i><i style="--h:45%"></i><i style="--h:85%"></i><i style="--h:55%"></i><i style="--h:40%"></i><i style="--h:30%"></i><i style="--h:55%"></i><i style="--h:80%"></i><i style="--h:45%"></i><i style="--h:65%"></i><i style="--h:90%"></i><i style="--h:50%"></i><i style="--h:35%"></i><i style="--h:70%"></i><i style="--h:85%"></i><i style="--h:40%"></i><i style="--h:60%"></i><i style="--h:75%"></i><i style="--h:30%"></i><i style="--h:50%"></i><i style="--h:65%"></i><i style="--h:45%"></i><i style="--h:80%"></i><i style="--h:55%"></i><i style="--h:35%"></i><i style="--h:60%"></i><i style="--h:40%"></i><i style="--h:70%"></i><i style="--h:90%"></i><i style="--h:50%"></i></div>
            <span class="audio-time tnum">0:00 / --:--</span>
          </div>
        </div>
        <figcaption class="flex flex-1 flex-col px-2 pb-2 pt-4">
          <h3 class="!text-[20px] !leading-[1.3]">AI Voice Agent for Builders</h3>
          <p class="mt-2 text-[16px] leading-[1.5] text-muted">Our AI voice agent taking a quote request for a builder while the team is on site.</p>
        </figcaption>
      </figure>
    </div>
    <div class="va-car-ui">
      <button type="button" class="va-car-btn" data-car-prev aria-label="Previous testimonial"><svg class="icon" aria-hidden="true" focusable="false"><use href="#i-arrow-left"/></svg></button>
      <div class="va-car-wave" aria-hidden="true" data-car-wave><i style="--h:40%"></i><i style="--h:70%"></i><i style="--h:55%"></i><i style="--h:90%"></i><i style="--h:45%"></i><i style="--h:75%"></i></div>
      <span class="va-car-status" data-car-status aria-live="polite">1 / 6</span>
      <button type="button" class="va-car-btn" data-car-next aria-label="Next testimonial"><svg class="icon" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></button>
    </div>
    </div>
  </div>
</section>


<section id="right-fit" data-component="RightFit" class="bg-surface">
  <div class="container-omh py-14 lg:py-20">
    <div class="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,.9fr)] lg:items-start" data-fit>
      <div>
        <p class="eyebrow"><span class="eyebrow-mark" aria-hidden="true"><i></i><i></i><i></i></span>Is it the right fit?</p>
        <h2>A voice agent <span class="hl">isn't for everyone</span></h2>
        <p class="mt-5 text-muted">We'd rather tell you now than three months in. Answer five quick questions and see for yourself. Nothing is sent anywhere.</p>
        <form class="hover-card mt-8 rounded-[18px] border border-line bg-paper p-5 sm:p-6" data-fit-form>
          <ol class="divide-y divide-line">
          <li>
            <fieldset class="flex flex-col gap-2.5 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <legend class="float-left pr-2 text-[16px] leading-snug"><span class="num mr-2 text-[14px]">01</span>Do you miss calls when your team is busy, on site or closed?</legend>
              <span class="flex shrink-0 gap-1.5">
                <label class="relative"><input type="radio" name="fit-q0" value="yes" class="peer sr-only" data-fit-q="0" data-track="fit_check_answer" data-track-name="Q1 yes"><span class="flex min-h-[40px] min-w-[56px] items-center justify-center rounded-full border border-[var(--va-line-strong)] px-3 text-[15px] font-semibold peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--va-hl)]">Yes</span></label>
                <label class="relative"><input type="radio" name="fit-q0" value="no" class="peer sr-only" data-fit-q="0" data-track="fit_check_answer" data-track-name="Q1 no"><span class="flex min-h-[40px] min-w-[56px] items-center justify-center rounded-full border border-[var(--va-line-strong)] px-3 text-[15px] font-semibold peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--va-hl)]">No</span></label>
              </span>
            </fieldset>
          </li>
          <li>
            <fieldset class="flex flex-col gap-2.5 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <legend class="float-left pr-2 text-[16px] leading-snug"><span class="num mr-2 text-[14px]">02</span>Are most of your calls the same few requests?</legend>
              <span class="flex shrink-0 gap-1.5">
                <label class="relative"><input type="radio" name="fit-q1" value="yes" class="peer sr-only" data-fit-q="1" data-track="fit_check_answer" data-track-name="Q2 yes"><span class="flex min-h-[40px] min-w-[56px] items-center justify-center rounded-full border border-[var(--va-line-strong)] px-3 text-[15px] font-semibold peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--va-hl)]">Yes</span></label>
                <label class="relative"><input type="radio" name="fit-q1" value="no" class="peer sr-only" data-fit-q="1" data-track="fit_check_answer" data-track-name="Q2 no"><span class="flex min-h-[40px] min-w-[56px] items-center justify-center rounded-full border border-[var(--va-line-strong)] px-3 text-[15px] font-semibold peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--va-hl)]">No</span></label>
              </span>
            </fieldset>
          </li>
          <li>
            <fieldset class="flex flex-col gap-2.5 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <legend class="float-left pr-2 text-[16px] leading-snug"><span class="num mr-2 text-[14px]">03</span>Could one missed call cost you a customer worth real money?</legend>
              <span class="flex shrink-0 gap-1.5">
                <label class="relative"><input type="radio" name="fit-q2" value="yes" class="peer sr-only" data-fit-q="2" data-track="fit_check_answer" data-track-name="Q3 yes"><span class="flex min-h-[40px] min-w-[56px] items-center justify-center rounded-full border border-[var(--va-line-strong)] px-3 text-[15px] font-semibold peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--va-hl)]">Yes</span></label>
                <label class="relative"><input type="radio" name="fit-q2" value="no" class="peer sr-only" data-fit-q="2" data-track="fit_check_answer" data-track-name="Q3 no"><span class="flex min-h-[40px] min-w-[56px] items-center justify-center rounded-full border border-[var(--va-line-strong)] px-3 text-[15px] font-semibold peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--va-hl)]">No</span></label>
              </span>
            </fieldset>
          </li>
          <li>
            <fieldset class="flex flex-col gap-2.5 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <legend class="float-left pr-2 text-[16px] leading-snug"><span class="num mr-2 text-[14px]">04</span>Do you have a diary or system bookings can go into?</legend>
              <span class="flex shrink-0 gap-1.5">
                <label class="relative"><input type="radio" name="fit-q3" value="yes" class="peer sr-only" data-fit-q="3" data-track="fit_check_answer" data-track-name="Q4 yes"><span class="flex min-h-[40px] min-w-[56px] items-center justify-center rounded-full border border-[var(--va-line-strong)] px-3 text-[15px] font-semibold peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--va-hl)]">Yes</span></label>
                <label class="relative"><input type="radio" name="fit-q3" value="no" class="peer sr-only" data-fit-q="3" data-track="fit_check_answer" data-track-name="Q4 no"><span class="flex min-h-[40px] min-w-[56px] items-center justify-center rounded-full border border-[var(--va-line-strong)] px-3 text-[15px] font-semibold peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--va-hl)]">No</span></label>
              </span>
            </fieldset>
          </li>
          <li>
            <fieldset class="flex flex-col gap-2.5 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <legend class="float-left pr-2 text-[16px] leading-snug"><span class="num mr-2 text-[14px]">05</span>Are you happy for callers to be told they are speaking to an AI?</legend>
              <span class="flex shrink-0 gap-1.5">
                <label class="relative"><input type="radio" name="fit-q4" value="yes" class="peer sr-only" data-fit-q="4" data-track="fit_check_answer" data-track-name="Q5 yes"><span class="flex min-h-[40px] min-w-[56px] items-center justify-center rounded-full border border-[var(--va-line-strong)] px-3 text-[15px] font-semibold peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--va-hl)]">Yes</span></label>
                <label class="relative"><input type="radio" name="fit-q4" value="no" class="peer sr-only" data-fit-q="4" data-track="fit_check_answer" data-track-name="Q5 no"><span class="flex min-h-[40px] min-w-[56px] items-center justify-center rounded-full border border-[var(--va-line-strong)] px-3 text-[15px] font-semibold peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--va-hl)]">No</span></label>
              </span>
            </fieldset>
          </li>
          </ol>
          <div class="mt-5 flex flex-col items-start gap-4 rounded-[14px] bg-sand p-5 sm:flex-row sm:items-center sm:gap-5" aria-live="polite" data-fit-result data-state="empty">
            <svg viewBox="-6 0 212 136" class="shrink-0" role="img" aria-label="Fit gauge" data-fit-gauge>
              <path d="M20 100 A80 80 0 0 1 180 100" class="fit-track"/>
              <path d="M20 100 A80 80 0 0 1 180 100" class="fit-fill" style="stroke-dasharray:251.3;stroke-dashoffset:251.3" data-fit-arc data-arc="251.3"/>
              <g class="fit-needle" style="transform:rotate(-90deg)" data-fit-needle><line x1="100" y1="100" x2="100" y2="34"/><circle cx="100" cy="100" r="7"/></g>
              <text x="20" y="132" class="fit-tick" text-anchor="middle">0</text>
              <text x="180" y="132" class="fit-tick" text-anchor="middle">5</text>
            </svg>
            <div class="min-w-0 flex-1">
              <p class="font-display text-[24px] font-semibold leading-tight" data-fit-title>Start with question 1</p>
              <p class="mt-1.5 text-[16px] leading-snug text-muted" data-fit-text>Tap Yes or No on each question. Your fit builds here as you answer.</p>
              <div class="fit-dots mt-3" aria-hidden="true" data-fit-dots><i></i><i></i><i></i><i></i><i></i></div>
              <p class="mt-1.5 text-[15px] font-semibold text-muted tnum" data-fit-count>0 of 5 answered</p>
              <a href="#book-demo-form" class="btn btn-primary mt-3" data-fit-cta data-track="fit_check_book_demo" hidden>Book a 30-Minute Demo</a>
            </div>
            <button type="reset" class="inline-flex min-h-[44px] items-center gap-1.5 self-start text-[15px] font-semibold text-muted hover:text-ink" data-track="fit_check_reset"><svg class="icon" aria-hidden="true" focusable="false"><use href="#i-replay"/></svg>Start again</button>
          </div>
        </form>
      </div>
      <div class="grid gap-5 lg:mt-[4.5rem]">
        <div class="hover-card rounded-[18px] border border-[color-mix(in_srgb,var(--va-ok)_35%,transparent)] bg-[color-mix(in_srgb,var(--va-ok)_7%,var(--va-surface))] p-5 sm:p-6">
          <h3 class="flex items-center gap-3 !text-[20px]"><span class="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ok text-surface"><svg class="icon" aria-hidden="true" focusable="false"><use href="#i-check"/></svg></span>A good fit if</h3>
          <ul class="mt-4 space-y-2.5 text-[16px] leading-snug text-muted [&_.icon]:text-ok">
          <li class="flex gap-2.5"><svg class="icon mt-[3px] shrink-0" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span><strong class="font-semibold text-ink">You miss calls</strong> while your team is with customers, on site or closed for the day.</span></li>
          <li class="flex gap-2.5"><svg class="icon mt-[3px] shrink-0" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span><strong class="font-semibold text-ink">Most calls repeat themselves:</strong> bookings, opening hours, prices and availability.</span></li>
          <li class="flex gap-2.5"><svg class="icon mt-[3px] shrink-0" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span><strong class="font-semibold text-ink">Each customer is worth real money,</strong> so one missed call can cost more than the agent.</span></li>
          <li class="flex gap-2.5"><svg class="icon mt-[3px] shrink-0" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span><strong class="font-semibold text-ink">You have a diary or booking system</strong> the agent can book into.</span></li>
          </ul>
        </div>
        <div class="hover-card rounded-[18px] border border-line bg-paper p-5 sm:p-6">
          <h3 class="flex items-center gap-3 !text-[20px]"><span class="grid h-9 w-9 shrink-0 place-items-center rounded-full border-[1.5px] border-[var(--va-line-strong)] text-muted"><svg class="icon" aria-hidden="true" focusable="false"><use href="#i-x"/></svg></span>Not the right fit if</h3>
          <ul class="mt-4 space-y-2.5 text-[16px] leading-snug text-muted [&_.icon]:text-muted">
          <li class="flex gap-2.5"><svg class="icon mt-[3px] shrink-0" aria-hidden="true" focusable="false"><use href="#i-x"/></svg><span><strong class="font-semibold text-ink">Your phone is quiet</strong> and you already answer every call.</span></li>
          <li class="flex gap-2.5"><svg class="icon mt-[3px] shrink-0" aria-hidden="true" focusable="false"><use href="#i-x"/></svg><span><strong class="font-semibold text-ink">Every call needs expert judgement from the first sentence.</strong> A good receptionist or answering service will serve you better.</span></li>
          <li class="flex gap-2.5"><svg class="icon mt-[3px] shrink-0" aria-hidden="true" focusable="false"><use href="#i-x"/></svg><span><strong class="font-semibold text-ink">The line handles emergencies or life-critical calls.</strong> An AI agent should never be the only route there.</span></li>
          <li class="flex gap-2.5"><svg class="icon mt-[3px] shrink-0" aria-hidden="true" focusable="false"><use href="#i-x"/></svg><span><strong class="font-semibold text-ink">You want callers to think it's a person, or want to cold call people who haven't agreed to hear from you.</strong> We won't build either.</span></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

${roiCalculator("any-business")}

<section id="compare" data-component="Compare">
  <div class="container-omh py-14 lg:py-20">
    <div>
      <div>
        <p class="eyebrow"><span class="eyebrow-mark" aria-hidden="true"><i></i><i></i><i></i></span>Compare your options</p>
        <h2>How an AI voice agent compares with <span class="hl">the usual answers</span></h2>
      </div>
      <p class="mt-5 text-muted">Most businesses handle missed calls with voicemail, an answering service, more reception staff or a DIY tool. Here's an honest side-by-side, including where each option wins.</p>
    </div>

    <div class="mt-12 hidden overflow-hidden rounded-[18px] border border-line bg-surface shadow-[0_30px_60px_-45px_rgb(0_0_0/0.45)] lg:block">
      <table class="cmp-table w-full border-separate border-spacing-0 text-left text-[16px] leading-snug">
        <caption class="sr-only">OMH AI voice agent compared with voicemail, an answering service, a receptionist and a DIY platform</caption>
        <thead>
          <tr>
            <th scope="col" class="w-[16%] px-5 pb-4 pt-5 align-bottom text-[16px] font-semibold uppercase tracking-[0.14em] text-muted">What matters</th>
            <th scope="col" class="cmp-omh w-[16.8%] px-5 pb-4 pt-5 align-bottom text-ink"><span class="mb-2 inline-flex rounded-full bg-gold px-2.5 py-0.5 text-[16px] font-semibold text-navy">Managed for you</span><span class="block font-display text-[18px] font-semibold">OMH AI voice agent</span></th>${cmpCols.slice(1).map((c) => `<th scope="col" class="w-[16.8%] px-5 pb-4 pt-5 align-bottom"><span class="font-display text-[18px] font-semibold text-ink">${c}</span></th>`).join("\n")}
          </tr>
        </thead>
        <tbody>
${cmpRows.map(([k, ...v]) => `          <tr>
            <th scope="row" class="border-t border-line px-5 py-4 align-top font-display text-[16px] font-semibold">${k}</th>
            ${v.map((t, i) => `<td class="${i ? "text-muted" : "cmp-omh font-semibold"} border-t border-line px-5 py-4 align-top">${t}</td>`).join("\n")}
          </tr>`).join("\n")}
        </tbody>
      </table>
    </div>

    <div class="mt-10 lg:hidden" data-cmp>
      <p class="font-semibold" id="cmp-pick-label">Compare OMH with</p>
      <div role="radiogroup" aria-labelledby="cmp-pick-label" class="mt-3 flex flex-wrap gap-2" data-cmp-group>
${cmpCols.slice(1).map((c, i) => `        <button type="button" role="radio" aria-checked="${!i}" tabindex="${i ? -1 : 0}" class="min-h-[44px] rounded-full border border-[var(--va-line-strong)] px-4 text-[16px] font-semibold aria-checked:border-ink aria-checked:bg-ink aria-checked:text-paper" data-cmp-opt="${i + 1}" data-track="compare_option" data-track-name="${c}">${c}</button>`).join("\n")}
      </div>
      <p class="sr-only" aria-live="polite">Comparing OMH with <span data-cmp-name>${cmpCols[1]}</span></p>
      <dl class="mt-5 space-y-3">
${cmpRows.map(([k, omh, ...v]) => `        <div class="rounded-[14px] border border-line bg-surface p-4">
          <dt class="text-[16px] font-semibold">${k}</dt>
          <dd class="mt-3 grid grid-cols-2 gap-2 text-[15px] leading-snug">
            <span class="cmp-omh rounded-[10px] p-3"><span class="block text-[13px] font-semibold uppercase tracking-[0.1em] text-hl">OMH</span><span class="mt-1 block font-semibold">${omh}</span></span>
            ${v.map((t, i) => `<span class="rounded-[10px] bg-paper p-3" data-cmp-cell="${i + 1}"${i ? " hidden" : ""}><span class="block text-[13px] font-semibold uppercase tracking-[0.1em] text-muted">${cmpCols[i + 1]}</span><span class="mt-1 block text-muted">${t}</span></span>`).join("\n")}
          </dd>
        </div>`).join("\n")}
      </dl>
    </div>

  </div>
</section>

<section id="faq" data-component="FAQ" class="bg-surface">
  <div class="container-omh grid gap-10 py-20 lg:grid-cols-[minmax(0,.72fr)_minmax(0,1.28fr)] lg:grid-rows-[auto_1fr] lg:gap-x-14 lg:gap-y-8 lg:py-28">
    <div>
      <p class="eyebrow"><span class="eyebrow-mark" aria-hidden="true"><i></i><i></i><i></i></span>Questions</p>
      <h2>AI voice agent <span class="hl">FAQs</span></h2>
      <p class="mt-5 text-muted">Straight answers to the questions owners and practice managers ask us most.</p>
    </div>

    <div class="order-last lg:order-none lg:col-start-1 lg:row-start-2 lg:sticky lg:top-28 lg:self-start">
      <div class="rounded-[16px] bg-band p-6 text-band-ink on-band">
        <p class="font-display text-body font-semibold">Still have a question?</p>
        <p class="mt-1.5 text-[16px] leading-snug text-band-muted">Talk to a person on our UK team. No sales script.</p>
        <ul class="mt-4 space-y-1 text-[16px]">
          <li><a href="tel:+442034893934" class="text-link tnum" data-track="faq_phone_click"><svg class="icon " aria-hidden="true" focusable="false"><use href="#i-phone"/></svg>020 3489 3934</a></li>
          <li><a href="mailto:support@onlinemarketinghelp.co.uk" class="text-link [overflow-wrap:anywhere] max-sm:text-[15px]" data-track="faq_email_click"><svg class="icon " aria-hidden="true" focusable="false"><use href="#i-mail"/></svg>support@onlinemarketinghelp.co.uk</a></li>
        </ul>
        <a href="#book-demo-form" class="btn btn-primary mt-5 w-full" data-track="faq_book_demo">Book a Voice Agent Demo</a>
      </div>
    </div>

    <div class="lg:col-start-2 lg:row-span-2 lg:row-start-1" data-faq>
      <div class="relative">
        <label for="faq-search" class="sr-only">Search the questions</label>
        <span class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true"><svg class="icon" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg></span>
        <input id="faq-search" type="search" placeholder="Search, for example GDPR, transfer or contract" autocomplete="off" class="field !min-h-[54px] !rounded-[12px] !pl-12" data-faq-search data-track="faq_search">
      </div>
      <div role="group" aria-label="Filter questions by topic" class="mt-4 flex flex-wrap gap-2" data-faq-filters>
        <button type="button" class="min-h-[44px] rounded-full border border-[var(--va-line-strong)] px-4 text-[15px] font-semibold aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-paper" data-faq-filter="all" aria-pressed="true" data-track="faq_filter" data-track-name="All questions">All questions <span class="ml-1 opacity-70 tnum" data-faq-count="all"></span></button>
        <button type="button" class="min-h-[44px] rounded-full border border-[var(--va-line-strong)] px-4 text-[15px] font-semibold aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-paper" data-faq-filter="callers" aria-pressed="false" data-track="faq_filter" data-track-name="Callers and AI">Callers and AI <span class="ml-1 opacity-70 tnum" data-faq-count="callers"></span></button>
        <button type="button" class="min-h-[44px] rounded-full border border-[var(--va-line-strong)] px-4 text-[15px] font-semibold aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-paper" data-faq-filter="setup" aria-pressed="false" data-track="faq_filter" data-track-name="Setup and systems">Setup and systems <span class="ml-1 opacity-70 tnum" data-faq-count="setup"></span></button>
        <button type="button" class="min-h-[44px] rounded-full border border-[var(--va-line-strong)] px-4 text-[15px] font-semibold aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-paper" data-faq-filter="data" aria-pressed="false" data-track="faq_filter" data-track-name="Data and rules">Data and rules <span class="ml-1 opacity-70 tnum" data-faq-count="data"></span></button>
        <button type="button" class="min-h-[44px] rounded-full border border-[var(--va-line-strong)] px-4 text-[15px] font-semibold aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-paper" data-faq-filter="sectors" aria-pressed="false" data-track="faq_filter" data-track-name="Health and legal">Health and legal <span class="ml-1 opacity-70 tnum" data-faq-count="sectors"></span></button>
        <button type="button" class="min-h-[44px] rounded-full border border-[var(--va-line-strong)] px-4 text-[15px] font-semibold aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-paper" data-faq-filter="working" aria-pressed="false" data-track="faq_filter" data-track-name="Working with us">Working with us <span class="ml-1 opacity-70 tnum" data-faq-count="working"></span></button>
      </div>
      <div class="mt-5 flex items-center justify-between gap-4 text-[15px] text-muted">
        <p aria-live="polite" data-faq-status>Showing all ${voiceFaqs.length} questions</p>
        <button type="button" class="inline-flex min-h-[44px] items-center gap-1.5 font-semibold text-ink hover:text-hl" data-faq-expand data-track="faq_expand_all">Open all</button>
      </div>

      <div class="mt-2 space-y-3" data-faq-list>
${voiceFaqs.map(faqItem).join("\n")}
      </div>
      <div class="mt-3 rounded-[14px] border border-dashed border-[var(--va-line-strong)] p-6 text-center" data-faq-empty hidden>
        <p class="font-display text-[18px] font-semibold">No questions match that</p>
        <p class="mt-1 text-[16px] text-muted">Try another word, or ring us on <a href="tel:+442034893934" class="font-semibold text-ink underline decoration-gold decoration-2 underline-offset-4 tnum">020 3489 3934</a> and ask a person.</p>
      </div>
    </div>
  </div>
</section>

<div data-component="MobileStickyBar" data-sticky-bar class="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper px-4 pb-[max(.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-12px_30px_-18px_rgb(0_0_0/0.35)] md:hidden" inert>
  <div class="flex items-center gap-3">
    <a href="#book-demo-form" class="btn btn-primary flex-1 whitespace-nowrap !px-3" data-track="sticky_book_demo">Book a Demo</a>
    <a href="tel:+442034893934" class="btn btn-secondary shrink-0 whitespace-nowrap !px-3 tnum" data-track="sticky_phone_click" aria-label="Call 020 3489 3934"><span class="max-[374px]:hidden">Call&nbsp;</span>020 3489 3934</a>
  </div>
</div>
`;
