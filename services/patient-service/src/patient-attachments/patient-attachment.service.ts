import { createReadStream } from "fs";
import { Injectable } from "@nestjs/common";
import type { Response } from "express";
import { PatientsRepository } from "@/patients/patients.repository";
import { PatientAttachmentRepository } from "@/repositories/patient-attachment.repository";
import {
  toPatientAttachmentListResponse,
  toPatientAttachmentResponse,
} from "@/patient-attachments/patient-attachment.mapper";
import type { AuthenticatedPatientUser } from "@/utils/patient-helpers";
import {
  patientNotFoundError,
  patientTenantMismatchError,
} from "@/utils/patient-errors";
import {
  patientAttachmentFileTooLargeError,
  patientAttachmentInvalidFileError,
  patientAttachmentNotFoundError,
  patientAttachmentUnsafeFileError,
  patientAttachmentUploadFailedError,
  patientAttachmentValidationError,
} from "@/utils/patient-attachment-errors";
import {
  isAllowedPatientAttachmentMimeType,
  isAllowedPatientAttachmentSize,
  type PatientAttachmentUploadFile,
  deletePatientAttachmentFile,
  resolveAbsoluteStoragePath,
} from "@/utils/patient-attachment-storage";
import { validateUploadAttachment } from "@/validators/patient-attachment.validator";
import { FileStorageClient } from "@/integrations/file-storage.client";

@Injectable()
export class PatientAttachmentService {
  constructor(
    private readonly patientsRepository: PatientsRepository,
    private readonly patientAttachmentRepository: PatientAttachmentRepository,
    private readonly fileStorageClient: FileStorageClient,
  ) {}

  async uploadAttachment(
    patientId: string,
    file: PatientAttachmentUploadFile | undefined,
    payload: { description?: string },
    uploadedByUser: AuthenticatedPatientUser,
  ) {
    const tenantId = uploadedByUser.tenantId?.trim();
    if (!tenantId) {
      throw patientTenantMismatchError();
    }

    await this.ensurePatientBelongsToTenant(patientId, tenantId);

    if (!file) {
      throw patientAttachmentValidationError([
        { field: "file", message: "A file is required." },
      ]);
    }

    if (!isAllowedPatientAttachmentSize(file.size)) {
      throw patientAttachmentFileTooLargeError();
    }

    if (!isAllowedPatientAttachmentMimeType(file.mimetype)) {
      throw patientAttachmentInvalidFileError();
    }

    const validation = validateUploadAttachment({
      fileName: file.originalname,
      fileType: file.mimetype,
      fileSize: file.size,
      description: payload.description,
    });

    if (!validation.valid) {
      throw patientAttachmentValidationError(validation.fields);
    }

    let storagePath: string;
    try {
      const uploaded = await this.fileStorageClient.uploadPatientAttachment({
        tenantId,
        ownerUserId: uploadedByUser.userId,
        actorRole: uploadedByUser.role,
        patientId,
        filename: validation.payload.fileName,
        mimeType: validation.payload.fileType,
        buffer: file.buffer,
      });
      storagePath = this.fileStorageClient.buildStorageReference(uploaded.file.id);
    } catch (error) {
      const message = error instanceof Error ? error.message : "";
      if (message.includes("unsafe") || message.includes("VIRUS_DETECTED")) {
        throw patientAttachmentUnsafeFileError();
      }
      throw patientAttachmentUploadFailedError();
    }

    const attachment = await this.patientAttachmentRepository.create({
      tenantId,
      uploadedByStaffId: uploadedByUser.userId,
      fileName: validation.payload.fileName,
      fileType: validation.payload.fileType,
      fileSize: validation.payload.fileSize,
      storagePath,
      description: validation.payload.description,
      patient: { connect: { id: patientId } },
    });

    return {
      attachment: toPatientAttachmentResponse(attachment),
      message: "Attachment uploaded successfully.",
    };
  }

  async listAttachments(patientId: string, requestingUser: AuthenticatedPatientUser) {
    const tenantId = requestingUser.tenantId?.trim();
    if (!tenantId) {
      throw patientTenantMismatchError();
    }

    await this.ensurePatientBelongsToTenant(patientId, tenantId);

    const attachments = await this.patientAttachmentRepository.listByPatient(patientId, tenantId);

    return {
      data: toPatientAttachmentListResponse(attachments),
    };
  }

  async getAttachmentMetadata(
    patientId: string,
    attachmentId: string,
    requestingUser: AuthenticatedPatientUser,
  ) {
    const tenantId = requestingUser.tenantId?.trim();
    if (!tenantId) {
      throw patientTenantMismatchError();
    }

    await this.ensurePatientBelongsToTenant(patientId, tenantId);

    const attachment = await this.patientAttachmentRepository.findByIdForPatient(
      attachmentId,
      patientId,
      tenantId,
    );

    if (!attachment) {
      throw patientAttachmentNotFoundError();
    }

    return {
      attachment: toPatientAttachmentResponse(attachment),
    };
  }

  async downloadAttachment(
    patientId: string,
    attachmentId: string,
    requestingUser: AuthenticatedPatientUser,
    response: Response,
    authorization?: string,
  ) {
    const { attachment } = await this.getAttachmentMetadata(patientId, attachmentId, requestingUser);
    const fileId = this.fileStorageClient.parseStorageReference(attachment.storagePath);

    if (fileId && authorization) {
      const accessUrl = await this.fileStorageClient.getAccessUrl(
        fileId,
        attachment.tenantId,
        authorization,
      );
      response.redirect(accessUrl);
      return;
    }

    const absolutePath = resolveAbsoluteStoragePath(attachment.storagePath);
    response.setHeader("Content-Type", attachment.fileType);
    response.setHeader(
      "Content-Disposition",
      `attachment; filename="${attachment.fileName.replace(/"/g, "")}"`,
    );

    const stream = createReadStream(absolutePath);
    stream.on("error", () => {
      if (!response.headersSent) {
        response.status(404).end();
      }
    });
    stream.pipe(response);
  }

  async deleteAttachment(
    patientId: string,
    attachmentId: string,
    requestingUser: AuthenticatedPatientUser,
    authorization?: string,
  ) {
    const tenantId = requestingUser.tenantId?.trim();
    if (!tenantId) {
      throw patientTenantMismatchError();
    }

    await this.ensurePatientBelongsToTenant(patientId, tenantId);

    const attachment = await this.patientAttachmentRepository.findByIdForPatient(
      attachmentId,
      patientId,
      tenantId,
    );

    if (!attachment) {
      throw patientAttachmentNotFoundError();
    }

    if (attachment.tenantId !== tenantId) {
      throw patientTenantMismatchError("You cannot access attachments from another tenant.");
    }

    const fileId = this.fileStorageClient.parseStorageReference(attachment.storagePath);
    if (fileId && authorization) {
      await this.fileStorageClient.softDeleteFile(fileId, tenantId, authorization);
    } else {
      await deletePatientAttachmentFile(attachment.storagePath);
    }

    await this.patientAttachmentRepository.delete(attachmentId);

    return {
      message: "Attachment deleted successfully.",
    };
  }

  private async ensurePatientBelongsToTenant(patientId: string, tenantId: string) {
    const patient = await this.patientsRepository.findByIdGlobal(patientId);
    if (!patient) {
      throw patientNotFoundError();
    }

    if (patient.tenantId !== tenantId) {
      throw patientTenantMismatchError("You cannot access attachments from another tenant.");
    }
  }
}
