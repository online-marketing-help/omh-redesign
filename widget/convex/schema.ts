import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

/* =========================================================================
   OHM Site Assistant — data model.

   One deployment per project. This is cool-ferret-103 and it holds nothing
   but this widget's data. It is not shared with HP4P, LeadEngine, Ads-System
   or any other instance.
   ========================================================================= */

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
  })
    .index("by_session", ["sessionId"])
    .index("by_channel", ["channel"])
    .index("by_visitor", ["visitorId"]),

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
  })
    .index("by_at", ["at"])
    .index("by_status", ["status"])
    .index("by_session", ["sessionId"])
    .index("by_phone_key", ["phoneKey"])
    .index("by_email_key", ["emailKey"]),

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
    notified: v.optional(v.boolean()),
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
});
