"use client";

import { useEffect } from "react";

/*
  Page motion for /ai-voice-agents, after kirki.com, sparktech.agency and musemind.agency (20 Oct 2026):
  headings that rise word by word out of a mask, staggered fade-ups for cards, media that unclips and
  scales as it enters, a scroll progress line, a slight magnetic pull on buttons and a cursor glow on cards.

  No library. Elements are tagged here by selector, so the markup files stay as they are. Content is only
  hidden once this script is running in a visible tab with IntersectionObserver available, anything
  already on screen or scrolled past is shown at once, and a timer shows whatever is left after 4s, so a
  stalled observer can never leave a section blank. Reduced motion turns all of it off.
*/

// Each kind has its own entrance (voice-agents.css): rise, slide in from either side, scale up, sharpen from a
// blur, pop, or unclip. Kept to one kind per group so a section reads as one gesture, not a medley.
const REVEAL = [
  ["section .eyebrow", "eyebrow"],
  ["section > .container-omh > p.text-muted, section > .container-omh > p.text-band-muted, section .head-c > p, #what-is p.text-band-muted, #right-fit p.text-muted, #features > .container-omh > p", "blur"],
  ["[data-industry], #features ol > li, .tl-card", "up"],
  [".cap-tab, [data-brand-step], [data-fit-form]", "left"],
  ["#right-fit .hover-card, [data-faq-item], #faq .rounded-\\[16px\\]", "right"],
  [".va-car", "slide"],
  ["#pricing article, #compare [data-cmp] dl > div, #feedback dl, .kstats > div", "scale"],
  ["#compare .lg\\:block", "up"],
  [".tl-num", "pop"],
  [".brand-phone, #use-cases [data-tab-panel]:not([hidden]), .flow-panel, #industries aside", "clip"],
] as const;

export function VoiceMotion() {
  useEffect(() => {
    const root = document.getElementById("va-page");
    if (!root) return;
    const skip = () => document.documentElement.classList.add("motion-skip");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return skip();
    if (document.visibilityState !== "visible" || !("IntersectionObserver" in window)) return skip();

    const undo: (() => void)[] = [];
    const on = (t: EventTarget, type: string, fn: EventListener, opts?: AddEventListenerOptions) => {
      t.addEventListener(type, fn, opts);
      undo.push(() => t.removeEventListener(type, fn, opts));
    };
    const vh = () => window.innerHeight;

    /* -------- Headings: words rise out of a mask, one after another */
    const headings = Array.from(root.querySelectorAll<HTMLElement>("section h2, #top h1")).filter((h) => !h.dataset.split && h.offsetParent);
    headings.forEach((h) => {
      const original = h.innerHTML;
      let n = 0;
      const wrap = (node: Node) => {
        if (node.nodeType === 3) {
          const frag = document.createDocumentFragment();
          node.textContent!.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) return frag.append(part);
            const outer = document.createElement("span");
            outer.className = "mw";
            const inner = document.createElement("span");
            inner.style.setProperty("--i", String(n++));
            inner.textContent = part;
            outer.append(inner);
            frag.append(outer);
          });
          node.parentNode!.replaceChild(frag, node);
        } else if (node.nodeType === 1 && (node as Element).tagName !== "BR") {
          Array.from(node.childNodes).forEach(wrap);
        }
      };
      h.setAttribute("aria-label", h.textContent!.replace(/\s+/g, " ").trim());
      Array.from(h.childNodes).forEach(wrap);
      h.dataset.split = "1";
      h.classList.add("m-words");
      undo.push(() => {
        h.innerHTML = original;
        h.removeAttribute("aria-label");
        delete h.dataset.split;
        h.classList.remove("m-words", "is-in");
      });
    });

    /* -------- Fade-up and clip reveals, staggered within their row */
    const tagged = new Set<HTMLElement>(headings);
    REVEAL.forEach(([sel, kind]) =>
      root.querySelectorAll<HTMLElement>(sel).forEach((el) => {
        if (tagged.has(el)) return;
        tagged.add(el);
        el.classList.add("m-" + kind);
      }),
    );
    // Siblings that enter together get a small delay each, so a row of cards ripples in.
    tagged.forEach((el) => {
      if (el.classList.contains("m-words")) return;
      const sibs = Array.from(el.parentElement?.children ?? []).filter((s) => tagged.has(s as HTMLElement));
      el.style.setProperty("--d", `${Math.min(sibs.indexOf(el), 5) * 90}ms`);
    });

    // Once an element has arrived, drop the entrance timing so hover effects respond at their own speed.
    const show = (el: Element) => {
      el.classList.add("is-in");
      const d = parseFloat((el as HTMLElement).style.getPropertyValue("--d")) || 0;
      window.setTimeout(() => el.classList.add("m-done"), d + 1300);
      const tl = el.closest(".tl");
      if (tl) tl.classList.add("is-in");
    };
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          show(e.target);
          io.unobserve(e.target);
          countUp(e.target as HTMLElement);
        }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    /* -------- Hero intro: badge, headline words, lead, buttons, strip and video arrive in sequence on load */
    const heroTop = root.querySelector<HTMLElement>("#top");
    const heroParts = heroTop && heroTop.getBoundingClientRect().bottom > 0
      ? Array.from(heroTop.querySelectorAll<HTMLElement>(".badge, h1, .lead, #hero-form, #hero-form + p, #industries-strip, .hero-video"))
      : [];
    const heroWords = heroTop?.querySelector<HTMLElement>("h1.m-words");
    heroParts.forEach((el, k) => {
      tagged.delete(el);
      if (el !== heroWords) el.classList.add("m-hero");
      el.style.setProperty("--d", `${[0, 120, 520, 650, 760, 860, 980][k] ?? 1000}ms`);
    });
    if (heroWords) heroWords.style.setProperty("--wd", "140ms");
    undo.push(() => heroParts.forEach((el) => { el.classList.remove("m-hero", "is-in"); el.style.removeProperty("--d"); el.style.removeProperty("--wd"); }));

    tagged.forEach((el) => {
      // Already on screen or scrolled past: show now, no animation from a reload mid-page.
      if (el.getBoundingClientRect().top < vh() * 0.92) {
        el.classList.add("is-in", "m-instant");
        countUp(el);
      } else io.observe(el);
    });
    // Apply the hidden states with transitions off (otherwise the hiding itself animates and the hero never
    // visibly starts hidden), let that paint, then switch transitions back on and play the hero in.
    const html = document.documentElement;
    html.classList.add("m-setup", "motion-ready");
    void html.offsetHeight;
    requestAnimationFrame(() => {
      html.classList.remove("m-setup");
      requestAnimationFrame(() => heroParts.forEach(show));
    });
    undo.push(() => html.classList.remove("m-setup"));
    const failsafe = window.setTimeout(() => {
      tagged.forEach((el) => el.getBoundingClientRect().top < vh() && show(el));
      heroParts.forEach(show);
    }, 4000);
    undo.push(() => {
      io.disconnect();
      clearTimeout(failsafe);
      document.documentElement.classList.remove("motion-ready");
      tagged.forEach((el) => {
        el.classList.remove(...REVEAL.map(([, k]) => "m-" + k), "is-in", "m-instant", "m-done");
        el.style.removeProperty("--d");
      });
    });

    // A new industry tab panel should arrive with the same clip reveal.
    root.querySelectorAll<HTMLElement>("#use-cases [data-tab-panel]").forEach((p) => {
      p.classList.add("m-clip", "is-in");
      tagged.add(p);
    });
    on(root, "click", (e) => {
      const tab = (e.target as Element).closest("#use-cases [data-tab]");
      if (!tab) return;
      const panel = document.getElementById(tab.getAttribute("aria-controls") || "");
      if (!panel) return;
      panel.classList.remove("is-in", "m-instant");
      requestAnimationFrame(() => requestAnimationFrame(() => panel.classList.add("is-in")));
    });

    /* -------- Count the feedback figures up when they appear */
    function countUp(el: HTMLElement) {
      el.querySelectorAll<HTMLElement>("dd.tnum, dd .tnum").forEach((dd) => {
        if (dd.dataset.counted) return;
        const raw = dd.textContent || "";
        const target = Number(raw.replace(/[^\d.]/g, ""));
        if (!target) return;
        dd.dataset.counted = "1";
        const suffix = raw.replace(/[\d,.\s]/g, "");
        const fmt = new Intl.NumberFormat("en-GB");
        const t0 = performance.now();
        const step = (t: number) => {
          const p = Math.min(1, (t - t0) / 1400);
          dd.textContent = fmt.format(Math.round(target * (1 - Math.pow(1 - p, 3)))) + suffix;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    }

    /* -------- Scroll-linked: progress line, hero video scale, slow parallax on glows */
    const bar = document.createElement("div");
    bar.className = "m-progress";
    bar.setAttribute("aria-hidden", "true");
    document.body.append(bar);
    undo.push(() => bar.remove());
    const video = root.querySelector<HTMLElement>(".hero-video .video-frame");
    const glows = Array.from(root.querySelectorAll<HTMLElement>(".blur-3xl, .hero-glow"));
    let raf = 0;
    // The video eases toward its scroll position (a fraction of the distance each frame), so the growth feels
    // continuous rather than locked to the scrollbar.
    let vp = -1;
    const videoTarget = () => {
      const r = video!.parentElement!.getBoundingClientRect();
      return Math.max(0, Math.min(1, (vh() - r.top) / (vh() * 0.9)));
    };
    const frame = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - vh();
      bar.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
      if (video) {
        const target = videoTarget();
        vp = vp < 0 ? target : vp + (target - vp) * 0.09;
        const eased = 1 - Math.pow(1 - vp, 2);
        video.style.transform = `scale(${(0.86 + 0.14 * eased).toFixed(4)})`;
        video.style.borderRadius = `${(30 - 14 * eased).toFixed(1)}px`;
        if (Math.abs(target - vp) > 0.0008) raf = requestAnimationFrame(frame);
      }
      glows.forEach((g) => {
        const r = g.parentElement!.getBoundingClientRect();
        g.style.translate = `0 ${Math.round((r.top + r.height / 2 - vh() / 2) * -0.12)}px`;
      });
    };
    const tick = () => { if (!raf) raf = requestAnimationFrame(frame); };
    on(window, "scroll", tick, { passive: true });
    on(window, "resize", tick);
    frame();
    undo.push(() => {
      cancelAnimationFrame(raf);
      if (video) { video.style.transform = ""; video.style.borderRadius = ""; }
      glows.forEach((g) => (g.style.translate = ""));
    });

    /* -------- Pointer only: magnetic primary buttons, cursor glow on cards */
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      // A slight pull toward the cursor, a few pixels at most, on every button.
      document.querySelectorAll<HTMLElement>("#va-page .btn, #va-page .va-car-btn, #book-demo-form button[type=submit], #book-demo-form [data-next]").forEach((b) => {
        const move = (e: Event) => {
          const { clientX, clientY } = e as PointerEvent;
          const r = b.getBoundingClientRect();
          const x = Math.max(-4, Math.min(4, (clientX - r.left - r.width / 2) * 0.06));
          const y = Math.max(-3, Math.min(3, (clientY - r.top - r.height / 2) * 0.1));
          b.style.translate = `${x.toFixed(1)}px ${y.toFixed(1)}px`;
        };
        const leave = () => (b.style.translate = "");
        on(b, "pointermove", move);
        on(b, "pointerleave", leave);
        undo.push(leave);
      });
      const glowSel = [
        ".hover-card", "[data-industry]", "#industries aside", "#pricing article", ".city", "#feedback figure", ".tl-card",
        "#features ol > li", "[data-tab-panel]", ".cap-tab", "[data-brand-step]", "#use-cases .bg-sand", "[data-faq-item]",
        "#faq .rounded-\\[16px\\]", "#compare [data-cmp] dl > div", "#what-is .bg-band-surface",
      ].map((s) => "#va-page " + s).concat("#book-demo-form [role=tab]").join(", ");
      const glowing = Array.from(document.querySelectorAll<HTMLElement>(glowSel));
      glowing.forEach((el) => {
        el.classList.add("m-glow");
        if (el.closest(".on-band, #book-demo-form, .flow-panel")) el.classList.add("m-glow-dark");
      });
      undo.push(() => glowing.forEach((el) => el.classList.remove("m-glow", "m-glow-dark")));
      on(document, "pointermove", (e) => {
        const card = (e.target as Element).closest<HTMLElement>(".m-glow");
        if (!card) return;
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${(e as PointerEvent).clientX - r.left}px`);
        card.style.setProperty("--my", `${(e as PointerEvent).clientY - r.top}px`);
      });
    }

    return () => undo.forEach((fn) => fn());
  }, []);

  return null;
}
