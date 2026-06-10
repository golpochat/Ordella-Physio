import { Injectable } from "@nestjs/common";
import { PatientAggregate } from "@ordella/domain";
import { randomString } from "@ordella/utils";
import type { CreatePatientDto } from "@/patients/dto/create-patient.dto";
import { PatientsRepository } from "@/patients/patients.repository";
import { MedicalRecordsRepository } from "@/medical-records/medical-records.repository";
import { PatientEventPublisher } from "@/events/patient-event.publisher";
import { mapGenderToPrisma } from "@/utils/patient-helpers";
import { toPatientResponse } from "@/patients/patients.mapper";

export type CreatePatientCommandInput = {
  tenantId: string;
  dto: CreatePatientDto;
  correlationId?: string;
};

@Injectable()
export class CreatePatientCommand {
  constructor(
    private readonly patientsRepository: PatientsRepository,
    private readonly medicalRecordsRepository: MedicalRecordsRepository,
    private readonly eventPublisher: PatientEventPublisher,
  ) {}

  async execute(input: CreatePatientCommandInput) {
    const patientId = randomString(24);
    const aggregateResult = PatientAggregate.create({
      id: patientId,
      tenantId: input.tenantId,
      firstName: input.dto.firstName,
      lastName: input.dto.lastName,
      email: input.dto.email,
      phone: input.dto.phone,
      dateOfBirth: input.dto.dateOfBirth ? new Date(input.dto.dateOfBirth) : undefined,
      correlationId: input.correlationId,
    });

    if (aggregateResult.isFailure) {
      throw new Error(String(aggregateResult.error));
    }

    const patient = await this.patientsRepository.create(input.tenantId, {
      id: patientId,
      firstName: input.dto.firstName,
      lastName: input.dto.lastName,
      email: input.dto.email,
      phone: input.dto.phone,
      dateOfBirth: input.dto.dateOfBirth ? new Date(input.dto.dateOfBirth) : undefined,
      gender: mapGenderToPrisma(input.dto.gender),
      address: input.dto.address,
      emergencyContactName: input.dto.emergencyContactName,
      emergencyContactPhone: input.dto.emergencyContactPhone,
      notes: input.dto.notes,
    });

    await this.medicalRecordsRepository.createForPatient(input.tenantId, patient.id);

    await this.eventPublisher.publishPatientCreated(
      {
        tenantId: input.tenantId,
        patientId: patient.id,
        firstName: patient.firstName,
        lastName: patient.lastName,
        createdAt: patient.createdAt.toISOString(),
      },
      input.correlationId,
    );

    return toPatientResponse(patient);
  }
}
