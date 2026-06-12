export type InvoiceLineInput = {
  quantity: number;
  unitPrice: number;
  taxRate: number;
  discountAmount: number;
};

export type InvoiceTotals = {
  subtotal: number;
  discountTotal: number;
  taxTotal: number;
  total: number;
};

function roundCurrency(value: number): number {
  return Number(value.toFixed(2));
}

export function calculateInvoiceTotals(items: InvoiceLineInput[]): InvoiceTotals {
  let subtotal = 0;
  let discountTotal = 0;
  let taxTotal = 0;

  for (const item of items) {
    const lineSubtotal = roundCurrency(item.quantity * item.unitPrice);
    const discount = roundCurrency(item.discountAmount);
    const taxableAmount = Math.max(0, lineSubtotal - discount);
    const tax = roundCurrency((taxableAmount * item.taxRate) / 100);

    subtotal += lineSubtotal;
    discountTotal += discount;
    taxTotal += tax;
  }

  return {
    subtotal: roundCurrency(subtotal),
    discountTotal: roundCurrency(discountTotal),
    taxTotal: roundCurrency(taxTotal),
    total: roundCurrency(subtotal - discountTotal + taxTotal),
  };
}
