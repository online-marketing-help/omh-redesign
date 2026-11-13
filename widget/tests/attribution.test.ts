import { readFileSync } from "node:fs";
import { ctx } from "./convex-mock.ts";
import { classifySource, cleanAttribution } from "../convex/visitors.ts";
import * as V from "../convex/visitors.ts";
import * as F from "../convex/functions.ts";

let pass = 0, fail = 0;
function eq(label: string, got: unknown, want: unknown) {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  if (ok) { pass++; console.log("  ok   " + label); }
  else { fail++; console.log("  FAIL " + label + "\n         got  " + JSON.stringify(got) + "\n         want " + JSON.stringify(want)); }
}
function ok(label: string, cond: boolean, detail?: unknown) {
  if (cond) { pass++; console.log("  ok   " + label); }
  else { fail++; console.log("  FAIL " + label + (detail !== undefined ? "\n         " + JSON.stringify(detail) : "")); }
}
const call = (fn: any, c: any, args: any) => fn._handler(c, args);

/* ===================================================================== */
console.log("\n== classifySource: the platform ids beat anything typed by hand ==");
eq("a gclid is Google Ads", classifySource({ gclid: "abc123" }, "website_chat"), "google_ads");
eq("an fbclid is Facebook", classifySource({ fbclid: "xyz" }, "website_chat"), "facebook_ads");
eq("an fbclid with an instagram source is Instagram",
   classifySource({ fbclid: "xyz", source: "instagram" }, "website_chat"), "instagram_ads");
eq("a gclid beats a contradictory utm_source",
   classifySource({ gclid: "abc", source: "facebook", medium: "cpc" }, "website_chat"), "google_ads");

console.log("\n== utm only, when there is no click id ==");
eq("google + cpc", classifySource({ source: "google", medium: "cpc" }, "website_chat"), "google_ads");
eq("facebook + paid", classifySource({ source: "facebook", medium: "paid" }, "website_chat"), "facebook_ads");
eq("fb + ppc", classifySource({ source: "fb", medium: "ppc" }, "website_chat"), "facebook_ads");
eq("instagram + cpc", classifySource({ source: "instagram", medium: "cpc" }, "website_chat"), "instagram_ads");
eq("organic stays organic", classifySource({ medium: "organic" }, "website_chat"), "organic");
eq("a bare referrer is a referral", classifySource({ referrer: "https://news.site/x" }, "website_chat"), "referral");

console.log("\n== an explicit value from a caller that knows better wins ==");
eq("the Meta lead-ad webhook says so",
   classifySource({ sourceChannel: "facebook_ads", gclid: "abc" }, "website_chat"), "facebook_ads");
eq("but an unknown value is not trusted",
   classifySource({ sourceChannel: "not_a_real_channel" }, "website_chat"), "website_chat");
eq("nothing at all falls back", classifySource(undefined, "website_voice"), "website_voice");
eq("an empty object falls back", classifySource({}, "website_form"), "website_form");

console.log("\n== cleanAttribution ==");
eq("blank strings are dropped", cleanAttribution({ source: "  ", campaign: "spring" }), { campaign: "spring" });
eq("nothing useful is undefined, not an empty object", cleanAttribution({ source: "" }), undefined);
eq("undefined in, undefined out", cleanAttribution(undefined), undefined);
eq("sourceChannel is not duplicated into the detail",
   cleanAttribution({ sourceChannel: "google_ads", campaign: "x" }), { campaign: "x" });
ok("an absurdly long value is cut",
   (cleanAttribution({ campaign: "x".repeat(900) }) as any).campaign.length === 500);
eq("values are trimmed", cleanAttribution({ campaign: "  spring sale  " }), { campaign: "spring sale" });

/* ===================================================================== */
console.log("\n== hello stores first touch on the session ==");
{
  const { db, ctx: c } = ctx();
  await call(V.hello, c, {
    sessionId: "smoke-attr-1", visitorId: "p-smoke-1", channel: "chat",
    pageUrl: "https://onlinemarketinghelp.co.uk/seo?gclid=G1&utm_campaign=spring",
    attribution: { gclid: "G1", campaign: "spring", landingPage: "https://onlinemarketinghelp.co.uk/seo?gclid=G1" },
  });
  const s = db.all("sessions")[0];
  eq("classified as Google Ads", s.sourceChannel, "google_ads");
  eq("the campaign is kept", s.attribution.campaign, "spring");
  eq("and the click id", s.attribution.gclid, "G1");
  ok("first touch is stamped", typeof s.attribution.firstTouchAt === "number");

  /* A second page view in the same visit carries no gclid. It must not wipe
     the one that did: this is the whole reason for first-touch-only. */
  await call(V.hello, c, {
    sessionId: "smoke-attr-1", visitorId: "p-smoke-1", channel: "chat",
    pageUrl: "https://onlinemarketinghelp.co.uk/contact",
    attribution: { landingPage: "https://onlinemarketinghelp.co.uk/contact" },
  });
  const s2 = db.all("sessions")[0];
  eq("a later page view does not overwrite the source", s2.sourceChannel, "google_ads");
  eq("nor the click id", s2.attribution.gclid, "G1");
  eq("one session row, not two", db.all("sessions").length, 1);
}

console.log("\n== saveLead inherits the session's attribution ==");
{
  const { db, ctx: c } = ctx();
  await call(V.hello, c, {
    sessionId: "smoke-attr-2", visitorId: "p-smoke-2", channel: "chat",
    attribution: { gclid: "G2", campaign: "autumn" },
  });
  /* The widget's save_lead tool passes no attribution: the session has it. */
  const r = await call(F.saveLead, c, {
    sessionId: "smoke-attr-2", name: "Smoke Tester", phone: "+447700900123",
    service: "SEO", channel: "chat",
  });
  const lead = db.all("leads")[0];
  eq("the lead carries the session's channel", lead.sourceChannel, "google_ads");
  eq("and its campaign", lead.attribution.campaign, "autumn");
  ok("the lead was created", r.ok === true && r.returning === false);
}

console.log("\n== first touch survives a later visit from a different source ==");
{
  const { db, ctx: c } = ctx();
  /* Monday: arrives on a Google ad and gives a number. */
  await call(V.hello, c, {
    sessionId: "smoke-mon", visitorId: "p-smoke-3", channel: "chat",
    attribution: { gclid: "G3", campaign: "spring" },
  });
  await call(F.saveLead, c, {
    sessionId: "smoke-mon", name: "Smoke Tester", phone: "+447700900123", channel: "chat",
  });
  /* Friday: comes back directly, no advert at all. */
  await call(V.hello, c, {
    sessionId: "smoke-fri", visitorId: "p-smoke-3", channel: "chat",
  });
  await call(F.saveLead, c, {
    sessionId: "smoke-fri", name: "Smoke Tester", phone: "+447700900123", channel: "chat",
  });

  eq("still one person, not two", db.all("leads").length, 1);
  const lead = db.all("leads")[0];
  eq("still credited to the Google ad", lead.sourceChannel, "google_ads");
  eq("with the original campaign", lead.attribution.campaign, "spring");
  eq("and counted as a second visit", lead.visits, 2);
}

console.log("\n== an explicit source from a webhook beats the session ==");
{
  const { db, ctx: c } = ctx();
  const r = await call(F.saveLead, c, {
    sessionId: "smoke-meta-lead", name: "Smoke Tester", phone: "+447700900999",
    channel: "chat",
    sourceChannel: "facebook_ads",
    attribution: { adId: "120210", formId: "99887", campaign: "Leeds plumbers" },
  });
  const lead = db.all("leads")[0];
  eq("recorded as a Facebook lead ad", lead.sourceChannel, "facebook_ads");
  eq("the ad id is kept for the report", lead.attribution.adId, "120210");
  eq("and the form id", lead.attribution.formId, "99887");
}

/* ===================================================================== */
console.log("\n== the widget's own capture, run with fake browser globals ==");
{
  /* Pull `attribution()` straight out of embed.js so a typo in the shipped
     file fails here rather than in a browser nobody is watching. */
  const src = readFileSync(new URL("../web/embed/src/embed.js", import.meta.url), "utf8");
  const start = src.indexOf("  function attribution() {");
  const end = src.indexOf("\n  }\n", start) + 4;
  ok("the function was found in embed.js", start > 0 && end > start);
  const body = src.slice(start, end);

  function run(search: string, referrer: string, href: string, store: Record<string, string>) {
    const localStorage = {
      getItem: (k: string) => (k in store ? store[k] : null),
      setItem: (k: string, v: string) => { store[k] = v; },
    };
    const location = { search, href, hostname: "onlinemarketinghelp.co.uk" };
    const document = { referrer };
    const fn = new Function(
      "localStorage", "location", "document", "URLSearchParams",
      body + "\n return attribution();",
    );
    return fn(localStorage, location, document, URLSearchParams);
  }

  const store1: Record<string, string> = {};
  const a1 = run(
    "?gclid=ABC&utm_campaign=spring&utm_source=google&utm_medium=cpc", "",
    "https://onlinemarketinghelp.co.uk/seo?gclid=ABC", store1,
  );
  eq("the click id is read off the URL", a1.gclid, "ABC");
  eq("so is the campaign", a1.campaign, "spring");
  eq("and the landing page", a1.landingPage, "https://onlinemarketinghelp.co.uk/seo?gclid=ABC");
  ok("and it was stored for next time", Boolean(store1.ohm_attribution));

  /* Second page of the same visit: no advert in the URL at all. */
  const a2 = run("", "", "https://onlinemarketinghelp.co.uk/contact", store1);
  eq("the stored first touch wins on a later page", a2.gclid, "ABC");
  eq("and the landing page is still the first one", a2.landingPage,
     "https://onlinemarketinghelp.co.uk/seo?gclid=ABC");

  /* A visit with nothing identifying must not store an empty first touch,
     or a later visit that DOES carry an advert could never become one. */
  const store2: Record<string, string> = {};
  const a3 = run("", "", "https://onlinemarketinghelp.co.uk/", store2);
  eq("a plain direct visit stores nothing", a3, null);
  eq("so nothing is written", Object.keys(store2).length, 0);
  const a4 = run("?gclid=LATER", "", "https://onlinemarketinghelp.co.uk/?gclid=LATER", store2);
  eq("and a later advert visit can still be the first touch", a4.gclid, "LATER");

  /* Our own pages are not a referrer. */
  const store3: Record<string, string> = {};
  const a5 = run("", "https://onlinemarketinghelp.co.uk/blog", "https://onlinemarketinghelp.co.uk/seo", store3);
  eq("an internal referrer is ignored", a5, null);
  const store4: Record<string, string> = {};
  const a6 = run("", "https://news.example.com/article", "https://onlinemarketinghelp.co.uk/seo", store4);
  eq("an external referrer is kept", a6.referrer, "https://news.example.com/article");

  /* Blocked storage must not throw. */
  const blocked = {
    getItem() { throw new Error("blocked"); },
    setItem() { throw new Error("blocked"); },
  };
  const fn = new Function(
    "localStorage", "location", "document", "URLSearchParams",
    body + "\n return attribution();",
  );
  let threw = false;
  let out: any = null;
  try {
    out = fn(blocked, { search: "?gclid=P", href: "https://x.co/?gclid=P", hostname: "x.co" }, { referrer: "" }, URLSearchParams);
  } catch (e) { threw = true; }
  ok("a private window does not throw", !threw);
  eq("and still reads the advert off the URL", out?.gclid, "P");

  /* What the browser produces must be what Convex classifies. */
  eq("the two sides agree: this is a Google ad",
     classifySource(a1, "website_chat"), "google_ads");
}

console.log("\n== the channels the owner actually asks about ==");
{
  /* A click-to-WhatsApp advert lands in a WhatsApp thread and is answered
     like any other WhatsApp message, so it is counted as WhatsApp. Which
     advert opened it stays in `attribution`, which is where a question about
     an advert belongs. The ADVERT and the MESSAGE still stay apart, though:
     a Facebook lead form is the figure that says whether ad spend works. */
  eq("a click-to-WhatsApp ad is a WhatsApp conversation",
     classifySource({ fbclid: "x", source: "whatsapp" }, "website_chat"), "whatsapp");
  eq("so is one marked by medium",
     classifySource({ fbclid: "x", medium: "whatsapp" }, "website_chat"), "whatsapp");
  eq("a plain Facebook ad is unaffected",
     classifySource({ fbclid: "x", source: "facebook" }, "website_chat"), "facebook_ads");

  /* One organic channel, not two. "Google, unpaid" and "Organic search" were
     the same fact written twice, and a channel spelled two ways reads as two
     channels. */
  eq("google organic is just organic",
     classifySource({ source: "google", medium: "organic" }, "website_chat"), "organic");
  eq("other organic is the same channel",
     classifySource({ source: "bing", medium: "organic" }, "website_chat"), "organic");

  /* These only ever arrive stated by a webhook, never guessed from a URL, so
     the test is that they are ACCEPTED rather than rejected as unknown. */
  for (const v of ["whatsapp", "facebook", "instagram", "phone_missed"]) {
    eq(`${v} is a value the system accepts`,
       classifySource({ sourceChannel: v }, "website_chat"), v);
  }

  /* THE FIX THIS MERGE EXPOSED.

     With no advert click and no campaign tag, the only signal left is where
     the browser says they came from, and this used to call every referrer a
     "referral". That put somebody who found the site through a normal Google
     search in the same bucket as somebody who followed a link from another
     company's website, which are the two answers the field exists to tell
     apart. Without it, "organic" could only ever be populated by a UTM tag,
     and nobody tags their own organic traffic. */
  eq("a search engine referrer is organic",
     classifySource({ referrer: "https://www.google.co.uk/search?q=seo+leeds" }, "website_chat"),
     "organic");
  eq("bing counts too",
     classifySource({ referrer: "https://www.bing.com/search?q=ppc" }, "website_chat"), "organic");
  eq("another website is a referral",
     classifySource({ referrer: "https://someblog.example/post/1" }, "website_chat"), "referral");
  /* A host that merely contains the word is not the search engine. */
  eq("a lookalike host is still a referral",
     classifySource({ referrer: "https://notgoogle.example/x" }, "website_chat"), "referral");
  eq("nothing at all falls back to how they are talking to us",
     classifySource({}, "website_chat"), "website_chat");
  eq("but a made-up one still is not",
     classifySource({ sourceChannel: "tiktok_dm" }, "website_chat"), "website_chat");
}


console.log("\n" + (fail ? "FAILED " + fail + " of " + (pass + fail) : "all " + pass + " assertions pass"));
process.exit(fail ? 1 : 0);
