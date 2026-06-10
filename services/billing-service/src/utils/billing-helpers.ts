export type AuthenticatedBillingUser = {
  userId: string;
  tenantId: string;
  role: string;
  email?: string;
  permissions?: string[];
};

export const PAYMENT_SERVICE_URL =
  process.env.PAYMENT_SERVICE_URL ?? "http://localhost:3057";

export const PATIENT_SERVICE_URL =
  process.env.PATIENT_SERVICE_URL ?? "http://localhost:3053";

export const APPOINTMENT_SERVICE_URL =
  process.env.APPOINTMENT_SERVICE_URL ?? "http://localhost:3054";

export async function validatePatientReferencePlaceholder(_patientId: string): Promise<void> {
  // Placeholder: integrate with patient-service
}

export async function validateAppointmentReferencePlaceholder(
  _appointmentId: string,
): Promise<void> {
  // Placeholder: integrate with appointment-service
}

export async function validatePaymentServicePlaceholder(_invoiceId: string): Promise<void> {
  // Placeholder: integrate with payment-service
}

export function generateInvoiceNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `INV-${timestamp}-${random}`;
}
