import { CaseStudyHero } from "@/components/case-studies/CaseStudyHero";
import { CaseStudyNavigation } from "@/components/case-studies/CaseStudyNavigation";
import { CaseStudyResults, CaseStudyServices, CaseStudyTestimonial } from "@/components/case-studies/CaseStudyResults";
import { CaseStudyChallenges, CaseStudyWorkSection } from "@/components/case-studies/CaseStudyWorkSection";
import { BookDemo } from "@/components/BookDemo";
import { FinalCta } from "@/components/ui/FinalCta";
import type { CaseStudy } from "@/lib/content/case-studies";

// Hero, then the outcome straight away, then how it was reached: brief,
// approach, the client's words, the services involved and the way on.
export function CaseStudyArticle({ study }: { study: CaseStudy }) {
  return (
    <article data-case-article={study.slug}>
      <CaseStudyHero study={study} />
      <CaseStudyResults study={study} />
      <CaseStudyChallenges study={study} />
      <CaseStudyWorkSection study={study} />
      <CaseStudyTestimonial study={study} />
      <CaseStudyServices study={study} />
      <CaseStudyNavigation study={study} />
      <FinalCta
        title="Have a similar project in mind?"
        titleAccent="in mind?"
        body="Tell us about your business, the challenge and what a useful result would look like."
        primary={{ label: "Discuss your project", href: "/contact", event: "case_study_cta_click" }}
        contactEvents={{ phone: "case_study_phone_click", email: "case_study_email_click" }}
      />
      <BookDemo />
    </article>
  );
}
