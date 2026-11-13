/* =========================================================================
   Time, in Europe/London.

   The routing paper does not describe delays, it describes clock times:
   "same day, early evening", "day 2", "day 4". Those are wall-clock moments
   in London, and London is not UTC for seven months of the year. A sequence
   built on `+ 86400000` drifts by an hour across a DST boundary and starts
   texting people at seven in the morning.

   There is also a floor and a ceiling: nothing automated goes out before 08:00
   or after 20:00 London. A step that falls due outside that window is moved to
   the next time the window opens, never skipped, because a skipped step is a
   lead quietly dropped.
   ========================================================================= */

export const QUIET_START_HOUR = 20; // 20:00, nothing sends at or after this
export const QUIET_END_HOUR = 8; //  08:00, sending resumes at this

const PARTS = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

export type Wall = {
  year: number;
  month: number; // 1 to 12
  day: number;
  hour: number; // 0 to 23
  minute: number;
  second: number;
};

/** What the clock on a London wall says at this instant. */
export function londonWall(ms: number): Wall {
  const out: Record<string, number> = {};
  for (const p of PARTS.formatToParts(new Date(ms))) {
    if (p.type !== "literal") out[p.type] = Number(p.value);
  }
  /* en-GB gives 24 for midnight rather than 0. */
  const hour = out.hour === 24 ? 0 : out.hour;
  return {
    year: out.year,
    month: out.month,
    day: out.day,
    hour,
    minute: out.minute,
    second: out.second,
  };
}

/** How far ahead of UTC London is at this instant, in ms: 0 or one hour. */
function offsetAt(ms: number): number {
  const w = londonWall(ms);
  const asIfUtc = Date.UTC(w.year, w.month - 1, w.day, w.hour, w.minute, w.second);
  /* Both sides are truncated to the second, so the remainder would otherwise
     show up as a spurious offset. */
  return asIfUtc - Math.floor(ms / 1000) * 1000;
}

/**
 * The instant at which a London wall clock reads this date and time.
 *
 * Solved rather than looked up: guess using the offset in force now, then
 * re-read the offset at the guess and correct. Two passes settle it, because
 * the offset only ever moves by an hour and only at 01:00 local.
 *
 * On the two ambiguous days of the year this lands on a real instant that is
 * at most an hour from the one asked for, which for "send at six in the
 * evening" is a distinction without a difference.
 */
export function londonInstant(w: Wall): number {
  const naive = Date.UTC(w.year, w.month - 1, w.day, w.hour, w.minute, w.second);
  let ms = naive - offsetAt(naive);
  ms = naive - offsetAt(ms);
  return ms;
}

/**
 * `addDays` days after the London date of `from`, at `hour`:`minute` local.
 *
 * Day counting is from the London date, not from a 24 hour multiple, so
 * "day 2" is the next calendar day even for somebody who enquired at 23:50.
 */
export function londonAt(
  from: number,
  addDays: number,
  hour: number,
  minute = 0,
): number {
  const w = londonWall(from);
  /* Date.UTC normalises an out-of-range day, so the 31st plus one day rolls
     into the next month without any calendar arithmetic here. */
  const rolled = londonWall(Date.UTC(w.year, w.month - 1, w.day + addDays, 12, 0, 0));
  return londonInstant({
    year: rolled.year,
    month: rolled.month,
    day: rolled.day,
    hour,
    minute,
    second: 0,
  });
}

/** True when London is inside the hours we are willing to send in. */
export function isSendableHour(ms: number): boolean {
  const h = londonWall(ms).hour;
  return h >= QUIET_END_HOUR && h < QUIET_START_HOUR;
}

/**
 * The same instant, or the next moment the quiet window opens.
 *
 * Moved forward, never back and never dropped. A step due at 02:00 goes out at
 * 08:00 the same morning; one due at 21:00 goes out at 08:00 the next day.
 */
export function nextSendableAt(ms: number): number {
  if (isSendableHour(ms)) return ms;
  const w = londonWall(ms);
  const addDays = w.hour >= QUIET_START_HOUR ? 1 : 0;
  return londonAt(ms, addDays, QUIET_END_HOUR, 0);
}
