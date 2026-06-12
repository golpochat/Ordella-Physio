"use client";

import { useMemo } from "react";
import { BarChart } from "@/components/charts/bar-chart";
import { Card } from "@/components/dashboard/Card";
import type { AppointmentReportResponse } from "@/lib/reporting-types";

type AppointmentReportTableProps = {
  data?: AppointmentReportResponse;
  isLoading?: boolean;
};

export function AppointmentReportTable({ data, isLoading }: AppointmentReportTableProps) {
  const rows = data?.rows ?? [];
  const totals = useMemo(
    () =>
      rows.reduce(
        (acc, row) => ({
          total: acc.total + row.total,
          scheduled: acc.scheduled + row.scheduled,
          completed: acc.completed + row.completed,
          cancelled: acc.cancelled + row.cancelled,
          noShow: acc.noShow + row.noShow,
        }),
        { total: 0, scheduled: 0, completed: 0, cancelled: 0, noShow: 0 },
      ),
    [rows],
  );

  const chartData = useMemo(
    () => (data?.chart.labels ?? []).map((label, index) => ({
      label,
      value: data?.chart.datasets[0]?.values[index] ?? 0,
    })),
    [data?.chart],
  );

  return (
    <div className="dashboard-widget-grid">
      <Card>
        <h2 className="dashboard-card-title">Appointment report</h2>
        {isLoading ? (
          <div className="dashboard-skeleton dashboard-skeleton-table" />
        ) : (
          <div className="dashboard-table-wrap">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Period</th>
                  <th>Total</th>
                  <th>Scheduled</th>
                  <th>Completed</th>
                  <th>Cancelled</th>
                  <th>No-show</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.period}>
                    <td>{row.period}</td>
                    <td>{row.total.toLocaleString()}</td>
                    <td>{row.scheduled.toLocaleString()}</td>
                    <td>{row.completed.toLocaleString()}</td>
                    <td>{row.cancelled.toLocaleString()}</td>
                    <td>{row.noShow.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td>Total</td>
                  <td>{totals.total.toLocaleString()}</td>
                  <td>{totals.scheduled.toLocaleString()}</td>
                  <td>{totals.completed.toLocaleString()}</td>
                  <td>{totals.cancelled.toLocaleString()}</td>
                  <td>{totals.noShow.toLocaleString()}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </Card>

      <Card>
        <h2 className="dashboard-card-title">Appointments over time</h2>
        {isLoading ? (
          <div className="dashboard-skeleton dashboard-skeleton-chart" />
        ) : chartData.length ? (
          <BarChart data={chartData} />
        ) : (
          <p className="dashboard-empty-state">No appointment data for this period.</p>
        )}
      </Card>
    </div>
  );
}
