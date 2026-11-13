"use server";

import { revalidatePath } from "next/cache";
import { assertCanWrite } from "@/lib/dashboard/auth";
import * as routing from "@/lib/dashboard/routing";

/* Stopping one person's follow-up.

   Settings has a switch that stops everything; until now there was no way to
   stop one. That is the control somebody actually reaches for: a lead rings
   in, you deal with them, and the text scheduled for this evening should not
   go out. */

export type Result = { ok: boolean; message?: string };

export async function stopOne(leadId: string, name?: string): Promise<Result> {
  const auth = await assertCanWrite();
  if (!auth.ok) return { ok: false, message: auth.why };

  const res = await routing.stopSequence(leadId, "manual");
  if (!res) return { ok: false, message: "Could not reach the routing store." };

  revalidatePath("/lead-dashboard/sequences");
  return {
    ok: true,
    message: res.stopped
      ? `Stopped. Nothing further goes to ${name || "them"}.`
      : "There was nothing still scheduled.",
  };
}
