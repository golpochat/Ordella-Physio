import { Injectable } from "@nestjs/common";
import { DomainContextClient } from "@/integrations/domain-context.client";
import { InferenceService } from "@/services/inference.service";
import { PromptTemplateService } from "@/services/prompt-template.service";
import { GuardrailService } from "@/services/guardrail.service";
import { AiTaskRegistryService } from "@/services/ai-task-registry.service";
import { aiProviderNotFoundError } from "@/utils/ai-errors";

@Injectable()
export class PatientSummaryPipeline {
  constructor(
    private readonly domainContextClient: DomainContextClient,
    private readonly inferenceService: InferenceService,
    private readonly promptTemplateService: PromptTemplateService,
    private readonly guardrailService: GuardrailService,
    private readonly taskRegistry: AiTaskRegistryService,
  ) {}

  async run(tenantId: string, patientId: string) {
    const context = await this.domainContextClient.fetchPatientContext(tenantId, patientId);
    if (!context) {
      throw aiProviderNotFoundError("Patient not found.");
    }

    const summaryTask = this.taskRegistry.getTask("PATIENT_SUMMARY");
    const prompt = this.promptTemplateService.renderTemplate(summaryTask.template, {
      demographics: JSON.stringify(context.demographics),
      appointments: JSON.stringify(context.appointmentHistory),
      tags: JSON.stringify(context.tags),
      notes: JSON.stringify(context.medicalNotes),
    });

    const summaryResult = await this.inferenceService.runStructuredOutput(
      {
        task: "PATIENT_SUMMARY",
        prompt,
        schema: summaryTask.outputSchema,
        maxTokens: 500,
      },
      tenantId,
    );

    const riskTask = this.taskRegistry.getTask("RISK_SCORE");
    const riskPrompt = this.promptTemplateService.renderTemplate(riskTask.template, {
      context: JSON.stringify(context),
    });

    const riskResult = await this.inferenceService.runStructuredOutput(
      {
        task: "RISK_SCORE",
        prompt: riskPrompt,
        schema: riskTask.outputSchema,
        maxTokens: 300,
      },
      tenantId,
    );

    const summary = this.guardrailService.sanitizeStructured(
      summaryResult.data as Record<string, unknown>,
    );
    const risk = this.guardrailService.sanitizeStructured(
      riskResult.data as Record<string, unknown>,
    );

    return {
      summary: String(summary.summary ?? ""),
      keyConcerns: (summary.keyConcerns as string[]) ?? [],
      recommendedNextSteps: (summary.recommendedNextSteps as string[]) ?? [],
      riskScore: {
        score: Number(risk.riskScore ?? 0),
        level: String(risk.riskLevel ?? "LOW"),
        factors: (risk.factors as string[]) ?? [],
      },
      meta: {
        provider: summaryResult.provider,
        latencyMs: summaryResult.latencyMs + riskResult.latencyMs,
      },
    };
  }
}
