import { Card } from "@/components/dashboard/Card";

type RevenueProps = {
  value?: number;
  isLoading?: boolean;
};

function formatCurrency(value: number): string {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function Revenue({ value = 0, isLoading }: RevenueProps) {
  return (
    <Card compact>
      <p className="dashboard-stat-label">Revenue</p>
      <p className="dashboard-stat-value">{isLoading ? "—" : formatCurrency(value)}</p>
    </Card>
  );
}
