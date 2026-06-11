import { Badge } from "@/components/dashboard/Badge";
import type { ClinicUser } from "@/lib/clinic-portal-types";

export type UserStatusBadgeProps = {
  status: ClinicUser["status"];
};

export function UserStatusBadge({ status }: UserStatusBadgeProps) {
  return (
    <Badge variant={status === "ACTIVE" ? "success" : "danger"}>
      {status === "ACTIVE" ? "Active" : "Disabled"}
    </Badge>
  );
}
