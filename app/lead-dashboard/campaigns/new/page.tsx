import Link from "next/link";
import { Shell } from "@/components/dashboard/Shell";
import { IconBack } from "@/components/dashboard/icons";
import { CampaignStart } from "@/components/dashboard/CampaignStart";
import { canWrite } from "@/lib/dashboard/routing";
import { isDemo } from "@/lib/dashboard/demo";

/* The only way to START a campaign. The Campaigns screen could report on
   one from the day it was built and nothing could create one, so it showed
   nothing and always would have. */

export default async function NewCampaignPage({
  searchParams,
}: {
  searchParams: Promise<{ demo?: string }>;
}) {
  const demo = isDemo(await searchParams);
  /* Whether there is anywhere to send a list. Read here because a client
     component cannot see server environment, and a button that cannot
     possibly work should not look ready. */
  const configured = Boolean(process.env.OHM_REACTIVATION_WEBHOOK);

  return (
    <Shell
      active="/lead-dashboard/campaigns"
      title="Start a campaign"
      lead="Reactivation: people who bought before and agreed to hear from us. Nothing is sent until you have seen who would be contacted."
      demo={demo}
      toolbar={
        <Link
          href={demo ? "/lead-dashboard/campaigns?demo=1" : "/lead-dashboard/campaigns"}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-line bg-surface px-3 py-1.5 text-[13.5px] font-semibold outline-none transition-colors duration-150 hover:bg-warm focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
        >
          <IconBack className="h-4 w-4" />
          All campaigns
        </Link>
      }
    >
      <CampaignStart canWrite={canWrite} demo={demo} configured={configured} />
    </Shell>
  );
}
