import { Injectable, Logger } from "@nestjs/common";
import { FileStorageHttpClient } from "@ordella/shared";

@Injectable()
export class FileStorageClient {
  private readonly client = new FileStorageHttpClient({
    logger: new Logger(FileStorageClient.name),
  });

  softDeleteByEntity(input: {
    tenantId: string;
    entityType: string;
    entityId: string;
    deletedByUserId: string;
    actorRole?: string;
  }) {
    return this.client.softDeleteByEntity(input);
  }
}
