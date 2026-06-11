import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { TerminalController } from "@/controllers/terminal.controller";
import { TerminalService } from "@/services/terminal.service";
import { TerminalRepository } from "@/repositories/terminal.repository";
import { JwtStrategy } from "@/strategies/jwt.strategy";
import { JwtGuard } from "@/guards/jwt.guard";
import { TerminalManageGuard } from "@/guards/terminal-manage.guard";
import { TenantServiceClient } from "@/integrations/tenant-service.client";

@Module({
  imports: [PassportModule.register({ defaultStrategy: "jwt" })],
  controllers: [TerminalController],
  providers: [
    TerminalService,
    TerminalRepository,
    TenantServiceClient,
    JwtStrategy,
    JwtGuard,
    TerminalManageGuard,
  ],
  exports: [TerminalService],
})
export class TerminalModule {}
