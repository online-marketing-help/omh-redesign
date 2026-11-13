# Overview

The **OMH Complete Customer Engagement Package**, built for Online Marketing
Help (OMH), a UK digital marketing and web development agency in Hockley,
Essex. Rafiul builds it; OMH is the client; it is intended to be sold to
other brands later, which is why the tenancy field exists even though there
is one tenant today.

Two halves that share one database:

1. **The assistant** people meet. A chat and voice widget on
   onlinemarketinghelp.co.uk, answering only from OMH's own knowledge base,
   able to book a free 30 minute consultation and hand over to a person.
2. **The engine and the dashboard** nobody outside OMH sees. Every enquiry is
   put on one of six routes (A to F) that decide what is sent, on which
   channel, and when; the dashboard is where OMH reads what happened and
   decides what it was worth.

## What "finished" means for the current phase

Everything that needs no external credential is built, tested and live. Meta,
Twilio, WhatsApp and inbound email are a later phase and are blocked on
access, not on work.

## The rule the whole design rests on

**Replying to somebody's own enquiry is not marketing. Starting a
conversation they did not ask for is.** That single line is why routes B to E
may text, email and call within minutes with no recorded consent, and why
route F, reactivation, is the only route marked `marketing: true` and the
only one that demands consent evidence per person.

It is enforced structurally rather than by configuration: a `call` step
exists only in routes B and E, the two where the person contacted us first.
C, D and F have none at all, so an automated marketing call is not reachable
by a mis-typed setting. A test asserts it.
