import { Badge } from "@/components/dashboard/Badge";
import type { ClinicLocation } from "@/lib/clinic-portal-types";

export type LocationStatusBadgeProps = {
  status: ClinicLocation["status"];
};

export function LocationStatusBadge({ status }: LocationStatusBadgeProps) {
  return (
    <Badge variant={status === "ACTIVE" ? "success" : "danger"}>
      {status === "ACTIVE" ? "Active" : "Inactive"}
    </Badge>
  );
}
