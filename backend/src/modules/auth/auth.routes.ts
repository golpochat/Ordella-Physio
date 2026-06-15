import { Router } from "express";
import { asyncHandler } from "../../utils/async-handler";
import { validateRequest } from "../../middleware/validate.middleware";
import { Permission, requirePermission } from "../../middleware/permissions";
import { withAudit } from "../../middleware/audit";
import { authRateLimiter } from "../../middleware/rate-limit";
import { issueCsrfToken } from "../../middleware/csrf";
import { requireAuth } from "../../middleware/tenant.middleware";
import { requireTenant } from "../../middleware/tenant";
import {
  getCurrentUser,
  login,
  logout,
  refresh,
  registerTenantUser,
  requestPasswordReset,
  updateCurrentUser,
} from "./auth.service";
import { getTenantUser, listTenantUsers } from "./users.service";
import {
  forgotPasswordSchema,
  loginSchema,
  listUsersQuerySchema,
  logoutSchema,
  refreshSchema,
  registerUserSchema,
  updateProfileSchema,
  userIdParamSchema,
} from "./auth.validation";

export const authRouter = Router();

authRouter.get(
  "/csrf",
  asyncHandler(async (req, res) => {
    const token = issueCsrfToken(req, res);
    res.json({ data: { csrfToken: token } });
  }),
);

authRouter.post(
  "/login",
  authRateLimiter,
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
  authRateLimiter,
  validateRequest(refreshSchema),
  asyncHandler(async (req, res) => {
    const result = await refresh(req.body.refreshToken);
    res.json({ data: result });
  }),
);

authRouter.post(
  "/forgot-password",
  authRateLimiter,
  validateRequest(forgotPasswordSchema),
  asyncHandler(async (req, res) => {
    const result = await requestPasswordReset({
      ...req.body,
      ipAddress: req.ip,
    });
    res.json({ data: result });
  }),
);

authRouter.post(
  "/register",
  authRateLimiter,
  requireAuth,
  requireTenant,
  requirePermission(Permission.USER_MANAGE),
  validateRequest(registerUserSchema),
  withAudit("create", "user")(async (req, res) => {
    const result = await registerTenantUser({
      tenantId: req.tenantId!,
      ...req.body,
    });
    res.status(201).json({ data: result });
  }),
);

authRouter.get(
  "/me",
  requireAuth,
  requireTenant,
  asyncHandler(async (req, res) => {
    const user = await getCurrentUser(req.user!.id, req.tenantId!);
    res.json({ data: user });
  }),
);

authRouter.get(
  "/users/me",
  requireAuth,
  requireTenant,
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
  requireAuth,
  requireTenant,
  validateRequest(updateProfileSchema),
  asyncHandler(async (req, res) => {
    const user = await updateCurrentUser(req.user!.id, req.tenantId!, req.body);
    res.json({ data: { user: { ...user, role: user.roles[0] ?? "STAFF" } } });
  }),
);

authRouter.put(
  "/users/me",
  requireAuth,
  requireTenant,
  validateRequest(updateProfileSchema),
  asyncHandler(async (req, res) => {
    const user = await updateCurrentUser(req.user!.id, req.tenantId!, req.body);
    res.json({ data: { user: { ...user, role: user.roles[0] ?? "STAFF" } } });
  }),
);

authRouter.get(
  "/users",
  requireAuth,
  requireTenant,
  requirePermission(Permission.USER_MANAGE),
  validateRequest(listUsersQuerySchema, "query"),
  asyncHandler(async (req, res) => {
    const result = await listTenantUsers(req.tenantId!, req.query as never);
    res.json(result);
  }),
);

authRouter.get(
  "/users/:id",
  requireAuth,
  requireTenant,
  requirePermission(Permission.USER_MANAGE),
  validateRequest(userIdParamSchema, "params"),
  asyncHandler(async (req, res) => {
    const user = await getTenantUser(req.tenantId!, String(req.params.id));
    res.json({ data: user });
  }),
);

authRouter.post(
  "/logout",
  requireAuth,
  requireTenant,
  validateRequest(logoutSchema),
  asyncHandler(async (req, res) => {
    await logout({
      userId: req.user!.id,
      refreshToken: req.body.refreshToken,
      accessTokenJti: req.body.accessTokenJti,
      accessTokenExp: req.body.accessTokenExp,
    });
    res.status(204).send();
  }),
);
