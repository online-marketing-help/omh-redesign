import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/* =========================================================================
   Handover: the point where the assistant stops and a person takes over.

   Until now an escalation was a dead end. The assistant told the visitor
   "the team will come back to you", wrote a row, and the visitor closed the
   tab. Nobody could answer them while they were still there.

   A conversation is in exactly one of four states, held on the session row:

     (none)    the assistant is answering, as before
     waiting   the assistant has stepped back and nobody has picked it up
     live      a person is answering in the dashboard
     closed    the person is done and the assistant has it again

   The visitor's messages are stored the same way in every state, so the
   transcript stays one thread. A person's reply is a message with role
   "human", which is what lets the widget label it and the dashboard colour
   it differently from the assistant's own words.
   ========================================================================= */

const now = () => Date.now();

/** Roles the visitor's widget is allowed to receive. Never "user": the widget
    already has its own messages, and echoing them back duplicates the thread. */
const TO_VISITOR = new Set(["assistant", "human", "system"]);

async function sessionRow(ctx: any, sessionId: string) {
  return await ctx.db
    .query("sessions")
    .withIndex("by_session", (i: any) => i.eq("sessionId", sessionId))
    .first();
}

/** Writes handover state, creating the session row if the conversation began
    before the session was ever recorded (a voice escalation can arrive with no
    chat session behind it). */
async function setState(
  ctx: any,
  sessionId: string,
  patch: { handover: string; handoverBy?: string },
  channel = "chat",
) {
  const s = await sessionRow(ctx, sessionId);
  const fields = { ...patch, handoverAt: now(), lastSeenAt: now() };
  if (s) {
    await ctx.db.patch(s._id, fields);
  } else {
    await ctx.db.insert("sessions", {
      sessionId,
      channel,
      startedAt: now(),
      ...fields,
    });
  }
}

async function say(ctx: any, sessionId: string, role: string, text: string, channel = "chat") {
  await ctx.db.insert("messages", { sessionId, role, channel, text, at: now() });
}

/* ------------------------------------------------------------- the visitor */

/**
 * What the widget polls. Deliberately the only unauthenticated route in this
 * deployment, so it is narrow on purpose:
 *
 *  - it takes one session id and returns only that session's messages;
 *  - it never returns the visitor's own messages, so it cannot be used to
 *    read back anything the caller did not already have;
 *  - the session id is a random id the widget generated and keeps in its own
 *    sessionStorage, which makes it the visitor's own capability for their own
 *    conversation, the same way a chat link is;
 *  - `since` means the widget asks for a few new rows, not a transcript.
 */
export const poll = query({
  args: { sessionId: v.string(), since: v.optional(v.number()) },
  handler: async (ctx, { sessionId, since }) => {
    const s = await sessionRow(ctx, sessionId);
    const state = s?.handover ?? "none";

    const rows = await ctx.db
      .query("messages")
      .withIndex("by_session_at", (i) =>
        since ? i.eq("sessionId", sessionId).gt("at", since) : i.eq("sessionId", sessionId),
      )
      .order("asc")
      .take(20);

    return {
      handover: state,
      /* A person is with them, or on the way: the widget says so rather than
         leaving them typing at an assistant that has stopped answering. */
      withPerson: state === "waiting" || state === "live",
      messages: rows
        .filter((m) => TO_VISITOR.has(m.role))
        .map((m) => ({ role: m.role, text: m.text, at: m.at })),
    };
  },
});

/** The visitor's own message while a person is handling the conversation. The
    assistant must not answer it, so this is how it reaches the thread. */
export const visitorSay = mutation({
  args: { sessionId: v.string(), text: v.string(), pageUrl: v.optional(v.string()) },
  handler: async (ctx, { sessionId, text, pageUrl }) => {
    const clean = text.trim().slice(0, 2000);
    if (!clean) return { ok: false, error: "empty" };

    const s = await sessionRow(ctx, sessionId);
    /* Only accepted while a person has the conversation. Outside handover the
       normal chat path owns the message, and taking it here as well would
       write it to the transcript twice. */
    if (!s || (s.handover !== "waiting" && s.handover !== "live")) {
      return { ok: false, error: "not in handover" };
    }
    await say(ctx, sessionId, "user", clean, s.channel ?? "chat");
    await ctx.db.patch(s._id, { lastSeenAt: now(), ...(pageUrl ? { pageUrl } : {}) });
    return { ok: true };
  },
});

/* ------------------------------------------------------------- the assistant */

/**
 * Called by the assistant's escalate tool. Puts the conversation in the queue
 * and leaves a line in the transcript, so the person who picks it up reads the
 * same thread the visitor is looking at.
 */
export const request = mutation({
  args: {
    sessionId: v.string(),
    reason: v.string(),
    question: v.string(),
    channel: v.optional(v.string()),
  },
  handler: async (ctx, { sessionId, reason, question, channel }) => {
    const s = await sessionRow(ctx, sessionId);
    /* Already with a person: a second unanswered question must not drag the
       conversation back from "live" to "waiting" and look unclaimed. */
    if (s?.handover === "live") return { ok: true, state: "live" };

    await setState(ctx, sessionId, { handover: "waiting" }, channel ?? "chat");
    await say(
      ctx,
      sessionId,
      "system",
      "Passed to a person: " + reason.slice(0, 300),
      channel ?? "chat",
    );
    return { ok: true, state: "waiting", question };
  },
});

/* ------------------------------------------------------------- the dashboard */

/** Everything a person needs to decide what to pick up next. */
export const inbox = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, { limit }) => {
    const take = Math.min(limit ?? 40, 100);

    /* Sessions carrying a handover state, newest activity first. There is no
       index on handover because this table is small and an index would still
       need the sort; if it ever grows, add by_handover and page it. */
    const sessions = (await ctx.db.query("sessions").collect())
      .filter((s) => s.handover === "waiting" || s.handover === "live" || s.handover === "closed")
      .sort((a, b) => (b.handoverAt ?? b.lastSeenAt) - (a.handoverAt ?? a.lastSeenAt))
      .slice(0, take);

    const open = await ctx.db
      .query("escalations")
      .withIndex("by_handled", (i) => i.eq("handled", false))
      .order("desc")
      .take(100);

    const rows = await Promise.all(
      sessions.map(async (s) => {
        const [last, profile, lead] = await Promise.all([
          ctx.db
            .query("messages")
            .withIndex("by_session_at", (i) => i.eq("sessionId", s.sessionId))
            .order("desc")
            .first(),
          ctx.db
            .query("profiles")
            .withIndex("by_session", (i) => i.eq("sessionId", s.sessionId))
            .first(),
          /* The person behind the session, not just the profile.
             Without this every row in the queue reads "Visitor": the profile
             is only filled once somebody volunteers a name mid-conversation,
             while the lead carries it as soon as they are captured. Ten
             identical rows is not a queue anybody can work. */
          ctx.db
            .query("leads")
            .withIndex("by_session", (i) => i.eq("sessionId", s.sessionId))
            .first(),
        ]);
        const mine = open.filter((e) => e.sessionId === s.sessionId);
        return {
          sessionId: s.sessionId,
          channel: s.channel,
          state: s.handover,
          since: s.handoverAt ?? s.startedAt,
          startedAt: s.startedAt,
          lastSeenAt: s.lastSeenAt,
          takenBy: s.handoverBy ?? null,
          pageUrl: s.pageUrl ?? null,
          name: profile?.name ?? lead?.name ?? null,
          email: profile?.email ?? lead?.email ?? null,
          phone: profile?.phone ?? lead?.phone ?? null,
          company: profile?.company ?? lead?.company ?? null,
          /* Which advert or page produced them. You answer a Google Ads lead
             differently from somebody who wandered in, and the person
             replying had no way of telling them apart. */
          sourceChannel: lead?.sourceChannel ?? s.sourceChannel ?? null,
          service: lead?.service ?? profile?.interestedIn?.[0] ?? null,
          hot: lead?.hot ?? false,
          leadId: lead?._id ?? null,
          /* The question that caused it, which is the one thing a person needs
             before anything else on the screen. */
          reason: mine[0]?.reason ?? null,
          question: mine[0]?.question ?? null,
          openQuestions: mine.length,
          lastRole: last?.role ?? null,
          lastText: last?.text ?? null,
          lastAt: last?.at ?? null,
          /* True when the newest message is the visitor's: they are waiting on
             a person right now, which is what should sort to the top. */
          awaitingReply: last?.role === "user",
        };
      }),
    );

    return {
      rows,
      waiting: rows.filter((r) => r.state === "waiting").length,
      live: rows.filter((r) => r.state === "live").length,
      /* Escalations with no session row at all: voice calls that escalated
         before any chat existed. Counted so the number on the page is the
         whole truth rather than only what is threadable. */
      orphanQuestions: open.filter((e) => !rows.some((r) => r.sessionId === e.sessionId)).length,
    };
  },
});

/** One conversation, in full. */
export const thread = query({
  args: { sessionId: v.string(), limit: v.optional(v.number()) },
  handler: async (ctx, { sessionId, limit }) => {
    const [s, profile, messages, escalations, leads, bookings] = await Promise.all([
      sessionRow(ctx, sessionId),
      ctx.db
        .query("profiles")
        .withIndex("by_session", (i) => i.eq("sessionId", sessionId))
        .first(),
      ctx.db
        .query("messages")
        .withIndex("by_session_at", (i) => i.eq("sessionId", sessionId))
        .order("asc")
        .take(Math.min(limit ?? 200, 400)),
      ctx.db
        .query("escalations")
        .withIndex("by_at")
        .order("desc")
        .take(100),
      /* What the conversation actually produced. Reading a transcript without
         this means scrolling it to work out whether anything came of it. */
      ctx.db
        .query("leads")
        .withIndex("by_session", (i) => i.eq("sessionId", sessionId))
        .collect(),
      ctx.db
        .query("bookings")
        .withIndex("by_session", (i) => i.eq("sessionId", sessionId))
        .collect(),
    ]);

    return {
      sessionId,
      found: Boolean(s),
      state: s?.handover ?? "none",
      channel: s?.channel ?? "chat",
      startedAt: s?.startedAt ?? null,
      lastSeenAt: s?.lastSeenAt ?? null,
      since: s?.handoverAt ?? null,
      takenBy: s?.handoverBy ?? null,
      pageUrl: s?.pageUrl ?? null,
      /* Set when the visitor also called. The dashboard uses it to pull the
         recording and the spoken transcript from the phone platform, which is
         where those live; nothing of a call is copied into this database. */
      retellCallId: s?.retellCallId ?? null,
      /* The person behind this visit, so the dashboard can show their other
         conversations rather than this one in isolation. See visitors.ts. */
      visitorId: s?.visitorId ?? null,
      profile: profile
        ? {
            name: profile.name ?? null,
            email: profile.email ?? null,
            phone: profile.phone ?? null,
            company: profile.company ?? null,
            website: profile.website ?? null,
            budget: profile.budget ?? null,
            interestedIn: profile.interestedIn ?? [],
            notes: profile.notes ?? null,
          }
        : null,
      messages: messages.map((m) => ({ role: m.role, text: m.text, at: m.at })),
      questions: escalations
        .filter((e) => e.sessionId === sessionId)
        .map((e) => ({
          id: e._id,
          reason: e.reason,
          question: e.question,
          contact: e.contact ?? null,
          at: e.at,
          handled: e.handled,
        })),
      leads: leads.map((l) => ({
        id: l._id,
        name: l.name,
        email: l.email ?? null,
        phone: l.phone ?? null,
        company: l.company ?? null,
        service: l.service ?? null,
        budget: l.budget ?? null,
        message: l.message ?? null,
        hot: l.hot,
        /* What a person decided came of this lead. Carried here so the
           conversation page can both show it and set it: that page is where
           somebody is standing when they finish reading the transcript, which
           is the moment they actually know the answer. */
        outcome: l.outcome ?? null,
        valueGbp: l.valueGbp ?? null,
        channel: l.channel,
        at: l.at,
      })),
      bookings: bookings.map((b) => ({
        id: b._id,
        reference: b.reference,
        name: b.name,
        phone: b.phone,
        service: b.service,
        preferredDate: b.preferredDate,
        preferredTime: b.preferredTime,
        status: b.status,
        at: b.at,
      })),
    };
  },
});

/** A person picks the conversation up. */
export const claim = mutation({
  args: { sessionId: v.string(), by: v.optional(v.string()) },
  handler: async (ctx, { sessionId, by }) => {
    const s = await sessionRow(ctx, sessionId);
    if (!s) return { ok: false, error: "no such session" };
    /* Someone else already has it. Say who, rather than silently stealing the
       conversation and having two people answer the same visitor. */
    if (s.handover === "live" && s.handoverBy && s.handoverBy !== (by ?? "the team")) {
      return { ok: false, error: "already taken", takenBy: s.handoverBy };
    }
    await setState(ctx, sessionId, { handover: "live", handoverBy: by ?? "the team" }, s.channel);
    await say(ctx, sessionId, "system", "A person has joined the chat.", s.channel);
    return { ok: true, state: "live" };
  },
});

/** The person's reply to the visitor. */
export const reply = mutation({
  args: { sessionId: v.string(), text: v.string(), by: v.optional(v.string()) },
  handler: async (ctx, { sessionId, text, by }) => {
    const clean = text.trim().slice(0, 4000);
    if (!clean) return { ok: false, error: "empty" };
    const s = await sessionRow(ctx, sessionId);
    if (!s) return { ok: false, error: "no such session" };

    /* Replying is itself a claim. Typing an answer and having it go nowhere
       because the conversation was still "waiting" would be the worst possible
       failure here, so the state follows the action. */
    if (s.handover !== "live") {
      await setState(ctx, sessionId, { handover: "live", handoverBy: by ?? "the team" }, s.channel);
      await say(ctx, sessionId, "system", "A person has joined the chat.", s.channel);
    }
    await say(ctx, sessionId, "human", clean, s.channel);
    return { ok: true };
  },
});

/** Done: the assistant answers again, and the questions are marked handled. */
export const release = mutation({
  args: { sessionId: v.string(), note: v.optional(v.string()) },
  handler: async (ctx, { sessionId, note }) => {
    const s = await sessionRow(ctx, sessionId);
    if (!s) return { ok: false, error: "no such session" };

    await setState(ctx, sessionId, { handover: "closed" }, s.channel);
    await say(
      ctx,
      sessionId,
      "system",
      note?.trim() || "The assistant is answering again.",
      s.channel,
    );

    /* The open questions for this conversation are answered now, so they stop
       counting as a queue. Only this session's, never the whole table. */
    const open = await ctx.db
      .query("escalations")
      .withIndex("by_handled", (i) => i.eq("handled", false))
      .take(200);
    let marked = 0;
    for (const e of open) {
      if (e.sessionId === sessionId) {
        await ctx.db.patch(e._id, { handled: true });
        marked++;
      }
    }
    return { ok: true, state: "closed", marked };
  },
});
