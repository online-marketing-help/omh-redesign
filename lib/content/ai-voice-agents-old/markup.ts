// Frozen copy of the /ai-voice-agents landing markup as it was on 19 Oct 2026, before the SEO brief. Served at /ai-voice-agents-old (noindex).
// Body of the AI voice agents page, ported from the standalone design file
// (ai-voice-agents-v4.html) without its stand-in header and footer. Rendered as
// HTML by app/ai-voice-agents/page.tsx; the interactive parts are wired up by
// components/voice-agents/VoiceAgentsScript.tsx, which finds them by data-*.
// Styles: app/ai-voice-agents/voice-agents.css (everything under .va-page).
import { roiCalculator } from "@/lib/content/roi-calculator";
import { pricingSection } from "@/lib/content/voice-pricing";
export const voiceAgentsMarkup = String.raw`
<svg xmlns="http://www.w3.org/2000/svg" class="hidden" aria-hidden="true">
  <symbol id="i-phone" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></symbol>
  <symbol id="i-phone-missed" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/><path d="m16 2 6 6M22 2l-6 6"/></symbol>
  <symbol id="i-phone-incoming" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/><path d="M16 2v6h6M22 2l-6 6"/></symbol>
  <symbol id="i-phone-forwarded" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/><path d="M14 6h8M18 2l4 4-4 4"/></symbol>
  <symbol id="i-play" viewBox="0 0 24 24"><polygon points="6 3 20 12 6 21 6 3"/></symbol>
  <symbol id="i-pause" viewBox="0 0 24 24"><rect x="14" y="4" width="4" height="16" rx="1"/><rect x="6" y="4" width="4" height="16" rx="1"/></symbol>
  <symbol id="i-replay" viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></symbol>
  <symbol id="i-sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></symbol>
  <symbol id="i-moon" viewBox="0 0 24 24"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></symbol>
  <symbol id="i-menu" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></symbol>
  <symbol id="i-x" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></symbol>
  <symbol id="i-check" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></symbol>
  <symbol id="i-minus" viewBox="0 0 24 24"><path d="M5 12h14"/></symbol>
  <symbol id="i-arrow-right" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></symbol>
  <symbol id="i-arrow-up-right" viewBox="0 0 24 24"><path d="M7 7h10v10M7 17 17 7"/></symbol>
  <symbol id="i-chevron-down" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></symbol>
  <symbol id="i-calendar" viewBox="0 0 24 24"><path d="M8 2v4M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></symbol>
  <symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></symbol>
  <symbol id="i-shield" viewBox="0 0 24 24"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></symbol>
  <symbol id="i-map-pin" viewBox="0 0 24 24"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></symbol>
  <symbol id="i-message" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></symbol>
  <symbol id="i-home" viewBox="0 0 24 24"><path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/></symbol>
  <symbol id="i-tooth" viewBox="0 0 24 24"><path d="M12 5.5c1.5-1.5 4-2.5 6-1 2.5 1.8 2 5 1 7-1 2-1.5 4.5-2 8-.3 1.6-2 1.7-2.5.2L13.5 15c-.5-1.5-2.5-1.5-3 0l-1 4.7c-.5 1.5-2.2 1.4-2.5-.2-.5-3.5-1-6-2-8-1-2-1.5-5.2 1-7 2-1.5 4.5-.5 6 1z"/></symbol>
  <symbol id="i-stethoscope" viewBox="0 0 24 24"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6 6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6 6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></symbol>
  <symbol id="i-wrench" viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></symbol>
  <symbol id="i-flame" viewBox="0 0 24 24"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></symbol>
  <symbol id="i-hard-hat" viewBox="0 0 24 24"><path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z"/><path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5"/><path d="M4 15v-3a6 6 0 0 1 6-6"/><path d="M14 6a6 6 0 0 1 6 6v3"/></symbol>
  <symbol id="i-scale" viewBox="0 0 24 24"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></symbol>
  <symbol id="i-car" viewBox="0 0 24 24"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></symbol>
  <symbol id="i-plus-star" viewBox="0 0 24 24"><path d="M12 2 C12.6 8 16 11.4 22 12 C16 12.6 12.6 16 12 22 C11.4 16 8 12.6 2 12 C8 11.4 11.4 8 12 2 Z" fill="currentColor" stroke="none"/></symbol>
  <symbol id="i-mail" viewBox="0 0 24 24"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></symbol>
</svg>

<section id="industries" data-component="Industries" class="bg-surface">
  <div class="container-omh py-20 lg:py-28">
    <div>
      <div>
        <p class="eyebrow"><span class="eyebrow-mark" aria-hidden="true"><i></i><i></i><i></i></span>Industries</p>
        <h2>Built for businesses that live on <span class="hl">the phone</span></h2>
      </div>
      <p class="mt-5 text-muted">We set up AI voice agents for estate and letting agents, dental clinics, healthcare clinics, plumbers, heating engineers, builders, law firms and car dealerships. Each agent is scripted around the calls your sector actually gets.</p>
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
        <h3 class="!text-[21px]">Estate &amp; Letting Agents</h3>
        <p class="mt-2 text-[16px] leading-[1.5] text-muted">Catch every viewing request and landlord enquiry while the team is out on appointments.</p>
        <ul class="mt-4 space-y-1.5 text-[16px] leading-snug">
          <li class="flex gap-2.5"><svg class="icon mt-[3px] text-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span>Book viewings and valuations</span></li>
          <li class="flex gap-2.5"><svg class="icon mt-[3px] text-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span>Qualify buyers and tenants</span></li>
          <li class="flex gap-2.5"><svg class="icon mt-[3px] text-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span>Log tenant maintenance calls</span></li>
        </ul>
        
                <div class="pt-4">
          <a href="/contact?service=ai-voice-agents&amp;industry=estate-letting-agents" data-future-href="/ai-voice-agents/estate-letting-agents" class="text-link" data-track="industry_click" data-track-name="Estate &amp; Letting Agents">Learn more<span class="sr-only"> about voice agents for estate &amp; letting agents</span><svg class="icon " aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></a>
        </div>
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
                <div class="pt-4">
          <a href="/contact?service=ai-voice-agents&amp;industry=dental-clinics" data-future-href="/ai-voice-agents/dental-clinics" class="text-link" data-track="industry_click" data-track-name="Dental Clinics">Learn more<span class="sr-only"> about voice agents for dental clinics</span><svg class="icon " aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></a>
        </div>
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
                <div class="pt-4">
          <a href="/contact?service=ai-voice-agents&amp;industry=clinics-healthcare" data-future-href="/ai-voice-agents/clinics-healthcare" class="text-link" data-track="industry_click" data-track-name="Clinics &amp; Healthcare">Learn more<span class="sr-only"> about voice agents for clinics &amp; healthcare</span><svg class="icon " aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></a>
        </div>
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
        
                <div class="pt-4">
          <a href="/contact?service=ai-voice-agents&amp;industry=plumbers" data-future-href="/ai-voice-agents/plumbers" class="text-link" data-track="industry_click" data-track-name="Plumbers">Learn more<span class="sr-only"> about voice agents for plumbers</span><svg class="icon " aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></a>
        </div>
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
        
                <div class="pt-4">
          <a href="/contact?service=ai-voice-agents&amp;industry=heating-hvac" data-future-href="/ai-voice-agents/heating-hvac" class="text-link" data-track="industry_click" data-track-name="Heating &amp; HVAC">Learn more<span class="sr-only"> about voice agents for heating &amp; hvac</span><svg class="icon " aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></a>
        </div>
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
        
                <div class="pt-4">
          <a href="/contact?service=ai-voice-agents&amp;industry=contractors-builders" data-future-href="/ai-voice-agents/contractors-builders" class="text-link" data-track="industry_click" data-track-name="Contractors &amp; Builders">Learn more<span class="sr-only"> about voice agents for contractors &amp; builders</span><svg class="icon " aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></a>
        </div>
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
                <div class="pt-4">
          <a href="/contact?service=ai-voice-agents&amp;industry=law-firms" data-future-href="/ai-voice-agents/law-firms" class="text-link" data-track="industry_click" data-track-name="Law Firms">Learn more<span class="sr-only"> about voice agents for law firms</span><svg class="icon " aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></a>
        </div>
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
        
                <div class="pt-4">
          <a href="/contact?service=ai-voice-agents&amp;industry=car-dealerships" data-future-href="/ai-voice-agents/car-dealerships" class="text-link" data-track="industry_click" data-track-name="Car Dealerships">Learn more<span class="sr-only"> about voice agents for car dealerships</span><svg class="icon " aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></a>
        </div>
        </div>
      </article>
            <aside class="on-band grid items-center gap-4 rounded-[18px] bg-band p-5 text-band-ink sm:grid-cols-[120px_minmax(0,1fr)] sm:gap-6 lg:col-span-2" aria-labelledby="industries-cta-title">
        <span class="grid size-[88px] place-items-center rounded-[12px] bg-white/5 sm:size-[120px]" aria-hidden="true"><span class="grid size-14 place-items-center rounded-[14px] sm:size-16 bg-gold text-navy"><svg class="icon !h-7 !w-7" aria-hidden="true" focusable="false"><use href="#i-phone"/></svg></span></span>
        <div class="min-w-0">
        <h3 id="industries-cta-title" class="!text-[21px]">Not sure how your calls would fit?</h3>
        <p class="mt-2 text-[16px] leading-[1.5] text-band-muted">Tell us who rings you and why. We'll map your calls and show you what an agent would handle and what it would pass to your team.</p>
        <div class="pt-4">
          <a href="/contact?service=ai-voice-agents" class="btn btn-primary" data-track="industries_cta_book_demo">Book a Voice Agent Demo</a>
        </div>
        </div>
      </aside>
    </div>
  </div>
</section>

<section id="why-omh" data-component="WhyChooseOMH" class="bg-surface">
  <div class="container-omh py-20 lg:py-28">
    <div>
      <div>
        <p class="eyebrow"><span class="eyebrow-mark" aria-hidden="true"><i></i><i></i><i></i></span>Why choose OMH</p>
        <h2>The software is the easy part. <span class="hl">Running it well</span> is the job.</h2>
      </div>
      <p class="mt-5 text-muted">Anyone can sign up for a voice AI tool. Whether it works for your business depends on the script, the testing and somebody keeping an eye on it every month. That's the part we do.</p>
    </div>

        <p class="mt-12 flex flex-wrap gap-x-5 gap-y-2 text-[16px] font-semibold md:hidden" aria-hidden="true"><span class="flex items-center gap-2"><span class="block h-3.5 w-3.5 rounded-[4px] bg-band"></span>Managed by OMH</span><span class="flex items-center gap-2 text-muted"><svg class="icon " aria-hidden="true" focusable="false"><use href="#i-x"/></svg>DIY or generic tool</span></p>
    <table class="why-table mt-4 w-full md:mt-14 border-separate border-spacing-0 text-left text-[17px] leading-snug">
      <caption class="sr-only">A voice agent managed by OMH compared with a do-it-yourself or generic tool</caption>
      <thead class="max-md:sr-only">
        <tr>
          <th scope="col" class="w-[24%] px-6 pb-4 pt-8 align-bottom"><span class="sr-only">What you get</span></th>
          <th scope="col" class="why-omh w-[40%] rounded-t-[14px] px-7 pb-5 pt-7 align-bottom">
            <span class="flex items-center gap-3">
              <span class="grid h-9 w-9 place-items-center rounded-[9px] bg-gold font-display text-[12px] font-semibold tracking-tight text-navy" aria-hidden="true">OMH</span>
              <span class="font-display text-[20px] font-semibold">Managed by OMH</span>
            </span>
          </th>
          <th scope="col" class="w-[36%] px-7 pb-5 pt-8 align-bottom font-display text-[20px] font-semibold text-muted">DIY or generic tool</th>
        </tr>
      </thead>
      <tbody>
        <tr class="max-md:mb-4 max-md:block max-md:rounded-[14px] max-md:border max-md:border-line max-md:p-5">
          <th scope="row" class="border-t border-line px-6 py-5 align-top font-display text-[17.5px] font-semibold max-md:block max-md:border-0 max-md:p-0 max-md:pb-3">Setup</th>
          <td class="why-omh px-7 py-5 align-top max-md:block max-md:rounded-[10px] max-md:px-4 max-md:py-3.5"><span class="flex gap-3"><svg class="icon mt-[3px] text-band-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span><span class="sr-only">Managed by OMH: </span>We map your calls, write the script and connect your diary.</span></span></td>
          <td class="border-t border-line px-7 py-5 align-top text-muted max-md:block max-md:border-0 max-md:px-4 max-md:pb-0 max-md:pt-3"><span class="flex gap-3"><svg class="icon mt-[3px] opacity-70" aria-hidden="true" focusable="false"><use href="#i-x"/></svg><span><span class="sr-only">DIY or generic tool: </span>You learn the tool and build it in your own time.</span></span></td>
        </tr>
        <tr class="max-md:mb-4 max-md:block max-md:rounded-[14px] max-md:border max-md:border-line max-md:p-5">
          <th scope="row" class="border-t border-line px-6 py-5 align-top font-display text-[17.5px] font-semibold max-md:block max-md:border-0 max-md:p-0 max-md:pb-3">Industry knowledge</th>
          <td class="why-omh px-7 py-5 align-top max-md:block max-md:rounded-[10px] max-md:px-4 max-md:py-3.5"><span class="flex gap-3"><svg class="icon mt-[3px] text-band-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span><span class="sr-only">Managed by OMH: </span>Built from the calls your sector really gets.</span></span></td>
          <td class="border-t border-line px-7 py-5 align-top text-muted max-md:block max-md:border-0 max-md:px-4 max-md:pb-0 max-md:pt-3"><span class="flex gap-3"><svg class="icon mt-[3px] opacity-70" aria-hidden="true" focusable="false"><use href="#i-x"/></svg><span><span class="sr-only">DIY or generic tool: </span>A general template you adapt yourself.</span></span></td>
        </tr>
        <tr class="max-md:mb-4 max-md:block max-md:rounded-[14px] max-md:border max-md:border-line max-md:p-5">
          <th scope="row" class="border-t border-line px-6 py-5 align-top font-display text-[17.5px] font-semibold max-md:block max-md:border-0 max-md:p-0 max-md:pb-3">Testing</th>
          <td class="why-omh px-7 py-5 align-top max-md:block max-md:rounded-[10px] max-md:px-4 max-md:py-3.5"><span class="flex gap-3"><svg class="icon mt-[3px] text-band-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span><span class="sr-only">Managed by OMH: </span>Test calls and your sign-off before a customer hears it.</span></span></td>
          <td class="border-t border-line px-7 py-5 align-top text-muted max-md:block max-md:border-0 max-md:px-4 max-md:pb-0 max-md:pt-3"><span class="flex gap-3"><svg class="icon mt-[3px] opacity-70" aria-hidden="true" focusable="false"><use href="#i-x"/></svg><span><span class="sr-only">DIY or generic tool: </span>Often tested on live callers.</span></span></td>
        </tr>
        <tr class="max-md:mb-4 max-md:block max-md:rounded-[14px] max-md:border max-md:border-line max-md:p-5">
          <th scope="row" class="border-t border-line px-6 py-5 align-top font-display text-[17.5px] font-semibold max-md:block max-md:border-0 max-md:p-0 max-md:pb-3">Reporting</th>
          <td class="why-omh px-7 py-5 align-top max-md:block max-md:rounded-[10px] max-md:px-4 max-md:py-3.5"><span class="flex gap-3"><svg class="icon mt-[3px] text-band-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span><span class="sr-only">Managed by OMH: </span>Call outcomes sit beside your ads and website results.</span></span></td>
          <td class="border-t border-line px-7 py-5 align-top text-muted max-md:block max-md:border-0 max-md:px-4 max-md:pb-0 max-md:pt-3"><span class="flex gap-3"><svg class="icon mt-[3px] opacity-70" aria-hidden="true" focusable="false"><use href="#i-x"/></svg><span><span class="sr-only">DIY or generic tool: </span>A separate dashboard nobody opens.</span></span></td>
        </tr>
        <tr class="max-md:mb-4 max-md:block max-md:rounded-[14px] max-md:border max-md:border-line max-md:p-5">
          <th scope="row" class="border-t border-line px-6 py-5 align-top font-display text-[17.5px] font-semibold max-md:block max-md:border-0 max-md:p-0 max-md:pb-3">When a call goes wrong</th>
          <td class="why-omh px-7 py-5 align-top max-md:block max-md:rounded-[10px] max-md:px-4 max-md:py-3.5"><span class="flex gap-3"><svg class="icon mt-[3px] text-band-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span><span class="sr-only">Managed by OMH: </span>We spot it in the monthly review and fix the script.</span></span></td>
          <td class="border-t border-line px-7 py-5 align-top text-muted max-md:block max-md:border-0 max-md:px-4 max-md:pb-0 max-md:pt-3"><span class="flex gap-3"><svg class="icon mt-[3px] opacity-70" aria-hidden="true" focusable="false"><use href="#i-x"/></svg><span><span class="sr-only">DIY or generic tool: </span>You find out when a customer complains.</span></span></td>
        </tr>
        <tr class="max-md:mb-4 max-md:block max-md:rounded-[14px] max-md:border max-md:border-line max-md:p-5">
          <th scope="row" class="border-t border-line px-6 py-5 align-top font-display text-[17.5px] font-semibold max-md:block max-md:border-0 max-md:p-0 max-md:pb-3">Who to ring</th>
          <td class="why-omh px-7 py-5 align-top max-md:block max-md:rounded-[10px] max-md:px-4 max-md:py-3.5 md:rounded-b-[14px] md:pb-7"><span class="flex gap-3"><svg class="icon mt-[3px] text-band-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span><span class="sr-only">Managed by OMH: </span>A named person at OMH in the UK.</span></span></td>
          <td class="border-t border-line px-7 py-5 align-top text-muted max-md:block max-md:border-0 max-md:px-4 max-md:pb-0 max-md:pt-3"><span class="flex gap-3"><svg class="icon mt-[3px] opacity-70" aria-hidden="true" focusable="false"><use href="#i-x"/></svg><span><span class="sr-only">DIY or generic tool: </span>A support ticket.</span></span></td>
        </tr>
      </tbody>
    </table>

    <div class="mt-20 grid gap-6 md:grid-cols-3">
      <article class="flex flex-col rounded-[14px] border border-line bg-paper p-3">
        <div class="rounded-[10px] bg-sand p-5 md:min-h-[236px]" aria-hidden="true">
          <p class="flex items-center justify-between gap-3 text-[14.5px] font-semibold"><span>Call map, Aire Valley Heating</span><span class="font-normal text-muted">Leeds</span></p>
          <ul class="mt-4 space-y-2.5 text-[14.5px]">
            <li class="grid grid-cols-[7.5rem_minmax(0,1fr)_2.4rem] items-center gap-3"><span class="truncate">Boiler breakdown</span><span class="block h-2.5 rounded-full bg-ink/10"><span class="block h-full rounded-full bg-gold" style="width:91.2%"></span></span><span class="text-right text-muted tnum">38%</span></li>
            <li class="grid grid-cols-[7.5rem_minmax(0,1fr)_2.4rem] items-center gap-3"><span class="truncate">Annual service</span><span class="block h-2.5 rounded-full bg-ink/10"><span class="block h-full rounded-full bg-ink/35" style="width:57.599999999999994%"></span></span><span class="text-right text-muted tnum">24%</span></li>
            <li class="grid grid-cols-[7.5rem_minmax(0,1fr)_2.4rem] items-center gap-3"><span class="truncate">Quote request</span><span class="block h-2.5 rounded-full bg-ink/10"><span class="block h-full rounded-full bg-ink/35" style="width:43.199999999999996%"></span></span><span class="text-right text-muted tnum">18%</span></li>
            <li class="grid grid-cols-[7.5rem_minmax(0,1fr)_2.4rem] items-center gap-3"><span class="truncate">Existing job</span><span class="block h-2.5 rounded-full bg-ink/10"><span class="block h-full rounded-full bg-ink/35" style="width:28.799999999999997%"></span></span><span class="text-right text-muted tnum">12%</span></li>
            <li class="grid grid-cols-[7.5rem_minmax(0,1fr)_2.4rem] items-center gap-3"><span class="truncate">Other</span><span class="block h-2.5 rounded-full bg-ink/10"><span class="block h-full rounded-full bg-ink/35" style="width:19.2%"></span></span><span class="text-right text-muted tnum">8%</span></li>
          </ul>
        </div>
        <div class="px-3 pb-4 pt-6">
          <p class="num text-[15px]">01</p>
          <h3 class="mt-2 !text-[25px]">Built around your industry's calls</h3>
          <p class="mt-3 text-[16px] text-muted">We start from the real reasons people ring you: the boiler fault, the viewing request, the cancelled appointment. The script, questions and handover rules follow from those.</p>
        </div>
      </article>
      <article class="flex flex-col rounded-[14px] border border-line bg-paper p-3">
        <div class="rounded-[10px] bg-sand p-5 md:min-h-[236px]" aria-hidden="true">
          <p class="flex items-center justify-between gap-3 text-[14.5px] font-semibold"><span>Monthly report, October</span><span class="font-normal text-muted">Bristol</span></p>
          <ol class="mt-4 grid grid-cols-3 gap-2 text-center">
            <li class="rounded-[10px] bg-surface px-2 py-3"><span class="block font-display text-[24px] font-semibold leading-none tnum">212</span><span class="mt-1.5 block text-[13px] leading-tight text-muted">Ad clicks to call</span></li>
            <li class="rounded-[10px] bg-surface px-2 py-3"><span class="block font-display text-[24px] font-semibold leading-none tnum">209</span><span class="mt-1.5 block text-[13px] leading-tight text-muted">Calls answered</span></li>
            <li class="rounded-[10px] bg-gold px-2 py-3 text-navy"><span class="block font-display text-[24px] font-semibold leading-none tnum">74</span><span class="mt-1.5 block text-[13px] font-semibold leading-tight">Jobs booked</span></li>
          </ol>
          <p class="mt-3 text-[13.5px] text-muted">Google Ads, website and voice agent in one view</p>
        </div>
        <div class="px-3 pb-4 pt-6">
          <p class="num text-[15px]">02</p>
          <h3 class="mt-2 !text-[25px]">Outcomes in your reporting</h3>
          <p class="mt-3 text-[16px] text-muted">Calls answered, bookings made and calls transferred sit in the same report as your Google Ads and website figures, so you can follow an enquiry from click to booked job.</p>
        </div>
      </article>
      <article class="flex flex-col rounded-[14px] border border-line bg-paper p-3">
        <div class="rounded-[10px] bg-sand p-5 md:min-h-[236px]" aria-hidden="true">
          <p class="flex items-center justify-between gap-3 text-[14.5px] font-semibold"><span>What we changed in October</span><span class="font-normal text-muted">Manchester</span></p>
          <ul class="mt-4 space-y-2.5 text-[14.5px] leading-snug">
            <li class="flex gap-2.5"><span class="mt-[5px] block h-2 w-2 shrink-0 rounded-full bg-gold"></span><span>Added an answer on Saturday opening hours, asked 31 times</span></li>
            <li class="flex gap-2.5"><span class="mt-[5px] block h-2 w-2 shrink-0 rounded-full bg-gold"></span><span>Shortened the greeting by four seconds</span></li>
            <li class="flex gap-2.5"><span class="mt-[5px] block h-2 w-2 shrink-0 rounded-full bg-gold"></span><span>New rule: broken braces go straight to reception</span></li>
          </ul>
        </div>
        <div class="px-3 pb-4 pt-6">
          <p class="num text-[15px]">03</p>
          <h3 class="mt-2 !text-[25px]">A UK team optimising monthly</h3>
          <p class="mt-3 text-[16px] text-muted">Every month we listen to a sample of calls, look at what the agent couldn't answer and improve it. You get a short written summary of what we changed and why.</p>
        </div>
      </article>
    </div>
    <p class="mt-4 text-[14.5px] text-muted">Panels show illustrative examples with fictional businesses.</p>
  </div>
</section>

<section id="branding" data-component="Branding" class="on-band relative overflow-hidden bg-band text-band-ink">
  <div class="pointer-events-none absolute right-[-10%] top-1/2 h-[620px] w-[620px] -translate-y-1/2 rounded-full bg-gold/15 blur-3xl" aria-hidden="true"></div>
  <div class="container-omh relative grid items-center gap-14 py-20 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,.65fr)] lg:gap-16 lg:py-28" data-brand
    data-brand-biz='[{"id":"law","label":"Law firm","name":"Hartwell Reeve Solicitors","city":"Birmingham","num":"0121 496 0147","agent":"Grace","kind":"firm&#39;s","initials":"HR","voice":"British English, calm and measured","never":"Gives legal advice","transfer":"Existing clients go to their named solicitor"},{"id":"dental","label":"Dental clinic","name":"Albion Square Dental","city":"Manchester","num":"0161 496 0123","agent":"Amy","kind":"practice&#39;s","initials":"AS","voice":"British English, warm and friendly","never":"Gives clinical advice","transfer":"Dental emergencies go to the on-call line"},{"id":"plumber","label":"Plumber","name":"Severn Plumbing","city":"Bristol","num":"0117 496 0135","agent":"Sam","kind":"team&#39;s","initials":"SP","voice":"British English, relaxed","never":"Quotes a price it has not been given","transfer":"Burst pipes go straight to the plumber on call"}]'>
    <div>
      <p class="eyebrow eyebrow-band"><span class="eyebrow-mark" aria-hidden="true"><i></i><i></i><i></i></span>Branding</p>
      <h2>It sounds like <span class="hl">your business</span>, not ours</h2>
      <p class="mt-5 text-band-muted">Callers hear your name, your greeting and your way of doing things. OMH is never mentioned on a call.</p>

      <ul class="mt-7 grid gap-x-6 gap-y-5 sm:grid-cols-2">
        <li class="flex gap-3.5"><span class="grid h-10 w-10 shrink-0 place-items-center rounded-[10px] bg-gold/20 text-band-hl" aria-hidden="true"><svg class="icon " aria-hidden="true" focusable="false"><use href="#i-phone"/></svg></span><span><span class="block font-display text-[17.5px] font-semibold leading-snug">Voice and accent</span><span class="block text-[16px] leading-snug text-band-muted">A voice that suits your business and your callers.</span></span></li>
        <li class="flex gap-3.5"><span class="grid h-10 w-10 shrink-0 place-items-center rounded-[10px] bg-gold/20 text-band-hl" aria-hidden="true"><svg class="icon " aria-hidden="true" focusable="false"><use href="#i-message"/></svg></span><span><span class="block font-display text-[17.5px] font-semibold leading-snug">Name and greeting</span><span class="block text-[16px] leading-snug text-band-muted">Your agent answers with your business name and your greeting. </span></span></li>
        <li class="flex gap-3.5"><span class="grid h-10 w-10 shrink-0 place-items-center rounded-[10px] bg-gold/20 text-band-hl" aria-hidden="true"><svg class="icon " aria-hidden="true" focusable="false"><use href="#i-shield"/></svg></span><span><span class="block font-display text-[17.5px] font-semibold leading-snug">Tone and policies</span><span class="block text-[16px] leading-snug text-band-muted">Formal or relaxed, and it follows your rules on what it must never say. </span></span></li>
        <li class="flex gap-3.5"><span class="grid h-10 w-10 shrink-0 place-items-center rounded-[10px] bg-gold/20 text-band-hl" aria-hidden="true"><svg class="icon " aria-hidden="true" focusable="false"><use href="#i-phone-forwarded"/></svg></span><span><span class="block font-display text-[17.5px] font-semibold leading-snug">Transfer rules</span><span class="block text-[16px] leading-snug text-band-muted">You decide which calls go to a person, who to, and when. </span></span></li>
      </ul>

      <div class="mt-9 rounded-[14px] border border-band-line bg-band-surface p-5 sm:p-6">
        <p class="font-display text-[18px] font-semibold">Try it: build a greeting</p>
        <p class="mt-1 text-[16px] text-band-muted">Pick a business and a tone. The phone shows what callers would hear.</p>
        <p class="mt-4 text-[14.5px] font-semibold text-band-muted" id="brand-biz-label">Business</p>
        <div class="mt-2">
          <div role="radiogroup" aria-label="Business" class="flex flex-wrap gap-2" data-brand-group="biz">
            <button type="button" role="radio" aria-checked="true" tabindex="0" class="min-h-[44px] rounded-full border border-[rgb(247_246_242/.35)] px-4 text-[15.5px] font-semibold text-band-ink aria-checked:border-gold aria-checked:bg-gold aria-checked:text-navy" data-brand-opt="law" data-track="branding_biz" data-track-name="Law firm">Law firm</button>
            <button type="button" role="radio" aria-checked="false" tabindex="-1" class="min-h-[44px] rounded-full border border-[rgb(247_246_242/.35)] px-4 text-[15.5px] font-semibold text-band-ink aria-checked:border-gold aria-checked:bg-gold aria-checked:text-navy" data-brand-opt="dental" data-track="branding_biz" data-track-name="Dental clinic">Dental clinic</button>
            <button type="button" role="radio" aria-checked="false" tabindex="-1" class="min-h-[44px] rounded-full border border-[rgb(247_246_242/.35)] px-4 text-[15.5px] font-semibold text-band-ink aria-checked:border-gold aria-checked:bg-gold aria-checked:text-navy" data-brand-opt="plumber" data-track="branding_biz" data-track-name="Plumber">Plumber</button>
          </div>
        </div>
        <p class="mt-4 text-[14.5px] font-semibold text-band-muted">Tone</p>
        <div class="mt-2">
          <div role="radiogroup" aria-label="Tone" class="flex flex-wrap gap-2" data-brand-group="tone">
            <button type="button" role="radio" aria-checked="true" tabindex="0" class="min-h-[44px] rounded-full border border-[rgb(247_246_242/.35)] px-4 text-[15.5px] font-semibold text-band-ink aria-checked:border-gold aria-checked:bg-gold aria-checked:text-navy" data-brand-opt="warm" data-track="branding_tone" data-track-name="Warm">Warm</button>
            <button type="button" role="radio" aria-checked="false" tabindex="-1" class="min-h-[44px] rounded-full border border-[rgb(247_246_242/.35)] px-4 text-[15.5px] font-semibold text-band-ink aria-checked:border-gold aria-checked:bg-gold aria-checked:text-navy" data-brand-opt="brisk" data-track="branding_tone" data-track-name="Brisk">Brisk</button>
            <button type="button" role="radio" aria-checked="false" tabindex="-1" class="min-h-[44px] rounded-full border border-[rgb(247_246_242/.35)] px-4 text-[15.5px] font-semibold text-band-ink aria-checked:border-gold aria-checked:bg-gold aria-checked:text-navy" data-brand-opt="formal" data-track="branding_tone" data-track-name="Formal">Formal</button>
          </div>
        </div>
      </div>
    </div>

        <div class="relative mx-auto w-full max-w-[380px] [perspective:1400px]">
      <div class="brand-phone relative rounded-[44px] border border-[rgb(247_246_242/.18)] bg-[#000] p-3 shadow-[0_50px_100px_-40px_rgb(0_0_0/0.8)] lg:[transform:rotateY(-10deg)_rotateX(4deg)]">
        <div class="relative overflow-hidden rounded-[34px] bg-[#f7f6f2] px-5 pb-6 pt-4 text-[#000]">
          <div class="flex items-center justify-between text-[13px] font-semibold" aria-hidden="true"><span class="tnum">9:41</span><span class="h-[22px] w-[90px] rounded-full bg-[#000]"></span><span class="flex gap-1"><i class="block h-2.5 w-1 rounded-sm bg-[#000]"></i><i class="block h-2.5 w-1 rounded-sm bg-[#000]"></i><i class="block h-2.5 w-1 rounded-sm bg-[#000]/40"></i></span></div>

          <div class="mt-6 text-center">
            <p class="text-[13.5px] font-semibold text-[#1c6446]"><span class="mr-1.5 inline-block h-2 w-2 rounded-full bg-[#1c6446] align-middle"></span>Call answered <span class="tnum" data-brand-timer>00:03</span></p>
            <span class="mx-auto mt-4 grid h-[72px] w-[72px] place-items-center rounded-full bg-[#7d5c33] font-display text-[24px] font-semibold text-[#000]" aria-hidden="true" data-brand-initials>HR</span>
            <p class="mt-3 font-display text-[21px] font-semibold leading-tight" data-brand-name>Hartwell Reeve Solicitors</p>
            <p class="mt-0.5 text-[14.5px] text-[rgb(0_0_0/0.68)]"><span class="tnum" data-brand-num>0121 496 0147</span>, <span data-brand-city>Birmingham</span></p>
          </div>

          <div class="mt-5 rounded-[18px] bg-white p-4 shadow-[0_10px_30px_-20px_rgb(0_0_0/0.6)]">
            <div class="flex items-center gap-3">
              <span class="text-[13px] font-semibold text-[#7d5c33]"><span data-brand-agent>Grace</span>, AI assistant</span>
              <svg viewBox="0 0 168 40" class="brand-wave h-7 flex-1" aria-hidden="true" data-brand-wave>
                <rect x="1" y="13" width="3" height="14" rx="1.5" style="--d:0s"/><rect x="7" y="3" width="3" height="34" rx="1.5" style="--d:0.09s"/><rect x="13" y="15.5" width="3" height="9" rx="1.5" style="--d:0.18s"/><rect x="19" y="6" width="3" height="28" rx="1.5" style="--d:0.27s"/><rect x="25" y="14.5" width="3" height="11" rx="1.5" style="--d:0.36s"/><rect x="31" y="12" width="3" height="16" rx="1.5" style="--d:0.44999999999999996s"/><rect x="37" y="5.5" width="3" height="29" rx="1.5" style="--d:0.54s"/><rect x="43" y="8" width="3" height="24" rx="1.5" style="--d:0s"/><rect x="49" y="7" width="3" height="26" rx="1.5" style="--d:0.09s"/><rect x="55" y="10" width="3" height="20" rx="1.5" style="--d:0.18s"/><rect x="61" y="10.5" width="3" height="19" rx="1.5" style="--d:0.27s"/><rect x="67" y="15" width="3" height="10" rx="1.5" style="--d:0.36s"/><rect x="73" y="3.5" width="3" height="33" rx="1.5" style="--d:0.44999999999999996s"/><rect x="79" y="16" width="3" height="8" rx="1.5" style="--d:0.54s"/><rect x="85" y="4" width="3" height="32" rx="1.5" style="--d:0s"/><rect x="91" y="16.5" width="3" height="7" rx="1.5" style="--d:0.09s"/><rect x="97" y="11.5" width="3" height="17" rx="1.5" style="--d:0.18s"/><rect x="103" y="7.5" width="3" height="25" rx="1.5" style="--d:0.27s"/><rect x="109" y="8" width="3" height="24" rx="1.5" style="--d:0.36s"/><rect x="115" y="7" width="3" height="26" rx="1.5" style="--d:0.44999999999999996s"/><rect x="121" y="8" width="3" height="24" rx="1.5" style="--d:0.54s"/><rect x="127" y="11" width="3" height="18" rx="1.5" style="--d:0s"/><rect x="133" y="17" width="3" height="6" rx="1.5" style="--d:0.09s"/><rect x="139" y="5" width="3" height="30" rx="1.5" style="--d:0.18s"/><rect x="145" y="16.5" width="3" height="7" rx="1.5" style="--d:0.27s"/><rect x="151" y="3" width="3" height="34" rx="1.5" style="--d:0.36s"/><rect x="157" y="15.5" width="3" height="9" rx="1.5" style="--d:0.44999999999999996s"/><rect x="163" y="10" width="3" height="20" rx="1.5" style="--d:0.54s"/>
              </svg>
            </div>
            <p class="mt-3 min-h-[96px] rounded-[4px_14px_14px_14px] bg-[#efece2] px-3.5 py-3 text-[15.5px] leading-[1.45]" aria-hidden="true">&ldquo;<span data-brand-greeting>Good morning, Hartwell Reeve Solicitors. I'm Grace, the firm's AI assistant. How can I help you today?</span><span class="brand-caret" data-brand-caret></span>&rdquo;</p>
            <p class="sr-only" aria-live="polite" data-brand-live></p>
          </div>

          <dl class="mt-4 space-y-2 text-[13.5px] leading-snug">
            <div class="flex gap-2 rounded-[10px] bg-white/70 px-3 py-2"><dt class="font-semibold">Voice:</dt><dd data-brand-voice>British English, calm and measured</dd></div>
            <div class="flex gap-2 rounded-[10px] bg-white/70 px-3 py-2"><dt class="font-semibold">Never:</dt><dd data-brand-never>Gives legal advice</dd></div>
            <div class="flex gap-2 rounded-[10px] bg-white/70 px-3 py-2"><dt class="font-semibold">Transfers:</dt><dd data-brand-transfer>Existing clients go to their named solicitor</dd></div>
          </dl>

          <div class="mt-5 flex items-center justify-center gap-6">
            <button type="button" class="grid h-12 w-12 place-items-center rounded-full bg-[#000] text-[#f7f6f2] hover:bg-[#262626]" data-brand-replay data-track="branding_replay" aria-label="Replay the greeting"><svg class="icon " aria-hidden="true" focusable="false"><use href="#i-replay"/></svg></button>
            <span class="grid h-12 w-12 place-items-center rounded-full bg-[#a3352b] text-white" aria-hidden="true"><svg class="icon rotate-[135deg]" aria-hidden="true" focusable="false"><use href="#i-phone"/></svg></span>
          </div>
        </div>
      </div>
      <p class="mt-5 text-center text-[14px] text-band-muted">Illustrative example. The businesses shown are fictional.</p>
    </div>
  </div>
</section>

<section id="right-fit" data-component="RightFit">
  <div class="container-omh py-20 lg:py-28">
    <div>
      <div>
        <p class="eyebrow"><span class="eyebrow-mark" aria-hidden="true"><i></i><i></i><i></i></span>Is it the right fit?</p>
        <h2>A voice agent <span class="hl">isn't for everyone</span></h2>
      </div>
      <p class="mt-5 text-muted">We would rather tell you now than three months in. Here is where it earns its keep and where it doesn't. Or answer five quick questions and see for yourself.</p>
    </div>

    <div class="mt-12 grid gap-5 md:grid-cols-2">
      <div class="rounded-[16px] border border-[color-mix(in_srgb,var(--va-ok)_35%,transparent)] bg-[color-mix(in_srgb,var(--va-ok)_7%,var(--va-surface))] p-6 sm:p-8">
        <h3 class="flex items-center gap-3 !text-[24px]"><span class="grid h-10 w-10 place-items-center rounded-full bg-ok text-surface"><svg class="icon " aria-hidden="true" focusable="false"><use href="#i-check"/></svg></span>A good fit if</h3>
        <ul class="mt-6 space-y-4">
          <li class="flex gap-3.5"><span class="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-surface text-ok" aria-hidden="true"><svg class="icon " aria-hidden="true" focusable="false"><use href="#i-phone-missed"/></svg></span><span class="text-[16px] leading-snug"><strong class="block font-display text-[17.5px] font-semibold">You miss calls</strong><span class="text-muted">while your team is with customers, on site or closed for the day.</span></span></li>
          <li class="flex gap-3.5"><span class="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-surface text-ok" aria-hidden="true"><svg class="icon " aria-hidden="true" focusable="false"><use href="#i-message"/></svg></span><span class="text-[16px] leading-snug"><strong class="block font-display text-[17.5px] font-semibold">Calls repeat themselves</strong><span class="text-muted">Bookings, opening hours, prices and availability make up most of them.</span></span></li>
          <li class="flex gap-3.5"><span class="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-surface text-ok" aria-hidden="true"><svg class="icon " aria-hidden="true" focusable="false"><use href="#i-arrow-up-right"/></svg></span><span class="text-[16px] leading-snug"><strong class="block font-display text-[17.5px] font-semibold">Each customer is worth real money</strong><span class="text-muted">so one missed call can cost more than the agent.</span></span></li>
          <li class="flex gap-3.5"><span class="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-surface text-ok" aria-hidden="true"><svg class="icon " aria-hidden="true" focusable="false"><use href="#i-calendar"/></svg></span><span class="text-[16px] leading-snug"><strong class="block font-display text-[17.5px] font-semibold">You have a diary or system</strong><span class="text-muted">that bookings can go into.</span></span></li>
          <li class="flex gap-3.5"><span class="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-surface text-ok" aria-hidden="true"><svg class="icon " aria-hidden="true" focusable="false"><use href="#i-shield"/></svg></span><span class="text-[16px] leading-snug"><strong class="block font-display text-[17.5px] font-semibold">You are happy to be open about AI</strong><span class="text-muted">Callers are told they are speaking to an AI assistant.</span></span></li>
        </ul>
      </div>
      <div class="rounded-[16px] border border-line bg-surface p-6 sm:p-8">
        <h3 class="flex items-center gap-3 !text-[24px]"><span class="grid h-10 w-10 place-items-center rounded-full border-[1.5px] border-[var(--va-line-strong)] text-muted"><svg class="icon " aria-hidden="true" focusable="false"><use href="#i-x"/></svg></span>Not the right fit if</h3>
        <ul class="mt-6 space-y-4">
          <li class="flex gap-3.5"><span class="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-sand text-muted" aria-hidden="true"><svg class="icon " aria-hidden="true" focusable="false"><use href="#i-phone"/></svg></span><span class="text-[16px] leading-snug"><strong class="block font-display text-[17.5px] font-semibold">Your phone is quiet</strong><span class="text-muted">A handful of calls a week, and you already answer them all.</span></span></li>
          <li class="flex gap-3.5"><span class="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-sand text-muted" aria-hidden="true"><svg class="icon " aria-hidden="true" focusable="false"><use href="#i-scale"/></svg></span><span class="text-[16px] leading-snug"><strong class="block font-display text-[17.5px] font-semibold">Every call needs expert judgement</strong><span class="text-muted">from the very first sentence.</span></span></li>
          <li class="flex gap-3.5"><span class="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-sand text-muted" aria-hidden="true"><svg class="icon " aria-hidden="true" focusable="false"><use href="#i-x"/></svg></span><span class="text-[16px] leading-snug"><strong class="block font-display text-[17.5px] font-semibold">You want callers to think it is a person</strong><span class="text-muted">We won't build that.</span></span></li>
          <li class="flex gap-3.5"><span class="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-sand text-muted" aria-hidden="true"><svg class="icon " aria-hidden="true" focusable="false"><use href="#i-phone-forwarded"/></svg></span><span class="text-[16px] leading-snug"><strong class="block font-display text-[17.5px] font-semibold">You want to cold call</strong><span class="text-muted">lists of people who haven't agreed to hear from you.</span></span></li>
          <li class="flex gap-3.5"><span class="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-sand text-muted" aria-hidden="true"><svg class="icon " aria-hidden="true" focusable="false"><use href="#i-clock"/></svg></span><span class="text-[16px] leading-snug"><strong class="block font-display text-[17.5px] font-semibold">You want to set it and forget it</strong><span class="text-muted">An agent needs a regular review to stay good.</span></span></li>
        </ul>
      </div>
    </div>

        <div class="mt-6 grid overflow-hidden rounded-[16px] border border-line bg-surface lg:grid-cols-[minmax(0,1.25fr)_minmax(0,.75fr)]" data-fit>
      <form class="p-6 sm:p-8" data-fit-form>
        <h3 class="!text-[24px]">Quick fit check</h3>
        <p class="mt-1 text-[16px] text-muted">Five questions, about 20 seconds.</p>
        <ol class="mt-6 divide-y divide-line border-y border-line">
          <li>
            <fieldset class="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
              <legend class="float-left flex gap-3 text-[16.5px] leading-snug sm:"><span class="num text-[15px] leading-[1.6]">01</span><span>Do you miss calls when your team is busy, on site or closed?</span></legend>
              <span class="flex shrink-0 gap-2 pl-8 sm:pl-0">
                <label class="relative">
                  <input type="radio" name="fit-q0" value="yes" class="peer sr-only" data-fit-q="0" data-track="fit_check_answer" data-track-name="Q1 yes">
                  <span class="flex min-h-[44px] min-w-[68px] items-center justify-center gap-1.5 rounded-full border border-[var(--va-line-strong)] px-4 text-[15.5px] font-semibold peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--va-hl)]">Yes</span>
                </label><label class="relative">
                  <input type="radio" name="fit-q0" value="no" class="peer sr-only" data-fit-q="0" data-track="fit_check_answer" data-track-name="Q1 no">
                  <span class="flex min-h-[44px] min-w-[68px] items-center justify-center gap-1.5 rounded-full border border-[var(--va-line-strong)] px-4 text-[15.5px] font-semibold peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--va-hl)]">No</span>
                </label>
              </span>
            </fieldset>
          </li>
          <li>
            <fieldset class="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
              <legend class="float-left flex gap-3 text-[16.5px] leading-snug sm:"><span class="num text-[15px] leading-[1.6]">02</span><span>Are most of your calls the same few requests?</span></legend>
              <span class="flex shrink-0 gap-2 pl-8 sm:pl-0">
                <label class="relative">
                  <input type="radio" name="fit-q1" value="yes" class="peer sr-only" data-fit-q="1" data-track="fit_check_answer" data-track-name="Q2 yes">
                  <span class="flex min-h-[44px] min-w-[68px] items-center justify-center gap-1.5 rounded-full border border-[var(--va-line-strong)] px-4 text-[15.5px] font-semibold peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--va-hl)]">Yes</span>
                </label><label class="relative">
                  <input type="radio" name="fit-q1" value="no" class="peer sr-only" data-fit-q="1" data-track="fit_check_answer" data-track-name="Q2 no">
                  <span class="flex min-h-[44px] min-w-[68px] items-center justify-center gap-1.5 rounded-full border border-[var(--va-line-strong)] px-4 text-[15.5px] font-semibold peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--va-hl)]">No</span>
                </label>
              </span>
            </fieldset>
          </li>
          <li>
            <fieldset class="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
              <legend class="float-left flex gap-3 text-[16.5px] leading-snug sm:"><span class="num text-[15px] leading-[1.6]">03</span><span>Could one missed call cost you a customer worth real money?</span></legend>
              <span class="flex shrink-0 gap-2 pl-8 sm:pl-0">
                <label class="relative">
                  <input type="radio" name="fit-q2" value="yes" class="peer sr-only" data-fit-q="2" data-track="fit_check_answer" data-track-name="Q3 yes">
                  <span class="flex min-h-[44px] min-w-[68px] items-center justify-center gap-1.5 rounded-full border border-[var(--va-line-strong)] px-4 text-[15.5px] font-semibold peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--va-hl)]">Yes</span>
                </label><label class="relative">
                  <input type="radio" name="fit-q2" value="no" class="peer sr-only" data-fit-q="2" data-track="fit_check_answer" data-track-name="Q3 no">
                  <span class="flex min-h-[44px] min-w-[68px] items-center justify-center gap-1.5 rounded-full border border-[var(--va-line-strong)] px-4 text-[15.5px] font-semibold peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--va-hl)]">No</span>
                </label>
              </span>
            </fieldset>
          </li>
          <li>
            <fieldset class="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
              <legend class="float-left flex gap-3 text-[16.5px] leading-snug sm:"><span class="num text-[15px] leading-[1.6]">04</span><span>Do you have a diary or system bookings can go into?</span></legend>
              <span class="flex shrink-0 gap-2 pl-8 sm:pl-0">
                <label class="relative">
                  <input type="radio" name="fit-q3" value="yes" class="peer sr-only" data-fit-q="3" data-track="fit_check_answer" data-track-name="Q4 yes">
                  <span class="flex min-h-[44px] min-w-[68px] items-center justify-center gap-1.5 rounded-full border border-[var(--va-line-strong)] px-4 text-[15.5px] font-semibold peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--va-hl)]">Yes</span>
                </label><label class="relative">
                  <input type="radio" name="fit-q3" value="no" class="peer sr-only" data-fit-q="3" data-track="fit_check_answer" data-track-name="Q4 no">
                  <span class="flex min-h-[44px] min-w-[68px] items-center justify-center gap-1.5 rounded-full border border-[var(--va-line-strong)] px-4 text-[15.5px] font-semibold peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--va-hl)]">No</span>
                </label>
              </span>
            </fieldset>
          </li>
          <li>
            <fieldset class="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
              <legend class="float-left flex gap-3 text-[16.5px] leading-snug sm:"><span class="num text-[15px] leading-[1.6]">05</span><span>Are you happy for callers to be told they are speaking to an AI?</span></legend>
              <span class="flex shrink-0 gap-2 pl-8 sm:pl-0">
                <label class="relative">
                  <input type="radio" name="fit-q4" value="yes" class="peer sr-only" data-fit-q="4" data-track="fit_check_answer" data-track-name="Q5 yes">
                  <span class="flex min-h-[44px] min-w-[68px] items-center justify-center gap-1.5 rounded-full border border-[var(--va-line-strong)] px-4 text-[15.5px] font-semibold peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--va-hl)]">Yes</span>
                </label><label class="relative">
                  <input type="radio" name="fit-q4" value="no" class="peer sr-only" data-fit-q="4" data-track="fit_check_answer" data-track-name="Q5 no">
                  <span class="flex min-h-[44px] min-w-[68px] items-center justify-center gap-1.5 rounded-full border border-[var(--va-line-strong)] px-4 text-[15.5px] font-semibold peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--va-hl)]">No</span>
                </label>
              </span>
            </fieldset>
          </li>
        </ol>
        <button type="reset" class="mt-4 inline-flex min-h-[44px] items-center gap-2 text-[15.5px] font-semibold text-muted hover:text-ink" data-track="fit_check_reset"><svg class="icon " aria-hidden="true" focusable="false"><use href="#i-replay"/></svg>Start again</button>
      </form>

      <div class="flex flex-col items-center justify-center bg-sand p-6 text-center sm:p-8" aria-live="polite" data-fit-result data-state="empty">
        <svg viewBox="0 0 200 118" class="w-full max-w-[260px]" role="img" aria-label="Fit gauge" data-fit-gauge>
          <path d="M20 100 A80 80 0 0 1 180 100" class="fit-track"/>
          <path d="M20 100 A80 80 0 0 1 180 100" class="fit-fill" style="stroke-dasharray:251.3;stroke-dashoffset:251.3" data-fit-arc data-arc="251.3"/>
          <g class="fit-needle" style="transform:rotate(-90deg)" data-fit-needle><line x1="100" y1="100" x2="100" y2="34"/><circle cx="100" cy="100" r="7"/></g>
          <text x="20" y="116" class="fit-tick" text-anchor="middle">0</text>
          <text x="180" y="116" class="fit-tick" text-anchor="middle">5</text>
        </svg>
        <p class="mt-3 font-display text-[26px] font-semibold leading-tight" data-fit-title>Answer to see your fit</p>
        <p class="mt-2 text-[16px] leading-snug text-muted" data-fit-text>Your result appears here as you go. Nothing is sent anywhere.</p>
        <p class="mt-1 text-[14.5px] text-muted tnum" data-fit-count>0 of 5 answered</p>
        <a href="/contact?service=ai-voice-agents" class="btn btn-primary mt-5" data-fit-cta data-track="fit_check_book_demo" hidden>Book a Voice Agent Demo</a>
      </div>
    </div>
  </div>
</section>

<section id="feedback" data-component="ClientFeedback">
  <div class="container-omh py-20 lg:py-28">
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

    <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" data-reveal-group>
      <figure data-reveal class="flex flex-col rounded-[16px] border border-line bg-surface p-3 transition-colors hover:border-[var(--va-line-strong)]">
        <div class="relative aspect-video overflow-hidden rounded-[11px] bg-[var(--va-tint-1)]">
          <button type="button" class="group absolute inset-0 block w-full text-left" aria-haspopup="dialog" data-video-modal-open data-video-id="" data-video-title="Evening calls at a Manchester dental practice" data-video-meta="Practice manager. Dental clinic, Manchester" data-track="testimonial_video_open" data-track-name="Dental clinic, Manchester" aria-label="Play video testimonial: Evening calls at a Manchester dental practice (opens in a pop-up)">
            <span class="pointer-events-none absolute -right-6 -top-4 text-ink/10" aria-hidden="true"><svg class="icon !h-[150px] !w-[150px]" aria-hidden="true" focusable="false"><use href="#i-tooth"/></svg></span>
            <span class="vn-wave thumb-wave absolute inset-x-5 bottom-11 !h-7 opacity-50" aria-hidden="true"><i style="height:30%"></i><i style="height:55%"></i><i style="height:80%"></i><i style="height:45%"></i><i style="height:65%"></i><i style="height:90%"></i><i style="height:50%"></i><i style="height:35%"></i><i style="height:70%"></i><i style="height:85%"></i><i style="height:40%"></i><i style="height:60%"></i><i style="height:75%"></i><i style="height:30%"></i><i style="height:50%"></i><i style="height:65%"></i><i style="height:45%"></i><i style="height:80%"></i><i style="height:55%"></i><i style="height:35%"></i><i style="height:60%"></i><i style="height:40%"></i><i style="height:70%"></i><i style="height:30%"></i></span>
            <span class="absolute left-4 top-4 rounded-full bg-surface/90 px-3 py-1 text-[13px] font-semibold text-ink">Video testimonial</span>
            <span class="absolute left-1/2 top-[40%] grid h-[60px] w-[60px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gold text-navy shadow-[0_10px_24px_-8px_rgb(0_0_0/0.55)] transition-transform group-hover:scale-110" aria-hidden="true"><svg class="icon !h-6 !w-6 translate-x-0.5" aria-hidden="true" focusable="false"><use href="#i-play"/></svg></span>
            <span class="absolute bottom-3 left-4 right-20 truncate text-[14px] font-semibold text-ink">Practice manager</span>
            <span class="absolute bottom-3 right-3 rounded-[5px] bg-[#000]/85 px-1.5 py-0.5 text-[13px] font-semibold text-white tnum"><span class="sr-only">Length </span>1:12</span>
          </button>
        </div>
        <figcaption class="flex flex-1 flex-col px-2 pb-2 pt-4">
          <h3 class="!text-[20px] !leading-[1.3]">Evening calls at a Manchester dental practice</h3>
          <blockquote class="mt-2 text-[16px] leading-[1.5] text-muted"><p>Quote to follow once this practice has run its voice agent long enough for us to verify the results.</p></blockquote>
          <span class="mt-auto flex flex-wrap items-center gap-2 pt-4"><span class="chip">Dental clinic</span><span class="chip"><svg class="icon " aria-hidden="true" focusable="false"><use href="#i-map-pin"/></svg>Manchester</span><span class="chip chip-pending">Voice agent result: pending</span></span>
        </figcaption>
      </figure>
      <figure data-reveal class="flex flex-col rounded-[16px] border border-line bg-surface p-3 transition-colors hover:border-[var(--va-line-strong)]">
        <div class="relative aspect-video overflow-hidden rounded-[11px] bg-[var(--va-tint-4)]">
          <button type="button" class="group absolute inset-0 block w-full text-left" aria-haspopup="dialog" data-video-modal-open data-video-id="" data-video-title="A first winter of breakdown calls in Leeds" data-video-meta="Director. Heating engineers, Leeds" data-track="testimonial_video_open" data-track-name="Heating engineers, Leeds" aria-label="Play video testimonial: A first winter of breakdown calls in Leeds (opens in a pop-up)">
            <span class="pointer-events-none absolute -right-6 -top-4 text-ink/10" aria-hidden="true"><svg class="icon !h-[150px] !w-[150px]" aria-hidden="true" focusable="false"><use href="#i-flame"/></svg></span>
            <span class="vn-wave thumb-wave absolute inset-x-5 bottom-11 !h-7 opacity-50" aria-hidden="true"><i style="height:45%"></i><i style="height:70%"></i><i style="height:35%"></i><i style="height:85%"></i><i style="height:60%"></i><i style="height:40%"></i><i style="height:75%"></i><i style="height:55%"></i><i style="height:90%"></i><i style="height:30%"></i><i style="height:65%"></i><i style="height:50%"></i><i style="height:80%"></i><i style="height:45%"></i><i style="height:35%"></i><i style="height:70%"></i><i style="height:60%"></i><i style="height:85%"></i><i style="height:40%"></i><i style="height:55%"></i><i style="height:30%"></i><i style="height:75%"></i><i style="height:50%"></i><i style="height:65%"></i></span>
            <span class="absolute left-4 top-4 rounded-full bg-surface/90 px-3 py-1 text-[13px] font-semibold text-ink">Video testimonial</span>
            <span class="absolute left-1/2 top-[40%] grid h-[60px] w-[60px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gold text-navy shadow-[0_10px_24px_-8px_rgb(0_0_0/0.55)] transition-transform group-hover:scale-110" aria-hidden="true"><svg class="icon !h-6 !w-6 translate-x-0.5" aria-hidden="true" focusable="false"><use href="#i-play"/></svg></span>
            <span class="absolute bottom-3 left-4 right-20 truncate text-[14px] font-semibold text-ink">Director</span>
            <span class="absolute bottom-3 right-3 rounded-[5px] bg-[#000]/85 px-1.5 py-0.5 text-[13px] font-semibold text-white tnum"><span class="sr-only">Length </span>0:58</span>
          </button>
        </div>
        <figcaption class="flex flex-1 flex-col px-2 pb-2 pt-4">
          <h3 class="!text-[20px] !leading-[1.3]">A first winter of breakdown calls in Leeds</h3>
          <blockquote class="mt-2 text-[16px] leading-[1.5] text-muted"><p>Quote to follow, covering out-of-hours breakdown calls and how many became booked repairs.</p></blockquote>
          <span class="mt-auto flex flex-wrap items-center gap-2 pt-4"><span class="chip">Heating engineers</span><span class="chip"><svg class="icon " aria-hidden="true" focusable="false"><use href="#i-map-pin"/></svg>Leeds</span><span class="chip chip-pending">Voice agent result: pending</span></span>
        </figcaption>
      </figure>
      <figure data-reveal class="flex flex-col rounded-[16px] border border-line bg-surface p-3 transition-colors hover:border-[var(--va-line-strong)]">
        <div class="relative aspect-video overflow-hidden rounded-[11px] bg-[var(--va-tint-2)]">
          <button type="button" class="group absolute inset-0 block w-full text-left" aria-haspopup="dialog" data-video-modal-open data-video-id="" data-video-title="Saturday viewing requests at a London branch" data-video-meta="Branch manager. Estate agents, London" data-track="testimonial_video_open" data-track-name="Estate agents, London" aria-label="Play video testimonial: Saturday viewing requests at a London branch (opens in a pop-up)">
            <span class="pointer-events-none absolute -right-6 -top-4 text-ink/10" aria-hidden="true"><svg class="icon !h-[150px] !w-[150px]" aria-hidden="true" focusable="false"><use href="#i-home"/></svg></span>
            <span class="vn-wave thumb-wave absolute inset-x-5 bottom-11 !h-7 opacity-50" aria-hidden="true"><i style="height:60%"></i><i style="height:35%"></i><i style="height:75%"></i><i style="height:50%"></i><i style="height:90%"></i><i style="height:40%"></i><i style="height:65%"></i><i style="height:80%"></i><i style="height:30%"></i><i style="height:55%"></i><i style="height:70%"></i><i style="height:45%"></i><i style="height:85%"></i><i style="height:35%"></i><i style="height:60%"></i><i style="height:50%"></i><i style="height:75%"></i><i style="height:40%"></i><i style="height:90%"></i><i style="height:30%"></i><i style="height:65%"></i><i style="height:55%"></i><i style="height:45%"></i><i style="height:70%"></i></span>
            <span class="absolute left-4 top-4 rounded-full bg-surface/90 px-3 py-1 text-[13px] font-semibold text-ink">Video testimonial</span>
            <span class="absolute left-1/2 top-[40%] grid h-[60px] w-[60px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gold text-navy shadow-[0_10px_24px_-8px_rgb(0_0_0/0.55)] transition-transform group-hover:scale-110" aria-hidden="true"><svg class="icon !h-6 !w-6 translate-x-0.5" aria-hidden="true" focusable="false"><use href="#i-play"/></svg></span>
            <span class="absolute bottom-3 left-4 right-20 truncate text-[14px] font-semibold text-ink">Branch manager</span>
            <span class="absolute bottom-3 right-3 rounded-[5px] bg-[#000]/85 px-1.5 py-0.5 text-[13px] font-semibold text-white tnum"><span class="sr-only">Length </span>1:04</span>
          </button>
        </div>
        <figcaption class="flex flex-1 flex-col px-2 pb-2 pt-4">
          <h3 class="!text-[20px] !leading-[1.3]">Saturday viewing requests at a London branch</h3>
          <blockquote class="mt-2 text-[16px] leading-[1.5] text-muted"><p>Quote to follow, covering viewing requests taken while every negotiator was out.</p></blockquote>
          <span class="mt-auto flex flex-wrap items-center gap-2 pt-4"><span class="chip">Estate agents</span><span class="chip"><svg class="icon " aria-hidden="true" focusable="false"><use href="#i-map-pin"/></svg>London</span><span class="chip chip-pending">Voice agent result: pending</span></span>
        </figcaption>
      </figure>
      <figure data-reveal class="flex flex-col rounded-[16px] border border-line bg-surface p-3 transition-colors hover:border-[var(--va-line-strong)]">
        <div class="relative aspect-video overflow-hidden rounded-[11px] bg-[var(--va-tint-2)]">
          <button type="button" class="group absolute inset-0 block w-full text-left" aria-haspopup="dialog" data-video-modal-open data-video-id="" data-video-title="New enquiries while fee earners are in court" data-video-meta="Partner. Law firm, Birmingham" data-track="testimonial_video_open" data-track-name="Law firm, Birmingham" aria-label="Play video testimonial: New enquiries while fee earners are in court (opens in a pop-up)">
            <span class="pointer-events-none absolute -right-6 -top-4 text-ink/10" aria-hidden="true"><svg class="icon !h-[150px] !w-[150px]" aria-hidden="true" focusable="false"><use href="#i-scale"/></svg></span>
            <span class="vn-wave thumb-wave absolute inset-x-5 bottom-11 !h-7 opacity-50" aria-hidden="true"><i style="height:35%"></i><i style="height:80%"></i><i style="height:50%"></i><i style="height:65%"></i><i style="height:40%"></i><i style="height:85%"></i><i style="height:30%"></i><i style="height:70%"></i><i style="height:55%"></i><i style="height:90%"></i><i style="height:45%"></i><i style="height:60%"></i><i style="height:35%"></i><i style="height:75%"></i><i style="height:50%"></i><i style="height:80%"></i><i style="height:40%"></i><i style="height:65%"></i><i style="height:30%"></i><i style="height:85%"></i><i style="height:55%"></i><i style="height:70%"></i><i style="height:45%"></i><i style="height:60%"></i></span>
            <span class="absolute left-4 top-4 rounded-full bg-surface/90 px-3 py-1 text-[13px] font-semibold text-ink">Video testimonial</span>
            <span class="absolute left-1/2 top-[40%] grid h-[60px] w-[60px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gold text-navy shadow-[0_10px_24px_-8px_rgb(0_0_0/0.55)] transition-transform group-hover:scale-110" aria-hidden="true"><svg class="icon !h-6 !w-6 translate-x-0.5" aria-hidden="true" focusable="false"><use href="#i-play"/></svg></span>
            <span class="absolute bottom-3 left-4 right-20 truncate text-[14px] font-semibold text-ink">Partner</span>
            <span class="absolute bottom-3 right-3 rounded-[5px] bg-[#000]/85 px-1.5 py-0.5 text-[13px] font-semibold text-white tnum"><span class="sr-only">Length </span>0:47</span>
          </button>
        </div>
        <figcaption class="flex flex-1 flex-col px-2 pb-2 pt-4">
          <h3 class="!text-[20px] !leading-[1.3]">New enquiries while fee earners are in court</h3>
          <blockquote class="mt-2 text-[16px] leading-[1.5] text-muted"><p>Quote to follow, covering new enquiries taken while the team was in court or meetings.</p></blockquote>
          <span class="mt-auto flex flex-wrap items-center gap-2 pt-4"><span class="chip">Law firm</span><span class="chip"><svg class="icon " aria-hidden="true" focusable="false"><use href="#i-map-pin"/></svg>Birmingham</span><span class="chip chip-pending">Voice agent result: pending</span></span>
        </figcaption>
      </figure>
      <figure data-reveal class="flex flex-col rounded-[16px] border border-line bg-surface p-3 transition-colors hover:border-[var(--va-line-strong)]">
        <div class="relative aspect-video overflow-hidden rounded-[11px] bg-[var(--va-tint-3)]">
          <button type="button" class="group absolute inset-0 block w-full text-left" aria-haspopup="dialog" data-video-modal-open data-video-id="" data-video-title="The morning service rush in Liverpool" data-video-meta="Service manager. Car dealership, Liverpool" data-track="testimonial_video_open" data-track-name="Car dealership, Liverpool" aria-label="Play video testimonial: The morning service rush in Liverpool (opens in a pop-up)">
            <span class="pointer-events-none absolute -right-6 -top-4 text-ink/10" aria-hidden="true"><svg class="icon !h-[150px] !w-[150px]" aria-hidden="true" focusable="false"><use href="#i-car"/></svg></span>
            <span class="vn-wave thumb-wave absolute inset-x-5 bottom-11 !h-7 opacity-50" aria-hidden="true"><i style="height:70%"></i><i style="height:45%"></i><i style="height:60%"></i><i style="height:30%"></i><i style="height:80%"></i><i style="height:55%"></i><i style="height:90%"></i><i style="height:35%"></i><i style="height:65%"></i><i style="height:50%"></i><i style="height:75%"></i><i style="height:40%"></i><i style="height:85%"></i><i style="height:60%"></i><i style="height:30%"></i><i style="height:70%"></i><i style="height:45%"></i><i style="height:55%"></i><i style="height:80%"></i><i style="height:35%"></i><i style="height:65%"></i><i style="height:50%"></i><i style="height:90%"></i><i style="height:40%"></i></span>
            <span class="absolute left-4 top-4 rounded-full bg-surface/90 px-3 py-1 text-[13px] font-semibold text-ink">Video testimonial</span>
            <span class="absolute left-1/2 top-[40%] grid h-[60px] w-[60px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gold text-navy shadow-[0_10px_24px_-8px_rgb(0_0_0/0.55)] transition-transform group-hover:scale-110" aria-hidden="true"><svg class="icon !h-6 !w-6 translate-x-0.5" aria-hidden="true" focusable="false"><use href="#i-play"/></svg></span>
            <span class="absolute bottom-3 left-4 right-20 truncate text-[14px] font-semibold text-ink">Service manager</span>
            <span class="absolute bottom-3 right-3 rounded-[5px] bg-[#000]/85 px-1.5 py-0.5 text-[13px] font-semibold text-white tnum"><span class="sr-only">Length </span>0:52</span>
          </button>
        </div>
        <figcaption class="flex flex-1 flex-col px-2 pb-2 pt-4">
          <h3 class="!text-[20px] !leading-[1.3]">The morning service rush in Liverpool</h3>
          <blockquote class="mt-2 text-[16px] leading-[1.5] text-muted"><p>Quote to follow, covering service bookings taken when the desk used to let the phone ring out.</p></blockquote>
          <span class="mt-auto flex flex-wrap items-center gap-2 pt-4"><span class="chip">Car dealership</span><span class="chip"><svg class="icon " aria-hidden="true" focusable="false"><use href="#i-map-pin"/></svg>Liverpool</span><span class="chip chip-pending">Voice agent result: pending</span></span>
        </figcaption>
      </figure>
      <figure data-reveal class="flex flex-col rounded-[16px] border border-line bg-surface p-3 transition-colors hover:border-[var(--va-line-strong)]">
        <div class="relative aspect-video overflow-hidden rounded-[11px] bg-[var(--va-tint-1)]">
          <button type="button" class="group absolute inset-0 block w-full text-left" aria-haspopup="dialog" data-video-modal-open data-video-id="" data-video-title="Quote requests captured from site in Bristol" data-video-meta="Owner. Building contractor, Bristol" data-track="testimonial_video_open" data-track-name="Building contractor, Bristol" aria-label="Play video testimonial: Quote requests captured from site in Bristol (opens in a pop-up)">
            <span class="pointer-events-none absolute -right-6 -top-4 text-ink/10" aria-hidden="true"><svg class="icon !h-[150px] !w-[150px]" aria-hidden="true" focusable="false"><use href="#i-hard-hat"/></svg></span>
            <span class="vn-wave thumb-wave absolute inset-x-5 bottom-11 !h-7 opacity-50" aria-hidden="true"><i style="height:30%"></i><i style="height:55%"></i><i style="height:80%"></i><i style="height:45%"></i><i style="height:65%"></i><i style="height:90%"></i><i style="height:50%"></i><i style="height:35%"></i><i style="height:70%"></i><i style="height:85%"></i><i style="height:40%"></i><i style="height:60%"></i><i style="height:75%"></i><i style="height:30%"></i><i style="height:50%"></i><i style="height:65%"></i><i style="height:45%"></i><i style="height:80%"></i><i style="height:55%"></i><i style="height:35%"></i><i style="height:60%"></i><i style="height:40%"></i><i style="height:70%"></i><i style="height:30%"></i></span>
            <span class="absolute left-4 top-4 rounded-full bg-surface/90 px-3 py-1 text-[13px] font-semibold text-ink">Video testimonial</span>
            <span class="absolute left-1/2 top-[40%] grid h-[60px] w-[60px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gold text-navy shadow-[0_10px_24px_-8px_rgb(0_0_0/0.55)] transition-transform group-hover:scale-110" aria-hidden="true"><svg class="icon !h-6 !w-6 translate-x-0.5" aria-hidden="true" focusable="false"><use href="#i-play"/></svg></span>
            <span class="absolute bottom-3 left-4 right-20 truncate text-[14px] font-semibold text-ink">Owner</span>
            <span class="absolute bottom-3 right-3 rounded-[5px] bg-[#000]/85 px-1.5 py-0.5 text-[13px] font-semibold text-white tnum"><span class="sr-only">Length </span>0:39</span>
          </button>
        </div>
        <figcaption class="flex flex-1 flex-col px-2 pb-2 pt-4">
          <h3 class="!text-[20px] !leading-[1.3]">Quote requests captured from site in Bristol</h3>
          <blockquote class="mt-2 text-[16px] leading-[1.5] text-muted"><p>Quote to follow, covering project enquiries captured while the team was on site.</p></blockquote>
          <span class="mt-auto flex flex-wrap items-center gap-2 pt-4"><span class="chip">Building contractor</span><span class="chip"><svg class="icon " aria-hidden="true" focusable="false"><use href="#i-map-pin"/></svg>Bristol</span><span class="chip chip-pending">Voice agent result: pending</span></span>
        </figcaption>
      </figure>
    </div>
    <p class="mt-6 text-[16px] text-muted">Each video opens in a pop-up and loads from YouTube's privacy-enhanced player only when you press play.</p>
  </div>
</section>

<dialog data-component="VideoModal" data-video-modal aria-labelledby="video-modal-title" class="video-modal m-auto w-[min(960px,calc(100vw-32px),calc((100dvh-170px)*16/9))] max-w-none overflow-visible bg-transparent p-0 text-band-ink backdrop:bg-[#000]/80">
  <div class="on-band overflow-hidden rounded-[16px] bg-band shadow-[0_40px_80px_-30px_rgb(0_0_0/0.6)]">
    <div class="flex items-start justify-between gap-4 px-5 py-4 sm:px-6">
      <div class="min-w-0">
        <p class="text-[14px] font-semibold text-band-hl">Video testimonial</p>
        <h2 id="video-modal-title" class="mt-0.5 !text-[clamp(19px,17px+.6vw,24px)] !leading-tight" data-video-modal-title></h2>
        <p class="mt-1 text-[16px] text-band-muted" data-video-modal-meta></p>
      </div>
      <button type="button" class="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-band-line text-band-ink hover:bg-white/10" data-video-modal-close data-track="testimonial_video_close" aria-label="Close video"><svg class="icon " aria-hidden="true" focusable="false"><use href="#i-x"/></svg></button>
    </div>
    <div class="relative aspect-video bg-[#000]" data-video-modal-player></div>
  </div>
</dialog>

${roiCalculator("any-business")}

${pricingSection("bg-surface")}

<section id="compare" data-component="Compare">
  <div class="container-omh py-20 lg:py-28">
    <div>
      <div>
        <p class="eyebrow"><span class="eyebrow-mark" aria-hidden="true"><i></i><i></i><i></i></span>Compare your options</p>
        <h2>How a voice agent compares with <span class="hl">the usual answers</span></h2>
      </div>
      <p class="mt-5 text-muted">Most businesses handle missed calls with voicemail, an answering service, more reception staff or a DIY tool. Here is an honest side-by-side, including where each option wins.</p>
    </div>

    <div class="mt-12 hidden overflow-hidden rounded-[18px] border border-line bg-surface shadow-[0_30px_60px_-45px_rgb(0_0_0/0.45)] lg:block">
      <table class="cmp-table w-full border-separate border-spacing-0 text-left text-[16px] leading-snug">
        <caption class="sr-only">OMH managed voice agent compared with voicemail, an answering service, an in-house receptionist and a DIY voice AI platform</caption>
        <thead>
          <tr>
            <th scope="col" class="w-[16%] px-5 pb-4 pt-5 align-bottom text-[16px] font-semibold uppercase tracking-[0.14em] text-muted">What matters</th>
            <th scope="col" class="cmp-omh w-[16.8%] px-5 pb-4 pt-5 align-bottom text-ink"><span class="mb-2 inline-flex rounded-full bg-gold px-2.5 py-0.5 text-[16px] font-semibold text-navy">Managed for you</span><span class="block font-display text-[18px] font-semibold">OMH voice agent</span></th><th scope="col" class="w-[16.8%] px-5 pb-4 pt-5 align-bottom"><span class="font-display text-[18px] font-semibold text-ink">Voicemail</span></th><th scope="col" class="w-[16.8%] px-5 pb-4 pt-5 align-bottom"><span class="font-display text-[18px] font-semibold text-ink">Answering service</span></th><th scope="col" class="w-[16.8%] px-5 pb-4 pt-5 align-bottom"><span class="font-display text-[18px] font-semibold text-ink">In-house receptionist</span></th><th scope="col" class="w-[16.8%] px-5 pb-4 pt-5 align-bottom"><span class="font-display text-[18px] font-semibold text-ink">DIY voice AI platform</span></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row" class="border-t border-line px-5 py-4 align-top font-display text-[16px] font-semibold">Typical monthly cost</th>
            <td class="cmp-omh font-semibold border-t border-line px-5 py-4 align-top"><span class="block">From £249 + VAT</span><span class="mt-1 block text-[16px] font-normal text-muted">300 minutes included, £795 setup</span></td><td class="text-muted border-t border-line px-5 py-4 align-top"><span class="block">Free</span><span class="mt-1 block text-[16px] font-normal text-muted">Already part of your phone system</span></td><td class="text-muted border-t border-line px-5 py-4 align-top"><span class="block">£54.99 to £220</span><span class="mt-1 block text-[16px] font-normal text-muted">then £2.10 a call over the bundle</span></td><td class="text-muted border-t border-line px-5 py-4 align-top"><span class="block">About £2,432</span><span class="mt-1 block text-[16px] font-normal text-muted">£29,185 a year, salary plus employer costs</span></td><td class="text-muted border-t border-line px-5 py-4 align-top"><span class="block">£30 to £72</span><span class="mt-1 block text-[16px] font-normal text-muted">usage only, plus your own time</span></td>
          </tr>
          <tr>
            <th scope="row" class="border-t border-line px-5 py-4 align-top font-display text-[16px] font-semibold">What that buys</th>
            <td class="cmp-omh font-semibold border-t border-line px-5 py-4 align-top">300 minutes, then 60p a minute</td><td class="text-muted border-t border-line px-5 py-4 align-top">Nothing. A message, if they leave one</td><td class="text-muted border-t border-line px-5 py-4 align-top">100 calls or 200 minutes a month</td><td class="text-muted border-t border-line px-5 py-4 align-top">One person, one call at a time, office hours</td><td class="text-muted border-t border-line px-5 py-4 align-top">300 minutes of calls at 13c to 31c a minute</td>
          </tr>
          <tr>
            <th scope="row" class="border-t border-line px-5 py-4 align-top font-display text-[16px] font-semibold">Answers out of hours</th>
            <td class="cmp-omh font-semibold border-t border-line px-5 py-4 align-top">Yes, day and night</td><td class="text-muted border-t border-line px-5 py-4 align-top">Records a message, if callers leave one</td><td class="text-muted border-t border-line px-5 py-4 align-top">Depends on the plan, 24/7 usually costs more</td><td class="text-muted border-t border-line px-5 py-4 align-top">Office hours only</td><td class="text-muted border-t border-line px-5 py-4 align-top">Yes, once you have built it</td>
          </tr>
          <tr>
            <th scope="row" class="border-t border-line px-5 py-4 align-top font-display text-[16px] font-semibold">Books into your diary</th>
            <td class="cmp-omh font-semibold border-t border-line px-5 py-4 align-top">Yes, while the caller is on the line</td><td class="text-muted border-t border-line px-5 py-4 align-top">No</td><td class="text-muted border-t border-line px-5 py-4 align-top">Sometimes, by hand, after the call</td><td class="text-muted border-t border-line px-5 py-4 align-top">Yes</td><td class="text-muted border-t border-line px-5 py-4 align-top">Only if you connect it yourself</td>
          </tr>
          <tr>
            <th scope="row" class="border-t border-line px-5 py-4 align-top font-display text-[16px] font-semibold">Calls at the same time</th>
            <td class="cmp-omh font-semibold border-t border-line px-5 py-4 align-top">Many at once</td><td class="text-muted border-t border-line px-5 py-4 align-top">One message at a time</td><td class="text-muted border-t border-line px-5 py-4 align-top">Depends on their staffing</td><td class="text-muted border-t border-line px-5 py-4 align-top">One at a time</td><td class="text-muted border-t border-line px-5 py-4 align-top">Many at once</td>
          </tr>
          <tr>
            <th scope="row" class="border-t border-line px-5 py-4 align-top font-display text-[16px] font-semibold">Knows your business</th>
            <td class="cmp-omh font-semibold border-t border-line px-5 py-4 align-top">Built from your real calls and your own pages</td><td class="text-muted border-t border-line px-5 py-4 align-top">No</td><td class="text-muted border-t border-line px-5 py-4 align-top">A short script they read</td><td class="text-muted border-t border-line px-5 py-4 align-top">Best of all</td><td class="text-muted border-t border-line px-5 py-4 align-top">As well as you set it up</td>
          </tr>
          <tr>
            <th scope="row" class="border-t border-line px-5 py-4 align-top font-display text-[16px] font-semibold">Setup and upkeep</th>
            <td class="cmp-omh font-semibold border-t border-line px-5 py-4 align-top">We build it, test it and tune it every month</td><td class="text-muted border-t border-line px-5 py-4 align-top">None</td><td class="text-muted border-t border-line px-5 py-4 align-top">Low, they onboard you</td><td class="text-muted border-t border-line px-5 py-4 align-top">Recruiting, training, holiday and sick cover</td><td class="text-muted border-t border-line px-5 py-4 align-top">About 20 hours to build (£800 of your time) and 2 hours a month after</td>
          </tr>
          <tr>
            <th scope="row" class="border-t border-line px-5 py-4 align-top font-display text-[16px] font-semibold">Results in your reporting</th>
            <td class="cmp-omh font-semibold border-t border-line px-5 py-4 align-top">Beside your ads and website numbers</td><td class="text-muted border-t border-line px-5 py-4 align-top">No</td><td class="text-muted border-t border-line px-5 py-4 align-top">Call logs only</td><td class="text-muted border-t border-line px-5 py-4 align-top">Kept by hand, if at all</td><td class="text-muted border-t border-line px-5 py-4 align-top">A separate dashboard to check</td>
          </tr>
          <tr>
            <th scope="row" class="border-t border-line px-5 py-4 align-top font-display text-[16px] font-semibold">Where it wins</th>
            <td class="cmp-omh font-semibold border-t border-line px-5 py-4 align-top">Volume, nights and weekends, and never losing a caller</td><td class="text-muted border-t border-line px-5 py-4 align-top">Costs nothing if calls do not matter to you</td><td class="text-muted border-t border-line px-5 py-4 align-top">A real person, and good for complex or sensitive calls</td><td class="text-muted border-t border-line px-5 py-4 align-top">Judgement, warmth and knowing regulars by name</td><td class="text-muted border-t border-line px-5 py-4 align-top">Cheapest per minute if you have the time to build it</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="mt-10 lg:hidden" data-cmp>
      <p class="font-semibold" id="cmp-pick-label">Compare OMH with</p>
      <div role="radiogroup" aria-labelledby="cmp-pick-label" class="mt-3 flex flex-wrap gap-2" data-cmp-group>
        <button type="button" role="radio" aria-checked="true" tabindex="0" class="min-h-[44px] rounded-full border border-[var(--va-line-strong)] px-4 text-[16px] font-semibold aria-checked:border-ink aria-checked:bg-ink aria-checked:text-paper" data-cmp-opt="1" data-track="compare_option" data-track-name="Voicemail">Voicemail</button>
        <button type="button" role="radio" aria-checked="false" tabindex="-1" class="min-h-[44px] rounded-full border border-[var(--va-line-strong)] px-4 text-[16px] font-semibold aria-checked:border-ink aria-checked:bg-ink aria-checked:text-paper" data-cmp-opt="2" data-track="compare_option" data-track-name="Answering service">Answering service</button>
        <button type="button" role="radio" aria-checked="false" tabindex="-1" class="min-h-[44px] rounded-full border border-[var(--va-line-strong)] px-4 text-[16px] font-semibold aria-checked:border-ink aria-checked:bg-ink aria-checked:text-paper" data-cmp-opt="3" data-track="compare_option" data-track-name="In-house receptionist">Receptionist</button>
        <button type="button" role="radio" aria-checked="false" tabindex="-1" class="min-h-[44px] rounded-full border border-[var(--va-line-strong)] px-4 text-[16px] font-semibold aria-checked:border-ink aria-checked:bg-ink aria-checked:text-paper" data-cmp-opt="4" data-track="compare_option" data-track-name="DIY voice AI platform">DIY platform</button>
      </div>
      <div class="mt-5 overflow-hidden rounded-[16px] border border-line bg-surface" aria-live="polite">
        <div class="grid grid-cols-2 border-b border-line text-[16px] font-semibold">
          <p class="cmp-omh px-4 py-3">OMH voice agent</p>
          <p class="px-4 py-3" data-cmp-name>Voicemail</p>
        </div>
        <dl>
          <div class="border-b border-line last:border-0">
            <dt class="px-4 pt-3 text-[16px] font-semibold uppercase tracking-[0.14em] text-muted">Typical monthly cost</dt>
            <dd class="grid grid-cols-2 text-[16px] leading-snug">
              <span class="cmp-omh px-4 pb-3 pt-1.5 font-semibold"><span class="block">From £249 + VAT</span><span class="mt-1 block text-[16px] font-normal text-muted">300 minutes included, £795 setup</span></span>
              <span class="px-4 pb-3 pt-1.5 text-muted" data-cmp-cell="1"><span class="block">Free</span><span class="mt-1 block text-[16px] font-normal text-muted">Already part of your phone system</span></span><span class="px-4 pb-3 pt-1.5 text-muted" data-cmp-cell="2" hidden><span class="block">£54.99 to £220</span><span class="mt-1 block text-[16px] font-normal text-muted">then £2.10 a call over the bundle</span></span><span class="px-4 pb-3 pt-1.5 text-muted" data-cmp-cell="3" hidden><span class="block">About £2,432</span><span class="mt-1 block text-[16px] font-normal text-muted">£29,185 a year, salary plus employer costs</span></span><span class="px-4 pb-3 pt-1.5 text-muted" data-cmp-cell="4" hidden><span class="block">£30 to £72</span><span class="mt-1 block text-[16px] font-normal text-muted">usage only, plus your own time</span></span>
            </dd>
          </div>
          <div class="border-b border-line last:border-0">
            <dt class="px-4 pt-3 text-[16px] font-semibold uppercase tracking-[0.14em] text-muted">What that buys</dt>
            <dd class="grid grid-cols-2 text-[16px] leading-snug">
              <span class="cmp-omh px-4 pb-3 pt-1.5 font-semibold">300 minutes, then 60p a minute</span>
              <span class="px-4 pb-3 pt-1.5 text-muted" data-cmp-cell="1">Nothing. A message, if they leave one</span><span class="px-4 pb-3 pt-1.5 text-muted" data-cmp-cell="2" hidden>100 calls or 200 minutes a month</span><span class="px-4 pb-3 pt-1.5 text-muted" data-cmp-cell="3" hidden>One person, one call at a time, office hours</span><span class="px-4 pb-3 pt-1.5 text-muted" data-cmp-cell="4" hidden>300 minutes of calls at 13c to 31c a minute</span>
            </dd>
          </div>
          <div class="border-b border-line last:border-0">
            <dt class="px-4 pt-3 text-[16px] font-semibold uppercase tracking-[0.14em] text-muted">Answers out of hours</dt>
            <dd class="grid grid-cols-2 text-[16px] leading-snug">
              <span class="cmp-omh px-4 pb-3 pt-1.5 font-semibold">Yes, day and night</span>
              <span class="px-4 pb-3 pt-1.5 text-muted" data-cmp-cell="1">Records a message, if callers leave one</span><span class="px-4 pb-3 pt-1.5 text-muted" data-cmp-cell="2" hidden>Depends on the plan, 24/7 usually costs more</span><span class="px-4 pb-3 pt-1.5 text-muted" data-cmp-cell="3" hidden>Office hours only</span><span class="px-4 pb-3 pt-1.5 text-muted" data-cmp-cell="4" hidden>Yes, once you have built it</span>
            </dd>
          </div>
          <div class="border-b border-line last:border-0">
            <dt class="px-4 pt-3 text-[16px] font-semibold uppercase tracking-[0.14em] text-muted">Books into your diary</dt>
            <dd class="grid grid-cols-2 text-[16px] leading-snug">
              <span class="cmp-omh px-4 pb-3 pt-1.5 font-semibold">Yes, while the caller is on the line</span>
              <span class="px-4 pb-3 pt-1.5 text-muted" data-cmp-cell="1">No</span><span class="px-4 pb-3 pt-1.5 text-muted" data-cmp-cell="2" hidden>Sometimes, by hand, after the call</span><span class="px-4 pb-3 pt-1.5 text-muted" data-cmp-cell="3" hidden>Yes</span><span class="px-4 pb-3 pt-1.5 text-muted" data-cmp-cell="4" hidden>Only if you connect it yourself</span>
            </dd>
          </div>
          <div class="border-b border-line last:border-0">
            <dt class="px-4 pt-3 text-[16px] font-semibold uppercase tracking-[0.14em] text-muted">Calls at the same time</dt>
            <dd class="grid grid-cols-2 text-[16px] leading-snug">
              <span class="cmp-omh px-4 pb-3 pt-1.5 font-semibold">Many at once</span>
              <span class="px-4 pb-3 pt-1.5 text-muted" data-cmp-cell="1">One message at a time</span><span class="px-4 pb-3 pt-1.5 text-muted" data-cmp-cell="2" hidden>Depends on their staffing</span><span class="px-4 pb-3 pt-1.5 text-muted" data-cmp-cell="3" hidden>One at a time</span><span class="px-4 pb-3 pt-1.5 text-muted" data-cmp-cell="4" hidden>Many at once</span>
            </dd>
          </div>
          <div class="border-b border-line last:border-0">
            <dt class="px-4 pt-3 text-[16px] font-semibold uppercase tracking-[0.14em] text-muted">Knows your business</dt>
            <dd class="grid grid-cols-2 text-[16px] leading-snug">
              <span class="cmp-omh px-4 pb-3 pt-1.5 font-semibold">Built from your real calls and your own pages</span>
              <span class="px-4 pb-3 pt-1.5 text-muted" data-cmp-cell="1">No</span><span class="px-4 pb-3 pt-1.5 text-muted" data-cmp-cell="2" hidden>A short script they read</span><span class="px-4 pb-3 pt-1.5 text-muted" data-cmp-cell="3" hidden>Best of all</span><span class="px-4 pb-3 pt-1.5 text-muted" data-cmp-cell="4" hidden>As well as you set it up</span>
            </dd>
          </div>
          <div class="border-b border-line last:border-0">
            <dt class="px-4 pt-3 text-[16px] font-semibold uppercase tracking-[0.14em] text-muted">Setup and upkeep</dt>
            <dd class="grid grid-cols-2 text-[16px] leading-snug">
              <span class="cmp-omh px-4 pb-3 pt-1.5 font-semibold">We build it, test it and tune it every month</span>
              <span class="px-4 pb-3 pt-1.5 text-muted" data-cmp-cell="1">None</span><span class="px-4 pb-3 pt-1.5 text-muted" data-cmp-cell="2" hidden>Low, they onboard you</span><span class="px-4 pb-3 pt-1.5 text-muted" data-cmp-cell="3" hidden>Recruiting, training, holiday and sick cover</span><span class="px-4 pb-3 pt-1.5 text-muted" data-cmp-cell="4" hidden>About 20 hours to build (£800 of your time) and 2 hours a month after</span>
            </dd>
          </div>
          <div class="border-b border-line last:border-0">
            <dt class="px-4 pt-3 text-[16px] font-semibold uppercase tracking-[0.14em] text-muted">Results in your reporting</dt>
            <dd class="grid grid-cols-2 text-[16px] leading-snug">
              <span class="cmp-omh px-4 pb-3 pt-1.5 font-semibold">Beside your ads and website numbers</span>
              <span class="px-4 pb-3 pt-1.5 text-muted" data-cmp-cell="1">No</span><span class="px-4 pb-3 pt-1.5 text-muted" data-cmp-cell="2" hidden>Call logs only</span><span class="px-4 pb-3 pt-1.5 text-muted" data-cmp-cell="3" hidden>Kept by hand, if at all</span><span class="px-4 pb-3 pt-1.5 text-muted" data-cmp-cell="4" hidden>A separate dashboard to check</span>
            </dd>
          </div>
          <div class="border-b border-line last:border-0">
            <dt class="px-4 pt-3 text-[16px] font-semibold uppercase tracking-[0.14em] text-muted">Where it wins</dt>
            <dd class="grid grid-cols-2 text-[16px] leading-snug">
              <span class="cmp-omh px-4 pb-3 pt-1.5 font-semibold">Volume, nights and weekends, and never losing a caller</span>
              <span class="px-4 pb-3 pt-1.5 text-muted" data-cmp-cell="1">Costs nothing if calls do not matter to you</span><span class="px-4 pb-3 pt-1.5 text-muted" data-cmp-cell="2" hidden>A real person, and good for complex or sensitive calls</span><span class="px-4 pb-3 pt-1.5 text-muted" data-cmp-cell="3" hidden>Judgement, warmth and knowing regulars by name</span><span class="px-4 pb-3 pt-1.5 text-muted" data-cmp-cell="4" hidden>Cheapest per minute if you have the time to build it</span>
            </dd>
          </div>
        </dl>
      </div>
    </div>

    <p class="mt-4 text-[16px] text-muted">Costs are rough UK guides for a small business, not quotes. Answering service and platform prices vary widely by provider and usage.</p>

    <h3 class="mt-16 !text-[clamp(24px,21px+.8vw,30px)]">When something else suits you better</h3>
    <ul class="mt-6 grid gap-5 md:grid-cols-3">
      <li class="rounded-[14px] border border-line bg-surface p-6"><p class="font-display text-[18px] font-semibold">Every call needs a person</p><p class="mt-2 text-[16px] leading-[1.5] text-muted">If each conversation needs judgement or a personal touch from the first word, a good receptionist or answering service will serve you better.</p></li>
      <li class="rounded-[14px] border border-line bg-surface p-6"><p class="font-display text-[18px] font-semibold">You want to build it yourself</p><p class="mt-2 text-[16px] leading-[1.5] text-muted">If you have the technical time to script, connect and maintain an agent, a DIY platform costs less than a managed service.</p></li>
      <li class="rounded-[14px] border border-line bg-surface p-6"><p class="font-display text-[18px] font-semibold">Emergency or life-critical lines</p><p class="mt-2 text-[16px] leading-[1.5] text-muted">Where a missed or misunderstood call is a safety risk, an AI agent should never be the only route. We don't position it for those lines.</p></li>
    </ul>
  </div>
</section>

<section id="faq" data-component="FAQ" class="bg-surface">
  <div class="container-omh grid gap-10 py-20 lg:grid-cols-[minmax(0,.72fr)_minmax(0,1.28fr)] lg:grid-rows-[auto_1fr] lg:gap-x-14 lg:gap-y-8 lg:py-28">
    <div>
      <p class="eyebrow"><span class="eyebrow-mark" aria-hidden="true"><i></i><i></i><i></i></span>Questions</p>
      <h2>Straight answers to <span class="hl">fair questions</span></h2>
      <p class="mt-5 text-muted">The things owners and practice managers ask us most. Search, or pick a topic.</p>
    </div>

    <div class="order-last lg:order-none lg:col-start-1 lg:row-start-2 lg:sticky lg:top-28 lg:self-start">
      <div class="rounded-[16px] bg-band p-6 text-band-ink on-band">
        <p class="font-display text-body font-semibold">Still have a question?</p>
        <p class="mt-1.5 text-[16px] leading-snug text-band-muted">Talk to a person on our UK team. No sales script.</p>
        <ul class="mt-4 space-y-1 text-[16px]">
          <li><a href="tel:+442034893934" class="text-link tnum" data-track="faq_phone_click"><svg class="icon " aria-hidden="true" focusable="false"><use href="#i-phone"/></svg>020 3489 3934</a></li>
          <li><a href="mailto:support@onlinemarketinghelp.co.uk" class="text-link [overflow-wrap:anywhere] max-sm:text-[15px]" data-track="faq_email_click"><svg class="icon " aria-hidden="true" focusable="false"><use href="#i-mail"/></svg>support@onlinemarketinghelp.co.uk</a></li>
        </ul>
        <a href="/contact?service=ai-voice-agents" class="btn btn-primary mt-5 w-full" data-track="faq_book_demo">Book a Voice Agent Demo</a>
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
        <p aria-live="polite" data-faq-status>Showing all 12 questions</p>
        <button type="button" class="inline-flex min-h-[44px] items-center gap-1.5 font-semibold text-ink hover:text-hl" data-faq-expand data-track="faq_expand_all">Open all</button>
      </div>

      <div class="mt-2 space-y-3" data-faq-list>
      <details class="group rounded-[14px] border border-line bg-paper transition-colors open:border-[var(--va-line-strong)] open:bg-surface open:shadow-[0_18px_40px_-30px_rgb(0_0_0/0.45)]" data-faq-item data-cat="callers" open data-track-name="Will callers know they are talking to an AI?">
        <summary class="flex min-h-[64px] items-center gap-4 px-5 py-4">
          <span class="num hidden w-7 shrink-0 text-[15px] sm:block" aria-hidden="true">01</span>
          <span class="min-w-0 flex-1">
            <h3 class="!text-[clamp(18px,17px+.3vw,20.5px)] !leading-[1.3]">Will callers know they are talking to an AI?</h3>
            <span class="mt-1 block text-[13.5px] font-semibold text-muted">Callers and AI</span>
          </span>
          <span class="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--va-line-strong)] group-open:border-gold group-open:bg-gold group-open:text-navy"><svg class="icon faq-chevron" aria-hidden="true" focusable="false"><use href="#i-chevron-down"/></svg></span>
        </summary>
        <div class="px-5 pb-6 text-[16px] text-muted sm:pl-[4.25rem]">
          <p data-faq-answer>Yes. We set every agent up to say it is an AI assistant at the start of the call. Callers deserve to know, and it avoids awkward moments later in the conversation.</p>
          
        </div>
      </details>
      <details class="group rounded-[14px] border border-line bg-paper transition-colors open:border-[var(--va-line-strong)] open:bg-surface open:shadow-[0_18px_40px_-30px_rgb(0_0_0/0.45)]" data-faq-item data-cat="callers" data-track-name="Can the agent transfer a call to a real person?">
        <summary class="flex min-h-[64px] items-center gap-4 px-5 py-4">
          <span class="num hidden w-7 shrink-0 text-[15px] sm:block" aria-hidden="true">02</span>
          <span class="min-w-0 flex-1">
            <h3 class="!text-[clamp(18px,17px+.3vw,20.5px)] !leading-[1.3]">Can the agent transfer a call to a real person?</h3>
            <span class="mt-1 block text-[13.5px] font-semibold text-muted">Callers and AI</span>
          </span>
          <span class="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--va-line-strong)] group-open:border-gold group-open:bg-gold group-open:text-navy"><svg class="icon faq-chevron" aria-hidden="true" focusable="false"><use href="#i-chevron-down"/></svg></span>
        </summary>
        <div class="px-5 pb-6 text-[16px] text-muted sm:pl-[4.25rem]">
          <p data-faq-answer>Yes. You set the rules. Emergencies, existing clients, complaints and anyone who asks for a person can be put through to the right phone. Outside your opening hours the agent takes a detailed message and sends it to your team.</p>
          
        </div>
      </details>
      <details class="group rounded-[14px] border border-line bg-paper transition-colors open:border-[var(--va-line-strong)] open:bg-surface open:shadow-[0_18px_40px_-30px_rgb(0_0_0/0.45)]" data-faq-item data-cat="setup" data-track-name="Which calendars and systems does it work with?">
        <summary class="flex min-h-[64px] items-center gap-4 px-5 py-4">
          <span class="num hidden w-7 shrink-0 text-[15px] sm:block" aria-hidden="true">03</span>
          <span class="min-w-0 flex-1">
            <h3 class="!text-[clamp(18px,17px+.3vw,20.5px)] !leading-[1.3]">Which calendars and systems does it work with?</h3>
            <span class="mt-1 block text-[13.5px] font-semibold text-muted">Setup and systems</span>
          </span>
          <span class="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--va-line-strong)] group-open:border-gold group-open:bg-gold group-open:text-navy"><svg class="icon faq-chevron" aria-hidden="true" focusable="false"><use href="#i-chevron-down"/></svg></span>
        </summary>
        <div class="px-5 pb-6 text-[16px] text-muted sm:pl-[4.25rem]">
          <p data-faq-answer>The agent needs somewhere to put bookings and call notes, usually your calendar and your CRM or practice system. We check your exact tools during discovery and tell you plainly what connects directly, what needs a workaround and what is not possible yet.</p>
        </div>
      </details>
      <details class="group rounded-[14px] border border-line bg-paper transition-colors open:border-[var(--va-line-strong)] open:bg-surface open:shadow-[0_18px_40px_-30px_rgb(0_0_0/0.45)]" data-faq-item data-cat="setup" data-track-name="Can we keep our existing phone number, or get a local one?">
        <summary class="flex min-h-[64px] items-center gap-4 px-5 py-4">
          <span class="num hidden w-7 shrink-0 text-[15px] sm:block" aria-hidden="true">04</span>
          <span class="min-w-0 flex-1">
            <h3 class="!text-[clamp(18px,17px+.3vw,20.5px)] !leading-[1.3]">Can we keep our existing phone number, or get a local one?</h3>
            <span class="mt-1 block text-[13.5px] font-semibold text-muted">Setup and systems</span>
          </span>
          <span class="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--va-line-strong)] group-open:border-gold group-open:bg-gold group-open:text-navy"><svg class="icon faq-chevron" aria-hidden="true" focusable="false"><use href="#i-chevron-down"/></svg></span>
        </summary>
        <div class="px-5 pb-6 text-[16px] text-muted sm:pl-[4.25rem]">
          <p data-faq-answer>In most cases you keep your number and divert calls to the agent, either all of them or only the ones your team cannot answer. If you want a new local number, for example an 0161 number for Manchester, we can arrange one as part of setup.</p>
        </div>
      </details>
      <details class="group rounded-[14px] border border-line bg-paper transition-colors open:border-[var(--va-line-strong)] open:bg-surface open:shadow-[0_18px_40px_-30px_rgb(0_0_0/0.45)]" data-faq-item data-cat="data" data-track-name="Are calls recorded, and how does that fit with UK GDPR?">
        <summary class="flex min-h-[64px] items-center gap-4 px-5 py-4">
          <span class="num hidden w-7 shrink-0 text-[15px] sm:block" aria-hidden="true">05</span>
          <span class="min-w-0 flex-1">
            <h3 class="!text-[clamp(18px,17px+.3vw,20.5px)] !leading-[1.3]">Are calls recorded, and how does that fit with UK GDPR?</h3>
            <span class="mt-1 block text-[13.5px] font-semibold text-muted">Data and rules</span>
          </span>
          <span class="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--va-line-strong)] group-open:border-gold group-open:bg-gold group-open:text-navy"><svg class="icon faq-chevron" aria-hidden="true" focusable="false"><use href="#i-chevron-down"/></svg></span>
        </summary>
        <div class="px-5 pb-6 text-[16px] text-muted sm:pl-[4.25rem]">
          <p data-faq-answer>Calls can be recorded and transcribed so you can review them, and callers are told at the start of the call. You remain the data controller and OMH acts as your processor under a written agreement. We agree retention periods with you and delete recordings on that schedule.</p>
        </div>
      </details>
      <details class="group rounded-[14px] border border-line bg-paper transition-colors open:border-[var(--va-line-strong)] open:bg-surface open:shadow-[0_18px_40px_-30px_rgb(0_0_0/0.45)]" data-faq-item data-cat="data" data-track-name="What are the rules for outbound calls?">
        <summary class="flex min-h-[64px] items-center gap-4 px-5 py-4">
          <span class="num hidden w-7 shrink-0 text-[15px] sm:block" aria-hidden="true">06</span>
          <span class="min-w-0 flex-1">
            <h3 class="!text-[clamp(18px,17px+.3vw,20.5px)] !leading-[1.3]">What are the rules for outbound calls?</h3>
            <span class="mt-1 block text-[13.5px] font-semibold text-muted">Data and rules</span>
          </span>
          <span class="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--va-line-strong)] group-open:border-gold group-open:bg-gold group-open:text-navy"><svg class="icon faq-chevron" aria-hidden="true" focusable="false"><use href="#i-chevron-down"/></svg></span>
        </summary>
        <div class="px-5 pb-6 text-[16px] text-muted sm:pl-[4.25rem]">
          <p data-faq-answer>The agent only calls people who have given appropriate consent, such as customers who asked for a reminder or a call back. We follow the UK PECR rules, screen lists against the Telephone Preference Service where required and act on opt-outs straight away. We do not run cold calling campaigns to bought or non-consented lists.</p>
          
        </div>
      </details>
      <details class="group rounded-[14px] border border-line bg-paper transition-colors open:border-[var(--va-line-strong)] open:bg-surface open:shadow-[0_18px_40px_-30px_rgb(0_0_0/0.45)]" data-faq-item data-cat="sectors" data-track-name="Is it suitable for dental clinics and healthcare providers?">
        <summary class="flex min-h-[64px] items-center gap-4 px-5 py-4">
          <span class="num hidden w-7 shrink-0 text-[15px] sm:block" aria-hidden="true">07</span>
          <span class="min-w-0 flex-1">
            <h3 class="!text-[clamp(18px,17px+.3vw,20.5px)] !leading-[1.3]">Is it suitable for dental clinics and healthcare providers?</h3>
            <span class="mt-1 block text-[13.5px] font-semibold text-muted">Health and legal</span>
          </span>
          <span class="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--va-line-strong)] group-open:border-gold group-open:bg-gold group-open:text-navy"><svg class="icon faq-chevron" aria-hidden="true" focusable="false"><use href="#i-chevron-down"/></svg></span>
        </summary>
        <div class="px-5 pb-6 text-[16px] text-muted sm:pl-[4.25rem]">
          <p data-faq-answer>Yes, for bookings, routing and practical questions such as opening hours, fees and directions. The agent never gives clinical or medical advice. Anything clinical goes to your team, and urgent calls follow the emergency route you set.</p>
          
        </div>
      </details>
      <details class="group rounded-[14px] border border-line bg-paper transition-colors open:border-[var(--va-line-strong)] open:bg-surface open:shadow-[0_18px_40px_-30px_rgb(0_0_0/0.45)]" data-faq-item data-cat="sectors" data-track-name="Is it suitable for law firms?">
        <summary class="flex min-h-[64px] items-center gap-4 px-5 py-4">
          <span class="num hidden w-7 shrink-0 text-[15px] sm:block" aria-hidden="true">08</span>
          <span class="min-w-0 flex-1">
            <h3 class="!text-[clamp(18px,17px+.3vw,20.5px)] !leading-[1.3]">Is it suitable for law firms?</h3>
            <span class="mt-1 block text-[13.5px] font-semibold text-muted">Health and legal</span>
          </span>
          <span class="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--va-line-strong)] group-open:border-gold group-open:bg-gold group-open:text-navy"><svg class="icon faq-chevron" aria-hidden="true" focusable="false"><use href="#i-chevron-down"/></svg></span>
        </summary>
        <div class="px-5 pb-6 text-[16px] text-muted sm:pl-[4.25rem]">
          <p data-faq-answer>Yes, for taking new enquiries, booking consultations and routing existing clients. The agent never gives legal advice and does not comment on the merits of a matter. It collects the details and gets the caller to the right person.</p>
          
        </div>
      </details>
      <details class="group rounded-[14px] border border-line bg-paper transition-colors open:border-[var(--va-line-strong)] open:bg-surface open:shadow-[0_18px_40px_-30px_rgb(0_0_0/0.45)]" data-faq-item data-cat="working" data-track-name="We are not in one of your six cities. Can we still work with you?">
        <summary class="flex min-h-[64px] items-center gap-4 px-5 py-4">
          <span class="num hidden w-7 shrink-0 text-[15px] sm:block" aria-hidden="true">09</span>
          <span class="min-w-0 flex-1">
            <h3 class="!text-[clamp(18px,17px+.3vw,20.5px)] !leading-[1.3]">We are not in one of your six cities. Can we still work with you?</h3>
            <span class="mt-1 block text-[13.5px] font-semibold text-muted">Working with us</span>
          </span>
          <span class="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--va-line-strong)] group-open:border-gold group-open:bg-gold group-open:text-navy"><svg class="icon faq-chevron" aria-hidden="true" focusable="false"><use href="#i-chevron-down"/></svg></span>
        </summary>
        <div class="px-5 pb-6 text-[16px] text-muted sm:pl-[4.25rem]">
          <p data-faq-answer>Yes. We are based in Hullbridge, Essex and work with businesses across the UK remotely. London, Birmingham, Manchester, Leeds, Liverpool and Bristol are where we focus our voice agent work at the moment.</p>
          
        </div>
      </details>
      <details class="group rounded-[14px] border border-line bg-paper transition-colors open:border-[var(--va-line-strong)] open:bg-surface open:shadow-[0_18px_40px_-30px_rgb(0_0_0/0.45)]" data-faq-item data-cat="setup" data-track-name="How long does setup take?">
        <summary class="flex min-h-[64px] items-center gap-4 px-5 py-4">
          <span class="num hidden w-7 shrink-0 text-[15px] sm:block" aria-hidden="true">10</span>
          <span class="min-w-0 flex-1">
            <h3 class="!text-[clamp(18px,17px+.3vw,20.5px)] !leading-[1.3]">How long does setup take?</h3>
            <span class="mt-1 block text-[13.5px] font-semibold text-muted">Setup and systems</span>
          </span>
          <span class="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--va-line-strong)] group-open:border-gold group-open:bg-gold group-open:text-navy"><svg class="icon faq-chevron" aria-hidden="true" focusable="false"><use href="#i-chevron-down"/></svg></span>
        </summary>
        <div class="px-5 pb-6 text-[16px] text-muted sm:pl-[4.25rem]">
          <p data-faq-answer>It depends on how many types of call you have and what the agent needs to connect to. A simple booking agent is quicker than one covering several departments. We give you a realistic timeline after the discovery call, before you commit to anything.</p>
          <p class="mt-3">Starter is live in 3 working days, Growth in 5 to 7, Scale in 12 to 15. The clock starts when we have your content and your diary access.</p>
        </div>
      </details>
      <details class="group rounded-[14px] border border-line bg-paper transition-colors open:border-[var(--va-line-strong)] open:bg-surface open:shadow-[0_18px_40px_-30px_rgb(0_0_0/0.45)]" data-faq-item data-cat="callers" data-track-name="What happens when the agent does not know the answer?">
        <summary class="flex min-h-[64px] items-center gap-4 px-5 py-4">
          <span class="num hidden w-7 shrink-0 text-[15px] sm:block" aria-hidden="true">11</span>
          <span class="min-w-0 flex-1">
            <h3 class="!text-[clamp(18px,17px+.3vw,20.5px)] !leading-[1.3]">What happens when the agent does not know the answer?</h3>
            <span class="mt-1 block text-[13.5px] font-semibold text-muted">Callers and AI</span>
          </span>
          <span class="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--va-line-strong)] group-open:border-gold group-open:bg-gold group-open:text-navy"><svg class="icon faq-chevron" aria-hidden="true" focusable="false"><use href="#i-chevron-down"/></svg></span>
        </summary>
        <div class="px-5 pb-6 text-[16px] text-muted sm:pl-[4.25rem]">
          <p data-faq-answer>It says so. The agent answers only from information you have approved, so when a question falls outside that, it offers to take a message or transfer the call. We review those moments every month and add the answers worth adding.</p>
          
        </div>
      </details>
      <details class="group rounded-[14px] border border-line bg-paper transition-colors open:border-[var(--va-line-strong)] open:bg-surface open:shadow-[0_18px_40px_-30px_rgb(0_0_0/0.45)]" data-faq-item data-cat="working" data-track-name="Is there a minimum contract?">
        <summary class="flex min-h-[64px] items-center gap-4 px-5 py-4">
          <span class="num hidden w-7 shrink-0 text-[15px] sm:block" aria-hidden="true">12</span>
          <span class="min-w-0 flex-1">
            <h3 class="!text-[clamp(18px,17px+.3vw,20.5px)] !leading-[1.3]">Is there a minimum contract?</h3>
            <span class="mt-1 block text-[13.5px] font-semibold text-muted">Working with us</span>
          </span>
          <span class="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--va-line-strong)] group-open:border-gold group-open:bg-gold group-open:text-navy"><svg class="icon faq-chevron" aria-hidden="true" focusable="false"><use href="#i-chevron-down"/></svg></span>
        </summary>
        <div class="px-5 pb-6 text-[16px] text-muted sm:pl-[4.25rem]">
          <p data-faq-answer>We set out the terms in writing before you start, including the notice period, what is included each month and what counts as extra. There are no hidden usage fees. Every invoice shows your included minutes and any overage.</p>
          <p class="mt-3">Billed monthly, 30 days notice.</p>
        </div>
      </details>
      </div>
      <div class="mt-3 rounded-[14px] border border-dashed border-[var(--va-line-strong)] p-6 text-center" data-faq-empty hidden>
        <p class="font-display text-[18px] font-semibold">No questions match that</p>
        <p class="mt-1 text-[16px] text-muted">Try another word, or ring us on <a href="tel:+442034893934" class="font-semibold text-ink underline decoration-gold decoration-2 underline-offset-4 tnum">020 3489 3934</a> and ask a person.</p>
      </div>
    </div>
  </div>
</section>

<section id="related" data-component="RelatedServices">
  <div class="container-omh py-20 lg:py-28" data-related>
    <div class="mx-auto text-center">
      <p class="eyebrow justify-center"><span class="eyebrow-mark" aria-hidden="true"><i></i><i></i><i></i></span>Related services</p>
      <h2>What makes the phone ring <span class="hl">in the first place</span></h2>
      <p class="mt-5 text-muted">Ads, local search and your website bring the calls. The voice agent makes sure every one of them is answered. We run all four, so the numbers join up in one report.</p>
    </div>

    <ul class="mt-12 grid gap-5 md:grid-cols-3">
      <li>
        <a href="/google-adwords-ppc" class="group flex h-full flex-col rounded-[16px] border border-line bg-surface p-3 transition-colors hover:border-gold focus-visible:border-gold" data-related-card="ads" data-track="related_service_click" data-track-name="Google Ads">
          <div class="grid place-items-center rounded-[12px] bg-sand p-5 md:min-h-[262px] lg:min-h-[214px] [&>*]:w-full" aria-hidden="true"><div class="rounded-[10px] bg-surface p-3.5 text-left shadow-[0_10px_24px_-18px_rgb(0_0_0/0.5)]">
          <p class="text-[12px] font-semibold">Sponsored</p>
          <p class="mt-0.5 text-[14.5px] font-semibold leading-snug text-[#1a4fb5] dark:text-[#9bbcff]">Emergency Plumber in Bristol, Call Now</p>
          <p class="mt-0.5 text-[12.5px] leading-snug text-muted">Burst pipes, leaks and boiler faults. Same-day call-outs.</p>
          <span class="mt-2 inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-[12.5px] font-semibold"><svg class="icon !h-3.5 !w-3.5 text-hl" aria-hidden="true" focusable="false"><use href="#i-phone"/></svg>Call <span class="tnum">0117 496 0135</span></span>
        </div></div>
          <div class="flex flex-1 flex-col px-3 pb-3 pt-5">
            <h3 class="!text-[24px] group-hover:text-hl">Google Ads</h3>
            <p class="mt-2 text-[16px] leading-[1.5] text-muted">Paid search that puts your number in front of people ready to buy.</p>
            <span class="mt-auto inline-flex items-center gap-2 pt-5 font-display text-[16.5px] font-semibold">Explore Google Ads<span class="grid h-8 w-8 place-items-center rounded-full border border-[var(--va-line-strong)] transition-colors group-hover:border-gold group-hover:bg-gold group-hover:text-navy"><svg class="icon !h-4 !w-4" aria-hidden="true" focusable="false"><use href="#i-arrow-up-right"/></svg></span></span>
          </div>
        </a>
      </li>
      <li>
        <a href="/local-seo" class="group flex h-full flex-col rounded-[16px] border border-line bg-surface p-3 transition-colors hover:border-gold focus-visible:border-gold" data-related-card="seo" data-track="related_service_click" data-track-name="Local SEO">
          <div class="grid place-items-center rounded-[12px] bg-sand p-5 md:min-h-[262px] lg:min-h-[214px] [&>*]:w-full" aria-hidden="true"><div class="rounded-[10px] bg-surface p-3.5 text-left shadow-[0_10px_24px_-18px_rgb(0_0_0/0.5)]">
          <div class="flex h-14 items-center justify-center rounded-[8px] bg-[var(--va-sea)]"><svg class="icon !h-7 !w-7 text-hl" aria-hidden="true" focusable="false"><use href="#i-map-pin"/></svg></div>
          <p class="mt-2.5 text-[14.5px] font-semibold leading-snug">Severn Plumbing</p>
          <p class="text-[12.5px] text-muted">Plumber in Bristol. <span class="font-semibold text-ok">Open 24 hours</span></p>
          <span class="mt-2 inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-[12.5px] font-semibold"><svg class="icon !h-3.5 !w-3.5 text-hl" aria-hidden="true" focusable="false"><use href="#i-phone"/></svg>Call</span>
        </div></div>
          <div class="flex flex-1 flex-col px-3 pb-3 pt-5">
            <h3 class="!text-[24px] group-hover:text-hl">Local SEO</h3>
            <p class="mt-2 text-[16px] leading-[1.5] text-muted">Show up in the map results when people nearby search for what you do.</p>
            <span class="mt-auto inline-flex items-center gap-2 pt-5 font-display text-[16.5px] font-semibold">Explore Local SEO<span class="grid h-8 w-8 place-items-center rounded-full border border-[var(--va-line-strong)] transition-colors group-hover:border-gold group-hover:bg-gold group-hover:text-navy"><svg class="icon !h-4 !w-4" aria-hidden="true" focusable="false"><use href="#i-arrow-up-right"/></svg></span></span>
          </div>
        </a>
      </li>
      <li>
        <a href="/website-designs" class="group flex h-full flex-col rounded-[16px] border border-line bg-surface p-3 transition-colors hover:border-gold focus-visible:border-gold" data-related-card="web" data-track="related_service_click" data-track-name="Website Design">
          <div class="grid place-items-center rounded-[12px] bg-sand p-5 md:min-h-[262px] lg:min-h-[214px] [&>*]:w-full" aria-hidden="true"><div class="overflow-hidden rounded-[10px] bg-surface text-left shadow-[0_10px_24px_-18px_rgb(0_0_0/0.5)]">
          <div class="flex gap-1 border-b border-line px-3 py-2"><i class="block h-2 w-2 rounded-full bg-ink/20"></i><i class="block h-2 w-2 rounded-full bg-ink/20"></i><i class="block h-2 w-2 rounded-full bg-ink/20"></i></div>
          <div class="p-3.5">
            <p class="text-[14.5px] font-semibold leading-snug">Leak? Call us now, day or night.</p>
            <span class="mt-1.5 block h-1.5 w-4/5 rounded-full bg-ink/10"></span>
            <span class="mt-1.5 block h-1.5 w-3/5 rounded-full bg-ink/10"></span>
            <span class="mt-3 flex items-center justify-center gap-1.5 rounded-[8px] bg-gold py-1.5 text-[12.5px] font-semibold text-navy"><svg class="icon !h-3.5 !w-3.5" aria-hidden="true" focusable="false"><use href="#i-phone"/></svg>Tap to call</span>
          </div>
        </div></div>
          <div class="flex flex-1 flex-col px-3 pb-3 pt-5">
            <h3 class="!text-[24px] group-hover:text-hl">Website Design</h3>
            <p class="mt-2 text-[16px] leading-[1.5] text-muted">A site that turns visitors into calls and bookings, with your number where people expect it.</p>
            <span class="mt-auto inline-flex items-center gap-2 pt-5 font-display text-[16.5px] font-semibold">Explore Website Design<span class="grid h-8 w-8 place-items-center rounded-full border border-[var(--va-line-strong)] transition-colors group-hover:border-gold group-hover:bg-gold group-hover:text-navy"><svg class="icon !h-4 !w-4" aria-hidden="true" focusable="false"><use href="#i-arrow-up-right"/></svg></span></span>
          </div>
        </a>
      </li>
    </ul>

        <svg viewBox="0 0 1200 110" preserveAspectRatio="none" class="hidden h-[90px] w-full md:block" aria-hidden="true" data-related-lines>
      <path class="rel-line" data-related-line="ads" d="M200 0 C200 60 600 40 600 104"/>
      <path class="rel-line" data-related-line="seo" d="M600 0 V104"/>
      <path class="rel-line" data-related-line="web" d="M1000 0 C1000 60 600 40 600 104"/>
    </svg>
    <div class="flex justify-center py-3 text-hl md:hidden" aria-hidden="true"><svg class="icon !h-7 !w-7" aria-hidden="true" focusable="false"><use href="#i-chevron-down"/></svg></div>

    <div class="on-band relative mx-auto flex max-w-[860px] flex-col items-center gap-5 rounded-[18px] bg-band p-6 text-center text-band-ink sm:flex-row sm:p-7 sm:text-left">
      <span class="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-gold text-navy" aria-hidden="true"><svg class="icon !h-7 !w-7" aria-hidden="true" focusable="false"><use href="#i-phone-incoming"/></svg></span>
      <div class="flex-1">
        <p class="text-[14px] font-semibold text-band-hl">You are here</p>
        <p class="font-display text-[22px] font-semibold leading-tight">AI voice agent: every one of those calls answered</p>
        <p class="mt-1 text-[16px] text-band-muted">Calls, bookings and transfers reported beside your ads, search and website results.</p>
      </div>
      <a href="/contact?service=ai-voice-agents&amp;bundle=1" class="btn btn-primary shrink-0" data-track="related_bundle">Ask about a joined-up plan</a>
    </div>
  </div>
</section>

<div data-component="MobileStickyBar" data-sticky-bar class="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper px-4 pb-[max(.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-12px_30px_-18px_rgb(0_0_0/0.35)] md:hidden" inert>
  <div class="flex items-center gap-3">
    <a href="/contact?service=ai-voice-agents" class="btn btn-primary flex-1" data-track="sticky_book_demo">Book a Demo</a>
    <a href="tel:+442034893934" class="btn btn-secondary !px-0 w-[52px]" aria-label="Call OMH on 020 3489 3934" data-track="sticky_phone_click"><svg class="icon " aria-hidden="true" focusable="false"><use href="#i-phone"/></svg></a>
  </div>
</div>
`;
