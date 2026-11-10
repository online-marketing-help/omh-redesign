import { allocate, FLOOR } from "../gates/allocation.js";

/* =========================================================================
   Where the money should go next month.

   The Channels report answers "what did each channel do". This answers a
   different question, and the difference is the whole reason it exists: a
   channel with 34 leads and 3 bookings and one with 10 leads and 6 bookings
   are both just rows in a table, and the fact that the first is where the
   budget is going and the second is where it should be going is invisible
   until they are placed against each other.

   The two failures worth designing against are both ways of being confidently
   wrong:

     - ranking a channel on four leads, where one extra win moves it from
       bottom to top, and somebody moves real money onto a coincidence;
     - calling something profitable when the system does not know what it
       cost.

   Both are asserted below.
   ========================================================================= */

let pass = 0, fail = 0;
function eq(label: string, got: unknown, want: unknown) {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  if (ok) { pass++; console.log("  ok   " + label); }
  else { fail++; console.log("  FAIL " + label + "\n         got  " + JSON.stringify(got) + "\n         want " + JSON.stringify(want)); }
}
function ok(label: string, cond: boolean, detail = "") {
  eq(label + (cond || !detail ? "" : ` [${detail}]`), cond, true);
}

/** One lead, as `channelFacts` returns it. */
const lead = (channel: string, over: Record<string, unknown> = {}) => ({
  sourceChannel: channel,
  bookings: 0,
  outcome: null,
  valueGbp: null,
  msToFirstReply: null,
  ...over,
});

const booked = (c: string) => lead(c, { bookings: 1 });
const won = (c: string, v = 2000) => lead(c, { bookings: 1, outcome: "won", valueGbp: v });

/** n of a kind. */
const many = (n: number, f: (i: number) => ReturnType<typeof lead>) =>
  Array.from({ length: n }, (_, i) => f(i));

const find = (rows: ReturnType<typeof allocate>["rows"], key: string) =>
  rows.find((r) => r.key === key);

console.log("\n== THE FLOOR: a handful of leads is not a ranking ==");
{
  /* Three leads, two of them won. 67%, top of any list sorted by rate, and
     one more lead either way swings it twenty points. */
  const rows = [...many(3, () => won("referral")).slice(0, 2), lead("referral"),
                ...many(40, (i) => (i < 4 ? booked("facebook_ads") : lead("facebook_ads")))];
  const a = allocate(rows, {});
  const ref = find(a.rows, "referral")!;
  ok("the small channel is marked too early", ref.tooEarly, JSON.stringify(ref));
  ok("it is not the best", a.best?.key !== "referral", String(a.best?.key));
  ok("and not the worst either", a.worst?.key !== "referral", String(a.worst?.key));
  ok("the floor is a real number", FLOOR >= 5, String(FLOOR));
  /* It is still shown. "Too early to say" is a finding, not a reason to hide
     a channel the client is spending on. */
  ok("but it is still returned", Boolean(ref));
}

console.log("\n== the four quadrants ==");
{
  const rows = [
    /* Lots of leads, almost none convert. The money pit. */
    ...many(40, (i) => (i < 2 ? booked("facebook_ads") : lead("facebook_ads"))),
    /* Lots of leads, converting well. Working. */
    ...many(30, (i) => (i < 12 ? won("google_ads") : lead("google_ads"))),
    /* Enough to judge, converting well, starved of volume. */
    ...many(10, (i) => (i < 5 ? won("referral") : lead("referral"))),
    /* Enough to judge, converting badly, and small. Leave it. */
    ...many(12, (i) => (i < 1 ? booked("direct") : lead("direct"))),
  ];
  const a = allocate(rows, {});
  eq("facebook is the money pit", find(a.rows, "facebook_ads")!.quadrant, "money_pit");
  eq("google is working", find(a.rows, "google_ads")!.quadrant, "working");
  eq("referral is starved", find(a.rows, "referral")!.quadrant, "starved");
  eq("direct is one to leave", find(a.rows, "direct")!.quadrant, "leave");

  /* The headline the section exists to produce.

     Best is the highest conversion among channels with enough leads behind
     them, NOT the one with the most volume. Referral converts at 50% on ten
     leads; Google Ads at 40% on thirty. For a report, Google is the bigger
     story. For an allocation, referral is the answer: it is the one to feed.
     Written down because my own first expectation here was the reporting
     answer, and the whole point of this section is that it is a different
     question. */
  eq("the best is the one converting most, not the biggest", a.best?.key, "referral");
  eq("and it is the starved one", find(a.rows, "referral")!.quadrant, "starved");
  eq("the worst is the money pit", a.worst?.key, "facebook_ads");
  /* Google is still working and still the volume. Best does not mean the
     others are wrong. */
  eq("the biggest is still working", find(a.rows, "google_ads")!.quadrant, "working");
}

console.log("\n== a rate never arrives without its denominator ==");
{
  const a = allocate(many(20, (i) => (i < 5 ? booked("google_ads") : lead("google_ads"))), {});
  const g = find(a.rows, "google_ads")!;
  eq("the rate", g.conversion, 0.25);
  eq("and what it is a rate of", g.leads, 20);
  eq("and how many converted", g.converted, 5);
}

console.log("\n== nothing divides by zero ==");
{
  const a = allocate([], {});
  eq("no rows", a.rows.length, 0);
  eq("no best", a.best, null);
  eq("no worst", a.worst, null);
  eq("no total", a.totals.leads, 0);
}
{
  /* A channel in the spend table that produced nothing at all. Real: an
     advert that ran and did not land. */
  const a = allocate(many(10, () => lead("google_ads")), { facebook_ads: 400 });
  const fb = find(a.rows, "facebook_ads");
  ok("it is shown, because it cost money", Boolean(fb), JSON.stringify(a.rows.map(r => r.key)));
  eq("with no conversion rate rather than zero", fb?.conversion, null);
  eq("and no cost per booking", fb?.costPerBooking, null);
}

console.log("\n== PROFIT IS NOT CLAIMED WITHOUT SPEND ==");
{
  const rows = many(20, (i) => (i < 4 ? won("google_ads", 2500) : lead("google_ads")));
  const noSpend = find(allocate(rows, {}).rows, "google_ads")!;
  /* Absent, not zero and not Infinity. A zero here reads as "it cost us
     nothing", and that is the sentence that ends up in a client meeting. */
  eq("no spend means no cost per booking", noSpend.costPerBooking, null);
  eq("and no return", noSpend.roas, null);
  eq("and it is not called profitable", noSpend.profitable, null);

  const withSpend = find(allocate(rows, { google_ads: 1000 }).rows, "google_ads")!;
  eq("with spend, cost per booking", withSpend.costPerBooking, 250);
  eq("value is counted", withSpend.value, 10000);
  eq("and the return", withSpend.roas, 10);
  eq("and now it may be called profitable", withSpend.profitable, true);
}
{
  const rows = many(20, (i) => (i < 1 ? won("facebook_ads", 300) : lead("facebook_ads")));
  const r = find(allocate(rows, { facebook_ads: 2000 }).rows, "facebook_ads")!;
  eq("spending more than it returns is not profitable", r.profitable, false);
  eq("and the return says so", r.roas, 0.15);
}

console.log("\n== share of the whole ==");
{
  const a = allocate([...many(30, () => lead("google_ads")), ...many(10, () => lead("referral"))], {});
  eq("total leads", a.totals.leads, 40);
  eq("google's share", find(a.rows, "google_ads")!.share, 0.75);
  eq("referral's share", find(a.rows, "referral")!.share, 0.25);
}

console.log("\n== merged channel names are counted once ==");
{
  /* facebook_dm and facebook_page were merged into facebook. Rows written
     before the merge still carry the old names and must not appear as
     separate channels here, or the allocation splits one channel's budget
     across three rows and under-ranks all of them. */
  const a = allocate([
    ...many(6, () => lead("facebook_dm")),
    ...many(6, () => lead("facebook_page")),
    ...many(6, () => booked("facebook")),
  ], {});
  eq("one channel", a.rows.length, 1);
  eq("named by the current name", a.rows[0].key, "facebook");
  eq("with all eighteen", a.rows[0].leads, 18);
}

console.log(`\n${pass} passed, ${fail} failed`);
if (fail) process.exit(1);
