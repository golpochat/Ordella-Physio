import { Injectable } from "@nestjs/common";
import { DomainContextClient } from "@/integrations/domain-context.client";
import { AgentService } from "@/services/agent.service";
import { AiMemoryService } from "@/services/ai-memory.service";
import { GuardrailService } from "@/services/guardrail.service";
import { InsightsService } from "@/services/insights.service";
import { PredictiveAnalyticsService } from "@/services/predictive-analytics.service";
import { WorkflowOrchestratorService, type WorkflowTrigger } from "@/services/workflow-orchestrator.service";
import { aiValidationError } from "@/utils/ai-errors";

export type CopilotEntityType = "patient" | "appointment" | "invoice" | "report";

@Injectable()
export class CopilotService {
  constructor(
    private readonly domainContextClient: DomainContextClient,
    private readonly insightsService: InsightsService,
    private readonly predictiveAnalyticsService: PredictiveAnalyticsService,
    private readonly agentService: AgentService,
    private readonly memoryService: AiMemoryService,
    private readonly workflowOrchestrator: WorkflowOrchestratorService,
    private readonly guardrailService: GuardrailService,
  ) {}

  async runCopilot(input: {
    tenantId: string;
    entityType?: CopilotEntityType;
    entityId?: string;
    query: string;
  }) {
    const query = input.query?.trim();
    if (!query) {
      throw aiValidationError([{ field: "query", message: "query is required." }]);
    }

    this.guardrailService.enforceAllowedContent(query);
    const scrubbedQuery = this.guardrailService.scrubPII(query);

    const entityType = input.entityType;
    const entityId = input.entityId;

    const [entityContext, entityMemory, recentInteractions] = await Promise.all([
      this.loadEntityContext(input.tenantId, entityType, entityId),
      entityType && entityId
        ? this.memoryService.getEntityMemory(input.tenantId, entityType, entityId)
        : Promise.resolve([]),
      this.memoryService.getRecentInteractions(input.tenantId, 6),
    ]);

    const predictions = await this.loadPredictions(input.tenantId, entityType, entityId);
    const summary = await this.loadSummary(input.tenantId, entityType, entityId);

    const agentResult = await this.agentService.run(input.tenantId, {
      request: `${scrubbedQuery}\nEntity context: ${JSON.stringify(entityContext)}\nMemory: ${this.memoryService.buildContextWindow(entityMemory)}`,
      patientId: entityType === "patient" ? entityId : extractPatientId(entityContext),
      invoiceId: entityType === "invoice" ? entityId : undefined,
    });

    const workflows = this.suggestWorkflows(entityType, entityContext, predictions);

    await this.memoryService.saveInteraction(input.tenantId, {
      query: scrubbedQuery,
      response: agentResult.response,
      entityType,
      entityId,
    });

    if (entityType && entityId) {
      await this.memoryService.saveMemory(
        input.tenantId,
        `entity:${entityType}:${entityId}:last`,
        { query: scrubbedQuery, response: agentResult.response, predictions },
        { entityType, entityId },
      );
    }

    return {
      response: agentResult.response,
      summary: summary?.text ?? null,
      insights: summary?.insights ?? [],
      predictions,
      suggestedActions: [...new Set([...agentResult.suggestedActions, ...workflows.map((w) => w.label)])],
      workflows,
      tools: agentResult.tools,
      memory: {
        recentInteractions: recentInteractions.length,
        entityMemory: entityMemory.length,
      },
      meta: agentResult.meta,
    };
  }

  async executeWorkflow(
    tenantId: string,
    trigger: WorkflowTrigger,
    context: { patientId?: string; invoiceId?: string; appointmentId?: string },
  ) {
    return this.workflowOrchestrator.execute(tenantId, trigger, context);
  }

  private async loadEntityContext(
    tenantId: string,
    entityType?: CopilotEntityType,
    entityId?: string,
  ) {
    if (!entityType || !entityId) {
      return null;
    }

    if (entityType === "patient") {
      return this.domainContextClient.fetchPatientContext(tenantId, entityId);
    }
    if (entityType === "appointment") {
      return this.domainContextClient.fetchAppointmentContext(tenantId, entityId);
    }
    if (entityType === "invoice") {
      return this.domainContextClient.fetchInvoiceContext(tenantId, entityId);
    }

    return null;
  }

  private async loadPredictions(
    tenantId: string,
    entityType?: CopilotEntityType,
    entityId?: string,
  ) {
    if (!entityType || !entityId) {
      return [];
    }

    try {
      if (entityType === "patient") {
        const [engagement, risk] = await Promise.all([
          this.predictiveAnalyticsService.predictEngagement(tenantId, entityId),
          this.predictiveAnalyticsService.predictOperationalRisk(tenantId, entityId),
        ]);
        return [engagement, risk];
      }
      if (entityType === "appointment") {
        return [await this.predictiveAnalyticsService.predictNoShow(tenantId, entityId)];
      }
      if (entityType === "invoice") {
        return [await this.predictiveAnalyticsService.predictLatePayment(tenantId, entityId)];
      }
    } catch {
      return [];
    }

    return [];
  }

  private async loadSummary(
    tenantId: string,
    entityType?: CopilotEntityType,
    entityId?: string,
  ): Promise<{ text: string; insights: string[] } | null> {
    if (!entityType || !entityId) {
      return null;
    }

    try {
      if (entityType === "patient") {
        const result = await this.insightsService.getPatientInsights(tenantId, entityId);
        return {
          text: result.summary,
          insights: [...result.keyConcerns, ...result.recommendedNextSteps],
        };
      }
      if (entityType === "appointment") {
        const result = await this.insightsService.getAppointmentInsights(tenantId, entityId);
        return {
          text: result.visitSummary,
          insights: [...result.flags, ...result.followUpActions],
        };
      }
      if (entityType === "invoice") {
        const result = await this.insightsService.getInvoiceInsights(tenantId, entityId);
        return {
          text: result.explanation,
          insights: [...result.anomalies, ...result.suggestedActions],
        };
      }
    } catch {
      return null;
    }

    return null;
  }

  private suggestWorkflows(
    entityType: CopilotEntityType | undefined,
    context: unknown,
    predictions: Array<{ predictionType: string; score: number }>,
  ) {
    const workflows: Array<{ trigger: WorkflowTrigger; label: string }> = [];

    if (entityType === "appointment") {
      const appointment = (context as { appointment?: { status?: string } })?.appointment;
      if (appointment?.status === "NO_SHOW") {
        workflows.push({ trigger: "APPOINTMENT_MISSED", label: "Run missed appointment workflow" });
      }
    }

    if (entityType === "invoice") {
      const invoice = (context as { invoice?: { status?: string } })?.invoice;
      if (invoice?.status === "OVERDUE") {
        workflows.push({ trigger: "INVOICE_OVERDUE", label: "Run overdue invoice workflow" });
      }
    }

    const highRisk = predictions.find(
      (prediction) =>
        prediction.predictionType === "OPERATIONAL_RISK" && prediction.score >= 70,
    );
    if (entityType === "patient" && highRisk) {
      workflows.push({ trigger: "PATIENT_INACTIVE", label: "Run patient reactivation workflow" });
    }

    return workflows;
  }
}

function extractPatientId(context: unknown) {
  if (!context || typeof context !== "object") {
    return undefined;
  }

  const record = context as Record<string, unknown>;
  if (typeof record.patientId === "string") {
    return record.patientId;
  }

  const demographics = record.demographics as Record<string, unknown> | undefined;
  if (typeof demographics?.id === "string") {
    return demographics.id;
  }

  const appointment = record.appointment as Record<string, unknown> | undefined;
  if (typeof appointment?.patientId === "string") {
    return appointment.patientId;
  }

  const invoice = record.invoice as Record<string, unknown> | undefined;
  if (typeof invoice?.patientId === "string") {
    return invoice.patientId;
  }

  return undefined;
}
