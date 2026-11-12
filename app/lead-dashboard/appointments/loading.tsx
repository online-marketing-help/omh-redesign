import { DashboardLoading } from "@/components/dashboard/Loading";

export default function Loading() {
  return (
    <DashboardLoading
      active="/lead-dashboard/appointments"
      title="Appointments"
      lead="The week ahead, and where each booking came from."
      shape="split"
    />
  );
}
