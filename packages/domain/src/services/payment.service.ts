import { fail, ok, type Result } from "../core/result";
import type { InvoiceStatus } from "../aggregates/invoice.aggregate";
import type { PaymentIntentStatus } from "../aggregates/payment.aggregate";
import { Money } from "../value-objects/money.vo";

export type PaymentValidationInput = {
  invoiceTotal: Money;
  paymentAmount: Money;
};

export type RefundValidationInput = {
  invoiceStatus: InvoiceStatus;
  paymentStatus: PaymentIntentStatus;
  paidAmount: Money;
  refundAmount: Money;
};

export class PaymentDomainService {
  validatePaymentAmount(input: PaymentValidationInput): Result<void> {
    if (input.paymentAmount.currency !== input.invoiceTotal.currency) {
      return fail("Payment currency must match invoice currency");
    }

    if (input.paymentAmount.amount <= 0) {
      return fail("Payment amount must be greater than zero");
    }

    if (input.paymentAmount.amount > input.invoiceTotal.amount) {
      return fail("Payment amount cannot exceed invoice total");
    }

    return ok(undefined);
  }

  validateRefundEligibility(input: RefundValidationInput): Result<void> {
    if (input.invoiceStatus !== "PAID") {
      return fail("Invoice is not eligible for refund");
    }

    if (input.paymentStatus !== "SUCCEEDED") {
      return fail("Only successful payments can be refunded");
    }

    if (input.refundAmount.amount <= 0) {
      return fail("Refund amount must be greater than zero");
    }

    if (input.refundAmount.amount > input.paidAmount.amount) {
      return fail("Refund amount cannot exceed paid amount");
    }

    return ok(undefined);
  }
}

export const paymentDomainService = new PaymentDomainService();
