export type AuthenticatedBillingUser = {
  userId: string;
  tenantId: string;
  role: string;
  email?: string;
  permissions?: string[];
};

export const PATIENT_SERVICE_URL =
  process.env.PATIENT_SERVICE_URL ?? "http://localhost:3053";

export const APPOINTMENT_SERVICE_URL =
  process.env.APPOINTMENT_SERVICE_URL ?? "http://localhost:3054";

export async function generateNextInvoiceNumber(
  countInvoicesForTenant: (tenantId: string) => Promise<number>,
  tenantId: string,
): Promise<string> {
  const count = await countInvoicesForTenant(tenantId);
  const next = count + 1;
  return `INV-${String(next).padStart(6, "0")}`;
}
