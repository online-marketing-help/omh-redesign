# Glossary

**Route A to F** - what happens to a lead and when, by how they arrived.
A: website chat or voice, finish it in the conversation, never start a
sequence. B: website form or Google Ads landing page, SMS and email within 2
minutes, call at 15. C: Meta lead-ad form, qualify by message, never an
automated call to a cold form fill. D: Messenger or Instagram DM, answer
in-thread inside Meta's 24 hour window. E: missed or abandoned call, SMS
within 60 seconds, call back at 5 minutes. F: reactivation - **this is
marketing**, and the only route that demands consent.

**channel vs sourceChannel** - `channel` is transport (`chat`, `voice`).
`sourceChannel` is acquisition (`google_ads`, `facebook_dm`, `website_form`
...). They are different fields and both are used.

**touch** - one inbound or outbound event, append-only. The dashboard
timeline and the audit trail are the same rows, so what the team reads is
what a regulator would read.

**gate** - a file in `widget/gates/`. Plain JS, no imports, imported by the
tests and inlined into an n8n Code node. One text, asserted and executed.

**lease** - the token `claimDue` puts on a sequence row. `completeStep`
refuses a stale one, and that refusal is what makes a double send
impossible when two cron runs overlap.

**quiet hours** - nothing sends outside 08:00-20:00 London. A step falling
due outside is moved to the next opening, never skipped, because a skipped
step is a lead quietly dropped. Delays under an hour are exempt: route B's
call at 15 minutes is the whole value of route B.

**Melissa** - the assistant's name, in chat and on the phone. Retell voice
`11labs-Amy`. Never claims to be human.

**visitor id vs session id** - session id lives in `sessionStorage` and dies
with the tab; visitor id lives in `localStorage` and survives. Both are now
16 bytes of `crypto.getRandomValues`. Together they are the capability for
one person's conversation; **either one alone is not enough**, and the
history route checks they agree.

**the example** - `?demo=1`. Made-up data, banner on every screen, nothing
written. Not to be confused with the industry demo tenants.
