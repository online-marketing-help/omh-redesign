"use client";

import { useEffect } from "react";

// Behaviour for the sections ported from ai-voice-agents-v4-landing-page.html
// (lib/content/ai-voice-agents-landing-v4.ts): the industry strip, the hero video and the
// "what happens on every call" lead flow. Ported from the design file's script, scoped to #v4l,
// with every listener, timer and observer undone on unmount.

type DataLayerWindow = Window & { dataLayer?: unknown[] };

function track(event: string, data: Record<string, unknown> = {}) {
  const w = window as DataLayerWindow;
  (w.dataLayer ||= []).push({ event, ...data });
}

export function LandingV4Script() {
  useEffect(() => {
    // The page root, which also holds the old page's sections; the v4 hooks only exist in the v4 ones.
    const root = document.getElementById("va-page");
    if (!root) return;
    const undo: (() => void)[] = [];
    const $ = <T extends HTMLElement = HTMLElement>(s: string, r: ParentNode = root) => r.querySelector<T>(s);
    const $$ = <T extends HTMLElement = HTMLElement>(s: string, r: ParentNode = root) => Array.from(r.querySelectorAll<T>(s));
    const on = (el: EventTarget, type: string, fn: EventListener) => {
      el.addEventListener(type, fn);
      undo.push(() => el.removeEventListener(type, fn));
    };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Industry strip: a second copy of the list makes the loop seamless; the button pauses it.
    $$("[data-marquee]").forEach((mq) => {
      const track_ = $(".marquee-track", mq);
      const list = track_ && $("ul", track_);
      if (!track_ || !list) return;
      const copy = list.cloneNode(true) as HTMLElement;
      copy.setAttribute("aria-hidden", "true");
      $$("a, button", copy).forEach((n) => (n.tabIndex = -1));
      track_.appendChild(copy);
      mq.classList.add("is-ready");
      undo.push(() => { copy.remove(); mq.classList.remove("is-ready"); });
      const btn = mq.id ? $(`[data-marquee-toggle="${mq.id}"]`) : null;
      if (btn)
        on(btn, "click", () => {
          const paused = btn.getAttribute("aria-pressed") !== "true";
          btn.setAttribute("aria-pressed", String(paused));
          btn.setAttribute("aria-label", `${paused ? "Play" : "Pause"} the moving ${btn.dataset.what || "row"}`);
          mq.classList.toggle("is-paused", paused);
        });
    });
    $$("[data-ind]").forEach((a) =>
      on(a, "click", () => {
        $$("[data-ind]").forEach((n) => n.setAttribute("aria-current", String(n.dataset.ind === a.dataset.ind)));
        track("industry_select", { industry: a.dataset.ind });
      }),
    );

    // Hero video: the privacy-enhanced YouTube player loads only when someone presses play.
    $$("[data-video]").forEach((frame) => {
      const link = $<HTMLAnchorElement>("[data-video-play]", frame);
      const id = frame.dataset.youtubeId;
      if (!link || !id) return;
      on(link, "click", (e) => {
        track("hero_video_play", { video: id, mode: "inline" });
        e.preventDefault();
        const iframe = document.createElement("iframe");
        iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0&playsinline=1`;
        iframe.title = frame.dataset.videoTitle || "Video";
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
        iframe.allowFullscreen = true;
        iframe.referrerPolicy = "strict-origin-when-cross-origin";
        frame.appendChild(iframe);
        link.hidden = true;
        iframe.focus();
      });
    });

    // Lead flow: plays one route at a time while in view; hovering, focusing or tapping an
    // outcome traces its route and pauses the loop.
    const flow = $("[data-lf-flow]");
    if (flow) {
      const status = $("[data-lf-status]");
      const parts: Record<string, HTMLElement> = {};
      $$("[data-lf]", flow).forEach((el) => (parts[el.dataset.lf!] = el));
      // An industry page can word the three routes for its sector: data-lf-routes='["…","…","…"]' on the flow.
      const own = flow.dataset.lfRoutes ? (JSON.parse(flow.dataset.lfRoutes) as string[]) : [];
      const LABELS: Record<number, string> = {
        1: own[0] ?? "Route 1 of 3: the lead books an appointment",
        2: own[1] ?? "Route 2 of 3: the lead asks for you and gets a warm transfer",
        3: own[2] ?? "Route 3 of 3: not ready yet, so the lead goes into follow-up",
      };
      const intro = status?.textContent ?? "";
      const steps = (k: number) => [["n1"], ["a1", "n2"], ["a2", "n3"], ["a3", "n4"], [`s${k}`, "sm", `b${k}`], [`m${k}`, "mm", "n5"]];
      const clear = () => {
        Object.values(parts).forEach((p) => p.classList.remove("is-on"));
        flow.classList.remove("is-tracing");
      };
      const show = (k: number, upTo: number) => {
        clear();
        steps(k).slice(0, upTo + 1).flat().forEach((key) => parts[key]?.classList.add("is-on"));
        if (upTo >= 4) flow.classList.add("is-tracing");
        if (status) status.textContent = LABELS[k];
      };
      let route = 1, step = 0, timer = 0, inView = false, held = false;
      const stop = () => { window.clearTimeout(timer); timer = 0; };
      const tick = () => {
        show(route, step);
        step++;
        let wait = 600;
        if (step > 5) { step = 0; route = (route % 3) + 1; wait = 1800; }
        timer = window.setTimeout(tick, wait);
      };
      const play = () => {
        if (reduce || held || !inView || timer) return;
        flow.classList.add("lf-flowing");
        tick();
      };
      let resume = 0;
      (["b1", "b2", "b3"] as const).forEach((key, i) => {
        const node = parts[key];
        if (!node) return;
        const hold = () => {
          held = true;
          stop();
          window.clearTimeout(resume);
          show(i + 1, 5);
          track("lead_flow_route", { route: i + 1 });
        };
        const release = () => {
          held = false;
          step = 0;
          route = (i % 3) + 1;
          if (reduce) { clear(); if (status) status.textContent = intro; }
          else resume = window.setTimeout(play, 1200);
        };
        on(node, "mouseenter", hold);
        on(node, "mouseleave", release);
        on(node, "focus", hold);
        on(node, "blur", release);
        on(node, "click", hold);
      });
      const io = new IntersectionObserver(([e]) => {
        inView = e.isIntersecting;
        if (inView) play(); else stop();
      }, { threshold: 0.35 });
      io.observe(flow);
      if (reduce && status) status.textContent = "Hover or tap an outcome to trace its route.";
      undo.push(() => { io.disconnect(); stop(); window.clearTimeout(resume); });
    }

    return () => undo.forEach((fn) => fn());
  }, []);

  return null;
}
