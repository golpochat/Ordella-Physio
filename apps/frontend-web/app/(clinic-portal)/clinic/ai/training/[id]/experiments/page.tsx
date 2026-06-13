"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ExperimentList } from "@/components/ai/training/ExperimentList";
import { ListPage } from "@/components/dashboard/ListPage";
import { Button } from "@/components/ui/button";
import { useTrainingExperiments } from "@/hooks/useTrainingPortal";
import { WithPermission } from "@/lib/auth/withPermission";

type TrainingExperimentsPageProps = {
  params: { id: string };
};

export default function TrainingExperimentsPage({ params }: TrainingExperimentsPageProps) {
  const jobId = params.id;
  const experimentsQuery = useTrainingExperiments(jobId);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const compareHref = useMemo(() => {
    if (!selectedIds.length) {
      return `/clinic/ai/training/${jobId}/experiments/compare`;
    }
    return `/clinic/ai/training/${jobId}/experiments/compare?ids=${selectedIds.join(",")}`;
  }, [jobId, selectedIds]);

  function toggleSelect(experimentId: string) {
    setSelectedIds((current) =>
      current.includes(experimentId)
        ? current.filter((id) => id !== experimentId)
        : [...current, experimentId],
    );
  }

  return (
    <WithPermission permission="ai.training.view">
      <ListPage
        title="Training experiments"
        subtitle="Tracked runs with hyperparameters and metrics for comparison."
        action={
          <div className="automation-builder-actions">
            <Button asChild variant="ghost">
              <Link href={`/clinic/ai/training/${jobId}/dashboard`}>Dashboard</Link>
            </Button>
            <Button asChild disabled={selectedIds.length < 2}>
              <Link href={compareHref}>Compare selected</Link>
            </Button>
          </div>
        }
        isLoading={experimentsQuery.isLoading}
        isError={experimentsQuery.isError}
        onRetry={() => void experimentsQuery.refetch()}
        loadingRows={5}
      >
        <ExperimentList
          jobId={jobId}
          experiments={experimentsQuery.data ?? []}
          selectedIds={selectedIds}
          onToggleSelect={toggleSelect}
        />
      </ListPage>
    </WithPermission>
  );
}
