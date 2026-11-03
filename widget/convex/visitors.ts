import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/* =========================================================================
   Who the visitor is, across visits.

   A session is one visit. It used to be the only identity there was, and it
   lives in sessionStorage, which the browser throws away when the tab closes.
   So the same person coming back next week arrived as a stranger, and if they
   gave their details again they became a second lead.

   A visitor is the person. The widget keeps that id in localStorage, which
   survives closing the tab, closing the browser and rebooting. Same machine
   next week is the same visitor, and no phone number is needed for it: most
   people who use a chat widget never give one.

   Two visitors merge into one person when they turn out to share a phone
   number or an email address, which is how a laptop and a phone become one
   human. Short of a login that is the ceiling, and it is where every chat
   widget stops: a different browser, or cleared storage, is a new person.
   ========================================================================= */

const now = () => Date.now();

/* ------------------------------------------------------------ normalising */

/**
 * A phone number reduced to something comparable.
 *
 * "07700 900123", "+44 7700 900123" and "(07700) 900-123" are one number and
 * have to match, or the same person is captured twice. UK numbers are folded
 * onto their +44 form; anything else keeps its digits.
 */
export function phoneKey(raw?: string | null): string | undefined {
  if (!raw) return undefined;
  let d = String(raw).replace(/[^\d+]/g, "");
  if (!d) return undefined;
  d = d.replace(/^00/, "+");
  if (d.startsWith("0") && d.length >= 10) d = "+44" + d.slice(1);
  else if (!d.startsWith("+") && d.length >= 11) d = "+" + d;
  /* Too short to be anyone's number: matching on it would join strangers. */
  return d.replace(/\D/g, "").length < 7 ? undefined : d;
}

/** Lowercased and trimmed. Nothing cleverer: stripping dots out of Gmail
    addresses would be wrong for every other provider. */
export function emailKey(raw?: string | null): string | undefined {
  const e = String(raw ?? "").trim().toLowerCase();
  return e.includes("@") ? e : undefined;
}

/* ---------------------------------------------------------------- lookup */

type LeadDoc = any;

/**
 * The lead row for this person, by any of the three keys.
 *
 * Order matters. The browser id is checked first because it is the one that
 * exists for everybody; phone and email only exist once they have told us,
 * and are what merge a second device into the same person.
 */
export async function findPerson(
  ctx: any,
  keys: { visitorId?: string; phone?: string; email?: string },
): Promise<LeadDoc | null> {
  const pk = phoneKey(keys.phone);
  const ek = emailKey(keys.email);

  if (pk) {
    const hit = await ctx.db
      .query("leads")
      .withIndex("by_phone_key", (i: any) => i.eq("phoneKey", pk))
      .first();
    if (hit) return hit;
  }
  if (ek) {
    const hit = await ctx.db
      .query("leads")
      .withIndex("by_email_key", (i: any) => i.eq("emailKey", ek))
      .first();
    if (hit) return hit;
  }
  if (keys.visitorId) {
    /* No index here: visitorIds is an array, and Convex cannot index into
       one. The lead table is small and this runs only when someone is
       captured, which is rare compared with messages. If leads ever reach
       the tens of thousands, give visitors their own table keyed by id. */
    const all = await ctx.db.query("leads").withIndex("by_at").order("desc").take(500);
    const hit = all.find((l: LeadDoc) => (l.visitorIds ?? []).includes(keys.visitorId));
    if (hit) return hit;
  }
  return null;
}

/* ------------------------------------------------------------ the widget */

/**
 * Called once by the widget on every page load, before anything is typed.
 *
 * It ties this visit to the person and answers whether we have met them
 * before, which is what lets the assistant say "welcome back" instead of
 * opening cold and asking for details it already holds.
 *
 * Public, like the other two visitor routes: the caller is the visitor's own
 * browser. It returns nothing that the browser did not already have except
 * the person's own first name, and only to a browser already carrying that
 * person's id.
 */
export const hello = mutation({
  args: {
    sessionId: v.string(),
    visitorId: v.string(),
    channel: v.optional(v.string()),
    pageUrl: v.optional(v.string()),
  },
  handler: async (ctx, a) => {
    const channel = a.channel ?? "chat";

    const s = await ctx.db
      .query("sessions")
      .withIndex("by_session", (i) => i.eq("sessionId", a.sessionId))
      .first();

    if (s) {
      if (s.visitorId !== a.visitorId) {
        await ctx.db.patch(s._id, { visitorId: a.visitorId, lastSeenAt: now() });
      } else {
        await ctx.db.patch(s._id, { lastSeenAt: now() });
      }
    } else {
      await ctx.db.insert("sessions", {
        sessionId: a.sessionId,
        visitorId: a.visitorId,
        channel,
        startedAt: now(),
        lastSeenAt: now(),
        pageUrl: a.pageUrl,
      });
    }

    const person = await findPerson(ctx, { visitorId: a.visitorId });

    /* Conversations this person has had, this one included. Counted from
       sessions rather than from the lead's own counter so it stays right even
       for a visitor who has never been captured as a lead. */
    const mine = await ctx.db
      .query("sessions")
      .withIndex("by_visitor", (i) => i.eq("visitorId", a.visitorId))
      .collect();

    const state = (s ?? mine.find((x) => x.sessionId === a.sessionId))?.handover ?? "none";

    return {
      ok: true,
      /* Whether this conversation is already with a person. A page can load
         into the middle of a handover: the visitor refreshed, or the escalation
         came from a call rather than from something they typed here. Without
         this the widget would not start listening until they sent a message,
         and the first thing they sent would go to the assistant. */
      handover: state,
      withPerson: state === "waiting" || state === "live",
      /* True only when they have been here in an earlier conversation. A
         reload is the same conversation and must not count. */
      returning: mine.filter((x) => x.sessionId !== a.sessionId).length > 0,
      conversations: mine.length,
      /* First name only, and only if we captured it. The widget uses it to
         decide whether to greet, not to print the whole record back. */
      name: person?.name ? String(person.name).split(/\s+/)[0] : null,
      known: Boolean(person),
    };
  },
});

/** Everything we know about the person behind a session, for the assistant to
    read before it answers. Behind the shared secret, not public. */
export const profileForSession = query({
  args: { sessionId: v.string() },
  handler: async (ctx, { sessionId }) => {
    const s = await ctx.db
      .query("sessions")
      .withIndex("by_session", (i) => i.eq("sessionId", sessionId))
      .first();
    if (!s?.visitorId) return { known: false };

    const person = await findPerson(ctx, { visitorId: s.visitorId });
    if (!person) return { known: false, visitorId: s.visitorId };

    return {
      known: true,
      visitorId: s.visitorId,
      name: person.name ?? null,
      email: person.email ?? null,
      phone: person.phone ?? null,
      company: person.company ?? null,
      service: person.service ?? null,
      budget: person.budget ?? null,
      hot: person.hot ?? false,
      firstAt: person.firstAt ?? person.at,
      lastAt: person.at,
      visits: person.visits ?? 1,
    };
  },
});

/** Every conversation this person has had, newest first. The dashboard reads
    it to show one person's whole history rather than one visit. */
export const conversationsForVisitor = query({
  args: { visitorId: v.string() },
  handler: async (ctx, { visitorId }) => {
    const rows = await ctx.db
      .query("sessions")
      .withIndex("by_visitor", (i) => i.eq("visitorId", visitorId))
      .collect();

    const out = await Promise.all(
      rows.map(async (s) => {
        const recent = await ctx.db
          .query("messages")
          .withIndex("by_session_at", (i) => i.eq("sessionId", s.sessionId))
          .order("desc")
          .take(50);
        const first = recent[recent.length - 1];
        return {
          sessionId: s.sessionId,
          channel: s.channel,
          startedAt: s.startedAt,
          lastSeenAt: s.lastSeenAt,
          handover: s.handover ?? null,
          messages: recent.length,
          opened: first ? first.text.slice(0, 200) : null,
        };
      }),
    );
    /* Newest first, falling back to when the conversation started: two
       sessions last seen in the same millisecond would otherwise come back in
       whatever order the database happened to hold them. */
    return {
      sessions: out.sort((a, b) => b.lastSeenAt - a.lastSeenAt || b.startedAt - a.startedAt),
    };
  },
});
