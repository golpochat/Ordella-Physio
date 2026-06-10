import { EnterpriseDashboard } from "@/components/enterprise/enterprise-dashboard";

export default function SuperAdminEnterprisePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Enterprise</h1>
        <p className="text-muted-foreground">
          Global audit and activity visibility across all enterprise tenants.
        </p>
      </div>
      <EnterpriseDashboard globalView />
    </div>
  );
}
