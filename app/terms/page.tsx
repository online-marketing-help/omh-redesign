import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalSections";
import { termsAndConditions } from "@/lib/content/legal";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for Online Marketing Help's services.",
  alternates: { canonical: "https://onlinemarketinghelp.co.uk/terms" },
};

export default function TermsAndConditionsPage() {
  return <LegalPage doc={termsAndConditions} />;
}
