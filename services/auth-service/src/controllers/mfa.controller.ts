import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from "@nestjs/common";
import { UseZodValidation } from "@ordella/validation";
import { TenantGuard as SecurityTenantGuard } from "@ordella/security";
import type { OrdellaRequest } from "@ordella/middleware";
import { mfaChallengeSchema, mfaVerifySchema, type MfaChallengeDto, type MfaVerifyDto } from "@/auth/dto/mfa.dto";
import { JwtGuard } from "@/auth/guards/jwt.guard";
import { MfaService } from "@/services/mfa.service";
import { CurrentUser, TenantId, getRequestMetadata, type AuthenticatedRequestUser } from "@/utils/auth-helpers";

@Controller("auth/mfa")
export class MfaController {
  constructor(private readonly mfaService: MfaService) {}

  @Post("setup")
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard, SecurityTenantGuard)
  setupMfa(@TenantId() tenantId: string, @CurrentUser() user: AuthenticatedRequestUser) {
    return this.mfaService.setupMfa(tenantId, user.userId);
  }

  @Post("verify")
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard, SecurityTenantGuard)
  @UseZodValidation(mfaVerifySchema)
  verifyMfa(
    @TenantId() tenantId: string,
    @CurrentUser() user: AuthenticatedRequestUser,
    @Body() dto: MfaVerifyDto,
    @Req() request: OrdellaRequest,
  ) {
    const metadata = getRequestMetadata(request);
    return this.mfaService.verifyMfa(tenantId, user.userId, dto.token, {
      ipAddress: metadata.ipAddress,
      userAgent: metadata.userAgent,
    });
  }

  @Post("disable")
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard, SecurityTenantGuard)
  disableMfa(@TenantId() tenantId: string, @CurrentUser() user: AuthenticatedRequestUser) {
    return this.mfaService.disableMfa(tenantId, user.userId);
  }

  @Post("challenge")
  @HttpCode(HttpStatus.OK)
  @UseZodValidation(mfaChallengeSchema)
  challenge(@TenantId() tenantId: string, @Body() dto: MfaChallengeDto, @Req() request: OrdellaRequest) {
    const metadata = getRequestMetadata(request);
    return this.mfaService.completeLoginChallenge(tenantId, dto.userId, dto.token, {
      ipAddress: metadata.ipAddress,
      deviceInfo: metadata.userAgent,
      correlationId: request.correlationId,
    });
  }
}
