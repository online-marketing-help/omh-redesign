// Body of /ai-voice-agents/salons, part 2: sample calls (client recordings, 3 Nov 2026), ROI calculator, FAQ and
// sticky bar, written for salons. Same structure, classes and data-* hooks as lib/content/ai-voice-agents-legacy.ts,
// as on the other industry pages.
import { roiCalculator } from "@/lib/content/roi-calculator";
import { callTypeCards } from "@/lib/content/sample-calls";
import { salonsFaqs as voiceFaqs } from "@/lib/content/voice-salons/markup";


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

export const salonsLegacyMarkup = String.raw`
<section id="feedback" data-component="ClientFeedback" class="bg-surface">
  <div class="container-omh py-14 lg:py-20">
    <div>
      <div>
        <p class="eyebrow"><span class="eyebrow-mark" aria-hidden="true"><i></i><i></i><i></i></span>Sample calls</p>
        <h2>Salon sample calls, <span class="hl">by call type</span></h2>
      </div>
      <p class="mt-5 text-muted">Hear how our AI voice agent handles six everyday salon calls, from a first booking to a complaint passed to the team. These are sample recordings with made-up salons and clients. We'll add client results here once we've checked them with each client.</p>
    </div>


    <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
${callTypeCards("AI Voice Agent for Salons & Beauty Businesses", "Salon", [
  [1, "Appointment Booking", 87, "scissors", "Our AI voice agent booking a first haircut and blow-dry for Friday afternoon and sending a confirmation."],
  [2, "Appointment Cancellation & Rescheduling", 73, "replay", "Our AI voice agent finding a facial booked for tomorrow and offering Saturday times instead."],
  [3, "Service Enquiry & Pricing", 113, "tag", "Our AI voice agent giving the starting price for balayage and offering a free colour consultation."],
  [4, "Last-Minute Appointment Availability", 80, "clock", "Our AI voice agent looking for a same-day gel manicure slot before the caller's party."],
  [5, "Appointment Reminder & Confirmation", 61, "calendar", "Our AI voice agent calling a client about tomorrow's lash appointment and recording that they'll attend."],
  [6, "Customer Complaint & Human Staff Handover", 107, "transfer", "Our AI voice agent taking a complaint about a colour result and passing it to the salon team."],
])}
    </div>
  </div>
</section>



${roiCalculator("any-business")}


<section id="faq" data-component="FAQ" class="bg-surface">
  <div class="container-omh grid gap-10 py-20 lg:grid-cols-[minmax(0,.72fr)_minmax(0,1.28fr)] lg:grid-rows-[auto_1fr] lg:gap-x-14 lg:gap-y-8 lg:py-28">
    <div>
      <p class="eyebrow"><span class="eyebrow-mark" aria-hidden="true"><i></i><i></i><i></i></span>Questions</p>
      <h2>What salon owners<br class="max-sm:hidden"> <span class="hl">ask us first</span></h2>
      <p class="mt-5 text-muted">Straight answers on bookings, cancellations, patch tests, prices, booking software and client data. See how our <a href="/ai-voice-agents" class="text-ink underline decoration-gold decoration-2 underline-offset-4 hover:text-hl">AI voice agent</a> works for other UK businesses.</p>
    </div>

    <div class="order-last lg:order-none lg:col-start-1 lg:row-start-2 lg:sticky lg:top-28 lg:self-start">
      <div class="rounded-[16px] bg-band p-6 text-band-ink on-band">
        <p class="font-display text-body font-semibold">Ask us about your salon</p>
        <p class="mt-1.5 text-[16px] leading-snug text-band-muted">Talk to a person on our UK team about your booking and cancellation calls. No sales script.</p>
        <p class="mt-4 text-[15px] font-semibold uppercase tracking-[0.12em] text-band-muted">On the demo, try</p>
        <ol class="mt-2 space-y-1.5 text-[16px] leading-snug">
          <li class="flex gap-2.5"><span class="font-display font-semibold text-[#7d5c33]">1</span><span>Book a cut and colour as a new client</span></li>
          <li class="flex gap-2.5"><span class="font-display font-semibold text-[#7d5c33]">2</span><span>Cancel tomorrow's appointment and hear what it offers</span></li>
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
        <input id="faq-search" type="search" placeholder="Search, for example patch tests, prices or GDPR" autocomplete="off" class="field !min-h-[54px] !rounded-[12px] !pl-12" data-faq-search data-track="faq_search">
      </div>
      <div role="group" aria-label="Filter questions by topic" class="mt-4 flex flex-wrap gap-2" data-faq-filters>
        <button type="button" class="min-h-[44px] rounded-full border border-[var(--va-line-strong)] px-4 text-[15px] font-semibold aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-paper" data-faq-filter="all" aria-pressed="true" data-track="faq_filter" data-track-name="All questions">All questions <span class="ml-1 opacity-70 tnum" data-faq-count="all"></span></button>
        <button type="button" class="min-h-[44px] rounded-full border border-[var(--va-line-strong)] px-4 text-[15px] font-semibold aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-paper" data-faq-filter="callers" aria-pressed="false" data-track="faq_filter" data-track-name="Callers and AI">Callers and AI <span class="ml-1 opacity-70 tnum" data-faq-count="callers"></span></button>
        <button type="button" class="min-h-[44px] rounded-full border border-[var(--va-line-strong)] px-4 text-[15px] font-semibold aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-paper" data-faq-filter="bookings" aria-pressed="false" data-track="faq_filter" data-track-name="Bookings">Bookings <span class="ml-1 opacity-70 tnum" data-faq-count="bookings"></span></button>
        <button type="button" class="min-h-[44px] rounded-full border border-[var(--va-line-strong)] px-4 text-[15px] font-semibold aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-paper" data-faq-filter="systems" aria-pressed="false" data-track="faq_filter" data-track-name="Systems and data">Systems and data <span class="ml-1 opacity-70 tnum" data-faq-count="systems"></span></button>
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
