import { Badge } from "@/components/dashboard/Badge";

export type OrganizationStatusBadgeProps = {
  status: "ACTIVE" | "INACTIVE";
};

export function OrganizationStatusBadge({ status }: OrganizationStatusBadgeProps) {
  return (
    <Badge variant={status === "ACTIVE" ? "success" : "danger"}>
      {status === "ACTIVE" ? "Active" : "Inactive"}
    </Badge>
  );
}
