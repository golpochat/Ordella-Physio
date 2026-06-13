"use client";

import Link from "next/link";
import { toast } from "sonner";
import {
  AiAdminShell,
  DriftEventTimeline,
  DriftMetricsChart,
  DriftMitigationPanel,
  DriftSummaryCard,
} from "@/components/ai/admin";
import { DriftSeverityBadge } from "@/components/ai/models/DriftSeverityBadge";
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
import { adminAiPaths } from "@/lib/ai-admin-paths";
import { useAuth } from "@/hooks/useAuth";
import { userHasPermission } from "@/lib/auth/permissions";
import { WithPermission } from "@/lib/auth/withPermission";

type Props = { params: { id: string } };

export default function AdminModelDriftPage({ params }: Props) {
  const modelId = params.id;
  const { user } = useAuth();
  const canMitigate = userHasPermission(user, "ai.drift.mitigate");
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

  async function runAction(action: () => Promise<unknown>, message: string) {
    try {
      await action();
      toast.success(message);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Action failed.");
    }
  }

  return (
    <WithPermission permission="ai.drift.view">
      <AiAdminShell>
        <ListPage
          title={modelQuery.data?.modelName ?? "Drift monitoring"}
          subtitle="Data, concept, embedding, and performance drift."
          action={
            <div className="automation-builder-actions">
              {canMitigate ? (
                <Button type="button" disabled={isBusy} onClick={() => void runAction(() => runDetection.mutateAsync(), "Detection completed.")}>
                  Run drift detection
                </Button>
              ) : null}
              <Button asChild variant="ghost"><Link href={adminAiPaths.drift}>&larr; All models</Link></Button>
              <Button asChild variant="ghost"><Link href={adminAiPaths.model(modelId)}>Model</Link></Button>
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
                <DriftSummaryCard driftType="PERFORMANCE" event={summaryQuery.data.latestByType.performance} />
              </div>
              <DriftMetricsChart metrics={summaryQuery.data.metricsSeries} />
              <DriftEventTimeline
                events={eventsQuery.data ?? summaryQuery.data.recentEvents}
                canManage={canMitigate}
                isResolving={resolveEvent.isPending}
                onResolve={(eventId) =>
                  void runAction(
                    () => resolveEvent.mutateAsync({ eventId, mitigationAction: "RESOLVED_MANUALLY" }),
                    "Event resolved.",
                  )
                }
              />
              <DriftMitigationPanel
                canManage={canMitigate}
                isBusy={isBusy}
                onRetrain={() => void runAction(() => mitigation.retrain.mutateAsync(), "Retraining queued.")}
                onRollback={() => void runAction(() => mitigation.rollback.mutateAsync(), "Rollback applied.")}
                onReduceRollout={() => void runAction(() => mitigation.reduceRollout.mutateAsync(10), "Rollout reduced.")}
              />
            </div>
          ) : null}
        </ListPage>
      </AiAdminShell>
    </WithPermission>
  );
}
