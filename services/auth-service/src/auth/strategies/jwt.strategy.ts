import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { authConfig } from "@ordella/config";
import type { AccessTokenPayload } from "@ordella/security";
import { UsersService } from "@/users/users.service";
import { getTokenVersionFromPayload, type AuthAccessClaims } from "@/utils/jwt";
import { invalidTokenError } from "@/utils/auth-errors";
import type { AuthenticatedRequestUser } from "@/utils/auth-helpers";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authConfig.jwtSecret,
    });
  }

  async validate(
    payload: AccessTokenPayload & AuthAccessClaims & { permissions?: string[]; sessionId?: string },
  ): Promise<AuthenticatedRequestUser> {
    const tokenVersion = getTokenVersionFromPayload(payload);
    const user = await this.usersService.findById(payload.tenantId, payload.userId);

    if (!user || user.isActive === false) {
      throw invalidTokenError();
    }

    if ((user.tokenVersion ?? 0) !== tokenVersion) {
      throw invalidTokenError();
    }

    return {
      userId: payload.userId,
      tenantId: payload.tenantId,
      role: payload.role,
      email: payload.email,
      sessionId: payload.sessionId ?? payload.jti,
      permissions: payload.permissions,
    };
  }
}
