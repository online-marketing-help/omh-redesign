"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "@/components/ui/Button";

/*
  Appears once the visitor is a screen or so down the page. Uses the same
  passive scroll listener pattern as the header rather than a second observer.
*/
export function ScrollTop() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Sits above the site assistant's "Ask the assistant" pill (app/layout.tsx),
  // which takes the bottom-right corner.
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      tabIndex={shown ? 0 : -1}
      aria-hidden={!shown}
      className={`scroll-top fixed bottom-24 right-6 z-40 flex size-12 cursor-pointer items-center justify-center rounded-full border border-line bg-surface text-ink shadow-[0_18px_40px_-20px_rgb(0_0_0/0.55)] transition-[opacity,transform,background-color,color] duration-300 hover:bg-inverse hover:text-oninverse max-sm:bottom-20 max-sm:right-4 ${
        shown ? "opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <span className="sr-only">Back to top</span>
      <ArrowRight className="size-5 -rotate-90" />
    </button>
  );
}
