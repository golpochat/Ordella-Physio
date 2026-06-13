"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { ExperimentComparisonTable } from "@/components/ai/training/ExperimentComparisonTable";
import { TrainingLossChart } from "@/components/ai/training/TrainingLossChart";
import { ListPage } from "@/components/dashboard/ListPage";
import { Button } from "@/components/ui/button";
import { useCompareTrainingExperiments } from "@/hooks/useTrainingPortal";
import { WithPermission } from "@/lib/auth/withPermission";

type TrainingExperimentComparePageProps = {
  params: { id: string };
};

export default function TrainingExperimentComparePage({ params }: TrainingExperimentComparePageProps) {
  const jobId = params.id;
  const searchParams = useSearchParams();
  const experimentIds = useMemo(() => {
    const raw = searchParams.get("ids");
    return raw
      ? raw
          .split(",")
          .map((value) => value.trim())
          .filter(Boolean)
      : undefined;
  }, [searchParams]);

  const compareQuery = useCompareTrainingExperiments(jobId, experimentIds);
  const bestCurve =
    compareQuery.data?.comparison.find((entry) => entry.isBest)?.trainingCurve ?? [];

  return (
    <WithPermission permission="ai.training.view">
      <ListPage
        title="Experiment comparison"
        subtitle="Side-by-side hyperparameters, metrics, and training curves."
        action={
          <Button asChild variant="ghost">
            <Link href={`/clinic/ai/training/${jobId}/experiments`}>&larr; Experiments</Link>
          </Button>
        }
        isLoading={compareQuery.isLoading}
        isError={compareQuery.isError}
        onRetry={() => void compareQuery.refetch()}
        loadingRows={4}
      >
        <ExperimentComparisonTable
          comparison={compareQuery.data}
          isLoading={compareQuery.isFetching}
        />
        {bestCurve.length ? (
          <section className="training-dashboard-section">
            <h3>Best experiment loss curve</h3>
            <TrainingLossChart data={bestCurve} />
          </section>
        ) : null}
      </ListPage>
    </WithPermission>
  );
}
