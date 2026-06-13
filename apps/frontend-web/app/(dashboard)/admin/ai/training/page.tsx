"use client";

import Link from "next/link";
import { AiAdminShell, TrainingJobList } from "@/components/ai/admin";
import { ListPage } from "@/components/dashboard/ListPage";
import { Button } from "@/components/ui/button";
import { useTrainingJobs } from "@/hooks/useTrainingPortal";
import { ADMIN_AI_BASE, adminAiPaths } from "@/lib/ai-admin-paths";
import { WithPermission } from "@/lib/auth/withPermission";

export default function AdminTrainingPage() {
  const { data, isLoading, isError, refetch } = useTrainingJobs();

  return (
    <WithPermission permission="ai.admin">
      <AiAdminShell>
        <ListPage
          title="Training jobs"
          subtitle="Fine-tune models, monitor progress, and manage experiments."
          action={
            <div className="automation-builder-actions">
              <Button asChild variant="ghost"><Link href={adminAiPaths.models}>Models</Link></Button>
              <Button asChild><Link href={adminAiPaths.trainingNew}>New job</Link></Button>
            </div>
          }
          isLoading={isLoading}
          isError={isError}
          onRetry={() => void refetch()}
          loadingRows={5}
        >
          <TrainingJobList jobs={data ?? []} basePath={ADMIN_AI_BASE} />
        </ListPage>
      </AiAdminShell>
    </WithPermission>
  );
}
