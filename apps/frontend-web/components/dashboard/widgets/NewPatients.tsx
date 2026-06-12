import { Card } from "@/components/dashboard/Card";

type NewPatientsProps = {
  value?: number;
  isLoading?: boolean;
};

export function NewPatients({ value = 0, isLoading }: NewPatientsProps) {
  return (
    <Card compact>
      <p className="dashboard-stat-label">New patients</p>
      <p className="dashboard-stat-value">{isLoading ? "—" : value.toLocaleString()}</p>
    </Card>
  );
}
