import type { Metadata } from "next";
import {
  WarrantyCoverage,
  WarrantyFinalCta,
  WarrantyGuarantee,
  WarrantyHero,
  WarrantyIntro,
  WarrantyPricing,
} from "@/components/WarrantySections";

export const metadata: Metadata = {
  title: "Website Warranty Plans",
  description:
    "Optional 1, 3 and 5 year website warranty plans from Online Marketing Help, covering support requests, error messages, broken links and technical assistance.",
  alternates: { canonical: "https://onlinemarketinghelp.co.uk/warranty" },
};

export default function WarrantyPage() {
  return (
    <main>
      <WarrantyHero />
      <WarrantyIntro />
      <WarrantyCoverage />
      <WarrantyPricing />
      <WarrantyGuarantee />
      <WarrantyFinalCta />
    </main>
  );
}
