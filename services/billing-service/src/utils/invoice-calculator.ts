export type InvoiceCalculatorItem = {
  quantity: number;
  unitPrice: number;
  taxRate: number;
  discountAmount?: number;
};

export type InvoiceCalculatorLineResult = {
  lineSubtotal: number;
  discountAmount: number;
  taxAmount: number;
  lineTotal: number;
};

export type InvoiceCalculatorTotals = {
  subtotal: number;
  discountTotal: number;
  taxTotal: number;
  total: number;
  lines: InvoiceCalculatorLineResult[];
};

function roundCurrency(value: number): number {
  return Number(value.toFixed(2));
}

export function calculateLineTotals(item: InvoiceCalculatorItem): InvoiceCalculatorLineResult {
  const lineSubtotal = roundCurrency(item.quantity * item.unitPrice);
  const discountAmount = roundCurrency(item.discountAmount ?? 0);
  const taxableAmount = Math.max(0, lineSubtotal - discountAmount);
  const taxAmount = roundCurrency((taxableAmount * item.taxRate) / 100);
  const lineTotal = roundCurrency(taxableAmount + taxAmount);

  return {
    lineSubtotal,
    discountAmount,
    taxAmount,
    lineTotal,
  };
}

export function calculateInvoiceTotals(items: InvoiceCalculatorItem[]): InvoiceCalculatorTotals {
  const lines = items.map((item) => calculateLineTotals(item));

  const subtotal = roundCurrency(lines.reduce((sum, line) => sum + line.lineSubtotal, 0));
  const discountTotal = roundCurrency(lines.reduce((sum, line) => sum + line.discountAmount, 0));
  const taxTotal = roundCurrency(lines.reduce((sum, line) => sum + line.taxAmount, 0));
  const total = roundCurrency(subtotal - discountTotal + taxTotal);

  return {
    subtotal,
    discountTotal,
    taxTotal,
    total,
    lines,
  };
}
