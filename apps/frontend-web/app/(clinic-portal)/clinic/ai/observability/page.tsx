"use client";

import { AiAdminSectionNav } from "@/components/ai/admin/AiAdminSectionNav";

import Link from "next/link";
import { BottleneckAlerts } from "@/components/ai/observability/BottleneckAlerts";
import { ErrorRateHeatmap } from "@/components/ai/observability/ErrorRateHeatmap";
import { LatencyHeatmap } from "@/components/ai/observability/LatencyHeatmap";
import { PipelineViewPanel } from "@/components/ai/observability/PipelineView";
import { ListPage } from "@/components/dashboard/ListPage";
import { useBottleneckAlerts, useObservabilityDashboard, usePipelineView } from "@/hooks/useAiObservability";
import { clinicAiPaths } from "@/lib/ai-admin-paths";
import { aiObservabilitySectionNav } from "@/lib/ai-admin-section-nav";
import { WithPermission } from "@/lib/auth/withPermission";

export default function ClinicObservabilityPage() {
  const { data, isLoading, isError, refetch } = useObservabilityDashboard();
  const { data: pipeline } = usePipelineView();
  const { data: alerts } = useBottleneckAlerts();

  return (
    <WithPermission permission="ai.model.view">
      <ListPage title="AI observability" subtitle="Pipeline visibility and performance overview." isLoading={isLoading} isError={isError} onRetry={() => void refetch()} loadingRows={6}>
        <AiAdminSectionNav items={aiObservabilitySectionNav(clinicAiPaths)} />
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
