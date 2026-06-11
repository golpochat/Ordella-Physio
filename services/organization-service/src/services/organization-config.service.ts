import { Injectable } from "@nestjs/common";
import type { Prisma } from "@/generated/prisma";
import type { OrganizationConfigNamespace } from "@/models/OrganizationConfig";
import { ORGANIZATION_CONFIG_NAMESPACES } from "@/models/OrganizationConfig";
import { OrganizationRepository } from "@/repositories/organization.repository";
import { OrganizationConfigRepository } from "@/repositories/organization-config.repository";
import {
  toOrganizationConfigNamespaceSummary,
  toOrganizationConfigResponse,
} from "@/utils/organization-config.mapper";
import {
  isOrganizationConfigNamespace,
  normalizeConfigData,
  validateConfig,
} from "@/validators/organization-config.validator";
import {
  invalidNamespaceError,
  organizationNotFoundError,
  organizationValidationError,
} from "@/utils/organization-errors";
import type { AuthenticatedOrganizationUser } from "@/utils/organization-helpers";

@Injectable()
export class OrganizationConfigService {
  constructor(
    private readonly organizationRepository: OrganizationRepository,
    private readonly organizationConfigRepository: OrganizationConfigRepository,
  ) {}

  private assertNamespace(namespace: string): OrganizationConfigNamespace {
    if (!isOrganizationConfigNamespace(namespace)) {
      throw invalidNamespaceError();
    }

    return namespace;
  }

  async listNamespaces(orgId: string) {
    const organization = await this.organizationRepository.findById(orgId);
    if (!organization) {
      throw organizationNotFoundError();
    }

    const stored = await this.organizationConfigRepository.findAllByOrganizationId(orgId);
    const storedByNamespace = new Map(stored.map((entry) => [entry.namespace, entry]));

    return {
      namespaces: ORGANIZATION_CONFIG_NAMESPACES.map((namespace) =>
        toOrganizationConfigNamespaceSummary(namespace, storedByNamespace.get(namespace) ?? null),
      ),
    };
  }

  async getConfig(orgId: string, namespaceInput: string) {
    const namespace = this.assertNamespace(namespaceInput);

    const organization = await this.organizationRepository.findById(orgId);
    if (!organization) {
      throw organizationNotFoundError();
    }

    const config = await this.organizationConfigRepository.findByOrganizationAndNamespace(
      orgId,
      namespace,
    );

    return toOrganizationConfigResponse(namespace, config);
  }

  async updateConfig(
    orgId: string,
    namespaceInput: string,
    data: unknown,
    updatedByUser?: AuthenticatedOrganizationUser,
  ) {
    const namespace = this.assertNamespace(namespaceInput);

    const organization = await this.organizationRepository.findById(orgId);
    if (!organization) {
      throw organizationNotFoundError();
    }

    const validationErrors = validateConfig(namespace, data);
    if (validationErrors.length > 0) {
      throw organizationValidationError(validationErrors);
    }

    const normalized = normalizeConfigData(namespace, data as Record<string, unknown>);

    const updated = await this.organizationConfigRepository.upsert(
      orgId,
      namespace,
      normalized as Prisma.InputJsonValue,
      updatedByUser?.userId,
    );

    return {
      config: toOrganizationConfigResponse(namespace, updated),
      message: "Configuration updated successfully.",
    };
  }
}
