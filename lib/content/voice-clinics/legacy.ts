// Body of /ai-voice-agents/healthcare, part 2 (21 Oct 2026): six sample calls as a grid (22 Oct 2026),
// ROI calculator, FAQ and sticky bar, written for private clinics. Same structure, classes and data-* hooks as
// lib/content/ai-voice-agents-legacy.ts (via lib/content/voice-estate/legacy.ts).
import { roiCalculator } from "@/lib/content/roi-calculator";
import { sampleCard } from "@/lib/content/sample-calls";
import { clinicFaqs as voiceFaqs } from "@/lib/content/voice-clinics/markup";


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

export const clinicLegacyMarkup = String.raw`
<section id="feedback" data-component="ClientFeedback" class="bg-surface">
  <div class="container-omh py-14 lg:py-20">
    <div>
      <div>
        <p class="eyebrow"><span class="eyebrow-mark" aria-hidden="true"><i></i><i></i><i></i></span>Sample calls</p>
        <h2>Clinic sample calls, <span class="hl">by call type</span></h2>
      </div>
      <p class="mt-5 text-muted">Hear how our AI voice agent handles six everyday clinic calls, from booking a first visit to passing a worried patient to the clinical team. These are sample recordings with made-up clinics and patients. We'll add client results here once we've checked them with each client.</p>
    </div>

    <dl class="mt-12 grid border-y border-[var(--va-line-strong)] sm:grid-cols-3">
      <div class="py-5 sm:pr-6"><dd class="font-display text-[30px] font-semibold leading-none tnum">8</dd><dt class="mt-1.5 text-[16px] text-muted">kinds of clinic call it's scripted for</dt></div>
      <div class="border-t border-line py-5 sm:border-l sm:border-t-0 sm:px-6"><dd class="font-display text-[30px] font-semibold leading-none">0</dd><dt class="mt-1.5 text-[16px] text-muted">clinical advice given, on any call</dt></div>
      <div class="border-t border-line py-5 sm:border-l sm:border-t-0 sm:pl-6"><dd class="font-display text-[30px] font-semibold leading-none tnum">10</dd><dt class="mt-1.5 text-[16px] text-muted">UK cities with local numbers</dt></div>
    </dl>

    <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
${[
  sampleCard("clinicBooking", { title: "Appointment Booking", caption: "Our AI voice agent booking a new patient's first physiotherapy visit, offering two afternoon slots and texting a confirmation.", offset: 0 }),
  sampleCard("clinicReschedule", { title: "Appointment Cancellation & Rescheduling", caption: "Our AI voice agent checking a second detail to find the right booking, then moving a physio appointment to Friday.", offset: 4 }),
  sampleCard("clinicFaqs", { title: "General Information & FAQs", caption: "Our AI voice agent answering questions on Saturday hours and services, and passing a referral question to reception.", offset: 8 }),
  sampleCard("clinicNewPatient", { title: "New Patient Registration & Enquiry", caption: "Our AI voice agent explaining how registration works, taking the caller's details and checking appointment times.", offset: 12 }),
  sampleCard("clinicReminder", { title: "Appointment Follow-up & Reminders", caption: "Our AI voice agent calling a patient about Thursday's physio appointment and recording that they'll attend.", offset: 16 }),
  sampleCard("clinicHandover", { title: "Patient Enquiry, Triage Routing & Human Handover", caption: "Our AI voice agent declining to assess symptoms, logging a callback for the clinical team and pointing emergencies to 999.", offset: 20 }),
].join("\n")}
    </div>
  </div>
</section>



${roiCalculator("clinics")}


<section id="faq" data-component="FAQ" class="bg-surface">
  <div class="container-omh grid gap-10 py-20 lg:grid-cols-[minmax(0,.72fr)_minmax(0,1.28fr)] lg:grid-rows-[auto_1fr] lg:gap-x-14 lg:gap-y-8 lg:py-28">
    <div>
      <p class="eyebrow"><span class="eyebrow-mark" aria-hidden="true"><i></i><i></i><i></i></span>Questions</p>
      <h2>What private clinics<br class="max-sm:hidden"> <span class="hl">ask us first</span></h2>
      <p class="mt-5 text-muted">Straight answers on clinical safety, urgent calls, self-pay and insured patients, clinic software and patient data. See how our <a href="/ai-voice-agents" class="text-ink underline decoration-gold decoration-2 underline-offset-4 hover:text-hl">AI voice agent</a> works for other UK businesses.</p>
    </div>

    <div class="order-last lg:order-none lg:col-start-1 lg:row-start-2 lg:sticky lg:top-28 lg:self-start">
      <div class="rounded-[16px] bg-band p-6 text-band-ink on-band">
        <p class="font-display text-body font-semibold">Ask us about your clinic</p>
        <p class="mt-1.5 text-[16px] leading-snug text-band-muted">Talk to a person on our UK team about your new patient, urgent and follow-up calls. No sales script.</p>
        <p class="mt-4 text-[15px] font-semibold uppercase tracking-[0.12em] text-band-muted">On the demo, try</p>
        <ol class="mt-2 space-y-1.5 text-[16px] leading-snug">
          <li class="flex gap-2.5"><span class="font-display font-semibold text-[#7d5c33]">1</span><span>Book a physio assessment for next week as a new patient</span></li>
          <li class="flex gap-2.5"><span class="font-display font-semibold text-[#7d5c33]">2</span><span>Say you're worried after a procedure and hear how it routes you</span></li>
          <li class="flex gap-2.5"><span class="font-display font-semibold text-[#7d5c33]">3</span><span>Ask something it can't know, and hear what it does</span></li>
        </ol>
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
        <input id="faq-search" type="search" placeholder="Search, for example insurers, urgent or GDPR" autocomplete="off" class="field !min-h-[54px] !rounded-[12px] !pl-12" data-faq-search data-track="faq_search">
      </div>
      <div role="group" aria-label="Filter questions by topic" class="mt-4 flex flex-wrap gap-2" data-faq-filters>
        <button type="button" class="min-h-[44px] rounded-full border border-[var(--va-line-strong)] px-4 text-[15px] font-semibold aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-paper" data-faq-filter="all" aria-pressed="true" data-track="faq_filter" data-track-name="All questions">All questions <span class="ml-1 opacity-70 tnum" data-faq-count="all"></span></button>
        <button type="button" class="min-h-[44px] rounded-full border border-[var(--va-line-strong)] px-4 text-[15px] font-semibold aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-paper" data-faq-filter="patients" aria-pressed="false" data-track="faq_filter" data-track-name="Patients and AI">Patients and AI <span class="ml-1 opacity-70 tnum" data-faq-count="patients"></span></button>
        <button type="button" class="min-h-[44px] rounded-full border border-[var(--va-line-strong)] px-4 text-[15px] font-semibold aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-paper" data-faq-filter="clinical" aria-pressed="false" data-track="faq_filter" data-track-name="Clinical safety">Clinical safety <span class="ml-1 opacity-70 tnum" data-faq-count="clinical"></span></button>
        <button type="button" class="min-h-[44px] rounded-full border border-[var(--va-line-strong)] px-4 text-[15px] font-semibold aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-paper" data-faq-filter="setup" aria-pressed="false" data-track="faq_filter" data-track-name="Setup and systems">Setup and systems <span class="ml-1 opacity-70 tnum" data-faq-count="setup"></span></button>
        <button type="button" class="min-h-[44px] rounded-full border border-[var(--va-line-strong)] px-4 text-[15px] font-semibold aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-paper" data-faq-filter="data" aria-pressed="false" data-track="faq_filter" data-track-name="Data and rules">Data and rules <span class="ml-1 opacity-70 tnum" data-faq-count="data"></span></button>
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
