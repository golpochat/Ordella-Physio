import { Badge } from "@/components/dashboard/Badge";

export type TenantStatusBadgeProps = {
  status?: "ACTIVE" | "SUSPENDED";
  isActive?: boolean;
};

export function TenantStatusBadge({ status, isActive = false }: TenantStatusBadgeProps) {
  const resolvedStatus = status ?? (isActive ? "ACTIVE" : "SUSPENDED");

  return (
    <Badge variant={resolvedStatus === "ACTIVE" ? "success" : "danger"}>
      {resolvedStatus === "ACTIVE" ? "Active" : "Suspended"}
    </Badge>
  );
}
