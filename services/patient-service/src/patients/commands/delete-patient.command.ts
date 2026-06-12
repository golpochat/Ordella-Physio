import { Injectable } from "@nestjs/common";
import { PatientsRepository } from "@/patients/patients.repository";
import { PatientEventPublisher } from "@/events/patient-event.publisher";
import { AuditLogClient } from "@/integrations/audit-log.client";
import { FileStorageClient } from "@/integrations/file-storage.client";
import type { AuditActorContext } from "@ordella/shared";

export type DeletePatientCommandInput = {
  tenantId: string;
  patientId: string;
  correlationId?: string;
  actor?: AuditActorContext;
};

@Injectable()
export class DeletePatientCommand {
  constructor(
    private readonly patientsRepository: PatientsRepository,
    private readonly eventPublisher: PatientEventPublisher,
    private readonly auditLogClient: AuditLogClient,
    private readonly fileStorageClient: FileStorageClient,
  ) {}

  async execute(input: DeletePatientCommandInput) {
    const patient = await this.patientsRepository.softDelete(input.tenantId, input.patientId);
    const deletedAt = new Date().toISOString();

    await this.eventPublisher.publishPatientDeleted(
      {
        tenantId: input.tenantId,
        patientId: patient.id,
        deletedAt,
      },
      input.correlationId,
    );

    if (input.actor?.userId) {
      void this.fileStorageClient
        .softDeleteByEntity({
          tenantId: input.tenantId,
          entityType: "PATIENT",
          entityId: patient.id,
          deletedByUserId: input.actor.userId,
          actorRole: input.actor.role,
        })
        .catch(() => undefined);

      void this.auditLogClient.logAction(
        {
          tenantId: input.tenantId,
          actorUserId: input.actor.userId,
          actorRole: input.actor.role,
          entityType: "PATIENT",
          entityId: patient.id,
          action: "DELETE",
          metadata: { patientId: patient.id, deletedAt },
        },
        {
          ipAddress: input.actor.ipAddress,
          userAgent: input.actor.userAgent,
        },
      );
    }

    return { message: "Patient deleted", patientId: patient.id, deletedAt };
  }
}
