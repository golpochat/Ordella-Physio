"use client";

import Link from "next/link";
import { AccessPolicyTable } from "@/components/ai/security/AccessPolicyTable";
import { ListPage } from "@/components/dashboard/ListPage";
import { useAccessPolicies } from "@/hooks/useAiSecurity";
import { clinicAiPaths } from "@/lib/ai-admin-paths";
import { WithPermission } from "@/lib/auth/withPermission";

export default function ClinicSecurityPoliciesPage() {
  const { data, isLoading, isError, refetch } = useAccessPolicies();

  return (
    <WithPermission permission="ai.model.view">
      <ListPage title="AI access policies" subtitle="Model access controls for your tenant." isLoading={isLoading} isError={isError} onRetry={() => void refetch()} loadingRows={4}>
        <div className="ai-gateway-subnav">
          <Link href={clinicAiPaths.securityAudit} className="ai-admin-nav-link">Audit</Link>
          <Link href={clinicAiPaths.securityPolicies} className="ai-admin-nav-link ai-admin-nav-link-active">Policies</Link>
          <Link href={clinicAiPaths.securityPii} className="ai-admin-nav-link">PII</Link>
        </div>
        <AccessPolicyTable policies={data ?? []} />
      </ListPage>
    </WithPermission>
  );
}
