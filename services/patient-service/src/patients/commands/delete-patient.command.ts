import { Injectable } from "@nestjs/common";
import { PatientsRepository } from "@/patients/patients.repository";
import { PatientEventPublisher } from "@/events/patient-event.publisher";

export type DeletePatientCommandInput = {
  tenantId: string;
  patientId: string;
  correlationId?: string;
};

@Injectable()
export class DeletePatientCommand {
  constructor(
    private readonly patientsRepository: PatientsRepository,
    private readonly eventPublisher: PatientEventPublisher,
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

    return { message: "Patient deleted", patientId: patient.id, deletedAt };
  }
}
