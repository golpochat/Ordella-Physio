import { Card } from "@/components/dashboard/Card";
import type { DashboardMetricsResponse } from "@/lib/reporting-types";

type TopServicesTableProps = {
  rows?: DashboardMetricsResponse["topServices"];
  isLoading?: boolean;
};

export function TopServicesTable({ rows = [], isLoading }: TopServicesTableProps) {
  return (
    <Card>
      <h2 className="dashboard-card-title">Top services</h2>
      {isLoading ? (
        <div className="dashboard-skeleton dashboard-skeleton-table" />
      ) : rows.length ? (
        <div className="dashboard-table-wrap">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Service</th>
                <th>Appointments</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.serviceName}>
                  <td>{row.serviceName}</td>
                  <td>{row.count.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="dashboard-empty-state">No service data for this period.</p>
      )}
    </Card>
  );
}
