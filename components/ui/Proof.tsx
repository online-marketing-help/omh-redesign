import Image from "@/components/ui/SiteImage";
import Link from "next/link";
import { BadgeCheck, Quote, Star, TrendingUp } from "lucide-react";
import type { ReactNode } from "react";
import { caseStudies } from "@/lib/content/case-studies";
import { siteTestimonials } from "@/lib/content/testimonials";

/*
  Placeholder discipline (brief §1): unverified facts never render as if they
  were proof. Styled quietly (not as an alarm) so pages read as in-progress
  rather than broken while these are swapped for the real thing pre-launch.
*/

// Future Elementor widget: "OMH Verified Slot"
export function VerifiedSlot({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-warm px-3 py-1 text-body font-medium text-muted">
      {children}
    </span>
  );
}

// Verified company-level review proof (proof brief, Oct 2026): 37 Trustpilot reviews
// averaging 4.95 and 10 Google reviews averaging 4.60. Never relabel it as a
// service-specific rating, and don't combine the averages — the dashboard's 4.6
// overall method is unconfirmed. It replaces the pending proof chips that used to
// sit under the service heroes; add service-specific items only once verified.
export const REVIEW_PROOF = "47 Reviews Across Trustpilot & Google";

// Per-service proof shown beside the review count, so no two service heroes carry the
// same badge. Nothing here is new: `study` is a published result from a case study
// tagged with that service, `review` is a verbatim excerpt from a named published
// review, `fact` is a company figure already in the homepage stats. The lookups throw
// on a mismatch, so a renamed result or an edited review fails the build instead of
// publishing a wrong number.
const serviceProof = {
  seo: { study: ["fine-dining", "Organic-traffic increase"], review: ["Paige Dalby", "It’s given me some great direction"] },
  "google-ads": { study: ["car-showroom", "Conversion-value increase"], review: ["Tania Smyths", "Really grateful for the support with our ads on google"] },
  amazon: { fact: "36 specialists in one UK team", review: ["Gary Smart", "Good listeners and certainly in my case delivering exactly what I wanted"] },
  wordpress: { study: ["bar", "Reservation increase"], review: ["Natasha Kendle", "The process was so easy and Sarah was fantastic in presenting me with ideas"] },
  maintenance: { fact: "Est. 2019 · Companies House no. 12328533", review: ["Ricky Catt", "didn’t try to over exaggerate the work that needed done"] },
  shopify: { study: ["clothing-business", "Purchase-conversion increase"], review: ["Kiera Taylor-Elton", "Great to work with a company that aren’t so pushy on the sales front"] },
  "ecommerce-seo": { study: ["clothing-business", "Organic-traffic increase"], review: ["Ricky Catt", "she was so polite and professional"] },
  "social-media": { fact: "13 services under one roof", review: ["Karl Weller", "Now with Online Marketing Helps support I can put my feet up and relax"] },
  "paid-social": { fact: "100% UK business focus", review: ["Natasha Kendle", "FB paid ads and I am really happy with the results"] },
} satisfies Record<string, { study?: [slug: string, resultLabel: string]; fact?: string; review: [name: string, excerpt: string] }>;

export type ServiceProofId = keyof typeof serviceProof;

function resolveProof(id: ServiceProofId) {
  const proof = serviceProof[id];
  let study: { href: string; client: string; value: string; label: string } | undefined;
  if ("study" in proof) {
    const [slug, label] = proof.study;
    const s = caseStudies.find((c) => c.slug === slug);
    const r = s?.results.find((x) => x.label === label);
    if (!s || !r) throw new Error(`ReviewProof: no result "${label}" on case study "${slug}"`);
    study = { href: `/case-studies/${s.slug}`, client: s.client, value: r.value, label: r.label.replace(/^./, (c) => c.toLowerCase()) };
  }
  const [name, excerpt] = proof.review;
  const t = siteTestimonials.find((x) => x.name === name);
  if (!t || !t.quote.includes(excerpt)) throw new Error(`ReviewProof: "${excerpt}" is not in ${name}'s published review`);
  return { study, fact: "fact" in proof ? proof.fact : undefined, review: { name, excerpt } };
}

const pill = "inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-4 py-2 font-sans text-[16px] font-semibold text-ink";

export function ReviewProof({ heading, serviceId, className = "" }: { heading: string; serviceId: ServiceProofId; className?: string }) {
  const { study, fact, review } = resolveProof(serviceId);
  return (
    <div className={`border-t border-line pt-5 ${className}`}>
      <p className="mb-3.5 text-[14px] font-semibold uppercase tracking-[0.14em] text-muted">{heading}</p>
      <ul className="flex flex-wrap items-center gap-2.5">
        <li className={pill}>
          <Star className="size-4 shrink-0 fill-amber text-amber" aria-hidden="true" />
          {REVIEW_PROOF}
        </li>
        {study && (
          <li>
            <Link href={study.href} aria-label={`Read the ${study.client} case study`} className={`${pill} transition-colors hover:border-ink/40`}>
              <TrendingUp className="size-4 shrink-0 text-amber-deep" aria-hidden="true" />
              {study.value} {study.label} · {study.client}
            </Link>
          </li>
        )}
        {fact && (
          <li className={pill}>
            <BadgeCheck className="size-4 shrink-0 text-amber-deep" aria-hidden="true" />
            {fact}
          </li>
        )}
        <li className="basis-full">
          <blockquote className="flex items-start gap-2.5 text-body leading-relaxed text-ink/75">
            <Quote className="mt-1.5 size-4 shrink-0 fill-amber/30 text-amber" aria-hidden="true" />
            <span>
              “{review.excerpt}” <cite className="font-semibold not-italic text-ink">— {review.name}</cite>, published review
            </span>
          </blockquote>
        </li>
      </ul>
    </div>
  );
}

// Illustrative evidence images; client verification remains in VerifiedSlot.
export function Fpo({ ratio, tag, title, source, alt, className = "" }: {
  ratio: string;
  tag: string;
  title: string;
  note: string;
  source: string;
  alt?: string;
  className?: string;
}) {
  return (
    <figure style={{ aspectRatio: ratio }} className={"relative overflow-hidden rounded-media border border-line " + className}>
      <Image src={source} alt={alt ?? title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
      <figcaption className="absolute bottom-3 left-3 rounded-md border border-line bg-surface/95 px-2 py-1 text-body font-semibold text-ink">
        {tag} · Illustration
      </figcaption>
    </figure>
  );
}

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p
      className={`flex items-center text-[14px] font-semibold uppercase ${
        light
          ? "gap-3 tracking-[0.15em] text-oninverse/60"
          : "gap-2.5 tracking-[0.16em] text-muted"
      }`}
    >
      <span aria-hidden className={`h-0.5 w-5 ${light ? "bg-[#7d5c33]" : "bg-amber"}`} />
      {children}
    </p>
  );
}

