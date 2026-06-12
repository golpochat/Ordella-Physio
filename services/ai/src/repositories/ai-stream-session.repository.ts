import { Injectable } from "@nestjs/common";
import type { Prisma } from "@/generated/prisma";
import { DatabaseService } from "@/database/database.module";

@Injectable()
export class AiStreamSessionRepository {
  constructor(private readonly database: DatabaseService) {}

  create(input: {
    tenantId: string;
    sessionId: string;
    task: string;
    context: Prisma.InputJsonValue;
    status: string;
  }) {
    return this.database.aIStreamSession.create({ data: input });
  }

  findBySessionId(sessionId: string) {
    return this.database.aIStreamSession.findUnique({ where: { sessionId } });
  }

  updateStatus(sessionId: string, status: string, chunks?: Prisma.InputJsonValue) {
    return this.database.aIStreamSession.update({
      where: { sessionId },
      data: {
        status,
        ...(chunks !== undefined ? { chunks } : {}),
      },
    });
  }
}
