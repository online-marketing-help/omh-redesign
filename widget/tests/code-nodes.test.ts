import { readFileSync, readdirSync } from "node:fs";

/* =========================================================================
   Every Code node in every built workflow, run the way n8n runs it.

   This exists because of a specific failure. The "Clean Reply" node in
   01-chat was changed to strip markdown out of replies, the gate behind it
   had 22 passing assertions, and the push took the live chat down anyway:
   the node's code had been bundled by esbuild into `var GATE = (() => ...)()`
   and the Code sandbox could not see that global. Every reply came back as
   an empty 200.

   The tests could not have caught it, because they imported the gate and
   called it directly. n8n does not do that. n8n takes the node's body,
   wraps it in a function, and runs it, so `return` at the top level is legal
   and the scoping is a function's, not a module's.

   So this runs each node body through `new Function`, which is that same
   shape. It does not assert what any node computes: it asserts that the
   code is syntactically valid in the position it actually occupies, which
   is the thing that was wrong and the thing nothing else checks.
   ========================================================================= */

let pass = 0, fail = 0;
function ok(label: string, cond: boolean, detail = "") {
  if (cond) { pass++; console.log("  ok   " + label); }
  else { fail++; console.log("  FAIL " + label + (detail ? "\n         " + detail : "")); }
}

const dir = new URL("../n8n/", import.meta.url);
const files = readdirSync(dir).filter((f) => /^\d\d-.*\.json$/.test(f)).sort();

ok(`there are workflows to check`, files.length > 0, `found ${files.length}`);

let nodes = 0;
for (const file of files) {
  const wf = JSON.parse(readFileSync(new URL(file, dir), "utf8"));
  for (const node of wf.nodes ?? []) {
    const code: string | undefined = node?.parameters?.jsCode;
    if (typeof code !== "string" || !code.trim()) continue;
    nodes++;

    /* The arguments are the names n8n puts in scope. They are declared so
       that a reference to one is not a ReferenceError at compile time; what
       is being checked is that the body parses and that nothing in it needs
       a module scope to exist. */
    let built = false;
    let why = "";
    try {
      new Function("$input", "$", "$json", "$now", "items", "DateTime", code);
      built = true;
    } catch (e) {
      why = String((e as Error).message).slice(0, 160);
    }
    ok(`${file} · ${node.name}`, built, why);

    /* The specific shape that broke. A bundler's global assignment is fine
       in a browser and fine in a module; inside this wrapper the sandbox
       could not reach it. Nothing in a Code node should depend on one. */
    ok(`${file} · ${node.name} · no bundled global`,
       !/\bvar GATE = \(\(\) =>/.test(code),
       "esbuild IIFE global: use gate_inline, not gate_source");
  }
}

ok(`every Code node was actually examined`, nodes > 10, `checked ${nodes}`);

console.log(`\n${pass} passed, ${fail} failed  (${nodes} Code nodes across ${files.length} workflows)`);
if (fail) process.exit(1);
