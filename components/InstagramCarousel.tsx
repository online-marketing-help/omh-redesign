"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { InstagramReel } from "@/lib/instagram";

const AUTOPLAY_MS = 3500;
const DRAG_STEP_PX = 180; // Dragging this far moves the ring on by one reel, about the gap between two cards.
const DRAG_START_PX = 5; // Less than this is a click on the reel, not a drag.
const FLICK_PX = 40; // A short, quick drag still moves on one reel.
const VISIBLE_EITHER_SIDE = 2;
// Instagram's own gradient and the reference widget's card colours, used only inside this carousel.
const instaGradient = "bg-[linear-gradient(135deg,oklch(80%_.16_75),oklch(68%_.23_30),oklch(62%_.26_0),oklch(55%_.25_320))]";

export function InstagramCarousel({ reels, profileUrl, handle }: { reels: InstagramReel[]; profileUrl: string; handle: string }) {
  const count = reels.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  // How far the ring is being dragged, in reels (fractions while moving). Null when nothing is being dragged.
  const [drag, setDrag] = useState<number | null>(null);
  const dragStart = useRef<number | null>(null);
  const dragged = useRef(false);
  const dragging = drag !== null;
  // The reel playing in the popup. The video only exists while it is open, so closing it stops the sound.
  const [playing, setPlaying] = useState<InstagramReel | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  const go = (step: number) => setActive((current) => (current + step + count) % count);

  useEffect(() => {
    if (paused || dragging || playing || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => setActive((current) => (current + 1) % count), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [paused, dragging, playing, count]);

  useEffect(() => {
    if (playing) dialog.current?.showModal();
  }, [playing]);

  function endDrag(clientX: number) {
    if (dragStart.current === null) return;
    const moved = clientX - dragStart.current;
    dragStart.current = null;
    setDrag(null);
    if (!dragged.current) return;
    const steps = Math.round(moved / DRAG_STEP_PX) || (Math.abs(moved) > FLICK_PX ? Math.sign(moved) : 0);
    setActive((current) => (((current - steps) % count) + count) % count);
  }

  return (
    <div
      className="relative w-full overflow-hidden py-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <a href={profileUrl} target="_blank" rel="noreferrer" className="mx-auto mb-8 flex w-fit items-center gap-3">
        <span className={`grid size-11 place-items-center rounded-full p-[2px] ${instaGradient}`}>
          <span className="grid size-full place-items-center rounded-full bg-inverse">
            {/* The footer's Instagram mark: lucide-react v1 dropped its brand icons. */}
            <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" fillRule="evenodd" aria-hidden>
              <path d="M7 0h10a7 7 0 0 1 7 7v10a7 7 0 0 1-7 7H7a7 7 0 0 1-7-7V7a7 7 0 0 1 7-7Zm0 2.2A4.8 4.8 0 0 0 2.2 7v10A4.8 4.8 0 0 0 7 21.8h10a4.8 4.8 0 0 0 4.8-4.8V7A4.8 4.8 0 0 0 17 2.2H7Zm5 4.2a5.6 5.6 0 1 1 0 11.2 5.6 5.6 0 0 1 0-11.2Zm0 2a3.6 3.6 0 1 0 0 7.2 3.6 3.6 0 0 0 0-7.2Zm6.2-4a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8Z" />
            </svg>
          </span>
        </span>
        <span className="font-sans text-lg font-semibold">@{handle}</span>
      </a>

      {/* touch-pan-y: a vertical swipe still scrolls the page, a sideways one drags the ring. */}
      <div
        className="relative mx-auto h-[360px] cursor-grab touch-pan-y select-none active:cursor-grabbing sm:h-[440px]"
        style={{ perspective: "1400px" }}
        onDragStart={(e) => e.preventDefault()}
        onPointerDown={(e) => {
          if (e.button !== 0) return;
          dragStart.current = e.clientX;
          dragged.current = false;
        }}
        onPointerMove={(e) => {
          if (dragStart.current === null) return;
          const moved = e.clientX - dragStart.current;
          if (!dragged.current && Math.abs(moved) < DRAG_START_PX) return;
          // Captured only once it is a drag: capturing on press would stop a plain click reaching the reel's link.
          if (!dragged.current) e.currentTarget.setPointerCapture(e.pointerId);
          dragged.current = true;
          setDrag(moved / DRAG_STEP_PX);
        }}
        onPointerUp={(e) => endDrag(e.clientX)}
        onPointerCancel={(e) => endDrag(e.clientX)}
        onClickCapture={(e) => {
          // The click that ends a drag must not open the reel it finished on.
          if (!dragged.current) return;
          dragged.current = false;
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        {/* pointer-events-none: the side cards sit behind this layer in 3D, and it would otherwise take their clicks. */}
        <div className="pointer-events-none absolute inset-0 [transform-style:preserve-3d]">
          {reels.map((reel, index) => {
            // The shortest way round the ring, so the last reel sits to the left of the first.
            let offset = (((index - active + (drag ?? 0)) % count) + count) % count;
            if (offset > count / 2) offset -= count;
            const distance = Math.abs(offset);
            const hidden = distance > VISIBLE_EITHER_SIDE;
            const dim = Math.min(distance, 1);

            return (
              <a
                key={reel.id}
                href={reel.permalink}
                target="_blank"
                rel="noreferrer"
                tabIndex={hidden ? -1 : undefined}
                onClick={(e) => {
                  // Plays here when there is a video; the link stays for the snapshot and for new-tab clicks.
                  if (!reel.video || e.ctrlKey || e.metaKey || e.shiftKey) return;
                  e.preventDefault();
                  setPlaying(reel);
                }}
                className={`group absolute left-1/2 top-0 w-[240px] overflow-hidden rounded-[22px] border border-oninverse/12 bg-[oklch(19%_.025_300)] shadow-[0_30px_80px_-20px_oklch(65%_.25_0)] sm:w-[300px] ${dragging ? "" : "transition-all duration-700 ease-out"}`}
                style={{
                  transform: `translateX(-50%) translateX(${offset * 62}%) translateZ(${-distance * 160}px) rotateY(${offset * -32}deg)`,
                  zIndex: 10 - Math.round(distance),
                  opacity: hidden ? Math.max(0, 0.5 * (VISIBLE_EITHER_SIDE + 1 - distance)) : 1 - distance * 0.25,
                  pointerEvents: hidden ? "none" : "auto",
                  filter: distance === 0 ? "none" : `saturate(${1 - dim * 0.4}) brightness(${1 - dim * 0.3})`,
                }}
              >
                <div className="relative aspect-square">
                  {/* Goes through the image optimiser: Instagram's thumbnails are far larger than this card needs. */}
                  <Image src={reel.image} alt={reel.caption.slice(0, 80) || "Instagram reel"} fill sizes="300px" className="object-cover" />
                  <Play className="absolute right-3 top-3 size-6 fill-oninverse text-oninverse drop-shadow" aria-hidden />
                </div>
                <p className="line-clamp-2 p-4 text-sm text-oninverse">{reel.caption}</p>
              </a>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          aria-label="Previous reel"
          onClick={() => go(-1)}
          className="grid size-10 cursor-pointer place-items-center rounded-full border border-oninverse/12 bg-[oklch(24%_.03_300)] transition hover:bg-[oklch(65%_.25_0)]"
        >
          <ChevronLeft className="size-5" aria-hidden />
        </button>
        <div className="flex gap-1.5">
          {reels.map((reel, index) => (
            <button
              key={reel.id}
              type="button"
              aria-label={`Go to reel ${index + 1}`}
              aria-current={index === active || undefined}
              onClick={() => setActive(index)}
              className={`h-1.5 cursor-pointer rounded-full transition-all ${index === active ? `w-6 ${instaGradient}` : "w-1.5 bg-oninverse/40"}`}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Next reel"
          onClick={() => go(1)}
          className="grid size-10 cursor-pointer place-items-center rounded-full border border-oninverse/12 bg-[oklch(24%_.03_300)] transition hover:bg-[oklch(65%_.25_0)]"
        >
          <ChevronRight className="size-5" aria-hidden />
        </button>
      </div>

      <div className="mt-6 flex justify-center">
        <a
          href={profileUrl}
          target="_blank"
          rel="noreferrer"
          className={`rounded-full px-6 py-2.5 text-sm font-semibold text-white transition hover:scale-105 ${instaGradient}`}
        >
          Follow us on Instagram
        </a>
      </div>

      {/* Native modal: Esc, focus trapping and the backdrop come with it. A click on the backdrop closes it. */}
      <dialog
        ref={dialog}
        aria-label={playing ? playing.caption.slice(0, 80) || "Instagram reel" : undefined}
        onClose={() => setPlaying(null)}
        onClick={(e) => e.target === e.currentTarget && e.currentTarget.close()}
        className="m-auto overflow-visible bg-transparent p-0 backdrop:bg-black/80"
      >
        {playing && (
          <div className="relative">
            <video
              src={playing.video}
              poster={playing.image}
              controls
              autoPlay
              playsInline
              className="max-h-[85vh] w-[min(92vw,420px)] rounded-[22px] bg-black"
            />
            <button
              type="button"
              aria-label="Close reel"
              onClick={() => dialog.current?.close()}
              className="absolute -top-3 -right-3 grid size-10 cursor-pointer place-items-center rounded-full bg-white text-black shadow-lg"
            >
              <X className="size-5" aria-hidden />
            </button>
          </div>
        )}
      </dialog>
    </div>
  );
}
