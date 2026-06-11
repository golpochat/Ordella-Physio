import { Injectable } from "@nestjs/common";
import type { LoginDto } from "@/auth/dto/login.dto";
import { UsersService } from "@/users/users.service";
import { TokenService } from "@/services/token.service";
import { AuditService } from "@/services/audit.service";
import { AuthEventPublisher } from "@/events/auth-event.publisher";
import { createUserLoggedInEvent } from "@/auth/events/user-logged-in.event";
import { toAuthResponse } from "@/auth/auth.mapper";
import { AUDIT_ACTIONS } from "@/models/AuditLog";
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
    private readonly tokenService: TokenService,
    private readonly auditService: AuditService,
    private readonly eventPublisher: AuthEventPublisher,
  ) {}

  async execute(input: LoginCommandInput) {
    const email = input.dto.email?.trim();
    const password = input.dto.password;
    const auditBase = {
      tenantId: input.tenantId,
      ipAddress: input.ipAddress,
      userAgent: input.deviceInfo,
    };

    if (!email || !password) {
      await this.auditService.logEvent({
        ...auditBase,
        userId: null,
        action: AUDIT_ACTIONS.LOGIN_FAILED,
        metadata: { reason: "MISSING_FIELDS", email: email ?? undefined },
      });
      throw missingFieldsError();
    }

    const user = await this.usersService.findByEmail(input.tenantId, email);
    if (!user) {
      await this.auditService.logEvent({
        ...auditBase,
        userId: null,
        action: AUDIT_ACTIONS.LOGIN_FAILED,
        metadata: { reason: "INVALID_CREDENTIALS", email },
      });
      throw invalidCredentialsError();
    }

    if (user.isActive === false) {
      await this.auditService.logEvent({
        ...auditBase,
        userId: user.id,
        tenantId: user.tenantId,
        action: AUDIT_ACTIONS.LOGIN_FAILED,
        metadata: { reason: "USER_DISABLED", email },
      });
      throw userDisabledError();
    }

    const valid = await this.usersService.validatePassword(user, password);
    if (!valid) {
      await this.auditService.logEvent({
        ...auditBase,
        userId: user.id,
        tenantId: user.tenantId,
        action: AUDIT_ACTIONS.LOGIN_FAILED,
        metadata: { reason: "INVALID_CREDENTIALS", email },
      });
      throw invalidCredentialsError();
    }

    if (user.mfaEnabled) {
      return {
        mfaRequired: true as const,
        userId: user.id,
        tenantId: user.tenantId,
      };
    }

    const tokens = await this.tokenService.issueTokens({
      user,
      ipAddress: input.ipAddress,
      deviceInfo: input.deviceInfo,
    });

    await this.auditService.logEvent({
      userId: user.id,
      tenantId: user.tenantId,
      action: AUDIT_ACTIONS.LOGIN_SUCCESS,
      ipAddress: input.ipAddress,
      userAgent: input.deviceInfo,
      metadata: { email: user.email, sessionId: tokens.sessionId },
    });

    await this.eventPublisher.publishUserLoggedIn(
      createUserLoggedInEvent({
        tenantId: input.tenantId,
        userId: user.id,
        email: user.email,
        sessionId: tokens.sessionId,
      }),
      input.correlationId,
    );

    return toAuthResponse(user, tokens);
  }
}
