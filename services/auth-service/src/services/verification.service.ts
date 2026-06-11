import { Injectable } from "@nestjs/common";
import { EmailService } from "@/email/email.service";
import { UsersService } from "@/users/users.service";
import { AuditService } from "@/services/audit.service";
import { AUDIT_ACTIONS } from "@/models/AuditLog";
import { alreadyVerifiedError, invalidOrExpiredTokenError } from "@/utils/auth-errors";
import { generateEmailVerificationToken, verifyEmailVerificationToken } from "@/utils/token";

export type VerificationMetadata = {
  ipAddress?: string;
  userAgent?: string;
};

@Injectable()
export class VerificationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly emailService: EmailService,
    private readonly auditService: AuditService,
  ) {}

  async sendVerificationEmail(tenantId: string, userId: string) {
    const user = await this.usersService.getById(tenantId, userId);

    if (user.emailVerified) {
      throw alreadyVerifiedError();
    }

    const token = generateEmailVerificationToken({
      userId: user.id,
      tenantId: user.tenantId,
      email: user.email,
    });

    await this.emailService.sendVerificationEmail({
      tenantId: user.tenantId,
      email: user.email,
      token,
    });

    return { message: "Verification email sent." };
  }

  async verifyEmail(token: string, metadata?: VerificationMetadata) {
    let payload;
    try {
      payload = verifyEmailVerificationToken(token);
    } catch {
      throw invalidOrExpiredTokenError();
    }

    const user = await this.usersService.findById(payload.tenantId, payload.userId);
    if (!user || user.email !== payload.email) {
      throw invalidOrExpiredTokenError();
    }

    if (user.emailVerified) {
      throw alreadyVerifiedError();
    }

    await this.usersService.markEmailVerified(payload.tenantId, payload.userId);

    await this.auditService.logEvent({
      userId: payload.userId,
      tenantId: payload.tenantId,
      action: AUDIT_ACTIONS.EMAIL_VERIFIED,
      ipAddress: metadata?.ipAddress,
      userAgent: metadata?.userAgent,
      metadata: { email: payload.email },
    });

    return { message: "Email verified successfully." };
  }
}
