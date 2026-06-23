import { AiAdminSectionNav } from "@/components/ai/admin/AiAdminSectionNav";
"use client";

import Link from "next/link";
import { AccessPolicyTable } from "@/components/ai/security/AccessPolicyTable";
import { ListPage } from "@/components/dashboard/ListPage";
import { useAccessPolicies } from "@/hooks/useAiSecurity";
import { clinicAiPaths } from "@/lib/ai-admin-paths";
import { aiSecuritySectionNav } from "@/lib/ai-admin-section-nav";
import { WithPermission } from "@/lib/auth/withPermission";

export default function ClinicSecurityPoliciesPage() {
  const { data, isLoading, isError, refetch } = useAccessPolicies();

  return (
    <WithPermission permission="ai.model.view">
      <ListPage title="AI access policies" subtitle="Model access controls for your tenant." isLoading={isLoading} isError={isError} onRetry={() => void refetch()} loadingRows={4}>
        <AiAdminSectionNav items={aiSecuritySectionNav(clinicAiPaths)} />
        <AccessPolicyTable policies={data ?? []} />
      </ListPage>
    </WithPermission>
  );
}
