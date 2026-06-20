import { BadRequestException, Injectable } from "@nestjs/common";
import type { Role } from "@/generated/prisma";
import { TokenService } from "@/services/token.service";
import { AuditService } from "@/services/audit.service";
import { UsersRepository } from "@/users/users.repository";
import { toAuthResponse } from "@/auth/auth.mapper";
import { AUDIT_ACTIONS } from "@/models/AuditLog";
import { userDisabledError } from "@/utils/auth-errors";

const BLOCKED_SSO_ROLES = new Set<Role>(["SUPER_ADMIN", "SYSTEM"]);

export type SsoLoginCommandInput = {
  tenantId: string;
  organizationId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  ssoSubject: string;
  ssoProvider: "SAML" | "OIDC";
  role: string;
  ipAddress?: string;
  deviceInfo?: string;
};

@Injectable()
export class SsoLoginCommand {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly tokenService: TokenService,
    private readonly auditService: AuditService,
  ) {}

  async execute(input: SsoLoginCommandInput) {
    const email = input.email.trim().toLowerCase();
    const role = input.role as Role;

    if (BLOCKED_SSO_ROLES.has(role)) {
      throw new BadRequestException("SSO cannot assign privileged roles.");
    }

    let user =
      (await this.usersRepository.findBySsoSubject(
        input.tenantId,
        input.ssoProvider,
        input.ssoSubject,
      )) ?? (await this.usersRepository.findByEmail(input.tenantId, email));

    if (user && user.organizationId && user.organizationId !== input.organizationId) {
      throw new BadRequestException("SSO user belongs to a different organization.");
    }

    if (user && user.tenantId && user.tenantId !== input.tenantId) {
      throw new BadRequestException("SSO user belongs to a different tenant.");
    }

    if (!user) {
      user = await this.usersRepository.createSsoUser({
        tenantId: input.tenantId,
        organizationId: input.organizationId,
        email,
        firstName: input.firstName,
        lastName: input.lastName,
        role,
        ssoSubject: input.ssoSubject,
        ssoProvider: input.ssoProvider,
        emailVerified: true,
      });
    } else {
      if (user.isActive === false) {
        throw userDisabledError();
      }

      user = await this.usersRepository.updateUserGlobal(user.id, {
        organizationId: input.organizationId,
        tenantId: input.tenantId,
        role,
        ssoSubject: input.ssoSubject,
        ssoProvider: input.ssoProvider,
        firstName: input.firstName ?? user.firstName ?? undefined,
        lastName: input.lastName ?? user.lastName ?? undefined,
        emailVerified: true,
      });
    }

    const tokens = await this.tokenService.issueTokens({
      user,
      ipAddress: input.ipAddress,
      deviceInfo: input.deviceInfo,
    });

    await this.auditService.logEvent({
      userId: user.id,
      tenantId: user.tenantId,
      action: AUDIT_ACTIONS.SSO_LOGIN_SUCCESS,
      ipAddress: input.ipAddress,
      userAgent: input.deviceInfo,
      metadata: {
        email: user.email,
        protocol: input.ssoProvider,
        organizationId: input.organizationId,
        sessionId: tokens.sessionId,
      },
    });

    const auth = toAuthResponse(user, tokens);
    return {
      ...auth,
      sessionId: tokens.sessionId,
    };
  }
}
