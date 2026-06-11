import { Controller, Get, HttpCode, HttpStatus, Post, Query, Req, UseGuards } from "@nestjs/common";
import type { OrdellaRequest } from "@ordella/middleware";
import { UseZodValidation } from "@ordella/validation";
import { TenantGuard as SecurityTenantGuard } from "@ordella/security";
import { verifyEmailSchema, type VerifyEmailDto } from "@/auth/dto/verify-email.dto";
import { JwtGuard } from "@/auth/guards/jwt.guard";
import { VerificationService } from "@/services/verification.service";
import { CurrentUser, TenantId, getRequestMetadata, type AuthenticatedRequestUser } from "@/utils/auth-helpers";

@Controller("auth/verification")
export class VerificationController {
  constructor(private readonly verificationService: VerificationService) {}

  @Post("send")
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard, SecurityTenantGuard)
  sendVerificationEmail(@TenantId() tenantId: string, @CurrentUser() user: AuthenticatedRequestUser) {
    return this.verificationService.sendVerificationEmail(tenantId, user.userId);
  }

  @Get("confirm")
  @HttpCode(HttpStatus.OK)
  @UseZodValidation(verifyEmailSchema, "query")
  verifyEmail(@Query() query: VerifyEmailDto, @Req() request: OrdellaRequest) {
    const metadata = getRequestMetadata(request);
    return this.verificationService.verifyEmail(query.token, {
      ipAddress: metadata.ipAddress,
      userAgent: metadata.userAgent,
    });
  }
}
