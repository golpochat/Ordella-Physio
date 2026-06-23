import Link from "next/link";
import type { PlatformUser } from "@/lib/super-admin-portal-types";
import { Row } from "@/components/dashboard/Row";
import { RoleBadge } from "@/components/super-admin/users/RoleBadge";
import { TableActionLink } from "@/components/ui/table-row-actions";

export type UserRowUser = PlatformUser & {
  name?: string;
  tenant?: { name?: string };
};

export type UserRowProps = {
  user: UserRowUser;
};

function resolveName(user: UserRowUser): string {
  if (user?.name?.trim()) {
    return user.name.trim();
  }

  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ").trim();
  return fullName || user?.email || "Unnamed User";
}

export function UserRow({ user }: UserRowProps) {
  const role = user?.role ?? "UNKNOWN";
  const tenant = user?.tenant?.name ?? "N/A";
  const email = user?.email ?? "N/A";
  const name = resolveName(user);
  const tenantId = user?.tenantId ?? "";
  const userId = user?.id ?? "";

  return (
    <Row>
      <p className="dashboard-cell-primary">{name}</p>
      <p className="dashboard-cell-muted">{email}</p>
      <p className="dashboard-cell-muted">{tenant}</p>
      <RoleBadge role={role} />
      {userId && tenantId ? (
        <TableActionLink
          href={`/super-admin/users/${userId}?tenantId=${tenantId}`}
          label={`View user ${name}`}
          icon="view"
        />
      ) : (
        <span className="dashboard-cell-muted">N/A</span>
      )}
    </Row>
  );
}
