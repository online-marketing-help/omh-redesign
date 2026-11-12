import { DashboardLoading } from "@/components/dashboard/Loading";
import { SCREENS } from "@/lib/dashboard/screens";

/* The title and the sentence come from lib/dashboard/screens.ts, not from
   here. They were written out in each of these files once and nine of the
   ten had already drifted from the page they stand in for. */
export default function Loading() {
  return <DashboardLoading screen={SCREENS["campaigns"]} />;
}
