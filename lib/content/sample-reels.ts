// Portrait video reels for the voice agent pages (client, 9 Nov 2026), laid out exactly like the sample-call grid
// (callTypeCards in sample-calls.ts). A card opens components/voice-agents/ReelPlayer.tsx, a popup with our own
// controls. A reel is either a local file, public/video/<folder>/<n>-<title>.mp4 with a .jpg poster beside it, or a
// YouTube video: give its ID as the fifth item and the poster comes from YouTube.

type Reel = [n: number, title: string, seconds: number, caption: string, youtubeId?: string];

const clock = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
const path = (folder: string, file: string) => `/video/${[folder, file].map(encodeURIComponent).join("/")}`;
const attr = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;");

export const reelCards = (folder: string, name: string, reels: Reel[]) =>
  reels
    .map(([n, title, seconds, caption, youtubeId]) => {
      const file = `${n}-${title.replace(/—/g, "-")}`;
      const source = youtubeId ? `data-reel-youtube="${youtubeId}"` : `data-reel-src="${path(folder, `${file}.mp4`)}"`;
      const poster = youtubeId ? `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg` : path(folder, `${file}.jpg`);
      return `      <figure class="flex flex-col rounded-[16px] border border-line bg-surface p-3 transition-colors hover:border-[var(--va-line-strong)]">
        <button type="button" class="reel-poster group relative block aspect-[9/16] w-full overflow-hidden rounded-[11px] bg-ink" data-reel ${source} data-reel-title="${attr(title)}" data-reel-poster="${poster}" aria-label="Play the video: ${attr(title)}" data-track="reel_play" data-track-name="${attr(`${name}: ${title}`)}">
          <img src="${poster}" alt="" loading="lazy" decoding="async" class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]">
          <span class="reel-play" aria-hidden="true"><svg class="icon" aria-hidden="true" focusable="false"><use href="#i-play"/></svg></span>
          <span class="audio-time absolute bottom-3 right-3 tnum">${clock(seconds)}</span>
        </button>
        <figcaption class="flex flex-1 flex-col px-2 pb-2 pt-4">
          <h3 class="!text-[20px] !leading-[1.3]">${title}</h3>
          <p class="mt-2 text-[16px] leading-[1.5] text-muted">${caption}</p>
        </figcaption>
      </figure>`;
    })
    .join("\n");
