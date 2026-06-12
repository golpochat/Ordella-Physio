"use client";

import Link from "next/link";
import { useState } from "react";

import { BarChart } from "@/components/charts/bar-chart";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PageLoading } from "@/components/patient-portal/page-state";
import { useNotificationAnalytics } from "@/hooks/useNotificationProviders";
import type { NotificationChannel, NotificationProviderName } from "@/lib/notification-provider-types";

const CHANNEL_LABELS: Record<NotificationChannel, string> = {
  EMAIL: "Email",
  SMS: "SMS",
  PUSH: "Push",
  WHATSAPP: "WhatsApp",
  VIBER: "Viber",
};

const PROVIDER_LABELS: Record<NotificationProviderName, string> = {
  SENDGRID: "SendGrid",
  TWILIO: "Twilio",
  FIREBASE: "Firebase",
  VIBER: "Viber",
  NONE: "None",
};

export function NotificationAnalyticsDashboard() {
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [appliedFilters, setAppliedFilters] = useState({ dateStart: "", dateEnd: "" });

  const analyticsQuery = useNotificationAnalytics(appliedFilters);
  const data = analyticsQuery.data;

  const channelChartData =
    data &&
    (Object.entries(data.byChannel) as Array<[NotificationChannel, { sent: number; failed: number }]>)
      .filter(([, stats]) => stats.sent + stats.failed > 0)
      .map(([channel, stats]) => ({
        label: CHANNEL_LABELS[channel],
        value: stats.sent,
      }));

  const providerChartData =
    data &&
    (Object.entries(data.byProvider) as Array<[NotificationProviderName, { sent: number; failed: number }]>)
      .filter(([, stats]) => stats.sent + stats.failed > 0)
      .map(([provider, stats]) => ({
        label: PROVIDER_LABELS[provider],
        value: stats.sent + stats.failed,
      }));

  if (analyticsQuery.isLoading) {
    return <PageLoading rows={6} />;
  }

  if (analyticsQuery.isError) {
    return (
      <Card>
        <CardBody>
          <p className="text-destructive">Unable to load notification analytics.</p>
        </CardBody>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Notification analytics</h1>
          <p className="text-muted-foreground">
            Delivery performance by channel and provider for your tenant.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline">
            <Link href="/settings/notifications/providers">Providers</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/settings/notifications/logs">Delivery logs</Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Date range</CardTitle>
        </CardHeader>
        <CardBody className="flex flex-wrap items-end gap-4">
          <label className="grid gap-1 text-sm">
            <span>Start</span>
            <Input type="date" value={dateStart} onChange={(event) => setDateStart(event.target.value)} />
          </label>
          <label className="grid gap-1 text-sm">
            <span>End</span>
            <Input type="date" value={dateEnd} onChange={(event) => setDateEnd(event.target.value)} />
          </label>
          <Button
            type="button"
            onClick={() => setAppliedFilters({ dateStart, dateEnd })}
            disabled={analyticsQuery.isFetching}
          >
            Apply
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setDateStart("");
              setDateEnd("");
              setAppliedFilters({ dateStart: "", dateEnd: "" });
            }}
          >
            Reset
          </Button>
        </CardBody>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total sent</CardTitle>
          </CardHeader>
          <CardBody>
            <p className="text-3xl font-semibold">{data?.totals.sent ?? 0}</p>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total failed</CardTitle>
          </CardHeader>
          <CardBody>
            <p className="text-3xl font-semibold text-destructive">{data?.totals.failed ?? 0}</p>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Success rate</CardTitle>
          </CardHeader>
          <CardBody>
            <p className="text-3xl font-semibold">{data?.successRate ?? 100}%</p>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Queue status</CardTitle>
        </CardHeader>
        <CardBody className="grid gap-2 text-sm">
          <p>
            <span className="text-muted-foreground">Pending jobs:</span>{" "}
            <span className="font-medium">{data?.queue.pending ?? 0}</span>
          </p>
          <p>
            <span className="text-muted-foreground">Last processed:</span>{" "}
            <span className="font-medium">
              {data?.queue.lastProcessedAt
                ? new Date(data.queue.lastProcessedAt).toLocaleString()
                : "Not yet processed"}
            </span>
          </p>
        </CardBody>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Deliveries by channel</CardTitle>
          </CardHeader>
          <CardBody>
            {channelChartData?.length ? (
              <BarChart data={channelChartData} />
            ) : (
              <p className="text-sm text-muted-foreground">No channel data for this range.</p>
            )}
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Deliveries by provider</CardTitle>
          </CardHeader>
          <CardBody>
            {providerChartData?.length ? (
              <BarChart data={providerChartData} />
            ) : (
              <p className="text-sm text-muted-foreground">No provider data for this range.</p>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
