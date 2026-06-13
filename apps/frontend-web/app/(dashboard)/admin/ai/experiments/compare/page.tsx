"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { AiAdminShell, ExperimentComparisonTable } from "@/components/ai/admin";
import { TrainingLossChart } from "@/components/ai/training/TrainingLossChart";
import { ListPage } from "@/components/dashboard/ListPage";
import { Button } from "@/components/ui/button";
import { useCompareTrainingExperiments } from "@/hooks/useTrainingPortal";
import { adminAiPaths } from "@/lib/ai-admin-paths";
import { WithPermission } from "@/lib/auth/withPermission";

export default function AdminExperimentsComparePage() {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId") ?? "";
  const experimentIds = useMemo(() => {
    const raw = searchParams.get("ids");
    return raw ? raw.split(",").map((v) => v.trim()).filter(Boolean) : undefined;
  }, [searchParams]);

  const compareQuery = useCompareTrainingExperiments(jobId, experimentIds);
  const bestCurve = compareQuery.data?.comparison.find((e) => e.isBest)?.trainingCurve ?? [];

  return (
    <WithPermission permission="ai.training.view">
      <AiAdminShell>
        <ListPage
          title="Experiment comparison"
          subtitle="Side-by-side hyperparameters, metrics, and training curves."
          action={
            <Button asChild variant="ghost">
              <Link href={jobId ? adminAiPaths.trainingJob(jobId) : adminAiPaths.experiments}>&larr; Back</Link>
            </Button>
          }
          isLoading={!jobId || compareQuery.isLoading}
          isError={!jobId || compareQuery.isError}
          onRetry={() => void compareQuery.refetch()}
          loadingRows={4}
        >
          {!jobId ? (
            <p className="dashboard-cell-muted">Provide a jobId query parameter to compare experiments.</p>
          ) : (
            <>
              <ExperimentComparisonTable comparison={compareQuery.data} isLoading={compareQuery.isFetching} />
              {bestCurve.length ? (
                <section className="training-dashboard-section">
                  <h3>Best experiment loss curve</h3>
                  <TrainingLossChart data={bestCurve} />
                </section>
              ) : null}
            </>
          )}
        </ListPage>
      </AiAdminShell>
    </WithPermission>
  );
}
