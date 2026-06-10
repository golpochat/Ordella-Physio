import { EnterpriseDashboard } from "@/components/enterprise/enterprise-dashboard";
import { EnterpriseGate } from "@/components/enterprise/enterprise-gate";

export default function ClinicEnterprisePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Enterprise</h1>
        <p className="text-muted-foreground">
          SSO, custom roles, audit logs, API keys, and webhooks for your clinic.
        </p>
      </div>
      <EnterpriseGate>
        <EnterpriseDashboard />
      </EnterpriseGate>
    </div>
  );
}
