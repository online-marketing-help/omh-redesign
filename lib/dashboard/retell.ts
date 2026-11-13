import "server-only";
import { isTestSession } from "./test-rows";

/* =========================================================================
   Call data for the client dashboard.

   Everything here comes from Retell, which is where the calls actually live:
   how long each one ran, what it cost, the recording, the summary and the
   transcript. None of it is stored again on our side, so there is nothing to
   keep in step and nothing to go stale.

   The key never reaches the browser. Every function in this file is server
   only, and the pages that use them are server components.

   One thing worth knowing before reading the numbers: a call carries
   `metadata.session_id`, the same id the website widget writes against its
   chat. That is what lets one visitor's typing and talking appear as a single
   conversation rather than two unrelated rows.
   ========================================================================= */

import { londonMidnight } from "./day";

const API = "https://api.retellai.com";

/** The agents whose calls belong to this dashboard. */
export const OMH_AGENTS = ["OMH Site Assistant"];

export type Call = {
  callId: string;
  agentName: string;
  sessionId: string | null;
  startedAt: number;
  durationMs: number;
  /** Retell bills in hundredths of a cent, so this is already in pounds. */
  costGbp: number;
  recordingUrl: string | null;
  summary: string | null;
  successful: boolean | null;
  pageUrl: string | null;
  disconnection: string | null;
  status: string;
};

/* What we read out of a Retell call, declared rather than left as `any`.

   Every field is optional and every one is checked at the point of use,
   because this is someone else's JSON: the shape is their decision, it has
   changed once already (the v2 list endpoints were retired), and a field
   that quietly stops arriving should produce "Unknown agent" or a null, not
   a crash halfway down a dashboard page. Declaring it this way means a typo
   in a field name is a compile error here instead of an `undefined` on
   screen, which is the whole reason for not writing `any`. */
type RawCall = {
  call_id?: string;
  agent_name?: string;
  start_timestamp?: number;
  duration_ms?: number;
  recording_url?: string | null;
  disconnection_reason?: string | null;
  call_status?: string;
  transcript?: string;
  call_cost?: { combined_cost?: number };
  metadata?: { session_id?: string; page_url?: string };
  call_analysis?: { call_summary?: string; call_successful?: boolean };
  transcript_object?: RawTurn[];
};

type RawTurn = {
  role?: string;
  content?: string;
  words?: { start?: number }[];
};

function toCall(c: RawCall): Call {
  const meta = c.metadata || {};
  const analysis = c.call_analysis || {};
  return {
    callId: c.call_id || "",
    agentName: c.agent_name || "Unknown agent",
    sessionId: meta.session_id || null,
    startedAt: c.start_timestamp || 0,
    durationMs: c.duration_ms || 0,
    /* combined_cost is in hundredths of a US cent. We show it as a cost in
       pounds only to the nearest penny, and the dashboard labels it as the
       platform's own figure rather than an invoice. */
    costGbp: ((c.call_cost || {}).combined_cost || 0) / 10000,
    recordingUrl: c.recording_url || null,
    summary: analysis.call_summary || null,
    successful: typeof analysis.call_successful === "boolean" ? analysis.call_successful : null,
    pageUrl: meta.page_url || null,
    disconnection: c.disconnection_reason || null,
    status: c.call_status || "unknown",
  };
}

async function retell(path: string, init?: RequestInit) {
  const key = process.env.RETELL_API_KEY;
  if (!key) throw new Error("RETELL_API_KEY is not set");
  const res = await fetch(API + path, {
    ...init,
    headers: { authorization: `Bearer ${key}`, "content-type": "application/json", ...(init?.headers || {}) },
    /* Short cache: a sales meeting wants today's calls, not a snapshot from
       an hour ago, but it should not hammer the API on every repaint. */
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`Retell ${path} returned ${res.status}`);
  return res.json();
}

/**
 * Calls for the given agents, newest first.
 *
 * The legacy list endpoints were retired in June 2026; v3 is the current one
 * and it paginates with `pagination_key` rather than an offset.
 */
export async function getCalls(agents: string[] = OMH_AGENTS, limit = 200): Promise<Call[]> {
  const d = await retell("/v3/list-calls", {
    method: "POST",
    body: JSON.stringify({ limit }),
  });
  const items: RawCall[] = d.items || [];
  return items
    .map(toCall)
    .filter((c) => agents.some((a) => c.agentName.startsWith(a)))
    .sort((a, b) => b.startedAt - a.startedAt);
}

/** One call with its transcript. The list endpoint does not carry it. */
export async function getCall(callId: string) {
  const c: RawCall = await retell(`/v2/get-call/${callId}`);
  return {
    ...toCall(c),
    transcript: c.transcript || "",
    turns: (c.transcript_object || []).map((t) => ({
      role: t.role === "agent" ? "agent" : "caller",
      text: String(t.content || ""),
      at: Number(t.words?.[0]?.start ?? 0),
    })),
  };
}

/* Our own traffic, which a client should not be shown as their activity.
   Two kinds: sessions we opened ourselves while testing the widget, named by
   the prefix we gave them, and calls where the caller never joined, which are
   connection checks rather than conversations. Every screen that hides these
   says how many it hid, so the figure is never quietly trimmed. */
export function isTestCall(c: Call): boolean {
  return isTestSession(c.sessionId) || c.disconnection === "error_user_not_joined";
}

/** The calls, split into what a client is shown and what we hid. */
export function realCalls(calls: Call[]) {
  const real = calls.filter((c) => !isTestCall(c));
  return { real, hidden: calls.length - real.length };
}

export type Window = { calls: number; minutes: number; costGbp: number };

/** Counts for a period, measured back from now rather than from midnight. */
export function windowOf(calls: Call[], sinceMs: number): Window {
  const since = Date.now() - sinceMs;
  const inWindow = calls.filter((c) => c.startedAt >= since);
  return {
    calls: inWindow.length,
    minutes: inWindow.reduce((n, c) => n + c.durationMs, 0) / 60000,
    costGbp: inWindow.reduce((n, c) => n + c.costGbp, 0),
  };
}

/** Today, counted from midnight in London rather than 24 hours back. */
export function today(calls: Call[]): Window {
  const from = londonMidnight();
  const inDay = calls.filter((c) => c.startedAt >= from);
  return {
    calls: inDay.length,
    minutes: inDay.reduce((n, c) => n + c.durationMs, 0) / 60000,
    costGbp: inDay.reduce((n, c) => n + c.costGbp, 0),
  };
}

/** One point per day, oldest first, for the trend chart and the sparklines. */
export function dailySeries(calls: Call[], n = 7) {
  const days: { label: string; day: string; calls: number; minutes: number }[] = [];
  const midnight = londonMidnight();
  for (let i = n - 1; i >= 0; i--) {
    const from = midnight - i * 86400000;
    const to = from + 86400000;
    const d = new Date(from);
    const inDay = calls.filter((c) => c.startedAt >= from && c.startedAt < to);
    days.push({
      /* Over 14 days a weekday initial repeats twice and tells you nothing,
         so the axis is day of month; the month is in the hover readout. */
      label: d.toLocaleDateString("en-GB", { day: "numeric", timeZone: "Europe/London" }),
      day: d.toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "Europe/London" }),
      calls: inDay.length,
      minutes: inDay.reduce((n, c) => n + c.durationMs, 0) / 60000,
    });
  }
  return days;
}

/** The same length of time immediately before `sinceMs`, to compare against. */
export function previousWindow(calls: Call[], sinceMs: number): Window {
  const end = Date.now() - sinceMs;
  const start = end - sinceMs;
  const inWindow = calls.filter((c) => c.startedAt >= start && c.startedAt < end);
  return {
    calls: inWindow.length,
    minutes: inWindow.reduce((n, c) => n + c.durationMs, 0) / 60000,
    costGbp: inWindow.reduce((n, c) => n + c.costGbp, 0),
  };
}

export const fmtMinutes = (m: number) =>
  m < 1 ? `${Math.round(m * 60)}s` : `${m.toFixed(m < 10 ? 1 : 0)} min`;

export const fmtDuration = (ms: number) => {
  const s = Math.round(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};

export const fmtWhen = (ms: number) =>
  new Date(ms).toLocaleString("en-GB", {
    day: "numeric", month: "short", hour: "2-digit", minute: "2-digit",
    timeZone: "Europe/London",
  });
