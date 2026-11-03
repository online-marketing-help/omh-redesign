import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";

/* =========================================================================
   The only way into this deployment from outside. n8n calls these; the Retell
   agent never calls Convex directly, it goes through n8n so the tool token is
   checked in one place.

   Every route requires the x-ohm-secret header. Convex HTTP actions are public
   URLs: without this check, anyone who finds the .convex.site address could
   read the lead list.
   ========================================================================= */

const http = httpRouter();

function unauthorized() {
  return new Response(JSON.stringify({ ok: false, error: "unauthorized" }), {
    status: 401,
    headers: { "content-type": "application/json" },
  });
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function authed(req: Request): boolean {
  const expected = process.env.OHM_WIDGET_SECRET;
  if (!expected) return false;
  const got = req.headers.get("x-ohm-secret");
  return typeof got === "string" && got === expected;
}

/** Wraps a handler with the secret check and uniform error shape. */
function route(
  handler: (ctx: any, body: any) => Promise<unknown>,
) {
  return httpAction(async (ctx, req) => {
    if (!authed(req)) return unauthorized();
    let body: any = {};
    try {
      body = await req.json();
    } catch {
      body = {};
    }
    try {
      const out = await handler(ctx, body);
      return json(out);
    } catch (e: any) {
      /* Never leak a stack trace to a caller that might be a voice agent
         reading it out loud. */
      return json({ ok: false, error: String(e?.message ?? e).slice(0, 300) }, 500);
    }
  });
}

/* ------------------------------------------------------------- knowledge */

http.route({
  path: "/searchKB",
  method: "POST",
  handler: route(async (ctx, b) =>
    ctx.runQuery(api.functions.searchKb, {
      q: String(b.q ?? b.query ?? ""),
      kind: b.kind || undefined,
      limit: b.limit ? Number(b.limit) : undefined,
      tenant: b.tenant || undefined,
    }),
  ),
});

http.route({
  path: "/getPackages",
  method: "POST",
  handler: route(async (ctx, b) =>
    ctx.runQuery(api.functions.getPackages, {
      group: b.group || undefined,
      q: b.q || b.query || undefined,
      tenant: b.tenant || undefined,
    }),
  ),
});

/* ------------------------------------------------------------- conversation */

http.route({
  path: "/logMessage",
  method: "POST",
  handler: route(async (ctx, b) =>
    ctx.runMutation(api.functions.logMessage, {
      tenant: b.tenant || undefined,
      sessionId: String(b.sessionId),
      role: String(b.role ?? "user"),
      text: String(b.text ?? ""),
      channel: b.channel || undefined,
      pageUrl: b.pageUrl || undefined,
      retellCallId: b.retellCallId || undefined,
    }),
  ),
});

http.route({
  path: "/getTranscript",
  method: "POST",
  handler: route(async (ctx, b) =>
    ctx.runQuery(api.functions.getTranscript, {
      sessionId: String(b.sessionId),
      limit: b.limit ? Number(b.limit) : undefined,
    }),
  ),
});

http.route({
  path: "/getProfile",
  method: "POST",
  handler: route(async (ctx, b) =>
    ctx.runQuery(api.functions.getProfile, { sessionId: String(b.sessionId) }),
  ),
});

http.route({
  path: "/updateProfile",
  method: "POST",
  handler: route(async (ctx, b) =>
    ctx.runMutation(api.functions.updateProfile, {
      sessionId: String(b.sessionId),
      name: b.name || undefined,
      email: b.email || undefined,
      phone: b.phone || undefined,
      company: b.company || undefined,
      website: b.website || undefined,
      interestedIn: Array.isArray(b.interestedIn) ? b.interestedIn : undefined,
      budget: b.budget || undefined,
      notes: b.notes || undefined,
    }),
  ),
});

/* ------------------------------------------------------------- actions */

http.route({
  path: "/checkLimit",
  method: "POST",
  handler: route(async (ctx, b) =>
    ctx.runMutation(api.functions.checkLimit, {
      sessionId: String(b.sessionId ?? "unknown"),
      ip: b.ip || undefined,
    }),
  ),
});

http.route({
  path: "/saveLead",
  method: "POST",
  handler: route(async (ctx, b) =>
    ctx.runMutation(api.functions.saveLead, {
      tenant: b.tenant || undefined,
      sessionId: String(b.sessionId ?? "unknown"),
      name: String(b.name ?? "Unknown"),
      email: b.email || undefined,
      phone: b.phone || undefined,
      company: b.company || undefined,
      website: b.website || undefined,
      service: b.service || undefined,
      budget: b.budget || undefined,
      message: b.message || undefined,
      hot: b.hot === true || b.hot === "true",
      channel: b.channel || undefined,
    }),
  ),
});

http.route({
  path: "/bookAppointment",
  method: "POST",
  handler: route(async (ctx, b) =>
    ctx.runMutation(api.functions.bookAppointment, {
      tenant: b.tenant || undefined,
      sessionId: String(b.sessionId ?? "unknown"),
      name: String(b.name ?? ""),
      phone: String(b.phone ?? ""),
      email: b.email || undefined,
      service: String(b.service ?? "Free 30 minute consultation"),
      preferredDate: String(b.preferredDate ?? b.date ?? ""),
      preferredTime: String(b.preferredTime ?? b.time ?? ""),
      notes: b.notes || undefined,
      channel: b.channel || undefined,
    }),
  ),
});

http.route({
  path: "/manageBooking",
  method: "POST",
  handler: route(async (ctx, b) =>
    ctx.runMutation(api.functions.manageBooking, {
      reference: String(b.reference ?? ""),
      action: String(b.action ?? "lookup"),
      preferredDate: b.preferredDate || b.date || undefined,
      preferredTime: b.preferredTime || b.time || undefined,
    }),
  ),
});

http.route({
  path: "/escalate",
  method: "POST",
  handler: route(async (ctx, b) =>
    ctx.runMutation(api.functions.escalate, {
      tenant: b.tenant || undefined,
      sessionId: String(b.sessionId ?? "unknown"),
      reason: String(b.reason ?? "unspecified"),
      question: String(b.question ?? ""),
      contact: b.contact || undefined,
      channel: b.channel || undefined,
    }),
  ),
});

/* ------------------------------------------------------------- calendar leg */

http.route({
  path: "/pendingNotifications",
  method: "POST",
  handler: route(async (ctx) => ctx.runQuery(api.functions.pendingNotifications, {})),
});

http.route({
  path: "/markNotified",
  method: "POST",
  handler: route(async (ctx, b) =>
    ctx.runMutation(api.functions.markNotified, {
      bookings: b.bookings ?? [],
      leads: b.leads ?? [],
      escalations: b.escalations ?? [],
    }),
  ),
});

http.route({
  path: "/pendingCalendarSync",
  method: "POST",
  handler: route(async (ctx) => ctx.runQuery(api.functions.pendingCalendarSync, {})),
});

http.route({
  path: "/attachCalendarEvent",
  method: "POST",
  handler: route(async (ctx, b) =>
    ctx.runMutation(api.functions.attachCalendarEvent, {
      reference: String(b.reference ?? ""),
      calendarEventId: String(b.calendarEventId ?? ""),
    }),
  ),
});

/* ------------------------------------------------------------- handover */

/* Read and answered by the dashboard, which holds the secret server side and
   never ships it to a browser. See handover.ts for the states. */

http.route({
  path: "/handover/inbox",
  method: "POST",
  handler: route(async (ctx, b) =>
    ctx.runQuery(api.handover.inbox, { limit: b.limit ? Number(b.limit) : undefined }),
  ),
});

http.route({
  path: "/handover/thread",
  method: "POST",
  handler: route(async (ctx, b) =>
    ctx.runQuery(api.handover.thread, {
      sessionId: String(b.sessionId ?? ""),
      limit: b.limit ? Number(b.limit) : undefined,
    }),
  ),
});

http.route({
  path: "/handover/claim",
  method: "POST",
  handler: route(async (ctx, b) =>
    ctx.runMutation(api.handover.claim, {
      sessionId: String(b.sessionId ?? ""),
      by: b.by || undefined,
    }),
  ),
});

http.route({
  path: "/handover/reply",
  method: "POST",
  handler: route(async (ctx, b) =>
    ctx.runMutation(api.handover.reply, {
      sessionId: String(b.sessionId ?? ""),
      text: String(b.text ?? ""),
      by: b.by || undefined,
    }),
  ),
});

http.route({
  path: "/handover/release",
  method: "POST",
  handler: route(async (ctx, b) =>
    ctx.runMutation(api.handover.release, {
      sessionId: String(b.sessionId ?? ""),
      note: b.note || undefined,
    }),
  ),
});

http.route({
  path: "/handover/request",
  method: "POST",
  handler: route(async (ctx, b) =>
    ctx.runMutation(api.handover.request, {
      sessionId: String(b.sessionId ?? ""),
      reason: String(b.reason ?? "a person was asked for"),
      question: String(b.question ?? ""),
      channel: b.channel || undefined,
    }),
  ),
});

/* --------------------------------------------------- handover, visitor side */

/* The two routes below are the only ones with no secret, because the caller is
   the visitor's own browser and a secret shipped to a browser is not a secret.
   They are scoped to one session id, which the widget generated itself and
   keeps in its own sessionStorage: the visitor's capability for the visitor's
   own conversation. Neither route can read another session, list sessions, or
   return the visitor's own messages back to them.

   CORS is pinned to the sites the widget is installed on. A browser will not
   hand the response to any other origin. */
const ALLOWED = [
  "https://onlinemarketinghelp.co.uk",
  "https://www.onlinemarketinghelp.co.uk",
  "https://ohm-assistant-online-marketing-help.vercel.app",
  "http://localhost:3000",
  "http://localhost:3111",
];

function cors(req: Request): Record<string, string> {
  const origin = req.headers.get("origin") ?? "";
  if (!ALLOWED.includes(origin)) return {};
  return {
    "access-control-allow-origin": origin,
    "access-control-allow-methods": "POST, OPTIONS",
    "access-control-allow-headers": "content-type",
    "access-control-max-age": "86400",
    vary: "origin",
  };
}

/** Same shape as `route`, without the secret and with the CORS headers. */
function publicRoute(handler: (ctx: any, body: any) => Promise<unknown>) {
  return httpAction(async (ctx, req) => {
    const headers = { "content-type": "application/json", ...cors(req) };
    let body: any = {};
    try {
      body = await req.json();
    } catch {
      body = {};
    }
    /* A session id is required and is the only thing that scopes these calls,
       so a missing one is rejected rather than defaulted. */
    if (!body.sessionId && !body.session_id) {
      return new Response(JSON.stringify({ ok: false, error: "sessionId required" }), {
        status: 400,
        headers,
      });
    }
    try {
      const out = await handler(ctx, body);
      return new Response(JSON.stringify(out), { status: 200, headers });
    } catch (e: any) {
      return new Response(
        JSON.stringify({ ok: false, error: String(e?.message ?? e).slice(0, 200) }),
        { status: 500, headers },
      );
    }
  });
}

const preflight = httpAction(async (_ctx, req) => {
  const headers = cors(req);
  /* No CORS headers means the origin is not allow-listed, and the browser will
     block the real request anyway. 403 says why in the network tab. */
  return new Response(null, { status: Object.keys(headers).length ? 204 : 403, headers });
});

http.route({ path: "/visitorPoll", method: "OPTIONS", handler: preflight });
http.route({
  path: "/visitorPoll",
  method: "POST",
  handler: publicRoute(async (ctx, b) =>
    ctx.runQuery(api.handover.poll, {
      sessionId: String(b.sessionId ?? b.session_id),
      since: b.since ? Number(b.since) : undefined,
    }),
  ),
});

http.route({ path: "/visitorSay", method: "OPTIONS", handler: preflight });
http.route({
  path: "/visitorSay",
  method: "POST",
  handler: publicRoute(async (ctx, b) =>
    ctx.runMutation(api.handover.visitorSay, {
      sessionId: String(b.sessionId ?? b.session_id),
      text: String(b.text ?? b.message ?? ""),
      pageUrl: b.pageUrl || b.page_url || undefined,
    }),
  ),
});

/* ------------------------------------------------------------- seeding */

http.route({
  path: "/upsertKB",
  method: "POST",
  handler: route(async (ctx, b) =>
    ctx.runMutation(api.functions.upsertKb, { rows: b.rows ?? [], tenant: b.tenant || undefined }),
  ),
});

http.route({
  path: "/pruneKB",
  method: "POST",
  handler: route(async (ctx, b) =>
    ctx.runMutation(api.functions.pruneKb, { keep: b.keep ?? [], tenant: b.tenant || undefined }),
  ),
});

http.route({
  path: "/upsertPackages",
  method: "POST",
  handler: route(async (ctx, b) =>
    ctx.runMutation(api.functions.upsertPackages, { rows: b.rows ?? [], tenant: b.tenant || undefined }),
  ),
});

http.route({
  path: "/backfillTenant",
  method: "POST",
  handler: route(async (ctx, b) =>
    ctx.runMutation(api.functions.backfillTenant, { tenant: String(b.tenant ?? "omh") }),
  ),
});

http.route({
  path: "/counts",
  method: "POST",
  handler: route(async (ctx) => ctx.runQuery(api.functions.counts, {})),
});

http.route({
  path: "/conversations",
  method: "POST",
  handler: route(async (ctx, b) =>
    ctx.runQuery(api.functions.conversations, {
      limit: b.limit ? Number(b.limit) : undefined,
    }),
  ),
});

export default http;
