import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from "@nestjs/common";
import { UseZodValidation } from "@ordella/validation";
import type { OrdellaRequest } from "@ordella/middleware";
import type { Response } from "express";
import { RefreshGuard } from "@/auth/guards/refresh.guard";
import { refreshTokenSchema, type RefreshTokenDto } from "@/auth/dto/refresh-token.dto";
import { RefreshTokenCommand } from "@/auth/commands/refresh-token.command";
import { TokenService } from "@/services/token.service";
import { TenantId, getRequestMetadata } from "@/utils/auth-helpers";

const REFRESH_COOKIE_NAME = "ordella_refresh_token";
const USE_REFRESH_COOKIE = process.env.REFRESH_TOKEN_COOKIE === "true";

function setRefreshCookie(response: Response, refreshToken: string) {
  if (!USE_REFRESH_COOKIE) {
    return;
  }

  response.cookie(REFRESH_COOKIE_NAME, refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}

function clearRefreshCookie(response: Response) {
  if (!USE_REFRESH_COOKIE) {
    return;
  }

  response.clearCookie(REFRESH_COOKIE_NAME, { path: "/" });
}

@Controller("auth")
export class TokenController {
  constructor(
    private readonly refreshTokenCommand: RefreshTokenCommand,
    private readonly tokenService: TokenService,
  ) {}

  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  @UseGuards(RefreshGuard)
  @UseZodValidation(refreshTokenSchema)
  async refresh(
    @TenantId() tenantId: string,
    @Body() dto: RefreshTokenDto,
    @Req() request: OrdellaRequest,
    @Res({ passthrough: true }) response: Response,
  ) {
    const metadata = getRequestMetadata(request);
    const result = await this.refreshTokenCommand.execute({
      tenantId,
      dto,
      ipAddress: metadata.ipAddress,
      deviceInfo: metadata.userAgent,
    });

    setRefreshCookie(response, result.refreshToken);
    return result;
  }

  @Post("logout")
  @HttpCode(HttpStatus.OK)
  @UseZodValidation(refreshTokenSchema)
  async logout(
    @TenantId() tenantId: string,
    @Body() dto: RefreshTokenDto,
    @Req() request: OrdellaRequest,
    @Res({ passthrough: true }) response: Response,
  ) {
    void tenantId;
    const metadata = getRequestMetadata(request);
    const result = await this.tokenService.revokeToken(dto.refreshToken, {
      ipAddress: metadata.ipAddress,
      userAgent: metadata.userAgent,
    });
    clearRefreshCookie(response);
    return result;
  }
}
