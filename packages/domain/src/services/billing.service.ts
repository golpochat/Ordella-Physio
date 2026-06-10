import { fail, ok, type Result } from "../core/result";
import type { InvoiceItem } from "../aggregates/invoice.aggregate";
import { Money } from "../value-objects/money.vo";

export type TaxRate = {
  id: string;
  name: string;
  percentage: number;
};

export class BillingDomainService {
  calculateInvoiceTotal(items: InvoiceItem[]): Result<Money> {
    if (items.length === 0) {
      return fail("Invoice must contain at least one item");
    }

    const currency = items[0]?.unitPrice.currency;
    if (!currency) {
      return fail("Invoice items must define a currency");
    }

    const initialTotal = Money.create(0, currency);
    if (initialTotal.isFailure) {
      return fail(initialTotal.error);
    }

    let runningTotal: Money = initialTotal.value;

    for (const item of items) {
      const lineTotal = item.unitPrice.multiply(item.quantity);
      if (lineTotal.isFailure) {
        return fail(lineTotal.error);
      }

      const nextTotal = runningTotal.add(lineTotal.value);
      if (nextTotal.isFailure) {
        return fail(nextTotal.error);
      }
      runningTotal = nextTotal.value;
    }

    return ok(runningTotal);
  }

  applyTaxRates(subtotal: Money, taxRates: TaxRate[]): Result<Money> {
    if (taxRates.length === 0) {
      return ok(subtotal);
    }

    const totalPercentage = taxRates.reduce((sum, rate) => sum + rate.percentage, 0);
    const multiplier = 1 + totalPercentage / 100;
    return subtotal.multiply(multiplier);
  }
}

export const billingDomainService = new BillingDomainService();
