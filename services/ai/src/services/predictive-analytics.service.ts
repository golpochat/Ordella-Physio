import { Injectable } from "@nestjs/common";
import { DomainContextClient } from "@/integrations/domain-context.client";
import { GuardrailService } from "@/services/guardrail.service";
import { InferenceService } from "@/services/inference.service";
import { aiProviderNotFoundError } from "@/utils/ai-errors";

export type PredictiveResult = {
  score: number;
  factors: string[];
  recommendedActions: string[];
  predictionType: string;
};

const PREDICTION_SCHEMA = {
  type: "object",
  required: ["score", "factors", "recommendedActions"],
  properties: {
    score: { type: "number" },
    factors: { type: "array" },
    recommendedActions: { type: "array" },
  },
};

@Injectable()
export class PredictiveAnalyticsService {
  constructor(
    private readonly domainContextClient: DomainContextClient,
    private readonly inferenceService: InferenceService,
    private readonly guardrailService: GuardrailService,
  ) {}

  predictNoShow(tenantId: string, appointmentId: string) {
    return this.runPrediction(tenantId, "APPOINTMENT_NO_SHOW", async () => {
      const context = await this.domainContextClient.fetchAppointmentContext(tenantId, appointmentId);
      if (!context) {
        throw aiProviderNotFoundError("Appointment not found.");
      }
      return {
        context,
        heuristicScore: scoreNoShow(context),
      };
    });
  }

  predictLatePayment(tenantId: string, invoiceId: string) {
    return this.runPrediction(tenantId, "INVOICE_LATE_PAYMENT", async () => {
      const context = await this.domainContextClient.fetchInvoiceContext(tenantId, invoiceId);
      if (!context) {
        throw aiProviderNotFoundError("Invoice not found.");
      }
      return {
        context,
        heuristicScore: scoreLatePayment(context),
      };
    });
  }

  predictEngagement(tenantId: string, patientId: string) {
    return this.runPrediction(tenantId, "PATIENT_ENGAGEMENT", async () => {
      const context = await this.domainContextClient.fetchPatientContext(tenantId, patientId);
      if (!context) {
        throw aiProviderNotFoundError("Patient not found.");
      }
      return {
        context,
        heuristicScore: scoreEngagement(context),
      };
    });
  }

  predictOperationalRisk(tenantId: string, patientId: string) {
    return this.runPrediction(tenantId, "OPERATIONAL_RISK", async () => {
      const context = await this.domainContextClient.fetchPatientContext(tenantId, patientId);
      if (!context) {
        throw aiProviderNotFoundError("Patient not found.");
      }
      return {
        context,
        heuristicScore: scoreOperationalRisk(context),
      };
    });
  }

  private async runPrediction(
    tenantId: string,
    predictionType: string,
    loadContext: () => Promise<{ context: unknown; heuristicScore: number }>,
  ): Promise<PredictiveResult> {
    const { context, heuristicScore } = await loadContext();

    const result = await this.inferenceService.runStructuredOutput(
      {
        task: predictionType,
        prompt: `Provide operational (non-medical) prediction for ${predictionType}. Context: ${JSON.stringify(context)}. Heuristic baseline score: ${heuristicScore}. Do not provide medical diagnosis.`,
        schema: PREDICTION_SCHEMA,
        maxTokens: 350,
      },
      tenantId,
    );

    const data = this.guardrailService.sanitizeStructured(result.data as Record<string, unknown>);
    const aiScore = Number(data.score ?? heuristicScore);
    const blendedScore = Math.round(heuristicScore * 0.4 + aiScore * 0.6);

    return {
      predictionType,
      score: Math.min(100, Math.max(0, blendedScore)),
      factors: (data.factors as string[]) ?? [],
      recommendedActions: (data.recommendedActions as string[]) ?? [],
    };
  }
}

function scoreNoShow(context: {
  appointment: Record<string, unknown>;
  patientHistory: Array<Record<string, unknown>>;
}) {
  const status = String(context.appointment.status ?? "");
  let score = 20;
  if (status === "CANCELLED") {
    score += 40;
  }
  const missed = context.patientHistory.filter((entry) => entry.status === "NO_SHOW").length;
  score += Math.min(40, missed * 15);
  return score;
}

function scoreLatePayment(context: {
  invoice: Record<string, unknown>;
  paymentHistory: Array<Record<string, unknown>>;
}) {
  const status = String(context.invoice.status ?? "");
  let score = 15;
  if (status === "OVERDUE") {
    score += 50;
  }
  const overdueCount = context.paymentHistory.filter((entry) => entry.status === "OVERDUE").length;
  score += Math.min(35, overdueCount * 12);
  return score;
}

function scoreEngagement(context: {
  appointmentHistory: Array<Record<string, unknown>>;
  demographics: Record<string, unknown>;
}) {
  const recentAppointments = context.appointmentHistory.length;
  let score = 80;
  if (recentAppointments === 0) {
    score = 25;
  } else if (recentAppointments < 3) {
    score = 45;
  }
  if (context.demographics.status === "INACTIVE") {
    score -= 30;
  }
  return Math.max(0, score);
}

function scoreOperationalRisk(context: {
  appointmentHistory: Array<Record<string, unknown>>;
  demographics: Record<string, unknown>;
}) {
  let score = 10;
  const cancellations = context.appointmentHistory.filter(
    (entry) => entry.status === "CANCELLED" || entry.status === "NO_SHOW",
  ).length;
  score += Math.min(50, cancellations * 10);
  if (context.demographics.status === "INACTIVE") {
    score += 25;
  }
  return Math.min(100, score);
}
