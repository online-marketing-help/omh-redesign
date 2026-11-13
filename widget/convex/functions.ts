import { v } from "convex/values";
import { mutation, query, internalMutation, internalQuery } from "./_generated/server";
import { api } from "./_generated/api";
import { findPerson, phoneKey, emailKey, attributionArg, classifySource, cleanAttribution } from "./visitors";

/* =========================================================================
   Everything the assistant can read or write. The HTTP layer in http.ts is
   the only way in from outside, and it checks a shared secret first.
   ========================================================================= */

const now = () => Date.now();

/* ---------------------------------------------------------------- knowledge */

export const searchKb = query({
  args: {
    q: v.string(),
    kind: v.optional(v.string()),
    limit: v.optional(v.number()),
    tenant: v.optional(v.string()),
  },
  handler: async (ctx, { q, kind, limit, tenant }) => {
    const take = Math.min(limit ?? 6, 12);
    /* One deployment holds OMH's own knowledge base and the industry demos.
       Default to "omh" so every existing caller keeps the behaviour it had, and
       so a demo can never answer a question from the live site's content by
       forgetting to pass a tenant. */
    const t = tenant ?? "omh";
    const query = ctx.db
      .query("kb")
      .withSearchIndex("search_text", (s) => {
        let f = s.search("text", q).eq("tenant", t);
        return kind ? f.eq("kind", kind) : f;
      });
    const rows = await query.take(take);
    return rows.map((r) => ({
      title: r.title,
      kind: r.kind,
      service: r.service,
      url: r.url,
      text: r.text,
    }));
  },
});

export const getPackages = query({
  args: { group: v.optional(v.string()), q: v.optional(v.string()),
          tenant: v.optional(v.string()) },
  handler: async (ctx, { group, q, tenant }) => {
    /* There are 38 packages. A search index on the name was returning a single
       row for "SEO" and hiding the entire main SEO group, so the agent would
       have quoted a £700 local package as the price of SEO. At this size an
       honest scan and filter is both cheaper and correct. */
    const t = tenant ?? "omh";
    const all = (await ctx.db.query("packages").collect())
      .filter((r) => (r.tenant ?? "omh") === t);

    const norm = (t: string) => t.toLowerCase();
    let rows = all;

    if (group) {
      rows = rows.filter((r) => norm(r.group) === norm(group));
    } else if (q && q.trim()) {
      /* Score each group rather than taking anything that matches a word.
         "google ads" used to return five groups because the bare word "ads"
         appears in several alias lists. A phrase match on an alias outranks a
         word match, and only the best band is returned, so the agent sees the
         ladder it was asked about instead of the whole price list. */
      const query = norm(q);
      const words = query.split(/[^a-z0-9]+/).filter((w) => w.length > 2);

      const score = new Map<string, number>();
      for (const r of all) {
        const aliases = (r.aliases ?? []).map(norm);
        const name = norm(r.group + " " + r.name);
        let best = score.get(r.group) ?? 0;

        for (const a of aliases) {
          if (query === a) best = Math.max(best, 100);
          else if (query.includes(a) && a.includes(" ")) best = Math.max(best, 60);
          else if (query.includes(a)) best = Math.max(best, 30);
        }
        if (name.includes(query)) best = Math.max(best, 50);
        for (const w of words) {
          if (aliases.some((a) => a.split(" ").includes(w))) best = Math.max(best, 10);
          else if (name.includes(w)) best = Math.max(best, 8);
        }
        score.set(r.group, best);
      }

      /* A score of 8 means one query word merely appeared inside a group name:
         "tv advert" hits every "...Advertising" group that way and returned the
         whole price list. A weak substring alone is not a match, so the floor is
         an alias word hit. */
      const FLOOR = 10;
      const top = Math.max(0, ...score.values());
      if (top < FLOOR) {
        rows = [];
      } else {
        /* Keep groups at the top score, and anything close to it, so a genuinely
           ambiguous question like "SEO" still shows both SEO ladders. */
        const keep = new Set(
          [...score.entries()]
            .filter(([, v]) => v >= Math.max(FLOOR, top * 0.8))
            .map(([k]) => k),
        );
        rows = all.filter((r) => keep.has(r.group));
      }
    }

    rows = rows.sort((a, b) =>
      a.group === b.group
        ? a.priceGbpMonthly - b.priceGbpMonthly
        : a.group.localeCompare(b.group),
    );

    return rows.map((r) => ({
      group: r.group,
      package: r.name,
      price_gbp_monthly: r.priceGbpMonthly,
      contract_months: r.contractMonths ?? null,
      included: r.included,
      not_included: r.notIncluded,
      details: r.details,
      url: r.url,
      note: "Published prices are monthly figures with a 50% deposit. The final package is agreed in the free 30 minute consultation.",
    }));
  },
});

/* Seeding is an upsert by key so re-running the builder never duplicates. */
export const upsertKb = mutation({
  args: {
    tenant: v.optional(v.string()),
    rows: v.array(
      v.object({
        key: v.string(),
        kind: v.string(),
        title: v.string(),
        service: v.string(),
        url: v.string(),
        text: v.string(),
      }),
    ),
  },
  handler: async (ctx, { rows, tenant }) => {
    const t = tenant ?? "omh";
    let inserted = 0;
    let updated = 0;
    for (const r of rows) {
      /* The key is only unique within a tenant. Matching on key alone would let
         a demo overwrite a row on the live site that happened to share an id. */
      const existing = (await ctx.db
        .query("kb")
        .withIndex("by_key", (i) => i.eq("key", r.key))
        .collect()).find((row) => (row.tenant ?? "omh") === t);
      if (existing) {
        await ctx.db.patch(existing._id, { ...r, tenant: t, updatedAt: now() });
        updated++;
      } else {
        await ctx.db.insert("kb", { ...r, tenant: t, updatedAt: now() });
        inserted++;
      }
    }
    return { inserted, updated };
  },
});

/* Removes rows whose key is no longer produced by the builder. Without this a
   chunk that was deliberately dropped (an unfinished price, a placeholder)
   would live on in Convex and still be retrievable. */
export const pruneKb = mutation({
  args: { keep: v.array(v.string()), tenant: v.optional(v.string()) },
  handler: async (ctx, { keep, tenant }) => {
    /* This deletes everything not in the keep list, so it MUST be scoped. Before
       the tenant field existed it swept the whole table, which meant seeding a
       demo would have wiped the live site's knowledge base. */
    const t = tenant ?? "omh";
    const live = new Set(keep);
    const mine = (await ctx.db.query("kb").collect())
      .filter((r) => (r.tenant ?? "omh") === t);
    let removed = 0;
    for (const row of mine) {
      if (!live.has(row.key)) {
        await ctx.db.delete(row._id);
        removed++;
      }
    }
    return { removed, remaining: mine.length - removed, tenant: t };
  },
});

export const upsertPackages = mutation({
  args: {
    rows: v.array(
      v.object({
        group: v.string(),
        name: v.string(),
        aliases: v.optional(v.array(v.string())),
        priceGbpMonthly: v.number(),
        contractMonths: v.optional(v.string()),
        included: v.array(v.string()),
        notIncluded: v.array(v.string()),
        details: v.array(v.string()),
        url: v.string(),
      }),
    ),
    tenant: v.optional(v.string()),
  },
  handler: async (ctx, { rows, tenant }) => {
    /* Replaces this tenant's packages wholesale. Scoped for the same reason as
       pruneKb: unscoped, seeding a demo deleted every OMH price. */
    const t = tenant ?? "omh";
    const old = (await ctx.db.query("packages").collect())
      .filter((r) => (r.tenant ?? "omh") === t);
    for (const o of old) await ctx.db.delete(o._id);
    for (const r of rows) {
      await ctx.db.insert("packages", { ...r, tenant: t, updatedAt: now() });
    }
    return { count: rows.length, tenant: t };
  },
});

/* ---------------------------------------------------------------- sessions */

async function touchSession(
  ctx: any,
  sessionId: string,
  channel: string,
  pageUrl?: string,
  retellCallId?: string,
) {
  const s = await ctx.db
    .query("sessions")
    .withIndex("by_session", (i: any) => i.eq("sessionId", sessionId))
    .first();
  if (s) {
    await ctx.db.patch(s._id, {
      lastSeenAt: now(),
      ...(pageUrl ? { pageUrl } : {}),
      ...(retellCallId ? { retellCallId } : {}),
    });
  } else {
    await ctx.db.insert("sessions", {
      sessionId,
      channel,
      startedAt: now(),
      lastSeenAt: now(),
      pageUrl,
      retellCallId,
    });
  }
}

export const logMessage = mutation({
  args: {
    tenant: v.optional(v.string()),
    sessionId: v.string(),
    role: v.string(),
    text: v.string(),
    channel: v.optional(v.string()),
    pageUrl: v.optional(v.string()),
    retellCallId: v.optional(v.string()),
    /* A photo or a voice note, already uploaded and already judged.

       `kind` and `type` must be what the BYTES said, not what a browser or
       Meta claimed: see gates/attachments.js. Nothing here re-checks, so
       whatever calls this is responsible for having done so, and the two
       callers that exist both do. */
    attachment: v.optional(v.object({
      storageId: v.id("_storage"),
      kind: v.string(),
      type: v.string(),
      name: v.optional(v.string()),
      size: v.optional(v.number()),
      sourceUrl: v.optional(v.string()),
    })),
  },
  handler: async (ctx, a) => {
    const channel = a.channel ?? "chat";
    await touchSession(ctx, a.sessionId, channel, a.pageUrl, a.retellCallId);
    await ctx.db.insert("messages", {
      sessionId: a.sessionId,
      role: a.role,
      channel,
      /* An attachment with no text is still a message. "Sent a photo" beats
         an empty bubble on the dashboard while the vision model is still
         reading it, or if it never does. */
      text: a.text || (a.attachment ? `Sent a ${a.attachment.kind === "audio" ? "voice note" : "photo"}` : ""),
      attachment: a.attachment,
      at: now(),
    });
    return { ok: true };
  },
});

export const getTranscript = query({
  args: { sessionId: v.string(), limit: v.optional(v.number()) },
  handler: async (ctx, { sessionId, limit }) => {
    const rows = await ctx.db
      .query("messages")
      .withIndex("by_session_at", (i) => i.eq("sessionId", sessionId))
      .order("desc")
      .take(Math.min(limit ?? 40, 200));
    return rows.reverse().map((m) => ({ role: m.role, text: m.text, at: m.at }));
  },
});

/* ---------------------------------------------------------------- profile */

export const getProfile = query({
  args: { sessionId: v.string() },
  handler: async (ctx, { sessionId }) => {
    const p = await ctx.db
      .query("profiles")
      .withIndex("by_session", (i) => i.eq("sessionId", sessionId))
      .first();
    if (!p) return { sessionId, known: false };
    return {
      sessionId,
      known: true,
      name: p.name ?? null,
      email: p.email ?? null,
      phone: p.phone ?? null,
      company: p.company ?? null,
      website: p.website ?? null,
      interestedIn: p.interestedIn ?? [],
      budget: p.budget ?? null,
      notes: p.notes ?? null,
    };
  },
});

export const updateProfile = mutation({
  args: {
    sessionId: v.string(),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    company: v.optional(v.string()),
    website: v.optional(v.string()),
    interestedIn: v.optional(v.array(v.string())),
    budget: v.optional(v.string()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, a) => {
    const { sessionId, ...rest } = a;
    /* Only overwrite a field when the new value is non-empty. A later turn
       that says nothing about the phone number must not erase it. */
    const patch: Record<string, unknown> = { updatedAt: now() };
    for (const [k, val] of Object.entries(rest)) {
      if (val === undefined || val === null) continue;
      if (typeof val === "string" && val.trim() === "") continue;
      if (Array.isArray(val) && val.length === 0) continue;
      patch[k] = val;
    }
    const p = await ctx.db
      .query("profiles")
      .withIndex("by_session", (i) => i.eq("sessionId", sessionId))
      .first();
    if (p) await ctx.db.patch(p._id, patch);
    else await ctx.db.insert("profiles", { sessionId, ...patch } as any);
    return { ok: true };
  },
});

/* ---------------------------------------------------------------- limits */

export const WINDOW_MS = 60 * 60 * 1000;   // one hour
const PER_SESSION = 30;                     // a real visitor never needs more
const PER_IP = 60;                          // an office behind one address
export const PER_DEPLOYMENT = 1500;         // circuit breaker on the whole thing

/* Exported so attachments.ts can share this counter rather than keeping a
   second one. Two rate limiters over the same table, with their own windows
   and their own idea of what a session is, is how a visitor ends up over one
   limit and under the other. */
export async function bump(ctx: any, key: string, max: number, now: number) {
  const row = await ctx.db
    .query("limits")
    .withIndex("by_key", (i: any) => i.eq("key", key))
    .first();
  if (!row) {
    await ctx.db.insert("limits", { key, windowStart: now, count: 1 });
    return { ok: true, count: 1 };
  }
  if (now - row.windowStart > WINDOW_MS) {
    await ctx.db.patch(row._id, { windowStart: now, count: 1 });
    return { ok: true, count: 1 };
  }
  if (row.count >= max) return { ok: false, count: row.count };
  await ctx.db.patch(row._id, { count: row.count + 1 });
  return { ok: true, count: row.count + 1 };
}

export const checkLimit = mutation({
  args: { sessionId: v.string(), ip: v.optional(v.string()) },
  handler: async (ctx, { sessionId, ip }) => {
    const t = now();
    const global = await bump(ctx, "global", PER_DEPLOYMENT, t);
    if (!global.ok) return { allowed: false, reason: "deployment" };
    const session = await bump(ctx, "s:" + sessionId, PER_SESSION, t);
    if (!session.ok) return { allowed: false, reason: "session" };
    if (ip) {
      const addr = await bump(ctx, "ip:" + ip, PER_IP, t);
      if (!addr.ok) return { allowed: false, reason: "address" };
    }
    return { allowed: true };
  },
});

/* ---------------------------------------------------------------- leads */

export const saveLead = mutation({
  args: {
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
    hot: v.optional(v.boolean()),
    channel: v.optional(v.string()),
    /* Where they came from, as opposed to `channel`, which is how they are
       talking to us. A caller that knows (the Meta lead-ad webhook, a Google
       Ads lead form) passes it; the widget does not need to, because the
       session already carries what the browser saw. */
    sourceChannel: v.optional(v.string()),
    attribution: v.optional(attributionArg),
  },
  handler: async (ctx, a) => {
    /* One row per person, not per capture.

       This used to be a bare insert, so somebody who chatted today and came
       back next week became two leads, and the client counted one person
       twice. Now the person is looked up first: by the browser they are in,
       which works for everyone, and by phone or email, which is what merges
       the same human across two devices. See visitors.ts. */
    const session = await ctx.db
      .query("sessions")
      .withIndex("by_session", (i) => i.eq("sessionId", a.sessionId))
      .first();
    const visitorId = session?.visitorId;

    const existing = await findPerson(ctx, {
      visitorId,
      phone: a.phone,
      email: a.email,
    });

    const pk = phoneKey(a.phone);
    const ek = emailKey(a.email);

    /* Where they came from. The caller may know better than the browser did
       (a Meta lead ad carries its own ad id), so an explicit value wins;
       otherwise inherit what the session captured on first load. */
    const attribution =
      cleanAttribution(a.attribution) ?? session?.attribution ?? undefined;
    const sourceChannel = a.sourceChannel
      ? classifySource({ sourceChannel: a.sourceChannel }, "unknown")
      : (session?.sourceChannel ??
         classifySource(a.attribution, a.channel === "voice" ? "website_voice" : "website_chat"));

    if (existing) {
      /* Merge rather than replace. A later visit that mentions no company
         must not wipe the company they gave the first time, so only
         non-empty values are written. */
      const keep = <T>(next: T | undefined, old: T | undefined): T | undefined =>
        next === undefined || next === null || (typeof next === "string" && !next.trim())
          ? old
          : next;

      /* A return visit must never make the record less complete than it was.
         The same person on their phone typed "Monzur" where the first visit
         captured "Monzur Rahman", and a plain overwrite threw the surname
         away. So a new name that is only a shortening of the one we hold is
         not an update. */
      const fullerName = (next?: string, old?: string): string | undefined => {
        const a = (next ?? "").trim();
        const b = (old ?? "").trim();
        if (!a) return b || undefined;
        if (!b) return a;
        const inB = b.toLowerCase().split(/\s+/);
        const isShortening = a
          .toLowerCase()
          .split(/\s+/)
          .every((w) => inB.includes(w));
        return isShortening && a.length < b.length ? b : a;
      };

      /* Same number, written differently: "+44 7700 900123" and
         "07700 900123" are one phone, so there is nothing to update and no
         reason to churn the form the client already reads. */
      const sameNumber = pk !== undefined && pk === existing.phoneKey;
      const sameAddress = ek !== undefined && ek === existing.emailKey;

      const visitorIds = new Set<string>(existing.visitorIds ?? []);
      if (visitorId) visitorIds.add(visitorId);

      await ctx.db.patch(existing._id, {
        name: fullerName(a.name, existing.name) ?? existing.name,
        email: sameAddress ? existing.email : keep(a.email, existing.email),
        phone: sameNumber ? existing.phone : keep(a.phone, existing.phone),
        company: keep(a.company, existing.company),
        website: keep(a.website, existing.website),
        service: keep(a.service, existing.service),
        budget: keep(a.budget, existing.budget),
        message: keep(a.message, existing.message),
        /* Hot is about now, not about who they once were: a person who came
           back ready to buy is hot even if they were browsing in March. */
        hot: a.hot ?? existing.hot,
        channel: a.channel ?? existing.channel,
        sessionId: a.sessionId,
        at: now(),
        firstAt: existing.firstAt ?? existing.at,
        visits: (existing.visits ?? 1) + 1,
        visitorIds: [...visitorIds],
        phoneKey: pk ?? existing.phoneKey,
        emailKey: ek ?? existing.emailKey,
        /* A returning person is worth looking at again even if the first
           visit was marked dealt with. */
        status: existing.status === "closed" ? "new" : existing.status,
        notified: false,
        /* First touch wins. Somebody who first arrived through a Google ad
           and comes back directly a week later is still a Google ad lead;
           overwriting here would quietly credit the second visit's channel
           with the first visit's advert. */
        sourceChannel: existing.sourceChannel ?? sourceChannel,
        attribution:
          existing.attribution ??
          (attribution ? { ...attribution, firstTouchAt: existing.firstAt ?? existing.at } : undefined),
      });
      return { ok: true, leadId: existing._id, returning: true, visits: (existing.visits ?? 1) + 1 };
    }

    const id = await ctx.db.insert("leads", {
      tenant: a.tenant ?? "omh",
      sessionId: a.sessionId,
      name: a.name,
      email: a.email,
      phone: a.phone,
      company: a.company,
      website: a.website,
      service: a.service,
      budget: a.budget,
      message: a.message,
      hot: a.hot ?? false,
      channel: a.channel ?? "chat",
      at: now(),
      firstAt: now(),
      visits: 1,
      visitorIds: visitorId ? [visitorId] : [],
      phoneKey: pk,
      emailKey: ek,
      status: "new",
      sourceChannel,
      attribution: attribution ? { ...attribution, firstTouchAt: now() } : undefined,
    });
    return { ok: true, leadId: id, returning: false, visits: 1 };
  },
});

/* ---------------------------------------------------------------- bookings */

/* Human-readable, unambiguous on the phone: no 0/O or 1/I. */
function makeRef(): string {
  const alphabet = "ACDEFGHJKLMNPQRTUVWXY2345679";
  let s = "";
  for (let i = 0; i < 6; i++) {
    s += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return "OMH-" + s;
}

export const bookAppointment = mutation({
  args: {
    tenant: v.optional(v.string()),
    sessionId: v.string(),
    name: v.string(),
    phone: v.string(),
    email: v.optional(v.string()),
    service: v.string(),
    preferredDate: v.string(),
    preferredTime: v.string(),
    notes: v.optional(v.string()),
    channel: v.optional(v.string()),
  },
  handler: async (ctx, a) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(a.preferredDate)) {
      return { ok: false, error: "preferredDate must be YYYY-MM-DD" };
    }
    if (!/^\d{2}:\d{2}$/.test(a.preferredTime)) {
      return { ok: false, error: "preferredTime must be HH:mm, 24 hour" };
    }

    let reference = makeRef();
    for (let i = 0; i < 5; i++) {
      const clash = await ctx.db
        .query("bookings")
        .withIndex("by_reference", (x) => x.eq("reference", reference))
        .first();
      if (!clash) break;
      reference = makeRef();
    }

    await ctx.db.insert("bookings", {
      tenant: a.tenant ?? "omh",
      reference,
      sessionId: a.sessionId,
      name: a.name,
      email: a.email,
      phone: a.phone,
      service: a.service,
      preferredDate: a.preferredDate,
      preferredTime: a.preferredTime,
      notes: a.notes,
      channel: a.channel ?? "chat",
      status: "requested",
      at: now(),
    });

    /* Put them on the reminder route, here rather than in n8n.

       The rule for this project is that orchestration lives in n8n, and
       this is the stated exception to it: a booking and its reminders must
       not be able to disagree. If the reminder were enrolled by a separate
       call, a failure between the two would leave either a booking nobody
       is reminded about or, far worse, reminders for a booking that was
       never written. In one transaction neither is reachable.

       Best effort beyond that: a lead we cannot find is a booking without
       a person attached, which is worth having anyway. */
    const lead = await ctx.db
      .query("leads")
      .withIndex("by_session", (x) => x.eq("sessionId", a.sessionId))
      .first();
    if (lead) {
      await ctx.runMutation(api.reminders.remindAbout, {
        leadId: lead._id,
        sessionId: a.sessionId,
        preferredDate: a.preferredDate,
        preferredTime: a.preferredTime,
      });
    }

    return {
      ok: true,
      reference,
      message:
        `Booking request ${reference} recorded for ${a.preferredDate} at ${a.preferredTime} UK time. ` +
        "The team will confirm it by email or text.",
    };
  },
});

/* The lead behind a booking, if there is one. A booking carries a session
   id rather than a lead id: it is made mid-conversation, before anybody has
   decided the conversation produced a lead. */
async function leadForSession(ctx: any, sessionId: string) {
  return await ctx.db
    .query("leads")
    .withIndex("by_session", (x: any) => x.eq("sessionId", sessionId))
    .first();
}

export const manageBooking = mutation({
  args: {
    reference: v.string(),
    action: v.string(),         // cancel | move | lookup | no_show
    preferredDate: v.optional(v.string()),
    preferredTime: v.optional(v.string()),
  },
  handler: async (ctx, a) => {
    const b = await ctx.db
      .query("bookings")
      .withIndex("by_reference", (i) => i.eq("reference", a.reference.toUpperCase().trim()))
      .first();
    if (!b) return { ok: false, error: "No booking found with that reference." };

    if (a.action === "lookup") {
      return {
        ok: true,
        reference: b.reference,
        service: b.service,
        date: b.preferredDate,
        time: b.preferredTime,
        status: b.status,
      };
    }
    /* They did not turn up.

       Deliberately not the same as "cancelled". A cancellation is something
       somebody told us about; a no-show is something they did not, and the
       difference is the whole reason to chase one and leave the other. With
       only four statuses the diary could not tell a kept appointment from an
       empty hour, and the channel report counted a no-show as a success.

       Nothing is chased from here. What happens next is route G, started by
       the person who marked it, so it passes the same consent gate, the same
       quiet hours and the same lease as every other message. */
    if (a.action === "no_show") {
      await ctx.db.patch(b._id, { status: "no_show" });
      /* They did not turn up, so there is nothing left to remind them
         about. The no-show CHASE is route G and a separate decision; this
         only stops the reminders for an appointment that has now been and
         gone. */
      {
        const lead = await leadForSession(ctx, b.sessionId);
        if (lead) {
          await ctx.runMutation(api.reminders.cancelReminders, {
            leadId: lead._id, why: "no_show",
          });
        }
      }
      /* The session and the number come back so the caller can find the
         lead and chase it. A booking carries a session id rather than a
         lead id: it is made mid-conversation, before anybody has decided
         the conversation produced a lead. */
      return {
        ok: true,
        reference: b.reference,
        status: "no_show",
        sessionId: b.sessionId,
        phone: b.phone,
      };
    }

    if (a.action === "cancel") {
      await ctx.db.patch(b._id, { status: "cancelled" });
      /* The one that matters most. Reminding somebody about an appointment
         they cancelled tells them nobody was listening, and it is worse
         than never reminding them at all. */
      {
        const lead = await leadForSession(ctx, b.sessionId);
        if (lead) {
          await ctx.runMutation(api.reminders.cancelReminders, {
            leadId: lead._id, why: "cancelled",
          });
        }
      }
      return { ok: true, reference: b.reference, status: "cancelled" };
    }
    if (a.action === "move") {
      if (!a.preferredDate || !a.preferredTime) {
        return { ok: false, error: "Moving a booking needs a new date and time." };
      }
      await ctx.db.patch(b._id, {
        preferredDate: a.preferredDate,
        preferredTime: a.preferredTime,
        status: "moved",
        calendarEventId: undefined,
        calendarSyncedAt: undefined,
      });
      /* Re-timed, not left alone. remindAbout stops whatever was running
         and enrols against the new moment, so the old reminders cannot
         survive a move. */
      {
        const lead = await leadForSession(ctx, b.sessionId);
        if (lead) {
          await ctx.runMutation(api.reminders.remindAbout, {
            leadId: lead._id,
            sessionId: b.sessionId,
            preferredDate: a.preferredDate,
            preferredTime: a.preferredTime,
          });
        }
      }
      return {
        ok: true,
        reference: b.reference,
        status: "moved",
        date: a.preferredDate,
        time: a.preferredTime,
      };
    }
    return { ok: false, error: "action must be lookup, cancel or move" };
  },
});

/* Set by the n8n calendar step once Google Calendar credentials are in place.
   Kept separate so a failed calendar write never loses the booking. */
export const attachCalendarEvent = mutation({
  args: { reference: v.string(), calendarEventId: v.string() },
  handler: async (ctx, { reference, calendarEventId }) => {
    const b = await ctx.db
      .query("bookings")
      .withIndex("by_reference", (i) => i.eq("reference", reference))
      .first();
    if (!b) return { ok: false, error: "unknown reference" };
    await ctx.db.patch(b._id, {
      calendarEventId,
      calendarSyncedAt: now(),
      status: "confirmed",
    });
    return { ok: true };
  },
});

export const pendingCalendarSync = query({
  args: {},
  handler: async (ctx) => {
    const rows = await ctx.db
      .query("bookings")
      .withIndex("by_status", (i) => i.eq("status", "requested"))
      .take(50);
    return rows.map((b) => ({
      reference: b.reference,
      name: b.name,
      email: b.email ?? null,
      phone: b.phone,
      service: b.service,
      date: b.preferredDate,
      time: b.preferredTime,
      notes: b.notes ?? null,
    }));
  },
});

/* ---------------------------------------------------------------- escalation */

export const escalate = mutation({
  args: {
    tenant: v.optional(v.string()),
    sessionId: v.string(),
    reason: v.string(),
    question: v.string(),
    contact: v.optional(v.string()),
    channel: v.optional(v.string()),
  },
  handler: async (ctx, a) => {
    await ctx.db.insert("escalations", {
      tenant: a.tenant ?? "omh",
      sessionId: a.sessionId,
      reason: a.reason,
      question: a.question,
      contact: a.contact,
      channel: a.channel ?? "chat",
      at: now(),
      handled: false,
    });

    /* An escalation used to end here: a row nobody could answer from. It now
       also puts the conversation in the handover queue, so a person can pick
       it up in the dashboard and reply while the visitor is still on the page.
       See handover.ts. Written inline rather than by calling handover.request
       because one mutation cannot call another; the state words are the same. */
    const channel = a.channel ?? "chat";
    const s = await ctx.db
      .query("sessions")
      .withIndex("by_session", (i) => i.eq("sessionId", a.sessionId))
      .first();
    /* A conversation a person is already handling stays "live": a second
       unanswered question must not make it look unclaimed again. */
    if (s) {
      if (s.handover !== "live") {
        await ctx.db.patch(s._id, { handover: "waiting", handoverAt: now(), lastSeenAt: now() });
      }
    } else {
      await ctx.db.insert("sessions", {
        sessionId: a.sessionId,
        channel,
        startedAt: now(),
        lastSeenAt: now(),
        handover: "waiting",
        handoverAt: now(),
      });
    }
    await ctx.db.insert("messages", {
      sessionId: a.sessionId,
      role: "system",
      channel,
      text: "Passed to a person: " + a.reason.slice(0, 300),
      at: now(),
    });

    return {
      ok: true,
      message: "Sent to the team. They will pick it up and come back to you.",
    };
  },
});

/* ------------------------------------------------------- notifications */

/* A booking, a hot lead or an escalation is useless sitting in a database
   nobody opens. These two let n8n pull what is new and record that it has been
   passed on, so nothing is sent twice and nothing is missed. */
export const pendingNotifications = query({
  args: {},
  handler: async (ctx) => {
    const fresh = <T extends { notified?: boolean }>(rows: T[]) =>
      rows.filter((r) => r.notified !== true);

    const [leads, bookings, escalations] = await Promise.all([
      ctx.db.query("leads").withIndex("by_at").order("desc").take(50),
      ctx.db.query("bookings").withIndex("by_date").order("desc").take(50),
      ctx.db.query("escalations").withIndex("by_at").order("desc").take(50),
    ]);

    return {
      /* sessionId is carried through so the smoke test can clear the rows it
         created itself and nothing else. Without it the only way to tidy up was
         to match on name or phone, which could also clear a real enquiry. */
      bookings: fresh(bookings).map((b) => ({
        id: b._id, sessionId: b.sessionId, tenant: b.tenant ?? "omh",
        reference: b.reference, name: b.name, phone: b.phone,
        email: b.email ?? null, service: b.service,
        date: b.preferredDate, time: b.preferredTime,
        notes: b.notes ?? null, channel: b.channel,
      })),
      leads: fresh(leads).map((l) => ({
        id: l._id, sessionId: l.sessionId, tenant: l.tenant ?? "omh", name: l.name, phone: l.phone ?? null, email: l.email ?? null,
        company: l.company ?? null, service: l.service ?? null,
        budget: l.budget ?? null, message: l.message ?? null,
        hot: l.hot, channel: l.channel,
      })),
      escalations: fresh(escalations).map((e) => ({
        id: e._id, sessionId: e.sessionId, tenant: e.tenant ?? "omh", reason: e.reason, question: e.question,
        contact: e.contact ?? null, channel: e.channel,
      })),
    };
  },
});

export const markNotified = mutation({
  args: {
    bookings: v.optional(v.array(v.id("bookings"))),
    leads: v.optional(v.array(v.id("leads"))),
    escalations: v.optional(v.array(v.id("escalations"))),
  },
  handler: async (ctx, a) => {
    let n = 0;
    for (const id of a.bookings ?? []) { await ctx.db.patch(id, { notified: true }); n++; }
    for (const id of a.leads ?? []) { await ctx.db.patch(id, { notified: true }); n++; }
    for (const id of a.escalations ?? []) { await ctx.db.patch(id, { notified: true }); n++; }
    return { marked: n };
  },
});

/* ---------------------------------------------------------------- dashboard */

export const recent = query({
  args: {},
  handler: async (ctx) => {
    const [leads, bookings, escalations] = await Promise.all([
      ctx.db.query("leads").withIndex("by_at").order("desc").take(25),
      ctx.db.query("bookings").withIndex("by_date").order("desc").take(25),
      ctx.db.query("escalations").withIndex("by_at").order("desc").take(25),
    ]);
    return { leads, bookings, escalations };
  },
});

/* Every chat session with its message count and the last thing said, which is
   what the dashboard's Chats screen lists. Written as one query rather than a
   session list plus a transcript call per row: 50 round trips to draw one
   table was the reason the screen had nothing to show. */
export const conversations = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, { limit }) => {
    const take = Math.min(limit ?? 50, 200);
    const sessions = (await ctx.db.query("sessions").collect())
      .sort((a, b) => b.lastSeenAt - a.lastSeenAt)
      .slice(0, take);

    const rows = await Promise.all(
      sessions.map(async (s) => {
        const [recent, profile] = await Promise.all([
          ctx.db
            .query("messages")
            .withIndex("by_session_at", (i) => i.eq("sessionId", s.sessionId))
            .order("desc")
            .take(50),
          ctx.db
            .query("profiles")
            .withIndex("by_session", (i) => i.eq("sessionId", s.sessionId))
            .first(),
        ]);
        const first = recent[recent.length - 1];
        return {
          sessionId: s.sessionId,
          channel: s.channel,
          startedAt: s.startedAt,
          lastSeenAt: s.lastSeenAt,
          pageUrl: s.pageUrl ?? null,
          retellCallId: s.retellCallId ?? null,
          handover: s.handover ?? null,
          /* Capped at 50: this is a count of what is shown, and the figure is
             labelled as such on the page rather than implying a total. */
          messages: recent.length,
          turns: recent.filter((m) => m.role === "user").length,
          name: profile?.name ?? null,
          email: profile?.email ?? null,
          phone: profile?.phone ?? null,
          /* The visitor's opening line says more about what the chat was for
             than the last message, which is often the assistant signing off. */
          opened: first ? first.text.slice(0, 200) : null,
          lastRole: recent[0]?.role ?? null,
          lastText: recent[0] ? recent[0].text.slice(0, 200) : null,
        };
      }),
    );
    return { sessions: rows };
  },
});

export const counts = query({
  args: {},
  handler: async (ctx) => {
    const kb = await ctx.db.query("kb").collect();
    const packages = await ctx.db.query("packages").collect();
    return { kb: kb.length, packages: packages.length };
  },
});

/* Adding the tenant filter to the search index left every row written before it
   with an undefined tenant, which an exact-match filter never returns. One off,
   run once, kept so the next person can see what happened. */
export const backfillTenant = mutation({
  args: { tenant: v.string() },
  handler: async (ctx, { tenant }) => {
    let kb = 0;
    for (const r of await ctx.db.query("kb").collect()) {
      if (r.tenant === undefined) { await ctx.db.patch(r._id, { tenant }); kb++; }
    }
    let pk = 0;
    for (const r of await ctx.db.query("packages").collect()) {
      if (r.tenant === undefined) { await ctx.db.patch(r._id, { tenant }); pk++; }
    }
    return { kb, packages: pk, tenant };
  },
});
