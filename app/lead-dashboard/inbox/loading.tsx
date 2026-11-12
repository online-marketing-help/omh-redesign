import { DashboardLoading } from "@/components/dashboard/Loading";

export default function Loading() {
  return (
    <DashboardLoading
      active="/lead-dashboard/inbox"
      title="Inbox"
      lead="Every channel in one list."
      shape="table"
    />
  );
}
