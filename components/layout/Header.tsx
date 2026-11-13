"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { SiteSearch } from "@/components/layout/SiteSearch";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Button } from "@/components/ui/Button";
import type { SearchEntry } from "@/lib/content/search-index";
import { primaryNav, company, columnLinks, type NavItem, type NavLink } from "@/lib/content/nav";

function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

// The current page's link is marked with gold text and a short gold bar; hover alone gets the soft background
// and an accent border (inset ring, so nothing shifts), so an open menu never shows two items that look selected.
// In dark mode hover keeps the ink text: the brown accent is too dim on the dark ground (client, 29 Oct 2026).
function MenuLink({ link, onClick }: { link: NavLink; onClick?: () => void }) {
  const current = usePathname() === link.href;
  return (
    <Link
      href={link.href}
      onClick={onClick}
      aria-current={current ? "page" : undefined}
      className={`relative block rounded-button px-2.5 py-2.5 text-[16px] font-medium transition-colors hover:bg-warm hover:ring-1 hover:ring-inset hover:ring-amber ${
        current
          ? "pl-4 font-semibold text-amber-deep before:absolute before:left-1 before:top-1/2 before:h-4 before:w-[3px] before:-translate-y-1/2 before:rounded-full before:bg-amber before:content-['']"
          : "text-ink hover:text-amber-deep dark:hover:text-ink"
      }`}
    >
      {link.label}
      {link.desc && <span className="block text-[14px] font-normal text-muted">{link.desc}</span>}
    </Link>
  );
}

// A menu link plus its sub-links, which sit on one small line under it (Trades: Plumbers · Heating · Builders).
function MenuEntry({ link, onClick }: { link: NavLink; onClick?: () => void }) {
  const pathname = usePathname();
  return (
    <>
      <MenuLink link={link} onClick={onClick} />
      {link.sub && (
        <p className="-mt-1.5 flex flex-wrap items-center gap-x-1.5 pb-2 pl-5 pr-2.5 text-[14px] text-muted">
          {link.sub.map((sub, i) => (
            <Fragment key={sub.href}>
              {i > 0 && <span aria-hidden>·</span>}
              <Link
                href={sub.href}
                onClick={onClick}
                aria-current={pathname === sub.href ? "page" : undefined}
                className={`py-1 transition-colors hover:text-amber-deep ${pathname === sub.href ? "font-semibold text-amber-deep" : ""}`}
              >
                {sub.label}
              </Link>
            </Fragment>
          ))}
        </p>
      )}
    </>
  );
}

function isCurrent(pathname: string, item: NavItem) {
  if (item.href) return pathname === item.href || pathname.startsWith(`${item.href}/`);
  return (item.columns ?? []).some((col) => columnLinks(col).some((link) => pathname === link.href.split("#")[0]));
}

// Future Elementor widget: "OMH Header".
export function Header({ searchEntries }: { searchEntries: SearchEntry[] }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false); // mobile menu
  const [menu, setMenu] = useState<string | null>(null); // open desktop dropdown
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMenu(null);
      setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    // The bar shrinks 84 → 68px when scrolled, and mb-4 hands those 16px back
    // as margin (same 300ms easing), so the header's footprint in the page never
    // changes. Without it, the page below jumped up 16px, scroll anchoring
    // pulled scrollY back under the 8px threshold, the bar grew again, and the
    // header flickered up and down just below the top of the page.
    <header
      data-scrolled={scrolled ? "" : undefined}
      className={`sticky top-0 z-40 border-b transition-[background-color,border-color,box-shadow,margin] duration-300 ${
        scrolled
          ? "mb-4 border-line bg-warm/85 shadow-[0_10px_30px_-24px_rgb(0_0_0/0.5)] backdrop-blur-md"
          : "border-transparent bg-warm"
      }`}
    >
      <div
        className={`container-omh flex items-center gap-3 transition-[height] duration-300 max-lg:gap-3 min-[1420px]:gap-6 ${
          scrolled ? "h-[68px]" : "h-[84px]"
        }`}
      >
        {/* Sized by width: the two exports differ in proportion, so matching
            widths keeps the strapline the same size in both themes. */}
        <Link href="/" aria-label="Online Marketing Help, home" className="shrink-0">
          <Image src="/images/logo-dark.png" alt="" width={140} height={36} priority className="h-auto w-[140px] lg:max-[1420px]:w-[120px] dark:hidden" />
          <Image src="/images/logo-white.png" alt="" width={140} height={36} priority className="hidden h-auto w-[140px] lg:max-[1420px]:w-[120px] dark:block" />
        </Link>

        <nav aria-label="Primary" className="ml-auto flex items-center gap-0.5 max-lg:hidden min-[1420px]:gap-1">
          {primaryNav.map((item, i) => {
            const current = isCurrent(pathname, item);
            // The last menu sits near the right edge, so its panel hangs left of
            // the trigger instead of running off the viewport at 1024px.
            const alignRight = i === primaryNav.length - 1;
            return item.columns ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setMenu(item.label)}
                onMouseLeave={() => setMenu(null)}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node)) setMenu(null);
                }}
              >
                <button
                  type="button"
                  aria-expanded={menu === item.label}
                  aria-haspopup="true"
                  onClick={() => setMenu(menu === item.label ? null : item.label)}
                  className={`nav-item flex cursor-pointer items-center gap-1 whitespace-nowrap px-0.5 py-1.5 text-[14px] font-medium xl:max-[1420px]:px-2 xl:max-[1420px]:text-[15px] min-[1420px]:px-3 min-[1420px]:text-[16px] ${
                    current || menu === item.label ? "is-active" : ""
                  }`}
                >
                  {item.label}
                  <Chevron
                    className={`size-4 text-muted transition-transform duration-300 ${
                      menu === item.label ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {menu === item.label && (
                  // The three-column AI panel (~740px) is centred on its trigger: hung from the left edge it ran
                  // 60px past the viewport at 1024px.
                  <div
                    className={`absolute ${
                      alignRight ? "right-0" : item.columns.length === 3 ? "left-1/2 -translate-x-1/2" : "left-0"
                    } top-full z-50 pt-3`}
                  >
                    <div className="menu-pop rounded-card border border-line bg-surface p-4 shadow-[0_28px_60px_-30px_rgb(0_0_0/0.55)]">
                      <div
                        className={
                          // Sized by column count. The 4-column panel drops to 3 cols at lg (1024–1279) so
                          // the widest link stops wrapping; the 4th category flows to a second row until
                          // xl gives it its own column.
                          item.columns.length > 3
                            ? "grid w-[720px] grid-cols-3 gap-x-4 gap-y-6 min-[1420px]:w-[920px] min-[1420px]:grid-cols-4 min-[1420px]:gap-y-0"
                            : item.columns.length >= 2
                              ? // Each column as wide as its widest link, so no label wraps.
                                `grid w-max gap-x-6 ${item.columns.length === 3 ? "grid-flow-col auto-cols-max" : "min-w-[460px] grid-cols-2"}`
                              : "w-[360px]"
                        }
                      >
                        {item.columns.map((col) => (
                          <div key={col.heading ?? item.label}>
                            {col.heading && (
                              <p className="mb-2 border-b border-line px-2.5 pb-2 text-[14px] font-semibold uppercase tracking-[0.12em] text-muted">
                                {col.heading}
                              </p>
                            )}
                            <ul>
                              {col.links.map((link) => (
                                <li key={link.href}>
                                  <MenuEntry link={link} onClick={() => setMenu(null)} />
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      {item.cta && (
                        <div className="mt-4 flex items-center justify-between gap-6 border-t border-line px-2.5 pt-4">
                          <p className="text-[16px] text-muted">{item.cta.text}</p>
                          <Button href={item.cta.href} small arrow onClick={() => setMenu(null)} className="whitespace-nowrap">
                            {item.cta.label}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href!}
                aria-current={current ? "page" : undefined}
                className={`nav-item whitespace-nowrap px-0.5 py-1.5 text-[14px] font-medium xl:max-[1420px]:px-2 xl:max-[1420px]:text-[15px] min-[1420px]:px-3 min-[1420px]:text-[16px] ${current ? "is-active" : ""}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2 lg:ml-3 min-[1420px]:ml-6">
          {/* No phone number in this row: at 2xl the logo, nav and buttons already
              take ~1294px of the 1344px container, so the number pushed the CTA
              past the body's right edge. It stays in the mobile menu and footer. */}
          <SiteSearch entries={searchEntries} />
          <ThemeToggle />
          <span className="max-md:hidden">
            <Button href="/contact" small className="whitespace-nowrap max-[1420px]:px-3.5">
              {/* With the desktop nav, the full label only fits from ~1330px: at
                  1024 it pushed the header 65px past its container and the page
                  scrolled sideways. Below 1360 the short label keeps some slack. */}
              <span className="lg:max-[1360px]:hidden">Book a Growth Consultation</span>
              <span className="hidden lg:max-[1360px]:inline">Book a Call</span>
            </Button>
          </span>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="hidden size-10 cursor-pointer items-center justify-center rounded-button border border-line max-lg:flex"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="size-5" aria-hidden>
              {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h10" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="menu-pop border-t border-line bg-warm lg:hidden">
          <div className="container-omh max-h-[calc(100dvh-84px)] overflow-y-auto py-4">
            {primaryNav.map((item) => {
              const current = isCurrent(pathname, item);
              return item.columns ? (
                <details key={item.label} name="mobile-nav" className="group border-b border-line">
                  <summary
                    className={`flex min-h-12 cursor-pointer list-none items-center justify-between py-3 font-sans text-[16px] font-semibold [&::-webkit-details-marker]:hidden ${
                      current ? "text-amber-deep" : ""
                    }`}
                  >
                    {item.label}
                    <Chevron className="size-5 text-amber-deep transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="pb-3">
                    {item.columns.map((col) => (
                      <div key={col.heading ?? item.label} className="mb-1">
                        {col.heading && (
                          <p className="px-2.5 pb-1 pt-2 text-[14px] font-semibold uppercase tracking-[0.12em] text-muted">
                            {col.heading}
                          </p>
                        )}
                        {col.links.map((link) => (
                          <MenuEntry key={link.href} link={link} onClick={() => setOpen(false)} />
                        ))}
                      </div>
                    ))}
                    {item.cta && (
                      <div className="mt-3 rounded-card border border-line bg-surface p-4">
                        <p className="text-[16px] text-muted">{item.cta.text}</p>
                        <Button href={item.cta.href} small arrow onClick={() => setOpen(false)} className="mt-3">
                          {item.cta.label}
                        </Button>
                      </div>
                    )}
                  </div>
                </details>
              ) : (
                <Link
                  key={item.href}
                  href={item.href!}
                  onClick={() => setOpen(false)}
                  aria-current={current ? "page" : undefined}
                  className={`flex min-h-12 items-center justify-between border-b border-line py-3 font-sans text-[16px] font-semibold ${
                    current ? "text-amber-deep" : ""
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="flex flex-col gap-3 py-5">
              <Button href="/contact" onClick={() => setOpen(false)}>
                Book a Growth Consultation
              </Button>
              <a
                href={company.phoneHref}
                onClick={() => setOpen(false)}
                className="text-center text-body text-muted"
              >
                {company.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
