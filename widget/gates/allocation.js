/* Where the money should go next month.

   The Channels report says what each channel did. This says what to do about
   it, and that needs two numbers held against each other rather than one
   column sorted. A channel with forty leads and two bookings and one with ten
   leads and five are both just rows in a table; that the first is where the
   budget is going and the second is where it should be going only appears
   when volume and conversion are read together.

   Plain JavaScript, no imports, like everything in gates/: the same text runs
   in the tests, in the dashboard and inside an n8n Code node.

   Two rules it will not bend, both of them ways of being confidently wrong:

     1. A channel below FLOOR leads is never ranked. Three leads and two wins
        is sixty-seven per cent and means nothing; one lead either way swings
        it twenty points, and somebody moves real money onto a coincidence.

     2. Nothing is called profitable without a spend figure. What the system
        knows is leads, bookings and the value typed on a win. What it does
        not know is what any of it cost, and a zero in place of that reads as
        "it cost us nothing". */

/* How many leads before a channel can be ranked, called best, or called
   worst. One constant, because the right number depends on the client's
   volume and will be argued about. */
var FLOOR = 8;

/* The merges. A row written before facebook_dm and facebook_page became
   facebook still carries the old name, and left alone it would split one
   channel's budget across three rows and under-rank all of them. */
var MERGED = {
  facebook_dm: "facebook", facebook_page: "facebook",
  instagram_dm: "instagram", instagram_page: "instagram",
  whatsapp_ads: "whatsapp", google_organic: "organic",
  roi_calculator: "website_form",
};

function canonical(s) {
  if (!s) return "unknown";
  return MERGED[s] || s;
}

/**
 * @param facts  one row per lead, as `channelFacts` returns them
 * @param spend  { channel: pounds per month }, or {} if nobody has typed any
 */
function allocate(facts, spend) {
  var rows = Array.isArray(facts) ? facts : [];
  var money = spend && typeof spend === "object" ? spend : {};

  var by = {};
  function slot(key) {
    if (!by[key]) {
      by[key] = { key: key, leads: 0, booked: 0, won: 0, lost: 0, decided: 0,
                  replied: 0, value: 0 };
    }
    return by[key];
  }

  for (var i = 0; i < rows.length; i++) {
    var r = rows[i] || {};
    var c = slot(canonical(r.sourceChannel));
    c.leads += 1;
    c.booked += Number(r.bookings || 0);
    if (r.outcome === "won") { c.won += 1; c.decided += 1; c.value += Number(r.valueGbp || 0); }
    else if (r.outcome === "lost") { c.lost += 1; c.decided += 1; }
    if (r.msToFirstReply !== null && r.msToFirstReply !== undefined) c.replied += 1;
  }

  /* A channel somebody is paying for that produced nothing is the single
     most useful row on this screen, and it is the one a group-by over leads
     cannot produce. It has no leads to group. */
  for (var k in money) {
    if (Object.prototype.hasOwnProperty.call(money, k) && Number(money[k]) > 0) slot(canonical(k));
  }

  var total = 0;
  for (var key in by) total += by[key].leads;

  var out = [];
  for (var key2 in by) {
    var c2 = by[key2];
    var cost = Number(money[key2] || money[c2.key] || 0) || null;

    /* Converted means booked. A booking is the first thing that costs OMH
       time rather than the assistant's, and it is the measure the routing
       paper asks for. A win is better still and is reported beside it. */
    var converted = c2.booked;
    var conversion = c2.leads > 0 ? converted / c2.leads : null;

    out.push({
      key: c2.key,
      leads: c2.leads,
      share: total > 0 ? c2.leads / total : 0,
      replied: c2.replied,
      converted: converted,
      conversion: conversion,
      won: c2.won,
      decided: c2.decided,
      value: c2.value,
      spend: cost,
      /* Absent, not zero and not Infinity. */
      costPerBooking: cost !== null && converted > 0 ? round2(cost / converted) : null,
      costPerDeal: cost !== null && c2.won > 0 ? round2(cost / c2.won) : null,
      roas: cost !== null && cost > 0 ? round2(c2.value / cost) : null,
      profitable: cost !== null && cost > 0 ? c2.value > cost : null,
      tooEarly: c2.leads < FLOOR,
      /* Filled in below, once every channel is counted: a quadrant is a
         position relative to the others, so it cannot be known one row at a
         time. Declared here so the shape of a row is one object rather than
         something that grows a field later. */
      quadrant: null,
    });
  }

  /* The quadrant. Measured against the other channels rather than against a
     fixed threshold, because "good conversion" means nothing in the abstract
     and everything next to what the other channels are doing. */
  var ranked = out.filter(function (r) { return !r.tooEarly && r.conversion !== null; });
  var midLeads = median(ranked.map(function (r) { return r.leads; }));
  var midConv = median(ranked.map(function (r) { return r.conversion; }));

  for (var j = 0; j < out.length; j++) {
    var r2 = out[j];
    if (r2.tooEarly || r2.conversion === null || midLeads === null || midConv === null) {
      r2.quadrant = null;
      continue;
    }
    var big = r2.leads >= midLeads;
    var good = r2.conversion >= midConv;
    r2.quadrant = big ? (good ? "working" : "money_pit") : (good ? "starved" : "leave");
  }

  out.sort(function (a, b) { return b.leads - a.leads; });

  var byConv = ranked.slice().sort(function (a, b) { return b.conversion - a.conversion; });
  return {
    rows: out,
    /* Only ever a channel with enough leads behind it to mean something. */
    best: byConv.length ? byConv[0] : null,
    worst: byConv.length > 1 ? byConv[byConv.length - 1] : null,
    totals: {
      leads: total,
      booked: sum(out, "converted"),
      won: sum(out, "won"),
      value: sum(out, "value"),
      spend: sum(out, "spend"),
      /* How much of the picture we can talk about cost for. Printed, because
         "three of eleven channels have a spend figure" is the caveat on
         every profit number here. */
      channelsWithSpend: out.filter(function (r) { return r.spend !== null; }).length,
      channels: out.length,
      floor: FLOOR,
    },
  };
}

function sum(rows, field) {
  var n = 0;
  for (var i = 0; i < rows.length; i++) n += Number(rows[i][field] || 0);
  return n;
}

function round2(n) { return Math.round(n * 100) / 100; }

function median(values) {
  if (!values.length) return null;
  var v = values.slice().sort(function (a, b) { return a - b; });
  var mid = Math.floor(v.length / 2);
  return v.length % 2 ? v[mid] : (v[mid - 1] + v[mid]) / 2;
}

export { allocate, canonical, FLOOR };
