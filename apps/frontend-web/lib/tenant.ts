import type { TenantState } from "@/store/tenant.store";

export type TenantTheme = "admin" | "clinic" | "therapist" | "patient";

export function resolveTenantTheme(tenant: TenantState | null): TenantTheme {
  if (!tenant?.portalType) {
    return "clinic";
  }
  return tenant.portalType;
}

export function applyTenantTheme(theme: TenantTheme): void {
  if (typeof document === "undefined") {
    return;
  }
  document.documentElement.setAttribute("data-tenant-theme", theme);
}

export function resolveTenantFromHost(host: string | null): string | undefined {
  if (!host) {
    return undefined;
  }
  const [subdomain] = host.split(".");
  if (!subdomain || subdomain === "localhost" || subdomain === "www") {
    return undefined;
  }
  return subdomain;
}
