import Link from "next/link";
import { MediaFrame } from "@/components/ServiceMedia";
import { ServiceBand } from "@/components/services/ServiceBand";
import { Button } from "@/components/ui/Button";
import { BookDemo } from "@/components/BookDemo";
import { FinalCta } from "@/components/ui/FinalCta";
import { company } from "@/lib/content/nav";
import { freeConsultation as page } from "@/lib/content/quote-forms";
import { AccentTitle } from "@/components/services/ServicePrimitives";

// Consultation imagery accompanies the contact route until online booking is configured.

export function FreeConsultationPage() {
  return (
    <main>
      <ServiceBand label="Free consultation" tone="warm" accent="bg-amber" labelStyle="plain" className="hero-grid">
        <div className="mx-auto text-center">
          <h1 className="font-sans text-display font-semibold text-balance"><AccentTitle text={page.title} /></h1>
          <p className="mt-5 font-sans text-h2 font-semibold text-amber-deep text-balance">
            {page.subtitle}
          </p>
          <p className="mt-7 text-lead leading-relaxed text-ink/75">{page.intro}</p>
          <div className="mt-9 flex justify-center">
            <Button href="/pricing" arrow data-event="consultation_pricing_click">
              {page.pricingCta}
            </Button>
          </div>
        </div>
      </ServiceBand>

      <ServiceBand
        id="book"
        label={page.bookingLabel}
        tone="mist"
        accent="bg-amber"
        labelStyle="centered"
      >
        <h2 className="mx-auto text-center font-sans text-h2 font-semibold text-balance">
          {page.bookingHeading}
        </h2>
        <div className="mt-10">
          <MediaFrame
            kind="screen"
            theme="ppc"
            title="Plan your consultation"
            note="Project planning illustration."
            ratio="16/9" source="/images/home/agency-collaboration.webp" alt="Team collaboration during project planning" />
        </div>
        <p className="mt-7 text-center text-body text-ink/70">
          <Button href="/contact" arrow>Arrange your free consultation</Button>
          <br /><br />
          Prefer to talk now?{" "}
          <Link href={company.phoneHref} className="font-semibold text-ink hover:text-amber-deep">
            {page.phone}
          </Link>
        </p>
      </ServiceBand>

      <ServiceBand label={page.awardsHeading} tone="white" accent="bg-amber" labelStyle="centered">
        <ul className="flex flex-wrap justify-center gap-4">
          {page.awards.map((award) => (
            <li
              key={award}
              className="rounded-full border border-line px-5 py-2.5 text-label font-semibold text-ink/80"
            >
              {award}
            </li>
          ))}
        </ul>
      </ServiceBand>

      <ServiceBand label={page.contactHeading} tone="warm" accent="bg-amber" labelStyle="centered">
        <div className="mx-auto text-center">
          <p className="text-lead leading-relaxed text-ink/75">{page.contactBody}</p>
          <p className="mt-6 font-sans text-h2 font-semibold">
            <Link href={company.phoneHref} className="hover:text-amber-deep">
              {page.phone}
            </Link>
          </p>
        </div>
      </ServiceBand>

      <ServiceBand label={page.clientsHeading} tone="mist" accent="bg-amber" labelStyle="centered">
        <p className="mx-auto text-center text-lead leading-relaxed text-ink/75">
          {page.clientsIntro}
        </p>
        <div className="mt-11 grid grid-cols-2 gap-8 max-md:grid-cols-1">
          {page.clients.map((client) => (
            <figure key={client.name}>
              <MediaFrame
                kind="image"
                theme="ppc"
                title={client.name}
                note="Client video testimonial."
                ratio="16/9" source="/images/home/agency-collaboration.webp" alt="Illustrative agency collaboration" />
              <figcaption className="mt-5 text-body leading-relaxed text-ink/75">
                {client.body}
              </figcaption>
            </figure>
          ))}
        </div>
      </ServiceBand>

      <FinalCta
        title="Book the call"
        titleAccent="call"
        body="Pick a time that suits you and we will talk through the website, the search position and the ad spend before anyone quotes anything."
        primary={{ label: "Book a consultation", event: "consultation_final_book", href: "#book" }}
        secondary={{ label: "See pricing", event: "consultation_final_pricing", href: "/pricing" }}
        contactEvents={{ phone: "consultation_phone_click", email: "consultation_email_click" }}
      />
      <BookDemo />
    </main>
  );
}
