// Makes the suggested questions in the live demo section actually ask the
// agent (lib/content/lead-demo.ts).
//
// The demo runs in a cross-origin iframe, so the page cannot reach into it. It
// posts a message instead and the widget, when docked, listens for exactly two
// of them. Everything else from the parent is ignored, and the widget ignores
// messages from anyone when it is not docked.
//
// If the frame has not finished loading, the click is held and replayed once it
// has, so an early click is not silently swallowed.

type Ask = { type: "assistant:ask"; text: string };

export function wireLeadDemo(root: ParentNode): () => void {
  const frame = root.querySelector<HTMLIFrameElement>("iframe[data-ld-frame]");
  const asks = root.querySelectorAll<HTMLButtonElement>("[data-ld-ask]");
  if (!frame || !asks.length) return () => {};

  let ready = frame.contentWindow !== null && frame.dataset.ldReady === "1";
  let pending: Ask | null = null;

  const post = (msg: Ask) => {
    const win = frame.contentWindow;
    if (!win) return;
    /* The frame's origin, not "*": the message carries nothing sensitive, but
       there is no reason to broadcast it to whatever else is listening. */
    try {
      win.postMessage(msg, new URL(frame.src).origin);
    } catch {
      /* A malformed src would throw on URL(); nothing to do but skip. */
    }
  };

  const onLoad = () => {
    ready = true;
    frame.dataset.ldReady = "1";
    if (pending) {
      post(pending);
      pending = null;
    }
  };
  frame.addEventListener("load", onLoad);

  const undo: (() => void)[] = [() => frame.removeEventListener("load", onLoad)];

  asks.forEach((btn) => {
    const onClick = () => {
      const text = btn.dataset.ldAsk;
      if (!text) return;
      const msg: Ask = { type: "assistant:ask", text };
      if (ready) post(msg);
      else pending = msg;
      /* Bring the conversation into view on a phone, where the frame is below
         the buttons rather than beside them. */
      frame.scrollIntoView({ behavior: "smooth", block: "nearest" });
    };
    btn.addEventListener("click", onClick);
    undo.push(() => btn.removeEventListener("click", onClick));
  });

  return () => undo.forEach((fn) => fn());
}
