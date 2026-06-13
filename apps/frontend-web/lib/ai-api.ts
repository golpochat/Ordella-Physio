import type { createApiClient } from "@/lib/api-client";
import type {
  CopilotEntityType,
  CopilotResult,
  MultiStepAgentResult,
  WorkflowRunResult,
} from "@/lib/ai-copilot-types";
import type {
  AgentResult,
  AppointmentInsightResult,
  InvoiceInsightResult,
  PatientInsightResult,
  ReportInsightResult,
} from "@/lib/ai-insight-types";
import type {
  AIEmbedResult,
  AIProviderConfig,
  AIStructuredResult,
  AITextResult,
  AIProviderType,
} from "@/lib/ai-types";
import type {
  WorkflowDraft,
  WorkflowLiveEvent,
  WorkflowLiveEventFilters,
  WorkflowRecord,
  WorkflowVersionDiffResult,
  WorkflowVersionRecord,
  WorkflowRunListFilters,
  WorkflowRunListResponse,
} from "@/lib/automation-types";
import type {
  CreateDatasetInput,
  DatasetDetail,
  DatasetEmbedResult,
  DatasetExportPayload,
  DatasetRecord,
  DatasetRecordItem,
  DatasetVersionDiffResult,
  DatasetVersionRecord,
  DatasetLabelRecord,
  UpdateDatasetInput,
} from "@/lib/dataset-types";
import type {
  AbExperimentRecord,
  ExperimentReport,
  FeatureFlagRecord,
  FlagEvaluationResult,
  FlagVariant,
  ExperimentVariant,
} from "@/lib/feature-flag-types";
import type {
  AccessPolicyRecord,
  AuditAction,
  AuditLogRecord,
  ComplianceExport,
  PIIIncidentRecord,
} from "@/lib/security-types";
import type {
  BottleneckAlert,
  HeatmapData,
  LogEventRecord,
  LogLevel,
  MetricAggregate,
  MetricType,
  ObservabilityDashboard,
  PipelineView,
  TraceDetail,
  TraceService,
  TraceSpanRecord,
  TraceStatus,
} from "@/lib/observability-types";
import type {
  AgentRecord,
  AgentRunRecord,
  AgentToolRecord,
  CreateAgentInput,
  CreateToolInput,
} from "@/lib/agent-types";
import type {
  BudgetRecord,
  GatewayKeyCreateResult,
  GatewayKeyRecord,
  GatewayScope,
  GatewayUsageByKey,
  GatewayUsageSummary,
  RateLimitRecord,
  RateLimitUsageSnapshot,
} from "@/lib/gateway-types";
import type {
  CostAlertRecord,
  CostBudgetStatus,
  CostByFeature,
  CostByModel,
  CostPeriod,
  CostTrendPoint,
  CostUsageSummary,
  OptimizationReport,
} from "@/lib/cost-types";
import type {
  CreateTrainingJobInput,
  ExperimentComparisonResult,
  ExperimentRecord,
  DriftEventRecord,
  DriftMetricRecord,
  DriftSummary,
  AIModelDeploymentRecord,
  DeploymentMetricsSummary,
  DeploymentStatusResponse,
  StartDeploymentInput,
  ModelEvaluationRecord,
  ModelPromotionRecord,
  ModelPromotionStatus,
  ModelRegistryRecord,
  TrainingDashboardData,
  TrainingJobRecord,
  TrainingMetricsResponse,
  CheckpointRecord,
} from "@/lib/training-types";

export function createAiApi(api: ReturnType<typeof createApiClient>) {
  return {
    listProviders() {
      return api.get<AIProviderConfig[]>("ai", "/providers");
    },

    createProvider(input: {
      provider: AIProviderType;
      modelName: string;
      apiKey: string;
      baseUrl?: string;
      isActive?: boolean;
      priority?: number;
    }) {
      return api.post<{ message: string; provider: AIProviderConfig }>("ai", "/providers", input);
    },

    updateProvider(
      id: string,
      input: Partial<{
        provider: AIProviderType;
        modelName: string;
        apiKey: string;
        baseUrl: string;
        isActive: boolean;
        priority: number;
      }>,
    ) {
      return api.put<{ message: string; provider: AIProviderConfig }>("ai", `/providers/${id}`, input);
    },

    runText(input: {
      task?: string;
      prompt: string;
      maxTokens?: number;
      temperature?: number;
      model?: string;
    }) {
      return api.post<AITextResult>("ai", "/text", input);
    },

    runStructured(input: {
      task?: string;
      prompt: string;
      schema: Record<string, unknown>;
      maxTokens?: number;
      temperature?: number;
      model?: string;
    }) {
      return api.post<AIStructuredResult>("ai", "/json", input);
    },

    runEmbed(input: { text: string; model?: string }) {
      return api.post<AIEmbedResult>("ai", "/embed", input);
    },

    getPatientInsights(patientId: string) {
      return api.post<PatientInsightResult>("ai", `/insights/patient/${patientId}`, {});
    },

    getAppointmentInsights(appointmentId: string) {
      return api.post<AppointmentInsightResult>("ai", `/insights/appointment/${appointmentId}`, {});
    },

    getInvoiceInsights(invoiceId: string) {
      return api.post<InvoiceInsightResult>("ai", `/insights/invoice/${invoiceId}`, {});
    },

    getReportInsights(report: Record<string, unknown>) {
      return api.post<ReportInsightResult>("ai", "/insights/report", { report });
    },

    runAgent(input: { request: string; patientId?: string; invoiceId?: string }) {
      return api.post<AgentResult>("ai", "/insights/agent", input);
    },

    runMultiStepAgent(input: {
      request: string;
      patientId?: string;
      invoiceId?: string;
      steps?: string[];
      multiStep?: boolean;
    }) {
      return api.post<MultiStepAgentResult>("ai", "/agent/run", {
        ...input,
        multiStep: input.multiStep ?? true,
      });
    },

    runCopilot(input: {
      query: string;
      entityType?: CopilotEntityType;
      entityId?: string;
    }) {
      return api.post<CopilotResult>("ai", "/copilot", input);
    },

    runWorkflow(input: {
      trigger: string;
      patientId?: string;
      invoiceId?: string;
      appointmentId?: string;
    }) {
      return api.post<WorkflowRunResult>("ai", "/copilot/workflow", input);
    },

    listWorkflows() {
      return api.get<Array<{ trigger: string; steps: unknown[] }>>("ai", "/copilot/workflows");
    },

    listAutomationWorkflows() {
      return api.get<WorkflowRecord[]>("ai", "/workflows");
    },

    getAutomationWorkflow(id: string) {
      return api.get<WorkflowRecord>("ai", `/workflows/${id}`);
    },

    createAutomationWorkflow(payload: WorkflowDraft & { versionLabel?: string }) {
      return api.post<WorkflowRecord>("ai", "/workflows", payload);
    },

    updateAutomationWorkflow(id: string, payload: WorkflowDraft & { versionLabel?: string }) {
      return api.put<WorkflowRecord>("ai", `/workflows/${id}`, payload);
    },

    enableAutomationWorkflow(id: string) {
      return api.post<WorkflowRecord>("ai", `/workflows/${id}/enable`, {});
    },

    disableAutomationWorkflow(id: string) {
      return api.post<WorkflowRecord>("ai", `/workflows/${id}/disable`, {});
    },

    listAutomationWorkflowRuns(filters: WorkflowRunListFilters = {}) {
      return api.get<WorkflowRunListResponse>("ai", "/workflows/runs", {
        params: filters,
        unwrapData: false,
      });
    },

    listAutomationWorkflowRunsByWorkflow(id: string, filters: WorkflowRunListFilters = {}) {
      return api.get<WorkflowRunListResponse>("ai", `/workflows/${id}/runs`, {
        params: filters,
        unwrapData: false,
      });
    },

    listAutomationMonitorEvents(filters: WorkflowLiveEventFilters = {}) {
      return api.get<WorkflowLiveEvent[]>("ai", "/workflows/monitor/recent", {
        params: filters,
      });
    },

    listWorkflowVersions(workflowId: string) {
      return api.get<WorkflowVersionRecord[]>("ai", `/workflows/${workflowId}/versions`);
    },

    getWorkflowVersion(workflowId: string, versionNumber: number) {
      return api.get<WorkflowVersionRecord>("ai", `/workflows/${workflowId}/versions/${versionNumber}`);
    },

    diffWorkflowVersions(workflowId: string, fromVersion: number, toVersion: number) {
      return api.get<WorkflowVersionDiffResult>(
        "ai",
        `/workflows/${workflowId}/versions/${fromVersion}/diff/${toVersion}`,
      );
    },

    rollbackWorkflowVersion(workflowId: string, versionNumber: number) {
      return api.post<WorkflowRecord>("ai", `/workflows/${workflowId}/versions/${versionNumber}/rollback`, {});
    },

    updateWorkflowVersionLabel(workflowId: string, versionNumber: number, label: string | null) {
      return api.put<WorkflowVersionRecord>(
        "ai",
        `/workflows/${workflowId}/versions/${versionNumber}/label`,
        { label },
      );
    },

    getCopilotMemory() {
      return api.get<Array<{ key: string; value: unknown; updatedAt: string }>>("ai", "/copilot/memory");
    },

    listDatasets() {
      return api.get<DatasetRecord[]>("ai", "/datasets");
    },

    getDataset(id: string) {
      return api.get<DatasetDetail>("ai", `/datasets/${id}`);
    },

    createDataset(payload: CreateDatasetInput) {
      return api.post<DatasetRecord>("ai", "/datasets", payload);
    },

    updateDataset(id: string, payload: UpdateDatasetInput) {
      return api.put<DatasetRecord>("ai", `/datasets/${id}`, payload);
    },

    deleteDataset(id: string) {
      return api.delete<{ deleted: boolean }>("ai", `/datasets/${id}`);
    },

    cloneDataset(id: string) {
      return api.post<DatasetRecord>("ai", `/datasets/${id}/clone`, {});
    },

    exportDataset(id: string) {
      return api.post<DatasetExportPayload>("ai", `/datasets/${id}/export`, {});
    },

    importDataset(payload: CreateDatasetInput) {
      return api.post<DatasetRecord>("ai", "/datasets/import", payload);
    },

    listDatasetVersions(datasetId: string) {
      return api.get<DatasetVersionRecord[]>("ai", `/datasets/${datasetId}/versions`);
    },

    createDatasetVersion(datasetId: string) {
      return api.post<DatasetVersionRecord>("ai", `/datasets/${datasetId}/versions`, {});
    },

    getDatasetVersion(datasetId: string, versionNumber: number) {
      return api.get<DatasetVersionRecord>("ai", `/datasets/${datasetId}/versions/${versionNumber}`);
    },

    diffDatasetVersions(datasetId: string, fromVersion: number, toVersion: number) {
      return api.get<DatasetVersionDiffResult>(
        "ai",
        `/datasets/${datasetId}/versions/${fromVersion}/diff/${toVersion}`,
      );
    },

    rollbackDatasetVersion(datasetId: string, versionNumber: number) {
      return api.post<DatasetVersionRecord>(
        "ai",
        `/datasets/${datasetId}/versions/${versionNumber}/rollback`,
        {},
      );
    },

    listDatasetRecords(datasetId: string, versionId: string, search?: string) {
      return api.get<DatasetRecordItem[]>("ai", `/datasets/${datasetId}/versions/${versionId}/records`, {
        params: search ? { search } : undefined,
      });
    },

    addDatasetRecord(
      datasetId: string,
      versionId: string,
      payload: { input: unknown; output?: unknown; metadata?: Record<string, unknown> },
    ) {
      return api.post<DatasetRecordItem>(
        "ai",
        `/datasets/${datasetId}/versions/${versionId}/records`,
        payload,
      );
    },

    bulkAddDatasetRecords(
      datasetId: string,
      versionId: string,
      records: Array<{ input: unknown; output?: unknown; metadata?: Record<string, unknown> }>,
    ) {
      return api.post<{ added: number; recordCount: number }>(
        "ai",
        `/datasets/${datasetId}/versions/${versionId}/records/bulk`,
        { records },
      );
    },

    updateDatasetRecord(
      recordId: string,
      payload: { input?: unknown; output?: unknown; metadata?: Record<string, unknown> },
    ) {
      return api.put<DatasetRecordItem>("ai", `/datasets/records/${recordId}`, payload);
    },

    deleteDatasetRecord(recordId: string) {
      return api.delete<{ deleted: boolean; recordCount: number }>("ai", `/datasets/records/${recordId}`);
    },

    batchEmbedDatasetVersion(datasetId: string, versionId: string, model?: string) {
      return api.post<DatasetEmbedResult>(
        "ai",
        `/datasets/${datasetId}/versions/${versionId}/embed`,
        model ? { model } : {},
      );
    },

    addDatasetLabel(
      recordId: string,
      payload: { labelType: string; labelValue: Record<string, unknown> },
    ) {
      return api.post<DatasetLabelRecord>("ai", `/datasets/records/${recordId}/labels`, payload);
    },

    listTrainingJobs() {
      return api.get<TrainingJobRecord[]>("ai", "/training");
    },

    getTrainingJob(id: string) {
      return api.get<TrainingJobRecord>("ai", `/training/${id}`);
    },

    createTrainingJob(payload: CreateTrainingJobInput) {
      return api.post<TrainingJobRecord>("ai", "/training", payload);
    },

    getTrainingMetrics(id: string) {
      return api.get<TrainingMetricsResponse>("ai", `/training/${id}/metrics`);
    },

    getTrainingDashboard(id: string) {
      return api.get<TrainingDashboardData>("ai", `/training/${id}/dashboard`);
    },

    listTrainingExperiments(jobId: string) {
      return api.get<ExperimentRecord[]>("ai", `/training/${jobId}/experiments`);
    },

    getTrainingExperiment(experimentId: string) {
      return api.get<ExperimentRecord>("ai", `/training/experiments/${experimentId}`);
    },

    createTrainingExperiment(
      jobId: string,
      payload: { experimentName: string; hyperparameters?: Record<string, unknown> },
    ) {
      return api.post<ExperimentRecord>("ai", `/training/${jobId}/experiments`, payload);
    },

    labelTrainingExperiment(experimentId: string, label: string | null) {
      return api.post<ExperimentRecord>("ai", `/training/experiments/${experimentId}/label`, {
        label,
      });
    },

    compareTrainingExperiments(jobId: string, experimentIds?: string[]) {
      return api.get<ExperimentComparisonResult>("ai", `/training/${jobId}/experiments/compare`, {
        params: experimentIds?.length ? { ids: experimentIds.join(",") } : undefined,
      });
    },

    listTrainingCheckpoints(jobId: string) {
      return api.get<CheckpointRecord[]>("ai", `/training/${jobId}/checkpoints`);
    },

    resumeTrainingFromCheckpoint(jobId: string, checkpointNumber: number) {
      return api.post<{ resumed: boolean; trainingJobId: string; checkpoint: CheckpointRecord }>(
        "ai",
        `/training/${jobId}/resume/${checkpointNumber}`,
        {},
      );
    },

    listRegistryModels() {
      return api.get<ModelRegistryRecord[]>("ai", "/models");
    },

    getRegistryModel(id: string) {
      return api.get<ModelRegistryRecord>("ai", `/models/${id}`);
    },

    publishRegistryModel(id: string) {
      return api.post<ModelRegistryRecord>("ai", `/models/${id}/publish`, {});
    },

    deprecateRegistryModel(id: string) {
      return api.post<ModelRegistryRecord>("ai", `/models/${id}/deprecate`, {});
    },

    runModelEvaluation(id: string, datasetId?: string) {
      return api.post<ModelEvaluationRecord>("ai", `/models/${id}/evaluate`, datasetId ? { datasetId } : {});
    },

    listModelEvaluations(id: string) {
      return api.get<ModelEvaluationRecord[]>("ai", `/models/${id}/evaluations`);
    },

    getLatestModelEvaluation(id: string) {
      return api.get<ModelEvaluationRecord | null>("ai", `/models/${id}/evaluations/latest`);
    },

    getModelPromotion(id: string) {
      return api.get<ModelPromotionStatus>("ai", `/models/${id}/promotion`);
    },

    promoteModelToStaging(id: string) {
      return api.post<ModelPromotionRecord>("ai", `/models/${id}/promote/staging`, {});
    },

    promoteModelToProduction(id: string) {
      return api.post<ModelPromotionRecord>("ai", `/models/${id}/promote/production`, {});
    },

    setModelRollout(id: string, rolloutPercentage: number) {
      return api.post<ModelPromotionRecord>("ai", `/models/${id}/rollout`, { rolloutPercentage });
    },

    autoAdjustModelCanary(id: string) {
      return api.post<ModelPromotionRecord>("ai", `/models/${id}/canary/adjust`, {});
    },

    getModelDriftSummary(id: string) {
      return api.get<DriftSummary>("ai", `/drift/models/${id}`);
    },

    listModelDriftEvents(id: string) {
      return api.get<DriftEventRecord[]>("ai", `/drift/models/${id}/events`);
    },

    listModelDriftMetrics(id: string) {
      return api.get<DriftMetricRecord[]>("ai", `/drift/models/${id}/metrics`);
    },

    runModelDriftDetection(id: string) {
      return api.post<{ modelId: string; events: DriftEventRecord[]; detectedAt: string }>(
        "ai",
        `/drift/models/${id}/run`,
        {},
      );
    },

    resolveDriftEvent(modelId: string, eventId: string, mitigationAction?: string) {
      return api.post<DriftEventRecord | null>(
        "ai",
        `/drift/models/${modelId}/events/${eventId}/resolve`,
        mitigationAction ? { mitigationAction } : {},
      );
    },

    triggerDriftRetrain(modelId: string) {
      return api.post<{ triggered: boolean; trainingJobId?: string }>(
        "ai",
        `/drift/models/${modelId}/mitigate/retrain`,
        {},
      );
    },

    rollbackDriftModel(modelId: string) {
      return api.post<{ action: string; applied: boolean }>(
        "ai",
        `/drift/models/${modelId}/mitigate/rollback`,
        {},
      );
    },

    reduceDriftRollout(modelId: string, rolloutPercentage = 10) {
      return api.post<{ action: string; applied: boolean }>(
        "ai",
        `/drift/models/${modelId}/mitigate/reduce-rollout`,
        { rolloutPercentage },
      );
    },

    startModelDeployment(payload: StartDeploymentInput) {
      return api.post<AIModelDeploymentRecord>("ai", "/deploy", payload);
    },

    getModelDeploymentStatus(modelId: string) {
      return api.get<DeploymentStatusResponse>("ai", `/deploy/${modelId}`);
    },

    rollbackModelDeployment(modelId: string) {
      return api.post<{ rolledBack: boolean; activeVersion: string | null }>(
        "ai",
        `/deploy/${modelId}/rollback`,
        {},
      );
    },

    setRegionRollout(modelId: string, region: string, rolloutPercent: number) {
      return api.post<AIModelDeploymentRecord>("ai", `/deploy/${modelId}/regions/${region}/rollout`, {
        rolloutPercent,
      });
    },

    getDeploymentMetrics(modelId: string, version?: string) {
      return api.get<DeploymentMetricsSummary>("ai", `/deploy/${modelId}/metrics`, {
        params: version ? { version } : undefined,
      });
    },

    listFeatureFlags() {
      return api.get<FeatureFlagRecord[]>("ai", "/flags");
    },

    evaluateFeatureFlags(keys: string[], userId?: string) {
      return api.get<FlagEvaluationResult[]>("ai", "/flags/evaluate", {
        params: { keys: keys.join(","), userId },
      });
    },

    createFeatureFlag(payload: {
      key: string;
      type: "BOOLEAN" | "PERCENTAGE" | "VARIANT";
      variants?: FlagVariant[];
      rollout?: Record<string, unknown>;
      isActive?: boolean;
    }) {
      return api.post<FeatureFlagRecord>("ai", "/flags", payload);
    },

    updateFeatureFlag(id: string, payload: Partial<{
      type: "BOOLEAN" | "PERCENTAGE" | "VARIANT";
      variants: FlagVariant[];
      rollout: Record<string, unknown>;
      isActive: boolean;
    }>) {
      return api.put<FeatureFlagRecord>("ai", `/flags/${id}`, payload);
    },

    updateFeatureFlagRollout(id: string, rollout: Record<string, unknown>) {
      return api.post<FeatureFlagRecord>("ai", `/flags/${id}/rollout`, { rollout });
    },

    listAbExperiments() {
      return api.get<AbExperimentRecord[]>("ai", "/experiments");
    },

    getAbExperiment(id: string) {
      return api.get<AbExperimentRecord | null>("ai", `/experiments/${id}`);
    },

    createAbExperiment(payload: {
      name: string;
      description?: string;
      variants?: ExperimentVariant[];
      targetAudience?: Record<string, unknown>;
      metricsTracked?: string[];
      experimentType?: string;
      modelKey?: string;
    }) {
      return api.post<AbExperimentRecord>("ai", "/experiments", payload);
    },

    startAbExperiment(id: string) {
      return api.post<AbExperimentRecord>("ai", `/experiments/${id}/start`, {});
    },

    pauseAbExperiment(id: string) {
      return api.post<AbExperimentRecord>("ai", `/experiments/${id}/pause`, {});
    },

    completeAbExperiment(id: string) {
      return api.post<AbExperimentRecord>("ai", `/experiments/${id}/complete`, {});
    },

    getAbExperimentResults(id: string) {
      return api.get<ExperimentReport>("ai", `/experiments/${id}/results`);
    },

    assignAbExperiment(id: string, userId?: string) {
      return api.post<{ variant: string; assigned: boolean }>("ai", `/experiments/${id}/assign`, { userId });
    },

    recordAbExperimentEvent(id: string, eventType: string, payload?: Record<string, unknown>, userId?: string) {
      return api.post<{ recorded: boolean; variant: string; eventType: string }>(
        "ai",
        `/experiments/${id}/events`,
        { eventType, userId, payload },
      );
    },

    listGatewayKeys() {
      return api.get<GatewayKeyRecord[]>("ai", "/gateway/keys");
    },

    createGatewayKey(payload: {
      name: string;
      scopes: GatewayScope[];
      rateLimitProfileId?: string;
      budgetProfileId?: string;
    }) {
      return api.post<GatewayKeyCreateResult>("ai", "/gateway/keys", payload);
    },

    updateGatewayKey(id: string, payload: Partial<{
      name: string;
      scopes: GatewayScope[];
      isActive: boolean;
      rateLimitProfileId: string | null;
    }>) {
      return api.put<GatewayKeyRecord>("ai", `/gateway/keys/${id}`, payload);
    },

    revokeGatewayKey(id: string) {
      return api.post<GatewayKeyRecord>("ai", `/gateway/keys/${id}/revoke`, {});
    },

    rotateGatewayKey(id: string) {
      return api.post<GatewayKeyCreateResult>("ai", `/gateway/keys/${id}/rotate`, {});
    },

    getGatewayUsageSummary() {
      return api.get<GatewayUsageSummary>("ai", "/gateway/usage");
    },

    getGatewayUsageByModel() {
      return api.get<GatewayUsageSummary["topModels"]>("ai", "/gateway/usage/models");
    },

    getGatewayUsageByKey() {
      return api.get<GatewayUsageByKey[]>("ai", "/gateway/usage/keys");
    },

    listGatewayRateLimits() {
      return api.get<RateLimitRecord[]>("ai", "/gateway/limits/rate");
    },

    upsertGatewayRateLimit(payload: {
      name: string;
      requestsPerMinute?: number;
      requestsPerHour?: number;
      requestsPerDay?: number;
      tokensPerMinute?: number;
      tokensPerDay?: number;
      burstLimit?: number;
    }) {
      return api.put<RateLimitRecord>("ai", "/gateway/limits/rate", payload);
    },

    getGatewayBudget() {
      return api.get<BudgetRecord>("ai", "/gateway/limits/budget");
    },

    updateGatewayBudget(payload: {
      monthlyTokenBudget?: number;
      monthlyCostBudget?: number;
      softLimitPercentage?: number;
      hardLimitPercentage?: number;
    }) {
      return api.put<BudgetRecord>("ai", "/gateway/limits/budget", payload);
    },

    getGatewayKeyRateUsage(keyId: string) {
      return api.get<RateLimitUsageSnapshot>("ai", `/gateway/limits/usage/${keyId}`);
    },

    getCostSummary(period?: CostPeriod) {
      return api.get<CostUsageSummary>("ai", "/cost/summary", { params: period ? { period } : undefined });
    },

    getCostByModel(period?: CostPeriod) {
      return api.get<CostByModel[]>("ai", "/cost/models", { params: period ? { period } : undefined });
    },

    getCostByFeature(period?: CostPeriod) {
      return api.get<CostByFeature[]>("ai", "/cost/features", { params: period ? { period } : undefined });
    },

    getCostTrends(period?: CostPeriod, limit?: number) {
      return api.get<CostTrendPoint[]>("ai", "/cost/trends", {
        params: { ...(period ? { period } : {}), ...(limit ? { limit } : {}) },
      });
    },

    getCostBudget() {
      return api.get<CostBudgetStatus>("ai", "/cost/budget");
    },

    updateCostBudget(payload: {
      monthlyTokenBudget?: number;
      monthlyCostBudget?: number;
      softLimitPercentage?: number;
      hardLimitPercentage?: number;
    }) {
      return api.put<CostBudgetStatus>("ai", "/cost/budget", payload);
    },

    listCostAlerts(unresolvedOnly = false) {
      return api.get<CostAlertRecord[]>("ai", "/cost/alerts", {
        params: unresolvedOnly ? { unresolved: "true" } : undefined,
      });
    },

    resolveCostAlert(id: string) {
      return api.post<{ resolved: boolean; alertId: string }>("ai", `/cost/alerts/${id}/resolve`, {});
    },

    getCostOptimization() {
      return api.get<OptimizationReport>("ai", "/cost/optimization");
    },

    searchAuditLogs(filters?: {
      action?: AuditAction;
      modelId?: string;
      userId?: string;
      piiDetected?: boolean;
      since?: string;
    }) {
      return api.get<AuditLogRecord[]>("ai", "/security/audit", {
        params: {
          ...filters,
          piiDetected: filters?.piiDetected === undefined ? undefined : String(filters.piiDetected),
        },
      });
    },

    exportAuditLogs() {
      return api.get<{ count: number; logs: AuditLogRecord[] }>("ai", "/security/audit/export");
    },

    exportComplianceReport() {
      return api.get<ComplianceExport>("ai", "/security/compliance/export");
    },

    listAccessPolicies() {
      return api.get<AccessPolicyRecord[]>("ai", "/security/policies");
    },

    assignAccessPolicy(payload: { modelId: string; allowedRoles: string[]; allowedUsers?: string[] }) {
      return api.post<AccessPolicyRecord>("ai", "/security/policies", payload);
    },

    revokeAccessPolicy(id: string) {
      return api.delete<{ revoked: boolean; policyId: string }>("ai", `/security/policies/${id}`);
    },

    listPiiIncidents(unresolvedOnly = false) {
      return api.get<PIIIncidentRecord[]>("ai", "/security/pii/incidents", {
        params: unresolvedOnly ? { unresolved: "true" } : undefined,
      });
    },

    resolvePiiIncident(id: string) {
      return api.post<{ resolved: boolean; id: string }>("ai", `/security/pii/resolve/${id}`, {});
    },

    getObservabilityDashboard() {
      return api.get<ObservabilityDashboard>("ai", "/observability/dashboard");
    },

    getPipelineView() {
      return api.get<PipelineView>("ai", "/observability/pipeline");
    },

    searchTraces(filters?: { service?: TraceService; status?: TraceStatus; since?: string }) {
      return api.get<TraceSpanRecord[]>("ai", "/observability/traces", { params: filters });
    },

    getTrace(traceId: string) {
      return api.get<TraceDetail>("ai", `/observability/traces/${traceId}`);
    },

    getObservabilityLogs(filters?: { service?: TraceService; level?: LogLevel; since?: string }) {
      return api.get<LogEventRecord[]>("ai", "/observability/logs", { params: filters });
    },

    exportObservabilityLogs() {
      return api.get<{ count: number; logs: LogEventRecord[]; exportedAt: string }>("ai", "/observability/logs/export");
    },

    getObservabilityMetrics(metricType?: MetricType, since?: string) {
      return api.get<MetricAggregate>("ai", "/observability/metrics", {
        params: { metricType, since },
      });
    },

    getLatencyHeatmap(since?: string) {
      return api.get<HeatmapData>("ai", "/observability/metrics/heatmap/latency", { params: { since } });
    },

    getErrorHeatmap(since?: string) {
      return api.get<HeatmapData>("ai", "/observability/metrics/heatmap/error-rate", { params: { since } });
    },

    listBottleneckAlerts() {
      return api.get<BottleneckAlert[]>("ai", "/observability/bottlenecks");
    },

    detectBottlenecks() {
      return api.post<{ count: number; alerts: BottleneckAlert[] }>("ai", "/observability/bottlenecks/detect", {});
    },

    resolveBottleneck(id: string) {
      return api.post<{ resolved: boolean; id: string }>("ai", `/observability/bottlenecks/resolve/${id}`, {});
    },

    listAgents() {
      return api.get<AgentRecord[]>("ai", "/agents");
    },

    getAgent(id: string) {
      return api.get<AgentRecord>("ai", `/agents/${id}`);
    },

    createAgent(payload: CreateAgentInput) {
      return api.post<AgentRecord>("ai", "/agents", payload);
    },

    listAgentRuns(agentId: string) {
      return api.get<AgentRunRecord[]>("ai", `/agents/${agentId}/runs`);
    },

    runConfiguredAgent(agentId: string, input: string) {
      return api.post<AgentRunRecord>("ai", `/agents/${agentId}/run`, { input });
    },

    listAgentTools() {
      return api.get<AgentToolRecord[]>("ai", "/agents/tools");
    },

    registerAgentTool(payload: CreateToolInput) {
      return api.post<AgentToolRecord>("ai", "/agents/tools", payload);
    },

    updateAgentTool(id: string, payload: Partial<CreateToolInput>) {
      return api.put<AgentToolRecord>("ai", `/agents/tools/${id}`, payload);
    },

    deleteAgentTool(id: string) {
      return api.delete<{ deleted: boolean; id: string }>("ai", `/agents/tools/${id}`);
    },
  };
}
