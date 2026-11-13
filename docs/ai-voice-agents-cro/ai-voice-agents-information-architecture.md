# /ai-voice-agents — information architecture, before and after

## Before (17 sections, 20 Oct 2026, tag `oldv2`)

1. Hero: H1, lead, Call Me Now + Book a Demo, reassurance line, industry marquee, video facade
2. What is an AI voice agent? (definition + 3-step list)
3. What your AI voice agent does (9 cards + Book a Demo)
4. Try it: build a greeting (dark band)
5. How it works (4 steps + lead-flow diagram + 4 stats)
6. Use cases by industry (8 sticky cards, 16 CTAs + closing CTA)
7. Industries (8 cards + filters + CTA aside)
8. Client feedback (6 pending videos + 3 illustrative stats)
9. Why choose OMH (4 illustrative panels)
10. Compare your options (table / selector)
11. Is it the right fit? (2 lists + 5-question fit checker + CTA)
12. ROI calculator (iframe)
13. Pricing (3 cards + notes, 3 CTAs to /contact)
14. Local cover (6 city cards + Call Me Now + link)
15. FAQs (search + filters + 15 accordions + side card with CTA)
16. Related services (3 cards + connectors + bundle CTA)
17. Booking band (Book / Ring / Call back)
+ mobile sticky bar

## After (10 sections + booking band)

| # | New section | Built from | What happened to the parts |
|---|---|---|---|
| 1 | **Hero** — H1, lead, one primary CTA, "See how a call goes" secondary link, reassurance line, greeting-builder phone as the demonstration | 1 + 4 | H1/lead/reassurance **retained** verbatim. Video facade **removed** (placeholder id). Marquee **removed** (industry tabs replace it). Greeting builder **relocated** here, chips beside the phone, "illustrative, fictional businesses" label kept. "Call Me Now" **removed**. |
| 2 | **Without / with an AI voice agent** — two short columns | new, from existing copy | Six lines drawn from the "good fit" list and feature copy. No statistics. |
| 3 | **What is an AI voice agent?** — definition + "How a call goes" four-step walkthrough | 2 + 6 (one conversation) | Definition paragraphs **retained** verbatim (SEO). The 3-step listens/works-out/replies list **shortened** into the walkthrough's captions. One use-case conversation (plumber) reused as the visual. |
| 4 | **What it does** — 6 capability cards with plan tags | 3 | 9 cards → 6: web-lead callback and follow-up **combined**; consent card **relocated** to section 7's safeguards; call-summary and CRM **retained**. Mini visuals retained. Section CTA removed. |
| 5 | **Industries** — tab selector, one panel at a time, all eight in the DOM | 6 + 7 | Every H3, intro, three bullets, safeguard note and conversation visual **retained** from 6; "Learn more" links **retained** from 7; illustrations and filter chips **removed**; 17 CTAs **removed**; the "Not sure how your calls would fit?" line becomes the panel footer with the primary CTA. |
| 6 | **How we set it up and run it** — 4 steps + 3 after-go-live points | 5 + 9 | Steps 01–04 **retained** (timeline component); delivery-time line retained; lead-flow diagram and stats **removed**; Why-OMH's intro and its points 02–04 **shortened** into "after go-live" cards without the fictional dashboards. |
| 7 | **Is it right for you?** — fit lists (4 + 4), safeguards strip, comparison in a disclosure | 11 + 10 + 3 (consent) | Lists **shortened** 5/6 → 4/4 (dropped items are covered by the comparison and FAQs); fit checker **removed**; comparison table and mobile selector **retained** inside `<details>`; safeguards strip assembled from existing claims. |
| 8 | **Pricing** — 3 scannable cards, "Everything included" disclosures, notes, ROI calculator disclosure | 13 + 12 | Prices, minutes, setup, delivery, overage, VAT, contract **retained** exactly. Feature lists **retained** in full inside each card's disclosure; the most decision-relevant lines shown open. CTAs go to the in-page form with the plan as a hidden field. ROI calculator **relocated** behind "Work out what missed calls cost you"; iframe loads on open. UK coverage line (six cities + area codes) sits under the notes. |
| 9 | **FAQs** — 8 questions shown, "Show 7 more" | 15 | All 15 **retained** in HTML and schema; search, filters, counts, Open all **removed**; side card **shortened** to phone and email, CTA removed. |
| 10 | **Related services** — standard site row | 16 | Three links **retained**; mock-ups, connectors and bundle CTA **removed**. |
| 11 | **Booking band** (`BookDemo`) | 17 | **Retained**. Heading states the time commitment. Ring tab labels the unset demo line as coming soon instead of a dead link. Success and error events pushed to `dataLayer`. |
| — | Mobile sticky bar | — | **Retained**: "Book a Demo" → in-page form, "Call 020 3489 3934" (verified). |

Removed outright: client feedback wall (8), six city cards (14; replaced by the coverage line).
Both survive in `/ai-voice-agents-oldv2` and tag `oldv2` for when real proof exists.

## Primary CTA placements (4)

1. Hero: "Book a 30-Minute Demo"
2. End of the industries panel
3. Pricing cards (plan-specific wording, same destination)
4. Booking band (the form itself)

Secondary: hero "See how a call goes" (anchor to §3), FAQ phone/email, industry "More about…"
links, related services. Mobile: sticky bar.

## Heading map (after)

- H1 AI Voice Agent for UK Businesses: Answer Every Call, Even at 2am
- H2 Without an AI voice agent, with one
- H2 What is an AI voice agent? — H3 How a call goes
- H2 What your AI voice agent does — H3 × 6
- H2 AI voice agent use cases by industry — H3 × 8 (sector headings retained)
- H2 How we set it up and run it — H3 Setup, done for you / After go-live
- H2 Is an AI voice agent right for you? — H3 A good fit if / Not the right fit if / How it compares
- H2 AI voice agent pricing — H3 Starter / Growth / Scale
- H2 AI voice agent FAQs — H3 × 15
- H2 Related services (component)
- H2 Book a 30-minute demo (booking band)

## Revision, 20 Oct 2026 (client feedback on the first rebuild)

The client asked for the removed sections back. The page now runs:

1. Hero (rebuilt: greeting builder as the demonstration, one primary CTA)
2. Without / with an AI voice agent (new)
3. What is an AI voice agent? (rebuilt: definition + call walkthrough)
4. What your AI voice agent does (rebuilt: 6 cards)
5. How it works (previous: 4 steps, lead-flow diagram, stats)
6. Use cases by industry (rebuilt: tabs; kept at the client's request)
7. Industries (previous: 8 cards with illustrations and filters)
8. Client feedback (previous)
9. Why choose OMH (previous)
10. Compare your options (previous)
11. Is it the right fit? (previous, with the fit checker)
12. ROI calculator (previous, inline)
13. Pricing (rebuilt cards with a stronger facts box and badge; previous notes layout)
14. Local cover (previous city cards; "Call Me Now" renamed to the primary wording)
15. FAQs (previous layout with search, filters and the side card)
16. Booking band

Removed: Related services. Demo CTAs in the restored sections point at `#book-demo-form` instead of
`/contact`. The restored markup is verbatim in `lib/content/ai-voice-agents-legacy.ts` (old body
sections) and `lib/content/ai-voice-agents-landing-v4.ts` (how it works, local cover).

**Later the same day:** the previous hero (industry strip and video) is back as section 1 on the
client's instruction, with its two buttons relabelled "Book a 30-Minute Demo" and "Watch the demo"
(the second scrolls to the video). The greeting-builder band returned to its old slot after the
capability cards. "What is an AI voice agent?" keeps the rebuilt definition-plus-walkthrough layout,
now with numbered gold steps on a sand panel.

**Later again:** "Why it matters", "In plain English", "What's included" and "Try it: build a
greeting" were four sections in a row; the client found them confusing. They are now two:

- **What is an AI voice agent?** (dark band): the definition, then "How a call goes" as four steps
  that light up while the phone beside them plays an illustrative call for the chosen business and
  tone (greeting, caller, reply, booking, summary). This absorbs the greeting builder and the old
  walkthrough cards.
- **What your AI voice agent does** (sand): "A day on your phones", a without/with switch over four
  illustrative calls (absorbs "Why it matters"), followed by the six capabilities as compact rows.

**Later still:** "What's included" and "Why choose OMH" became one section, "What your AI voice
agent does, and what we do for you": a capability explorer (six selectable capabilities, each panel
showing the mock-up, what the agent does and what OMH does) followed by the four "running it well"
points from the old Why choose OMH, without the fictional dashboards. The without/with day switch
was dropped. The "In plain English" eyebrow was removed.

**Carousels (20 Oct 2026, evening):** the three large grids, Industries (8 cards), Client feedback
(6) and Local cover (6), are now horizontal scroll-snap carousels with prev/next buttons, a waveform
progress indicator and a running "n / total" count. No library: native scrolling, scroll-driven
entrance animation where the browser supports it, static under reduced motion. Keyboard: the track
is focusable and scrolls with the arrow keys; the buttons are ordinary buttons.

**Revision:** Industries is a grid again (the client wants variety, not three carousels in a row).
Client feedback and Local cover stay carousels, now draggable with a mouse and auto-advancing every
4.5 seconds while in view; autoplay pauses on hover or focus and for eight seconds after any
interaction, and is off under reduced motion. The control row is compact: arrow, waveform, count, arrow.

**Round four (client):** carousels read "6 / 6" with a full waveform once the last card is on
screen, and the arrows loop rather than disable. "Is it the right fit?" is compact: the five-question
fit check with an inline gauge on the left, two short fit/not-fit lists on the right. The hero video
caption and the comparison price note are gone. Section padding is 80px at desktop (was 112px).
Page-wide motion: scroll-driven CSS reveals on headings, cards and steps (no JavaScript, static under
reduced motion) and hover lifts on cards and primary buttons.
