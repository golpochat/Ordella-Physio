import { Injectable } from "@nestjs/common";
import { DomainContextClient } from "@/integrations/domain-context.client";
import { InferenceService } from "@/services/inference.service";
import { PromptTemplateService } from "@/services/prompt-template.service";
import { GuardrailService } from "@/services/guardrail.service";
import { AiTaskRegistryService } from "@/services/ai-task-registry.service";
import { aiProviderNotFoundError } from "@/utils/ai-errors";

@Injectable()
export class AppointmentInsightPipeline {
  constructor(
    private readonly domainContextClient: DomainContextClient,
    private readonly inferenceService: InferenceService,
    private readonly promptTemplateService: PromptTemplateService,
    private readonly guardrailService: GuardrailService,
    private readonly taskRegistry: AiTaskRegistryService,
  ) {}

  async run(tenantId: string, appointmentId: string) {
    const context = await this.domainContextClient.fetchAppointmentContext(tenantId, appointmentId);
    if (!context) {
      throw aiProviderNotFoundError("Appointment not found.");
    }

    const task = this.taskRegistry.getTask("APPOINTMENT_INSIGHTS");
    const prompt = this.promptTemplateService.renderTemplate(task.template, {
      appointment: JSON.stringify(context.appointment),
      notes: JSON.stringify(context.providerNotes),
      history: JSON.stringify(context.patientHistory),
    });

    const result = await this.inferenceService.runStructuredOutput(
      {
        task: "APPOINTMENT_INSIGHTS",
        prompt,
        schema: task.outputSchema,
        maxTokens: 500,
      },
      tenantId,
    );

    const data = this.guardrailService.sanitizeStructured(result.data as Record<string, unknown>);

    return {
      visitSummary: String(data.visitSummary ?? ""),
      followUpActions: (data.followUpActions as string[]) ?? [],
      flags: (data.flags as string[]) ?? [],
      meta: {
        provider: result.provider,
        latencyMs: result.latencyMs,
      },
    };
  }
}
