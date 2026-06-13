import { gatewayConfig } from "@ordella/config";
import {
  SERVICE_DEFINITIONS,
  type ServiceDefinition,
  type ServiceEnvKey,
} from "@/constants";

export type ServiceMapEntry = ServiceDefinition & {
  url: string;
};

export function getServiceUrl(envKey: ServiceEnvKey): string {
  const config = gatewayConfig;
  const map: Record<ServiceEnvKey, string> = {
    AUTH_SERVICE_URL: config.authServiceUrl,
    TENANT_SERVICE_URL: config.tenantServiceUrl,
    PATIENT_SERVICE_URL: config.patientServiceUrl,
    APPOINTMENT_SERVICE_URL: config.appointmentServiceUrl,
    NOTES_SERVICE_URL: config.notesServiceUrl,
    BILLING_SERVICE_URL: config.billingServiceUrl,
    PAYMENT_SERVICE_URL: config.paymentServiceUrl,
    COMMUNICATION_SERVICE_URL: config.communicationServiceUrl,
    REPORTING_SERVICE_URL: config.reportingServiceUrl,
    MESSAGING_SERVICE_URL: config.messagingServiceUrl,
    NOTIFICATION_SERVICE_URL: config.notificationServiceUrl,
    AI_NOTES_SERVICE_URL: config.aiNotesServiceUrl,
    MARKETPLACE_SERVICE_URL: config.marketplaceServiceUrl,
    ENTERPRISE_SERVICE_URL: config.enterpriseServiceUrl,
    ORGANIZATION_SERVICE_URL: config.organizationServiceUrl,
    TERMINAL_SERVICE_URL: config.terminalServiceUrl,
    USER_ROLE_SERVICE_URL: config.userRoleServiceUrl,
    STAFF_SERVICE_URL: config.staffServiceUrl,
    AUDIT_SERVICE_URL: config.auditServiceUrl,
    FILE_STORAGE_SERVICE_URL: config.fileStorageServiceUrl,
    NOTIFICATION_PROVIDER_SERVICE_URL: config.notificationProviderServiceUrl,
    SEARCH_INDEX_SERVICE_URL: config.searchIndexServiceUrl,
    SUBSCRIPTION_BILLING_SERVICE_URL: config.subscriptionBillingServiceUrl,
    AI_SERVICE_URL: config.aiServiceUrl,
    AI_TRAINING_SERVICE_URL: config.aiTrainingServiceUrl,
    AI_MONITORING_SERVICE_URL: config.aiMonitoringServiceUrl,
    AI_DEPLOY_SERVICE_URL: config.aiDeployServiceUrl,
    FEATURE_FLAGS_SERVICE_URL: config.featureFlagsServiceUrl,
    AI_GATEWAY_SERVICE_URL: config.aiGatewayServiceUrl,
    AI_COST_SERVICE_URL: config.aiCostServiceUrl,
    AI_SECURITY_SERVICE_URL: config.aiSecurityServiceUrl,
    AI_OBSERVABILITY_SERVICE_URL: config.aiObservabilityServiceUrl,
    AI_AGENTS_SERVICE_URL: config.aiAgentsServiceUrl,
  };

  return map[envKey];
}

export function buildServiceMap(): ServiceMapEntry[] {
  return SERVICE_DEFINITIONS.map((service) => ({
    ...service,
    url: getServiceUrl(service.envKey),
  }));
}

export function resolveServiceByEnvKey(envKey: ServiceEnvKey): ServiceMapEntry {
  const service = SERVICE_DEFINITIONS.find((entry) => entry.envKey === envKey);
  if (!service) {
    throw new Error(`Unknown service env key: ${envKey}`);
  }

  return {
    ...service,
    url: getServiceUrl(envKey),
  };
}
