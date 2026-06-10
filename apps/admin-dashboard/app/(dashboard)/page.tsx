"use client";

import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart } from "@/components/charts/line-chart";
import { BarChart } from "@/components/charts/bar-chart";
import { useTranslation } from "@/components/i18n-provider";
import { formatCurrency, formatNumber } from "@/lib/helpers";

const APPOINTMENT_TREND = [
  { label: "Mon", value: 12 },
  { label: "Tue", value: 18 },
  { label: "Wed", value: 15 },
  { label: "Thu", value: 22 },
  { label: "Fri", value: 19 },
];

const REVENUE_TREND = [
  { label: "Jan", value: 4200 },
  { label: "Feb", value: 5100 },
  { label: "Mar", value: 4800 },
  { label: "Apr", value: 6200 },
];

const RECENT_ACTIVITY = [
  { id: 1, message: "New patient registered", time: "2m ago" },
  { id: 2, message: "Invoice #1042 paid", time: "15m ago" },
  { id: 3, message: "Appointment rescheduled", time: "1h ago" },
];

export default function DashboardPage() {
  const { t } = useTranslation();

  const kpis = [
    { label: t("dashboard.patients"), value: formatNumber(1284) },
    { label: t("dashboard.appointments"), value: formatNumber(86) },
    { label: t("dashboard.revenue"), value: formatCurrency(62400) },
    { label: t("dashboard.outstanding"), value: formatCurrency(4200) },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">{t("dashboard.title")}</h1>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label}>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.label}</CardTitle>
            </CardHeader>
            <CardBody>
              <p className="text-2xl font-bold">{kpi.value}</p>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t("dashboard.appointmentsTrend")}</CardTitle>
          </CardHeader>
          <CardBody>
            <LineChart data={APPOINTMENT_TREND} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t("dashboard.revenueTrend")}</CardTitle>
          </CardHeader>
          <CardBody>
            <BarChart data={REVENUE_TREND} />
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("dashboard.recentActivity")}</CardTitle>
        </CardHeader>
        <CardBody>
          <ul className="space-y-3">
            {RECENT_ACTIVITY.map((item) => (
              <li key={item.id} className="flex items-center justify-between text-sm">
                <span>{item.message}</span>
                <span className="text-muted-foreground">{item.time}</span>
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>
    </div>
  );
}
