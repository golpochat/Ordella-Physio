import { Card } from "@/components/dashboard/Card";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { PlatformFeatureFlagsPlaceholder } from "@/components/super-admin-portal/feature-flags-placeholder";

export default function SuperAdminFlagsPage() {
  return (
    <>
      <PageHeader
        title="Feature flags"
        subtitle="Toggle platform capabilities per environment."
      />
      <Card>
        <PlatformFeatureFlagsPlaceholder />
      </Card>
    </>
  );
}
