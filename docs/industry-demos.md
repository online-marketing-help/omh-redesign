# The live demo section on the voice agent pages

What this branch adds, and what you need to know before merging it.

## What changed, and why

The `#hear` section on the AI voice agent industry pages used to type a greeting
into a phone mock and read it out with the browser's `speechSynthesis`. That
proved a voice existed and nothing else: a visitor could not ask it anything,
and the "ring our demo agency" line was still `[DEMO NUMBER]` with an empty
`href="tel:"`.

It is now a working assistant the visitor talks to as their own lead. They type
their name, then chat or speak, and the agent answers using that name. Two
trades have one so far:

| Page | Fictional business |
| --- | --- |
| `/ai-voice-agents/estate-letting-agents` | Marlborough & Hale, an estate and letting agency |
| `/ai-voice-agents/clinics-healthcare` | Brookfield Clinic, an outpatient clinic |

The clinics and healthcare page is new in this branch. It is built on the same
structure as the dental page.

## Files

| File | What it is |
| --- | --- |
| `lib/content/lead-demo.ts` | The section markup, and the per trade copy (business, prompts, the refusal each one triggers) |
| `components/voice-agents/wireLeadDemo.ts` | Makes the suggested questions actually ask the agent |
| `lib/content/voice-industry/clinics-healthcare.ts` | The new page |
| `lib/content/voice-industry/estate-letting-agents.ts` | `#hear` section replaced |
| `lib/content/voice-industry/index.ts` | Registers the new page |
| `app/ai-voice-agents/industry.css` | Styles for the section, all prefixed `ld-` |
| `components/voice-agents/IndustryScript.tsx` | Calls `wireLeadDemo` on mount |

## The two things worth understanding

**The assistant in the section is an iframe, not a second widget.** OMH's own
assistant is pinned to the bottom right of every page by
`components/layout/SiteAssistant`. Loading a second copy of the widget script
would put two pills side by side, and a fictional agency's fees would then be
coming out of something that looks like ours. Inside the frame the panel is
docked and has no pill of its own.

Because the frame is cross origin, `fitRoiFrames` cannot measure it the way it
measures the ROI calculators. The height is set in `lead-demo.ts`
(`h-[640px] sm:h-[700px]`) and that is the one number to change if the panel
ever outgrows its box.

**Clicking a suggested question posts a message into the frame.** The page
cannot reach into a cross origin iframe, so `wireLeadDemo` posts
`{ type: "assistant:ask", text }` to the frame's origin. The widget only
listens for that when it is docked, and ignores everything else from the
parent. If the frame has not finished loading the click is held and replayed on
`load`, so an early click is not swallowed.

## The demos are separate deployments

Each demo is its own Retell agent, its own n8n workflows, its own knowledge base
and its own Vercel project. Nothing in them touches the live OMH assistant.

- https://github.com/online-marketing-help/ohm-demo-real-estate
- https://github.com/online-marketing-help/ohm-demo-healthcare

Both repos have their own README covering the stack and how to rebuild.

## Before you merge

`allow="microphone"` is on the iframe and is required. Without it the chat half
still works and voice fails at `getUserMedia`, which looks like a broken agent
rather than a missing attribute. Note that this was not reproduced locally:
headless Chrome's fake media device flags bypass Permissions Policy, so take it
as the rule rather than as something observed here.

Both demo origins are on the allow list of the n8n webhooks behind them, along
with `localhost:3000`, `3001` and `3002` for local work. A blocked origin does
not fail loudly: the panel opens, the pill appears, and every message comes
back as "cannot reach our system". If you serve the site from another origin and
the demos go quiet, that is the first thing to check, and the allow list lives
in the widget repo.

The booking section on both pages still has a `[DEMO NUMBER]` marker with an
empty `href="tel:"`. It was left alone on purpose: it needs a real number, or
an Ofcom reserved drama number, which is a decision rather than a fix. The other
`[PLACEHOLDER]` and `[CONFIRM]` markers on the remaining industry pages are
also untouched by this branch.
