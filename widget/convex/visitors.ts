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
/* =========================================================================
   Where they came from.

   `channel` on a session says how somebody is talking to us, "chat" or
   "voice". It does not say which advert produced them, which is the question
   every channel report actually asks. So acquisition is a second field,
   `sourceChannel`, with the detail beside it.

   First touch wins and is never overwritten. The advert that produced
   somebody is the one they first arrived on; the last page they happened to
   land on is not the same question and answering it would quietly credit
   organic traffic with paid leads.
   ========================================================================= */

export const attributionArg = v.object({
  sourceChannel: v.optional(v.string()),
  source: v.optional(v.string()),
  medium: v.optional(v.string()),
  campaign: v.optional(v.string()),
  campaignId: v.optional(v.string()),
  adGroup: v.optional(v.string()),
  adId: v.optional(v.string()),
  formId: v.optional(v.string()),
  keyword: v.optional(v.string()),
  gclid: v.optional(v.string()),
  fbclid: v.optional(v.string()),
  landingPage: v.optional(v.string()),
  referrer: v.optional(v.string()),
});

type AttrIn = {
  sourceChannel?: string;
  source?: string;
  medium?: string;
  campaign?: string;
  campaignId?: string;
  adGroup?: string;
  adId?: string;
  formId?: string;
  keyword?: string;
  gclid?: string;
  fbclid?: string;
  landingPage?: string;
  referrer?: string;
};

/* The channels a lead can be recorded under.

   The split that used to be here, `facebook_dm` for a message that came from
   an advert against `facebook_page` for one that did not, is gone. Nobody
   running the business thinks of those as two channels: it is one thread, on
   one surface, answered the same way. Which advert produced it is kept in
   `attribution`, which is where a question about an advert belongs.

   What stays split is the ADVERT against the MESSAGE. A Facebook lead form is
   somebody filling in a form inside Facebook; a Facebook message is somebody
   typing to you. Different intent, different route, different cost, and
   `facebook_ads` is the figure that says whether the ad spend is working. */
const SOURCE_CHANNELS = new Set([
  "website_chat", "website_voice", "website_form",
  /* Paid. */
  "google_ads", "facebook_ads", "instagram_ads",
  /* Messages, however the person got there. */
  "facebook", "instagram", "whatsapp",
  "phone_inbound", "phone_missed",
  "reactivation", "organic", "direct", "referral", "unknown",
]);

/* Search engines, for telling an organic visit from a referral.

   A visit with no advert click and no campaign tag is classified by where it
   came from, and "came from Google" and "came from a link on somebody else's
   website" are different answers to the only question this field asks. */
const SEARCH_ENGINES = /(^|\.)(google|bing|duckduckgo|yahoo|ecosia|brave|startpage)\./i;

/**
 * Work out the acquisition channel from what the browser could see.
 *
 * `gclid` and `fbclid` are minted by the ad platform and are the only two
 * signals here that cannot be typed by hand, so they win over any `utm_`.
 * A caller that already knows better (the Meta lead-ad webhook, say) passes
 * `sourceChannel` explicitly and this leaves it alone.
 */
export function classifySource(a: AttrIn | undefined, fallback: string): string {
  const given = a?.sourceChannel;
  if (given && SOURCE_CHANNELS.has(given)) return given;

  /* A click id is the only signal here that cannot be typed by hand, so it is
     checked before anything else. */
  if (a?.gclid) return "google_ads";
  if (a?.fbclid) {
    const src = (a.source || "").toLowerCase();
    const med = (a.medium || "").toLowerCase();
    /* A click-to-WhatsApp advert lands in a WhatsApp thread, so it is a
       WhatsApp conversation. Which advert opened it is in `attribution`. */
    if (src.includes("whatsapp") || med.includes("whatsapp")) return "whatsapp";
    return src.includes("instagram") || src === "ig" ? "instagram_ads" : "facebook_ads";
  }

  const medium = (a?.medium || "").toLowerCase();
  const source = (a?.source || "").toLowerCase();
  if (medium === "cpc" || medium === "ppc" || medium === "paid") {
    if (source.includes("google")) return "google_ads";
    if (source.includes("instagram")) return "instagram_ads";
    if (source.includes("facebook") || source.includes("fb")) return "facebook_ads";
  }
  if (medium === "organic") return "organic";

  /* No advert click and no campaign tag. What is left is where the browser
     says they came from, and that is a real signal rather than a guess.

     This used to call every referrer a "referral", which put everybody who
     found the site through a normal Google search into the same bucket as
     somebody who followed a link from another company's website. Those are
     the two different answers this field exists to tell apart, so a search
     engine host is now read as organic and everything else as a referral.

     No referrer at all is direct: typed in, a bookmark, or a browser that
     stripped it. The last of those is why `direct` is always a little
     overstated, everywhere, in every analytics tool. */
  const ref = (a?.referrer || "").toLowerCase();
  if (ref) {
    let host = "";
    try {
      host = new URL(ref).hostname;
    } catch {
      host = ref;
    }
    if (SEARCH_ENGINES.test(`.${host}`)) return "organic";
    return "referral";
  }
  if (medium === "referral") return "referral";

  return fallback;
}

/** Drop empty strings and anything absurdly long before it reaches the row. */
export function cleanAttribution(a: AttrIn | undefined): AttrIn | undefined {
  if (!a) return undefined;
  const out: Record<string, string> = {};
  for (const [k, v0] of Object.entries(a)) {
    if (k === "sourceChannel") continue;
    const t = typeof v0 === "string" ? v0.trim() : "";
    if (t) out[k] = t.slice(0, 500);
  }
  return Object.keys(out).length ? (out as AttrIn) : undefined;
}

export const hello = mutation({
  args: {
    sessionId: v.string(),
    visitorId: v.string(),
    channel: v.optional(v.string()),
    pageUrl: v.optional(v.string()),
    attribution: v.optional(attributionArg),
  },
  handler: async (ctx, a) => {
    const channel = a.channel ?? "chat";
    const attribution = cleanAttribution(a.attribution);
    const sourceChannel = classifySource(
      a.attribution,
      channel === "voice" ? "website_voice" : "website_chat",
    );

    const s = await ctx.db
      .query("sessions")
      .withIndex("by_session", (i) => i.eq("sessionId", a.sessionId))
      .first();

    if (s) {
      const patch: Record<string, unknown> = { lastSeenAt: now() };
      if (s.visitorId !== a.visitorId) patch.visitorId = a.visitorId;
      /* Only if the session has none. A second page view on the same visit
         carries no gclid and would otherwise overwrite the one that did. */
      if (!s.sourceChannel) patch.sourceChannel = sourceChannel;
      if (!s.attribution && attribution) {
        patch.attribution = { ...attribution, firstTouchAt: now() };
      }
      await ctx.db.patch(s._id, patch);
    } else {
      await ctx.db.insert("sessions", {
        sessionId: a.sessionId,
        visitorId: a.visitorId,
        channel,
        startedAt: now(),
        lastSeenAt: now(),
        pageUrl: a.pageUrl,
        sourceChannel,
        attribution: attribution
          ? { ...attribution, firstTouchAt: now() }
          : undefined,
      });
    }

    const person = await findPerson(ctx, { visitorId: a.visitorId });

    /* Carry it onto the person, but only if they do not already have one.
       Somebody who first arrived through a Google ad and comes back a week
       later directly is still a Google ad lead. */
    if (person && !person.sourceChannel) {
      await ctx.db.patch(person._id, {
        sourceChannel,
        attribution: person.attribution
          ? person.attribution
          : attribution
            ? { ...attribution, firstTouchAt: now() }
            : undefined,
      });
    }

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
/* How much of their own conversation a returning visitor is shown.

   A panel is not an archive. Sixty messages is a long conversation and
   still scrolls in a second; the whole history of somebody who has been
   back eight times is not something anybody reads, and it is not something
   worth sending over a phone connection before they have typed anything. */
const HISTORY_LIMIT = 60;

/**
 * Everything this visitor has said to us, and we to them, oldest first.
 *
 * Keyed on the visitor rather than the session on purpose. The session id
 * lives in sessionStorage and dies when the tab closes; the visitor id lives
 * in localStorage and survives. Keying this on the session would lose the
 * history exactly when somebody closes the browser and comes back the next
 * day, which is the case it exists for.
 *
 * Called from the widget without a secret, so it is scoped to the visitor id
 * the caller presents and returns nothing for one it does not recognise. The
 * id is a random value in that person's own browser, which makes it a bearer
 * token in practice: the same trust model as `/visitorPoll`, which answers
 * on a session id the same way.
 */
export const historyForVisitor = query({
  args: { visitorId: v.string(), limit: v.optional(v.number()) },
  handler: async (ctx, { visitorId, limit }) => {
    const empty = { messages: [], sessions: 0, lastAt: null, trimmed: false };
    /* An empty id must return nothing rather than everything. It is the
       value a browser with no localStorage sends. */
    if (!visitorId) return empty;

    const sessions = await ctx.db
      .query("sessions")
      .withIndex("by_visitor", (i) => i.eq("visitorId", visitorId))
      .collect();
    if (!sessions.length) return empty;

    const take = Math.min(limit ?? HISTORY_LIMIT, 200);

    /* The recent end of each conversation, then the recent end of all of
       them together. Taking the newest from each session first bounds the
       read: somebody with forty visits is forty index reads, not a full
       scan of every message they have ever sent.

       `take + 1`, not `take`. With one session and exactly `take` read,
       there is no way to tell a conversation of exactly sixty from one of
       six hundred, so `trimmed` below would always have been false and the
       panel would have claimed to be showing everything. One extra row is
       what makes that answer knowable. */
    const perSession = await Promise.all(
      sessions.map((s) =>
        ctx.db
          .query("messages")
          .withIndex("by_session_at", (i) => i.eq("sessionId", s.sessionId))
          .order("desc")
          .take(take + 1),
      ),
    );

    const all = perSession.flat().sort((a, b) => a.at - b.at);
    const kept = all.slice(-take);

    const messages = await Promise.all(
      kept.map(async (m) => ({
        role: m.role,
        text: m.text,
        at: m.at,
        /* The storage id is deliberately not included. The browser needs
           something it can put in an <img>, and an id it could hand to
           another route is not that. */
        attachment: m.attachment
          ? {
              kind: m.attachment.kind,
              type: m.attachment.type,
              name: m.attachment.name ?? null,
              url: await ctx.storage.getUrl(m.attachment.storageId),
            }
          : null,
      })),
    );

    return {
      messages,
      sessions: sessions.length,
      lastAt: messages.length ? messages[messages.length - 1].at : null,
      /* So the panel can say "earlier messages are not shown" rather than
         implying this is everything that was ever said. */
      trimmed: all.length > kept.length,
    };
  },
});

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
