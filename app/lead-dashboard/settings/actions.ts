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
