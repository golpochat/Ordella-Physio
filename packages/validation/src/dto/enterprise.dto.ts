import { z } from "zod";
import { nonEmptyString, slugString } from "../zod/string-schemas";

export const ssoProviderSchema = z.enum(["saml", "azure_ad", "google_workspace", "oauth2"]);

export const webhookEventTypeSchema = z.enum([
  "appointment.created",
  "appointment.updated",
  "note.created",
  "invoice.generated",
  "message.created",
  "user.created",
]);

export const upsertSsoConfigSchema = z.object({
  provider: ssoProviderSchema,
  name: nonEmptyString,
  isEnabled: z.boolean().optional(),
  entityId: z.string().optional(),
  ssoUrl: z.string().url().optional(),
  certificate: z.string().optional(),
  clientId: z.string().optional(),
  clientSecret: z.string().optional(),
  issuerUrl: z.string().url().optional(),
  metadataUrl: z.string().url().optional(),
  redirectUri: z.string().url().optional(),
  scopes: z.array(z.string()).optional(),
  attributeMap: z.record(z.string()).optional(),
});

export const createPermissionGroupSchema = z.object({
  name: nonEmptyString,
  description: z.string().optional(),
  permissions: z.array(z.string()).min(1),
});

export const createCustomRoleSchema = z.object({
  name: nonEmptyString,
  slug: slugString,
  description: z.string().optional(),
  permissions: z.array(z.string()).min(1),
  parentRoleId: z.string().optional(),
  permissionGroupId: z.string().optional(),
});

export const updateCustomRoleSchema = z.object({
  name: nonEmptyString.optional(),
  description: z.string().optional(),
  permissions: z.array(z.string()).min(1).optional(),
  parentRoleId: z.string().nullable().optional(),
});

export const recordAuditSchema = z.object({
  action: nonEmptyString,
  resource: nonEmptyString,
  resourceId: z.string().optional(),
  status: z.enum(["success", "failure"]).optional(),
  metadata: z.record(z.unknown()).optional(),
  actorId: z.string().optional(),
  actorEmail: z.string().email().optional(),
  ipAddress: z.string().optional(),
});

export const recordActivitySchema = z.object({
  userId: z.string().optional(),
  eventType: nonEmptyString,
  source: nonEmptyString,
  status: z.enum(["success", "failure"]).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createApiKeySchema = z.object({
  name: nonEmptyString,
  scopes: z.array(z.string()).min(1),
  expiresAt: z.string().datetime().optional(),
});

export const createWebhookSchema = z.object({
  name: nonEmptyString,
  url: z.string().url(),
  secret: nonEmptyString.min(16),
  eventTypes: z.array(webhookEventTypeSchema).min(1),
  isEnabled: z.boolean().optional(),
  maxRetries: z.number().int().min(1).max(10).optional(),
});

export const updateWebhookSchema = z.object({
  name: nonEmptyString.optional(),
  url: z.string().url().optional(),
  secret: nonEmptyString.min(16).optional(),
  eventTypes: z.array(webhookEventTypeSchema).min(1).optional(),
  isEnabled: z.boolean().optional(),
  maxRetries: z.number().int().min(1).max(10).optional(),
});

export type UpsertSsoConfigInput = z.infer<typeof upsertSsoConfigSchema>;
export type CreatePermissionGroupInput = z.infer<typeof createPermissionGroupSchema>;
export type CreateCustomRoleInput = z.infer<typeof createCustomRoleSchema>;
export type UpdateCustomRoleInput = z.infer<typeof updateCustomRoleSchema>;
export type RecordAuditInput = z.infer<typeof recordAuditSchema>;
export type RecordActivityInput = z.infer<typeof recordActivitySchema>;
export type CreateApiKeyInput = z.infer<typeof createApiKeySchema>;
export type CreateWebhookInput = z.infer<typeof createWebhookSchema>;
export type UpdateWebhookInput = z.infer<typeof updateWebhookSchema>;
