# AI Services menu + industry page briefs: plan (29 Oct 2026)

Sources: the 12 PDFs from the client, 29 Oct 2026 (4 full page briefs, 7 keyword-fix briefs, 1 menu brief in Bengali).

## Where things stand

The 11 page briefs are **already in the code**. Commit `9802ac1` (26 Oct 2026, on `main` and pushed to origin) built
accountants, salons and trades, rewrote car dealerships and applied the keyword fixes on the other seven pages.
A spot check of 16 brief strings (new H2s, new FAQs, new sections, trades links) found every one.

| Brief | Page | State |
|---|---|---|
| Accountants & Financial Advisers (full page) | /ai-voice-agents/accountants-financial-advisers | Built 26 Oct |
| Salons & Beauty (full page) | /ai-voice-agents/salons | Built 26 Oct |
| Trades (full page) | /ai-voice-agents/trades | Built 26 Oct |
| Car Dealerships & Garages (full page) | /ai-voice-agents/car-dealerships | Rewritten 26 Oct (tag `cars-oldv1`) |
| Clinics, Dentists, Plumbers, Heating, Builders, Estate, Law (keyword fixes) | their existing URLs | Applied 26 Oct |
| **AI Services menu change** | header mega menu | **Not done. This is the new work.** |

Not yet confirmed: whether the VPS (real domain) is running `9802ac1`. Vercel has it (pushed).

## Steps, one at a time

Each step ends with a check in the browser and a pause for your OK before the next one.

### Step 1. Full audit of the 11 briefs against the code
Go through every brief change by change (title, meta, og/twitter, eyebrow, H1, hero intro, H2s, paragraphs, links,
new sections, FAQs, FAQPage JSON-LD and FAQ counter) and tick it off. Fix anything missing or worded differently.
Output: a checklist appended to this file. No design changes.

#### Step 1 result (29 Oct 2026): done

Method: rendered HTML of each page from `next dev`, checked against the briefs.
- Keyword-fix briefs (7 pages): every change written out as an exact check (title, meta, og, twitter = og, eyebrow,
  H1 incl. no space before the colon, hero intro, "What is" H2 and both paragraphs, AI receptionist plan link,
  use-case and local-cover intros, Trades link, new sections and H3s, new and reworded FAQs). FAQPage JSON-LD:
  question count matches the brief and every question and answer appears word for word on the page. FAQ positions
  and filter groups match. **All pass.**
- Full-page briefs (4 pages): every 5-word run of brief copy searched for on the page, plus exact SEO-field, H1, H2,
  H3, link and FAQ checks. **All pass**, except:
  - **Fixed:** the example calls on Accountants, Salons and Car Dealerships were cut to 2 lines + a booked note and a
    summary. They now play the briefs' 4-line scripts word for word, in the same 4-bubble layout Trades already used.
  - **Open, not a copy fix:** the ROI sections. The briefs give each page its own H2, intro, slider defaults and
    "1 in 6" / "1 in 3" assumption. The site embeds the shared calculators from the client's ROI repo
    (`public/roi-calculator`, generated, not edited here): Accountants and Salons use `any-business`, Trades uses
    `contractors`. Matching the briefs needs new calculator files from that repo.
  - Left as built, on purpose: Car Dealerships keeps the live section order (the brief says to keep it); the Trades
    demo form uses the shared booking component (the brief's own note says so); the city cards don't show the
    "Covers" column (same as every other page).

### Step 2. AI Services menu (the menu brief)
Three-column mega menu, per the client's mock-up:

- **AI Voice Agents**
  - AI Voice Agents → /ai-voice-agents, sub-line "Answer every call, 24/7"
  - AI Receptionist → /ai-voice-agents/receptionist, sub-line "Never miss a call, from £249/month"
  - Use cases (Appointment Booking, Customer Service, Lead Generation): **left out**. Those pages don't exist,
    and the brief says to add each one when it goes live.
- **By Industry** (labels without "AI Agent for", Phase 1 first, then Phase 2):
  Healthcare & Clinics · Dentists · Estate & Letting Agents · Trades (small sub-line: Plumbers · Heating · Builders)
  · Law Firms · Car Dealerships & Garages · Salons & Beauty · Accountants & Financial Advisers · All industries →
  (/ai-voice-agents#industries)
- **Build with AI**: unchanged.
- **CTA strip** across the bottom of the panel: "Hear an AI voice agent handle a real call." + "Book a Free Demo →"
  (to /ai-voice-agents#book-demo-form).

Code: `lib/content/nav.ts` (data; `NavLink` gets optional `desc` and `sub`, `NavItem` gets optional `cta`) and
`components/layout/Header.tsx` (desktop panel + mobile accordion render them; current-page highlight covers sub-links;
panel width set for three columns). Same styles as the existing menu, nothing new visually beyond the sub-line and
strip. Checked at 1024, 1280, 1440 and mobile, light and dark.

Salons and Accountants: the brief says "add when live". Both are live, so they go in at the end of the list.

#### Step 2 result (29 Oct 2026): done
Built as above. The three-column panel (about 740px) is centred under "AI Services", because hung from the trigger's
left edge it ran 60px off the screen at 1024px. Checked at 1024, 1280 and 1440 (no overflow), mobile 375 (no
sideways scroll; descriptions, Trades sub-line and the demo card show in the accordion), dark mode, and the current
page highlight (on /plumbers the "Plumbers" sub-link turns gold and "AI Services" shows as active). Services,
Solutions and Company menus unchanged.

### Step 3. Visible breadcrumb on the industry pages
All four full-page briefs put "Home › AI Voice Agents › <Industry>" at the top of the hero; the keyword briefs ask
for it on Plumbers, Heating and Builders with Trades in the middle. The pages carry BreadcrumbList schema but show
no breadcrumb. Add one small line above the eyebrow on all 11 pages (Trades children: Home › AI Voice Agents ›
Trades › Plumbers), matching the schema. Shared in `VoiceLanding`, so one component change plus one prop per page.

#### Step 3 result (29 Oct 2026): done
`VoiceLanding` takes a `breadcrumb` flag and draws the trail from the page's own BreadcrumbList, so the visible line
and the schema can't differ. All 11 industry pages turn it on; Plumbers, Heating & HVAC and Builders & Construction
now have Trades in both (Home › AI Voice Agents › Trades › Plumbers). The hub and the AI Receptionist page don't
show one. Checked: trail = schema on all 11, links work, 1280 and 375 widths, dark mode, brief audit still 0
problems. Note: inside the v4 hero wrapper `mb-*` utilities are zeroed, so the trail uses `pb-6`.

Clinics shows "Clinics & Healthcare" (its existing schema name); the menu says "Healthcare & Clinics". Left as is.

### Step 4. "Still open" items (needs your call, not started without it)
The briefs list these as outside the keyword work. Some need facts only the client has.

- CQC line (clinics, dentists): wording only, can do.
- Comparison section "AI agent vs answering service / reception staff" (clinics, dentists, plumbers, heating,
  builders, law, estate): needs copy; the estate one exists in the 21 Oct review.
- Heating: carbon monoxide FAQ (same route as gas smell), one F-gas line.
- Plumbers: name simPRO. Dentists: name Dentally / Software of Excellence (only if the client confirms they connect).
- Estate: Rightmove / Zoopla / OnTheMarket, portal call-back FAQ, "An estate and letting agency" wording.
- Law: SRA section, practice areas block.
- "Coming soon" recording cards: keep or hide (client's choice).

#### Step 4 result (29 Oct 2026): partly done, the rest waits on the client
The earlier 21/22 Oct review documents, which hold the full copy for most of these, are not in the repo or Downloads.
Only items whose wording is fixed, or can be lifted from copy already approved on the page, were done:
- Done, Heating: FAQ "What happens if a caller thinks there is carbon monoxide?", same route as the gas-smell answer
  (0800 111 999, no other advice, flagged), plus "call 999 if anyone feels unwell" (added at the user's request).
  FAQ count 19 → 20, JSON-LD follows.
- Done, Estate: use-cases intro now opens "An estate and letting agency" (the brief's own wording).

Waiting on the client (new copy or facts nobody has confirmed):
- CQC line (clinics, dentists): what OMH can say about CQC.
- F-gas line (heating): the wording.
- Comparison sections (7 pages), estate portals copy and portal FAQ, law SRA section and practice areas: the copy
  is in the 21/22 Oct reviews; send those documents.
- simPRO (plumbers), Dentally / Software of Excellence (dentists): confirm they connect before naming them.
- "Coming soon" recording cards: keep or hide.
- ROI calculators for accountants, salons and trades: new files from the ROI repo (see step 1).

### Step 5. Ship
Commit per step, push to origin (Vercel preview), then paste-ready VPS web-console commands for the live site,
and the Search Console "request indexing" list for the 11 URLs.

#### Step 5 result (29 Oct 2026)
Pushed to origin (up to 4681abf); Vercel build: success. Final recheck on fresh HTML: brief audit 0 problems on all
11 pages, breadcrumbs on all 11 (Trades parent on 3), example calls word for word, menu data matches the brief.
Still to do by hand: run the VPS update in the web console, then request indexing for the 11 URLs.
