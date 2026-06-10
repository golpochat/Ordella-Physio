import type { PaymentIntent } from "@/generated/prisma";

export type PaymentIntentResponse = {
  id: string;
  tenantId: string;
  invoiceId: string;
  patientId: string;
  amount: number;
  currency: string;
  status: string;
  provider: string;
  providerPaymentId: string | null;
  createdAt: string;
  updatedAt: string;
};

function toNumber(value: { toNumber(): number } | number): number {
  return typeof value === "number" ? value : value.toNumber();
}

export function toPaymentIntentResponse(intent: PaymentIntent): PaymentIntentResponse {
  return {
    id: intent.id,
    tenantId: intent.tenantId,
    invoiceId: intent.invoiceId,
    patientId: intent.patientId,
    amount: toNumber(intent.amount),
    currency: intent.currency,
    status: intent.status,
    provider: intent.provider,
    providerPaymentId: intent.providerPaymentId,
    createdAt: intent.createdAt.toISOString(),
    updatedAt: intent.updatedAt.toISOString(),
  };
}

export function toPaymentIntentListResponse(intents: PaymentIntent[]) {
  return intents.map(toPaymentIntentResponse);
}
