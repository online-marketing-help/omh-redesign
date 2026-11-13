import Image from "@/components/ui/SiteImage";
import { Leaf, HandHeart, Users, Trees } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { AboutTabs } from "@/components/about/AboutTabs";
import { Button } from "@/components/ui/Button";
import { BookDemo } from "@/components/BookDemo";
import { FinalCta } from "@/components/ui/FinalCta";
import { Eyebrow } from "@/components/ui/Proof";
import { about } from "@/lib/content/about";

/*
  About page. Copy is verbatim from the live site; the structure alternates
  reading columns with real team photography so the page has something to look
  at between the long-form sections. Every media block is either a real photo
  from public/images/about or an existing approved home-page image.
*/

const faces = about.team.members;

export function AboutHero() {
  const [lead] = about.hero.story;

  return (
    <section className="hero-grid relative overflow-hidden border-b border-line bg-warm">
      <div className="container-omh section-md">
        <Reveal>
          <Eyebrow>{about.hero.eyebrow}</Eyebrow>

          <div className="mt-9 grid grid-cols-12 items-center gap-x-12 gap-y-12 max-lg:block">
            <div className="col-span-7">
              <h1 className="font-sans text-display font-semibold text-balance">
                <span className="text-amber-deep">{about.hero.titleLead}</span>{" "}
                {about.hero.titleRest}
              </h1>
              {/* Tied to the headline with a rule — on its own it read as a
                  stray serif line floating between the h1 and the copy. */}
              <p className="mt-6 flex items-center gap-4 font-body text-h3 text-ink/75">
                <span aria-hidden className="h-px w-10 shrink-0 bg-amber" />
                {about.hero.subtitle}
              </p>
              <p className="mt-8 text-lead leading-relaxed text-ink/75">{lead}</p>
              <div className="mt-10 flex flex-wrap gap-3.5 max-sm:flex-col max-sm:items-stretch">
                <Button href="/contact" arrow data-event="about_hero_cta_click">
                  Talk to the Team
                </Button>
                <Button href="/case-studies" variant="secondary" data-event="about_hero_work_click">
                  See Our Work
                </Button>
              </div>
            </div>

            {/* The people are the point of this page, so they open it. */}
            <div className="col-span-5 max-lg:mt-12">
              <div className="grid grid-cols-2 gap-4">
                <div className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-media border border-line bg-soft">
                  <Image
                    src="/images/home/agency-collaboration.webp"
                    alt="The Online Marketing Help team working together on a client campaign"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
                {faces.slice(0, 2).map((member) => (
                  <div
                    key={member.name}
                    className="relative aspect-square overflow-hidden rounded-media border border-line bg-soft"
                  >
                    <Image
                      src={member.photo}
                      alt={`${member.name}, ${member.role} at Online Marketing Help`}
                      fill
                      sizes="(max-width: 1024px) 50vw, 20vw"
                      className="object-cover"
                    />
                    {/* Deep gradient stop: these labels sit over photography, so
                        the ground has to carry them on light images too. */}
                    <span className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgb(0_0_0/0.92))] px-5 pb-5 pt-12">
                      <span className="block font-sans text-body font-semibold text-white">
                        {member.name}
                      </span>
                      <span className="mt-0.5 block text-label leading-snug text-white/85">
                        {member.role}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-14 grid grid-cols-3 gap-x-10 gap-y-8 border-t border-line pt-9 max-sm:grid-cols-1">
            {[
              [Users, `${faces.length} specialists`, "Marketing, development, creative and support in one team"],
              [Trees, "2,000+ trees", "Planted through the One Tree Planted initiative"],
              [Leaf, "Paperless since 2021", "Online-only working, with no office printers"],
            ].map(([Icon, value, label]) => {
              const Glyph = Icon as typeof Users;
              return (
                <div key={value as string} className="flex gap-4">
                  <Glyph className="mt-0.5 size-6 shrink-0 text-amber-deep" strokeWidth={1.8} aria-hidden />
                  <div>
                    <p className="font-sans text-h4 font-semibold">{value as string}</p>
                    <p className="mt-1.5 text-body leading-snug text-ink/70">{label as string}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function AboutStory() {
  const rest = about.hero.story.slice(1);

  return (
    <section className="border-b border-line bg-surface">
      <div className="container-omh section-md">
        <Reveal>
          <div className="grid grid-cols-12 items-start gap-x-12 gap-y-10 max-lg:block">
            <div className="col-span-5 max-lg:mb-10">
              <div className="relative aspect-[4/5] overflow-hidden rounded-media border border-line bg-soft max-lg:aspect-[16/10]">
                <Image
                  src="/images/Solutions/2.jpg"
                  alt="Two of the team mapping channels and priorities against a marketing plan on a whiteboard"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="col-span-6 col-start-7">
              <Eyebrow>Our story</Eyebrow>
              <h2 className="mt-6 font-sans text-h2 font-semibold text-balance">
                Built after struggling to find a transparent agency.
              </h2>
              <div className="mt-7 grid gap-5">
                {rest.map((paragraph) => (
                  <p key={paragraph} className="text-body leading-relaxed text-ink/75">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function AboutAwards() {
  return (
    <section className="dark-grid border-b border-line bg-inverse text-oninverse">
      <div className="container-omh section-md">
        <Reveal>
          <div className="grid grid-cols-12 items-center gap-x-12 gap-y-10 max-lg:block">
            <div className="col-span-6">
              <Eyebrow light>{about.awards.label}</Eyebrow>
              <h2 className="mt-6 font-sans text-h2 font-semibold text-balance">
                <span className="text-[#7d5c33]">{about.awards.titleLead}</span>{" "}
                {about.awards.titleRest}
              </h2>
              <div className="mt-7 grid gap-5">
                {about.awards.body.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-body leading-relaxed text-oninverse/70"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className="col-span-5 col-start-8 max-lg:mt-10">
              <div className="grid grid-cols-2 gap-4">
                {faces.slice(2, 6).map((member) => (
                  <div
                    key={member.name}
                    className="relative aspect-[4/5] overflow-hidden rounded-media border border-oninverse/12 bg-inverse"
                  >
                    <Image
                      src={member.photo}
                      alt={`${member.name}, ${member.role} at Online Marketing Help`}
                      fill
                      sizes="(max-width: 1024px) 50vw, 20vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function AboutSustainability() {
  return (
    <section className="border-b border-line bg-warm">
      <div className="container-omh section-md">
        <Reveal>
          {/* items-start, not items-end: bottom-aligning the heading left a tall
              empty column beside the copy. */}
          <div className="grid grid-cols-12 items-start gap-x-12 gap-y-8 max-lg:block">
            <div className="col-span-5">
              <Eyebrow>{about.sustainability.label}</Eyebrow>
              <h2 className="mt-6 font-sans text-h2 font-semibold text-balance">
                {about.sustainability.title}
              </h2>
            </div>
            <div className="col-span-6 col-start-7 max-lg:mt-8">
              <div className="grid gap-5">
                {about.sustainability.body.map((paragraph) => (
                  <p key={paragraph} className="text-body leading-relaxed text-ink/72">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-16">
          <AboutTabs items={about.sustainability.initiatives} />
        </Reveal>
      </div>
    </section>
  );
}

export function AboutCharity() {
  const [lead, ...rest] = about.charity.body;

  return (
    <section className="border-b border-line bg-surface">
      <div className="container-omh section-md">
        <Reveal>
          <div className="grid grid-cols-12 items-start gap-x-12 gap-y-10 max-lg:block">
            <div className="col-span-6">
              <Eyebrow>{about.charity.label}</Eyebrow>
              <h2 className="mt-6 font-sans text-h2 font-semibold text-balance">
                <span className="text-amber-deep">{about.charity.titleLead}</span>{" "}
                {about.charity.titleRest}
              </h2>
              <p className="mt-7 text-lead leading-relaxed text-ink/75">{lead}</p>

              <ul className="mt-10 grid gap-4">
                {about.charity.causes.map((cause) => (
                  <li
                    key={cause.name}
                    className="flex gap-4 rounded-card border border-line bg-surface p-6"
                  >
                    <HandHeart
                      className="mt-0.5 size-6 shrink-0 text-amber-deep"
                      strokeWidth={1.8}
                      aria-hidden
                    />
                    <div>
                      <p className="font-sans text-h4 font-semibold">{cause.name}</p>
                      <p className="mt-2 text-body leading-relaxed text-ink/70">{cause.note}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-6 max-lg:mt-10">
              <div className="grid gap-5">
                {rest.map((paragraph) => (
                  <p key={paragraph} className="text-body leading-relaxed text-ink/72">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="mt-9">
                <Button href="/contact" variant="secondary" arrow data-event="about_charity_cta_click">
                  Tell Us About a Charity
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function AboutTeam() {
  return (
    <section className="border-b border-line bg-surface">
      <div className="container-omh section-md">
        <Reveal>
          <div className="grid grid-cols-12 items-start gap-x-12 gap-y-8 max-lg:block">
            <div className="col-span-5">
              <Eyebrow>{about.team.label}</Eyebrow>
              <h2 className="mt-6 font-sans text-h2 font-semibold text-balance">
                <span className="text-amber-deep">{about.team.titleLead}</span>{" "}
                {about.team.titleRest}
              </h2>
            </div>
            <div className="col-span-6 col-start-7 max-lg:mt-8">
              {about.team.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-5 text-body leading-relaxed text-ink/70 first:mt-0"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal>
          <ul className="mt-14 grid grid-cols-4 gap-5 max-xl:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
            {about.team.members.map((member) => (
              <li key={member.name}>
                <figure className="group relative overflow-hidden rounded-media border border-line bg-soft">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={member.photo}
                      alt={`${member.name}, ${member.role} at Online Marketing Help`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 33vw, 25vw"
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.04]"
                    />
                  </div>
                  <figcaption className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgb(0_0_0/0.94))] px-5 pb-5 pt-14">
                    <p className="font-sans text-h4 font-semibold text-white">{member.name}</p>
                    <p className="mt-1 text-body leading-snug text-white/85">{member.role}</p>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

export function AboutFinalCTA() {
  return (
    <>
      <FinalCta
        title="Bring the right specialists into your next stage of growth."
        titleAccent="next stage of growth."
        body="Tell us what you are trying to achieve. We’ll recommend the services, people and next steps that fit."
        primary={{ label: "Meet the Team", event: "about_final_cta_click" }}
        contactEvents={{ phone: "about_phone_click", email: "about_email_click" }}
      />
      <BookDemo />
    </>
  );
}
