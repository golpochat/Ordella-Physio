import { Router } from "express";

import { authRateLimiter } from "../../middleware/rate-limit";

import { authMiddleware, requireAuth } from "../../middleware/tenant.middleware";

import { requireTenant } from "../../middleware/tenant";

import { validateRequest } from "../../middleware/validate.middleware";

import { asyncHandler } from "../../utils/async-handler";

import {
  completeCheckout,
  getOnboardingConfig,
  previewCheckout,
  registerWorkspace,
  startTrial,
} from "./onboarding.service";

import {
  checkoutPreviewSchema,
  completeCheckoutSchema,
  registerWorkspaceSchema,
  startTrialSchema,
} from "./onboarding.validation";

export const onboardingRouter = Router();

onboardingRouter.get(
  "/config",
  asyncHandler(async (_req, res) => {
    res.json({ data: getOnboardingConfig() });
  }),
);

onboardingRouter.post(
  "/register",
  authRateLimiter,
  validateRequest(registerWorkspaceSchema),
  asyncHandler(async (req, res) => {
    const result = await registerWorkspace({
      ...req.body,
      ipAddress: req.ip,
      userAgent: req.get("user-agent") ?? undefined,
    });
    res.status(201).json({ data: result });
  }),
);

onboardingRouter.post(
  "/start-trial",
  authRateLimiter,
  validateRequest(startTrialSchema),
  asyncHandler(async (req, res) => {
    const result = await startTrial({
      ...req.body,
      ipAddress: req.ip,
      userAgent: req.get("user-agent") ?? undefined,
    });
    res.status(201).json({ data: result });
  }),
);

onboardingRouter.post(
  "/checkout/preview",
  validateRequest(checkoutPreviewSchema),
  asyncHandler(async (req, res) => {
    res.json({ data: previewCheckout(req.body) });
  }),
);

onboardingRouter.post(
  "/checkout/complete",
  authMiddleware,
  requireAuth,
  requireTenant,
  validateRequest(completeCheckoutSchema),
  asyncHandler(async (req, res) => {
    const result = await completeCheckout(req.tenantId!, req.user!.id, {
      ...req.body,
      ipAddress: req.ip,
      userAgent: req.get("user-agent") ?? undefined,
    });
    res.status(201).json({ data: result });
  }),
);
