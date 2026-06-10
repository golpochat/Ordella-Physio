import { Injectable } from "@nestjs/common";
import type { UpdatePatientDto } from "@/patients/dto/update-patient.dto";
import { PatientsRepository } from "@/patients/patients.repository";
import { PatientEventPublisher } from "@/events/patient-event.publisher";
import { mapGenderToPrisma } from "@/utils/patient-helpers";
import { toPatientResponse } from "@/patients/patients.mapper";

export type UpdatePatientCommandInput = {
  tenantId: string;
  patientId: string;
  dto: UpdatePatientDto;
  correlationId?: string;
};

@Injectable()
export class UpdatePatientCommand {
  constructor(
    private readonly patientsRepository: PatientsRepository,
    private readonly eventPublisher: PatientEventPublisher,
  ) {}

  async execute(input: UpdatePatientCommandInput) {
    const patient = await this.patientsRepository.update(input.tenantId, input.patientId, {
      firstName: input.dto.firstName,
      lastName: input.dto.lastName,
      email: input.dto.email,
      phone: input.dto.phone,
      dateOfBirth: input.dto.dateOfBirth ? new Date(input.dto.dateOfBirth) : undefined,
      gender: input.dto.gender ? mapGenderToPrisma(input.dto.gender) : undefined,
      address: input.dto.address,
      emergencyContactName: input.dto.emergencyContactName,
      emergencyContactPhone: input.dto.emergencyContactPhone,
      notes: input.dto.notes,
    });

    await this.eventPublisher.publishPatientUpdated(
      {
        tenantId: input.tenantId,
        patientId: patient.id,
        changes: input.dto as Record<string, unknown>,
        updatedAt: patient.updatedAt.toISOString(),
      },
      input.correlationId,
    );

    return toPatientResponse(patient);
  }
}
