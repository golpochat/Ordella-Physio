import { Badge } from "@/components/dashboard/Badge";
import type { ClinicStaffStatus } from "@/lib/clinic-staff-member-types";

export type StaffStatusBadgeProps = {
  status: ClinicStaffStatus;
};

export function StaffStatusBadge({ status }: StaffStatusBadgeProps) {
  return (
    <Badge variant={status === "ACTIVE" ? "success" : "danger"}>
      {status === "ACTIVE" ? "Active" : "Inactive"}
    </Badge>
  );
}
