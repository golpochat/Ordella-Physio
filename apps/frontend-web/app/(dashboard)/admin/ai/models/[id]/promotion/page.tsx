"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AiAdminShell, CanaryRolloutGraph, ModelPromotionControls } from "@/components/ai/admin";
import { ListPage } from "@/components/dashboard/ListPage";
import { Button } from "@/components/ui/button";
import {
  useAutoAdjustModelCanary,
  useDeprecateModel,
  useLatestModelEvaluation,
  useModelPromotion,
  usePromoteModelToProduction,
  usePromoteModelToStaging,
  useRegistryModel,
  useSetModelRollout,
} from "@/hooks/useTrainingPortal";
import { adminAiPaths } from "@/lib/ai-admin-paths";
import { useAuth } from "@/hooks/useAuth";
import { userHasPermission } from "@/lib/auth/permissions";
import { WithPermission } from "@/lib/auth/withPermission";

type Props = { params: { id: string } };

export default function AdminModelPromotionPage({ params }: Props) {
  const modelId = params.id;
  const { user } = useAuth();
  const canManage = userHasPermission(user, "ai.promotion.manage") || userHasPermission(user, "ai.model.manage");
  const modelQuery = useRegistryModel(modelId);
  const promotionQuery = useModelPromotion(modelId);
  const latestEvaluationQuery = useLatestModelEvaluation(modelId);
  const promoteStaging = usePromoteModelToStaging(modelId);
  const promoteProduction = usePromoteModelToProduction(modelId);
  const setRollout = useSetModelRollout(modelId);
  const autoAdjust = useAutoAdjustModelCanary(modelId);
  const deprecate = useDeprecateModel(modelId);
  const [rolloutValue, setRolloutValue] = useState(0);

  useEffect(() => {
    const rollout = promotionQuery.data?.promotion?.rolloutPercentage ?? promotionQuery.data?.canary.rolloutPercentage;
    if (rollout !== undefined) setRolloutValue(rollout);
  }, [promotionQuery.data?.promotion?.rolloutPercentage, promotionQuery.data?.canary.rolloutPercentage]);

  const isBusy =
    promoteStaging.isPending ||
    promoteProduction.isPending ||
    setRollout.isPending ||
    autoAdjust.isPending ||
    deprecate.isPending;

  async function runAction(action: () => Promise<unknown>, message: string) {
    try {
      await action();
      toast.success(message);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Action failed.");
    }
  }

  return (
    <WithPermission permission="ai.admin">
      <AiAdminShell>
        <ListPage
          title={modelQuery.data?.modelName ?? "Model promotion"}
          subtitle="Staging, production canary rollout, and deprecation."
          action={<Button asChild variant="ghost"><Link href={adminAiPaths.model(modelId)}>&larr; Model</Link></Button>}
          isLoading={modelQuery.isLoading || promotionQuery.isLoading}
          isError={modelQuery.isError}
          onRetry={() => {
            void modelQuery.refetch();
            void promotionQuery.refetch();
          }}
          loadingRows={5}
        >
          <div className="training-promotion-page">
            <ModelPromotionControls
              promotionStatus={promotionQuery.data ?? null}
              evaluationReport={latestEvaluationQuery.data?.evaluationReport ?? null}
              canManage={canManage}
              isBusy={isBusy}
              rolloutValue={rolloutValue}
              onRolloutChange={setRolloutValue}
              onPromoteStaging={() => void runAction(() => promoteStaging.mutateAsync(), "Promoted to staging.")}
              onPromoteProduction={() => void runAction(() => promoteProduction.mutateAsync(), "Canary started.")}
              onApplyRollout={() => void runAction(() => setRollout.mutateAsync(rolloutValue), "Rollout updated.")}
              onAutoAdjust={() => void runAction(() => autoAdjust.mutateAsync(), "Canary auto-adjusted.")}
              onDeprecate={() => void runAction(() => deprecate.mutateAsync(), "Model deprecated.")}
            />
            <CanaryRolloutGraph history={promotionQuery.data?.canary.canaryHistory ?? []} />
          </div>
        </ListPage>
      </AiAdminShell>
    </WithPermission>
  );
}
