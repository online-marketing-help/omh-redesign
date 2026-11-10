"use server";

import { revalidatePath } from "next/cache";
import { assertCanWrite } from "@/lib/dashboard/auth";
import * as routing from "@/lib/dashboard/routing";

/* Marking a no-show, and chasing it.

   Two steps on purpose, and in this order. The status is the fact and it is
   recorded first; the chase is a consequence, and if enrolling fails the
   diary is still right. The other way round, a failed mark would leave
   somebody being texted about an appointment the system still thinks they
   kept. */

export type Result = { ok: boolean; message?: string; chasing?: boolean };

export async function markNoShow(reference: string): Promise<Result> {
  const auth = await assertCanWrite();
  if (!auth.ok) return { ok: false, message: auth.why };

  const marked = await routing.manageBooking(reference, "no_show");
  if (!marked) return { ok: false, message: "Could not reach the booking store." };
  if (!marked.ok) return { ok: false, message: "No booking with that reference." };

  /* Route G: two messages, then it stops. It goes through the same consent
     gate, the same quiet hours and the same lease as every other route,
     which is the whole reason the chase is a route rather than a second
     scheduler bolted on here. */
  /* Found by number, because that is what a booking carries that a lead
     also carries. The session id would be exact but `/lead/find` matches on
     the normalised phone and email, which is the same rule that stops one
     person becoming two records everywhere else. */
  let chasing = false;
  const lead = marked.phone ? await routing.findLead(marked.phone) : null;
  if (lead?.leadId) {
    const e = await routing.enrol(lead.leadId, "G", marked.sessionId ?? undefined);
    chasing = e?.enrolled === true;
  }

  revalidatePath("/lead-dashboard/bookings");
  revalidatePath("/lead-dashboard");
  return { ok: true, chasing };
}
