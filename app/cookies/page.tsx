import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalSections";
import { cookiePolicy } from "@/lib/content/legal";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "How Online Marketing Help uses cookies on this website.",
  alternates: { canonical: "https://onlinemarketinghelp.co.uk/cookies" },
};

export default function CookiePolicyPage() {
  return <LegalPage doc={cookiePolicy} />;
}
