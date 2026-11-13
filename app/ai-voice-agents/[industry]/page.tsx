import type { Metadata } from "next";
import { AccountantsPage, accountantsMetadata } from "@/components/voice-agents/AccountantsPage";
import { BuildersPage, buildersMetadata } from "@/components/voice-agents/BuildersPage";
import { CarsPage, carsMetadata } from "@/components/voice-agents/CarsPage";
import { ClinicsPage, clinicsMetadata } from "@/components/voice-agents/ClinicsPage";
import { DentalPage, dentalMetadata } from "@/components/voice-agents/DentalPage";
import { EstatePage, estateMetadata } from "@/components/voice-agents/EstatePage";
import { HvacPage, hvacMetadata } from "@/components/voice-agents/HvacPage";
import { IndustryPage, industryMetadata } from "@/components/voice-agents/IndustryPage";
import { LawPage, lawMetadata } from "@/components/voice-agents/LawPage";
import { PlumbersPage, plumbersMetadata } from "@/components/voice-agents/PlumbersPage";
import { SalonsPage, salonsMetadata } from "@/components/voice-agents/SalonsPage";
import { TradesPage, tradesMetadata } from "@/components/voice-agents/TradesPage";
import { industryPaths } from "@/lib/content/voice-industry";

type Props = { params: Promise<{ industry: string }> };

// Not `dynamicParams = false`: once revalidateTag("posts") expires this page, Next 16
// treats the path as unknown and app/[...slug] caches "Coming soon" in its place.
// Unknown industries still 404 through notFound() in IndustryPage.

// Industries rebuilt on the /ai-voice-agents layout with their own content (21 Oct 2026); the others use IndustryPage.
const LANDINGS = {
  "estate-letting-agents": { Page: EstatePage, metadata: estateMetadata },
  "dentists": { Page: DentalPage, metadata: dentalMetadata },
  "healthcare": { Page: ClinicsPage, metadata: clinicsMetadata },
  "builders-construction": { Page: BuildersPage, metadata: buildersMetadata },
  "car-dealerships": { Page: CarsPage, metadata: carsMetadata },
  "heating-hvac": { Page: HvacPage, metadata: hvacMetadata },
  "law-firms": { Page: LawPage, metadata: lawMetadata },
  "plumbers": { Page: PlumbersPage, metadata: plumbersMetadata },
  // 26 Oct 2026 briefs.
  "accountants-financial-advisers": { Page: AccountantsPage, metadata: accountantsMetadata },
  "salons": { Page: SalonsPage, metadata: salonsMetadata },
  "trades": { Page: TradesPage, metadata: tradesMetadata },
} as const;
const landing = (industry: string) => LANDINGS[industry as keyof typeof LANDINGS];

export function generateStaticParams() {
  return [...industryPaths.filter((p) => !p.includes("/")), ...Object.keys(LANDINGS)].map((industry) => ({ industry }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { industry } = await params;
  return landing(industry)?.metadata ?? industryMetadata(industry);
}

export default async function Page({ params }: Props) {
  const { industry } = await params;
  const own = landing(industry);
  return own ? <own.Page /> : <IndustryPage path={industry} />;
}
