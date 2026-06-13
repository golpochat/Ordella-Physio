"use client";

import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { FeatureFlagEditor } from "@/components/ai/flags/FeatureFlagEditor";
import { FeatureFlagList } from "@/components/ai/flags/FeatureFlagList";
import { ListPage } from "@/components/dashboard/ListPage";
import { Button } from "@/components/ui/button";
import {
  useCreateFeatureFlag,
  useEvaluateFeatureFlags,
  useFeatureFlags,
  useUpdateFeatureFlag,
} from "@/hooks/useFeatureFlags";
import { useAuth } from "@/hooks/useAuth";
import { userHasPermission } from "@/lib/auth/permissions";
import { WithPermission } from "@/lib/auth/withPermission";

export default function ClinicFeatureFlagsPage() {
  const { user } = useAuth();
  const canManage = userHasPermission(user, "ai.model.manage");
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");
  const { data, isLoading, isError, refetch } = useFeatureFlags();
  const createFlag = useCreateFeatureFlag();
  const updateFlag = useUpdateFeatureFlag();
  const editing = data?.find((flag) => flag.id === editId) ?? null;
  const preview = useEvaluateFeatureFlags(editing ? [editing.key] : [], user?.id);

  return (
    <WithPermission permission="ai.model.view">
      <ListPage
        title="Feature flags"
        subtitle="Boolean, percentage, and multivariate flags for models and UI."
        isLoading={isLoading}
        isError={isError}
        onRetry={() => void refetch()}
        loadingRows={5}
      >
        {canManage ? (
          <FeatureFlagEditor
            flag={editing}
            isSaving={createFlag.isPending || updateFlag.isPending}
            onSave={(payload) => {
              if (editing) {
                void updateFlag.mutateAsync({ id: editing.id, payload }).then(() => toast.success("Flag updated."));
              } else {
                void createFlag.mutateAsync(payload).then(() => toast.success("Flag created."));
              }
            }}
            onPreview={() => void preview.refetch().then(() => toast.message(JSON.stringify(preview.data)))}
          />
        ) : null}
        <FeatureFlagList
          flags={data ?? []}
          onToggleActive={
            canManage
              ? (id, isActive) => void updateFlag.mutateAsync({ id, payload: { isActive } })
              : undefined
          }
        />
        {!canManage ? <Button type="button" variant="ghost" disabled>Read-only</Button> : null}
      </ListPage>
    </WithPermission>
  );
}
