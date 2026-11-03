#!/usr/bin/env node
/**
 * Bundles the embed into one minified file the web developer can upload.
 *
 *   node web/embed/build.mjs
 *
 * Output: web/embed/dist/ohm-assistant.js
 *
 * `format: "iife"` and `target: "es2018"` on purpose. The file has to run from a
 * plain script tag inside WordPress, where there is no module loader, and it has
 * to work on the older Safari and Android browsers a small business's customers
 * actually use. es2018 keeps async/await and spread but compiles nothing we rely
 * on away.
 */
import { build } from "esbuild";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(HERE, "dist", "ohm-assistant.js");

const r = await build({
  entryPoints: [path.join(HERE, "src", "embed.js")],
  outfile: out,
  bundle: true,
  minify: true,
  format: "iife",
  target: ["es2018"],
  legalComments: "none",
  banner: {
    js:
      "/* OMH site assistant. Chat and voice for onlinemarketinghelp.co.uk.\n" +
      "   Built from web/embed/src/embed.js - edit that, not this file. */",
  },
  metafile: true,
});

const bytes = fs.statSync(out).size;
const gzip = (await import("node:zlib")).gzipSync(fs.readFileSync(out)).length;
console.log(`  ${path.relative(process.cwd(), out)}`);
console.log(`  ${(bytes / 1024).toFixed(1)} KB raw, ${(gzip / 1024).toFixed(1)} KB gzipped`);
if (r.warnings.length) console.log("  warnings:", r.warnings.length);
