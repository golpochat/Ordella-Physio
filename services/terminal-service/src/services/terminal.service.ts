import { Injectable } from "@nestjs/common";
import type { CreateTerminalPayload, UpdateTerminalPayload } from "@/models/Terminal";
import { TerminalRepository } from "@/repositories/terminal.repository";
import { TenantServiceClient } from "@/integrations/tenant-service.client";
import {
  parseListTerminalsQuery,
  validateCreateTerminal,
  validateUpdateTerminal,
} from "@/validators/terminal.validator";
import {
  invalidTerminalFilterError,
  invalidTerminalPaginationError,
  locationNotInTenantError,
  locationNotInTenantUpdateError,
  terminalAlreadyActiveError,
  terminalAlreadyInactiveError,
  terminalCodeExistsError,
  terminalInActiveUseError,
  terminalNotFoundError,
  terminalTenantMismatchError,
  terminalTenantRequiredError,
  terminalValidationError,
} from "@/utils/terminal-errors";
import { isTerminalInActiveUse } from "@/utils/terminal-active-use";
import {
  toTerminalListResponse,
  toTerminalResponse,
  type AuthenticatedTerminalUser,
} from "@/utils/terminal-helpers";

@Injectable()
export class TerminalService {
  constructor(
    private readonly terminalRepository: TerminalRepository,
    private readonly tenantServiceClient: TenantServiceClient,
  ) {}

  async createTerminal(payload: CreateTerminalPayload, createdByUser: AuthenticatedTerminalUser) {
    const tenantId = createdByUser.tenantId?.trim();
    if (!tenantId) {
      throw terminalTenantRequiredError();
    }

    const validation = validateCreateTerminal(payload);
    if (!validation.valid) {
      throw terminalValidationError(validation.fields);
    }

    const normalized = validation.payload;

    const location = await this.tenantServiceClient.getLocation(normalized.locationId);
    if (!location || location.tenantId !== tenantId) {
      throw locationNotInTenantError();
    }

    const existing = await this.terminalRepository.findByLocationAndCode(
      normalized.locationId,
      normalized.code,
    );
    if (existing) {
      throw terminalCodeExistsError();
    }

    const terminal = await this.terminalRepository.create({
      tenantId,
      locationId: normalized.locationId,
      name: normalized.name,
      code: normalized.code,
      type: normalized.type,
      ipAddress: normalized.ipAddress,
      macAddress: normalized.macAddress,
      status: "ACTIVE",
    });

    return {
      terminal: toTerminalResponse(terminal),
      message: "Terminal created successfully.",
    };
  }

  async listTerminals(query: unknown, requestingUser: AuthenticatedTerminalUser) {
    const tenantId = requestingUser.tenantId?.trim();
    if (!tenantId) {
      throw terminalTenantRequiredError();
    }

    const parsed = parseListTerminalsQuery(query);
    if (!parsed.valid) {
      if (parsed.error === "INVALID_PAGINATION") {
        throw invalidTerminalPaginationError();
      }
      throw invalidTerminalFilterError();
    }

    const { page, limit, search, type, status, locationId, sortBy, sortOrder } = parsed.payload;
    const filter = { tenantId, search, type, status, locationId };

    const [terminals, total] = await Promise.all([
      this.terminalRepository.findManyFiltered({
        ...filter,
        skip: (page - 1) * limit,
        take: limit,
        sortBy,
        sortOrder,
      }),
      this.terminalRepository.countFiltered(filter),
    ]);

    const totalPages = total === 0 ? 0 : Math.ceil(total / limit);

    return {
      data: toTerminalListResponse(terminals),
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  }

  async getTerminal(id: string, requestedByUser: AuthenticatedTerminalUser) {
    const tenantId = requestedByUser.tenantId?.trim();
    if (!tenantId) {
      throw terminalTenantRequiredError();
    }

    const terminal = await this.terminalRepository.findById(id);
    if (!terminal) {
      throw terminalNotFoundError();
    }

    if (terminal.tenantId !== tenantId) {
      throw terminalTenantMismatchError();
    }

    return toTerminalResponse(terminal);
  }

  async updateTerminal(
    id: string,
    payload: UpdateTerminalPayload,
    updatedByUser: AuthenticatedTerminalUser,
  ) {
    const tenantId = updatedByUser.tenantId?.trim();
    if (!tenantId) {
      throw terminalTenantRequiredError();
    }

    const terminal = await this.terminalRepository.findById(id);
    if (!terminal) {
      throw terminalNotFoundError();
    }

    if (terminal.tenantId !== tenantId) {
      throw terminalTenantMismatchError();
    }

    const validation = validateUpdateTerminal(payload);
    if (!validation.valid) {
      throw terminalValidationError(validation.fields);
    }

    const normalized = validation.payload;
    const nextLocationId = normalized.locationId ?? terminal.locationId;

    if (normalized.locationId) {
      const location = await this.tenantServiceClient.getLocation(normalized.locationId);
      if (!location || location.tenantId !== tenantId) {
        throw locationNotInTenantUpdateError();
      }
    }

    if (normalized.code && normalized.code !== terminal.code) {
      const existing = await this.terminalRepository.findByLocationAndCode(
        nextLocationId,
        normalized.code,
      );
      if (existing && existing.id !== id) {
        throw terminalCodeExistsError();
      }
    } else if (normalized.locationId && normalized.locationId !== terminal.locationId) {
      const existing = await this.terminalRepository.findByLocationAndCode(
        normalized.locationId,
        terminal.code,
      );
      if (existing && existing.id !== id) {
        throw terminalCodeExistsError();
      }
    }

    const updated = await this.terminalRepository.update(id, {
      ...(normalized.name !== undefined ? { name: normalized.name } : {}),
      ...(normalized.code !== undefined ? { code: normalized.code } : {}),
      ...(normalized.type !== undefined ? { type: normalized.type } : {}),
      ...(normalized.locationId !== undefined ? { locationId: normalized.locationId } : {}),
      ...(normalized.ipAddress !== undefined ? { ipAddress: normalized.ipAddress } : {}),
      ...(normalized.macAddress !== undefined ? { macAddress: normalized.macAddress } : {}),
      ...(normalized.status !== undefined ? { status: normalized.status } : {}),
    });

    return {
      terminal: toTerminalResponse(updated),
      message: "Terminal updated successfully.",
    };
  }

  async deactivateTerminal(id: string, performedByUser: AuthenticatedTerminalUser) {
    const tenantId = performedByUser.tenantId?.trim();
    if (!tenantId) {
      throw terminalTenantRequiredError();
    }

    const terminal = await this.terminalRepository.findById(id);
    if (!terminal) {
      throw terminalNotFoundError();
    }

    if (terminal.tenantId !== tenantId) {
      throw terminalTenantMismatchError();
    }

    if (terminal.status === "INACTIVE") {
      throw terminalAlreadyInactiveError();
    }

    if (isTerminalInActiveUse(terminal)) {
      throw terminalInActiveUseError();
    }

    const updated = await this.terminalRepository.setStatus(id, "INACTIVE");

    return {
      terminal: toTerminalResponse(updated),
      message: "Terminal deactivated successfully.",
    };
  }

  async activateTerminal(id: string, performedByUser: AuthenticatedTerminalUser) {
    const tenantId = performedByUser.tenantId?.trim();
    if (!tenantId) {
      throw terminalTenantRequiredError();
    }

    const terminal = await this.terminalRepository.findById(id);
    if (!terminal) {
      throw terminalNotFoundError();
    }

    if (terminal.tenantId !== tenantId) {
      throw terminalTenantMismatchError();
    }

    if (terminal.status === "ACTIVE") {
      throw terminalAlreadyActiveError();
    }

    const updated = await this.terminalRepository.setStatus(id, "ACTIVE");

    return {
      terminal: toTerminalResponse(updated),
      message: "Terminal activated successfully.",
    };
  }
}
