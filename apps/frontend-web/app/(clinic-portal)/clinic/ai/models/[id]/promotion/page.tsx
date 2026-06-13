"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CanaryRolloutGraph } from "@/components/ai/models/CanaryRolloutGraph";
import { ModelPromotionControls } from "@/components/ai/models/ModelPromotionControls";
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
import { useAuth } from "@/hooks/useAuth";
import { userHasPermission } from "@/lib/auth/permissions";
import { WithPermission } from "@/lib/auth/withPermission";

type ModelPromotionPageProps = {
  params: { id: string };
};

export default function ModelPromotionPage({ params }: ModelPromotionPageProps) {
  const modelId = params.id;
  const { user } = useAuth();
  const canManage = userHasPermission(user, "ai.model.manage");
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
    if (rollout !== undefined) {
      setRolloutValue(rollout);
    }
  }, [promotionQuery.data?.promotion?.rolloutPercentage, promotionQuery.data?.canary.rolloutPercentage]);

  const isBusy =
    promoteStaging.isPending ||
    promoteProduction.isPending ||
    setRollout.isPending ||
    autoAdjust.isPending ||
    deprecate.isPending;

  async function runAction(action: () => Promise<unknown>, successMessage: string) {
    try {
      await action();
      toast.success(successMessage);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Action failed.");
    }
  }

  return (
    <WithPermission permission="ai.model.view">
      <ListPage
        title={modelQuery.data?.modelName ?? "Model promotion"}
        subtitle="Staging, production canary rollout, and deprecation controls."
        action={
          <Button asChild variant="ghost">
            <Link href={`/clinic/ai/models/${modelId}`}>&larr; Model</Link>
          </Button>
        }
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
            onPromoteStaging={() =>
              void runAction(() => promoteStaging.mutateAsync(), "Model promoted to staging.")
            }
            onPromoteProduction={() =>
              void runAction(() => promoteProduction.mutateAsync(), "Canary rollout started.")
            }
            onApplyRollout={() =>
              void runAction(() => setRollout.mutateAsync(rolloutValue), "Rollout percentage updated.")
            }
            onAutoAdjust={() =>
              void runAction(() => autoAdjust.mutateAsync(), "Canary rollout auto-adjusted.")
            }
            onDeprecate={() => void runAction(() => deprecate.mutateAsync(), "Model deprecated.")}
          />

          <CanaryRolloutGraph history={promotionQuery.data?.canary.canaryHistory ?? []} />
        </div>
      </ListPage>
    </WithPermission>
  );
}
