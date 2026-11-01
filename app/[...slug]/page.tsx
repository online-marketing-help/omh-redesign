import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { navLabels } from "@/lib/content/nav";

// One catch-all for every route that isn't designed yet. Explicit routes
// (/, three explicit service routes, /contact, /design-system) take precedence, so this
// only ever renders for planned-but-unbuilt pages. Same layout as app/not-found.tsx.
// Future Elementor equivalent: a shared "Coming soon" template.

function titleFor(slug: string[]): string {
  const path = "/" + slug.join("/");
  return navLabels[path] ?? slug[slug.length - 1].replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return { title: `${titleFor(slug)}: Coming soon` };
}

export default async function ComingSoon({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;

  return (
    <section className="hero-grid overflow-x-clip border-b border-line bg-warm">
      <div className="container-omh section-md text-center">
        <p className="font-sans text-[clamp(48px,24px+6.5vw,120px)] font-semibold leading-none text-amber-deep">Coming soon</p>
        <h1 className="mt-6 font-sans text-h2 font-semibold">{titleFor(slug)}</h1>
        <p className="mb-9 mt-4 text-body text-ink/75">We&rsquo;re still working on this page. Please check back soon.</p>
        <Button href="/" arrow>
          Back to home
        </Button>
      </div>
    </section>
  );
}
