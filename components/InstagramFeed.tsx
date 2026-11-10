import { InstagramCarousel } from "@/components/InstagramCarousel";
import { getInstagramReels } from "@/lib/instagram";
import { company } from "@/lib/content/nav";

const profileUrl = company.socials.find((s) => s.label === "Instagram")!.href;
const handle = new URL(profileUrl).pathname.replaceAll("/", "");

// Drop <InstagramFeed /> on any page. It always has reels to show: see the snapshot in lib/instagram.ts.
export async function InstagramFeed() {
  const reels = await getInstagramReels();

  return (
    <section className="section-md bg-inverse text-oninverse">
      <h2 className="container-omh text-center font-sans text-h2 font-semibold">
        Latest reels from <span className="bg-[linear-gradient(135deg,oklch(80%_.16_75),oklch(68%_.23_30),oklch(62%_.26_0),oklch(55%_.25_320))] bg-clip-text text-transparent">our Instagram</span>
      </h2>
      {/* Outside the container, so on phones the side cards run to the screen edge instead of being cut at the gutter. */}
      <InstagramCarousel reels={reels} profileUrl={profileUrl} handle={handle} />
    </section>
  );
}
