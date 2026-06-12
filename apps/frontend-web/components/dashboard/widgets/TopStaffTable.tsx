import { Card } from "@/components/dashboard/Card";
import type { DashboardMetricsResponse } from "@/lib/reporting-types";

type TopStaffTableProps = {
  rows?: DashboardMetricsResponse["topStaff"];
  isLoading?: boolean;
};

export function TopStaffTable({ rows = [], isLoading }: TopStaffTableProps) {
  return (
    <Card>
      <h2 className="dashboard-card-title">Top staff by appointments</h2>
      {isLoading ? (
        <div className="dashboard-skeleton dashboard-skeleton-table" />
      ) : rows.length ? (
        <div className="dashboard-table-wrap">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Staff</th>
                <th>Appointments</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.staffId}>
                  <td>{row.name}</td>
                  <td>{row.appointments.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="dashboard-empty-state">No appointment data for this period.</p>
      )}
    </Card>
  );
}
