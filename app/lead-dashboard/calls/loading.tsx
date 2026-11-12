import { DashboardLoading } from "@/components/dashboard/Loading";

export default function Loading() {
  return (
    <DashboardLoading
      active="/lead-dashboard/calls"
      title="Calls"
      lead="Every call the assistant took or made."
      shape="table"
    />
  );
}
