import { Injectable } from "@nestjs/common";
import { CreatePatientCommand } from "@/patients/commands/create-patient.command";
import { UpdatePatientCommand } from "@/patients/commands/update-patient.command";
import { DeletePatientCommand } from "@/patients/commands/delete-patient.command";
import { PatientsRepository } from "@/patients/patients.repository";
import { MedicalRecordsService } from "@/medical-records/medical-records.service";
import { AppointmentServiceClient } from "@/integrations/appointment-service.client";
import { PatientInsuranceRepository } from "@/repositories/patient-insurance.repository";
import {
  invalidPatientFilterError,
  invalidPatientPaginationError,
  patientAlreadyActiveError,
  patientAlreadyInactiveError,
  patientHasActiveAppointmentsError,
  patientNotFoundError,
  patientTenantMismatchError,
} from "@/utils/patient-errors";
import type { UpdateMedicalRecordDto } from "@/medical-records/dto/update-medical-record.dto";
import { buildPatientListOrderBy, buildPatientListWhere } from "@/utils/search-helpers";
import { parseListPatientsQuery } from "@/validators/patient.validator";
import { fetchPatientNotesPlaceholder } from "@/utils/patient-helpers";
import {
  toPatientInsuranceResponse,
  toPatientListResponse,
  toPatientResponse,
} from "@/patients/patients.mapper";

@Injectable()
export class PatientsService {
  constructor(
    private readonly createPatientCommand: CreatePatientCommand,
    private readonly updatePatientCommand: UpdatePatientCommand,
    private readonly deletePatientCommand: DeletePatientCommand,
    private readonly patientsRepository: PatientsRepository,
    private readonly patientInsuranceRepository: PatientInsuranceRepository,
    private readonly medicalRecordsService: MedicalRecordsService,
    private readonly appointmentServiceClient: AppointmentServiceClient,
  ) {}

  create(tenantId: string, payload: unknown, correlationId?: string) {
    return this.createPatientCommand.execute({ tenantId, payload, correlationId });
  }

  async listPatients(tenantId: string, query: unknown) {
    const parsed = parseListPatientsQuery(query);
    if (!parsed.valid) {
      if (parsed.error === "INVALID_PAGINATION") {
        throw invalidPatientPaginationError();
      }
      throw invalidPatientFilterError();
    }

    const { page, limit, sortBy, sortOrder, ...filters } = parsed.payload;
    const where = buildPatientListWhere(tenantId, filters);
    const skip = (page - 1) * limit;
    const orderBy = buildPatientListOrderBy(sortBy, sortOrder);

    const [patients, total] = await Promise.all([
      this.patientsRepository.search(tenantId, where, { skip, take: limit, orderBy }),
      this.patientsRepository.count(tenantId, where),
    ]);

    return {
      data: toPatientListResponse(patients),
      pagination: {
        page,
        limit,
        total,
        totalPages: total > 0 ? Math.ceil(total / limit) : 0,
      },
    };
  }

  async findById(tenantId: string, patientId: string) {
    const patient = await this.patientsRepository.findById(tenantId, patientId);
    if (!patient) {
      throw patientNotFoundError();
    }

    const insurance = await this.patientInsuranceRepository.findByPatientId(patientId);

    return {
      patient: toPatientResponse(patient),
      insurance: insurance ? toPatientInsuranceResponse(insurance) : null,
    };
  }

  update(tenantId: string, patientId: string, payload: unknown, correlationId?: string) {
    return this.updatePatientCommand.execute({ tenantId, patientId, payload, correlationId });
  }

  async deactivatePatient(tenantId: string, patientId: string) {
    const existing = await this.patientsRepository.findByIdGlobal(patientId);
    if (!existing) {
      throw patientNotFoundError();
    }

    if (existing.tenantId !== tenantId) {
      throw patientTenantMismatchError();
    }

    if (existing.status === "INACTIVE") {
      throw patientAlreadyInactiveError();
    }

    const hasActiveAppointments =
      await this.appointmentServiceClient.hasActiveAppointmentsForPatient(tenantId, patientId);
    if (hasActiveAppointments) {
      throw patientHasActiveAppointmentsError();
    }

    const updated = await this.patientsRepository.setStatus(tenantId, patientId, "INACTIVE");

    return {
      patient: toPatientResponse(updated),
      message: "Patient deactivated successfully.",
    };
  }

  async activatePatient(tenantId: string, patientId: string) {
    const existing = await this.patientsRepository.findByIdGlobal(patientId);
    if (!existing) {
      throw patientNotFoundError();
    }

    if (existing.tenantId !== tenantId) {
      throw patientTenantMismatchError();
    }

    if (existing.status === "ACTIVE") {
      throw patientAlreadyActiveError();
    }

    const updated = await this.patientsRepository.setStatus(tenantId, patientId, "ACTIVE");

    return {
      patient: toPatientResponse(updated),
      message: "Patient activated successfully.",
    };
  }

  delete(tenantId: string, patientId: string, correlationId?: string) {
    return this.deletePatientCommand.execute({ tenantId, patientId, correlationId });
  }

  getMedicalRecord(tenantId: string, patientId: string) {
    return this.medicalRecordsService.getByPatientId(tenantId, patientId);
  }

  updateMedicalRecord(
    tenantId: string,
    patientId: string,
    dto: UpdateMedicalRecordDto,
    correlationId?: string,
  ) {
    return this.medicalRecordsService.update(tenantId, patientId, dto, correlationId);
  }

  getNotesLookup(patientId: string) {
    return fetchPatientNotesPlaceholder(patientId);
  }
}
