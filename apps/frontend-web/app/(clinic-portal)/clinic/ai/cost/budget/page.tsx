"use client";

import { AiAdminSectionNav } from "@/components/ai/admin/AiAdminSectionNav";

import Link from "next/link";
import { toast } from "sonner";
import { BudgetConfigPanel } from "@/components/ai/cost/BudgetConfigPanel";
import { BudgetUsageBar } from "@/components/ai/cost/BudgetUsageBar";
import { ListPage } from "@/components/dashboard/ListPage";
import { useAuth } from "@/hooks/useAuth";
import { useCostBudget, useUpdateCostBudget } from "@/hooks/useAiCost";
import { clinicAiPaths } from "@/lib/ai-admin-paths";
import { aiCostSectionNav } from "@/lib/ai-admin-section-nav";
import { userHasPermission } from "@/lib/auth/permissions";
import { WithPermission } from "@/lib/auth/withPermission";

export default function ClinicCostBudgetPage() {
  const { user } = useAuth();
  const canManage = userHasPermission(user, "ai.model.manage");
  const budget = useCostBudget();
  const updateBudget = useUpdateCostBudget();

  return (
    <WithPermission permission="ai.model.view">
      <ListPage title="AI budget" subtitle="Monthly token and cost limits." isLoading={budget.isLoading} isError={budget.isError} onRetry={() => void budget.refetch()} loadingRows={4}>
        <AiAdminSectionNav items={aiCostSectionNav(clinicAiPaths)} />
        <BudgetUsageBar budget={budget.data} />
        {canManage ? (
          <BudgetConfigPanel
            budget={budget.data}
            isSaving={updateBudget.isPending}
            onSave={(payload) => void updateBudget.mutateAsync(payload).then(() => toast.success("Saved."))}
          />
        ) : null}
      </ListPage>
    </WithPermission>
  );
}
