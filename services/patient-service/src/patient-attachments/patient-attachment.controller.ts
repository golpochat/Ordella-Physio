import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { memoryStorage } from "multer";
import type { Response } from "express";
import { TenantGuard } from "@ordella/security";
import { PatientAttachmentService } from "@/patient-attachments/patient-attachment.service";
import { PatientAttachmentsGuard } from "@/patient-attachments/guards/patient-attachments.guard";
import { MAX_PATIENT_ATTACHMENT_BYTES } from "@/constants/patient-attachment.constants";
import { JwtGuard } from "@/patients/guards/jwt.guard";
import { CurrentUser } from "@/patients/guards/current-user.decorator";
import type { AuthenticatedPatientUser } from "@/utils/patient-helpers";

@Controller("patients/:patientId/attachments")
@UseGuards(JwtGuard, TenantGuard, PatientAttachmentsGuard)
export class PatientAttachmentController {
  constructor(private readonly patientAttachmentService: PatientAttachmentService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor("file", {
      storage: memoryStorage(),
      limits: { fileSize: MAX_PATIENT_ATTACHMENT_BYTES },
    }),
  )
  uploadAttachment(
    @Param("patientId") patientId: string,
    @UploadedFile() file: Express.Multer.File | undefined,
    @Body("description") description: string | undefined,
    @CurrentUser() user: AuthenticatedPatientUser,
  ) {
    const uploadFile = file
      ? {
          buffer: file.buffer,
          mimetype: file.mimetype,
          size: file.size,
          originalname: file.originalname,
        }
      : undefined;

    return this.patientAttachmentService.uploadAttachment(
      patientId,
      uploadFile,
      { description },
      user,
    );
  }

  @Get()
  listAttachments(
    @Param("patientId") patientId: string,
    @CurrentUser() user: AuthenticatedPatientUser,
  ) {
    return this.patientAttachmentService.listAttachments(patientId, user);
  }

  @Get(":attachmentId/download")
  async downloadAttachment(
    @Param("patientId") patientId: string,
    @Param("attachmentId") attachmentId: string,
    @CurrentUser() user: AuthenticatedPatientUser,
    @Res() response: Response,
  ) {
    await this.patientAttachmentService.downloadAttachment(
      patientId,
      attachmentId,
      user,
      response,
    );
  }

  @Get(":attachmentId")
  getAttachmentMetadata(
    @Param("patientId") patientId: string,
    @Param("attachmentId") attachmentId: string,
    @CurrentUser() user: AuthenticatedPatientUser,
  ) {
    return this.patientAttachmentService.getAttachmentMetadata(patientId, attachmentId, user);
  }

  @Delete(":attachmentId")
  deleteAttachment(
    @Param("patientId") patientId: string,
    @Param("attachmentId") attachmentId: string,
    @CurrentUser() user: AuthenticatedPatientUser,
  ) {
    return this.patientAttachmentService.deleteAttachment(patientId, attachmentId, user);
  }
}
