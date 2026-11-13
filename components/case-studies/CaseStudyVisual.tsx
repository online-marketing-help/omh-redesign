import Image from "@/components/ui/SiteImage";
import { caseStudyMedia, type CaseStudy } from "@/lib/content/case-studies";

export function CaseStudyVisual({ study, ratio = "16/10", className = "", frameClassName = "", priority = false, caption = false }: {
  study: CaseStudy;
  ratio?: string;
  className?: string;
  /** Classes for the image frame itself (radius, shadow), e.g. "rounded-none" inside a card. */
  frameClassName?: string;
  priority?: boolean;
  caption?: boolean;
}) {
  const image = caseStudyMedia[study.slug];
  return (
    <figure className={className}>
      <div
        style={{ aspectRatio: ratio }}
        className={`image-hover-frame relative overflow-hidden rounded-media ${image.logo ? "bg-inverse" : "bg-soft"} ${frameClassName}`}
      >
        <Image src={image.src} alt={image.alt} fill priority={priority} sizes="(max-width: 767px) 100vw, 60vw" className={image.logo ? "object-contain p-[15%]" : "object-cover"} />
      </div>
      {caption && (
        <figcaption className="mt-4 text-[14px] font-semibold uppercase tracking-[0.14em] text-muted">{image.caption}</figcaption>
      )}
    </figure>
  );
}
