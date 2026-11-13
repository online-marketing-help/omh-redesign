import { statSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import { Download } from "lucide-react";
import { Pointer } from "@/components/Pointer";
import { ArrowRight } from "@/components/ui/Button";
import { company, footerCols, legalLinks } from "@/lib/content/nav";

const DECK = "/company-deck.pdf";

// The wordmark band's viewBox. At 137 units the name's ink runs 101 above the
// baseline and 30 below (measured), so a baseline at 126 leaves ~25 units clear
// above the caps and below the descenders.
const WORDMARK_VIEWBOX = "0 0 1600 180";

// The name spans 90% of the band (x 80–1520). Its fill is a left-to-right
// gradient that turns into the site's light-amber heading accent from
// "rketing" (≈45%) through "Help".
function WordmarkText({ fill, mask }: { fill: string; mask?: string }) {
  return (
    <text
      x="80"
      y="126"
      textLength="1440"
      lengthAdjust="spacing"
      fontSize="137"
      fill={fill}
      mask={mask}
      className="font-sans font-semibold"
    >
      {company.name}
    </text>
  );
}

// ponytail: the deck link renders only once public/company-deck.pdf exists, and
// its size label is read from the file, so it can't 404 or go stale on replace.
function deckSize() {
  try {
    const mb = statSync(path.join(process.cwd(), "public", DECK)).size / 1e6;
    return mb >= 1 ? `${mb.toFixed(1).replace(/\.0$/, "")}MB` : `${Math.max(1, Math.round(mb * 1000))}KB`;
  } catch {
    return null;
  }
}

// Brand marks (Simple Icons geometry; Instagram drawn as an even-odd outline).
// lucide-react v1 dropped its brand icons, hence inline paths.
const socialPaths: Record<string, string> = {
  Facebook:
    "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z",
  Instagram:
    "M7 0h10a7 7 0 0 1 7 7v10a7 7 0 0 1-7 7H7a7 7 0 0 1-7-7V7a7 7 0 0 1 7-7Zm0 2.2A4.8 4.8 0 0 0 2.2 7v10A4.8 4.8 0 0 0 7 21.8h10a4.8 4.8 0 0 0 4.8-4.8V7A4.8 4.8 0 0 0 17 2.2H7Zm5 4.2a5.6 5.6 0 1 1 0 11.2 5.6 5.6 0 0 1 0-11.2Zm0 2a3.6 3.6 0 1 0 0 7.2 3.6 3.6 0 0 0 0-7.2Zm6.2-4a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8Z",
  LinkedIn:
    "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  X: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z",
};

function SocialIcon({ name }: { name: string }) {
  return (
    <svg viewBox="0 0 24 24" className="size-[18px]" fill="currentColor" fillRule="evenodd" aria-hidden>
      <path d={socialPaths[name]} />
    </svg>
  );
}

const linkClass =
  "footer-link block py-1 text-label leading-snug text-oninverse/62 transition-colors hover:text-oninverse focus-visible:text-oninverse";
const headingClass =
  "mb-4 font-sans text-[14px] font-semibold uppercase tracking-[0.14em] text-oninverse";

/*
  The footer carries the last impression, so it runs on the same ink ground as
  the closing CTA above it: one continuous dark block rather than a pale link
  grid bolted to the bottom of the page.
  Future Elementor widget: "OMH Footer" (brief §31).
*/
export function Footer() {
  const deck = deckSize();

  return (
    <footer className="bg-inverse text-oninverse">
      <div className="container-omh">
        {/* Contact strip: the two things people actually come down here for. */}
        <div className="grid grid-cols-2 gap-x-10 gap-y-8 border-b border-oninverse/12 py-12 max-md:grid-cols-1 max-md:py-9">
          <div>
            <p className="font-sans text-[14px] font-semibold uppercase tracking-[0.16em] text-amber">
              Start a conversation
            </p>
            <a
              href={company.phoneHref}
              className="mt-3 block font-sans text-[clamp(28px,22px+1.4vw,40px)] font-semibold leading-none transition-colors hover:text-amber"
            >
              {company.phoneDisplay}
            </a>
          </div>
          <div className="md:justify-self-end md:text-right">
            <p className="font-sans text-[14px] font-semibold uppercase tracking-[0.16em] text-oninverse/50">
              Or send the brief
            </p>
            <a
              href={`mailto:${company.email}`}
              className="mt-3 inline-flex items-center gap-3 break-all font-sans text-[clamp(19px,17px+0.5vw,24px)] font-semibold transition-colors hover:text-amber"
            >
              {company.email}
              <ArrowRight className="size-5 shrink-0 max-sm:hidden" />
            </a>
          </div>
        </div>

        {/* Brand intro, then the link groups (footerCols order). Five groups
            at the 18px text floor leave no room for the intro beside them, so
            it takes its own row and the groups spread across the full width. */}
        <div className="py-14">
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
            <div>
              <Image src="/images/logo-white.png" alt={company.name} width={180} height={46} className="h-auto w-[180px]" />
              <p className="mt-5 text-body leading-relaxed text-oninverse/62">
                {company.positioning}
              </p>
              <ul className="mt-6 flex gap-3">
                {company.socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${company.name} on ${social.label}`}
                      data-event={`footer_social_${social.label.toLowerCase()}_click`}
                      className="grid size-11 place-items-center rounded-full border border-oninverse/20 text-oninverse/75 transition-colors hover:border-amber hover:bg-amber hover:text-white focus-visible:border-amber focus-visible:text-oninverse"
                    >
                      <SocialIcon name={social.label} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className={headingClass}>Our location</p>
              <address className="not-italic text-body leading-relaxed text-oninverse/62">
                {company.address}
              </address>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-x-8 gap-y-10 xl:flex xl:justify-between">
            {footerCols.map((col) => (
              <nav key={col.heading} aria-label={col.heading}>
                <p className={headingClass}>{col.heading}</p>
                {col.links.map((link) => (
                  <Link key={link.href} href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                ))}
              </nav>
            ))}
          </div>
        </div>
      </div>

      {/* Wordmark band, in the site's own vocabulary: the hero's 48px grid and
          amber glow behind a faint watermark of the name, and the ink cards'
          pointer spotlight, which here lights the letters under the cursor.
          Decorative (the logo already names the company), so hidden from
          assistive tech. */}
      <div aria-hidden>
        <Pointer className="footer-wordmark relative">
          {/* relative: paints above the grid glints in .footer-wordmark::before */}
          <svg viewBox={WORDMARK_VIEWBOX} className="relative block h-auto w-full">
            <defs>
              {/* Colour runs left to right: faint white, then light amber. */}
              <linearGradient id="fw-fill" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1600" y2="0">
                <stop offset="0.45" stopColor="currentColor" stopOpacity="0.22" />
                <stop offset="0.6" stopColor="#7d5c33" stopOpacity="0.36" />
                <stop offset="0.8" stopColor="#7d5c33" stopOpacity="0.44" />
              </linearGradient>
              {/* The top-to-bottom fade is a mask, so it combines with that colour. */}
              <linearGradient id="fw-fade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#fff" />
                <stop offset="1" stopColor="#fff" stopOpacity="0.25" />
              </linearGradient>
              <mask id="fw-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="1600" height="180">
                <rect width="1600" height="180" fill="url(#fw-fade)" />
              </mask>
            </defs>
            <WordmarkText fill="url(#fw-fill)" mask="url(#fw-mask)" />
          </svg>
          <svg viewBox={WORDMARK_VIEWBOX} className="footer-wordmark-lit absolute inset-0 block h-full w-full">
            <defs>
              <linearGradient id="fw-lit" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1600" y2="0">
                <stop offset="0.45" stopColor="#f8eddc" stopOpacity="0.6" />
                <stop offset="0.6" stopColor="#7d5c33" stopOpacity="0.9" />
              </linearGradient>
            </defs>
            <WordmarkText fill="url(#fw-lit)" />
          </svg>
        </Pointer>
      </div>

      <div className="container-omh">
        {deck && (
          <div className="py-8">
            <a
              href={DECK}
              download="Online-Marketing-Help-Company-Deck.pdf"
              data-event="footer_company_deck_download"
              className="group inline-flex items-center gap-4"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-amber text-white transition-transform duration-300 group-hover:scale-110">
                <Download aria-hidden className="size-5" strokeWidth={2.25} />
              </span>
              <span>
                <span className="block font-sans text-lg leading-tight underline decoration-oninverse decoration-1 underline-offset-4 transition-colors group-hover:decoration-amber md:text-xl">
                  Company Deck
                </span>
                <span className="block pt-1 text-body text-oninverse/50 md:text-lg">PDF, {deck}</span>
              </span>
            </a>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t border-oninverse/12 py-7 text-[18px] text-oninverse/50">
          <span>
            © {new Date().getFullYear()} {company.name} · Company No. {company.companyNo}
          </span>
          <span className="flex flex-wrap gap-x-6 gap-y-2">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-oninverse">
                {link.label}
              </Link>
            ))}
          </span>
        </div>
      </div>
    </footer>
  );
}
