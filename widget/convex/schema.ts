import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

/* =========================================================================
   OHM Site Assistant — data model.

   One deployment per project. This is cool-ferret-103 and it holds nothing
   but this widget's data. It is not shared with HP4P, LeadEngine, Ads-System
   or any other instance.
   ========================================================================= */

/* Acquisition detail, carried on a session and copied to the lead as first
   touch. Everything here is optional because almost every visitor arrives with
   some of it missing, and a half-known source still beats "unknown". */
const attribution = v.object({
  source: v.optional(v.string()),       // utm_source
  medium: v.optional(v.string()),       // utm_medium
  campaign: v.optional(v.string()),     // utm_campaign, the readable name
  campaignId: v.optional(v.string()),
  adGroup: v.optional(v.string()),      // Meta adgroup_id, or a Google ad group
  adId: v.optional(v.string()),
  formId: v.optional(v.string()),       // Meta lead form
  keyword: v.optional(v.string()),      // utm_term
  /* The two that actually prove which advert it was. A utm_* can be typed by
     anyone; these are minted by the ad platform. */
  gclid: v.optional(v.string()),
  fbclid: v.optional(v.string()),
  landingPage: v.optional(v.string()),
  referrer: v.optional(v.string()),
  firstTouchAt: v.optional(v.number()),
});

export default defineSchema({
  /* The answer bank. Everything the assistant is allowed to state as fact
     lives here, built from the live site by kb/build.py. If it is not in this
     table the assistant must escalate rather than invent. */
  kb: defineTable({
    /* Which assistant these rows belong to: "omh" for the live site, or a demo
       such as "demo-real-estate". Optional so the rows that existed before this
       was added keep working; everything written since carries it. */
    tenant: v.optional(v.string()),
    key: v.string(),            // stable id from the builder, used for upserts
    kind: v.string(),           // service | solution | pricing | faq | case_study | company
    title: v.string(),
    service: v.string(),
    url: v.string(),
    text: v.string(),
    updatedAt: v.number(),
  })
    .index("by_key", ["key"])
    .index("by_kind", ["kind"])
    .index("by_tenant", ["tenant"])
    .searchIndex("search_text", {
      searchField: "text",
      filterFields: ["kind", "service", "tenant"],
    }),

  /* Structured packages, kept separate from the prose so a price question is
     answered from a number rather than from a paraphrase. */
  packages: defineTable({
    tenant: v.optional(v.string()),
    group: v.string(),
    /* The words customers actually use. Their group is called "PPC Advertising
       Packages", so "how much is Google Ads" matched nothing at all until these
       were added. */
    aliases: v.optional(v.array(v.string())),
    name: v.string(),
    priceGbpMonthly: v.number(),
    contractMonths: v.optional(v.string()),
    included: v.array(v.string()),
    notIncluded: v.array(v.string()),
    details: v.array(v.string()),
    url: v.string(),
    updatedAt: v.number(),
  })
    .index("by_group", ["group"])
    .index("by_tenant", ["tenant"])
    .searchIndex("search_name", { searchField: "name", filterFields: ["group"] }),

  /* One row per visitor conversation, chat or voice. */
  sessions: defineTable({
    tenant: v.optional(v.string()),
    sessionId: v.string(),
    channel: v.string(),        // chat | voice
    startedAt: v.number(),
    lastSeenAt: v.number(),
    pageUrl: v.optional(v.string()),
    retellCallId: v.optional(v.string()),
    /* Handover, as described in handover.ts: absent while the assistant is
       answering, then "waiting" | "live" | "closed". Optional so every session
       recorded before handover existed stays valid. */
    handover: v.optional(v.string()),
    handoverAt: v.optional(v.number()),
    handoverBy: v.optional(v.string()),
    /* Who this conversation belongs to. A session is one visit; a visitor is
       the person across visits, identified by an id the widget keeps in
       localStorage. See visitors.ts. Optional: every session recorded before
       this existed simply has no visitor. */
    visitorId: v.optional(v.string()),

    /* Where this visit came FROM, as opposed to `channel` above, which is how
       they are talking to us. See the note on `leads.sourceChannel`. */
    sourceChannel: v.optional(v.string()),
    attribution: v.optional(attribution),
  })
    .index("by_session", ["sessionId"])
    .index("by_channel", ["channel"])
    .index("by_visitor", ["visitorId"])
    /* handover.inbox used to collect every session and filter in code. */
    .index("by_handover", ["handover"]),

  messages: defineTable({
    sessionId: v.string(),
    role: v.string(),           // user | assistant | human | system
    channel: v.string(),
    text: v.string(),
    at: v.number(),
  })
    .index("by_session", ["sessionId"])
    .index("by_session_at", ["sessionId", "at"]),

  /* What we have learned about this visitor, carried between chat and voice
     so a caller never repeats themselves. */
  profiles: defineTable({
    sessionId: v.string(),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    company: v.optional(v.string()),
    website: v.optional(v.string()),
    interestedIn: v.optional(v.array(v.string())),
    budget: v.optional(v.string()),
    notes: v.optional(v.string()),
    updatedAt: v.number(),
  }).index("by_session", ["sessionId"]),

  leads: defineTable({
    tenant: v.optional(v.string()),
    sessionId: v.string(),
    name: v.string(),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    company: v.optional(v.string()),
    website: v.optional(v.string()),
    service: v.optional(v.string()),
    budget: v.optional(v.string()),
    message: v.optional(v.string()),
    hot: v.boolean(),
    channel: v.string(),
    at: v.number(),
    status: v.string(),         // new | contacted | closed
    notified: v.optional(v.boolean()),

    /* One row per person, not per visit.

       Someone who chats today and comes back next week used to become a
       second lead, because every capture inserted a row. These fields are
       what let the second visit find the first.

       `visitorIds` holds every browser this person has been recognised in, so
       a laptop and a phone collapse into one person once they give the same
       number. `phoneKey` and `emailKey` are the normalised forms actually
       matched on: a number typed as "07700 900123" and "+447700900123" is the
       same number and has to compare equal. */
    visitorIds: v.optional(v.array(v.string())),
    phoneKey: v.optional(v.string()),
    emailKey: v.optional(v.string()),
    /* When they first appeared, where `at` is the most recent time. */
    firstAt: v.optional(v.number()),
    /* How many separate conversations this person has had. */
    visits: v.optional(v.number()),

    /* ---- Where this person came from ----------------------------------

       `channel` above is TRANSPORT: how they are talking to us right now,
       "chat" or "voice". It is used that way in five tables and is not
       changed.

       `sourceChannel` is ACQUISITION: which channel or advert produced them.
       It is the field the dashboard groups and filters by, so it is flat and
       indexed rather than nested. One of:

         website_chat | website_voice | website_form |
         google_ads | facebook_ads | instagram_ads |
         facebook | instagram | whatsapp |
         phone_inbound | phone_missed |
         reactivation | organic | direct | referral | unknown

       An advert and a message are two channels; a message from an advert and
       a message from the page are not. See visitors.ts for why.

       Conflating the two is how this gets confusing later, so they are two
       fields with two meanings and this comment is the reason why. */
    sourceChannel: v.optional(v.string()),

    /* FIRST touch, never overwritten once set: the advert that produced this
       person, not the last page they happened to land on. */
    attribution: v.optional(attribution),

    /* ---- Marketing permission -----------------------------------------

       Denormalised for the one question every send asks: may we contact this
       person on this channel? The evidence lives in `consentEvents`, which is
       append-only; these are a cache of it and are safe to recompute.

       Absent means "we have never asked", which is NOT consent. Only
       `checkSendable` in routing.ts is allowed to interpret these. */
    smsConsent: v.optional(v.string()),        // explicit | soft_optin | none
    emailConsent: v.optional(v.string()),      // explicit | soft_optin | none
    /* PECR regulation 19. Consent for live calls does not cover automated
       ones, and general marketing consent does not either, so this is its own
       field and defaults to absent. */
    automatedCallConsent: v.optional(v.boolean()),
    tpsCheckedAt: v.optional(v.number()),
    tpsListed: v.optional(v.boolean()),

    /* ---- What came of it -----------------------------------------------

       `status` above is about the PIPELINE: new, contacted, closed. It does
       not say whether "closed" means signed or walked away, which makes the
       second question every owner asks, "which channel actually produces
       business", unanswerable.

       This is set by a person on the dashboard, never by the assistant. The
       assistant knows what was said; it does not know what was signed. */
    outcome: v.optional(v.string()), // open | quoted | won | lost | unqualified
    /* Only meaningful on `won`, and optional even then: plenty of businesses
       will not want to type a number, and a channel report that ranks by
       count is still worth having. */
    valueGbp: v.optional(v.number()),
    lostReason: v.optional(v.string()),
    outcomeAt: v.optional(v.number()),
    outcomeBy: v.optional(v.string()),
  })
    .index("by_at", ["at"])
    .index("by_status", ["status"])
    .index("by_session", ["sessionId"])
    .index("by_phone_key", ["phoneKey"])
    .index("by_email_key", ["emailKey"])
    .index("by_source_channel", ["sourceChannel"])
    .index("by_outcome", ["outcome"]),

  /* Bookings are recorded here first. The Google Calendar write is a second
     step in n8n once Rafiul supplies the calendar credentials, so a booking is
     never lost because the calendar leg failed. */
  bookings: defineTable({
    tenant: v.optional(v.string()),
    reference: v.string(),
    sessionId: v.string(),
    name: v.string(),
    email: v.optional(v.string()),
    phone: v.string(),
    service: v.string(),
    preferredDate: v.string(),  // YYYY-MM-DD
    preferredTime: v.string(),  // HH:mm, Europe/London
    notes: v.optional(v.string()),
    channel: v.string(),
    status: v.string(),         // requested | confirmed | cancelled | moved
    calendarEventId: v.optional(v.string()),
    calendarSyncedAt: v.optional(v.number()),
    at: v.number(),
    /* `notified` means the TEAM was emailed. It is not the same question as
       whether the CUSTOMER was texted, and using one flag for both would mean
       a booking the team has seen never gets confirmed to the person who made
       it. */
    notified: v.optional(v.boolean()),
    confirmationSentAt: v.optional(v.number()),
  })
    .index("by_reference", ["reference"])
    .index("by_session", ["sessionId"])
    .index("by_status", ["status"])
    .index("by_date", ["preferredDate"]),

  /* Request counters. The chat webhook is a public URL that spends money on an
     LLM for every message, so it needs a ceiling per visitor, per address and
     across the whole deployment. Without this, one script drains the account. */
  limits: defineTable({
    key: v.string(),        // "s:<sessionId>" | "ip:<addr>" | "global"
    windowStart: v.number(),
    count: v.number(),
  }).index("by_key", ["key"]),

  /* Anything the assistant could not answer or was asked not to handle.
     The team sees these; the visitor is told a person will pick it up. */
  escalations: defineTable({
    tenant: v.optional(v.string()),
    sessionId: v.string(),
    reason: v.string(),
    question: v.string(),
    contact: v.optional(v.string()),
    channel: v.string(),
    at: v.number(),
    handled: v.boolean(),
    notified: v.optional(v.boolean()),
  })
    .index("by_at", ["at"])
    .index("by_handled", ["handled"]),

  /* =======================================================================
     Lead routing. The six routes A to F live in routes.ts as code, not as
     rows: they are logic and belong in git with a diff, not in a record
     somebody can edit at two in the morning.
     ======================================================================= */

  /* One row per person per route they are being worked on.

     The clock lives here rather than in n8n. An n8n Wait node that spans four
     days lives in that execution's own state, and a restart or a re-deploy
     loses it silently; a due date in a table survives both. An n8n cron reads
     `by_due` every minute and drains what is ready. */
  sequences: defineTable({
    leadId: v.id("leads"),
    sessionId: v.optional(v.string()),
    route: v.string(),                  // "A" .. "F", see routes.ts
    step: v.number(),                   // index into that route's steps
    status: v.string(),                 // active | stopped | completed | paused | failed
    /* Why it ended. The routing paper asks for this to be reported on, since
       "replied" and "exhausted" are the two numbers that say whether a
       sequence is working. */
    stopReason: v.optional(v.string()), // replied | booked | opted_out | exhausted |
                                        // manual | no_consent | suppressed | kill_switch
    nextDueAt: v.optional(v.number()),
    lastStepAt: v.optional(v.number()),

    /* The lease. Two worker runs can overlap: the cron fires every minute and
       a run that is sending to twenty-five people can take longer than that.
       Without a lease both runs would read the same due row and send the same
       text twice, which is the single worst bug this system could have.

       `claimDue` stamps a token and a short expiry; `completeStep` refuses a
       token that does not match. A worker that dies mid-send therefore blocks
       the row only until the lease expires, not for ever. */
    leaseToken: v.optional(v.string()),
    leaseUntil: v.optional(v.number()),

    /* Which deliberate run this sequence belongs to, where there was one.

       Absent for every ordinary enquiry: somebody who filled the form on
       Tuesday is not part of a campaign, they are just a lead. Present only
       when a batch was started on purpose, which in practice means
       reactivation. Without this field "we texted two hundred old customers,
       what happened" has no answer at all, because a run is otherwise just a
       set of unrelated sequence rows that happen to share an afternoon. */
    campaignId: v.optional(v.id("campaigns")),

    attempts: v.number(),
    at: v.number(),
  })
    /* The worker's only query: active rows whose time has come. */
    .index("by_due", ["status", "nextDueAt"])
    .index("by_lead", ["leadId"])
    .index("by_route", ["route"])
    /* The campaign report's only query. */
    .index("by_campaign", ["campaignId"]),

  /* Every outbound and inbound event, append-only.

     This one table is two things at once, deliberately: the per-lead timeline
     the dashboard shows, and the audit trail a complaint needs. Keeping them
     as one table means the record shown to the team is the same record shown
     to a regulator, so they cannot disagree. */
  touches: defineTable({
    leadId: v.optional(v.id("leads")),
    sessionId: v.optional(v.string()),
    direction: v.string(),              // out | in
    channel: v.string(),                // sms | email | call | messenger |
                                        // instagram | chat | voice
    route: v.optional(v.string()),
    step: v.optional(v.number()),
    status: v.string(),                 // queued | sent | delivered | failed |
                                        // received | no_answer | answered
    providerId: v.optional(v.string()), // Twilio SID | Retell call id | Meta mid
    body: v.optional(v.string()),
    error: v.optional(v.string()),
    /* `sequenceId:step`. A webhook that is retried, or a worker run that is
       re-run by hand, must not produce a second send or a second row. */
    idempotencyKey: v.optional(v.string()),
    at: v.number(),
  })
    .index("by_lead_at", ["leadId", "at"])
    .index("by_provider", ["providerId"])
    .index("by_idem", ["idempotencyKey"])
    .index("by_channel_at", ["channel", "at"]),

  /* The evidence that we were allowed to make contact. Append-only: rows are
     never updated and never deleted, because a consent record that can be
     edited is not evidence of anything.

     The flags on `leads` are a cache of this. If they ever disagree, this
     table is right. */
  consentEvents: defineTable({
    leadId: v.optional(v.id("leads")),
    phoneKey: v.optional(v.string()),
    emailKey: v.optional(v.string()),
    kind: v.string(),      // sms_marketing | email_marketing | automated_call | live_call
    action: v.string(),    // granted | withdrawn | soft_optin_recorded | tps_checked
    basis: v.optional(v.string()),    // explicit | soft_optin | enquiry_response
    /* In words: where it came from and what was shown to them at the time.
       "Ticked the box on the quote form, 5 Nov 2026" is evidence. "Yes" is not. */
    evidence: v.optional(v.string()),
    source: v.optional(v.string()),
    at: v.number(),
    by: v.optional(v.string()),
  })
    .index("by_lead", ["leadId"])
    .index("by_phone", ["phoneKey"])
    .index("by_email", ["emailKey"]),

  /* Do not contact. Checked before every single send.

     A separate table rather than a flag on the lead, for two reasons: it
     outlives the lead row, so deleting somebody does not forget that they
     asked us to stop, and it is one index read rather than a lookup through
     whichever record happens to hold them. */
  suppressions: defineTable({
    key: v.string(),       // a phoneKey or an emailKey, normalised by visitors.ts
    kind: v.string(),      // phone | email
    reason: v.string(),    // stop_reply | manual | tps | bounce | complaint
    note: v.optional(v.string()),
    at: v.number(),
  }).index("by_key", ["key"]),

  /* Operational switches, read on every send.

     The row that matters is `outbound`: one value that stops every automated
     message at once. It exists because the first thing wanted when something
     goes wrong at scale is an off switch, and hunting for one while texts are
     going out is not the moment to discover there is none. */
  settings: defineTable({
    key: v.string(),       // "outbound" | "quietHours" | "routes"
    value: v.any(),
    updatedAt: v.number(),
    updatedBy: v.optional(v.string()),
  }).index("by_key", ["key"]),

  /* A deliberate run: a batch of people contacted on purpose, at one time,
     for one reason.

     Its own table rather than a string on the sequence, for two reasons. The
     first is that a campaign has facts of its own that no sequence row holds:
     who it went to, on what consent basis, and who pressed the button. The
     second is that those facts have to survive the run. A reactivation batch
     is marketing under PECR, so the question "what were we relying on when we
     texted these four hundred people" may be asked months later, by somebody
     who is not us, and the answer cannot be reconstructed from four hundred
     sequence rows. */
  campaigns: defineTable({
    name: v.string(),
    /* What kind of run. `reactivation` is the one the package sells; the
       others exist so a one-off announcement or a test batch is not forced to
       pretend it is a reactivation. */
    kind: v.string(),                   // reactivation | announcement | test | other
    /* Which route the batch was enrolled on. Always F in practice, and
       recorded rather than assumed, because F is the only route marked
       `marketing: true` and a report that silently mixed in a route B batch
       would be comparing two different legal situations. */
    route: v.string(),
    /* Who it went to, in words. "Boiler service customers, last serviced
       between Jan 2024 and Jun 2025". Free text deliberately: the selection
       was made outside this system and a dropdown would quietly lose the
       part that matters. */
    audience: v.optional(v.string()),
    /* The consent basis claimed for the batch as a whole. Per-person evidence
       still lives in `consentEvents`; this is the claim being made about the
       list, which is what gets challenged first. */
    consentBasis: v.optional(v.string()), // soft_optin | explicit | mixed
    note: v.optional(v.string()),
    status: v.string(),                 // draft | running | finished | stopped
    /* How many people the batch was meant to reach, set when it is created.
       Kept beside the number actually enrolled, because the gap between them
       is the suppression and consent rate, and that gap is the single most
       useful figure a campaign produces. */
    intended: v.optional(v.number()),
    startedAt: v.optional(v.number()),
    finishedAt: v.optional(v.number()),
    at: v.number(),
    by: v.optional(v.string()),
  })
    .index("by_at", ["at"])
    .index("by_status", ["status"]),
});

