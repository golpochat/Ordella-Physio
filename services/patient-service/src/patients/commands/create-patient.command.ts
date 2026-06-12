import { Injectable } from "@nestjs/common";
import { PatientAggregate } from "@ordella/domain";
import { randomString } from "@ordella/utils";
import { PatientsRepository } from "@/patients/patients.repository";
import { PatientInsuranceRepository } from "@/repositories/patient-insurance.repository";
import { MedicalRecordsRepository } from "@/medical-records/medical-records.repository";
import { PatientEventPublisher } from "@/events/patient-event.publisher";
import { mapGenderToPrisma } from "@/utils/patient-helpers";
import { toPatientInsuranceResponse, toPatientResponse } from "@/patients/patients.mapper";
import { validateCreatePatient } from "@/validators/patient.validator";
import {
  patientEmailExistsError,
  patientValidationError,
} from "@/utils/patient-errors";

export type CreatePatientCommandInput = {
  tenantId: string;
  payload: unknown;
  correlationId?: string;
};

@Injectable()
export class CreatePatientCommand {
  constructor(
    private readonly patientsRepository: PatientsRepository,
    private readonly patientInsuranceRepository: PatientInsuranceRepository,
    private readonly medicalRecordsRepository: MedicalRecordsRepository,
    private readonly eventPublisher: PatientEventPublisher,
  ) {}

  async execute(input: CreatePatientCommandInput) {
    const validation = validateCreatePatient(input.payload);
    if (!validation.valid) {
      throw patientValidationError(validation.fields);
    }

    const normalized = validation.payload;

    if (normalized.email) {
      const existing = await this.patientsRepository.findByTenantAndEmail(
        input.tenantId,
        normalized.email,
      );
      if (existing) {
        throw patientEmailExistsError();
      }
    }

    const patientId = randomString(24);
    const aggregateResult = PatientAggregate.create({
      id: patientId,
      tenantId: input.tenantId,
      firstName: normalized.firstName,
      lastName: normalized.lastName,
      email: normalized.email,
      phone: normalized.phone,
      dateOfBirth: new Date(normalized.dateOfBirth),
      correlationId: input.correlationId,
    });

    if (aggregateResult.isFailure) {
      throw patientValidationError([
        { field: "payload", message: String(aggregateResult.error) },
      ]);
    }

    const patient = await this.patientsRepository.create(input.tenantId, {
      id: patientId,
      firstName: normalized.firstName,
      lastName: normalized.lastName,
      email: normalized.email,
      phone: normalized.phone,
      dateOfBirth: new Date(normalized.dateOfBirth),
      gender: mapGenderToPrisma(normalized.gender),
      bloodGroup: normalized.bloodGroup,
      addressLine1: normalized.addressLine1,
      addressLine2: normalized.addressLine2,
      city: normalized.city,
      state: normalized.state,
      postalCode: normalized.postalCode,
      country: normalized.country,
      emergencyContactName: normalized.emergencyContactName,
      emergencyContactPhone: normalized.emergencyContactPhone,
      status: "ACTIVE",
    });

    await this.medicalRecordsRepository.createForPatient(input.tenantId, patient.id);

    let insurance = null;
    if (normalized.insurance) {
      const createdInsurance = await this.patientInsuranceRepository.create({
        patient: { connect: { id: patient.id } },
        providerName: normalized.insurance.providerName,
        policyNumber: normalized.insurance.policyNumber,
        expiryDate: new Date(normalized.insurance.expiryDate),
        notes: normalized.insurance.notes,
      });
      insurance = toPatientInsuranceResponse(createdInsurance);
    }

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

    return {
      patient: toPatientResponse(patient),
      insurance,
      message: "Patient created successfully.",
    };
  }
}
