import type { Metadata } from "next";
import { FreeConsultationPage } from "@/components/forms/FreeConsultationPage";
import { freeConsultation } from "@/lib/content/quote-forms";

export const metadata: Metadata = {
  title: freeConsultation.seo.title,
  description: freeConsultation.seo.description,
  alternates: { canonical: "https://onlinemarketinghelp.co.uk/omh-free-consultation" },
};

export default function Page() {
  return <FreeConsultationPage />;
}
