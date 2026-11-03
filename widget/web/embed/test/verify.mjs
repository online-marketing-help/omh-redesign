#!/usr/bin/env node
/**
 * Drives the built embed in a real browser, inside a page whose CSS is
 * deliberately hostile, against the live chat webhook.
 *
 *   node web/embed/test/verify.mjs            Chromium
 *   node web/embed/test/verify.mjs webkit     Safari engine
 *
 * It asserts on what a visitor would see, not on internals: that the panel has
 * the right shape despite the theme, that a real question gets a grounded
 * answer, and that nothing throws on the way.
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(HERE, "..", "dist");
const engine = process.argv[2] === "webkit" ? "webkit" : "chromium";

/* ---- serve the harness on localhost, which the webhook's origin lock allows */
const server = http.createServer((req, res) => {
  const url = req.url.split("?")[0];
  const file = url === "/" ? path.join(HERE, "host.html") : path.join(DIST, path.basename(url));
  if (!fs.existsSync(file)) { res.writeHead(404); return res.end("no"); }
  res.writeHead(200, {
    "content-type": file.endsWith(".js") ? "text/javascript" : "text/html; charset=utf-8",
  });
  fs.createReadStream(file).pipe(res);
});
/* A fixed port, because the chat webhook answers CORS for an allow-list of
   origins and a random port is not on it. 4477 is reserved for this harness in
   n8n/build-workflows.py ALLOWED_ORIGINS. */
const PORT = 4477;
await new Promise((res, rej) => {
  server.once("error", (e) => rej(new Error(
    e.code === "EADDRINUSE"
      ? `port ${PORT} is busy; free it, the webhook only accepts this origin`
      : e.message)));
  server.listen(PORT, res);
});

const { chromium, webkit } = await import("playwright");
/* Headless has no microphone. Chromium can fake one, which is the only way to
   test the voice leg for real rather than only testing that it fails politely.
   WebKit has no equivalent switch, so there the call is expected to stop at the
   microphone and the assertion below accepts the readable error. */
const browser = await (engine === "webkit" ? webkit : chromium).launch(
  engine === "chromium"
    ? { args: ["--use-fake-device-for-media-stream", "--use-fake-ui-for-media-stream",
               "--autoplay-policy=no-user-gesture-required"] }
    : {});
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 },
  permissions: engine === "chromium" ? ["microphone"] : [] });
const page = await ctx.newPage();

const errors = [];
page.on("pageerror", (e) => errors.push("pageerror: " + e.message + "\n      " + String(e.stack || "").split("\n").slice(0,4).join("\n      ")));
page.on("console", (m) => { if (m.type() === "error") errors.push("console: " + m.text()); });

let pass = 0, fail = 0;
const check = (name, ok, detail = "") => {
  ok ? pass++ : fail++;
  console.log(`  ${ok ? "PASS" : "FAIL"}  ${name}${detail ? "  — " + detail : ""}`);
};

console.log(`\nEngine: ${engine}\n`);
await page.goto(`http://localhost:${PORT}/`, { waitUntil: "networkidle" });

/* Playwright's CSS engine pierces open shadow roots on its own, so a plain
   descendant selector reaches inside the widget exactly as a user's eyes do. */
const inRoot = (sel) => page.locator(`#ohm-assistant-root ${sel}`);

/* ---- 1. it mounted once, not twice ------------------------------------ */
check("mounts exactly one widget despite two script tags",
  (await page.locator("#ohm-assistant-root").count()) === 1,
  `${await page.locator("#ohm-assistant-root").count()} root(s)`);

/* ---- 2. the launcher is visible and not wearing the theme's styles ---- */
const fab = inRoot(".fab");
await fab.waitFor({ state: "visible", timeout: 10000 });
const fabBox = await fab.boundingBox();
const fabStyle = await fab.evaluate((n) => {
  const c = getComputedStyle(n);
  return { font: c.fontFamily, bg: c.backgroundColor, radius: c.borderRadius, tt: c.textTransform };
});
check("launcher is a pill, not the theme's 28px Comic Sans block",
  fabBox.height < 60 && fabBox.width < 260 &&
  !/comic/i.test(fabStyle.font) && fabStyle.tt === "none",
  `${Math.round(fabBox.width)}x${Math.round(fabBox.height)}, ${fabStyle.font.split(",")[0]}`);

check("launcher sits bottom right, inside the viewport",
  fabBox.x + fabBox.width <= 1280 && fabBox.y + fabBox.height <= 900 && fabBox.y > 700,
  `x=${Math.round(fabBox.x)} y=${Math.round(fabBox.y)}`);

/* ---- 3. opening gives a panel of the right size ----------------------- */
await fab.click();
const panel = inRoot(".panel");
await panel.waitFor({ state: "visible" });
const pBox = await panel.boundingBox();
check("panel is ~408x660 and not floated away by the theme",
  Math.abs(pBox.width - 408) < 3 && Math.abs(pBox.height - 660) < 3,
  `${Math.round(pBox.width)}x${Math.round(pBox.height)}`);

const iconBox = await inRoot(".ico svg").boundingBox();
check("icons are 18px, not the theme's forced 200px",
  iconBox.width < 30 && iconBox.height < 30,
  `${Math.round(iconBox.width)}x${Math.round(iconBox.height)}`);

const inputBox = await inRoot(".compose input").boundingBox();
check("the input is a normal height, not the theme's 120px",
  inputBox.height < 60, `${Math.round(inputBox.height)}px tall`);

check("the opener is shown", /answer from Online Marketing Help/i.test(
  await inRoot(".bub.assistant").first().innerText()));

/* ---- 4. the theme's own elements were not touched by us -------------- */
const themeBtn = await page.locator("#theme-btn").evaluate((n) => {
  const c = getComputedStyle(n);
  return { font: c.fontFamily, bg: c.backgroundColor };
});
check("the theme's own button is untouched, so nothing leaked out",
  /comic/i.test(themeBtn.font), themeBtn.font.split(",")[0]);

/* ---- 5. a real question, answered by the live stack ------------------- */
const started = Date.now();
await inRoot(".compose input").fill("How much are your Google Ads packages per month?");
await inRoot(".compose button").click();
await page.waitForFunction(() => {
  const r = document.getElementById("ohm-assistant-root");
  const b = r && r.shadowRoot.querySelectorAll(".bub.assistant");
  return b && b.length >= 2;
}, null, { timeout: 120000 });
const reply = await inRoot(".bub.assistant").last().innerText();
const ms = Date.now() - started;
console.log(`\n  reply in ${(ms / 1000).toFixed(1)}s:\n  "${reply.slice(0, 260).replace(/\n/g, " ")}…"\n`);
check("the live agent answered", reply.length > 40);
check("the answer carries a real OMH price", /£\s?(750|850|1,?350|3,?300)/.test(reply),
  (reply.match(/£\s?[\d,]+/g) || []).join(" ") || "no figure");
check("it did not fall back to the phone number", !/cannot reach our system/i.test(reply));

/* ---- 6. the user's own message is on screen, styled as theirs --------- */
const mine = await inRoot(".bub.user").last().innerText();
check("the visitor's message is shown", /Google Ads/.test(mine));

/* ---- 7. the voice tab renders and really gets a Retell token ---------- */
await inRoot('.tabs button[data-tab="voice"]').click();
await inRoot(".voice").waitFor({ state: "visible" });
check("voice tab shows the call screen",
  /Talk to the assistant/i.test(await inRoot(".voice h3").innerText()));

const tokenCall = page.waitForResponse(
  (r) => r.url().includes("/webhook/ohm-voice-token"), { timeout: 60000 });
await inRoot(".call").click();
let tokenOk = false, tokenNote = "";
try {
  const res = await tokenCall;
  const body = await res.json().catch(() => ({}));
  tokenOk = res.status() === 200 && Boolean(body.access_token);
  tokenNote = `HTTP ${res.status()}, token ${body.access_token ? "present" : "missing"}`;
} catch (e) { tokenNote = "no request seen: " + e.message; }
check("Start call fetches a live Retell web-call token", tokenOk, tokenNote);

/* Headless has no microphone, so the call itself cannot connect. What must be
   true is that the failure is a readable message, not a dead screen. */
await page.waitForTimeout(6000);
const vnoteVisible = await inRoot(".vnote").isVisible().catch(() => false);
const vnote = vnoteVisible ? await inRoot(".vnote").innerText() : "";
const callLabel = await inRoot(".call").innerText();
if (engine === "chromium") {
  /* With a fake microphone the call must genuinely open and the timer run. */
  check("the call actually connects and the panel shows it live",
    /You are on a call/i.test(await inRoot(".voice h3").innerText()) &&
    /\d\d:\d\d/.test(await inRoot(".vlead").innerText()) && callLabel === "End call",
    (await inRoot(".vlead").innerText()).slice(-6) + ", button: " + callLabel);
  await inRoot(".call").click();            /* hang up */
  await page.waitForTimeout(1200);
  check("hanging up returns it to idle",
    /Talk to the assistant/i.test(await inRoot(".voice h3").innerText()),
    await inRoot(".voice h3").innerText());
} else {
  check("without a microphone it says something useful rather than hanging",
    /You are on a call/i.test(await inRoot(".voice h3").innerText()) ||
    /020 ?3489 ?3934|try again/i.test(vnote),
    vnote ? vnote.slice(0, 90) : "button: " + callLabel);
}

/* ---- 8. chat history survived the tab switch ------------------------- */
await inRoot('.tabs button[data-tab="chat"]').click();
check("switching tabs did not lose the conversation",
  (await inRoot(".bub").count()) >= 3, `${await inRoot(".bub").count()} bubbles`);

/* ---- 9. mobile width ------------------------------------------------- */
await page.setViewportSize({ width: 390, height: 780 });
await page.waitForTimeout(300);
const mBox = await panel.boundingBox();
check("fits a phone with no horizontal overflow",
  mBox.width <= 390 && mBox.x >= 0 && mBox.width > 300,
  `${Math.round(mBox.width)}px wide at x=${Math.round(mBox.x)}`);
const scrollX = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
check("the page itself does not scroll sideways", scrollX <= 0, `overflow ${scrollX}px`);

/* ---- 10. the public handle works ------------------------------------- */
await page.evaluate(() => window.OhmAssistant.close());
check("OhmAssistant.close() closes it", await inRoot(".fab").isVisible());
await page.evaluate(() => window.OhmAssistant.open("voice"));
check("OhmAssistant.open('voice') opens straight to voice",
  await inRoot(".voice").isVisible());

/* ---- 11. nothing threw ---------------------------------------------- */
/* Chromium is held strictly: with a fake microphone a real call connects, so
   any error there is the widget's. WebKit has no fake-device switch, so the
   LiveKit socket is dropped by the missing audio device a few seconds in. That
   one class of noise is expected there and nowhere else. */
const ENV_NOISE = engine === "webkit"
  ? /favicon|AudioContext|getUserMedia|Permission|microphone|NotFound|NotAllowed|livekit\.cloud|network connection was lost/i
  : /favicon|AudioContext|getUserMedia|Permission|microphone|NotFound|NotAllowed/i;
const realErrors = errors.filter((e) => !ENV_NOISE.test(e));
check("no unexpected console or page errors", realErrors.length === 0,
  realErrors.slice(0, 3).join(" | ") || "clean");

await page.screenshot({ path: path.join(HERE, `shot-${engine}.png`) });
await browser.close();
server.close();

console.log(`\n${pass} passed, ${fail} failed   (screenshot: web/embed/test/shot-${engine}.png)\n`);
process.exit(fail ? 1 : 0);
