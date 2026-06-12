import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { FileStorageService } from "@/services/file-storage.service";

const HARD_DELETE_RETENTION_DAYS = 30;

@Injectable()
export class FileLifecycleService {
  private readonly logger = new Logger(FileLifecycleService.name);

  constructor(private readonly fileStorageService: FileStorageService) {}

  @Cron(CronExpression.EVERY_DAY_AT_2AM)
  async runScheduledSweeps() {
    await this.runExpirationSweep();
    await this.runHardDeleteSweep();
  }

  async runHardDeleteSweep() {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - HARD_DELETE_RETENTION_DAYS);

    const candidates = await this.fileStorageService.findSoftDeletedBefore(cutoff);
    let deleted = 0;

    for (const file of candidates) {
      try {
        await this.fileStorageService.hardDeleteFile(file.id);
        deleted += 1;
      } catch (error) {
        this.logger.warn(
          `Hard delete sweep failed for file ${file.id}`,
          error instanceof Error ? error.message : error,
        );
      }
    }

    if (deleted > 0) {
      this.logger.log(`Hard delete sweep permanently removed ${deleted} file(s).`);
    }

    return { deleted };
  }

  async runExpirationSweep() {
    const now = new Date();
    const expired = await this.fileStorageService.findExpiredActiveFiles(now);
    let softDeleted = 0;

    for (const file of expired) {
      try {
        await this.fileStorageService.softDeleteFileBySystem(file.id);
        softDeleted += 1;
      } catch (error) {
        this.logger.warn(
          `Expiration sweep failed for file ${file.id}`,
          error instanceof Error ? error.message : error,
        );
      }
    }

    if (softDeleted > 0) {
      this.logger.log(`Expiration sweep soft-deleted ${softDeleted} file(s).`);
    }

    return { softDeleted };
  }
}
