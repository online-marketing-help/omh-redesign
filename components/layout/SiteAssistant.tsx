"use client";

import Script from "next/script";

/*
  OMH site assistant (chat + voice). Served from this site's own public folder,
  so it ships with the site: one repo, one deploy, one version.

  It used to load from a separate Vercel project, and that cost us an evening.
  The site moved to Hostinger and was deployed from GitHub several times while
  the widget stayed on the old build, because nothing in this repo was what the
  browser actually fetched. Handover replies went into the database and never
  reached the visitor, and the assistant kept answering over the top of a
  person. The bundle lives at public/ohm-assistant.js now; rebuild it with
  `node widget/web/embed/build.mjs` and copy it there.

  Its webhooks only accept onlinemarketinghelp.co.uk, so on other domains the
  pill shows but replies fail until that domain is allow-listed.

  The widget's pill is fixed bottom-right inside a closed-off shadow root. Pages
  with their own fixed bottom bar (the AI voice agent pages' mobile booking bar)
  lift it by setting --omh-fab-lift on #ohm-assistant-root; this one rule,
  added to the widget's open shadow root, is what reads that variable.
*/
// ponytail: depends on the widget's `.fab` class; if it is renamed the lift just stops working.
const LIFT =
  ".fab{bottom:calc(20px + var(--omh-fab-lift,0px))!important}" +
  "@media (max-width:460px){.fab{bottom:calc(12px + var(--omh-fab-lift,0px))!important}}";

export function SiteAssistant() {
  return (
    <Script
      src="/ohm-assistant.js"
      strategy="lazyOnload"
      onReady={() => {
        const root = document.getElementById("ohm-assistant-root")?.shadowRoot;
        if (!root || root.getElementById("omh-fab-lift")) return;
        const style = document.createElement("style");
        style.id = "omh-fab-lift";
        style.textContent = LIFT;
        root.append(style);
      }}
    />
  );
}
