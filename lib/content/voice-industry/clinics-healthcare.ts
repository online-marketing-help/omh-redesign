// Clinics and private healthcare. Built on the clinic page's structure, which
// is the agreed layout for an industry page, with this trade's own content:
// its own statistics, its own clinics and fees, its own triage rules and its
// own boundaries. A clinic is not a private clinic, so nothing here is clinic
// copy with the words swapped.
//
// Sources for the figures are named in the markup where they appear.
// Registered in ./index.ts.
import { pricingSection } from "@/lib/content/voice-pricing";

import { leadDemo } from "@/lib/content/lead-demo";
import { roiCalculator } from "@/lib/content/roi-calculator";

export const meta = {
  "title": "AI Receptionist for Clinics | UK Private Healthcare | OMH",
  "description": "An AI voice agent for UK private clinics. Answers patient calls 24/7, separates self-pay from insured, books the right appointment type and fills cancellations. Never gives clinical advice. Built and managed by OMH.",
  "ogTitle": "AI Receptionist for Private Clinics | OMH",
  "ogDescription": "Every patient call answered, even over the lunch hour. Built, tested and managed by a UK team.",
  "canonical": "/ai-voice-agents/clinics-healthcare"
};

export const schema = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "AI Receptionist for Private Clinics",
    "serviceType": "AI voice agent and AI receptionist for private clinics and healthcare",
    "description": "Managed AI voice agents that answer patient calls, separate self-pay from insured, book the right appointment type and fill cancellations for UK private clinics.",
    "url": "https://onlinemarketinghelp.co.uk/ai-voice-agents/clinics-healthcare",
    "audience": {
      "@type": "BusinessAudience",
      "audienceType": "Private clinics and healthcare providers"
    },
    "provider": {
      "@type": "Organization",
      "name": "Online Marketing Help",
      "url": "https://onlinemarketinghelp.co.uk",
      "telephone": "+442034893934",
      "email": "support@onlinemarketinghelp.co.uk",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "The Hut, Central Ave",
        "addressLocality": "Hullbridge",
        "addressRegion": "Essex",
        "postalCode": "SS5 6AU",
        "addressCountry": "GB"
      }
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "London"
      },
      {
        "@type": "City",
        "name": "Birmingham"
      },
      {
        "@type": "City",
        "name": "Manchester"
      },
      {
        "@type": "City",
        "name": "Leeds"
      },
      {
        "@type": "City",
        "name": "Liverpool"
      },
      {
        "@type": "City",
        "name": "Bristol"
      },
      {
        "@type": "City",
        "name": "Sheffield"
      },
      {
        "@type": "City",
        "name": "Nottingham"
      },
      {
        "@type": "City",
        "name": "Leicester"
      },
      {
        "@type": "City",
        "name": "Newcastle"
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Will patients know they are talking to an AI?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Every agent says it is an AI assistant at the start of the call. Patients deserve to know, and anyone who would rather speak to a person can ask."
        }
      },
      {
        "@type": "Question",
        "name": "Does it give clinical or medical advice?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. The agent never assesses symptoms, suggests treatment or gives medical advice. It books, answers practical questions from information you approve and passes anything clinical to your team."
        }
      },
      {
        "@type": "Question",
        "name": "What happens with clinic emergencies out of hours?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It follows the route you set. That could be your on-call dentist, your emergency line, or giving NHS 111 details. Every urgent call is flagged at the top of the morning summary."
        }
      },
      {
        "@type": "Question",
        "name": "Does it work for self-paying and insured patients?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. It follows your rules for each: insurer authorisation and what it needs, self-pay fees from your schedule, and any membership or scheme details you approve."
        }
      },
      {
        "@type": "Question",
        "name": "Does it work with our clinic management software?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It works with most diaries and clinic systems. We check yours on the first call and tell you plainly what connects directly and what needs a workaround."
        }
      },
      {
        "@type": "Question",
        "name": "How does it handle elderly or anxious patients?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It speaks clearly, takes its time and repeats details when asked. Anyone who wants a person is put through in your opening hours, or a message is taken for a call back."
        }
      },
      {
        "@type": "Question",
        "name": "Can it fill last-minute cancellations?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. When a patient cancels, it offers to rebook them, then offers the free slot to waitlist patients who agreed to short-notice offers."
        }
      },
      {
        "@type": "Question",
        "name": "Is patient data kept safe?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You remain the data controller and OMH acts as your processor under a written data processing agreement, in line with UK GDPR. We agree what is stored, where and for how long before go-live."
        }
      },
      {
        "@type": "Question",
        "name": "Are calls recorded?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Only if you want them to be. Patients are told at the start of the call, and recordings are deleted on the schedule you set."
        }
      },
      {
        "@type": "Question",
        "name": "Will it replace our receptionists?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. It takes the overflow and the routine calls, so your team can look after the patients in front of them. You choose when it answers: only when the lines are busy, only out of hours, or first on every call. Anything clinical, sensitive or complicated still goes to your team."
        }
      },
      {
        "@type": "Question",
        "name": "Is there a minimum contract?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We set out the terms in writing before you start, including notice period and what is included each month. Every invoice shows minutes used and any extra. Billed monthly, 30 days notice."
        }
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://onlinemarketinghelp.co.uk/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "AI Voice Agents",
        "item": "https://onlinemarketinghelp.co.uk/ai-voice-agents"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Clinics and Healthcare",
        "item": "https://onlinemarketinghelp.co.uk/ai-voice-agents/clinics-healthcare"
      }
    ]
  }
];

export const markup = String.raw`
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
  <symbol id="i-stethoscope" viewBox="0 0 24 24"><path d="M12 5.5c1.5-1.5 4-2.5 6-1 2.5 1.8 2 5 1 7-1 2-1.5 4.5-2 8-.3 1.6-2 1.7-2.5.2L13.5 15c-.5-1.5-2.5-1.5-3 0l-1 4.7c-.5 1.5-2.2 1.4-2.5-.2-.5-3.5-1-6-2-8-1-2-1.5-5.2 1-7 2-1.5 4.5-.5 6 1z"/></symbol>
  <symbol id="i-stethoscope" viewBox="0 0 24 24"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6 6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6 6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></symbol>
  <symbol id="i-wrench" viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></symbol>
  <symbol id="i-flame" viewBox="0 0 24 24"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></symbol>
  <symbol id="i-hard-hat" viewBox="0 0 24 24"><path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z"/><path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5"/><path d="M4 15v-3a6 6 0 0 1 6-6"/><path d="M14 6a6 6 0 0 1 6 6v3"/></symbol>
  <symbol id="i-scale" viewBox="0 0 24 24"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></symbol>
  <symbol id="i-car" viewBox="0 0 24 24"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></symbol>
  <symbol id="i-plus-star" viewBox="0 0 24 24"><path d="M12 2 C12.6 8 16 11.4 22 12 C16 12.6 12.6 16 12 22 C11.4 16 8 12.6 2 12 C8 11.4 11.4 8 12 2 Z" fill="currentColor" stroke="none"/></symbol>
  <symbol id="i-mail" viewBox="0 0 24 24"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></symbol>
</svg>


<!-- ===== COMPONENT: ClinicHero ===== -->
<section id="hero" data-component="ClinicHero" class="relative overflow-hidden">
  <div class="pointer-events-none absolute -right-48 -top-40 h-[620px] w-[620px] rounded-full bg-gold/15 blur-3xl" aria-hidden="true"></div>
  <div class="container-omh relative pb-14 pt-6 lg:pb-20">
    <nav aria-label="Breadcrumb" class="text-[14.5px] text-muted">
      <ol class="flex flex-wrap items-center gap-1.5">
        <li><a href="/" class="inline-flex min-h-[44px] items-center hover:text-ink" data-track="breadcrumb_click" data-track-name="Home">Home</a></li>
        <li aria-hidden="true">/</li>
        <li><a href="/ai-voice-agents" class="inline-flex min-h-[44px] items-center hover:text-ink" data-track="breadcrumb_click" data-track-name="AI Voice Agents">AI Voice Agents</a></li>
        <li aria-hidden="true">/</li>
        <li aria-current="page" class="font-semibold text-ink">Clinics &amp; Healthcare</li>
      </ol>
    </nav>
    <div class="mt-6 grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,.95fr)] lg:gap-14">
      <div>
        <p class="eyebrow"><span class="eyebrow-mark" aria-hidden="true"><i></i><i></i><i></i></span>AI receptionist for UK private clinics</p>
        <h1>Every patient call answered, <span class="hl">even when reception is full</span></h1>
        <p class="mt-6 text-body text-muted">Your AI voice agent books appointments, fills cancellations and puts urgent calls through, day and night. Built, tested and managed for your clinic by OMH.</p>
        <div class="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="#book-demo" class="btn btn-primary" data-track="clinic_hero_book_demo">Book a free clinic demo</a>
          <a href="#hear" class="btn btn-secondary" data-track="clinic_hero_hear"><svg class="icon" aria-hidden="true" focusable="false"><use href="#i-play"/></svg>Hear a clinic call</a>
        </div>
        <ul class="mt-7 flex flex-wrap gap-2" aria-label="How it works for clinics">
          <li class="chip !text-[14px]"><svg class="icon !h-4 !w-4 text-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg>Says it is an AI on every call</li><li class="chip !text-[14px]"><svg class="icon !h-4 !w-4 text-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg>Never gives clinical advice</li><li class="chip !text-[14px]"><svg class="icon !h-4 !w-4 text-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg>Self-pay and insured</li><li class="chip !text-[14px]"><svg class="icon !h-4 !w-4 text-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg>UK GDPR</li>
        </ul>
      </div>

      <figure class="relative" data-fd>
        <div class="rounded-[22px] border border-line bg-surface shadow-[0_50px_90px_-55px_rgb(0_0_0/0.6)]">
          <div class="flex items-center justify-between border-b border-line px-5 py-3">
            <span class="flex gap-1.5" aria-hidden="true"><i class="block h-2.5 w-2.5 rounded-full bg-[#e6a29a]"></i><i class="block h-2.5 w-2.5 rounded-full bg-[#ecc77a]"></i><i class="block h-2.5 w-2.5 rounded-full bg-[#9fd1b3]"></i></span>
            <span class="flex items-center gap-2 text-[13px] font-semibold text-muted"><span class="fd-live" aria-hidden="true"></span>Live front desk</span>
          </div>
          <div class="grid gap-4 p-5 sm:grid-cols-[minmax(0,1fr)_150px]">
            <div class="rounded-[16px] border border-line bg-paper p-4">
              <p class="flex items-center justify-between gap-3 text-[13px] font-semibold text-muted"><span class="flex items-center gap-2"><svg class="icon text-hl" aria-hidden="true" focusable="false"><use href="#i-phone-incoming"/></svg>New patient enquiry</span><span class="tnum">07:52</span></p>
              <p class="mt-2 font-display text-[18px] font-semibold leading-snug">Shoulder pain, wants to be seen this week</p>
              <p class="mt-1 text-[14px] text-muted tnum">0161 496 0123 · Albion Square Clinic</p>
              <div class="mt-3 rounded-[12px] bg-sand p-3">
                <p class="text-[12.5px] font-semibold uppercase tracking-wide text-hl">AI summary</p>
                <p class="mt-1 text-[14.5px] leading-snug">New private patient. No pain, wants an appointment before Friday. Prefers mornings.</p>
              </div>
              <dl class="mt-3 grid grid-cols-3 gap-2 text-[13px]">
                <div class="rounded-[10px] border border-line bg-surface px-2.5 py-2"><dt class="text-muted">Intent</dt><dd class="font-semibold">Booking</dd></div>
                <div class="rounded-[10px] border border-line bg-surface px-2.5 py-2"><dt class="text-muted">Priority</dt><dd class="font-semibold">This week</dd></div>
                <div class="rounded-[10px] border border-line bg-surface px-2.5 py-2"><dt class="text-muted">Outcome</dt><dd class="font-semibold text-ok">Thu 9:10</dd></div>
              </dl>
            </div>
            <div class="grid grid-cols-3 gap-2 sm:grid-cols-1">
              <div class="rounded-[14px] border border-line bg-paper p-3"><p class="text-[12.5px] text-muted">Today</p><p class="font-display text-[22px] font-semibold leading-none tnum">3</p><p class="text-[12.5px] text-muted">gaps left</p></div>
              <div class="rounded-[14px] border border-line bg-paper p-3"><p class="text-[12.5px] text-muted">Overnight</p><p class="font-display text-[22px] font-semibold leading-none tnum">9</p><p class="text-[12.5px] text-muted">calls handled</p></div>
              <div class="rounded-[14px] border border-line bg-paper p-3"><p class="text-[12.5px] text-muted">Urgent</p><p class="font-display text-[22px] font-semibold leading-none tnum">1</p><p class="text-[12.5px] text-muted">put through</p></div>
            </div>
          </div>
          <ol class="on-band grid grid-cols-5 gap-1 rounded-b-[22px] bg-band px-3 py-4 text-band-ink" aria-label="What happens to the call" data-fd-steps>
            <li class="fd-step flex flex-col items-center gap-1.5 text-center" data-fd-step="0"><span class="fd-dot grid h-9 w-9 place-items-center rounded-full"><svg class="icon !h-[18px] !w-[18px]" aria-hidden="true" focusable="false"><use href="#i-phone-incoming"/></svg></span><span class="text-[11.5px] font-semibold leading-tight sm:text-[12.5px]">Call received</span></li><li class="fd-step flex flex-col items-center gap-1.5 text-center" data-fd-step="1"><span class="fd-dot grid h-9 w-9 place-items-center rounded-full"><svg class="icon !h-[18px] !w-[18px]" aria-hidden="true" focusable="false"><use href="#i-message"/></svg></span><span class="text-[11.5px] font-semibold leading-tight sm:text-[12.5px]">Agent answering</span></li><li class="fd-step flex flex-col items-center gap-1.5 text-center" data-fd-step="2"><span class="fd-dot grid h-9 w-9 place-items-center rounded-full"><svg class="icon !h-[18px] !w-[18px]" aria-hidden="true" focusable="false"><use href="#i-calendar"/></svg></span><span class="text-[11.5px] font-semibold leading-tight sm:text-[12.5px]">Booked</span></li><li class="fd-step flex flex-col items-center gap-1.5 text-center" data-fd-step="3"><span class="fd-dot grid h-9 w-9 place-items-center rounded-full"><svg class="icon !h-[18px] !w-[18px]" aria-hidden="true" focusable="false"><use href="#i-check"/></svg></span><span class="text-[11.5px] font-semibold leading-tight sm:text-[12.5px]">Added to diary</span></li><li class="fd-step flex flex-col items-center gap-1.5 text-center" data-fd-step="4"><span class="fd-dot grid h-9 w-9 place-items-center rounded-full"><svg class="icon !h-[18px] !w-[18px]" aria-hidden="true" focusable="false"><use href="#i-mail"/></svg></span><span class="text-[11.5px] font-semibold leading-tight sm:text-[12.5px]">Summary sent</span></li>
          </ol>
        </div>
        <figcaption class="mt-3 text-center text-[13.5px] text-muted">Illustrative example. The clinic and patient are fictional.</figcaption>
      </figure>
    </div>

    <dl class="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-[16px] border border-line bg-line lg:grid-cols-4">
      <div class="bg-surface px-5 py-5"><dt class="sr-only">answering, bank holidays too</dt><dd><span class="block font-display text-[30px] font-semibold leading-none tracking-tight tnum">24/7</span><span class="mt-1.5 block text-[15px] text-muted">answering, bank holidays too</span></dd></div><div class="bg-surface px-5 py-5"><dt class="sr-only">picked up, every call</dt><dd><span class="block font-display text-[30px] font-semibold leading-none tracking-tight tnum">1st ring</span><span class="mt-1.5 block text-[15px] text-muted">picked up, every call</span></dd></div><div class="bg-surface px-5 py-5"><dt class="sr-only">clinical advice given</dt><dd><span class="block font-display text-[30px] font-semibold leading-none tracking-tight tnum">0</span><span class="mt-1.5 block text-[15px] text-muted">clinical advice given</span></dd></div><div class="bg-surface px-5 py-5"><dt class="sr-only">UK cities with local numbers</dt><dd><span class="block font-display text-[30px] font-semibold leading-none tracking-tight tnum">10</span><span class="mt-1.5 block text-[15px] text-muted">UK cities with local numbers</span></dd></div>
    </dl>
  </div>
</section>


<!-- ===== COMPONENT: FrontDeskDay ===== -->
<section id="problem" data-component="FrontDeskDay" class="bg-surface">
  <div class="container-omh py-20 lg:py-28">
    <div>
      <div><p class="eyebrow"><span class="eyebrow-mark" aria-hidden="true"><i></i><i></i><i></i></span>A day at your front desk</p><h2>Calls don't arrive evenly. <span class="hl">Neither do the misses.</span></h2></div>
      <p class="mt-5 text-muted">An illustrative weekday at a busy three-consulting room clinic. Most missed calls land in the 8am rush, over lunch and after closing, exactly when nobody is free to pick up.</p>
    </div>
    <div class="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
      <figure class="rounded-[20px] border border-line bg-paper p-4 sm:p-6" data-pd data-mode="today">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <figcaption class="font-display text-[17.5px] font-semibold">Calls by hour, one weekday</figcaption>
          <div class="inline-grid grid-cols-2 gap-1 rounded-[12px] border border-line bg-surface p-1 text-[14.5px] font-semibold" role="group" aria-label="Show the day">
            <button type="button" class="min-h-[40px] rounded-[9px] px-3 aria-pressed:bg-ink aria-pressed:text-paper" aria-pressed="true" data-pd-mode="today" data-track="clinic_day_mode" data-track-name="today">As it is today</button>
            <button type="button" class="min-h-[40px] rounded-[9px] px-3 aria-pressed:bg-ink aria-pressed:text-paper" aria-pressed="false" data-pd-mode="agent" data-track="clinic_day_mode" data-track-name="agent">With an AI agent</button>
          </div>
        </div>
        <ul class="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-[14px]" aria-label="Legend">
          <li class="flex items-center gap-2"><span class="pd-key pd-team"></span>Answered by your team</li>
          <li class="flex items-center gap-2" data-pd-legend="today"><span class="pd-key pd-miss-key"></span><svg class="icon !h-4 !w-4 text-miss" aria-hidden="true" focusable="false"><use href="#i-phone-missed"/></svg>Missed</li>
          <li class="flex items-center gap-2" data-pd-legend="agent" hidden><span class="pd-key pd-ai-key"></span><svg class="icon !h-4 !w-4 text-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg>Answered by your AI agent</li>
        </ul>
        <div class="relative mt-4" data-pd-plot>
          <div class="grid grid-cols-[repeat(14,minmax(0,1fr))] gap-[3px] pl-7 text-center text-[11.5px] font-semibold text-muted sm:gap-[6px]" aria-hidden="true">
            <span class="pd-closed-label">Closed</span><span class="col-span-10"></span><span class="pd-closed-label col-span-3">Closed</span>
          </div>
          <div class="relative mt-3 h-[240px] sm:h-[260px]">
            <div class="pointer-events-none absolute inset-0 pl-7" aria-hidden="true">
              <div class="absolute left-0 right-0 flex items-center" style="top:0%"><span class="w-6 -translate-y-1/2 text-right text-[11.5px] text-muted tnum">40</span><span class="ml-1 block h-px flex-1 -translate-y-1/2 bg-line"></span></div><div class="absolute left-0 right-0 flex items-center" style="top:25%"><span class="w-6 -translate-y-1/2 text-right text-[11.5px] text-muted tnum">30</span><span class="ml-1 block h-px flex-1 -translate-y-1/2 bg-line"></span></div><div class="absolute left-0 right-0 flex items-center" style="top:50%"><span class="w-6 -translate-y-1/2 text-right text-[11.5px] text-muted tnum">20</span><span class="ml-1 block h-px flex-1 -translate-y-1/2 bg-line"></span></div><div class="absolute left-0 right-0 flex items-center" style="top:75%"><span class="w-6 -translate-y-1/2 text-right text-[11.5px] text-muted tnum">10</span><span class="ml-1 block h-px flex-1 -translate-y-1/2 bg-line"></span></div><div class="absolute left-0 right-0 flex items-center" style="top:100%"><span class="w-6 -translate-y-1/2 text-right text-[11.5px] text-muted tnum">0</span><span class="ml-1 block h-px flex-1 -translate-y-1/2 bg-[var(--line-strong)]"></span></div>
            </div>
            <div class="absolute inset-0 grid grid-cols-[repeat(14,minmax(0,1fr))] gap-[3px] pl-7 sm:gap-[6px]">
          <div class="pd-col relative flex h-full items-end justify-center is-closed">
            <button type="button" class="pd-bar flex w-full max-w-[34px] flex-col-reverse gap-[2px]" style="height:15.0%" data-pd-bar="0" data-h="7" data-c="6" data-m="6" aria-label="07:00 to 08:00: 6 calls, 0 answered by your team, 6 missed, clinic closed" data-track="clinic_day_bar" data-track-name="07:00">
              
              <span class="pd-top block w-full rounded-t-[4px]" style="flex:6"></span>
            </button>
          </div>
          <div class="pd-col relative flex h-full items-end justify-center">
            <button type="button" class="pd-bar flex w-full max-w-[34px] flex-col-reverse gap-[2px]" style="height:85.0%" data-pd-bar="1" data-h="8" data-c="34" data-m="14" aria-label="08:00 to 09:00: 34 calls, 20 answered by your team, 14 missed" data-track="clinic_day_bar" data-track-name="08:00">
              <span class="pd-team block w-full" style="flex:20"></span>
              <span class="pd-top block w-full rounded-t-[4px]" style="flex:14"></span>
            </button>
          </div>
          <div class="pd-col relative flex h-full items-end justify-center">
            <button type="button" class="pd-bar flex w-full max-w-[34px] flex-col-reverse gap-[2px]" style="height:60.0%" data-pd-bar="2" data-h="9" data-c="24" data-m="4" aria-label="09:00 to 10:00: 24 calls, 20 answered by your team, 4 missed" data-track="clinic_day_bar" data-track-name="09:00">
              <span class="pd-team block w-full" style="flex:20"></span>
              <span class="pd-top block w-full rounded-t-[4px]" style="flex:4"></span>
            </button>
          </div>
          <div class="pd-col relative flex h-full items-end justify-center">
            <button type="button" class="pd-bar flex w-full max-w-[34px] flex-col-reverse gap-[2px]" style="height:45.0%" data-pd-bar="3" data-h="10" data-c="18" data-m="1" aria-label="10:00 to 11:00: 18 calls, 17 answered by your team, 1 missed" data-track="clinic_day_bar" data-track-name="10:00">
              <span class="pd-team block w-full" style="flex:17"></span>
              <span class="pd-top block w-full rounded-t-[4px]" style="flex:1"></span>
            </button>
          </div>
          <div class="pd-col relative flex h-full items-end justify-center">
            <button type="button" class="pd-bar flex w-full max-w-[34px] flex-col-reverse gap-[2px]" style="height:40.0%" data-pd-bar="4" data-h="11" data-c="16" data-m="0" aria-label="11:00 to 12:00: 16 calls, 16 answered by your team, 0 missed" data-track="clinic_day_bar" data-track-name="11:00">
              <span class="pd-team block w-full" style="flex:16"></span>
              
            </button>
          </div>
          <div class="pd-col relative flex h-full items-end justify-center">
            <button type="button" class="pd-bar flex w-full max-w-[34px] flex-col-reverse gap-[2px]" style="height:55.0%" data-pd-bar="5" data-h="12" data-c="22" data-m="10" aria-label="12:00 to 13:00: 22 calls, 12 answered by your team, 10 missed" data-track="clinic_day_bar" data-track-name="12:00">
              <span class="pd-team block w-full" style="flex:12"></span>
              <span class="pd-top block w-full rounded-t-[4px]" style="flex:10"></span>
            </button>
          </div>
          <div class="pd-col relative flex h-full items-end justify-center">
            <button type="button" class="pd-bar flex w-full max-w-[34px] flex-col-reverse gap-[2px]" style="height:50.0%" data-pd-bar="6" data-h="13" data-c="20" data-m="9" aria-label="13:00 to 14:00: 20 calls, 11 answered by your team, 9 missed" data-track="clinic_day_bar" data-track-name="13:00">
              <span class="pd-team block w-full" style="flex:11"></span>
              <span class="pd-top block w-full rounded-t-[4px]" style="flex:9"></span>
            </button>
          </div>
          <div class="pd-col relative flex h-full items-end justify-center">
            <button type="button" class="pd-bar flex w-full max-w-[34px] flex-col-reverse gap-[2px]" style="height:37.5%" data-pd-bar="7" data-h="14" data-c="15" data-m="1" aria-label="14:00 to 15:00: 15 calls, 14 answered by your team, 1 missed" data-track="clinic_day_bar" data-track-name="14:00">
              <span class="pd-team block w-full" style="flex:14"></span>
              <span class="pd-top block w-full rounded-t-[4px]" style="flex:1"></span>
            </button>
          </div>
          <div class="pd-col relative flex h-full items-end justify-center">
            <button type="button" class="pd-bar flex w-full max-w-[34px] flex-col-reverse gap-[2px]" style="height:35.0%" data-pd-bar="8" data-h="15" data-c="14" data-m="0" aria-label="15:00 to 16:00: 14 calls, 14 answered by your team, 0 missed" data-track="clinic_day_bar" data-track-name="15:00">
              <span class="pd-team block w-full" style="flex:14"></span>
              
            </button>
          </div>
          <div class="pd-col relative flex h-full items-end justify-center">
            <button type="button" class="pd-bar flex w-full max-w-[34px] flex-col-reverse gap-[2px]" style="height:42.5%" data-pd-bar="9" data-h="16" data-c="17" data-m="2" aria-label="16:00 to 17:00: 17 calls, 15 answered by your team, 2 missed" data-track="clinic_day_bar" data-track-name="16:00">
              <span class="pd-team block w-full" style="flex:15"></span>
              <span class="pd-top block w-full rounded-t-[4px]" style="flex:2"></span>
            </button>
          </div>
          <div class="pd-col relative flex h-full items-end justify-center">
            <button type="button" class="pd-bar flex w-full max-w-[34px] flex-col-reverse gap-[2px]" style="height:52.5%" data-pd-bar="10" data-h="17" data-c="21" data-m="7" aria-label="17:00 to 18:00: 21 calls, 14 answered by your team, 7 missed" data-track="clinic_day_bar" data-track-name="17:00">
              <span class="pd-team block w-full" style="flex:14"></span>
              <span class="pd-top block w-full rounded-t-[4px]" style="flex:7"></span>
            </button>
          </div>
          <div class="pd-col relative flex h-full items-end justify-center is-closed">
            <button type="button" class="pd-bar flex w-full max-w-[34px] flex-col-reverse gap-[2px]" style="height:30.0%" data-pd-bar="11" data-h="18" data-c="12" data-m="12" aria-label="18:00 to 19:00: 12 calls, 0 answered by your team, 12 missed, clinic closed" data-track="clinic_day_bar" data-track-name="18:00">
              
              <span class="pd-top block w-full rounded-t-[4px]" style="flex:12"></span>
            </button>
          </div>
          <div class="pd-col relative flex h-full items-end justify-center is-closed">
            <button type="button" class="pd-bar flex w-full max-w-[34px] flex-col-reverse gap-[2px]" style="height:20.0%" data-pd-bar="12" data-h="19" data-c="8" data-m="8" aria-label="19:00 to 20:00: 8 calls, 0 answered by your team, 8 missed, clinic closed" data-track="clinic_day_bar" data-track-name="19:00">
              
              <span class="pd-top block w-full rounded-t-[4px]" style="flex:8"></span>
            </button>
          </div>
          <div class="pd-col relative flex h-full items-end justify-center is-closed">
            <button type="button" class="pd-bar flex w-full max-w-[34px] flex-col-reverse gap-[2px]" style="height:12.5%" data-pd-bar="13" data-h="20" data-c="5" data-m="5" aria-label="20:00 to 21:00: 5 calls, 0 answered by your team, 5 missed, clinic closed" data-track="clinic_day_bar" data-track-name="20:00">
              
              <span class="pd-top block w-full rounded-t-[4px]" style="flex:5"></span>
            </button>
          </div>
            </div>
            <div class="pd-tip pointer-events-none absolute z-10 hidden w-[210px] rounded-[12px] border border-line bg-surface p-3 text-[13.5px] leading-snug shadow-[0_20px_40px_-20px_rgb(0_0_0/0.5)]" data-pd-tip role="status"></div>
          </div>
          <div class="mt-2 grid grid-cols-[repeat(14,minmax(0,1fr))] gap-[3px] pl-7 text-center text-[11px] text-muted tnum sm:gap-[6px] sm:text-[12px]" aria-hidden="true"><span>07</span><span>08</span><span>09</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span></div>
        </div>
        <p class="mt-4 rounded-[12px] bg-surface px-4 py-3 text-[16px]" aria-live="polite">
          <span data-pd-sum="today"><strong class="font-semibold">232 calls, 79 missed</strong> (34%). Hover or tap a bar for the hour.</span>
          <span data-pd-sum="agent" hidden><strong class="font-semibold">232 calls, 0 missed.</strong> Your AI agent picks up the 79 your team couldn't get to.</span>
        </p>
        <details class="mt-3 text-[14.5px]">
          <summary class="inline-flex min-h-[44px] items-center gap-1.5 font-semibold text-muted hover:text-ink" data-track="clinic_day_table">Show as a table<svg class="icon faq-chevron !h-4 !w-4" aria-hidden="true" focusable="false"><use href="#i-chevron-down"/></svg></summary>
          <div class="mt-2 overflow-x-auto"><table class="w-full text-left tnum"><thead><tr class="border-b border-line text-muted"><th class="py-1.5 pr-3 font-semibold">Hour</th><th class="py-1.5 pr-3 font-semibold">Calls</th><th class="py-1.5 pr-3 font-semibold">Answered by team</th><th class="py-1.5 font-semibold">Missed</th></tr></thead><tbody><tr class="border-b border-line"><td class="py-1.5 pr-3">07:00 (closed)</td><td class="py-1.5 pr-3">6</td><td class="py-1.5 pr-3">0</td><td class="py-1.5">6</td></tr><tr class="border-b border-line"><td class="py-1.5 pr-3">08:00</td><td class="py-1.5 pr-3">34</td><td class="py-1.5 pr-3">20</td><td class="py-1.5">14</td></tr><tr class="border-b border-line"><td class="py-1.5 pr-3">09:00</td><td class="py-1.5 pr-3">24</td><td class="py-1.5 pr-3">20</td><td class="py-1.5">4</td></tr><tr class="border-b border-line"><td class="py-1.5 pr-3">10:00</td><td class="py-1.5 pr-3">18</td><td class="py-1.5 pr-3">17</td><td class="py-1.5">1</td></tr><tr class="border-b border-line"><td class="py-1.5 pr-3">11:00</td><td class="py-1.5 pr-3">16</td><td class="py-1.5 pr-3">16</td><td class="py-1.5">0</td></tr><tr class="border-b border-line"><td class="py-1.5 pr-3">12:00</td><td class="py-1.5 pr-3">22</td><td class="py-1.5 pr-3">12</td><td class="py-1.5">10</td></tr><tr class="border-b border-line"><td class="py-1.5 pr-3">13:00</td><td class="py-1.5 pr-3">20</td><td class="py-1.5 pr-3">11</td><td class="py-1.5">9</td></tr><tr class="border-b border-line"><td class="py-1.5 pr-3">14:00</td><td class="py-1.5 pr-3">15</td><td class="py-1.5 pr-3">14</td><td class="py-1.5">1</td></tr><tr class="border-b border-line"><td class="py-1.5 pr-3">15:00</td><td class="py-1.5 pr-3">14</td><td class="py-1.5 pr-3">14</td><td class="py-1.5">0</td></tr><tr class="border-b border-line"><td class="py-1.5 pr-3">16:00</td><td class="py-1.5 pr-3">17</td><td class="py-1.5 pr-3">15</td><td class="py-1.5">2</td></tr><tr class="border-b border-line"><td class="py-1.5 pr-3">17:00</td><td class="py-1.5 pr-3">21</td><td class="py-1.5 pr-3">14</td><td class="py-1.5">7</td></tr><tr class="border-b border-line"><td class="py-1.5 pr-3">18:00 (closed)</td><td class="py-1.5 pr-3">12</td><td class="py-1.5 pr-3">0</td><td class="py-1.5">12</td></tr><tr class="border-b border-line"><td class="py-1.5 pr-3">19:00 (closed)</td><td class="py-1.5 pr-3">8</td><td class="py-1.5 pr-3">0</td><td class="py-1.5">8</td></tr><tr class="border-b border-line"><td class="py-1.5 pr-3">20:00 (closed)</td><td class="py-1.5 pr-3">5</td><td class="py-1.5 pr-3">0</td><td class="py-1.5">5</td></tr></tbody></table></div>
        </details>
        <p class="mt-2 text-[13.5px] text-muted">Illustrative figures, not data from a real clinic. Your phone provider's call log shows your own pattern.</p>
      </figure>

      <div class="flex flex-col gap-4">
        <div class="rounded-[18px] border border-line bg-paper p-5"><p class="flex items-center gap-3"><span class="rounded-full bg-ink px-2.5 py-0.5 text-[13.5px] font-semibold text-paper tnum">08:00</span><span class="font-display text-[18px] font-semibold">The morning rush</span></p><p class="mt-2 text-[16px] leading-snug text-muted">Patients in pain ring at 8 on the dot. One receptionist, two lines and a queue at the desk.</p></div>
        <div class="rounded-[18px] border border-line bg-paper p-5"><p class="flex items-center gap-3"><span class="rounded-full bg-ink px-2.5 py-0.5 text-[13.5px] font-semibold text-paper tnum">12:30</span><span class="font-display text-[18px] font-semibold">Lunch cover</span></p><p class="mt-2 text-[16px] leading-snug text-muted">One person on the desk, or nobody. The phone rings out while they check a patient in.</p></div>
        <div class="rounded-[18px] border border-line bg-paper p-5"><p class="flex items-center gap-3"><span class="rounded-full bg-ink px-2.5 py-0.5 text-[13.5px] font-semibold text-paper tnum">18:00</span><span class="font-display text-[18px] font-semibold">After closing</span></p><p class="mt-2 text-[16px] leading-snug text-muted">Patients ring after work. Voicemail picks up and many hang up without leaving a message.</p></div>
        <a href="#calculator" class="text-link mt-1" data-track="clinic_problem_calc">Work out what it costs your clinic<svg class="icon" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></a>
      </div>
    </div>
  </div>
</section>


<!-- ===== COMPONENT: HearIt ===== -->
${leadDemo("healthcare")}


<!-- ===== COMPONENT: ClinicCalculator ===== -->
<section id="calculator" data-component="ClinicCalculator" class="bg-surface">
  <div class="container-omh py-20 lg:py-28">
    <div class="mx-auto text-center">
      <p class="eyebrow justify-center"><span class="eyebrow-mark" aria-hidden="true"><i></i><i></i><i></i></span>Missed calls calculator</p>
      <h2>What do missed calls <span class="hl">cost your clinic?</span></h2>
      <p class="mt-5 text-muted">Move the sliders to match your clinic. We've started with typical figures for a two or three consulting room clinic.</p>
    </div>
    <div class="mx-auto mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]" data-dc-root>
      <div class="space-y-6 rounded-[20px] border border-line bg-paper p-6 sm:p-8">
        <div>
            <div class="flex items-baseline justify-between gap-3"><label for="dc-calls" class="font-display text-[16.5px] font-semibold">Calls a month</label><span class="font-display text-[17px] font-semibold text-hl tnum"><span data-dc-out="calls">600</span></span></div>
            <input id="dc-calls" type="range" min="100" max="3000" step="50" value="600" data-dc="calls" data-track="clinic_calc_calls" aria-describedby="dc-calls-help">
            <p id="dc-calls-help" class="text-[14px] text-muted">All calls to the clinic, in and out of hours.</p>
          </div>
        <div>
            <div class="flex items-baseline justify-between gap-3"><label for="dc-missed" class="font-display text-[16.5px] font-semibold">Calls that go unanswered</label><span class="font-display text-[17px] font-semibold text-hl tnum"><span data-dc-out="missed">20</span>%</span></div>
            <input id="dc-missed" type="range" min="5" max="60" step="1" value="20" data-dc="missed" data-track="clinic_calc_missed" aria-describedby="dc-missed-help">
            <p id="dc-missed-help" class="text-[14px] text-muted">Your phone provider’s call log shows the real figure.</p>
          </div>
        <div>
            <div class="flex items-baseline justify-between gap-3"><label for="dc-newp" class="font-display text-[16.5px] font-semibold">Of those, new patients</label><span class="font-display text-[17px] font-semibold text-hl tnum"><span data-dc-out="newp">30</span>%</span></div>
            <input id="dc-newp" type="range" min="5" max="80" step="5" value="30" data-dc="newp" data-track="clinic_calc_newp" aria-describedby="dc-newp-help">
            <p id="dc-newp-help" class="text-[14px] text-muted">Callers who are not yet registered with you.</p>
          </div>
        <div>
            <div class="flex items-baseline justify-between gap-3"><label for="dc-book" class="font-display text-[16.5px] font-semibold">New patients who would book</label><span class="font-display text-[17px] font-semibold text-hl tnum"><span data-dc-out="book">50</span>%</span></div>
            <input id="dc-book" type="range" min="10" max="100" step="5" value="50" data-dc="book" data-track="clinic_calc_book" aria-describedby="dc-book-help">
            <p id="dc-book-help" class="text-[14px] text-muted">If someone had answered.</p>
          </div>
        <div>
          <label for="dc-value" class="font-display text-[16.5px] font-semibold">Value of a new patient in their first year</label>
          <div class="mt-2 flex items-center rounded-[10px] border-[1.5px] border-[var(--line-strong)] bg-surface focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[var(--hl)]"><span class="pl-3 font-semibold text-muted" aria-hidden="true">£</span><input id="dc-value" type="number" inputmode="numeric" min="0" max="20000" value="400" class="min-h-[48px] w-full bg-transparent px-2 text-[17px] tnum outline-none" data-dc="value" data-track="clinic_calc_value"></div>
          <p class="mt-1 text-[14px] text-muted">Appointments, hygiene and any treatment. <span class="flag">[CONFIRM default]</span></p>
        </div>
      </div>
      <div class="on-band flex flex-col rounded-[20px] bg-band p-6 text-band-ink sm:p-8" aria-live="polite">
        <p class="font-display text-[17px] font-semibold">Your clinic each month</p>
        <ul class="mt-5 space-y-4">
          <li><p class="flex items-baseline justify-between text-[15.5px]"><span class="text-band-muted">Unanswered calls</span><span class="font-display text-[22px] font-semibold tnum" data-dc-res="missedN">0</span></p><span class="mt-1.5 block h-2 overflow-hidden rounded-full bg-[rgb(247_246_242/.1)]"><span class="block h-full rounded-full bg-band-miss transition-[width] duration-500" data-dc-bar="missedN" style="width:0"></span></span></li><li><p class="flex items-baseline justify-between text-[15.5px]"><span class="text-band-muted">New patients among them</span><span class="font-display text-[22px] font-semibold tnum" data-dc-res="newN">0</span></p><span class="mt-1.5 block h-2 overflow-hidden rounded-full bg-[rgb(247_246_242/.1)]"><span class="block h-full rounded-full bg-band-hl transition-[width] duration-500" data-dc-bar="newN" style="width:0"></span></span></li><li><p class="flex items-baseline justify-between text-[15.5px]"><span class="text-band-muted">Who would have booked</span><span class="font-display text-[22px] font-semibold tnum" data-dc-res="bookN">0</span></p><span class="mt-1.5 block h-2 overflow-hidden rounded-full bg-[rgb(247_246_242/.1)]"><span class="block h-full rounded-full bg-band-ok transition-[width] duration-500" data-dc-bar="bookN" style="width:0"></span></span></li>
        </ul>
        <div class="mt-7 rounded-[16px] bg-band-surface p-5">
          <p class="text-[15px] text-band-muted">New patient value going to another clinic</p>
          <p class="mt-1 font-display text-[clamp(2.4rem,2rem+1.6vw,3.4rem)] font-semibold leading-none tracking-tight text-band-hl tnum" data-dc-res="lost">£0</p>
          <p class="mt-2 text-[15px] text-band-muted">a month, or about <strong class="font-semibold text-band-ink tnum" data-dc-res="year">£0</strong> a year</p>
        </div>
        <p class="mt-5 text-[15.5px]" data-dc-res="plan">The Growth plan would cover these calls.</p>
        <a href="#book-demo" class="btn btn-primary mt-auto w-full !mt-6" data-track="clinic_calc_cta">Get a quote for your clinic</a>
        <p class="mt-3 text-[13.5px] text-band-muted">A rough guide, not a promise of results.</p>
      </div>
    </div>
  </div>
</section>


<!-- ===== COMPONENT: ClinicVideo ===== -->
<section id="video" data-component="ClinicVideo" class="bg-surface">
  <div class="container-omh py-20 lg:py-24">
    <div class="mx-auto text-center">
      <p class="eyebrow justify-center"><span class="eyebrow-mark" aria-hidden="true"><i></i><i></i><i></i></span>Demo video</p>
      <h2>Watch it handle <span class="hl">a patient call</span></h2>
    </div>
    <div class="mx-auto mt-10 rounded-[24px] border border-line bg-surface p-3 sm:p-4">
      <div class="v4l"><div class="video-frame" data-video data-video-id="H1fMzyN93W0" data-video-title="How an AI voice agent answers and routes your calls">
        <button type="button" class="video-poster on-band has-thumb" data-video-play data-track="clinic_video_open" aria-label="Play video: How an AI voice agent answers and routes your calls (1:07)">
          <img class="vp-thumb" src="/images/voice-agents/demo-video-poster.jpg" alt="Demo video: how an AI voice agent answers and routes calls" width="1280" height="720" loading="lazy" decoding="async">
          <span class="vp-play" aria-hidden="true"><span class="vp-play-core"><svg class="vp-play-ico" viewBox="0 0 24 24" focusable="false"><path d="M8 5.6v12.8l10.4-6.4z"/></svg></span><span class="vp-play-label">Watch the demo</span></span>
          <span class="vp-bottom" aria-hidden="true">
            <span class="vp-cap"><span class="vp-kicker"><span class="voice-mark"><i></i><i></i><i></i></span>Online Marketing Help</span><span class="vp-title">How an AI voice agent answers and routes your calls</span></span>
            <span class="vp-time tnum">1:07</span>
          </span>
        </button>
      </div></div>
      <div class="flex flex-col items-center justify-between gap-3 px-2 pb-1 pt-4 sm:flex-row">
        <p class="text-[15px] text-muted">Plays from YouTube's privacy-enhanced player, only when you press play.</p>
        <a href="#hear" class="btn btn-secondary !min-h-[44px]" data-track="clinic_video_try">Try the demo yourself</a>
      </div>
    </div>
  </div>
</section>


<!-- ===== COMPONENT: HowItWorks ===== -->
<section id="how-it-works" data-component="HowItWorks" class="bg-surface">
  <div class="container-omh py-20 lg:py-28" data-hw3>
    <div class="mx-auto text-center">
      <p class="eyebrow justify-center"><span class="eyebrow-mark" aria-hidden="true"><i></i><i></i><i></i></span>How it works</p>
      <h2>Three steps, <span class="hl">on every call</span></h2>
      <p class="mt-5 text-muted">From the first ring to a note your team can act on. Pick a step, or watch one call go through.</p>
    </div>

    <div class="relative mx-auto mt-10">
      <div class="hw3-track absolute left-[16.667%] right-[16.667%] top-[22.5px] h-[3px] rounded-full bg-line" aria-hidden="true"><span class="hw3-fill block h-full rounded-full bg-gold" data-hw3-fill></span><span class="hw3-dot" data-hw3-dot></span></div>
      <div class="relative grid grid-cols-3" role="group" aria-label="Steps">
        <button type="button" class="hw3-pick mx-auto flex flex-col items-center gap-1.5" aria-pressed="true" data-hw3-pick="0" data-track="clinic_how_step" data-track-name="Answers every patient call"><span class="hw3-num grid h-12 w-12 place-items-center rounded-full border-2 font-display text-[17px] font-semibold"><svg class="icon !h-5 !w-5" aria-hidden="true" focusable="false"><use href="#i-phone-incoming"/></svg></span><span class="text-[13.5px] font-semibold">Step 1</span></button><button type="button" class="hw3-pick mx-auto flex flex-col items-center gap-1.5" aria-pressed="false" data-hw3-pick="1" data-track="clinic_how_step" data-track-name="Books it or routes it"><span class="hw3-num grid h-12 w-12 place-items-center rounded-full border-2 font-display text-[17px] font-semibold"><svg class="icon !h-5 !w-5" aria-hidden="true" focusable="false"><use href="#i-calendar"/></svg></span><span class="text-[13.5px] font-semibold">Step 2</span></button><button type="button" class="hw3-pick mx-auto flex flex-col items-center gap-1.5" aria-pressed="false" data-hw3-pick="2" data-track="clinic_how_step" data-track-name="Hands reception a summary"><span class="hw3-num grid h-12 w-12 place-items-center rounded-full border-2 font-display text-[17px] font-semibold"><svg class="icon !h-5 !w-5" aria-hidden="true" focusable="false"><use href="#i-mail"/></svg></span><span class="text-[13.5px] font-semibold">Step 3</span></button>
      </div>
    </div>

    <ol class="mt-8 grid gap-5 md:grid-cols-3">
      <li class="hw3-card flex flex-col rounded-[20px] border border-line bg-paper p-5 is-active" data-hw3-card="0">
        <div class="hw3-screen">
            <p class="flex items-center justify-between text-[12.5px] font-semibold text-muted"><span class="flex items-center gap-1.5"><span class="hw3-ring relative grid h-7 w-7 place-items-center rounded-full bg-gold text-navy"><svg class="icon !h-3.5 !w-3.5" aria-hidden="true" focusable="false"><use href="#i-phone"/></svg></span>Incoming call</span><span class="tnum">07:52</span></p>
            <p class="hw3-in mt-2 inline-flex items-center gap-1.5 rounded-full bg-[color-mix(in_srgb,var(--ok)_14%,transparent)] px-2.5 py-0.5 text-[12.5px] font-semibold text-ok"><svg class="icon !h-3.5 !w-3.5" aria-hidden="true" focusable="false"><use href="#i-check"/></svg>Answered on ring 1</p>
            <p class="hw3-in mt-2 rounded-[10px_10px_10px_3px] bg-surface px-3 py-2 text-[13.5px] leading-snug">&ldquo;Good morning, Albion Square Clinic. I'm Amy, the clinic's AI assistant.&rdquo;</p>
          </div>
        <p class="mt-5 text-[13.5px] font-semibold text-hl">Step 1</p>
        <h3 class="mt-1 !text-[22px]">Answers every patient call</h3>
        <p class="mt-2 text-[16px] text-muted">On the first ring, in your clinic name, in or out of hours. It says it is an AI assistant.</p>
      </li>
      <li class="hw3-card flex flex-col rounded-[20px] border border-line bg-paper p-5" data-hw3-card="1">
        <div class="hw3-screen">
            <div class="flex gap-1 rounded-[9px] border border-line bg-surface p-0.5 text-[12.5px] font-semibold" role="group" aria-label="Type of call">
              <button type="button" class="hw3-type min-h-[34px] flex-1 rounded-[7px] aria-pressed:bg-ink aria-pressed:text-paper" aria-pressed="true" data-hw3-type="book" data-track="clinic_how_calltype" data-track-name="booking">Booking</button>
              <button type="button" class="hw3-type min-h-[34px] flex-1 rounded-[7px] aria-pressed:bg-ink aria-pressed:text-paper" aria-pressed="false" data-hw3-type="urgent" data-track="clinic_how_calltype" data-track-name="urgent">Urgent</button>
            </div>
            <div class="hw3-in mt-2.5" data-hw3-out="book"><p class="flex items-center gap-2 rounded-[10px] border-2 border-gold bg-gold/15 px-3 py-2 text-[13.5px] font-semibold"><svg class="icon !h-4 !w-4 text-hl" aria-hidden="true" focusable="false"><use href="#i-calendar"/></svg>Thu 09:10, Dr Patel <span class="ml-auto text-[12px] text-ok">Added</span></p><p class="mt-1.5 text-[12.5px] text-muted">Confirmation text sent to the patient</p></div>
            <div class="hw3-in mt-2.5" data-hw3-out="urgent" hidden><p class="flex items-center gap-2 rounded-[10px] border-2 border-gold bg-gold/15 px-3 py-2 text-[13.5px] font-semibold"><svg class="icon !h-4 !w-4 text-hl" aria-hidden="true" focusable="false"><use href="#i-phone-forwarded"/></svg>Emergency line <span class="ml-auto text-[12px] text-hl">Put through</span></p><p class="mt-1.5 text-[12.5px] text-muted">No advice given. Your route, every time.</p></div>
          </div>
        <p class="mt-5 text-[13.5px] font-semibold text-hl">Step 2</p>
        <h3 class="mt-1 !text-[22px]">Books it or routes it</h3>
        <p class="mt-2 text-[16px] text-muted">Appointments go straight into your diary. Urgent calls follow your rules. Anything clinical goes to your team.</p>
      </li>
      <li class="hw3-card flex flex-col rounded-[20px] border border-line bg-paper p-5" data-hw3-card="2">
        <div class="hw3-screen">
            <p class="flex items-center justify-between text-[12.5px] font-semibold text-muted"><span class="flex items-center gap-1.5"><svg class="icon !h-4 !w-4 text-hl" aria-hidden="true" focusable="false"><use href="#i-mail"/></svg>Call summary</span><span class="tnum">07:54</span></p>
            <ul class="mt-2 space-y-1.5 text-[13.5px] leading-snug">
              <li class="hw3-in flex gap-2"><svg class="icon mt-0.5 !h-3.5 !w-3.5 text-ok" aria-hidden="true" focusable="false"><use href="#i-check"/></svg>New patient, Ms Hughes</li>
              <li class="hw3-in flex gap-2"><svg class="icon mt-0.5 !h-3.5 !w-3.5 text-ok" aria-hidden="true" focusable="false"><use href="#i-check"/></svg>Booked Thu 09:10 with Dr Patel</li>
              <li class="hw3-in flex gap-2"><svg class="icon mt-0.5 !h-3.5 !w-3.5 text-ok" aria-hidden="true" focusable="false"><use href="#i-check"/></svg>Forms and directions sent by text</li>
            </ul>
          </div>
        <p class="mt-5 text-[13.5px] font-semibold text-hl">Step 3</p>
        <h3 class="mt-1 !text-[22px]">Hands reception a summary</h3>
        <p class="mt-2 text-[16px] text-muted">Every call ends with a short written note, and the morning summary shows what needs a person today.</p>
      </li>
    </ol>
    <div class="mt-8 flex justify-center">
      <button type="button" class="btn btn-secondary !min-h-[44px]" data-hw3-replay data-track="clinic_how_replay"><svg class="icon" aria-hidden="true" focusable="false"><use href="#i-replay"/></svg>Watch a call go through</button>
    </div>
  </div>
</section>


<!-- ===== COMPONENT: ClinicWorkflows ===== -->
<section id="workflows" data-component="ClinicWorkflows">
  <div class="container-omh py-20 lg:py-28" data-wf-root>
    <div class="mx-auto text-center">
      <p class="eyebrow justify-center"><span class="eyebrow-mark" aria-hidden="true"><i></i><i></i><i></i></span>Clinic workflows</p>
      <h2>Built around <span class="hl">the clinic front desk</span></h2>
      <p class="mt-5 text-muted">Six jobs your agent can take on. Pick one to see how the call flows and what reception sees afterwards.</p>
    </div>
    <div class="mt-12 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)_minmax(0,1fr)] lg:items-stretch">
      <ul class="grid gap-4"><li><button type="button" class="wf-card group flex h-full w-full items-start gap-3.5 rounded-[18px] border border-line bg-surface p-4 text-left transition-colors hover:border-[var(--line-strong)] aria-pressed:border-gold aria-pressed:shadow-[0_0_0_1px_var(--color-teal)] sm:p-5" aria-pressed="true" aria-controls="wf-panel" data-wf="new" data-track="clinic_workflow" data-track-name="New patient enquiries">
          <span class="grid h-11 w-11 shrink-0 place-items-center rounded-[12px] bg-gold/20 text-hl group-aria-pressed:bg-gold group-aria-pressed:text-navy" aria-hidden="true"><svg class="icon !h-5 !w-5" aria-hidden="true" focusable="false"><use href="#i-plus-star"/></svg></span>
          <span class="min-w-0"><span class="block font-display text-[17.5px] font-semibold leading-snug">New patient enquiries</span><span class="mt-1 block text-[14.5px] leading-snug text-muted">Details taken, first visit booked</span></span>
        </button></li><li><button type="button" class="wf-card group flex h-full w-full items-start gap-3.5 rounded-[18px] border border-line bg-surface p-4 text-left transition-colors hover:border-[var(--line-strong)] aria-pressed:border-gold aria-pressed:shadow-[0_0_0_1px_var(--color-teal)] sm:p-5" aria-pressed="false" aria-controls="wf-panel" data-wf="urgent" data-track="clinic_workflow" data-track-name="Urgent and emergency calls">
          <span class="grid h-11 w-11 shrink-0 place-items-center rounded-[12px] bg-gold/20 text-hl group-aria-pressed:bg-gold group-aria-pressed:text-navy" aria-hidden="true"><svg class="icon !h-5 !w-5" aria-hidden="true" focusable="false"><use href="#i-shield"/></svg></span>
          <span class="min-w-0"><span class="block font-display text-[17.5px] font-semibold leading-snug">Urgent and emergency calls</span><span class="mt-1 block text-[14.5px] leading-snug text-muted">Your rules, never clinical advice</span></span>
        </button></li><li><button type="button" class="wf-card group flex h-full w-full items-start gap-3.5 rounded-[18px] border border-line bg-surface p-4 text-left transition-colors hover:border-[var(--line-strong)] aria-pressed:border-gold aria-pressed:shadow-[0_0_0_1px_var(--color-teal)] sm:p-5" aria-pressed="false" aria-controls="wf-panel" data-wf="recall" data-track="clinic_workflow" data-track-name="Recalls and hygiene visits">
          <span class="grid h-11 w-11 shrink-0 place-items-center rounded-[12px] bg-gold/20 text-hl group-aria-pressed:bg-gold group-aria-pressed:text-navy" aria-hidden="true"><svg class="icon !h-5 !w-5" aria-hidden="true" focusable="false"><use href="#i-calendar"/></svg></span>
          <span class="min-w-0"><span class="block font-display text-[17.5px] font-semibold leading-snug">Recalls and hygiene visits</span><span class="mt-1 block text-[14.5px] leading-snug text-muted">Consented reminders, booked straight in</span></span>
        </button></li></ul>
      <div class="on-band relative order-first flex flex-col justify-center overflow-hidden rounded-[22px] bg-band p-7 text-band-ink lg:order-none">
        <span class="pointer-events-none absolute -bottom-10 -right-10 text-white/5" aria-hidden="true"><svg class="icon !h-[220px] !w-[220px]" aria-hidden="true" focusable="false"><use href="#i-stethoscope"/></svg></span>
        <p class="text-[13px] font-semibold uppercase tracking-wide text-band-hl">Your AI front desk</p>
        <p class="mt-3 font-display text-[clamp(26px,22px+1vw,34px)] font-semibold leading-tight">One layer for all your patient calls</p>
        <p class="mt-3 text-[16px] text-band-muted">It answers, books and routes, then hands your team a clear note. Reception stays in charge of anything that needs a person.</p>
        <p class="mt-5 flex items-center gap-2 text-[14.5px] font-semibold text-band-ok"><span class="fd-live" aria-hidden="true"></span>Answering 24/7, bank holidays too</p>
      </div>
      <ul class="grid gap-4"><li><button type="button" class="wf-card group flex h-full w-full items-start gap-3.5 rounded-[18px] border border-line bg-surface p-4 text-left transition-colors hover:border-[var(--line-strong)] aria-pressed:border-gold aria-pressed:shadow-[0_0_0_1px_var(--color-teal)] sm:p-5" aria-pressed="false" aria-controls="wf-panel" data-wf="cancel" data-track="clinic_workflow" data-track-name="Cancellations and waitlist">
          <span class="grid h-11 w-11 shrink-0 place-items-center rounded-[12px] bg-gold/20 text-hl group-aria-pressed:bg-gold group-aria-pressed:text-navy" aria-hidden="true"><svg class="icon !h-5 !w-5" aria-hidden="true" focusable="false"><use href="#i-replay"/></svg></span>
          <span class="min-w-0"><span class="block font-display text-[17.5px] font-semibold leading-snug">Cancellations and waitlist</span><span class="mt-1 block text-[14.5px] leading-snug text-muted">Gaps offered before they are lost</span></span>
        </button></li><li><button type="button" class="wf-card group flex h-full w-full items-start gap-3.5 rounded-[18px] border border-line bg-surface p-4 text-left transition-colors hover:border-[var(--line-strong)] aria-pressed:border-gold aria-pressed:shadow-[0_0_0_1px_var(--color-teal)] sm:p-5" aria-pressed="false" aria-controls="wf-panel" data-wf="treatment" data-track="clinic_workflow" data-track-name="Treatment enquiries">
          <span class="grid h-11 w-11 shrink-0 place-items-center rounded-[12px] bg-gold/20 text-hl group-aria-pressed:bg-gold group-aria-pressed:text-navy" aria-hidden="true"><svg class="icon !h-5 !w-5" aria-hidden="true" focusable="false"><use href="#i-plus-star"/></svg></span>
          <span class="min-w-0"><span class="block font-display text-[17.5px] font-semibold leading-snug">Treatment enquiries</span><span class="mt-1 block text-[14.5px] leading-snug text-muted">Scans, injections and physiotherapy</span></span>
        </button></li><li><button type="button" class="wf-card group flex h-full w-full items-start gap-3.5 rounded-[18px] border border-line bg-surface p-4 text-left transition-colors hover:border-[var(--line-strong)] aria-pressed:border-gold aria-pressed:shadow-[0_0_0_1px_var(--color-teal)] sm:p-5" aria-pressed="false" aria-controls="wf-panel" data-wf="fees" data-track="clinic_workflow" data-track-name="Fees, plans and finance">
          <span class="grid h-11 w-11 shrink-0 place-items-center rounded-[12px] bg-gold/20 text-hl group-aria-pressed:bg-gold group-aria-pressed:text-navy" aria-hidden="true"><svg class="icon !h-5 !w-5" aria-hidden="true" focusable="false"><use href="#i-message"/></svg></span>
          <span class="min-w-0"><span class="block font-display text-[17.5px] font-semibold leading-snug">Fees, plans and finance</span><span class="mt-1 block text-[14.5px] leading-snug text-muted">Answered from your price list</span></span>
        </button></li></ul>
    </div>

    <div id="wf-panel" class="mt-6 rounded-[22px] border border-line bg-surface p-5 sm:p-8" aria-live="polite">
      <div data-wf-panel="new">
        <div class=""><h3>New patients booked while they are still on the phone</h3><p class="mt-2 text-muted">The agent takes the details your clinic needs, checks your new-patient slots and books the first visit. Forms and directions go out by text.</p></div>
        <div class="mt-7 rounded-[14px] border border-line bg-paper p-4 sm:p-6" data-flow-wrap>
          <div class="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 px-1 pb-4">
            <p class="flex items-center gap-2 font-display text-[18px] font-semibold"><svg class="icon text-hl" aria-hidden="true" focusable="false"><use href="#i-phone"/></svg>How the call flows</p>
            <p class="text-[15px] text-muted"><span class="md:hidden">Tap</span><span class="max-md:hidden">Hover or select</span> a step to see what happens</p>
          </div>
          <svg viewBox="0 0 1000 280" class="flow hidden h-auto w-full md:block" data-flow role="group" aria-label="New patient enquiry, step by step">
          <defs><marker id="flow-arrow-d-new" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" class="flow-arrow"/></marker></defs>
          <path class="flow-edge" data-flow-edge data-from="n1" data-to="n2" d="M204 140 H262" marker-end="url(#flow-arrow-d-new)"/><path class="flow-edge" data-flow-edge data-from="n2" data-to="n3" d="M464 140 C504 140 482 90 522 90" marker-end="url(#flow-arrow-d-new)"/><path class="flow-edge" data-flow-edge data-from="n3" data-to="n5" d="M724 90 C764 90 750 140 790 140" marker-end="url(#flow-arrow-d-new)"/><path class="flow-edge" data-flow-edge data-from="n2" data-to="n4" d="M464 140 C504 140 482 190 522 190" marker-end="url(#flow-arrow-d-new)"/><path class="flow-edge" data-flow-edge data-from="n4" data-to="n5" d="M724 190 C764 190 750 140 790 140" marker-end="url(#flow-arrow-d-new)"/>
          <g class="flow-node flow-start" data-flow-node="n1" data-detail="Tuesday, 7:42pm. Reception has gone home and a new patient wants to register." tabindex="0" role="button" aria-label="New patient rings the clinic">
          <rect class="flow-box" x="8" y="107" width="196" height="66" rx="12"/>
          <circle class="flow-icon-bg" cx="38" cy="140" r="17"/>
          <use class="flow-icon" href="#i-phone-incoming" x="28" y="130" width="20" height="20"/>
          <text class="flow-text" x="64" y="135.5">New patient</text><text class="flow-text" x="64" y="154.5">rings the clinic</text>
        </g><g class="flow-node flow-agent" data-flow-node="n2" data-detail="It asks your new-patient questions, self-pay or insured, then looks at real availability." tabindex="0" role="button" aria-label="Agent takes details and checks slots">
          <rect class="flow-box" x="268" y="107" width="196" height="66" rx="12"/>
          <circle class="flow-icon-bg" cx="298" cy="140" r="17"/>
          <use class="flow-icon" href="#i-calendar" x="288" y="130" width="20" height="20"/>
          <text class="flow-text" x="324" y="135.5">Agent takes details</text><text class="flow-text" x="324" y="154.5">and checks slots</text>
        </g><g class="flow-node flow-ok" data-flow-node="n3" data-detail="The patient picks a time. The booking goes in your diary and a text with forms and directions goes out." tabindex="0" role="button" aria-label="First visit booked and forms sent">
          <rect class="flow-box" x="528" y="57" width="196" height="66" rx="12"/>
          <circle class="flow-icon-bg" cx="558" cy="90" r="17"/>
          <use class="flow-icon" href="#i-check" x="548" y="80" width="20" height="20"/>
          <text class="flow-text" x="584" y="85.5">First visit booked</text><text class="flow-text" x="584" y="104.5">and forms sent</text>
        </g><g class="flow-node flow-person" data-flow-node="n4" data-detail="If no slot works, the patient joins your waitlist and reception sees it first thing." tabindex="0" role="button" aria-label="Nothing suits: added to waitlist">
          <rect class="flow-box" x="528" y="157" width="196" height="66" rx="12"/>
          <circle class="flow-icon-bg" cx="558" cy="190" r="17"/>
          <use class="flow-icon" href="#i-message" x="548" y="180" width="20" height="20"/>
          <text class="flow-text" x="584" y="185.5">Nothing suits:</text><text class="flow-text" x="584" y="204.5">added to waitlist</text>
        </g><g class="flow-node flow-end" data-flow-node="n5" data-detail="A short written summary lands with the team, so nobody has to listen back." tabindex="0" role="button" aria-label="Summary sent to reception">
          <rect class="flow-box" x="796" y="107" width="196" height="66" rx="12"/>
          <circle class="flow-icon-bg" cx="826" cy="140" r="17"/>
          <use class="flow-icon" href="#i-mail" x="816" y="130" width="20" height="20"/>
          <text class="flow-text" x="852" y="135.5">Summary sent</text><text class="flow-text" x="852" y="154.5">to reception</text>
        </g>
        </svg>
        <svg viewBox="0 0 360 462" class="flow mx-auto h-auto w-full max-w-[420px] md:hidden" data-flow role="group" aria-label="New patient enquiry, step by step">
          <defs><marker id="flow-arrow-d-new-m" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" class="flow-arrow"/></marker></defs>
          <path class="flow-edge" data-flow-edge data-from="n1" data-to="n2" d="M180 70 V98" marker-end="url(#flow-arrow-d-new-m)"/><path class="flow-edge" data-flow-edge data-from="n2" data-to="n3" d="M40 135 H22 V231 H34" marker-end="url(#flow-arrow-d-new-m)"/><path class="flow-edge" data-flow-edge data-from="n3" data-to="n5" d="M320 231 H338 V423 H326" marker-end="url(#flow-arrow-d-new-m)"/><path class="flow-edge" data-flow-edge data-from="n2" data-to="n4" d="M40 135 H22 V327 H34" marker-end="url(#flow-arrow-d-new-m)"/><path class="flow-edge" data-flow-edge data-from="n4" data-to="n5" d="M320 327 H338 V423 H326" marker-end="url(#flow-arrow-d-new-m)"/>
          <g class="flow-node flow-start" data-flow-node="n1" data-detail="Tuesday, 7:42pm. Reception has gone home and a new patient wants to register." tabindex="0" role="button" aria-label="New patient rings the clinic">
          <rect class="flow-box" x="40" y="8" width="280" height="62" rx="12"/>
          <circle class="flow-icon-bg" cx="70" cy="39" r="17"/>
          <use class="flow-icon" href="#i-phone-incoming" x="60" y="29" width="20" height="20"/>
          <text class="flow-text" x="96" y="34.5">New patient</text><text class="flow-text" x="96" y="53.5">rings the clinic</text>
        </g><g class="flow-node flow-agent" data-flow-node="n2" data-detail="It asks your new-patient questions, self-pay or insured, then looks at real availability." tabindex="0" role="button" aria-label="Agent takes details and checks slots">
          <rect class="flow-box" x="40" y="104" width="280" height="62" rx="12"/>
          <circle class="flow-icon-bg" cx="70" cy="135" r="17"/>
          <use class="flow-icon" href="#i-calendar" x="60" y="125" width="20" height="20"/>
          <text class="flow-text" x="96" y="130.5">Agent takes details</text><text class="flow-text" x="96" y="149.5">and checks slots</text>
        </g><g class="flow-node flow-ok" data-flow-node="n3" data-detail="The patient picks a time. The booking goes in your diary and a text with forms and directions goes out." tabindex="0" role="button" aria-label="First visit booked and forms sent">
          <rect class="flow-box" x="40" y="200" width="280" height="62" rx="12"/>
          <circle class="flow-icon-bg" cx="70" cy="231" r="17"/>
          <use class="flow-icon" href="#i-check" x="60" y="221" width="20" height="20"/>
          <text class="flow-text" x="96" y="226.5">First visit booked</text><text class="flow-text" x="96" y="245.5">and forms sent</text>
        </g><g class="flow-node flow-person" data-flow-node="n4" data-detail="If no slot works, the patient joins your waitlist and reception sees it first thing." tabindex="0" role="button" aria-label="Nothing suits: added to waitlist">
          <rect class="flow-box" x="40" y="296" width="280" height="62" rx="12"/>
          <circle class="flow-icon-bg" cx="70" cy="327" r="17"/>
          <use class="flow-icon" href="#i-message" x="60" y="317" width="20" height="20"/>
          <text class="flow-text" x="96" y="322.5">Nothing suits:</text><text class="flow-text" x="96" y="341.5">added to waitlist</text>
        </g><g class="flow-node flow-end" data-flow-node="n5" data-detail="A short written summary lands with the team, so nobody has to listen back." tabindex="0" role="button" aria-label="Summary sent to reception">
          <rect class="flow-box" x="40" y="392" width="280" height="62" rx="12"/>
          <circle class="flow-icon-bg" cx="70" cy="423" r="17"/>
          <use class="flow-icon" href="#i-mail" x="60" y="413" width="20" height="20"/>
          <text class="flow-text" x="96" y="418.5">Summary sent</text><text class="flow-text" x="96" y="437.5">to reception</text>
        </g>
        </svg>
          <p class="mt-4 flex min-h-[56px] items-start gap-3 rounded-[10px] bg-sand px-4 py-3 text-[16.5px] leading-snug" aria-live="polite" data-flow-caption data-default="Tuesday, 7:42pm. Reception has gone home and a new patient wants to register."><svg class="icon mt-[3px] text-hl" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg><span data-flow-caption-text>Tuesday, 7:42pm. Reception has gone home and a new patient wants to register.</span></p>
        </div>
        <div class="mt-8 grid gap-8 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] lg:gap-12">
          <div>
            <p class="flex items-center gap-2 font-display text-[18px] font-semibold"><svg class="icon text-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg>What reception sees afterwards</p>
            <p class="mt-3 text-[16.5px] text-muted">A clear record your team can act on, without listening back to the call.</p>
            <p class="mt-4 text-[14.5px] text-muted">Illustrative example. The clinic and patients are fictional.</p>
          </div>
          <div class="card overflow-hidden">
            <div class="border-b border-line px-5 py-4"><p class="font-display text-[18px] font-semibold leading-tight">New patient</p><p class="text-[15px] text-muted">Albion Square Clinic, Manchester</p></div>
            <ul class="divide-y divide-line text-[16px]">
              <li class="grid grid-cols-[110px_minmax(0,1fr)] gap-3 px-5 py-3"><span class="text-muted">Name</span><span class="font-semibold">Ms R. Hughes</span></li><li class="grid grid-cols-[110px_minmax(0,1fr)] gap-3 px-5 py-3"><span class="text-muted">Preference</span><span class="font-semibold">Private, evenings if possible</span></li><li class="grid grid-cols-[110px_minmax(0,1fr)] gap-3 px-5 py-3"><span class="text-muted">Reason</span><span class="font-semibold">Appointment, last seen 3 years ago</span></li><li class="grid grid-cols-[110px_minmax(0,1fr)] gap-3 px-5 py-3"><span class="text-muted">Booked</span><span class="font-semibold">Thu 9:10 with Dr Patel</span></li>
            </ul>
            <p class="border-t border-line bg-sand px-5 py-3 text-[15px] leading-snug">Medical history form and directions sent by text at 19:44.</p>
          </div>
        </div>
      </div>
      <div data-wf-panel="urgent" hidden>
        <div class=""><h3>Urgent calls follow the route you set</h3><p class="mt-2 text-muted">The agent never assesses symptoms or gives advice. It follows your rules: a same-day slot, your emergency line, or NHS 111 details out of hours.</p></div>
        <div class="mt-7 rounded-[14px] border border-line bg-paper p-4 sm:p-6" data-flow-wrap>
          <div class="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 px-1 pb-4">
            <p class="flex items-center gap-2 font-display text-[18px] font-semibold"><svg class="icon text-hl" aria-hidden="true" focusable="false"><use href="#i-phone"/></svg>How the call flows</p>
            <p class="text-[15px] text-muted"><span class="md:hidden">Tap</span><span class="max-md:hidden">Hover or select</span> a step to see what happens</p>
          </div>
          <svg viewBox="0 0 1000 280" class="flow hidden h-auto w-full md:block" data-flow role="group" aria-label="Urgent call, step by step">
          <defs><marker id="flow-arrow-d-urgent" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" class="flow-arrow"/></marker></defs>
          <path class="flow-edge" data-flow-edge data-from="u1" data-to="u2" d="M204 140 H262" marker-end="url(#flow-arrow-d-urgent)"/><path class="flow-edge" data-flow-edge data-from="u2" data-to="u3" d="M464 140 C504 140 482 52 522 52" marker-end="url(#flow-arrow-d-urgent)"/><path class="flow-edge" data-flow-edge data-from="u3" data-to="u6" d="M724 52 C764 52 750 140 790 140" marker-end="url(#flow-arrow-d-urgent)"/><path class="flow-edge" data-flow-edge data-from="u2" data-to="u4" d="M464 140 C504 140 482 140 522 140" marker-end="url(#flow-arrow-d-urgent)"/><path class="flow-edge" data-flow-edge data-from="u4" data-to="u6" d="M724 140 C764 140 750 140 790 140" marker-end="url(#flow-arrow-d-urgent)"/><path class="flow-edge" data-flow-edge data-from="u2" data-to="u5" d="M464 140 C504 140 482 228 522 228" marker-end="url(#flow-arrow-d-urgent)"/><path class="flow-edge" data-flow-edge data-from="u5" data-to="u6" d="M724 228 C764 228 750 140 790 140" marker-end="url(#flow-arrow-d-urgent)"/>
          <g class="flow-node flow-start" data-flow-node="u1" data-detail="Monday, 7:55am. The patient has swelling and wants to be seen today." tabindex="0" role="button" aria-label="Patient in pain rings the clinic">
          <rect class="flow-box" x="8" y="107" width="196" height="66" rx="12"/>
          <circle class="flow-icon-bg" cx="38" cy="140" r="17"/>
          <use class="flow-icon" href="#i-phone-incoming" x="28" y="130" width="20" height="20"/>
          <text class="flow-text" x="64" y="135.5">Patient in pain</text><text class="flow-text" x="64" y="154.5">rings the clinic</text>
        </g><g class="flow-node flow-agent" data-flow-node="u2" data-detail="It says it cannot give medical advice and follows the route your clinic has set for urgent calls." tabindex="0" role="button" aria-label="Agent follows your urgent rules">
          <rect class="flow-box" x="268" y="107" width="196" height="66" rx="12"/>
          <circle class="flow-icon-bg" cx="298" cy="140" r="17"/>
          <use class="flow-icon" href="#i-shield" x="288" y="130" width="20" height="20"/>
          <text class="flow-text" x="324" y="135.5">Agent follows</text><text class="flow-text" x="324" y="154.5">your urgent rules</text>
        </g><g class="flow-node flow-ok" data-flow-node="u3" data-detail="In hours, it books one of your held emergency slots." tabindex="0" role="button" aria-label="Same-day emergency slot">
          <rect class="flow-box" x="528" y="19" width="196" height="66" rx="12"/>
          <circle class="flow-icon-bg" cx="558" cy="52" r="17"/>
          <use class="flow-icon" href="#i-calendar" x="548" y="42" width="20" height="20"/>
          <text class="flow-text" x="584" y="47.5">Same-day</text><text class="flow-text" x="584" y="66.5">emergency slot</text>
        </g><g class="flow-node flow-person" data-flow-node="u4" data-detail="If you prefer, it transfers straight to the dentist or nurse on call." tabindex="0" role="button" aria-label="Put through to your emergency line">
          <rect class="flow-box" x="528" y="107" width="196" height="66" rx="12"/>
          <circle class="flow-icon-bg" cx="558" cy="140" r="17"/>
          <use class="flow-icon" href="#i-phone-forwarded" x="548" y="130" width="20" height="20"/>
          <text class="flow-text" x="584" y="135.5">Put through to</text><text class="flow-text" x="584" y="154.5">your emergency line</text>
        </g><g class="flow-node flow-person" data-flow-node="u5" data-detail="Out of hours, it gives the details you choose, such as NHS 111, and logs the call." tabindex="0" role="button" aria-label="Out of hours: NHS 111 details">
          <rect class="flow-box" x="528" y="195" width="196" height="66" rx="12"/>
          <circle class="flow-icon-bg" cx="558" cy="228" r="17"/>
          <use class="flow-icon" href="#i-message" x="548" y="218" width="20" height="20"/>
          <text class="flow-text" x="584" y="223.5">Out of hours:</text><text class="flow-text" x="584" y="242.5">NHS 111 details</text>
        </g><g class="flow-node flow-end" data-flow-node="u6" data-detail="Urgent calls are flagged at the top of the morning summary." tabindex="0" role="button" aria-label="Flagged for the morning huddle">
          <rect class="flow-box" x="796" y="107" width="196" height="66" rx="12"/>
          <circle class="flow-icon-bg" cx="826" cy="140" r="17"/>
          <use class="flow-icon" href="#i-mail" x="816" y="130" width="20" height="20"/>
          <text class="flow-text" x="852" y="135.5">Flagged for the</text><text class="flow-text" x="852" y="154.5">morning huddle</text>
        </g>
        </svg>
        <svg viewBox="0 0 360 558" class="flow mx-auto h-auto w-full max-w-[420px] md:hidden" data-flow role="group" aria-label="Urgent call, step by step">
          <defs><marker id="flow-arrow-d-urgent-m" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" class="flow-arrow"/></marker></defs>
          <path class="flow-edge" data-flow-edge data-from="u1" data-to="u2" d="M180 70 V98" marker-end="url(#flow-arrow-d-urgent-m)"/><path class="flow-edge" data-flow-edge data-from="u2" data-to="u3" d="M40 135 H22 V231 H34" marker-end="url(#flow-arrow-d-urgent-m)"/><path class="flow-edge" data-flow-edge data-from="u3" data-to="u6" d="M320 231 H338 V519 H326" marker-end="url(#flow-arrow-d-urgent-m)"/><path class="flow-edge" data-flow-edge data-from="u2" data-to="u4" d="M40 135 H22 V327 H34" marker-end="url(#flow-arrow-d-urgent-m)"/><path class="flow-edge" data-flow-edge data-from="u4" data-to="u6" d="M320 327 H338 V519 H326" marker-end="url(#flow-arrow-d-urgent-m)"/><path class="flow-edge" data-flow-edge data-from="u2" data-to="u5" d="M40 135 H22 V423 H34" marker-end="url(#flow-arrow-d-urgent-m)"/><path class="flow-edge" data-flow-edge data-from="u5" data-to="u6" d="M320 423 H338 V519 H326" marker-end="url(#flow-arrow-d-urgent-m)"/>
          <g class="flow-node flow-start" data-flow-node="u1" data-detail="Monday, 7:55am. The patient has swelling and wants to be seen today." tabindex="0" role="button" aria-label="Patient in pain rings the clinic">
          <rect class="flow-box" x="40" y="8" width="280" height="62" rx="12"/>
          <circle class="flow-icon-bg" cx="70" cy="39" r="17"/>
          <use class="flow-icon" href="#i-phone-incoming" x="60" y="29" width="20" height="20"/>
          <text class="flow-text" x="96" y="34.5">Patient in pain</text><text class="flow-text" x="96" y="53.5">rings the clinic</text>
        </g><g class="flow-node flow-agent" data-flow-node="u2" data-detail="It says it cannot give medical advice and follows the route your clinic has set for urgent calls." tabindex="0" role="button" aria-label="Agent follows your urgent rules">
          <rect class="flow-box" x="40" y="104" width="280" height="62" rx="12"/>
          <circle class="flow-icon-bg" cx="70" cy="135" r="17"/>
          <use class="flow-icon" href="#i-shield" x="60" y="125" width="20" height="20"/>
          <text class="flow-text" x="96" y="130.5">Agent follows</text><text class="flow-text" x="96" y="149.5">your urgent rules</text>
        </g><g class="flow-node flow-ok" data-flow-node="u3" data-detail="In hours, it books one of your held emergency slots." tabindex="0" role="button" aria-label="Same-day emergency slot">
          <rect class="flow-box" x="40" y="200" width="280" height="62" rx="12"/>
          <circle class="flow-icon-bg" cx="70" cy="231" r="17"/>
          <use class="flow-icon" href="#i-calendar" x="60" y="221" width="20" height="20"/>
          <text class="flow-text" x="96" y="226.5">Same-day</text><text class="flow-text" x="96" y="245.5">emergency slot</text>
        </g><g class="flow-node flow-person" data-flow-node="u4" data-detail="If you prefer, it transfers straight to the dentist or nurse on call." tabindex="0" role="button" aria-label="Put through to your emergency line">
          <rect class="flow-box" x="40" y="296" width="280" height="62" rx="12"/>
          <circle class="flow-icon-bg" cx="70" cy="327" r="17"/>
          <use class="flow-icon" href="#i-phone-forwarded" x="60" y="317" width="20" height="20"/>
          <text class="flow-text" x="96" y="322.5">Put through to</text><text class="flow-text" x="96" y="341.5">your emergency line</text>
        </g><g class="flow-node flow-person" data-flow-node="u5" data-detail="Out of hours, it gives the details you choose, such as NHS 111, and logs the call." tabindex="0" role="button" aria-label="Out of hours: NHS 111 details">
          <rect class="flow-box" x="40" y="392" width="280" height="62" rx="12"/>
          <circle class="flow-icon-bg" cx="70" cy="423" r="17"/>
          <use class="flow-icon" href="#i-message" x="60" y="413" width="20" height="20"/>
          <text class="flow-text" x="96" y="418.5">Out of hours:</text><text class="flow-text" x="96" y="437.5">NHS 111 details</text>
        </g><g class="flow-node flow-end" data-flow-node="u6" data-detail="Urgent calls are flagged at the top of the morning summary." tabindex="0" role="button" aria-label="Flagged for the morning huddle">
          <rect class="flow-box" x="40" y="488" width="280" height="62" rx="12"/>
          <circle class="flow-icon-bg" cx="70" cy="519" r="17"/>
          <use class="flow-icon" href="#i-mail" x="60" y="509" width="20" height="20"/>
          <text class="flow-text" x="96" y="514.5">Flagged for the</text><text class="flow-text" x="96" y="533.5">morning huddle</text>
        </g>
        </svg>
          <p class="mt-4 flex min-h-[56px] items-start gap-3 rounded-[10px] bg-sand px-4 py-3 text-[16.5px] leading-snug" aria-live="polite" data-flow-caption data-default="Monday, 7:55am. The patient has swelling and wants to be seen today."><svg class="icon mt-[3px] text-hl" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg><span data-flow-caption-text>Monday, 7:55am. The patient has swelling and wants to be seen today.</span></p>
        </div>
        <div class="mt-8 grid gap-8 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] lg:gap-12">
          <div>
            <p class="flex items-center gap-2 font-display text-[18px] font-semibold"><svg class="icon text-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg>What reception sees afterwards</p>
            <p class="mt-3 text-[16.5px] text-muted">A clear record your team can act on, without listening back to the call.</p>
            <p class="mt-4 text-[14.5px] text-muted">Illustrative example. The clinic and patients are fictional.</p>
          </div>
          <div class="card overflow-hidden">
            <div class="border-b border-line px-5 py-4"><p class="font-display text-[18px] font-semibold leading-tight">Urgent calls</p><p class="text-[15px] text-muted">This morning</p></div>
            <ul class="divide-y divide-line text-[16px]">
              <li class="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-0.5 px-5 py-3"><span><span class="block text-[14px] text-muted tnum">07:55</span><span class="block leading-snug">Swelling, wants to be seen today</span></span><span class="chip">Booked 08:40</span></li><li class="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-0.5 px-5 py-3"><span><span class="block text-[14px] text-muted tnum">08:12</span><span class="block leading-snug">Broken crown, no pain</span></span><span class="chip">Booked 11:20</span></li><li class="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-0.5 px-5 py-3"><span><span class="block text-[14px] text-muted tnum">22:48</span><span class="block leading-snug">Pain at night</span></span><span class="chip">NHS 111 details given</span></li>
            </ul>
            <p class="border-t border-line bg-sand px-5 py-3 text-[15px] leading-snug">No symptoms assessed. Every urgent call followed the route the clinic set.</p>
          </div>
        </div>
      </div>
      <div data-wf-panel="recall" hidden>
        <div class=""><h3>Recalls that turn into bookings</h3><p class="mt-2 text-muted">Patients who have agreed to reminders get a call or text when they are due. The agent books their appointment or hygiene visit there and then.</p></div>
        <div class="mt-7 rounded-[14px] border border-line bg-paper p-4 sm:p-6" data-flow-wrap>
          <div class="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 px-1 pb-4">
            <p class="flex items-center gap-2 font-display text-[18px] font-semibold"><svg class="icon text-hl" aria-hidden="true" focusable="false"><use href="#i-phone"/></svg>How the call flows</p>
            <p class="text-[15px] text-muted"><span class="md:hidden">Tap</span><span class="max-md:hidden">Hover or select</span> a step to see what happens</p>
          </div>
          <svg viewBox="0 0 1000 280" class="flow hidden h-auto w-full md:block" data-flow role="group" aria-label="Recall, step by step">
          <defs><marker id="flow-arrow-d-recall" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" class="flow-arrow"/></marker></defs>
          <path class="flow-edge" data-flow-edge data-from="r1" data-to="r2" d="M204 140 H262" marker-end="url(#flow-arrow-d-recall)"/><path class="flow-edge" data-flow-edge data-from="r2" data-to="r3" d="M464 140 C504 140 482 90 522 90" marker-end="url(#flow-arrow-d-recall)"/><path class="flow-edge" data-flow-edge data-from="r3" data-to="r5" d="M724 90 C764 90 750 140 790 140" marker-end="url(#flow-arrow-d-recall)"/><path class="flow-edge" data-flow-edge data-from="r2" data-to="r4" d="M464 140 C504 140 482 190 522 190" marker-end="url(#flow-arrow-d-recall)"/><path class="flow-edge" data-flow-edge data-from="r4" data-to="r5" d="M724 190 C764 190 750 140 790 140" marker-end="url(#flow-arrow-d-recall)"/>
          <g class="flow-node flow-start" data-flow-node="r1" data-detail="Your recall list says the patient is due, and they agreed to reminders." tabindex="0" role="button" aria-label="Patient due a appointment">
          <rect class="flow-box" x="8" y="107" width="196" height="66" rx="12"/>
          <circle class="flow-icon-bg" cx="38" cy="140" r="17"/>
          <use class="flow-icon" href="#i-clock" x="28" y="130" width="20" height="20"/>
          <text class="flow-text" x="64" y="135.5">Patient due</text><text class="flow-text" x="64" y="154.5">a appointment</text>
        </g><g class="flow-node flow-agent" data-flow-node="r2" data-detail="It offers times from your diary, at hours you choose." tabindex="0" role="button" aria-label="Agent rings or texts with slots">
          <rect class="flow-box" x="268" y="107" width="196" height="66" rx="12"/>
          <circle class="flow-icon-bg" cx="298" cy="140" r="17"/>
          <use class="flow-icon" href="#i-phone-forwarded" x="288" y="130" width="20" height="20"/>
          <text class="flow-text" x="324" y="135.5">Agent rings or</text><text class="flow-text" x="324" y="154.5">texts with slots</text>
        </g><g class="flow-node flow-ok" data-flow-node="r3" data-detail="The patient picks a time and it goes straight into the diary." tabindex="0" role="button" aria-label="Appointment booked">
          <rect class="flow-box" x="528" y="57" width="196" height="66" rx="12"/>
          <circle class="flow-icon-bg" cx="558" cy="90" r="17"/>
          <use class="flow-icon" href="#i-check" x="548" y="80" width="20" height="20"/>
          <text class="flow-text" x="584" y="85.5">Appointment</text><text class="flow-text" x="584" y="104.5">booked</text>
        </g><g class="flow-node flow-person" data-flow-node="r4" data-detail="If it is not a good time, the agent notes when to try again. Opt-outs are removed straight away." tabindex="0" role="button" aria-label="Asked to be called later">
          <rect class="flow-box" x="528" y="157" width="196" height="66" rx="12"/>
          <circle class="flow-icon-bg" cx="558" cy="190" r="17"/>
          <use class="flow-icon" href="#i-message" x="548" y="180" width="20" height="20"/>
          <text class="flow-text" x="584" y="185.5">Asked to be</text><text class="flow-text" x="584" y="204.5">called later</text>
        </g><g class="flow-node flow-end" data-flow-node="r5" data-detail="Your list shows who booked, who asked to wait and who opted out." tabindex="0" role="button" aria-label="Recall list updated">
          <rect class="flow-box" x="796" y="107" width="196" height="66" rx="12"/>
          <circle class="flow-icon-bg" cx="826" cy="140" r="17"/>
          <use class="flow-icon" href="#i-mail" x="816" y="130" width="20" height="20"/>
          <text class="flow-text" x="852" y="135.5">Recall list</text><text class="flow-text" x="852" y="154.5">updated</text>
        </g>
        </svg>
        <svg viewBox="0 0 360 462" class="flow mx-auto h-auto w-full max-w-[420px] md:hidden" data-flow role="group" aria-label="Recall, step by step">
          <defs><marker id="flow-arrow-d-recall-m" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" class="flow-arrow"/></marker></defs>
          <path class="flow-edge" data-flow-edge data-from="r1" data-to="r2" d="M180 70 V98" marker-end="url(#flow-arrow-d-recall-m)"/><path class="flow-edge" data-flow-edge data-from="r2" data-to="r3" d="M40 135 H22 V231 H34" marker-end="url(#flow-arrow-d-recall-m)"/><path class="flow-edge" data-flow-edge data-from="r3" data-to="r5" d="M320 231 H338 V423 H326" marker-end="url(#flow-arrow-d-recall-m)"/><path class="flow-edge" data-flow-edge data-from="r2" data-to="r4" d="M40 135 H22 V327 H34" marker-end="url(#flow-arrow-d-recall-m)"/><path class="flow-edge" data-flow-edge data-from="r4" data-to="r5" d="M320 327 H338 V423 H326" marker-end="url(#flow-arrow-d-recall-m)"/>
          <g class="flow-node flow-start" data-flow-node="r1" data-detail="Your recall list says the patient is due, and they agreed to reminders." tabindex="0" role="button" aria-label="Patient due a appointment">
          <rect class="flow-box" x="40" y="8" width="280" height="62" rx="12"/>
          <circle class="flow-icon-bg" cx="70" cy="39" r="17"/>
          <use class="flow-icon" href="#i-clock" x="60" y="29" width="20" height="20"/>
          <text class="flow-text" x="96" y="34.5">Patient due</text><text class="flow-text" x="96" y="53.5">a appointment</text>
        </g><g class="flow-node flow-agent" data-flow-node="r2" data-detail="It offers times from your diary, at hours you choose." tabindex="0" role="button" aria-label="Agent rings or texts with slots">
          <rect class="flow-box" x="40" y="104" width="280" height="62" rx="12"/>
          <circle class="flow-icon-bg" cx="70" cy="135" r="17"/>
          <use class="flow-icon" href="#i-phone-forwarded" x="60" y="125" width="20" height="20"/>
          <text class="flow-text" x="96" y="130.5">Agent rings or</text><text class="flow-text" x="96" y="149.5">texts with slots</text>
        </g><g class="flow-node flow-ok" data-flow-node="r3" data-detail="The patient picks a time and it goes straight into the diary." tabindex="0" role="button" aria-label="Appointment booked">
          <rect class="flow-box" x="40" y="200" width="280" height="62" rx="12"/>
          <circle class="flow-icon-bg" cx="70" cy="231" r="17"/>
          <use class="flow-icon" href="#i-check" x="60" y="221" width="20" height="20"/>
          <text class="flow-text" x="96" y="226.5">Appointment</text><text class="flow-text" x="96" y="245.5">booked</text>
        </g><g class="flow-node flow-person" data-flow-node="r4" data-detail="If it is not a good time, the agent notes when to try again. Opt-outs are removed straight away." tabindex="0" role="button" aria-label="Asked to be called later">
          <rect class="flow-box" x="40" y="296" width="280" height="62" rx="12"/>
          <circle class="flow-icon-bg" cx="70" cy="327" r="17"/>
          <use class="flow-icon" href="#i-message" x="60" y="317" width="20" height="20"/>
          <text class="flow-text" x="96" y="322.5">Asked to be</text><text class="flow-text" x="96" y="341.5">called later</text>
        </g><g class="flow-node flow-end" data-flow-node="r5" data-detail="Your list shows who booked, who asked to wait and who opted out." tabindex="0" role="button" aria-label="Recall list updated">
          <rect class="flow-box" x="40" y="392" width="280" height="62" rx="12"/>
          <circle class="flow-icon-bg" cx="70" cy="423" r="17"/>
          <use class="flow-icon" href="#i-mail" x="60" y="413" width="20" height="20"/>
          <text class="flow-text" x="96" y="418.5">Recall list</text><text class="flow-text" x="96" y="437.5">updated</text>
        </g>
        </svg>
          <p class="mt-4 flex min-h-[56px] items-start gap-3 rounded-[10px] bg-sand px-4 py-3 text-[16.5px] leading-snug" aria-live="polite" data-flow-caption data-default="Your recall list says the patient is due, and they agreed to reminders."><svg class="icon mt-[3px] text-hl" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg><span data-flow-caption-text>Your recall list says the patient is due, and they agreed to reminders.</span></p>
        </div>
        <div class="mt-8 grid gap-8 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] lg:gap-12">
          <div>
            <p class="flex items-center gap-2 font-display text-[18px] font-semibold"><svg class="icon text-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg>What reception sees afterwards</p>
            <p class="mt-3 text-[16.5px] text-muted">A clear record your team can act on, without listening back to the call.</p>
            <p class="mt-4 text-[14.5px] text-muted">Illustrative example. The clinic and patients are fictional.</p>
          </div>
          <div class="card overflow-hidden">
            <div class="border-b border-line px-5 py-4"><p class="font-display text-[18px] font-semibold leading-tight">Recalls this week</p><p class="text-[15px] text-muted">Consented patients only</p></div>
            <ul class="divide-y divide-line text-[16px]">
              <li class="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-0.5 px-5 py-3"><span><span class="block text-[14px] text-muted tnum">Mr D. Ali</span><span class="block leading-snug">Appointment due</span></span><span class="chip">Booked, Mon 10:30</span></li><li class="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-0.5 px-5 py-3"><span><span class="block text-[14px] text-muted tnum">Mrs K. Kerr</span><span class="block leading-snug">Hygiene due</span></span><span class="chip">Booked, Wed 16:10</span></li><li class="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-0.5 px-5 py-3"><span><span class="block text-[14px] text-muted tnum">Mr P. Doyle</span><span class="block leading-snug">Appointment due</span></span><span class="chip">Call back Friday</span></li>
            </ul>
            <p class="border-t border-line bg-sand px-5 py-3 text-[15px] leading-snug">Every patient here agreed to recall reminders. Opt-outs are removed the same day.</p>
          </div>
        </div>
      </div>
      <div data-wf-panel="cancel" hidden>
        <div class=""><h3>Cancellations filled from your waitlist</h3><p class="mt-2 text-muted">When a patient cancels, the agent offers to rebook them and frees the slot. Patients on your waitlist who agreed to be contacted are offered it next.</p></div>
        <div class="mt-7 rounded-[14px] border border-line bg-paper p-4 sm:p-6" data-flow-wrap>
          <div class="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 px-1 pb-4">
            <p class="flex items-center gap-2 font-display text-[18px] font-semibold"><svg class="icon text-hl" aria-hidden="true" focusable="false"><use href="#i-phone"/></svg>How the call flows</p>
            <p class="text-[15px] text-muted"><span class="md:hidden">Tap</span><span class="max-md:hidden">Hover or select</span> a step to see what happens</p>
          </div>
          <svg viewBox="0 0 1000 280" class="flow hidden h-auto w-full md:block" data-flow role="group" aria-label="Cancellation, step by step">
          <defs><marker id="flow-arrow-d-cancel" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" class="flow-arrow"/></marker></defs>
          <path class="flow-edge" data-flow-edge data-from="c1" data-to="c2" d="M204 140 H262" marker-end="url(#flow-arrow-d-cancel)"/><path class="flow-edge" data-flow-edge data-from="c2" data-to="c3" d="M464 140 C504 140 482 90 522 90" marker-end="url(#flow-arrow-d-cancel)"/><path class="flow-edge" data-flow-edge data-from="c3" data-to="c5" d="M724 90 C764 90 750 140 790 140" marker-end="url(#flow-arrow-d-cancel)"/><path class="flow-edge" data-flow-edge data-from="c2" data-to="c4" d="M464 140 C504 140 482 190 522 190" marker-end="url(#flow-arrow-d-cancel)"/><path class="flow-edge" data-flow-edge data-from="c4" data-to="c5" d="M724 190 C764 190 750 140 790 140" marker-end="url(#flow-arrow-d-cancel)"/>
          <g class="flow-node flow-start" data-flow-node="c1" data-detail="A patient rings at 6:30pm to cancel tomorrow morning." tabindex="0" role="button" aria-label="Patient cancels tomorrow 10:00">
          <rect class="flow-box" x="8" y="107" width="196" height="66" rx="12"/>
          <circle class="flow-icon-bg" cx="38" cy="140" r="17"/>
          <use class="flow-icon" href="#i-phone-incoming" x="28" y="130" width="20" height="20"/>
          <text class="flow-text" x="64" y="135.5">Patient cancels</text><text class="flow-text" x="64" y="154.5">tomorrow 10:00</text>
        </g><g class="flow-node flow-agent" data-flow-node="c2" data-detail="It offers a new time first, then marks the 10:00 slot as free." tabindex="0" role="button" aria-label="Agent rebooks and frees the slot">
          <rect class="flow-box" x="268" y="107" width="196" height="66" rx="12"/>
          <circle class="flow-icon-bg" cx="298" cy="140" r="17"/>
          <use class="flow-icon" href="#i-calendar" x="288" y="130" width="20" height="20"/>
          <text class="flow-text" x="324" y="135.5">Agent rebooks</text><text class="flow-text" x="324" y="154.5">and frees the slot</text>
        </g><g class="flow-node flow-ok" data-flow-node="c3" data-detail="Waitlist patients who agreed to short-notice offers get a text. The first to reply gets the slot." tabindex="0" role="button" aria-label="Slot offered and filled">
          <rect class="flow-box" x="528" y="57" width="196" height="66" rx="12"/>
          <circle class="flow-icon-bg" cx="558" cy="90" r="17"/>
          <use class="flow-icon" href="#i-check" x="548" y="80" width="20" height="20"/>
          <text class="flow-text" x="584" y="85.5">Slot offered</text><text class="flow-text" x="584" y="104.5">and filled</text>
        </g><g class="flow-node flow-person" data-flow-node="c4" data-detail="If nobody takes it, reception sees the gap in the morning summary." tabindex="0" role="button" aria-label="Not filled: reception told">
          <rect class="flow-box" x="528" y="157" width="196" height="66" rx="12"/>
          <circle class="flow-icon-bg" cx="558" cy="190" r="17"/>
          <use class="flow-icon" href="#i-message" x="548" y="180" width="20" height="20"/>
          <text class="flow-text" x="584" y="185.5">Not filled:</text><text class="flow-text" x="584" y="204.5">reception told</text>
        </g><g class="flow-node flow-end" data-flow-node="c5" data-detail="The diary and waitlist stay in step without anyone touching them." tabindex="0" role="button" aria-label="Diary updated">
          <rect class="flow-box" x="796" y="107" width="196" height="66" rx="12"/>
          <circle class="flow-icon-bg" cx="826" cy="140" r="17"/>
          <use class="flow-icon" href="#i-mail" x="816" y="130" width="20" height="20"/>
          <text class="flow-text" x="852" y="135.5">Diary</text><text class="flow-text" x="852" y="154.5">updated</text>
        </g>
        </svg>
        <svg viewBox="0 0 360 462" class="flow mx-auto h-auto w-full max-w-[420px] md:hidden" data-flow role="group" aria-label="Cancellation, step by step">
          <defs><marker id="flow-arrow-d-cancel-m" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" class="flow-arrow"/></marker></defs>
          <path class="flow-edge" data-flow-edge data-from="c1" data-to="c2" d="M180 70 V98" marker-end="url(#flow-arrow-d-cancel-m)"/><path class="flow-edge" data-flow-edge data-from="c2" data-to="c3" d="M40 135 H22 V231 H34" marker-end="url(#flow-arrow-d-cancel-m)"/><path class="flow-edge" data-flow-edge data-from="c3" data-to="c5" d="M320 231 H338 V423 H326" marker-end="url(#flow-arrow-d-cancel-m)"/><path class="flow-edge" data-flow-edge data-from="c2" data-to="c4" d="M40 135 H22 V327 H34" marker-end="url(#flow-arrow-d-cancel-m)"/><path class="flow-edge" data-flow-edge data-from="c4" data-to="c5" d="M320 327 H338 V423 H326" marker-end="url(#flow-arrow-d-cancel-m)"/>
          <g class="flow-node flow-start" data-flow-node="c1" data-detail="A patient rings at 6:30pm to cancel tomorrow morning." tabindex="0" role="button" aria-label="Patient cancels tomorrow 10:00">
          <rect class="flow-box" x="40" y="8" width="280" height="62" rx="12"/>
          <circle class="flow-icon-bg" cx="70" cy="39" r="17"/>
          <use class="flow-icon" href="#i-phone-incoming" x="60" y="29" width="20" height="20"/>
          <text class="flow-text" x="96" y="34.5">Patient cancels</text><text class="flow-text" x="96" y="53.5">tomorrow 10:00</text>
        </g><g class="flow-node flow-agent" data-flow-node="c2" data-detail="It offers a new time first, then marks the 10:00 slot as free." tabindex="0" role="button" aria-label="Agent rebooks and frees the slot">
          <rect class="flow-box" x="40" y="104" width="280" height="62" rx="12"/>
          <circle class="flow-icon-bg" cx="70" cy="135" r="17"/>
          <use class="flow-icon" href="#i-calendar" x="60" y="125" width="20" height="20"/>
          <text class="flow-text" x="96" y="130.5">Agent rebooks</text><text class="flow-text" x="96" y="149.5">and frees the slot</text>
        </g><g class="flow-node flow-ok" data-flow-node="c3" data-detail="Waitlist patients who agreed to short-notice offers get a text. The first to reply gets the slot." tabindex="0" role="button" aria-label="Slot offered and filled">
          <rect class="flow-box" x="40" y="200" width="280" height="62" rx="12"/>
          <circle class="flow-icon-bg" cx="70" cy="231" r="17"/>
          <use class="flow-icon" href="#i-check" x="60" y="221" width="20" height="20"/>
          <text class="flow-text" x="96" y="226.5">Slot offered</text><text class="flow-text" x="96" y="245.5">and filled</text>
        </g><g class="flow-node flow-person" data-flow-node="c4" data-detail="If nobody takes it, reception sees the gap in the morning summary." tabindex="0" role="button" aria-label="Not filled: reception told">
          <rect class="flow-box" x="40" y="296" width="280" height="62" rx="12"/>
          <circle class="flow-icon-bg" cx="70" cy="327" r="17"/>
          <use class="flow-icon" href="#i-message" x="60" y="317" width="20" height="20"/>
          <text class="flow-text" x="96" y="322.5">Not filled:</text><text class="flow-text" x="96" y="341.5">reception told</text>
        </g><g class="flow-node flow-end" data-flow-node="c5" data-detail="The diary and waitlist stay in step without anyone touching them." tabindex="0" role="button" aria-label="Diary updated">
          <rect class="flow-box" x="40" y="392" width="280" height="62" rx="12"/>
          <circle class="flow-icon-bg" cx="70" cy="423" r="17"/>
          <use class="flow-icon" href="#i-mail" x="60" y="413" width="20" height="20"/>
          <text class="flow-text" x="96" y="418.5">Diary</text><text class="flow-text" x="96" y="437.5">updated</text>
        </g>
        </svg>
          <p class="mt-4 flex min-h-[56px] items-start gap-3 rounded-[10px] bg-sand px-4 py-3 text-[16.5px] leading-snug" aria-live="polite" data-flow-caption data-default="A patient rings at 6:30pm to cancel tomorrow morning."><svg class="icon mt-[3px] text-hl" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg><span data-flow-caption-text>A patient rings at 6:30pm to cancel tomorrow morning.</span></p>
        </div>
        <div class="mt-8 grid gap-8 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] lg:gap-12">
          <div>
            <p class="flex items-center gap-2 font-display text-[18px] font-semibold"><svg class="icon text-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg>What reception sees afterwards</p>
            <p class="mt-3 text-[16.5px] text-muted">A clear record your team can act on, without listening back to the call.</p>
            <p class="mt-4 text-[14.5px] text-muted">Illustrative example. The clinic and patients are fictional.</p>
          </div>
          <div class="card overflow-hidden">
            <div class="border-b border-line px-5 py-4"><p class="font-display text-[18px] font-semibold leading-tight">Tomorrow, 10:00</p><p class="text-[15px] text-muted">Dr Patel, consulting room 2</p></div>
            <ul class="divide-y divide-line text-[16px]">
              <li class="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-0.5 px-5 py-3"><span><span class="block text-[14px] text-muted tnum">18:31</span><span class="block leading-snug">Mrs Ford cancelled</span></span><span class="chip">Rebooked for Fri</span></li><li class="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-0.5 px-5 py-3"><span><span class="block text-[14px] text-muted tnum">18:32</span><span class="block leading-snug">Offered to 3 waitlist patients</span></span><span class="chip">Text sent</span></li><li class="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-0.5 px-5 py-3"><span><span class="block text-[14px] text-muted tnum">18:47</span><span class="block leading-snug">Mr Shah accepted</span></span><span class="chip">Slot filled</span></li>
            </ul>
            <p class="border-t border-line bg-sand px-5 py-3 text-[15px] leading-snug">Only patients who agreed to short-notice offers are contacted.</p>
          </div>
        </div>
      </div>
      <div data-wf-panel="treatment" hidden>
        <div class=""><h3>High-value enquiries answered and booked</h3><p class="mt-2 text-muted">Questions about scans, injections or a course of physiotherapy are answered from information you approve. The agent books a consultation and passes clinical questions to your team.</p></div>
        <div class="mt-7 rounded-[14px] border border-line bg-paper p-4 sm:p-6" data-flow-wrap>
          <div class="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 px-1 pb-4">
            <p class="flex items-center gap-2 font-display text-[18px] font-semibold"><svg class="icon text-hl" aria-hidden="true" focusable="false"><use href="#i-phone"/></svg>How the call flows</p>
            <p class="text-[15px] text-muted"><span class="md:hidden">Tap</span><span class="max-md:hidden">Hover or select</span> a step to see what happens</p>
          </div>
          <svg viewBox="0 0 1000 280" class="flow hidden h-auto w-full md:block" data-flow role="group" aria-label="Treatment enquiry, step by step">
          <defs><marker id="flow-arrow-d-treatment" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" class="flow-arrow"/></marker></defs>
          <path class="flow-edge" data-flow-edge data-from="t1" data-to="t2" d="M204 140 H262" marker-end="url(#flow-arrow-d-treatment)"/><path class="flow-edge" data-flow-edge data-from="t2" data-to="t3" d="M464 140 C504 140 482 90 522 90" marker-end="url(#flow-arrow-d-treatment)"/><path class="flow-edge" data-flow-edge data-from="t3" data-to="t5" d="M724 90 C764 90 750 140 790 140" marker-end="url(#flow-arrow-d-treatment)"/><path class="flow-edge" data-flow-edge data-from="t2" data-to="t4" d="M464 140 C504 140 482 190 522 190" marker-end="url(#flow-arrow-d-treatment)"/><path class="flow-edge" data-flow-edge data-from="t4" data-to="t5" d="M724 190 C764 190 750 140 790 140" marker-end="url(#flow-arrow-d-treatment)"/>
          <g class="flow-node flow-start" data-flow-node="t1" data-detail="Saturday, 11:20am. A caller wants to know what an ultrasound costs and whether Bupa covers it." tabindex="0" role="button" aria-label="Caller asks about a scan">
          <rect class="flow-box" x="8" y="107" width="196" height="66" rx="12"/>
          <circle class="flow-icon-bg" cx="38" cy="140" r="17"/>
          <use class="flow-icon" href="#i-phone-incoming" x="28" y="130" width="20" height="20"/>
          <text class="flow-text" x="64" y="135.5">Caller asks</text><text class="flow-text" x="64" y="154.5">about a scan</text>
        </g><g class="flow-node flow-agent" data-flow-node="t2" data-detail="It explains what you offer, starting prices from your list and finance options you have approved." tabindex="0" role="button" aria-label="Agent answers from your approved info">
          <rect class="flow-box" x="268" y="107" width="196" height="66" rx="12"/>
          <circle class="flow-icon-bg" cx="298" cy="140" r="17"/>
          <use class="flow-icon" href="#i-shield" x="288" y="130" width="20" height="20"/>
          <text class="flow-text" x="324" y="135.5">Agent answers from</text><text class="flow-text" x="324" y="154.5">your approved info</text>
        </g><g class="flow-node flow-ok" data-flow-node="t3" data-detail="The caller books a consultation with your treatment coordinator." tabindex="0" role="button" aria-label="Consultation booked">
          <rect class="flow-box" x="528" y="57" width="196" height="66" rx="12"/>
          <circle class="flow-icon-bg" cx="558" cy="90" r="17"/>
          <use class="flow-icon" href="#i-calendar" x="548" y="80" width="20" height="20"/>
          <text class="flow-text" x="584" y="85.5">Consultation</text><text class="flow-text" x="584" y="104.5">booked</text>
        </g><g class="flow-node flow-person" data-flow-node="t4" data-detail="Anything about suitability or treatment goes to a dentist to call back." tabindex="0" role="button" aria-label="Clinical question: dentist calls back">
          <rect class="flow-box" x="528" y="157" width="196" height="66" rx="12"/>
          <circle class="flow-icon-bg" cx="558" cy="190" r="17"/>
          <use class="flow-icon" href="#i-message" x="548" y="180" width="20" height="20"/>
          <text class="flow-text" x="584" y="185.5">Clinical question:</text><text class="flow-text" x="584" y="204.5">dentist calls back</text>
        </g><g class="flow-node flow-end" data-flow-node="t5" data-detail="The enquiry, budget and timing go to your coordinator the same day." tabindex="0" role="button" aria-label="Lead sent to your coordinator">
          <rect class="flow-box" x="796" y="107" width="196" height="66" rx="12"/>
          <circle class="flow-icon-bg" cx="826" cy="140" r="17"/>
          <use class="flow-icon" href="#i-mail" x="816" y="130" width="20" height="20"/>
          <text class="flow-text" x="852" y="135.5">Lead sent to your</text><text class="flow-text" x="852" y="154.5">coordinator</text>
        </g>
        </svg>
        <svg viewBox="0 0 360 462" class="flow mx-auto h-auto w-full max-w-[420px] md:hidden" data-flow role="group" aria-label="Treatment enquiry, step by step">
          <defs><marker id="flow-arrow-d-treatment-m" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" class="flow-arrow"/></marker></defs>
          <path class="flow-edge" data-flow-edge data-from="t1" data-to="t2" d="M180 70 V98" marker-end="url(#flow-arrow-d-treatment-m)"/><path class="flow-edge" data-flow-edge data-from="t2" data-to="t3" d="M40 135 H22 V231 H34" marker-end="url(#flow-arrow-d-treatment-m)"/><path class="flow-edge" data-flow-edge data-from="t3" data-to="t5" d="M320 231 H338 V423 H326" marker-end="url(#flow-arrow-d-treatment-m)"/><path class="flow-edge" data-flow-edge data-from="t2" data-to="t4" d="M40 135 H22 V327 H34" marker-end="url(#flow-arrow-d-treatment-m)"/><path class="flow-edge" data-flow-edge data-from="t4" data-to="t5" d="M320 327 H338 V423 H326" marker-end="url(#flow-arrow-d-treatment-m)"/>
          <g class="flow-node flow-start" data-flow-node="t1" data-detail="Saturday, 11:20am. A caller wants to know what an ultrasound costs and whether Bupa covers it." tabindex="0" role="button" aria-label="Caller asks about a scan">
          <rect class="flow-box" x="40" y="8" width="280" height="62" rx="12"/>
          <circle class="flow-icon-bg" cx="70" cy="39" r="17"/>
          <use class="flow-icon" href="#i-phone-incoming" x="60" y="29" width="20" height="20"/>
          <text class="flow-text" x="96" y="34.5">Caller asks</text><text class="flow-text" x="96" y="53.5">about a scan</text>
        </g><g class="flow-node flow-agent" data-flow-node="t2" data-detail="It explains what you offer, starting prices from your list and finance options you have approved." tabindex="0" role="button" aria-label="Agent answers from your approved info">
          <rect class="flow-box" x="40" y="104" width="280" height="62" rx="12"/>
          <circle class="flow-icon-bg" cx="70" cy="135" r="17"/>
          <use class="flow-icon" href="#i-shield" x="60" y="125" width="20" height="20"/>
          <text class="flow-text" x="96" y="130.5">Agent answers from</text><text class="flow-text" x="96" y="149.5">your approved info</text>
        </g><g class="flow-node flow-ok" data-flow-node="t3" data-detail="The caller books a consultation with your treatment coordinator." tabindex="0" role="button" aria-label="Consultation booked">
          <rect class="flow-box" x="40" y="200" width="280" height="62" rx="12"/>
          <circle class="flow-icon-bg" cx="70" cy="231" r="17"/>
          <use class="flow-icon" href="#i-calendar" x="60" y="221" width="20" height="20"/>
          <text class="flow-text" x="96" y="226.5">Consultation</text><text class="flow-text" x="96" y="245.5">booked</text>
        </g><g class="flow-node flow-person" data-flow-node="t4" data-detail="Anything about suitability or treatment goes to a dentist to call back." tabindex="0" role="button" aria-label="Clinical question: dentist calls back">
          <rect class="flow-box" x="40" y="296" width="280" height="62" rx="12"/>
          <circle class="flow-icon-bg" cx="70" cy="327" r="17"/>
          <use class="flow-icon" href="#i-message" x="60" y="317" width="20" height="20"/>
          <text class="flow-text" x="96" y="322.5">Clinical question:</text><text class="flow-text" x="96" y="341.5">dentist calls back</text>
        </g><g class="flow-node flow-end" data-flow-node="t5" data-detail="The enquiry, budget and timing go to your coordinator the same day." tabindex="0" role="button" aria-label="Lead sent to your coordinator">
          <rect class="flow-box" x="40" y="392" width="280" height="62" rx="12"/>
          <circle class="flow-icon-bg" cx="70" cy="423" r="17"/>
          <use class="flow-icon" href="#i-mail" x="60" y="413" width="20" height="20"/>
          <text class="flow-text" x="96" y="418.5">Lead sent to your</text><text class="flow-text" x="96" y="437.5">coordinator</text>
        </g>
        </svg>
          <p class="mt-4 flex min-h-[56px] items-start gap-3 rounded-[10px] bg-sand px-4 py-3 text-[16.5px] leading-snug" aria-live="polite" data-flow-caption data-default="Saturday, 11:20am. A caller wants to know what an ultrasound costs and whether Bupa covers it."><svg class="icon mt-[3px] text-hl" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg><span data-flow-caption-text>Saturday, 11:20am. A caller wants to know what an ultrasound costs and whether Bupa covers it.</span></p>
        </div>
        <div class="mt-8 grid gap-8 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] lg:gap-12">
          <div>
            <p class="flex items-center gap-2 font-display text-[18px] font-semibold"><svg class="icon text-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg>What reception sees afterwards</p>
            <p class="mt-3 text-[16.5px] text-muted">A clear record your team can act on, without listening back to the call.</p>
            <p class="mt-4 text-[14.5px] text-muted">Illustrative example. The clinic and patients are fictional.</p>
          </div>
          <div class="card overflow-hidden">
            <div class="border-b border-line px-5 py-4"><p class="font-display text-[18px] font-semibold leading-tight">Treatment enquiries</p><p class="text-[15px] text-muted">This week</p></div>
            <ul class="divide-y divide-line text-[16px]">
              <li class="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-0.5 px-5 py-3"><span><span class="block text-[14px] text-muted tnum">Physiotherapys</span><span class="block leading-snug">Ms Rowe, wants to start in spring</span></span><span class="chip">Consult booked</span></li><li class="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-0.5 px-5 py-3"><span><span class="block text-[14px] text-muted tnum">Ultrasound</span><span class="block leading-snug">Mr Grant, shoulder, Bupa</span></span><span class="chip">Dentist to call</span></li><li class="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-0.5 px-5 py-3"><span><span class="block text-[14px] text-muted tnum">Dermatology</span><span class="block leading-snug">Mrs Bell, self-pay</span></span><span class="chip">Consult booked</span></li>
            </ul>
            <p class="border-t border-line bg-sand px-5 py-3 text-[15px] leading-snug">Prices quoted only from the clinic’s approved list.</p>
          </div>
        </div>
      </div>
      <div data-wf-panel="fees" hidden>
        <div class=""><h3>Everyday questions off reception’s plate</h3><p class="mt-2 text-muted">Fees, payment plans, opening hours, parking and directions make up a large share of calls. The agent answers from your approved information and hands over anything else.</p></div>
        <div class="mt-7 rounded-[14px] border border-line bg-paper p-4 sm:p-6" data-flow-wrap>
          <div class="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 px-1 pb-4">
            <p class="flex items-center gap-2 font-display text-[18px] font-semibold"><svg class="icon text-hl" aria-hidden="true" focusable="false"><use href="#i-phone"/></svg>How the call flows</p>
            <p class="text-[15px] text-muted"><span class="md:hidden">Tap</span><span class="max-md:hidden">Hover or select</span> a step to see what happens</p>
          </div>
          <svg viewBox="0 0 1000 280" class="flow hidden h-auto w-full md:block" data-flow role="group" aria-label="Fees question, step by step">
          <defs><marker id="flow-arrow-d-fees" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" class="flow-arrow"/></marker></defs>
          <path class="flow-edge" data-flow-edge data-from="f1" data-to="f2" d="M204 140 H262" marker-end="url(#flow-arrow-d-fees)"/><path class="flow-edge" data-flow-edge data-from="f2" data-to="f3" d="M464 140 C504 140 482 90 522 90" marker-end="url(#flow-arrow-d-fees)"/><path class="flow-edge" data-flow-edge data-from="f3" data-to="f5" d="M724 90 C764 90 750 140 790 140" marker-end="url(#flow-arrow-d-fees)"/><path class="flow-edge" data-flow-edge data-from="f2" data-to="f4" d="M464 140 C504 140 482 190 522 190" marker-end="url(#flow-arrow-d-fees)"/><path class="flow-edge" data-flow-edge data-from="f4" data-to="f5" d="M724 190 C764 190 750 140 790 140" marker-end="url(#flow-arrow-d-fees)"/>
          <g class="flow-node flow-start" data-flow-node="f1" data-detail="Wednesday, 1:05pm. Reception is at lunch and the phone keeps ringing." tabindex="0" role="button" aria-label="Caller asks about fees">
          <rect class="flow-box" x="8" y="107" width="196" height="66" rx="12"/>
          <circle class="flow-icon-bg" cx="38" cy="140" r="17"/>
          <use class="flow-icon" href="#i-phone-incoming" x="28" y="130" width="20" height="20"/>
          <text class="flow-text" x="64" y="135.5">Caller asks</text><text class="flow-text" x="64" y="154.5">about fees</text>
        </g><g class="flow-node flow-agent" data-flow-node="f2" data-detail="It only uses figures and policies you have signed off." tabindex="0" role="button" aria-label="Agent checks your price list">
          <rect class="flow-box" x="268" y="107" width="196" height="66" rx="12"/>
          <circle class="flow-icon-bg" cx="298" cy="140" r="17"/>
          <use class="flow-icon" href="#i-shield" x="288" y="130" width="20" height="20"/>
          <text class="flow-text" x="324" y="135.5">Agent checks</text><text class="flow-text" x="324" y="154.5">your price list</text>
        </g><g class="flow-node flow-ok" data-flow-node="f3" data-detail="Appointment fee, plan options and parking answered straight away." tabindex="0" role="button" aria-label="Answered on the call">
          <rect class="flow-box" x="528" y="57" width="196" height="66" rx="12"/>
          <circle class="flow-icon-bg" cx="558" cy="90" r="17"/>
          <use class="flow-icon" href="#i-check" x="548" y="80" width="20" height="20"/>
          <text class="flow-text" x="584" y="85.5">Answered</text><text class="flow-text" x="584" y="104.5">on the call</text>
        </g><g class="flow-node flow-person" data-flow-node="f4" data-detail="Questions about an existing bill go to the person who handles accounts." tabindex="0" role="button" aria-label="Billing query: passed to the team">
          <rect class="flow-box" x="528" y="157" width="196" height="66" rx="12"/>
          <circle class="flow-icon-bg" cx="558" cy="190" r="17"/>
          <use class="flow-icon" href="#i-phone-forwarded" x="548" y="180" width="20" height="20"/>
          <text class="flow-text" x="584" y="185.5">Billing query:</text><text class="flow-text" x="584" y="204.5">passed to the team</text>
        </g><g class="flow-node flow-end" data-flow-node="f5" data-detail="Every call is summarised, so reception can see what was asked." tabindex="0" role="button" aria-label="Summary emailed">
          <rect class="flow-box" x="796" y="107" width="196" height="66" rx="12"/>
          <circle class="flow-icon-bg" cx="826" cy="140" r="17"/>
          <use class="flow-icon" href="#i-mail" x="816" y="130" width="20" height="20"/>
          <text class="flow-text" x="852" y="135.5">Summary</text><text class="flow-text" x="852" y="154.5">emailed</text>
        </g>
        </svg>
        <svg viewBox="0 0 360 462" class="flow mx-auto h-auto w-full max-w-[420px] md:hidden" data-flow role="group" aria-label="Fees question, step by step">
          <defs><marker id="flow-arrow-d-fees-m" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" class="flow-arrow"/></marker></defs>
          <path class="flow-edge" data-flow-edge data-from="f1" data-to="f2" d="M180 70 V98" marker-end="url(#flow-arrow-d-fees-m)"/><path class="flow-edge" data-flow-edge data-from="f2" data-to="f3" d="M40 135 H22 V231 H34" marker-end="url(#flow-arrow-d-fees-m)"/><path class="flow-edge" data-flow-edge data-from="f3" data-to="f5" d="M320 231 H338 V423 H326" marker-end="url(#flow-arrow-d-fees-m)"/><path class="flow-edge" data-flow-edge data-from="f2" data-to="f4" d="M40 135 H22 V327 H34" marker-end="url(#flow-arrow-d-fees-m)"/><path class="flow-edge" data-flow-edge data-from="f4" data-to="f5" d="M320 327 H338 V423 H326" marker-end="url(#flow-arrow-d-fees-m)"/>
          <g class="flow-node flow-start" data-flow-node="f1" data-detail="Wednesday, 1:05pm. Reception is at lunch and the phone keeps ringing." tabindex="0" role="button" aria-label="Caller asks about fees">
          <rect class="flow-box" x="40" y="8" width="280" height="62" rx="12"/>
          <circle class="flow-icon-bg" cx="70" cy="39" r="17"/>
          <use class="flow-icon" href="#i-phone-incoming" x="60" y="29" width="20" height="20"/>
          <text class="flow-text" x="96" y="34.5">Caller asks</text><text class="flow-text" x="96" y="53.5">about fees</text>
        </g><g class="flow-node flow-agent" data-flow-node="f2" data-detail="It only uses figures and policies you have signed off." tabindex="0" role="button" aria-label="Agent checks your price list">
          <rect class="flow-box" x="40" y="104" width="280" height="62" rx="12"/>
          <circle class="flow-icon-bg" cx="70" cy="135" r="17"/>
          <use class="flow-icon" href="#i-shield" x="60" y="125" width="20" height="20"/>
          <text class="flow-text" x="96" y="130.5">Agent checks</text><text class="flow-text" x="96" y="149.5">your price list</text>
        </g><g class="flow-node flow-ok" data-flow-node="f3" data-detail="Appointment fee, plan options and parking answered straight away." tabindex="0" role="button" aria-label="Answered on the call">
          <rect class="flow-box" x="40" y="200" width="280" height="62" rx="12"/>
          <circle class="flow-icon-bg" cx="70" cy="231" r="17"/>
          <use class="flow-icon" href="#i-check" x="60" y="221" width="20" height="20"/>
          <text class="flow-text" x="96" y="226.5">Answered</text><text class="flow-text" x="96" y="245.5">on the call</text>
        </g><g class="flow-node flow-person" data-flow-node="f4" data-detail="Questions about an existing bill go to the person who handles accounts." tabindex="0" role="button" aria-label="Billing query: passed to the team">
          <rect class="flow-box" x="40" y="296" width="280" height="62" rx="12"/>
          <circle class="flow-icon-bg" cx="70" cy="327" r="17"/>
          <use class="flow-icon" href="#i-phone-forwarded" x="60" y="317" width="20" height="20"/>
          <text class="flow-text" x="96" y="322.5">Billing query:</text><text class="flow-text" x="96" y="341.5">passed to the team</text>
        </g><g class="flow-node flow-end" data-flow-node="f5" data-detail="Every call is summarised, so reception can see what was asked." tabindex="0" role="button" aria-label="Summary emailed">
          <rect class="flow-box" x="40" y="392" width="280" height="62" rx="12"/>
          <circle class="flow-icon-bg" cx="70" cy="423" r="17"/>
          <use class="flow-icon" href="#i-mail" x="60" y="413" width="20" height="20"/>
          <text class="flow-text" x="96" y="418.5">Summary</text><text class="flow-text" x="96" y="437.5">emailed</text>
        </g>
        </svg>
          <p class="mt-4 flex min-h-[56px] items-start gap-3 rounded-[10px] bg-sand px-4 py-3 text-[16.5px] leading-snug" aria-live="polite" data-flow-caption data-default="Wednesday, 1:05pm. Reception is at lunch and the phone keeps ringing."><svg class="icon mt-[3px] text-hl" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg><span data-flow-caption-text>Wednesday, 1:05pm. Reception is at lunch and the phone keeps ringing.</span></p>
        </div>
        <div class="mt-8 grid gap-8 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] lg:gap-12">
          <div>
            <p class="flex items-center gap-2 font-display text-[18px] font-semibold"><svg class="icon text-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg>What reception sees afterwards</p>
            <p class="mt-3 text-[16.5px] text-muted">A clear record your team can act on, without listening back to the call.</p>
            <p class="mt-4 text-[14.5px] text-muted">Illustrative example. The clinic and patients are fictional.</p>
          </div>
          <div class="card overflow-hidden">
            <div class="border-b border-line px-5 py-4"><p class="font-display text-[18px] font-semibold leading-tight">Questions answered</p><p class="text-[15px] text-muted">Lunchtime, Wednesday</p></div>
            <ul class="divide-y divide-line text-[16px]">
              <li class="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-0.5 px-5 py-3"><span><span class="block text-[14px] text-muted tnum">13:05</span><span class="block leading-snug">Private appointment fee</span></span><span class="chip">Answered</span></li><li class="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-0.5 px-5 py-3"><span><span class="block text-[14px] text-muted tnum">13:11</span><span class="block leading-snug">Monthly plan options</span></span><span class="chip">Answered</span></li><li class="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-0.5 px-5 py-3"><span><span class="block text-[14px] text-muted tnum">13:24</span><span class="block leading-snug">Query about last invoice</span></span><span class="chip">Passed to accounts</span></li>
            </ul>
            <p class="border-t border-line bg-sand px-5 py-3 text-[15px] leading-snug">Answers come only from information the clinic approved.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


<!-- ===== COMPONENT: ClinicFeatures ===== -->
<section id="features" data-component="ClinicFeatures" class="bg-surface">
  <div class="container-omh py-20 lg:py-28" data-ft>
    <div>
      <div><p class="eyebrow"><span class="eyebrow-mark" aria-hidden="true"><i></i><i></i><i></i></span>Features</p><h2>Everything your front desk <span class="hl">needs from a phone</span></h2></div>
      <p class="mt-5 text-muted">Set up, tested and looked after by OMH. Pick who it's for to see what matters to them.</p>
    </div>
    <div class="mt-9 flex flex-wrap gap-2" role="group" aria-label="Show features for">
      <button type="button" class="min-h-[44px] rounded-full border border-[var(--line-strong)] bg-surface px-4 text-[15.5px] font-semibold aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-paper" aria-pressed="true" data-ft-filter="all" data-track="clinic_features_filter" data-track-name="Everything">Everything</button>
      <button type="button" class="min-h-[44px] rounded-full border border-[var(--line-strong)] bg-surface px-4 text-[15.5px] font-semibold aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-paper" aria-pressed="false" data-ft-filter="patients" data-track="clinic_features_filter" data-track-name="For patients">For patients</button>
      <button type="button" class="min-h-[44px] rounded-full border border-[var(--line-strong)] bg-surface px-4 text-[15.5px] font-semibold aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-paper" aria-pressed="false" data-ft-filter="reception" data-track="clinic_features_filter" data-track-name="For reception">For reception</button>
      <button type="button" class="min-h-[44px] rounded-full border border-[var(--line-strong)] bg-surface px-4 text-[15.5px] font-semibold aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-paper" aria-pressed="false" data-ft-filter="owners" data-track="clinic_features_filter" data-track-name="For clinic owners">For clinic owners</button>
    </div>
    <p class="sr-only" aria-live="polite" data-ft-status></p>
    <ul class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <li class="ft-card group flex flex-col rounded-[18px] border border-line bg-paper p-5" data-ft-who="patients">
        <span class="grid h-11 w-11 place-items-center rounded-[12px] bg-gold/20 text-hl transition-colors group-hover:bg-gold group-hover:text-navy" aria-hidden="true"><svg class="icon !h-5 !w-5" aria-hidden="true" focusable="false"><use href="#i-phone-incoming"/></svg></span>
        <h3 class="mt-4 !text-[19px] !leading-snug">Answers on the first ring</h3>
        <p class="mt-1.5 flex-1 text-[15.5px] leading-snug text-muted">Lunchtimes, evenings, weekends and bank holidays. No voicemail, no hold music.</p>
        <p class="mt-4 flex flex-wrap items-center gap-1.5"><span class="chip">All plans</span></p>
      </li>
      <li class="ft-card group flex flex-col rounded-[18px] border border-line bg-paper p-5" data-ft-who="patients">
        <span class="grid h-11 w-11 place-items-center rounded-[12px] bg-gold/20 text-hl transition-colors group-hover:bg-gold group-hover:text-navy" aria-hidden="true"><svg class="icon !h-5 !w-5" aria-hidden="true" focusable="false"><use href="#i-message"/></svg></span>
        <h3 class="mt-4 !text-[19px] !leading-snug">Your clinic name and voice</h3>
        <p class="mt-1.5 flex-1 text-[15.5px] leading-snug text-muted">A calm British voice with your greeting, your hours and the way your team talks.</p>
        <p class="mt-4 flex flex-wrap items-center gap-1.5"><span class="chip">All plans</span></p>
      </li>
      <li class="ft-card group flex flex-col rounded-[18px] border border-line bg-paper p-5" data-ft-who="patients">
        <span class="grid h-11 w-11 place-items-center rounded-[12px] bg-gold/20 text-hl transition-colors group-hover:bg-gold group-hover:text-navy" aria-hidden="true"><svg class="icon !h-5 !w-5" aria-hidden="true" focusable="false"><use href="#i-phone"/></svg></span>
        <h3 class="mt-4 !text-[19px] !leading-snug">No engaged tone</h3>
        <p class="mt-1.5 flex-1 text-[15.5px] leading-snug text-muted">Several patients can ring at once during the 8am rush and every one gets answered.</p>
        <p class="mt-4 flex flex-wrap items-center gap-1.5"><span class="chip">All plans</span><span class="flag">[CONFIRM]</span></p>
      </li>
      <li class="ft-card group flex flex-col rounded-[18px] border border-line bg-paper p-5" data-ft-who="patients">
        <span class="grid h-11 w-11 place-items-center rounded-[12px] bg-gold/20 text-hl transition-colors group-hover:bg-gold group-hover:text-navy" aria-hidden="true"><svg class="icon !h-5 !w-5" aria-hidden="true" focusable="false"><use href="#i-mail"/></svg></span>
        <h3 class="mt-4 !text-[19px] !leading-snug">Text confirmations</h3>
        <p class="mt-1.5 flex-1 text-[15.5px] leading-snug text-muted">Patients get the date, time and directions by text, with an easy way to cancel.</p>
        <p class="mt-4 flex flex-wrap items-center gap-1.5"><span class="chip">All plans</span><span class="flag">[CONFIRM]</span></p>
      </li>
      <li class="ft-card group flex flex-col rounded-[18px] border border-line bg-paper p-5" data-ft-who="reception">
        <span class="grid h-11 w-11 place-items-center rounded-[12px] bg-gold/20 text-hl transition-colors group-hover:bg-gold group-hover:text-navy" aria-hidden="true"><svg class="icon !h-5 !w-5" aria-hidden="true" focusable="false"><use href="#i-calendar"/></svg></span>
        <h3 class="mt-4 !text-[19px] !leading-snug">Books, moves and cancels</h3>
        <p class="mt-1.5 flex-1 text-[15.5px] leading-snug text-muted">Works from real availability in your diary, by dentist, physiotherapist and appointment type.</p>
        <p class="mt-4 flex flex-wrap items-center gap-1.5"><span class="chip">All plans</span></p>
      </li>
      <li class="ft-card group flex flex-col rounded-[18px] border border-line bg-paper p-5" data-ft-who="reception">
        <span class="grid h-11 w-11 place-items-center rounded-[12px] bg-gold/20 text-hl transition-colors group-hover:bg-gold group-hover:text-navy" aria-hidden="true"><svg class="icon !h-5 !w-5" aria-hidden="true" focusable="false"><use href="#i-phone-forwarded"/></svg></span>
        <h3 class="mt-4 !text-[19px] !leading-snug">Transfer and on-call rules</h3>
        <p class="mt-1.5 flex-1 text-[15.5px] leading-snug text-muted">Urgent calls, complaints and anyone who asks for a person go where you decide.</p>
        <p class="mt-4 flex flex-wrap items-center gap-1.5"><span class="chip !border-gold/60 !bg-gold/15 !text-hl">Growth and Scale</span></p>
      </li>
      <li class="ft-card group flex flex-col rounded-[18px] border border-line bg-paper p-5" data-ft-who="reception">
        <span class="grid h-11 w-11 place-items-center rounded-[12px] bg-gold/20 text-hl transition-colors group-hover:bg-gold group-hover:text-navy" aria-hidden="true"><svg class="icon !h-5 !w-5" aria-hidden="true" focusable="false"><use href="#i-check"/></svg></span>
        <h3 class="mt-4 !text-[19px] !leading-snug">Call notes in plain English</h3>
        <p class="mt-1.5 flex-1 text-[15.5px] leading-snug text-muted">A short summary of every call, with the recording and transcript if you want them.</p>
        <p class="mt-4 flex flex-wrap items-center gap-1.5"><span class="chip">All plans</span></p>
      </li>
      <li class="ft-card group flex flex-col rounded-[18px] border border-line bg-paper p-5" data-ft-who="reception">
        <span class="grid h-11 w-11 place-items-center rounded-[12px] bg-gold/20 text-hl transition-colors group-hover:bg-gold group-hover:text-navy" aria-hidden="true"><svg class="icon !h-5 !w-5" aria-hidden="true" focusable="false"><use href="#i-replay"/></svg></span>
        <h3 class="mt-4 !text-[19px] !leading-snug">Recalls and waitlist offers</h3>
        <p class="mt-1.5 flex-1 text-[15.5px] leading-snug text-muted">Reminders and short-notice slots offered only to patients who agreed to them.</p>
        <p class="mt-4 flex flex-wrap items-center gap-1.5"><span class="chip !border-gold/60 !bg-gold/15 !text-hl">Growth and Scale</span></p>
      </li>
      <li class="ft-card group flex flex-col rounded-[18px] border border-line bg-paper p-5" data-ft-who="owners">
        <span class="grid h-11 w-11 place-items-center rounded-[12px] bg-gold/20 text-hl transition-colors group-hover:bg-gold group-hover:text-navy" aria-hidden="true"><svg class="icon !h-5 !w-5" aria-hidden="true" focusable="false"><use href="#i-clock"/></svg></span>
        <h3 class="mt-4 !text-[19px] !leading-snug">Morning summary</h3>
        <p class="mt-1.5 flex-1 text-[15.5px] leading-snug text-muted">Before the team is in: who rang overnight, what was booked and what needs a person.</p>
        <p class="mt-4 flex flex-wrap items-center gap-1.5"><span class="chip">All plans</span></p>
      </li>
      <li class="ft-card group flex flex-col rounded-[18px] border border-line bg-paper p-5" data-ft-who="owners">
        <span class="grid h-11 w-11 place-items-center rounded-[12px] bg-gold/20 text-hl transition-colors group-hover:bg-gold group-hover:text-navy" aria-hidden="true"><svg class="icon !h-5 !w-5" aria-hidden="true" focusable="false"><use href="#i-plus-star"/></svg></span>
        <h3 class="mt-4 !text-[19px] !leading-snug">Monthly tuning by OMH</h3>
        <p class="mt-1.5 flex-1 text-[15.5px] leading-snug text-muted">We read the calls, fix what tripped it up and agree changes with you on a monthly call.</p>
        <p class="mt-4 flex flex-wrap items-center gap-1.5"><span class="chip !border-gold/60 !bg-gold/15 !text-hl">Growth and Scale</span></p>
      </li>
      <li class="ft-card group flex flex-col rounded-[18px] border border-line bg-paper p-5" data-ft-who="owners">
        <span class="grid h-11 w-11 place-items-center rounded-[12px] bg-gold/20 text-hl transition-colors group-hover:bg-gold group-hover:text-navy" aria-hidden="true"><svg class="icon !h-5 !w-5" aria-hidden="true" focusable="false"><use href="#i-map-pin"/></svg></span>
        <h3 class="mt-4 !text-[19px] !leading-snug">Local number or keep yours</h3>
        <p class="mt-1.5 flex-1 text-[15.5px] leading-snug text-muted">Divert your existing line, or get a number with your city’s area code.</p>
        <p class="mt-4 flex flex-wrap items-center gap-1.5"><span class="chip">All plans</span><span class="flag">[CONFIRM]</span></p>
      </li>
      <li class="ft-card group flex flex-col rounded-[18px] border border-line bg-paper p-5" data-ft-who="owners">
        <span class="grid h-11 w-11 place-items-center rounded-[12px] bg-gold/20 text-hl transition-colors group-hover:bg-gold group-hover:text-navy" aria-hidden="true"><svg class="icon !h-5 !w-5" aria-hidden="true" focusable="false"><use href="#i-home"/></svg></span>
        <h3 class="mt-4 !text-[19px] !leading-snug">Several sites, one service</h3>
        <p class="mt-1.5 flex-1 text-[15.5px] leading-snug text-muted">Separate greetings, diaries and rules for each clinic in your group.</p>
        <p class="mt-4 flex flex-wrap items-center gap-1.5"><span class="chip !border-gold/60 !bg-gold/15 !text-hl">Scale</span></p>
      </li>
    </ul>
    <div class="mt-8 flex flex-col items-start justify-between gap-4 rounded-[18px] bg-sand p-5 sm:flex-row sm:items-center sm:p-6">
      <p class="text-[16.5px]"><strong class="font-semibold">Not sure which plan?</strong> Most clinics start on Growth for transfer rules and recalls.</p>
      <a href="#pricing" class="btn btn-secondary !min-h-[44px] shrink-0" data-track="clinic_features_pricing">Compare plans</a>
    </div>
  </div>
</section>


<!-- ===== COMPONENT: YourTeam ===== -->
<section id="your-team" data-component="YourTeam" class="bg-paper">
  <div class="container-omh py-20 lg:py-28" data-team>
    <div class="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,.85fr)] lg:gap-14">
      <div>
        <p class="eyebrow"><span class="eyebrow-mark" aria-hidden="true"><i></i><i></i><i></i></span>Your team</p>
        <h2>Will it replace your receptionists? <span class="hl">No.</span></h2>
        <p class="mt-5 text-muted">It takes the overflow and the routine calls, so your team can look after the patients in front of them. You decide when it answers.</p>
        <p class="mt-8 font-display text-[16.5px] font-semibold" id="team-mode-label">When should it answer?</p>
        <div class="mt-3 grid gap-2 sm:grid-cols-3" role="radiogroup" aria-labelledby="team-mode-label">
          <button type="button" role="radio" aria-checked="true" tabindex="0" class="min-h-[52px] rounded-[12px] border border-[var(--line-strong)] bg-surface px-3 text-[15.5px] font-semibold aria-checked:border-ink aria-checked:bg-ink aria-checked:text-paper" data-team-mode="overflow" data-track="clinic_team_mode" data-track-name="Only when you are busy">Only when you are busy</button><button type="button" role="radio" aria-checked="false" tabindex="-1" class="min-h-[52px] rounded-[12px] border border-[var(--line-strong)] bg-surface px-3 text-[15.5px] font-semibold aria-checked:border-ink aria-checked:bg-ink aria-checked:text-paper" data-team-mode="hours" data-track="clinic_team_mode" data-track-name="Only when you are closed">Only when you are closed</button><button type="button" role="radio" aria-checked="false" tabindex="-1" class="min-h-[52px] rounded-[12px] border border-[var(--line-strong)] bg-surface px-3 text-[15.5px] font-semibold aria-checked:border-ink aria-checked:bg-ink aria-checked:text-paper" data-team-mode="first" data-track="clinic_team_mode" data-track-name="First on every call">First on every call</button>
        </div>
        <div class="mt-4 rounded-[18px] border border-line bg-surface p-5" aria-live="polite">
          <div data-team-panel="overflow">
            <ol class="flex flex-wrap items-center gap-2 text-[14.5px] font-semibold" aria-label="How the call is handled">
              <li class="flex items-center gap-2"><span class="rounded-full border border-line bg-paper px-3 py-1">Call comes in</span></li><li class="flex items-center gap-2"><span class="text-hl" aria-hidden="true"><svg class="icon !h-4 !w-4" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></span><span class="rounded-full border border-line bg-paper px-3 py-1">Rings reception</span></li><li class="flex items-center gap-2"><span class="text-hl" aria-hidden="true"><svg class="icon !h-4 !w-4" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></span><span class="rounded-full bg-gold text-navy px-3 py-1">No answer: agent picks up</span></li>
            </ol>
            <div class="mt-4 grid gap-3 sm:grid-cols-2">
              <div class="rounded-[14px] bg-sand p-4"><p class="flex items-center gap-2 font-display text-[16.5px] font-semibold"><svg class="icon text-hl" aria-hidden="true" focusable="false"><use href="#i-home"/></svg>Your team</p><p class="mt-1 text-[15.5px] leading-snug">Your team answers first, as now.</p></div>
              <div class="rounded-[14px] bg-sand p-4"><p class="flex items-center gap-2 font-display text-[16.5px] font-semibold"><svg class="icon text-hl" aria-hidden="true" focusable="false"><use href="#i-phone-incoming"/></svg>Your AI agent</p><p class="mt-1 text-[15.5px] leading-snug">If nobody picks up within a few rings, or every line is busy, the agent answers.</p></div>
            </div>
          </div>
          <div data-team-panel="hours" hidden>
            <ol class="flex flex-wrap items-center gap-2 text-[14.5px] font-semibold" aria-label="How the call is handled">
              <li class="flex items-center gap-2"><span class="rounded-full border border-line bg-paper px-3 py-1">Call comes in</span></li><li class="flex items-center gap-2"><span class="text-hl" aria-hidden="true"><svg class="icon !h-4 !w-4" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></span><span class="rounded-full border border-line bg-paper px-3 py-1">Clinic closed?</span></li><li class="flex items-center gap-2"><span class="text-hl" aria-hidden="true"><svg class="icon !h-4 !w-4" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></span><span class="rounded-full bg-gold text-navy px-3 py-1">Agent picks up</span></li>
            </ol>
            <div class="mt-4 grid gap-3 sm:grid-cols-2">
              <div class="rounded-[14px] bg-sand p-4"><p class="flex items-center gap-2 font-display text-[16.5px] font-semibold"><svg class="icon text-hl" aria-hidden="true" focusable="false"><use href="#i-home"/></svg>Your team</p><p class="mt-1 text-[15.5px] leading-snug">Your team answers in opening hours, as now.</p></div>
              <div class="rounded-[14px] bg-sand p-4"><p class="flex items-center gap-2 font-display text-[16.5px] font-semibold"><svg class="icon text-hl" aria-hidden="true" focusable="false"><use href="#i-phone-incoming"/></svg>Your AI agent</p><p class="mt-1 text-[15.5px] leading-snug">The agent covers lunch, evenings, weekends and bank holidays.</p></div>
            </div>
          </div>
          <div data-team-panel="first" hidden>
            <ol class="flex flex-wrap items-center gap-2 text-[14.5px] font-semibold" aria-label="How the call is handled">
              <li class="flex items-center gap-2"><span class="rounded-full border border-line bg-paper px-3 py-1">Call comes in</span></li><li class="flex items-center gap-2"><span class="text-hl" aria-hidden="true"><svg class="icon !h-4 !w-4" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></span><span class="rounded-full border border-line bg-paper px-3 py-1">Agent answers</span></li><li class="flex items-center gap-2"><span class="text-hl" aria-hidden="true"><svg class="icon !h-4 !w-4" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></span><span class="rounded-full bg-gold text-navy px-3 py-1">Books it or puts it through</span></li>
            </ol>
            <div class="mt-4 grid gap-3 sm:grid-cols-2">
              <div class="rounded-[14px] bg-sand p-4"><p class="flex items-center gap-2 font-display text-[16.5px] font-semibold"><svg class="icon text-hl" aria-hidden="true" focusable="false"><use href="#i-home"/></svg>Your team</p><p class="mt-1 text-[15.5px] leading-snug">Your team gets the calls that need a person, already explained.</p></div>
              <div class="rounded-[14px] bg-sand p-4"><p class="flex items-center gap-2 font-display text-[16.5px] font-semibold"><svg class="icon text-hl" aria-hidden="true" focusable="false"><use href="#i-phone-incoming"/></svg>Your AI agent</p><p class="mt-1 text-[15.5px] leading-snug">The agent answers every call, books routine appointments and puts the rest through.</p></div>
            </div>
          </div>
        </div>
      </div>
      <div class="on-band self-start rounded-[22px] bg-band p-6 text-band-ink sm:p-8 lg:mt-14">
        <p class="font-display text-[22px] font-semibold">Your team keeps</p>
        <ul class="mt-4 space-y-3 text-[17px]">
          <li class="flex gap-3"><svg class="icon mt-1 text-band-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span>The patients in the room</span></li><li class="flex gap-3"><svg class="icon mt-1 text-band-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span>Anything clinical</span></li><li class="flex gap-3"><svg class="icon mt-1 text-band-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span>Complaints and sensitive calls</span></li><li class="flex gap-3"><svg class="icon mt-1 text-band-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span>Anyone who asks for a person</span></li><li class="flex gap-3"><svg class="icon mt-1 text-band-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span>The final say on every rule and script</span></li>
        </ul>
        <p class="mt-6 border-t border-band-line pt-5 text-[15.5px] text-band-muted">Change when it answers at any time. It's a setting, not a new contract.</p>
      </div>
    </div>
  </div>
</section>


<!-- ===== COMPONENT: Boundaries ===== -->
<section id="boundaries" data-component="Boundaries" class="bg-surface">
  <div class="container-omh py-20 lg:py-24">
    <div>
      <div><p class="eyebrow"><span class="eyebrow-mark" aria-hidden="true"><i></i><i></i><i></i></span>Clear boundaries</p><h2>What it handles, <span class="hl">and what it doesn't</span></h2></div>
      <p class="mt-5 text-muted">You decide the rules before it answers a single call. Out of hours, urgent calls go to your emergency line or the NHS 111 details you choose.</p>
    </div>
    <div class="mt-10 grid gap-4 md:grid-cols-3">
      <div class="rounded-[20px] border border-line bg-surface p-6">
        <p class="flex items-center gap-2.5 font-display text-[19px] font-semibold"><span class="grid h-9 w-9 place-items-center rounded-full bg-paper text-ok"><svg class="icon !h-5 !w-5" aria-hidden="true" focusable="false"><use href="#i-check"/></svg></span>It handles</p>
        <ul class="mt-4 space-y-2.5 text-[16.5px] leading-snug"><li class="flex gap-2.5"><span class="text-ok"><svg class="icon mt-[3px] !h-4 !w-4" aria-hidden="true" focusable="false"><use href="#i-check"/></svg></span><span>Bookings, moves and cancellations</span></li><li class="flex gap-2.5"><span class="text-ok"><svg class="icon mt-[3px] !h-4 !w-4" aria-hidden="true" focusable="false"><use href="#i-check"/></svg></span><span>New patient registration details</span></li><li class="flex gap-2.5"><span class="text-ok"><svg class="icon mt-[3px] !h-4 !w-4" aria-hidden="true" focusable="false"><use href="#i-check"/></svg></span><span>Opening hours, parking and directions</span></li><li class="flex gap-2.5"><span class="text-ok"><svg class="icon mt-[3px] !h-4 !w-4" aria-hidden="true" focusable="false"><use href="#i-check"/></svg></span><span>Fees and plans from your price list</span></li></ul>
      </div>
      <div class="rounded-[20px] border border-line bg-surface p-6">
        <p class="flex items-center gap-2.5 font-display text-[19px] font-semibold"><span class="grid h-9 w-9 place-items-center rounded-full bg-paper text-hl"><svg class="icon !h-5 !w-5" aria-hidden="true" focusable="false"><use href="#i-phone-forwarded"/></svg></span>It hands to your team</p>
        <ul class="mt-4 space-y-2.5 text-[16.5px] leading-snug"><li class="flex gap-2.5"><span class="text-hl"><svg class="icon mt-[3px] !h-4 !w-4" aria-hidden="true" focusable="false"><use href="#i-check"/></svg></span><span>Pain, swelling or anything clinical</span></li><li class="flex gap-2.5"><span class="text-hl"><svg class="icon mt-[3px] !h-4 !w-4" aria-hidden="true" focusable="false"><use href="#i-check"/></svg></span><span>Complaints and sensitive calls</span></li><li class="flex gap-2.5"><span class="text-hl"><svg class="icon mt-[3px] !h-4 !w-4" aria-hidden="true" focusable="false"><use href="#i-check"/></svg></span><span>Anyone who asks for a person</span></li><li class="flex gap-2.5"><span class="text-hl"><svg class="icon mt-[3px] !h-4 !w-4" aria-hidden="true" focusable="false"><use href="#i-check"/></svg></span><span>Questions it has no approved answer for</span></li></ul>
      </div>
      <div class="rounded-[20px] border border-line bg-surface p-6">
        <p class="flex items-center gap-2.5 font-display text-[19px] font-semibold"><span class="grid h-9 w-9 place-items-center rounded-full bg-paper text-miss"><svg class="icon !h-5 !w-5" aria-hidden="true" focusable="false"><use href="#i-x"/></svg></span>It never</p>
        <ul class="mt-4 space-y-2.5 text-[16.5px] leading-snug"><li class="flex gap-2.5"><span class="text-miss"><svg class="icon mt-[3px] !h-4 !w-4" aria-hidden="true" focusable="false"><use href="#i-x"/></svg></span><span>Gives clinical or medical advice</span></li><li class="flex gap-2.5"><span class="text-miss"><svg class="icon mt-[3px] !h-4 !w-4" aria-hidden="true" focusable="false"><use href="#i-x"/></svg></span><span>Assesses symptoms or urgency itself</span></li><li class="flex gap-2.5"><span class="text-miss"><svg class="icon mt-[3px] !h-4 !w-4" aria-hidden="true" focusable="false"><use href="#i-x"/></svg></span><span>Pretends to be a person</span></li><li class="flex gap-2.5"><span class="text-miss"><svg class="icon mt-[3px] !h-4 !w-4" aria-hidden="true" focusable="false"><use href="#i-x"/></svg></span><span>Calls patients who have not agreed to it</span></li></ul>
      </div>
    </div>
  </div>
</section>


<!-- ===== COMPONENT: ClinicAreas ===== -->
<section id="areas" data-component="ClinicAreas" class="bg-surface">
  <div class="container-omh py-20 lg:py-28" data-areas>
    <div>
      <div><p class="eyebrow"><span class="eyebrow-mark" aria-hidden="true"><i></i><i></i><i></i></span>Areas we cover</p><h2>Private clinics in <span class="hl">ten UK cities</span></h2></div>
      <div class="mt-5 space-y-3 text-muted">
        <p>Patients trust a local number. Your agent can answer on your existing line or on a new number with your city's area code.</p>
        <p class="text-[16px]">Our team is in Hullbridge, Essex. We don't have offices in these cities. Set-up and reviews happen by video call and phone. <span class="flag">[CONFIRM] local number availability</span></p>
      </div>
    </div>
    <div class="mt-10 flex flex-wrap gap-2" role="tablist" aria-label="Choose a city">
      <button type="button" role="tab" id="area-tab-london" aria-controls="area-panel-london" aria-selected="true" tabindex="0" class="flex min-h-[46px] items-center gap-2 rounded-full border border-[var(--line-strong)] bg-surface px-4 text-[15.5px] font-semibold aria-selected:border-ink aria-selected:bg-ink aria-selected:text-paper" data-area-tab="london" data-track="clinic_city_tab" data-track-name="London">London<span class="text-[13px] opacity-70 tnum">020</span></button>
      <button type="button" role="tab" id="area-tab-birmingham" aria-controls="area-panel-birmingham" aria-selected="false" tabindex="-1" class="flex min-h-[46px] items-center gap-2 rounded-full border border-[var(--line-strong)] bg-surface px-4 text-[15.5px] font-semibold aria-selected:border-ink aria-selected:bg-ink aria-selected:text-paper" data-area-tab="birmingham" data-track="clinic_city_tab" data-track-name="Birmingham">Birmingham<span class="text-[13px] opacity-70 tnum">0121</span></button>
      <button type="button" role="tab" id="area-tab-manchester" aria-controls="area-panel-manchester" aria-selected="false" tabindex="-1" class="flex min-h-[46px] items-center gap-2 rounded-full border border-[var(--line-strong)] bg-surface px-4 text-[15.5px] font-semibold aria-selected:border-ink aria-selected:bg-ink aria-selected:text-paper" data-area-tab="manchester" data-track="clinic_city_tab" data-track-name="Manchester">Manchester<span class="text-[13px] opacity-70 tnum">0161</span></button>
      <button type="button" role="tab" id="area-tab-leeds" aria-controls="area-panel-leeds" aria-selected="false" tabindex="-1" class="flex min-h-[46px] items-center gap-2 rounded-full border border-[var(--line-strong)] bg-surface px-4 text-[15.5px] font-semibold aria-selected:border-ink aria-selected:bg-ink aria-selected:text-paper" data-area-tab="leeds" data-track="clinic_city_tab" data-track-name="Leeds">Leeds<span class="text-[13px] opacity-70 tnum">0113</span></button>
      <button type="button" role="tab" id="area-tab-liverpool" aria-controls="area-panel-liverpool" aria-selected="false" tabindex="-1" class="flex min-h-[46px] items-center gap-2 rounded-full border border-[var(--line-strong)] bg-surface px-4 text-[15.5px] font-semibold aria-selected:border-ink aria-selected:bg-ink aria-selected:text-paper" data-area-tab="liverpool" data-track="clinic_city_tab" data-track-name="Liverpool">Liverpool<span class="text-[13px] opacity-70 tnum">0151</span></button>
      <button type="button" role="tab" id="area-tab-bristol" aria-controls="area-panel-bristol" aria-selected="false" tabindex="-1" class="flex min-h-[46px] items-center gap-2 rounded-full border border-[var(--line-strong)] bg-surface px-4 text-[15.5px] font-semibold aria-selected:border-ink aria-selected:bg-ink aria-selected:text-paper" data-area-tab="bristol" data-track="clinic_city_tab" data-track-name="Bristol">Bristol<span class="text-[13px] opacity-70 tnum">0117</span></button>
      <button type="button" role="tab" id="area-tab-sheffield" aria-controls="area-panel-sheffield" aria-selected="false" tabindex="-1" class="flex min-h-[46px] items-center gap-2 rounded-full border border-[var(--line-strong)] bg-surface px-4 text-[15.5px] font-semibold aria-selected:border-ink aria-selected:bg-ink aria-selected:text-paper" data-area-tab="sheffield" data-track="clinic_city_tab" data-track-name="Sheffield">Sheffield<span class="text-[13px] opacity-70 tnum">0114</span></button>
      <button type="button" role="tab" id="area-tab-nottingham" aria-controls="area-panel-nottingham" aria-selected="false" tabindex="-1" class="flex min-h-[46px] items-center gap-2 rounded-full border border-[var(--line-strong)] bg-surface px-4 text-[15.5px] font-semibold aria-selected:border-ink aria-selected:bg-ink aria-selected:text-paper" data-area-tab="nottingham" data-track="clinic_city_tab" data-track-name="Nottingham">Nottingham<span class="text-[13px] opacity-70 tnum">0115</span></button>
      <button type="button" role="tab" id="area-tab-leicester" aria-controls="area-panel-leicester" aria-selected="false" tabindex="-1" class="flex min-h-[46px] items-center gap-2 rounded-full border border-[var(--line-strong)] bg-surface px-4 text-[15.5px] font-semibold aria-selected:border-ink aria-selected:bg-ink aria-selected:text-paper" data-area-tab="leicester" data-track="clinic_city_tab" data-track-name="Leicester">Leicester<span class="text-[13px] opacity-70 tnum">0116</span></button>
      <button type="button" role="tab" id="area-tab-newcastle" aria-controls="area-panel-newcastle" aria-selected="false" tabindex="-1" class="flex min-h-[46px] items-center gap-2 rounded-full border border-[var(--line-strong)] bg-surface px-4 text-[15.5px] font-semibold aria-selected:border-ink aria-selected:bg-ink aria-selected:text-paper" data-area-tab="newcastle" data-track="clinic_city_tab" data-track-name="Newcastle">Newcastle<span class="text-[13px] opacity-70 tnum">0191</span></button>
    </div>
    <div class="mt-6 grid gap-6 lg:grid-cols-[minmax(0,.85fr)_minmax(0,1.15fr)] lg:gap-8">
      <figure class="clinic-map rounded-[18px] border border-line bg-paper p-3 sm:p-4">
        <div class="relative mx-auto w-full max-w-[440px]" style="aspect-ratio:480/560">
          <svg viewBox="0 0 480 560" class="absolute inset-0 h-full w-full overflow-hidden rounded-[12px] bg-[var(--sea)]" role="img" aria-labelledby="dmap-title">
            <title id="dmap-title">Map of England and Wales marking the ten cities we cover for private clinics, with the OMH team in Hullbridge, Essex</title>
            <path class="map-land map-land-other" d="M-204.4,124.5L-205,127.3L-208.8,123.3L-210.4,119.5L-221.3,116.4L-216.3,113.3L-214,114.6L-206.1,115.7L-204.1,117.6ZM-44.3,27.2L-53.3,32.6L-54.6,34.8L-57.9,44L-58.3,46.6L-61.4,51.3L-64.6,56.5L-67.7,58.4L-72.6,59.7L-75.3,61.1L-78.4,60L-82.5,59.8L-84.8,61.5L-84.7,63L-83.7,64.7L-80.4,67.5L-76.4,70.1L-77,72L-79.3,74L-93.6,78.4L-98.1,81.5L-99.6,83.5L-98.6,87.4L-88.4,99.5L-86.7,100.8L-85.5,107.4L-75.9,110.9L-72.3,115.4L-69,116.5L-61.6,116.7L-58.7,118.6L-56.8,117.6L-55.6,115.5L-49.1,110.4L-46.7,108.1L-47.6,104.7L-48.8,102.1L-44.7,97.3L-39.8,92.6L-37.4,92.9L-33.7,96.3L-30.8,100.8L-30.6,104.1L-30.2,106.6L-27.4,111.9L-25.5,113.9L-20.2,115.2L-19.1,117.3L-20.6,124.7L-20,127.3L-14.2,127.6L-8.1,127.5L-6.2,127.8L-3.9,126.5L-0.4,125L4.2,125.8L6.4,129.4L7.2,132.9L3.1,133.8L-1.2,132.9L-3.4,135.1L-3.8,139.3L-2.6,145L0,149.1L1.7,158.3L3.1,168.3L5.6,174.5L5.7,181.9L5.1,185.5L5.4,192.1L4,194.4L4.5,200.7L7.4,213.7L8.4,220.8L8.6,236.3L5.8,242.1L2.2,247.3L-0.5,253.8L-2.5,260.7L-4.2,272.2L-12.5,285L-15.8,288.1L-19.7,290L-12.1,299.7L-19.1,303.6L-26.3,304.5L-34,301.7L-38.9,301.5L-43.7,304.3L-45.4,306L-46.8,304.9L-49.2,297.2L-52.1,304.9L-56.9,307.1L-64.6,306L-77.7,307.2L-82.9,309.1L-85.2,312.4L-87.2,316.4L-89.5,318.5L-91.9,319.7L-102.2,321.8L-104.2,323L-109.6,329.1L-116,332.4L-121.1,333.1L-125.2,329L-126.9,326.5L-128.9,325L-135.9,324.8L-133.9,326.1L-132.6,328.8L-132.5,334.2L-133.7,339.2L-137.3,341.3L-141.4,341.5L-148.4,346.1L-157.2,346.8L-162.3,351.3L-191.5,356.8L-192.9,356.6L-196.7,354.1L-200.9,352.8L-205.2,353L-217.5,356.4L-223.4,354.8L-214.8,344.2L-204.2,339.5L-203,338L-206.3,337L-225.3,339L-232.2,341.7L-238.9,342L-235.3,337L-226.1,330.9L-221.3,327.9L-218.2,327L-214.9,323.2L-205.5,319.3L-235,325.9L-242.2,324L-243.6,321.2L-249.6,321.6L-250.9,314.8L-241.4,305.8L-235.9,302.1L-229.6,300.5L-223.6,297.8L-221,294L-223.6,292.3L-240.8,291.4L-248.9,289.6L-248.1,286.4L-246,283L-236.9,277.9L-232.3,277.4L-228.2,278.6L-224.4,280.5L-221.5,282.9L-211.8,282.7L-215.3,278.5L-215.1,270.4L-217.9,267.4L-213.6,264.2L-209,262.4L-200.7,255.5L-197.9,254.6L-183,254.4L-166.9,252L-150.7,247.9L-158.4,244L-161.9,239.6L-168.9,247.3L-173.6,250L-186.3,250.4L-190.2,249L-195.5,245.9L-197.4,246.7L-199.3,248.5L-208,251.6L-216.8,251.6L-205.9,245.3L-191.8,234.2L-188.4,230.4L-183.6,224L-184.5,220.9L-187,218.8L-176.3,205.5L-172.8,203.4L-166.9,203.5L-162.1,201.6L-160.3,201.8L-158.6,201.1L-154.3,197.2L-159.9,194L-165.7,192L-184.6,191.5L-187,190.9L-189.3,189.4L-190.5,187.4L-191.2,182.4L-192.3,181.3L-196.6,180.8L-200.8,181.8L-203.8,181.3L-206.4,178.9L-201.2,174.5L-207,172.7L-213,173L-217.9,171L-217.5,167.8L-214.9,165L-217.6,161.7L-217.8,157.8L-214.4,156.4L-211.2,157.4L-203.8,155.4L-195,155.1L-202.2,151.6L-205,149L-204.8,145.4L-203.8,142.5L-194.4,138.2L-184.9,137.1L-185.4,133.6L-184.2,130.1L-193.5,127.9L-203,129.5L-201.2,122.5L-198.3,116.6L-197.4,112.5L-197.3,108L-201.9,109.4L-201.8,103.1L-203.1,98.6L-209.8,100.8L-209,95.1L-206.7,91.4L-203.1,90L-199.9,91.2L-193.9,91.8L-187.6,89.4L-179,89.6L-165.4,91.9L-157,101.4L-154.4,100.2L-150.1,95.1L-148.3,94.8L-134.4,98.5L-125.9,102.3L-123.4,101.5L-124.3,95.7L-126.9,91.3L-122.6,86.2L-117.7,83L-114.4,81.5L-107.1,79.9L-103.9,78L-101.1,71.3L-97.5,65.8L-115.5,67.2L-131.6,58.9L-128.4,54.4L-124.6,51.9L-118.3,50.4L-117.5,48L-114.3,46.1L-108.7,41.2L-109.8,34L-108.4,28.8L-104.4,25.7L-102.7,20.9L-100.9,17.4L-93.4,16.8L-85.9,14.1L-83.4,14.6L-75,14.5L-72.2,16.1L-72.4,10.1L-67.2,9.9L-65.3,11.2L-64.7,15.4L-62.6,18.4L-62.3,23L-64.2,26.5L-67,29.1L-64.8,32L-69,36.8L-64.7,35L-58.6,30.4L-58.5,26.3L-59.1,21.1L-60.5,16.4L-59.3,11.3L-55.7,8.3L-47.3,7.3L-50.3,1.3L-47.2,1.1L-43.8,2.5L-39.3,7.4L-34.5,11.3L-29.3,14.4L-34.9,19.8L-41.4,23.1Z"/><path class="map-land" d="M199.1,366.2L194.8,370.1L180.8,373.9L174.8,377.9L164,387L162.1,387.8L146.2,385.2L134.6,373L127.3,367.9L124.1,367.2L120.9,368.6L113.9,369.9L106.9,369.5L110.7,364L115.6,361L104.9,358.6L101.8,356.8L98.5,352.9L90.1,352L86.1,352.8L78.9,357.7L67.9,362.7L55.1,354.6L52.7,351.2L53,344.8L51.3,339.6L47.8,337.8L52.8,331.4L58.4,327.2L70.8,323.3L89.8,313.8L100.2,309.7L110,302.5L114.1,298L117.2,291.7L120.1,284L124.5,277.7L120.6,276.1L118.8,271.3L119.6,266.6L121.4,262.3L120.1,256.9L117.4,251.2L117.7,246.9L118.4,242.2L111.2,242.3L103.8,243.5L97.1,246.6L90.6,250.8L85,251.4L85.1,247.8L87.7,243.5L94.3,237.4L101.5,232.4L104.1,228.4L106.1,223.9L109.7,220.2L118.9,213.4L136,206L138.7,205.5L145.4,206.7L151.9,205.7L157.7,202.8L163.6,202.3L176.3,210.9L172.6,198L178.4,195.1L186.5,206.8L189.6,208L196.1,206.4L193.5,204.4L190.6,204.2L186.8,202.5L183.8,198.7L178.5,186.9L179,180L182.5,172.8L186.7,166.2L183.5,164.8L180.7,162.3L180.2,155.5L181.2,149.8L188.3,144.6L190.4,136.8L191.6,128.1L190.4,124.1L183.4,124.7L180,126.3L177,128.9L173.8,128.6L165.4,118.8L160.5,111.5L152.1,96L151.1,86.8L158.5,67.2L169.5,54.7L182.1,50.5L179.8,49.7L160.6,49.1L154.1,50.6L148.1,55.6L144.7,57.2L141.4,57.6L138,60.1L134.9,63.7L131.5,65.9L125.1,65L121.9,65.8L119.8,63.6L118.1,60L115.6,59.1L112.8,60L107,64.4L101,67L94,63.8L84.8,58L83,59.9L80.6,64.9L79.1,72.6L72.9,65.6L67.6,56.1L65.9,50.5L66.2,44.1L69.2,41.6L72.4,44L78,28.9L88.5,9.5L92.2,3.8L94.8,-3.6L94.7,-8.7L92.7,-12.9L84.2,-22.8L84.6,-30.7L85.9,-39.4L88.6,-44.5L89.6,-45.5L101.4,-44.8L96.9,-47.8L88.1,-56.1L88.4,-58.9L90.8,-66.2L89.8,-65.4L87.8,-62.2L83.6,-54.1L81.3,-52.2L74.7,-50.6L73.4,-46.7L72.2,-45.6L68.9,-45.4L67.8,-41.7L67,-41.4L66.2,-45.5L66.6,-52.2L68.2,-58.4L70.9,-63.1L80.7,-73.7L76,-70.4L65.1,-60.7L59.4,-54.4L58,-52.2L57.3,-50.2L57.2,-48.1L59.1,-36.1L58.1,-30.8L47.2,4.8L45.3,8.3L43.6,10L42.1,10.4L37.6,9.5L35.7,6.6L35.8,3.7L37,-0.9L41.6,-17.8L43.6,-22.4L46.3,-26.7L51.9,-34.2L51.9,-34.7L48.2,-33.4L46.7,-34L45.8,-35.5L47.6,-58.3L50.8,-65.7L52.5,-76.7L55.5,-85.9L58.7,-92.6L61.3,-101.2L64.7,-105L66,-110.9L69.8,-117.1L72.9,-123.7L71.4,-123.2L52.6,-106.6L47.7,-103.6L41.6,-104.7L36.8,-107L33.3,-111.5L32,-119.5L27.6,-119.9L23.7,-121.6L23.8,-122.6L29.1,-126.7L37.4,-127.7L45.4,-134.2L38.8,-139.3L39.4,-140.8L45.6,-144.4L53.7,-157.5L56.1,-169.7L52.7,-175.6L51.6,-179.5L44.8,-184.1L43.9,-189.6L44.9,-192.5L47.3,-195.4L50.9,-197.5L56.5,-199.5L51.7,-202.1L50,-204.9L48.8,-209L48.9,-211.4L52,-221.6L53.7,-225.8L56.9,-231.1L69.9,-230.1L71.5,-232.5L73,-232.6L79.6,-230L78.6,-232.5L68.4,-246L67.6,-248.5L71,-255.2L71.3,-258.3L71.2,-261.8L72.2,-264.2L75.6,-265.4L86,-264.7L88.6,-265.8L87.7,-269.3L85.4,-273.8L85.2,-277.4L85.9,-280.7L86.4,-287.4L86.8,-290.2L89.5,-294.5L91.5,-295.8L94.2,-296.5L99.9,-294.7L101.9,-292.8L104.2,-288.5L106,-288.9L113.3,-293.1L115.5,-293.6L118.1,-288.3L130.4,-292.1L146.6,-293.4L156.4,-296L166.8,-296.7L176.4,-299.7L186.5,-298L186.8,-296.2L186.2,-293.7L183.6,-286.9L183.9,-279.1L183.3,-276.7L182,-273.9L178.2,-268.5L168.1,-261L149.6,-243.7L138.5,-235.1L136.9,-230.9L136,-225L142.3,-223.7L144.8,-221.6L143.3,-218.7L133.3,-208.6L130.1,-199.2L137.6,-199.3L143.7,-200.9L156.1,-206.5L167.5,-210.7L172.9,-210.8L183.6,-207.1L186,-206.9L190.6,-208.5L195.1,-208.6L226.1,-207.4L234.7,-209.3L240.5,-206.9L245.2,-200.8L249.8,-189.6L249.7,-187.8L246.9,-182.7L241.8,-176.3L237.4,-167.4L236.1,-162.6L235.3,-157.4L233.9,-152.6L225.1,-129.9L216.2,-117.5L212.4,-108.5L207.5,-101.4L202.9,-97L198,-94.1L183.7,-91L179.7,-89L174.9,-85.1L169.7,-83.2L175.6,-83.4L181.5,-85.5L192.1,-86.2L204.3,-78.5L203.1,-72.4L198.1,-67.5L186.9,-66.8L176.3,-56.3L171.5,-53.1L166.5,-51.5L160.2,-52.2L148.8,-55.2L144,-58.3L148.4,-53.4L153.3,-50.7L182.9,-44L184.7,-44.7L194.1,-50.9L206.7,-50.8L230.7,-39L237.5,-30L247.5,-17.1L252.9,-12.1L257,-7.5L259.3,-0.8L264.3,21.9L269.8,43.9L277.2,67.8L280.4,74.4L284.8,78.9L306.7,89.5L311.5,92.8L320.3,103L328.7,113.8L336.4,122L344.8,128.6L340.9,132.3L338.2,137.9L340.6,145.4L344,152.6L351,164.1L357.4,176.6L355.1,174.7L352.9,173.7L349.7,174L346.6,173.6L340.8,169.8L335.3,165L324.6,167.2L318.8,166.5L313.5,166.6L323.5,169.2L334.2,169.3L358.4,189.9L366.9,202.1L372.2,218.6L369.1,226.2L364.2,231.1L359.6,236.9L355.3,243.3L368.9,252.1L371.8,251.6L374.8,250.2L377.4,247L382.1,239.3L384.5,236.6L392.6,235.3L399.6,235.5L406.7,236.9L412.8,236.1L425.3,238.8L431.6,241.5L448.1,253.9L451.8,260.9L453.9,270.2L454.6,280.6L452.4,290.2L449.7,298.9L448.4,310L447.4,314.2L445.6,317.3L437.5,326.6L432,330.3L429.6,328.9L427.1,329.2L427,331.3L429.7,335.6L430.1,341.1L425.2,345.2L420,347.1L411.5,345.3L399.8,353.2L408.6,356.6L410.5,360.7L408.6,367.8L403.5,371.3L397.4,372.8L391.2,373.4L386.2,375.4L381.4,378.8L387.5,376.8L391.8,378.3L394.8,384.1L397.2,385.9L409.4,387.9L416.6,387.6L431.1,385.5L437.9,385.3L440.5,386.2L440.7,391.1L440.2,403.5L438.4,406.1L419.8,417.1L416,424.5L415.1,428.8L403.9,428.6L398.9,433.2L389.8,436.6L383,440.2L376.2,444.5L370.5,445.8L346,441.5L331.1,442.4L311.2,447L306,446.3L298.4,442.4L290.4,439.8L281.3,438.7L273.3,435L278.3,442.2L267.4,449.2L262.4,450.5L257.3,450.4L246.5,452.4L236.5,451.4L238.1,456.3L240.7,460.6L238.7,462.4L236.3,462.9L217.5,459.6L214.7,460.2L212.5,463.2L205.6,461.6L198.9,456.5L191.9,453L184.5,451.2L178.5,451.8L154.2,459.3L149,467.3L146.4,478.6L142.7,488.5L136.7,496.1L129.9,497.1L123.5,491.5L111.4,485.3L107.2,481L105.9,480.8L104.6,482.3L99.7,483.9L94.7,483.8L87.1,485.2L73.4,489.5L67.8,492.6L55.9,501.1L53.4,503.5L48.9,512.4L42.2,513.7L36.6,507.7L29.9,505.3L22.8,507.1L18.3,509.8L16.4,507.3L16.5,502.2L22,496.2L36.2,492.2L48.7,480.6L55.1,473.5L57.4,469.4L60.6,466.9L64.3,466.1L66.4,461.6L83.7,443.8L85.4,439.7L86.5,432.2L88,425L101.7,420.7L108.6,405.6L110.3,404.5L129.2,402.2L143.1,402.7L156.9,405.9L163.9,406.4L171,405.3L176.6,401.3L186.4,386.6L191.8,380.1L198,374.3L203.8,367.6L213.2,355.2L206.8,359.4ZM114.3,203.6L116.5,205.4L122.6,205.3L120.4,209.2L113.8,213.4L109.1,217.5L103.7,221L101.2,216.8L98.1,216.8L93.9,208.6L93.5,196.8L99.5,193.9L107.9,194.3ZM211.8,-354.3L206.4,-354.1L209.2,-359.7L212.6,-361.2L218.8,-360.5L217.8,-358ZM283.1,-476L282,-474.8L277.3,-484.4L280.5,-495.5L284.5,-495.2L285.2,-492.3L284.9,-489.6L282.8,-489.3L282.6,-488.5L283.3,-483.4L283.4,-477.5ZM270.7,-477.9L271.8,-471.4L274.1,-473.1L277.9,-466.7L279.7,-466.7L282.7,-469.4L282.1,-463.5L279.3,-446.8L278.3,-444L277.9,-438.9L277.2,-437.9L276.3,-427.9L274.3,-424.4L272.5,-416.5L271.8,-415.6L269.1,-418.7L271.7,-430.9L272.6,-438L271.9,-441.6L270.3,-444.9L266.3,-445L262.9,-443.5L262.2,-445.5L262,-448.1L261.2,-448.9L256.6,-448.7L255.4,-449.4L254.4,-451.8L254.2,-453.8L258.4,-455.3L262.1,-454.7L267.8,-458.7L264.2,-471.5L259.5,-472.6L258.5,-473.9L259.3,-476L261.8,-477.2L265.8,-483.8L268.1,-484.8L270.9,-484.7ZM295,-504.4L295,-503.3L292.8,-495.2L292.9,-492.2L289.1,-492.5L288.4,-493.3L287.6,-497.9L288.1,-502.8L288.5,-504.2L289.7,-504.7L290.9,-503.7L292.8,-506.2L293.8,-506.2ZM181.3,-313.2L178.4,-312.1L175.8,-312.2L171.5,-317.7L170,-321.8L170.4,-324.4L172.1,-325.2L176.3,-323.8L178.4,-319.2L178.5,-316.2L179,-315.1L181.6,-313.9ZM192.8,-308.1L192.3,-307.8L190.6,-309.6L187.7,-315.9L192.4,-317L194.5,-316.1L193.6,-313.5ZM186.9,-335.5L186.3,-333.2L190,-333.1L195.3,-331.1L198.6,-330.7L201.2,-328.2L199.8,-323.6L198,-322.3L196.2,-322.2L189.9,-326.9L181.5,-325.1L179.7,-325.7L178.7,-326.9L178.4,-328.6L178.4,-331.9L177.9,-332.8L174.9,-329.8L173.5,-330.1L172.8,-331.6L172.5,-334.8L172.9,-339L174.8,-345.2L177.8,-346.5L182.3,-345.6L187.4,-342.1L188.9,-339.9L188.9,-338.1ZM203,-350.1L198.8,-347.8L197.1,-349.8L196.8,-355.9L191.8,-358.6L189.4,-360.3L187.7,-363.3L188.1,-364.2L191.4,-365.5L196.9,-359.8L199.1,-355.2L203.1,-353.9L203.6,-353.2ZM-1.7,-111.7L-4.8,-111.2L-4.9,-112.7L0.8,-118.8L4.1,-119.5L5.1,-118.8L2.7,-115.3ZM71.7,0.3L64.9,0L62.6,-0.9L59.8,-3.3L57.2,-16.5L58.6,-21L60,-23.1L61.4,-24.8L65.1,-25.5L68.5,-22.8L69.7,-20.5L72.2,-11.5L72.4,-3.9ZM40.3,-86.2L19.1,-82.2L11.9,-83.1L11.3,-85.8L12.9,-87.3L18.9,-88.6L22.1,-101.1L13.6,-107.5L13.2,-109.2L14.1,-112L15.1,-113.1L20.7,-115.7L23,-116.2L24.9,-115.8L28.6,-112.1L32.5,-104.8L38.1,-103.3L41.9,-100ZM19.5,-48.2L20.7,-35.9L22.2,-28.2L22,-25.6L20.1,-22.1L11.1,-17.9L8.2,-18L8.3,-19.2L10.5,-24L9.2,-29.5L10.2,-33.7L9.5,-34.4L7.7,-34.1L0.9,-27.7L-1.2,-27.2L-1.3,-28.5L0.6,-34L1,-37.6L2.1,-39.9L4,-41.9L6.2,-43.4L7.7,-43.5L9.3,-41.7L14.8,-46ZM27.3,-36.7L26.1,-35.8L23.4,-36.1L22.5,-37.8L22.1,-40.1L22.3,-44.4L24.1,-47.4L31.2,-51.6L28.2,-53.4L28.1,-54.6L30.2,-58.4L38,-63.9L39.9,-65L41.8,-64.7L37.4,-54.2ZM30.1,-278.5L22.6,-262.4L20.2,-262.1L17.6,-258.2L10.6,-254L16.6,-253.6L18.1,-251.9L17.9,-248.7L16.7,-246.8L8.4,-239.8L3,-237.2L-3.2,-229.7L-6.1,-229.9L-9.4,-225L-11.9,-223.1L-13.2,-223.2L-14.7,-224.3L-17.8,-229.5L-11.1,-233.9L-10.2,-236.5L-5.6,-239.1L-5.9,-240L-12.7,-244.4L-15.2,-247.4L-14.7,-248.7L-11.2,-251.6L-12.8,-252L-13.8,-253.8L-15.5,-254.6L-16.1,-256.2L-16,-260.2L-15.3,-264.4L-13,-266.1L-12.2,-268L-11.2,-268.4L-8.3,-267.2L-5.3,-263.7L-1.6,-264.7L2.7,-263.8L2.9,-264.6L0.2,-272.9L0.9,-274.5L2.8,-276.3L13,-281.4L25.8,-290.4L28.9,-291.7L29.7,-290.3L30.7,-285.2ZM17.6,-146.4L16,-145.3L14.2,-145.6L12.2,-147.4L10.1,-152L15.9,-154.7L18.2,-152.8L18.8,-150.6L18.6,-148.3ZM27.8,-197.2L27.3,-192.9L26.1,-188L27.1,-182.7L27,-179.1L29.2,-177.6L30.3,-175.9L39.8,-173.4L48.9,-173.5L50.4,-171.8L50.5,-169.3L48.9,-166.8L43.6,-162.1L37.1,-154.6L35.1,-153.1L33.1,-153L31.8,-153.9L31.5,-168.1L25,-166.7L19.6,-167.2L16.8,-169L15,-172.4L11.5,-181.2L-0.2,-185.5L-3.2,-190.3L-4.1,-193.3L-3.5,-194.8L-0.8,-198L2.2,-196.7L4.2,-197.2L5.5,-198.8L5.5,-200.1L4.1,-203.2L4.2,-204.1L16.5,-207.1L17.8,-213.1L20.5,-213.4L23.3,-211.3L27.1,-204.8ZM-24.9,-217.6L-19.7,-211.9L-24.9,-203.4L-31.8,-204L-41.2,-211.2L-41.1,-212.5L-40.2,-214.4L-38.6,-215.9L-36.9,-216.1L-34.7,-214.8L-31,-216.3L-28.4,-215.4ZM-31.2,-164.1L-33.5,-163.8L-36.2,-164.5L-38,-166.1L-39.2,-172L-39.2,-175.7L-38,-182.2L-37.6,-189.9L-31.7,-189.8L-30.3,-188.5L-31.2,-165.1ZM-41,-150.7L-45.6,-149.7L-47.2,-150.5L-47.5,-151.9L-46.1,-155.1L-42.5,-155.9L-40.2,-153.9L-40,-152.3ZM4.2,125.8L-0.4,125L-3.9,126.5L-6.2,127.8L-8.1,127.5L-14.2,127.6L-20,127.3L-20.6,124.7L-19.1,117.3L-20.2,115.2L-25.5,113.9L-27.4,111.9L-30.2,106.6L-30.6,104.1L-30.8,100.8L-33.7,96.3L-37.4,92.9L-39.8,92.6L-44.7,97.3L-48.8,102.1L-47.6,104.7L-46.7,108.1L-49.1,110.4L-55.6,115.5L-56.8,117.6L-58.7,118.6L-61.6,116.7L-69,116.5L-72.3,115.4L-75.9,110.9L-85.5,107.4L-86.7,100.8L-88.4,99.5L-98.6,87.4L-99.6,83.5L-98.1,81.5L-93.6,78.4L-79.3,74L-77,72L-76.4,70.1L-80.4,67.5L-83.7,64.7L-84.7,63L-84.8,61.5L-82.5,59.8L-78.4,60L-75.3,61.1L-72.6,59.7L-67.7,58.4L-64.6,56.5L-61.4,51.3L-58.3,46.6L-57.9,44L-54.6,34.8L-53.3,32.6L-44.3,27.2L-42.4,30.8L-38.1,31.9L-34,29.1L-28.8,19.7L-25.7,19.5L-22.2,20.4L-15.4,19.7L-3,16L2.4,16.2L9.8,19L15.5,19.3L20.1,26.5L22.2,37.5L27.9,48.7L35.8,58.5L35.7,64.1L32.6,67.1L26.1,70.5L26.1,74.7L30.1,72.7L33.7,72.1L42.3,73.4L45.1,77.8L46.7,84L47.7,89.1L46.6,94.7L44.5,92.8L42.4,87.7L39.9,85.3L36.8,84L37.9,90.8L36.8,99.9L38.2,100.8L42.3,101.2L39.1,110.3L33.4,112.6L26.7,113.2L25,116.4L23.5,120.7L19.8,126.7L15.2,130.1L9.6,129.1ZM294.6,454.3L289.5,457.7L288,461.5L286.7,463L283.5,464L280.3,464.2L267.7,456.6L264.6,456.9L267.4,453.3L275.4,450.4L279.7,446.6L289.8,450.1Z"/>
          </svg>
          <span class="area-base" style="left:81.73%;top:65.04%" aria-hidden="true"><i></i><span>OMH team</span></span>
          <div aria-hidden="true">
            <span class="area-pin is-below is-active" style="left:72.67%;top:67.13%" data-area-pin="london"><button type="button" tabindex="-1" aria-hidden="true" class="area-pin-dot" data-area-pick="london" data-track="clinic_map_pin" data-track-name="London"></button><span class="area-pin-label">London<span class="area-pin-code tnum">020</span></span></span>
            <span class="area-pin is-below" style="left:51.00%;top:50.82%" data-area-pin="birmingham"><button type="button" tabindex="-1" aria-hidden="true" class="area-pin-dot" data-area-pick="birmingham" data-track="clinic_map_pin" data-track-name="Birmingham"></button><span class="area-pin-label">Birmingham<span class="area-pin-code tnum">0121</span></span></span>
            <span class="area-pin is-below" style="left:46.83%;top:34.00%" data-area-pin="manchester"><button type="button" tabindex="-1" aria-hidden="true" class="area-pin-dot" data-area-pick="manchester" data-track="clinic_map_pin" data-track-name="Manchester"></button><span class="area-pin-label">Manchester<span class="area-pin-code tnum">0161</span></span></span>
            <span class="area-pin is-below" style="left:54.94%;top:28.57%" data-area-pin="leeds"><button type="button" tabindex="-1" aria-hidden="true" class="area-pin-dot" data-area-pick="leeds" data-track="clinic_map_pin" data-track-name="Leeds"></button><span class="area-pin-label">Leeds<span class="area-pin-code tnum">0113</span></span></span>
            <span class="area-pin is-below" style="left:38.02%;top:35.16%" data-area-pin="liverpool"><button type="button" tabindex="-1" aria-hidden="true" class="area-pin-dot" data-area-pick="liverpool" data-track="clinic_map_pin" data-track-name="Liverpool"></button><span class="area-pin-label">Liverpool<span class="area-pin-code tnum">0151</span></span></span>
            <span class="area-pin is-below" style="left:42.46%;top:68.25%" data-area-pin="bristol"><button type="button" tabindex="-1" aria-hidden="true" class="area-pin-dot" data-area-pick="bristol" data-track="clinic_map_pin" data-track-name="Bristol"></button><span class="area-pin-label">Bristol<span class="area-pin-code tnum">0117</span></span></span>
            <span class="area-pin is-below" style="left:56.21%;top:35.57%" data-area-pin="sheffield"><button type="button" tabindex="-1" aria-hidden="true" class="area-pin-dot" data-area-pick="sheffield" data-track="clinic_map_pin" data-track-name="Sheffield"></button><span class="area-pin-label">Sheffield<span class="area-pin-code tnum">0114</span></span></span>
            <span class="area-pin is-below" style="left:60.02%;top:42.73%" data-area-pin="nottingham"><button type="button" tabindex="-1" aria-hidden="true" class="area-pin-dot" data-area-pick="nottingham" data-track="clinic_map_pin" data-track-name="Nottingham"></button><span class="area-pin-label">Nottingham<span class="area-pin-code tnum">0115</span></span></span>
            <span class="area-pin is-below" style="left:60.25%;top:48.11%" data-area-pin="leicester"><button type="button" tabindex="-1" aria-hidden="true" class="area-pin-dot" data-area-pick="leicester" data-track="clinic_map_pin" data-track-name="Leicester"></button><span class="area-pin-label">Leicester<span class="area-pin-code tnum">0116</span></span></span>
            <span class="area-pin is-below" style="left:54.37%;top:8.63%" data-area-pin="newcastle"><button type="button" tabindex="-1" aria-hidden="true" class="area-pin-dot" data-area-pick="newcastle" data-track="clinic_map_pin" data-track-name="Newcastle"></button><span class="area-pin-label">Newcastle<span class="area-pin-code tnum">0191</span></span></span>
          </div>
        </div>
        <figcaption class="mt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-[14.5px] text-muted"><span class="flex items-center gap-2"><span class="block h-3 w-3 rounded-full bg-gold"></span>Cities we cover</span><span class="flex items-center gap-2"><span class="block h-2.5 w-2.5 rotate-45 rounded-[2px] bg-ink"></span>Our team in Hullbridge, Essex</span></figcaption>
      </figure>
      <div class="rounded-[18px] border border-line bg-surface p-5 shadow-[0_30px_60px_-45px_rgb(0_0_0/0.5)] sm:p-7" aria-live="polite">
        <div class="area-panel" id="area-panel-london" data-area-panel="london" role="tabpanel" aria-labelledby="area-tab-london" tabindex="0">
          <div class="flex items-end justify-between gap-4 border-b border-line pb-5">
            <div><p class="text-[14.5px] font-semibold text-muted">Local numbers with</p><p class="font-display text-[clamp(2.6rem,2.2rem+2.4vw,4.5rem)] font-semibold leading-none tracking-tight text-hl tnum">020</p></div>
            <div class="text-right"><h3 class="!text-[clamp(22px,20px+1vw,34px)]">London</h3><p class="text-[15px] text-muted">For example <span class="tnum">020 7946 0321</span></p></div>
          </div>
          <div class="mt-5 rounded-[14px] bg-sand p-4">
            <p class="flex items-center justify-between gap-3 text-[13.5px] font-semibold text-muted"><span>Your clinic, London</span><span class="tnum">Mon 07:58</span></p>
            <p class="mt-2 rounded-[4px_14px_14px_14px] bg-surface px-3.5 py-2.5 text-[16px] leading-snug">&ldquo;Good morning, you're through to the clinic's AI assistant. Are you calling to book, or about something urgent?&rdquo;</p>
          </div>
          <p class="mt-5 text-[14.5px] font-semibold text-muted">Set up for London patients</p>
          <ul class="mt-2 space-y-2 text-[16px] leading-snug">
            <li class="flex gap-2.5"><svg class="icon mt-[3px] text-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span>A local 020 number, or your existing one diverted</span></li>
            <li class="flex gap-2.5"><svg class="icon mt-[3px] text-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span>Your consulting room hours, bank holidays and emergency route</span></li>
            <li class="flex gap-2.5"><svg class="icon mt-[3px] text-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span>Self-pay and insurer booking rules for your clinic</span></li>
          </ul>
          <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="/contact?service=ai-voice-agents&amp;industry=clinic-clinics&amp;city=london" class="btn btn-primary" data-track="clinic_city_click" data-track-name="London">Talk to us about London</a>
            <a href="/contact?service=ai-voice-agents&amp;industry=clinic-clinics&amp;city=london" data-future-href="/ai-voice-agents/clinics-healthcare/london" class="text-link" data-track="clinic_city_page" data-track-name="London">Clinic AI receptionist in London<svg class="icon" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></a>
          </div>
        </div>
        <div class="area-panel" id="area-panel-birmingham" data-area-panel="birmingham" hidden role="tabpanel" aria-labelledby="area-tab-birmingham" tabindex="0">
          <div class="flex items-end justify-between gap-4 border-b border-line pb-5">
            <div><p class="text-[14.5px] font-semibold text-muted">Local numbers with</p><p class="font-display text-[clamp(2.6rem,2.2rem+2.4vw,4.5rem)] font-semibold leading-none tracking-tight text-hl tnum">0121</p></div>
            <div class="text-right"><h3 class="!text-[clamp(22px,20px+1vw,34px)]">Birmingham</h3><p class="text-[15px] text-muted">For example <span class="tnum">0121 496 0147</span></p></div>
          </div>
          <div class="mt-5 rounded-[14px] bg-sand p-4">
            <p class="flex items-center justify-between gap-3 text-[13.5px] font-semibold text-muted"><span>Your clinic, Birmingham</span><span class="tnum">Mon 07:58</span></p>
            <p class="mt-2 rounded-[4px_14px_14px_14px] bg-surface px-3.5 py-2.5 text-[16px] leading-snug">&ldquo;Good morning, you're through to the clinic's AI assistant. Are you calling to book, or about something urgent?&rdquo;</p>
          </div>
          <p class="mt-5 text-[14.5px] font-semibold text-muted">Set up for Birmingham patients</p>
          <ul class="mt-2 space-y-2 text-[16px] leading-snug">
            <li class="flex gap-2.5"><svg class="icon mt-[3px] text-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span>A local 0121 number, or your existing one diverted</span></li>
            <li class="flex gap-2.5"><svg class="icon mt-[3px] text-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span>Your consulting room hours, bank holidays and emergency route</span></li>
            <li class="flex gap-2.5"><svg class="icon mt-[3px] text-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span>Self-pay and insurer booking rules for your clinic</span></li>
          </ul>
          <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="/contact?service=ai-voice-agents&amp;industry=clinic-clinics&amp;city=birmingham" class="btn btn-primary" data-track="clinic_city_click" data-track-name="Birmingham">Talk to us about Birmingham</a>
            <a href="/contact?service=ai-voice-agents&amp;industry=clinic-clinics&amp;city=birmingham" data-future-href="/ai-voice-agents/clinics-healthcare/birmingham" class="text-link" data-track="clinic_city_page" data-track-name="Birmingham">Clinic AI receptionist in Birmingham<svg class="icon" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></a>
          </div>
        </div>
        <div class="area-panel" id="area-panel-manchester" data-area-panel="manchester" hidden role="tabpanel" aria-labelledby="area-tab-manchester" tabindex="0">
          <div class="flex items-end justify-between gap-4 border-b border-line pb-5">
            <div><p class="text-[14.5px] font-semibold text-muted">Local numbers with</p><p class="font-display text-[clamp(2.6rem,2.2rem+2.4vw,4.5rem)] font-semibold leading-none tracking-tight text-hl tnum">0161</p></div>
            <div class="text-right"><h3 class="!text-[clamp(22px,20px+1vw,34px)]">Manchester</h3><p class="text-[15px] text-muted">For example <span class="tnum">0161 496 0123</span></p></div>
          </div>
          <div class="mt-5 rounded-[14px] bg-sand p-4">
            <p class="flex items-center justify-between gap-3 text-[13.5px] font-semibold text-muted"><span>Your clinic, Manchester</span><span class="tnum">Mon 07:58</span></p>
            <p class="mt-2 rounded-[4px_14px_14px_14px] bg-surface px-3.5 py-2.5 text-[16px] leading-snug">&ldquo;Good morning, you're through to the clinic's AI assistant. Are you calling to book, or about something urgent?&rdquo;</p>
          </div>
          <p class="mt-5 text-[14.5px] font-semibold text-muted">Set up for Manchester patients</p>
          <ul class="mt-2 space-y-2 text-[16px] leading-snug">
            <li class="flex gap-2.5"><svg class="icon mt-[3px] text-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span>A local 0161 number, or your existing one diverted</span></li>
            <li class="flex gap-2.5"><svg class="icon mt-[3px] text-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span>Your consulting room hours, bank holidays and emergency route</span></li>
            <li class="flex gap-2.5"><svg class="icon mt-[3px] text-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span>Self-pay and insurer booking rules for your clinic</span></li>
          </ul>
          <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="/contact?service=ai-voice-agents&amp;industry=clinic-clinics&amp;city=manchester" class="btn btn-primary" data-track="clinic_city_click" data-track-name="Manchester">Talk to us about Manchester</a>
            <a href="/contact?service=ai-voice-agents&amp;industry=clinic-clinics&amp;city=manchester" data-future-href="/ai-voice-agents/clinics-healthcare/manchester" class="text-link" data-track="clinic_city_page" data-track-name="Manchester">Clinic AI receptionist in Manchester<svg class="icon" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></a>
          </div>
        </div>
        <div class="area-panel" id="area-panel-leeds" data-area-panel="leeds" hidden role="tabpanel" aria-labelledby="area-tab-leeds" tabindex="0">
          <div class="flex items-end justify-between gap-4 border-b border-line pb-5">
            <div><p class="text-[14.5px] font-semibold text-muted">Local numbers with</p><p class="font-display text-[clamp(2.6rem,2.2rem+2.4vw,4.5rem)] font-semibold leading-none tracking-tight text-hl tnum">0113</p></div>
            <div class="text-right"><h3 class="!text-[clamp(22px,20px+1vw,34px)]">Leeds</h3><p class="text-[15px] text-muted">For example <span class="tnum">0113 496 0188</span></p></div>
          </div>
          <div class="mt-5 rounded-[14px] bg-sand p-4">
            <p class="flex items-center justify-between gap-3 text-[13.5px] font-semibold text-muted"><span>Your clinic, Leeds</span><span class="tnum">Mon 07:58</span></p>
            <p class="mt-2 rounded-[4px_14px_14px_14px] bg-surface px-3.5 py-2.5 text-[16px] leading-snug">&ldquo;Good morning, you're through to the clinic's AI assistant. Are you calling to book, or about something urgent?&rdquo;</p>
          </div>
          <p class="mt-5 text-[14.5px] font-semibold text-muted">Set up for Leeds patients</p>
          <ul class="mt-2 space-y-2 text-[16px] leading-snug">
            <li class="flex gap-2.5"><svg class="icon mt-[3px] text-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span>A local 0113 number, or your existing one diverted</span></li>
            <li class="flex gap-2.5"><svg class="icon mt-[3px] text-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span>Your consulting room hours, bank holidays and emergency route</span></li>
            <li class="flex gap-2.5"><svg class="icon mt-[3px] text-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span>Self-pay and insurer booking rules for your clinic</span></li>
          </ul>
          <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="/contact?service=ai-voice-agents&amp;industry=clinic-clinics&amp;city=leeds" class="btn btn-primary" data-track="clinic_city_click" data-track-name="Leeds">Talk to us about Leeds</a>
            <a href="/contact?service=ai-voice-agents&amp;industry=clinic-clinics&amp;city=leeds" data-future-href="/ai-voice-agents/clinics-healthcare/leeds" class="text-link" data-track="clinic_city_page" data-track-name="Leeds">Clinic AI receptionist in Leeds<svg class="icon" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></a>
          </div>
        </div>
        <div class="area-panel" id="area-panel-liverpool" data-area-panel="liverpool" hidden role="tabpanel" aria-labelledby="area-tab-liverpool" tabindex="0">
          <div class="flex items-end justify-between gap-4 border-b border-line pb-5">
            <div><p class="text-[14.5px] font-semibold text-muted">Local numbers with</p><p class="font-display text-[clamp(2.6rem,2.2rem+2.4vw,4.5rem)] font-semibold leading-none tracking-tight text-hl tnum">0151</p></div>
            <div class="text-right"><h3 class="!text-[clamp(22px,20px+1vw,34px)]">Liverpool</h3><p class="text-[15px] text-muted">For example <span class="tnum">0151 496 0162</span></p></div>
          </div>
          <div class="mt-5 rounded-[14px] bg-sand p-4">
            <p class="flex items-center justify-between gap-3 text-[13.5px] font-semibold text-muted"><span>Your clinic, Liverpool</span><span class="tnum">Mon 07:58</span></p>
            <p class="mt-2 rounded-[4px_14px_14px_14px] bg-surface px-3.5 py-2.5 text-[16px] leading-snug">&ldquo;Good morning, you're through to the clinic's AI assistant. Are you calling to book, or about something urgent?&rdquo;</p>
          </div>
          <p class="mt-5 text-[14.5px] font-semibold text-muted">Set up for Liverpool patients</p>
          <ul class="mt-2 space-y-2 text-[16px] leading-snug">
            <li class="flex gap-2.5"><svg class="icon mt-[3px] text-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span>A local 0151 number, or your existing one diverted</span></li>
            <li class="flex gap-2.5"><svg class="icon mt-[3px] text-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span>Your consulting room hours, bank holidays and emergency route</span></li>
            <li class="flex gap-2.5"><svg class="icon mt-[3px] text-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span>Self-pay and insurer booking rules for your clinic</span></li>
          </ul>
          <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="/contact?service=ai-voice-agents&amp;industry=clinic-clinics&amp;city=liverpool" class="btn btn-primary" data-track="clinic_city_click" data-track-name="Liverpool">Talk to us about Liverpool</a>
            <a href="/contact?service=ai-voice-agents&amp;industry=clinic-clinics&amp;city=liverpool" data-future-href="/ai-voice-agents/clinics-healthcare/liverpool" class="text-link" data-track="clinic_city_page" data-track-name="Liverpool">Clinic AI receptionist in Liverpool<svg class="icon" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></a>
          </div>
        </div>
        <div class="area-panel" id="area-panel-bristol" data-area-panel="bristol" hidden role="tabpanel" aria-labelledby="area-tab-bristol" tabindex="0">
          <div class="flex items-end justify-between gap-4 border-b border-line pb-5">
            <div><p class="text-[14.5px] font-semibold text-muted">Local numbers with</p><p class="font-display text-[clamp(2.6rem,2.2rem+2.4vw,4.5rem)] font-semibold leading-none tracking-tight text-hl tnum">0117</p></div>
            <div class="text-right"><h3 class="!text-[clamp(22px,20px+1vw,34px)]">Bristol</h3><p class="text-[15px] text-muted">For example <span class="tnum">0117 496 0135</span></p></div>
          </div>
          <div class="mt-5 rounded-[14px] bg-sand p-4">
            <p class="flex items-center justify-between gap-3 text-[13.5px] font-semibold text-muted"><span>Your clinic, Bristol</span><span class="tnum">Mon 07:58</span></p>
            <p class="mt-2 rounded-[4px_14px_14px_14px] bg-surface px-3.5 py-2.5 text-[16px] leading-snug">&ldquo;Good morning, you're through to the clinic's AI assistant. Are you calling to book, or about something urgent?&rdquo;</p>
          </div>
          <p class="mt-5 text-[14.5px] font-semibold text-muted">Set up for Bristol patients</p>
          <ul class="mt-2 space-y-2 text-[16px] leading-snug">
            <li class="flex gap-2.5"><svg class="icon mt-[3px] text-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span>A local 0117 number, or your existing one diverted</span></li>
            <li class="flex gap-2.5"><svg class="icon mt-[3px] text-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span>Your consulting room hours, bank holidays and emergency route</span></li>
            <li class="flex gap-2.5"><svg class="icon mt-[3px] text-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span>Self-pay and insurer booking rules for your clinic</span></li>
          </ul>
          <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="/contact?service=ai-voice-agents&amp;industry=clinic-clinics&amp;city=bristol" class="btn btn-primary" data-track="clinic_city_click" data-track-name="Bristol">Talk to us about Bristol</a>
            <a href="/contact?service=ai-voice-agents&amp;industry=clinic-clinics&amp;city=bristol" data-future-href="/ai-voice-agents/clinics-healthcare/bristol" class="text-link" data-track="clinic_city_page" data-track-name="Bristol">Clinic AI receptionist in Bristol<svg class="icon" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></a>
          </div>
        </div>
        <div class="area-panel" id="area-panel-sheffield" data-area-panel="sheffield" hidden role="tabpanel" aria-labelledby="area-tab-sheffield" tabindex="0">
          <div class="flex items-end justify-between gap-4 border-b border-line pb-5">
            <div><p class="text-[14.5px] font-semibold text-muted">Local numbers with</p><p class="font-display text-[clamp(2.6rem,2.2rem+2.4vw,4.5rem)] font-semibold leading-none tracking-tight text-hl tnum">0114</p></div>
            <div class="text-right"><h3 class="!text-[clamp(22px,20px+1vw,34px)]">Sheffield</h3><p class="text-[15px] text-muted">For example <span class="tnum">0114 496 0172</span></p></div>
          </div>
          <div class="mt-5 rounded-[14px] bg-sand p-4">
            <p class="flex items-center justify-between gap-3 text-[13.5px] font-semibold text-muted"><span>Your clinic, Sheffield</span><span class="tnum">Mon 07:58</span></p>
            <p class="mt-2 rounded-[4px_14px_14px_14px] bg-surface px-3.5 py-2.5 text-[16px] leading-snug">&ldquo;Good morning, you're through to the clinic's AI assistant. Are you calling to book, or about something urgent?&rdquo;</p>
          </div>
          <p class="mt-5 text-[14.5px] font-semibold text-muted">Set up for Sheffield patients</p>
          <ul class="mt-2 space-y-2 text-[16px] leading-snug">
            <li class="flex gap-2.5"><svg class="icon mt-[3px] text-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span>A local 0114 number, or your existing one diverted</span></li>
            <li class="flex gap-2.5"><svg class="icon mt-[3px] text-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span>Your consulting room hours, bank holidays and emergency route</span></li>
            <li class="flex gap-2.5"><svg class="icon mt-[3px] text-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span>Self-pay and insurer booking rules for your clinic</span></li>
          </ul>
          <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="/contact?service=ai-voice-agents&amp;industry=clinic-clinics&amp;city=sheffield" class="btn btn-primary" data-track="clinic_city_click" data-track-name="Sheffield">Talk to us about Sheffield</a>
            <a href="/contact?service=ai-voice-agents&amp;industry=clinic-clinics&amp;city=sheffield" data-future-href="/ai-voice-agents/clinics-healthcare/sheffield" class="text-link" data-track="clinic_city_page" data-track-name="Sheffield">Clinic AI receptionist in Sheffield<svg class="icon" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></a>
          </div>
        </div>
        <div class="area-panel" id="area-panel-nottingham" data-area-panel="nottingham" hidden role="tabpanel" aria-labelledby="area-tab-nottingham" tabindex="0">
          <div class="flex items-end justify-between gap-4 border-b border-line pb-5">
            <div><p class="text-[14.5px] font-semibold text-muted">Local numbers with</p><p class="font-display text-[clamp(2.6rem,2.2rem+2.4vw,4.5rem)] font-semibold leading-none tracking-tight text-hl tnum">0115</p></div>
            <div class="text-right"><h3 class="!text-[clamp(22px,20px+1vw,34px)]">Nottingham</h3><p class="text-[15px] text-muted">For example <span class="tnum">0115 496 0154</span></p></div>
          </div>
          <div class="mt-5 rounded-[14px] bg-sand p-4">
            <p class="flex items-center justify-between gap-3 text-[13.5px] font-semibold text-muted"><span>Your clinic, Nottingham</span><span class="tnum">Mon 07:58</span></p>
            <p class="mt-2 rounded-[4px_14px_14px_14px] bg-surface px-3.5 py-2.5 text-[16px] leading-snug">&ldquo;Good morning, you're through to the clinic's AI assistant. Are you calling to book, or about something urgent?&rdquo;</p>
          </div>
          <p class="mt-5 text-[14.5px] font-semibold text-muted">Set up for Nottingham patients</p>
          <ul class="mt-2 space-y-2 text-[16px] leading-snug">
            <li class="flex gap-2.5"><svg class="icon mt-[3px] text-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span>A local 0115 number, or your existing one diverted</span></li>
            <li class="flex gap-2.5"><svg class="icon mt-[3px] text-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span>Your consulting room hours, bank holidays and emergency route</span></li>
            <li class="flex gap-2.5"><svg class="icon mt-[3px] text-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span>Self-pay and insurer booking rules for your clinic</span></li>
          </ul>
          <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="/contact?service=ai-voice-agents&amp;industry=clinic-clinics&amp;city=nottingham" class="btn btn-primary" data-track="clinic_city_click" data-track-name="Nottingham">Talk to us about Nottingham</a>
            <a href="/contact?service=ai-voice-agents&amp;industry=clinic-clinics&amp;city=nottingham" data-future-href="/ai-voice-agents/clinics-healthcare/nottingham" class="text-link" data-track="clinic_city_page" data-track-name="Nottingham">Clinic AI receptionist in Nottingham<svg class="icon" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></a>
          </div>
        </div>
        <div class="area-panel" id="area-panel-leicester" data-area-panel="leicester" hidden role="tabpanel" aria-labelledby="area-tab-leicester" tabindex="0">
          <div class="flex items-end justify-between gap-4 border-b border-line pb-5">
            <div><p class="text-[14.5px] font-semibold text-muted">Local numbers with</p><p class="font-display text-[clamp(2.6rem,2.2rem+2.4vw,4.5rem)] font-semibold leading-none tracking-tight text-hl tnum">0116</p></div>
            <div class="text-right"><h3 class="!text-[clamp(22px,20px+1vw,34px)]">Leicester</h3><p class="text-[15px] text-muted">For example <span class="tnum">0116 496 0119</span></p></div>
          </div>
          <div class="mt-5 rounded-[14px] bg-sand p-4">
            <p class="flex items-center justify-between gap-3 text-[13.5px] font-semibold text-muted"><span>Your clinic, Leicester</span><span class="tnum">Mon 07:58</span></p>
            <p class="mt-2 rounded-[4px_14px_14px_14px] bg-surface px-3.5 py-2.5 text-[16px] leading-snug">&ldquo;Good morning, you're through to the clinic's AI assistant. Are you calling to book, or about something urgent?&rdquo;</p>
          </div>
          <p class="mt-5 text-[14.5px] font-semibold text-muted">Set up for Leicester patients</p>
          <ul class="mt-2 space-y-2 text-[16px] leading-snug">
            <li class="flex gap-2.5"><svg class="icon mt-[3px] text-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span>A local 0116 number, or your existing one diverted</span></li>
            <li class="flex gap-2.5"><svg class="icon mt-[3px] text-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span>Your consulting room hours, bank holidays and emergency route</span></li>
            <li class="flex gap-2.5"><svg class="icon mt-[3px] text-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span>Self-pay and insurer booking rules for your clinic</span></li>
          </ul>
          <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="/contact?service=ai-voice-agents&amp;industry=clinic-clinics&amp;city=leicester" class="btn btn-primary" data-track="clinic_city_click" data-track-name="Leicester">Talk to us about Leicester</a>
            <a href="/contact?service=ai-voice-agents&amp;industry=clinic-clinics&amp;city=leicester" data-future-href="/ai-voice-agents/clinics-healthcare/leicester" class="text-link" data-track="clinic_city_page" data-track-name="Leicester">Clinic AI receptionist in Leicester<svg class="icon" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></a>
          </div>
        </div>
        <div class="area-panel" id="area-panel-newcastle" data-area-panel="newcastle" hidden role="tabpanel" aria-labelledby="area-tab-newcastle" tabindex="0">
          <div class="flex items-end justify-between gap-4 border-b border-line pb-5">
            <div><p class="text-[14.5px] font-semibold text-muted">Local numbers with</p><p class="font-display text-[clamp(2.6rem,2.2rem+2.4vw,4.5rem)] font-semibold leading-none tracking-tight text-hl tnum">0191</p></div>
            <div class="text-right"><h3 class="!text-[clamp(22px,20px+1vw,34px)]">Newcastle</h3><p class="text-[15px] text-muted">For example <span class="tnum">0191 498 0106</span></p></div>
          </div>
          <div class="mt-5 rounded-[14px] bg-sand p-4">
            <p class="flex items-center justify-between gap-3 text-[13.5px] font-semibold text-muted"><span>Your clinic, Newcastle</span><span class="tnum">Mon 07:58</span></p>
            <p class="mt-2 rounded-[4px_14px_14px_14px] bg-surface px-3.5 py-2.5 text-[16px] leading-snug">&ldquo;Good morning, you're through to the clinic's AI assistant. Are you calling to book, or about something urgent?&rdquo;</p>
          </div>
          <p class="mt-5 text-[14.5px] font-semibold text-muted">Set up for Newcastle patients</p>
          <ul class="mt-2 space-y-2 text-[16px] leading-snug">
            <li class="flex gap-2.5"><svg class="icon mt-[3px] text-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span>A local 0191 number, or your existing one diverted</span></li>
            <li class="flex gap-2.5"><svg class="icon mt-[3px] text-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span>Your consulting room hours, bank holidays and emergency route</span></li>
            <li class="flex gap-2.5"><svg class="icon mt-[3px] text-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span>Self-pay and insurer booking rules for your clinic</span></li>
          </ul>
          <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="/contact?service=ai-voice-agents&amp;industry=clinic-clinics&amp;city=newcastle" class="btn btn-primary" data-track="clinic_city_click" data-track-name="Newcastle">Talk to us about Newcastle</a>
            <a href="/contact?service=ai-voice-agents&amp;industry=clinic-clinics&amp;city=newcastle" data-future-href="/ai-voice-agents/clinics-healthcare/newcastle" class="text-link" data-track="clinic_city_page" data-track-name="Newcastle">Clinic AI receptionist in Newcastle<svg class="icon" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></a>
          </div>
        </div>
      </div>
    </div>
    <p class="mt-6 text-center text-[15.5px] text-muted">Somewhere else in the UK? We work with clinics everywhere remotely. <a href="#book-demo" class="font-semibold text-ink underline decoration-gold decoration-2 underline-offset-4" data-track="clinic_areas_elsewhere">Tell us where you are</a></p>
  </div>
</section>


<!-- ===== COMPONENT: SystemsAndCompliance ===== -->
<section id="compliance" data-component="SystemsAndCompliance" class="bg-paper">
  <div class="container-omh grid gap-6 py-20 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] lg:py-24">
    <div class="rounded-[22px] border border-line bg-surface p-6 sm:p-8">
      <p class="eyebrow"><span class="eyebrow-mark" aria-hidden="true"><i></i><i></i><i></i></span>Clinic systems</p>
      <h2 class="!text-[clamp(1.75rem,1.5rem+1vw,2.25rem)]">Works with the diary <span class="hl">you already use</span></h2>
      <p class="mt-4 text-[17px] text-muted">Bookings and notes go where your team already looks. We check your setup on the first call. <span class="flag">[CONFIRM] which systems connect directly</span></p>
      <ul class="mt-6 flex flex-wrap gap-2"><li class="rounded-[10px] border border-line bg-paper px-3.5 py-2 font-display text-[15.5px] font-semibold">Clinicly</li><li class="rounded-[10px] border border-line bg-paper px-3.5 py-2 font-display text-[15.5px] font-semibold">Software of Excellence</li><li class="rounded-[10px] border border-line bg-paper px-3.5 py-2 font-display text-[15.5px] font-semibold">Pearl</li><li class="rounded-[10px] border border-line bg-paper px-3.5 py-2 font-display text-[15.5px] font-semibold">Aerona</li><li class="rounded-[10px] border border-line bg-paper px-3.5 py-2 font-display text-[15.5px] font-semibold">Google Calendar</li><li class="rounded-[10px] border border-line bg-paper px-3.5 py-2 font-display text-[15.5px] font-semibold">Microsoft 365</li></ul>
      <p class="mt-4 text-[15px] text-muted">Using something else? We'll tell you plainly what's possible.</p>
    </div>
    <div class="on-band rounded-[22px] bg-band p-6 text-band-ink sm:p-8">
      <p class="eyebrow eyebrow-band"><span class="eyebrow-mark" aria-hidden="true"><i></i><i></i><i></i></span>Built for regulated clinics</p>
      <h2 class="!text-[clamp(1.75rem,1.5rem+1vw,2.25rem)]">Patient data handled <span class="hl">properly</span></h2>
      <ul class="mt-6 grid gap-4 sm:grid-cols-2">
        <li class="rounded-[16px] border border-band-line bg-band-surface p-4"><p class="flex items-center gap-2 font-display text-[17px] font-semibold"><svg class="icon text-band-hl" aria-hidden="true" focusable="false"><use href="#i-shield"/></svg>Says it is an AI</p><p class="mt-1.5 text-[15px] leading-snug text-band-muted">Every call starts by telling the patient they are speaking to an AI assistant.</p></li>
        <li class="rounded-[16px] border border-band-line bg-band-surface p-4"><p class="flex items-center gap-2 font-display text-[17px] font-semibold"><svg class="icon text-band-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg>UK GDPR</p><p class="mt-1.5 text-[15px] leading-snug text-band-muted">You stay the data controller. OMH acts as your processor under a written agreement.</p></li>
        <li class="rounded-[16px] border border-band-line bg-band-surface p-4"><p class="flex items-center gap-2 font-display text-[17px] font-semibold"><svg class="icon text-band-hl" aria-hidden="true" focusable="false"><use href="#i-clock"/></svg>Recordings kept as you choose</p><p class="mt-1.5 text-[15px] leading-snug text-band-muted">Recording is optional and disclosed. Recordings are deleted on the schedule you set.</p></li>
        <li class="rounded-[16px] border border-band-line bg-band-surface p-4"><p class="flex items-center gap-2 font-display text-[17px] font-semibold"><svg class="icon text-band-hl" aria-hidden="true" focusable="false"><use href="#i-phone"/></svg>Consent-only reminders</p><p class="mt-1.5 text-[15px] leading-snug text-band-muted">Recalls and offers go only to patients who agreed, in line with PECR.</p></li>
      </ul>
      <p class="mt-4 text-[14px] text-band-muted"><span class="flag">[CONFIRM] data processing agreement and retention options</span></p>
    </div>
  </div>
</section>


<!-- ===== COMPONENT: ClinicStories ===== -->
<section id="stories" data-component="ClinicStories" class="bg-surface">
  <div class="container-omh py-20 lg:py-28" data-fb>
    <div>
      <div><p class="eyebrow"><span class="eyebrow-mark" aria-hidden="true"><i></i><i></i><i></i></span>Clinic stories</p><h2>Hear it from <span class="hl">clinic teams</span></h2></div>
      <p class="mt-5 text-muted">Short videos from clinic managers and dentists. Each story stays marked as pending until we have checked the results.</p>
    </div>
    <ul class="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3" data-fb-list>
      <li class="flex">
        <article class="flex w-full flex-col rounded-[18px] border border-line bg-paper p-3 transition-colors hover:border-[var(--line-strong)]">
          <button type="button" class="group block w-full text-left" aria-haspopup="dialog" data-video-modal-open data-video-id="[PLACEHOLDER]" data-video-title="Evening calls at a Manchester clinic" data-video-meta="[Clinic name], Clinic manager. Manchester" data-track="clinic_story_open" data-track-name="Manchester" aria-label="Play video: Evening calls at a Manchester clinic (opens in a pop-up)">
            <span class="block transition-transform group-hover:scale-[1.015]"><span class="relative block aspect-video overflow-hidden rounded-[14px] bg-[var(--tint-1)]">
            <span class="pointer-events-none absolute -right-6 -top-4 text-ink/10" aria-hidden="true"><svg class="icon !h-[140px] !w-[140px]" aria-hidden="true" focusable="false"><use href="#i-stethoscope"/></svg></span>
            <span class="vn-wave thumb-wave absolute inset-x-[8%] bottom-10 !h-7 opacity-50" aria-hidden="true"><i style="height:30%"></i><i style="height:55%"></i><i style="height:80%"></i><i style="height:45%"></i><i style="height:65%"></i><i style="height:90%"></i><i style="height:50%"></i><i style="height:35%"></i><i style="height:70%"></i><i style="height:85%"></i><i style="height:40%"></i><i style="height:60%"></i><i style="height:75%"></i><i style="height:30%"></i><i style="height:50%"></i><i style="height:65%"></i><i style="height:45%"></i><i style="height:80%"></i><i style="height:55%"></i><i style="height:35%"></i><i style="height:60%"></i><i style="height:40%"></i><i style="height:70%"></i><i style="height:30%"></i></span>
            <span class="absolute left-1/2 top-[42%] grid h-[60px] w-[60px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gold text-navy shadow-[0_10px_24px_-8px_rgb(0_0_0/0.55)]" aria-hidden="true"><svg class="icon !h-7 !w-7 translate-x-0.5" aria-hidden="true" focusable="false"><use href="#i-play"/></svg></span>
            <span class="absolute bottom-3 right-3 rounded-[5px] bg-[#000]/85 px-1.5 py-0.5 text-[13px] font-semibold text-white tnum">1:12</span>
          </span></span>
          </button>
          <div class="flex flex-1 flex-col px-2 pb-2 pt-4">
            <p class="flex flex-wrap items-center gap-2"><span class="chip">Private clinic</span><span class="chip"><svg class="icon" aria-hidden="true" focusable="false"><use href="#i-map-pin"/></svg>Manchester</span></p>
            <h3 class="mt-3 !text-[20px] !leading-[1.3]">Evening calls at a Manchester clinic</h3>
            <blockquote class="mt-2.5 border-l-[3px] border-gold pl-3.5 text-[15.5px] leading-[1.5] text-muted"><p><span class="flag">[PLACEHOLDER]</span> Quote to follow, covering evening new-patient calls and how many became bookings.</p></blockquote>
            <div class="mt-auto flex items-center justify-between gap-3 pt-4 text-[14.5px]"><span><span class="font-semibold">[Name]</span>, Clinic manager</span><span class="chip chip-pending">Result: pending</span></div>
          </div>
        </article>
      </li>
      <li class="flex">
        <article class="flex w-full flex-col rounded-[18px] border border-line bg-paper p-3 transition-colors hover:border-[var(--line-strong)]">
          <button type="button" class="group block w-full text-left" aria-haspopup="dialog" data-video-modal-open data-video-id="[PLACEHOLDER]" data-video-title="Lunchtime cover at a London clinic" data-video-meta="[Clinic name], Principal dentist. London" data-track="clinic_story_open" data-track-name="London" aria-label="Play video: Lunchtime cover at a London clinic (opens in a pop-up)">
            <span class="block transition-transform group-hover:scale-[1.015]"><span class="relative block aspect-video overflow-hidden rounded-[14px] bg-[var(--tint-2)]">
            <span class="pointer-events-none absolute -right-6 -top-4 text-ink/10" aria-hidden="true"><svg class="icon !h-[140px] !w-[140px]" aria-hidden="true" focusable="false"><use href="#i-stethoscope"/></svg></span>
            <span class="vn-wave thumb-wave absolute inset-x-[8%] bottom-10 !h-7 opacity-50" aria-hidden="true"><i style="height:45%"></i><i style="height:70%"></i><i style="height:35%"></i><i style="height:85%"></i><i style="height:60%"></i><i style="height:40%"></i><i style="height:75%"></i><i style="height:55%"></i><i style="height:90%"></i><i style="height:30%"></i><i style="height:65%"></i><i style="height:50%"></i><i style="height:80%"></i><i style="height:45%"></i><i style="height:35%"></i><i style="height:70%"></i><i style="height:60%"></i><i style="height:85%"></i><i style="height:40%"></i><i style="height:55%"></i><i style="height:30%"></i><i style="height:75%"></i><i style="height:50%"></i><i style="height:65%"></i></span>
            <span class="absolute left-1/2 top-[42%] grid h-[60px] w-[60px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gold text-navy shadow-[0_10px_24px_-8px_rgb(0_0_0/0.55)]" aria-hidden="true"><svg class="icon !h-7 !w-7 translate-x-0.5" aria-hidden="true" focusable="false"><use href="#i-play"/></svg></span>
            <span class="absolute bottom-3 right-3 rounded-[5px] bg-[#000]/85 px-1.5 py-0.5 text-[13px] font-semibold text-white tnum">0:58</span>
          </span></span>
          </button>
          <div class="flex flex-1 flex-col px-2 pb-2 pt-4">
            <p class="flex flex-wrap items-center gap-2"><span class="chip">Private clinic</span><span class="chip"><svg class="icon" aria-hidden="true" focusable="false"><use href="#i-map-pin"/></svg>London</span></p>
            <h3 class="mt-3 !text-[20px] !leading-[1.3]">Lunchtime cover at a London clinic</h3>
            <blockquote class="mt-2.5 border-l-[3px] border-gold pl-3.5 text-[15.5px] leading-[1.5] text-muted"><p><span class="flag">[PLACEHOLDER]</span> Quote to follow, covering calls answered while reception was at lunch.</p></blockquote>
            <div class="mt-auto flex items-center justify-between gap-3 pt-4 text-[14.5px]"><span><span class="font-semibold">[Name]</span>, Principal dentist</span><span class="chip chip-pending">Result: pending</span></div>
          </div>
        </article>
      </li>
      <li class="flex">
        <article class="flex w-full flex-col rounded-[18px] border border-line bg-paper p-3 transition-colors hover:border-[var(--line-strong)]">
          <button type="button" class="group block w-full text-left" aria-haspopup="dialog" data-video-modal-open data-video-id="[PLACEHOLDER]" data-video-title="Physiotherapy enquiries at a Leeds clinic" data-video-meta="[Clinic name], Treatment coordinator. Leeds" data-track="clinic_story_open" data-track-name="Leeds" aria-label="Play video: Physiotherapy enquiries at a Leeds clinic (opens in a pop-up)">
            <span class="block transition-transform group-hover:scale-[1.015]"><span class="relative block aspect-video overflow-hidden rounded-[14px] bg-[var(--tint-3)]">
            <span class="pointer-events-none absolute -right-6 -top-4 text-ink/10" aria-hidden="true"><svg class="icon !h-[140px] !w-[140px]" aria-hidden="true" focusable="false"><use href="#i-stethoscope"/></svg></span>
            <span class="vn-wave thumb-wave absolute inset-x-[8%] bottom-10 !h-7 opacity-50" aria-hidden="true"><i style="height:60%"></i><i style="height:35%"></i><i style="height:75%"></i><i style="height:50%"></i><i style="height:90%"></i><i style="height:40%"></i><i style="height:65%"></i><i style="height:80%"></i><i style="height:30%"></i><i style="height:55%"></i><i style="height:70%"></i><i style="height:45%"></i><i style="height:85%"></i><i style="height:35%"></i><i style="height:60%"></i><i style="height:50%"></i><i style="height:75%"></i><i style="height:40%"></i><i style="height:90%"></i><i style="height:30%"></i><i style="height:65%"></i><i style="height:55%"></i><i style="height:45%"></i><i style="height:70%"></i></span>
            <span class="absolute left-1/2 top-[42%] grid h-[60px] w-[60px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gold text-navy shadow-[0_10px_24px_-8px_rgb(0_0_0/0.55)]" aria-hidden="true"><svg class="icon !h-7 !w-7 translate-x-0.5" aria-hidden="true" focusable="false"><use href="#i-play"/></svg></span>
            <span class="absolute bottom-3 right-3 rounded-[5px] bg-[#000]/85 px-1.5 py-0.5 text-[13px] font-semibold text-white tnum">1:04</span>
          </span></span>
          </button>
          <div class="flex flex-1 flex-col px-2 pb-2 pt-4">
            <p class="flex flex-wrap items-center gap-2"><span class="chip">Private clinic</span><span class="chip"><svg class="icon" aria-hidden="true" focusable="false"><use href="#i-map-pin"/></svg>Leeds</span></p>
            <h3 class="mt-3 !text-[20px] !leading-[1.3]">Physiotherapy enquiries at a Leeds clinic</h3>
            <blockquote class="mt-2.5 border-l-[3px] border-gold pl-3.5 text-[15.5px] leading-[1.5] text-muted"><p><span class="flag">[PLACEHOLDER]</span> Quote to follow, covering weekend treatment enquiries and consultations booked.</p></blockquote>
            <div class="mt-auto flex items-center justify-between gap-3 pt-4 text-[14.5px]"><span><span class="font-semibold">[Name]</span>, Treatment coordinator</span><span class="chip chip-pending">Result: pending</span></div>
          </div>
        </article>
      </li>
      <li class="flex" data-fb-extra hidden>
        <article class="flex w-full flex-col rounded-[18px] border border-line bg-paper p-3 transition-colors hover:border-[var(--line-strong)]">
          <button type="button" class="group block w-full text-left" aria-haspopup="dialog" data-video-modal-open data-video-id="[PLACEHOLDER]" data-video-title="Filling cancellations in Birmingham" data-video-meta="[Clinic name], Clinic owner. Birmingham" data-track="clinic_story_open" data-track-name="Birmingham" aria-label="Play video: Filling cancellations in Birmingham (opens in a pop-up)">
            <span class="block transition-transform group-hover:scale-[1.015]"><span class="relative block aspect-video overflow-hidden rounded-[14px] bg-[var(--tint-4)]">
            <span class="pointer-events-none absolute -right-6 -top-4 text-ink/10" aria-hidden="true"><svg class="icon !h-[140px] !w-[140px]" aria-hidden="true" focusable="false"><use href="#i-stethoscope"/></svg></span>
            <span class="vn-wave thumb-wave absolute inset-x-[8%] bottom-10 !h-7 opacity-50" aria-hidden="true"><i style="height:35%"></i><i style="height:80%"></i><i style="height:50%"></i><i style="height:65%"></i><i style="height:40%"></i><i style="height:85%"></i><i style="height:30%"></i><i style="height:70%"></i><i style="height:55%"></i><i style="height:90%"></i><i style="height:45%"></i><i style="height:60%"></i><i style="height:35%"></i><i style="height:75%"></i><i style="height:50%"></i><i style="height:80%"></i><i style="height:40%"></i><i style="height:65%"></i><i style="height:30%"></i><i style="height:85%"></i><i style="height:55%"></i><i style="height:70%"></i><i style="height:45%"></i><i style="height:60%"></i></span>
            <span class="absolute left-1/2 top-[42%] grid h-[60px] w-[60px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gold text-navy shadow-[0_10px_24px_-8px_rgb(0_0_0/0.55)]" aria-hidden="true"><svg class="icon !h-7 !w-7 translate-x-0.5" aria-hidden="true" focusable="false"><use href="#i-play"/></svg></span>
            <span class="absolute bottom-3 right-3 rounded-[5px] bg-[#000]/85 px-1.5 py-0.5 text-[13px] font-semibold text-white tnum">0:47</span>
          </span></span>
          </button>
          <div class="flex flex-1 flex-col px-2 pb-2 pt-4">
            <p class="flex flex-wrap items-center gap-2"><span class="chip">Private clinic</span><span class="chip"><svg class="icon" aria-hidden="true" focusable="false"><use href="#i-map-pin"/></svg>Birmingham</span></p>
            <h3 class="mt-3 !text-[20px] !leading-[1.3]">Filling cancellations in Birmingham</h3>
            <blockquote class="mt-2.5 border-l-[3px] border-gold pl-3.5 text-[15.5px] leading-[1.5] text-muted"><p><span class="flag">[PLACEHOLDER]</span> Quote to follow, covering short-notice gaps filled from the waitlist.</p></blockquote>
            <div class="mt-auto flex items-center justify-between gap-3 pt-4 text-[14.5px]"><span><span class="font-semibold">[Name]</span>, Clinic owner</span><span class="chip chip-pending">Result: pending</span></div>
          </div>
        </article>
      </li>
      <li class="flex" data-fb-extra hidden>
        <article class="flex w-full flex-col rounded-[18px] border border-line bg-paper p-3 transition-colors hover:border-[var(--line-strong)]">
          <button type="button" class="group block w-full text-left" aria-haspopup="dialog" data-video-modal-open data-video-id="[PLACEHOLDER]" data-video-title="Monday mornings at a Bristol clinic" data-video-meta="[Clinic name], Reception lead. Bristol" data-track="clinic_story_open" data-track-name="Bristol" aria-label="Play video: Monday mornings at a Bristol clinic (opens in a pop-up)">
            <span class="block transition-transform group-hover:scale-[1.015]"><span class="relative block aspect-video overflow-hidden rounded-[14px] bg-[var(--tint-1)]">
            <span class="pointer-events-none absolute -right-6 -top-4 text-ink/10" aria-hidden="true"><svg class="icon !h-[140px] !w-[140px]" aria-hidden="true" focusable="false"><use href="#i-stethoscope"/></svg></span>
            <span class="vn-wave thumb-wave absolute inset-x-[8%] bottom-10 !h-7 opacity-50" aria-hidden="true"><i style="height:70%"></i><i style="height:45%"></i><i style="height:60%"></i><i style="height:30%"></i><i style="height:80%"></i><i style="height:55%"></i><i style="height:90%"></i><i style="height:35%"></i><i style="height:65%"></i><i style="height:50%"></i><i style="height:75%"></i><i style="height:40%"></i><i style="height:85%"></i><i style="height:60%"></i><i style="height:30%"></i><i style="height:70%"></i><i style="height:45%"></i><i style="height:55%"></i><i style="height:80%"></i><i style="height:35%"></i><i style="height:65%"></i><i style="height:50%"></i><i style="height:90%"></i><i style="height:40%"></i></span>
            <span class="absolute left-1/2 top-[42%] grid h-[60px] w-[60px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gold text-navy shadow-[0_10px_24px_-8px_rgb(0_0_0/0.55)]" aria-hidden="true"><svg class="icon !h-7 !w-7 translate-x-0.5" aria-hidden="true" focusable="false"><use href="#i-play"/></svg></span>
            <span class="absolute bottom-3 right-3 rounded-[5px] bg-[#000]/85 px-1.5 py-0.5 text-[13px] font-semibold text-white tnum">0:52</span>
          </span></span>
          </button>
          <div class="flex flex-1 flex-col px-2 pb-2 pt-4">
            <p class="flex flex-wrap items-center gap-2"><span class="chip">Private clinic</span><span class="chip"><svg class="icon" aria-hidden="true" focusable="false"><use href="#i-map-pin"/></svg>Bristol</span></p>
            <h3 class="mt-3 !text-[20px] !leading-[1.3]">Monday mornings at a Bristol clinic</h3>
            <blockquote class="mt-2.5 border-l-[3px] border-gold pl-3.5 text-[15.5px] leading-[1.5] text-muted"><p><span class="flag">[PLACEHOLDER]</span> Quote to follow, covering the 8am rush and urgent calls routed.</p></blockquote>
            <div class="mt-auto flex items-center justify-between gap-3 pt-4 text-[14.5px]"><span><span class="font-semibold">[Name]</span>, Reception lead</span><span class="chip chip-pending">Result: pending</span></div>
          </div>
        </article>
      </li>
      <li class="flex" data-fb-extra hidden>
        <article class="flex w-full flex-col rounded-[18px] border border-line bg-paper p-3 transition-colors hover:border-[var(--line-strong)]">
          <button type="button" class="group block w-full text-left" aria-haspopup="dialog" data-video-modal-open data-video-id="[PLACEHOLDER]" data-video-title="Recalls that booked in Newcastle" data-video-meta="[Clinic name], Clinic manager. Newcastle" data-track="clinic_story_open" data-track-name="Newcastle" aria-label="Play video: Recalls that booked in Newcastle (opens in a pop-up)">
            <span class="block transition-transform group-hover:scale-[1.015]"><span class="relative block aspect-video overflow-hidden rounded-[14px] bg-[var(--tint-2)]">
            <span class="pointer-events-none absolute -right-6 -top-4 text-ink/10" aria-hidden="true"><svg class="icon !h-[140px] !w-[140px]" aria-hidden="true" focusable="false"><use href="#i-stethoscope"/></svg></span>
            <span class="vn-wave thumb-wave absolute inset-x-[8%] bottom-10 !h-7 opacity-50" aria-hidden="true"><i style="height:30%"></i><i style="height:55%"></i><i style="height:80%"></i><i style="height:45%"></i><i style="height:65%"></i><i style="height:90%"></i><i style="height:50%"></i><i style="height:35%"></i><i style="height:70%"></i><i style="height:85%"></i><i style="height:40%"></i><i style="height:60%"></i><i style="height:75%"></i><i style="height:30%"></i><i style="height:50%"></i><i style="height:65%"></i><i style="height:45%"></i><i style="height:80%"></i><i style="height:55%"></i><i style="height:35%"></i><i style="height:60%"></i><i style="height:40%"></i><i style="height:70%"></i><i style="height:30%"></i></span>
            <span class="absolute left-1/2 top-[42%] grid h-[60px] w-[60px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gold text-navy shadow-[0_10px_24px_-8px_rgb(0_0_0/0.55)]" aria-hidden="true"><svg class="icon !h-7 !w-7 translate-x-0.5" aria-hidden="true" focusable="false"><use href="#i-play"/></svg></span>
            <span class="absolute bottom-3 right-3 rounded-[5px] bg-[#000]/85 px-1.5 py-0.5 text-[13px] font-semibold text-white tnum">0:39</span>
          </span></span>
          </button>
          <div class="flex flex-1 flex-col px-2 pb-2 pt-4">
            <p class="flex flex-wrap items-center gap-2"><span class="chip">Private clinic</span><span class="chip"><svg class="icon" aria-hidden="true" focusable="false"><use href="#i-map-pin"/></svg>Newcastle</span></p>
            <h3 class="mt-3 !text-[20px] !leading-[1.3]">Recalls that booked in Newcastle</h3>
            <blockquote class="mt-2.5 border-l-[3px] border-gold pl-3.5 text-[15.5px] leading-[1.5] text-muted"><p><span class="flag">[PLACEHOLDER]</span> Quote to follow, covering recall reminders and hygiene visits booked.</p></blockquote>
            <div class="mt-auto flex items-center justify-between gap-3 pt-4 text-[14.5px]"><span><span class="font-semibold">[Name]</span>, Clinic manager</span><span class="chip chip-pending">Result: pending</span></div>
          </div>
        </article>
      </li>
    </ul>
    <div class="mt-8 flex justify-center"><button type="button" class="btn btn-secondary" data-fb-more data-track="clinic_stories_more"><svg class="icon" aria-hidden="true" focusable="false"><use href="#i-chevron-down"/></svg>Show 3 more stories</button></div>
  </div>
</section>


<!-- ===== COMPONENT: GettingStarted ===== -->
<section id="getting-started" data-component="GettingStarted" class="bg-surface">
  <div class="container-omh py-20 lg:py-28">
    <div>
      <div><p class="eyebrow"><span class="eyebrow-mark" aria-hidden="true"><i></i><i></i><i></i></span>Getting started</p><h2>From first call <span class="hl">to go-live</span></h2></div>
      <p class="mt-5 text-muted">We do the building. Most of your time goes on two short calls. <span class="flag">[PLACEHOLDER typical go-live time]</span></p>
    </div>
    <ol class="relative mt-12 grid gap-4 md:grid-cols-4">
      <li class="pointer-events-none absolute left-[12.5%] right-[12.5%] top-[27px] hidden h-[2px] bg-[var(--line-strong)] md:block" aria-hidden="true"></li>
      <li class="relative flex flex-col">
        <span class="relative mx-auto grid h-14 w-14 place-items-center rounded-full border-2 border-gold bg-surface font-display text-[20px] font-semibold text-hl shadow-[0_0_0_6px_var(--sand)] md:mx-auto">1</span>
        <div class="mt-4 flex flex-1 flex-col rounded-[18px] border border-line bg-surface p-5 md:text-center">
          <h3 class="!text-[20px]">Discovery call</h3>
          <p class="mt-2 flex-1 text-[15.5px] leading-snug text-muted">We talk through your calls, your diary and your emergency route.</p>
          <p class="mt-4 flex items-center gap-1.5 text-[14px] font-semibold md:justify-center"><svg class="icon !h-4 !w-4 text-hl" aria-hidden="true" focusable="false"><use href="#i-clock"/></svg>30 minutes of your time</p>
        </div>
      </li>
      <li class="relative flex flex-col">
        <span class="relative mx-auto grid h-14 w-14 place-items-center rounded-full border-2 border-gold bg-surface font-display text-[20px] font-semibold text-hl shadow-[0_0_0_6px_var(--sand)] md:mx-auto">2</span>
        <div class="mt-4 flex flex-1 flex-col rounded-[18px] border border-line bg-surface p-5 md:text-center">
          <h3 class="!text-[20px]">We build your agent</h3>
          <p class="mt-2 flex-1 text-[15.5px] leading-snug text-muted">We write the script, set the voice and connect your diary. You approve every word.</p>
          <p class="mt-4 flex items-center gap-1.5 text-[14px] font-semibold md:justify-center"><svg class="icon !h-4 !w-4 text-hl" aria-hidden="true" focusable="false"><use href="#i-clock"/></svg>We do the work</p>
        </div>
      </li>
      <li class="relative flex flex-col">
        <span class="relative mx-auto grid h-14 w-14 place-items-center rounded-full border-2 border-gold bg-surface font-display text-[20px] font-semibold text-hl shadow-[0_0_0_6px_var(--sand)] md:mx-auto">3</span>
        <div class="mt-4 flex flex-1 flex-col rounded-[18px] border border-line bg-surface p-5 md:text-center">
          <h3 class="!text-[20px]">Test it together</h3>
          <p class="mt-2 flex-1 text-[15.5px] leading-snug text-muted">You and your team ring it, try to trip it up and tell us what to change.</p>
          <p class="mt-4 flex items-center gap-1.5 text-[14px] font-semibold md:justify-center"><svg class="icon !h-4 !w-4 text-hl" aria-hidden="true" focusable="false"><use href="#i-clock"/></svg>About an hour</p>
        </div>
      </li>
      <li class="relative flex flex-col">
        <span class="relative mx-auto grid h-14 w-14 place-items-center rounded-full border-2 border-gold bg-surface font-display text-[20px] font-semibold text-hl shadow-[0_0_0_6px_var(--sand)] md:mx-auto">4</span>
        <div class="mt-4 flex flex-1 flex-col rounded-[18px] border border-line bg-surface p-5 md:text-center">
          <h3 class="!text-[20px]">Go live</h3>
          <p class="mt-2 flex-1 text-[15.5px] leading-snug text-muted">Switch it on for the calls you choose. We read the calls and tune it every month.</p>
          <p class="mt-4 flex items-center gap-1.5 text-[14px] font-semibold md:justify-center"><svg class="icon !h-4 !w-4 text-hl" aria-hidden="true" focusable="false"><use href="#i-clock"/></svg>A few minutes a month</p>
        </div>
      </li>
    </ol>
    <div class="mt-8 grid gap-6 rounded-[22px] border border-line bg-surface p-6 sm:p-8 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] lg:gap-12" data-ck>
      <div>
        <h3 class="!text-[24px]">What we'll ask you for</h3>
        <p class="mt-2 text-[16.5px] text-muted">Tick what you already have to hand. Anything missing, we'll help you pull together on the first call.</p>
        <div class="mt-5"><div class="h-2 overflow-hidden rounded-full bg-line"><span class="block h-full w-0 rounded-full bg-gold transition-[width] duration-300" data-ck-bar></span></div><p class="mt-2 text-[15px] font-semibold" aria-live="polite" data-ck-status>0 of 6 ready</p></div>
        <a href="#book-demo" class="btn btn-primary mt-6" data-track="clinic_checklist_book">Book your discovery call</a>
      </div>
      <ul class="grid gap-2.5 sm:grid-cols-2">
        <li class="flex"><label class="flex w-full min-h-[56px] items-center gap-3 rounded-[12px] border border-line bg-paper px-4 py-3 text-[16px] leading-snug has-[:checked]:border-gold has-[:checked]:bg-gold/10"><input type="checkbox" class="h-5 w-5 shrink-0 accent-[var(--color-teal-dark)]" data-ck-item data-track="clinic_checklist_tick" data-track-name="Your fee schedule, self-pay and insured">Your fee schedule, self-pay and insured</label></li>
        <li class="flex"><label class="flex w-full min-h-[56px] items-center gap-3 rounded-[12px] border border-line bg-paper px-4 py-3 text-[16px] leading-snug has-[:checked]:border-gold has-[:checked]:bg-gold/10"><input type="checkbox" class="h-5 w-5 shrink-0 accent-[var(--color-teal-dark)]" data-ck-item data-track="clinic_checklist_tick" data-track-name="Access to your diary or clinic system">Access to your diary or clinic system</label></li>
        <li class="flex"><label class="flex w-full min-h-[56px] items-center gap-3 rounded-[12px] border border-line bg-paper px-4 py-3 text-[16px] leading-snug has-[:checked]:border-gold has-[:checked]:bg-gold/10"><input type="checkbox" class="h-5 w-5 shrink-0 accent-[var(--color-teal-dark)]" data-ck-item data-track="clinic_checklist_tick" data-track-name="Your emergency and out-of-hours route">Your emergency and out-of-hours route</label></li>
        <li class="flex"><label class="flex w-full min-h-[56px] items-center gap-3 rounded-[12px] border border-line bg-paper px-4 py-3 text-[16px] leading-snug has-[:checked]:border-gold has-[:checked]:bg-gold/10"><input type="checkbox" class="h-5 w-5 shrink-0 accent-[var(--color-teal-dark)]" data-ck-item data-track="clinic_checklist_tick" data-track-name="New patient and waiting list rules">New patient and waiting list rules</label></li>
        <li class="flex"><label class="flex w-full min-h-[56px] items-center gap-3 rounded-[12px] border border-line bg-paper px-4 py-3 text-[16px] leading-snug has-[:checked]:border-gold has-[:checked]:bg-gold/10"><input type="checkbox" class="h-5 w-5 shrink-0 accent-[var(--color-teal-dark)]" data-ck-item data-track="clinic_checklist_tick" data-track-name="Opening hours and how you would like to be greeted">Opening hours and how you would like to be greeted</label></li>
        <li class="flex"><label class="flex w-full min-h-[56px] items-center gap-3 rounded-[12px] border border-line bg-paper px-4 py-3 text-[16px] leading-snug has-[:checked]:border-gold has-[:checked]:bg-gold/10"><input type="checkbox" class="h-5 w-5 shrink-0 accent-[var(--color-teal-dark)]" data-ck-item data-track="clinic_checklist_tick" data-track-name="Who calls should be put through to">Who calls should be put through to</label></li>
      </ul>
    </div>
  </div>
</section>


<!-- ===== COMPONENT: Pricing ===== -->
${roiCalculator("clinics")}

${pricingSection("bg-surface")}


<!-- ===== COMPONENT: FAQ ===== -->
<section id="faq" data-component="FAQ" class="bg-paper">
  <div class="container-omh py-20 lg:py-28">
    <div class="mx-auto text-center">
      <p class="eyebrow justify-center"><span class="eyebrow-mark" aria-hidden="true"><i></i><i></i><i></i></span>Questions</p>
      <h2>What clinics <span class="hl">ask us first</span></h2>
      <p class="mt-5 text-muted">Search for a word, or pick a topic.</p>
    </div>
    <div class="mx-auto mt-10" data-faq>
      <div class="relative">
        <label for="faq-search" class="sr-only">Search the questions</label>
        <span class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true"><svg class="icon" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg></span>
        <input id="faq-search" type="search" placeholder="Try insurance, urgent or GDPR" autocomplete="off" class="field !min-h-[54px] !rounded-[12px] !pl-12" data-faq-search data-track="faq_search">
      </div>
      <div role="group" aria-label="Filter questions by topic" class="mt-4 flex flex-wrap justify-center gap-2">
        <button type="button" class="min-h-[44px] rounded-full border border-[var(--line-strong)] px-4 text-[15px] font-semibold aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-paper" data-faq-filter="all" aria-pressed="true" data-track="faq_filter" data-track-name="All questions">All questions <span class="ml-1 opacity-70 tnum" data-faq-count="all"></span></button>
        <button type="button" class="min-h-[44px] rounded-full border border-[var(--line-strong)] px-4 text-[15px] font-semibold aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-paper" data-faq-filter="patients" aria-pressed="false" data-track="faq_filter" data-track-name="Patients and AI">Patients and AI <span class="ml-1 opacity-70 tnum" data-faq-count="patients"></span></button>
        <button type="button" class="min-h-[44px] rounded-full border border-[var(--line-strong)] px-4 text-[15px] font-semibold aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-paper" data-faq-filter="clinical" aria-pressed="false" data-track="faq_filter" data-track-name="Clinical safety">Clinical safety <span class="ml-1 opacity-70 tnum" data-faq-count="clinical"></span></button>
        <button type="button" class="min-h-[44px] rounded-full border border-[var(--line-strong)] px-4 text-[15px] font-semibold aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-paper" data-faq-filter="setup" aria-pressed="false" data-track="faq_filter" data-track-name="Setup and systems">Setup and systems <span class="ml-1 opacity-70 tnum" data-faq-count="setup"></span></button>
        <button type="button" class="min-h-[44px] rounded-full border border-[var(--line-strong)] px-4 text-[15px] font-semibold aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-paper" data-faq-filter="data" aria-pressed="false" data-track="faq_filter" data-track-name="Data and rules">Data and rules <span class="ml-1 opacity-70 tnum" data-faq-count="data"></span></button>
        <button type="button" class="min-h-[44px] rounded-full border border-[var(--line-strong)] px-4 text-[15px] font-semibold aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-paper" data-faq-filter="working" aria-pressed="false" data-track="faq_filter" data-track-name="Working with us">Working with us <span class="ml-1 opacity-70 tnum" data-faq-count="working"></span></button>
      </div>
      <div class="mt-5 flex items-center justify-between gap-4 text-[15px] text-muted">
        <p aria-live="polite" data-faq-status>Showing all 11 questions</p>
        <button type="button" class="inline-flex min-h-[44px] items-center gap-1.5 font-semibold text-ink hover:text-hl" data-faq-expand data-track="faq_expand_all">Open all</button>
      </div>
      <div class="mt-2 space-y-3">
      <details class="group rounded-[14px] border border-line bg-surface transition-colors open:border-[var(--line-strong)] open:shadow-[0_18px_40px_-30px_rgb(0_0_0/0.45)]" data-faq-item data-cat="patients" open data-track-name="Will patients know they are talking to an AI?">
        <summary class="flex min-h-[64px] items-center gap-4 px-5 py-4">
          <span class="num hidden w-7 shrink-0 text-[15px] sm:block" aria-hidden="true">01</span>
          <span class="min-w-0 flex-1"><h3 class="!text-[clamp(18px,17px+.3vw,20.5px)] !leading-[1.3]">Will patients know they are talking to an AI?</h3><span class="mt-1 block text-[13.5px] font-semibold text-muted">Patients and AI</span></span>
          <span class="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--line-strong)] group-open:border-gold group-open:bg-gold group-open:text-navy"><svg class="icon faq-chevron" aria-hidden="true" focusable="false"><use href="#i-chevron-down"/></svg></span>
        </summary>
        <div class="px-5 pb-6 text-[17px] text-muted sm:pl-[4.25rem]">
          <p>Yes. Every agent says it is an AI assistant at the start of the call. Patients deserve to know, and anyone who would rather speak to a person can ask.</p>
          
        </div>
      </details>
      <details class="group rounded-[14px] border border-line bg-surface transition-colors open:border-[var(--line-strong)] open:shadow-[0_18px_40px_-30px_rgb(0_0_0/0.45)]" data-faq-item data-cat="clinical" data-track-name="Does it give clinical or medical advice?">
        <summary class="flex min-h-[64px] items-center gap-4 px-5 py-4">
          <span class="num hidden w-7 shrink-0 text-[15px] sm:block" aria-hidden="true">02</span>
          <span class="min-w-0 flex-1"><h3 class="!text-[clamp(18px,17px+.3vw,20.5px)] !leading-[1.3]">Does it give clinical or medical advice?</h3><span class="mt-1 block text-[13.5px] font-semibold text-muted">Clinical safety</span></span>
          <span class="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--line-strong)] group-open:border-gold group-open:bg-gold group-open:text-navy"><svg class="icon faq-chevron" aria-hidden="true" focusable="false"><use href="#i-chevron-down"/></svg></span>
        </summary>
        <div class="px-5 pb-6 text-[17px] text-muted sm:pl-[4.25rem]">
          <p>No. The agent never assesses symptoms, suggests treatment or gives medical advice. It books, answers practical questions from information you approve and passes anything clinical to your team.</p>
          
        </div>
      </details>
      <details class="group rounded-[14px] border border-line bg-surface transition-colors open:border-[var(--line-strong)] open:shadow-[0_18px_40px_-30px_rgb(0_0_0/0.45)]" data-faq-item data-cat="clinical" data-track-name="What happens with clinic emergencies out of hours?">
        <summary class="flex min-h-[64px] items-center gap-4 px-5 py-4">
          <span class="num hidden w-7 shrink-0 text-[15px] sm:block" aria-hidden="true">03</span>
          <span class="min-w-0 flex-1"><h3 class="!text-[clamp(18px,17px+.3vw,20.5px)] !leading-[1.3]">What happens with clinic emergencies out of hours?</h3><span class="mt-1 block text-[13.5px] font-semibold text-muted">Clinical safety</span></span>
          <span class="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--line-strong)] group-open:border-gold group-open:bg-gold group-open:text-navy"><svg class="icon faq-chevron" aria-hidden="true" focusable="false"><use href="#i-chevron-down"/></svg></span>
        </summary>
        <div class="px-5 pb-6 text-[17px] text-muted sm:pl-[4.25rem]">
          <p>It follows the route you set. That could be your on-call dentist, your emergency line, or giving NHS 111 details. Every urgent call is flagged at the top of the morning summary.</p>
          
        </div>
      </details>
      <details class="group rounded-[14px] border border-line bg-surface transition-colors open:border-[var(--line-strong)] open:shadow-[0_18px_40px_-30px_rgb(0_0_0/0.45)]" data-faq-item data-cat="patients" data-track-name="Does it work for self-paying and insured patients?">
        <summary class="flex min-h-[64px] items-center gap-4 px-5 py-4">
          <span class="num hidden w-7 shrink-0 text-[15px] sm:block" aria-hidden="true">04</span>
          <span class="min-w-0 flex-1"><h3 class="!text-[clamp(18px,17px+.3vw,20.5px)] !leading-[1.3]">Does it work for self-paying and insured patients?</h3><span class="mt-1 block text-[13.5px] font-semibold text-muted">Patients and AI</span></span>
          <span class="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--line-strong)] group-open:border-gold group-open:bg-gold group-open:text-navy"><svg class="icon faq-chevron" aria-hidden="true" focusable="false"><use href="#i-chevron-down"/></svg></span>
        </summary>
        <div class="px-5 pb-6 text-[17px] text-muted sm:pl-[4.25rem]">
          <p>Yes. It follows your rules for each: insurer authorisation and what it needs, self-pay fees from your schedule, and any membership or scheme details you approve.</p>
          
        </div>
      </details>
      <details class="group rounded-[14px] border border-line bg-surface transition-colors open:border-[var(--line-strong)] open:shadow-[0_18px_40px_-30px_rgb(0_0_0/0.45)]" data-faq-item data-cat="setup" data-track-name="Does it work with our clinic management software?">
        <summary class="flex min-h-[64px] items-center gap-4 px-5 py-4">
          <span class="num hidden w-7 shrink-0 text-[15px] sm:block" aria-hidden="true">05</span>
          <span class="min-w-0 flex-1"><h3 class="!text-[clamp(18px,17px+.3vw,20.5px)] !leading-[1.3]">Does it work with our clinic management software?</h3><span class="mt-1 block text-[13.5px] font-semibold text-muted">Setup and systems</span></span>
          <span class="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--line-strong)] group-open:border-gold group-open:bg-gold group-open:text-navy"><svg class="icon faq-chevron" aria-hidden="true" focusable="false"><use href="#i-chevron-down"/></svg></span>
        </summary>
        <div class="px-5 pb-6 text-[17px] text-muted sm:pl-[4.25rem]">
          <p>It works with most diaries and clinic systems. We check yours on the first call and tell you plainly what connects directly and what needs a workaround.</p>
          <p class="mt-3"><span class="flag flag-wrap">[CONFIRM] supported clinic management systems</span></p>
        </div>
      </details>
      <details class="group rounded-[14px] border border-line bg-surface transition-colors open:border-[var(--line-strong)] open:shadow-[0_18px_40px_-30px_rgb(0_0_0/0.45)]" data-faq-item data-cat="patients" data-track-name="How does it handle elderly or anxious patients?">
        <summary class="flex min-h-[64px] items-center gap-4 px-5 py-4">
          <span class="num hidden w-7 shrink-0 text-[15px] sm:block" aria-hidden="true">06</span>
          <span class="min-w-0 flex-1"><h3 class="!text-[clamp(18px,17px+.3vw,20.5px)] !leading-[1.3]">How does it handle elderly or anxious patients?</h3><span class="mt-1 block text-[13.5px] font-semibold text-muted">Patients and AI</span></span>
          <span class="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--line-strong)] group-open:border-gold group-open:bg-gold group-open:text-navy"><svg class="icon faq-chevron" aria-hidden="true" focusable="false"><use href="#i-chevron-down"/></svg></span>
        </summary>
        <div class="px-5 pb-6 text-[17px] text-muted sm:pl-[4.25rem]">
          <p>It speaks clearly, takes its time and repeats details when asked. Anyone who wants a person is put through in your opening hours, or a message is taken for a call back.</p>
          
        </div>
      </details>
      <details class="group rounded-[14px] border border-line bg-surface transition-colors open:border-[var(--line-strong)] open:shadow-[0_18px_40px_-30px_rgb(0_0_0/0.45)]" data-faq-item data-cat="setup" data-track-name="Can it fill last-minute cancellations?">
        <summary class="flex min-h-[64px] items-center gap-4 px-5 py-4">
          <span class="num hidden w-7 shrink-0 text-[15px] sm:block" aria-hidden="true">07</span>
          <span class="min-w-0 flex-1"><h3 class="!text-[clamp(18px,17px+.3vw,20.5px)] !leading-[1.3]">Can it fill last-minute cancellations?</h3><span class="mt-1 block text-[13.5px] font-semibold text-muted">Setup and systems</span></span>
          <span class="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--line-strong)] group-open:border-gold group-open:bg-gold group-open:text-navy"><svg class="icon faq-chevron" aria-hidden="true" focusable="false"><use href="#i-chevron-down"/></svg></span>
        </summary>
        <div class="px-5 pb-6 text-[17px] text-muted sm:pl-[4.25rem]">
          <p>Yes. When a patient cancels, it offers to rebook them, then offers the free slot to waitlist patients who agreed to short-notice offers.</p>
          
        </div>
      </details>
      <details class="group rounded-[14px] border border-line bg-surface transition-colors open:border-[var(--line-strong)] open:shadow-[0_18px_40px_-30px_rgb(0_0_0/0.45)]" data-faq-item data-cat="data" data-track-name="Is patient data kept safe?">
        <summary class="flex min-h-[64px] items-center gap-4 px-5 py-4">
          <span class="num hidden w-7 shrink-0 text-[15px] sm:block" aria-hidden="true">08</span>
          <span class="min-w-0 flex-1"><h3 class="!text-[clamp(18px,17px+.3vw,20.5px)] !leading-[1.3]">Is patient data kept safe?</h3><span class="mt-1 block text-[13.5px] font-semibold text-muted">Data and rules</span></span>
          <span class="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--line-strong)] group-open:border-gold group-open:bg-gold group-open:text-navy"><svg class="icon faq-chevron" aria-hidden="true" focusable="false"><use href="#i-chevron-down"/></svg></span>
        </summary>
        <div class="px-5 pb-6 text-[17px] text-muted sm:pl-[4.25rem]">
          <p>You remain the data controller and OMH acts as your processor under a written data processing agreement, in line with UK GDPR. We agree what is stored, where and for how long before go-live.</p>
          <p class="mt-3"><span class="flag flag-wrap">[CONFIRM] storage region and retention options</span></p>
        </div>
      </details>
      <details data-faq-extra class="group rounded-[14px] border border-line bg-surface transition-colors open:border-[var(--line-strong)] open:shadow-[0_18px_40px_-30px_rgb(0_0_0/0.45)]" data-faq-item data-cat="data" data-track-name="Are calls recorded?">
        <summary class="flex min-h-[64px] items-center gap-4 px-5 py-4">
          <span class="num hidden w-7 shrink-0 text-[15px] sm:block" aria-hidden="true">09</span>
          <span class="min-w-0 flex-1"><h3 class="!text-[clamp(18px,17px+.3vw,20.5px)] !leading-[1.3]">Are calls recorded?</h3><span class="mt-1 block text-[13.5px] font-semibold text-muted">Data and rules</span></span>
          <span class="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--line-strong)] group-open:border-gold group-open:bg-gold group-open:text-navy"><svg class="icon faq-chevron" aria-hidden="true" focusable="false"><use href="#i-chevron-down"/></svg></span>
        </summary>
        <div class="px-5 pb-6 text-[17px] text-muted sm:pl-[4.25rem]">
          <p>Only if you want them to be. Patients are told at the start of the call, and recordings are deleted on the schedule you set.</p>
          
        </div>
      </details>
      <details data-faq-extra class="group rounded-[14px] border border-line bg-surface transition-colors open:border-[var(--line-strong)] open:shadow-[0_18px_40px_-30px_rgb(0_0_0/0.45)]" data-faq-item data-cat="working" data-track-name="Will it replace our receptionists?">
        <summary class="flex min-h-[64px] items-center gap-4 px-5 py-4">
          <span class="num hidden w-7 shrink-0 text-[15px] sm:block" aria-hidden="true">10</span>
          <span class="min-w-0 flex-1"><h3 class="!text-[clamp(18px,17px+.3vw,20.5px)] !leading-[1.3]">Will it replace our receptionists?</h3><span class="mt-1 block text-[13.5px] font-semibold text-muted">Working with us</span></span>
          <span class="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--line-strong)] group-open:border-gold group-open:bg-gold group-open:text-navy"><svg class="icon faq-chevron" aria-hidden="true" focusable="false"><use href="#i-chevron-down"/></svg></span>
        </summary>
        <div class="px-5 pb-6 text-[17px] text-muted sm:pl-[4.25rem]">
          <p>No. It takes the overflow and the routine calls, so your team can look after the patients in front of them. You choose when it answers: only when the lines are busy, only out of hours, or first on every call. Anything clinical, sensitive or complicated still goes to your team.</p>
          
        </div>
      </details>
      <details data-faq-extra class="group rounded-[14px] border border-line bg-surface transition-colors open:border-[var(--line-strong)] open:shadow-[0_18px_40px_-30px_rgb(0_0_0/0.45)]" data-faq-item data-cat="working" data-track-name="Is there a minimum contract?">
        <summary class="flex min-h-[64px] items-center gap-4 px-5 py-4">
          <span class="num hidden w-7 shrink-0 text-[15px] sm:block" aria-hidden="true">11</span>
          <span class="min-w-0 flex-1"><h3 class="!text-[clamp(18px,17px+.3vw,20.5px)] !leading-[1.3]">Is there a minimum contract?</h3><span class="mt-1 block text-[13.5px] font-semibold text-muted">Working with us</span></span>
          <span class="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--line-strong)] group-open:border-gold group-open:bg-gold group-open:text-navy"><svg class="icon faq-chevron" aria-hidden="true" focusable="false"><use href="#i-chevron-down"/></svg></span>
        </summary>
        <div class="px-5 pb-6 text-[17px] text-muted sm:pl-[4.25rem]">
          <p>We set out the terms in writing before you start, including notice period and what is included each month. Every invoice shows minutes used and any extra.</p>
          <p class="mt-3">Billed monthly, 30 days notice.</p>
        </div>
      </details>
      </div>
      <button type="button" class="btn btn-secondary mt-4 w-full" data-faq-more data-track="faq_show_more">Show 3 more questions</button>
      <div class="mt-3 rounded-[14px] border border-dashed border-[var(--line-strong)] p-6 text-center" data-faq-empty hidden>
        <p class="font-display text-[18px] font-semibold">No questions match that</p>
        <p class="mt-1 text-[16px] text-muted">Try another word, or ring us on <a href="tel:+442034893934" class="font-semibold text-ink underline decoration-gold decoration-2 underline-offset-4 tnum">020 3489 3934</a>.</p>
      </div>
    </div>
  </div>
</section>


<!-- ===== COMPONENT: FinalCTA ===== -->
<section id="book-demo" data-component="FinalCTA" class="on-band relative overflow-hidden bg-band text-band-ink">
  <div class="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-gold/15 blur-3xl" aria-hidden="true"></div>
  <div class="container-omh relative py-20 lg:py-28" data-bk>
    <div class="mx-auto text-center">
      <p class="eyebrow justify-center eyebrow-band"><span class="eyebrow-mark" aria-hidden="true"><i></i><i></i><i></i></span>Get started</p>
      <h2>See it working <span class="hl">for your clinic</span></h2>
      <p class="mx-auto mt-5 text-band-muted">Pick how you'd like to start. No obligation, and if an AI receptionist isn't right for your clinic, we'll tell you.</p>
    </div>

    <div role="tablist" aria-label="How would you like to start?" class="mx-auto mt-10 grid gap-3 md:grid-cols-3">
      <button type="button" role="tab" id="bk-tab-call" aria-controls="bk-panel-call" aria-selected="true" tabindex="0" class="bk-path group flex items-start gap-4 rounded-[16px] border border-band-line bg-band-surface p-4 text-left transition-colors hover:border-[rgb(247_246_242/.4)] aria-selected:border-gold aria-selected:shadow-[0_0_0_1px_var(--color-teal)] sm:p-5" data-bk-path="call" data-track="booking_path" data-track-name="Book a 30-minute demo">
          <span class="grid h-11 w-11 shrink-0 place-items-center rounded-[12px] bg-gold/20 text-band-hl group-aria-selected:bg-gold group-aria-selected:text-navy" aria-hidden="true"><svg class="icon !h-5 !w-5" aria-hidden="true" focusable="false"><use href="#i-calendar"/></svg></span>
          <span class="min-w-0">
            <span class="mb-1 inline-block rounded-full bg-gold px-2 py-0.5 text-[12px] font-semibold text-navy">Most popular</span>
            <span class="block font-display text-[18px] font-semibold leading-tight">Book a 30-minute demo</span>
            <span class="mt-1 block text-[14.5px] leading-snug text-band-muted">Pick a time. We show you an agent set up for a private clinic.</span>
          </span>
        </button>
      <button type="button" role="tab" id="bk-tab-ring" aria-controls="bk-panel-ring" aria-selected="false" tabindex="-1" class="bk-path group flex items-start gap-4 rounded-[16px] border border-band-line bg-band-surface p-4 text-left transition-colors hover:border-[rgb(247_246_242/.4)] aria-selected:border-gold aria-selected:shadow-[0_0_0_1px_var(--color-teal)] sm:p-5" data-bk-path="ring" data-track="booking_path" data-track-name="Ring our demo agent now">
          <span class="grid h-11 w-11 shrink-0 place-items-center rounded-[12px] bg-gold/20 text-band-hl group-aria-selected:bg-gold group-aria-selected:text-navy" aria-hidden="true"><svg class="icon !h-5 !w-5" aria-hidden="true" focusable="false"><use href="#i-phone-incoming"/></svg></span>
          <span class="min-w-0">
            
            <span class="block font-display text-[18px] font-semibold leading-tight">Ring our demo agent now</span>
            <span class="mt-1 block text-[14.5px] leading-snug text-band-muted">Hear one in action straight away, any time of day.</span>
          </span>
        </button>
      <button type="button" role="tab" id="bk-tab-back" aria-controls="bk-panel-back" aria-selected="false" tabindex="-1" class="bk-path group flex items-start gap-4 rounded-[16px] border border-band-line bg-band-surface p-4 text-left transition-colors hover:border-[rgb(247_246_242/.4)] aria-selected:border-gold aria-selected:shadow-[0_0_0_1px_var(--color-teal)] sm:p-5" data-bk-path="back" data-track="booking_path" data-track-name="Ask for a call back">
          <span class="grid h-11 w-11 shrink-0 place-items-center rounded-[12px] bg-gold/20 text-band-hl group-aria-selected:bg-gold group-aria-selected:text-navy" aria-hidden="true"><svg class="icon !h-5 !w-5" aria-hidden="true" focusable="false"><use href="#i-phone-forwarded"/></svg></span>
          <span class="min-w-0">
            
            <span class="block font-display text-[18px] font-semibold leading-tight">Ask for a call back</span>
            <span class="mt-1 block text-[14.5px] leading-snug text-band-muted">Leave your number and a good time. Takes 20 seconds.</span>
          </span>
        </button>
    </div>

    <div class="mx-auto mt-5">
      <!-- Path 1: book a demo -->
      <div role="tabpanel" id="bk-panel-call" aria-labelledby="bk-tab-call" data-bk-panel="call" class="grid overflow-hidden rounded-[20px] bg-surface text-ink shadow-[0_40px_90px_-40px_rgb(0_0_0/0.7)] dark:border dark:border-[var(--line-strong)] lg:grid-cols-[minmax(0,1.3fr)_minmax(0,.7fr)]">
        <form class="p-6 sm:p-8" novalidate data-bk-form>
          <ol class="flex items-center gap-3 text-[14.5px] font-semibold" aria-label="Progress">
            <li class="flex items-center gap-2" data-bk-step-label="1"><span class="grid h-7 w-7 place-items-center rounded-full bg-gold text-navy">1</span>Pick a time</li>
            <li class="h-px w-8 bg-line" aria-hidden="true"></li>
            <li class="flex items-center gap-2 text-muted" data-bk-step-label="2"><span class="grid h-7 w-7 place-items-center rounded-full border border-[var(--line-strong)]">2</span>Your details</li>
          </ol>

          <fieldset class="mt-6" data-bk-step="1">
            <legend class="font-display text-[20px] font-semibold">When suits you?</legend>
            <p class="mt-1 text-[15px] text-muted">These are UK times. We'll confirm by email, or suggest another if it's taken. <span class="flag">[CONFIRM availability]</span></p>
            <p class="mt-5 text-[14.5px] font-semibold text-muted" id="bk-day-label">Day</p>
            <div class="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-5" role="radiogroup" aria-labelledby="bk-day-label" data-bk-days></div>
            <p class="mt-5 text-[14.5px] font-semibold text-muted" id="bk-time-label">Time</p>
            <div class="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-6" role="radiogroup" aria-labelledby="bk-time-label" data-bk-times>
              <button type="button" role="radio" aria-checked="false" class="bk-slot min-h-[48px] rounded-[10px] border border-[var(--line-strong)] text-[15.5px] font-semibold tnum aria-checked:border-ink aria-checked:bg-ink aria-checked:text-paper" data-bk-time="09:30" data-track="booking_time" data-track-name="09:30">09:30</button><button type="button" role="radio" aria-checked="false" class="bk-slot min-h-[48px] rounded-[10px] border border-[var(--line-strong)] text-[15.5px] font-semibold tnum aria-checked:border-ink aria-checked:bg-ink aria-checked:text-paper" data-bk-time="10:30" data-track="booking_time" data-track-name="10:30">10:30</button><button type="button" role="radio" aria-checked="false" class="bk-slot min-h-[48px] rounded-[10px] border border-[var(--line-strong)] text-[15.5px] font-semibold tnum aria-checked:border-ink aria-checked:bg-ink aria-checked:text-paper" data-bk-time="11:30" data-track="booking_time" data-track-name="11:30">11:30</button><button type="button" role="radio" aria-checked="false" class="bk-slot min-h-[48px] rounded-[10px] border border-[var(--line-strong)] text-[15.5px] font-semibold tnum aria-checked:border-ink aria-checked:bg-ink aria-checked:text-paper" data-bk-time="14:00" data-track="booking_time" data-track-name="14:00">14:00</button><button type="button" role="radio" aria-checked="false" class="bk-slot min-h-[48px] rounded-[10px] border border-[var(--line-strong)] text-[15.5px] font-semibold tnum aria-checked:border-ink aria-checked:bg-ink aria-checked:text-paper" data-bk-time="15:00" data-track="booking_time" data-track-name="15:00">15:00</button><button type="button" role="radio" aria-checked="false" class="bk-slot min-h-[48px] rounded-[10px] border border-[var(--line-strong)] text-[15.5px] font-semibold tnum aria-checked:border-ink aria-checked:bg-ink aria-checked:text-paper" data-bk-time="16:00" data-track="booking_time" data-track-name="16:00">16:00</button>
            </div>
            <p class="mt-3 text-[14px] font-semibold text-miss" data-bk-slot-err hidden>Pick a day and a time to carry on.</p>
            <button type="button" class="btn btn-primary mt-7 w-full sm:w-auto" data-bk-next data-track="booking_next">Next: your details<svg class="icon" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></button>
          </fieldset>

          <fieldset class="mt-6" data-bk-step="2" hidden>
            <legend class="font-display text-[20px] font-semibold">Who should we speak to?</legend>
            <div class="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <label for="bk-name" class="block text-[15px] font-semibold">Your name</label>
                <input id="bk-name" name="name" type="text" autocomplete="name" required class="field mt-1.5 !bg-paper" aria-describedby="bk-name-err" data-bk-field >
                <p id="bk-name-err" class="mt-1 text-[14px] font-semibold text-miss" hidden></p>
              </div>
              <div>
                <label for="bk-business" class="block text-[15px] font-semibold">Clinic name</label>
                <input id="bk-business" name="business" type="text" autocomplete="organization" required class="field mt-1.5 !bg-paper" aria-describedby="bk-business-err" data-bk-field >
                <p id="bk-business-err" class="mt-1 text-[14px] font-semibold text-miss" hidden></p>
              </div>
              <div>
                <label for="bk-clinic" class="block text-[15px] font-semibold">Type of clinic</label>
                <select id="bk-clinic" name="clinic" required class="field mt-1.5 !bg-paper" aria-describedby="bk-clinic-err" data-bk-field>
                  <option value="">Choose one</option><option value="nhs">Mostly NHS</option><option value="private">Mostly private</option><option value="mixed">Mixed self-pay and insured</option>
                </select>
                <p id="bk-clinic-err" class="mt-1 text-[14px] font-semibold text-miss" hidden></p>
              </div>
              <div>
                <label for="bk-consulting rooms" class="block text-[15px] font-semibold">Number of consulting rooms</label>
                <select id="bk-consulting rooms" name="consulting rooms" required class="field mt-1.5 !bg-paper" aria-describedby="bk-consulting rooms-err" data-bk-field>
                  <option value="">Choose one</option><option value="1">1</option><option value="2-3">2 to 3</option><option value="4-6">4 to 6</option><option value="7+">7 or more</option><option value="group">Group of clinics</option>
                </select>
                <p id="bk-consulting rooms-err" class="mt-1 text-[14px] font-semibold text-miss" hidden></p>
              </div>
              <div>
                <label for="bk-city" class="block text-[15px] font-semibold">Where you're based</label>
                <select id="bk-city" name="city" required class="field mt-1.5 !bg-paper" aria-describedby="bk-city-err" data-bk-field>
                  <option value="">Choose one</option><option value="london">London</option><option value="birmingham">Birmingham</option><option value="manchester">Manchester</option><option value="leeds">Leeds</option><option value="liverpool">Liverpool</option><option value="bristol">Bristol</option><option value="sheffield">Sheffield</option><option value="nottingham">Nottingham</option><option value="leicester">Leicester</option><option value="newcastle">Newcastle</option><option value="elsewhere">Elsewhere in the UK</option>
                </select>
                <p id="bk-city-err" class="mt-1 text-[14px] font-semibold text-miss" hidden></p>
              </div>
              <div>
                <label for="bk-phone" class="block text-[15px] font-semibold">Phone</label>
                <input id="bk-phone" name="phone" type="tel" autocomplete="tel" required class="field mt-1.5 !bg-paper" aria-describedby="bk-phone-err" data-bk-field inputmode="tel">
                <p id="bk-phone-err" class="mt-1 text-[14px] font-semibold text-miss" hidden></p>
              </div>
              <div>
                <label for="bk-email" class="block text-[15px] font-semibold">Email</label>
                <input id="bk-email" name="email" type="email" autocomplete="email" required class="field mt-1.5 !bg-paper" aria-describedby="bk-email-err" data-bk-field >
                <p id="bk-email-err" class="mt-1 text-[14px] font-semibold text-miss" hidden></p>
              </div>
            </div>
            <label class="mt-5 flex items-start gap-3 text-[15px] leading-snug text-muted">
              <input type="checkbox" name="consent" required class="mt-1 h-5 w-5 shrink-0 accent-[var(--color-teal-dark)]" aria-describedby="bk-consent-err" data-bk-field>
              <span>I'm happy for OMH to contact me about this demo. See our <a href="/privacy" class="font-semibold text-ink underline decoration-gold decoration-2 underline-offset-2">privacy policy</a>.</span>
            </label>
            <p id="bk-consent-err" class="mt-1 text-[14px] font-semibold text-miss" hidden></p>
            <div class="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:items-center">
              <button type="button" class="btn btn-secondary" data-bk-back data-track="booking_back"><svg class="icon rotate-180" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg>Back</button>
              <button type="submit" class="btn btn-primary sm:flex-1" data-track="final_book_demo">Request this demo</button>
            </div>
          </fieldset>

          <div class="py-6 text-center" data-bk-done hidden tabindex="-1">
            <span class="mx-auto grid h-16 w-16 place-items-center rounded-full bg-ok text-surface" aria-hidden="true"><svg class="icon !h-8 !w-8" aria-hidden="true" focusable="false"><use href="#i-check"/></svg></span>
            <h3 class="mt-5 !text-[26px]" data-bk-done-title>Request sent</h3>
            <p class="mx-auto mt-2 text-[16.5px] text-muted">We'll email to confirm <strong class="font-semibold text-ink" data-bk-done-slot></strong> within one working day. <span class="flag">[CONFIRM]</span></p>
          </div>
        </form>

        <aside class="border-t border-line bg-sand p-6 sm:p-8 lg:border-l lg:border-t-0" aria-label="Your demo">
          <p class="font-display text-[18px] font-semibold">Your demo</p>
          <div class="mt-4 rounded-[14px] border border-line bg-surface p-4" aria-live="polite">
            <p class="flex items-center gap-2 text-[15px]"><svg class="icon text-hl" aria-hidden="true" focusable="false"><use href="#i-calendar"/></svg><span data-bk-sum-slot class="font-semibold">Pick a day and time</span></p>
            <p class="mt-2 flex items-center gap-2 text-[15px] text-muted"><svg class="icon text-hl" aria-hidden="true" focusable="false"><use href="#i-clock"/></svg>30 minutes, by video or phone</p>
            <p class="mt-2 flex items-center gap-2 text-[15px] text-muted"><svg class="icon text-hl" aria-hidden="true" focusable="false"><use href="#i-map-pin"/></svg><span data-bk-sum-who>Your clinic</span></p>
          </div>
          <p class="mt-6 font-display text-[16px] font-semibold">On the call we</p>
          <ul class="mt-2 space-y-2 text-[15px] leading-snug">
            <li class="flex gap-2.5"><svg class="icon mt-[3px] text-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span>Ask who rings you and what gets missed</span></li>
            <li class="flex gap-2.5"><svg class="icon mt-[3px] text-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span>Play you an agent set up for a private clinic</span></li>
            <li class="flex gap-2.5"><svg class="icon mt-[3px] text-hl" aria-hidden="true" focusable="false"><use href="#i-check"/></svg><span>Follow up with a clear price in writing</span></li>
          </ul>
        </aside>
      </div>

      <!-- Path 2: ring now -->
      <div role="tabpanel" id="bk-panel-ring" aria-labelledby="bk-tab-ring" data-bk-panel="ring" hidden class="rounded-[20px] bg-surface p-6 text-ink dark:border dark:border-[var(--line-strong)] sm:p-10">
        <div class="grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <h3 class="!text-[clamp(24px,21px+1vw,32px)]">Ring it from any phone</h3>
            <p class="mt-2 text-muted">It's set up as a fictional private clinic and answers day and night. Standard call rates apply.</p>
            <a href="tel:" class="mt-6 flex min-h-[64px] items-center justify-center gap-3 rounded-[14px] bg-gold px-5 font-display text-[clamp(1.3rem,1.1rem+1vw,1.75rem)] font-semibold text-navy tnum" data-demo-number data-track="booking_ring_demo"><svg class="icon" aria-hidden="true" focusable="false"><use href="#i-phone"/></svg>[DEMO NUMBER]</a>
          </div>
          <div class="rounded-[16px] bg-sand p-5">
            <p class="font-display text-[17px] font-semibold">Three things to try</p>
            <ol class="mt-3 space-y-3 text-[16px] leading-snug">
              <li class="flex gap-3"><span class="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-surface text-[14px] font-semibold text-hl">1</span><span>Book a appointment for next week as a new patient.</span></li><li class="flex gap-3"><span class="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-surface text-[14px] font-semibold text-hl">2</span><span>Say you are in pain and hear how it routes you.</span></li><li class="flex gap-3"><span class="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-surface text-[14px] font-semibold text-hl">3</span><span>Ask something it can't know, and hear how it handles it.</span></li>
            </ol>
          </div>
        </div>
      </div>

      <!-- Path 3: call back -->
      <div role="tabpanel" id="bk-panel-back" aria-labelledby="bk-tab-back" data-bk-panel="back" hidden class="rounded-[20px] bg-surface p-6 text-ink dark:border dark:border-[var(--line-strong)] sm:p-10">
        <form class="mx-auto max-w-[620px]" novalidate data-bk-back-form>
          <h3 class="!text-[clamp(24px,21px+1vw,32px)]">We'll ring you</h3>
          <p class="mt-2 text-muted">A person from our UK team, not a robot. We'll ring within one working day. <span class="flag">[CONFIRM]</span></p>
          <div class="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
                <label for="bk-cb-name" class="block text-[15px] font-semibold">Your name</label>
                <input id="bk-cb-name" name="cb-name" type="text" autocomplete="name" required class="field mt-1.5 !bg-paper" aria-describedby="bk-cb-name-err" data-bk-field >
                <p id="bk-cb-name-err" class="mt-1 text-[14px] font-semibold text-miss" hidden></p>
              </div>
            <div>
                <label for="bk-cb-phone" class="block text-[15px] font-semibold">Phone</label>
                <input id="bk-cb-phone" name="cb-phone" type="tel" autocomplete="tel" required class="field mt-1.5 !bg-paper" aria-describedby="bk-cb-phone-err" data-bk-field inputmode="tel">
                <p id="bk-cb-phone-err" class="mt-1 text-[14px] font-semibold text-miss" hidden></p>
              </div>
          </div>
          <p class="mt-5 text-[15px] font-semibold" id="bk-when-label">Best time to ring</p>
          <div class="mt-2 grid grid-cols-3 gap-2" role="radiogroup" aria-labelledby="bk-when-label" data-bk-when>
            <button type="button" role="radio" aria-checked="true" class="min-h-[48px] rounded-[10px] border border-[var(--line-strong)] text-[15.5px] font-semibold aria-checked:border-ink aria-checked:bg-ink aria-checked:text-paper" data-bk-when-opt="Morning" data-track="callback_time" data-track-name="Morning">Morning</button><button type="button" role="radio" aria-checked="false" class="min-h-[48px] rounded-[10px] border border-[var(--line-strong)] text-[15.5px] font-semibold aria-checked:border-ink aria-checked:bg-ink aria-checked:text-paper" data-bk-when-opt="Afternoon" data-track="callback_time" data-track-name="Afternoon">Afternoon</button><button type="button" role="radio" aria-checked="false" class="min-h-[48px] rounded-[10px] border border-[var(--line-strong)] text-[15.5px] font-semibold aria-checked:border-ink aria-checked:bg-ink aria-checked:text-paper" data-bk-when-opt="Evening" data-track="callback_time" data-track-name="Evening">Evening</button>
          </div>
          <button type="submit" class="btn btn-primary mt-7 w-full" data-track="callback_submit">Ring me back</button>
          <p class="mt-4 text-center text-[16px] font-semibold text-ok" data-bk-back-done hidden tabindex="-1">Thanks. We'll ring you in the <span data-bk-back-when>morning</span>.</p>
        </form>
      </div>
    </div>

    <p class="mt-8 text-center text-[15px] text-band-muted">Prefer to write it down? <a href="/contact?type=brief&amp;service=ai-voice-agents" class="font-semibold text-band-ink underline decoration-gold decoration-2 underline-offset-4" data-track="final_send_brief">Send a project brief</a>. UK team based in Hullbridge, Essex.</p>
  </div>
</section>


<!-- ===== COMPONENT: OtherIndustries ===== -->
<section id="more-industries" data-component="OtherIndustries" class="bg-paper">
  <div class="container-omh py-14 lg:py-16">
    <div class="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
      <h2 class="!text-[clamp(1.5rem,1.3rem+.8vw,2rem)]">AI voice agents for other industries</h2>
      <a href="/ai-voice-agents" class="text-link" data-track="clinic_all_industries">All AI voice agents<svg class="icon" aria-hidden="true" focusable="false"><use href="#i-arrow-right"/></svg></a>
    </div>
    <ul class="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
      <li><a href="/ai-voice-agents/clinics-healthcare" class="flex h-full min-h-[64px] items-center gap-3 rounded-[14px] border border-line bg-surface px-4 py-3 font-display text-[15.5px] font-semibold leading-snug hover:border-gold" data-track="clinic_other_industry" data-track-name="Clinics & Healthcare"><svg class="icon text-hl" aria-hidden="true" focusable="false"><use href="#i-stethoscope"/></svg>Clinics &amp; Healthcare</a></li>
      <li><a href="/ai-voice-agents/law-firms" class="flex h-full min-h-[64px] items-center gap-3 rounded-[14px] border border-line bg-surface px-4 py-3 font-display text-[15.5px] font-semibold leading-snug hover:border-gold" data-track="clinic_other_industry" data-track-name="Law Firms"><svg class="icon text-hl" aria-hidden="true" focusable="false"><use href="#i-scale"/></svg>Law Firms</a></li>
      <li><a href="/ai-voice-agents/real-estate-letting-agents" class="flex h-full min-h-[64px] items-center gap-3 rounded-[14px] border border-line bg-surface px-4 py-3 font-display text-[15.5px] font-semibold leading-snug hover:border-gold" data-track="clinic_other_industry" data-track-name="Real Estate & Letting Agents"><svg class="icon text-hl" aria-hidden="true" focusable="false"><use href="#i-home"/></svg>Real Estate &amp; Letting Agents</a></li>
      <li><a href="/ai-voice-agents/plumbers" class="flex h-full min-h-[64px] items-center gap-3 rounded-[14px] border border-line bg-surface px-4 py-3 font-display text-[15.5px] font-semibold leading-snug hover:border-gold" data-track="clinic_other_industry" data-track-name="Plumbers"><svg class="icon text-hl" aria-hidden="true" focusable="false"><use href="#i-wrench"/></svg>Plumbers</a></li>
      <li><a href="/ai-voice-agents/heating-hvac" class="flex h-full min-h-[64px] items-center gap-3 rounded-[14px] border border-line bg-surface px-4 py-3 font-display text-[15.5px] font-semibold leading-snug hover:border-gold" data-track="clinic_other_industry" data-track-name="Heating & HVAC"><svg class="icon text-hl" aria-hidden="true" focusable="false"><use href="#i-flame"/></svg>Heating &amp; HVAC</a></li>
      <li><a href="/ai-voice-agents/car-dealerships" class="flex h-full min-h-[64px] items-center gap-3 rounded-[14px] border border-line bg-surface px-4 py-3 font-display text-[15.5px] font-semibold leading-snug hover:border-gold" data-track="clinic_other_industry" data-track-name="Car Dealerships"><svg class="icon text-hl" aria-hidden="true" focusable="false"><use href="#i-car"/></svg>Car Dealerships</a></li>
    </ul>
  </div>
</section>


<!-- ===== COMPONENT: VideoModal ===== -->
<dialog data-component="VideoModal" data-video-modal aria-labelledby="video-modal-title" class="video-modal m-auto w-[min(960px,calc(100vw-32px),calc((100dvh-170px)*16/9))] max-w-none overflow-visible bg-transparent p-0 text-band-ink backdrop:bg-[#000]/80">
  <div class="on-band overflow-hidden rounded-[16px] bg-band shadow-[0_40px_80px_-30px_rgb(0_0_0/0.6)]">
    <div class="flex items-start justify-between gap-4 px-5 py-4 sm:px-6">
      <div class="min-w-0">
        <p class="text-[14px] font-semibold text-band-hl">Video</p>
        <h2 id="video-modal-title" class="mt-0.5 !text-[clamp(19px,17px+.6vw,24px)] !leading-tight" data-video-modal-title></h2>
        <p class="mt-1 text-[15px] text-band-muted" data-video-modal-meta></p>
      </div>
      <button type="button" class="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-band-line text-band-ink hover:bg-white/10" data-video-modal-close data-track="testimonial_video_close" aria-label="Close video"><svg class="icon" aria-hidden="true" focusable="false"><use href="#i-x"/></svg></button>
    </div>
    <div class="relative aspect-video bg-[#000]" data-video-modal-player></div>
  </div>
</dialog>





<!-- ===== COMPONENT: MobileStickyBar ===== -->
<div data-component="MobileStickyBar" data-sticky-bar class="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper px-4 pb-[max(.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-12px_30px_-18px_rgb(0_0_0/0.35)] md:hidden" inert>
  <div class="flex items-center gap-3">
    <a href="#book-demo" class="btn btn-primary flex-1" data-track="sticky_book_demo">Book a clinic demo</a>
    <a href="tel:+442034893934" class="btn btn-secondary !px-0 w-[52px]" aria-label="Call OMH on 020 3489 3934" data-track="sticky_phone_click"><svg class="icon" aria-hidden="true" focusable="false"><use href="#i-phone"/></svg></a>
  </div>
</div>
`;
