import Link from "next/link";
import type { PlatformTenant } from "@/lib/super-admin-portal-types";
import { Row } from "@/components/dashboard/Row";
import { TenantStatusBadge } from "@/components/super-admin/tenants/TenantStatusBadge";

export type TenantRowProps = {
  tenant: PlatformTenant;
};

export function TenantRow({ tenant }: TenantRowProps) {
  const name = tenant?.name ?? "Unnamed tenant";
  const slug = tenant?.slug ?? "N/A";
  const locale = `${tenant?.timezone ?? "N/A"} · ${tenant?.currency ?? "N/A"}`;
  const tenantId = tenant?.id ?? "";

  return (
    <Row>
      <p className="dashboard-cell-primary">{name}</p>
      <p className="dashboard-cell-muted">{slug}</p>
      <p className="dashboard-cell-muted">{locale}</p>
      <TenantStatusBadge status={tenant?.status} isActive={tenant?.isActive} />
      {tenantId ? (
        <Link href={`/super-admin/tenants/${tenantId}`} className="dashboard-link">
          Manage tenant
        </Link>
      ) : (
        <span className="dashboard-cell-muted">N/A</span>
      )}
    </Row>
  );
}
