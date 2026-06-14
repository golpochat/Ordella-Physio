import type { Request, Response } from "express";
import { auditContextFromRequest } from "../utilities/audit.service";
import {
  createNotification,
  getUnreadCount,
  listNotificationTemplates,
  listNotifications,
  markNotificationRead,
  sendNotification,
} from "./notifications.service";
import type { CreateNotificationBody, ListNotificationsQuery, SendNotificationBody } from "./notifications.validation";

export const notificationsController = {
  list: async (req: Request, res: Response) => {
    const result = await listNotifications(req.tenantId!, req.user!.id, req.query as unknown as ListNotificationsQuery);
    res.json({ data: result });
  },

  unreadCount: async (req: Request, res: Response) => {
    const result = await getUnreadCount(req.tenantId!, req.user!.id);
    res.json({ data: result });
  },

  markRead: async (req: Request, res: Response) => {
    const notification = await markNotificationRead(
      req.tenantId!,
      req.user!.id,
      String(req.params.id),
      auditContextFromRequest(req),
    );
    res.json({ data: notification });
  },

  create: async (req: Request, res: Response) => {
    const notification = await createNotification(
      req.tenantId!,
      req.body as CreateNotificationBody,
      auditContextFromRequest(req),
    );
    res.status(201).json({ data: notification });
  },

  listTemplates: async (_req: Request, res: Response) => {
    res.json({ data: listNotificationTemplates() });
  },

  send: async (req: Request, res: Response) => {
    const result = await sendNotification(
      req.tenantId!,
      req.user!.id,
      req.body as SendNotificationBody,
    );
    res.status(202).json({ data: result });
  },
};
