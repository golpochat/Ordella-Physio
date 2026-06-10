import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { IntegrationHooksService } from "@/marketplace/integration-hooks.service";
import { MarketplaceTenantGuard } from "@/marketplace/guards/marketplace-tenant.guard";
import { JwtGuard } from "@/marketplace/guards/jwt.guard";
import { MarketplaceController } from "@/marketplace/marketplace.controller";
import { MarketplaceRepository } from "@/marketplace/marketplace.repository";
import { MarketplaceService } from "@/marketplace/marketplace.service";
import { OAuthService } from "@/marketplace/oauth.service";
import { JwtStrategy } from "@/marketplace/strategies/jwt.strategy";

@Module({
  imports: [PassportModule.register({ defaultStrategy: "jwt" })],
  controllers: [MarketplaceController],
  providers: [
    MarketplaceService,
    MarketplaceRepository,
    OAuthService,
    IntegrationHooksService,
    JwtStrategy,
    JwtGuard,
    MarketplaceTenantGuard,
  ],
})
export class MarketplaceModule {}
