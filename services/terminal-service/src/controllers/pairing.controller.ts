import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { JwtGuard } from "@/guards/jwt.guard";
import { TerminalManageGuard } from "@/guards/terminal-manage.guard";
import { CurrentUser } from "@/guards/current-user.decorator";
import { PairingService } from "@/services/pairing.service";
import type { AuthenticatedTerminalUser } from "@/utils/terminal-helpers";

type ClaimPairingBody = {
  code: string;
  ipAddress?: string;
  macAddress?: string;
};

type HeartbeatBody = {
  deviceToken: string;
};

@Controller("terminals")
export class PairingController {
  constructor(private readonly pairingService: PairingService) {}

  @Post(":id/pairing-code")
  @UseGuards(JwtGuard, TerminalManageGuard)
  generateCode(@Param("id") id: string, @CurrentUser() user: AuthenticatedTerminalUser) {
    return this.pairingService.generatePairingCode(id, user);
  }

  @Post("pair")
  claim(@Body() body: ClaimPairingBody) {
    return this.pairingService.claimPairingCode(body.code, {
      ipAddress: body.ipAddress,
      macAddress: body.macAddress,
    });
  }

  @Post(":id/ping")
  heartbeat(@Param("id") id: string, @Body() body: HeartbeatBody) {
    return this.pairingService.heartbeat(id, body.deviceToken);
  }
}
