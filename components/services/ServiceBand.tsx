import type { ReactNode } from "react";

// Single "label + content" band shared by every service and landing page.
// Previously duplicated near-identically across 6 files with drifting spacing —
// this is the converged version. Each page keeps its own accent colour via
// `accent`, its own ground via `tone`, and its own label treatment via
// `labelStyle`, so consecutive pages don't repeat the same heading bar.

export type ServiceBandTone = "warm" | "white" | "mist" | "navy" | "dark";

/* `rule` is the original treatment and stays the default, so the nine existing
   service pages are untouched. Every rebuilt legacy page picks a different one. */
export type ServiceBandLabel =
  | "rule" // dash + caps + hairline running to the right
  | "plain" // dash + caps, nothing else
  | "pill" // caps inside a rounded outline chip
  | "index" // large tabular numeral beside the caps
  | "centered" // hairline — caps — hairline, centred
  | "underline" // caps above a short thick accent bar
  | "topline" // full-width hairline above, caps beneath
  | "dot" // filled accent dot + caps
  | "none"; // no label band — content supplies its own heading

const toneClass: Record<ServiceBandTone, string> = {
  warm: "",
  white: "border-b border-line bg-surface",
  mist: "bg-tint-blue text-ink",
  // Black and white sections only (client, 29 Oct 2026). OLD navy #0e2035, dark #211a12.
  navy: "bg-inverse text-oninverse",
  dark: "bg-inverse text-oninverse",
};

const darkTones: ServiceBandTone[] = ["navy", "dark"];

export function ServiceBand({
  label,
  id,
  tone = "warm",
  accent = "bg-amber",
  labelStyle = "rule",
  index,
  className,
  children,
}: {
  label: string;
  id?: string;
  tone?: ServiceBandTone;
  accent?: string;
  labelStyle?: ServiceBandLabel;
  index?: number;
  /** Extra classes for the section, e.g. "hero-grid" when the band is a page hero. */
  className?: string;
  children: ReactNode;
}) {
  const dark = darkTones.includes(tone);
  const caps = `text-[14px] font-semibold uppercase tracking-[0.17em] ${dark ? "text-oninverse/55" : "text-muted"}`;
  const hair = dark ? "bg-oninverse/12" : "bg-line";
  const border = dark ? "border-oninverse/25" : "border-line";
  const accentText = dark ? "text-oninverse/70" : "text-amber-deep";

  return (
    <section id={id} className={[toneClass[tone], className].filter(Boolean).join(" ") || undefined}>
      <div className="container-omh section-md">
        <div className={labelStyle === "none" ? undefined : "mb-11"}>
          {labelStyle === "rule" && (
            <div className={`flex items-center gap-4 ${caps}`}>
              <span aria-hidden className={`h-0.5 w-7 shrink-0 ${accent}`} />
              <span className="min-w-0">{label}</span>
              <span aria-hidden className={`h-px flex-1 ${hair}`} />
            </div>
          )}

          {labelStyle === "plain" && (
            <div className={`flex items-center gap-4 ${caps}`}>
              <span aria-hidden className={`h-0.5 w-7 shrink-0 ${accent}`} />
              <span>{label}</span>
            </div>
          )}

          {labelStyle === "pill" && (
            <span
              className={`inline-flex items-center rounded-full border px-4 py-1.5 ${border} ${caps}`}
            >
              {label}
            </span>
          )}

          {labelStyle === "index" && (
            <div className="flex items-baseline gap-4">
              {index !== undefined && (
                <span
                  aria-hidden
                  className={`font-sans text-[clamp(30px,24px+1.2vw,40px)] font-semibold leading-none tabular-nums ${accentText}`}
                >
                  {String(index).padStart(2, "0")}
                </span>
              )}
              <span className={caps}>{label}</span>
            </div>
          )}

          {labelStyle === "centered" && (
            <div className={`flex items-center gap-5 ${caps}`}>
              <span aria-hidden className={`h-px flex-1 ${hair}`} />
              <span className="min-w-0">{label}</span>
              <span aria-hidden className={`h-px flex-1 ${hair}`} />
            </div>
          )}

          {labelStyle === "underline" && (
            <div>
              <span className={`${caps} block`}>{label}</span>
              <span aria-hidden className={`mt-3 block h-1 w-12 ${accent}`} />
            </div>
          )}

          {labelStyle === "topline" && (
            <div>
              <span aria-hidden className={`block h-px w-full ${hair}`} />
              <span className={`${caps} mt-4 block`}>{label}</span>
            </div>
          )}

          {labelStyle === "dot" && (
            <div className={`flex items-center gap-3 ${caps}`}>
              <span aria-hidden className={`size-2 shrink-0 rounded-full ${accent}`} />
              <span>{label}</span>
            </div>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}
