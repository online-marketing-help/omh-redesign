# Plan - count a reply that came by email

## Tasks

- [ ] **E1** - The gate that decides what an inbound email is
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
  - Test first, and the assertions that matter are the refusals: an
    out-of-office must not count as a reply, a bounce must not count, a
    newsletter must not count, and a real reply that happens to mention
    "out of office" in its body must still count.

- [ ] **E2** - Record the Message-ID when we send
  - Nothing stores it today, so identification by threading cannot work for
    anything already sent. `touches` gains an optional `messageId`, the
    worker's email step records what the server assigned, and a lookup by
    message id is added beside the existing idempotency lookup.
  - Honest consequence to write down: replies to mail sent BEFORE this
    ships can only be matched by the plus token, and only if the host
    routes it.

- [ ] **E3** - Set a Reply-To that carries the touch
  - The second identifier. `replies+t<touchId>@<domain>` on every outbound
    sequence email.
  - **Verify the mailbox actually routes it before relying on it.** Send
    one to a plus address and see whether it arrives. If it does not, the
    feature still works through threading and this line is dead weight
    rather than a silent hole.

- [ ] **E4** - `12-email-inbound`, the workflow that reads the mailbox
  - IMAP trigger on the existing mailbox, the gate inlined, then: record an
    inbound `touch` on the matched lead, and stop their sequence with
    `replied`, which is what already happens for a text.
  - An unmatched message is left alone and counted, not guessed at. A
    reconciliation figure the dashboard can show beats a wrong attribution.
  - Driven through `new Function` before any push, per the standing rule.

- [ ] **E5** - Make the Channels report stop lying
  - `replied` becomes "replied on any channel". The column that currently
    means texts gets its name corrected, and the README gap is closed.
  - Test first: a lead who replied only by email counts as replied.

## Order

E1 before everything, because the refusals are the risk. E2 and E3 are the
two identifiers and can go together. E4 wires them up. E5 is the figure that
all of it exists for.

## Out of scope

Reading the inbox for anything other than sequence replies. Threading a
conversation. Sending from a different address than today.
