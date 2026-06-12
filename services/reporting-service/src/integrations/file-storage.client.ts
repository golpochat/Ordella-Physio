import { Injectable, Logger } from "@nestjs/common";
import { FileStorageHttpClient, type InternalFileUploadInput } from "@ordella/shared";

@Injectable()
export class FileStorageClient {
  private readonly client = new FileStorageHttpClient({
    logger: new Logger(FileStorageClient.name),
  });

  uploadInternal(input: InternalFileUploadInput) {
    return this.client.uploadInternal(input);
  }
}
