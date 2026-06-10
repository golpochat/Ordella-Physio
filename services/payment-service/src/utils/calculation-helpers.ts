export function calculateRefundTotal(
  requestedAmount: number | undefined,
  paymentAmount: number,
): number {
  if (requestedAmount === undefined) {
    return paymentAmount;
  }
  return Number(Math.min(requestedAmount, paymentAmount).toFixed(2));
}

export function validateProviderEarningsPlaceholder(
  _providerId: string,
  _amount: number,
): boolean {
  // Placeholder: validate provider earnings against payout schedule
  return true;
}
