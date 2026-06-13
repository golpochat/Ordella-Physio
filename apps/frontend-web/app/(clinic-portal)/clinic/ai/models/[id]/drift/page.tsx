"use client";

import Link from "next/link";
import { toast } from "sonner";
import { DriftEventTimeline } from "@/components/ai/models/DriftEventTimeline";
import { DriftMetricsChart } from "@/components/ai/models/DriftMetricsChart";
import { DriftMitigationPanel } from "@/components/ai/models/DriftMitigationPanel";
import { DriftSeverityBadge } from "@/components/ai/models/DriftSeverityBadge";
import { DriftSummaryCard } from "@/components/ai/models/DriftSummaryCard";
import { ListPage } from "@/components/dashboard/ListPage";
import { Button } from "@/components/ui/button";
import {
  useDriftMitigation,
  useModelDriftEvents,
  useModelDriftSummary,
  useRegistryModel,
  useResolveDriftEvent,
  useRunDriftDetection,
} from "@/hooks/useTrainingPortal";
import { useAuth } from "@/hooks/useAuth";
import { userHasPermission } from "@/lib/auth/permissions";
import { WithPermission } from "@/lib/auth/withPermission";

type ModelDriftPageProps = {
  params: { id: string };
};

export default function ModelDriftPage({ params }: ModelDriftPageProps) {
  const modelId = params.id;
  const { user } = useAuth();
  const canManage = userHasPermission(user, "ai.model.manage");
  const modelQuery = useRegistryModel(modelId);
  const summaryQuery = useModelDriftSummary(modelId);
  const eventsQuery = useModelDriftEvents(modelId);
  const runDetection = useRunDriftDetection(modelId);
  const resolveEvent = useResolveDriftEvent(modelId);
  const mitigation = useDriftMitigation(modelId);

  const isBusy =
    runDetection.isPending ||
    resolveEvent.isPending ||
    mitigation.retrain.isPending ||
    mitigation.rollback.isPending ||
    mitigation.reduceRollout.isPending;

  async function runAction(action: () => Promise<unknown>, successMessage: string) {
    try {
      await action();
      toast.success(successMessage);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Action failed.");
    }
  }

  return (
    <WithPermission permission="ai.model.view">
      <ListPage
        title={modelQuery.data?.modelName ?? "Drift monitoring"}
        subtitle="Data, concept, embedding, and performance drift with alerts and mitigation."
        action={
          <div className="automation-builder-actions">
            {canManage ? (
              <Button
                type="button"
                disabled={isBusy}
                onClick={() => void runAction(() => runDetection.mutateAsync(), "Drift detection completed.")}
              >
                {runDetection.isPending ? "Running…" : "Run drift detection"}
              </Button>
            ) : null}
            <Button asChild variant="ghost">
              <Link href={`/clinic/ai/models/${modelId}`}>&larr; Model</Link>
            </Button>
          </div>
        }
        isLoading={modelQuery.isLoading || summaryQuery.isLoading}
        isError={modelQuery.isError || summaryQuery.isError}
        onRetry={() => {
          void modelQuery.refetch();
          void summaryQuery.refetch();
          void eventsQuery.refetch();
        }}
        loadingRows={6}
      >
        {summaryQuery.data ? (
          <div className="training-drift-page">
            <div className="training-drift-overview">
              <div>
                <div className="dashboard-cell-muted">Highest severity</div>
                <DriftSeverityBadge severity={summaryQuery.data.highestSeverity} />
              </div>
              <div>
                <div className="dashboard-cell-muted">Unresolved events</div>
                <div className="training-metric-value">{summaryQuery.data.unresolvedCount}</div>
              </div>
              <div>
                <div className="dashboard-cell-muted">Recommended action</div>
                <p>{summaryQuery.data.recommendedAction}</p>
              </div>
            </div>

            <div className="training-drift-summary-grid">
              <DriftSummaryCard driftType="DATA" event={summaryQuery.data.latestByType.data} />
              <DriftSummaryCard driftType="CONCEPT" event={summaryQuery.data.latestByType.concept} />
              <DriftSummaryCard driftType="EMBEDDING" event={summaryQuery.data.latestByType.embedding} />
              <DriftSummaryCard
                driftType="PERFORMANCE"
                event={summaryQuery.data.latestByType.performance}
              />
            </div>

            <DriftMetricsChart metrics={summaryQuery.data.metricsSeries} />
            <DriftEventTimeline
              events={eventsQuery.data ?? summaryQuery.data.recentEvents}
              canManage={canManage}
              isResolving={resolveEvent.isPending}
              onResolve={(eventId) =>
                void runAction(
                  () => resolveEvent.mutateAsync({ eventId, mitigationAction: "RESOLVED_MANUALLY" }),
                  "Drift event resolved.",
                )
              }
            />
            <DriftMitigationPanel
              canManage={canManage}
              isBusy={isBusy}
              onRetrain={() =>
                void runAction(() => mitigation.retrain.mutateAsync(), "Retraining job queued.")
              }
              onRollback={() =>
                void runAction(() => mitigation.rollback.mutateAsync(), "Model rollback applied.")
              }
              onReduceRollout={() =>
                void runAction(() => mitigation.reduceRollout.mutateAsync(10), "Rollout reduced to 10%.")
              }
            />
          </div>
        ) : null}
      </ListPage>
    </WithPermission>
  );
}
