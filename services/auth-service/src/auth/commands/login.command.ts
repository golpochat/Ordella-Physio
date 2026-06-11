import { Injectable } from "@nestjs/common";
import type { LoginDto } from "@/auth/dto/login.dto";
import { UsersService } from "@/users/users.service";
import { TokensService } from "@/tokens/tokens.service";
import { AuthEventPublisher } from "@/events/auth-event.publisher";
import { createUserLoggedInEvent } from "@/auth/events/user-logged-in.event";
import { TokenBuilder } from "@/utils/token-builder";
import { toAuthResponse } from "@/auth/auth.mapper";
import {
  invalidCredentialsError,
  missingFieldsError,
  userDisabledError,
} from "@/utils/auth-errors";

export type LoginCommandInput = {
  tenantId: string;
  dto: LoginDto;
  ipAddress?: string;
  deviceInfo?: string;
  correlationId?: string;
};

@Injectable()
export class LoginCommand {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokensService: TokensService,
    private readonly tokenBuilder: TokenBuilder,
    private readonly eventPublisher: AuthEventPublisher,
  ) {}

  async execute(input: LoginCommandInput) {
    const email = input.dto.email?.trim();
    const password = input.dto.password;

    if (!email || !password) {
      throw missingFieldsError();
    }

    const user = await this.usersService.findByEmail(input.tenantId, email);
    if (!user) {
      throw invalidCredentialsError();
    }

    if (user.isActive === false) {
      throw userDisabledError();
    }

    const valid = await this.usersService.validatePassword(user, password);
    if (!valid) {
      throw invalidCredentialsError();
    }

    const sessionId = this.tokenBuilder.createSessionId();
    const opaqueRefreshToken = this.tokenBuilder.createOpaqueRefreshToken();

    const tokens = await this.tokensService.issueTokens({
      user,
      sessionId,
      opaqueRefreshToken,
      ipAddress: input.ipAddress,
      deviceInfo: input.deviceInfo,
      tokenBuilder: this.tokenBuilder,
    });

    await this.eventPublisher.publishUserLoggedIn(
      createUserLoggedInEvent({
        tenantId: input.tenantId,
        userId: user.id,
        email: user.email,
        sessionId,
      }),
      input.correlationId,
    );

    return toAuthResponse(user, tokens);
  }
}
