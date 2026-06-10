import { Injectable } from "@nestjs/common";
import type { Prisma } from "@/generated/prisma";
import { DatabaseService } from "@/database/database.module";

@Injectable()
export class AiNotesRepository {
  constructor(private readonly db: DatabaseService) {}

  logUsage(input: {
    tenantId: string;
    userId: string;
    operation: string;
    modelName: string;
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
    metadata?: Prisma.InputJsonValue;
  }) {
    return this.db.aiUsageLog.create({ data: input });
  }

  storeOutput(input: {
    tenantId: string;
    userId: string;
    operation: string;
    patientId?: string;
    appointmentId?: string;
    therapistId?: string;
    inputSummary?: string;
    output: Prisma.InputJsonValue;
  }) {
    return this.db.aiOutputRecord.create({ data: input });
  }

  updateAcceptance(outputId: string, tenantId: string, userId: string, accepted: boolean) {
    return this.db.aiOutputRecord.updateMany({
      where: { id: outputId, tenantId, userId },
      data: { accepted },
    });
  }
}
