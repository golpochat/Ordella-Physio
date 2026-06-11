import { Card } from "@/components/dashboard/Card";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { EnterpriseDashboard } from "@/components/enterprise/enterprise-dashboard";

export default function SuperAdminEnterprisePage() {
  return (
    <>
      <PageHeader
        title="Enterprise"
        subtitle="Global audit and activity visibility across all enterprise tenants."
      />
      <Card>
        <EnterpriseDashboard globalView />
      </Card>
    </>
  );
}
