"use client";

import { toast } from "sonner";
import { ExperimentEditor } from "@/components/ai/experiments/ExperimentEditor";
import { ExperimentList } from "@/components/ai/experiments/ExperimentList";
import { ListPage } from "@/components/dashboard/ListPage";
import {
  useAbExperiments,
  useCreateAbExperiment,
} from "@/hooks/useFeatureFlags";
import { useAuth } from "@/hooks/useAuth";
import { userHasPermission } from "@/lib/auth/permissions";
import { WithPermission } from "@/lib/auth/withPermission";

export default function ClinicAbExperimentsPage() {
  const { user } = useAuth();
  const canManage = userHasPermission(user, "ai.model.manage");
  const { data, isLoading, isError, refetch } = useAbExperiments();
  const createExperiment = useCreateAbExperiment();

  return (
    <WithPermission permission="ai.model.view">
      <ListPage
        title="A/B experiments"
        subtitle="Model and UI experiments with conversion, engagement, and latency analytics."
        isLoading={isLoading}
        isError={isError}
        onRetry={() => void refetch()}
        loadingRows={5}
      >
        {canManage ? (
          <ExperimentEditor
            isSaving={createExperiment.isPending}
            onSave={(payload) =>
              void createExperiment.mutateAsync(payload).then(() => toast.success("Experiment created."))
            }
          />
        ) : null}
        <ExperimentList experiments={data ?? []} basePath="/clinic/ai" />
      </ListPage>
    </WithPermission>
  );
}
