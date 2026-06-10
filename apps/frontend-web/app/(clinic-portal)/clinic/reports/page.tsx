import { ClinicReportsPlaceholder } from "@/components/clinic-portal/reports-placeholder";

export default function ClinicReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Reports</h1>
        <p className="text-muted-foreground">Analytics and reporting dashboards coming soon.</p>
      </div>
      <ClinicReportsPlaceholder />
    </div>
  );
}
