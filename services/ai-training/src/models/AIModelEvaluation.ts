import type { AIModelEvaluation } from "@/generated/prisma";

export type EvaluationMetrics = {
  accuracy: number;
  perplexity: number;
  rouge: number;
  bleu: number;
  embeddingCosine: number;
  hallucinationRate: number;
  toxicityScore: number;
  piiLeakageScore: number;
  biasScores: {
    gender: number;
    age: number;
    ethnicity: number;
  };
};

export type ScorecardIndicator = "green" | "yellow" | "red";

export type EvaluationScorecard = {
  overall: ScorecardIndicator;
  quantitative: ScorecardIndicator;
  safety: ScorecardIndicator;
  bias: ScorecardIndicator;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
};

export type EvaluationReport = {
  scorecard: EvaluationScorecard;
  quantitativeSummary: string;
  qualitativeSummary: string;
  safetySummary: string;
  biasSummary: string;
  generatedAt: string;
};

export type ModelEvaluationRecord = {
  id: string;
  tenantId: string;
  modelId: string;
  datasetId: string;
  metrics: EvaluationMetrics;
  evaluationReport: EvaluationReport;
  createdAt: string;
};

export function toModelEvaluationRecord(evaluation: AIModelEvaluation): ModelEvaluationRecord {
  const metrics =
    evaluation.metrics && typeof evaluation.metrics === "object"
      ? (evaluation.metrics as EvaluationMetrics)
      : ({} as EvaluationMetrics);
  const evaluationReport =
    evaluation.evaluationReport && typeof evaluation.evaluationReport === "object"
      ? (evaluation.evaluationReport as EvaluationReport)
      : ({} as EvaluationReport);

  return {
    id: evaluation.id,
    tenantId: evaluation.tenantId,
    modelId: evaluation.modelId,
    datasetId: evaluation.datasetId,
    metrics,
    evaluationReport,
    createdAt: evaluation.createdAt.toISOString(),
  };
}
