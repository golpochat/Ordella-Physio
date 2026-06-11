import type { PlatformUser } from "@/lib/super-admin-portal-types";
import { DataTable } from "@/components/super-admin/layout/DataTable";
import { UserRow } from "@/components/super-admin/users/UserRow";

export type UserListProps = {
  users: Array<PlatformUser & { tenant?: { name?: string } }>;
};

export function UserList({ users }: UserListProps) {
  return (
    <DataTable
      columns={["Name", "Email", "Tenant", "Role", ""]}
      grid="users"
      emptyMessage="No users found. Create users or assign staff across tenants."
      isEmpty={users.length === 0}
    >
      {users.map((user) => (
        <UserRow key={`${user.tenantId}-${user.id}`} user={user} />
      ))}
    </DataTable>
  );
}
