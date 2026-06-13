"use client";

import Link from "next/link";
import { toast } from "sonner";
import { ModelBiasPanel } from "@/components/ai/models/ModelBiasPanel";
import { ModelEvaluationScorecard } from "@/components/ai/models/ModelEvaluationScorecard";
import { ModelSafetyPanel } from "@/components/ai/models/ModelSafetyPanel";
import { ListPage } from "@/components/dashboard/ListPage";
import { Button } from "@/components/ui/button";
import {
  useLatestModelEvaluation,
  useModelEvaluations,
  useRegistryModel,
  useRunModelEvaluation,
} from "@/hooks/useTrainingPortal";
import { useAuth } from "@/hooks/useAuth";
import { userHasPermission } from "@/lib/auth/permissions";
import { WithPermission } from "@/lib/auth/withPermission";

type ModelEvaluationPageProps = {
  params: { id: string };
};

export default function ModelEvaluationPage({ params }: ModelEvaluationPageProps) {
  const modelId = params.id;
  const { user } = useAuth();
  const canManage = userHasPermission(user, "ai.model.manage");
  const modelQuery = useRegistryModel(modelId);
  const evaluationsQuery = useModelEvaluations(modelId);
  const latestQuery = useLatestModelEvaluation(modelId);
  const runEvaluation = useRunModelEvaluation(modelId);

  const latest = latestQuery.data ?? evaluationsQuery.data?.[0] ?? null;

  async function handleRunEvaluation() {
    try {
      await runEvaluation.mutateAsync(undefined);
      toast.success("Evaluation completed.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Evaluation failed.");
    }
  }

  return (
    <WithPermission permission="ai.model.view">
      <ListPage
        title={modelQuery.data?.modelName ?? "Model evaluation"}
        subtitle="Quantitative metrics, safety checks, bias detection, and scorecard."
        action={
          <div className="automation-builder-actions">
            {canManage ? (
              <Button type="button" disabled={runEvaluation.isPending} onClick={() => void handleRunEvaluation()}>
                {runEvaluation.isPending ? "Running…" : "Run evaluation"}
              </Button>
            ) : null}
            <Button asChild variant="ghost">
              <Link href={`/clinic/ai/models/${modelId}`}>&larr; Model</Link>
            </Button>
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

            <section className="training-evaluation-report">
              <h3>Evaluation report</h3>
              <p>{latest.evaluationReport.quantitativeSummary}</p>
              <p>{latest.evaluationReport.qualitativeSummary}</p>
              <p>{latest.evaluationReport.safetySummary}</p>
              <p>{latest.evaluationReport.biasSummary}</p>
            </section>
          </div>
        ) : (
          <p className="dashboard-cell-muted">No evaluations yet. Run the evaluation suite to generate a scorecard.</p>
        )}
      </ListPage>
    </WithPermission>
  );
}
