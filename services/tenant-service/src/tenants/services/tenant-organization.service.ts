import { Injectable } from "@nestjs/common";
import type { Tenant } from "@/generated/prisma";
import { TenantsRepository } from "@/tenants/tenants.repository";
import { TenantDomainRepository } from "@/tenant-domains/tenant-domain.repository";
import { tenantNotFoundError } from "@/utils/tenant-errors";
import { toTenantResponse } from "@/tenants/tenants.mapper";

export type OrganizationTenantSummary = {
  id: string;
  name: string;
  code: string;
  slug: string;
  domain: string | null;
  status: "ACTIVE" | "SUSPENDED";
  isActive: boolean;
  organizationId: string | null;
};

@Injectable()
export class TenantOrganizationService {
  constructor(
    private readonly tenantsRepository: TenantsRepository,
    private readonly tenantDomainRepository: TenantDomainRepository,
  ) {}

  private async toOrganizationTenantSummary(tenant: Tenant): Promise<OrganizationTenantSummary> {
    const primaryDomain = await this.tenantDomainRepository.findPrimaryByTenantId(tenant.id);
    const response = toTenantResponse(tenant);

    return {
      id: response.id,
      name: response.name,
      code: response.code,
      slug: response.slug,
      domain: primaryDomain?.domain ?? response.slug,
      status: response.status,
      isActive: response.isActive,
      organizationId: response.organizationId,
    };
  }

  async getTenantForOrganizationLink(tenantId: string): Promise<OrganizationTenantSummary | null> {
    const tenant = await this.tenantsRepository.findById(tenantId);
    if (!tenant) {
      return null;
    }

    return this.toOrganizationTenantSummary(tenant);
  }

  async listByOrganizationId(organizationId: string): Promise<OrganizationTenantSummary[]> {
    const tenants = await this.tenantsRepository.findByOrganizationId(organizationId);
    return Promise.all(tenants.map((tenant) => this.toOrganizationTenantSummary(tenant)));
  }

  async listUnassigned(): Promise<OrganizationTenantSummary[]> {
    const tenants = await this.tenantsRepository.findUnassigned();
    return Promise.all(tenants.map((tenant) => this.toOrganizationTenantSummary(tenant)));
  }

  async setOrganizationId(tenantId: string, organizationId: string | null) {
    const tenant = await this.tenantsRepository.findById(tenantId);
    if (!tenant) {
      throw tenantNotFoundError();
    }

    const updated = await this.tenantsRepository.setOrganizationId(tenantId, organizationId);
    return this.toOrganizationTenantSummary(updated);
  }
}
