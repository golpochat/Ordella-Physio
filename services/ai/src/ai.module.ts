import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { AgentController } from "@/controllers/agent.controller";
import { CopilotController } from "@/controllers/copilot.controller";
import { HealthController } from "@/controllers/health.controller";
import { InferenceController } from "@/controllers/inference.controller";
import { InferenceRoutingController } from "@/controllers/inference-routing.controller";
import { InferenceStatsController } from "@/controllers/inference-stats.controller";
import { InsightsController } from "@/controllers/insights.controller";
import { ProviderController } from "@/controllers/provider.controller";
import { WorkflowController } from "@/controllers/workflow.controller";
import { WorkflowVersionController } from "@/controllers/workflow-version.controller";
import { WorkflowMonitorController } from "@/controllers/workflow-monitor.controller";
import { DatasetController } from "@/controllers/dataset.controller";
import { DatasetVersionController } from "@/controllers/dataset-version.controller";
import { DatasetRecordController } from "@/controllers/dataset-record.controller";
import { JwtGuard } from "@/guards/jwt.guard";
import { DomainContextClient } from "@/integrations/domain-context.client";
import { AppointmentInsightPipeline } from "@/pipelines/appointment-insight.pipeline";
import { InvoiceExplanationPipeline } from "@/pipelines/invoice-explanation.pipeline";
import { PatientSummaryPipeline } from "@/pipelines/patient-summary.pipeline";
import { ReportSummaryPipeline } from "@/pipelines/report-summary.pipeline";
import { AIProviderConfigRepository } from "@/repositories/ai-provider-config.repository";
import { AIRequestLogRepository } from "@/repositories/ai-request-log.repository";
import { AiMemoryRepository } from "@/repositories/ai-memory.repository";
import { AiStreamSessionRepository } from "@/repositories/ai-stream-session.repository";
import { AiWorkflowRepository } from "@/repositories/ai-workflow.repository";
import { AiWorkflowVersionRepository } from "@/repositories/ai-workflow-version.repository";
import { AiWorkflowLiveEventRepository } from "@/repositories/ai-workflow-live-event.repository";
import { AiWorkflowRunRepository } from "@/repositories/ai-workflow-run.repository";
import {
  AiDatasetAuditRepository,
  AiDatasetLabelRepository,
  AiDatasetRecordRepository,
  AiDatasetRepository,
  AiDatasetVersionRepository,
} from "@/repositories/ai-dataset.repository";
import { AgentService } from "@/services/agent.service";
import { AiMemoryService } from "@/services/ai-memory.service";
import { AiRateLimitService } from "@/services/ai-rate-limit.service";
import { CopilotService } from "@/services/copilot.service";
import { PredictiveAnalyticsService } from "@/services/predictive-analytics.service";
import { StreamingAgentService } from "@/services/streaming-agent.service";
import { WorkflowManagementService } from "@/services/workflow-management.service";
import { WorkflowVersionService } from "@/services/workflow-version.service";
import { WorkflowMonitorService } from "@/services/workflow-monitor.service";
import { WorkflowOrchestratorService } from "@/services/workflow-orchestrator.service";
import { DatasetService } from "@/services/dataset.service";
import { DatasetVersionService } from "@/services/dataset-version.service";
import { DatasetRecordService } from "@/services/dataset-record.service";
import { DatasetEmbeddingService } from "@/services/dataset-embedding.service";
import { DatasetGovernanceService } from "@/services/dataset-governance.service";
import { AiTaskRegistryService } from "@/services/ai-task-registry.service";
import { GuardrailService } from "@/services/guardrail.service";
import { InferenceRouterService } from "@/services/inference-router.service";
import { InferenceService } from "@/services/inference.service";
import { InferenceLoggerService } from "@/services/inference-logger.service";
import { InsightsService } from "@/services/insights.service";
import { PromptTemplateService } from "@/services/prompt-template.service";
import { ProviderConfigService } from "@/services/provider-config.service";
import { ProviderRegistryService } from "@/services/provider-registry.service";
import { AnthropicProvider } from "@/services/providers/anthropic.provider";
import { AzureOpenAIProvider } from "@/services/providers/azure-openai.provider";
import { LocalLlmProvider } from "@/services/providers/local-llm.provider";
import { OpenAIProvider } from "@/services/providers/openai.provider";
import { JwtStrategy } from "@/strategies/jwt.strategy";

@Module({
  imports: [PassportModule.register({ defaultStrategy: "jwt" })],
  controllers: [
    HealthController,
    InferenceController,
    InferenceRoutingController,
    InferenceStatsController,
    ProviderController,
    WorkflowController,
    WorkflowVersionController,
    WorkflowMonitorController,
    DatasetController,
    DatasetVersionController,
    DatasetRecordController,
    InsightsController,
    AgentController,
    CopilotController,
  ],
  providers: [
    InferenceService,
    InferenceRouterService,
    InferenceLoggerService,
    ProviderConfigService,
    ProviderRegistryService,
    PromptTemplateService,
    AiTaskRegistryService,
    GuardrailService,
    InsightsService,
    AgentService,
    AiMemoryService,
    AiRateLimitService,
    PredictiveAnalyticsService,
    StreamingAgentService,
    WorkflowManagementService,
    WorkflowVersionService,
    WorkflowMonitorService,
    WorkflowOrchestratorService,
    DatasetService,
    DatasetVersionService,
    DatasetRecordService,
    DatasetEmbeddingService,
    DatasetGovernanceService,
    CopilotService,
    DomainContextClient,
    AiMemoryRepository,
    AiWorkflowRepository,
    AiWorkflowVersionRepository,
    AiWorkflowLiveEventRepository,
    AiWorkflowRunRepository,
    AiDatasetRepository,
    AiDatasetVersionRepository,
    AiDatasetRecordRepository,
    AiDatasetLabelRepository,
    AiDatasetAuditRepository,
    AiStreamSessionRepository,
    PatientSummaryPipeline,
    AppointmentInsightPipeline,
    InvoiceExplanationPipeline,
    ReportSummaryPipeline,
    OpenAIProvider,
    AzureOpenAIProvider,
    AnthropicProvider,
    LocalLlmProvider,
    AIProviderConfigRepository,
    AIRequestLogRepository,
    JwtStrategy,
    JwtGuard,
  ],
  exports: [
    InferenceService,
    ProviderConfigService,
    InsightsService,
    AgentService,
    CopilotService,
    AiMemoryService,
    WorkflowOrchestratorService,
  ],
})
export class AiModule {}
