"use client";

import Link from "next/link";
import { useMemo } from "react";
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
import { Row } from "@/components/dashboard/Row";
import { DataTable } from "@/components/super-admin/layout/DataTable";
import { useModelDriftAlertCount } from "@/hooks/useAiAdminDashboard";
import {
  useModelDriftEvents,
  useModelDriftSummary,
  useModelRegistry,
  useRunDriftDetection,
} from "@/hooks/useTrainingPortal";
import { adminAiPaths } from "@/lib/ai-admin-paths";
import { useAuth } from "@/hooks/useAuth";
import { userHasPermission } from "@/lib/auth/permissions";
import { WithPermission } from "@/lib/auth/withPermission";

function ModelDriftRow({ modelId, modelName }: { modelId: string; modelName: string }) {
  const summaryQuery = useModelDriftSummary(modelId);
  const alertCount = useModelDriftAlertCount(modelId);
  const summary = summaryQuery.data;

  return (
    <Row>
      <div>{modelName}</div>
      <div>{summary ? <DriftSeverityBadge severity={summary.highestSeverity} /> : "—"}</div>
      <div>{alertCount}</div>
      <div>
        <Link href={adminAiPaths.modelDrift(modelId)} className="dashboard-link">View</Link>
      </div>
    </Row>
  );
}

function GlobalDriftOverview({ modelId }: { modelId: string }) {
  const { user } = useAuth();
  const canMitigate = userHasPermission(user, "ai.drift.mitigate");
  const summaryQuery = useModelDriftSummary(modelId);
  const eventsQuery = useModelDriftEvents(modelId);
  const runDetection = useRunDriftDetection(modelId);
  const summary = summaryQuery.data;

  if (!summary) return null;

  return (
    <section className="training-drift-page">
      <h3>Latest drift overview</h3>
      <div className="training-drift-summary-grid">
        <DriftSummaryCard driftType="DATA" event={summary.latestByType.data} />
        <DriftSummaryCard driftType="CONCEPT" event={summary.latestByType.concept} />
        <DriftSummaryCard driftType="EMBEDDING" event={summary.latestByType.embedding} />
        <DriftSummaryCard driftType="PERFORMANCE" event={summary.latestByType.performance} />
      </div>
      <DriftMetricsChart metrics={summary.metricsSeries} />
      <DriftEventTimeline events={eventsQuery.data ?? summary.recentEvents} canManage={canMitigate} />
      <DriftMitigationPanel canManage={canMitigate} isBusy={runDetection.isPending} />
    </section>
  );
}

export default function AdminDriftPage() {
  const modelsQuery = useModelRegistry();
  const models = modelsQuery.data ?? [];
  const primaryModel = useMemo(() => models.find((m) => m.status === "PUBLISHED") ?? models[0], [models]);

  return (
    <WithPermission permission="ai.drift.view">
      <AiAdminShell>
        <ListPage
          title="Drift monitoring"
          subtitle="Cross-model drift alerts, metrics, events, and mitigation."
          action={<Button asChild variant="ghost"><Link href={adminAiPaths.dashboard}>&larr; Dashboard</Link></Button>}
          isLoading={modelsQuery.isLoading}
          isError={modelsQuery.isError}
          onRetry={() => void modelsQuery.refetch()}
          loadingRows={5}
        >
          <div className="training-drift-overview">
            <div>
              <div className="dashboard-cell-muted">Models tracked</div>
              <div className="training-metric-value">{models.length}</div>
            </div>
          </div>

          <DataTable columns={["Model", "Severity", "Alerts", "Actions"]} grid="default" isEmpty={!models.length} emptyMessage="No models in registry.">
            {models.map((model) => (
              <ModelDriftRow key={model.id} modelId={model.id} modelName={model.modelName} />
            ))}
          </DataTable>

          {primaryModel ? <GlobalDriftOverview modelId={primaryModel.id} /> : null}
        </ListPage>
      </AiAdminShell>
    </WithPermission>
  );
}
