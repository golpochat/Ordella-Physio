import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { Reflector } from "@nestjs/core";
import { GlobalExceptionFilter, HttpExceptionFilter } from "@ordella/errors";
import { PermissionGuard, RoleGuard, SecurityGuardsModule } from "@ordella/security";
import { SanitizePipe } from "@ordella/validation";
import { APPOINTMENT_ROUTES } from "@/routes/appointment.routes";
import { AUTH_ROUTES } from "@/routes/auth.routes";
import { BILLING_ROUTES } from "@/routes/billing.routes";
import { COMMUNICATION_ROUTES } from "@/routes/communication.routes";
import { NOTES_ROUTES } from "@/routes/notes.routes";
import { PATIENT_ROUTES } from "@/routes/patient.routes";
import { PAYMENT_ROUTES } from "@/routes/payment.routes";
import { REPORTING_ROUTES } from "@/routes/reporting.routes";
import { MESSAGING_ROUTES } from "@/routes/messaging.routes";
import { NOTIFICATION_ROUTES } from "@/routes/notification.routes";
import { AI_NOTES_ROUTES } from "@/routes/ai-notes.routes";
import { AI_SERVICE_ROUTES } from "@/routes/ai-service.routes";
import { AI_TRAINING_SERVICE_ROUTES } from "@/routes/ai-training-service.routes";
import { AI_MONITORING_SERVICE_ROUTES } from "@/routes/ai-monitoring-service.routes";
import { AI_DEPLOY_SERVICE_ROUTES } from "@/routes/ai-deploy-service.routes";
import { AI_SECURITY_SERVICE_ROUTES } from "@/routes/ai-security-service.routes";
import { AI_OBSERVABILITY_SERVICE_ROUTES } from "@/routes/ai-observability-service.routes";
import { AI_AGENTS_SERVICE_ROUTES } from "@/routes/ai-agents-service.routes";
import { AI_COST_SERVICE_ROUTES } from "@/routes/ai-cost-service.routes";
import { AI_GATEWAY_SERVICE_ROUTES } from "@/routes/ai-gateway-service.routes";
import { FEATURE_FLAGS_SERVICE_ROUTES } from "@/routes/feature-flags-service.routes";
import { MARKETPLACE_ROUTES } from "@/routes/marketplace.routes";
import { ENTERPRISE_ROUTES } from "@/routes/enterprise.routes";
import { ORGANIZATION_ROUTES } from "@/routes/organization.routes";
import { TERMINAL_ROUTES } from "@/routes/terminal.routes";
import { USER_ROLE_ROUTES } from "@/routes/user-role.routes";
import { STAFF_ROUTES } from "@/routes/staff.routes";
import { AUDIT_ROUTES } from "@/routes/audit.routes";
import { FILE_STORAGE_ROUTES } from "@/routes/file-storage.routes";
import { NOTIFICATION_PROVIDER_ROUTES } from "@/routes/notification-provider.routes";
import { SEARCH_INDEX_ROUTES } from "@/routes/search-index.routes";
import { SUBSCRIPTION_BILLING_ROUTES } from "@/routes/subscription-billing.routes";
import { TENANT_ROUTES } from "@/routes/tenant.routes";
import { configureGatewayMiddleware, gatewayMiddlewareProviders } from "./middleware";
import { GatewayController } from "./gateway.controller";
import { GatewayService } from "./gateway.service";
import { RegionRoutingService } from "./region/region-routing.service";
import { RegionRoutingMiddleware } from "./region/region-routing.middleware";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { ResponseInterceptor } from "./interceptors/response.interceptor";
import { TimeoutInterceptor } from "./interceptors/timeout.interceptor";
import { createProxyController } from "./proxy/http-proxy.factory";
import { ProxyModule } from "./proxy/proxy.module";

const proxyControllers = [
  createProxyController(AUTH_ROUTES.base, "AUTH_SERVICE_URL", {
    public: true,
    skipTenant: true,
  }),
  createProxyController("/tenants/internal", "TENANT_SERVICE_URL", {
    public: true,
    skipTenant: true,
  }),
  createProxyController("/tenants/directory", "TENANT_SERVICE_URL", {
    public: true,
    skipTenant: true,
  }),
  createProxyController(TENANT_ROUTES.base, "TENANT_SERVICE_URL"),
  createProxyController(PATIENT_ROUTES.base, "PATIENT_SERVICE_URL"),
  createProxyController(APPOINTMENT_ROUTES.base, "APPOINTMENT_SERVICE_URL"),
  createProxyController(APPOINTMENT_ROUTES.availability, "APPOINTMENT_SERVICE_URL"),
  createProxyController(APPOINTMENT_ROUTES.blockedSlots, "APPOINTMENT_SERVICE_URL"),
  createProxyController(NOTES_ROUTES.base, "NOTES_SERVICE_URL"),
  createProxyController(BILLING_ROUTES.base, "BILLING_SERVICE_URL"),
  createProxyController(PAYMENT_ROUTES.base, "PAYMENT_SERVICE_URL"),
  createProxyController(COMMUNICATION_ROUTES.base, "COMMUNICATION_SERVICE_URL"),
  createProxyController(REPORTING_ROUTES.base, "REPORTING_SERVICE_URL"),
  createProxyController(MESSAGING_ROUTES.base, "MESSAGING_SERVICE_URL"),
  createProxyController(NOTIFICATION_ROUTES.base, "NOTIFICATION_SERVICE_URL"),
  createProxyController(AI_SERVICE_ROUTES.text, "AI_SERVICE_URL"),
  createProxyController(AI_SERVICE_ROUTES.json, "AI_SERVICE_URL"),
  createProxyController(AI_SERVICE_ROUTES.embed, "AI_SERVICE_URL"),
  createProxyController(AI_SERVICE_ROUTES.providers, "AI_SERVICE_URL"),
  createProxyController(AI_SERVICE_ROUTES.insights, "AI_SERVICE_URL"),
  createProxyController(AI_SERVICE_ROUTES.agent, "AI_SERVICE_URL"),
  createProxyController(AI_SERVICE_ROUTES.copilot, "AI_SERVICE_URL"),
  createProxyController(AI_SERVICE_ROUTES.workflows, "AI_SERVICE_URL"),
  createProxyController(AI_SERVICE_ROUTES.datasets, "AI_SERVICE_URL"),
  createProxyController(AI_SERVICE_ROUTES.inference, "AI_SERVICE_URL"),
  createProxyController(AI_TRAINING_SERVICE_ROUTES.training, "AI_TRAINING_SERVICE_URL"),
  createProxyController(AI_TRAINING_SERVICE_ROUTES.models, "AI_TRAINING_SERVICE_URL"),
  createProxyController(AI_TRAINING_SERVICE_ROUTES.health, "AI_TRAINING_SERVICE_URL", {
    public: true,
    skipTenant: true,
  }),
  createProxyController(AI_MONITORING_SERVICE_ROUTES.drift, "AI_MONITORING_SERVICE_URL"),
  createProxyController(AI_MONITORING_SERVICE_ROUTES.health, "AI_MONITORING_SERVICE_URL", {
    public: true,
    skipTenant: true,
  }),
  createProxyController(AI_DEPLOY_SERVICE_ROUTES.deploy, "AI_DEPLOY_SERVICE_URL"),
  createProxyController(AI_DEPLOY_SERVICE_ROUTES.health, "AI_DEPLOY_SERVICE_URL", {
    public: true,
    skipTenant: true,
  }),
  createProxyController(FEATURE_FLAGS_SERVICE_ROUTES.flags, "FEATURE_FLAGS_SERVICE_URL"),
  createProxyController(FEATURE_FLAGS_SERVICE_ROUTES.experiments, "FEATURE_FLAGS_SERVICE_URL"),
  createProxyController(FEATURE_FLAGS_SERVICE_ROUTES.health, "FEATURE_FLAGS_SERVICE_URL", {
    public: true,
    skipTenant: true,
  }),
  createProxyController(AI_GATEWAY_SERVICE_ROUTES.gateway + "/inference", "AI_GATEWAY_SERVICE_URL", {
    public: true,
    skipTenant: true,
  }),
  createProxyController(AI_GATEWAY_SERVICE_ROUTES.gateway + "/embeddings", "AI_GATEWAY_SERVICE_URL", {
    public: true,
    skipTenant: true,
  }),
  createProxyController(AI_GATEWAY_SERVICE_ROUTES.gateway, "AI_GATEWAY_SERVICE_URL"),
  createProxyController(AI_GATEWAY_SERVICE_ROUTES.health, "AI_GATEWAY_SERVICE_URL", {
    public: true,
    skipTenant: true,
  }),
  createProxyController(AI_COST_SERVICE_ROUTES.cost, "AI_COST_SERVICE_URL"),
  createProxyController(AI_COST_SERVICE_ROUTES.cost + "/internal", "AI_COST_SERVICE_URL", {
    public: true,
    skipTenant: true,
  }),
  createProxyController(AI_COST_SERVICE_ROUTES.health, "AI_COST_SERVICE_URL", {
    public: true,
    skipTenant: true,
  }),
  createProxyController(AI_SECURITY_SERVICE_ROUTES.security, "AI_SECURITY_SERVICE_URL"),
  createProxyController(AI_SECURITY_SERVICE_ROUTES.security + "/internal", "AI_SECURITY_SERVICE_URL", {
    public: true,
    skipTenant: true,
  }),
  createProxyController(AI_SECURITY_SERVICE_ROUTES.health, "AI_SECURITY_SERVICE_URL", {
    public: true,
    skipTenant: true,
  }),
  createProxyController(AI_OBSERVABILITY_SERVICE_ROUTES.observability, "AI_OBSERVABILITY_SERVICE_URL"),
  createProxyController(AI_OBSERVABILITY_SERVICE_ROUTES.observability + "/internal", "AI_OBSERVABILITY_SERVICE_URL", {
    public: true,
    skipTenant: true,
  }),
  createProxyController(AI_OBSERVABILITY_SERVICE_ROUTES.health, "AI_OBSERVABILITY_SERVICE_URL", {
    public: true,
    skipTenant: true,
  }),
  createProxyController(AI_AGENTS_SERVICE_ROUTES.agents, "AI_AGENTS_SERVICE_URL"),
  createProxyController(AI_AGENTS_SERVICE_ROUTES.health, "AI_AGENTS_SERVICE_URL", {
    public: true,
    skipTenant: true,
  }),
  createProxyController(AI_SERVICE_ROUTES.health, "AI_SERVICE_URL", {
    public: true,
    skipTenant: true,
  }),
  createProxyController(AI_NOTES_ROUTES.base, "AI_NOTES_SERVICE_URL"),
  createProxyController("/marketplace/oauth", "MARKETPLACE_SERVICE_URL", {
    public: true,
    skipTenant: true,
  }),
  createProxyController("/marketplace/webhooks", "MARKETPLACE_SERVICE_URL", {
    public: true,
    skipTenant: true,
  }),
  createProxyController(MARKETPLACE_ROUTES.base, "MARKETPLACE_SERVICE_URL"),
  createProxyController("/enterprise/sso/saml", "ENTERPRISE_SERVICE_URL", {
    public: true,
    skipTenant: true,
  }),
  createProxyController("/enterprise/sso/oauth", "ENTERPRISE_SERVICE_URL", {
    public: true,
    skipTenant: true,
  }),
  createProxyController(ENTERPRISE_ROUTES.base, "ENTERPRISE_SERVICE_URL"),
  createProxyController(ORGANIZATION_ROUTES.base, "ORGANIZATION_SERVICE_URL"),
  createProxyController(TERMINAL_ROUTES.base, "TERMINAL_SERVICE_URL"),
  createProxyController(USER_ROLE_ROUTES.base, "USER_ROLE_SERVICE_URL"),
  createProxyController("/roles/internal", "USER_ROLE_SERVICE_URL", {
    public: true,
    skipTenant: true,
  }),
  createProxyController(STAFF_ROUTES.base, "STAFF_SERVICE_URL"),
  createProxyController("/audit-logs/internal", "AUDIT_SERVICE_URL", {
    public: true,
    skipTenant: true,
  }),
  createProxyController(AUDIT_ROUTES.base, "AUDIT_SERVICE_URL"),
  createProxyController(FILE_STORAGE_ROUTES.access, "FILE_STORAGE_SERVICE_URL", {
    public: true,
    skipTenant: true,
  }),
  createProxyController("/files/internal", "FILE_STORAGE_SERVICE_URL", {
    public: true,
    skipTenant: true,
  }),
  createProxyController(FILE_STORAGE_ROUTES.base, "FILE_STORAGE_SERVICE_URL"),
  createProxyController("/notification-providers/internal", "NOTIFICATION_PROVIDER_SERVICE_URL", {
    public: true,
    skipTenant: true,
  }),
  createProxyController(NOTIFICATION_PROVIDER_ROUTES.base, "NOTIFICATION_PROVIDER_SERVICE_URL"),
  createProxyController(SEARCH_INDEX_ROUTES.base, "SEARCH_INDEX_SERVICE_URL"),
  createProxyController(SUBSCRIPTION_BILLING_ROUTES.webhook, "SUBSCRIPTION_BILLING_SERVICE_URL", {
    public: true,
    skipTenant: true,
  }),
  createProxyController("/subscription-billing/internal", "SUBSCRIPTION_BILLING_SERVICE_URL", {
    public: true,
    skipTenant: true,
  }),
  createProxyController(SUBSCRIPTION_BILLING_ROUTES.base, "SUBSCRIPTION_BILLING_SERVICE_URL"),
];

@Module({
  imports: [
    SecurityGuardsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env", ".env.local"],
    }),
    ProxyModule,
    HttpModule.register({ timeout: 30000, maxRedirects: 0 }),
  ],
  controllers: [GatewayController, ...proxyControllers],
  providers: [
    GatewayService,
    RegionRoutingService,
    RegionRoutingMiddleware,
    ...gatewayMiddlewareProviders,
    JwtAuthGuard,
    SanitizePipe,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class GatewayModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    configureGatewayMiddleware(consumer);
  }
}
