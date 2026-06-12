"use client";

import { PageLoading } from "@/components/patient-portal/page-state";
import { useProviderConfigs } from "@/hooks/useNotificationProviders";
import { formatPortalDateTime } from "@/lib/clinic-portal-utils";
import { cn } from "@/lib/cn";

export function ProviderHealthStatus() {
  const configsQuery = useProviderConfigs();
  const configs = configsQuery.data?.data ?? [];

  if (configsQuery.isLoading) {
    return <PageLoading rows={3} />;
  }

  if (configs.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">No provider configurations to monitor.</p>
    );
  }

  return (
    <section className="provider-health-status space-y-3">
      <h2 className="text-lg font-semibold">Provider health</h2>
      <div className="grid gap-3 md:grid-cols-2">
        {configs.map((config) => (
          <article key={config.id} className="rounded-md border p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium">
                  {config.channel} · {config.provider}
                </p>
                <p className="text-sm text-muted-foreground">Priority {config.priority}</p>
              </div>
              <span
                className={cn(
                  "inline-flex rounded-full px-2 py-0.5 text-xs font-medium",
                  config.isHealthy && config.isActive
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-red-100 text-red-800",
                )}
              >
                {config.isHealthy && config.isActive ? "Healthy" : "Unhealthy"}
              </span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Last check:{" "}
              {config.lastHealthCheckAt
                ? formatPortalDateTime(config.lastHealthCheckAt)
                : "Not checked yet"}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
