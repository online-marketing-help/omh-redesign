import type { Metadata } from "next";
import {
  AboutAwards,
  AboutCharity,
  AboutFinalCTA,
  AboutHero,
  AboutStory,
  AboutSustainability,
  AboutTeam,
} from "@/components/about/AboutSections";

export const metadata: Metadata = {
  title: "About Online Marketing Help",
  description:
    "Meet Online Marketing Help, a UK digital marketing and web development agency, and learn about its story, approach, sustainability, charity work and team.",
  alternates: { canonical: "https://onlinemarketinghelp.co.uk/about-us" },
};

export default function AboutUsPage() {
  return (
    <main>
      <AboutHero />
      <AboutStory />
      <AboutAwards />
      <AboutSustainability />
      <AboutCharity />
      <AboutTeam />
      <AboutFinalCTA />
    </main>
  );
}
