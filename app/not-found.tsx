import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";

// Every notFound() and unmatched URL lands here, inside the site header and footer. Before this file existed,
// Next's bare default showed: a black screen with "404 | This page could not be found" under the site header.

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="hero-grid overflow-x-clip border-b border-line bg-warm">
      <div className="container-omh section-md text-center">
        <p className="font-sans text-[clamp(96px,60px+10vw,180px)] font-semibold leading-none text-amber-deep">404</p>
        <h1 className="mt-6 font-sans text-h2 font-semibold">Page not found</h1>
        <p className="mb-9 mt-4 text-body text-ink/75">The page you are looking for doesn&rsquo;t exist or has been moved.</p>
        <Button href="/" arrow>
          Back to home
        </Button>
      </div>
    </section>
  );
}
