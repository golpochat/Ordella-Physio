"use client";

import Link from "next/link";
import { BottleneckAlerts } from "@/components/ai/observability/BottleneckAlerts";
import { ErrorRateHeatmap } from "@/components/ai/observability/ErrorRateHeatmap";
import { LatencyHeatmap } from "@/components/ai/observability/LatencyHeatmap";
import { PipelineViewPanel } from "@/components/ai/observability/PipelineView";
import { ListPage } from "@/components/dashboard/ListPage";
import { useBottleneckAlerts, useObservabilityDashboard, usePipelineView } from "@/hooks/useAiObservability";
import { clinicAiPaths } from "@/lib/ai-admin-paths";
import { WithPermission } from "@/lib/auth/withPermission";

export default function ClinicObservabilityPage() {
  const { data, isLoading, isError, refetch } = useObservabilityDashboard();
  const { data: pipeline } = usePipelineView();
  const { data: alerts } = useBottleneckAlerts();

  return (
    <WithPermission permission="ai.model.view">
      <ListPage title="AI observability" subtitle="Pipeline visibility and performance overview." isLoading={isLoading} isError={isError} onRetry={() => void refetch()} loadingRows={6}>
        <div className="ai-gateway-subnav">
          <Link href={clinicAiPaths.observability} className="ai-admin-nav-link ai-admin-nav-link-active">Dashboard</Link>
          <Link href={clinicAiPaths.observabilityTraces} className="ai-admin-nav-link">Traces</Link>
          <Link href={clinicAiPaths.observabilityLogs} className="ai-admin-nav-link">Logs</Link>
          <Link href={clinicAiPaths.observabilityMetrics} className="ai-admin-nav-link">Metrics</Link>
        </div>
        <div className="ai-observability-dashboard-grid">
          <LatencyHeatmap data={data?.heatmaps.latency} />
          <ErrorRateHeatmap data={data?.heatmaps.errorRate} />
        </div>
        <PipelineViewPanel pipeline={pipeline} />
        <BottleneckAlerts alerts={alerts ?? data?.bottlenecks ?? []} />
      </ListPage>
    </WithPermission>
  );
}
