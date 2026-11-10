/* Which of the offered demo slots are actually free.

   The calendar is the source of truth. OMH move things, cancel things and
   take bookings by phone, none of which reaches our database, so a table of
   our own would be a stale second copy and "free" computed from a stale copy
   is the double booking it was meant to prevent.

   This is the pure half: hand it what the calendar says is busy and it says
   which times survive. It does not fetch anything, so it is the same function
   in a test, in the Next route and in the widget.

   The authoritative check still happens in the Apps Script, under a lock,
   immediately before the event is created. Two people submitting the same
   slot within the same second both see it free here, and only a check that
   is in the same breath as the write can refuse the second one.

   Plain JavaScript, no imports, like every other file in gates/: the same
   text has to run in Node for the tests and inside an n8n Code node. */

/* How close to a slot you may still book it. Five minutes before a call is
   not a booking, it is an ambush, and the confirmation has not even sent. */
var LEAD_MS = 15 * 60 * 1000;
var SLOT_MS = 30 * 60 * 1000;

/** Half-open intervals: touching at the edge is not an overlap. */
function overlaps(aStart, aEnd, bStart, bEnd) {
  return aStart < bEnd && bStart < aEnd;
}

/* "2026-11-18T10:30:00" in Europe/London, as an instant.

   Written out rather than handed to `new Date()`, which reads a string with
   no zone as local time: correct on a London laptop and an hour out on a
   server in UTC for seven months of the year. The offset is found by asking
   the formatter what London called a candidate instant, which is the same
   trick gates/clock.ts uses and for the same reason. */
function londonInstant(iso) {
  var guess = Date.parse(iso + "Z");
  if (isNaN(guess)) return NaN;
  for (var i = 0; i < 3; i++) {
    var parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/London", hour12: false,
      year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", second: "2-digit",
    }).formatToParts(new Date(guess));
    var g = {};
    for (var p = 0; p < parts.length; p++) g[parts[p].type] = parts[p].value;
    var asUtc = Date.parse(
      g.year + "-" + g.month + "-" + g.day + "T" +
      (g.hour === "24" ? "00" : g.hour) + ":" + g.minute + ":" + g.second + "Z"
    );
    var drift = Date.parse(iso + "Z") - asUtc;
    if (drift === 0) return guess;
    guess += drift;
  }
  return guess;
}

/**
 * The times still bookable on `date`.
 *
 * `busy` is what the calendar reported: an array of {start, end} in London
 * local ISO. **`null`, or anything that is not an array, means the calendar
 * could not be asked, and that returns nothing.** Not everything. An outage
 * that reads as "all free" is a day of double bookings, and it is the most
 * likely way this ships broken, because the healthy path and the outage path
 * look identical unless the outage is the thing you test.
 */
function freeSlots(date, busy, times, now) {
  if (!Array.isArray(busy)) return [];
  if (!Array.isArray(times)) return [];
  var at = typeof now === "number" ? now : Date.now();

  var blocks = [];
  for (var i = 0; i < busy.length; i++) {
    var b = busy[i] || {};
    var s = londonInstant(String(b.start || "").slice(0, 19));
    var e = londonInstant(String(b.end || "").slice(0, 19));
    if (!isNaN(s) && !isNaN(e) && e > s) blocks.push([s, e]);
  }

  var out = [];
  for (var t = 0; t < times.length; t++) {
    var start = londonInstant(date + "T" + times[t] + ":00");
    if (isNaN(start)) continue;
    if (start - at < LEAD_MS) continue;
    var end = start + SLOT_MS;
    var clash = false;
    for (var k = 0; k < blocks.length; k++) {
      if (overlaps(start, end, blocks[k][0], blocks[k][1])) { clash = true; break; }
    }
    if (!clash) out.push(times[t]);
  }
  return out;
}

export { freeSlots, overlaps, londonInstant, LEAD_MS, SLOT_MS };
