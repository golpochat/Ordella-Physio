import type { ExportColumn } from "@/reports/report-export.service";

export function buildReportExportCsv(
  columns: ExportColumn[],
  rows: Array<Record<string, string | number>>,
): string {
  const header = columns.map((column) => escapeCsv(column.label)).join(",");
  const body = rows.map((row) =>
    columns.map((column) => escapeCsv(String(row[column.key] ?? ""))).join(","),
  );

  return [header, ...body].join("\n");
}

function escapeCsv(value: string): string {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }

  return value;
}
