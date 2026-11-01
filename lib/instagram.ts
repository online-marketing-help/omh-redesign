/*
  Reels from the agency's Instagram, read on the server through the official API. Set on the server (/opt/omh/.env):
    INSTAGRAM_ACCESS_TOKEN — a long-lived token for the Instagram professional account

  ponytail: no token refresh. An Instagram Login token lasts 60 days and then the carousel falls back to the snapshot
  below, so it needs replacing by then, or use a non-expiring system user token. Refresh it from here, with somewhere
  to store the new token, if replacing it by hand becomes a chore.
*/

export type InstagramReel = { id: string; image: string; caption: string; permalink: string };

type Media = { id: string; caption?: string; media_product_type?: string; thumbnail_url?: string; permalink: string };

const MAX_REELS = 6;
const FIELDS = "id,caption,media_product_type,thumbnail_url,permalink";

// Instagram leaves out thumbnail_url for some reels (copyrighted audio), and there is nothing to show without it.
export function toReels(media: Media[]): InstagramReel[] {
  return media
    .filter((m) => m.media_product_type === "REELS" && m.thumbnail_url)
    .slice(0, MAX_REELS)
    .map((m) => ({ id: m.id, image: m.thumbnail_url!, caption: m.caption ?? "", permalink: m.permalink }));
}

// The six latest reels on the public profile on 1 Nov 2026, with each caption's opening line verbatim. Shown until the
// token is set and whenever Instagram fails, so the band never disappears. Every one opens the profile.
const snapshot: InstagramReel[] = [
  "Unpopular opinion: More leads won't fix a broken sales process.",
  "I'm a marketing agency director, and I think clients should be paying less for some things because of AI.",
  "AMAZING FOOD. EMPTY RESTAURANT. WHAT'S GOING WRONG?",
  "🧙‍♀️ Essex business owners… is your marketing agency performing magic tricks with your money? 💸",
  "🚨 YOUR GOOGLE ADS REPORT MIGHT LOOK AMAZING. YOUR BANK BALANCE MIGHT TELL A DIFFERENT STORY.",
  "🚨 £149 IN GOOGLE ADS. £8,162 IN REPORTED EVENT TICKET REVENUE.",
].map((caption, i) => ({
  id: `reel-${i + 1}`,
  image: `/images/instagram/reel-${i + 1}.jpg`,
  caption,
  permalink: "https://www.instagram.com/onlinemarketinghelpuk/",
}));

/** The latest reels, newest first, or the snapshot when there is no token or Instagram fails. */
export async function getInstagramReels(): Promise<InstagramReel[]> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) return snapshot;

  try {
    // Reels share this list with ordinary posts, so ask for enough to find six. Thumbnail URLs expire after a while;
    // the hourly refresh replaces them well before that.
    const response = await fetch(
      `https://graph.instagram.com/me/media?fields=${FIELDS}&limit=50&access_token=${encodeURIComponent(token)}`,
      { next: { revalidate: 3600 } },
    );
    const body = await response.json();
    // Only Instagram's own message: the request URL holds the token, so it never goes in the logs.
    if (!response.ok) {
      console.error("Instagram feed failed:", response.status, body?.error?.message);
      return snapshot;
    }
    const reels = toReels(body.data ?? []);
    return reels.length ? reels : snapshot;
  } catch (error) {
    console.error("Instagram feed failed:", error instanceof Error ? error.message : "unknown error");
    return snapshot;
  }
}
