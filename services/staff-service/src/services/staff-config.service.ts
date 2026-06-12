import { Injectable } from "@nestjs/common";
import type { Prisma } from "@/generated/prisma";
import type { StaffConfigNamespace } from "@/models/StaffConfig";
import { STAFF_CONFIG_NAMESPACES } from "@/models/StaffConfig";
import { StaffRepository } from "@/repositories/staff.repository";
import { StaffConfigRepository } from "@/repositories/staff-config.repository";
import {
  toStaffConfigNamespaceSummary,
  toStaffConfigResponse,
} from "@/utils/staff-config.mapper";
import {
  invalidStaffConfigNamespaceError,
  staffConfigTenantMismatchError,
  staffNotFoundError,
  staffTenantRequiredError,
  staffValidationError,
} from "@/utils/staff-errors";
import {
  isStaffConfigNamespace,
  normalizeConfigData,
  validateConfig,
} from "@/validators/staff-config.validator";
import type { AuthenticatedStaffUser } from "@/utils/staff-helpers";

@Injectable()
export class StaffConfigService {
  constructor(
    private readonly staffRepository: StaffRepository,
    private readonly staffConfigRepository: StaffConfigRepository,
  ) {}

  private assertNamespace(namespace: string): StaffConfigNamespace {
    if (!isStaffConfigNamespace(namespace)) {
      throw invalidStaffConfigNamespaceError();
    }

    return namespace;
  }

  private async assertStaffAccess(staffId: string, tenantId: string) {
    const staff = await this.staffRepository.findById(staffId);
    if (!staff) {
      throw staffNotFoundError();
    }

    if (staff.tenantId !== tenantId) {
      throw staffConfigTenantMismatchError();
    }

    return staff;
  }

  async listNamespaces(staffId: string, requestingUser: AuthenticatedStaffUser) {
    const tenantId = requestingUser.tenantId?.trim();
    if (!tenantId) {
      throw staffTenantRequiredError();
    }

    await this.assertStaffAccess(staffId, tenantId);

    const stored = await this.staffConfigRepository.findAllByStaffId(staffId);
    const storedByNamespace = new Map(stored.map((entry) => [entry.namespace, entry]));

    return {
      namespaces: STAFF_CONFIG_NAMESPACES.map((namespace) =>
        toStaffConfigNamespaceSummary(namespace, storedByNamespace.get(namespace) ?? null),
      ),
    };
  }

  async getConfig(staffId: string, namespaceInput: string, requestingUser: AuthenticatedStaffUser) {
    const tenantId = requestingUser.tenantId?.trim();
    if (!tenantId) {
      throw staffTenantRequiredError();
    }

    const namespace = this.assertNamespace(namespaceInput);
    await this.assertStaffAccess(staffId, tenantId);

    const config = await this.staffConfigRepository.findByStaffAndNamespace(staffId, namespace);
    return toStaffConfigResponse(namespace, config);
  }

  async updateConfig(
    staffId: string,
    namespaceInput: string,
    data: unknown,
    updatedByUser: AuthenticatedStaffUser,
  ) {
    const tenantId = updatedByUser.tenantId?.trim();
    if (!tenantId) {
      throw staffTenantRequiredError();
    }

    const namespace = this.assertNamespace(namespaceInput);
    await this.assertStaffAccess(staffId, tenantId);

    const validationErrors = validateConfig(namespace, data);
    if (validationErrors.length > 0) {
      throw staffValidationError(validationErrors);
    }

    const normalized = normalizeConfigData(namespace, data as Record<string, unknown>);

    const updated = await this.staffConfigRepository.upsert(
      staffId,
      namespace,
      normalized as Prisma.InputJsonValue,
      updatedByUser.userId,
    );

    return {
      config: toStaffConfigResponse(namespace, updated),
      message: "Configuration updated successfully.",
    };
  }
}
