import { Injectable } from "@nestjs/common";
import type { Prisma } from "@/generated/prisma";
import type { AccessPolicyRecord } from "@/models/AIAccessPolicy";
import { SecurityRepository } from "@/repositories/security.repository";

@Injectable()
export class AccessPolicyService {
  constructor(private readonly repository: SecurityRepository) {}

  async checkModelAccess(tenantId: string, userId: string, modelId: string, userRole?: string) {
    const policy = await this.repository.getAccessPolicy(tenantId, modelId);
    if (!policy) return { allowed: true, reason: "No policy configured." };

    const allowedRoles = Array.isArray(policy.allowedRoles) ? (policy.allowedRoles as string[]) : [];
    const allowedUsers = Array.isArray(policy.allowedUsers) ? (policy.allowedUsers as string[]) : [];

    if (allowedUsers.length && allowedUsers.includes(userId)) {
      return { allowed: true, reason: "User explicitly allowed." };
    }

    if (userRole && allowedRoles.length && allowedRoles.includes(userRole)) {
      return { allowed: true, reason: "Role allowed." };
    }

    if (!allowedRoles.length && !allowedUsers.length) {
      return { allowed: true, reason: "Open policy." };
    }

    return { allowed: false, reason: "Access denied by model policy." };
  }

  async checkApiKeyAccess(tenantId: string, modelId: string) {
    const policy = await this.repository.getAccessPolicy(tenantId, modelId);
    if (!policy) return { allowed: true };
    const allowedRoles = Array.isArray(policy.allowedRoles) ? (policy.allowedRoles as string[]) : [];
    if (allowedRoles.includes("api") || allowedRoles.includes("developer")) {
      return { allowed: true };
    }
    return { allowed: allowedRoles.length === 0, reason: allowedRoles.length ? "API key not permitted for model." : undefined };
  }

  async assignPolicy(tenantId: string, modelId: string, roles: string[], users?: string[]) {
    const row = await this.repository.upsertAccessPolicy(tenantId, modelId, {
      allowedRoles: roles as Prisma.InputJsonValue,
      allowedUsers: users ? (users as Prisma.InputJsonValue) : undefined,
    });
    return this.repository.mapPolicy(row);
  }

  async revokePolicy(tenantId: string, policyId: string) {
    await this.repository.deleteAccessPolicy(policyId, tenantId);
    return { revoked: true, policyId };
  }

  async listPolicies(tenantId: string): Promise<AccessPolicyRecord[]> {
    return (await this.repository.listAccessPolicies(tenantId)).map((row) => this.repository.mapPolicy(row));
  }
}
