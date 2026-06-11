import { Body, Controller, HttpCode, HttpStatus, Post, Req } from "@nestjs/common";
import { UseZodValidation } from "@ordella/validation";
import type { OrdellaRequest } from "@ordella/middleware";
import {
  forgotPasswordSchema,
  resetPasswordSchema,
  type ForgotPasswordDto,
  type ResetPasswordDto,
} from "@/auth/dto/reset-password.dto";
import { PasswordService } from "@/services/password.service";
import { TenantId, getRequestMetadata } from "@/utils/auth-helpers";

@Controller("auth/password")
export class PasswordController {
  constructor(private readonly passwordService: PasswordService) {}

  @Post("request")
  @HttpCode(HttpStatus.OK)
  @UseZodValidation(forgotPasswordSchema)
  requestReset(@TenantId() tenantId: string, @Body() dto: ForgotPasswordDto, @Req() request: OrdellaRequest) {
    const metadata = getRequestMetadata(request);
    return this.passwordService.requestReset(tenantId, dto.email, {
      correlationId: request.correlationId,
      ipAddress: metadata.ipAddress,
      userAgent: metadata.userAgent,
    });
  }

  @Post("reset")
  @HttpCode(HttpStatus.OK)
  @UseZodValidation(resetPasswordSchema)
  resetPassword(@Body() dto: ResetPasswordDto, @Req() request: OrdellaRequest) {
    const metadata = getRequestMetadata(request);
    return this.passwordService.resetPassword(dto.token, dto.newPassword, {
      correlationId: request.correlationId,
      ipAddress: metadata.ipAddress,
      userAgent: metadata.userAgent,
    });
  }
}
