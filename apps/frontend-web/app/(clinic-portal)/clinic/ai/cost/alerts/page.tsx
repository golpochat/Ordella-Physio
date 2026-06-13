"use client";

import Link from "next/link";
import { useState } from "react";
import { CostAlertList } from "@/components/ai/cost/CostAlertList";
import { ListPage } from "@/components/dashboard/ListPage";
import { Button } from "@/components/ui/button";
import { useCostAlerts } from "@/hooks/useAiCost";
import { clinicAiPaths } from "@/lib/ai-admin-paths";
import { WithPermission } from "@/lib/auth/withPermission";
import type { CostAlertRecord } from "@/lib/cost-types";

export default function ClinicCostAlertsPage() {
  const [filter, setFilter] = useState<"all" | CostAlertRecord["type"]>("all");
  const alerts = useCostAlerts();

  return (
    <WithPermission permission="ai.model.view">
      <ListPage title="AI cost alerts" subtitle="Budget and anomaly notifications." isLoading={alerts.isLoading} isError={alerts.isError} onRetry={() => void alerts.refetch()} loadingRows={5}>
        <div className="ai-gateway-subnav">
          <Link href={clinicAiPaths.cost} className="ai-admin-nav-link">Dashboard</Link>
          <Link href={clinicAiPaths.costBudget} className="ai-admin-nav-link">Budget</Link>
          <Link href={clinicAiPaths.costAlerts} className="ai-admin-nav-link ai-admin-nav-link-active">Alerts</Link>
        </div>
        <div className="ai-cost-filter-row">
          {(["all", "BUDGET_SOFT", "BUDGET_HARD", "ANOMALY"] as const).map((type) => (
            <Button key={type} type="button" variant={filter === type ? "primary" : "ghost"} onClick={() => setFilter(type)}>
              {type === "all" ? "All" : type.replace("_", " ")}
            </Button>
          ))}
        </div>
        <CostAlertList alerts={alerts.data ?? []} filter={filter} />
      </ListPage>
    </WithPermission>
  );
}
