import { DashboardLoading } from "@/components/dashboard/Loading";

export default function Loading() {
  return (
    <DashboardLoading
      active="/lead-dashboard/settings"
      title="Settings"
      lead="What the assistant is allowed to do."
      shape="form"
    />
  );
}
