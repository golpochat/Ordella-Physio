import type { Tenant, TenantStatus } from "@prisma/client";

import { env } from "../../config";

import { prisma } from "../../lib/prisma";

import { ForbiddenError } from "../../utils/api-error";

export function getTrialDurationDays(): number {
  return env.TRIAL_DURATION_DAYS;
}

export type TenantTrialInfo = {
  status: TenantStatus;
  trialStart: Date | null;
  trialEnd: Date | null;
  trialDaysRemaining: number | null;
  trialExpired: boolean;
  subscriptionPlan: string | null;
  trialDurationDays: number;
};

export function computeTrialDaysRemaining(trialEnd: Date | null): number | null {
  if (!trialEnd) {
    return null;
  }

  const ms = trialEnd.getTime() - Date.now();
  return Math.max(0, Math.ceil(ms / (24 * 60 * 60 * 1000)));
}

export function buildTenantTrialInfo(
  tenant: Pick<Tenant, "status" | "trialStart" | "trialEnd" | "subscriptionPlan">,
): TenantTrialInfo {
  const trialExpired =
    tenant.status === "TRIAL_EXPIRED" ||
    (tenant.trialEnd !== null && tenant.trialEnd.getTime() < Date.now());

  return {
    status: tenant.status,
    trialStart: tenant.trialStart,
    trialEnd: tenant.trialEnd,
    trialDaysRemaining: computeTrialDaysRemaining(tenant.trialEnd),
    trialExpired,
    subscriptionPlan: tenant.subscriptionPlan,
    trialDurationDays: getTrialDurationDays(),
  };
}

export async function syncTenantTrialStatus(tenantId: string): Promise<Tenant> {
  const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } });
  if (!tenant) {
    throw new ForbiddenError("Tenant not found");
  }

  if (
    tenant.status === "TRIALING" &&
    tenant.trialEnd &&
    tenant.trialEnd.getTime() < Date.now()
  ) {
    return prisma.tenant.update({
      where: { id: tenantId },
      data: { status: "TRIAL_EXPIRED" },
    });
  }

  return tenant;
}

export function assertTenantAllowsAccess(
  tenant: Tenant,
  options?: { allowTrialExpired?: boolean; allowRegistered?: boolean },
): void {
  if (tenant.status === "SUSPENDED") {
    throw new ForbiddenError("This clinic account has been suspended.");
  }

  if (tenant.status === "REGISTERED" && !options?.allowRegistered) {
    throw new ForbiddenError("Complete checkout to activate your clinic workspace.");
  }

  if (!options?.allowTrialExpired && tenant.status === "TRIAL_EXPIRED") {
    throw new ForbiddenError("Your free trial has ended. Please upgrade to continue.");
  }

  if (
    !options?.allowTrialExpired &&
    tenant.status === "TRIALING" &&
    tenant.trialEnd &&
    tenant.trialEnd.getTime() < Date.now()
  ) {
    throw new ForbiddenError("Your free trial has ended. Please upgrade to continue.");
  }
}
