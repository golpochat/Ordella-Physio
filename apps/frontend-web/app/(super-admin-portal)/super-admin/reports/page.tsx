import { PlatformReportsPlaceholder } from "@/components/super-admin-portal/reports-placeholder";

export default function SuperAdminReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Reports</h1>
        <p className="text-muted-foreground">Platform analytics and reporting dashboards.</p>
      </div>
      <PlatformReportsPlaceholder />
    </div>
  );
}
