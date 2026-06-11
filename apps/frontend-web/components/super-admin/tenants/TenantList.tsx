import type { PlatformTenant } from "@/lib/super-admin-portal-types";
import { DataTable } from "@/components/super-admin/layout/DataTable";
import { TenantRow } from "@/components/super-admin/tenants/TenantRow";

export type TenantListProps = {
  tenants: PlatformTenant[];
};

export function TenantList({ tenants }: TenantListProps) {
  return (
    <DataTable
      columns={["Name", "Slug", "Locale", "Status", ""]}
      grid="tenants"
      emptyMessage="No tenants found. Create your first clinic tenant to get started."
      isEmpty={tenants.length === 0}
    >
      {tenants.map((tenant) => (
        <TenantRow key={tenant.id} tenant={tenant} />
      ))}
    </DataTable>
  );
}
