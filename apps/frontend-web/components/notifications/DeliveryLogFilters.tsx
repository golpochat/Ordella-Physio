"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type {
  DeliveryLogListFilters,
  DeliveryStatus,
  NotificationChannel,
  NotificationProviderName,
} from "@/lib/notification-provider-types";

const CHANNELS: NotificationChannel[] = ["EMAIL", "SMS", "PUSH", "WHATSAPP", "VIBER"];
const PROVIDERS: NotificationProviderName[] = ["SENDGRID", "TWILIO", "FIREBASE", "VIBER", "NONE"];
const STATUSES: DeliveryStatus[] = ["SUCCESS", "FAILED"];

type DeliveryLogFiltersProps = {
  value: DeliveryLogListFilters;
  onChange: (value: DeliveryLogListFilters) => void;
  onReset: () => void;
};

export function DeliveryLogFilters({ value, onChange, onReset }: DeliveryLogFiltersProps) {
  return (
    <div className="delivery-log-filters grid gap-4 rounded-md border p-4 md:grid-cols-2 lg:grid-cols-3">
      <label className="space-y-1 text-sm">
        <span className="font-medium">Channel</span>
        <select
          className="w-full rounded-md border bg-background px-3 py-2"
          value={value.channel ?? ""}
          onChange={(event) =>
            onChange({
              ...value,
              channel: (event.target.value || undefined) as NotificationChannel | undefined,
            })
          }
        >
          <option value="">All channels</option>
          {CHANNELS.map((channel) => (
            <option key={channel} value={channel}>
              {channel}
            </option>
          ))}
        </select>
      </label>

      <label className="space-y-1 text-sm">
        <span className="font-medium">Provider</span>
        <select
          className="w-full rounded-md border bg-background px-3 py-2"
          value={value.provider ?? ""}
          onChange={(event) =>
            onChange({
              ...value,
              provider: (event.target.value || undefined) as NotificationProviderName | undefined,
            })
          }
        >
          <option value="">All providers</option>
          {PROVIDERS.map((provider) => (
            <option key={provider} value={provider}>
              {provider}
            </option>
          ))}
        </select>
      </label>

      <label className="space-y-1 text-sm">
        <span className="font-medium">Status</span>
        <select
          className="w-full rounded-md border bg-background px-3 py-2"
          value={value.status ?? ""}
          onChange={(event) =>
            onChange({
              ...value,
              status: (event.target.value || undefined) as DeliveryStatus | undefined,
            })
          }
        >
          <option value="">All statuses</option>
          {STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </label>

      <label className="space-y-1 text-sm">
        <span className="font-medium">Keyword</span>
        <Input
          value={value.keyword ?? ""}
          placeholder="Search error or payload"
          onChange={(event) => onChange({ ...value, keyword: event.target.value || undefined })}
        />
      </label>

      <label className="space-y-1 text-sm">
        <span className="font-medium">Date start</span>
        <Input
          type="date"
          value={value.dateStart ?? ""}
          onChange={(event) => onChange({ ...value, dateStart: event.target.value || undefined })}
        />
      </label>

      <label className="space-y-1 text-sm">
        <span className="font-medium">Date end</span>
        <Input
          type="date"
          value={value.dateEnd ?? ""}
          onChange={(event) => onChange({ ...value, dateEnd: event.target.value || undefined })}
        />
      </label>

      <div className="flex items-end">
        <Button type="button" variant="outline" onClick={onReset}>
          Reset filters
        </Button>
      </div>
    </div>
  );
}
