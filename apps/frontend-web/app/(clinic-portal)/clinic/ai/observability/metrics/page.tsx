"use client";

import Link from "next/link";
import { MetricCharts } from "@/components/ai/observability/MetricCharts";
import { ListPage } from "@/components/dashboard/ListPage";
import { useObservabilityMetrics } from "@/hooks/useAiObservability";
import { clinicAiPaths } from "@/lib/ai-admin-paths";
import { WithPermission } from "@/lib/auth/withPermission";

export default function ClinicObservabilityMetricsPage() {
  const latency = useObservabilityMetrics("latency");
  const errorRate = useObservabilityMetrics("error_rate");
  const throughput = useObservabilityMetrics("throughput");
  const tokenUsage = useObservabilityMetrics("token_usage");

  return (
    <WithPermission permission="ai.model.view">
      <ListPage
        title="AI metrics"
        isLoading={latency.isLoading}
        isError={latency.isError}
        onRetry={() => void latency.refetch()}
        loadingRows={4}
      >
        <div className="ai-gateway-subnav">
          <Link href={clinicAiPaths.observability} className="ai-admin-nav-link">Dashboard</Link>
          <Link href={clinicAiPaths.observabilityTraces} className="ai-admin-nav-link">Traces</Link>
          <Link href={clinicAiPaths.observabilityLogs} className="ai-admin-nav-link">Logs</Link>
          <Link href={clinicAiPaths.observabilityMetrics} className="ai-admin-nav-link ai-admin-nav-link-active">Metrics</Link>
        </div>
        <MetricCharts
          latency={latency.data}
          errorRate={errorRate.data}
          throughput={throughput.data}
          tokenUsage={tokenUsage.data}
        />
      </ListPage>
    </WithPermission>
  );
}
