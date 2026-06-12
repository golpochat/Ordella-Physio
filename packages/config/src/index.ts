export * from "./env";
export * from "./constants";
export * from "./utils";

export { authConfig, type AuthConfig } from "./services/auth";
export { tenantConfig, type TenantConfig } from "./services/tenant";
export { patientConfig, type PatientConfig } from "./services/patient";
export { appointmentConfig, type AppointmentConfig } from "./services/appointment";
export { notesConfig, type NotesConfig } from "./services/notes";
export { billingConfig, type BillingConfig } from "./services/billing";
export { paymentConfig, type PaymentConfig } from "./services/payment";
export { communicationConfig, type CommunicationConfig } from "./services/communication";
export { reportingConfig, type ReportingConfig } from "./services/reporting";
export { messagingConfig, type MessagingConfig } from "./services/messaging";
export { notificationConfig, type NotificationConfig } from "./services/notification";
export { aiNotesConfig, type AiNotesConfig } from "./services/ai-notes";
export { marketplaceConfig, type MarketplaceConfig } from "./services/marketplace";
export { enterpriseConfig, type EnterpriseConfig } from "./services/enterprise";
export { organizationConfig, type OrganizationConfig } from "./services/organization";
export { terminalConfig, type TerminalConfig } from "./services/terminal";
export { userRoleConfig, type UserRoleConfig } from "./services/user-role";
export { staffConfig, type StaffConfig } from "./services/staff";
export { auditConfig, type AuditConfig } from "./services/audit";
export { fileStorageConfig, type FileStorageConfig } from "./services/file-storage";
export {
  notificationProviderConfig,
  type NotificationProviderConfig,
} from "./services/notification-provider";
export { aiServiceConfig, type AiServiceConfig } from "./services/ai";
export { searchIndexConfig, type SearchIndexConfig } from "./services/search-index";
export {
  subscriptionBillingConfig,
  type SubscriptionBillingConfig,
} from "./services/subscription-billing";
export { eventBusConfig, type EventBusConfig } from "./services/event-bus";
export { gatewayConfig, type GatewayConfig } from "./services/gateway";
export * from "./regions/constants";
