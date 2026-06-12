import { Injectable } from "@nestjs/common";
import type { Prisma } from "@/generated/prisma";
import { toProviderConfigResponse } from "@/models/ProviderConfig";

import { ProviderConfigRepository } from "@/repositories/provider-config.repository";

import { providerNotFoundError } from "@/utils/provider-errors";

import {

  validateCreateProviderConfig,

  validateUpdateProviderConfig,

} from "@/validators/provider.validator";



@Injectable()

export class ProviderConfigService {

  constructor(private readonly providerConfigRepository: ProviderConfigRepository) {}



  async createProviderConfig(tenantId: string, body: Record<string, unknown>) {

    const validated = validateCreateProviderConfig(body);

    const record = await this.providerConfigRepository.create({

      tenantId,

      ...validated,

    });



    return {

      message: "Provider configuration created.",

      config: toProviderConfigResponse(record),

    };

  }



  async listProviderConfigs(tenantId: string) {

    const records = await this.providerConfigRepository.listByTenant(tenantId);



    return {

      data: records.map(toProviderConfigResponse),

    };

  }



  async updateProviderConfig(id: string, tenantId: string, body: Record<string, unknown>) {

    const existing = await this.providerConfigRepository.findById(id);

    if (!existing || existing.tenantId !== tenantId) {

      throw providerNotFoundError();

    }



    const validated = validateUpdateProviderConfig(body);
    const { credentials, ...rest } = validated;
    const updateData: Prisma.ProviderConfigUpdateInput = {
      ...rest,
      ...(credentials ? { credentials: credentials as Prisma.InputJsonValue } : {}),
    };

    const record = await this.providerConfigRepository.update(id, updateData);



    return {

      message: "Provider configuration updated.",

      config: toProviderConfigResponse(record),

    };

  }

}


