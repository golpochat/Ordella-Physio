import { fail, ok, type Result } from "../core/result";
import type { InvoiceStatus } from "../aggregates/invoice.aggregate";

export function invoiceMustHaveItems(itemCount: number): Result<void> {
  if (itemCount <= 0) {
    return fail("Invoice must contain at least one item");
  }
  return ok(undefined);
}

export function invoiceCannotBePaidTwice(status: InvoiceStatus): Result<void> {
  if (status === "PAID") {
    return fail("Invoice cannot be paid twice");
  }
  return ok(undefined);
}

export function taxRateMustBelongToTenant(
  taxRateTenantId: string,
  tenantId: string,
): Result<void> {
  if (taxRateTenantId !== tenantId) {
    return fail("Tax rate must belong to tenant");
  }
  return ok(undefined);
}

export function discountMustBelongToTenant(
  discountTenantId: string,
  tenantId: string,
): Result<void> {
  if (discountTenantId !== tenantId) {
    return fail("Discount must belong to tenant");
  }
  return ok(undefined);
}

export const billingRules = {
  invoiceMustHaveItems,
  invoiceCannotBePaidTwice,
  taxRateMustBelongToTenant,
  discountMustBelongToTenant,
};
