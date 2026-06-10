import { loadEnv } from "../env/loader";
import { gatewayEnvSchema } from "../env/schema";
import {
  DEFAULT_ORDELLA_REGION,
  type OrdellaRegionCode,
  resolveRegionEndpoint,
} from "../regions/constants";
import { createLazyConfig, resolveJwtSecret } from "../utils";

function createGatewayConfig() {
  const env = loadEnv(gatewayEnvSchema);

  return {
    nodeEnv: env.NODE_ENV,
    port: env.PORT,
    jwtSecret: resolveJwtSecret(env),
    authServiceUrl: env.AUTH_SERVICE_URL,
    tenantServiceUrl: env.TENANT_SERVICE_URL,
    patientServiceUrl: env.PATIENT_SERVICE_URL,
    appointmentServiceUrl: env.APPOINTMENT_SERVICE_URL,
    notesServiceUrl: env.NOTES_SERVICE_URL,
    billingServiceUrl: env.BILLING_SERVICE_URL,
    paymentServiceUrl: env.PAYMENT_SERVICE_URL,
    communicationServiceUrl: env.COMMUNICATION_SERVICE_URL,
    reportingServiceUrl: env.REPORTING_SERVICE_URL,
    messagingServiceUrl: env.MESSAGING_SERVICE_URL,
    notificationServiceUrl: env.NOTIFICATION_SERVICE_URL,
    aiNotesServiceUrl: env.AI_NOTES_SERVICE_URL,
    marketplaceServiceUrl: env.MARKETPLACE_SERVICE_URL,
    enterpriseServiceUrl: env.ENTERPRISE_SERVICE_URL,
    gatewayTimeoutMs: env.GATEWAY_TIMEOUT_MS,
    gatewayRateLimitIp: env.GATEWAY_RATE_LIMIT_IP,
    gatewayRateLimitTenant: env.GATEWAY_RATE_LIMIT_TENANT,
    gatewayBodyLimit: env.GATEWAY_BODY_LIMIT,
    corsOrigin: env.CORS_ORIGIN,
    ordellaRegion: env.ORDELLA_REGION as OrdellaRegionCode,
    regionRoutingEnabled: env.REGION_ROUTING_ENABLED,
    regionEndpoints: {
      "eu-west": env.REGION_ENDPOINT_EU_WEST,
      "us-east": env.REGION_ENDPOINT_US_EAST,
      apac: env.REGION_ENDPOINT_APAC,
    },
    redisUrl: env.REDIS_URL,
    resolveRegionApiUrl(region: OrdellaRegionCode) {
      return (
        resolveRegionEndpoint(region, {
          "eu-west": env.REGION_ENDPOINT_EU_WEST,
          "us-east": env.REGION_ENDPOINT_US_EAST,
          apac: env.REGION_ENDPOINT_APAC,
        }) ?? env.REGION_ENDPOINT_EU_WEST
      );
    },
    defaultRegion: DEFAULT_ORDELLA_REGION,
  } as const;
}

export type GatewayConfig = ReturnType<typeof createGatewayConfig>;
export const gatewayConfig = createLazyConfig(createGatewayConfig);
