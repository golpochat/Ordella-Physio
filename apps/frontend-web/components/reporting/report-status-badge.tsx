import { Badge } from "@/components/ui/badge";
import { REPORT_STATUS_LABELS } from "@/lib/reporting-config";
import type { ReportStatus } from "@/lib/reporting-types";

const STATUS_VARIANT: Record<ReportStatus, "default" | "secondary" | "outline"> = {
  pending: "secondary",
  processing: "outline",
  completed: "default",
  failed: "secondary",
};

export function ReportStatusBadge({ status }: { status: ReportStatus }) {
  return <Badge variant={STATUS_VARIANT[status]}>{REPORT_STATUS_LABELS[status] ?? status}</Badge>;
}
