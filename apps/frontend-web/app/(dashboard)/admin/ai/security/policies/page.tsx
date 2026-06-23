import { AiAdminSectionNav } from "@/components/ai/admin/AiAdminSectionNav";
"use client";

import Link from "next/link";
import { toast } from "sonner";
import { AiAdminShell } from "@/components/ai/admin";
import { AccessPolicyEditor } from "@/components/ai/security/AccessPolicyEditor";
import { AccessPolicyTable } from "@/components/ai/security/AccessPolicyTable";
import { ListPage } from "@/components/dashboard/ListPage";
import { useAccessPolicies, useAssignAccessPolicy, useRevokeAccessPolicy } from "@/hooks/useAiSecurity";
import { useAuth } from "@/hooks/useAuth";
import { adminAiPaths } from "@/lib/ai-admin-paths";
import { aiSecuritySectionNav } from "@/lib/ai-admin-section-nav";
import { userHasPermission } from "@/lib/auth/permissions";
import { WithPermission } from "@/lib/auth/withPermission";

export default function AdminSecurityPoliciesPage() {
  const { user } = useAuth();
  const canManage = userHasPermission(user, "ai.model.manage");
  const { data, isLoading, isError, refetch } = useAccessPolicies();
  const assignPolicy = useAssignAccessPolicy();
  const revokePolicy = useRevokeAccessPolicy();

  return (
    <WithPermission permission="ai.admin">
      <AiAdminShell>
        <ListPage title="AI access policies" subtitle="Control which roles and users can access each model." isLoading={isLoading} isError={isError} onRetry={() => void refetch()} loadingRows={4}>
          <AiAdminSectionNav items={aiSecuritySectionNav(adminAiPaths)} />
          {canManage ? (
            <AccessPolicyEditor
              isSaving={assignPolicy.isPending}
              onSave={(payload) => void assignPolicy.mutateAsync(payload).then(() => toast.success("Policy saved."))}
            />
          ) : null}
          <AccessPolicyTable
            policies={data ?? []}
            onRevoke={canManage ? (id) => void revokePolicy.mutateAsync(id).then(() => toast.success("Policy removed.")) : undefined}
          />
        </ListPage>
      </AiAdminShell>
    </WithPermission>
  );
}
