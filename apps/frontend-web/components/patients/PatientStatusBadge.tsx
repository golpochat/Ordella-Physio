import { Badge } from "@/components/dashboard/Badge";
import type { ClinicPatientStatus } from "@/lib/clinic-portal-types";

export type PatientStatusBadgeProps = {
  status: ClinicPatientStatus;
};

export function PatientStatusBadge({ status }: PatientStatusBadgeProps) {
  return (
    <Badge variant={status === "ACTIVE" ? "success" : "danger"}>
      {status === "ACTIVE" ? "Active" : "Inactive"}
    </Badge>
  );
}
