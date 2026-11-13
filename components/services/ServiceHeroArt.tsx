import Image from "@/components/ui/SiteImage";
import { Activity, Check, Database, Heart, RefreshCw, ShieldCheck, ShoppingBag, Star } from "lucide-react";

/* Hero visuals for the service pages (client audit, 26 Oct 2026: "a relevant, bright image on the
   right"). Built from CSS, icons and the site's own screenshots, so nothing is a stock photo and
   nothing claims a result. Mock text is illustrative UI. */

const tile = "rounded-[10px] border border-line bg-surface shadow-[0_18px_40px_-28px_rgb(0_0_0/.45)]";
const chip = "rounded-full bg-amber px-2.5 py-0.5 text-[12px] font-semibold text-white";

function Frame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`hero-art relative overflow-hidden rounded-[16px] border border-line bg-[linear-gradient(135deg,#fff7e8_0%,#f3e7d2_55%,#e9dcc6_100%)] p-6 max-sm:p-4 ${className}`}>
      <div className="absolute inset-0 opacity-50 [background-image:radial-gradient(rgb(0_0_0/.08)_1px,transparent_1px)] [background-size:22px_22px]" />
      <div className="relative">{children}</div>
    </div>
  );
}

function Shopify() {
  const products = [
    { name: "Linen shirt", bg: "from-[#f6d6c4] to-[#e7a58a]" },
    { name: "Canvas tote", bg: "from-[#cfe3f4] to-[#8fb6d9]" },
    { name: "Field jacket", bg: "from-[#dfe9d5] to-[#9ebb8c]" },
    { name: "Trail boot", bg: "from-[#ead7f2] to-[#b899cf]" },
  ];
  return (
    <Frame>
      <div className={`${tile} overflow-hidden`}>
        <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
          <span className="font-sans text-[13px] font-semibold uppercase tracking-[0.14em]">Yourstore</span>
          <span className="relative">
            <ShoppingBag className="size-4 text-ink/70" aria-hidden="true" />
            <span className="absolute -right-1.5 -top-1.5 flex size-3.5 items-center justify-center rounded-full bg-amber text-[9px] font-bold text-white">2</span>
          </span>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <span className="font-sans text-[15px] font-semibold">New season</span>
            <span className="rounded-full border border-line px-2.5 py-0.5 text-[12px] text-ink/60">Sort: Popular</span>
          </div>
          <div className="mt-3 grid grid-cols-4 gap-2.5 max-sm:grid-cols-2">
            {products.map((p) => (
              <div key={p.name}>
                <div className={`aspect-square rounded-[8px] bg-gradient-to-br ${p.bg}`} />
                <div className="mt-1.5 text-[12px] font-semibold">{p.name}</div>
                <div className="mt-0.5 h-1.5 w-8 rounded bg-line" />
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between rounded-[8px] bg-soft px-3 py-2">
            <span className="flex items-center gap-1 text-[12px] text-ink/70">
              {[0, 1, 2, 3, 4].map((i) => <Star key={i} className="size-3 fill-amber text-amber" aria-hidden="true" />)}
              <span className="ml-1">Reviews</span>
            </span>
            <span className={chip}>Add to basket</span>
          </div>
        </div>
      </div>
      <div className={`${tile} mx-auto -mt-3 flex w-[78%] items-center gap-3 px-4 py-3`}>
        <span className="flex size-8 items-center justify-center rounded-full bg-success/15 text-success"><Check className="size-4" aria-hidden="true" /></span>
        <div className="min-w-0">
          <div className="text-[13px] font-semibold">New order received</div>
          <div className="text-[12px] text-ink/60">Paid · ready to fulfil</div>
        </div>
      </div>
    </Frame>
  );
}

function Maintenance() {
  const rows = [
    ["WordPress core", "Up to date"],
    ["Plugins", "3 updated"],
    ["Theme", "Up to date"],
    ["Backup", "Last night"],
  ];
  return (
    <Frame>
      <div className={`${tile} p-4`}>
        <div className="flex items-center justify-between">
          <span className="font-sans text-[15px] font-semibold">Maintenance report</span>
          <span className="rounded-full bg-success/15 px-2.5 py-0.5 text-[12px] font-semibold text-success">All clear</span>
        </div>
        <div className="mt-4 grid grid-cols-[auto_1fr] items-center gap-4">
          <span className="relative flex size-20 items-center justify-center rounded-full border-[6px] border-success/80 border-r-line">
            <Heart className="size-6 text-success" aria-hidden="true" />
          </span>
          <ul className="space-y-1.5">
            {rows.map(([k, v]) => (
              <li key={k} className="flex items-center justify-between gap-3 border-b border-line pb-1.5 text-[13px] last:border-b-0">
                <span className="flex items-center gap-2 text-ink/75"><Check className="size-3.5 text-success" aria-hidden="true" />{k}</span>
                <span className="font-semibold">{v}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2.5">
          {[
            [Activity, "Uptime", "Monitored"],
            [ShieldCheck, "Security", "Scanned"],
            [Database, "Backups", "Scheduled"],
          ].map(([Icon, label, value]) => {
            const I = Icon as typeof Activity;
            return (
              <div key={label as string} className="rounded-[8px] bg-soft px-3 py-2.5">
                <I className="size-4 text-amber-deep" aria-hidden="true" />
                <div className="mt-1.5 text-[12px] text-ink/60">{label as string}</div>
                <div className="text-[13px] font-semibold">{value as string}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={`${tile} mx-auto -mt-3 flex w-[78%] items-center gap-3 px-4 py-3`}>
        <RefreshCw className="size-4 text-amber-deep" aria-hidden="true" />
        <div className="text-[13px] font-semibold">Monthly update window complete</div>
      </div>
    </Frame>
  );
}

/* A fanned stack of the site's own theme screenshots. */
function Screens({ shots, badge }: { shots: [string, string][]; badge: string }) {
  const offsets = ["left-0 top-0 rotate-[-3deg] z-0", "left-[12%] top-[10%] rotate-[1.5deg] z-10", "left-[24%] top-[22%] rotate-[4deg] z-20"];
  return (
    <Frame className="min-h-[420px] max-sm:min-h-[300px]">
      <div className="relative aspect-[4/3.3]">
        {shots.map(([src, alt], i) => (
          <div key={src} className={`absolute w-[72%] overflow-hidden rounded-[8px] border border-line bg-surface shadow-[0_24px_50px_-26px_rgb(0_0_0/.55)] ${offsets[i]}`}>
            <div className="flex gap-1 border-b border-line px-2 py-1.5">
              <span className="size-1.5 rounded-full bg-line" /><span className="size-1.5 rounded-full bg-line" /><span className="size-1.5 rounded-full bg-line" />
            </div>
            <div className="relative aspect-[16/10]">
              <Image src={src} alt={alt} fill sizes="(max-width: 1024px) 60vw, 30vw" className="object-cover object-top" priority={i === 2} />
            </div>
          </div>
        ))}
        <span className={`${chip} absolute bottom-0 right-0 z-30 px-3.5 py-1.5 text-[13px] shadow-[0_10px_24px_-14px_rgb(0_0_0/.6)]`}>{badge}</span>
      </div>
    </Frame>
  );
}

function EcommerceSeo() {
  const bars = [34, 40, 38, 48, 55, 52, 64, 70, 76, 82, 88, 96];
  const rows: [string, string][] = [
    ["Category pages", "Optimised"],
    ["Product schema", "Valid"],
    ["Filter URLs", "Canonicalised"],
    ["Core Web Vitals", "Passing"],
  ];
  return (
    <Frame>
      <div className={`${tile} p-4`}>
        <div className="flex items-center justify-between">
          <span className="font-sans text-[15px] font-semibold">Organic revenue</span>
          <span className="rounded-full bg-success/15 px-2.5 py-0.5 text-[12px] font-semibold text-success">Trending up</span>
        </div>
        <div className="mt-3 flex h-20 items-end gap-1.5" aria-hidden="true">
          {bars.map((h, i) => (
            <span key={i} className={`flex-1 rounded-t-[3px] ${i === bars.length - 1 ? "bg-amber" : "bg-ink/15"}`} style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="mt-1.5 flex justify-between text-[11px] text-ink/50"><span>12 months ago</span><span>Now</span></div>
        <div className="mt-4 border-t border-line pt-3">
          <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-ink/55">Catalogue health</span>
          <ul className="mt-2 space-y-1.5">
            {rows.map(([k, v]) => (
              <li key={k} className="flex items-center justify-between gap-3 text-[13px]">
                <span className="flex items-center gap-2 text-ink/75"><Check className="size-3.5 text-success" aria-hidden="true" />{k}</span>
                <span className="font-semibold">{v}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={`${tile} mx-auto -mt-3 flex w-[78%] items-center gap-3 px-4 py-3`}>
        <Star className="size-4 fill-amber text-amber" aria-hidden="true" />
        <div className="text-[13px] font-semibold">Product rich results showing in search</div>
      </div>
    </Frame>
  );
}

export function ServiceHeroArt({ variant }: { variant: "shopify" | "maintenance" | "wordpress" | "designs" | "ecommerce-seo" }) {
  switch (variant) {
    case "shopify":
      return <Shopify />;
    case "maintenance":
      return <Maintenance />;
    case "ecommerce-seo":
      return <EcommerceSeo />;
    case "wordpress":
      return (
        <Screens
          badge="Built on WordPress"
          shots={[
            ["/images/website-designs/WordPress-Website-Theme-Essex-Construction.png", "Construction company website theme built by Online Marketing Help"],
            ["/images/website-designs/Bar-Restaurant-Website-Theme.jpg", "Bar and restaurant website theme built by Online Marketing Help"],
            ["/images/website-designs/Brand-New-Website-Development.png", "A new WordPress website build shown on desktop and laptop"],
          ]}
        />
      );
    case "designs":
      return (
        <Screens
          badge="38 designs in the portfolio"
          shots={[
            ["/images/website-designs/Legal-Firm-Website-Design-Light-Essex.jpg", "Legal firm website design by Online Marketing Help"],
            ["/images/website-designs/Sleek-and-Modern-eCommerce-Website-Theme-Design-for-Online-Marketing-Help.jpg", "Ecommerce website theme design by Online Marketing Help"],
            ["/images/website-designs/New-Website-Theme-Design.png", "One of the Online Marketing Help website themes shown on desktop"],
          ]}
        />
      );
  }
}
