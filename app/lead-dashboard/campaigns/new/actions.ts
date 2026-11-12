"use server";

import { revalidatePath } from "next/cache";
import { assertCanWrite } from "@/lib/dashboard/auth";

/* =========================================================================
   Starting a reactivation campaign.

   This posts a screened list to n8n and nothing else. The workflow
   (`11-reactivation`) screens it AGAIN with the same gate, saves each
   person, records their consent, and enrols them in pages of a hundred.

   The screening happens twice on purpose and that is not duplication. The
   copy in the browser exists so somebody can SEE who would be contacted
   before anything is sent; the copy in n8n is the one that decides, because
   a browser can be edited and a preview is not a guarantee. They are the
   same file, `gates/consent-gate.js`, so they cannot disagree about who is
   contactable.
   ========================================================================= */

export type StartResult = {
  ok: boolean;
  message?: string;
  campaignId?: string;
  intended?: number;
  accepted?: number;
  refused?: number;
};

export type Candidate = {
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  service?: string;
  consentBasis: string;
  consentEvidence: string;
  lastBoughtAt?: string;
};

export async function startCampaign(
  name: string,
  rows: Candidate[],
  note: string,
): Promise<StartResult> {
  const auth = await assertCanWrite();
  if (!auth.ok) return { ok: false, message: auth.why };

  const webhook = process.env.OHM_REACTIVATION_WEBHOOK;
  if (!webhook) {
    return {
      ok: false,
      message:
        "OHM_REACTIVATION_WEBHOOK is not set on this server, so there is " +
        "nowhere to send the list. Nothing was sent.",
    };
  }

  const clean = name.trim().slice(0, 120);
  if (!clean) return { ok: false, message: "Give the campaign a name." };
  if (!rows.length) return { ok: false, message: "There is nobody to contact." };

  /* A cap here as well as in the gate. This is a server action, which is
     its own POST endpoint: the number of rows is whatever the caller sends,
     not whatever the screen showed. */
  if (rows.length > 5000) {
    return { ok: false, message: "That is more than 5000 people. Split the list." };
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: clean,
        rows,
        consentBasis: "soft_optin",
        note: note.trim().slice(0, 400),
        by: auth.who,
      }),
      /* Long, because the workflow saves every person before it answers. A
         thousand people is a thousand writes. */
      signal: AbortSignal.timeout(120_000),
    });

    const text = await res.text();
    let d: StartResult & { why?: string };
    try {
      d = JSON.parse(text);
    } catch {
      /* An inactive workflow answers with an n8n error page, not JSON. That
         is the likeliest failure here and it deserves its own sentence. */
      return {
        ok: false,
        message:
          res.status === 404
            ? "The reactivation workflow is not active on n8n, so the list " +
              "was not sent. Nothing happened."
            : `n8n answered ${res.status} with something that was not JSON. ` +
              "Nothing was sent.",
      };
    }

    if (!d?.ok) {
      return { ok: false, message: d?.why ?? "n8n refused the list. Nothing was sent." };
    }

    revalidatePath("/lead-dashboard/campaigns");
    return {
      ok: true,
      campaignId: d.campaignId,
      intended: d.intended,
      accepted: d.accepted,
      refused: Array.isArray(d.refused) ? d.refused.length : d.refused,
    };
  } catch (e) {
    return {
      ok: false,
      message:
        "The list did not reach n8n: " +
        String((e as Error)?.message ?? e).slice(0, 160) +
        ". Nothing was sent.",
    };
  }
}
