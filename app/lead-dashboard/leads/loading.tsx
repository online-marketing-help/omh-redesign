import { DashboardLoading } from "@/components/dashboard/Loading";

export default function Loading() {
  return (
    <DashboardLoading
      active="/lead-dashboard/leads"
      title="Leads"
      lead="Everyone who left their details, and what came of it."
      shape="table"
    />
  );
}
