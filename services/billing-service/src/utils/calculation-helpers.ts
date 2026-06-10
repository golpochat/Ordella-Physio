export type InvoiceTotalsInput = {
  items: Array<{ quantity: number; unitPrice: number }>;
  taxPercentage?: number;
  discountType?: "PERCENTAGE" | "FIXED_AMOUNT";
  discountValue?: number;
};

export type InvoiceTotalsResult = {
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
};

export function calculateLineTotal(quantity: number, unitPrice: number): number {
  return Number((quantity * unitPrice).toFixed(2));
}

export function calculateSubtotal(items: InvoiceTotalsInput["items"]): number {
  return Number(
    items.reduce((sum, item) => sum + calculateLineTotal(item.quantity, item.unitPrice), 0).toFixed(2),
  );
}

export function calculateTaxAmount(subtotal: number, taxPercentage = 0): number {
  return Number(((subtotal * taxPercentage) / 100).toFixed(2));
}

export function calculateDiscountAmount(
  subtotal: number,
  discountType?: "PERCENTAGE" | "FIXED_AMOUNT",
  discountValue = 0,
): number {
  if (!discountType || discountValue <= 0) {
    return 0;
  }

  if (discountType === "PERCENTAGE") {
    return Number(((subtotal * discountValue) / 100).toFixed(2));
  }

  return Number(Math.min(discountValue, subtotal).toFixed(2));
}

export function calculateInvoiceTotals(input: InvoiceTotalsInput): InvoiceTotalsResult {
  const subtotal = calculateSubtotal(input.items);
  const discount = calculateDiscountAmount(subtotal, input.discountType, input.discountValue);
  const taxableAmount = subtotal - discount;
  const tax = calculateTaxAmount(taxableAmount, input.taxPercentage);
  const total = Number((taxableAmount + tax).toFixed(2));

  return { subtotal, tax, discount, total };
}
