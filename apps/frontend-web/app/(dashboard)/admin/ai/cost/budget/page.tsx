"use client";

import Link from "next/link";
import { toast } from "sonner";
import { AiAdminShell } from "@/components/ai/admin";
import { BudgetConfigPanel } from "@/components/ai/cost/BudgetConfigPanel";
import { BudgetUsageBar } from "@/components/ai/cost/BudgetUsageBar";
import { ListPage } from "@/components/dashboard/ListPage";
import { useAuth } from "@/hooks/useAuth";
import { useCostBudget, useUpdateCostBudget } from "@/hooks/useAiCost";
import { adminAiPaths } from "@/lib/ai-admin-paths";
import { userHasPermission } from "@/lib/auth/permissions";
import { WithPermission } from "@/lib/auth/withPermission";

export default function AdminCostBudgetPage() {
  const { user } = useAuth();
  const canManage = userHasPermission(user, "ai.model.manage");
  const budget = useCostBudget();
  const updateBudget = useUpdateCostBudget();

  return (
    <WithPermission permission="ai.admin">
      <AiAdminShell>
        <ListPage
          title="AI cost budget"
          subtitle="Monthly token and cost budgets with soft/hard thresholds."
          isLoading={budget.isLoading}
          isError={budget.isError}
          onRetry={() => void budget.refetch()}
          loadingRows={4}
        >
          <div className="ai-gateway-subnav">
            <Link href={adminAiPaths.cost} className="ai-admin-nav-link">Dashboard</Link>
            <Link href={adminAiPaths.costBudget} className="ai-admin-nav-link ai-admin-nav-link-active">Budget</Link>
            <Link href={adminAiPaths.costAlerts} className="ai-admin-nav-link">Alerts</Link>
          </div>
          <BudgetUsageBar budget={budget.data} />
          {canManage ? (
            <BudgetConfigPanel
              budget={budget.data}
              isSaving={updateBudget.isPending}
              onSave={(payload) => void updateBudget.mutateAsync(payload).then(() => toast.success("Budget saved."))}
            />
          ) : (
            <p>Read-only view.</p>
          )}
        </ListPage>
      </AiAdminShell>
    </WithPermission>
  );
}
