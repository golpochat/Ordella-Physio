import { Injectable } from "@nestjs/common";
import type { RefreshTokenDto } from "@/auth/dto/refresh-token.dto";
import { TokenService } from "@/services/token.service";
import { UsersService } from "@/users/users.service";
import { AuditService } from "@/services/audit.service";
import { toAuthResponse } from "@/auth/auth.mapper";
import { AUDIT_ACTIONS } from "@/models/AuditLog";
import { invalidRefreshTokenError, userDisabledError } from "@/utils/auth-errors";

export type RefreshTokenCommandInput = {
  tenantId: string;
  dto: RefreshTokenDto;
  ipAddress?: string;
  deviceInfo?: string;
};

@Injectable()
export class RefreshTokenCommand {
  constructor(
    private readonly tokenService: TokenService,
    private readonly usersService: UsersService,
    private readonly auditService: AuditService,
  ) {}

  async execute(input: RefreshTokenCommandInput) {
    if (!input.dto.refreshToken?.trim()) {
      throw invalidRefreshTokenError();
    }

    const rotated = await this.tokenService.rotateRefreshToken({
      tenantId: input.tenantId,
      refreshToken: input.dto.refreshToken,
      ipAddress: input.ipAddress,
      deviceInfo: input.deviceInfo,
    });

    const user = await this.usersService.findById(input.tenantId, rotated.userId);
    if (!user) {
      throw invalidRefreshTokenError();
    }

    if (user.isActive === false) {
      throw userDisabledError();
    }

    await this.auditService.logEvent({
      userId: user.id,
      tenantId: user.tenantId,
      action: AUDIT_ACTIONS.TOKEN_REFRESH,
      ipAddress: input.ipAddress,
      userAgent: input.deviceInfo,
      metadata: { sessionId: rotated.tokens.sessionId },
    });

    return toAuthResponse(user, rotated.tokens);
  }
}
