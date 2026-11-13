import { company } from "@/lib/content/nav";

/*
  The email every website form turns into. Branded, because these land in an
  inbox next to a hundred other notifications and should be recognisable at a
  glance — and because the subject line has to say which form and which page it
  came from, with 15 forms feeding one address.

  Table layout and inline styles throughout: email clients strip <style> blocks
  and ignore most modern CSS. ponytail: no MJML, no react-email — one template.
*/

const INK = "#000";
const MUTED = "#667085";
const LINE = "#d9ddd8";
const WARM = "#f7f6f2";
const GOLD = "var(--color-teal)";
const GOLD_DEEP = "var(--color-amber-deep)";
const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

const escape = (value: unknown) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const flatten = (value: string | string[]) => (Array.isArray(value) ? value.join(", ") : String(value));

export type EnquiryEmail = { subject: string; html: string; text: string };

export function renderEnquiryEmail({
  formName,
  page,
  entries,
  replyTo,
  receivedAt = new Date(),
}: {
  formName: string;
  page?: string;
  entries: [string, string | string[]][];
  replyTo?: string;
  receivedAt?: Date;
}): EnquiryEmail {
  const received = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Europe/London",
  }).format(receivedAt);

  const source = page && page !== "/" ? page : "the homepage";

  const answers = entries
    .map(
      ([label, value]) => `<tr><td style="padding:0 0 16px">
        <div style="font:600 12px/1.4 ${FONT};color:${MUTED};letter-spacing:.02em">${escape(label)}</div>
        <div style="font:400 15px/1.55 ${FONT};color:${INK};margin-top:4px">${escape(flatten(value)).replace(
          /\n/g,
          "<br>",
        )}</div>
      </td></tr>`,
    )
    .join("");

  const replyRow = replyTo
    ? `<tr><td style="padding:0 28px 4px">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:${WARM};border:1px solid ${LINE};border-radius:8px">
          <tr><td style="padding:12px 16px;font:400 13px/1.5 ${FONT};color:${MUTED}">
            Reply to <a href="mailto:${escape(replyTo)}" style="color:${GOLD_DEEP};font-weight:600;text-decoration:underline">${escape(replyTo)}</a>
          </td></tr>
        </table>
      </td></tr>`
    : "";

  const html = `<div style="display:none;max-height:0;overflow:hidden;opacity:0">${escape(
    formName,
  )} — submitted from ${escape(source)} at ${escape(received)}</div>
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:${WARM};margin:0;padding:24px 12px">
  <tr><td align="center">
    <table role="presentation" cellpadding="0" cellspacing="0" width="600" style="width:100%;max-width:600px;background:#ffffff;border:1px solid ${LINE};border-radius:12px;overflow:hidden">
      <tr><td style="background:${INK};padding:20px 28px">
        <div style="font:700 21px/1 ${FONT};color:#ffffff;letter-spacing:-.01em">OMH<span style="color:${GOLD}">.</span></div>
        <div style="font:600 10px/1.4 ${FONT};color:${GOLD};letter-spacing:.16em;text-transform:uppercase;margin-top:6px">${escape(
          company.name,
        )}</div>
      </td></tr>
      <tr><td style="padding:28px 28px 4px">
        <div style="font:700 11px/1.4 ${FONT};color:${GOLD_DEEP};letter-spacing:.14em;text-transform:uppercase">New enquiry</div>
        <h1 style="font:600 20px/1.35 ${FONT};color:${INK};margin:10px 0 0">${escape(formName)}</h1>
        <p style="font:400 13px/1.5 ${FONT};color:${MUTED};margin:10px 0 20px">Submitted from <span style="color:${INK}">${escape(
          source,
        )}</span> · ${escape(received)}</p>
      </td></tr>
      ${replyRow}
      <tr><td style="padding:20px 28px 8px">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%">${answers}</table>
      </td></tr>
      <tr><td style="background:${WARM};border-top:1px solid ${LINE};padding:18px 28px">
        <div style="font:400 12px/1.6 ${FONT};color:${MUTED}">
          ${escape(company.name)} · ${escape(company.address)}<br>
          ${escape(company.phoneDisplay)} · ${escape(company.email)} · Company No. ${escape(company.companyNo)}
        </div>
      </td></tr>
    </table>
  </td></tr>
</table>`;

  const text = [
    `New enquiry — ${formName}`,
    `Submitted from ${source} · ${received}`,
    replyTo ? `Reply to ${replyTo}` : "",
    "",
    ...entries.map(([label, value]) => `${label}\n${flatten(value)}\n`),
    "—",
    `${company.name} · ${company.phoneDisplay} · ${company.email}`,
  ]
    .filter((line) => line !== "")
    .join("\n");

  // Which form, and which page it came from — both in the subject, because one
  // inbox receives all 15 forms.
  const subject = `New enquiry — ${formName}${page ? ` (${page})` : ""}`.slice(0, 160);

  return { subject, html, text };
}
