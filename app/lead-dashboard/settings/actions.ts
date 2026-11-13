"use server";

import { revalidatePath } from "next/cache";
import { assertCanWrite } from "@/lib/dashboard/auth";
import * as routing from "@/lib/dashboard/routing";

/* =========================================================================
   The one switch that stops everything.

   As with the handover actions, the password is checked here and not only in
   proxy.ts: a server action is its own POST endpoint.
   ========================================================================= */

export type Result = { ok: boolean; message?: string; enabled?: boolean };

/**
 * Stop or resume every automated message.
 *
 * The two directions are not symmetrical and the screen treats them that way.
 * Stopping is an emergency: one press, no confirmation, because a switch you
 * have to confirm is not an emergency stop. Resuming starts texting real
 * people again, so the screen asks first.
 */
export async function setOutbound(enabled: boolean): Promise<Result> {
  const auth = await assertCanWrite();
  if (!auth.ok) return { ok: false, message: auth.why };

  const res = await routing.setOutbound(enabled, auth.who);
  if (!res) {
    return {
      ok: false,
      message:
        "Could not reach the routing store, so nothing has changed. If messages need to stop now, deactivate the Sequence Worker in n8n.",
    };
  }

  revalidatePath("/lead-dashboard/settings");
  revalidatePath("/lead-dashboard/sequences");
  return {
    ok: true,
    enabled: res.enabled,
    message: res.enabled
      ? "Automated messages are running again."
      : "Stopped. Nothing automated will be sent until this is switched back on.",
  };
}

/* What a channel costs per month.

   The only figure on this dashboard a person has to supply. Everything else
   is observed; this is told, and without it the allocation section can rank
   channels by how well they convert but not by what they cost. */
export async function saveChannelSpend(
  channel: string,
  pounds: number | null,
): Promise<Result> {
  const auth = await assertCanWrite();
  if (!auth.ok) return { ok: false, message: auth.why };

  const res = await routing.setChannelSpend(channel, pounds, auth.who);
  if (!res) return { ok: false, message: "Could not reach the settings store." };
  if (!res.ok) {
    return {
      ok: false,
      message: res.why === "not_a_cost" ? "That is not a monthly cost." : "That did not save.",
    };
  }

  /* The allocation section on the Overview reads this, and so does the
     Channels report. Both are stale the moment a figure changes. */
  revalidatePath("/lead-dashboard");
  revalidatePath("/lead-dashboard/channels");
  revalidatePath("/lead-dashboard/settings");
  return { ok: true };
}
