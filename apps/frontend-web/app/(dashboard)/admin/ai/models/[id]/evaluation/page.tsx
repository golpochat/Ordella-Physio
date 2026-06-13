"use client";

import Link from "next/link";
import { toast } from "sonner";
import {
  AiAdminShell,
  ModelBiasPanel,
  ModelEvaluationScorecard,
  ModelSafetyPanel,
} from "@/components/ai/admin";
import { ListPage } from "@/components/dashboard/ListPage";
import { Button } from "@/components/ui/button";
import {
  useLatestModelEvaluation,
  useModelEvaluations,
  useRegistryModel,
  useRunModelEvaluation,
} from "@/hooks/useTrainingPortal";
import { adminAiPaths } from "@/lib/ai-admin-paths";
import { useAuth } from "@/hooks/useAuth";
import { userHasPermission } from "@/lib/auth/permissions";
import { WithPermission } from "@/lib/auth/withPermission";

type Props = { params: { id: string } };

export default function AdminModelEvaluationPage({ params }: Props) {
  const modelId = params.id;
  const { user } = useAuth();
  const canRun = userHasPermission(user, "ai.evaluation.run") || userHasPermission(user, "ai.model.manage");
  const modelQuery = useRegistryModel(modelId);
  const evaluationsQuery = useModelEvaluations(modelId);
  const latestQuery = useLatestModelEvaluation(modelId);
  const runEvaluation = useRunModelEvaluation(modelId);
  const latest = latestQuery.data ?? evaluationsQuery.data?.[0] ?? null;

  return (
    <WithPermission permission="ai.admin">
      <AiAdminShell>
        <ListPage
          title={modelQuery.data?.modelName ?? "Model evaluation"}
          subtitle="Scorecard, safety checks, and bias detection."
          action={
            <div className="automation-builder-actions">
              {canRun ? (
                <Button
                  type="button"
                  disabled={runEvaluation.isPending}
                  onClick={() =>
                    void runEvaluation.mutateAsync(undefined).then(() => toast.success("Evaluation completed."))
                  }
                >
                  {runEvaluation.isPending ? "Running…" : "Run evaluation"}
                </Button>
              ) : null}
              <Button asChild variant="ghost"><Link href={adminAiPaths.model(modelId)}>&larr; Model</Link></Button>
            </div>
          }
          isLoading={modelQuery.isLoading || evaluationsQuery.isLoading}
          isError={modelQuery.isError || evaluationsQuery.isError}
          onRetry={() => {
            void modelQuery.refetch();
            void evaluationsQuery.refetch();
            void latestQuery.refetch();
          }}
          loadingRows={6}
        >
          {latest ? (
            <div className="training-evaluation-page">
              <div className="training-metrics-grid">
                <div className="training-metric-card">
                  <div className="dashboard-cell-muted">Accuracy</div>
                  <div className="training-metric-value">{latest.metrics.accuracy}</div>
                </div>
                <div className="training-metric-card">
                  <div className="dashboard-cell-muted">Perplexity</div>
                  <div className="training-metric-value">{latest.metrics.perplexity}</div>
                </div>
                <div className="training-metric-card">
                  <div className="dashboard-cell-muted">ROUGE</div>
                  <div className="training-metric-value">{latest.metrics.rouge}</div>
                </div>
                <div className="training-metric-card">
                  <div className="dashboard-cell-muted">BLEU</div>
                  <div className="training-metric-value">{latest.metrics.bleu}</div>
                </div>
              </div>
              <ModelEvaluationScorecard report={latest.evaluationReport} />
              <ModelSafetyPanel metrics={latest.metrics} />
              <ModelBiasPanel metrics={latest.metrics} />
            </div>
          ) : (
            <p className="dashboard-cell-muted">No evaluations yet. Run the evaluation suite to generate a scorecard.</p>
          )}
        </ListPage>
      </AiAdminShell>
    </WithPermission>
  );
}
