# Research - counting a reply that came by email

`app/lead-dashboard/README.md` has carried this gap since the Channels
report was built: it counts emails sent and texts replied to, so "replied"
means "replied by text". Every reply rate per channel is therefore wrong in
the same direction, and wrong in a way that flatters text and penalises
email.

It also said "needs a provider decision first: Postmark inbound parse or
Resend's `email.received`". That decision turns out not to be needed.

## What already sends email, and from where

Two different senders, and this matters:

| Where | How | From |
|---|---|---|
| The website's enquiry form | `nodemailer` over SMTP, `app/api/enquiry/route.ts` | Hostinger, `smtp.hostinger.com`, a real mailbox on OMH's own domain |
| The sequence engine's email steps | n8n `emailSend`, credential `I7yvfVmEpZslNAxV` | the same SMTP account |

So OMH already owns a mailbox on their own domain, reachable over IMAP,
which n8n has a trigger node for. Adding Postmark or Resend would mean a new
account, a new bill, DNS changes, and a webhook endpoint to secure, to read
mail that is already arriving somewhere we can already read.

**Decision: no new provider.** Read the mailbox OMH already has.

## Which reply belongs to which message

The README proposed `reply+{touchId}@inbound.<domain>`, arguing a reply
address "is the only identifier a mail client cannot strip, which is why it
beats subject matching or threading headers".

Half right, and the half that is wrong matters. A mail client cannot strip a
Reply-To, true. But **plus addressing is a mailbox-provider feature, not a
mail standard**, and whether `sales+token@` reaches `sales@` depends on the
host. Building the only identification path on a feature that may silently
not work is the same mistake as trusting a browser's file type.

Two identifiers, not one:

1. **`In-Reply-To` and `References` against the `Message-ID` we sent.** Part
   of RFC 5322, set by every real mail client, and it works on any mailbox
   with no configuration at all. Its weakness is a client that starts a new
   message instead of replying.
2. **A plus-addressed `Reply-To`.** Survives a client that does not thread.
   Its weakness is a mailbox host that does not route plus addresses.

Their weaknesses do not overlap, which is the only reason to carry both.

## What has to be recorded for either to work

Nothing stores a `Message-ID` today. The outbound email step sends and
records a `touch`; the id the mail server assigned is thrown away. Without
it, identifier 1 cannot work retrospectively - only for mail sent after this
ships. That is worth saying plainly rather than discovering later.

## The counting rule, which is the point of all this

`replied` on a sequence currently means an inbound text. Once email replies
are recorded as inbound touches on the same timeline, the existing reply
detection works unchanged, because it already asks "was there an inbound
touch after enrolment" rather than "was there an SMS".

The one trap: **an auto-reply is not a reply.** Out-of-office, delivery
receipts and "we have received your enquiry" all arrive as inbound mail and
would each mark a lead as having replied, stop their sequence, and inflate
every reply rate on the Channels report. Anything that cannot tell those
apart makes the figures worse than leaving them wrong in the current
direction.
