"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Maximize, Minimize, Pause, Play, Volume2, VolumeX, X } from "lucide-react";

/*
  The popup for the video reels (lib/content/sample-reels.ts, client 9 Nov 2026). Any [data-reel] button inside
  #va-page opens it. Our own controls only: a local MP4 plays with no native controls, and a YouTube video plays
  through the IFrame API with controls=0 under a layer that keeps YouTube's own overlay from taking clicks.
  Keys: Space/K play or pause, ←/→ 5 seconds, M mute, F full screen, Esc closes (native dialog).
*/

type Item = { src?: string; youtube?: string; title: string; poster?: string };
type Ctl = { play(): void; pause(): void; seek(t: number): void; mute(m: boolean): void; time(): number; duration(): number };

// Minimal slice of the YouTube IFrame API we use.
type YTPlayer = {
  playVideo(): void; pauseVideo(): void; seekTo(s: number, allow: boolean): void; mute(): void; unMute(): void;
  getCurrentTime(): number; getDuration(): number; destroy(): void;
};
type YTNamespace = { Player: new (el: HTMLElement, opts: object) => YTPlayer };
declare global {
  interface Window { YT?: YTNamespace; onYouTubeIframeAPIReady?: () => void }
}

let ytReady: Promise<YTNamespace> | undefined;
function loadYouTube() {
  ytReady ??= new Promise((resolve) => {
    if (window.YT?.Player) return resolve(window.YT);
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => { prev?.(); resolve(window.YT!); };
    const s = document.createElement("script");
    s.src = "https://www.youtube.com/iframe_api";
    document.head.append(s);
  });
  return ytReady;
}

const clock = (s: number) => {
  const t = Math.max(0, Math.floor(s || 0));
  return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`;
};

export function ReelPlayer() {
  const dialog = useRef<HTMLDialogElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const ytHost = useRef<HTMLDivElement>(null);
  const ctl = useRef<Ctl | null>(null);
  const idle = useRef<ReturnType<typeof setTimeout>>(undefined);

  const [item, setItem] = useState<Item | null>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [full, setFull] = useState(false);
  const [showUi, setShowUi] = useState(true);

  // Controls fade out after 2.5 s of no pointer movement while playing.
  const wake = useCallback(() => {
    setShowUi(true);
    clearTimeout(idle.current);
    idle.current = setTimeout(() => setShowUi(false), 2500);
  }, []);

  /* Playback started or stopped, called from the event that caused it.
     This used to be an effect watching `playing`, which is the pattern React
     19's compiler lint rejects, and rightly: a render reacting to a state
     change it just performed is one render too many, and the fade timer
     belongs to the event, not to the repaint. Pausing only cancels the
     pending fade; it does not force the controls visible, because the `ui`
     class below already reads `showUi || !playing`. */
  const markPlaying = useCallback(
    (on: boolean) => {
      setPlaying(on);
      if (on) wake();
      else clearTimeout(idle.current);
    },
    [wake],
  );

  // Open from any reel card on the page.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const btn = (e.target as Element).closest<HTMLElement>("#va-page [data-reel]");
      if (!btn) return;
      e.preventDefault();
      const d = btn.dataset;
      setItem({ src: d.reelSrc, youtube: d.reelYoutube, title: d.reelTitle ?? "Video", poster: d.reelPoster });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (item) dialog.current?.showModal();
  }, [item]);

  // Local file: the <video> element is the controller.
  useEffect(() => {
    const v = video.current;
    if (!item?.src || !v) return;
    ctl.current = {
      play: () => void v.play().catch(() => markPlaying(false)),
      pause: () => v.pause(),
      seek: (t) => { v.currentTime = t; },
      mute: (m) => { v.muted = m; },
      time: () => v.currentTime,
      duration: () => (Number.isFinite(v.duration) ? v.duration : 0),
    };
    ctl.current.play();
    return () => { v.pause(); ctl.current = null; };
    /* markPlaying is stable, so listing it does not re-create the player on
       every render; it is here because the lint rule is right that the effect
       uses it. */
  }, [item, markPlaying]);

  // YouTube: the IFrame API player, polled for the time since it has no timeupdate event.
  useEffect(() => {
    if (!item?.youtube || !ytHost.current) return;
    let player: YTPlayer | undefined;
    let poll: ReturnType<typeof setInterval> | undefined;
    let gone = false;
    const mount = document.createElement("div");
    ytHost.current.append(mount);
    loadYouTube().then((YT) => {
      if (gone) return;
      player = new YT.Player(mount, {
        videoId: item.youtube,
        width: "100%",
        height: "100%",
        playerVars: { autoplay: 1, controls: 0, disablekb: 1, fs: 0, iv_load_policy: 3, playsinline: 1, rel: 0, modestbranding: 1 },
        events: {
          onReady: () => {
            const p = player!;
            ctl.current = {
              play: () => p.playVideo(),
              pause: () => p.pauseVideo(),
              seek: (t) => p.seekTo(t, true),
              mute: (m) => (m ? p.mute() : p.unMute()),
              time: () => p.getCurrentTime(),
              duration: () => p.getDuration(),
            };
            setDuration(p.getDuration());
            p.playVideo();
            poll = setInterval(() => setTime(p.getCurrentTime()), 250);
          },
          // 1 playing, 2 paused, 0 ended
          onStateChange: (e: { data: number }) => {
            markPlaying(e.data === 1);
            if (e.data === 1) setDuration(player!.getDuration());
            if (e.data === 0) { player!.seekTo(0, true); player!.pauseVideo(); }
          },
        },
      });
    });
    return () => { gone = true; clearInterval(poll); player?.destroy(); mount.remove(); ctl.current = null; };
  }, [item, markPlaying]);


  useEffect(() => {
    const onFs = () => setFull(document.fullscreenElement === frame.current);
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  const toggle = () => (playing ? ctl.current?.pause() : ctl.current?.play());
  const seek = (t: number) => { ctl.current?.seek(t); setTime(t); };
  const toggleMute = () => { ctl.current?.mute(!muted); setMuted(!muted); };
  const toggleFull = () => {
    const el = frame.current;
    if (!el) return;
    if (document.fullscreenElement) void document.exitFullscreen();
    else if (el.requestFullscreen) void el.requestFullscreen();
    // iOS Safari has no element full screen; its video one still has our popup's sound and position.
    else (video.current as HTMLVideoElement & { webkitEnterFullscreen?: () => void })?.webkitEnterFullscreen?.();
  };

  const onKey = (e: React.KeyboardEvent) => {
    if ((e.target as Element).matches("input")) return;
    /* Same reason as SiteSearch: `key` is optional and autofill sends
       keydowns without it. This one is scoped to the player rather than
       the window, so it is far less exposed, but the assumption is the
       same and it costs a line. */
    if (typeof e.key !== "string") return;
    const k = e.key.toLowerCase();
    if (k === " " || k === "k") { e.preventDefault(); toggle(); }
    else if (k === "arrowright") seek(Math.min(duration, time + 5));
    else if (k === "arrowleft") seek(Math.max(0, time - 5));
    else if (k === "m") toggleMute();
    else if (k === "f") toggleFull();
    else return;
    wake();
  };

  const close = () => {
    if (document.fullscreenElement) void document.exitFullscreen();
    dialog.current?.close();
  };

  const pct = duration ? (time / duration) * 100 : 0;
  const ui = showUi || !playing ? "opacity-100" : "pointer-events-none opacity-0";

  return (
    <dialog
      ref={dialog}
      aria-label={item?.title ?? "Video"}
      onClose={() => { setItem(null); markPlaying(false); setTime(0); setDuration(0); }}
      onClick={(e) => e.target === dialog.current && close()}
      onKeyDown={onKey}
      className="m-auto overflow-visible bg-transparent p-0 backdrop:bg-black/85"
    >
      {item && (
        <div
          ref={frame}
          onPointerMove={wake}
          className="relative aspect-[9/16] h-[min(88svh,calc((100vw-32px)*16/9))] overflow-hidden rounded-[16px] bg-black text-white shadow-[0_40px_90px_-30px_rgb(0_0_0/0.9)]"
        >
          {item.src ? (
            <video
              ref={video}
              src={item.src}
              poster={item.poster}
              playsInline
              preload="auto"
              className="absolute inset-0 h-full w-full object-contain"
              onPlay={() => markPlaying(true)}
              onPause={() => markPlaying(false)}
              onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
              onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
              onEnded={(e) => { e.currentTarget.currentTime = 0; markPlaying(false); }}
            />
          ) : (
            <div ref={ytHost} className="pointer-events-none absolute inset-0 [&_iframe]:h-full [&_iframe]:w-full" />
          )}

          {/* Covers the video so taps play and pause here, and YouTube's own overlay never takes the click. */}
          <button type="button" onClick={() => { toggle(); wake(); }} aria-label={playing ? "Pause" : "Play"} className="absolute inset-0 cursor-pointer" />

          {!playing && (
            <span aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 grid size-[72px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-teal shadow-[0_10px_24px_-8px_rgb(0_0_0/0.55)]">
              <Play className="size-7 translate-x-0.5 fill-current" />
            </span>
          )}

          <div className={`pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-3 bg-gradient-to-b from-black/70 to-transparent p-4 transition-opacity duration-300 ${ui}`}>
            <p className="pt-1.5 text-[16px] font-semibold leading-snug">{item.title}</p>
            <button type="button" onClick={close} aria-label="Close video" className="pointer-events-auto grid size-10 shrink-0 place-items-center rounded-full bg-white/15 transition-colors hover:bg-white/30">
              <X className="size-5" />
            </button>
          </div>

          <div className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 pb-4 pt-10 transition-opacity duration-300 ${ui}`}>
            <input
              type="range"
              min={0}
              max={duration || 0}
              step={1}
              value={Math.min(time, duration || 0)}
              onChange={(e) => seek(Number(e.target.value))}
              aria-label="Video position"
              aria-valuetext={`${clock(time)} of ${clock(duration)}`}
              className="reel-seek block w-full"
              style={{ "--pct": `${pct}%` } as React.CSSProperties}
            />
            <div className="mt-2 flex items-center gap-2">
              <button type="button" onClick={toggle} aria-label={playing ? "Pause" : "Play"} className="grid size-10 place-items-center rounded-full transition-colors hover:bg-white/15">
                {playing ? <Pause className="size-5 fill-current" /> : <Play className="size-5 translate-x-px fill-current" />}
              </button>
              <span className="tnum text-[14px] font-semibold">{clock(time)} / {clock(duration)}</span>
              <span className="flex-1" />
              <button type="button" onClick={toggleMute} aria-label={muted ? "Unmute" : "Mute"} className="grid size-10 place-items-center rounded-full transition-colors hover:bg-white/15">
                {muted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
              </button>
              <button type="button" onClick={toggleFull} aria-label={full ? "Exit full screen" : "Full screen"} className="grid size-10 place-items-center rounded-full transition-colors hover:bg-white/15">
                {full ? <Minimize className="size-5" /> : <Maximize className="size-5" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
