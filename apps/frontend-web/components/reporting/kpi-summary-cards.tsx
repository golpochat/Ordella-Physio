import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import type { MetricsKpiResponse } from "@/lib/reporting-types";

type KpiSummaryCardsProps = {
  kpi?: MetricsKpiResponse;
  isLoading?: boolean;
};

const KPI_ITEMS: Array<{ key: keyof MetricsKpiResponse; label: string; prefix?: string }> = [
  { key: "totalAppointments", label: "Appointments" },
  { key: "completedAppointments", label: "Completed" },
  { key: "newPatients", label: "New patients" },
  { key: "revenue", label: "Revenue", prefix: "$" },
];

export function KpiSummaryCards({ kpi, isLoading }: KpiSummaryCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {KPI_ITEMS.map((item) => (
        <Card key={item.key}>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">{item.label}</CardTitle>
          </CardHeader>
          <CardBody>
            <p className="text-2xl font-semibold">
              {isLoading
                ? "—"
                : `${item.prefix ?? ""}${Number(kpi?.[item.key] ?? 0).toLocaleString()}`}
            </p>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
