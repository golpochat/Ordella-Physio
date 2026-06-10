import { fail, ok, type Result } from "../core/result";
import type { PaymentIntentStatus } from "../aggregates/payment.aggregate";

export function invoiceMustExist(exists: boolean): Result<void> {
  if (!exists) {
    return fail("Invoice does not exist");
  }
  return ok(undefined);
}

export function invoiceCannotBePaidTwice(invoiceStatus: string): Result<void> {
  if (invoiceStatus === "PAID") {
    return fail("Invoice is already paid");
  }
  return ok(undefined);
}

export function amountMustMatchInvoiceTotal(
  paymentAmount: number,
  invoiceTotal: number,
): Result<void> {
  if (paymentAmount !== invoiceTotal) {
    return fail("Payment amount must match invoice total");
  }
  return ok(undefined);
}

export function paymentMustBeSucceeded(status: PaymentIntentStatus): Result<void> {
  if (status !== "SUCCEEDED") {
    return fail("Payment must be succeeded before refund");
  }
  return ok(undefined);
}

export function refundAmountMustNotExceedPayment(
  refundAmount: number,
  paymentAmount: number,
): Result<void> {
  if (refundAmount > paymentAmount) {
    return fail("Refund amount cannot exceed payment amount");
  }
  return ok(undefined);
}

export const paymentRules = {
  invoiceMustExist,
  invoiceCannotBePaidTwice,
  amountMustMatchInvoiceTotal,
  paymentMustBeSucceeded,
  refundAmountMustNotExceedPayment,
};
