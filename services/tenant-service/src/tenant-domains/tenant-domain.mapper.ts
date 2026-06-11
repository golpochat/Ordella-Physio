import type { TenantDomain } from "@/generated/prisma";
import type { TenantDomainRecord } from "@/models/TenantDomain";
import { buildVerificationTxtName } from "@/utils/tenant-domain.helpers";

export function toTenantDomainResponse(domain: TenantDomain): TenantDomainRecord {
  return {
    id: domain.id,
    tenantId: domain.tenantId,
    domain: domain.domain,
    type: domain.type as TenantDomainRecord["type"],
    verificationToken: domain.verificationToken,
    verified: domain.verified,
    createdAt: domain.createdAt.toISOString(),
    updatedAt: domain.updatedAt.toISOString(),
  };
}

export function toVerificationInstructions(domain: TenantDomain) {
  return {
    txtName: buildVerificationTxtName(domain.domain),
    txtValue: domain.verificationToken,
  };
}
