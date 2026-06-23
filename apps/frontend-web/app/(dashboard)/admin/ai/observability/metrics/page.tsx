"use client";

import { AiAdminSectionNav } from "@/components/ai/admin/AiAdminSectionNav";

import Link from "next/link";
import { AiAdminShell } from "@/components/ai/admin";
import { MetricCharts } from "@/components/ai/observability/MetricCharts";
import { ListPage } from "@/components/dashboard/ListPage";
import { useObservabilityMetrics } from "@/hooks/useAiObservability";
import { adminAiPaths } from "@/lib/ai-admin-paths";
import { aiObservabilitySectionNav } from "@/lib/ai-admin-section-nav";
import { WithPermission } from "@/lib/auth/withPermission";

export default function AdminObservabilityMetricsPage() {
  const latency = useObservabilityMetrics("latency");
  const errorRate = useObservabilityMetrics("error_rate");
  const throughput = useObservabilityMetrics("throughput");
  const tokenUsage = useObservabilityMetrics("token_usage");
  const isLoading = latency.isLoading || errorRate.isLoading || throughput.isLoading || tokenUsage.isLoading;
  const isError = latency.isError || errorRate.isError || throughput.isError || tokenUsage.isError;

  return (
    <WithPermission permission="ai.admin">
      <AiAdminShell>
        <ListPage
          title="AI metrics"
          subtitle="Latency percentiles, error rate, throughput, and token usage."
          isLoading={isLoading}
          isError={isError}
          onRetry={() => {
            void latency.refetch();
            void errorRate.refetch();
            void throughput.refetch();
            void tokenUsage.refetch();
          }}
          loadingRows={4}
        >
          <AiAdminSectionNav items={aiObservabilitySectionNav(adminAiPaths)} />
          <MetricCharts
            latency={latency.data}
            errorRate={errorRate.data}
            throughput={throughput.data}
            tokenUsage={tokenUsage.data}
          />
        </ListPage>
      </AiAdminShell>
    </WithPermission>
  );
}
