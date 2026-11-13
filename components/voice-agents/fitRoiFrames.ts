// Grows each ROI calculator frame (lib/content/roi-calculator.ts) to its content: about 2,060px on
// desktop and 3,500px on mobile, against a 1400px starting height, so the lead form is never behind
// an inner scrollbar. Runs from the page scripts after hydration; an inline onload ran before it,
// changed the markup React was about to hydrate and logged a mismatch.
//
// body.offsetHeight, not scrollHeight, so the frame can shrink again. The ResizeObserver must be the
// frame's own: a parent-window one never fires for elements inside the frame.
// The calculators are generated files with a light palette built on CSS variables. In dark mode the page hands
// them a dark set of the same variables (they are same-origin, so the parent can add a style element), and
// follows the theme toggle. The files themselves stay untouched.
const DARK_CALC = `:root{--ink:#ebebeb;--muted:#acacac;--line:#363636;--warm:#000;--surface:#202020;--amber-deep:#7d5c33;--good:#ebebeb;--bad:#f4a69b;color-scheme:dark}
.src.study .grade,.planbox,.modes button.on,.segments button.on,.tip-b:hover,.tip.open .tip-b,.has-tip:hover .tip-b{color:#000}
.src.vendor .grade{background:#2b2414}.src.ours .grade{background:#292929}
input,select,textarea{background:var(--surface);color:var(--ink);border-color:var(--line)}
.panel-in{background:linear-gradient(180deg,#262626,var(--surface))}.badge{background:#2b2414}
.highlight{background:#2a2316}.cta,button.cta{color:#000}
.panel{box-shadow:0 24px 60px -34px rgba(0,0,0,.8)}`;
function syncTheme(doc: Document) {
  const dark = document.documentElement.dataset.theme === "dark";
  let style = doc.getElementById("omh-dark-theme");
  if (dark && !style) {
    style = doc.createElement("style");
    style.id = "omh-dark-theme";
    style.textContent = DARK_CALC;
    doc.head.append(style);
  } else if (!dark && style) style.remove();
}

export function fitRoiFrames(root: ParentNode): () => void {
  const undo: (() => void)[] = [];
  const docs = new Set<Document>();
  const themeWatch = new MutationObserver(() => docs.forEach(syncTheme));
  themeWatch.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  undo.push(() => themeWatch.disconnect());
  root.querySelectorAll<HTMLIFrameElement>("iframe[data-roi-frame]").forEach((frame) => {
    const attach = () => {
      const doc = frame.contentDocument;
      const win = frame.contentWindow as (Window & typeof globalThis) | null;
      if (!doc?.body || !win || doc.URL === "about:blank") return;
      docs.add(doc);
      syncTheme(doc);
      const fit = () => (frame.style.height = doc.body.offsetHeight + "px");
      fit();
      const ro = new win.ResizeObserver(fit);
      ro.observe(doc.body);
      undo.push(() => ro.disconnect());
    };
    if (frame.contentDocument?.readyState === "complete") attach();
    frame.addEventListener("load", attach);
    undo.push(() => frame.removeEventListener("load", attach));
  });
  return () => undo.forEach((fn) => fn());
}
