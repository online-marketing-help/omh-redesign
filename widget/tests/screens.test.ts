import { readFileSync, existsSync, readdirSync } from "node:fs";

/* =========================================================================
   The skeleton and the page must say the same thing.

   Each `loading.tsx` renders the screen's title and its one-line
   description before any data arrives, so that a click lands on something
   readable instead of a blank page. That only works if they match what the
   real page says.

   They did not. Each loading file carried its own copy, and nine of the
   ten differed from the page they stood in for, before the commit that
   created them was even merged. The header's height depends on the length
   of that sentence, so the page visibly moved the instant the data landed
   - the exact thing a skeleton exists to prevent.

   And one of them was written for `appointments`, which is not a route:
   the Appointments screen lives at `bookings`. That file never rendered
   for anybody, and the screen it was meant for had no loading state at all.

   So this reads both sides off disk and compares them. Drift is now a
   failing test rather than a shift nobody notices.
   ========================================================================= */

let pass = 0, fail = 0;
function eq(label: string, got: unknown, want: unknown) {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  if (ok) { pass++; console.log("  ok   " + label); }
  else { fail++; console.log("  FAIL " + label + "\n         page     " + JSON.stringify(want) + "\n         screens  " + JSON.stringify(got)); }
}
function ok(label: string, cond: boolean, detail = "") {
  eq(label + (cond || !detail ? "" : ` [${detail}]`), cond, true);
}

const root = new URL("../../app/lead-dashboard/", import.meta.url);
const screensSrc = readFileSync(new URL("../../lib/dashboard/screens.ts", import.meta.url), "utf8");

/** Pull the declared value out of a `<Shell ... />` call. */
function attr(src: string, name: string): string | null {
  const m = new RegExp(`${name}="([^"]*)"`).exec(src);
  return m ? m[1] : null;
}

/* Every route segment that has a page. The index is "". */
const segments = ["", ...readdirSync(root, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)]
  .filter((seg) => existsSync(new URL(`${seg}${seg ? "/" : ""}page.tsx`, root)));

ok("there are screens to check", segments.length > 5, String(segments.length));

for (const seg of segments) {
  const pageSrc = readFileSync(new URL(`${seg}${seg ? "/" : ""}page.tsx`, root), "utf8");
  const title = attr(pageSrc, "title");
  /* Login and the per-conversation page are not rail screens. */
  if (!title || !/active="/.test(pageSrc)) continue;

  const key = seg === "" ? '""' : `${seg}:`;
  const entry = new RegExp(`${seg === "" ? '""' : seg}:\\s*\\{([^}]*)\\}`, "s").exec(screensSrc);
  ok(`${seg || "(overview)"} is listed in screens.ts`, Boolean(entry));
  if (!entry) continue;

  const block = entry[1];
  const declared = (name: string) => {
    const m = new RegExp(`${name}:\\s*"((?:[^"\\\\]|\\\\.)*)"`).exec(block);
    return m ? m[1].replace(/\\"/g, '"') : null;
  };

  eq(`${seg || "(overview)"} title matches the page`, declared("title"), title);
  eq(`${seg || "(overview)"} lead matches the page`, declared("lead"), attr(pageSrc, "lead"));
  eq(`${seg || "(overview)"} highlights the same rail item`, declared("active"), attr(pageSrc, "active"));

  /* And it must actually have a loading state, which is the whole point. */
  ok(`${seg || "(overview)"} has a loading.tsx`,
     existsSync(new URL(`${seg}${seg ? "/" : ""}loading.tsx`, root)));
}

console.log("\n== no loading file for a route that does not exist ==");
{
  for (const d of readdirSync(root, { withFileTypes: true }).filter((x) => x.isDirectory())) {
    const hasLoading = existsSync(new URL(`${d.name}/loading.tsx`, root));
    const hasPage = existsSync(new URL(`${d.name}/page.tsx`, root));
    if (hasLoading) {
      ok(`${d.name}/loading.tsx stands in for a real page`, hasPage,
         "a loading file without a page never renders");
    }
  }
}

console.log(`\n${pass} passed, ${fail} failed`);
if (fail) process.exit(1);
