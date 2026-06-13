"use client";

import Link from "next/link";
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
import { clinicAiPaths } from "@/lib/ai-admin-paths";
import { WithPermission } from "@/lib/auth/withPermission";

export default function ClinicCostDashboardPage() {
  const summary = useCostSummary();
  const byModel = useCostByModel();
  const byFeature = useCostByFeature();
  const trends = useCostTrends();
  const optimization = useCostOptimization();

  return (
    <WithPermission permission="ai.model.view">
      <ListPage title="AI cost" subtitle="Track spend and token usage." isLoading={summary.isLoading} isError={summary.isError} onRetry={() => void summary.refetch()} loadingRows={5}>
        <div className="ai-gateway-subnav">
          <Link href={clinicAiPaths.cost} className="ai-admin-nav-link ai-admin-nav-link-active">Dashboard</Link>
          <Link href={clinicAiPaths.costBudget} className="ai-admin-nav-link">Budget</Link>
          <Link href={clinicAiPaths.costAlerts} className="ai-admin-nav-link">Alerts</Link>
        </div>
        <CostSummaryCard summary={summary.data} />
        <CostTrendsChart trends={trends.data ?? []} />
        <CostByModelChart models={byModel.data ?? []} />
        <CostByFeatureTable features={byFeature.data ?? []} />
        <OptimizationSuggestions report={optimization.data} />
      </ListPage>
    </WithPermission>
  );
}
