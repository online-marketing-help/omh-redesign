import { DashboardLoading } from "@/components/dashboard/Loading";

export default function Loading() {
  return (
    <DashboardLoading
      active="/lead-dashboard/handover"
      title="Needs a person"
      lead="Conversations the assistant handed over, oldest first."
      shape="table"
    />
  );
}
