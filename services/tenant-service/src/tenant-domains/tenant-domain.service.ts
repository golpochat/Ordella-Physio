import { Injectable } from "@nestjs/common";
import { promises as dns } from "node:dns";
import { randomString } from "@ordella/utils";
import type {
  CreateTenantDomainPayload,
  VerifyTenantDomainPayload,
} from "@/models/TenantDomain";
import { TenantsRepository } from "@/tenants/tenants.repository";
import { TenantDomainRepository } from "@/tenant-domains/tenant-domain.repository";
import {
  toTenantDomainResponse,
  toVerificationInstructions,
} from "@/tenant-domains/tenant-domain.mapper";
import {
  normalizeDomainPayload,
  validateDomain,
} from "@/validators/tenant-domain.validator";
import {
  buildPrimaryDomainName,
  buildVerificationTxtName,
} from "@/utils/tenant-domain.helpers";
import {
  cannotDeletePrimaryDomainError,
  domainExistsError,
  domainNotFoundError,
  invalidVerificationTokenError,
  tenantNotFoundError,
  tenantValidationError,
} from "@/utils/tenant-errors";
import type { AuthenticatedTenantUser } from "@/utils/tenant-helpers";

@Injectable()
export class TenantDomainService {
  constructor(
    private readonly tenantsRepository: TenantsRepository,
    private readonly tenantDomainRepository: TenantDomainRepository,
  ) {}

  async listDomains(tenantId: string) {
    const tenant = await this.tenantsRepository.findById(tenantId);
    if (!tenant) {
      throw tenantNotFoundError();
    }

    await this.ensurePrimaryDomain(tenantId, tenant.code);

    const domains = await this.tenantDomainRepository.findByTenantId(tenantId);
    return domains.map(toTenantDomainResponse);
  }

  async createDomain(
    tenantId: string,
    payload: CreateTenantDomainPayload,
    createdByUser?: AuthenticatedTenantUser,
  ) {
    void createdByUser;

    const tenant = await this.tenantsRepository.findById(tenantId);
    if (!tenant) {
      throw tenantNotFoundError();
    }

    const validationErrors = validateDomain(payload);
    if (validationErrors.length > 0) {
      throw tenantValidationError(validationErrors);
    }

    const normalized = normalizeDomainPayload(payload);

    if (normalized.type === "PRIMARY") {
      throw tenantValidationError([
        { field: "type", message: "Primary domains are created automatically." },
      ]);
    }

    const existing = await this.tenantDomainRepository.findByDomain(normalized.domain);
    if (existing) {
      throw domainExistsError();
    }

    const verificationToken = randomString(32);

    const created = await this.tenantDomainRepository.create({
      tenant: { connect: { id: tenantId } },
      domain: normalized.domain,
      type: "CUSTOM",
      verificationToken,
      verified: false,
    });

    return {
      domain: toTenantDomainResponse(created),
      message: "Domain added successfully.",
      verification: toVerificationInstructions(created),
    };
  }

  async verifyDomain(
    tenantId: string,
    domainId: string,
    payload: VerifyTenantDomainPayload = {},
  ) {
    const record = await this.tenantDomainRepository.findById(domainId);
    if (!record || record.tenantId !== tenantId) {
      throw domainNotFoundError();
    }

    if (record.verified) {
      return {
        domain: toTenantDomainResponse(record),
        message: "Domain verified successfully.",
      };
    }

    const tokenValid = await this.isVerificationTokenValid(record, payload.token);
    if (!tokenValid) {
      throw invalidVerificationTokenError();
    }

    const updated = await this.tenantDomainRepository.update(domainId, { verified: true });

    return {
      domain: toTenantDomainResponse(updated),
      message: "Domain verified successfully.",
    };
  }

  async deleteDomain(tenantId: string, domainId: string) {
    const record = await this.tenantDomainRepository.findById(domainId);
    if (!record || record.tenantId !== tenantId) {
      throw domainNotFoundError();
    }

    if (record.type === "PRIMARY") {
      throw cannotDeletePrimaryDomainError();
    }

    await this.tenantDomainRepository.delete(domainId);

    return {
      message: "Domain removed.",
    };
  }

  async resolveDomain(host: string) {
    const normalizedHost = host.trim().toLowerCase().split(":")[0] ?? "";
    if (!normalizedHost) {
      return null;
    }

    const record = await this.tenantDomainRepository.findByDomain(normalizedHost);
    if (!record || !record.verified) {
      return null;
    }

    return {
      tenantId: record.tenantId,
      domain: record.domain,
      type: record.type,
      verified: record.verified,
    };
  }

  async ensurePrimaryDomain(tenantId: string, tenantCode: string) {
    const existing = await this.tenantDomainRepository.findPrimaryByTenantId(tenantId);
    if (existing) {
      return toTenantDomainResponse(existing);
    }

    const domainName = buildPrimaryDomainName(tenantCode);
    const taken = await this.tenantDomainRepository.findByDomain(domainName);
    if (taken && taken.tenantId !== tenantId) {
      throw domainExistsError("Primary domain is already in use.");
    }

    if (taken) {
      return toTenantDomainResponse(taken);
    }

    const created = await this.tenantDomainRepository.create({
      tenant: { connect: { id: tenantId } },
      domain: domainName,
      type: "PRIMARY",
      verificationToken: "",
      verified: true,
    });

    return toTenantDomainResponse(created);
  }

  private async isVerificationTokenValid(
    record: { domain: string; verificationToken: string },
    token?: string,
  ): Promise<boolean> {
    if (token && token === record.verificationToken) {
      return true;
    }

    try {
      const txtRecords = await dns.resolveTxt(buildVerificationTxtName(record.domain));
      const flattened = txtRecords.map((entry) => entry.join("")).join("");
      return flattened.includes(record.verificationToken);
    } catch {
      return false;
    }
  }
}
