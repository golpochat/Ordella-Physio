import { fail, ok, type Result } from "../core/result";

export function patientMustBelongToTenant(
  patientTenantId: string,
  expectedTenantId: string,
): Result<void> {
  if (patientTenantId !== expectedTenantId) {
    return fail("Patient must belong to the same tenant");
  }
  return ok(undefined);
}

export const patientRules = {
  patientMustBelongToTenant,
};
