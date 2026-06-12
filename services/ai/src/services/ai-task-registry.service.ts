import { Injectable, OnModuleInit } from "@nestjs/common";

export type AiSafetyLevel = "LOW" | "MEDIUM" | "HIGH";

export type AiTaskConfig = {
  model?: string;
  template: string;
  outputSchema: Record<string, unknown>;
  safetyLevel: AiSafetyLevel;
};

export type AiTaskKey =
  | "PATIENT_SUMMARY"
  | "APPOINTMENT_SUMMARY"
  | "APPOINTMENT_INSIGHTS"
  | "INVOICE_EXPLANATION"
  | "REPORT_SUMMARY"
  | "RISK_SCORE";

@Injectable()
export class AiTaskRegistryService implements OnModuleInit {
  private readonly tasks = new Map<AiTaskKey, AiTaskConfig>();

  onModuleInit() {
    this.registerTask("PATIENT_SUMMARY", {
      template:
        "Summarize this patient for clinic staff. Demographics: {{demographics}}. Appointments: {{appointments}}. Tags: {{tags}}. Notes: {{notes}}. Provide operational summary only, no medical diagnosis.",
      outputSchema: {
        type: "object",
        required: ["summary", "keyConcerns", "recommendedNextSteps"],
        properties: {
          summary: { type: "string" },
          keyConcerns: { type: "array" },
          recommendedNextSteps: { type: "array" },
        },
      },
      safetyLevel: "HIGH",
    });

    this.registerTask("APPOINTMENT_SUMMARY", {
      template: "Summarize appointment {{appointment}} for documentation.",
      outputSchema: {
        type: "object",
        required: ["visitSummary"],
        properties: { visitSummary: { type: "string" } },
      },
      safetyLevel: "MEDIUM",
    });

    this.registerTask("APPOINTMENT_INSIGHTS", {
      template:
        "Analyze appointment {{appointment}} with provider notes {{notes}} and patient history {{history}}. Return operational visit insights and follow-up recommendations. No medical diagnosis.",
      outputSchema: {
        type: "object",
        required: ["visitSummary", "followUpActions", "flags"],
        properties: {
          visitSummary: { type: "string" },
          followUpActions: { type: "array" },
          flags: { type: "array" },
        },
      },
      safetyLevel: "HIGH",
    });

    this.registerTask("INVOICE_EXPLANATION", {
      template:
        "Explain invoice {{invoice}} with line items {{items}} and payment history {{payments}} for clinic billing staff.",
      outputSchema: {
        type: "object",
        required: ["explanation", "anomalies", "suggestedActions"],
        properties: {
          explanation: { type: "string" },
          anomalies: { type: "array" },
          suggestedActions: { type: "array" },
        },
      },
      safetyLevel: "LOW",
    });

    this.registerTask("REPORT_SUMMARY", {
      template: "Summarize this exported report JSON: {{report}}",
      outputSchema: {
        type: "object",
        required: ["summary", "highlights", "risks"],
        properties: {
          summary: { type: "string" },
          highlights: { type: "array" },
          risks: { type: "array" },
        },
      },
      safetyLevel: "MEDIUM",
    });

    this.registerTask("RISK_SCORE", {
      template:
        "Score operational risk (not medical) for patient context {{context}}. Return score 0-100 and factors.",
      outputSchema: {
        type: "object",
        required: ["riskScore", "riskLevel", "factors"],
        properties: {
          riskScore: { type: "number" },
          riskLevel: { type: "string" },
          factors: { type: "array" },
        },
      },
      safetyLevel: "HIGH",
    });
  }

  registerTask(taskKey: AiTaskKey, config: AiTaskConfig) {
    this.tasks.set(taskKey, config);
  }

  getTask(taskKey: AiTaskKey) {
    const task = this.tasks.get(taskKey);
    if (!task) {
      throw new Error(`Unknown AI task: ${taskKey}`);
    }
    return task;
  }
}
