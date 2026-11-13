# OMH site: layout, type and media rules

Agreed with the client on 12 Oct 2026 while fixing the service pages. Every page
must follow these. Each rule says how to check it, because most of them were
found by measuring the DOM, not by looking at screenshots.

Working copy is `D:\claude\omh\site` (this repo). Pushes to `main` deploy to
omh-redesign.vercel.app.

## 1. Width and layout

1. **One container.** Every section wraps its content in `container-omh`
   (1440px content box, 48px gutters outside it at desktop, so the box is 1536px
   wide in all; 29 Oct 2026). No page-level `max-w-[…px]` wrappers:
   the AI pages had their own 1240px wrapper and read narrower than the header.
2. **Content reaches the edges.** Inside a section, the content must run to the
   container's right edge. No half-empty rows (a heading or paragraph alone in
   the left half with nothing on the right).
   *Check:* for each `main .container-omh`, the widest child's right edge is
   within 8px of the container's content box.
3. **The header never overflows its container.** It has three nav tiers in
   `components/layout/Header.tsx`: 1024–1279px 14px text, 1280–1419px 15px,
   1420px and up 16px with the 920px four-column mega menu. The widest tier is
   already 1318px of the 1344px box, so adding a top-level nav item will break
   it. The phone number is not in the header row (mobile menu and footer only).
   *Check:* header children's max right edge minus the container's content right
   edge is 0 at 1024, 1280, 1366, 1420, 1536 and 1920.
4. **Section header = eyebrow, title, description, stacked.** The description
   sits under the title in the same block, left-aligned. Never title on the left
   and description on the right. Content (cards, frames, lists) may sit beside
   that block.
   *Check:* for every `h2`, the following `p` has `top >= h2.bottom`.
5. **Frames in a row share a height.** Two or three media frames that start on
   the same row must end on the same row (±4px). Working pairs: `5/4` in
   `col-span-5` beside `16/9` in `col-span-7` (gap-5 or gap-7); equal columns
   use equal ratios. The solution pages pair `5/4` with `16/9` the same way.
6. **`fill` images with an aspect ratio go in `minmax(0, Nfr)` columns.** A
   plain `1.1fr 1fr` grid let the image column swallow the row (968px image,
   376px text on the case-studies featured card). And never combine a fixed
   aspect ratio with `h-full` beside a taller column: the height comes from the
   other column, so the width follows the ratio and spills past the cell (958px
   photo in a 622px column under the featured card's text, 14 Oct 2026). Drop the
   ratio where the image is stretched (`lg:aspect-auto!`).

## 2. Type

7. **Two fonts only.** Instrument Sans for headings and UI, Source Sans 3 for
   everything else, quotes included. Source Serif 4 was removed; do not add a
   serif back. `font-body` is the only body utility.
   *Check:* `[...document.fonts].map(f => f.family)` contains no "Serif".
8. **Titles wrap to about two lines.** `app/globals.css` caps every `h2` at
   `max-width: 30ch` (about 894px at the h2 size) and keeps centred titles
   centred. Do not add `max-w-[Nch]` to headings; the global cap is the single
   knob. Titles in narrow columns may take three lines; titles in a full-width
   row should not.
9. **Descriptions are 18px and full width.** Body and description paragraphs
   use `text-body` (18px; `text-lead` is also 18px with a tighter line-height
   and is fine for hero standfirsts). No 19–28px deck or lede sizes, no
   `max-w-[Nch]` or `max-w-[Nrem]` on paragraphs. Small print may use
   `text-bsm`; eyebrows and captions stay 14px.
   *Check:* no `main p` with a computed font size above 18px, other than stat
   values and the pull-quote in the testimonial carousel.

## 3. Imagery

10. **Dashboard and screenshot mock-ups need room.** They are 1536×1024 PNGs
    with small UI text and are unreadable under about 600px wide. Never put one
    in a two-up inside a half-width column. Before/after pairs run full width
    under their text (614px each at 1440px). Hero visuals at ~526px are the one
    accepted exception; they read as atmosphere.
11. **Frame ratio follows the source.** 3:2 screenshots go in `16/9` (small
    crop) or `3/2` (no crop). A portrait graphic with lettering (for example
    `Services/Shopify Development.jpg`, 4:5) goes in `4/5`. A square graphic
    (`Services/Google Ads management.png`) goes in `1/1`. Never `object-cover`
    a graphic that has text baked into it.
12. **Photos may be cropped; graphics may not.** Cropping a photo to fit a row
    is fine. Cropping cuts lettering off a composed graphic.
13. **No empty dark cards.** The homepage featured-insight card shows the post's
    Sanity cover photo under a gradient; a card that stretches to match its
    neighbours must have something in it.
14. **Alt text describes the photo that is actually there**, not the one a brief
    expected.

## 4. Proof and copy

15. **The trust badge is per service and only uses verified data.**
    `ReviewProof` in `components/ui/Proof.tsx` takes `serviceId` and renders the
    company-wide review count, one per-service item and a named review excerpt.
    Per-service items come only from the `serviceProof` map: a published
    case-study result (slug + result label), a company fact already on the
    homepage, or a verbatim excerpt from `siteTestimonials`. The lookups throw
    if a label or excerpt no longer matches, so the build fails instead of
    publishing a wrong number. The "47 Reviews Across Trustpilot & Google" line
    is company-level and is never relabelled per service.
16. **Nothing invented.** No made-up numbers, testimonials or client names.
    A case-study stat is never retitled as a platform-specific result.
17. **No internal wording on the page or in images.** Build notes, brief
    instructions and "from the original page" phrasing never ship. Known
    leftover: `Services/Google Ads management.png` has "from the original
    service page" baked into the image and needs replacing by the client.
18. **Case-study hub cards are outcome-led.** Each study has a `card` field:
    client-first title, business result before the traffic metric. The article
    page keeps its own `title` as H1.
19. **SEO basics on every page.** Exactly one `h1`; a title, meta description
    and self-referencing canonical; FAQ answers in the HTML (closed `details`)
    and published as FAQPage schema from the same array, with any
    `[anchor](/path)` markup stripped from the schema.

## 5. How to run the checks

The browser pane resets its viewport between calls, so set the width and
measure inside one `browser_batch`. Measure with `getBoundingClientRect()`
against the container's content box; do not rely on screenshots, which often
time out in the pane.

Static checks that must come back empty:

```bash
grep -rn "max-w-\[[0-9]*ch\]\|max-w-\[[0-9.]*rem\]\|font-serif" app components lib --include=*.tsx --include=*.ts
grep -rn "<p[^>]*max-lg:mt-[0-9]" components app --include=*.tsx     # side-by-side descriptions
grep -rn "max-w-\[1240px\]" lib/content                               # page-level wrappers
```

Then `npx tsc --noEmit`, and the per-page DOM audit at 1440px: header overflow,
one `h1`, h2 line counts, paragraph sizes, side-by-side h2+p pairs, media rows
with unequal heights, and `document.documentElement.scrollWidth <= innerWidth`
at 1440 and 375.

## 6. Audit log

**12 Oct 2026, full pass.** 33 pages checked at 1440px: every bespoke page plus
one of each template (blog post, case-study article, quote form, legal page,
and all five solution pages). Fixed in the pass: nine side-by-side headers on
the two AI pages, one each on the solution template ("Services that support…"),
the case-study article ("Our approach"), the Shopify showcase and the
Facebook/Instagram "get in touch" row; 19–30px paragraphs on the AI pages,
solution comparison verdict, insights hub and warranty page; the voice-agents
branding row (phone mock now in a narrower column). Result: no page has a
side-by-side header, an oversized description, a serif font, more than one
`h1`, horizontal overflow, header overflow or an uneven media row.

Accepted exceptions (do not "fix" without asking):

- Three-line titles on `/wordpress-website-maintenance` and
  `/social-media-marketing-services`: their titles are 80–100-character client
  phrases; at the 30ch cap they take three lines.
- Hero dashboards at ~526px on the service pages (rule 10).
- The voice-agents phone mock is 380px wide by design, so its column cannot
  reach the edge.
- The audit's "gap" check reports FinalCta (33px, the aside card's padding),
  the Facebook/Instagram jump-nav rows (link row, not content) and stat grids
  (text inside grid cells). These are measurement artefacts, not gaps.

Flagged for the client, not changed: the `/ai-voice-agents` heading "Proof
goes here when it's real" (placeholder wording visible to visitors) and the
Google Ads graphic with "from the original service page" baked in.

**20 Oct 2026, /ai-voice-agents CRO rebuild.** The "Proof goes here when it's real" heading no longer
ships: the pending-testimonial wall is parked in the `oldv2` backup (`/ai-voice-agents-oldv2`, tag
`oldv2`) until a verified result exists. Rebuild notes: `docs/ai-voice-agents-cro/`.

**20 Oct 2026, client:** section descriptions on `/ai-voice-agents` stop at 850px, the same measure
as the homepage's section intros (`max-w-[850px]`), instead of running the full container (rule 9
said full width). Titles keep the global 30ch cap. Apply the 850px measure to other pages only if the
client asks.

**29 Oct 2026, client:** the container's side padding no longer eats into the 1440px. `container-omh`
(and the voice pages' `.v4l .container-omh` and `.wrap`) cap the content box at 1440px with the
gutters outside it, so from 1536px up the header and sections run the full 1440px. Checked: header
overflow 0 at 1024, 1280, 1366, 1440 and 1536; header and sections share edges at 1920; no horizontal
scroll at 1920 or 375.

**20 Oct 2026, client:** the shared booking band (`components/BookDemo.tsx`) no longer has the "Ask
for a call back" tab, on every page that uses it. It offers "Book a 30-minute demo" and "Ring our demo
agent now".
