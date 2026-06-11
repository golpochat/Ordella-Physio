import { Card } from "@/components/dashboard/Card";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { PlatformSystemHealth } from "@/components/super-admin-portal/system-health";

export default function SuperAdminSystemPage() {
  return (
    <>
      <PageHeader
        title="System health"
        subtitle="Monitor microservice availability."
      />
      <Card>
        <PlatformSystemHealth />
      </Card>
    </>
  );
}
