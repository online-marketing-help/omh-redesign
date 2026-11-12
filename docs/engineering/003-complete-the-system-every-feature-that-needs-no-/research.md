# Research - what is actually left

Written 2026-11-12, after 001 closed 10/10 and its review was answered.

The question is narrow: **what can still be finished without an external
credential?** Everything else is waiting on access, and building against an
account that does not exist yet is how you get code nobody can test.

## Method

Not from the plan documents, which describe what was intended. From the code
and the live deployment: what exists, what calls it, and what answers.

## What the system can do today

Live and verified: the chat assistant (answers from the knowledge base with
real prices, 20/20 in `verify.mjs`), lead capture and dedupe, the six routes
as data, the sequence engine with its lease, consent and suppression, the
kill switch, nine dashboard screens, campaign reporting, channel allocation,
spend, attachments stored and shown.

## The five gaps that need no credential

### G1 - A campaign cannot be created
`convex/campaigns.ts` has `create`, `enrolBatch`, `stop`, `list`, `report`,
and six HTTP routes. `11-reactivation` exists and is inactive. **Nothing
creates a campaign.** The only path is POSTing a list to
`/webhook/ohm-reactivation`, which no person can do, so the Campaigns screen
correctly shows nothing and will show nothing for ever.

The consent gate already decides who is contactable: `consentBasis` must be
`soft_optin` or `explicit`, `consentEvidence` at least 12 characters,
duplicates within the import refused, and the refusals are returned rather
than dropped, because the gap between the list handed in and the people
contacted IS the consent rate.

What is missing is the face: somewhere to paste a list, see who is accepted
and who is refused **and why, before anything sends**, and then start it.

### G2 - An outcome can only be set in two places out of three
`leads.outcome` is set from the Leads table and in bulk. The conversation
page can read it. `app/lead-dashboard/README.md` has said "Still missing: the
same control on the lead detail page" since the field was added. That is the
page somebody is standing on when they have just read the transcript, which
is the moment they actually know the answer.

### G3 - A photo is stored and never read
`01-chat.json` contains the string "attachment" zero times. A visitor sends a
photo, it is judged, stored, shown on the dashboard, and the assistant
answers as if nothing arrived. The PDF sells "Images and voice notes, on
every channel".

The credential exists: OpenRouter, `Sj2vuK21qAcp0hJj` on srv1836598, already
running `anthropic/claude-haiku-5.5`. That model takes images. So this is
work, not access.

### G4 - A voice note is stored and never heard
Same shape as G3 and a harder question: it needs transcription, and the
answer is a provider decision rather than a line of code. Deepgram is in the
secret store. Whether to spend on it is Rafiul's call, so this is **split
out** and not assumed.

### G5 - Route G exists and nothing starts it
Route G is in `gates/routes.ts`, marketing false, SMS then email, and it was
added for the no-show chase. `grep` finds no caller anywhere: no booking is
ever enrolled onto it. There is also no reminder-before route at all, though
the PDF sells "Reminder before, and a chase after a no-show".

Half of this is blocked: the first step is SMS and there is no Twilio. The
other half is not: the SMTP credential exists on srv1836598 and email steps
already send.

## What is credential-blocked, and stays out

Twilio (SMS, the UK number, outbound calling), Meta (lead ads, DMs, the
page-vs-ad split), WhatsApp Cloud API, inbound email, and Retell, which has
no credit, which is why `verify.mjs` reports two voice failures.

## The constraint this phase inherits

The review on 001 found two live holes, both in the thin layer that decides
**who may call** a well-tested function. Every feature below that accepts
input from outside gets its authorisation asserted, not described.
