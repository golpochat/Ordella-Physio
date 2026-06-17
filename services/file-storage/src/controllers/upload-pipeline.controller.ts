import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { memoryStorage } from "multer";
import type { Request } from "express";
import { PERMISSIONS, PermissionGuard, RequirePermissions, TenantGuard } from "@ordella/security";
import { loadStorageConfig } from "@/config/storage.config";
import { FileStorageService } from "@/services/file-storage.service";
import { JwtGuard } from "@/guards/jwt.guard";
import { CurrentUser } from "@/guards/current-user.decorator";
import type { AuthenticatedFileUser } from "@/utils/file-user";
import type { UploadFilePayload } from "@/validators/file.types";

@Controller()
export class UploadPipelineController {
  constructor(private readonly fileStorageService: FileStorageService) {}

  @Post("upload")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.FILES_UPLOAD)
  @UseInterceptors(
    FileInterceptor("file", {
      storage: memoryStorage(),
      limits: { fileSize: loadStorageConfig().maxFileBytes },
    }),
  )
  upload(
    @UploadedFile() file: Express.Multer.File | undefined,
    @Req() request: Request,
    @CurrentUser() user: AuthenticatedFileUser,
  ) {
    const body = request.body as UploadFilePayload;
    const uploadFile = file
      ? {
          buffer: file.buffer,
          mimetype: file.mimetype,
          size: file.size,
          originalname: file.originalname,
        }
      : undefined;

    return this.fileStorageService.uploadPipelineFile(body, uploadFile, user);
  }
}

@Controller("file")
export class FileSignedUrlController {
  constructor(private readonly fileStorageService: FileStorageService) {}

  @Get(":id/signed-url")
  @UseGuards(JwtGuard, TenantGuard, PermissionGuard)
  @RequirePermissions(PERMISSIONS.FILES_VIEW)
  getSignedUrl(@Param("id") id: string, @CurrentUser() user: AuthenticatedFileUser) {
    return this.fileStorageService.getPipelineSignedUrl(id, user);
  }
}
