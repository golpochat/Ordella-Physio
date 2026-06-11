import { Injectable } from "@nestjs/common";
import type { ForgotPasswordDto, ResetPasswordDto } from "@/auth/dto/reset-password.dto";
import type { LoginDto } from "@/auth/dto/login.dto";
import type { RegisterDto } from "@/auth/dto/register.dto";
import type { RefreshTokenDto } from "@/auth/dto/refresh-token.dto";
import type { VerifyEmailDto } from "@/auth/dto/verify-email.dto";
import { LoginCommand } from "@/auth/commands/login.command";
import { RegisterCommand } from "@/auth/commands/register.command";
import { RefreshTokenCommand } from "@/auth/commands/refresh-token.command";
import { UsersService } from "@/users/users.service";
import { TokensService } from "@/tokens/tokens.service";
import { EmailService } from "@/email/email.service";
import { sanitizeUser } from "@/utils/auth-helpers";
import { generateToken } from "@ordella/utils";
import { VERIFY_TOKEN_PREFIX } from "@/constants";

@Injectable()
export class AuthService {
  constructor(
    private readonly registerCommand: RegisterCommand,
    private readonly loginCommand: LoginCommand,
    private readonly refreshTokenCommand: RefreshTokenCommand,
    private readonly usersService: UsersService,
    private readonly tokensService: TokensService,
    private readonly emailService: EmailService,
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

  async logout(_tenantId: string, refreshToken: string) {
    await this.tokensService.invalidateRefreshToken(refreshToken);
    return { message: "Logged out successfully" };
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

  async verifyEmail(tenantId: string, dto: VerifyEmailDto) {
    void tenantId;
    void dto.token.replace(VERIFY_TOKEN_PREFIX, "");
    return { message: "Email verification scaffold — wire token lookup before production" };
  }

  async forgotPassword(tenantId: string, dto: ForgotPasswordDto) {
    const user = await this.usersService.findByEmail(tenantId, dto.email);
    if (user) {
      const token = generateToken(24);
      await this.emailService.sendPasswordResetEmail({ tenantId, email: user.email, token });
    }
    return { message: "If the account exists, a reset link has been sent" };
  }

  async resetPassword(tenantId: string, dto: ResetPasswordDto, correlationId?: string) {
    void tenantId;
    void dto;
    void correlationId;
    return { message: "Password reset scaffold — wire token validation before production" };
  }
}
