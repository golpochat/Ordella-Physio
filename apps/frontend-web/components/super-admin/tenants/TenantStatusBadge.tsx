import { Badge } from "@/components/dashboard/Badge";

export type TenantStatusBadgeProps = {
  isActive?: boolean;
};

export function TenantStatusBadge({ isActive = false }: TenantStatusBadgeProps) {
  return (
    <Badge variant={isActive ? "success" : "danger"}>
      {isActive ? "Active" : "Inactive"}
    </Badge>
  );
}
