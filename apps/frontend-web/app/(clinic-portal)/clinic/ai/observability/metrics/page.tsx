import { AiAdminSectionNav } from "@/components/ai/admin/AiAdminSectionNav";
"use client";

import Link from "next/link";
import { MetricCharts } from "@/components/ai/observability/MetricCharts";
import { ListPage } from "@/components/dashboard/ListPage";
import { useObservabilityMetrics } from "@/hooks/useAiObservability";
import { clinicAiPaths } from "@/lib/ai-admin-paths";
import { aiObservabilitySectionNav } from "@/lib/ai-admin-section-nav";
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
        <AiAdminSectionNav items={aiObservabilitySectionNav(clinicAiPaths)} />
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
