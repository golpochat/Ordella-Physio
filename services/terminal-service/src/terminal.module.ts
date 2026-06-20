import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { TerminalController } from "@/controllers/terminal.controller";
import { PairingController } from "@/controllers/pairing.controller";
import { PosSessionController } from "@/controllers/pos-session.controller";
import { TerminalService } from "@/services/terminal.service";
import { PairingService } from "@/services/pairing.service";
import { PosSessionService } from "@/services/pos-session.service";
import { TerminalRepository } from "@/repositories/terminal.repository";
import { PairingRepository } from "@/repositories/pairing.repository";
import { PosSessionRepository } from "@/repositories/pos-session.repository";
import { JwtStrategy } from "@/strategies/jwt.strategy";
import { JwtGuard } from "@/guards/jwt.guard";
import { TerminalManageGuard } from "@/guards/terminal-manage.guard";
import { TenantServiceClient } from "@/integrations/tenant-service.client";
import { PaymentServiceClient } from "@/integrations/payment-service.client";
import { DatabaseModule } from "@/database/database.module";

@Module({
  imports: [PassportModule.register({ defaultStrategy: "jwt" }), DatabaseModule],
  controllers: [
    TerminalController,
    PairingController,
    PosSessionController,
  ],
  providers: [
    TerminalService,
    PairingService,
    PosSessionService,
    TerminalRepository,
    PairingRepository,
    PosSessionRepository,
    TenantServiceClient,
    PaymentServiceClient,
    JwtStrategy,
    JwtGuard,
    TerminalManageGuard,
  ],
  exports: [TerminalService, PosSessionService],
})
export class TerminalModule {}
