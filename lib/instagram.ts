/*
  Reels from the agency's Instagram, read on the server through the official API. Set on the server (/opt/omh/.env):
    INSTAGRAM_ACCESS_TOKEN — a long-lived token for the Instagram professional account

  ponytail: no token refresh. An Instagram Login token lasts 60 days and then the feed hides itself, so it needs
  replacing by then, or use a non-expiring system user token. Refresh it from here, with somewhere to store the new
  token, if replacing it by hand becomes a chore.
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

// Local preview only, so the carousel can be reviewed without a token. Production never shows sample posts.
const samples: InstagramReel[] = [
  ["Data beats guesswork. Know your numbers 📊", "/images/home/campaign-review.webp"],
  ["Your profile is your shop window ✨", "/images/Solutions/1.jpg"],
  ["Big ideas for small UK businesses 💡", "/images/home/agency-collaboration.webp"],
  ["Get found on Google — SEO that works 🚀", "/images/Solutions/2.jpg"],
  ["Monthly reporting made simple", "/images/home/campaign-review.webp"],
  ["Strategy sessions that move the needle", "/images/home/agency-collaboration.webp"],
].map(([caption, image], i) => ({
  id: `sample-${i}`,
  image,
  caption,
  permalink: "https://www.instagram.com/onlinemarketinghelpuk/",
}));

/** The latest reels, newest first. Empty when there is no token or Instagram fails, and the feed then hides itself. */
export async function getInstagramReels(): Promise<InstagramReel[]> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) return process.env.NODE_ENV === "development" ? samples : [];

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
      return [];
    }
    return toReels(body.data ?? []);
  } catch (error) {
    console.error("Instagram feed failed:", error instanceof Error ? error.message : "unknown error");
    return [];
  }
}
