import "server-only";

/* =========================================================================
   Everything the widget itself recorded: the chats, the leads it captured,
   the appointments it booked and the questions it refused to answer.

   This reads the widget's own Convex deployment (cool-ferret-103) over its
   public query API. Only queries are called from here, never a mutation, so
   the dashboard can never change what the assistant recorded.
   ========================================================================= */

const URL_BASE = process.env.OMH_WIDGET_CONVEX_URL || "https://cool-ferret-103.convex.cloud";

export type Lead = {
  _id: string;
  sessionId: string;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  service?: string;
  budget?: string;
  message?: string;
  hot: boolean;
  channel: string;
  at: number;
  status: string;
  /* One row is one person, not one visit. Someone who chats today and comes
     back next week updates this row rather than creating a second, so these
     say how long they have been around and how often. Optional: rows captured
     before that existed carry neither. */
  visits?: number;
  firstAt?: number;
  visitorIds?: string[];
};

export type Booking = {
  _id: string;
  reference: string;
  sessionId: string;
  name: string;
  email?: string;
  phone: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
  channel: string;
  status: string;
  at: number;
};

export type Escalation = {
  _id: string;
  sessionId: string;
  reason: string;
  question: string;
  contact?: string;
  channel: string;
  at: number;
  handled: boolean;
};

async function query<T>(path: string, args: Record<string, unknown> = {}): Promise<T | null> {
  try {
    const res = await fetch(`${URL_BASE}/api/query`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ path, args, format: "json" }),
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const d = await res.json();
    /* Convex answers 200 with status:"error" for a function that threw or is
       not deployed, so the status has to be read rather than the HTTP code. */
    return d.status === "success" ? (d.value as T) : null;
  } catch {
    return null;
  }
}

/* Our own test traffic is not the client's activity, and the rule for what
   counts as ours lives in one file so every screen hides the same rows. */
export { isTestRow, isTestSession } from "./test-rows";
import { isTestRow } from "./test-rows";

export async function getWidgetData() {
  const recent = await query<{ leads: Lead[]; bookings: Booking[]; escalations: Escalation[] }>(
    "functions:recent",
  );
  const leads = (recent?.leads ?? []).filter((r) => !isTestRow(r));
  const bookings = (recent?.bookings ?? []).filter((r) => !isTestRow(r));
  const escalations = (recent?.escalations ?? []).filter((r) => !isTestRow(r));
  const hidden =
    (recent?.leads?.length ?? 0) - leads.length +
    ((recent?.bookings?.length ?? 0) - bookings.length) +
    ((recent?.escalations?.length ?? 0) - escalations.length);

  return {
    leads,
    bookings,
    escalations,
    /** How many of our own test rows were left out, to be stated on the page. */
    hidden,
    /* Null means the deployment could not be reached, which is a different
       thing from a quiet week, and the page says so rather than showing a
       confident zero. */
    reachable: recent !== null,
  };
}

export type Session = {
  sessionId: string;
  channel: string;
  startedAt: number;
  lastSeenAt: number;
  pageUrl: string | null;
  retellCallId: string | null;
  handover: string | null;
  messages: number;
  turns: number;
  name: string | null;
  email: string | null;
  phone: string | null;
  opened: string | null;
  lastRole: string | null;
  lastText: string | null;
};

/**
 * Every conversation the assistant has had, with what it was about.
 *
 * `available` is false only when the deployment cannot be reached, which is a
 * different thing from a quiet week and is said out loud on the page rather
 * than shown as a confident zero.
 */
export async function getConversations(limit = 100) {
  const rows = await query<{ sessions: Session[] }>("functions:conversations", { limit });
  const all = rows?.sessions ?? [];
  const sessions = all.filter((s) => !isTestRow({ sessionId: s.sessionId, name: s.name ?? undefined }));
  return {
    sessions,
    hidden: all.length - sessions.length,
    available: rows !== null,
  };
}

/** Hot, warm or cold, from what the assistant actually captured. */
export function temperature(lead: Lead): "hot" | "warm" | "cold" {
  if (lead.hot) return "hot";
  /* Warm is a real signal rather than a guess: they left a way to be reached
     and said what they wanted. Cold is everything else. */
  const reachable = Boolean(lead.phone || lead.email);
  const specific = Boolean(lead.service || lead.budget);
  return reachable && specific ? "warm" : "cold";
}

export const fmtDate = (ms: number) =>
  new Date(ms).toLocaleString("en-GB", {
    day: "numeric", month: "short", hour: "2-digit", minute: "2-digit",
    timeZone: "Europe/London",
  });
