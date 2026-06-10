export type FinancialSummaryWidgetData = {
  revenue: number;
  outstandingBalance: number;
  paymentsReceived: number;
  refunds: number;
};

export function buildFinancialSummaryWidget(data: FinancialSummaryWidgetData) {
  return {
    type: "financial_summary",
    data,
  };
}
