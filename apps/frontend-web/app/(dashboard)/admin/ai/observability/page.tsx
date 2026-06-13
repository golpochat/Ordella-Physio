"use client";

import Link from "next/link";
import { toast } from "sonner";
import { AiAdminShell } from "@/components/ai/admin";
import { BottleneckAlerts } from "@/components/ai/observability/BottleneckAlerts";
import { ErrorRateHeatmap } from "@/components/ai/observability/ErrorRateHeatmap";
import { LatencyHeatmap } from "@/components/ai/observability/LatencyHeatmap";
import { PipelineViewPanel } from "@/components/ai/observability/PipelineView";
import { ListPage } from "@/components/dashboard/ListPage";
import {
  useBottleneckAlerts,
  useDetectBottlenecks,
  useObservabilityDashboard,
  usePipelineView,
  useResolveBottleneck,
} from "@/hooks/useAiObservability";
import { adminAiPaths } from "@/lib/ai-admin-paths";
import { WithPermission } from "@/lib/auth/withPermission";

function ObservabilitySubnav({ active }: { active: "dashboard" | "traces" | "logs" | "metrics" }) {
  return (
    <div className="ai-gateway-subnav">
      <Link href={adminAiPaths.observability} className={`ai-admin-nav-link ${active === "dashboard" ? "ai-admin-nav-link-active" : ""}`}>Dashboard</Link>
      <Link href={adminAiPaths.observabilityTraces} className={`ai-admin-nav-link ${active === "traces" ? "ai-admin-nav-link-active" : ""}`}>Traces</Link>
      <Link href={adminAiPaths.observabilityLogs} className={`ai-admin-nav-link ${active === "logs" ? "ai-admin-nav-link-active" : ""}`}>Logs</Link>
      <Link href={adminAiPaths.observabilityMetrics} className={`ai-admin-nav-link ${active === "metrics" ? "ai-admin-nav-link-active" : ""}`}>Metrics</Link>
    </div>
  );
}

export default function AdminObservabilityPage() {
  const { data, isLoading, isError, refetch } = useObservabilityDashboard();
  const { data: pipeline } = usePipelineView();
  const { data: alerts } = useBottleneckAlerts();
  const detect = useDetectBottlenecks();
  const resolve = useResolveBottleneck();

  return (
    <WithPermission permission="ai.admin">
      <AiAdminShell>
        <ListPage
          title="AI observability"
          subtitle="End-to-end pipeline visibility across gateway, inference, training, and deployment."
          isLoading={isLoading}
          isError={isError}
          onRetry={() => void refetch()}
          loadingRows={6}
        >
          <ObservabilitySubnav active="dashboard" />
          {data ? (
            <div className="ai-observability-summary">
              <div className="ai-observability-summary-card"><span>Traces</span><strong>{data.summary.traceCount}</strong></div>
              <div className="ai-observability-summary-card"><span>Logs</span><strong>{data.summary.logCount}</strong></div>
              <div className="ai-observability-summary-card"><span>Open alerts</span><strong>{data.summary.openAlerts}</strong></div>
              <div className="ai-observability-summary-card"><span>Latency P95</span><strong>{data.summary.latencyP95}ms</strong></div>
            </div>
          ) : null}
          <div className="ai-observability-dashboard-grid">
            <LatencyHeatmap data={data?.heatmaps.latency} />
            <ErrorRateHeatmap data={data?.heatmaps.errorRate} />
          </div>
          <PipelineViewPanel pipeline={pipeline} />
          <BottleneckAlerts
            alerts={alerts ?? data?.bottlenecks ?? []}
            detecting={detect.isPending}
            onDetect={() => {
              void detect.mutateAsync().then((result) => toast.success(`Detected ${result.count} bottlenecks.`));
            }}
            onResolve={(id) => {
              void resolve.mutateAsync(id).then(() => toast.success("Alert resolved."));
            }}
          />
        </ListPage>
      </AiAdminShell>
    </WithPermission>
  );
}
