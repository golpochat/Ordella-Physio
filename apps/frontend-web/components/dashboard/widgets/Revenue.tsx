import { Card } from "@/components/dashboard/Card";
import { formatPlatformCurrency } from "@/lib/platform-formatting";

type RevenueProps = {
  value?: number;
  isLoading?: boolean;
};

export function Revenue({ value = 0, isLoading }: RevenueProps) {
  return (
    <Card compact>
      <p className="dashboard-stat-label">Revenue</p>
      <p className="dashboard-stat-value">
        {isLoading ? "—" : formatPlatformCurrency(value, undefined, 0)}
      </p>
    </Card>
  );
}
