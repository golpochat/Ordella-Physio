export type RevenueWidgetData = {
  totalRevenue: number;
  outstandingBalance: number;
  periodStart?: string;
  periodEnd?: string;
};

export function buildRevenueWidget(data: RevenueWidgetData) {
  return {
    type: "revenue",
    data,
  };
}
