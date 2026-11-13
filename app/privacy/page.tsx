import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalSections";
import { privacyPolicy } from "@/lib/content/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Online Marketing Help collects, uses and protects your personal data.",
  alternates: { canonical: "https://onlinemarketinghelp.co.uk/privacy" },
};

export default function PrivacyPolicyPage() {
  return <LegalPage doc={privacyPolicy} />;
}
