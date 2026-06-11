import { Injectable } from "@nestjs/common";
import { EmailService } from "@/email/email.service";
import { AuthEventPublisher } from "@/events/auth-event.publisher";
import { createUserPasswordResetEvent } from "@/auth/events/user-password-reset.event";
import { createUserPasswordResetRequestedEvent } from "@/auth/events/user-password-reset-requested.event";
import { TokenService } from "@/services/token.service";
import { AuditService } from "@/services/audit.service";
import { UsersService } from "@/users/users.service";
import { AUDIT_ACTIONS } from "@/models/AuditLog";
import { invalidOrExpiredTokenError, weakPasswordError } from "@/utils/auth-errors";
import { generateResetToken, verifyResetToken } from "@/utils/token";

export type PasswordRequestMetadata = {
  correlationId?: string;
  ipAddress?: string;
  userAgent?: string;
};

@Injectable()
export class PasswordService {
  constructor(
    private readonly usersService: UsersService,
    private readonly emailService: EmailService,
    private readonly tokenService: TokenService,
    private readonly auditService: AuditService,
    private readonly eventPublisher: AuthEventPublisher,
  ) {}

  async requestReset(tenantId: string, email: string, metadata?: PasswordRequestMetadata) {
    const normalizedEmail = email.trim().toLowerCase();
    const user = await this.usersService.findByEmail(tenantId, normalizedEmail);

    if (user) {
      const token = generateResetToken({
        userId: user.id,
        tenantId: user.tenantId,
        email: user.email,
      });

      await this.emailService.sendPasswordResetEmail({
        tenantId: user.tenantId,
        email: user.email,
        token,
      });

      await this.eventPublisher.publishUserPasswordResetRequested(
        createUserPasswordResetRequestedEvent({
          tenantId: user.tenantId,
          userId: user.id,
          email: user.email,
        }),
        metadata?.correlationId,
      );
    }

    await this.auditService.logEvent({
      userId: user?.id ?? null,
      tenantId: user?.tenantId ?? tenantId,
      action: AUDIT_ACTIONS.PASSWORD_RESET_REQUEST,
      ipAddress: metadata?.ipAddress,
      userAgent: metadata?.userAgent,
      metadata: { email: normalizedEmail, accountFound: Boolean(user) },
    });

    return { message: "If an account exists, a reset link has been sent." };
  }

  async resetPassword(token: string, newPassword: string, metadata?: PasswordRequestMetadata) {
    if (newPassword.length < 8) {
      throw weakPasswordError();
    }

    let payload;
    try {
      payload = verifyResetToken(token);
    } catch {
      throw invalidOrExpiredTokenError();
    }

    const user = await this.usersService.findById(payload.tenantId, payload.userId);
    if (!user || user.email !== payload.email) {
      throw invalidOrExpiredTokenError();
    }

    await this.usersService.updatePassword(payload.tenantId, payload.userId, newPassword);
    await this.tokenService.invalidateAllUserTokens(payload.userId, payload.tenantId);

    await this.auditService.logEvent({
      userId: payload.userId,
      tenantId: payload.tenantId,
      action: AUDIT_ACTIONS.PASSWORD_RESET_SUCCESS,
      ipAddress: metadata?.ipAddress,
      userAgent: metadata?.userAgent,
      metadata: { email: payload.email },
    });

    await this.eventPublisher.publishUserPasswordReset(
      createUserPasswordResetEvent({
        tenantId: payload.tenantId,
        userId: payload.userId,
        email: payload.email,
      }),
      metadata?.correlationId,
    );

    return { message: "Your password has been reset successfully." };
  }
}
