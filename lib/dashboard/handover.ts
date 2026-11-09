import "server-only";
import { isTestSession } from "./test-rows";

/* =========================================================================
   Handover: the queue of conversations the assistant could not finish, and
   the thread a person answers them in.

   This talks to the widget's Convex HTTP layer (cool-ferret-103.convex.site)
   rather than to its public query API, because these routes write as well as
   read and are behind the shared secret. The secret is read from the server
   environment and never reaches the browser: every call in here runs in a
   server action or a server component.
   ========================================================================= */

const SITE = process.env.OHM_WIDGET_CONVEX_SITE || "https://cool-ferret-103.convex.site";
const SECRET = process.env.OHM_WIDGET_SECRET || "";

export type InboxRow = {
  sessionId: string;
  channel: string;
  state: "waiting" | "live" | "closed";
  since: number;
  startedAt: number;
  lastSeenAt: number;
  takenBy: string | null;
  pageUrl: string | null;
  name: string | null;
  sourceChannel?: string | null;
  service?: string | null;
  hot?: boolean;
  leadId?: string | null;
  email: string | null;
  phone: string | null;
  company: string | null;
  reason: string | null;
  question: string | null;
  openQuestions: number;
  lastRole: string | null;
  lastText: string | null;
  lastAt: number | null;
  awaitingReply: boolean;
};

export type ThreadMsg = { role: string; text: string; at: number };

export type Thread = {
  sessionId: string;
  found: boolean;
  state: "none" | "waiting" | "live" | "closed";
  channel: string;
  startedAt: number | null;
  lastSeenAt: number | null;
  since: number | null;
  takenBy: string | null;
  pageUrl: string | null;
  retellCallId: string | null;
  visitorId: string | null;
  profile: {
    name: string | null;
    email: string | null;
    phone: string | null;
    company: string | null;
    website: string | null;
    budget: string | null;
    interestedIn: string[];
    notes: string | null;
  } | null;
  messages: ThreadMsg[];
  questions: {
    id: string;
    reason: string;
    question: string;
    contact: string | null;
    at: number;
    handled: boolean;
  }[];
  /** What the conversation produced, so a transcript does not have to be read
      to find out whether anything came of it. */
  leads: {
    id: string;
    name: string;
    email: string | null;
    phone: string | null;
    company: string | null;
    service: string | null;
    budget: string | null;
    message: string | null;
    hot: boolean;
    outcome: string | null;
    valueGbp: number | null;
    channel: string;
    at: number;
  }[];
  bookings: {
    id: string;
    reference: string;
    name: string;
    phone: string;
    service: string;
    preferredDate: string;
    preferredTime: string;
    status: string;
    at: number;
  }[];
};

/** Null on any failure, so a caller distinguishes "could not reach it" from
    "nothing waiting" and can say which on the page. */
async function call<T>(path: string, body: Record<string, unknown> = {}): Promise<T | null> {
  if (!SECRET) return null;
  try {
    const res = await fetch(`${SITE}${path}`, {
      method: "POST",
      headers: { "content-type": "application/json", "x-ohm-secret": SECRET },
      body: JSON.stringify(body),
      /* A queue is the one screen that must never be cached: a person reading
         a thirty second old copy answers a visitor who has already left. */
      cache: "no-store",
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

/** True when the dashboard has what it needs to answer, not just to read. */
export const canReply = Boolean(SECRET);

export async function getInbox() {
  const d = await call<{
    rows: InboxRow[];
    waiting: number;
    live: number;
    orphanQuestions: number;
  }>("/handover/inbox", { limit: 60 });

  if (!d) return { rows: [], waiting: 0, live: 0, orphanQuestions: 0, reachable: false };

  /* Our own smoke tests are not someone waiting for an answer. Sorting them to
     the top of a queue a person works through would be worse here than on a
     list, so they are dropped and counted. */
  const rows = d.rows.filter((r) => !isTestSession(r.sessionId));
  return {
    rows,
    waiting: rows.filter((r) => r.state === "waiting").length,
    live: rows.filter((r) => r.state === "live").length,
    orphanQuestions: d.orphanQuestions,
    hidden: d.rows.length - rows.length,
    reachable: true,
  };
}

export async function getThread(sessionId: string) {
  return await call<Thread>("/handover/thread", { sessionId, limit: 300 });
}

export type VisitorSession = {
  sessionId: string;
  channel: string;
  startedAt: number;
  lastSeenAt: number;
  handover: string | null;
  messages: number;
  opened: string | null;
};

/** Every conversation this person has had, newest first. Empty for a session
    recorded before visitors existed, which is not an error. */
export async function getVisitorConversations(visitorId: string) {
  const d = await call<{ sessions: VisitorSession[] }>("/visitorConversations", { visitorId });
  return d?.sessions ?? [];
}

export async function claim(sessionId: string, by: string) {
  return await call<{ ok: boolean; error?: string; takenBy?: string }>("/handover/claim", {
    sessionId,
    by,
  });
}

export async function reply(sessionId: string, text: string, by: string) {
  return await call<{ ok: boolean; error?: string }>("/handover/reply", { sessionId, text, by });
}

export async function release(sessionId: string, note?: string) {
  return await call<{ ok: boolean; marked?: number }>("/handover/release", { sessionId, note });
}

/** "4 minutes", "2 hours", for how long someone has been waiting. */
export function ago(ms: number): string {
  const secs = Math.max(0, Math.round((Date.now() - ms) / 1000));
  if (secs < 60) return "just now";
  const mins = Math.round(secs / 60);
  if (mins < 60) return `${mins} minute${mins === 1 ? "" : "s"} ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.round(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}
