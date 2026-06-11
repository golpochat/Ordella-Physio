import { Badge } from "@/components/dashboard/Badge";
import type { BadgeVariant } from "@/components/dashboard/Badge";

const ROLE_VARIANTS: Record<string, BadgeVariant> = {
  PATIENT: "info",
  STAFF: "warning",
  THERAPIST: "info",
  PHARMACY: "success",
  ADMIN: "danger",
  OWNER: "danger",
  CLINIC_ADMIN: "danger",
  SYSTEM: "muted",
  UNKNOWN: "muted",
};

const ROLE_ALIASES: Record<string, string> = {
  CLINIC_ADMIN: "ADMIN",
  SUPER_ADMIN: "SYSTEM",
  USER: "PATIENT",
};

function resolveRoleKey(role?: string): string {
  const normalized = (role ?? "UNKNOWN").toUpperCase();
  return ROLE_ALIASES[normalized] ?? normalized;
}

export type RoleBadgeProps = {
  role?: string;
  className?: string;
};

export function RoleBadge({ role, className }: RoleBadgeProps) {
  const roleKey = resolveRoleKey(role);
  const variant = ROLE_VARIANTS[roleKey] ?? "muted";

  return (
    <Badge variant={variant} className={className}>
      {roleKey}
    </Badge>
  );
}
