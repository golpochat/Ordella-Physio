import { Injectable } from "@nestjs/common";
import { InferenceService } from "@/services/inference.service";
import { inputToText } from "@/models/AIDatasetRecord";
import {
  AiDatasetRecordRepository,
  AiDatasetVersionRepository,
} from "@/repositories/ai-dataset.repository";

@Injectable()
export class DatasetEmbeddingService {
  constructor(
    private readonly recordRepository: AiDatasetRecordRepository,
    private readonly versionRepository: AiDatasetVersionRepository,
    private readonly inferenceService: InferenceService,
  ) {}

  async generateEmbedding(tenantId: string, input: unknown, model?: string) {
    const result = await this.inferenceService.runEmbedding(
      { text: inputToText(input), model },
      tenantId,
    );
    return result;
  }

  async storeEmbedding(recordId: string, vector: number[]) {
    return this.recordRepository.updateEmbedding(recordId, vector as never);
  }

  async batchEmbedVersion(tenantId: string, versionId: string, model?: string) {
    const records = await this.recordRepository.listByVersion(tenantId, versionId);
    let embedded = 0;
    let embeddingModel = model ?? "default";

    for (const record of records) {
      const result = await this.generateEmbedding(tenantId, record.input, model);
      embeddingModel = result.model;
      await this.storeEmbedding(record.id, result.embedding);
      embedded += 1;
    }

    await this.versionRepository.updateEmbeddingModel(versionId, embeddingModel);

    return {
      versionId,
      embedded,
      embeddingModel,
      dimensions: records.length ? (await this.recordRepository.findById(tenantId, records[0].id))?.embedding : null,
    };
  }
}
