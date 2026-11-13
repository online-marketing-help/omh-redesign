# /ai-voice-agents — UX and CRO audit

Audited 20 Oct 2026 against the page as it was at commit `adf97b6` (git tag `oldv2`, browsable at
`/ai-voice-agents-oldv2`). Measurements come from the rendered page in Chrome at 1440, 1280, 768,
390 and 375px, not from reading the HTML alone. Before-change screenshots: `before/<width>.jpg` (full page at 1440, 768 and 390; per-section crops at 1440 and 390). Heights for 1280 and 375 are recorded below.

Legend: **V** = verified by measurement or code reading. **H** = hypothesis; needs testing with
real visitors or analytics before it can be called a result.

## 1. Executive summary

The page is thorough but tries to do everything at once. At 1440px it is **29,700px tall**
(54,500px at 390px), with **17 top-level sections**, **22 button-styled CTAs** and a further
20-plus text links that all ask for the same thing. "Call Me Now" appears 10 times and performs
the same action as "Book a Demo" (both scroll to the booking form). The eight-industry story is
told twice in full (sticky use-case cards, then a card grid), the "how it works" story is told three
times (What is → How it works → Why OMH), and three sections rest on evidence that does not yet
exist: a pending-testimonial wall with illustrative numbers, a hero "demo video" whose YouTube id is
Google's own sample video, and a demo phone number that reads `[DEMO NUMBER]`.

None of this is bad content. Most of it was approved copy. The problem is that it is all given equal
visual weight, so a visitor cannot tell what matters or what to do next.

The rebuild keeps every confirmed commercial fact, every FAQ, the SEO heading structure and the
working interactions, and consolidates the page to **10 sections plus the booking band** with one
primary CTA ("Book a 30-Minute Demo") in four deliberate places.

Verified top issues (full table in §12):

| # | Issue | Severity |
|---|---|---|
| 1 | Hero video is a placeholder (YouTube id `M7lc1UVf-VE`, Google's sample video) but is captioned as a 1:32 OMH demo | Critical (trust) |
| 2 | "Proof goes here when it's real" section: 6 pending testimonials with fictional places, next to 3 illustrative numbers (1,284 / 317 / 38%) shown as stats | Critical (trust) |
| 3 | 10 × "Call Me Now" buttons that do not call anyone; same target as "Book a Demo" | High (CRO) |
| 4 | Industries told twice: 8 sticky use-case cards (5,010px) + 8-card grid (2,043px) = 7,053px, 24% of the page | High (CRO/UX) |
| 5 | CTA destinations split three ways: in-page form, `/contact?service=…` (leaves the page), `tel:` | High (CRO) |
| 6 | Three fixed elements stack at the bottom of a phone screen (sticky bar, assistant pill, back-to-top) | High (mobile) |
| 7 | 21 tap targets under 44px on mobile, including 8 "Book a demo" text links at 100×26px | Medium (mobile/a11y) |
| 8 | Demo line tab shows `[DEMO NUMBER]` with a dead `tel:` link on the live page | Medium (trust) |
| 9 | ROI calculator iframe adds ~2,000px (desktop) / 3,250px (mobile) and loads a third page | Medium (perf) |
| 10 | FAQ has search + 6 filter chips + open-all for 15 questions; the controls outweigh the content | Low (UX) |

## 2. Current page structure (before)

Order as rendered on 20 Oct 2026, with measured heights. "Design" says which of the two ported
design systems the section comes from (`v4l` = landing v4; `va` = original page body).

| # | id | Design | Heading | 1440px | 390px |
|---|---|---|---|---|---|
| 1 | `top` | v4l | H1 "AI Voice Agent for UK Businesses: Answer Every Call, Even at 2am" + industry marquee + video facade | 1,505 | 1,283 |
| 2 | `what-is` | va | What is an AI voice agent? | 686 | 1,286 |
| 3 | `features-title` | v4l | What your AI voice agent does (9 cards) | 1,650 | 4,082 |
| 4 | `branding` | va | Try it: build a greeting (dark band, phone mock) | 962 | 1,331 |
| 5 | `how` | v4l | Live in 3 to 15 working days (4 steps + lead-flow diagram + 4 stats) | 1,631 | 3,039 |
| 6 | `use-cases` | v4l | AI voice agent use cases by industry (8 sticky cards) | 5,010 | 8,349 |
| 7 | `industries` | va | Built for businesses that live on the phone (8 cards + filters) | 2,043 | 4,760 |
| 8 | `feedback` | va | Proof goes here when it's real (6 pending videos + 3 stats) | 1,587 | 3,645 |
| 9 | `why-omh` | va | The software is the easy part (4 illustrative panels) | 1,421 | 2,658 |
| 10 | `compare` | va | How an AI voice agent compares (5-column table / mobile selector) | 1,175 | 1,679 |
| 11 | `right-fit` | va | A voice agent isn't for everyone (2 lists + 5-question fit checker) | 1,594 | 2,994 |
| 12 | `roi-calculator` | va | iframe `/roi-calculator/any-business.html` | 2,012 | 3,249 |
| 13 | `pricing` | va | AI voice agent pricing (3 cards + 7 notes) | 2,011 | 4,693 |
| 14 | `cities` | v4l | Local to you (6 city cards) | 1,217 | 2,495 |
| 15 | `faq` | va | AI voice agent FAQs (search, filters, 15 accordions, side card) | 2,077 | 3,067 |
| 16 | `related` | va | What makes the phone ring (3 service cards + bundle CTA) | 1,154 | 2,108 |
| 17 | `book-demo-form` | React | Hear an AI voice agent answer as your business (Book / Ring / Call back tabs) | 924 | 1,740 |
| — | sticky bar | va | Book a Demo + Call 020 3489 3934 (mobile only) | — | 75 |

Totals: 29,729px at 1440, 30,303 at 1280, 39,797 at 768, 54,528 at 390, 55,777 at 375.
One `h1`, 14 `h2` (one empty: the video dialog's), no horizontal overflow at any width.

## 3. Section-by-section audit

| Section | User intent | Business value | SEO value | Visual | Duplication | CTA | Interaction cost | Action | Priority |
|---|---|---|---|---|---|---|---|---|---|
| 1 Hero | What is this, is it for me | Sets the offer, first CTA | H1 + lead carry the primary keywords (V) | Centred stack is fine; marquee + video make it 1,500px before any content | Marquee duplicates the industry section; video duplicates nothing but is a placeholder | Two CTAs, same target, "Call Me Now" is misleading (V) | Low, but nothing to do except click | **Improve**: one primary CTA, real visual (the greeting phone), reassurance line kept | Critical |
| 2 What is | Definition | Educates, featured-snippet target | High: definition paragraph from the SEO brief (V) | Two-column, readable | Its 3-step "how it works" list overlaps §5's 4 steps and §9's "we do that" | None | Low | **Keep + merge**: keep the definition verbatim, replace the 3-step list with the call walkthrough | High |
| 3 What it does | What can it actually do | Core capability proof | Medium: feature phrases (24/7, calendar, transfer, CRM) | 9 equal cards, mock-UI visuals; 3 columns → 1 on mobile = 4,082px | Consent card duplicates FAQ + trust copy; web-lead card duplicates the lead-flow diagram | One secondary "Book a Demo" | Low | **Shorten**: 6 cards, plan tags kept; consent moves to the trust section | High |
| 4 Greeting builder | Can I hear it | The only working interactive demo | Low | Strong, distinctive | None | None | Medium (2 choices) | **Relocate** into the hero as the visual demonstration, labelled illustrative | High |
| 5 How it works | What happens after I say yes | Reduces effort anxiety | Medium: delivery times (V, from price paper) | 4-step timeline is good; the lead-flow diagram is a 1,000px animated feature explainer for one Growth feature | Steps overlap "Why OMH" panels 01–02; stats strip repeats hero reassurance | None | Medium (hover to trace routes) | **Merge** with Why OMH into one implementation section; drop the diagram and stats | High |
| 6 Use cases | Will it work for my type of business | Sector proof, industry keywords | High: 8 H3s with sector phrases (V) | Sticky stacking cards, 5,010px; each card repeats the same two CTAs | **Full duplicate** of §7 (same 8 sectors, same bullets reworded) | 16 CTAs + 1 (V) | High (scroll 5k px) | **Combine** with §7 into one tabbed industry panel; keep every H3, bullet and safeguard | Critical |
| 7 Industries | Same as 6 | Same as 6 + links to industry pages | Medium: links to `/ai-voice-agents/<industry>` (3 exist, 5 go to `/contact`) | Illustrations are nice but decorative | Duplicate of §6 | 8 "Learn more" + 1 | Medium (filter chips) | **Combine** into §6 | Critical |
| 8 Client feedback | Can I trust you | Negative today: it says proof is missing, then shows numbers anyway | None | Six identical pending cards | — | None | Low | **Remove temporarily**; replace with the honest safeguards strip; bring back when a real result exists | Critical |
| 9 Why OMH | Why you and not a DIY tool | Differentiation (managed service) | Low | 4 panels of fictional dashboards, captioned as fictional | Overlaps §5 and pricing feature lists | None | Low | **Merge** into the implementation section as the "after go-live" steps | High |
| 10 Compare | Is this better than voicemail / a receptionist | Objection handling | Medium (comparison terms) | 5-col table is dense; good mobile selector | Right-fit "Not the right fit" list repeats two rows | None | Medium | **Simplify**: collapse into a disclosure in the trust section, table kept | Medium |
| 11 Right fit | Is it for me | Qualification, honesty signal | Low | Two strong lists; the fit checker is a 5-question form whose answer is the lists above it | Fit checker repeats the "good fit" list as questions | 1 (after 5 answers) | High for little return | **Simplify**: keep the two lists (4 each), remove the fit checker | High |
| 12 ROI calculator | What do missed calls cost me | Lead capture (the calc has its own form) | None (iframe) | 2,000px embedded third page with its own typography | Pricing intro already links to it | Its own form | High | **Relocate** behind a disclosure in the pricing section, loaded on demand | Medium |
| 13 Pricing | What does it cost | Decision | High: prices in Offer schema (V) | Three long cards (≈1,800px each on mobile) with 8–11 ticks and 3–5 crosses | "Everything in Starter/Growth" repeats; notes repeat FAQ answers | 3 CTAs to `/contact?plan=` | Medium | **Improve**: scannable cards, full lists under "Everything included", CTAs to the in-page form | High |
| 14 Cities | Do you cover my area | Local keywords | Medium: six city names (V) | Six near-identical cards; "our London team" implies local offices (V) | FAQ "We're not in one of your six cities" already answers it | "Call Me Now" + text link | Low | **Shorten** to one UK-coverage line with the six local number codes; no implied offices | Medium |
| 15 FAQ | Objections | High | High: 15 questions in HTML and FAQPage schema (V) | Search + filters + counts + Open all above 15 accordions | Side card CTA duplicates the final band | 3 | Medium | **Simplify**: 8 objection questions shown, 7 more behind one button; schema keeps all 15 | Medium |
| 16 Related services | What else do you do | Internal links | Medium (3 links) | Three mock-up cards + animated connectors + another CTA | Bundle CTA duplicates booking | 1 + 3 | Low | **Shorten** to the site's standard `RelatedServices` row | Low |
| 17 Booking band | How do I start | The conversion | — | Good | — | Request / Ring / Call back | Medium | **Keep**; label the unset demo line honestly; add success tracking | High |

## 4. Redundant content analysis (V)

- **Industries ×2.** §6 and §7 cover the identical eight sectors. Bullets are reworded versions of
  each other (e.g. "Books viewings and valuations, and logs tenant maintenance calls" vs
  "Book viewings and valuations / Qualify buyers and tenants / Log tenant maintenance calls"). §6 has
  the better H3s and the conversation visual; §7 has the links to the industry pages and the
  safeguard chips. Combined: 7,053px → one panel.
- **How it works ×3.** §2's listens/works-out/replies, §5's connect/train/test/go-live, §9's
  built-around-your-calls/tested/improved/reported. These are three views of one process.
- **CTA copy ×4.** "Call Me Now", "Book a Demo", "Book a demo", "Book a Voice Agent Demo",
  "Book a demo for the Growth plan" all mean "request a demo".
- **Consent and disclosure ×3.** Feature card 9, the "Not the right fit" list, and three FAQs.
- **Web-lead callback ×3.** Feature card 6, the lead-flow diagram, pricing's Growth list.
- **Reassurance stats ×2.** Hero line ("Live in as little as 3 working days · Keep your number ·
  Billed monthly") and the kstats strip (1st ring / 60 sec / 24/7 / 100%).

## 5. CTA inventory and destination audit (V)

| Label | Count | Destination | Verdict |
|---|---|---|---|
| Call Me Now | 10 | `#book-demo-form` | Misleading: no call happens. Remove. |
| Book a Demo / Book a demo | 11 | `#book-demo-form` | Keep one wording; reduce to 4 placements |
| Book a Voice Agent Demo | 4 | 1 × `#book-demo-form`, 3 × `/contact?service=ai-voice-agents` | Leaves the page although the form is below. Point at the form. |
| Book a demo for the X plan | 3 | `/contact?service=…&plan=…` | Same; the plan interest is worth keeping as a hidden field |
| Learn more (industry) | 8 | 3 real industry pages, 5 → `/contact?industry=…` | Keep as text links inside the industry panel |
| Explore Google Ads / Local SEO / Website Design | 3 | real pages | Keep (internal links) |
| Ask about a joined-up plan | 1 | `/contact?…&bundle=1` | Remove (competes with the primary) |
| Ask us about your area | 1 | `#book-demo-form` | Remove with the city cards |
| Work out what missed calls cost you | 1 | `#roi-calculator` | Keep, becomes the disclosure toggle |
| 020 3489 3934 | 2 (FAQ card, sticky bar) | `tel:+442034893934` | Verified office number (homepage, schema). Keep. |
| support@onlinemarketinghelp.co.uk | 1 | mailto | Keep |
| Request this demo / Ring me back | 2 | form submit | Keep |
| [DEMO NUMBER] | 1 | `tel:` (empty) | Dead link on a live page. Label as coming soon. |

Total button-styled CTAs: 22 (+ text links) → target 6 (hero, industries, pricing ×3 plan buttons
counted as one placement, final band) plus the mobile sticky bar.

## 6. Visual design issues

- **V** Every section is the same size: 112px padding top and bottom on `va` bands, 64–112px on `v4l`
  ones, and most run 1,200–2,000px. There is no rhythm; the eye cannot find the important parts.
- **V** Two design systems on one page (`.v4l` and `.va-page`) with slightly different card radii
  (18/22px vs 14/16/18px), two eyebrow styles (now unified by CSS override) and two icon sprites.
- **V** Eight phone/dashboard mock-ups compete with each other (feature cards ×9, use cases ×8,
  why-OMH ×4, related ×3, branding phone, video poster).
- **V** The dark band (`branding`) sits between two light sections but the greeting builder's left
  column is a 2-choice form in a 1.35fr column: 962px of dark for two chip rows and a phone.
- **H** The sticky use-case stack hides the previous card under the next one; on a 900px-tall
  viewport cards overlap by ~28px each, so the eighth card's header is partially covered.

## 7. UX friction points

- **V** Five competing interactive devices before pricing: marquee, greeting builder, lead-flow
  tracer, industry filter chips, fit checker (plus FAQ search and the comparison selector after).
- **V** The fit checker's result CTA is hidden until all five are answered, and the result for the
  common "4 of 5 yes" case is "maybe": the visitor does work to be told to read the list above.
- **V** FAQ search filters 15 items; a visitor can search their way to "No questions match that".
- **V** Industry "Learn more" links for 5 of 8 sectors go to the contact form, not an industry page.
- **V** The hero's two CTAs both scroll ~29,000px to the bottom of the page.

## 8. Mobile usability issues (390 and 375px)

- **V** 54,528px tall at 390px; ~65 screens of content.
- **V** Three fixed elements stack in the bottom 160px: sticky bar (75px), site-assistant pill and
  back-to-top button (the CSS already lifts them; they still cover content).
- **V** 21 targets under 44px: 8 × "Book a demo" text links (100×26), marquee pause (35×36),
  "Work out what missed calls cost you" (277×25), "Ask us about your area" (159×19). The 10 radio
  inputs reported are `sr-only` peers of 44px labels and are fine.
- **V** Pricing cards are 1,500–1,900px each on mobile; three in a row = 4,693px.
- **V** The comparison table correctly switches to a selector below 1024px.
- **V** The ROI iframe is 3,249px tall on mobile with its own scrolling form.
- **V** The marquee track overflows the viewport by design (masked); no page-level overflow.

## 9. Trust and credibility issues

- **V** `feedback`: H2 "Proof goes here when it's real" is visible to visitors. Six cards say
  "Quote to follow" with fictional roles/cities and fake durations (1:12, 0:58…). Above them,
  1,284 / 317 / 38% are displayed as stats; the project notes record them as illustrative numbers
  the client asked for, not results. Showing numbers above "we have no proof yet" undermines both.
- **V** Hero video: `data-youtube-id="M7lc1UVf-VE"` is the YouTube IFrame API sample video; the
  poster and caption describe an OMH demo (1:32).
- **V** Why-OMH panels show fictional businesses (Aire Valley Heating, "Monthly report, October")
  with a small caption admitting it. They read as dashboards at a glance.
- **V** City cards say "you're through to our London team" and "Local 020 number", implying local
  presence; OMH is in Hullbridge and works remotely (FAQ 15 says so).
- **V** `[DEMO NUMBER]` renders on the live page in the Ring tab.
- **V** Good: AI disclosure, recording notice, GDPR controller/processor wording, PECR/TPS and
  "no clinical/legal advice" statements are consistent across features, FAQs and plans. Flagged
  for verification (not changed): "tell every caller they're speaking to an AI" and "only make
  outbound calls to people who have given consent" are operational promises; confirm the agent
  scripts enforce them before the page keeps saying so.

## 10. SEO risks

- **V** Must keep: title, meta description, canonical, H1, the "What is an AI voice agent?" H2 and
  definition paragraph, the eight industry H3s, pricing figures in `Offer` schema, all 15 FAQs in
  HTML and FAQPage schema, the six city names, internal links to industry pages and the three
  related services, the "AI receptionist" phrasing (H1 lead, dental/FAQ 1).
- **V** Risk if consolidated carelessly: hiding the eight industry panels with `display:none` keeps
  them in the HTML (Google indexes it, weighted lower on mobile-first). Acceptable; the H3s stay.
- **V** Risk: removing the city cards removes six H3s. Mitigated by keeping the city names and
  area codes in a visible paragraph plus FAQ 15.
- **V** Risk: FAQ "show more" hides 7 answers by default. Mitigated: all 15 stay in the DOM and in
  the schema; closed `<details>` was already the default state for 14 of 15.
- **V** The `/ai-voice-agents-old` and new `/ai-voice-agents-oldv2` backups are `noindex`,
  canonical to the live page and absent from the sitemap (sitemap derives from `readyPages`).

## 11. Technical and performance findings

- **V** Markup is server-rendered HTML strings; interactivity is two client scripts
  (`VoiceAgentsScript` 1,131 lines, `LandingV4Script` 153 lines) that attach by `data-*` hooks.
  Removing a widget's markup removes its cost; the scripts skip absent hooks.
- **V** The ROI iframe loads a second HTML document (its own CSS/JS) on every visit, above the fold
  of the pricing section.
- **V** Hero video facade loads YouTube only on click (good). Testimonial dialog loads YouTube
  only when a real id exists (none do).
- **V** 9 + 8 + 4 + 3 inline SVG mock-ups and 6 inline illustrations: ~120KB of HTML for visuals.
- **V** `landing-v4.css` is a 15-line generated file with a full Tailwind build scoped to `.v4l`
  (not edited; additive overrides only).
- **V** No console errors on load. No horizontal overflow at 1440/1280/768/390.
- **H** LCP candidate is the hero H1 (text) at desktop and the video poster SVG on mobile; both
  cheap. Not measured in the field; see the QA report for lab numbers.
- **V** Analytics: GTM `GTM-WWSXTPH` loads from `app/layout.tsx` on every page; the page scripts
  push `data-track` events to `dataLayer`. `BookDemo` uses `data-event` attributes only (nothing
  pushes a success event), so **no conversion event fires on a successful demo request today**.
  There is no consent banner or consent-mode configuration in the codebase; consent is a GTM-side
  matter and is flagged, not changed.

## 12. Prioritised recommendations

| Pri | Recommendation | Type | Fix |
|---|---|---|---|
| Critical | Remove the placeholder hero video; use the greeting builder as the hero demonstration, labelled illustrative | V | Done in rebuild |
| Critical | Remove the pending testimonial wall and the illustrative stats until a verified result exists | V | Done; section preserved in oldv2 |
| Critical | One industry experience: tabbed panel with all 8 sectors, H3s, bullets, safeguards and links | V | Done |
| High | Delete "Call Me Now"; one primary wording "Book a 30-Minute Demo" → in-page form; 4 placements | V | Done |
| High | Merge What-is + How-it-works + Why-OMH into "What is…" (definition + call walkthrough) and "How we set it up" (4 steps + after go-live) | V | Done |
| High | Capabilities: 6 cards, plan tags kept, consent moved to trust strip | V | Done |
| High | Pricing: scannable cards, full lists in a disclosure, CTAs to the form with the plan as a hidden field | V | Done |
| High | Fire `dataLayer` events on successful demo and callback requests, and on validation errors | V | Done |
| High | Mobile: no text-link CTAs under 44px; sticky bar keeps one primary + verified phone | V | Done |
| Medium | ROI calculator behind a disclosure, iframe loaded on open | V | Done |
| Medium | Cities → one coverage paragraph, no implied local offices | V | Done |
| Medium | FAQ: 8 shown, 7 behind "Show more"; drop search/filters | V | Done |
| Medium | Label the unset demo line as coming soon instead of a dead `tel:` | V | Done (shared BookDemo) |
| Low | Related services → standard site component | V | Done |
| H | Sticky mobile CTA improves demo requests | H | Keep; A/B test (see QA report) |
| H | A hero without the video lifts scroll depth to pricing | H | Measure scroll depth before/after |
| H | Plan-tagged capability cards reduce "which plan" questions on calls | H | Ask sales to log the question for 30 days |
