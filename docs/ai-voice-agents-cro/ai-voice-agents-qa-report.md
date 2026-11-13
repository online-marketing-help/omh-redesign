# /ai-voice-agents — QA and measurement report

Rebuilt and tested 20 Oct 2026 on the local dev server (`next dev`, Turbopack) in Chrome, through the
desktop app's browser pane (DOM measurements, interactions) and headless Chrome (full-page captures).
Nothing has been deployed. Before/after captures: `before/` and `after/`.

## 1. Size, before and after

| Width | Before (px tall) | After (px tall) | Sections | Button CTAs |
|---|---|---|---|---|
| 1440 | 29,729 | 11,979 | 17 → 11 | 22 → 7 (5 primary + 2 form submits) |
| 1280 | 30,303 | 12,302 | | |
| 768 | 39,797 | 16,994 | | |
| 390 | 54,528 | 24,132 | | + sticky bar (2) |
| 375 | 55,777 | 24,863 | | |

"Call Me Now": 10 → 0. Distinct CTA wordings: 5 → 1 ("Book a 30-Minute Demo"; the sticky bar keeps the
shorter "Book a Demo" for width). Destinations: 3 → 1 (`#book-demo-form`) plus verified `tel:`/`mailto:`.

## 2. Functional tests

| Test | Result |
|---|---|
| Every CTA has the intended destination | **Pass.** 5 × `#book-demo-form` (hero, industries, 3 pricing cards), sticky "Book a Demo" → `#book-demo-form`, "See how a call goes" → `#what-is`, industry links → 3 industry pages + 5 `/contact?service=ai-voice-agents&industry=…` (unchanged from before), related → `/google-adwords-ppc`, `/local-seo`, `/website-designs` |
| Phone and email links | **Pass.** `tel:+442034893934` (FAQ card, sticky bar) and `mailto:support@onlinemarketinghelp.co.uk`; the number matches the site footer and Organization schema |
| Booking form validation | **Pass.** "Next" without a slot → "Pick a day and a time to carry on."; step 2 submit with empty fields → 7 field errors, focus moves to the first invalid field, `aria-invalid`/`aria-describedby` set |
| Submissions reach the configured destination | **Not run.** Submitting would email a real lead to OMH and add a calendar entry. The submit path (`/api/enquiry` + `/api/book-demo`) is unchanged from `oldv2`; only tracking calls were added around it |
| Success and error messages | **Pass (error path).** Validation and send-error messages render with `role="alert"`. The success state (`role="status"`, focus moved) is unchanged code and was not exercised for the reason above |
| Demo interactions | **Pass.** Greeting builder in the hero: business and tone chips change the name, number, city, initials, greeting and the typing animation (`is-speaking`); replay works; arrow keys move through the radiogroups |
| Industry selector | **Pass.** Click, ArrowRight/ArrowLeft, Home, End select tabs; the matching panel is shown and the rest hidden; `aria-selected` and roving `tabindex` update |
| Pricing details | **Pass.** Rendered from the unchanged `lib/content/voice-pricing.ts`: £249/£449/£849 a month + VAT, 300/500/900 minutes, £795/£1,295/£1,995 setup, 60p overage, live in 3 / 5–7 / 12–15 working days, 30 days' notice. Full feature and exclusion lists are inside each card's "Everything included and what isn't" |
| Accordions | **Pass.** FAQ items (first open), "Show 7 more questions", comparison disclosure (table at ≥1024px, selector below), ROI calculator disclosure |
| ROI calculator | **Pass.** The iframe has no `src` until the disclosure opens; on open it loads `/roi-calculator/any-business.html` and the existing frame-fitting resizes it (2,012px at 1440) |
| Keyboard navigation | **Pass.** Tabs, radiogroups and `<details>` are native or roving-tabindex; focus rings use the page's `:focus-visible` style |
| Analytics events not duplicated | **Pass.** One `dataLayer` push per action: `industry_select`, `branding_biz`, `pricing_book_demo`, `roi_calculator_open`, `compare_open`, `faq_show_more`, `demo_form_error` each fired exactly once in the test sequence |
| Plan interest | **Pass.** Clicking a pricing card's CTA sets the hidden "Plan interest" field in the booking form (e.g. "Growth"), so the enquiry email and the `demo_request_submitted` event carry it |
| Mobile sticky bar | **Pass.** Hidden over the hero, visible after it, hidden again at the booking band; `inert` while hidden |
| Backup route | **Pass.** `/ai-voice-agents-oldv2` renders the old page: 29,730px at 1440 and 54,528px at 390 against 29,729 and 54,528 before the rebuild |
| Type check and lint | **Pass.** `tsc --noEmit` clean; `eslint` clean on the changed files |

Dev-server note: after a hot reload of the markup file the page script's listeners stay on the old DOM
nodes (its effect does not re-run). A normal page load has no such issue; it is not a production
behaviour.

## 3. Visual tests

Measured at 1440, 1280, 768, 390 and 375px, light and dark themes.

- No horizontal overflow at any width (`scrollWidth` ≤ viewport).
- No tap target under 44×44px on mobile (before: 21).
- One `h1`; 10 `h2`; `h2` titles wrap to one or two lines at 1440 (global 30ch cap).
- No paragraph over 18px (one 20px line was reduced); mock-up UI text stays small by design.
- Section grounds alternate (warm / white / warm / sand / warm / white / warm / white / warm / white / ink).
- Dark theme checked on the hero, capabilities, setup timeline, industry panel and booking band.
- Mobile: the industry tabs wrap into three rows (216px) instead of scrolling horizontally; the
  comparison switches to the selector; pricing cards are 1,000–1,150px each (before: 1,500–1,900).

Remaining visual caveat: the site-wide "Ask the assistant" pill and back-to-top button still sit
above the sticky bar on mobile (three fixed elements). They are site-level components, outside this
page's scope; the CSS that lifts them is unchanged.

## 4. Regression against `oldv2`

Retained verbatim: H1, hero lead and reassurance line, the "What is an AI voice agent?" definition,
all eight industry H3s with their intros and bullets, the safeguard notes, the capability copy
(six of nine cards; the three merged ones kept their sentences), setup steps 01–04 and the delivery
line, the fit/not-fit items kept, the comparison table and selector, every price, minute, fee and
note, all 15 FAQs and the FAQPage schema, the related-service links, the booking band and its forms,
the sticky bar.

Removed or changed on purpose (all still in `oldv2`):

| Item | Why |
|---|---|
| Hero video facade | YouTube id was Google's sample video, captioned as an OMH demo |
| Industry marquee | Replaced by the tab row |
| Nine → six capability cards | Web-lead and follow-up merged; consent moved to the safeguards strip; summary/CRM line kept under the grid |
| Lead-flow diagram and 4-stat strip | Explained one Growth feature at 1,000px; facts repeated elsewhere |
| Eight sticky use-case cards + eight industry cards | Merged into one tabbed panel |
| Client feedback wall and 1,284 / 317 / 38% | Pending testimonials and illustrative numbers |
| Why-OMH fictional dashboards | Points kept as "after go-live" cards without the mock-ups |
| Fit checker | Repeated the list above it; its result CTA needed five answers |
| Six city cards | Implied local teams; replaced by one coverage line with the six cities and area codes |
| FAQ search, filters, counts, "Open all" | Controls outweighed 15 questions |
| Related-service mock-ups and bundle CTA | Standard site component instead |
| "Call Me Now" ×10, "Book a Voice Agent Demo" ×4, "Ask about a joined-up plan", "Ask us about your area" | One wording, four placements |
| Ring tab's dead `tel:` link | Shows "The demo line is being set up" until a number is configured in `components/BookDemo.tsx` (`demoLine`); this is the shared booking band, so the 12 service pages show the same honest state |

Content flagged, not changed: the text still promises AI disclosure on every call, recording notices and
consent-only outbound calling. Confirm the agent scripts enforce these before relying on them in
marketing. Five industry links go to the contact form because those industry pages do not exist yet.

## 5. Performance

Not measured in production: the only running server is the dev server (unminified, Turbopack), and
`next build` could not be run beside it (shared `.next`). What changed that affects the targets:

- HTML for the page body is roughly half the size (1,297 fewer lines of markup; six inline
  illustrations, eight chat mock-ups, four dashboard mock-ups and the video poster SVG removed).
- The ROI calculator document (its own CSS and JS) no longer loads on page view.
- The `.v4l` layer is no longer used on this page; `landing-v4.css` stays for the backup routes.
- LCP candidate is the H1 (text) on every width; the hero phone is inline markup, no image request.
- No layout-shifting elements were added: the tab panel reserves space, disclosures are closed, the
  iframe is inside a closed disclosure.

To measure after deploy: Lighthouse (mobile, throttled) on the Vercel preview and PageSpeed Insights
on the live URL once it has 28 days of field data. Targets remain LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1.

## 6. Accessibility findings

- Tabs: `role="tablist"`/`tab`/`tabpanel`, `aria-controls`, `aria-selected`, roving tabindex, arrow and
  Home/End keys, all panels in the DOM.
- Greeting builder: `role="radiogroup"` chips with `aria-checked`, live region for the greeting text.
- Disclosures are native `<details>`, so they work without JavaScript and with screen readers.
- Form: labels bound by `for`/`id`, `aria-invalid`, `aria-describedby` on errors, `role="alert"` for
  submit errors, `role="status"` on success, focus moved to the first invalid field.
- Contrast: body text and muted text are the site's existing tokens; the gold primary button keeps
  ink text (`#101828` on `#d79a37`, ≈ 8.6:1).
- Reduced motion: the greeting typing animation, the wave and the reveal transitions are disabled
  under `prefers-reduced-motion`; the hero glow is static.
- Not run: an automated axe pass (no tooling in the repo). Recommended before launch.

## 7. SEO checks

- Title, meta description, canonical (no trailing slash), Open Graph and Twitter metadata: unchanged.
- One `h1` (unchanged text). `h2` set: Why it matters, What is an AI voice agent?, What your AI voice
  agent does, AI voice agent use cases by industry, How it works (Live in 3 to 15 working days…), A
  voice agent isn't for everyone, AI voice agent pricing, AI voice agent FAQs, Related services, Book
  a 30-minute demo.
- Structured data unchanged: Service with three Offers, FAQPage with all 15 questions, BreadcrumbList.
- Eight industry H3s in the HTML (seven in hidden panels; crawlable, lower weight).
- Six city names and area codes in visible text plus FAQ 15.
- Internal links kept: three industry pages, three related services, privacy policy.
- `/ai-voice-agents-oldv2` is `noindex, nofollow`, canonical to the live page, outside the sitemap.
- Change log: nothing removed from the keyword set; "AI receptionist" remains in the H1 lead, dental
  panel and FAQ 1; "answering service" appears in the comparison and FAQ copy.

## 8. Conversion tracking

All events go to `window.dataLayer` for GTM container `GTM-WWSXTPH` (loaded in `app/layout.tsx`).
Nothing is sent to GA4 until triggers are created in GTM. Consent: there is no consent banner or
consent-mode setup in the codebase; configure Consent Mode in GTM before treating these as personal
data events.

Conversions (fire once, on success only):

| Event | When | Fields |
|---|---|---|
| `demo_request_submitted` | Booking form accepted by `/api/enquiry` or `/api/book-demo` | `industry`, `city`, `plan`, `slot`, `page` |
| `callback_request_submitted` | Call-back form accepted | `when`, `page` |

Funnel and engagement (new in this rebuild unless marked existing):

| Event | When |
|---|---|
| `demo_form_start` | First change in the booking form |
| `demo_form_error` | Validation failed (`step`: slot or details; `form`) |
| `demo_form_send_error` | Server or network failure |
| `demo_line_click` | Verified demo number tapped (only once a number is configured) |
| `hero_book_demo`, `industries_book_demo`, `pricing_book_demo` (+ `name` = plan), `sticky_book_demo` | Primary CTA clicks by placement (existing mechanism, `data-track`) |
| `hero_see_how` | Hero secondary link |
| `industry_select` (+ `name`), `industry_click` (+ `name`) | Tab chosen; "More about…" link |
| `branding_biz`, `branding_tone`, `branding_replay` | Greeting builder (existing) |
| `pricing_details` (+ `name`), `roi_calculator_open`, `compare_open`, `compare_option` | Disclosures |
| `faq_toggle` (+ `name`, `open`), `faq_show_more`, `faq_phone_click`, `faq_email_click` | FAQ (existing) |
| `sticky_phone_click` | Verified phone number from the sticky bar (existing) |
| `voice_related_service_click` | `data-event` on the related-service links (GTM click trigger) |

GTM setup: Custom Event triggers for the two conversion events → GA4 `generate_lead` (mark as key
event) with `lead_type` = demo or callback; Custom Event triggers for the rest → GA4 events of the same
name. Add `device_category` as a dimension to split mobile and desktop.

Primary metric: **qualified demo requests ÷ sessions landing on `/ai-voice-agents`**, where
"qualified" is decided by sales after the call (log it in the CRM against the enquiry). Secondary:
form start rate, form completion rate (`demo_request_submitted` ÷ `demo_form_start`), callback
requests, pricing and industry engagement rates, and booked-to-sale outcomes.

Baseline: no conversion events existed before this change, so there is no historical conversion
rate in the codebase. Pull sessions and any contact-form submissions for `/ai-voice-agents` from GA4
for the 28 days before deploy to set a traffic baseline; treat the conversion rate from launch day as
the first baseline.

## 9. Post-launch test plan (hypotheses, not results)

1. **Hero demonstration.** Greeting builder (current) vs a real recorded call once one exists.
   Metric: demo requests per session, scroll depth to pricing.
2. **Sticky mobile bar.** On vs off. Metric: mobile demo requests per session; watch form-start
   rate for accidental taps.
3. **Pricing CTA wording.** "Book a 30-Minute Demo" vs "Talk through the Growth plan". Metric:
   pricing CTA click-through and `plan` share in submitted requests.
4. **Industry panel default.** First tab fixed (estate agents) vs chosen from the referring page or
   ad group. Metric: tab engagement and industry mix in requests.
5. **FAQ depth.** 8 + show-more (current) vs all 15 open-able. Metric: FAQ interaction and demo
   requests from the FAQ viewport.

Run one at a time, at least two weeks or 100 conversions per arm, whichever is later. Keep the
`oldv2` route private; it is a backup, not a test arm.

## 10. Known unresolved issues

- Demo phone line: still unset (`[DEMO NUMBER]` in `components/BookDemo.tsx`). The tab now says the
  line is being set up. Supply the number and `href` and the tab switches to the live state.
- No verified testimonial, case study or demo video exists yet; the sections are parked in `oldv2`.
- Five of eight industry links go to the contact form until those industry pages are built.
- Form submission end-to-end and production performance were not tested here (reasons above).
- GTM triggers, GA4 key events and Consent Mode need configuring in GTM.
- Automated accessibility scan not run.

## 11. Revision, 20 Oct 2026 (sections restored at the client's request)

Re-tested after restoring the previous sections (see the IA document). At 1440px the page is
23,081px tall with 16 sections; `tsc` and `eslint` clean; no console errors on a fresh load.
Checked working: industry filter chips (Health shows 2 cards), fit checker ("1 of 5 answered" after
one answer), FAQ search ("Showing 2 of 15 questions" for "GDPR"), lead-flow diagram present, ROI
iframe fitted to 2,012px, pricing badge and facts tiles, demo CTAs → `#book-demo-form`, Related
services gone. The `after/` captures were retaken.
Later: the previous hero and the greeting-builder band were restored; 17 sections, 24,645px at
1440 and 45,517px at 390; marquee, video facade and greeting builder initialise; `tsc`/`eslint`
clean; captures retaken. The hero video still uses the placeholder YouTube id (see §10).
Later again: the four explanatory sections became two (see the IA document). Verified in headless
Chrome: the call plays greeting → caller → "works out the answer" → reply with the voice wave →
booking → summary over about eight seconds, the four steps mark themselves done in turn, and
switching business restarts it with that business's lines; under reduced motion the whole call shows
at once. The without/with switch is CSS-only (radio inputs) and fires `day_toggle`. On small screens
the phone sits between the definition and the steps. `tsc`/`eslint` clean; captures retaken.
Later still: the capability explorer replaces the capability rows and the Why choose OMH section.
Verified in headless Chrome: click and arrow keys select tabs and show the matching panel, no
console errors, the "In plain English" eyebrow and `#why-omh` are gone; 13 sections, 21,723px at
1440 and 40,218px at 390; `tsc`/`eslint` clean; captures retaken.
Client fixes, same evening: the Never/Transfers tiles and the caption under the call-player phone
were removed; the Industries grid's "Learn more" links are hidden until those pages exist (the
industry tabs keep links only for the three pages that do); the Client feedback cards no longer
wait for a scroll-reveal (they rendered blank after a reload until the observer fired) and the
YouTube note under them is gone; the mobile comparison is now one card per criterion with a
labelled OMH cell and a labelled alternative cell, driven by the same chip selector.
Carousels: Industries, Client feedback and Local cover are scroll-snap carousels (see the IA
document). Verified in headless Chrome at 1440 and 390: next/prev move one card, the status and
waveform update, the first/last buttons disable at the ends, the industry filter chips re-sync the
count, no console errors.
Round four: verified in headless Chrome at 1440: scrolling a carousel to its end reads "6 / 6" with
all bars lit, next at the end returns to the first card and previous at the start jumps to the last;
five "yes" answers in the fit check give "Strong fit", "5 of 5 answered" and show the CTA; the hero
caption and comparison note are gone; no console errors. Page: 13 sections, 19,586px at 1440 and
35,194px at 390. The capture script now emulates reduced motion so the scroll-driven reveals do not
hide below-the-fold content in full-page captures.
Round five: the CSS scroll-driven reveals never ran in production builds (the bundler kept the
`@supports` test but dropped the `animation-timeline` declarations), so they were replaced by
`components/voice-agents/VoiceMotion.tsx`: word-by-word heading reveals, staggered fade-ups, clip
reveals on media, the hero video scaling from 0.9 to 1 on scroll, a gold scroll-progress line,
counters on the feedback figures, magnetic primary buttons and a cursor glow on cards (pointer
devices only). Content is only hidden while the script runs in a visible tab, anything already in
view shows at once, and a 4s failsafe shows the rest. Verified in headless Chrome at 1440 with
motion on: 11 headings split with an `aria-label` keeping the full text, cards revealed on scroll,
counters end on 1,284 / 317 / 38%, no console errors. The call player now cycles through the three
businesses while on screen. Carousels count snap stops: 1–4 of 4 at 1440 (three cards visible), 1–6
of 6 at 390, looping. The fit gauge is 168px with a 24px result title.
Buttons and cursors: primary buttons now match the header's button (white text on #d79a37, #b97822
on hover). Every button gets the same subtle motion: a 1px lift with a soft shadow and a pull toward
the cursor capped at 4px (was up to about 18px on primary buttons only). Pointer cursor on every
link, button, tab, chip, radio label, summary and the video poster, here and in the booking band.
Verified in headless Chrome with a real mouse hover. Note: white on #d79a37 is about 2.4:1 contrast,
below WCAG AA for normal text; it matches the site-wide header button, so changing it is a
site-level decision.
White on gold: every solid-gold surface now carries white text and icons (pricing badge, "Managed
for you", selected capability icon, selected business/tone chips, hero video play button, marquee
industry on hover, booking chips, the lit call step, the phone avatar, open FAQ chevron, feedback
play buttons, the industries CTA tile, and the booking band's badge, step dots and selected tab icon).
One unlayered CSS rule in voice-agents.css, scoped to this page and its booking band; verified by
computed colour on all fourteen in headless Chrome.
Hero: an intro now plays on load (badge, headline words rising from a mask, lead, buttons, the
industry strip, then the video lifting in), settled by about 1.7s. The video is up to 1,280px wide
(was 1,040px) and its scroll scale eases 0.86 → 1 toward the scroll position instead of tracking it
frame by frame. Fixed a bug that also affected the section reveals: the hidden state was being
transitioned in, so elements on screen never visibly started hidden; hidden states now apply with
transitions off (`html.m-setup`) and the animation runs after a paint. Probed in headless Chrome:
at +137ms the hero parts read opacity 0, at +600ms the badge is in and the first word is rising, at
+1.7s everything is at 1.
Round six:
- Hero flash on reload fixed: the hero is hidden from the first paint (CSS keyed to the `data-js`
  flag the layout sets before paint) until the motion layer takes over, or tells the page to skip
  (reduced motion, background tab), or 2.5s pass. Probed from the earliest frames: opacity 0 until
  the script runs, then a single play-in.
- Cursor spotlight on 97 cards and panels across every section and the booking band: a soft fill and
  a lit edge that follow the pointer, pale gold on the dark bands.
- Fit check is guided: the next unanswered question is highlighted with gently pulsing buttons, a dot
  fills per answer (gold for yes), the empty state says "Start with question 1", the 0 and 5 labels
  sit clear of the arc, and on phones the questions and the result stack.
- Entrance variety: headings rise word by word, eyebrows draw their dash, intro paragraphs sharpen
  from a blur, step lists slide from the left, side panels and FAQs from the right, carousel cards
  slide in, pricing and comparison scale up (the recommended plan from further), timeline numbers
  pop and its dashed line draws, dark panels unclip.
- Responsive audit at 320, 360, 375, 390, 414, 768, 834, 1024, 1280, 1440 and 1920: no page
  overflow and no element past the edge at any width (fixed: the "What is" column at 375 and below,
  the sticky bar's phone button at 320), no real text under 13px, no tap target under 40px (fixed:
  "Ask us about your area"). Pricing facts switch to rows when a card is narrower than 380px.
Round seven:
- Dark mode: measured contrast of every text element in dark mode; nothing fails other than the
  chosen white-on-gold. Visual fixes: cards lifted off their bands (#1c232d, borders #343d4a), the
  sand bands separated, industry illustrations re-coloured for dark, the Local cover carousel
  controls given the page's colour variables, and the ROI calculator given a dark palette at runtime
  (fitRoiFrames.ts adds a style element to the same-origin frame and follows the theme toggle; the
  generated calculator files are untouched). This also applies on the industry pages that embed it.
- "Everything included and what isn't": the grey hover box is gone; the words turn gold and an
  underline draws.
- Header dropdown (site-wide): the current page is gold text with a small gold bar and no background;
  only the hovered item gets the background, so two items no longer look selected.
- Lead-flow diagram: the cursor spotlight is off its boxes; on the final box it replaced the
  arrowhead (the diagram uses ::before for those) and drew a ghost rectangle.
- Comparison: the whole rounded box rises in as one piece (the table used to scale inside its
  clipped frame) and rows get a soft gold highlight on hover instead of a spotlight.
Round eight: section descriptions capped at 850px like the homepage (measured: every intro on the
page is 850px or narrower, titles 894px or narrower). "Ask for a call back" removed from the shared
booking band on every page that uses it (verified on /ai-voice-agents and /google-adwords-ppc), so the
`callback_request_submitted` event no longer exists; `demo_request_submitted` is the only conversion
event.
Round nine:
- Hero title without the colon, on two lines ("AI Voice Agent for UK Businesses" / "Answer Every Call,
  Even at 2am"); the hero description is up to 1,000px wide so it sits on two lines.
- Intros: measured at 1920, 1440, 1280 and 1024px, every section intro is two lines (Local cover one)
  with no two-to-four-word last line. Line balancing is used only on centred intros and the half-width
  fit intro; on full-width left-aligned intros it shrank the paragraph well short of its title.
  The Industries intro was tightened by a few words to fit two lines.
- Industries title on two balanced lines.
- FAQ: the topic label under each question removed (the topic filter chips remain).
- Carousels loop infinitely: three copies of the cards, starting on the middle set, with a silent
  jump by one set when scrolling settles in an outer copy. Verified: next and previous run 1 to 6 and
  wrap both ways, dragging forward goes 1 to 6 and on to 1, copies are aria-hidden and out of the tab
  order, a copy's play button opens its video. Each carousel now reveals as a whole.
Audio card: the first Client feedback card plays `public/audio/Realest voice agent.m4a` (AAC, 2:21).
It shows a title, one line of description, a play/pause button, a waveform that fills as it plays
and can be clicked or arrow-keyed to seek, and the time; the badges, role and chips are gone. The file
loads only when someone presses play; one recording plays at a time; the carousel's autoplay holds
while it plays. Verified: real mouse click plays and pauses (app browser: 141.4s loaded, time
advancing), waveform click seeks to 1:10, ArrowRight adds 5s, copies made by the infinite loop work.
Also fixed: the carousel drag captured the pointer on press, which could send mouse clicks on buttons
inside a carousel to the track; it now captures only once a drag starts.
All six Client feedback cards now use the audio-card design (title, one line, play/pause, waveform,
time); the video pop-up was removed. Five have no recording yet: they carry `data-audio-pending`, an
inactive play button labelled "Recording coming soon" and "0:00 / --:--". To switch one on, copy the
live first card's controls into it (`data-audio-toggle`, `data-audio-wave` with `aria-valuemax` set to
the length in seconds, `data-audio-time`), add `<audio preload="none" src="/audio/…" data-audio>`, and
drop `data-audio-pending`. The hero now uses the site's `hero-grid` backdrop like the other pages.

**Mobile sideways scroll (fixed).** The feedback and cities carousels start 90px to the right for their
slide-in entrance, which widened the page by 76px on phones and showed a horizontal scrollbar.
`#va-page { overflow-x: clip; }` clips it at the page root. Verified page width equals the viewport at
320, 360, 375, 390, 414 and 768px; carousels still reveal and step; the FAQ side panel still sticks.

**Responsive 581 to 1279px (fixed).** Lead flow: the row grid started at 1101px but the row styles at 1280px,
so 1101 to 1279px showed eleven squashed columns; both now switch at 1280px. Below that the stacked flow keeps
its second lines, sits beside the heading with the stats under it from 1024px, and fills the panel below.
Also: hero heading stays two lines from 768px and never runs "Businesses Answer" together; the fit result
stacks its gauge when narrow; the compare badge stays on one line; no lone "isn't" in the pricing summaries.

**Stale pages on phones (fixed).** HTML went out with `stale-while-revalidate` for a year (Next's default
expire), which Chrome honours, so phones showed pre-deploy HTML whose CSS was gone: an unstyled page.
`expireTime: 3600` in next.config.ts drops it (header is now `s-maxage=3600`). The VPS also keeps old
builds' static files in the `omh-static` volume, so restored tabs and back navigation still find their CSS.

**Real estate page on the main layout (21 Oct 2026).** /ai-voice-agents/real-estate-letting-agents now uses the
/ai-voice-agents layout section for section (shared frame: components/voice-agents/VoiceLanding.tsx), with content
for estate and letting agents in lib/content/voice-estate/: call-type strip, three agency call scenarios, eight
use-case tabs by type of call, agency-type grid, real estate recording plus five pending audio cards, branch fit
checker, the real estate ROI calculator, estate comparison rows, pricing worded for branches, six-city cover with
a link to the London page, 17 estate FAQs (FAQPage JSON-LD). The previous page is git tag `estate-oldv1` and the
noindex route /ai-voice-agents/real-estate-letting-agents-oldv1. Checked at 1440, 1157, 860 and 390px, light and
dark, with no sideways scroll, no console errors and all widgets working.

**Dental page on the main layout (21 Oct 2026).** /ai-voice-agents/dental-clinics now follows the real estate page:
the /ai-voice-agents sections written for dental practices (lib/content/voice-dental/), with the practice's day of
calls, when it answers and what we need from a practice in place of the comparison and fit checker (shared template
lib/content/voice-extras.ts). No dental recording exists yet, so all six feedback cards are pending. The previous
page is git tag `dental-oldv1` and the noindex route /ai-voice-agents/dental-clinics-oldv1. Checked at 1440, 1024,
768 and 390px with no sideways scroll, no console errors and every widget working; production build passes.
