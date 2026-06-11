import { Badge } from "@/components/dashboard/Badge";
import type { BadgeVariant } from "@/components/dashboard/Badge";

export type StatusBadgeProps = {
  status?: string;
  className?: string;
};

function resolveVariant(status: string): BadgeVariant {
  const normalized = status.toLowerCase();
  if (normalized === "success" || normalized === "ok" || normalized === "active") {
    return "success";
  }
  if (normalized === "warning" || normalized === "pending") {
    return "warning";
  }
  return "danger";
}

export function StatusBadge({ status = "unknown", className }: StatusBadgeProps) {
  return (
    <Badge variant={resolveVariant(status)} className={className}>
      {status}
    </Badge>
  );
}
