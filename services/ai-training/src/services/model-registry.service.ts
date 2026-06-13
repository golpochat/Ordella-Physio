import { Injectable } from "@nestjs/common";
import { toModelRegistryRecord } from "@/models/AIModelRegistry";
import { AiModelRegistryRepository } from "@/repositories/ai-training.repository";
import { modelNotFoundError } from "@/utils/training-errors";

@Injectable()
export class ModelRegistryService {
  constructor(private readonly registryRepository: AiModelRegistryRepository) {}

  async listModels(tenantId: string) {
    const models = await this.registryRepository.listByTenant(tenantId);
    return models.map(toModelRegistryRecord);
  }

  async getModel(tenantId: string, id: string) {
    const model = await this.registryRepository.findById(tenantId, id);
    if (!model) {
      throw modelNotFoundError();
    }
    return toModelRegistryRecord(model);
  }

  async publishModel(tenantId: string, id: string) {
    const model = await this.registryRepository.findById(tenantId, id);
    if (!model) {
      throw modelNotFoundError();
    }
    await this.registryRepository.update(tenantId, id, { status: "PUBLISHED" });
    const updated = await this.registryRepository.findById(tenantId, id);
    return toModelRegistryRecord(updated!);
  }

  async deprecateModel(tenantId: string, id: string) {
    const model = await this.registryRepository.findById(tenantId, id);
    if (!model) {
      throw modelNotFoundError();
    }
    await this.registryRepository.update(tenantId, id, { status: "DEPRECATED" });
    const updated = await this.registryRepository.findById(tenantId, id);
    return toModelRegistryRecord(updated!);
  }

  async registerFromTrainingJob(input: {
    tenantId: string;
    trainingJobId: string;
    modelName: string;
    version: string;
    baseModel: string;
    trainingProvider: "OPENAI" | "AZURE" | "LOCAL";
    fileLocation: string;
    metadata?: Record<string, unknown>;
  }) {
    const model = await this.registryRepository.create({
      tenantId: input.tenantId,
      modelName: input.modelName,
      version: input.version,
      baseModel: input.baseModel,
      trainingJobId: input.trainingJobId,
      trainingProvider: input.trainingProvider,
      fileLocation: input.fileLocation,
      metadata: (input.metadata ?? {}) as never,
      status: "DRAFT",
    });
    return toModelRegistryRecord(model);
  }
}
