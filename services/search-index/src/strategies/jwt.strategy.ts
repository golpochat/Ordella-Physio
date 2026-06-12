import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { searchIndexConfig } from "@ordella/config";
import type { AccessTokenPayload } from "@ordella/security";
import type { AuthenticatedSearchUser } from "@/utils/search-user";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: searchIndexConfig.jwtSecret,
    });
  }

  validate(payload: AccessTokenPayload & { permissions?: string[] }): AuthenticatedSearchUser {
    return {
      userId: payload.userId,
      tenantId: payload.tenantId,
      role: payload.role,
      email: payload.email,
      permissions: payload.permissions,
    };
  }
}
