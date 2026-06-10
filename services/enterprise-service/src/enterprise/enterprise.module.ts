import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { enterpriseConfig } from "@ordella/config";
import { EnterpriseController } from "@/enterprise/enterprise.controller";
import { EnterpriseRepository } from "@/enterprise/enterprise.repository";
import { EnterpriseService } from "@/enterprise/enterprise.service";
import { SsoService } from "@/enterprise/sso.service";
import { WebhookDispatcherService } from "@/enterprise/webhook-dispatcher.service";
import { EnterprisePlanGuard } from "@/enterprise/guards/enterprise-plan.guard";
import { EnterpriseTenantGuard } from "@/enterprise/guards/enterprise-tenant.guard";
import { JwtGuard } from "@/enterprise/guards/jwt.guard";
import { JwtStrategy } from "@/enterprise/strategies/jwt.strategy";

@Module({
  imports: [
    HttpModule.register({ timeout: 30000 }),
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secret: enterpriseConfig.jwtSecret,
    }),
  ],
  controllers: [EnterpriseController],
  providers: [
    EnterpriseService,
    EnterpriseRepository,
    SsoService,
    WebhookDispatcherService,
    JwtStrategy,
    JwtGuard,
    EnterpriseTenantGuard,
    EnterprisePlanGuard,
  ],
})
export class EnterpriseModule {}
