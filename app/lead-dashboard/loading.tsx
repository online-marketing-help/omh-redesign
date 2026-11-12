import { DashboardLoading } from "@/components/dashboard/Loading";

export default function Loading() {
  return (
    <DashboardLoading
      active="/lead-dashboard"
      title="Overview"
      lead="Everything your assistant handled, what it captured, and what it booked."
      shape="cards"
    />
  );
}
