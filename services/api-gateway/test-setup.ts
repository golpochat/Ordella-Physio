const TEST_JWT_SECRET = "change-me-local-jwt-secret-min-32-chars";
const serviceUrl = (port: number) => `http://127.0.0.1:${port}`;

process.env.NODE_ENV = "test";
process.env.PORT = process.env.PORT ?? "3049";
process.env.JWT_SECRET = process.env.JWT_SECRET ?? TEST_JWT_SECRET;
process.env.GATEWAY_TIMEOUT_MS = process.env.GATEWAY_TIMEOUT_MS ?? "5000";
process.env.GATEWAY_RATE_LIMIT_IP = process.env.GATEWAY_RATE_LIMIT_IP ?? "100";
process.env.GATEWAY_RATE_LIMIT_TENANT =
  process.env.GATEWAY_RATE_LIMIT_TENANT ?? "200";
process.env.GATEWAY_BODY_LIMIT = process.env.GATEWAY_BODY_LIMIT ?? "1mb";
process.env.CORS_ORIGIN = process.env.CORS_ORIGIN ?? "*";
process.env.ORDELLA_REGION = process.env.ORDELLA_REGION ?? "eu-west";
process.env.REGION_ROUTING_ENABLED = process.env.REGION_ROUTING_ENABLED ?? "false";
process.env.TENANT_SERVICE_URL =
  process.env.TENANT_SERVICE_URL ?? serviceUrl(3052);
process.env.AUTH_SERVICE_URL =
  process.env.AUTH_SERVICE_URL ?? serviceUrl(3051);
process.env.PATIENT_SERVICE_URL =
  process.env.PATIENT_SERVICE_URL ?? serviceUrl(3053);
process.env.APPOINTMENT_SERVICE_URL =
  process.env.APPOINTMENT_SERVICE_URL ?? serviceUrl(3054);
process.env.NOTES_SERVICE_URL =
  process.env.NOTES_SERVICE_URL ?? serviceUrl(3055);
process.env.BILLING_SERVICE_URL =
  process.env.BILLING_SERVICE_URL ?? serviceUrl(3056);
process.env.PAYMENT_SERVICE_URL =
  process.env.PAYMENT_SERVICE_URL ?? serviceUrl(3057);
process.env.COMMUNICATION_SERVICE_URL =
  process.env.COMMUNICATION_SERVICE_URL ?? serviceUrl(3058);
process.env.REPORTING_SERVICE_URL =
  process.env.REPORTING_SERVICE_URL ?? serviceUrl(3059);
process.env.MESSAGING_SERVICE_URL =
  process.env.MESSAGING_SERVICE_URL ?? serviceUrl(3060);
process.env.NOTIFICATION_SERVICE_URL =
  process.env.NOTIFICATION_SERVICE_URL ?? serviceUrl(3061);
process.env.AI_NOTES_SERVICE_URL =
  process.env.AI_NOTES_SERVICE_URL ?? serviceUrl(3062);
process.env.MARKETPLACE_SERVICE_URL =
  process.env.MARKETPLACE_SERVICE_URL ?? serviceUrl(3063);
process.env.ENTERPRISE_SERVICE_URL =
  process.env.ENTERPRISE_SERVICE_URL ?? serviceUrl(3064);
process.env.ORGANIZATION_SERVICE_URL =
  process.env.ORGANIZATION_SERVICE_URL ?? serviceUrl(3065);
process.env.TERMINAL_SERVICE_URL =
  process.env.TERMINAL_SERVICE_URL ?? serviceUrl(3066);
process.env.USER_ROLE_SERVICE_URL =
  process.env.USER_ROLE_SERVICE_URL ?? serviceUrl(3067);
process.env.STAFF_SERVICE_URL =
  process.env.STAFF_SERVICE_URL ?? serviceUrl(3068);
process.env.AUDIT_SERVICE_URL =
  process.env.AUDIT_SERVICE_URL ?? serviceUrl(3069);
process.env.FILE_STORAGE_SERVICE_URL =
  process.env.FILE_STORAGE_SERVICE_URL ?? serviceUrl(3070);
process.env.NOTIFICATION_PROVIDER_SERVICE_URL =
  process.env.NOTIFICATION_PROVIDER_SERVICE_URL ?? serviceUrl(3071);
process.env.SEARCH_INDEX_SERVICE_URL =
  process.env.SEARCH_INDEX_SERVICE_URL ?? serviceUrl(3072);
process.env.AI_SERVICE_URL = process.env.AI_SERVICE_URL ?? serviceUrl(3074);
process.env.AI_TRAINING_SERVICE_URL =
  process.env.AI_TRAINING_SERVICE_URL ?? serviceUrl(3075);
process.env.AI_MONITORING_SERVICE_URL =
  process.env.AI_MONITORING_SERVICE_URL ?? serviceUrl(3076);
process.env.AI_DEPLOY_SERVICE_URL =
  process.env.AI_DEPLOY_SERVICE_URL ?? serviceUrl(3077);
process.env.FEATURE_FLAGS_SERVICE_URL =
  process.env.FEATURE_FLAGS_SERVICE_URL ?? serviceUrl(3078);
process.env.AI_GATEWAY_SERVICE_URL =
  process.env.AI_GATEWAY_SERVICE_URL ?? serviceUrl(3079);
process.env.AI_COST_SERVICE_URL =
  process.env.AI_COST_SERVICE_URL ?? serviceUrl(3080);
process.env.AI_SECURITY_SERVICE_URL =
  process.env.AI_SECURITY_SERVICE_URL ?? serviceUrl(3081);
process.env.AI_OBSERVABILITY_SERVICE_URL =
  process.env.AI_OBSERVABILITY_SERVICE_URL ?? serviceUrl(3082);
process.env.AI_AGENTS_SERVICE_URL =
  process.env.AI_AGENTS_SERVICE_URL ?? serviceUrl(3083);
process.env.JWT_SECRET =
  process.env.JWT_SECRET ?? "change-me-local-jwt-secret-min-32-chars";
process.env.JWT_ACCESS_SECRET =
  process.env.JWT_ACCESS_SECRET ?? process.env.JWT_SECRET;
process.env.API_GATEWAY_URL = process.env.API_GATEWAY_URL ?? "http://localhost:3049";
process.env.GATEWAY_PROBE_TIMEOUT_MS = process.env.GATEWAY_PROBE_TIMEOUT_MS ?? "1500";
jest.setTimeout(20000);
