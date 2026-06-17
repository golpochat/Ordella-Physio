import type { Organization } from "@/generated/prisma";
import type { OrganizationRecord } from "@/models/Organization";
import { billingModelFromDb } from "@/validators/organization.validator";

export type AuthenticatedOrganizationUser = {
  userId: string;
  tenantId: string;
  role: string;
  email?: string;
  permissions?: string[];
};

export function toOrganizationResponse(organization: Organization): OrganizationRecord {
  return {
    id: organization.id,
    name: organization.name,
    code: organization.code,
    organizationCode: organization.code,
    description: organization.description,
    primaryContactName: organization.primaryContactName,
    primaryContactEmail: organization.primaryContactEmail,
    primaryContactPhone: organization.primaryContactPhone,
    billingModel: billingModelFromDb(organization.billingModel),
    status: organization.status,
    createdAt: organization.createdAt.toISOString(),
    updatedAt: organization.updatedAt.toISOString(),
  };
}
