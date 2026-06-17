import { Injectable } from "@nestjs/common";
import { SSO_AUDIT_EVENTS } from "@ordella/shared";
import { EnterpriseRepository } from "@/enterprise/enterprise.repository";

@Injectable()
export class SsoAuditService {
  constructor(private readonly repository: EnterpriseRepository) {}

  log(input: {
    tenantId: string;
    organizationId?: string;
    actorId?: string;
    protocol: "SAML" | "OIDC";
    eventType: string;
    status?: "success" | "failure";
    ipAddress?: string;
    metadata?: Record<string, unknown>;
  }) {
    return this.repository.createAuditLog({
      tenantId: input.tenantId,
      actorId: input.actorId,
      action: input.eventType,
      resource: "sso",
      status: input.status ?? "success",
      ipAddress: input.ipAddress,
      metadata: {
        organizationId: input.organizationId,
        protocol: input.protocol,
        timestamp: new Date().toISOString(),
        ...input.metadata,
      },
    });
  }

  loginSuccess(input: Omit<Parameters<SsoAuditService["log"]>[0], "eventType" | "status">) {
    return this.log({ ...input, eventType: SSO_AUDIT_EVENTS.LOGIN_SUCCESS, status: "success" });
  }

  loginFailure(input: Omit<Parameters<SsoAuditService["log"]>[0], "eventType" | "status">) {
    return this.log({ ...input, eventType: SSO_AUDIT_EVENTS.LOGIN_FAILURE, status: "failure" });
  }

  logout(input: Omit<Parameters<SsoAuditService["log"]>[0], "eventType" | "status">) {
    return this.log({ ...input, eventType: SSO_AUDIT_EVENTS.LOGOUT, status: "success" });
  }
}
