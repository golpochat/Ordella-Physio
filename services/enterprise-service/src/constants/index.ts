export const ENTERPRISE_PERMISSIONS_CATALOG = [
  "patient.read",
  "patient.write",
  "appointment.read",
  "appointment.write",
  "notes.read",
  "notes.write",
  "billing.read",
  "billing.write",
  "messaging.read",
  "messaging.write",
  "reporting.read",
  "reporting.write",
  "enterprise.sso.manage",
  "enterprise.roles.manage",
  "enterprise.audit.read",
  "enterprise.activity.read",
  "enterprise.apikeys.manage",
  "enterprise.webhooks.manage",
] as const;

export const WEBHOOK_EVENT_TYPES = [
  "appointment.created",
  "appointment.updated",
  "note.created",
  "invoice.generated",
  "message.created",
  "user.created",
] as const;

export type WebhookEventType = (typeof WEBHOOK_EVENT_TYPES)[number];

export const SSO_PROVIDERS = ["saml", "azure_ad", "google_workspace", "oauth2"] as const;

export type SsoProvider = (typeof SSO_PROVIDERS)[number];
