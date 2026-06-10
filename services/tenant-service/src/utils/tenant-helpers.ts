import type { StaffRole, SubscriptionPlan } from "@/generated/prisma";
import { DEFAULT_TENANT_SETTINGS } from "@/constants";

export type AuthenticatedTenantUser = {
  userId: string;
  tenantId: string;
  role: string;
  email?: string;
  permissions?: string[];
};

export function buildDefaultTenantSettings() {
  return {
    timezone: DEFAULT_TENANT_SETTINGS.timezone,
    currency: DEFAULT_TENANT_SETTINGS.currency,
    isActive: true,
  };
}

export function buildDefaultBranding() {
  return {
    primaryColor: "#0f766e",
    secondaryColor: "#f0fdfa",
    theme: DEFAULT_TENANT_SETTINGS.theme,
    emailTemplateKey: "default",
  };
}

export function buildDefaultSubscription(plan: SubscriptionPlan = "STARTER") {
  return {
    plan,
    usageCurrent: 0,
    usageLimit: null,
  };
}

export function isAdminRole(role: string): boolean {
  return role === "OWNER" || role === "ADMIN";
}

export function canAssignStaffRole(actorRole: string, targetRole: StaffRole): boolean {
  if (actorRole === "OWNER") {
    return true;
  }

  if (actorRole === "ADMIN") {
    return targetRole !== "OWNER";
  }

  return false;
}

export function slugifyTenantName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
