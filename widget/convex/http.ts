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
    
      attachment: b.attachment || undefined,}),
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
      sourceChannel: b.sourceChannel || b.source_channel || undefined,
      attribution: b.attribution || undefined,
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

/* The routes below carry no secret, because the caller is the visitor's own
   browser and a secret shipped to a browser is not a secret. What stands in
   for one is the pair of random ids that browser holds: the session id in
   sessionStorage and the visitor id in localStorage, both now 16 bytes from
   `crypto.getRandomValues`.

   `publicRoute` only checks that a session id is PRESENT. It cannot know
   whose it is, so **every handler below is responsible for its own scoping**
   and the ones that read anything check the pair. `/visitor/history` was
   written against this comment rather than against that fact: it read on
   the visitor id alone, and presenting somebody else's returned their whole
   conversation. See visitors.historyForVisitor and visitor-auth.test.ts.

   CORS is not a control here. It stops a BROWSER on another origin reading
   the reply; the handler still runs, and curl is not a browser. Anything
   these routes must not give away has to be refused by the handler. */
const ALLOWED = [
  "https://onlinemarketinghelp.co.uk",
  "https://www.onlinemarketinghelp.co.uk",
  "https://ohm-assistant-online-marketing-help.vercel.app",
  "http://localhost:3000",
  /* Where the site runs when 3000 is taken by another project. */
  "http://localhost:3100",
  "http://localhost:3111",
  /* web/embed/test/verify.mjs, which serves the built embed on a fixed port
     so the widget can be driven in a real browser. n8n's own allow-list has
     carried this one for a while; this list did not, so the harness could
     reach the chat webhook and not the visitor routes. */
  "http://localhost:4477",
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

/* Called once per page load, before anything is typed. It ties this visit to
   the person and says whether we have met them before, which is what stops a
   returning visitor becoming a second lead. See visitors.ts. */
http.route({ path: "/visitorHello", method: "OPTIONS", handler: preflight });
http.route({
  path: "/visitorHello",
  method: "POST",
  handler: publicRoute(async (ctx, b) =>
    ctx.runMutation(api.visitors.hello, {
      sessionId: String(b.sessionId ?? b.session_id),
      visitorId: String(b.visitorId ?? b.visitor_id ?? ""),
      channel: b.channel || undefined,
      pageUrl: b.pageUrl || b.page_url || undefined,
      attribution: b.attribution || undefined,
    }),
  ),
});

/* Their own conversation, so a returning visitor opens the panel and finds
   it where they left it. Keyed on the visitor id, which is what survives a
   closed tab; see visitors.historyForVisitor for why that and not the
   session. */
http.route({ path: "/visitor/history", method: "OPTIONS", handler: preflight });
http.route({
  path: "/visitor/history",
  method: "POST",
  handler: publicRoute(async (ctx, b) =>
    ctx.runQuery(api.visitors.historyForVisitor, {
      visitorId: String(b.visitorId ?? b.visitor_id ?? ""),
      /* Passed through and CHECKED against the visitor id, in the query.
         The guard below only ensures a session id is present; it does not
         and cannot know whose it is. */
      sessionId: String(b.sessionId ?? b.session_id ?? ""),
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

/* What the assistant should know about this person before it answers: their
   name, what they wanted last time, how many times they have been here. */
http.route({
  path: "/profileForSession",
  method: "POST",
  handler: route(async (ctx, b) =>
    ctx.runQuery(api.visitors.profileForSession, { sessionId: String(b.sessionId ?? "") }),
  ),
});

http.route({
  path: "/visitorConversations",
  method: "POST",
  handler: route(async (ctx, b) =>
    ctx.runQuery(api.visitors.conversationsForVisitor, {
      visitorId: String(b.visitorId ?? ""),
    }),
  ),
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

/* ------------------------------------------------------------- routing

   The lead routing engine. n8n is the only caller: `07-router` enrols,
   `08-sequence-worker` claims and completes, `09-twilio-inbound` records
   replies and opt-outs. Every one of these is behind the same shared secret
   as the rest of the file.

   Nothing here sends anything. Convex renders the message and hands it back;
   the provider call stays in n8n where it is visible and re-runnable.
   ------------------------------------------------------------------------ */

http.route({
  path: "/router/enrol",
  method: "POST",
  handler: route(async (ctx, b) =>
    ctx.runMutation(api.routing.enrol, {
      leadId: b.leadId,
      route: String(b.route ?? ""),
      sessionId: b.sessionId || undefined,
    }),
  ),
});

http.route({
  path: "/sequence/claimDue",
  method: "POST",
  handler: route(async (ctx, b) =>
    ctx.runMutation(api.routing.claimDue, {
      limit: b.limit ? Number(b.limit) : undefined,
      leaseMs: b.leaseMs ? Number(b.leaseMs) : undefined,
    }),
  ),
});

http.route({
  path: "/sequence/completeStep",
  method: "POST",
  handler: route(async (ctx, b) =>
    ctx.runMutation(api.routing.completeStep, {
      sequenceId: b.sequenceId,
      leaseToken: String(b.leaseToken ?? ""),
      outcome: String(b.outcome ?? ""),
      reason: b.reason || undefined,
    }),
  ),
});

http.route({
  path: "/sequence/stop",
  method: "POST",
  handler: route(async (ctx, b) =>
    ctx.runMutation(api.routing.stopSequences, {
      leadId: b.leadId,
      reason: String(b.reason ?? "manual"),
    }),
  ),
});

http.route({
  path: "/sequence/board",
  method: "POST",
  handler: route(async (ctx, b) =>
    ctx.runQuery(api.routing.sequenceBoard, {
      limit: b.limit ? Number(b.limit) : undefined,
    }),
  ),
});

http.route({
  path: "/backfillKeys",
  method: "POST",
  handler: route(async (ctx, b) =>
    ctx.runMutation(api.routing.backfillKeys, {
      limit: b.limit ? Number(b.limit) : undefined,
    }),
  ),
});

http.route({
  path: "/confirmations/pending",
  method: "POST",
  handler: route(async (ctx, b) =>
    ctx.runMutation(api.routing.pendingConfirmations, {
      limit: b.limit ? Number(b.limit) : undefined,
    }),
  ),
});

http.route({
  path: "/confirmations/mark",
  method: "POST",
  handler: route(async (ctx, b) =>
    ctx.runMutation(api.routing.markConfirmationSent, { bookingId: b.bookingId }),
  ),
});

http.route({
  path: "/touch/record",
  method: "POST",
  handler: route(async (ctx, b) =>
    ctx.runMutation(api.routing.recordTouch, {
      leadId: b.leadId || undefined,
      sessionId: b.sessionId || undefined,
      direction: String(b.direction ?? "out"),
      channel: String(b.channel ?? ""),
      route: b.route || undefined,
      step: b.step !== undefined && b.step !== null ? Number(b.step) : undefined,
      status: String(b.status ?? "sent"),
      providerId: b.providerId || undefined,
      body: b.body || undefined,
      error: b.error || undefined,
      idempotencyKey: b.idempotencyKey || undefined,
    }),
  ),
});

/* Twilio and Retell both report delivery later, on their own callback. */
http.route({
  path: "/touch/status",
  method: "POST",
  handler: route(async (ctx, b) =>
    ctx.runMutation(api.routing.updateTouchStatus, {
      providerId: String(b.providerId ?? ""),
      status: String(b.status ?? ""),
      error: b.error || undefined,
    }),
  ),
});

/* ------------------------------------------------------------- consent */

http.route({
  path: "/consent/log",
  method: "POST",
  handler: route(async (ctx, b) =>
    ctx.runMutation(api.routing.logConsent, {
      leadId: b.leadId || undefined,
      phoneKey: b.phoneKey || undefined,
      emailKey: b.emailKey || undefined,
      kind: String(b.kind ?? ""),
      action: String(b.action ?? ""),
      basis: b.basis || undefined,
      evidence: b.evidence || undefined,
      source: b.source || undefined,
      by: b.by || undefined,
    }),
  ),
});

http.route({
  path: "/consent/check",
  method: "POST",
  handler: route(async (ctx, b) =>
    ctx.runQuery(api.routing.checkSendable, {
      leadId: b.leadId,
      channel: String(b.channel ?? ""),
      route: b.route || undefined,
    }),
  ),
});

/* The inbound STOP lands here. It both lists them and stops anything in
   flight: recording the opt-out without stopping the sequence would let the
   next step go out, which is exactly what they just asked us not to do. */
http.route({
  path: "/suppress/add",
  method: "POST",
  handler: route(async (ctx, b) =>
    ctx.runMutation(api.routing.suppress, {
      key: String(b.key ?? ""),
      kind: String(b.kind ?? "phone"),
      reason: String(b.reason ?? "manual"),
      note: b.note || undefined,
    }),
  ),
});

http.route({
  path: "/suppress/check",
  method: "POST",
  handler: route(async (ctx, b) =>
    ctx.runQuery(api.routing.isSuppressed, {
      key: String(b.key ?? ""),
      kind: b.kind || undefined,
    }),
  ),
});

/* ------------------------------------------------- the off switch, reading */

http.route({
  path: "/settings/outbound",
  method: "POST",
  handler: route(async (ctx, b) => {
    /* One route for both, because the dashboard reads it on every render and
       writes it from one button. `enabled` present means write. */
    if (typeof b.enabled === "boolean") {
      return await ctx.runMutation(api.routing.setOutbound, {
        enabled: b.enabled,
        by: b.by || undefined,
      });
    }
    return await ctx.runQuery(api.routing.outboundEnabled, {});
  }),
});

http.route({
  path: "/lead/outcome",
  method: "POST",
  handler: route(async (ctx, b) =>
    ctx.runMutation(api.routing.setOutcome, {
      leadId: b.leadId,
      outcome: String(b.outcome ?? ""),
      valueGbp: b.valueGbp !== undefined && b.valueGbp !== null && b.valueGbp !== ""
        ? Number(b.valueGbp)
        : undefined,
      lostReason: b.lostReason || undefined,
      by: b.by || undefined,
    }),
  ),
});

http.route({
  path: "/inbox/feed",
  method: "POST",
  handler: route(async (ctx, b) =>
    ctx.runQuery(api.routing.inboxFeed, {
      limit: b.limit ? Number(b.limit) : undefined,
      sinceMs: b.sinceMs ? Number(b.sinceMs) : undefined,
    }),
  ),
});

http.route({
  path: "/lead/find",
  method: "POST",
  handler: route(async (ctx, b) =>
    ctx.runQuery(api.routing.findLead, {
      phone: b.phone || b.From || b.from || undefined,
      email: b.email || undefined,
    }),
  ),
});

http.route({
  path: "/lead/timeline",
  method: "POST",
  handler: route(async (ctx, b) =>
    ctx.runQuery(api.routing.leadTimeline, {
      leadId: b.leadId,
      limit: b.limit ? Number(b.limit) : undefined,
    }),
  ),
});

http.route({
  path: "/stats/channels",
  method: "POST",
  handler: route(async (ctx, b) =>
    ctx.runQuery(api.routing.channelFacts, {
      sinceMs: b.sinceMs ? Number(b.sinceMs) : undefined,
      limit: b.limit ? Number(b.limit) : undefined,
    }),
  ),
});

http.route({
  path: "/lead/outcome/many",
  method: "POST",
  handler: route(async (ctx, b) =>
    ctx.runMutation(api.routing.setOutcomeMany, {
      leadIds: Array.isArray(b.leadIds) ? b.leadIds : [],
      outcome: String(b.outcome ?? ""),
      by: b.by || undefined,
    }),
  ),
});

/* ---------------------------------------------------------------- campaigns

   A deliberate run: reactivation, mostly. `11-reactivation` creates one,
   enrols the list in pages of a hundred, and sends the first message inline
   the same way the router does for an enquiry. The dashboard reads the
   report. */

http.route({
  path: "/campaign/create",
  method: "POST",
  handler: route(async (ctx, b) =>
    ctx.runMutation(api.campaigns.create, {
      name: String(b.name ?? ""),
      kind: b.kind || undefined,
      route: b.route || undefined,
      audience: b.audience || undefined,
      consentBasis: b.consentBasis || undefined,
      note: b.note || undefined,
      intended:
        b.intended !== undefined && b.intended !== null && b.intended !== ""
          ? Number(b.intended)
          : undefined,
      by: b.by || undefined,
    }),
  ),
});

http.route({
  path: "/campaign/enrol",
  method: "POST",
  handler: route(async (ctx, b) =>
    ctx.runMutation(api.campaigns.enrolBatch, {
      campaignId: b.campaignId,
      leadIds: Array.isArray(b.leadIds) ? b.leadIds : [],
    }),
  ),
});

http.route({
  path: "/campaign/status",
  method: "POST",
  handler: route(async (ctx, b) =>
    ctx.runMutation(api.campaigns.setStatus, {
      campaignId: b.campaignId,
      status: String(b.status ?? ""),
      by: b.by || undefined,
    }),
  ),
});

/* Its own route rather than `status: "stopped"`, because stopping a campaign
   has to stop the queued steps as well. Two routes would let a caller set the
   status and leave the texts going out. */
http.route({
  path: "/campaign/stop",
  method: "POST",
  handler: route(async (ctx, b) =>
    ctx.runMutation(api.campaigns.stop, {
      campaignId: b.campaignId,
      by: b.by || undefined,
    }),
  ),
});

http.route({
  path: "/campaign/list",
  method: "POST",
  handler: route(async (ctx, b) =>
    ctx.runQuery(api.campaigns.list, {
      limit: b.limit ? Number(b.limit) : undefined,
    }),
  ),
});

http.route({
  path: "/campaign/report",
  method: "POST",
  handler: route(async (ctx, b) =>
    ctx.runQuery(api.campaigns.report, { campaignId: b.campaignId }),
  ),
});

http.route({
  path: "/settings/spend",
  method: "POST",
  handler: route(async (ctx, b) => {
    /* One route for both, like /settings/outbound: the dashboard reads it on
       every render of the allocation section and writes it from one cell. */
    if (b.channel !== undefined) {
      return await ctx.runMutation(api.routing.setChannelSpend, {
        channel: String(b.channel),
        pounds:
          b.pounds === null || b.pounds === "" || b.pounds === undefined
            ? null
            : Number(b.pounds),
        by: b.by || undefined,
      });
    }
    return await ctx.runQuery(api.routing.channelSpend, {});
  }),
});

/* ------------------------------------------------------- attachments

   One door today, two planned.

   The widget uploads bytes straight to Convex storage with a short-lived
   URL, so a photo never passes through n8n or this file. The file is then
   judged on the bytes that actually arrived, in attachments.ts, which is
   the only check that counts: the browser-side one is advice, and the
   upload URL is an ordinary endpoint anyone can PUT to.

   **The Meta door is not built.** `checkRemote` in gates/attachments.js
   has its assertions, including the SSRF host check, and nothing calls it:
   there is no `10-meta` workflow, because there is no Meta app yet. The
   route below (`/attachment/url`, secret-gated) is what that workflow will
   use and has no caller today. Both are kept rather than deleted because
   the assertions are the design and re-deriving them later is how the host
   check gets left out. Neither is a shipped path, and this comment used to
   describe them as though they were. */

http.route({
  path: "/attachment/url",
  method: "POST",
  handler: route(async (ctx) => ({ url: await ctx.storage.generateUploadUrl() })),
});

/* The visitor's door. No secret, because a public page cannot keep one, so
   these two are rate limited and the file is judged on its real bytes after
   it lands. See attachments.ts, which is where that happens. */
http.route({ path: "/visitor/attachment/url", method: "OPTIONS", handler: preflight });
http.route({
  path: "/visitor/attachment/url",
  method: "POST",
  handler: publicRoute(async (ctx, b) =>
    ctx.runMutation(api.attachments.uploadUrl, {
      sessionId: String(b.sessionId ?? b.session_id),
    }),
  ),
});

http.route({ path: "/visitor/attachment/attach", method: "OPTIONS", handler: preflight });
http.route({
  path: "/visitor/attachment/attach",
  method: "POST",
  handler: publicRoute(async (ctx, b) =>
    ctx.runAction(api.attachments.attach, {
      sessionId: String(b.sessionId ?? b.session_id),
      storageId: b.storageId,
      kind: b.kind || undefined,
      type: b.type || undefined,
      name: b.name || undefined,
      text: b.text || undefined,
      pageUrl: b.pageUrl || b.page_url || undefined,
    }),
  ),
});

/* A URL for a stored file, for n8n. `01-chat` has a storage id and needs to
   show the picture to a vision model; the widget must not hand over a URL,
   because a workflow fetching an address a stranger chose is the forgery
   `checkRemote` exists to stop. The query refuses an id that is not already
   in a conversation. */
http.route({
  path: "/attachment/urlFor",
  method: "POST",
  handler: route(async (ctx, b) =>
    ctx.runQuery(api.attachments.urlFor, { storageId: b.storageId }),
  ),
});

/* There is deliberately no PUBLIC route for reading one back. The dashboard
   gets a URL for each attachment from `/handover/thread`, which already
   knows which messages have one; a second route per photo would be the same
   answer, fetched again, behind the same secret. */

export default http;