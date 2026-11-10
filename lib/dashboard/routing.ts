import "server-only";

/* =========================================================================
   The lead routing engine, read from the dashboard.

   Same door as lib/dashboard/handover.ts: the Convex HTTP routes behind the
   shared secret, called server side only. Nothing here runs in a browser, so
   the secret never leaves the server.

   Every function returns null rather than throwing. A screen that cannot
   reach Convex should say so in its own words, not blank the whole dashboard
   with an error boundary.
   ========================================================================= */

const SITE =
  process.env.OHM_WIDGET_CONVEX_SITE || "https://cool-ferret-103.convex.site";
const SECRET = process.env.OHM_WIDGET_SECRET || "";

/** Without the secret the screens still render, read-only, and say so. */
export const canWrite = Boolean(SECRET);

async function call<T>(
  path: string,
  body: Record<string, unknown> = {},
): Promise<T | null> {
  if (!SECRET) return null;
  try {
    const r = await fetch(`${SITE}${path}`, {
      method: "POST",
      headers: { "content-type": "application/json", "x-ohm-secret": SECRET },
      body: JSON.stringify(body),
      cache: "no-store",
    });
    if (!r.ok) return null;
    return (await r.json()) as T;
  } catch {
    return null;
  }
}

/* ------------------------------------------------------------------ types */

export type SequenceRow = {
  id: string;
  leadId: string;
  sessionId?: string;
  name: string | null;
  phone: string | null;
  email: string | null;
  sourceChannel: string | null;
  route: string;
  routeName: string;
  step: number;
  stepLabel: string | null;
  stepChannel: string | null;
  status: string;
  stopReason: string | null;
  nextDueAt: number | null;
  attempts: number;
  at: number;
  leased: boolean;
};

export type SequenceBoard = {
  rows: SequenceRow[];
  counts: { active: number; stopped: number; completed: number; failed: number };
  /** Convex's clock, which is the one that set every `nextDueAt`. */
  now: number;
};

export type ChannelFact = {
  sessionId?: string;
  name?: string;
  email?: string;
  sourceChannel: string;
  campaign: string | null;
  adId: string | null;
  firstAt: number;
  hot: boolean;
  status: string;
  outcome: string | null;
  valueGbp: number | null;
  firstOutAt: number | null;
  msToFirstTouch: number | null;
  firstInAt: number | null;
  msToFirstReply: number | null;
  smsOut: number;
  smsIn: number;
  emailOut: number;
  callsOut: number;
  callsAnswered: number;
  sequences: { route: string; status: string; stopReason: string | null }[];
  bookings: number;
};

export type TimelineEvent = {
  at: number;
  type: "touch" | "message" | "booking";
  direction?: "in" | "out";
  channel?: string;
  status?: string;
  route?: string;
  step?: number;
  role?: string;
  reference?: string;
  text?: string;
  error?: string;
  sessionId?: string;
};

export type LeadTimeline = {
  lead: {
    name: string;
    email?: string;
    phone?: string;
    service?: string;
    sourceChannel: string | null;
    attribution: Record<string, string | number> | null;
    smsConsent: string | null;
    emailConsent: string | null;
    automatedCallConsent: boolean | null;
    tpsCheckedAt: number | null;
    tpsListed: boolean | null;
    status: string;
    outcome: string | null;
    valueGbp: number | null;
    lostReason: string | null;
    hot: boolean;
    firstAt: number;
    at: number;
    visits: number;
    sessionId: string;
  };
  sequences: {
    id: string;
    route: string;
    step: number;
    status: string;
    stopReason: string | null;
    nextDueAt: number | null;
    attempts: number;
    at: number;
  }[];
  events: TimelineEvent[];
};

/** One person on one campaign. Never totalled in Convex: see below. */
export type CampaignPerson = {
  leadId: string;
  sequenceId: string;
  name: string;
  phone: string | null;
  email: string | null;
  sourceChannel: string | null;
  status: string;
  stopReason: string | null;
  step: number;
  enrolledAt: number;
  sent: number;
  delivered: number;
  failed: number;
  firstSentAt: number | null;
  replied: boolean;
  firstReplyAt: number | null;
  optedOut: boolean;
  hot: boolean;
  outcome: string | null;
  valueGbp: number | null;
  bookings: number;
};

export type Campaign = {
  id: string;
  name: string;
  kind: string;
  route: string;
  audience: string | null;
  consentBasis: string | null;
  note: string | null;
  status: string;
  intended: number | null;
  startedAt: number | null;
  finishedAt: number | null;
  at: number;
  by: string | null;
};

export type CampaignRow = Campaign & { people: CampaignPerson[] };

/* ------------------------------------------------------------------ reads */

export const getOutbound = () =>
  call<{ enabled: boolean; updatedAt: number | null; updatedBy: string | null }>(
    "/settings/outbound",
  );

export const getSequenceBoard = (limit = 200) =>
  call<SequenceBoard>("/sequence/board", { limit });

export const getChannelFacts = (sinceMs?: number, limit = 1000) =>
  call<{ rows: ChannelFact[]; since: number; counted: number }>(
    "/stats/channels",
    { sinceMs, limit },
  );

export type InboxItem = {
  at: number;
  channel: string;
  direction: string;
  text: string;
  who: string | null;
  sessionId: string | null;
  leadId: string | null;
  sourceChannel: string | null;
  needsPerson: boolean;
  status: string | null;
};

export const getInboxFeed = (limit = 120) =>
  call<{ items: InboxItem[]; since: number }>("/inbox/feed", { limit });

/* What each channel costs per month, as somebody typed it.

   An empty object is "nobody has typed any", which is a different fact from
   "it costs nothing" and stays different all the way to the screen. */
export const getChannelSpend = () =>
  call<{ spend: Record<string, number>; updatedAt: number | null; updatedBy: string | null }>(
    "/settings/spend",
    {},
  );

export const setChannelSpend = (channel: string, pounds: number | null, by?: string) =>
  call<{ ok: boolean; why?: string; channel?: string; pounds?: number | null }>(
    "/settings/spend",
    { channel, pounds, by },
  );

export const getLeadTimeline = (leadId: string, limit = 300) =>
  call<LeadTimeline>("/lead/timeline", { leadId, limit });

/* Rows carry every person on the campaign, not a set of totals.

   Same decision as `getChannelFacts`, and for the same reason: our own test
   rows have to come out before anything is counted, the rule for that lives
   in `lib/dashboard/test-rows.ts`, and a second copy of it in Convex would
   drift. So Convex returns facts per person and the screen filters, then
   totals, then says how many it hid. */
export const getCampaigns = (limit = 50) =>
  call<{ rows: CampaignRow[]; now: number }>("/campaign/list", { limit });

export const getCampaign = (campaignId: string) =>
  call<{ campaign: Campaign; people: CampaignPerson[]; now: number } | null>(
    "/campaign/report",
    { campaignId },
  );

export const findLead = (phone?: string, email?: string) =>
  call<{ found: boolean; leadId?: string; name?: string }>("/lead/find", {
    phone,
    email,
  });

/* ----------------------------------------------------------------- writes */

export const setOutbound = (enabled: boolean, by: string) =>
  call<{ enabled: boolean; at: number }>("/settings/outbound", { enabled, by });

export const setLeadOutcome = (
  leadId: string,
  outcome: string,
  valueGbp?: number,
  by?: string,
) =>
  call<{ ok: boolean; why?: string; outcome?: string }>("/lead/outcome", {
    leadId,
    outcome,
    valueGbp,
    by,
  });

export const setLeadOutcomes = (leadIds: string[], outcome: string, by?: string) =>
  call<{ ok: boolean; why?: string; changed?: number; refused?: string[] }>(
    "/lead/outcome/many",
    { leadIds, outcome, by },
  );

export const createCampaign = (body: {
  name: string;
  kind?: string;
  route?: string;
  audience?: string;
  consentBasis?: string;
  note?: string;
  intended?: number;
  by?: string;
}) => call<{ ok: boolean; why?: string; campaignId?: string }>("/campaign/create", body);

export const stopCampaign = (campaignId: string, by?: string) =>
  call<{ ok: boolean; why?: string; stopped?: number }>("/campaign/stop", {
    campaignId,
    by,
  });

/** Cancel, move, or record that somebody did not turn up. */
export const manageBooking = (reference: string, action: string) =>
  call<{ ok: boolean; reference?: string; status?: string; sessionId?: string; phone?: string }>(
    "/manageBooking",
    { reference, action },
  );

/** Put somebody on a route. The atomic half stays in Convex. */
export const enrol = (leadId: string, route: string, sessionId?: string) =>
  call<{ enrolled: boolean; why?: string; sequenceId?: string }>("/router/enrol", {
    leadId,
    route,
    sessionId,
  });

export const stopSequence = (leadId: string, reason = "manual") =>
  call<{ stopped: number }>("/sequence/stop", { leadId, reason });

export const addSuppression = (
  key: string,
  kind: "phone" | "email",
  reason = "manual",
  note?: string,
) => call<{ key: string; stopped: number }>("/suppress/add", { key, kind, reason, note });

/* ----------------------------------------------------------------- shared */

/* Names, wording and formatting live in ./channels because the handover queue
   is a client component and cannot import a `server-only` module. Re-exported
   here so every screen keeps one import. */
export {
  SOURCE_ORDER, sourceLabel, sourceFamily, canonicalSource, routeLabel,
  stopReasonLabel, outcomeLabel, OUTCOMES, money, when, duration, median,
} from "./channels";
