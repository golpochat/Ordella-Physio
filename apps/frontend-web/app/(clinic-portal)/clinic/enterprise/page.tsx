import { EnterpriseDashboard } from "@/components/enterprise/enterprise-dashboard";
import { EnterpriseGate } from "@/components/enterprise/enterprise-gate";
import { PageHeader } from "@/components/dashboard/PageHeader";

export default function ClinicEnterprisePage() {
  return (
    <>
      <PageHeader
        title="Enterprise"
        subtitle="SSO, custom roles, audit logs, API keys, and webhooks for your clinic."
      />
      <EnterpriseGate>
        <EnterpriseDashboard />
      </EnterpriseGate>
    </>
  );
}
