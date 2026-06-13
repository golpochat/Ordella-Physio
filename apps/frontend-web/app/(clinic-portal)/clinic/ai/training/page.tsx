"use client";

import Link from "next/link";
import { TrainingJobList } from "@/components/ai/training/TrainingJobList";
import { ListPage } from "@/components/dashboard/ListPage";
import { Button } from "@/components/ui/button";
import { useTrainingJobs } from "@/hooks/useTrainingPortal";
import { WithPermission } from "@/lib/auth/withPermission";

export default function ClinicAiTrainingPage() {
  const { data, isLoading, isError, refetch } = useTrainingJobs();

  return (
    <WithPermission permission="ai.training.view">
      <ListPage
        title="AI Training Jobs"
        subtitle="Fine-tune LLMs and embedding models from versioned datasets."
        action={
          <div className="automation-builder-actions">
            <Button asChild variant="ghost">
              <Link href="/clinic/ai/models">Model registry</Link>
            </Button>
            <Button asChild>
              <Link href="/clinic/ai/training/new">New training job</Link>
            </Button>
          </div>
        }
        isLoading={isLoading}
        isError={isError}
        onRetry={() => void refetch()}
        loadingRows={5}
      >
        <TrainingJobList jobs={data ?? []} />
      </ListPage>
    </WithPermission>
  );
}
