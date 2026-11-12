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

export async function attempt<T extends Attempt>(
  run: () => Promise<T>,
): Promise<T | { ok: false; message: string }> {
  try {
    return await run();
  } catch {
    /* No detail from the error itself: it is almost always "Failed to
       fetch", which tells a person at OMH nothing. What they need to know
       is whether it saved, and it did not. */
    return {
      ok: false,
      message: "That did not reach us. Check your connection and try again.",
    };
  }
}
