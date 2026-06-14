"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/table";
import type { PortalCapability } from "@/lib/portal-capabilities";
import { cn } from "@/lib/cn";
import { TenantScopeBanner } from "./tenant-scope-banner";
import { useClinicScope } from "./use-clinic-scope";

export type ClinicDataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  searchPlaceholder?: string;
  searchColumn?: string;
  className?: string;
  readCapability?: PortalCapability;
  writeCapability?: PortalCapability;
  showTenantBanner?: boolean;
  emptyMessage?: string;
};

export function ClinicDataTable<TData, TValue>({
  readCapability = "patients:read",
  writeCapability,
  showTenantBanner = true,
  emptyMessage,
  className,
  data,
  ...props
}: ClinicDataTableProps<TData, TValue>) {
  const { can, hasTenant } = useClinicScope();
  const canRead = can(readCapability);
  const canWrite = writeCapability ? can(writeCapability) : false;

  if (!hasTenant) {
    return showTenantBanner ? <TenantScopeBanner /> : null;
  }

  if (!canRead) {
    return (
      <div className={cn("rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground", className)}>
        You do not have permission to view this data.
      </div>
    );
  }

  return (
    <div className={cn("space-y-3", className)}>
      {showTenantBanner ? <TenantScopeBanner /> : null}
      {writeCapability ? (
        <p className="text-xs text-muted-foreground">
          {canWrite ? "You can manage records in this table." : "Read-only view for your role."}
        </p>
      ) : null}
      <DataTable
        {...props}
        data={data}
      />
      {!props.isLoading && data.length === 0 && emptyMessage ? (
        <p className="text-center text-sm text-muted-foreground">{emptyMessage}</p>
      ) : null}
    </div>
  );
}
