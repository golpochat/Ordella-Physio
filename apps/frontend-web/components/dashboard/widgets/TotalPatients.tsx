import { Card } from "@/components/dashboard/Card";

type TotalPatientsProps = {
  value?: number;
  isLoading?: boolean;
};

export function TotalPatients({ value = 0, isLoading }: TotalPatientsProps) {
  return (
    <Card compact>
      <p className="dashboard-stat-label">Total patients</p>
      <p className="dashboard-stat-value">{isLoading ? "—" : value.toLocaleString()}</p>
    </Card>
  );
}
