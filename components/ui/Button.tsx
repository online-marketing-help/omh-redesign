import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { isHiddenHref } from "@/lib/flags";

// Future Elementor widget: "OMH Button"
type Variant = "primary" | "secondary" | "inverse" | "ghost-white";

/* Every variant sets its own border colour. The base used to declare
   `border-transparent`, which collides with `border-ink` at equal specificity —
   stylesheet order decided the winner and the secondary button rendered with an
   invisible border, so it read as bare text with no affordance. */
const styles: Record<Variant, string> = {
  primary: "border-transparent bg-teal text-white hover:bg-teal-dark hover:text-white",
  secondary: "border-ink text-ink hover:bg-ink/5",
  // Sits on the dark CTA ground, so it pins to the fixed light/dark pair. Hover is the full accent
  // (client audit, 26 Oct 2026: the pale soft-dark tint barely read as a change on dark sections).
  inverse: "border-transparent bg-oninverse text-inverse hover:bg-teal hover:text-white",
  "ghost-white": "border-oninverse/55 text-oninverse hover:border-oninverse hover:bg-oninverse/10",
};

export function Button({
  href,
  variant = "primary",
  arrow = false,
  small = false,
  children,
  ...props
}: {
  href: string;
  variant?: Variant;
  arrow?: boolean;
  small?: boolean;
  children: ReactNode;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  if (isHiddenHref(href)) return null;
  return (
    <Link
      href={href}
      {...props}
      className={`button-motion group inline-flex items-center gap-2 rounded-button border-[1.5px] font-semibold leading-none
        ${small ? "px-4.5 py-3 text-label" : "px-7 py-4 text-body"} ${styles[variant]} ${props.className ?? ""}`}
    >
      {children}
      {arrow && <ArrowRight className="size-4 transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:translate-x-0.5" />}
    </Link>
  );
}

export function TextLink({
  href,
  children,
  ...props
}: {
  href: string;
  children: ReactNode;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  if (isHiddenHref(href)) return null;
  return (
    <Link
      href={href}
      {...props}
      className={`group inline-flex items-center gap-2 font-semibold text-amber-deep transition-colors duration-500 hover:text-amber-deep hover:underline underline-offset-4 ${props.className ?? ""}`}
    >
      {children}
      <ArrowRight className="size-4 transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:translate-x-0.5" />
    </Link>
  );
}

export function ArrowRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <path d="M5 12h14m-7-7 7 7-7 7" />
    </svg>
  );
}
