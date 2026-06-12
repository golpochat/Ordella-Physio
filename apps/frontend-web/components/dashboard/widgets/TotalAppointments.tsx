import { Card } from "@/components/dashboard/Card";

type TotalAppointmentsProps = {
  value?: number;
  isLoading?: boolean;
};

export function TotalAppointments({ value = 0, isLoading }: TotalAppointmentsProps) {
  return (
    <Card compact>
      <p className="dashboard-stat-label">Total appointments</p>
      <p className="dashboard-stat-value">{isLoading ? "—" : value.toLocaleString()}</p>
    </Card>
  );
}
