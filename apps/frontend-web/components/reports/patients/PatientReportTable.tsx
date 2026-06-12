"use client";

import { useMemo } from "react";
import { BarChart } from "@/components/charts/bar-chart";
import { Card } from "@/components/dashboard/Card";
import type { PatientReportResponse } from "@/lib/reporting-types";

type PatientReportTableProps = {
  data?: PatientReportResponse;
  isLoading?: boolean;
};

export function PatientReportTable({ data, isLoading }: PatientReportTableProps) {
  const rows = data?.rows ?? [];
  const totals = useMemo(
    () =>
      rows.reduce(
        (acc, row) => ({
          newPatients: acc.newPatients + row.newPatients,
          active: acc.active + row.active,
          inactive: acc.inactive + row.inactive,
        }),
        { newPatients: 0, active: 0, inactive: 0 },
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
        <h2 className="dashboard-card-title">Patient report</h2>
        {isLoading ? (
          <div className="dashboard-skeleton dashboard-skeleton-table" />
        ) : (
          <div className="dashboard-table-wrap">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Period</th>
                  <th>New patients</th>
                  <th>Active</th>
                  <th>Inactive</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.period}>
                    <td>{row.period}</td>
                    <td>{row.newPatients.toLocaleString()}</td>
                    <td>{row.active.toLocaleString()}</td>
                    <td>{row.inactive.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td>Total</td>
                  <td>{totals.newPatients.toLocaleString()}</td>
                  <td>{totals.active.toLocaleString()}</td>
                  <td>{totals.inactive.toLocaleString()}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </Card>

      <Card>
        <h2 className="dashboard-card-title">New patients over time</h2>
        {isLoading ? (
          <div className="dashboard-skeleton dashboard-skeleton-chart" />
        ) : chartData.length ? (
          <BarChart data={chartData} />
        ) : (
          <p className="dashboard-empty-state">No patient data for this period.</p>
        )}
      </Card>
    </div>
  );
}
