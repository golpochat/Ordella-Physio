import { Injectable } from "@nestjs/common";
import type { Prisma } from "@/generated/prisma";
import { PatientsRepository } from "@/patients/patients.repository";
import { PatientInsuranceRepository } from "@/repositories/patient-insurance.repository";
import { PatientEventPublisher } from "@/events/patient-event.publisher";
import { mapGenderToPrisma } from "@/utils/patient-helpers";
import { toPatientInsuranceResponse, toPatientResponse } from "@/patients/patients.mapper";
import { validateUpdatePatient } from "@/validators/patient.validator";
import {
  patientEmailExistsError,
  patientNotFoundError,
  patientTenantMismatchError,
  patientValidationError,
} from "@/utils/patient-errors";

export type UpdatePatientCommandInput = {
  tenantId: string;
  patientId: string;
  payload: unknown;
  correlationId?: string;
};

@Injectable()
export class UpdatePatientCommand {
  constructor(
    private readonly patientsRepository: PatientsRepository,
    private readonly patientInsuranceRepository: PatientInsuranceRepository,
    private readonly eventPublisher: PatientEventPublisher,
  ) {}

  async execute(input: UpdatePatientCommandInput) {
    const existing = await this.patientsRepository.findByIdGlobal(input.patientId);
    if (!existing) {
      throw patientNotFoundError();
    }

    if (existing.tenantId !== input.tenantId) {
      throw patientTenantMismatchError();
    }

    const validation = validateUpdatePatient(input.payload);
    if (!validation.valid) {
      throw patientValidationError(validation.fields);
    }

    const normalized = validation.payload;

    if (normalized.email && normalized.email !== existing.email?.toLowerCase()) {
      const emailConflict = await this.patientsRepository.findByTenantAndEmail(
        input.tenantId,
        normalized.email,
      );
      if (emailConflict && emailConflict.id !== existing.id) {
        throw patientEmailExistsError();
      }
    }

    const updateData: Prisma.PatientUpdateInput = {};

    if (normalized.firstName !== undefined) updateData.firstName = normalized.firstName;
    if (normalized.lastName !== undefined) updateData.lastName = normalized.lastName;
    if (normalized.email !== undefined) updateData.email = normalized.email;
    if (normalized.phone !== undefined) updateData.phone = normalized.phone;
    if (normalized.dateOfBirth !== undefined) {
      updateData.dateOfBirth = new Date(normalized.dateOfBirth);
    }
    if (normalized.gender !== undefined) {
      updateData.gender = mapGenderToPrisma(normalized.gender);
    }
    if (normalized.bloodGroup !== undefined) updateData.bloodGroup = normalized.bloodGroup;
    if (normalized.addressLine1 !== undefined) updateData.addressLine1 = normalized.addressLine1;
    if (normalized.addressLine2 !== undefined) updateData.addressLine2 = normalized.addressLine2;
    if (normalized.city !== undefined) updateData.city = normalized.city;
    if (normalized.state !== undefined) updateData.state = normalized.state;
    if (normalized.postalCode !== undefined) updateData.postalCode = normalized.postalCode;
    if (normalized.country !== undefined) updateData.country = normalized.country;
    if (normalized.emergencyContactName !== undefined) {
      updateData.emergencyContactName = normalized.emergencyContactName;
    }
    if (normalized.emergencyContactPhone !== undefined) {
      updateData.emergencyContactPhone = normalized.emergencyContactPhone;
    }

    const patient = await this.patientsRepository.update(
      input.tenantId,
      input.patientId,
      updateData,
    );

    let insurance = existing.insurance ? toPatientInsuranceResponse(existing.insurance) : null;

    if (normalized.insurance) {
      const updatedInsurance = await this.patientInsuranceRepository.upsertForPatient(
        patient.id,
        {
          providerName: normalized.insurance.providerName,
          policyNumber: normalized.insurance.policyNumber,
          expiryDate: new Date(normalized.insurance.expiryDate),
          notes: normalized.insurance.notes ?? null,
        },
      );
      insurance = toPatientInsuranceResponse(updatedInsurance);
    }

    await this.eventPublisher.publishPatientUpdated(
      {
        tenantId: input.tenantId,
        patientId: patient.id,
        changes: normalized as Record<string, unknown>,
        updatedAt: patient.updatedAt.toISOString(),
      },
      input.correlationId,
    );

    return {
      patient: toPatientResponse(patient),
      insurance,
      message: "Patient updated successfully.",
    };
  }
}
