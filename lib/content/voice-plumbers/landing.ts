// /ai-voice-agents/plumbers: hero, how it works and local cover, worded for plumbing businesses. Same
// structure and classes as lib/content/ai-voice-agents-landing-v4.ts (via lib/content/voice-estate/landing.ts).
export const plumbersLandingMarkup = String.raw`
<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">
  <defs>
    <symbol id="v4-i-check" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></symbol>
    <symbol id="v4-i-x" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></symbol>
    <symbol id="v4-i-minus" viewBox="0 0 24 24"><path d="M5 12h14"/></symbol>
    <symbol id="v4-i-plus" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></symbol>
    <symbol id="v4-i-chev" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></symbol>
    <symbol id="v4-i-arrow" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></symbol>
    <symbol id="v4-i-arrow-right" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></symbol>
    <symbol id="v4-i-arrow-left" viewBox="0 0 24 24"><path d="M19 12H5M11 6l-6 6 6 6"/></symbol>
    <symbol id="v4-i-play" viewBox="0 0 24 24"><path d="M8 5.2v13.6a.8.8 0 0 0 1.2.7l10.6-6.8a.8.8 0 0 0 0-1.4L9.2 4.5A.8.8 0 0 0 8 5.2z"/></symbol>
    <symbol id="v4-i-pause" viewBox="0 0 24 24"><rect x="6.5" y="5" width="4" height="14" rx="1"/><rect x="13.5" y="5" width="4" height="14" rx="1"/></symbol>
    <symbol id="v4-i-phone" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></symbol>
    <symbol id="v4-i-phone-missed" viewBox="0 0 24 24"><path d="m16 2 6 6M22 2l-6 6"/><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></symbol>
    <symbol id="v4-i-timer" viewBox="0 0 24 24"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2M10 2h4"/></symbol>
    <symbol id="v4-i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9.5"/><path d="M12 7v5l3.5 2"/></symbol>
    <symbol id="v4-i-calendar" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></symbol>
    <symbol id="v4-i-clipboard" viewBox="0 0 24 24"><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2M12 11h4M12 16h4M8 11h.01M8 16h.01"/></symbol>
    <symbol id="v4-i-user" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1"/></symbol>
    <symbol id="v4-i-users" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></symbol>
    <symbol id="v4-i-megaphone" viewBox="0 0 24 24"><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></symbol>
    <symbol id="v4-i-mail" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 5L2 7"/></symbol>
    <symbol id="v4-i-globe" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></symbol>
    <symbol id="v4-i-wrench" viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></symbol>
    <symbol id="v4-i-refresh" viewBox="0 0 24 24"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8M21 3v5h-5M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16M8 16H3v5"/></symbol>
    <symbol id="v4-i-message" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></symbol>
    <symbol id="v4-i-filter" viewBox="0 0 24 24"><path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/></symbol>
    <symbol id="v4-i-transfer" viewBox="0 0 24 24"><path d="m16 3 4 4-4 4M20 7H4M8 21l-4-4 4-4M4 17h16"/></symbol>
    <symbol id="v4-i-inbox" viewBox="0 0 24 24"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></symbol>
    <symbol id="v4-i-home" viewBox="0 0 24 24"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/></symbol>
    <symbol id="v4-i-mic" viewBox="0 0 24 24"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3"/></symbol>
    <symbol id="v4-i-info" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></symbol>
    <symbol id="v4-i-building" viewBox="0 0 24 24"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01"/></symbol>
    <symbol id="v4-i-keypad" viewBox="0 0 24 24"><circle cx="6" cy="5" r="1.2"/><circle cx="12" cy="5" r="1.2"/><circle cx="18" cy="5" r="1.2"/><circle cx="6" cy="11" r="1.2"/><circle cx="12" cy="11" r="1.2"/><circle cx="18" cy="11" r="1.2"/><circle cx="6" cy="17" r="1.2"/><circle cx="12" cy="17" r="1.2"/><circle cx="18" cy="17" r="1.2"/></symbol>
    <symbol id="v4-i-volume" viewBox="0 0 24 24"><path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14"/></symbol>
    <symbol id="v4-i-tooth" viewBox="0 0 24 24"><path d="M7.5 3C5 3 3.5 5 3.5 7.7c0 2.8 1.2 4.6 1.8 7.3.6 2.8 1.1 6 2.8 6 1.8 0 1.6-4.6 3.9-4.6s2.1 4.6 3.9 4.6c1.7 0 2.2-3.2 2.8-6 .6-2.7 1.8-4.5 1.8-7.3C20.5 5 19 3 16.5 3c-1.9 0-2.8 1-4.5 1S9.4 3 7.5 3z"/></symbol>
    <symbol id="v4-i-medical" viewBox="0 0 24 24"><path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/></symbol>
    <symbol id="v4-i-drop" viewBox="0 0 24 24"><path d="M12 2.7S5 10.2 5 14.6A7 7 0 0 0 19 14.6C19 10.2 12 2.7 12 2.7z"/></symbol>
    <symbol id="v4-i-flame" viewBox="0 0 24 24"><path d="M12 2.5c1 4 6 6 6 11.5a6 6 0 0 1-12 0c0-3 1.8-4.6 2.8-6.1.4 1.9 1.4 3 2.6 3-.6-3-.4-5.8.6-8.4z"/></symbol>
    <symbol id="v4-i-hardhat" viewBox="0 0 24 24"><path d="M2.5 18h19M4 18v-2a8 8 0 0 1 16 0v2M10 9.2V5.5h4v3.7M4 18v2.5h16V18"/></symbol>
    <symbol id="v4-i-scale" viewBox="0 0 24 24"><path d="M12 3v18M7 21h10M5 7h14M5 7l-3 7h6zM19 7l-3 7h6zM12 3l0 0"/></symbol>
    <symbol id="v4-i-car" viewBox="0 0 24 24"><path d="M3.5 15.5 5.2 9.6A3 3 0 0 1 8.1 7.5h7.8a3 3 0 0 1 2.9 2.1l1.7 5.9V19h-16zM3.5 15.5h17M7 19v2M17 19v2"/><circle cx="7.5" cy="12.6" r=".6"/><circle cx="16.5" cy="12.6" r=".6"/></symbol>
    <symbol id="v4-i-shield" viewBox="0 0 24 24"><path d="M12 22s8-3.5 8-10V5l-8-3-8 3v7c0 6.5 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></symbol>
    <symbol id="v4-i-sparkle" viewBox="0 0 24 24"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"/></symbol>
    <symbol id="v4-i-languages" viewBox="0 0 24 24"><path d="m5 8 6 6M4 14l6-6 2-3M2 5h12M7 2h1M22 22l-5-10-5 10M14 18h6"/></symbol>
    <symbol id="v4-i-key" viewBox="0 0 24 24"><path d="M2.6 17.4A2 2 0 0 0 2 18.8V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.2a2 2 0 0 0 1.4-.6l.8-.8a6.5 6.5 0 1 0-4-4z"/><circle cx="16.5" cy="7.5" r="1"/></symbol>
    <symbol id="v4-i-tag" viewBox="0 0 24 24"><path d="M12.6 2.6A2 2 0 0 0 11.2 2H4a2 2 0 0 0-2 2v7.2a2 2 0 0 0 .6 1.4l8.7 8.7a2.4 2.4 0 0 0 3.4 0l6.6-6.6a2.4 2.4 0 0 0 0-3.4z"/><circle cx="7.5" cy="7.5" r="1"/></symbol>
    <symbol id="v4-i-moon" viewBox="0 0 24 24"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z"/></symbol>
    <symbol id="v4-i-book" viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/></symbol>
  </defs>
</svg>

<section id="top" class="hero4 hero-grid" aria-labelledby="hero-title">
  <div class="container-omh pt-12 text-center md:pt-16 lg:pt-20">
    <span class="badge"><span class="voice-mark" aria-hidden="true"><i></i><i></i><i></i></span>AI voice agents · Plumbers</span>
    <h1 class="h1-c mx-auto mt-6" id="hero-title">AI Voice Agent for Plumbers<span class="sr-only">:</span> <br class="max-md:hidden"><span class="hl">Every Job Call Answered</span></h1>
    <p class="lead mx-auto mt-6">Our AI voice agent works as an AI receptionist for plumbers. It answers every call on the first ring, sends burst pipes and leaks to whoever is on call, books repairs and quote visits and takes jobs from landlords and letting agents, even while you're on a job. It never diagnoses a fault. We build it around your business and manage it every month.</p>
    <div class="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row" id="hero-form">
      <a href="#book-demo-form" class="btn btn-primary w-full sm:w-auto" data-track="hero_book_demo">Book a 30-Minute Demo</a>
      <a href="#hero-video" class="btn btn-secondary w-full sm:w-auto" data-track="hero_watch_demo">Watch the demo</a>
    </div>
    <p class="t-small mt-4 text-muted">Live in as little as 3 working days · Keep your number · Billed monthly, 30 days' notice</p>
  </div>

  <!-- Call-type strip: loops slowly, pauses on hover or focus. Each tile jumps to the use cases. -->
  <div class="mt-12 md:mt-14" id="industries-strip">
    <div class="container-omh flex items-center justify-center gap-3">
      <p class="t-small font-display font-semibold text-muted" id="strip-title">Built for every call your business gets</p>
      <button type="button" class="mq-pause" data-marquee-toggle="strip" data-what="call type list" aria-pressed="false" aria-label="Pause the moving list of call types"><svg class="icon icon-fill i-pause size-3.5" aria-hidden="true"><use href="#v4-i-pause"/></svg><svg class="icon icon-fill i-play size-3.5" aria-hidden="true"><use href="#v4-i-play"/></svg></button>
    </div>
    <div class="mx-auto mt-4 max-w-[1440px]">
      <div class="marquee" id="strip" data-marquee style="--dur: 38s">
        <div class="marquee-track">
          <ul aria-labelledby="strip-title">
          <li><a class="ind" href="#use-cases" data-ind="emergencies"><span class="ind-ico" aria-hidden="true"><svg class="icon"><use href="#v4-i-drop"/></svg></span><b>Burst Pipes &amp; Leaks</b></a></li>
          <li><a class="ind" href="#use-cases" data-ind="repairs"><span class="ind-ico" aria-hidden="true"><svg class="icon"><use href="#v4-i-wrench"/></svg></span><b>Repairs &amp; Blockages</b></a></li>
          <li><a class="ind" href="#use-cases" data-ind="quotes"><span class="ind-ico" aria-hidden="true"><svg class="icon"><use href="#v4-i-clipboard"/></svg></span><b>Quote Visits</b></a></li>
          <li><a class="ind" href="#use-cases" data-ind="landlords"><span class="ind-ico" aria-hidden="true"><svg class="icon"><use href="#v4-i-key"/></svg></span><b>Landlords &amp; Agents</b></a></li>
          <li><a class="ind" href="#use-cases" data-ind="tenants"><span class="ind-ico" aria-hidden="true"><svg class="icon"><use href="#v4-i-home"/></svg></span><b>Tenant Reports</b></a></li>
          <li><a class="ind" href="#use-cases" data-ind="prices"><span class="ind-ico" aria-hidden="true"><svg class="icon"><use href="#v4-i-tag"/></svg></span><b>Callout &amp; Prices</b></a></li>
          <li><a class="ind" href="#use-cases" data-ind="details"><span class="ind-ico" aria-hidden="true"><svg class="icon"><use href="#v4-i-message"/></svg></span><b>Photos By Text</b></a></li>
          <li><a class="ind" href="#use-cases" data-ind="afterhours"><span class="ind-ico" aria-hidden="true"><svg class="icon"><use href="#v4-i-moon"/></svg></span><b>Evenings &amp; Weekends</b></a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <div class="container-omh pb-16 pt-10 md:pt-12 lg:pb-24">
    <div class="hero-video" id="hero-video">
      <div class="video-frame" data-video data-youtube-id="NB9WWD0TBR8" data-video-title="Stop missing calls with the OMH AI Receptionist">
        <a class="video-poster on-band has-thumb" href="https://www.youtube.com/watch?v=NB9WWD0TBR8" target="_blank" rel="noopener" data-video-play aria-label="Play video: Stop missing calls with the OMH AI Receptionist (1:09)">
          <img class="vp-thumb" src="/images/voice-agents/ai-receptionist-video-poster.jpg" alt="Video: the OMH AI Receptionist answering calls 24/7" width="1280" height="720" fetchpriority="high" decoding="async">
          <span class="vp-play" aria-hidden="true"><span class="vp-play-core"><svg class="vp-play-ico" viewBox="0 0 24 24" focusable="false"><path d="M8 5.6v12.8l10.4-6.4z"/></svg></span><span class="vp-play-label">Watch the demo</span></span>
          <span class="vp-bottom" aria-hidden="true">
            <span class="vp-cap"><span class="vp-kicker"><span class="voice-mark"><i></i><i></i><i></i></span>Online Marketing Help</span><span class="vp-title">Stop missing calls with the OMH AI Receptionist</span></span>
            <span class="vp-time tnum">1:09</span>
          </span>
        </a>
      </div>
    </div>
  </div>


<section class="section" id="cities" aria-labelledby="city-title">
  <div class="container-omh">
    <div class="head-c">
      <p class="eyebrow"><span class="voice-mark" aria-hidden="true"><i></i><i></i><i></i></span>Local cover</p>
      <h2 class="h2 mt-3" id="city-title">Plumbers across the UK.<br class="hidden md:block"> <span class="hl">A local number for each area.</span></h2>
      <p class="lead mt-4">Customers trust a local number. Your agent answers on your existing line, or on a new one with your city's code. We set up our AI receptionist for plumbers across the UK by video call and phone from Hullbridge, Essex.</p>
    </div>
    <div class="va-car mt-12" data-carousel data-autoplay>
    <ul class="cities va-car-track" style="--car-w:360px" tabindex="0" aria-label="Local cover, scroll sideways">
      <li class="city" style="--tint:var(--tint-1)">
        <div class="city-top">
          <svg viewBox="0 0 320 136" preserveAspectRatio="xMidYMax meet" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M0 128 H320"/><path d="M18 128 V96 H44 V128 M52 128 V84 H74 V128 M250 128 V90 H276 V128 M284 128 V100 H306 V128 M96 128 V60 L104 46 L112 60 V128 M96 74 H112 M156 128 L176 70 L196 128 M134 70 a42 42 0 1 0 84 0 a42 42 0 1 0 -84 0 M134 70 H218 M176 28 V112 M146 40 L206 100 M146 100 L206 40 M224 128 V84 H242 V128"/></svg>
          <span class="city-code"><svg class="icon" aria-hidden="true"><use href="#v4-i-phone"/></svg>Local 020 number</span>
        </div>
        <div class="city-body">
          <h3 class="h3-card">London</h3>
          <q>Good morning, you're through to the team's AI assistant. Is this an emergency, or would you like to book a job?</q>
          <p class="t-small mt-auto flex items-center gap-2 text-muted"><svg class="icon size-[1.05rem] text-hl" aria-hidden="true"><use href="#v4-i-globe"/></svg>Covers Greater London</p>
        </div>
      </li>
      <li class="city" style="--tint:var(--tint-3)">
        <div class="city-top">
          <svg viewBox="0 0 320 136" preserveAspectRatio="xMidYMax meet" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M0 128 H320"/><path d="M18 128 V96 H44 V128 M52 128 V84 H74 V128 M250 128 V90 H276 V128 M284 128 V100 H306 V128 M100 128 V58 H130 V128 M100 58 a15 6 0 0 1 30 0 M100 72 H130 M100 86 H130 M100 100 H130 M100 114 H130 M146 128 C146 92 168 76 190 80 C214 84 226 100 226 128 M160 110 a3 3 0 1 0 0.01 0 M176 98 a3 3 0 1 0 0.01 0 M194 104 a3 3 0 1 0 0.01 0 M210 114 a3 3 0 1 0 0.01 0"/></svg>
          <span class="city-code"><svg class="icon" aria-hidden="true"><use href="#v4-i-phone"/></svg>Local 0121 number</span>
        </div>
        <div class="city-body">
          <h3 class="h3-card">Birmingham</h3>
          <q>Thanks for calling. Is water leaking right now, or can it wait for a booked visit?</q>
          <p class="t-small mt-auto flex items-center gap-2 text-muted"><svg class="icon size-[1.05rem] text-hl" aria-hidden="true"><use href="#v4-i-globe"/></svg>Covers Birmingham and the West Midlands</p>
        </div>
      </li>
      <li class="city" style="--tint:var(--tint-2)">
        <div class="city-top">
          <svg viewBox="0 0 320 136" preserveAspectRatio="xMidYMax meet" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M0 128 H320"/><path d="M18 128 V96 H44 V128 M52 128 V84 H74 V128 M250 128 V90 H276 V128 M284 128 V100 H306 V128 M96 128 V62 L110 52 L124 62 V128 M168 128 V30 H186 V128 M164 70 H190 V128 M168 50 H186 M200 128 V74 H228 V128 M208 84 V96 M220 84 V96"/></svg>
          <span class="city-code"><svg class="icon" aria-hidden="true"><use href="#v4-i-phone"/></svg>Local 0161 number</span>
        </div>
        <div class="city-body">
          <h3 class="h3-card">Manchester</h3>
          <q>Hello, you're through to the office's AI assistant. Would you like a repair booked, or a quote visit?</q>
          <p class="t-small mt-auto flex items-center gap-2 text-muted"><svg class="icon size-[1.05rem] text-hl" aria-hidden="true"><use href="#v4-i-globe"/></svg>Covers Greater Manchester</p>
        </div>
      </li>
      <li class="city" style="--tint:var(--tint-4)">
        <div class="city-top">
          <svg viewBox="0 0 320 136" preserveAspectRatio="xMidYMax meet" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M0 128 H320"/><path d="M18 128 V96 H44 V128 M52 128 V84 H74 V128 M250 128 V90 H276 V128 M284 128 V100 H306 V128 M118 128 V92 H210 V128 M126 128 V100 M140 128 V100 M154 128 V100 M174 128 V100 M188 128 V100 M202 128 V100 M146 92 V64 H182 V92 M152 64 V48 H176 V64 M152 48 C152 32 176 32 176 48 M164 36 V26 M164 56 a4 4 0 1 0 0.01 0"/></svg>
          <span class="city-code"><svg class="icon" aria-hidden="true"><use href="#v4-i-phone"/></svg>Local 0113 number</span>
        </div>
        <div class="city-body">
          <h3 class="h3-card">Leeds</h3>
          <q>Thanks for calling. Are you the tenant, the landlord or calling from a letting agent?</q>
          <p class="t-small mt-auto flex items-center gap-2 text-muted"><svg class="icon size-[1.05rem] text-hl" aria-hidden="true"><use href="#v4-i-globe"/></svg>Covers Leeds and West Yorkshire</p>
        </div>
      </li>
      <li class="city" style="--tint:var(--tint-1)">
        <div class="city-top">
          <svg viewBox="0 0 320 136" preserveAspectRatio="xMidYMax meet" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M0 128 H320"/><path d="M18 128 V96 H44 V128 M52 128 V84 H74 V128 M250 128 V90 H276 V128 M284 128 V100 H306 V128 M144 128 V62 H196 V128 M152 62 V44 H164 V62 M176 62 V44 H188 V62 M152 44 C152 34 164 34 164 44 M176 44 C176 34 188 34 188 44 M158 36 V30 M182 36 V30 M206 128 V84 H236 V128 M0 120 C20 116 40 124 60 120 S100 116 120 120"/></svg>
          <span class="city-code"><svg class="icon" aria-hidden="true"><use href="#v4-i-phone"/></svg>Local 0151 number</span>
        </div>
        <div class="city-body">
          <h3 class="h3-card">Liverpool</h3>
          <q>Good morning. If you have a burst pipe, I can put you through to the plumber on call. How can I help?</q>
          <p class="t-small mt-auto flex items-center gap-2 text-muted"><svg class="icon size-[1.05rem] text-hl" aria-hidden="true"><use href="#v4-i-globe"/></svg>Covers Liverpool and Merseyside</p>
        </div>
      </li>
      <li class="city" style="--tint:var(--tint-3)">
        <div class="city-top">
          <svg viewBox="0 0 320 136" preserveAspectRatio="xMidYMax meet" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M0 128 H320"/><path d="M0 128 C40 128 60 108 80 108 V128 M240 108 C260 108 280 128 320 128 M80 108 H240 M96 108 V46 H108 V108 M212 108 V46 H224 V108 M96 46 L102 38 L108 46 M212 46 L218 38 L224 46 M102 50 C130 96 190 96 218 50 M118 76 V108 M134 86 V108 M150 90 V108 M166 90 V108 M182 86 V108 M198 76 V108 M18 128 V100 H40 V128 M282 128 V96 H304 V128"/></svg>
          <span class="city-code"><svg class="icon" aria-hidden="true"><use href="#v4-i-phone"/></svg>Local 0117 number</span>
        </div>
        <div class="city-body">
          <h3 class="h3-card">Bristol</h3>
          <q>Hello. I can tell you our callout charge, or book you a visit. Which would help?</q>
          <p class="t-small mt-auto flex items-center gap-2 text-muted"><svg class="icon size-[1.05rem] text-hl" aria-hidden="true"><use href="#v4-i-globe"/></svg>Covers Bristol and the South West</p>
        </div>
      </li>
      <li class="city" style="--tint:var(--tint-2)">
        <div class="city-top">
          <svg viewBox="0 0 320 136" preserveAspectRatio="xMidYMax meet" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M0 128 H320"/><path d="M18 128 V96 H44 V128 M52 128 V84 H74 V128 M250 128 V90 H276 V128 M284 128 V100 H306 V128 M110 128 V40 H150 V128 M118 52 H142 M118 64 H142 M118 76 H142 M118 88 H142 M118 100 H142 M160 128 V96 H230 V128 M170 106 H220 M170 116 H220"/></svg>
          <span class="city-code"><svg class="icon" aria-hidden="true"><use href="#v4-i-phone"/></svg>Local 0114 number</span>
        </div>
        <div class="city-body">
          <h3 class="h3-card">Sheffield</h3>
          <q>Good afternoon. I'll take your address and any access details. Is there parking nearby?</q>
          <p class="t-small mt-auto flex items-center gap-2 text-muted"><svg class="icon size-[1.05rem] text-hl" aria-hidden="true"><use href="#v4-i-globe"/></svg>Covers Sheffield and South Yorkshire</p>
        </div>
      </li>
      <li class="city" style="--tint:var(--tint-4)">
        <div class="city-top">
          <svg viewBox="0 0 320 136" preserveAspectRatio="xMidYMax meet" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M0 128 H320"/><path d="M18 128 V96 H44 V128 M52 128 V84 H74 V128 M250 128 V90 H276 V128 M284 128 V100 H306 V128 M110 128 V84 H210 V128 M140 84 V64 H180 V84 M140 64 C140 44 180 44 180 64 M160 50 V36 M122 98 V128 M134 98 V128 M186 98 V128 M198 98 V128"/></svg>
          <span class="city-code"><svg class="icon" aria-hidden="true"><use href="#v4-i-phone"/></svg>Local 0115 number</span>
        </div>
        <div class="city-body">
          <h3 class="h3-card">Nottingham</h3>
          <q>Thanks for calling. Is it a dripping tap, a blocked toilet or something else?</q>
          <p class="t-small mt-auto flex items-center gap-2 text-muted"><svg class="icon size-[1.05rem] text-hl" aria-hidden="true"><use href="#v4-i-globe"/></svg>Covers Nottingham and Nottinghamshire</p>
        </div>
      </li>
      <li class="city" style="--tint:var(--tint-1)">
        <div class="city-top">
          <svg viewBox="0 0 320 136" preserveAspectRatio="xMidYMax meet" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M0 128 H320"/><path d="M18 128 V96 H44 V128 M52 128 V84 H74 V128 M250 128 V90 H276 V128 M284 128 V100 H306 V128 M150 128 V70 H170 V128 M146 70 L160 44 L174 70 M160 44 V36 M154 86 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0 M112 128 V96 H140 V128 M180 128 V100 H214 V128"/></svg>
          <span class="city-code"><svg class="icon" aria-hidden="true"><use href="#v4-i-phone"/></svg>Local 0116 number</span>
        </div>
        <div class="city-body">
          <h3 class="h3-card">Leicester</h3>
          <q>Hello. Would you like a quote for a new bathroom, or a visit for a repair?</q>
          <p class="t-small mt-auto flex items-center gap-2 text-muted"><svg class="icon size-[1.05rem] text-hl" aria-hidden="true"><use href="#v4-i-globe"/></svg>Covers Leicester and Leicestershire</p>
        </div>
      </li>
      <li class="city" style="--tint:var(--tint-3)">
        <div class="city-top">
          <svg viewBox="0 0 320 136" preserveAspectRatio="xMidYMax meet" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M0 128 H320"/><path d="M18 128 V96 H44 V128 M52 128 V84 H74 V128 M250 128 V90 H276 V128 M284 128 V100 H306 V128 M86 118 H234 M96 118 C110 40 210 40 224 118 M112 118 V80 M128 118 V63 M144 118 V54 M160 118 V51 M176 118 V54 M192 118 V63 M208 118 V80"/></svg>
          <span class="city-code"><svg class="icon" aria-hidden="true"><use href="#v4-i-phone"/></svg>Local 0191 number</span>
        </div>
        <div class="city-body">
          <h3 class="h3-card">Newcastle</h3>
          <q>Good evening, the office is closed. I can book you in, or put an emergency through to the plumber on call.</q>
          <p class="t-small mt-auto flex items-center gap-2 text-muted"><svg class="icon size-[1.05rem] text-hl" aria-hidden="true"><use href="#v4-i-globe"/></svg>Covers Newcastle and Tyneside</p>
        </div>
      </li>
    </ul>
    <div class="va-car-ui">
      <button type="button" class="va-car-btn" data-car-prev aria-label="Previous city"><svg class="icon" aria-hidden="true" focusable="false"><use href="#v4-i-arrow-left"/></svg></button>
      <div class="va-car-wave" aria-hidden="true" data-car-wave><i style="--h:40%"></i><i style="--h:70%"></i><i style="--h:55%"></i><i style="--h:90%"></i><i style="--h:45%"></i><i style="--h:75%"></i></div>
      <span class="va-car-status" data-car-status aria-live="polite">1 / 10</span>
      <button type="button" class="va-car-btn" data-car-next aria-label="Next city"><svg class="icon" aria-hidden="true" focusable="false"><use href="#v4-i-arrow-right"/></svg></button>
    </div>
    </div>
    <div class="mt-10 flex flex-col items-center gap-3 text-center">
      <a href="#book-demo-form" class="btn btn-primary">Book a 30-Minute Demo</a>
      <p class="t-small text-muted">Somewhere else? We set up plumbing businesses in towns and cities across the UK. <a href="#book-demo-form" class="link link-tap text-[15px]">Ask us about your area</a></p>
    </div>
  </div>


<section id="how" class="section border-y border-line bg-surface" aria-labelledby="how-title">
  <div class="container-omh">
    <div class="head-c">
      <p class="eyebrow"><span class="voice-mark" aria-hidden="true"><i></i><i></i><i></i></span>How it works</p>
      <h2 class="h2 mt-3" id="how-title">Live in 3 to 15 working days.<br class="hidden md:block"> <span class="hl">Answering every caller after that.</span></h2>
    </div>

    <h3 class="smallcaps mt-14 text-muted">Part 1: Setup, done for you</h3>
    <ol class="tl mt-6">
      <li class="tl-step">
        <div class="tl-head"><span class="tl-num">01</span></div>
        <div class="card tl-card"><h4 class="h4">Connect</h4><p class="t-card mt-2 text-muted">You divert your business line. We link your diary, plus your job management software on Growth and Scale.</p><p class="tl-proof mt-5"><span class="dot" aria-hidden="true"></span>Business line diverted</p></div>
      </li>
      <li class="tl-step">
        <div class="tl-head"><span class="tl-num">02</span></div>
        <div class="card tl-card"><h4 class="h4">Train</h4><p class="t-card mt-2 text-muted">We load your callout charge and prices, the areas you cover, your on-call route, approved safety steps and booking rules.</p><p class="tl-proof mt-5"><span class="dot" aria-hidden="true"></span>Booking rules set</p></div>
      </li>
      <li class="tl-step">
        <div class="tl-head"><span class="tl-num">03</span></div>
        <div class="card tl-card"><h4 class="h4">Test together</h4><p class="t-card mt-2 text-muted">You and your team ring it and try to trip it up. Nothing goes live without your sign-off.</p><p class="tl-proof mt-5"><span class="dot" aria-hidden="true"></span>3 test calls passed</p></div>
      </li>
      <li class="tl-step">
        <div class="tl-head"><span class="tl-num">04</span></div>
        <div class="card tl-card"><h4 class="h4">Go live</h4><p class="t-card mt-2 text-muted">It answers on the first ring, from the first job of the day to bank holiday weekends. We check and tune the first two weeks of live calls at no extra cost.</p><p class="tl-proof live mt-5"><span class="dot" aria-hidden="true"></span>Live and answering</p></div>
      </li>
    </ol>
    <p class="t-card mt-6 text-muted">Starter goes live in 3 working days, Growth in 5 to 7 and Scale in 12 to 15. The clock starts once we have your prices, booking rules, on-call route and diary access.</p>

    <div class="flow-panel on-band mt-14">
      <h3 class="smallcaps text-muted">Part 2: What happens to a new job enquiry (Growth and Scale)</h3>
      <p class="h3 mt-3">From website enquiry to a call back in under a minute.</p>
    <div class="lf mt-8" data-lf-flow role="group" aria-label="How a new job enquiry moves from your website to your diary" data-lf-routes='["Route 1 of 3: the customer books a visit","Route 2 of 3: the customer asks for a person and is put through","Route 3 of 3: not ready yet, so the customer gets a follow-up"]'>
      <div data-lf="n1" class="lf-node"><span class="lf-ico" aria-hidden="true"><svg class="icon"><use href="#v4-i-sparkle"/></svg></span><span class="lf-txt"><b><span class="sr-only">Step 1: </span>A customer finds you On Google or your website</b></span></div>
      <span class="lf-arrow" data-lf="a1" aria-hidden="true"></span>
      <div data-lf="n2" class="lf-node"><span class="lf-ico" aria-hidden="true"><svg class="icon"><use href="#v4-i-globe"/></svg></span><span class="lf-txt"><b><span class="sr-only">Step 2: </span>They enquire A form, an email or a call</b></span></div>
      <span class="lf-arrow" data-lf="a2" aria-hidden="true"></span>
      <div data-lf="n3" class="lf-node"><span class="lf-ico" aria-hidden="true"><svg class="icon"><use href="#v4-i-clipboard"/></svg></span><span class="lf-txt"><b><span class="sr-only">Step 3: </span>The lead lands In your job software</b></span></div>
      <span class="lf-arrow" data-lf="a3" aria-hidden="true"></span>
      <div data-lf="n4" class="lf-node lf-gold"><span class="lf-ico" aria-hidden="true"><svg class="icon"><use href="#v4-i-phone"/></svg></span><span class="lf-txt"><b><span class="sr-only">Step 4: </span>Your agent rings them Within 60 seconds</b></span></div>
      <div class="lf-split" aria-hidden="true">
        <svg viewBox="0 0 100 300" preserveAspectRatio="none"><path data-lf="s1" d="M0 150 C50 150 50 50 100 50"/><path data-lf="s2" d="M0 150 L100 150"/><path data-lf="s3" d="M0 150 C50 150 50 250 100 250"/></svg>
        <span class="lf-arrow" data-lf="sm"></span>
      </div>
      <div class="lf-branches">
        <p class="lf-then"><span class="sr-only">Step 5: </span>Then one of three things happens:</p>
        <ul aria-label="Step 5: the outcome">
          <li><div data-lf="b1" tabindex="0" class="lf-node lf-ok"><span class="lf-ico" aria-hidden="true"><svg class="icon"><use href="#v4-i-calendar"/></svg></span><span class="lf-txt"><b>A visit booked In your diary</b></span></div></li>
          <li><div data-lf="b2" tabindex="0" class="lf-node"><span class="lf-ico" aria-hidden="true"><svg class="icon"><use href="#v4-i-transfer"/></svg></span><span class="lf-txt"><b>A warm transfer Put through to your team</b></span></div></li>
          <li><div data-lf="b3" tabindex="0" class="lf-node"><span class="lf-ico" aria-hidden="true"><svg class="icon"><use href="#v4-i-message"/></svg></span><span class="lf-txt"><b>A follow-up If they are not ready yet</b></span></div></li>
        </ul>
      </div>
      <div class="lf-merge" aria-hidden="true">
        <svg viewBox="0 0 100 300" preserveAspectRatio="none"><path data-lf="m1" d="M0 50 C50 50 50 150 100 150"/><path data-lf="m2" d="M0 150 L100 150"/><path data-lf="m3" d="M0 250 C50 250 50 150 100 150"/></svg>
        <span class="lf-arrow" data-lf="mm"></span>
      </div>
      <div data-lf="n5" class="lf-node lf-final on-band"><span class="lf-ico" aria-hidden="true"><svg class="icon"><use href="#v4-i-mail"/></svg></span><span class="lf-txt"><b><span class="sr-only">Step 6: </span>A summary and tags Written back to your system</b></span></div>
    </div>
      <p class="lf-status" aria-hidden="true" data-lf-status>Follow a lead through it. Hover or tap an outcome to trace its route.</p>
      <dl class="kstats mt-10">
        <div><dt class="sr-only">Answer speed</dt><dd><b>1st ring</b><span>answer speed</span></dd></div>
        <div><dt class="sr-only">New lead call time</dt><dd><b>60 sec</b><span>to call new job enquiries</span><small>(Growth and Scale)</small></dd></div>
        <div><dt class="sr-only">Hours</dt><dd><b>24/7</b><span>bank holidays included</span></dd></div>
        <div><dt class="sr-only">Faults diagnosed on the phone</dt><dd><b>0</b><span>faults diagnosed on the phone</span></dd></div>
      </dl>
    </div>
  </div>
`;
