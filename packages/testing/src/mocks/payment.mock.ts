import { nextSequence, randomFrom } from "./random";

export type MockPaymentStatus = "PENDING" | "PROCESSING" | "SUCCEEDED" | "FAILED" | "REFUNDED";

export type MockPayment = {
  id: string;
  tenantId: string;
  invoiceId: string;
  patientId: string;
  amount: number;
  currency: string;
  status: MockPaymentStatus;
  paymentIntentId: string;
  createdAt: Date;
  updatedAt: Date;
};

const STATUSES: MockPaymentStatus[] = [
  "PENDING",
  "PROCESSING",
  "SUCCEEDED",
  "FAILED",
  "REFUNDED",
];

export function mockPayment(overrides: Partial<MockPayment> = {}): MockPayment {
  const index = nextSequence();
  const now = new Date("2024-01-01T00:00:00.000Z");

  return {
    id: overrides.id ?? `payment-${index}`,
    tenantId: overrides.tenantId ?? `tenant-${index}`,
    invoiceId: overrides.invoiceId ?? `invoice-${index}`,
    patientId: overrides.patientId ?? `patient-${index}`,
    amount: overrides.amount ?? 75,
    currency: overrides.currency ?? "GBP",
    status: overrides.status ?? randomFrom(STATUSES),
    paymentIntentId: overrides.paymentIntentId ?? `pi_${index}`,
    createdAt: overrides.createdAt ?? now,
    updatedAt: overrides.updatedAt ?? now,
    ...overrides,
  };
}
