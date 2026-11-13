// Full-page JPEG screenshots of one URL at several widths, through headless Chrome's DevTools protocol.
// No dependencies: Node 22+ has a global WebSocket. Usage:
//   node scripts/page-shots.mjs <url> <outDir> [widths=1440,1280,768,390,375]
// Scrolls the whole page first so IntersectionObserver reveals have fired, then captures beyond the viewport.
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const [url, outDir, widthArg] = process.argv.slice(2);
if (!url || !outDir) { console.error("usage: node scripts/page-shots.mjs <url> <outDir> [widths]"); process.exit(1); }
const widths = (widthArg || "1440,1280,768,390,375").split(",").map(Number);
const chrome = ["C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"].find(existsSync);
if (!chrome) throw new Error("No Chrome or Edge found");
mkdirSync(outDir, { recursive: true });

const port = 9333 + Math.floor(Math.random() * 500);
const proc = spawn(chrome, [`--remote-debugging-port=${port}`, `--user-data-dir=${join(tmpdir(), "omh-shots-" + port)}`, "--headless=new", "--hide-scrollbars", "--no-first-run", "--disable-gpu", "about:blank"], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let target;
for (let i = 0; i < 50 && !target; i++) {
  await sleep(200);
  try { target = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find((t) => t.type === "page"); } catch {}
}
if (!target) { proc.kill(); throw new Error("Chrome did not start"); }

const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0; const pending = new Map(); const waiters = [];
ws.onmessage = (m) => {
  const msg = JSON.parse(m.data);
  if (msg.id && pending.has(msg.id)) { const { res, rej } = pending.get(msg.id); pending.delete(msg.id); if (msg.error) rej(new Error(msg.error.message)); else res(msg.result); }
  if (msg.method) waiters.splice(0).forEach((w) => (w.method === msg.method ? w.res(msg.params) : waiters.push(w)));
};
const send = (method, params = {}) => new Promise((res, rej) => { pending.set(++id, { res, rej }); ws.send(JSON.stringify({ id, method, params })); });
const once = (method) => new Promise((res) => waiters.push({ method, res }));
const evaluate = async (expression) => (await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true })).result.value;

await send("Page.enable");
// Reveals on the page are scroll-driven; a full-page capture never scrolls, so emulate reduced motion to see everything.
await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
for (const width of widths) {
  await send("Emulation.setDeviceMetricsOverride", { width, height: 900, deviceScaleFactor: 1, mobile: width < 768 });
  const loaded = once("Page.loadEventFired");
  await send("Page.navigate", { url });
  await loaded;
  await sleep(1200);
  // Walk the page so reveal observers fire, then return to the top.
  await evaluate(`(async () => { const h = document.documentElement.scrollHeight; for (let y = 0; y < h; y += 600) { scrollTo(0, y); await new Promise(r => setTimeout(r, 40)); } scrollTo(0, 0); await new Promise(r => setTimeout(r, 600)); })()`);
  const { cssContentSize } = await send("Page.getLayoutMetrics");
  const height = Math.ceil(cssContentSize.height);
  const { data } = await send("Page.captureScreenshot", { format: "jpeg", quality: 82, captureBeyondViewport: true, clip: { x: 0, y: 0, width, height, scale: 1 } });
  const file = join(outDir, `${width}.jpg`);
  writeFileSync(file, Buffer.from(data, "base64"));
  console.log(`${file}  ${width}x${height}`);
  // One crop per top-level section, for before/after comparisons.
  const sections = await evaluate(`[...document.querySelectorAll("main section")].filter(s => !s.closest("section section")).map(s => { const r = s.getBoundingClientRect(); return { id: s.id || s.getAttribute("aria-labelledby") || "section", y: Math.round(r.top + scrollY), h: Math.round(r.height) }; })`);
  for (const [i, sec] of sections.entries()) {
    const shot = await send("Page.captureScreenshot", { format: "jpeg", quality: 82, captureBeyondViewport: true, clip: { x: 0, y: sec.y, width, height: Math.min(sec.h, 6000), scale: 1 } });
    writeFileSync(join(outDir, `${width}-${String(i + 1).padStart(2, "0")}-${sec.id}.jpg`), Buffer.from(shot.data, "base64"));
  }
}
ws.close(); proc.kill();
