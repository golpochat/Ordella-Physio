import type { NextFunction, Request, Response } from "express";

import { ForbiddenError } from "../utils/api-error";

import { assertTenantAllowsAccess, syncTenantTrialStatus } from "../modules/onboarding/trial.service";

const TRIAL_EXPIRED_ALLOWED_PREFIXES = ["/api/billing", "/api/tenant/trial", "/api/onboarding/checkout"];

const REGISTERED_ALLOWED_PREFIXES = [
  "/api/onboarding/checkout",
  "/api/tenant/profile",
  "/api/tenant/trial",
  "/api/auth",
];

function pathMatchesPrefixes(path: string, prefixes: string[]): boolean {
  return prefixes.some((prefix) => path === prefix || path.startsWith(`${prefix}/`));
}

export async function enforceTenantAccess(
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> {
  if (!req.tenantId) {
    next();
    return;
  }

  try {
    const tenant = await syncTenantTrialStatus(req.tenantId);
    const path = req.originalUrl.split("?")[0] ?? req.path;

    if (tenant.status === "REGISTERED") {
      if (!pathMatchesPrefixes(path, REGISTERED_ALLOWED_PREFIXES)) {
        next(new ForbiddenError("Complete checkout to activate your clinic workspace."));
        return;
      }

      next();
      return;
    }

    if (
      tenant.status === "TRIAL_EXPIRED" ||
      (tenant.trialEnd && tenant.trialEnd.getTime() < Date.now() && tenant.status === "TRIALING")
    ) {
      if (!pathMatchesPrefixes(path, TRIAL_EXPIRED_ALLOWED_PREFIXES)) {
        next(new ForbiddenError("Your free trial has ended. Please upgrade to continue."));
        return;
      }

      next();
      return;
    }

    assertTenantAllowsAccess(tenant);
    next();
  } catch (error) {
    next(error);
  }
}
