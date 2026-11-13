import Image from "@/components/ui/SiteImage";
import { Reveal } from "@/components/Reveal";

// Global media primitives shared by service pages and future landing pages.

type MediaKind = "image" | "video" | "screen";
type MediaTheme = "wordpress" | "shopify" | "maintenance" | "ppc" | "amazon" | "seo";

const themeStyles: Record<MediaTheme, string> = {
  wordpress: "border-ink/25 bg-tint-amber text-ink",
  shopify: "border-[#7fb49b]/45 bg-tint-green text-ink",
  maintenance: "border-[#7d5c33]/40 bg-[#000] text-oninverse",
  ppc: "border-[#b8ef3e]/45 bg-[#000] text-oninverse",
  amazon: "border-[#ff9900]/55 bg-[#000] text-oninverse",
  seo: "border-ink/25 bg-[#000] text-oninverse",
};

export function MediaFrame({ kind, theme, title, ratio = "16/10", className = "", source, poster, alt }: {
  kind: MediaKind;
  theme: MediaTheme;
  title: string;
  note: string;
  ratio?: string;
  className?: string;
  source: string;
  poster?: string;
  alt?: string;
}) {
  return (
    <div data-media-kind={kind} style={{ aspectRatio: ratio }}
      className={"service-media-frame group relative flex min-h-[180px] w-full min-w-0 max-w-full items-center justify-center overflow-hidden rounded-[18px] border-2 sm:min-h-[220px] " + themeStyles[theme] + " " + className}>
      {kind === "video" ? (
        <video controls preload="metadata" poster={poster} aria-label={alt ?? title} className="absolute inset-0 size-full object-cover">
          <source src={source} />
        </video>
      ) : (
        <Image src={source} alt={alt ?? title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
      )}
    </div>
  );
}

export function WordPressVisualStory() {
  return (
    <section className="overflow-hidden border-b border-line bg-tint-amber">
      <div className="container-omh section-md">
        <Reveal>
          <div className="grid grid-cols-12 items-end gap-x-10 gap-y-7 max-lg:block">
            <div className="col-span-5 max-lg:mb-9">
              <p className="text-[14px] font-semibold uppercase tracking-[0.16em] text-amber-deep">WordPress build story</p>
              <h2 className="mt-5 font-sans text-[clamp(32px,25px+1.9vw,48px)] font-semibold leading-[1.05]">See the thinking, the build and the editable result.</h2>
              <p className="mt-5 text-body leading-relaxed text-ink/70">From the first wireframe to a live, editable website: the same process behind every WordPress build we deliver.</p>
            </div>
            <div className="col-span-7">
              <MediaFrame kind="image" theme="wordpress" ratio="16/9" title="45-second WordPress project overview" note="Replace with a concise planning-to-launch video." source="/images/Services/wordpress development 1.jpg" alt="WordPress website planning and development" />
            </div>
          </div>
          <div className="mt-7 grid grid-cols-12 gap-7">
            <MediaFrame kind="image" theme="wordpress" ratio="5/4" title="Planning and wireframe" note="Add an approved sitemap, wireframe or workshop photograph." source="/images/Services/wordpress development.jpg" alt="A designer’s desk with page code on one screen, a live layout on another and the same design open on a tablet." className="col-span-5 max-md:col-span-12" />
            <MediaFrame kind="screen" theme="wordpress" ratio="16/9" title="Responsive website reveal" note="Show desktop and mobile views from a real WordPress project." source="/images/website-designs/WordPress-Website-Theme-Essex.png" alt="A WordPress website theme shown across desktop and smaller screens." className="col-span-7 max-md:col-span-12" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function ShopifyStorefrontShowcase() {
  return (
    <section className="overflow-hidden bg-inverse text-oninverse">
      <div className="container-omh section-md">
        <Reveal>
          <div>
            <div>
              <p className="text-[14px] font-semibold uppercase tracking-[0.16em] text-[#ef9a83]">Storefront showcase</p>
              <h2 className="mt-5 font-sans text-h2 font-semibold">Let products and buying journeys do more of the explaining.</h2>
            </div>
            <p className="mt-5 text-body leading-relaxed text-oninverse/68">From product discovery through to a completed checkout: every step of the storefront built to convert.</p>
          </div>
          <div className="mt-11 grid grid-cols-12 gap-5 max-md:block">
            <MediaFrame kind="image" theme="shopify" ratio="4/5" title="Product page" note="Approved product or collection image." source="/images/Services/Shopify Development 1.jpg" alt="A Shopify product page being reviewed on screen." className="col-span-4 max-md:mb-5" />
            <MediaFrame kind="image" theme="shopify" ratio="4/5" title="Store journey walkthrough" note="Replace with a mobile or desktop shopping-flow video." className="col-span-4 max-md:mb-5" source="/images/Services/Shopify Development.jpg" alt="Shopify storefront design" />
            <MediaFrame kind="image" theme="shopify" ratio="4/5" title="Mobile checkout" note="Approved checkout or cart screen." source="/images/Services/shopify/mobile-checkout.png" alt="A hand holding a phone showing a simple mobile checkout with a one-item order summary and a Pay now button." className="col-span-4" />
          </div>
          <div className="mt-5 grid grid-cols-3 gap-5 max-sm:grid-cols-1">
            {["Discovery", "Product confidence", "Checkout"].map((label, index) => <div key={label} className="border-t border-oninverse/20 pt-4"><span className="mr-3 text-body font-semibold text-[#ef9a83]">0{index + 1}</span><span className="text-[18px] font-semibold uppercase tracking-[0.1em] text-oninverse/75">{label}</span></div>)}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function MaintenanceControlRoom() {
  return (
    <section className="overflow-hidden bg-inverse text-oninverse">
      <div className="container-omh section-md">
        <Reveal>
          <div className="grid grid-cols-12 gap-x-10 gap-y-8 max-lg:block">
            <div className="col-span-4 max-lg:mb-9">
              <p className="text-[14px] font-semibold uppercase tracking-[0.16em] text-[#7d5c33]">Maintenance control room</p>
              <h2 className="mt-5 font-sans text-h2 font-semibold">Show the WordPress maintenance and support work that normally happens quietly.</h2>
              <p className="mt-5 text-body leading-relaxed text-oninverse/65">Uptime monitoring, update logs and a monthly report you can actually read: the ongoing care that keeps a site reliable.</p>
              <div className="mt-8 grid gap-3 text-body">
                {["Uptime and fault alerts", "Updates and backup checks", "Monthly work summary"].map((label) => <div key={label} className="flex items-center gap-3 rounded-lg border border-oninverse/10 bg-oninverse/[0.035] px-4 py-3"><span className="size-2 rounded-full bg-[#7d5c33] shadow-[0_0_14px_rgba(125,92,51,.65)]" />{label}</div>)}
              </div>
            </div>
            <div className="col-span-8 grid grid-cols-8 gap-5">
              <MediaFrame kind="screen" theme="maintenance" ratio="16/9" title="Monitoring and maintenance dashboard" note="Replace with an approved, anonymised status or reporting screen." source="/images/Services/Images on the pages/WordPress maintenance.png" alt="Maintenance control room dashboard showing uptime, active alerts, pending WordPress updates and site health across a portfolio of sites." className="col-span-8" />
              <MediaFrame kind="image" theme="maintenance" ratio="3/2" title="Monthly report walkthrough" note="Add a short screen-recorded client update." className="col-span-4 max-sm:col-span-8" source="/images/Services/website maintenance 1.jpg" alt="Website maintenance and reporting" />
              <MediaFrame kind="image" theme="maintenance" ratio="3/2" title="Update log" note="Use a clear before-and-after maintenance record." source="/images/Services/Images on the pages/before website maintenance.png" alt="WordPress admin dashboard before maintenance, showing pending core and plugin updates and a site health warning." className="col-span-4 max-sm:col-span-8" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function PpcCampaignStudio() {
  return (
    <section className="overflow-hidden bg-inverse text-oninverse">
      <div className="container-omh section-md">
        <Reveal>
          <div className="grid grid-cols-12 items-center gap-x-12 gap-y-9 max-lg:block">
            <div className="col-span-6 max-lg:mb-9">
              <p className="text-[14px] font-semibold uppercase tracking-[0.17em] text-[#b8ef3e]">Campaign studio</p>
              <h2 className="mt-5 font-sans text-[clamp(34px,27px+2vw,52px)] font-semibold leading-[1.02]">Watch how a search becomes a measured action.</h2>
              <p className="mt-6 text-body leading-relaxed text-oninverse/66">From the initial campaign structure through search-term review to the landing page it drives traffic to.</p>
              <div className="mt-8 flex flex-wrap gap-2.5">
                {['Search intent', 'Ad message', 'Landing page', 'Conversion'].map((label, index) => <span key={label} className="rounded-full border border-[#b8ef3e]/25 px-3 py-2 text-body font-semibold text-[#d7ff7b]"><b className="mr-2 opacity-45">0{index + 1}</b>{label}</span>)}
              </div>
            </div>
            <MediaFrame kind="image" theme="ppc" ratio="1/1" title="Google Ads campaign walkthrough" note="Replace with a concise, anonymised screen recording." className="col-span-6" source="/images/Services/Google Ads management.png" alt="Google Ads campaign planning" />
          </div>
          <div className="mt-7 grid grid-cols-12 gap-5">
            <MediaFrame kind="screen" theme="ppc" ratio="16/9" title="Search-term and budget view" note="Show the decisions, not unsupported results." source="/images/Services/Images on the pages/Search-term and budget view.png" alt="Illustrative Google Ads search terms report reviewed during PPC management, showing match types, CTR, average CPC and cost per conversion" className="col-span-12" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function AmazonMarketplaceWorkbench() {
  return (
    <section className="overflow-hidden bg-inverse text-oninverse">
      <div className="container-omh section-md">
        <Reveal>
          <div className="grid grid-cols-12 items-end gap-x-12 gap-y-9 max-lg:block">
            <div className="col-span-5 max-lg:mb-9">
              <p className="text-[14px] font-semibold uppercase tracking-[0.17em] text-[#ffb84d]">Marketplace workbench</p>
              <h2 className="mt-5 font-sans text-[clamp(34px,27px+2vw,52px)] font-semibold leading-[1.02]">See the listing, campaign and search term together.</h2>
              <p className="mt-6 text-body leading-relaxed text-oninverse/68">Catalogue, campaign and listing performance reviewed together, because on Amazon they can’t be managed apart.</p>
            </div>
            <MediaFrame kind="image" theme="amazon" ratio="16/10" title="Amazon campaign walkthrough" note="Add a concise, anonymised account and optimisation review." className="col-span-7" source="/images/Services/Amazon PPC.png" alt="Amazon advertising campaign planning" />
          </div>
          <div className="mt-7 grid grid-cols-12 gap-5">
            <MediaFrame kind="image" theme="amazon" ratio="3/2" title="Product listing review" note="Replace with an approved listing, storefront or catalogue image." source="/images/Services/Images on the pages/Product listing review Amazon PPC.png" alt="Illustrative Amazon product listing review showing title, imagery, bullet points and review signals assessed before advertising spend." className="col-span-6 max-md:col-span-12" />
            <MediaFrame kind="screen" theme="amazon" ratio="3/2" title="Search-term and ACoS view" note="Show real decisions with dates, spend and metric definitions visible." source="/images/Services/Images on the pages/Search-term and ACoS view Amazon PPC.png" alt="Illustrative Amazon Ads search term report showing spend, sales, ACoS and ROAS by search term over a dated period." className="col-span-6 max-md:col-span-12" />
          </div>
          <div className="mt-6 grid grid-cols-4 gap-3 max-md:grid-cols-2 max-sm:grid-cols-1">
            {["Catalogue readiness", "Search intent", "Bid control", "Sales context"].map((label, index) => (
              <div key={label} className="border-t border-oninverse/15 pt-4">
                <span className="mr-3 text-body font-semibold text-[#ffb84d]">0{index + 1}</span>
                <span className="text-[14px] font-semibold uppercase tracking-[0.1em] text-oninverse/72">{label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function SeoSearchLandscape() {
  return (
    <section className="overflow-hidden border-b border-[#cad9eb] bg-tint-blue text-ink">
      <div className="container-omh section-md">
        <Reveal>
          <div className="grid grid-cols-12 items-end gap-x-12 gap-y-9 max-lg:block">
            <div className="col-span-5 max-lg:mb-9">
              <p className="text-[14px] font-semibold uppercase tracking-[0.17em] text-amber-deep">Search landscape</p>
              <h2 className="mt-5 font-sans text-[clamp(34px,27px+2vw,52px)] font-semibold leading-[1.02]">Make the route from search to useful page visible.</h2>
              <p className="mt-6 text-body leading-relaxed text-ink/68">How a site is crawled, how it performs in search, and how its content is structured: three views of the same picture.</p>
            </div>
            <MediaFrame kind="screen" theme="seo" ratio="16/10" title="Organic search performance view" note="Use an anonymised Search Console or reporting screen with dates and metric definitions." source="/images/Services/SEO 2.jpg" alt="A search results page open on a tablet, the view a customer sees before they choose a page." className="col-span-7" />
          </div>
          <div className="mt-7 grid grid-cols-12 gap-5">
            <MediaFrame kind="image" theme="seo" ratio="5/4" title="Crawl and architecture map" note="Add a real sitemap, crawl visual or annotated page hierarchy." source="/images/Services/Images on the pages/Crawl and architecture map.png" alt="Illustrative site crawl and architecture map showing page hierarchy, internal linking depth and indexation status." className="col-span-5 max-md:col-span-12" />
            <MediaFrame kind="image" theme="seo" ratio="16/8" title="SEO review walkthrough" note="Replace with a short audit-to-priority screen recording." className="col-span-7 max-md:col-span-12" source="/images/Services/SEO 1.jpg" alt="Search engine optimisation review" />
          </div>
          <div className="mt-6 grid grid-cols-4 gap-3 max-md:grid-cols-2 max-sm:grid-cols-1">
            {["Discover", "Understand", "Choose a page", "Take action"].map((label, index) => (
              <div key={label} className="border-t border-[#000]/15 pt-4">
                <span className="mr-3 text-body font-semibold text-amber-deep">0{index + 1}</span>
                <span className="text-[14px] font-semibold uppercase tracking-[0.1em] text-ink/72">{label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
