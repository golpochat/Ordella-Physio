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
import { AuditLogClient } from "@/integrations/audit-log.client";
import { SubscriptionBillingClient } from "@/integrations/subscription-billing.client";
import type { AuditActorContext } from "@ordella/shared";

export type CreatePatientCommandInput = {
  tenantId: string;
  payload: unknown;
  correlationId?: string;
  actor?: AuditActorContext;
};

@Injectable()
export class CreatePatientCommand {
  constructor(
    private readonly patientsRepository: PatientsRepository,
    private readonly patientInsuranceRepository: PatientInsuranceRepository,
    private readonly medicalRecordsRepository: MedicalRecordsRepository,
    private readonly eventPublisher: PatientEventPublisher,
    private readonly auditLogClient: AuditLogClient,
    private readonly subscriptionBillingClient: SubscriptionBillingClient,
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

    await this.subscriptionBillingClient.enforcePatientCreate(input.tenantId);

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

    void this.subscriptionBillingClient.recordPatientCreated(input.tenantId);

    if (input.actor?.userId) {
      void this.auditLogClient.logAction(
        {
          tenantId: input.tenantId,
          actorUserId: input.actor.userId,
          actorRole: input.actor.role,
          entityType: "PATIENT",
          entityId: patient.id,
          action: "CREATE",
          metadata: {
            patientId: patient.id,
            name: `${patient.firstName} ${patient.lastName}`.trim(),
            createdBy: input.actor.userId,
          },
        },
        {
          ipAddress: input.actor.ipAddress,
          userAgent: input.actor.userAgent,
        },
      );
    }

    return {
      patient: toPatientResponse(patient),
      insurance,
      message: "Patient created successfully.",
    };
  }
}
