import { Router } from "express";
import { asyncHandler } from "../../utils/async-handler";
import { validateRequest } from "../../middleware/validate.middleware";
import { requireAuth, requireTenant } from "../../middleware/tenant.middleware";
import { getCurrentUser, login, refresh, registerTenantUser, updateCurrentUser } from "./auth.service";
import { loginSchema, refreshSchema, registerUserSchema, updateProfileSchema } from "./auth.validation";

export const authRouter = Router();

authRouter.post(
  "/login",
  validateRequest(loginSchema),
  asyncHandler(async (req, res) => {
    const result = await login({
      ...req.body,
      ipAddress: req.ip,
      userAgent: req.get("user-agent") ?? undefined,
    });
    res.json({ data: result });
  }),
);

authRouter.post(
  "/refresh",
  validateRequest(refreshSchema),
  asyncHandler(async (req, res) => {
    const result = await refresh(req.body.refreshToken);
    res.json({ data: result });
  }),
);

authRouter.post(
  "/register",
  requireTenant,
  requireAuth,
  validateRequest(registerUserSchema),
  asyncHandler(async (req, res) => {
    const result = await registerTenantUser({
      tenantId: req.tenantId!,
      ...req.body,
    });
    res.status(201).json({ data: result });
  }),
);

authRouter.get(
  "/me",
  requireTenant,
  requireAuth,
  asyncHandler(async (req, res) => {
    const user = await getCurrentUser(req.user!.id, req.tenantId!);
    res.json({ data: user });
  }),
);

authRouter.get(
  "/users/me",
  requireTenant,
  requireAuth,
  asyncHandler(async (req, res) => {
    const user = await getCurrentUser(req.user!.id, req.tenantId!);
    res.json({
      data: {
        user: {
          ...user,
          role: user.roles[0] ?? "STAFF",
        },
      },
    });
  }),
);

authRouter.patch(
  "/users/me",
  requireTenant,
  requireAuth,
  validateRequest(updateProfileSchema),
  asyncHandler(async (req, res) => {
    const user = await updateCurrentUser(req.user!.id, req.tenantId!, req.body);
    res.json({ data: { user: { ...user, role: user.roles[0] ?? "STAFF" } } });
  }),
);

authRouter.put(
  "/users/me",
  requireTenant,
  requireAuth,
  validateRequest(updateProfileSchema),
  asyncHandler(async (req, res) => {
    const user = await updateCurrentUser(req.user!.id, req.tenantId!, req.body);
    res.json({ data: { user: { ...user, role: user.roles[0] ?? "STAFF" } } });
  }),
);

authRouter.post(
  "/logout",
  requireTenant,
  requireAuth,
  asyncHandler(async (_req, res) => {
    res.status(204).send();
  }),
);
