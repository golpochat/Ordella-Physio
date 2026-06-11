import { Injectable } from "@nestjs/common";
import { decrypt, encrypt } from "@ordella/security";
import { toAuthResponse } from "@/auth/auth.mapper";
import { createUserLoggedInEvent } from "@/auth/events/user-logged-in.event";
import { AuthEventPublisher } from "@/events/auth-event.publisher";
import { TokenService } from "@/services/token.service";
import { AuditService } from "@/services/audit.service";
import { UsersService } from "@/users/users.service";
import { AUDIT_ACTIONS } from "@/models/AuditLog";
import {
  invalidMfaCodeError,
  mfaAlreadyEnabledError,
  mfaNotEnabledError,
} from "@/utils/auth-errors";
import { generateQRCode, generateSecret, verifyToken } from "@/utils/totp";

function getMfaEncryptionKey(): string {
  const key = process.env.MFA_ENCRYPTION_KEY ?? process.env.JWT_SECRET;
  if (!key) {
    throw new Error("MFA_ENCRYPTION_KEY or JWT_SECRET must be configured");
  }
  return key;
}

@Injectable()
export class MfaService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokenService: TokenService,
    private readonly auditService: AuditService,
    private readonly eventPublisher: AuthEventPublisher,
  ) {}

  private decryptStoredSecret(encryptedSecret: string): string {
    return decrypt(encryptedSecret, getMfaEncryptionKey());
  }

  private async getDecryptedSecretForUser(tenantId: string, userId: string): Promise<string> {
    const user = await this.usersService.getById(tenantId, userId);
    if (!user.mfaSecret) {
      throw mfaNotEnabledError();
    }
    return this.decryptStoredSecret(user.mfaSecret);
  }

  async setupMfa(tenantId: string, userId: string) {
    const user = await this.usersService.getById(tenantId, userId);

    if (user.mfaEnabled) {
      throw mfaAlreadyEnabledError();
    }

    const generated = generateSecret(user.id, user.email);
    const encryptedSecret = encrypt(generated.secret, getMfaEncryptionKey());

    await this.usersService.updateMfaSecret(tenantId, userId, encryptedSecret);

    const qrCode = await generateQRCode(generated.otpauthUrl);

    return {
      qrCode,
      secret: generated.secret,
      message: "Scan the QR code with your authenticator app, then enter the 6-digit code to enable MFA.",
    };
  }

  async verifyMfa(
    tenantId: string,
    userId: string,
    token: string,
    metadata?: { ipAddress?: string; userAgent?: string },
  ) {
    const user = await this.usersService.getById(tenantId, userId);

    if (user.mfaEnabled) {
      throw mfaAlreadyEnabledError();
    }

    if (!user.mfaSecret) {
      throw mfaNotEnabledError("Set up multi-factor authentication before verifying a code.");
    }

    const secret = this.decryptStoredSecret(user.mfaSecret);
    if (!verifyToken(secret, token)) {
      await this.auditService.logEvent({
        userId,
        tenantId,
        action: AUDIT_ACTIONS.MFA_FAILED,
        ipAddress: metadata?.ipAddress,
        userAgent: metadata?.userAgent,
        metadata: { context: "setup" },
      });
      throw invalidMfaCodeError();
    }

    await this.usersService.enableMfa(tenantId, userId);

    await this.auditService.logEvent({
      userId,
      tenantId,
      action: AUDIT_ACTIONS.MFA_SUCCESS,
      ipAddress: metadata?.ipAddress,
      userAgent: metadata?.userAgent,
      metadata: { context: "setup" },
    });

    return { message: "Multi-factor authentication enabled." };
  }

  async disableMfa(tenantId: string, userId: string) {
    const user = await this.usersService.getById(tenantId, userId);

    if (!user.mfaEnabled) {
      throw mfaNotEnabledError();
    }

    await this.usersService.disableMfa(tenantId, userId);

    return { message: "Multi-factor authentication disabled." };
  }

  async completeLoginChallenge(
    tenantId: string,
    userId: string,
    token: string,
    metadata?: { ipAddress?: string; deviceInfo?: string; correlationId?: string },
  ) {
    const user = await this.usersService.getById(tenantId, userId);

    if (!user.mfaEnabled || !user.mfaSecret) {
      throw mfaNotEnabledError();
    }

    if (user.isActive === false) {
      throw mfaNotEnabledError();
    }

    const secret = this.decryptStoredSecret(user.mfaSecret);
    if (!verifyToken(secret, token)) {
      await this.auditService.logEvent({
        userId,
        tenantId,
        action: AUDIT_ACTIONS.MFA_FAILED,
        ipAddress: metadata?.ipAddress,
        userAgent: metadata?.deviceInfo,
        metadata: { context: "login" },
      });
      throw invalidMfaCodeError();
    }

    const tokens = await this.tokenService.issueTokens({
      user,
      ipAddress: metadata?.ipAddress,
      deviceInfo: metadata?.deviceInfo,
    });

    await this.auditService.logEvent({
      userId: user.id,
      tenantId,
      action: AUDIT_ACTIONS.MFA_SUCCESS,
      ipAddress: metadata?.ipAddress,
      userAgent: metadata?.deviceInfo,
      metadata: { context: "login", email: user.email, sessionId: tokens.sessionId },
    });

    await this.eventPublisher.publishUserLoggedIn(
      createUserLoggedInEvent({
        tenantId,
        userId: user.id,
        email: user.email,
        sessionId: tokens.sessionId,
      }),
      metadata?.correlationId,
    );

    return toAuthResponse(user, tokens);
  }
}
