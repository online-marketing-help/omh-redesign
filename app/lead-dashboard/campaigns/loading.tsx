import { DashboardLoading } from "@/components/dashboard/Loading";

export default function Loading() {
  return (
    <DashboardLoading
      active="/lead-dashboard/campaigns"
      title="Campaigns"
      lead="Every batch we contacted on purpose."
      shape="table"
    />
  );
}
