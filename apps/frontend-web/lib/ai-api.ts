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

    getCopilotMemory() {
      return api.get<Array<{ key: string; value: unknown; updatedAt: string }>>("ai", "/copilot/memory");
    },
  };
}
