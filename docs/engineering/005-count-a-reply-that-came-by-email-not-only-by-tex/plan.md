# Plan - count a reply that came by email

## Tasks

- [x] **E1** - The gate that decides what an inbound email is
  - `widget/gates/email-reply.js`. Given a parsed inbound message, answer
    two questions: **which outbound touch is this a reply to**, and **is it
    a reply at all**.
  - Identification, in order: `In-Reply-To`, then any id in `References`,
    then a plus token on any recipient header. First match wins; all three
    are checked because their failure modes do not overlap.
  - **Refusing an auto-reply is the harder half and the one that protects
    the figures.** `Auto-Submitted: auto-replied` (RFC 3834),
    `X-Autoreply`, `X-Autorespond`, `Precedence: auto_reply|bulk|junk`,
    a `List-Id` or `List-Unsubscribe` (it is a newsletter, not a person), a
    null return path, and a delivery status content type. A subject
    beginning "Out of office" or "Automatic reply" is checked LAST and only
    as a hint, because a person can legitimately write that.
  - **Done.** `gates/email-reply.js`, 41 assertions. Most of it is
    refusals, because they are what protect the figures: an out-of-office,
    a bounce, a newsletter and a no-reply sender are all refused, while a
    person who writes "I am out of office until Monday but yes, let us
    book it" still counts.

- [x] **E2** - Record the Message-ID when we send
  - Nothing stores it today, so identification by threading cannot work for
    anything already sent. `touches` gains an optional `messageId`, the
    worker's email step records what the server assigned, and a lookup by
    message id is added beside the existing idempotency lookup.
  - **Done, and it needed no schema change.** `touches.providerId` already
    holds "a Twilio SID, a Retell call id, a Meta mid" behind a
    `by_provider` index, and a Message-ID is the same thing: the id the
    provider assigned. Adding a field would have been a second name for
    one idea.
  - Standing consequence: replies to mail sent BEFORE this ships can only
    be matched by the plus token, and only if the host routes it.

- [x] **E3** - Set a Reply-To that carries the touch
  - The second identifier. `replies+t<touchId>@<domain>` on every outbound
    sequence email.
  - **Done.** `replies+t<sequenceId>-<step>@onlinemarketinghelp.co.uk`,
    built from the idempotency key the worker already carries. The first
    attempt used a `touchId` that does not exist at that moment, because
    the touch is recorded after the send, not before.
  - **Still to verify:** whether the mailbox routes a plus address. Until
    somebody sends one, this is the second identifier and threading is the
    first; if it turns out not to route, nothing breaks and this line is
    dead weight rather than a silent hole.

- [x] **E4** - `12-email-inbound`, the workflow that reads the mailbox
  - IMAP trigger on the existing mailbox, the gate inlined, then: record an
    inbound `touch` on the matched lead, and stop their sequence with
    `replied`, which is what already happens for a text.
  - An unmatched message is left alone and counted, not guessed at. A
    reconciliation figure the dashboard can show beats a wrong attribution.
  - **Built, and deliberately not pushed.** `12-email-inbound`: an IMAP
    trigger, the gate inlined, then Convex decides and stops the sequence.
    All six Code nodes driven through `new Function` first, per the rule.
  - **It cannot be activated yet.** There is no IMAP credential on
    srv1836598 and the mailbox password lives on the production server, so
    the workflow exists and reads nothing. That is access, not work.

- [x] **E5** - Make the Channels report stop lying
  - `replied` becomes "replied on any channel". The column that currently
    means texts gets its name corrected, and the README gap is closed.
  - **Done.** `channelFacts` gained `emailIn`, and the Channels report
    shows an email reply rate beside the text one rather than folding them
    together: a text is read in minutes and an email when somebody sits
    down, so an average of the two means nothing.
  - It reads "none sent" with no emails, and an em dash with
    "nothing reads the mailbox yet" when emails went out and no reply has
    been counted. Never 0%, which would be a measurement rather than an
    absence.
  - **And a bug this found twice.** `repliedSince` and `firstIn` both
    asked "is there an inbound touch", which would have counted an
    out-of-office as a reply, stopped the follow-up, and put the lead in
    "They replied". Both now use one shared rule, `countsAsReply`, which
    the mail reader uses as well.

## Order

E1 before everything, because the refusals are the risk. E2 and E3 are the
two identifiers and can go together. E4 wires them up. E5 is the figure that
all of it exists for.

## Out of scope

Reading the inbox for anything other than sequence replies. Threading a
conversation. Sending from a different address than today.
