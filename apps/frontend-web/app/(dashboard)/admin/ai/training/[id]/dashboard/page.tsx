"use client";

import Link from "next/link";
import { toast } from "sonner";
import { AiAdminShell } from "@/components/ai/admin";
import { TrainingDashboard } from "@/components/ai/training/TrainingDashboard";
import { ListPage } from "@/components/dashboard/ListPage";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useResumeTraining, useTrainingDashboard } from "@/hooks/useTrainingPortal";
import { adminAiPaths } from "@/lib/ai-admin-paths";
import { userHasPermission } from "@/lib/auth/permissions";
import { WithPermission } from "@/lib/auth/withPermission";

type Props = { params: { id: string } };

export default function AdminTrainingDashboardPage({ params }: Props) {
  const jobId = params.id;
  const { user } = useAuth();
  const canManage = userHasPermission(user, "ai.training.manage");
  const dashboardQuery = useTrainingDashboard(jobId);
  const resume = useResumeTraining(jobId);

  return (
    <WithPermission permission="ai.training.view">
      <AiAdminShell>
        <ListPage
          title="Training dashboard"
          subtitle="Live metrics, logs, curves, checkpoints, and tuning progress."
          action={
            <div className="automation-builder-actions">
              <Button asChild variant="ghost"><Link href={adminAiPaths.trainingJob(jobId)}>Job details</Link></Button>
              <Button asChild variant="ghost"><Link href={adminAiPaths.experiments}>Experiments</Link></Button>
            </div>
          }
          isLoading={dashboardQuery.isLoading}
          isError={dashboardQuery.isError}
          onRetry={() => void dashboardQuery.refetch()}
          loadingRows={6}
        >
          {dashboardQuery.data ? (
            <TrainingDashboard
              dashboard={dashboardQuery.data}
              canManage={canManage}
              isResuming={resume.isPending}
              onResumeCheckpoint={(n) =>
                void resume.mutateAsync(n).then(() => toast.success(`Resumed from checkpoint #${n}.`))
              }
            />
          ) : null}
        </ListPage>
      </AiAdminShell>
    </WithPermission>
  );
}
