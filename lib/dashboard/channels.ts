/* =========================================================================
   Channel names and wording, shared by the server and the browser.

   Deliberately NOT in lib/dashboard/routing.ts, which is `server-only`
   because it carries the shared secret. The handover queue is a client
   component and needs these labels, so anything a browser may read lives
   here and routing.ts re-exports it.
   ========================================================================= */

/* The acquisition channels, in the order a report should read them.

   Fourteen, not twenty. The first list split every Meta surface two ways,
   "from an ad" and "from the page", and the split was a mistake for one
   reason: nobody running the business thinks of a Messenger message from an
   advert and a Messenger message from the page as two different things. They
   are one conversation on one channel, and two rows for it made every report
   longer and none of them clearer.

   What IS two things is the ADVERT and the MESSAGE. A Facebook lead form is
   somebody filling in a form inside Facebook; a Facebook message is somebody
   typing to you. Different intent, different route, different cost, so
   `facebook_ads` stays its own channel and keeps the money honest: it is the
   one that says whether the ad spend is working. Merging those two would be
   the mistake in the other direction.

   The engine still records which advert produced a message, in
   `attribution`, so nothing is lost. It is reported as "which ad", which is a
   question about an advert, instead of as "which channel", which it never
   was. */
export const SOURCE_ORDER = [
  "website_chat", "website_voice", "website_form",
  "google_ads", "facebook_ads", "instagram_ads",
  "facebook", "instagram", "whatsapp",
  "phone_inbound", "phone_missed",
  "reactivation", "organic", "referral", "direct", "unknown",
] as const;

const SOURCE_LABEL: Record<string, string> = {
  website_chat: "Website chat",
  website_voice: "Website voice",
  website_form: "Website form",
  google_ads: "Google Ads",
  facebook_ads: "Facebook ad",
  instagram_ads: "Instagram ad",
  facebook: "Facebook message",
  instagram: "Instagram message",
  whatsapp: "WhatsApp",
  phone_inbound: "Inbound call",
  phone_missed: "Missed call",
  reactivation: "Reactivation",
  organic: "Found us on Google",
  referral: "Referral",
  direct: "Direct",
  unknown: "Not recorded",
};

/* The channels that were merged away, and what they became.

   Rows written before the merge still carry the old value, and a lead that
   suddenly reads "Not recorded" because its channel was renamed is a lead
   that looks lost. Everything that reads a channel goes through
   `sourceLabel` or `canonicalSource`, so one table here is enough and no
   migration has to run over the data. */
const MERGED: Record<string, string> = {
  facebook_dm: "facebook",
  facebook_page: "facebook",
  instagram_dm: "instagram",
  instagram_page: "instagram",
  /* A click-to-WhatsApp advert and an ordinary WhatsApp message arrive in the
     same thread and are answered the same way. Which advert sent them is in
     `attribution`, where it belongs. */
  whatsapp_ads: "whatsapp",
  /* "Google, unpaid" and "Organic search" were the same fact written twice:
     somebody who found the site through a normal search result rather than an
     advert. One of them had to go, and the surviving label says it in words
     anybody would use. */
  google_organic: "organic",
  /* Never a channel. The ROI calculator is a page on the website with a form
     on it, so it answers "which page captured them", not "where did they come
     from" - and somebody who found that page through a Google ad was a Google
     Ads lead, not an "ROI calculator" lead. Counting it as a channel took
     those people out of the figure that pays for the advertising. Which form
     they filled in is still on the lead. */
  roi_calculator: "website_form",
};

/** The channel a row should be counted under today, old names included. */
export function canonicalSource(s?: string | null): string {
  if (!s) return "unknown";
  return MERGED[s] ?? s;
}

/** What a person should read, never the raw enum. */
export function sourceLabel(s?: string | null): string {
  if (!s) return SOURCE_LABEL.unknown;
  const k = canonicalSource(s);
  return SOURCE_LABEL[k] ?? k.replace(/_/g, " ");
}

/** Which family a channel belongs to, for grouping a report. */
export function sourceFamily(s?: string | null): string {
  if (!s) return "Other";
  const k = canonicalSource(s);
  if (k === "organic") return "Search";
  if (k.startsWith("google")) return "Google Ads";
  if (k === "whatsapp") return "WhatsApp";
  if (k.startsWith("facebook") || k.startsWith("instagram")) return "Meta";
  if (k.startsWith("website")) return "Website";
  if (k.startsWith("phone")) return "Phone";
  if (k === "reactivation") return "Reactivation";
  return "Other";
}

const ROUTE_NAME: Record<string, string> = {
  A: "Website conversation",
  B: "Form or Google Ads",
  C: "Meta lead form",
  D: "Messenger or DM",
  E: "Missed call",
  F: "Reactivation",
};

export const routeLabel = (r?: string | null) =>
  r ? `${r}. ${ROUTE_NAME[r] ?? "Unknown route"}` : "No route";

const STOP_REASON: Record<string, string> = {
  replied: "They replied",
  booked: "They booked",
  opted_out: "They opted out",
  exhausted: "Ran to the end",
  manual: "Stopped by hand",
  no_consent: "No consent on file",
  suppressed: "Do not contact",
  kill_switch: "Outbound was off",
  no_such_lead: "Lead was deleted",
  render_failed: "Message would not render",
};

export const stopReasonLabel = (r?: string | null) =>
  r ? (STOP_REASON[r] ?? r.replace(/_/g, " ")) : "";

const OUTCOME_LABEL: Record<string, string> = {
  open: "Open",
  quoted: "Quoted",
  won: "Won",
  lost: "Lost",
  unqualified: "Not a fit",
};

export const outcomeLabel = (o?: string | null) =>
  o ? (OUTCOME_LABEL[o] ?? o) : "Not set";

export const OUTCOMES = ["open", "quoted", "won", "lost", "unqualified"] as const;

/** Money, the way a person writes it. */
export function money(n?: number | null): string {
  if (n === null || n === undefined) return "";
  return n >= 1000
    ? `£${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k`
    : `£${Math.round(n)}`;
}

/** "in 14 min", "2 hours ago", "just now". Never a bare timestamp. */
export function when(ms?: number | null): string {
  if (!ms) return "";
  const d = ms - Date.now();
  const abs = Math.abs(d);
  const mins = Math.round(abs / 60000);
  if (mins < 1) return "just now";
  const say =
    mins < 60
      ? `${mins} min`
      : abs < 48 * 3600_000
        ? `${Math.round(abs / 3600_000)} hour${Math.round(abs / 3600_000) === 1 ? "" : "s"}`
        : `${Math.round(abs / 86400_000)} days`;
  return d > 0 ? `in ${say}` : `${say} ago`;
}

/** A duration in words, for "time to first touch". */
export function duration(ms?: number | null): string {
  if (ms === null || ms === undefined) return "";
  if (ms < 1000) return "instant";
  const s = Math.round(ms / 1000);
  if (s < 90) return `${s}s`;
  const m = Math.round(s / 60);
  if (m < 90) return `${m} min`;
  const h = Math.round(m / 60);
  if (h < 48) return `${h} hour${h === 1 ? "" : "s"}`;
  return `${Math.round(h / 24)} days`;
}

/** The middle value, which is the one the routing paper asks us to report. */
export function median(values: number[]): number | null {
  if (!values.length) return null;
  const v = [...values].sort((a, b) => a - b);
  const mid = Math.floor(v.length / 2);
  return v.length % 2 ? v[mid] : Math.round((v[mid - 1] + v[mid]) / 2);
}
