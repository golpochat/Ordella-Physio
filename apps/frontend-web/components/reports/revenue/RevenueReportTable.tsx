"use client";

import { useMemo } from "react";
import { BarChart } from "@/components/charts/bar-chart";
import { Card } from "@/components/dashboard/Card";
import type { RevenueReportResponse } from "@/lib/reporting-types";

function formatCurrency(value: number): string {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
}

type RevenueReportTableProps = {
  data?: RevenueReportResponse;
  isLoading?: boolean;
};

export function RevenueReportTable({ data, isLoading }: RevenueReportTableProps) {
  const rows = data?.rows ?? [];
  const totals = useMemo(
    () =>
      rows.reduce(
        (acc, row) => ({
          total: acc.total + row.total,
          subtotal: acc.subtotal + row.subtotal,
          tax: acc.tax + row.tax,
          discount: acc.discount + row.discount,
        }),
        { total: 0, subtotal: 0, tax: 0, discount: 0 },
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
        <h2 className="dashboard-card-title">Revenue report</h2>
        {isLoading ? (
          <div className="dashboard-skeleton dashboard-skeleton-table" />
        ) : (
          <div className="dashboard-table-wrap">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Period</th>
                  <th>Total</th>
                  <th>Subtotal</th>
                  <th>Tax</th>
                  <th>Discount</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.period}>
                    <td>{row.period}</td>
                    <td>{formatCurrency(row.total)}</td>
                    <td>{formatCurrency(row.subtotal)}</td>
                    <td>{formatCurrency(row.tax)}</td>
                    <td>{formatCurrency(row.discount)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td>Total</td>
                  <td>{formatCurrency(totals.total)}</td>
                  <td>{formatCurrency(totals.subtotal)}</td>
                  <td>{formatCurrency(totals.tax)}</td>
                  <td>{formatCurrency(totals.discount)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </Card>

      <Card>
        <h2 className="dashboard-card-title">Revenue over time</h2>
        {isLoading ? (
          <div className="dashboard-skeleton dashboard-skeleton-chart" />
        ) : chartData.length ? (
          <BarChart data={chartData} />
        ) : (
          <p className="dashboard-empty-state">No revenue data for this period.</p>
        )}
      </Card>
    </div>
  );
}
