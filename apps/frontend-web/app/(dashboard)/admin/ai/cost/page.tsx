import { AiAdminSectionNav } from "@/components/ai/admin/AiAdminSectionNav";
"use client";

import Link from "next/link";
import { AiAdminShell } from "@/components/ai/admin";
import { CostByFeatureTable } from "@/components/ai/cost/CostByFeatureTable";
import { CostByModelChart } from "@/components/ai/cost/CostByModelChart";
import { CostSummaryCard } from "@/components/ai/cost/CostSummaryCard";
import { CostTrendsChart } from "@/components/ai/cost/CostTrendsChart";
import { OptimizationSuggestions } from "@/components/ai/cost/OptimizationSuggestions";
import { ListPage } from "@/components/dashboard/ListPage";
import {
  useCostByFeature,
  useCostByModel,
  useCostOptimization,
  useCostSummary,
  useCostTrends,
} from "@/hooks/useAiCost";
import { adminAiPaths } from "@/lib/ai-admin-paths";
import { aiCostSectionNav } from "@/lib/ai-admin-section-nav";
import { WithPermission } from "@/lib/auth/withPermission";

export default function AdminCostDashboardPage() {
  const summary = useCostSummary();
  const byModel = useCostByModel();
  const byFeature = useCostByFeature();
  const trends = useCostTrends();
  const optimization = useCostOptimization();

  return (
    <WithPermission permission="ai.admin">
      <AiAdminShell>
        <ListPage
          title="AI cost dashboard"
          subtitle="Token usage, spend trends, and optimization insights."
          isLoading={summary.isLoading || byModel.isLoading}
          isError={summary.isError || byModel.isError}
          onRetry={() => {
            void summary.refetch();
            void byModel.refetch();
            void byFeature.refetch();
            void trends.refetch();
          }}
          loadingRows={5}
        >
          <AiAdminSectionNav items={aiCostSectionNav(adminAiPaths)} />
          <CostSummaryCard summary={summary.data} />
          <CostTrendsChart trends={trends.data ?? []} />
          <CostByModelChart models={byModel.data ?? []} />
          <CostByFeatureTable features={byFeature.data ?? []} />
          <OptimizationSuggestions report={optimization.data} />
        </ListPage>
      </AiAdminShell>
    </WithPermission>
  );
}
