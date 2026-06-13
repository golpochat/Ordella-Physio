export type TrainingModelType = "LLM" | "EMBEDDING";
export type TrainingProvider = "OPENAI" | "AZURE" | "LOCAL";
export type TrainingJobStatus = "QUEUED" | "RUNNING" | "FAILED" | "COMPLETED";
export type ModelRegistryStatus = "DRAFT" | "PUBLISHED" | "DEPRECATED";

export type TrainingLogEntry = {
  timestamp: string;
  level: "info" | "warn" | "error";
  message: string;
};

export type TrainingJobRecord = {
  id: string;
  tenantId: string;
  datasetId: string;
  datasetVersionId: string;
  modelType: TrainingModelType;
  baseModel: string;
  trainingProvider: TrainingProvider;
  status: TrainingJobStatus;
  hyperparameters: Record<string, unknown>;
  trainingConfig: Record<string, unknown>;
  logs: TrainingLogEntry[];
  metrics: Record<string, unknown>;
  providerJobId: string | null;
  trainingFileLocation: string | null;
  outputModelId: string | null;
  createdByUserId: string;
  createdAt: string;
  updatedAt: string;
};

export type TrainingMetricsResponse = {
  jobId: string;
  status: TrainingJobStatus;
  metrics: Record<string, unknown>;
};

export type ModelRegistryRecord = {
  id: string;
  tenantId: string;
  modelName: string;
  version: string;
  baseModel: string;
  trainingJobId: string;
  trainingProvider: string;
  fileLocation: string;
  metadata: Record<string, unknown>;
  status: ModelRegistryStatus;
  createdAt: string;
};

export type CreateTrainingJobInput = {
  datasetId: string;
  datasetVersionId: string;
  modelType: TrainingModelType;
  baseModel: string;
  trainingProvider: TrainingProvider;
  hyperparameters?: Record<string, unknown>;
  trainingConfig?: Record<string, unknown>;
  hyperparameterTuning?: {
    enabled: boolean;
    strategy: "GRID" | "RANDOM" | "BAYESIAN";
    searchSpace?: Record<string, unknown>;
    maxTrials?: number;
  };
};

export type ExperimentStatus = "RUNNING" | "COMPLETED" | "FAILED";

export type TrainingCurvePoint = {
  epoch: number;
  loss: number;
  accuracy?: number;
  perplexity?: number;
};

export type ExperimentRecord = {
  id: string;
  tenantId: string;
  trainingJobId: string;
  experimentName: string;
  hyperparameters: Record<string, unknown>;
  metrics: Record<string, unknown>;
  trainingCurve: TrainingCurvePoint[];
  status: ExperimentStatus;
  label: string | null;
  startedAt: string;
  finishedAt: string | null;
  createdByUserId: string;
};

export type CheckpointRecord = {
  id: string;
  tenantId: string;
  trainingJobId: string;
  experimentId: string | null;
  checkpointNumber: number;
  fileLocation: string;
  metricsSnapshot: Record<string, unknown>;
  createdAt: string;
};

export type TrainingDashboardData = {
  job: TrainingJobRecord;
  liveMetrics: {
    loss: unknown;
    accuracy: unknown;
    perplexity: unknown;
    epochs: unknown;
    distributed: unknown;
  };
  trainingCurve: TrainingCurvePoint[];
  experiments: ExperimentRecord[];
  checkpoints: CheckpointRecord[];
  hyperparameterTuning: {
    enabled: boolean;
    strategy: string;
    scheduledTrials: number;
    completedTrials: number;
  };
  artifacts: Record<string, unknown>;
};

export type ExperimentComparisonResult = {
  experiments: ExperimentRecord[];
  bestExperimentId: string | null;
  comparison: Array<{
    id: string;
    experimentName: string;
    status: ExperimentStatus;
    label: string | null;
    hyperparameters: Record<string, unknown>;
    metrics: Record<string, unknown>;
    trainingCurve: TrainingCurvePoint[];
    isBest: boolean;
  }>;
};

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

export type PromotionStage = "STAGING" | "PRODUCTION" | "DEPRECATED";

export type CanaryHistoryPoint = {
  timestamp: string;
  rolloutPercentage: number;
  errorRate: number;
  latencyMs: number;
  safetyScore: number;
};

export type ModelPromotionRecord = {
  id: string;
  tenantId: string;
  modelId: string;
  stage: PromotionStage;
  rolloutPercentage: number;
  canaryHistory: CanaryHistoryPoint[];
  promotedByUserId: string;
  createdAt: string;
  updatedAt: string;
};

export type ModelPromotionStatus = {
  promotion: ModelPromotionRecord | null;
  canary: {
    modelId: string;
    stage: PromotionStage;
    rolloutPercentage: number;
    canaryHistory: CanaryHistoryPoint[];
    latestMetrics: CanaryHistoryPoint | null;
    healthy: boolean;
  };
};

export type DriftType = "DATA" | "CONCEPT" | "EMBEDDING" | "PERFORMANCE";
export type DriftSeverity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export type DriftEventRecord = {
  id: string;
  tenantId: string;
  modelId: string;
  driftType: DriftType;
  severity: DriftSeverity;
  metrics: Record<string, unknown>;
  summary: string;
  recommendedActions: string[];
  detectedAt: string;
  resolvedAt: string | null;
  mitigationAction: string | null;
};

export type DriftMetricRecord = {
  id: string;
  tenantId: string;
  modelId: string;
  timestamp: string;
  granularity: string;
  inputStats: Record<string, unknown>;
  outputStats: Record<string, unknown>;
  embeddingStats: Record<string, unknown>;
  performanceStats: Record<string, unknown>;
};

export type DriftSummary = {
  modelId: string;
  highestSeverity: DriftSeverity | null;
  unresolvedCount: number;
  latestByType: {
    data: DriftEventRecord | null;
    concept: DriftEventRecord | null;
    embedding: DriftEventRecord | null;
    performance: DriftEventRecord | null;
  };
  recentEvents: DriftEventRecord[];
  metricsSeries: DriftMetricRecord[];
  recommendedAction: string;
};

export type DeploymentStatus = "DEPLOYING" | "ACTIVE" | "FAILED" | "ROLLED_BACK";
export type RegionHealth = "HEALTHY" | "DEGRADED" | "UNHEALTHY";

export type DeploymentPipelineStep = {
  name: string;
  status: "PENDING" | "RUNNING" | "COMPLETED" | "FAILED";
  startedAt?: string;
  finishedAt?: string;
  message?: string;
};

export type AIModelDeploymentRecord = {
  id: string;
  tenantId: string;
  modelId: string;
  version: string;
  regions: string[];
  rollout: Record<string, number>;
  health: Record<string, RegionHealth>;
  status: DeploymentStatus;
  artifactLocation: string;
  previousDeploymentId: string | null;
  pipeline: DeploymentPipelineStep[];
  failoverRegion: string | null;
  createdAt: string;
  updatedAt: string;
};

export type DeploymentStatusResponse = {
  active: AIModelDeploymentRecord | null;
  latest: AIModelDeploymentRecord | null;
  history: AIModelDeploymentRecord[];
};

export type DeploymentMetricsSummary = {
  modelId: string;
  version: string;
  byRegion: Record<
    string,
    {
      requests: number;
      avgLatencyMs: number;
      errorRate: number;
      tokenThroughput: number;
      rolloutPercent: number;
      canaryStable: boolean;
      health: RegionHealth;
    }
  >;
  series: Array<{
    id: string;
    region: string;
    timestamp: string;
    requests: number;
    latencyMs: number;
    errorRate: number;
    tokenThroughput: number;
    rolloutPercent: number;
    canaryStable: boolean;
  }>;
  failoverActive: boolean;
  failoverRegion: string | null;
};

export type StartDeploymentInput = {
  modelId: string;
  version: string;
  regions?: string[];
  rollout?: Record<string, number>;
};
