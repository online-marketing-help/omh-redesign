"use client";

import { useEffect } from "react";
import { fitRoiFrames } from "./fitRoiFrames";
import { wireLeadDemo } from "./wireLeadDemo";
import { runIndustryScript } from "./industry-script";

export type IndustryCopy = {
  /** "agency" / "practice": used in form messages and the enquiry name. */
  org: string;
  /** "branches" / "surgeries". */
  units: string;
  /** Name the greeting demo uses when the visitor leaves the box empty. */
  demoName: string;
  /** Greeting after "Good morning, {name}. ". */
  greeting: string;
};

/*
  Runs the design file's script (./industry-script.js) against the page and
  undoes it on unmount, so client-side navigation leaves nothing running.
  Listeners are caught by wrapping addEventListener while the script sets up;
  timers, frames and observers go through tracked stand-ins it receives as
  parameters, which also covers the ones it starts later.
*/
/** `blocks`: the page-specific parts of industry-script.js this page needs. */
export function IndustryScript({ copy, blocks }: { copy: IndustryCopy; blocks: string[] }) {
  useEffect(() => {
    const undo: (() => void)[] = [];
    const page = document.getElementById("va-page");
    if (/[?&]review=1/.test(location.search)) page?.classList.add("review-mode");

    const add = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function (type, fn, opts) {
      add.call(this, type, fn, opts);
      undo.push(() => this.removeEventListener(type, fn, opts));
    };
    try {
      runIndustryScript({
        setTimeout: (fn: TimerHandler, ms?: number) => {
          const id = window.setTimeout(fn, ms);
          undo.push(() => clearTimeout(id));
          return id;
        },
        setInterval: (fn: TimerHandler, ms?: number) => {
          const id = window.setInterval(fn, ms);
          undo.push(() => clearInterval(id));
          return id;
        },
        requestAnimationFrame: (fn: FrameRequestCallback) => {
          const id = window.requestAnimationFrame(fn);
          undo.push(() => cancelAnimationFrame(id));
          return id;
        },
        IntersectionObserver: class extends IntersectionObserver {
          constructor(cb: IntersectionObserverCallback, opts?: IntersectionObserverInit) {
            super(cb, opts);
            undo.push(() => this.disconnect());
          }
        },
        copy,
        blocks,
      });
    } finally {
      EventTarget.prototype.addEventListener = add;
    }
    if (page) undo.push(fitRoiFrames(page));
    if (page) undo.push(wireLeadDemo(page));

    return () => {
      // ponytail: undo grows by one entry per timer for the page's lifetime; fine for one page view.
      undo.forEach((fn) => fn());
      window.speechSynthesis?.cancel();
      document.documentElement.classList.remove("js-reveal");
    };
  }, [copy, blocks]);

  return null;
}
