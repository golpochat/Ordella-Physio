import { Injectable, Logger } from "@nestjs/common";
import { NotificationProviderHttpClient } from "@ordella/shared";
import { DomainContextClient } from "@/integrations/domain-context.client";
import { GuardrailService } from "@/services/guardrail.service";
import { InferenceService } from "@/services/inference.service";
import { aiValidationError } from "@/utils/ai-errors";

type AgentToolResult = {
  tool: string;
  success: boolean;
  output: unknown;
};

@Injectable()
export class AgentService {
  private readonly logger = new Logger(AgentService.name);
  private readonly notificationClient = new NotificationProviderHttpClient({
    logger: new Logger("AgentNotificationClient"),
  });

  private readonly taskLog: Array<{
    tenantId: string;
    title: string;
    dueDate: string | null;
    createdAt: string;
  }> = [];

  constructor(
    private readonly domainContextClient: DomainContextClient,
    private readonly inferenceService: InferenceService,
    private readonly guardrailService: GuardrailService,
  ) {}

  async runMultiStep(
    tenantId: string,
    input: {
      request: string;
      patientId?: string;
      invoiceId?: string;
      steps?: string[];
    },
  ) {
    const stepLabels = input.steps?.length
      ? input.steps
      : ["Analyze request", "Execute tools", "Summarize response"];

    const stepResults: Array<{ step: string; output: unknown }> = [];
    let lastResult: {
      response: string;
      tools: AgentToolResult[];
      suggestedActions: string[];
      meta: { provider: string; latencyMs: number };
    } | null = null;

    for (const step of stepLabels) {
      if (step.toLowerCase().includes("tool") || step.toLowerCase().includes("execute")) {
        lastResult = await this.run(tenantId, {
          request: input.request,
          patientId: input.patientId,
          invoiceId: input.invoiceId,
        });
        stepResults.push({ step, output: lastResult.tools });
        continue;
      }

      if (step.toLowerCase().includes("summarize") && lastResult) {
        stepResults.push({ step, output: lastResult.response });
        continue;
      }

      const analysis = await this.inferenceService.runTextCompletion(
        {
          task: "AGENT_STEP",
          prompt: `Step: ${step}\nRequest: ${input.request}\nProvide operational analysis only.`,
          maxTokens: 200,
        },
        tenantId,
      );
      stepResults.push({
        step,
        output: this.guardrailService.sanitizeOutput(analysis.text),
      });
    }

    if (!lastResult) {
      lastResult = await this.run(tenantId, input);
    }

    return {
      ...lastResult,
      steps: stepResults,
    };
  }

  async run(tenantId: string, input: { request: string; patientId?: string; invoiceId?: string }) {
    const request = input.request?.trim();
    if (!request) {
      throw aiValidationError([{ field: "request", message: "request is required." }]);
    }

    this.guardrailService.enforceAllowedContent(request);
    const scrubbedRequest = this.guardrailService.scrubPII(request);
    const toolResults: AgentToolResult[] = [];
    const lower = scrubbedRequest.toLowerCase();

    if (/search|find patient|lookup/i.test(lower)) {
      const query = extractQuery(scrubbedRequest) ?? "patient";
      const ids = await this.searchPatients(tenantId, query);
      toolResults.push({ tool: "searchPatients", success: true, output: { ids } });
    }

    if (input.patientId || /history|patient/i.test(lower)) {
      const patientId = input.patientId ?? toolResults[0]?.output
        ? ((toolResults[0]?.output as { ids?: string[] }).ids?.[0] ?? "")
        : "";
      if (patientId) {
        const history = await this.fetchPatientHistory(tenantId, patientId);
        toolResults.push({ tool: "fetchPatientHistory", success: Boolean(history), output: history });
      }
    }

    if (input.invoiceId || /invoice|bill/i.test(lower)) {
      const invoiceId = input.invoiceId ?? "";
      if (invoiceId) {
        const invoice = await this.fetchInvoice(tenantId, invoiceId);
        toolResults.push({ tool: "fetchInvoice", success: Boolean(invoice), output: invoice });
      }
    }

    if (/remind|notification|send/i.test(lower)) {
      const notification = await this.sendNotification(tenantId, {
        to: "patient@clinic.local",
        templateId: "APPOINTMENT_REMINDER",
        variables: { message: scrubbedRequest },
      });
      toolResults.push({ tool: "sendNotification", success: true, output: notification });
    }

    if (/task|follow-up|todo/i.test(lower)) {
      const task = await this.createTask(tenantId, {
        title: scrubbedRequest.slice(0, 120),
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      });
      toolResults.push({ tool: "createTask", success: true, output: task });
    }

    const completion = await this.inferenceService.runTextCompletion(
      {
        task: "AGENT",
        prompt: `User request: ${scrubbedRequest}\nTool results: ${JSON.stringify(toolResults)}\nProvide a concise operational response and suggested next actions. Do not provide medical diagnosis.`,
        maxTokens: 400,
      },
      tenantId,
    );

    const response = this.guardrailService.sanitizeOutput(completion.text);

    return {
      response,
      tools: toolResults,
      suggestedActions: buildSuggestedActions(toolResults),
      meta: {
        provider: completion.provider,
        latencyMs: completion.latencyMs,
      },
    };
  }

  searchPatients(tenantId: string, query: string) {
    return this.domainContextClient.searchPatients(tenantId, query);
  }

  createTask(tenantId: string, input: { title: string; dueDate?: string | null }) {
    const task = {
      tenantId,
      title: input.title,
      dueDate: input.dueDate ?? null,
      createdAt: new Date().toISOString(),
    };
    this.taskLog.push(task);
    return task;
  }

  async sendNotification(
    tenantId: string,
    input: { to: string; templateId: string; variables?: Record<string, string> },
  ) {
    try {
      return await this.notificationClient.queueDelivery(tenantId, {
        channel: "EMAIL",
        to: input.to,
        templateId: input.templateId,
        variables: input.variables,
      });
    } catch (error) {
      this.logger.warn("Agent notification failed", error);
      return { queued: false, message: "Notification queue failed." };
    }
  }

  fetchPatientHistory(tenantId: string, patientId: string) {
    return this.domainContextClient.fetchPatientHistory(tenantId, patientId);
  }

  fetchInvoice(tenantId: string, invoiceId: string) {
    return this.domainContextClient.fetchInvoice(tenantId, invoiceId);
  }
}

function extractQuery(request: string) {
  const match = request.match(/(?:search|find|lookup)\s+(?:for\s+)?(.+)/i);
  return match?.[1]?.trim();
}

function buildSuggestedActions(toolResults: AgentToolResult[]) {
  const actions: string[] = [];
  if (toolResults.some((result) => result.tool === "sendNotification")) {
    actions.push("Send reminder");
  }
  if (toolResults.some((result) => result.tool === "createTask")) {
    actions.push("Create task");
  }
  if (toolResults.some((result) => result.tool === "fetchPatientHistory")) {
    actions.push("Schedule follow-up");
  }
  return actions;
}
