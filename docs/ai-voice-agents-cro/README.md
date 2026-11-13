# /ai-voice-agents CRO rebuild (20 Oct 2026)

Deliverables for the "AI Voice Agents page: backup, UX audit, CRO strategy and complete optimisation" brief.

| File | What it is |
|---|---|
| `ai-voice-agents-ux-cro-audit.md` | Deliverable 2: the UX and CRO audit of the page as it was |
| `ai-voice-agents-information-architecture.md` | Deliverable 3: before/after section map and reasoning |
| `ai-voice-agents-qa-report.md` | Deliverable 6: tests run, results, open issues, tracking, test plan |
| `before/` | Deliverable 5: full-page JPEGs of the old page (captured from `/ai-voice-agents-oldv2`) at 1440, 768 and 390, plus per-section crops at 1440 and 390 |
| `after/` | The same captures of the rebuilt page |

Deliverable 4 (the implementation) is the code: `app/ai-voice-agents/page.tsx`,
`lib/content/ai-voice-agents-markup.ts`, `app/ai-voice-agents/voice-agents.css` (additive block at the
end), `components/voice-agents/VoiceAgentsScript.tsx` (two small additions) and `components/BookDemo.tsx`
(tracking, plan field, honest demo-line state).

## Deliverable 1: the `oldv2` backup

**Name:** `oldv2`

**Where it is (two copies, both restorable):**

1. **Git tag `oldv2`** on commit `adf97b6` ("Bring back Industries, Client feedback and the Local cover
   cards on /ai-voice-agents"), the last commit before this rebuild. The whole repository at that
   point, so it includes the page, its content files, CSS, scripts, assets, the pricing data and the
   booking band exactly as they were.
2. **Frozen source copies** in the working tree, so the old page can be browsed next to the new one:
   - `app/ai-voice-agents-oldv2/page.tsx` — the route, `noindex, nofollow`, canonical to
     `/ai-voice-agents`, not in the sitemap (the sitemap is built from `readyPages` in `lib/content/nav.ts`
     and this route is not listed there), no JSON-LD so it never competes with the live page.
   - `lib/content/ai-voice-agents-oldv2/markup.ts`, `landing-v4.ts`, `voice-pricing.ts`,
     `roi-calculator.ts` — byte-for-byte copies of the content files with only their imports repointed
     at each other. Each starts with a "FROZEN BACKUP, do not edit" line.
   - The two stylesheets (`voice-agents.css`, `landing-v4.css`) and the two page scripts are shared with
     other pages, so they were not copied. The rebuild only *added* CSS rules (a clearly marked block at
     the end of `voice-agents.css`) and two script functions that attach to hooks the old page does not
     have, so the old markup renders as before. Verified: `/ai-voice-agents-oldv2` measures the same
     section heights as the before-change captures (see the QA report).

**What is preserved:** all 17 sections and their text, the illustrations and mock-ups, desktop and
mobile layouts, every button and link, both forms and their validation, the greeting builder, fit
checker, comparison selector, FAQ search and filters, the testimonial dialog, the ROI calculator
iframe, the sticky bar, all animations, the SEO metadata and the structured data (the latter only in
the git tag; the browsable copy deliberately omits it).

**Restoration (either of):**

```bash
git checkout oldv2 -- app/ai-voice-agents lib/content/ai-voice-agents-markup.ts lib/content/ai-voice-agents-landing-v4.ts lib/content/voice-pricing.ts components/BookDemo.tsx components/voice-agents/VoiceAgentsScript.tsx
```

or copy the four files in `lib/content/ai-voice-agents-oldv2/` back over
`lib/content/ai-voice-agents-markup.ts`, `lib/content/ai-voice-agents-landing-v4.ts`,
`lib/content/voice-pricing.ts` and `lib/content/roi-calculator.ts` (fixing the import paths back), and
restore `app/ai-voice-agents/page.tsx` from `app/ai-voice-agents-oldv2/page.tsx` (adding the metadata and
JSON-LD back from git).

**Not overwritten:** the rebuild wrote new content into `ai-voice-agents-markup.ts` and `page.tsx`, deleted
the now-unused `ai-voice-agents-landing-v4.ts`, and touched nothing under `ai-voice-agents-oldv2/`.
`git diff oldv2 -- lib/content/ai-voice-agents-oldv2` is empty by construction (the folder did not
exist at the tag; its files are copies of the tagged originals).

## Screenshots

`node scripts/page-shots.mjs <url> <outDir> [widths]` drives the installed Chrome headlessly and writes
one full-page JPEG per width plus one crop per top-level section. No dependencies.
