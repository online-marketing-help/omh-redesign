"use client";

import { useMemo, useState, useTransition } from "react";
import { parseCsv } from "@/widget/gates/csv.js";
import { screenRows } from "@/widget/gates/consent-gate.js";
import { startCampaign, type StartResult } from "@/app/lead-dashboard/campaigns/new/actions";
import { attempt } from "@/lib/dashboard/attempt";

/* =========================================================================
   Start a reactivation campaign.

   **The preview is the feature.** Route F is the only route that counts as
   marketing, and the only one where getting it wrong means texting somebody
   who never agreed to hear from us. So this screen shows exactly who would
   be contacted and exactly who would not, with the reason against each
   name, BEFORE there is anything to press.

   The screening runs here on `gates/consent-gate.js`, the same file the n8n
   workflow runs when the list is actually sent. Two copies of the rule
   would eventually disagree, and the disagreement would show up as somebody
   being contacted who the preview said would not be.

   Nothing here sends. The button hands the list to n8n, which screens it
   again and does the work.
   ========================================================================= */

const WHY: Record<string, string> = {
  no_contact: "No phone number and no email address",
  no_consent_basis: "No consent basis given",
  unknown_consent_basis: "Consent basis is not soft_optin or explicit",
  no_consent_evidence: "No evidence of consent",
  evidence_too_thin: "The evidence is too short to mean anything",
  duplicate_in_import: "Already in this list further up",
};

export function CampaignStart({
  canWrite,
  demo,
  configured,
}: {
  canWrite: boolean;
  demo: boolean;
  /** Whether a reactivation webhook is configured on this server. */
  configured: boolean;
}) {
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [result, setResult] = useState<StartResult | null>(null);
  const [pending, start] = useTransition();

  /* Recomputed as they type or drop a file. It is a few thousand rows of
     string work and it is what makes the preview feel like a preview. */
  const read = useMemo(() => (text.trim() ? parseCsv(text) : null), [text]);
  const screened = useMemo(
    () => (read && !read.headerProblem ? screenRows(read.rows) : null),
    [read],
  );

  async function onFile(f: File | null) {
    if (!f) return;
    setResult(null);
    setText(await f.text());
    if (!name.trim()) setName(f.name.replace(/\.[^.]+$/, ""));
  }

  const accepted = screened?.accepted ?? [];
  const refused = screened?.refused ?? [];
  const unreadable = read?.problems ?? [];

  function go() {
    setResult(null);
    if (demo) {
      setResult({ ok: false, message: "Example data. Nothing was sent." });
      return;
    }
    start(async () => {
      setResult(
        await attempt(
          () =>
            startCampaign(
              name,
              accepted.map((q) => ({
                name: q.name,
                email: q.email,
                phone: q.phone,
                company: q.company,
                service: q.service,
                consentBasis: q.consentBasis,
                consentEvidence: q.consentEvidence,
                lastBoughtAt: q.lastBoughtAt,
              })),
              note,
            ),
          /* Starting a campaign enrols people and sends them a message.
             If the response is lost, the enrolment may still have
             happened, and "try again" would contact everybody twice. */
          "sends",
        ),
      );
    });
  }

  const label = "block text-[12px] font-semibold uppercase tracking-[.08em] text-muted";
  const field =
    "mt-1.5 w-full rounded-lg border border-line bg-surface px-3 py-2 text-[14px] text-ink " +
    "outline-none focus-visible:border-[var(--accent)] focus-visible:ring-2 " +
    "focus-visible:ring-[rgb(var(--accent-rgb)/.35)]";

  return (
    <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] xl:items-start">
      {/* ------------------------------------------------------ the list */}
      <section className="rounded-xl border border-line bg-surface p-4 sm:p-5">
        <h2 className="font-sans text-[15px] font-semibold">Who are you writing to?</h2>
        <p className="mt-1 text-[13.5px] leading-relaxed text-muted">
          A CSV with a header row. It must carry{" "}
          <code className="rounded bg-warm px-1 py-0.5 text-[12.5px]">consentBasis</code> and{" "}
          <code className="rounded bg-warm px-1 py-0.5 text-[12.5px]">consentEvidence</code>:
          this is the one campaign type that counts as marketing, so anyone
          without recorded consent is left out and shown to you below.
        </p>

        <div className="mt-4">
          <label className={label} htmlFor="camp-name">Campaign name</label>
          <input
            id="camp-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Spring reactivation, past website clients"
            className={field}
          />
        </div>

        <div className="mt-4">
          <label className={label} htmlFor="camp-file">Upload a CSV</label>
          <input
            id="camp-file"
            type="file"
            accept=".csv,text/csv,text/plain"
            onChange={(e) => onFile(e.target.files?.[0] ?? null)}
            className="mt-1.5 block w-full text-[13px] text-muted file:mr-3 file:cursor-pointer file:rounded-lg file:border file:border-line file:bg-warm file:px-3 file:py-2 file:text-[13px] file:font-semibold file:text-ink"
          />
        </div>

        <div className="mt-4">
          <label className={label} htmlFor="camp-csv">Or paste it</label>
          <textarea
            id="camp-csv"
            value={text}
            onChange={(e) => { setText(e.target.value); setResult(null); }}
            rows={8}
            spellCheck={false}
            placeholder={"name,email,phone,consentBasis,consentEvidence\nJane Cole,jane@example.com,07700900111,soft_optin,Bought a website in March 2026"}
            className={`${field} font-mono text-[12.5px] leading-relaxed`}
          />
        </div>

        <div className="mt-4">
          <label className={label} htmlFor="camp-note">Note (optional)</label>
          <input
            id="camp-note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Why this list, and where it came from"
            className={field}
          />
        </div>
      </section>

      {/* --------------------------------------------------- the preview */}
      <section className="rounded-xl border border-line bg-surface p-4 sm:p-5">
        <h2 className="font-sans text-[15px] font-semibold">What would happen</h2>

        {!read ? (
          <p className="mt-3 text-[13.5px] text-muted">
            Nothing yet. Paste a list or upload one, and this fills in before
            anything is sent.
          </p>
        ) : read.headerProblem ? (
          <p role="alert" className="mt-3 rounded-lg border border-error/40 bg-error/5 px-3 py-2.5 text-[13.5px] text-error">
            {read.headerProblem}
          </p>
        ) : (
          <>
            <ul className="mt-3 flex flex-wrap gap-2">
              <Count n={read.intended} what="rows read" />
              <Count n={accepted.length} what="would be contacted" tone="good" />
              <Count n={refused.length} what="left out" tone={refused.length ? "warn" : undefined} />
              {unreadable.length > 0 && <Count n={unreadable.length} what="unreadable" tone="bad" />}
            </ul>
            {/* The three have to add up, or a row went missing. */}
            <p className="mt-2 text-[12px] text-muted">
              {accepted.length} + {refused.length} + {unreadable.length} ={" "}
              {accepted.length + refused.length + unreadable.length} of {read.intended} rows
              accounted for.
            </p>

            {refused.length > 0 && (
              <Table
                title="Left out, and why"
                rows={refused.slice(0, 50).map((r) => [
                  r.name || r.email || r.phone || `Row ${r.row}`,
                  WHY[r.why] ?? r.why,
                ])}
                more={refused.length - 50}
              />
            )}

            {unreadable.length > 0 && (
              <Table
                title="Rows this file could not be read from"
                rows={unreadable.slice(0, 20).map((p) => [`Line ${p.line}`, p.why])}
                more={unreadable.length - 20}
              />
            )}

            {accepted.length > 0 && (
              <Table
                title="Would be contacted"
                rows={accepted.slice(0, 20).map((p) => [
                  p.name,
                  p.email || p.phone || "",
                ])}
                more={accepted.length - 20}
              />
            )}

            <div className="mt-5 border-t border-line pt-4">
              {!configured && !demo && (
                <p className="mb-3 rounded-lg border border-line bg-warm px-3 py-2.5 text-[13px] leading-relaxed text-ink">
                  <strong className="font-semibold">Not connected yet.</strong> This
                  server has no reactivation webhook set, and the workflow on
                  n8n is not active, so nothing can be sent from here. The
                  preview above is still real: it is computed from the same
                  rule the workflow uses.
                </p>
              )}
              <button
                type="button"
                onClick={go}
                disabled={pending || !accepted.length || !name.trim() || (!canWrite && !demo) || (!configured && !demo)}
                className="min-h-11 cursor-pointer rounded-lg bg-inverse px-4 text-[14px] font-semibold text-oninverse outline-none transition-opacity duration-150 hover:opacity-90 focus-visible:ring-2 focus-visible:ring-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {pending
                  ? "Starting…"
                  : `Start the campaign for ${accepted.length} ${accepted.length === 1 ? "person" : "people"}`}
              </button>
              <p className="mt-2 text-[12.5px] leading-relaxed text-muted">
                This hands the list to the reactivation workflow, which checks
                every row again before anything is sent. The first message goes
                out on the sequence, not immediately.
              </p>
              {!canWrite && !demo && (
                <p className="mt-2 text-[12.5px] text-muted">
                  Read only from here, so this cannot be started.
                </p>
              )}
            </div>
          </>
        )}

        {result && (
          <p
            role="status"
            className={`mt-4 rounded-lg px-3 py-2.5 text-[13.5px] ${
              result.ok
                ? "border border-[rgb(var(--accent-rgb)/.4)] bg-[rgb(var(--accent-rgb)/.12)] text-ink"
                : "border border-error/40 bg-error/5 text-error"
            }`}
          >
            {result.ok
              ? `Started. ${result.accepted} enrolled of ${result.intended} read${result.refused ? `, ${result.refused} left out` : ""}.`
              : result.message}
          </p>
        )}
      </section>
    </div>
  );
}

function Count({ n, what, tone }: { n: number; what: string; tone?: "good" | "warn" | "bad" }) {
  const cls =
    tone === "good"
      ? "border-[rgb(var(--accent-rgb)/.4)] bg-[rgb(var(--accent-rgb)/.12)]"
      : tone === "bad"
        ? "border-error/40 bg-error/5 text-error"
        : tone === "warn"
          ? "border-line bg-warm"
          : "border-line";
  return (
    <li className={`rounded-lg border px-2.5 py-1.5 text-[13px] ${cls}`}>
      <strong className="font-semibold tabular-nums">{n}</strong>{" "}
      <span className="text-muted">{what}</span>
    </li>
  );
}

function Table({ title, rows, more }: { title: string; rows: string[][]; more: number }) {
  return (
    <div className="mt-4">
      <h3 className="text-[12px] font-semibold uppercase tracking-[.08em] text-muted">{title}</h3>
      <ul className="mt-1.5 max-h-[220px] overflow-y-auto rounded-lg border border-line">
        {rows.map((r, i) => (
          <li
            key={i}
            className={`flex items-baseline justify-between gap-3 px-2.5 py-1.5 text-[13px] ${i ? "border-t border-line" : ""}`}
          >
            <span className="min-w-0 truncate text-ink">{r[0]}</span>
            <span className="shrink-0 text-right text-[12.5px] text-muted">{r[1]}</span>
          </li>
        ))}
      </ul>
      {more > 0 && <p className="mt-1 text-[12px] text-muted">and {more} more</p>}
    </div>
  );
}
