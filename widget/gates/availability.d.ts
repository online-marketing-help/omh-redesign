/* Types for availability.js. The gate is plain JavaScript because the same
   text runs in the tests, in the Next route and in an n8n Code node; this
   file is only its contract. */

/** A block of time the calendar says is taken, in London local ISO. */
export type Busy = { start: string; end: string };

/**
 * The times still bookable on `date`.
 *
 * `busy` that is not an array means the calendar could not be asked, and the
 * answer is then no times at all. An outage that reads as "everything is
 * free" is a day of double bookings.
 */
export declare function freeSlots(
  date: string,
  busy: Busy[] | null | undefined,
  times: string[],
  now?: number,
): string[];

export declare function overlaps(
  aStart: number,
  aEnd: number,
  bStart: number,
  bEnd: number,
): boolean;

export declare function londonInstant(iso: string): number;

export declare const LEAD_MS: number;
export declare const SLOT_MS: number;
