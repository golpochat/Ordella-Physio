"use client";

import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { AiAdminShell } from "@/components/ai/admin";
import { FeatureFlagEditor } from "@/components/ai/flags/FeatureFlagEditor";
import { FeatureFlagList } from "@/components/ai/flags/FeatureFlagList";
import { ListPage } from "@/components/dashboard/ListPage";
import {
  useCreateFeatureFlag,
  useFeatureFlags,
  useUpdateFeatureFlag,
} from "@/hooks/useFeatureFlags";
import { ADMIN_AI_BASE } from "@/lib/ai-admin-paths";
import { useAuth } from "@/hooks/useAuth";
import { userHasPermission } from "@/lib/auth/permissions";
import { WithPermission } from "@/lib/auth/withPermission";

export default function AdminFeatureFlagsPage() {
  const { user } = useAuth();
  const canManage = userHasPermission(user, "ai.model.manage");
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");
  const { data, isLoading, isError, refetch } = useFeatureFlags();
  const createFlag = useCreateFeatureFlag();
  const updateFlag = useUpdateFeatureFlag();
  const editing = data?.find((flag) => flag.id === editId) ?? null;

  return (
    <WithPermission permission="ai.admin">
      <AiAdminShell>
        <ListPage title="Feature flags" subtitle="Boolean, percentage, and multivariate rollout." isLoading={isLoading} isError={isError} onRetry={() => void refetch()} loadingRows={5}>
          {canManage ? (
            <FeatureFlagEditor
              flag={editing}
              isSaving={createFlag.isPending || updateFlag.isPending}
              onSave={(payload) => {
                if (editing) void updateFlag.mutateAsync({ id: editing.id, payload }).then(() => toast.success("Updated."));
                else void createFlag.mutateAsync(payload).then(() => toast.success("Created."));
              }}
            />
          ) : null}
          <FeatureFlagList flags={data ?? []} basePath={ADMIN_AI_BASE} onToggleActive={canManage ? (id, isActive) => void updateFlag.mutateAsync({ id, payload: { isActive } }) : undefined} />
        </ListPage>
      </AiAdminShell>
    </WithPermission>
  );
}
