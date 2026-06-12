import type { AuditAction } from "@/lib/audit-types";

const ACTION_CLASS_MAP: Record<string, string> = {
  CREATE: "audit-action-create",
  UPDATE: "audit-action-update",
  DELETE: "audit-action-delete",
  STATUS_CHANGE: "audit-action-status-change",
  EXPORT: "audit-action-export",
  LOGIN: "audit-action-login",
};

export function getAuditActionClass(action: string): string {
  return ACTION_CLASS_MAP[action] ?? "audit-action-default";
}

export function formatRelativeAuditTime(iso: string, now = Date.now()): string {
  const timestamp = new Date(iso).getTime();
  if (Number.isNaN(timestamp)) {
    return "unknown";
  }

  const diffSec = Math.max(0, Math.floor((now - timestamp) / 1000));

  if (diffSec < 60) {
    return "just now";
  }

  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) {
    return `${diffMin} minute${diffMin === 1 ? "" : "s"} ago`;
  }

  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) {
    return `${diffHour} hour${diffHour === 1 ? "" : "s"} ago`;
  }

  const diffDay = Math.floor(diffHour / 24);
  if (diffDay < 30) {
    return `${diffDay} day${diffDay === 1 ? "" : "s"} ago`;
  }

  const diffMonth = Math.floor(diffDay / 30);
  if (diffMonth < 12) {
    return `${diffMonth} month${diffMonth === 1 ? "" : "s"} ago`;
  }

  const diffYear = Math.floor(diffMonth / 12);
  return `${diffYear} year${diffYear === 1 ? "" : "s"} ago`;
}

export function getEntityDetailHref(entityType: string, entityId: string): string | null {
  switch (entityType) {
    case "PATIENT":
      return `/clinic/patients/${entityId}`;
    case "APPOINTMENT":
      return `/clinic/appointments/${entityId}`;
    case "INVOICE":
      return `/billing/invoices/${entityId}`;
    default:
      return null;
  }
}

export function isAuditAction(value: string): value is AuditAction {
  return (
    value === "CREATE" ||
    value === "UPDATE" ||
    value === "DELETE" ||
    value === "STATUS_CHANGE" ||
    value === "LOGIN" ||
    value === "EXPORT" ||
    value === "PAY" ||
    value === "VIEW"
  );
}
