import { DashboardLoading } from "@/components/dashboard/Loading";

export default function Loading() {
  return (
    <DashboardLoading
      active="/lead-dashboard/channels"
      title="Channels"
      lead="Which channels bring leads, and which bring customers."
      shape="cards"
    />
  );
}
