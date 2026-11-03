"use server";

import { revalidatePath } from "next/cache";
import { assertCanWrite } from "@/lib/dashboard/auth";
import * as handover from "@/lib/dashboard/handover";
import type { Thread } from "@/lib/dashboard/handover";

/* =========================================================================
   What the handover screen is allowed to do.

   Every one of these checks the dashboard password first. A server action is
   its own POST endpoint, so the check in proxy.ts is not enough on its own:
   see lib/dashboard/auth.ts for why this is repeated here.

   They return a result rather than throwing, because the thing that goes
   wrong most often is "someone else took this conversation", and that is
   something to tell the person reading, not an error page.
   ========================================================================= */

export type Result = { ok: boolean; message?: string; thread?: Thread | null };

/** The live thread, for the screen's own refresh. Read only, and it still
    requires the password: the transcript is a visitor's conversation. */
export async function fetchThread(sessionId: string): Promise<Result> {
  const auth = await assertCanWrite();
  if (!auth.ok) return { ok: false, message: auth.why };
  const thread = await handover.getThread(sessionId);
  if (!thread) return { ok: false, message: "Could not reach the conversation store." };
  return { ok: true, thread };
}

export async function takeOver(sessionId: string): Promise<Result> {
  const auth = await assertCanWrite();
  if (!auth.ok) return { ok: false, message: auth.why };

  const res = await handover.claim(sessionId, auth.who);
  if (!res) return { ok: false, message: "Could not reach the conversation store." };
  if (!res.ok) {
    return {
      ok: false,
      message:
        res.error === "already taken"
          ? `${res.takenBy} is already answering this one.`
          : res.error || "Could not take this conversation over.",
    };
  }
  revalidatePath("/lead-dashboard/handover");
  return { ok: true, thread: await handover.getThread(sessionId) };
}

export async function sendReply(sessionId: string, text: string): Promise<Result> {
  const auth = await assertCanWrite();
  if (!auth.ok) return { ok: false, message: auth.why };

  const clean = text.trim();
  if (!clean) return { ok: false, message: "Nothing to send." };

  const res = await handover.reply(sessionId, clean, auth.who);
  if (!res?.ok) return { ok: false, message: res?.error || "The reply did not send." };
  revalidatePath("/lead-dashboard/handover");
  return { ok: true, thread: await handover.getThread(sessionId) };
}

export async function handBack(sessionId: string, note?: string): Promise<Result> {
  const auth = await assertCanWrite();
  if (!auth.ok) return { ok: false, message: auth.why };

  const res = await handover.release(sessionId, note);
  if (!res?.ok) return { ok: false, message: "Could not hand this one back." };
  revalidatePath("/lead-dashboard/handover");
  return { ok: true, thread: await handover.getThread(sessionId) };
}
