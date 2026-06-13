"use client";

import Link from "next/link";
import { toast } from "sonner";
import { TrainingDashboard } from "@/components/ai/training/TrainingDashboard";
import { ListPage } from "@/components/dashboard/ListPage";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useResumeTraining, useTrainingDashboard } from "@/hooks/useTrainingPortal";
import { userHasPermission } from "@/lib/auth/permissions";
import { WithPermission } from "@/lib/auth/withPermission";

type TrainingDashboardPageProps = {
  params: { id: string };
};

export default function TrainingDashboardPage({ params }: TrainingDashboardPageProps) {
  const jobId = params.id;
  const { user } = useAuth();
  const canManage = userHasPermission(user, "ai.training.manage");
  const dashboardQuery = useTrainingDashboard(jobId);
  const resume = useResumeTraining(jobId);

  async function handleResume(checkpointNumber: number) {
    try {
      await resume.mutateAsync(checkpointNumber);
      toast.success(`Resumed from checkpoint #${checkpointNumber}.`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to resume training.");
    }
  }

  return (
    <WithPermission permission="ai.training.view">
      <ListPage
        title="Training dashboard"
        subtitle="Live metrics, logs, curves, checkpoints, and tuning progress."
        action={
          <div className="automation-builder-actions">
            <Button asChild variant="ghost">
              <Link href={`/clinic/ai/training/${jobId}`}>Job details</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href={`/clinic/ai/training/${jobId}/experiments`}>Experiments</Link>
            </Button>
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
            onResumeCheckpoint={(checkpointNumber) => void handleResume(checkpointNumber)}
          />
        ) : null}
      </ListPage>
    </WithPermission>
  );
}
