"use client";

import { useEffect } from "react";

// The widgets of the industry-only sections (lib/content/voice-extras.ts): the day chart's "today / with an
// AI agent" switch (summaries come from the chart's data-sum-today / data-sum-ai) and the checklist count.
export function LandingExtrasScript() {
  useEffect(() => {
    const off: (() => void)[] = [];
    const on = (el: EventTarget, type: string, fn: EventListener) => {
      el.addEventListener(type, fn);
      off.push(() => el.removeEventListener(type, fn));
    };

    const chart = document.querySelector<HTMLElement>("[data-day-chart]");
    const sum = document.querySelector<HTMLElement>("[data-day-sum]");
    const key = document.querySelector<HTMLElement>("[data-day-key]");
    const radios = Array.from(document.querySelectorAll<HTMLElement>("[data-day-mode]"));
    const text = {
      today: [chart?.dataset.sumToday ?? "", "Missed"],
      ai: [chart?.dataset.sumAi ?? "", "Answered by your AI agent"],
    };
    const setMode = (i: number, focus = false) => {
      const mode = radios[i].dataset.dayMode as keyof typeof text;
      radios.forEach((r, n) => {
        r.setAttribute("aria-checked", String(n === i));
        r.tabIndex = n === i ? 0 : -1;
      });
      if (focus) radios[i].focus();
      if (chart) chart.dataset.mode = mode;
      if (sum) sum.textContent = text[mode][0];
      if (key) key.textContent = text[mode][1];
    };
    radios.forEach((r, i) => {
      on(r, "click", () => setMode(i));
      on(r, "keydown", (e) => {
        const k = (e as KeyboardEvent).key;
        const step = k === "ArrowRight" || k === "ArrowDown" ? 1 : k === "ArrowLeft" || k === "ArrowUp" ? -1 : 0;
        if (!step) return;
        e.preventDefault();
        setMode((i + step + radios.length) % radios.length, true);
      });
    });

    return () => off.forEach((f) => f());
  }, []);
  return null;
}
