import {
  londonWall, londonInstant, londonAt, isSendableHour, nextSendableAt,
} from "../convex/clock.ts";

let pass = 0, fail = 0;
function eq(label: string, got: unknown, want: unknown) {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  if (ok) { pass++; console.log("  ok   " + label); }
  else { fail++; console.log("  FAIL " + label + "\n         got  " + JSON.stringify(got) + "\n         want " + JSON.stringify(want)); }
}
const iso = (ms: number) => new Date(ms).toISOString();

console.log("\n-- londonWall: reads the London clock, not UTC --");
// 15 Jul 2026 11:00Z is 12:00 in London (BST, UTC+1)
eq("summer instant -> 12:00 local", londonWall(Date.parse("2026-07-15T11:00:00Z")).hour, 12);
// 15 Jan 2026 12:00Z is 12:00 in London (GMT, UTC+0)
eq("winter instant -> 12:00 local", londonWall(Date.parse("2026-01-15T12:00:00Z")).hour, 12);
eq("midnight is hour 0, not 24", londonWall(Date.parse("2026-01-15T00:00:00Z")).hour, 0);

console.log("\n-- londonInstant: wall clock back to an instant --");
eq("summer 12:00 local -> 11:00Z",
   iso(londonInstant({ year: 2026, month: 7, day: 15, hour: 12, minute: 0, second: 0 })),
   "2026-07-15T11:00:00.000Z");
eq("winter 12:00 local -> 12:00Z",
   iso(londonInstant({ year: 2026, month: 1, day: 15, hour: 12, minute: 0, second: 0 })),
   "2026-01-15T12:00:00.000Z");

console.log("\n-- the two days a naive +86400000 gets this wrong --");
// BST 2026 starts Sun 29 Mar, ends Sun 25 Oct.
eq("day before BST starts, 18:00 local -> 18:00Z",
   iso(londonInstant({ year: 2026, month: 3, day: 28, hour: 18, minute: 0, second: 0 })),
   "2026-03-28T18:00:00.000Z");
eq("day after BST starts, 18:00 local -> 17:00Z",
   iso(londonInstant({ year: 2026, month: 3, day: 30, hour: 18, minute: 0, second: 0 })),
   "2026-03-30T17:00:00.000Z");
// Enquiry at 18:00 local the day before the clocks go forward. "Day 2" must
// still be 18:00 local, which is now a different UTC time.
eq("across the spring change, day 2 stays 18:00 local",
   londonWall(londonAt(Date.parse("2026-03-28T18:00:00Z"), 2, 18)).hour, 18);
eq("across the autumn change, day 2 stays 18:00 local",
   londonWall(londonAt(Date.parse("2026-10-24T17:00:00Z"), 2, 18)).hour, 18);

console.log("\n-- londonAt: day counting is by calendar date --");
// 23:50 London on 15 Jul. "The next day at 10:00" must be the 16th, not a
// 24 hour hop landing back on the 16th at 23:50.
const late = Date.parse("2026-07-15T22:50:00Z"); // 23:50 London
eq("23:50 + 1 day at 10:00 -> 16th 10:00 local",
   (() => { const w = londonWall(londonAt(late, 1, 10)); return [w.day, w.hour]; })(), [16, 10]);
eq("same day at 18:00 is the 15th", 
   (() => { const w = londonWall(londonAt(Date.parse("2026-07-15T09:00:00Z"), 0, 18)); return [w.day, w.hour]; })(), [15, 18]);
eq("month end rolls over: 31 Jan + 1 day -> 1 Feb",
   (() => { const w = londonWall(londonAt(Date.parse("2026-01-31T12:00:00Z"), 1, 10)); return [w.month, w.day]; })(), [2, 1]);
eq("year end rolls over: 31 Dec + 1 day -> 1 Jan",
   (() => { const w = londonWall(londonAt(Date.parse("2026-12-31T12:00:00Z"), 1, 10)); return [w.year, w.month, w.day]; })(), [2027, 1, 1]);

console.log("\n-- quiet hours: 08:00 to 20:00 London --");
eq("noon is sendable", isSendableHour(Date.parse("2026-07-15T11:00:00Z")), true);
eq("08:00 is sendable (window opens)", isSendableHour(londonInstant({year:2026,month:7,day:15,hour:8,minute:0,second:0})), true);
eq("19:59 is sendable", isSendableHour(londonInstant({year:2026,month:7,day:15,hour:19,minute:59,second:0})), true);
eq("20:00 is NOT sendable (window shuts)", isSendableHour(londonInstant({year:2026,month:7,day:15,hour:20,minute:0,second:0})), false);
eq("02:00 is NOT sendable", isSendableHour(londonInstant({year:2026,month:7,day:15,hour:2,minute:0,second:0})), false);

console.log("\n-- nextSendableAt: moved forward, never dropped --");
eq("noon is left alone",
   iso(nextSendableAt(Date.parse("2026-07-15T11:00:00Z"))), "2026-07-15T11:00:00.000Z");
eq("02:00 -> 08:00 the same morning",
   (() => { const w = londonWall(nextSendableAt(londonInstant({year:2026,month:7,day:15,hour:2,minute:0,second:0}))); return [w.day, w.hour]; })(), [15, 8]);
eq("21:00 -> 08:00 the NEXT morning",
   (() => { const w = londonWall(nextSendableAt(londonInstant({year:2026,month:7,day:15,hour:21,minute:0,second:0}))); return [w.day, w.hour]; })(), [16, 8]);
eq("23:30 on the 31st -> 08:00 on the 1st",
   (() => { const w = londonWall(nextSendableAt(londonInstant({year:2026,month:1,day:31,hour:23,minute:30,second:0}))); return [w.month, w.day, w.hour]; })(), [2, 1, 8]);
eq("a moved step is always in the future",
   nextSendableAt(londonInstant({year:2026,month:7,day:15,hour:3,minute:0,second:0})) >
   londonInstant({year:2026,month:7,day:15,hour:3,minute:0,second:0}), true);

console.log("\n" + (fail ? "FAILED " + fail + " of " + (pass+fail) : "all " + pass + " assertions pass"));
process.exit(fail ? 1 : 0);
