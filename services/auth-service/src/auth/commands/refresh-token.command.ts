import { Injectable } from "@nestjs/common";
import type { RefreshTokenDto } from "@/auth/dto/refresh-token.dto";
import { TokensService } from "@/tokens/tokens.service";
import { UsersService } from "@/users/users.service";
import { TokenBuilder } from "@/utils/token-builder";
import { toAuthResponse } from "@/auth/auth.mapper";
import { invalidTokenError, userDisabledError } from "@/utils/auth-errors";

export type RefreshTokenCommandInput = {
  tenantId: string;
  dto: RefreshTokenDto;
  ipAddress?: string;
  deviceInfo?: string;
};

@Injectable()
export class RefreshTokenCommand {
  constructor(
    private readonly tokensService: TokensService,
    private readonly usersService: UsersService,
    private readonly tokenBuilder: TokenBuilder,
  ) {}

  async execute(input: RefreshTokenCommandInput) {
    if (!input.dto.refreshToken?.trim()) {
      throw invalidTokenError();
    }

    const rotated = await this.tokensService.rotateRefreshToken({
      tenantId: input.tenantId,
      refreshToken: input.dto.refreshToken,
      ipAddress: input.ipAddress,
      deviceInfo: input.deviceInfo,
      tokenBuilder: this.tokenBuilder,
    });

    if (!rotated) {
      throw invalidTokenError();
    }

    const user = await this.usersService.findById(input.tenantId, rotated.userId);
    if (!user) {
      throw invalidTokenError();
    }

    if (user.isActive === false) {
      throw userDisabledError();
    }

    return toAuthResponse(user, rotated.tokens);
  }
}
