import Link from "next/link";
import type { PlatformRole } from "@/lib/super-admin-portal-types";
import { Row } from "@/components/dashboard/Row";
import { RoleBadge } from "@/components/super-admin/users/RoleBadge";

export type RoleRowProps = {
  role: PlatformRole;
};

export function RoleRow({ role }: RoleRowProps) {
  const name = role?.name ?? "UNKNOWN";
  const description = role?.description ?? "No description";
  const level = role?.level ?? 0;
  const permissionCount = role?.permissions?.length ?? 0;
  const roleId = role?.id ?? "";

  return (
    <Row>
      <p className="dashboard-cell-primary">{name}</p>
      <p className="dashboard-cell-muted">{description}</p>
      <RoleBadge role={name} />
      <p className="dashboard-cell-muted">
        Level {level} · {permissionCount} permissions
      </p>
      {roleId ? (
        <Link href={`/super-admin/roles/${roleId}`} className="dashboard-link">
          View role
        </Link>
      ) : (
        <span className="dashboard-cell-muted">N/A</span>
      )}
    </Row>
  );
}
