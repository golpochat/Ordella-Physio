import { ForbiddenError } from "../../utils/api-error";

const TENANT_SCOPED_MODELS = new Set([
  "Patient",
  "Appointment",
  "Therapist",
  "Staff",
  "Invoice",
  "Payment",
  "Note",
  "Notification",
  "Role",
  "AuditLog",
]);

export function assertTenantScopedQuery(model: string, where: Record<string, unknown> | undefined, tenantId: string): void {
  if (!TENANT_SCOPED_MODELS.has(model)) {
    return;
  }

  if (!where?.tenantId) {
    throw new ForbiddenError(`Tenant scope required for ${model} queries`);
  }

  if (where.tenantId !== tenantId) {
    throw new ForbiddenError("Cross-tenant data access denied");
  }
}

export function withTenantWhere<T extends Record<string, unknown>>(tenantId: string, where: T = {} as T): T & { tenantId: string } {
  return { ...where, tenantId };
}
