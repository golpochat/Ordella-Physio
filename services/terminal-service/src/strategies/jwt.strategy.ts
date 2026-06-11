import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { terminalConfig } from "@ordella/config";
import type { AccessTokenPayload } from "@ordella/security";
import type { AuthenticatedTerminalUser } from "@/utils/terminal-helpers";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: terminalConfig.jwtSecret,
    });
  }

  validate(payload: AccessTokenPayload & { permissions?: string[] }): AuthenticatedTerminalUser {
    return {
      userId: payload.userId,
      tenantId: payload.tenantId,
      role: payload.role,
      email: payload.email,
      permissions: payload.permissions,
    };
  }
}
