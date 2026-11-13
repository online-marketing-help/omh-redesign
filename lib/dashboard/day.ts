/* What "today" means for this dashboard.

   Both numbers it feeds are read aloud in meetings, so the day boundary has to
   be the client's own: London midnight, whatever timezone the server happens
   to run in. Vercel runs in UTC, which is London's clock for five months of
   the year and an hour behind it for the other seven.

   The obvious shortcut is wrong in a way that is easy to miss. This:

     new Date(new Date().toLocaleString("en-GB", { timeZone: "Europe/London" }))

   formats to "02/11/2026, 15:43:21" and parses back as 11 February, because
   nothing in the round trip says which number is the day. Used as a cutoff it
   reached back nine months and reported every call ever made as today's. */

const ISO = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Europe/London",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const OFFSET = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  timeZoneName: "longOffset",
});

/** Today's date in London as `YYYY-MM-DD`, which sorts and compares as text. */
export function londonToday(at: Date = new Date()): string {
  return ISO.format(at);
}

/** The instant London midnight fell on the given day. */
export function londonMidnight(at: Date = new Date()): number {
  /* "GMT+01:00" through the summer, plain "GMT" in winter. */
  const name =
    OFFSET.formatToParts(at).find((p) => p.type === "timeZoneName")?.value ?? "GMT";
  const offset = name.replace("GMT", "") || "+00:00";
  return new Date(`${londonToday(at)}T00:00:00${offset}`).getTime();
}
