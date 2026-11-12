/* =========================================================================
   Calling a server action without betting the page on it.

   A server action is a POST. When it fails to arrive - a dropped
   connection, a sleeping laptop, a deploy mid-click - the promise rejects,
   and a rejection inside `startTransition` has nowhere to go but the
   nearest error boundary. The whole screen is then replaced.

   Measured: aborting the POST behind the outcome picker replaced the
   conversation somebody was reading with "This screen did not load". They
   lost the transcript because a tick box did not save.

   Every control here already knows how to say "that did not save" and keep
   its own state. This is what lets them, by turning a thrown error into
   the same shape the action returns when it refuses.

   It deliberately does not retry. A write that may or may not have landed
   is not something to repeat on the person's behalf.
   ========================================================================= */

export type Attempt = { ok: boolean; message?: string };

/* What to say, which depends on what the write DOES.

   A rejected fetch means the RESPONSE did not arrive. It does not mean the
   request was never served. For a write that sets a field to a value, that
   distinction does not matter and "try again" is the right advice. For a
   write that sends something to a person, it matters completely: the first
   attempt may have gone through, and repeating it sends twice.

   This function refuses to retry on the user's behalf for exactly that
   reason. Telling THEM to retry, in the same breath, would hand the
   problem straight back. So the two kinds of write say different things. */
export type Repeatable =
  /* Setting a value. Pressing again lands on the same answer. */
  | "safe"
  /* Sends a message, starts a sequence, enrols people. Pressing again may
     do it twice. */
  | "sends";

export async function attempt<T extends Attempt>(
  run: () => Promise<T>,
  kind: Repeatable = "safe",
): Promise<T | { ok: false; message: string }> {
  try {
    return await run();
  } catch {
    /* No detail from the error itself: it is almost always "Failed to
       fetch", which tells a person at OMH nothing. */
    return {
      ok: false,
      message:
        kind === "sends"
          ? "We could not confirm that. It may still have gone through, so check before doing it again."
          : "That did not reach us. Check your connection and try again.",
    };
  }
}
