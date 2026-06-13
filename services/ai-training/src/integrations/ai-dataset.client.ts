import { Injectable, Logger } from "@nestjs/common";
import { trainingConfig } from "@/config/training.config";

export type DatasetExportRecord = {
  input: unknown;
  output?: unknown | null;
  metadata?: Record<string, unknown>;
};

export type DatasetExportPayload = {
  dataset: { id: string; name: string; type: string };
  version: { id: string; versionNumber: number } | null;
  records: DatasetExportRecord[];
};

@Injectable()
export class AiDatasetClient {
  private readonly logger = new Logger(AiDatasetClient.name);

  async exportDataset(
    datasetId: string,
    headers: Record<string, string>,
  ): Promise<DatasetExportPayload> {
    const response = await fetch(`${trainingConfig.aiServiceUrl}/ai/datasets/${datasetId}/export`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: "{}",
    });

    if (!response.ok) {
      const text = await response.text();
      this.logger.error(`Dataset export failed: ${response.status} ${text}`);
      throw new Error("Failed to load dataset from AI service.");
    }

    return (await response.json()) as DatasetExportPayload;
  }

  async listVersionRecords(
    datasetId: string,
    versionId: string,
    headers: Record<string, string>,
  ): Promise<DatasetExportRecord[]> {
    const response = await fetch(
      `${trainingConfig.aiServiceUrl}/ai/datasets/${datasetId}/versions/${versionId}/records`,
      { headers },
    );

    if (!response.ok) {
      throw new Error("Failed to load dataset records from AI service.");
    }

    const records = (await response.json()) as Array<{
      input: unknown;
      output?: unknown;
      metadata?: Record<string, unknown>;
    }>;

    return records.map((record) => ({
      input: record.input,
      output: record.output,
      metadata: record.metadata,
    }));
  }
}
