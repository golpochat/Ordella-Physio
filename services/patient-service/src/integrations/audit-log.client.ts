import { Injectable, Logger } from "@nestjs/common";
import {
  AuditLogHttpClient,
  type AuditLogActionInput,
  type AuditLogClientContext,
} from "@ordella/shared";

@Injectable()
export class AuditLogClient {
  private readonly client = new AuditLogHttpClient({
    logger: new Logger(AuditLogClient.name),
  });

  logAction(input: AuditLogActionInput, context: AuditLogClientContext = {}): Promise<void> {
    return this.client.logAction(input, context);
  }
}
