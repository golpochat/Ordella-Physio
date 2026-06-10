export type AuthenticatedPaymentUser = {
  userId: string;
  tenantId: string;
  role: string;
  email?: string;
  permissions?: string[];
};

export const BILLING_SERVICE_URL =
  process.env.BILLING_SERVICE_URL ?? "http://localhost:3056";

export function resolvePaymentGateway(): "stripe" | "mock" {
  const gateway = (process.env.PAYMENT_GATEWAY ?? "mock").toLowerCase();
  return gateway === "stripe" ? "stripe" : "mock";
}

export async function validateInvoicePlaceholder(
  _invoiceId: string,
  _authorization?: string,
): Promise<{ exists: boolean; status: string; total: number; currency: string }> {
  // Placeholder: integrate with billing-service
  return { exists: true, status: "ISSUED", total: 0, currency: "USD" };
}
