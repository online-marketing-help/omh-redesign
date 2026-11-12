import { DashboardLoading } from "@/components/dashboard/Loading";

export default function Loading() {
  return (
    <DashboardLoading
      active="/lead-dashboard/sequences"
      title="Follow-ups"
      lead="What is queued to go out, and what stopped."
      shape="table"
    />
  );
}
