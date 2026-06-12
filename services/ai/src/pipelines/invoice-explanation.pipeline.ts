import { Injectable } from "@nestjs/common";
import { DomainContextClient } from "@/integrations/domain-context.client";
import { InferenceService } from "@/services/inference.service";
import { PromptTemplateService } from "@/services/prompt-template.service";
import { GuardrailService } from "@/services/guardrail.service";
import { AiTaskRegistryService } from "@/services/ai-task-registry.service";
import { aiProviderNotFoundError } from "@/utils/ai-errors";

@Injectable()
export class InvoiceExplanationPipeline {
  constructor(
    private readonly domainContextClient: DomainContextClient,
    private readonly inferenceService: InferenceService,
    private readonly promptTemplateService: PromptTemplateService,
    private readonly guardrailService: GuardrailService,
    private readonly taskRegistry: AiTaskRegistryService,
  ) {}

  async run(tenantId: string, invoiceId: string) {
    const context = await this.domainContextClient.fetchInvoiceContext(tenantId, invoiceId);
    if (!context) {
      throw aiProviderNotFoundError("Invoice not found.");
    }

    const task = this.taskRegistry.getTask("INVOICE_EXPLANATION");
    const prompt = this.promptTemplateService.renderTemplate(task.template, {
      invoice: JSON.stringify(context.invoice),
      items: JSON.stringify(context.lineItems),
      payments: JSON.stringify(context.paymentHistory),
    });

    const result = await this.inferenceService.runStructuredOutput(
      {
        task: "INVOICE_EXPLANATION",
        prompt,
        schema: task.outputSchema,
        maxTokens: 500,
      },
      tenantId,
    );

    const data = this.guardrailService.sanitizeStructured(result.data as Record<string, unknown>);

    return {
      explanation: String(data.explanation ?? ""),
      anomalies: (data.anomalies as string[]) ?? [],
      suggestedActions: (data.suggestedActions as string[]) ?? [],
      meta: {
        provider: result.provider,
        latencyMs: result.latencyMs,
      },
    };
  }
}
