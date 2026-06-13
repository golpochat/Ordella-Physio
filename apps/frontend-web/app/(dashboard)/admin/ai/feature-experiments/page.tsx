"use client";

import { toast } from "sonner";
import { AiAdminShell } from "@/components/ai/admin";
import { ExperimentEditor } from "@/components/ai/experiments/ExperimentEditor";
import { ExperimentList } from "@/components/ai/experiments/ExperimentList";
import { ListPage } from "@/components/dashboard/ListPage";
import { useAbExperiments, useCreateAbExperiment } from "@/hooks/useFeatureFlags";
import { ADMIN_AI_BASE } from "@/lib/ai-admin-paths";
import { useAuth } from "@/hooks/useAuth";
import { userHasPermission } from "@/lib/auth/permissions";
import { WithPermission } from "@/lib/auth/withPermission";

export default function AdminFeatureExperimentsPage() {
  const { user } = useAuth();
  const canManage = userHasPermission(user, "ai.model.manage");
  const { data, isLoading, isError, refetch } = useAbExperiments();
  const createExperiment = useCreateAbExperiment();

  return (
    <WithPermission permission="ai.admin">
      <AiAdminShell>
        <ListPage title="A/B experiments" subtitle="Model and UI experiments with analytics." isLoading={isLoading} isError={isError} onRetry={() => void refetch()} loadingRows={5}>
          {canManage ? (
            <ExperimentEditor isSaving={createExperiment.isPending} onSave={(p) => void createExperiment.mutateAsync(p).then(() => toast.success("Created."))} />
          ) : null}
          <ExperimentList experiments={data ?? []} basePath={ADMIN_AI_BASE} experimentsPath={`${ADMIN_AI_BASE}/feature-experiments`} />
        </ListPage>
      </AiAdminShell>
    </WithPermission>
  );
}
