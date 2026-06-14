"use client";

export { DatePicker } from "@/components/ui/date-picker";
export type { DatePickerProps } from "@/components/ui/date-picker";

import { DatePicker as BaseDatePicker } from "@/components/ui/date-picker";
import { Input, Label } from "@/components/ui/input";
import { cn } from "@/lib/cn";
import { TenantScopeBanner } from "./tenant-scope-banner";
import { useClinicScope } from "./use-clinic-scope";

export type ClinicDateRangePickerProps = {
  startId?: string;
  endId?: string;
  startLabel?: string;
  endLabel?: string;
  startValue: string;
  endValue: string;
  onStartChange: (value: string) => void;
  onEndChange: (value: string) => void;
  className?: string;
  showTenantBanner?: boolean;
};

export function ClinicDatePicker(
  props: React.ComponentProps<typeof BaseDatePicker> & { showTenantBanner?: boolean },
) {
  const { showTenantBanner = false, className, ...rest } = props;
  const { hasTenant } = useClinicScope();

  if (!hasTenant) {
    return showTenantBanner ? <TenantScopeBanner /> : null;
  }

  return <BaseDatePicker className={className} {...rest} />;
}

export function ClinicDateRangePicker({
  startId = "start-date",
  endId = "end-date",
  startLabel = "From",
  endLabel = "To",
  startValue,
  endValue,
  onStartChange,
  onEndChange,
  className,
  showTenantBanner = false,
}: ClinicDateRangePickerProps) {
  const { hasTenant } = useClinicScope();

  if (!hasTenant) {
    return showTenantBanner ? <TenantScopeBanner /> : null;
  }

  return (
    <div className={cn("grid gap-4 sm:grid-cols-2", className)}>
      <ClinicDatePicker id={startId} label={startLabel} value={startValue} onChange={onStartChange} />
      <ClinicDatePicker id={endId} label={endLabel} value={endValue} onChange={onEndChange} />
    </div>
  );
}

export function ClinicDateTimeField({
  id,
  label,
  value,
  onChange,
  className,
}: {
  id: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  const { hasTenant } = useClinicScope();
  if (!hasTenant) return null;

  return (
    <div className={cn("space-y-2", className)}>
      {label ? <Label htmlFor={id}>{label}</Label> : null}
      <Input
        id={id}
        type="datetime-local"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
