import type { PlatformRole } from "@/lib/super-admin-portal-types";
import { DataTable } from "@/components/super-admin/layout/DataTable";
import { RoleRow } from "@/components/super-admin/roles/RoleRow";

export type RoleListProps = {
  roles: PlatformRole[];
};

export function RoleList({ roles }: RoleListProps) {
  return (
    <DataTable
      columns={["Role", "Description", "Type", "Details", ""]}
      grid="roles"
      emptyMessage="No roles found. Define platform roles and permissions."
      isEmpty={roles.length === 0}
    >
      {roles.map((role) => (
        <RoleRow key={role.id} role={role} />
      ))}
    </DataTable>
  );
}
