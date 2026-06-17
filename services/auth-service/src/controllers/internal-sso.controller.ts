import { Body, Controller, Post } from "@nestjs/common";
import { SsoLoginCommand, type SsoLoginCommandInput } from "@/auth/commands/sso-login.command";
import { TokensRepository } from "@/tokens/tokens.repository";
import { AuditService } from "@/services/audit.service";
import { AUDIT_ACTIONS } from "@/models/AuditLog";

@Controller("auth/internal/sso")
export class InternalSsoController {
  constructor(
    private readonly ssoLoginCommand: SsoLoginCommand,
    private readonly tokensRepository: TokensRepository,
    private readonly auditService: AuditService,
  ) {}

  @Post("login")
  login(@Body() body: SsoLoginCommandInput) {
    return this.ssoLoginCommand.execute(body);
  }

  @Post("logout")
  async logout(@Body() body: { userId?: string; ipAddress?: string }) {
    const userId = body.userId?.trim();
    if (!userId) {
      return { status: "ignored" };
    }

    await this.tokensRepository.revokeAllForUser(userId);

    await this.auditService.logEvent({
      userId,
      action: AUDIT_ACTIONS.SSO_LOGOUT,
      ipAddress: body.ipAddress,
      metadata: { timestamp: new Date().toISOString() },
    });

    return { status: "logged_out" };
  }
}
