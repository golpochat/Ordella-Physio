import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { AgentController } from "@/controllers/agent.controller";
import { CopilotController } from "@/controllers/copilot.controller";
import { HealthController } from "@/controllers/health.controller";
import { InferenceController } from "@/controllers/inference.controller";
import { InsightsController } from "@/controllers/insights.controller";
import { ProviderController } from "@/controllers/provider.controller";
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
import { AiWorkflowRunRepository } from "@/repositories/ai-workflow-run.repository";
import { AgentService } from "@/services/agent.service";
import { AiMemoryService } from "@/services/ai-memory.service";
import { AiRateLimitService } from "@/services/ai-rate-limit.service";
import { CopilotService } from "@/services/copilot.service";
import { PredictiveAnalyticsService } from "@/services/predictive-analytics.service";
import { StreamingAgentService } from "@/services/streaming-agent.service";
import { WorkflowOrchestratorService } from "@/services/workflow-orchestrator.service";
import { AiTaskRegistryService } from "@/services/ai-task-registry.service";
import { GuardrailService } from "@/services/guardrail.service";
import { InferenceService } from "@/services/inference.service";
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
    ProviderController,
    InsightsController,
    AgentController,
    CopilotController,
  ],
  providers: [
    InferenceService,
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
    WorkflowOrchestratorService,
    CopilotService,
    DomainContextClient,
    AiMemoryRepository,
    AiWorkflowRunRepository,
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
