import { Router } from "express";

import { validateRequest } from "../../middleware/validate.middleware";

import { asyncHandler } from "../../utils/async-handler";

import { getTenantProfile, updateTenantProfile } from "../onboarding/onboarding.service";

import { updateTenantProfileSchema } from "../onboarding/onboarding.validation";

import { buildTenantTrialInfo, syncTenantTrialStatus } from "../onboarding/trial.service";

export const tenantRouter = Router();

tenantRouter.get(
  "/trial",
  asyncHandler(async (req, res) => {
    const tenant = await syncTenantTrialStatus(req.tenantId!);
    res.json({ data: buildTenantTrialInfo(tenant) });
  }),
);

tenantRouter.get(
  "/profile",
  asyncHandler(async (req, res) => {
    const profile = await getTenantProfile(req.tenantId!);
    res.json({ data: profile });
  }),
);

tenantRouter.patch(
  "/profile",
  validateRequest(updateTenantProfileSchema),
  asyncHandler(async (req, res) => {
    const profile = await updateTenantProfile(req.tenantId!, req.body);
    res.json({ data: profile });
  }),
);
