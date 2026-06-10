import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from "@nestjs/common";
import { UseZodValidation } from "@ordella/validation";
import { TenantGuard as SecurityTenantGuard } from "@ordella/security";
import type { OrdellaRequest } from "@ordella/middleware";
import { AuthService } from "@/auth/auth.service";
import { loginSchema, type LoginDto } from "@/auth/dto/login.dto";
import { registerSchema, type RegisterDto } from "@/auth/dto/register.dto";
import { refreshTokenSchema, type RefreshTokenDto } from "@/auth/dto/refresh-token.dto";
import { verifyEmailSchema, type VerifyEmailDto } from "@/auth/dto/verify-email.dto";
import {
  forgotPasswordSchema,
  resetPasswordSchema,
  type ForgotPasswordDto,
  type ResetPasswordDto,
} from "@/auth/dto/reset-password.dto";
import { JwtGuard } from "@/auth/guards/jwt.guard";
import { RefreshGuard } from "@/auth/guards/refresh.guard";
import { CurrentUser, TenantId, getRequestMetadata } from "@/utils/auth-helpers";
import type { AuthenticatedRequestUser } from "@/utils/auth-helpers";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get("health")
  health() {
    return { status: "ok", service: "auth-service" };
  }

  @Post("register")
  @UseZodValidation(registerSchema)
  register(@TenantId() tenantId: string, @Body() dto: RegisterDto, @Req() request: OrdellaRequest) {
    const metadata = getRequestMetadata(request);
    return this.authService.register(tenantId, dto, {
      ipAddress: metadata.ipAddress,
      deviceInfo: metadata.userAgent,
      correlationId: request.correlationId,
    });
  }

  @Post("login")
  @HttpCode(HttpStatus.OK)
  @UseZodValidation(loginSchema)
  login(@TenantId() tenantId: string, @Body() dto: LoginDto, @Req() request: OrdellaRequest) {
    const metadata = getRequestMetadata(request);
    return this.authService.login(tenantId, dto, {
      ipAddress: metadata.ipAddress,
      deviceInfo: metadata.userAgent,
      correlationId: request.correlationId,
    });
  }

  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  @UseGuards(RefreshGuard)
  @UseZodValidation(refreshTokenSchema)
  refresh(@TenantId() tenantId: string, @Body() dto: RefreshTokenDto, @Req() request: OrdellaRequest) {
    const metadata = getRequestMetadata(request);
    return this.authService.refresh(tenantId, dto, metadata);
  }

  @Post("logout")
  @HttpCode(HttpStatus.OK)
  @UseZodValidation(refreshTokenSchema)
  logout(@TenantId() tenantId: string, @Body() dto: RefreshTokenDto) {
    return this.authService.logout(tenantId, dto.refreshToken);
  }

  @Post("verify-email")
  @HttpCode(HttpStatus.OK)
  @UseZodValidation(verifyEmailSchema)
  verifyEmail(@TenantId() tenantId: string, @Body() dto: VerifyEmailDto) {
    return this.authService.verifyEmail(tenantId, dto);
  }

  @Post("forgot-password")
  @HttpCode(HttpStatus.OK)
  @UseZodValidation(forgotPasswordSchema)
  forgotPassword(@TenantId() tenantId: string, @Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(tenantId, dto);
  }

  @Post("reset-password")
  @HttpCode(HttpStatus.OK)
  @UseZodValidation(resetPasswordSchema)
  resetPassword(@TenantId() tenantId: string, @Body() dto: ResetPasswordDto, @Req() request: OrdellaRequest) {
    return this.authService.resetPassword(tenantId, dto, request.correlationId);
  }

  @Get("me")
  @UseGuards(JwtGuard, SecurityTenantGuard)
  me(@CurrentUser() user: AuthenticatedRequestUser, @TenantId() tenantId: string) {
    return this.authService.getMe(tenantId, user.userId);
  }
}
