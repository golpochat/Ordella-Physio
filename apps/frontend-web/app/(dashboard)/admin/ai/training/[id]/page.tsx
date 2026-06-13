"use client";

import Link from "next/link";
import { AiAdminShell, TrainingJobDetails } from "@/components/ai/admin";
import { ListPage } from "@/components/dashboard/ListPage";
import { Button } from "@/components/ui/button";
import { useTrainingJob } from "@/hooks/useTrainingPortal";
import { adminAiPaths } from "@/lib/ai-admin-paths";
import { WithPermission } from "@/lib/auth/withPermission";

type Props = { params: { id: string } };

export default function AdminTrainingDetailPage({ params }: Props) {
  const jobId = params.id;
  const jobQuery = useTrainingJob(jobId);

  return (
    <WithPermission permission="ai.training.view">
      <AiAdminShell>
        <ListPage
          title={jobQuery.data ? `Job ${jobQuery.data.id.slice(0, 8)}…` : "Training job"}
          subtitle="Overview, logs, metrics, checkpoints, and experiments."
          action={<Button asChild variant="ghost"><Link href={adminAiPaths.training}>&larr; Jobs</Link></Button>}
          isLoading={jobQuery.isLoading}
          isError={jobQuery.isError}
          onRetry={() => void jobQuery.refetch()}
          loadingRows={4}
        >
          <TrainingJobDetails jobId={jobId} />
        </ListPage>
      </AiAdminShell>
    </WithPermission>
  );
}
