import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { FileStorageService } from "@/services/file-storage.service";
import type {
  InternalSoftDeleteByEntityPayload,
  InternalUploadFilePayload,
} from "@/validators/file.types";

@Controller("files/internal")
export class InternalFileController {
  constructor(private readonly fileStorageService: FileStorageService) {}

  @Post("upload")
  upload(@Body() payload: InternalUploadFilePayload) {
    return this.fileStorageService.uploadFileInternal(payload);
  }

  @Post("soft-delete-by-entity")
  softDeleteByEntity(@Body() payload: InternalSoftDeleteByEntityPayload) {
    return this.fileStorageService.softDeleteFilesByEntity(payload);
  }

  @Get("usage")
  getTenantUsage(@Query("tenantId") tenantId: string) {
    return this.fileStorageService.getTenantStorageUsageMb(tenantId);
  }
}
