"use client";

import Link from "next/link";
import { AiAdminShell, ExperimentDetails } from "@/components/ai/admin";
import { ListPage } from "@/components/dashboard/ListPage";
import { Button } from "@/components/ui/button";
import { useTrainingExperiment } from "@/hooks/useTrainingPortal";
import { adminAiPaths } from "@/lib/ai-admin-paths";
import { WithPermission } from "@/lib/auth/withPermission";

type Props = { params: { id: string } };

export default function AdminExperimentDetailPage({ params }: Props) {
  const experimentQuery = useTrainingExperiment(params.id);

  return (
    <WithPermission permission="ai.training.view">
      <AiAdminShell>
        <ListPage
          title={experimentQuery.data?.experimentName ?? "Experiment"}
          subtitle="Hyperparameters, metrics, and training curves."
          action={<Button asChild variant="ghost"><Link href={adminAiPaths.experiments}>&larr; Experiments</Link></Button>}
          isLoading={experimentQuery.isLoading}
          isError={experimentQuery.isError}
          onRetry={() => void experimentQuery.refetch()}
          loadingRows={4}
        >
          <ExperimentDetails experimentId={params.id} />
        </ListPage>
      </AiAdminShell>
    </WithPermission>
  );
}
