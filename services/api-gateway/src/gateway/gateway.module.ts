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
import { MARKETPLACE_ROUTES } from "@/routes/marketplace.routes";
import { ENTERPRISE_ROUTES } from "@/routes/enterprise.routes";
import { ORGANIZATION_ROUTES } from "@/routes/organization.routes";
import { TERMINAL_ROUTES } from "@/routes/terminal.routes";
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
