import { z } from "zod";

export const listNotificationsSchema = z.object({
  unreadOnly: z.coerce.boolean().optional(),
  since: z.string().datetime().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
});

export const markNotificationsReadSchema = z.object({
  notificationIds: z.array(z.string().min(1)).min(1),
});

export const registerDeviceTokenSchema = z.object({
  token: z.string().min(1),
  platform: z.enum(["ios", "android", "web"]),
});

export const unregisterDeviceTokenSchema = z.object({
  token: z.string().min(1),
});

export type ListNotificationsInput = z.infer<typeof listNotificationsSchema>;
export type MarkNotificationsReadInput = z.infer<typeof markNotificationsReadSchema>;
export type RegisterDeviceTokenInput = z.infer<typeof registerDeviceTokenSchema>;
export type UnregisterDeviceTokenInput = z.infer<typeof unregisterDeviceTokenSchema>;
