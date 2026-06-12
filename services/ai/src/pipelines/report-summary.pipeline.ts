import { Injectable } from "@nestjs/common";
import { InferenceService } from "@/services/inference.service";
import { PromptTemplateService } from "@/services/prompt-template.service";
import { GuardrailService } from "@/services/guardrail.service";
import { AiTaskRegistryService } from "@/services/ai-task-registry.service";
import { aiValidationError } from "@/utils/ai-errors";

@Injectable()
export class ReportSummaryPipeline {
  constructor(
    private readonly inferenceService: InferenceService,
    private readonly promptTemplateService: PromptTemplateService,
    private readonly guardrailService: GuardrailService,
    private readonly taskRegistry: AiTaskRegistryService,
  ) {}

  async run(tenantId: string, reportPayload: Record<string, unknown>) {
    if (!reportPayload || typeof reportPayload !== "object") {
      throw aiValidationError([{ field: "report", message: "Report payload is required." }]);
    }

    const task = this.taskRegistry.getTask("REPORT_SUMMARY");
    const prompt = this.promptTemplateService.renderTemplate(task.template, {
      report: JSON.stringify(reportPayload),
    });

    const result = await this.inferenceService.runStructuredOutput(
      {
        task: "REPORT_SUMMARY",
        prompt,
        schema: task.outputSchema,
        maxTokens: 600,
      },
      tenantId,
    );

    const data = this.guardrailService.sanitizeStructured(result.data as Record<string, unknown>);

    return {
      summary: String(data.summary ?? ""),
      highlights: (data.highlights as string[]) ?? [],
      risks: (data.risks as string[]) ?? [],
      meta: {
        provider: result.provider,
        latencyMs: result.latencyMs,
      },
    };
  }
}
