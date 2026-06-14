import { Router } from "express";
import { asyncHandler } from "../../utils/async-handler";
import { validateRequest } from "../../middleware/validate.middleware";
import { policies } from "../rbac/policies";
import { notificationsController } from "./notifications.controller";
import {
  createNotificationSchema,
  listNotificationsQuerySchema,
  notificationIdParamSchema,
  sendNotificationSchema,
} from "./notifications.validation";

export const notificationsRouter = Router();

notificationsRouter.get(
  "/",
  policies.notificationsRead,
  validateRequest(listNotificationsQuerySchema, "query"),
  asyncHandler(notificationsController.list),
);

notificationsRouter.get(
  "/unread-count",
  policies.notificationsRead,
  asyncHandler(notificationsController.unreadCount),
);

notificationsRouter.get(
  "/templates",
  policies.notificationsWrite,
  asyncHandler(notificationsController.listTemplates),
);

notificationsRouter.post(
  "/send",
  policies.notificationsWrite,
  validateRequest(sendNotificationSchema),
  asyncHandler(notificationsController.send),
);

notificationsRouter.patch(
  "/:id/read",
  policies.notificationsRead,
  validateRequest(notificationIdParamSchema, "params"),
  asyncHandler(notificationsController.markRead),
);

notificationsRouter.post(
  "/",
  policies.notificationsWrite,
  validateRequest(createNotificationSchema),
  asyncHandler(notificationsController.create),
);
