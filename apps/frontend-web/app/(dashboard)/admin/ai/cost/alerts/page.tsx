"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { AiAdminShell } from "@/components/ai/admin";
import { CostAlertList } from "@/components/ai/cost/CostAlertList";
import { ListPage } from "@/components/dashboard/ListPage";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useCostAlerts, useResolveCostAlert } from "@/hooks/useAiCost";
import { adminAiPaths } from "@/lib/ai-admin-paths";
import { userHasPermission } from "@/lib/auth/permissions";
import { WithPermission } from "@/lib/auth/withPermission";
import type { CostAlertRecord } from "@/lib/cost-types";

export default function AdminCostAlertsPage() {
  const { user } = useAuth();
  const canManage = userHasPermission(user, "ai.model.manage");
  const [filter, setFilter] = useState<"all" | CostAlertRecord["type"]>("all");
  const alerts = useCostAlerts();
  const resolveAlert = useResolveCostAlert();

  return (
    <WithPermission permission="ai.admin">
      <AiAdminShell>
        <ListPage
          title="AI cost alerts"
          subtitle="Budget thresholds and anomaly notifications."
          isLoading={alerts.isLoading}
          isError={alerts.isError}
          onRetry={() => void alerts.refetch()}
          loadingRows={5}
        >
          <div className="ai-gateway-subnav">
            <Link href={adminAiPaths.cost} className="ai-admin-nav-link">Dashboard</Link>
            <Link href={adminAiPaths.costBudget} className="ai-admin-nav-link">Budget</Link>
            <Link href={adminAiPaths.costAlerts} className="ai-admin-nav-link ai-admin-nav-link-active">Alerts</Link>
          </div>
          <div className="ai-cost-filter-row">
            {(["all", "BUDGET_SOFT", "BUDGET_HARD", "ANOMALY"] as const).map((type) => (
              <Button key={type} type="button" variant={filter === type ? "primary" : "ghost"} onClick={() => setFilter(type)}>
                {type === "all" ? "All" : type.replace("_", " ")}
              </Button>
            ))}
          </div>
          <CostAlertList
            alerts={alerts.data ?? []}
            filter={filter}
            onResolve={canManage ? (id) => void resolveAlert.mutateAsync(id).then(() => toast.success("Alert resolved.")) : undefined}
          />
        </ListPage>
      </AiAdminShell>
    </WithPermission>
  );
}
