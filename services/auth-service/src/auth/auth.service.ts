import { Injectable } from "@nestjs/common";
import type { ForgotPasswordDto, ResetPasswordDto } from "@/auth/dto/reset-password.dto";
import type { LoginDto } from "@/auth/dto/login.dto";
import type { RegisterDto } from "@/auth/dto/register.dto";
import type { RefreshTokenDto } from "@/auth/dto/refresh-token.dto";
import type { VerifyEmailDto } from "@/auth/dto/verify-email.dto";
import { LoginCommand } from "@/auth/commands/login.command";
import { RegisterCommand } from "@/auth/commands/register.command";
import { RefreshTokenCommand } from "@/auth/commands/refresh-token.command";
import { PasswordService, type PasswordRequestMetadata } from "@/services/password.service";
import type { VerificationMetadata } from "@/services/verification.service";
import { VerificationService } from "@/services/verification.service";
import { UsersService } from "@/users/users.service";
import { TokenService } from "@/services/token.service";
import { sanitizeUser } from "@/utils/auth-helpers";

@Injectable()
export class AuthService {
  constructor(
    private readonly registerCommand: RegisterCommand,
    private readonly loginCommand: LoginCommand,
    private readonly refreshTokenCommand: RefreshTokenCommand,
    private readonly usersService: UsersService,
    private readonly tokenService: TokenService,
    private readonly passwordService: PasswordService,
    private readonly verificationService: VerificationService,
  ) {}

  async register(
    tenantId: string,
    dto: RegisterDto,
    metadata?: { ipAddress?: string; deviceInfo?: string; correlationId?: string },
  ) {
    await this.registerCommand.execute({ tenantId, dto, correlationId: metadata?.correlationId });
    return this.login(tenantId, { email: dto.email, password: dto.password }, metadata);
  }

  login(
    tenantId: string,
    dto: LoginDto,
    metadata?: { ipAddress?: string; deviceInfo?: string; correlationId?: string },
  ) {
    return this.loginCommand.execute({ tenantId, dto, ...metadata });
  }

  refresh(
    tenantId: string,
    dto: RefreshTokenDto,
    metadata?: { ipAddress?: string; deviceInfo?: string },
  ) {
    return this.refreshTokenCommand.execute({ tenantId, dto, ...metadata });
  }

  async logout(
    _tenantId: string,
    refreshToken: string,
    metadata?: { ipAddress?: string; userAgent?: string },
  ) {
    return this.tokenService.revokeToken(refreshToken, metadata);
  }

  async getMe(tenantId: string, userId: string) {
    const user = await this.usersService.getById(tenantId, userId);
    return sanitizeUser(user);
  }

  async getSession(tenantId: string, userId: string) {
    const user = await this.getMe(tenantId, userId);
    return {
      user,
      tenantId: user.tenantId,
      role: user.role,
    };
  }

  verifyEmail(_tenantId: string, dto: VerifyEmailDto, metadata?: VerificationMetadata) {
    return this.verificationService.verifyEmail(dto.token, metadata);
  }

  forgotPassword(tenantId: string, dto: ForgotPasswordDto, metadata?: PasswordRequestMetadata) {
    return this.passwordService.requestReset(tenantId, dto.email, metadata);
  }

  resetPassword(_tenantId: string, dto: ResetPasswordDto, metadata?: PasswordRequestMetadata) {
    return this.passwordService.resetPassword(dto.token, dto.newPassword, metadata);
  }
}
