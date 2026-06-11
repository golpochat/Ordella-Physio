import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from "@nestjs/common";
import { UseZodValidation } from "@ordella/validation";
import { TenantGuard as SecurityTenantGuard } from "@ordella/security";
import type { OrdellaRequest } from "@ordella/middleware";
import { AuthService } from "@/auth/auth.service";
import { loginSchema, type LoginDto } from "@/auth/dto/login.dto";
import { registerSchema, type RegisterDto } from "@/auth/dto/register.dto";
import { verifyEmailSchema, type VerifyEmailDto } from "@/auth/dto/verify-email.dto";
import {
  forgotPasswordSchema,
  resetPasswordSchema,
  type ForgotPasswordDto,
  type ResetPasswordDto,
} from "@/auth/dto/reset-password.dto";
import { JwtGuard } from "@/auth/guards/jwt.guard";
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

  @Post("verify-email")
  @HttpCode(HttpStatus.OK)
  @UseZodValidation(verifyEmailSchema)
  verifyEmail(@TenantId() tenantId: string, @Body() dto: VerifyEmailDto, @Req() request: OrdellaRequest) {
    const metadata = getRequestMetadata(request);
    return this.authService.verifyEmail(tenantId, dto, {
      ipAddress: metadata.ipAddress,
      userAgent: metadata.userAgent,
    });
  }

  @Post("forgot-password")
  @HttpCode(HttpStatus.OK)
  @UseZodValidation(forgotPasswordSchema)
  forgotPassword(@TenantId() tenantId: string, @Body() dto: ForgotPasswordDto, @Req() request: OrdellaRequest) {
    const metadata = getRequestMetadata(request);
    return this.authService.forgotPassword(tenantId, dto, {
      correlationId: request.correlationId,
      ipAddress: metadata.ipAddress,
      userAgent: metadata.userAgent,
    });
  }

  @Post("reset-password")
  @HttpCode(HttpStatus.OK)
  @UseZodValidation(resetPasswordSchema)
  resetPassword(@TenantId() tenantId: string, @Body() dto: ResetPasswordDto, @Req() request: OrdellaRequest) {
    const metadata = getRequestMetadata(request);
    return this.authService.resetPassword(tenantId, dto, {
      correlationId: request.correlationId,
      ipAddress: metadata.ipAddress,
      userAgent: metadata.userAgent,
    });
  }

  @Get("me")
  @UseGuards(JwtGuard, SecurityTenantGuard)
  me(@CurrentUser() user: AuthenticatedRequestUser, @TenantId() tenantId: string) {
    return this.authService.getMe(tenantId, user.userId);
  }

  @Get("session")
  @UseGuards(JwtGuard, SecurityTenantGuard)
  session(@CurrentUser() user: AuthenticatedRequestUser, @TenantId() tenantId: string) {
    return this.authService.getSession(tenantId, user.userId);
  }
}
